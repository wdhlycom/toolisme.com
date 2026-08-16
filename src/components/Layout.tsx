import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'
import CookieBanner from './CookieBanner'
import ImageLightbox from './ImageLightbox'

export default function Layout() {
  // Global click-to-copy for [data-copy] buttons rendered from markdown (e.g. promo codes)
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest<HTMLElement>('[data-copy]')
      if (!btn) return
      const code = btn.getAttribute('data-copy') ?? ''
      const label = btn.querySelector('.cp-label')
      navigator.clipboard?.writeText(code).catch(() => {})
      if (label) {
        const original = label.textContent ?? ''
        label.textContent = 'Copied ✓'
        label.classList.add('text-sage-600', 'dark:text-sage-400')
        window.setTimeout(() => {
          label.textContent = original
          label.classList.remove('text-sage-600', 'dark:text-sage-400')
        }, 1500)
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CookieBanner />
      <ImageLightbox />
    </div>
  )
}
