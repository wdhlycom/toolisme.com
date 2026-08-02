import { Link } from 'react-router-dom'
import { Mail, Rss } from 'lucide-react'

const footerNav = [
  {
    title: 'Explore',
    links: [
      { to: '/', label: 'Home' },
      { to: '/category/software', label: 'Software' },
      { to: '/category/creators', label: 'Creators' },
      { to: '/category/security', label: 'Security' },
      { to: '/category/hardware', label: 'Hardware' },
    ],
  },
  {
    title: 'Company',
    links: [
      { to: '/about', label: 'About Us' },
      { to: '/editorial-team', label: 'Editorial Team' },
      { to: '/contact', label: 'Contact' },
      { to: '/guestbook', label: 'Guestbook' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { to: '/disclosure', label: 'Disclosure' },
      { to: '/privacy', label: 'Privacy Policy' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-ink-200/70 bg-white">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink-900">
                <svg viewBox="0 0 32 32" className="h-5 w-5">
                  <path d="M9 10.5h14M9 16h10M9 21.5h7" stroke="#36abf8" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  <circle cx="23" cy="21.5" r="2.5" fill="#36abf8" />
                </svg>
              </span>
              <span className="font-serif text-xl font-medium tracking-tight text-ink-900">
                Toolisme
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-500">
              We test, review, and filter the best SaaS & AI tools to multiply your
              productivity. Skip the trial and error.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                aria-label="Newsletter"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-100 text-ink-600 transition-colors hover:bg-ink-900 hover:text-white"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="RSS feed"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-100 text-ink-600 transition-colors hover:bg-ink-900 hover:text-white"
              >
                <Rss className="h-4 w-4" />
              </a>
            </div>
          </div>

          {footerNav.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-ink-400">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-ink-600 transition-colors hover:text-ink-900"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-ink-200/70 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-ink-400">
            &copy; {new Date().getFullYear()} Toolisme. All rights reserved.
          </p>
          <p className="text-xs text-ink-400">
            Some links on this site are affiliate links.{' '}
            <Link to="/disclosure" className="font-medium text-ink-600 hover:text-ink-900">
              Read our disclosure
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  )
}
