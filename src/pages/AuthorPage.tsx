import { useParams, Link, Navigate } from 'react-router-dom'
import PageHeader from '@/components/PageHeader'
import { getAuthor } from '@/data/content'

const SITE_BASE = 'https://toolisme.com'

export default function AuthorPage() {
  const { slug } = useParams<{ slug: string }>()
  const author = slug ? getAuthor(slug) : undefined
  if (!author) return <Navigate to="/editorial-team" replace />

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.name,
    jobTitle: author.role,
    description: author.about,
    url: `${SITE_BASE}/author/${author.slug}`,
    ...(author.sameAs.length > 0 ? { sameAs: author.sameAs } : {}),
  }

  const howLabel = author.slug === 'holive' ? 'How I work' : 'How I test'
  const socials = author.socials.filter((s) => s.url && s.url !== '#')

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <PageHeader
        eyebrow="Author"
        title={author.name}
        description={author.role}
        breadcrumbs={[
          { label: 'Editorial Team', to: '/editorial-team' },
          { label: author.name },
        ]}
      />

      <section className="container-page py-16">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-5">
            <img
              src={author.avatar}
              alt={author.name}
              className="h-20 w-20 flex-shrink-0 rounded-2xl object-cover"
            />
            <div>
              <h2 className="font-serif text-2xl font-medium tracking-tight text-ink-900 dark:text-ink-100">
                {author.role}
              </h2>
              <p className="mt-1 text-sm text-ink-400">{author.location}</p>
            </div>
          </div>

          <h3 className="mt-10 font-serif text-xl font-medium text-ink-900 dark:text-ink-100">
            About {author.name}
          </h3>
          <p className="mt-3 text-base leading-relaxed text-ink-600 dark:text-ink-300">
            {author.about}
          </p>

          <h3 className="mt-10 font-serif text-xl font-medium text-ink-900 dark:text-ink-100">
            Expertise
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {author.expertise.map((e) => (
              <span
                key={e}
                className="rounded-full bg-ink-100 px-3 py-1 text-xs font-semibold text-ink-600 dark:bg-ink-800 dark:text-ink-300"
              >
                {e}
              </span>
            ))}
          </div>

          <h3 className="mt-10 font-serif text-xl font-medium text-ink-900 dark:text-ink-100">
            {howLabel}
          </h3>
          <p className="mt-3 text-base leading-relaxed text-ink-600 dark:text-ink-300">
            {author.howIWork}
          </p>

          {socials.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target={s.url.startsWith('http') ? '_blank' : undefined}
                  rel={s.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="rounded-full bg-ink-100 px-3 py-1 text-xs font-semibold text-ink-600 transition-colors hover:bg-ink-900 hover:text-white dark:bg-ink-800 dark:text-ink-300 dark:hover:bg-ink-100 dark:hover:text-ink-900"
                >
                  {s.label}
                </a>
              ))}
            </div>
          )}

          <p className="mt-12 border-t border-ink-100 pt-6 text-xs text-ink-400 dark:border-ink-800">
            {author.disclosure}{' '}
            <Link to="/disclosure" className="font-medium text-ink-600 hover:text-ink-900 dark:hover:text-ink-200">
              Read our disclosure
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  )
}
