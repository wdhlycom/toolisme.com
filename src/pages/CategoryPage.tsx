import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowRight, ChevronRight } from 'lucide-react'
import PageHeader from '@/components/PageHeader'
import ReviewCard from '@/components/ReviewCard'
import { categories, reviews } from '@/data/content'

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>()
  const category = categories.find((c) => c.slug === slug)

  if (!category) return <Navigate to="/" replace />

  const categoryReviews = reviews.filter((r) => r.category === category.slug)

  return (
    <div>
      <PageHeader
        eyebrow={category.tagline}
        title={category.name}
        description={category.description}
        breadcrumbs={[{ label: category.name }]}
      />

      <section className="container-page py-16">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-ink-500">
            {categoryReviews.length} {categoryReviews.length === 1 ? 'review' : 'reviews'} in {category.name}
          </p>
        </div>

        {categoryReviews.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categoryReviews.map((review) => (
              <ReviewCard key={review.slug} review={review} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border-2 border-dashed border-ink-200 bg-ink-50 p-12 text-center">
            <p className="font-serif text-xl font-medium text-ink-700">
              Reviews coming soon
            </p>
            <p className="mt-2 text-sm text-ink-500">
              We are currently testing tools in this category. Check back shortly.
            </p>
            <Link to="/" className="btn-secondary mt-6">
              Back to home
            </Link>
          </div>
        )}
      </section>

      {/* Other categories */}
      <section className="border-t border-ink-200/70 bg-white py-16">
        <div className="container-page">
          <h2 className="section-title">Browse other categories</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {categories
              .filter((c) => c.slug !== category.slug)
              .map((c) => (
                <Link
                  key={c.slug}
                  to={`/category/${c.slug}`}
                  className="card-hover group flex items-center justify-between p-5"
                >
                  <div>
                    <h3 className="font-serif text-lg font-medium text-ink-900">{c.name}</h3>
                    <p className="text-sm text-ink-500">{c.toolCount} tools</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-ink-300 transition-transform group-hover:translate-x-1 group-hover:text-accent-600" />
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  )
}
