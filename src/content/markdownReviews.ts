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

const modules = import.meta.glob<string>('./reviews/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

export const markdownReviews: MarkdownReview[] = Object.values(modules).map(
  (raw) => parseFrontmatter(raw as string),
)

export function renderMarkdown(md: string): string {
  return marked.parse(md, { async: false }) as string
}
