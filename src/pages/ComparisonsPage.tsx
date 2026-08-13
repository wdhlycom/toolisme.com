import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowRight, BarChart3 } from 'lucide-react'
import PageHeader from '@/components/PageHeader'
import ComparisonTable from '@/components/ComparisonTable'
import ReviewCard from '@/components/ReviewCard'
import { categories, comparisons } from '@/data/content'

export default function ComparisonsPage() {
  const { slug } = useParams<{ slug: string }>()
  const category = categories.find((c) => c.slug === slug)

  if (!category) return <Navigate to="/" replace />

  const categoryComparisons = comparisons.filter(
    (r) => r.category === category.slug,
  )

  return (
    <div>
      <PageHeader
        eyebrow="Comparison"
        title={`${category.name} tools compared`}
        description={`Our ${category.name} reviews side by side — ratings, pricing, and key advantages, so you can shortlist in minutes instead of tabs.`}
        breadcrumbs={[
          { label: 'Comparisons', to: '/' },
          { label: category.name, to: `/comparisons/${category.slug}` },
        ]}
      />

      <section className="container-page py-14">
        {/* Multi-tool comparison articles */}
        {categoryComparisons.length > 0 && (
          <div className="mb-14">
            <p className="eyebrow mb-3 flex items-center gap-1.5">
              <BarChart3 className="h-3.5 w-3.5" />
              Multi-tool comparisons
            </p>
            <h2 className="section-title">Side-by-side comparisons</h2>
            <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">
              In-depth articles that put multiple {category.name.toLowerCase()} tools head to head.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {categoryComparisons.map((review) => (
                <ReviewCard key={review.slug} review={review} />
              ))}
            </div>
          </div>
        )}

        {/* Individual tool comparison table */}
        <div className="overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-sm dark:border-ink-700 dark:bg-ink-900 dark:shadow-none">
          <ComparisonTable category={category.slug} />
        </div>
        <p className="mt-3 text-right text-xs text-ink-400 dark:text-ink-500">
          Swipe horizontally on mobile to see all columns &rarr;
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-ink-500 dark:text-ink-400">Compare other categories:</span>
          {categories
            .filter((c) => c.slug !== category.slug)
            .map((c) => (
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
      </section>
    </div>
  )
}
