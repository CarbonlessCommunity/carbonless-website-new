import { defineConfig } from 'vite'
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
})
