import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { Category } from '@/data/content'
import * as Icons from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export default function CategoryCard({ category }: { category: Category }) {
  const Icon = (Icons as unknown as Record<string, LucideIcon>)[category.icon] ?? Icons.Sparkles

  return (
    <Link
      to={`/category/${category.slug}`}
      className="card-hover group relative flex flex-col overflow-hidden p-6"
    >
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl ${category.accentClass}`}
      >
        <Icon className="h-6 w-6" />
      </div>

      <h3 className="mt-5 font-serif text-xl font-medium tracking-tight text-ink-900">
        {category.name}
      </h3>
      <p className="mt-1 text-sm font-medium text-ink-500">{category.tagline}</p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-600">
        {category.description}
      </p>

      <div className="mt-5 flex items-center justify-between border-t border-ink-100 pt-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-ink-400">
          {category.toolCount} tools
        </span>
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-700 transition-colors group-hover:text-accent-900">
          Browse
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  )
}
