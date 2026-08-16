import { Link } from 'react-router-dom'
import { Mail, Rss } from 'lucide-react'

const footerNav = [
  {
    title: 'Explore',
    links: [
      { to: '/', label: 'Home' },
      { to: '/reviews/software', label: 'Software' },
      { to: '/reviews/creators', label: 'Creators' },
      { to: '/reviews/security', label: 'Security' },
      { to: '/reviews/hardware', label: 'Hardware' },
    ],
  },
  {
    title: 'Company',
    links: [
      { to: '/about', label: 'About Us' },
      { to: '/editorial-team', label: 'Editorial Team' },
      { to: '/methodology', label: 'Methodology' },
      { to: '/about#contact', label: 'Contact' },
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
    <footer className="border-t border-white/10 bg-ink-950">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5">
              <img
                src="/logo.png"
                alt="Toolisme"
                className="h-9 w-9 rounded-full object-cover"
              />
              <span className="font-serif text-xl font-medium tracking-tight text-white">
                Toolisme
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-300">
              We test, review, and filter the best SaaS & AI tools to multiply your
              productivity. Skip the trial and error.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                aria-label="Newsletter"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-ink-200 transition-colors hover:bg-white/20 hover:text-white"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="RSS feed"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-ink-200 transition-colors hover:bg-white/20 hover:text-white"
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
                      className="text-sm text-ink-300 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-ink-400">
            &copy; {new Date().getFullYear()} Toolisme. All rights reserved.
          </p>
          <p className="text-xs text-ink-400">
            Some links on this site are affiliate links.{' '}
            <Link to="/disclosure" className="font-medium text-ink-300 hover:text-white">
              Read our disclosure
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  )
}
