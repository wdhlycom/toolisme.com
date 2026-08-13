import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Search, Star, Clock, TrendingUp, ShieldCheck, Hand, CalendarClock, BadgeCheck, BarChart3, MonitorSmartphone, Clapperboard, Cpu, type LucideIcon } from 'lucide-react'
import CategoryCard from '@/components/CategoryCard'
import ReviewCard from '@/components/ReviewCard'
import ComparisonTable from '@/components/ComparisonTable'
import { categories, reviews, editorialValues, heroTags, reviewPath, type CategorySlug } from '@/data/content'
import { guides } from '@/content/guides'

const sectionJumpCls =
  'inline-flex items-center gap-1 rounded-full bg-amber-400 px-4 py-1.5 text-sm font-semibold text-ink-900 transition-colors hover:bg-accent-600 hover:text-white dark:bg-amber-400/90 dark:text-ink-950 dark:hover:bg-accent-500 dark:hover:text-white'

export default function HomePage() {
  const [search, setSearch] = useState('')

  const filteredReviews = useMemo(() => {
    if (!search.trim()) return null
    const q = search.toLowerCase()
    return reviews.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.tagline.toLowerCase().includes(q) ||
        r.subcategory.toLowerCase().includes(q) ||
        r.summary.toLowerCase().includes(q),
    )
  }, [search])

  const topPicks = reviews.filter((r) => r.editorsPick).slice(0, 3)
  const recentReviews = [...reviews].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )

  const categoryIcons: Record<CategorySlug, LucideIcon> = {
    software: MonitorSmartphone,
    creators: Clapperboard,
    security: ShieldCheck,
    hardware: Cpu,
  }

  const categorySubtitles: Record<CategorySlug, string> = {
    software: 'Battle-tested apps that eliminate manual tasks so you can focus on building.',
    creators: 'Turn raw ideas into polished videos and podcasts faster with top-rated creative tools.',
    security: 'Keep your connection encrypted, protect your data, and safeguard your online identity.',
    hardware: 'High-performance gear and workstations built for professionals spending long hours at the desk.',
  }

  // Each how-to-choose card surfaces up to 3 guides tagged with its category slug.
  const categoryGuides = categories
    .filter((c) => c.slug in categoryIcons)
    .map((c) => ({
      slug: c.slug,
      name: c.name,
      tagline: c.tagline,
      accentClass: c.accentClass,
      icon: categoryIcons[c.slug],
      guides: guides.filter((g) => g.tags.includes(c.slug)).slice(0, 3),
    }))

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white dark:bg-ink-950">
        <div className="absolute inset-0 bg-grid mask-fade-b opacity-50" />
        <div className="container-page relative py-10 sm:py-12 lg:py-16">
          {/* Soft glow behind the card — deepens the raised feel */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-6 h-48 w-[85%] -translate-x-1/2 rounded-full bg-accent-400/10 blur-3xl dark:bg-accent-500/10"
          />

          {/* Unified hero trust card — embossed */}
          <div className="mx-auto max-w-5xl rounded-3xl border border-ink-200/80 bg-gradient-to-b from-white via-white to-ink-50/80 p-7 shadow-[0_1px_0_rgba(255,255,255,0.95)_inset,0_-1px_0_rgba(15,23,42,0.05)_inset,0_24px_60px_-15px_rgba(15,23,42,0.35),0_8px_20px_-8px_rgba(15,23,42,0.18)] ring-1 ring-white/60 dark:border-ink-700/80 dark:from-ink-900 dark:via-ink-900 dark:to-ink-950/90 dark:shadow-[0_1px_0_rgba(255,255,255,0.10)_inset,0_-1px_0_rgba(0,0,0,0.5)_inset,0_24px_60px_-15px_rgba(0,0,0,0.75),0_8px_20px_-8px_rgba(0,0,0,0.5)] dark:ring-white/5 sm:p-9 lg:max-w-6xl lg:p-12">
            <div className="mx-auto max-w-5xl text-center lg:max-w-7xl">
              <h1 className="-mt-2 pb-3 leading-[1.3] font-serif text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl bg-gradient-to-r from-ink-900 via-accent-700 to-accent-500 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_200%] dark:from-ink-100 dark:via-accent-400 dark:to-accent-300">
                Smart minds leverage great tools.
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-ink-600 text-pretty dark:text-ink-300">
                We test, review, and filter the best SaaS &amp; AI tools to multiply your
                productivity. Skip the trial and error.
              </p>

              {/* Local search */}
              <div className="mx-auto mt-7 max-w-xl">
                <div className="flex items-center gap-2 rounded-full bg-white p-2 shadow-lg shadow-ink-900/5 ring-1 ring-ink-200 dark:bg-ink-800 dark:ring-ink-700">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-ink-100 text-ink-500 dark:bg-ink-700 dark:text-ink-400">
                    <Search className="h-5 w-5" />
                  </div>
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search reviews..."
                    className="flex-1 bg-transparent px-2 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none dark:text-ink-100 dark:placeholder:text-ink-500"
                  />
                </div>

                {/* Popular tags */}
                <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                  <span className="text-xs font-medium text-ink-400 dark:text-ink-500">Popular:</span>
                  {heroTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSearch(tag)}
                      className="rounded-full bg-ink-100 px-3 py-1 text-xs font-semibold text-ink-600 transition-colors hover:bg-ink-900 hover:text-white dark:bg-ink-800 dark:text-ink-300 dark:hover:bg-accent-600 dark:hover:text-white"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Trust stats */}
            <div className="mx-auto mt-9 grid max-w-4xl grid-cols-2 gap-6 border-t border-ink-200/60 pt-7 sm:grid-cols-4 dark:border-ink-700/60">
              {[
                { value: String(reviews.length), label: 'Tools tested' },
                { value: '4', label: 'Categories' },
                { value: '100%', label: 'Hands-on' },
                { value: '0', label: 'Paid reviews' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-serif text-3xl font-medium text-ink-900 dark:text-ink-100 sm:text-4xl">{stat.value}</p>
                  <p className="mt-1 text-sm font-medium text-ink-500 dark:text-ink-400">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Trust signals — elevated mini-cards with golden highlights */}
            <div className="mx-auto mt-7 grid max-w-4xl grid-cols-2 gap-3 border-t border-ink-200/60 pt-7 sm:grid-cols-4 dark:border-ink-700/60">
              {[
                { icon: ShieldCheck, title: '100% Independent', subtitle: 'No vendor influence' },
                { icon: Hand, title: 'Hands-On Testing', subtitle: 'Real workflows' },
                { icon: CalendarClock, title: 'Updated 2026', subtitle: 'Current pricing' },
                { icon: BadgeCheck, title: 'No Paid Rankings', subtitle: 'Never for sale' },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-center gap-3 rounded-xl border border-ink-200/70 bg-white p-3 shadow-sm ring-1 ring-ink-100/60 dark:border-ink-700/70 dark:bg-ink-900/80 dark:ring-ink-800/60"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent-400 to-accent-600 text-white shadow-md shadow-accent-500/25 dark:from-accent-500 dark:to-accent-700">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-bold leading-tight text-amber-600 dark:text-amber-400">{item.title}</p>
                    <p className="mt-0.5 text-xs font-medium text-sand-700 dark:text-sand-300">{item.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Search results */}
      {filteredReviews && (
        <section className="container-page py-16">
          <h2 className="section-title">
            {filteredReviews.length > 0
              ? `Results for "${search}"`
              : `No results for "${search}"`}
          </h2>
          {filteredReviews.length > 0 ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredReviews.map((review) => (
                <ReviewCard key={review.slug} review={review} />
              ))}
            </div>
          ) : (
            <p className="mt-6 text-ink-500 dark:text-ink-400">
              Try a different keyword, or{' '}
              <button
                onClick={() => setSearch('')}
                className="font-semibold text-accent-700 hover:text-accent-900 dark:text-accent-400 dark:hover:text-accent-300"
              >
                clear the search
              </button>
              .
            </p>
          )}
        </section>
      )}

      {/* Top Picks */}
      {!filteredReviews && (
        <section className="container-page py-20">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-3 flex items-center gap-1.5">
                <Star className="h-3.5 w-3.5 fill-current" />
                Top Picks
              </p>
              <h2 className="section-title text-red-600 dark:text-red-400">Editor's picks</h2>
            </div>
            <Link
              to="/reviews"
              className={sectionJumpCls}
            >
              All reviews
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {topPicks.map((review) => (
              <ReviewCard key={review.slug} review={review} />
            ))}
          </div>
        </section>
      )}

      {/* Top Tools Comparison Table */}
      {!filteredReviews && (
        <section className="border-y border-ink-200/70 bg-white py-20 dark:border-ink-700/70 dark:bg-ink-950">
          <div className="container-page">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="eyebrow mb-3 flex items-center gap-1.5">
                  <BarChart3 className="h-3.5 w-3.5" />
                  At a Glance
                </p>
                <h2 className="section-title text-red-600 dark:text-red-400">Top tools comparison</h2>
                <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">
                  Compare our top 5 reviewed tools side by side — ratings, pricing, and key advantages.
                </p>
              </div>
              <Link
                to="/comparisons"
                className={sectionJumpCls}
              >
                All comparisons
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="mt-8 overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-sm dark:border-ink-700 dark:bg-ink-900 dark:shadow-none">
              <ComparisonTable />
            </div>
            <p className="mt-3 text-right text-xs text-ink-400 dark:text-ink-500">
              Swipe horizontally on mobile to see all columns &rarr;
            </p>

            {/* Per-category comparison pages */}
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-ink-500 dark:text-ink-400">Per-category comparisons:</span>
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  to={`/comparisons/${c.slug}`}
                  className="inline-flex items-center gap-1 rounded-full bg-ink-100 px-4 py-1.5 text-sm font-semibold text-ink-600 transition-colors hover:bg-ink-900 hover:text-white dark:bg-ink-800 dark:text-ink-300 dark:hover:bg-accent-600 dark:hover:text-white"
                >
                  {c.name}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How to Choose — per-category guides */}
      {!filteredReviews && (
        <section className="container-page py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-3 flex items-center gap-1.5">
                <BarChart3 className="h-3.5 w-3.5" />
                Buying guide
              </p>
              <h2 className="section-title text-red-600 dark:text-red-400">How to choose the right tool</h2>
              <p className="mt-3 max-w-xl text-sm text-ink-500 dark:text-ink-400">
                One framework doesn't fit every category. Pick your lane — the guides below are
                tagged by category and updated as we publish.
              </p>
            </div>
            <Link
              to="/guides"
              className={sectionJumpCls}
            >
              All buyer's guides
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categoryGuides.map((card) => (
              <Link
                key={card.slug}
                to={`/guides?tag=${card.slug}`}
                className="group flex flex-col rounded-2xl border border-ink-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent-300 hover:shadow-lg dark:border-ink-700 dark:bg-ink-900 dark:shadow-none dark:hover:border-accent-700"
              >
                <div className="flex items-center gap-3">
                  <div className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl ${card.accentClass}`}>
                    <card.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-ink-400">{card.tagline}</p>
                    <h3 className="font-serif text-lg font-semibold text-ink-900 dark:text-ink-100">{card.name}</h3>
                  </div>
                </div>

                <div className="mt-5 flex-1 space-y-2">
                  {card.guides.length > 0 ? (
                    card.guides.map((g) => (
                      <div
                        key={g.slug}
                        className="flex items-start gap-2 rounded-lg border border-ink-100 bg-ink-50/70 px-3 py-2 dark:border-ink-800 dark:bg-ink-800/50"
                      >
                        <ArrowRight className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-accent-600" />
                        <span className="text-sm font-medium leading-snug text-ink-800 group-hover:text-accent-700 dark:text-ink-100 dark:group-hover:text-accent-400">
                          {g.title}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="rounded-lg border border-dashed border-ink-200 px-3 py-3 text-center text-sm text-ink-400 dark:border-ink-700">
                      Guides coming soon
                    </p>
                  )}
                </div>

                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-700 group-hover:text-accent-900 dark:text-accent-400 dark:group-hover:text-accent-300">
                  Browse {card.name}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Category blocks */}
      {!filteredReviews &&
        categories.map((category) => {
          const catReviews = reviews.filter((r) => r.category === category.slug)
          if (catReviews.length === 0) return null

          return (
            <section
              key={category.slug}
              className="bg-white py-16 dark:bg-ink-950"
            >
              <div className="container-page">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="eyebrow mb-2">{category.tagline}</p>
                    <h2 className="section-title text-red-600 dark:text-red-400">{category.name}</h2>
                    <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">{categorySubtitles[category.slug]}</p>
                  </div>
                  <Link
                    to={`/reviews/${category.slug}`}
                    className={sectionJumpCls}
                  >
                    View all
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {catReviews.slice(0, 3).map((review) => (
                    <ReviewCard key={review.slug} review={review} />
                  ))}
                </div>
              </div>
            </section>
          )
        })}

      {/* Editorial values strip */}
      {!filteredReviews && (
        <section className="border-y border-ink-200/70 bg-ink-900 py-16 text-white dark:border-ink-700/70">
          <div className="container-page">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent-400">
                Why trust us
              </p>
              <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-white sm:text-4xl">
                Reviews you can actually trust
              </h2>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {editorialValues.map((value) => (
                <div key={value.title} className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                    <ShieldCheck className="h-6 w-6 text-accent-400" />
                  </div>
                  <h3 className="mt-4 font-serif text-lg font-medium text-white">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-300">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest reviews timeline */}
      {!filteredReviews && (
        <section className="container-page py-20">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-3 flex items-center gap-1.5">
                <TrendingUp className="h-3.5 w-3.5" />
                Latest
              </p>
              <h2 className="section-title">Latest reviews</h2>
            </div>
          </div>

          <div className="mt-10 space-y-1">
            {recentReviews.map((review, i) => (
              <Link
                key={review.slug}
                to={reviewPath(review)}
                className="group flex items-center gap-4 border-b border-ink-100 py-5 transition-colors hover:bg-ink-50/50 dark:border-ink-800 dark:hover:bg-ink-900/50"
              >
                <span className="hidden w-8 font-serif text-2xl font-medium text-ink-300 sm:block dark:text-ink-600">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      categories.find((c) => c.slug === review.category)?.accentClass
                    }`}>
                      {review.subcategory}
                    </span>
                    {review.editorsPick && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-ink-900 px-2 py-0.5 text-xs font-semibold text-white dark:bg-accent-600">
                        <Star className="h-2.5 w-2.5 fill-current" />
                        Pick
                      </span>
                    )}
                  </div>
                  <h3 className="mt-1.5 font-serif text-lg font-medium tracking-tight text-ink-900 group-hover:text-accent-700 dark:text-ink-100 dark:group-hover:text-accent-400">
                    {review.name} Review 2026
                  </h3>
                  <p className="mt-0.5 truncate text-sm text-ink-500 dark:text-ink-400">{review.tagline}</p>
                </div>
                <div className="hidden flex-shrink-0 items-center gap-4 sm:flex">
                  <span className="flex items-center gap-1 text-xs font-medium text-ink-400 dark:text-ink-500">
                    <Clock className="h-3.5 w-3.5" />
                    {review.readTime} min
                  </span>
                  <span className="flex items-center gap-1 text-sm font-semibold text-ink-700 dark:text-ink-300">
                    <Star className="h-4 w-4 fill-sand-400 text-sand-400" />
                    {review.rating.toFixed(1)}
                  </span>
                </div>
                <ArrowRight className="h-5 w-5 flex-shrink-0 text-ink-300 transition-transform group-hover:translate-x-1 group-hover:text-accent-600 dark:text-ink-600" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Browse categories */}
      {!filteredReviews && (
        <section className="border-t border-ink-200/70 bg-white py-20 dark:border-ink-700/70 dark:bg-ink-950">
          <div className="container-page">
            <p className="eyebrow mb-3 text-center">Browse by category</p>
            <h2 className="section-title text-center">Explore all categories</h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {categories.map((category) => (
                <CategoryCard key={category.slug} category={category} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
