import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Search, Star, Clock, TrendingUp, ShieldCheck, Hand, CalendarClock, BadgeCheck, BarChart3 } from 'lucide-react'
import CategoryCard from '@/components/CategoryCard'
import ReviewCard from '@/components/ReviewCard'
import ComparisonTable from '@/components/ComparisonTable'
import { categories, reviews, editorialValues, heroTags } from '@/data/content'

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

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white dark:bg-ink-950">
        <div className="absolute inset-0 bg-grid mask-fade-b opacity-50" />
        <div className="container-page relative py-10 sm:py-12 lg:py-16">
          {/* Unified hero trust card */}
          <div className="mx-auto max-w-5xl rounded-3xl border border-ink-200/70 bg-ink-50/70 p-7 shadow-sm dark:border-ink-700/70 dark:bg-ink-900/50 sm:p-9 lg:max-w-6xl lg:p-12">
            <div className="mx-auto max-w-5xl text-center lg:max-w-7xl">
              <h1 className="pb-1 leading-[1.2] font-serif text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl bg-gradient-to-r from-ink-900 via-accent-700 to-accent-500 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_200%] dark:from-ink-100 dark:via-accent-400 dark:to-accent-300">
                Smart minds leverage great tools.
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink-600 text-pretty dark:text-ink-300">
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

            {/* Trust signals */}
            <div className="mx-auto mt-7 grid max-w-4xl grid-cols-2 gap-4 border-t border-ink-200/60 pt-7 sm:grid-cols-4 dark:border-ink-700/60">
              {[
                { icon: ShieldCheck, title: '100% Independent', subtitle: 'No vendor influence' },
                { icon: Hand, title: 'Hands-On Testing', subtitle: 'Real workflows' },
                { icon: CalendarClock, title: 'Updated 2026', subtitle: 'Current pricing' },
                { icon: BadgeCheck, title: 'No Paid Rankings', subtitle: 'Never for sale' },
              ].map((item) => (
                <div key={item.title} className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-accent-50 text-accent-700 dark:bg-accent-950 dark:text-accent-400">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold leading-tight text-ink-900 dark:text-ink-100">{item.title}</p>
                    <p className="mt-0.5 text-[11px] text-ink-500 dark:text-ink-400">{item.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust signals now integrated into the Hero card above */}

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
              <h2 className="section-title">Editor's picks</h2>
            </div>
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
                <h2 className="section-title">Top tools comparison</h2>
                <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">
                  Compare our top 5 reviewed tools side by side — ratings, pricing, and key advantages.
                </p>
              </div>
            </div>
            <div className="mt-8 overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-sm dark:border-ink-700 dark:bg-ink-900 dark:shadow-none">
              <ComparisonTable />
            </div>
            <p className="mt-3 text-right text-xs text-ink-400 dark:text-ink-500">
              Swipe horizontally on mobile to see all columns &rarr;
            </p>
          </div>
        </section>
      )}

      {/* How to Choose */}
      {!filteredReviews && (
        <section className="container-page py-16">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            {/* Left: buying dimensions */}
            <div>
              <p className="eyebrow mb-3 flex items-center gap-1.5">
                <BarChart3 className="h-3.5 w-3.5" />
                Buying guide
              </p>
              <h2 className="section-title">How to choose the right tool</h2>
              <p className="mt-3 max-w-md text-sm text-ink-500 dark:text-ink-400">
                Four dimensions we weigh before any tool earns a spot on Toolisme.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  { icon: BadgeCheck, title: 'Pricing & Value', desc: 'Real cost versus the work it actually replaces — not the sticker price.' },
                  { icon: Hand, title: 'Workflow Fit', desc: 'Does it slot into your stack, or force you to rebuild around it?' },
                  { icon: TrendingUp, title: 'Long-term Scalability', desc: 'Stays useful as your team and needs grow, not just on day one.' },
                  { icon: ShieldCheck, title: 'Trust & Support', desc: 'Transparent data handling and help that shows up when needed.' },
                ].map((dim) => (
                  <div key={dim.title} className="flex items-start gap-3.5">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-accent-50 text-accent-700 dark:bg-accent-950 dark:text-accent-400">
                      <dim.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-base font-semibold text-ink-900 dark:text-ink-100">{dim.title}</h3>
                      <p className="mt-0.5 text-sm leading-relaxed text-ink-500 dark:text-ink-400">{dim.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: guide CTA */}
            <div className="flex h-full items-center">
              <div className="w-full rounded-2xl border border-ink-200 bg-white p-8 shadow-sm dark:border-ink-700 dark:bg-ink-900 dark:shadow-none">
                <p className="text-xs font-semibold uppercase tracking-widest text-accent-600 dark:text-accent-400">
                  The full playbook
                </p>
                <h3 className="mt-3 font-serif text-2xl font-medium tracking-tight text-ink-900 dark:text-ink-100">
                  Read our complete buyer's guide
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-500 dark:text-ink-400">
                  A step-by-step framework for picking tools that pay for themselves — with the exact scorecard we use on every review.
                </p>
                <Link
                  to="/methodology"
                  className="btn-primary mt-6 inline-flex items-center gap-2"
                >
                  Read the full guide
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
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
                    <h2 className="section-title">{category.name}</h2>
                  </div>
                  <Link
                    to={`/category/${category.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-700 hover:text-accent-900 dark:text-accent-400 dark:hover:text-accent-300"
                  >
                    View all
                    <ArrowRight className="h-4 w-4" />
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
                to={`/reviews/${review.slug}`}
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
