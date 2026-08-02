import { Link } from 'react-router-dom'
import { ArrowRight, Star, Clock, Award } from 'lucide-react'
import type { ToolReview } from '@/data/content'
import { categories } from '@/data/content'

const categoryMap = Object.fromEntries(categories.map((c) => [c.slug, c]))

export default function ReviewCard({ review }: { review: ToolReview }) {
  const cat = categoryMap[review.category]

  return (
    <article className="card-hover group flex flex-col overflow-hidden">
      <div className="flex items-start justify-between gap-3 p-6 pb-0">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${cat.accentClass}`}
          >
            {cat.name}
          </span>
          {review.editorsPick && (
            <span className="inline-flex items-center gap-1 rounded-full bg-ink-900 px-2.5 py-1 text-xs font-semibold text-white">
              <Award className="h-3 w-3" />
              Editor's Pick
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 text-sm font-semibold text-ink-700">
          <Star className="h-4 w-4 fill-sand-400 text-sand-400" />
          {review.rating.toFixed(1)}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-medium text-ink-400">{review.subcategory}</p>
        <h3 className="mt-1 font-serif text-xl font-medium tracking-tight text-ink-900">
          {review.name}
        </h3>
        <p className="mt-1.5 text-sm font-medium text-ink-500">{review.tagline}</p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-600 line-clamp-3">
          {review.summary}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-ink-100 pt-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-xs font-medium text-ink-400">
              <Clock className="h-3.5 w-3.5" />
              {review.readTime} min read
            </span>
            <span className="text-sm font-semibold text-ink-700">{review.pricing}</span>
          </div>
          <Link
            to={`/reviews/${review.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-700 transition-colors hover:text-accent-900"
          >
            Read review
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  )
}
