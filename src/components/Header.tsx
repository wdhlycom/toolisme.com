import { Link, NavLink, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Menu, X, Info } from 'lucide-react'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/editorial-team', label: 'Editorial Team' },
  { to: '/guestbook', label: 'Guestbook' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <header className="sticky top-0 z-50">
      {/* Affiliate disclosure strip */}
      <div className="bg-ink-900 text-ink-300">
        <div className="container-page flex items-center justify-center gap-2 py-1.5 text-center">
          <Info className="hidden h-3 w-3 flex-shrink-0 text-ink-400 sm:block" />
          <p className="text-[11px] leading-tight tracking-wide">
            <span className="font-semibold text-ink-200">Disclosure:</span> We are reader-supported. When you buy through links on our site, we may earn an affiliate commission at no extra cost to you.{' '}
            <Link to="/disclosure" className="font-semibold text-accent-400 underline-offset-2 hover:text-accent-300 hover:underline">
              Learn More
            </Link>
          </p>
        </div>
      </div>

      {/* Main nav */}
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? 'border-b border-ink-200/70 bg-ink-50/85 backdrop-blur-lg'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
      <nav className="container-page flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink-900 transition-transform group-hover:scale-105">
            <svg viewBox="0 0 32 32" className="h-5 w-5">
              <path d="M9 10.5h14M9 16h10M9 21.5h7" stroke="#36abf8" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <circle cx="23" cy="21.5" r="2.5" fill="#36abf8" />
            </svg>
          </span>
          <span className="font-serif text-xl font-medium tracking-tight text-ink-900">
            Toolisme
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-ink-900 text-white'
                    : 'text-ink-600 hover:bg-ink-100 hover:text-ink-900'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="rounded-lg p-2 text-ink-700 hover:bg-ink-100 md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-ink-200/70 bg-ink-50 md:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                    isActive ? 'bg-ink-900 text-white' : 'text-ink-700 hover:bg-ink-100'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
      </div>
    </header>
  )
}
