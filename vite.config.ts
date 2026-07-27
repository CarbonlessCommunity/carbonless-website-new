// 'vitest/config' rather than 'vite': same defineConfig, plus the `test` key.
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  // Pages serves this repo from a subpath until the custom domain is cut over,
  // so the deploy workflow sets PAGES_BASE. Root-served builds need nothing.
  base: process.env.PAGES_BASE || '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  test: {
    // The sanitizer needs a DOM. `setupFiles` installs the same linkedom shim
    // scripts/prerender.mjs uses — see src/lib/test-setup.ts for why not
    // happy-dom.
    environment: 'node',
    setupFiles: ['./src/lib/test-setup.ts'],
    include: ['src/**/*.test.ts'],
  },
})
