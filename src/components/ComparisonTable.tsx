import { Link } from 'react-router-dom'
import { Star, ArrowRight, ExternalLink } from 'lucide-react'
import { reviews, categories, articlePath, type CategorySlug } from '@/data/content'

export default function ComparisonTable({ category }: { category?: CategorySlug }) {
  const rows = category ? reviews.filter((r) => r.category === category) : reviews

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] border-collapse">
        <thead>
          <tr className="border-b-2 border-ink-200 text-left dark:border-ink-700">
            <th className="px-4 py-4 text-xs font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-400">
              Tool
            </th>
            <th className="px-4 py-4 text-xs font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-400">
              Category
            </th>
            <th className="px-4 py-4 text-xs font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-400">
              Our Rating
            </th>
            <th className="px-4 py-4 text-xs font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-400">
              Starting Price
            </th>
            <th className="px-4 py-4 text-xs font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-400">
              Key Advantage
            </th>
            <th className="px-4 py-4 text-right text-xs font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-400">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((review) => {
            const category = categories.find((c) => c.slug === review.category)
            return (
              <tr
                key={review.slug}
                className="border-b border-ink-100 transition-colors hover:bg-ink-50/60 dark:border-ink-800 dark:hover:bg-ink-800/50"
              >
                {/* Tool name */}
                <td className="px-4 py-5">
                  <Link
                    to={articlePath(review)}
                    className="flex items-center gap-3"
                  >
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-ink-900 font-serif text-sm font-medium text-white dark:bg-accent-600">
                      {review.name.slice(0, 2)}
                    </span>
                    <span className="font-serif text-base font-medium text-ink-900 hover:text-accent-700 dark:text-ink-100 dark:hover:text-accent-400">
                      {review.name}
                    </span>
                  </Link>
                </td>

                {/* Category */}
                <td className="px-4 py-5">
                  {category && (
                    <Link
                      to={`/reviews/${review.category}`}
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-opacity hover:opacity-70 ${category.accentClass}`}
                    >
                      {category.name}
                    </Link>
                  )}
                </td>

                {/* Rating */}
                <td className="px-4 py-5">
                  <div className="flex items-center gap-1.5">
                    <Star className="h-4 w-4 fill-sand-400 text-sand-400" />
                    <span className="text-sm font-semibold text-ink-900 dark:text-ink-100">
                      {review.rating.toFixed(1)}
                    </span>
                    <span className="text-xs text-ink-400 dark:text-ink-500">/5</span>
                  </div>
                </td>

                {/* Starting price */}
                <td className="px-4 py-5">
                  <span className="text-sm font-medium text-ink-700 dark:text-ink-300">{review.pricing}</span>
                </td>

                {/* Key advantage */}
                <td className="px-4 py-5">
                  <span className="text-sm text-ink-600 dark:text-ink-300">{review.keyAdvantage}</span>
                </td>

                {/* Action */}
                <td className="px-4 py-5">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      to={articlePath(review)}
                      className="inline-flex items-center gap-1 rounded-full bg-ink-100 px-3 py-1.5 text-xs font-semibold text-ink-700 transition-colors hover:bg-ink-200 dark:bg-ink-800 dark:text-ink-300 dark:hover:bg-ink-700"
                    >
                      Review
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                    <a
                      href={review.url}
                      className="inline-flex items-center gap-1 rounded-full bg-accent-500 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-accent-400"
                    >
                      Visit
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
