import { useEffect, useRef } from 'react'

interface CommentSystemProps {
  /** Giscus repo in format "owner/repo" */
  repo?: string
  repoId?: string
  category?: string
  categoryId?: string
  mapping?: 'pathname' | 'url' | 'title' | 'og:title'
  theme?: 'light' | 'dark' | 'preferred_color_scheme'
}

/**
 * Giscus-powered comment system.
 * Loads the Giscus script into a container div.
 * Until the user configures their own GitHub repo, a placeholder is shown.
 */
export default function CommentSystem({
  repo = 'your-username/your-repo',
  repoId = '',
  category = 'Announcements',
  categoryId = '',
  mapping = 'pathname',
  theme = 'light',
}: CommentSystemProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const configured = repoId !== '' && categoryId !== '' && !repo.startsWith('your-username')

  useEffect(() => {
    if (!configured || !containerRef.current) return

    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.async = true
    script.crossOrigin = 'anonymous'
    script.setAttribute('data-repo', repo)
    script.setAttribute('data-repo-id', repoId)
    script.setAttribute('data-category', category)
    script.setAttribute('data-category-id', categoryId)
    script.setAttribute('data-mapping', mapping)
    script.setAttribute('data-strict', '1')
    script.setAttribute('data-reactions-enabled', '1')
    script.setAttribute('data-emit-metadata', '0')
    script.setAttribute('data-input-position', 'top')
    script.setAttribute('data-theme', theme)
    script.setAttribute('data-lang', 'en')
    script.setAttribute('data-loading', 'lazy')

    containerRef.current.innerHTML = ''
    containerRef.current.appendChild(script)
  }, [configured, repo, repoId, category, categoryId, mapping, theme])

  if (!configured) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-ink-200 bg-ink-50 p-8 text-center dark:border-ink-700 dark:bg-ink-900">
        <p className="text-sm font-semibold text-ink-700">
          Comments powered by Giscus
        </p>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-500">
          The comment section uses Giscus (GitHub Discussions) and will appear here
          once configured. Site owners connect a public GitHub repository in the
          component settings to enable reader discussions.
        </p>
        <a
          href="https://giscus.app"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-700 hover:text-accent-900"
        >
          Learn about Giscus →
        </a>
      </div>
    )
  }

  return <div ref={containerRef} className="giscus min-h-[200px]" />
}
