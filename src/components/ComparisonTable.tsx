import { Link } from 'react-router-dom'
import { Star, ArrowRight, ExternalLink } from 'lucide-react'
import { reviews, categories } from '@/data/content'

export default function ComparisonTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] border-collapse">
        <thead>
          <tr className="border-b-2 border-ink-200 text-left">
            <th className="px-4 py-4 text-xs font-semibold uppercase tracking-widest text-ink-500">
              Tool
            </th>
            <th className="px-4 py-4 text-xs font-semibold uppercase tracking-widest text-ink-500">
              Category
            </th>
            <th className="px-4 py-4 text-xs font-semibold uppercase tracking-widest text-ink-500">
              Our Rating
            </th>
            <th className="px-4 py-4 text-xs font-semibold uppercase tracking-widest text-ink-500">
              Starting Price
            </th>
            <th className="px-4 py-4 text-xs font-semibold uppercase tracking-widest text-ink-500">
              Key Advantage
            </th>
            <th className="px-4 py-4 text-right text-xs font-semibold uppercase tracking-widest text-ink-500">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => {
            const category = categories.find((c) => c.slug === review.category)
            return (
              <tr
                key={review.slug}
                className="border-b border-ink-100 transition-colors hover:bg-ink-50/60"
              >
                {/* Tool name */}
                <td className="px-4 py-5">
                  <Link
                    to={`/reviews/${review.slug}`}
                    className="flex items-center gap-3"
                  >
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-ink-900 font-serif text-sm font-medium text-white">
                      {review.name.slice(0, 2)}
                    </span>
                    <span className="font-serif text-base font-medium text-ink-900 hover:text-accent-700">
                      {review.name}
                    </span>
                  </Link>
                </td>

                {/* Category */}
                <td className="px-4 py-5">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${category?.accentClass}`}>
                    {review.subcategory}
                  </span>
                </td>

                {/* Rating */}
                <td className="px-4 py-5">
                  <div className="flex items-center gap-1.5">
                    <Star className="h-4 w-4 fill-sand-400 text-sand-400" />
                    <span className="text-sm font-semibold text-ink-900">
                      {review.rating.toFixed(1)}
                    </span>
                    <span className="text-xs text-ink-400">/5</span>
                  </div>
                </td>

                {/* Starting price */}
                <td className="px-4 py-5">
                  <span className="text-sm font-medium text-ink-700">{review.pricing}</span>
                </td>

                {/* Key advantage */}
                <td className="px-4 py-5">
                  <span className="text-sm text-ink-600">{review.keyAdvantage}</span>
                </td>

                {/* Action */}
                <td className="px-4 py-5">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      to={`/reviews/${review.slug}`}
                      className="inline-flex items-center gap-1 rounded-full bg-ink-100 px-3 py-1.5 text-xs font-semibold text-ink-700 transition-colors hover:bg-ink-200"
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
