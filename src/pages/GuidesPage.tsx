import { useSearchParams, Link } from 'react-router-dom'
import { ArrowRight, Clock, Tag } from 'lucide-react'
import PageHeader from '@/components/PageHeader'
import { guides } from '@/content/guides'
import { categories } from '@/data/content'

export default function GuidesPage() {
  const [searchParams] = useSearchParams()
  const activeTag = searchParams.get('tag') ?? ''

  const sorted = [...guides]
    .filter((g) => (activeTag ? g.tags.includes(activeTag) : true))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const sections = categories
    .map((c) => ({
      category: c,
      items: sorted.filter((g) => g.tags.includes(c.slug)),
    }))
    .filter((s) => s.items.length > 0)

  return (
    <div>
      <PageHeader
        eyebrow="Guides"
        title="Buyer's guides"
        description="Selection methods we use before any tool earns a spot on Toolisme — broken down by category so you can pick your lane and follow the steps."
        breadcrumbs={[{ label: 'Guides', to: '/guides' }]}
      />

      <section className="container-page py-14">
        {/* Category filter chips */}
        <div className="flex flex-wrap items-center gap-2">
          <Link
            to="/guides"
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
              !activeTag
                ? 'bg-ink-900 text-white dark:bg-accent-600'
                : 'bg-ink-100 text-ink-600 hover:bg-ink-200 dark:bg-ink-800 dark:text-ink-300 dark:hover:bg-ink-700'
            }`}
          >
            All guides
          </Link>
          {categories.map((c) => (
            <Link
              key={c.slug}
              to={`/guides?tag=${c.slug}`}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                activeTag === c.slug
                  ? 'bg-ink-900 text-white dark:bg-accent-600'
                  : 'bg-ink-100 text-ink-600 hover:bg-ink-200 dark:bg-ink-800 dark:text-ink-300 dark:hover:bg-ink-700'
              }`}
            >
              {c.name}
            </Link>
          ))}
        </div>

        {sections.length > 0 ? (
          <div className="mt-12 space-y-14">
            {sections.map(({ category, items }) => (
              <div key={category.slug}>
                <div className="flex items-center gap-3">
                  <h2 className="font-serif text-2xl font-medium tracking-tight text-ink-900 dark:text-ink-100">
                    {category.name}
                  </h2>
                  <span className="h-px flex-1 bg-ink-200 dark:bg-ink-800" />
                  <span className="text-xs font-medium text-ink-400 dark:text-ink-500">
                    {items.length} {items.length === 1 ? 'guide' : 'guides'}
                  </span>
                </div>

                <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((guide) => (
                    <Link
                      key={guide.slug}
                      to={`/guides/${guide.slug}`}
                      className="card-hover group flex flex-col p-6"
                    >
                      <div className="flex flex-wrap gap-1.5">
                        {guide.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                              categories.find((c) => c.slug === tag)?.accentClass
                            }`}
                          >
                            {categories.find((c) => c.slug === tag)?.name ?? tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="mt-3 font-serif text-lg font-medium tracking-tight text-ink-900 group-hover:text-accent-700 dark:text-ink-100 dark:group-hover:text-accent-400">
                        {guide.title}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600 line-clamp-3 dark:text-ink-300">
                        {guide.summary}
                      </p>
                      <div className="mt-5 flex items-center justify-between border-t border-ink-100 pt-4 dark:border-ink-800">
                        <span className="flex items-center gap-1 text-xs font-medium text-ink-400 dark:text-ink-500">
                          <Clock className="h-3.5 w-3.5" />
                          {guide.readTime} min read
                        </span>
                        <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent-700 group-hover:text-accent-900 dark:text-accent-400 dark:group-hover:text-accent-300">
                          Read guide
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-2xl border-2 border-dashed border-ink-200 bg-ink-50 p-12 text-center dark:border-ink-700 dark:bg-ink-900">
            <Tag className="mx-auto h-8 w-8 text-ink-300 dark:text-ink-600" />
            <p className="mt-3 font-serif text-xl font-medium text-ink-700 dark:text-ink-100">
              No guides here yet
            </p>
            <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">
              We are writing guides for this category. Check back shortly.
            </p>
          </div>
        )}
      </section>
    </div>
  )
}
