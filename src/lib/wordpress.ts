/**
 * The blog lives on WordPress.com, which doesn't expose /wp-json on the site's
 * own host — the public API proxy does. Everything here is read-only and
 * unauthenticated, and the API reflects any Origin, so it works from the browser.
 */
const API = 'https://public-api.wordpress.com/wp/v2/sites/carbonlesscommunity.wordpress.com'

export type Post = {
  id: number
  slug: string
  date: string
  link: string
  title: string
  excerpt: string
  content: string
  image?: string
}

type RawPost = {
  id: number
  slug: string
  date: string
  link: string
  title: { rendered: string }
  excerpt: { rendered: string }
  content: { rendered: string }
  jetpack_featured_media_url?: string
}

/**
 * Turns `&#8212;` and friends into real characters, and drops any tags.
 *
 * Tags are stripped by regex *before* the string touches the DOM, so nothing
 * here can load a resource or run. A plain div rather than the usual textarea
 * trick: textarea is a raw-text element, and the DOM implementation that backs
 * the build-time prerender hands its entities back undecoded.
 */
export function decodeHtml(html: string): string {
  const el = document.createElement('div')
  el.innerHTML = html.replace(/<[^>]+>/g, '')
  return (el.textContent ?? '').replace(/ /g, ' ').trim()
}

/**
 * Post bodies are injected as HTML, so strip anything executable first. The
 * blog is the org's own, but it is still third-party content arriving at
 * runtime — treat it as untrusted.
 */
export function sanitize(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html')

  doc.querySelectorAll('script, style, iframe, object, embed, form, link, meta').forEach((el) =>
    el.remove(),
  )

  doc.querySelectorAll('*').forEach((el) => {
    for (const attr of [...el.attributes]) {
      const name = attr.name.toLowerCase()
      const value = attr.value.trim().toLowerCase()
      const isUrlAttr = name === 'href' || name === 'src' || name === 'srcset'
      if (name.startsWith('on') || (isUrlAttr && value.startsWith('javascript:'))) {
        el.removeAttribute(attr.name)
      }
    }
    if (el.tagName === 'A') {
      el.setAttribute('target', '_blank')
      el.setAttribute('rel', 'noreferrer noopener')
    }
    if (el.tagName === 'IMG') {
      el.setAttribute('loading', 'lazy')
    }
  })

  return doc.body.innerHTML
}

/**
 * WordPress appends a "Continue reading →" link to every excerpt, which reads
 * as noise inside a line-clamped card. The trailing ellipsis is kept — it still
 * signals the text is cut short.
 */
function cleanExcerpt(rendered: string): string {
  return decodeHtml(rendered).replace(/Continue reading[\s\S]*$/i, '').trim()
}

function normalize(raw: RawPost): Post {
  return {
    id: raw.id,
    slug: raw.slug,
    date: raw.date,
    link: raw.link,
    title: decodeHtml(raw.title.rendered),
    excerpt: cleanExcerpt(raw.excerpt.rendered),
    content: sanitize(raw.content.rendered),
    image: raw.jetpack_featured_media_url || undefined,
  }
}

export async function fetchPosts(perPage = 30): Promise<Post[]> {
  const res = await fetch(`${API}/posts?per_page=${perPage}&_fields=id,slug,date,link,title,excerpt,content,jetpack_featured_media_url`)
  if (!res.ok) throw new Error(`Could not load posts (${res.status})`)
  const data: RawPost[] = await res.json()
  return data.map(normalize)
}

export async function fetchPost(slug: string): Promise<Post | null> {
  const res = await fetch(`${API}/posts?slug=${encodeURIComponent(slug)}`)
  if (!res.ok) throw new Error(`Could not load post (${res.status})`)
  const data: RawPost[] = await res.json()
  return data.length ? normalize(data[0]) : null
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function readingTime(html: string): string {
  const words = html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length
  return `${Math.max(1, Math.round(words / 220))} min read`
}
