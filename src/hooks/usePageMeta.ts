import { useEffect } from 'react'

function setMetaTag(attr: 'name' | 'property', attrName: string, content: string) {
  if (!content) return
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${attrName}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, attrName)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/** Trim a summary to a meta-description length (~155 chars) at a word boundary. */
export function truncateMeta(text: string, max = 155): string {
  const clean = text.replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return clean
  const cut = clean.slice(0, max)
  const lastSpace = cut.lastIndexOf(' ')
  return (lastSpace > 60 ? cut.slice(0, lastSpace) : cut).replace(/[.,;:]+$/, '') + '…'
}

/**
 * Sets per-page <title> and meta description / Open Graph tags on the client.
 * Static index.html defaults apply everywhere this hook isn't used.
 */
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = title
    setMetaTag('name', 'description', description ?? '')
    setMetaTag('property', 'og:title', title)
    setMetaTag('property', 'og:description', description ?? '')
  }, [title, description])
}
