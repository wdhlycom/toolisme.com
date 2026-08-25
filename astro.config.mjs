import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import { fileURLToPath } from 'node:url'

// Toolisme rebuilt on Astro (static SSG). Crawlers get full HTML at build time.
export default defineConfig({
  integrations: [react()],
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
})
