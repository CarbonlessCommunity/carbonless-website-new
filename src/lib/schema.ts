/**
 * JSON-LD builders.
 *
 * Search engines — and increasingly the assistants people ask "what is
 * Carbonless Community" — read structured data rather than inferring the
 * organization from prose. Nothing on the site declared it in machine-readable
 * form before this.
 *
 * These run at build time from `scripts/prerender.mjs`, which stamps the result
 * into each page's `<head>`. That means they work with JavaScript disabled, and
 * it's why every field is derived from `data/site.ts` rather than restated here:
 * the schema and the visible copy can't drift apart.
 */
import { site, contacts } from '@/data/site'

/** Anything JSON-serializable that ends up inside a ld+json script tag. */
export type JsonLd = Record<string, unknown>

/**
 * The organization itself. Emitted on every page — Google treats a consistent
 * Organization node across a site as the entity definition.
 */
export function organizationSchema(siteUrl: string): JsonLd {
  const primary = contacts[0]

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: `${siteUrl}/`,
    logo: `${siteUrl}/images/Logo.webp`,
    image: `${siteUrl}/images/og-image.jpg`,
    description: site.definition,
    slogan: site.tagline,
    foundingDate: String(site.founded),
    email: primary.email,
    telephone: primary.phone,
    sameAs: [site.blogUrl],
    contactPoint: contacts.map((c) => ({
      '@type': 'ContactPoint',
      name: c.name,
      contactType: c.role,
      email: c.email,
      telephone: c.phone,
    })),
  }
}

/** The site as a searchable thing, paired with the Organization node. */
export function websiteSchema(siteUrl: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: `${siteUrl}/`,
    publisher: { '@type': 'Organization', name: site.name },
  }
}

/**
 * A blog post. `datePublished` comes from the WordPress API, so it is already
 * an ISO string — passed through rather than reformatted, since schema.org
 * wants ISO 8601 and the human-facing format lives in `formatDate`.
 */
export function blogPostingSchema(
  siteUrl: string,
  post: { title: string; slug: string; date: string; excerpt?: string; image?: string },
): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    url: `${siteUrl}/blog/${post.slug}`,
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
    datePublished: post.date,
    ...(post.excerpt ? { description: post.excerpt } : {}),
    ...(post.image ? { image: post.image } : {}),
    author: { '@type': 'Organization', name: site.name },
    publisher: {
      '@type': 'Organization',
      name: site.name,
      logo: { '@type': 'ImageObject', url: `${siteUrl}/images/Logo.webp` },
    },
  }
}

/**
 * Breadcrumbs for nested routes, built from the path segments.
 *
 * Titles come from the caller (which has the route table) rather than being
 * guessed from the slug, so `/solutions/xl-hybrids` reads "XL Hybrids" and not
 * "Xl hybrids". Returns null at the root and for one-level paths, where a
 * breadcrumb trail would be a single item.
 */
export function breadcrumbSchema(
  siteUrl: string,
  routePath: string,
  titleFor: (path: string) => string | undefined,
): JsonLd | null {
  const segments = routePath.split('/').filter(Boolean)
  if (segments.length < 2) return null

  const items = [{ name: 'Home', path: '/' }]
  let acc = ''
  for (const segment of segments) {
    acc += `/${segment}`
    items.push({ name: titleFor(acc) ?? segment, path: acc })
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${item.path === '/' ? '/' : item.path}`,
    })),
  }
}
