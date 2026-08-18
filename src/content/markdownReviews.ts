import { marked } from 'marked'
import { load as yamlParse } from 'js-yaml'

interface MarkdownFrontmatter {
  slug: string
  name: string
  category: string
  subcategory: string
  rating: number
  tagline: string
  summary: string
  pros: string[]
  cons: string[]
  pricing: string
  url: string
  date: string
  readTime: number
  bestFor: string
  whoShouldSkip: string
  keyAdvantage: string
  editorsPick?: boolean
  featured?: boolean
  comparisonOnly?: boolean
  // Quick-Verdict highlight badge, e.g. "🏆 Best Budget Mentimeter Alternative"
  verdictBadge?: string
  // CTA button label, e.g. "Try AhaSlides Free (No Credit Card Required)"
  ctaLabel?: string
  // Schema.org SoftwareApplication fields
  appCategory?: string
  operatingSystem?: string
  // Author display name (matches authorDetails.name in content.ts)
  author?: string
}

export interface MarkdownReview extends MarkdownFrontmatter {
  markdownBody: string
}

function parseFrontmatter(raw: string): MarkdownReview {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/)
  if (!match) {
    throw new Error('Markdown file missing frontmatter block')
  }
  const frontmatter = yamlParse(match[1]) as MarkdownFrontmatter
  return { ...frontmatter, markdownBody: match[2] }
}

const modules = import.meta.glob<string>(
  ['./reviews/*.md', './comparisons/*.md'],
  {
    query: '?raw',
    import: 'default',
    eager: true,
  },
)

export const markdownReviews: MarkdownReview[] = Object.values(modules).map(
  (raw) => parseFrontmatter(raw as string),
)

// Make every external (http/https) link open in a new tab with safe rel.
// Internal links (/reviews, /comparisons, #anchors) are left untouched so the
// SPA router keeps working in the same tab.
function externalizeLinks(html: string): string {
  return html.replace(
    /<a\s+([^>]*?)href=(["'])(https?:\/\/[^"']*)\2([^>]*)>/gi,
    (match, pre: string, q: string, href: string, post: string) => {
      if (/\starget=["']?_blank/i.test(match)) return match
      return `<a ${pre}href=${q}${href}${q}${post} target="_blank" rel="noopener noreferrer">`
    },
  )
}

// Center small tables (≤8 rows AND ≤3 columns) so quick-reference tables like
// the TL;DR spec read centered instead of hugging the left edge. Wide tables
// (pricing/feature grids, ≥4 columns) keep the default layout untouched.
function centerSmallTables(html: string): string {
  return html.replace(/<table[^>]*>([\s\S]*?)<\/table>/gi, (match, inner: string) => {
    const rows = (inner.match(/<tr[\s>]/gi) || []).length
    const firstRow = inner.match(/<tr[\s>][\s\S]*?<\/tr>/i)?.[0] || ''
    const cols = (firstRow.match(/<t[hd][\s>]/gi) || []).length
    if (rows <= 8 && cols <= 3) {
      // width:auto overrides the typography plugin's table { width:100% }, so the
      // table shrinks to its content and the auto margins actually center it.
      return `<table style="margin-left:auto;margin-right:auto;text-align:center;width:auto;max-width:100%;">${inner}</table>`
    }
    return match
  })
}

export function renderMarkdown(md: string): string {
  const html = marked.parse(md, { async: false }) as string
  return externalizeLinks(centerSmallTables(html))
}
