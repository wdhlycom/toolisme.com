import { load as yamlParse } from 'js-yaml'
import { renderMarkdown } from './markdownReviews'

export interface GuideFrontmatter {
  slug: string
  title: string
  /** Category tags this guide belongs to (software / creators / security / hardware). */
  tags: string[]
  summary: string
  date: string
  readTime: number
  /** Author display name. Defaults to the editor-in-chief (Holive) when omitted. */
  author?: string
}

export interface Guide extends GuideFrontmatter {
  markdownBody: string
}

function parseFrontmatter(raw: string): Guide {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/)
  if (!match) {
    throw new Error('Guide markdown file missing frontmatter block')
  }
  const frontmatter = yamlParse(match[1]) as Partial<GuideFrontmatter>
  if (!frontmatter.slug || !frontmatter.title) {
    throw new Error('Guide markdown missing required frontmatter (slug, title)')
  }
  return {
    slug: frontmatter.slug,
    title: frontmatter.title,
    tags: frontmatter.tags ?? [],
    summary: frontmatter.summary ?? '',
    date: frontmatter.date ?? '',
    readTime: frontmatter.readTime ?? 5,
    author: frontmatter.author ?? 'Holive',
    markdownBody: match[2],
  }
}

const modules = import.meta.glob<string>('./guides/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

export const guides: Guide[] = Object.values(modules).map((raw) =>
  parseFrontmatter(raw as string),
)

export { renderMarkdown }
