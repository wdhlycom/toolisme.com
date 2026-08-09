import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Cookie, X } from 'lucide-react'

const STORAGE_KEY = 'toolisme-cookie-consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY)
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1200)
      return () => clearTimeout(timer)
    }
  }, [])

  const dismiss = (value: 'accepted' | 'rejected') => {
    localStorage.setItem(STORAGE_KEY, value)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-2xl animate-fade-up rounded-2xl border border-ink-200 bg-white p-5 shadow-2xl shadow-ink-900/10 sm:bottom-6 sm:left-6 sm:right-6 dark:border-ink-700 dark:bg-ink-900 dark:shadow-black/30">
      <div className="flex items-start gap-4">
        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-sand-100 text-sand-700 dark:bg-sand-950 dark:text-sand-400">
          <Cookie className="h-5 w-5" />
        </span>
        <div className="flex-1">
          <p className="text-sm leading-relaxed text-ink-700 dark:text-ink-300">
            We use cookies to understand how visitors use our site and to keep our
            recommendations relevant. See our{' '}
            <Link to="/privacy" className="font-semibold text-accent-700 hover:text-accent-900 dark:text-accent-400 dark:hover:text-accent-300">
              Privacy Policy
            </Link>{' '}
            for details.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={() => dismiss('accepted')}
              className="btn-primary text-xs"
            >
              Accept all
            </button>
            <button
              onClick={() => dismiss('rejected')}
              className="btn-secondary text-xs"
            >
              Reject non-essential
            </button>
          </div>
        </div>
        <button
          onClick={() => dismiss('rejected')}
          className="rounded-lg p-1.5 text-ink-400 hover:bg-ink-100 hover:text-ink-700 dark:text-ink-500 dark:hover:bg-ink-800 dark:hover:text-ink-300"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
