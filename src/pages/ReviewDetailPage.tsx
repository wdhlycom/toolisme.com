import { useParams, Link, Navigate } from 'react-router-dom'
import { useEffect, useState, useMemo } from 'react'
import { createRoot } from 'react-dom/client'
import {
  Star, Clock, Check, X, ArrowRight, Rocket, Users, Tag,
  ChevronRight, ShieldCheck, UserCheck, UserX, ListOrdered,
} from 'lucide-react'
import { reviews, comparisons, categories, reviewPath, comparisonPath, type ToolReview, getAuthor, authorDetails } from '@/data/content'
import { renderMarkdown } from '@/content/markdownReviews'
import ReviewCard from '@/components/ReviewCard'
import AiHeadshotQuiz from '@/components/AiHeadshotQuiz'
import AhaSlidesDecisionMatrix from '@/components/AhaSlidesDecisionMatrix'
import TubeMagicQuiz from '@/components/TubeMagicQuiz'
import SnovioDecisionTree from '@/components/SnovioDecisionTree'
import BufferDecisionTree from '@/components/BufferDecisionTree'
import WiziShopDecisionTree from '@/components/WiziShopDecisionTree'
import GeoTargetlyDecisionTree from '@/components/GeoTargetlyDecisionTree'
import WarmupInboxDecisionTree from '@/components/WarmupInboxDecisionTree'

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

const SITE_BASE = 'https://toolisme.com'

// Affiliate choices surfaced on the AI-headshot comparison decision card.
// `colors` drives the per-tool tinted card + CTA button in the bottom panel.
const HEADSHOT_CARDS = [
  {
    name: 'HeadshotPro',
    url: 'https://www.headshotpro.com/?via=toolisme',
    tagline: 'Best for Teams & Consistency',
    colors: { border: 'border-blue-400', bg: 'bg-blue-50 dark:bg-blue-950/30', btn: 'bg-blue-600 hover:bg-blue-500', text: 'text-blue-700 dark:text-blue-400' },
  },
  {
    name: 'Aragon.ai',
    url: 'https://www.aragon.ai/?via=toolisme',
    tagline: 'Fastest & Fewest Selfies',
    colors: { border: 'border-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950/30', btn: 'bg-emerald-600 hover:bg-emerald-500', text: 'text-emerald-700 dark:text-emerald-400' },
  },
  {
    name: 'BetterPic',
    url: 'https://betterpic.link/hu-liangyu',
    tagline: '4K & Anti-Wax Face',
    colors: { border: 'border-violet-400', bg: 'bg-violet-50 dark:bg-violet-950/30', btn: 'bg-violet-600 hover:bg-violet-500', text: 'text-violet-700 dark:text-violet-400' },
  },
  {
    name: 'Proshoot',
    url: 'https://www.proshoot.co?ref=toolisme',
    tagline: 'Best Likeness Match',
    colors: { border: 'border-orange-400', bg: 'bg-orange-50 dark:bg-orange-950/30', btn: 'bg-orange-600 hover:bg-orange-500', text: 'text-orange-700 dark:text-orange-400' },
  },
]

// SoftwareApplication + Review structured data so Google SERP can show stars,
// price and pros/cons for software review pages.
function buildArticleSchema(review: ToolReview, articleUrl: string, author?: { name: string; slug: string }): object {
  const priceMatch = (review.pricing || '').match(/\d+(\.\d+)?/)
  const freeTier = /^free/i.test(review.pricing || '')
  const price = freeTier ? 0 : priceMatch ? parseFloat(priceMatch[0]) : undefined
  const firstImage = review.markdownBody?.match(/(?:src="([^"]+)"|!\[[^\]]*\]\(([^)]+)\))/)
  const image = firstImage ? SITE_BASE + (firstImage[1] || firstImage[2]) : undefined

  const app: Record<string, unknown> = {
    '@type': 'SoftwareApplication',
    name: review.name,
    description: review.summary,
    applicationCategory: review.appCategory || review.subcategory || 'Productivity',
    operatingSystem: review.operatingSystem || 'Web',
    url: articleUrl,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price,
      description: review.pricing,
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: review.rating,
      bestRating: 5,
      ratingCount: 1,
    },
  }
  if (image) app.image = image

  const reviewNode: Record<string, unknown> = {
    '@type': 'Review',
    name: `${review.name} Review 2026`,
    reviewRating: { '@type': 'Rating', ratingValue: review.rating, bestRating: 5 },
    author: author
      ? { '@type': 'Person', name: author.name, url: `${SITE_BASE}/author/${author.slug}` }
      : { '@type': 'Organization', name: 'Toolisme' },
    reviewBody: review.summary,
    datePublished: review.date,
    itemReviewed: { '@type': 'SoftwareApplication', name: review.name },
    positiveNotes: {
      '@type': 'ItemList',
      itemListElement: (review.pros || []).map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p })),
    },
    negativeNotes: {
      '@type': 'ItemList',
      itemListElement: (review.cons || []).map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c })),
    },
  }

  return { '@context': 'https://schema.org', '@graph': [app, reviewNode] }
}

export default function ReviewDetailPage({ comparison = false }: { comparison?: boolean }) {
  const { slug } = useParams<{ slug: string }>()
  const sourceList = comparison ? comparisons : reviews
  const review = sourceList.find((r) => r.slug === slug)
  const isAiHeadshot = comparison && slug === 'ai-headshot-tools-comparison-2026'
  const isAhaSlides = !comparison && slug === 'ahaslides-review-2026'
  const isTubeMagic = comparison && slug === 'tubemagic-vs-subscribr-2026'
  const isSnovio = !comparison && slug === 'snovio-review-2026'
  const isWarmupinbox = !comparison && slug === 'warmupinbox-review-2026'
  const isBuffer = !comparison && slug === 'buffer-review-2026'
  const isWiziShop = !comparison && slug === 'wizishop-review-2026'
  const isGeotargetly = !comparison && slug === 'geotargetly-review-2026'
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

  // Mount the interactive picker into the markdown's quiz placeholder
  useEffect(() => {
    if (!isAiHeadshot || !review?.markdownBody) return
    const mount = document.getElementById('ai-headshot-quiz')
    if (!mount || mount.dataset.quizMounted) return
    mount.dataset.quizMounted = '1'
    createRoot(mount).render(<AiHeadshotQuiz />)
  }, [isAiHeadshot, review])

  // Mount the AhaSlides decision matrix into its markdown placeholder
  useEffect(() => {
    if (!isAhaSlides || !review?.markdownBody) return
    const mount = document.getElementById('ahaslides-decision-matrix')
    if (!mount || mount.dataset.matrixMounted) return
    mount.dataset.matrixMounted = '1'
    createRoot(mount).render(<AhaSlidesDecisionMatrix />)
  }, [isAhaSlides, review])

  // Mount the TubeMagic vs Subscribr quiz into its markdown placeholder
  useEffect(() => {
    if (!isTubeMagic || !review?.markdownBody) return
    const mount = document.getElementById('tubemagic-quiz')
    if (!mount || mount.dataset.quizMounted) return
    mount.dataset.quizMounted = '1'
    createRoot(mount).render(<TubeMagicQuiz />)
  }, [isTubeMagic, review])

  // Mount the Snov.io decision tree into its markdown placeholder
  useEffect(() => {
    if (!isSnovio || !review?.markdownBody) return
    const mount = document.getElementById('snovio-decision-tree')
    if (!mount || mount.dataset.decisionMounted) return
    mount.dataset.decisionMounted = '1'
    createRoot(mount).render(<SnovioDecisionTree />)
  }, [isSnovio, review])

  // Mount the WarmupInbox decision tree into its markdown placeholder
  useEffect(() => {
    if (!isWarmupinbox || !review?.markdownBody) return
    const mount = document.getElementById('warmupinbox-decision-tree')
    if (!mount || mount.dataset.warmupMounted) return
    mount.dataset.warmupMounted = '1'
    createRoot(mount).render(<WarmupInboxDecisionTree />)
  }, [isWarmupinbox, review])

  useEffect(() => {
    if (!isBuffer || !review?.markdownBody) return
    const mount = document.getElementById('buffer-decision-tree')
    if (!mount || mount.dataset.bufferMounted) return
    mount.dataset.bufferMounted = '1'
    createRoot(mount).render(<BufferDecisionTree />)
  }, [isBuffer, review])

  // Mount the WiziShop decision tree into its markdown placeholder
  useEffect(() => {
    if (!isWiziShop || !review?.markdownBody) return
    const mount = document.getElementById('wizishop-decision-tree')
    if (!mount || mount.dataset.wizishopMounted) return
    mount.dataset.wizishopMounted = '1'
    createRoot(mount).render(<WiziShopDecisionTree />)
  }, [isWiziShop, review])

  // Mount the GeoTargetly decision tree into its markdown placeholder
  useEffect(() => {
    if (!isGeotargetly || !review?.markdownBody) return
    const mount = document.getElementById('geotargetly-decision-tree')
    if (!mount || mount.dataset.geotargetlyMounted) return
    mount.dataset.geotargetlyMounted = '1'
    createRoot(mount).render(<GeoTargetlyDecisionTree />)
  }, [isGeotargetly, review])

  // If accessed via /reviews/ path but article is comparison-only, redirect
  if (!review && !comparison) {
    const compArticle = comparisons.find((r) => r.slug === slug)
    if (compArticle) {
      return <Navigate to={`/comparisons/${compArticle.category}/${compArticle.slug}`} replace />
    }
  }

  if (!review) return <Navigate to="/" replace />

  const category = categories.find((c) => c.slug === review.category)
  const relatedReviews = sourceList
    .filter((r) => r.category === review.category && r.slug !== review.slug)
    .slice(0, 3)

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const renderedMarkdown = review.markdownBody ? renderMarkdown(review.markdownBody) : ''
  const authorDetail = useMemo(() => {
    if (!review.author) return undefined
    return authorDetails.find((a) => a.name === review.author)
  }, [review.author])
  const articleSchema = buildArticleSchema(review, `${SITE_BASE}${comparison ? comparisonPath(review) : reviewPath(review)}`, authorDetail || undefined)

  return (
    <div>
      {/* Product + Review structured data for Google SERP rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Breadcrumb header */}
      <header className="bg-white dark:bg-ink-950">
        <div className="container-page pt-6 pb-2">
          <nav className="flex items-center gap-1.5 text-xs font-medium text-ink-400">
            <Link to="/" className="hover:text-ink-700">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to={comparison ? `/comparisons/${review.category}` : `/reviews/${review.category}`} className="hover:text-ink-700">
              {category?.name}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to={comparison ? comparisonPath(review) : reviewPath(review)} className="font-semibold text-ink-600 hover:text-ink-900 dark:hover:text-ink-200">
              {comparison ? review.name : `${review.name} Review 2026`}
            </Link>
          </nav>
        </div>
      </header>

      {/* Article header */}
      <section className="bg-white dark:bg-ink-950">
        <div className="container-page pt-3 pb-2">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center gap-2">
              {review.editorsPick && (
                <span className="inline-flex items-center gap-1 rounded-full bg-ink-900 px-2.5 py-1 text-xs font-semibold text-white">
                  <Star className="h-3 w-3 fill-current" />
                  Editor's Pick
                </span>
              )}
            </div>

            <h1 className="mt-3 font-serif text-4xl font-medium leading-tight tracking-tight text-ink-900 sm:text-5xl text-balance">
              {review.name} Review 2026: {review.tagline}
            </h1>

            {/* Author byline */}
            {authorDetail && (
              <div className="mt-3 flex items-center gap-2.5 text-sm">
                <img
                  src={authorDetail.avatar}
                  alt={authorDetail.name}
                  className="h-8 w-8 flex-shrink-0 rounded-full object-cover"
                />
                <span className="text-ink-500">
                  By{' '}
                  <Link
                    to={`/author/${authorDetail.slug}`}
                    className="font-semibold text-ink-700 hover:text-accent-700"
                  >
                    {authorDetail.name}
                  </Link>
                </span>
              </div>
            )}
            <p className="mt-3 text-lg leading-relaxed text-ink-600 text-pretty">
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
      <section className="bg-ink-50 dark:bg-ink-950">
        <div className="container-page pt-6 pb-8">
          <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-sm dark:border-ink-700 dark:bg-ink-900 dark:shadow-none">
            <div className="flex flex-wrap items-center gap-2 border-b border-ink-100 bg-ink-50 px-6 py-3">
              <ShieldCheck className="h-4 w-4 text-accent-600" />
              <span className="text-xs font-semibold uppercase tracking-widest text-ink-500">
                Quick Verdict &middot; TL;DR
              </span>
              {review.verdictBadge && (
                <span className="ml-auto inline-flex items-center rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-ink-900 shadow-sm dark:bg-amber-300 dark:text-ink-950">
                  {review.verdictBadge}
                </span>
              )}
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
              {isAiHeadshot ? (
                <div className="flex flex-wrap items-center justify-end gap-x-5 gap-y-2">
                  <span className="mr-auto text-xs font-medium uppercase tracking-widest text-ink-400 dark:text-ink-500">
                    Top picks
                  </span>
                  {HEADSHOT_CARDS.map((t) => (
                    <a
                      key={t.name}
                      href={t.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-semibold text-accent-700 hover:text-accent-900 dark:text-accent-400 dark:hover:text-accent-300"
                    >
                      {t.name}
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              ) : (
                <a
                  href={review.url}
                  target="_blank"
                  rel="sponsored noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-bold text-ink-950 shadow-md shadow-amber-400/30 transition-all hover:bg-accent-600 hover:text-white hover:shadow-lg hover:shadow-accent-600/30 active:scale-[0.98] sm:w-auto"
                >
                  {review.ctaLabel ? `🚀 ${review.ctaLabel}` : 'Check Latest Price'}
                  <ArrowRight className="h-4 w-4" />
                </a>
              )}
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
              <nav className="mt-4 space-y-1 border-l border-ink-200 dark:border-ink-700">
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
                  <div className="overflow-hidden rounded-2xl border-2 border-sage-200 bg-sage-50 dark:border-sage-800 dark:bg-sage-950">
                    <div className="flex items-center gap-2 border-b border-sage-200 bg-sage-100 px-5 py-3 dark:border-sage-800 dark:bg-sage-900">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sage-600 text-white">
                        <Check className="h-4 w-4" />
                      </span>
                      <h3 className="font-serif text-lg font-medium text-sage-900 dark:text-sage-100">Pros</h3>
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
                  <div className="overflow-hidden rounded-2xl border-2 border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950">
                    <div className=" flex items-center gap-2 border-b border-red-200 bg-red-100 px-5 py-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-600 text-white">
                        <X className="h-4 w-4" />
                      </span>
                      <h3 className="font-serif text-lg font-medium text-red-900 dark:text-red-100">Cons</h3>
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
            {review.markdownBody && (review.pros?.length || review.cons?.length) && (
              <div className="not-prose mt-12">
                <h2 className="font-serif text-2xl font-medium tracking-tight text-ink-900">Pros &amp; Cons</h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="overflow-hidden rounded-2xl border-2 border-sage-200 bg-sage-50 dark:border-sage-800 dark:bg-sage-950">
                    <div className="flex items-center gap-2 border-b border-sage-200 bg-sage-100 px-5 py-3 dark:border-sage-800 dark:bg-sage-900">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sage-600 text-white">
                        <Check className="h-4 w-4" />
                      </span>
                      <h3 className="font-serif text-lg font-medium text-sage-900 dark:text-sage-100">Pros</h3>
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
                  <div className="overflow-hidden rounded-2xl border-2 border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950">
                    <div className="flex items-center gap-2 border-b border-red-200 bg-red-100 px-5 py-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-600 text-white">
                        <X className="h-4 w-4" />
                      </span>
                      <h3 className="font-serif text-lg font-medium text-red-900 dark:text-red-100">Cons</h3>
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

            {/* Affiliate CTA / decision card */}
            {isAiHeadshot ? (
              <div className="not-prose mt-12 overflow-hidden rounded-3xl bg-[conic-gradient(at_25%_25%,#60a5fa,#34d399,#a78bfa,#fb923c,#f472b6,#60a5fa)] p-[2px] shadow-xl shadow-accent-500/10">
                <div className="rounded-[calc(1.5rem-2px)] bg-white/95 p-6 backdrop-blur-sm dark:bg-ink-950/95 sm:p-8">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <h3 className="font-serif text-xl font-medium text-ink-900 dark:text-ink-100">
                      Ready to try AI Headshot Tools?
                    </h3>
                    <span className="text-xs font-semibold uppercase tracking-widest text-accent-600 dark:text-accent-400">
                      Make the call
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-ink-600 dark:text-ink-400">
                    Four picks, one fits your brief — every button goes to the official site.
                  </p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {HEADSHOT_CARDS.map((t) => (
                      <div
                        key={t.name}
                        className={`flex flex-col gap-2.5 rounded-xl border-2 ${t.colors.border} ${t.colors.bg} p-4 transition-all hover:-translate-y-0.5 hover:shadow-md`}
                      >
                        <a
                          href={t.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: '#fff' }}
                          className={`inline-flex items-center justify-between gap-2 rounded-lg ${t.colors.btn} px-4 py-2.5 text-sm font-bold shadow-sm transition-all active:scale-[0.98]`}
                        >
                          Buy {t.name}
                          <ArrowRight className="h-4 w-4" />
                        </a>
                        <p className={`text-xs font-medium ${t.colors.text}`}>{t.tagline}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="not-prose mt-12">
                <a
                  href={review.url}
                  target="_blank"
                  rel="sponsored noopener noreferrer"
                  className="group mx-auto flex w-full max-w-2xl items-center gap-4 rounded-2xl bg-amber-400 px-6 py-5 text-ink-950 shadow-md shadow-amber-400/30 transition-all hover:bg-accent-600 hover:text-white hover:shadow-lg hover:shadow-accent-600/30 active:scale-[0.98]"
                >
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-white/30">
                    <Rocket className="h-5 w-5" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-base font-bold leading-tight">
                      {review.ctaLabel ? `🚀 ${review.ctaLabel}` : 'Check Latest Price'}
                    </span>
                    <span className="mt-0.5 block text-xs font-medium opacity-90">
                      {review.pricing} &middot; {review.bestFor}
                    </span>
                  </span>
                  <ArrowRight className="h-5 w-5 flex-shrink-0 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            )}
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
