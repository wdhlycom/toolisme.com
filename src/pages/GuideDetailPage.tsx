import { useParams, Link, Navigate } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowLeft, Clock, Tag, ArrowRight, ListOrdered } from 'lucide-react'
import { guides, renderMarkdown } from '@/content/guides'
import { categories, authorDetails } from '@/data/content'
import HardwareKeyboardQuiz from '@/components/HardwareKeyboardQuiz'

const SITE_BASE = 'https://toolisme.com'

function slugifyHeading(text: string): string {
  return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
}

export default function GuideDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const guide = guides.find((g) => g.slug === slug)
  const isHardware = slug === 'remote-workstation-hardware-guide' || slug === 'how-to-choose-a-mechanical-keyboard'
  const authorDetail = authorDetails.find((a) => a.name === guide?.author)

  const [activeSection, setActiveSection] = useState('')

  const markdownHtml = useMemo(
    () => (guide ? renderMarkdown(guide.markdownBody) : ''),
    [guide],
  )

  const relatedGuides = useMemo(() => {
    if (!guide) return []
    return guides
      .filter((g) => g.slug !== guide.slug && g.tags.some((t) => guide.tags.includes(t)))
      .slice(0, 3)
  }, [guide])

  // Add IDs to h2 headings for anchor links
  useEffect(() => {
    if (!guide) return
    const el = document.querySelector('[data-guide-content]')
    if (!el) return
    el.querySelectorAll('h2').forEach((h2) => {
      const id = slugifyHeading(h2.textContent || '')
      h2.id = id
      h2.classList.add('scroll-mt-24')
    })
  }, [guide])

  // Build TOC from h2 headings
  const markdownToc = useMemo(() => {
    if (!guide?.markdownBody) return []
    return (guide.markdownBody.match(/^## (.+)$/gm) || []).map((h) => {
      const label = h.replace(/^## /, '')
      return { id: slugifyHeading(label), label }
    })
  }, [guide])

  // Highlight the TOC entry for the section currently in view
  useEffect(() => {
    if (!guide) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-100px 0px -60% 0px', threshold: 0 },
    )
    markdownToc.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [guide, markdownToc])

  // Mount the hardware keyboard picker into its markdown placeholder
  useEffect(() => {
    if (!isHardware || !guide?.markdownBody) return
    const mount = document.getElementById('hardware-keyboard-quiz')
    if (!mount || mount.dataset.hwMounted) return
    mount.dataset.hwMounted = '1'
    createRoot(mount).render(<HardwareKeyboardQuiz />)
  }, [isHardware, guide])

  if (!guide) return <Navigate to="/guides" replace />

  return (
    <div>
      {/* Article header */}
      <header className="relative overflow-hidden bg-white dark:bg-ink-950">
        <div className="absolute inset-0 bg-grid mask-fade-b opacity-60" />
        <div className="container-page relative py-16 sm:py-20">
          <div className="max-w-3xl">
            <nav className="mb-6 flex items-center gap-1.5 text-xs font-medium text-ink-400 dark:text-ink-500">
              <Link to="/" className="hover:text-ink-700 dark:hover:text-ink-300">Home</Link>
              <ArrowRight className="h-3 w-3" />
              <Link to="/guides" className="hover:text-ink-700 dark:hover:text-ink-300">Guides</Link>
              {guide.tags[0] && (
                <>
                  <ArrowRight className="h-3 w-3" />
                  <Link to={`/guides?tag=${guide.tags[0]}`} className="hover:text-ink-700 dark:hover:text-ink-300">
                    {categories.find((c) => c.slug === guide.tags[0])?.name ?? guide.tags[0]}
                  </Link>
                </>
              )}
            </nav>

            <div className="flex flex-wrap gap-1.5">
              {guide.tags.map((tag) => (
                <Link
                  key={tag}
                  to={`/guides?tag=${tag}`}
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                    categories.find((c) => c.slug === tag)?.accentClass
                  }`}
                >
                  <Tag className="h-3 w-3" />
                  {categories.find((c) => c.slug === tag)?.name ?? tag}
                </Link>
              ))}
            </div>

            <h1 className="mt-5 font-serif text-4xl font-medium tracking-tight text-ink-900 text-balance dark:text-ink-100 sm:text-5xl">
              {guide.title}
            </h1>

            {/* Author byline */}
            <div className="mt-3 flex items-center gap-2.5 text-sm">
              {authorDetail ? (
                <>
                  <img
                    src={authorDetail.avatar}
                    alt={authorDetail.name}
                    className="h-8 w-8 flex-shrink-0 rounded-full object-cover"
                  />
                  <span className="text-ink-500 dark:text-ink-400">
                    By{' '}
                    <Link
                      to={`/author/${authorDetail.slug}`}
                      className="font-semibold text-ink-700 hover:text-accent-700 dark:text-ink-300 dark:hover:text-accent-400"
                    >
                      {authorDetail.name}
                    </Link>
                  </span>
                </>
              ) : guide.author ? (
                <span className="text-ink-500 dark:text-ink-400">By {guide.author}</span>
              ) : null}
            </div>

            <p className="mt-4 text-lg leading-relaxed text-ink-600 text-pretty dark:text-ink-300">
              {guide.summary}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-ink-500 dark:text-ink-400">
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {guide.readTime} min read
              </span>
              <span>
                {new Date(guide.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Author Person JSON-LD (EEAT) */}
      {authorDetail && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: authorDetail.name,
              url: `${SITE_BASE}/author/${authorDetail.slug}`,
            }),
          }}
        />
      )}

      {/* Article body with sticky TOC */}
      <section className="container-page py-14">
        <div className="mx-auto flex max-w-6xl gap-10">
          {/* Sticky Table of Contents */}
          <aside className="hidden w-56 flex-shrink-0 lg:block">
            <div className="sticky top-24">
              <div className="flex items-center gap-2">
                <ListOrdered className="h-4 w-4 text-accent-600" />
                <h3 className="text-xs font-semibold uppercase tracking-widest text-ink-500">
                  Contents
                </h3>
              </div>
              <nav className="mt-4 space-y-1 border-l border-ink-200 dark:border-ink-700">
                {markdownToc.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      const el = document.getElementById(s.id)
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }}
                    className={`block w-full border-l-2 py-2 pl-4 text-left text-sm transition-colors ${
                      activeSection === s.id
                        ? 'border-accent-500 font-semibold text-accent-700 dark:text-accent-400'
                        : 'border-transparent text-ink-500 hover:text-ink-900 dark:text-ink-400 dark:hover:text-ink-300'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Article body */}
          <div className="min-w-0 flex-1">
            <div
              className="prose-toolisme max-w-none"
              data-guide-content
              dangerouslySetInnerHTML={{ __html: markdownHtml }}
            />

            <div className="mt-12 border-t border-ink-200 pt-8 dark:border-ink-800">
              <Link
                to="/guides"
                className="inline-flex items-center gap-2 text-sm font-semibold text-accent-700 hover:text-accent-900 dark:text-accent-400 dark:hover:text-accent-300"
              >
                <ArrowLeft className="h-4 w-4" />
                All buyer's guides
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related guides */}
      {relatedGuides.length > 0 && (
        <section className="border-t border-ink-200/70 bg-white py-16 dark:border-ink-700/70 dark:bg-ink-950">
          <div className="container-page">
            <h2 className="section-title">More guides</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedGuides.map((g) => (
                <Link key={g.slug} to={`/guides/${g.slug}`} className="card-hover group flex flex-col p-6">
                  <h3 className="font-serif text-lg font-medium tracking-tight text-ink-900 group-hover:text-accent-700 dark:text-ink-100 dark:group-hover:text-accent-400">
                    {g.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600 line-clamp-2 dark:text-ink-300">
                    {g.summary}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent-700 group-hover:text-accent-900 dark:text-accent-400 dark:group-hover:text-accent-300">
                    Read guide
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
