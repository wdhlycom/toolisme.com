import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

interface PageHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  breadcrumbs?: { label: string; to?: string }[]
}

export default function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumbs,
}: PageHeaderProps) {
  return (
    <header className="relative overflow-hidden border-b border-ink-200/70 bg-white">
      <div className="absolute inset-0 bg-grid mask-fade-b opacity-60" />
      <div className="container-page relative py-16 sm:py-20">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="mb-6 flex items-center gap-1.5 text-xs font-medium text-ink-400">
            <Link to="/" className="hover:text-ink-700">
              Home
            </Link>
            {breadcrumbs.map((crumb) => (
              <span key={crumb.label} className="flex items-center gap-1.5">
                <ChevronRight className="h-3.5 w-3.5" />
                {crumb.to ? (
                  <Link to={crumb.to} className="hover:text-ink-700">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-ink-600">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h1 className="max-w-3xl font-serif text-4xl font-medium tracking-tight text-ink-900 sm:text-5xl text-balance">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-600 text-pretty">
            {description}
          </p>
        )}
      </div>
    </header>
  )
}
