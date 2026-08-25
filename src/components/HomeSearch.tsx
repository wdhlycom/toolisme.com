import { useState, useMemo } from 'react'
import { Search, ArrowRight } from 'lucide-react'
import ReviewCard from '@/components/ReviewCard'
import type { ToolReview } from '@/data/content'
import type { Guide } from '@/content/guides'

interface HomeSearchProps {
  articles: ToolReview[]
  guides: Guide[]
}

export default function HomeSearch({ articles, guides }: HomeSearchProps) {
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    if (!search.trim()) return null
    const q = search.toLowerCase()
    const reviews = articles.filter(
      (r) =>
        (r.name || '').toLowerCase().includes(q) ||
        (r.tagline || '').toLowerCase().includes(q) ||
        (r.subcategory || '').toLowerCase().includes(q) ||
        (r.summary || '').toLowerCase().includes(q),
    )
    const matchedGuides = guides.filter(
      (g) =>
        (g.title || '').toLowerCase().includes(q) ||
        (g.summary || '').toLowerCase().includes(q) ||
        (g.tags || []).some((t) => (t || '').toLowerCase().includes(q)),
    )
    return { reviews, guides: matchedGuides }
  }, [search, articles, guides])

  return (
    <div>
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

        {filtered && (
          <div className="mt-6">
            <h2 className="section-title">
              {filtered.reviews.length + filtered.guides.length > 0
                ? `Results for "${search}"`
                : `No results for "${search}"`}
            </h2>

            {filtered.guides.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-400">
                  Guides
                </h3>
                <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {filtered.guides.map((g) => (
                    <a
                      key={g.slug}
                      href={`/guides/${g.slug}`}
                      className="card-hover group flex flex-col gap-1 p-5"
                    >
                      <h4 className="font-serif text-lg font-medium tracking-tight text-ink-900 group-hover:text-accent-700 dark:text-ink-100 dark:group-hover:text-accent-400">
                        {g.title}
                      </h4>
                      <p className="text-sm leading-relaxed text-ink-600 line-clamp-2 dark:text-ink-400">
                        {g.summary}
                      </p>
                      <span className="mt-1 text-xs font-medium text-ink-400">{g.readTime} min read</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {filtered.reviews.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-400">
                  Reviews &amp; comparisons
                </h3>
                <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filtered.reviews.map((review) => (
                    <ReviewCard key={review.slug} review={review} />
                  ))}
                </div>
              </div>
            )}

            {filtered.reviews.length === 0 && filtered.guides.length === 0 && (
              <p className="mt-6 text-ink-500 dark:text-ink-400">
                No results for "{search}" — try a different keyword, or clear the search.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
