import { Link, NavLink, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Menu, X, Info, Sun, Moon } from 'lucide-react'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/editorial-team', label: 'Editorial Team' },
  { to: '/methodology', label: 'Methodology' },
  { to: '/contact', label: 'Contact' },
]

function useDarkMode() {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false
    const stored = localStorage.getItem('theme')
    if (stored) return stored === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [dark])

  return [dark, setDark] as const
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const [dark, setDark] = useDarkMode()

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
            <Link to="/disclosure" className="font-semibold text-accent-400 underline underline-offset-2 hover:text-accent-300">
              Learn More
            </Link>
          </p>
        </div>
      </div>

      {/* Main nav */}
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? 'border-b border-ink-200/70 bg-ink-50/85 backdrop-blur-lg dark:border-ink-700/70 dark:bg-ink-950/85'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
      <nav className="container-page flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <img
            src="/logo.png"
            alt="Toolisme"
            className="h-9 w-9 rounded-full object-cover transition-transform group-hover:scale-105"
          />
          <span className="font-serif text-xl font-medium tracking-tight text-ink-900 dark:text-ink-100">
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
                    ? 'bg-ink-900 text-white dark:bg-accent-600 dark:text-white'
                    : 'text-ink-600 hover:bg-ink-100 hover:text-ink-900 dark:text-ink-400 dark:hover:bg-ink-800 dark:hover:text-ink-100'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          {/* Dark mode toggle */}
          <button
            onClick={() => setDark(!dark)}
            className="ml-2 flex h-9 w-9 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-600 transition-all hover:bg-ink-100 hover:text-ink-900 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-300 dark:hover:bg-ink-700 dark:hover:text-ink-100"
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          {/* Dark mode toggle - mobile */}
          <button
            onClick={() => setDark(!dark)}
            className="rounded-lg p-2 text-ink-700 hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800"
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="rounded-lg p-2 text-ink-700 hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="border-t border-ink-200/70 bg-ink-50 md:hidden dark:border-ink-700/70 dark:bg-ink-950">
          <div className="container-page flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                    isActive ? 'bg-ink-900 text-white dark:bg-accent-600 dark:text-white' : 'text-ink-700 hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800'
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
