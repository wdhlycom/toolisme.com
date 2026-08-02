import { useParams, Link, Navigate } from 'react-router-dom'
import { useEffect, useState, useMemo } from 'react'
import {
  Star, Clock, Check, X, ArrowRight, ExternalLink, Users, Tag,
  ChevronRight, ShieldCheck, UserCheck, UserX, ListOrdered,
} from 'lucide-react'
import { reviews, categories } from '@/data/content'
import { renderMarkdown } from '@/content/markdownReviews'
import ReviewCard from '@/components/ReviewCard'

const TOC_SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'features', label: 'Features' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'pros-cons', label: 'Pros & Cons' },
  { id: 'final-verdict', label: 'Final Verdict' },
]

function slugifyHeading(text: string): string {
  return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
}

export default function ReviewDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const review = reviews.find((r) => r.slug === slug)
  const [activeSection, setActiveSection] = useState('overview')

  // For markdown articles, build TOC from h2 headings
  const markdownToc = useMemo(() => {
    if (!review?.markdownBody) return []
    return (review.markdownBody.match(/^## (.+)$/gm) || []).map((h) => {
      const label = h.replace(/^## /, '')
      return { id: slugifyHeading(label), label }
    })
  }, [review])

  const tocSections = review?.markdownBody ? markdownToc : TOC_SECTIONS

  useEffect(() => {
    if (!review) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-100px 0px -60% 0px', threshold: 0 },
    )
    tocSections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [review, tocSections])

  // Add IDs to markdown h2 headings for TOC linking
  useEffect(() => {
    if (!review?.markdownBody) return
    const articleEl = document.querySelector('[data-markdown-content]')
    if (!articleEl) return
    articleEl.querySelectorAll('h2').forEach((h2) => {
      const id = slugifyHeading(h2.textContent || '')
      h2.id = id
      h2.classList.add('scroll-mt-24')
    })
  }, [review])

  if (!review) return <Navigate to="/" replace />

  const category = categories.find((c) => c.slug === review.category)
  const relatedReviews = reviews
    .filter((r) => r.category === review.category && r.slug !== review.slug)
    .slice(0, 3)

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const renderedMarkdown = review.markdownBody ? renderMarkdown(review.markdownBody) : ''

  return (
    <div>
      {/* Breadcrumb header */}
      <header className="border-b border-ink-200/70 bg-white">
        <div className="container-page py-6">
          <nav className="flex items-center gap-1.5 text-xs font-medium text-ink-400">
            <Link to="/" className="hover:text-ink-700">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to={`/category/${review.category}`} className="hover:text-ink-700">
              {category?.name}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-ink-600">{review.name} Review 2026</span>
          </nav>
        </div>
      </header>

      {/* Article header */}
      <section className="border-b border-ink-200/70 bg-white">
        <div className="container-page py-12">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center gap-2">
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${category?.accentClass}`}>
                {review.subcategory}
              </span>
              {review.editorsPick && (
                <span className="inline-flex items-center gap-1 rounded-full bg-ink-900 px-2.5 py-1 text-xs font-semibold text-white">
                  <Star className="h-3 w-3 fill-current" />
                  Editor's Pick
                </span>
              )}
            </div>

            <h1 className="mt-5 font-serif text-4xl font-medium tracking-tight text-ink-900 sm:text-5xl text-balance">
              {review.name} Review 2026: {review.tagline}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-600 text-pretty">
              {review.summary}
            </p>

            {/* Meta row */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
              <span className="flex items-center gap-1.5 font-semibold text-ink-900">
                <Star className="h-5 w-5 fill-sand-400 text-sand-400" />
                {review.rating.toFixed(1)} / 5
              </span>
              <span className="flex items-center gap-1.5 text-ink-500">
                <Clock className="h-4 w-4" />
                {review.readTime} min read
              </span>
              <span className="flex items-center gap-1.5 text-ink-500">
                <Tag className="h-4 w-4" />
                {review.pricing}
              </span>
              <span className="flex items-center gap-1.5 text-ink-500">
                <Users className="h-4 w-4" />
                {review.bestFor}
              </span>
              <span className="text-ink-400">
                {new Date(review.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* TL;DR / Quick Verdict Box */}
      <section className="bg-ink-50">
        <div className="container-page py-8">
          <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-sm">
            <div className="flex items-center gap-2 border-b border-ink-100 bg-ink-50 px-6 py-3">
              <ShieldCheck className="h-4 w-4 text-accent-600" />
              <span className="text-xs font-semibold uppercase tracking-widest text-ink-500">
                Quick Verdict &middot; TL;DR
              </span>
            </div>
            <div className="grid gap-6 p-6 sm:grid-cols-3">
              {/* Our Verdict */}
              <div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-sand-400 text-sand-400" />
                  <h3 className="text-sm font-semibold text-ink-900">Our Verdict</h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{review.summary}</p>
              </div>
              {/* Who It's For */}
              <div>
                <div className="flex items-center gap-2">
                  <UserCheck className="h-4 w-4 text-sage-600" />
                  <h3 className="text-sm font-semibold text-ink-900">Who It's For</h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{review.bestFor}</p>
              </div>
              {/* Who Should Skip */}
              <div>
                <div className="flex items-center gap-2">
                  <UserX className="h-4 w-4 text-red-500" />
                  <h3 className="text-sm font-semibold text-ink-900">Who Should Skip</h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{review.whoShouldSkip}</p>
              </div>
            </div>
            {/* CTA */}
            <div className="border-t border-ink-100 bg-sage-50 px-6 py-4">
              <a
                href={review.url}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-sage-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-sage-500 hover:shadow-lg active:scale-[0.98] sm:w-auto"
              >
                Check Latest Price
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main content with sticky TOC */}
      <section className="container-page py-16">
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
              <nav className="mt-4 space-y-1 border-l border-ink-200">
                {tocSections.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => scrollToSection(s.id)}
                    className={`block w-full border-l-2 py-2 pl-4 text-left text-sm transition-colors ${
                      activeSection === s.id
                        ? 'border-accent-500 font-semibold text-accent-700'
                        : 'border-transparent text-ink-500 hover:text-ink-900'
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
            {review.markdownBody ? (
              <div
                className="prose-toolisme max-w-none"
                data-markdown-content
                dangerouslySetInnerHTML={{ __html: renderedMarkdown }}
              />
            ) : (
            <div className="prose-toolisme max-w-none">
              {/* Overview */}
              <div id="overview" className="scroll-mt-24">
                <h2>Overview</h2>
                <p>{review.summary}</p>
                {review.bodySections[0]?.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {/* Features */}
              <div id="features" className="scroll-mt-24">
                <h2>Features</h2>
                {review.bodySections.slice(1, -1).map((section, si) => (
                  <div key={si}>
                    <h3>{section.heading}</h3>
                    {section.paragraphs.map((p, pi) => (
                      <p key={pi}>{p}</p>
                    ))}
                  </div>
                ))}
              </div>

              {/* Pricing */}
              <div id="pricing" className="scroll-mt-24">
                <h2>Pricing</h2>
                <p>
                  {review.name} is priced at <strong>{review.pricing}</strong>. For the most
                  current pricing and available plans, check the official site.
                </p>
              </div>

              {/* Pros & Cons */}
              <div id="pros-cons" className="scroll-mt-24">
                <h2>Pros &amp; Cons</h2>
                <div className="not-prose mt-6 grid gap-4 sm:grid-cols-2">
                  {/* Pros card */}
                  <div className="overflow-hidden rounded-2xl border-2 border-sage-200 bg-sage-50">
                    <div className="flex items-center gap-2 border-b border-sage-200 bg-sage-100 px-5 py-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sage-600 text-white">
                        <Check className="h-4 w-4" />
                      </span>
                      <h3 className="font-serif text-lg font-medium text-sage-900">Pros</h3>
                    </div>
                    <ul className="space-y-3 p-5">
                      {review.pros.map((pro) => (
                        <li key={pro} className="flex items-start gap-2.5 text-sm text-ink-700">
                          <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-sage-600" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Cons card */}
                  <div className="overflow-hidden rounded-2xl border-2 border-red-200 bg-red-50">
                    <div className=" flex items-center gap-2 border-b border-red-200 bg-red-100 px-5 py-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-600 text-white">
                        <X className="h-4 w-4" />
                      </span>
                      <h3 className="font-serif text-lg font-medium text-red-900">Cons</h3>
                    </div>
                    <ul className="space-y-3 p-5">
                      {review.cons.map((con) => (
                        <li key={con} className="flex items-start gap-2.5 text-sm text-ink-700">
                          <X className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Final Verdict */}
              <div id="final-verdict" className="scroll-mt-24">
                <h2>Final Verdict</h2>
                {review.bodySections[review.bodySections.length - 1]?.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
            )}

            {/* Pros & Cons cards (shown for both markdown and structured articles) */}
            {review.markdownBody && (
              <div className="not-prose mt-12">
                <h2 className="font-serif text-2xl font-medium tracking-tight text-ink-900">Pros &amp; Cons</h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="overflow-hidden rounded-2xl border-2 border-sage-200 bg-sage-50">
                    <div className="flex items-center gap-2 border-b border-sage-200 bg-sage-100 px-5 py-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sage-600 text-white">
                        <Check className="h-4 w-4" />
                      </span>
                      <h3 className="font-serif text-lg font-medium text-sage-900">Pros</h3>
                    </div>
                    <ul className="space-y-3 p-5">
                      {review.pros.map((pro) => (
                        <li key={pro} className="flex items-start gap-2.5 text-sm text-ink-700">
                          <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-sage-600" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="overflow-hidden rounded-2xl border-2 border-red-200 bg-red-50">
                    <div className="flex items-center gap-2 border-b border-red-200 bg-red-100 px-5 py-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-600 text-white">
                        <X className="h-4 w-4" />
                      </span>
                      <h3 className="font-serif text-lg font-medium text-red-900">Cons</h3>
                    </div>
                    <ul className="space-y-3 p-5">
                      {review.cons.map((con) => (
                        <li key={con} className="flex items-start gap-2.5 text-sm text-ink-700">
                          <X className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Affiliate CTA */}
            <div className="not-prose mt-12 flex flex-col items-center justify-between gap-4 rounded-2xl bg-ink-900 p-8 text-white sm:flex-row">
              <div>
                <h3 className="font-serif text-xl font-medium">Ready to try {review.name}?</h3>
                <p className="mt-1 text-sm text-ink-300">
                  {review.pricing} &middot; {review.bestFor}
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href={review.url}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-sage-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-sage-500 hover:shadow-lg active:scale-[0.98]"
                >
                  Check Latest Price
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={review.url}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink-900 transition-all hover:shadow-lg active:scale-[0.98]"
                >
                  Visit Official Site
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
            <p className="not-prose mt-3 text-center text-xs text-ink-400">
              Some links on this page are affiliate links.{' '}
              <Link to="/disclosure" className="font-medium text-ink-600 hover:text-ink-900">
                Read our disclosure
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Related articles */}
      {relatedReviews.length > 0 && (
        <section className="container-page py-20">
          <h2 className="section-title">Related reviews</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedReviews.map((r) => (
              <ReviewCard key={r.slug} review={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
