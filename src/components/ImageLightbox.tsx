import { useEffect, useState } from 'react'

// Site-wide click-to-zoom for article illustrations.
// Delegates on document click: any <img> inside an article body (.prose-toolisme)
// opens a full-screen overlay. Covers reviews, comparisons and guides uniformly.
export default function ImageLightbox() {
  const [src, setSrc] = useState<string | null>(null)
  const [alt, setAlt] = useState('')

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target || target.tagName !== 'IMG') return
      const img = target as HTMLImageElement
      // Only article illustrations zoom — never logos, avatars or UI chrome.
      if (!img.closest('.prose-toolisme')) return
      e.preventDefault()
      setSrc(img.currentSrc || img.src)
      setAlt(img.alt || '')
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  useEffect(() => {
    if (!src) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSrc(null)
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [src])

  if (!src) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
      className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={() => setSrc(null)}
    >
      <img
        src={src}
        alt={alt}
        className="max-h-[90vh] max-w-[90vw] cursor-default rounded-lg object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
      <button
        type="button"
        aria-label="Close preview"
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xl leading-none text-white transition-colors hover:bg-white/25"
        onClick={() => setSrc(null)}
      >
        ✕
      </button>
    </div>
  )
}
