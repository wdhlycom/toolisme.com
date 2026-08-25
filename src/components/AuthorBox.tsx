import type { AuthorDetail } from '@/data/content'
import { shortBio } from '@/utils/authorBio'

export default function AuthorBox({ author }: { author: AuthorDetail }) {
  const socials = author.socials.filter((s) => s.url && s.url !== '#')

  return (
    <div className="not-prose mt-12 rounded-2xl border border-ink-200 bg-white p-6 shadow-sm dark:border-ink-700 dark:bg-ink-900">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <img
          src={author.avatar}
          alt={author.name}
          className="h-16 w-16 flex-shrink-0 rounded-full object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
            <h3 className="font-serif text-lg font-semibold text-ink-900 dark:text-ink-100">
              {author.name}
            </h3>
            <span className="text-xs font-medium text-ink-400 dark:text-ink-500">{author.role}</span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
            {shortBio(author.about)}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            <a
              href={`/author/${author.slug}`}
              className="font-semibold text-accent-700 hover:text-accent-900 dark:text-accent-400 dark:hover:text-accent-300"
            >
              View full bio →
            </a>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-ink-500 transition-colors hover:text-ink-900 dark:text-ink-400 dark:hover:text-ink-200"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
