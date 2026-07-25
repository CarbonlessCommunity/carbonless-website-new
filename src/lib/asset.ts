/**
 * Resolve a path in `public/` against the deploy base.
 *
 * Vite rewrites asset URLs it can see at build time, but not plain strings like
 * `'/images/Logo.webp'` — those stay root-absolute and 404 when Pages serves the
 * app from `/carbonless-website-new/`. Route every public asset through here.
 */
export function asset(path: string): string {
  return import.meta.env.BASE_URL + path.replace(/^\//, '')
}
