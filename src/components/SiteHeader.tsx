import { useEffect, useRef, useState } from 'react'
import { Menu, X, Info, Sun, Moon, ChevronDown } from 'lucide-react'

type NavChild = { to: string; label: string }
type NavLinkItem = { to: string; label: string; children?: NavChild[] }

const navLinks: NavLinkItem[] = [
  { to: '/', label: 'Home' },
  { to: '/guides', label: 'Guides' },
  {
    to: '/comparisons',
    label: 'Comparisons',
    children: [
      { to: '/comparisons/software', label: 'Software' },
      { to: '/comparisons/creators', label: 'Creators' },
      { to: '/comparisons/security', label: 'Security' },
      { to: '/comparisons/hardware', label: 'Hardware' },
    ],
  },
  {
    to: '/reviews',
    label: 'Reviews',
    children: [
      { to: '/reviews/software', label: 'Software' },
      { to: '/reviews/creators', label: 'Creators' },
      { to: '/reviews/security', label: 'Security' },
      { to: '/reviews/hardware', label: 'Hardware' },
    ],
  },
  { to: '/methodology', label: 'Methodology' },
  { to: '/editorial-team', label: 'Editorial Team' },
  { to: '/about', label: 'About' },
]

function isActive(pathname: string, to: string): boolean {
  if (to === '/') return pathname === '/'
  return pathname === to || pathname.startsWith(to + '/')
}

/**
 * Global site header — a React island hydrated on every page.
 * Reproduces the original SPA header: affiliate-disclosure strip, logo,
 * full nav with hover dropdowns (Comparisons/Reviews), dark-mode toggle and
 * a mobile accordion menu. Uses plain <a> links (full page loads in SSG).
 */
export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [pathname, setPathname] = useState('/')
  const [dark, setDark] = useState(false)
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    setPathname(window.location.pathname)
    setDark(document.documentElement.classList.contains('dark'))
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleDark = () => {
    const root = document.documentElement
    const next = !root.classList.contains('dark')
    root.classList.toggle('dark', next)
    setDark(next)
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light')
    } catch {
      /* private mode */
    }
  }

  // Hover-intent: ~180ms open/close delay prevents flicker when brushing past the nav.
  const scheduleOpen = (label: string) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current)
    hoverTimer.current = setTimeout(() => setOpenDropdown(label), 180)
  }
  const scheduleClose = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current)
    hoverTimer.current = setTimeout(() => setOpenDropdown(null), 180)
  }

  const activeClass = (to: string) =>
    isActive(pathname, to)
      ? 'bg-accent-600 text-white'
      : 'text-ink-200 hover:bg-white/10 hover:text-white dark:text-ink-600 dark:hover:bg-ink-100 dark:hover:text-ink-900'

  return (
    <header
      className={`sticky top-0 z-50 bg-ink-950 text-ink-100 dark:bg-white dark:text-ink-900 ${
        scrolled ? 'shadow-md' : ''
      }`}
    >
      {/* Affiliate disclosure strip — always visible */}
      <div className="bg-ink-900/80 text-ink-300 dark:bg-ink-100/80 dark:text-ink-500">
        <div className="container-page flex items-center justify-center gap-2 py-1.5 text-center">
          <Info className="hidden h-3 w-3 flex-shrink-0 text-ink-400 sm:block" />
          <p className="text-[11px] leading-tight tracking-wide">
            <span className="font-semibold text-ink-200 dark:text-ink-700">Disclosure:</span> We are
            reader-supported. When you buy through links on our site, we may earn an affiliate
            commission at no extra cost to you.{' '}
            <a
              href="/disclosure"
              className="font-semibold text-accent-400 underline underline-offset-2 hover:text-accent-300 dark:text-accent-700 dark:hover:text-accent-900"
            >
              Learn More
            </a>
          </p>
        </div>
      </div>

      {/* Main nav — solid contrasting band: dark in light mode, light in dark mode */}
      <div className="border-t border-white/10 dark:border-ink-200/70">
        <nav className="container-page flex h-16 items-center justify-between">
          <a href="/" className="group flex items-center gap-2.5">
            <img
              src="/logo.png"
              alt="Toolisme"
              className="h-9 w-9 rounded-full object-cover transition-transform group-hover:scale-105"
            />
            <span className="font-serif text-xl font-medium tracking-tight text-white dark:text-ink-900">
              Toolisme
            </span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const hasChildren = !!link.children
              const isOpen = openDropdown === link.label
              return (
                <div
                  key={link.to}
                  className="relative"
                  onMouseEnter={() => hasChildren && scheduleOpen(link.label)}
                  onMouseLeave={() => hasChildren && scheduleClose()}
                >
                  <a
                    href={link.to}
                    className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${activeClass(
                      link.to,
                    )}`}
                  >
                    {link.label}
                    {hasChildren && (
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                      />
                    )}
                  </a>

                  {hasChildren && (
                    <div
                      className={`absolute left-0 top-full z-50 w-48 pt-2 transition-all duration-150 ${
                        isOpen ? 'visible opacity-100' : 'invisible opacity-0'
                      }`}
                    >
                      <div className="rounded-xl border border-white/10 bg-ink-950 p-2 shadow-2xl dark:border-ink-200 dark:bg-white">
                        {link.children!.map((child) => (
                          <a
                            key={child.to}
                            href={child.to}
                            className="block rounded-lg px-3 py-2 text-sm font-medium text-ink-200 transition-colors hover:bg-white/10 hover:text-white dark:text-ink-700 dark:hover:bg-ink-100 dark:hover:text-ink-900"
                          >
                            {child.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}

            {/* Dark mode toggle */}
            <button
              onClick={toggleDark}
              className="ml-2 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-ink-200 transition-all hover:bg-white/20 hover:text-white dark:border-ink-200 dark:bg-ink-100 dark:text-ink-600 dark:hover:bg-ink-200 dark:hover:text-ink-900"
              aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <Sun className="h-4 w-4 dark:hidden" />
              <Moon className="hidden h-4 w-4 dark:block" />
            </button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            {/* Dark mode toggle - mobile */}
            <button
              onClick={toggleDark}
              className="rounded-lg p-2 text-ink-200 hover:bg-white/10 dark:text-ink-600 dark:hover:bg-ink-100"
              aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <Sun className="h-5 w-5 dark:hidden" />
              <Moon className="hidden h-5 w-5 dark:block" />
            </button>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="rounded-lg p-2 text-ink-200 hover:bg-white/10 dark:text-ink-600 dark:hover:bg-ink-100"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu dropdown */}
      {mobileOpen && (
        <div className="border-t border-white/10 bg-ink-950 dark:border-ink-200 dark:bg-white">
          <div className="container-page flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <div key={link.to}>
                <a
                  href={link.to}
                  className={`block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                    isActive(pathname, link.to)
                      ? 'bg-accent-600 text-white'
                      : 'text-ink-200 hover:bg-white/10 dark:text-ink-600 dark:hover:bg-ink-100'
                  }`}
                >
                  {link.label}
                </a>
                {link.children && (
                  <div className="ml-3 flex flex-col gap-1 border-l border-white/10 pl-3 dark:border-ink-200">
                    {link.children.map((child) => (
                      <a
                        key={child.to}
                        href={child.to}
                        className="rounded-lg px-3 py-2 text-sm font-medium text-ink-300 transition-colors hover:bg-white/10 hover:text-white dark:text-ink-500 dark:hover:bg-ink-100 dark:hover:text-ink-900"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
