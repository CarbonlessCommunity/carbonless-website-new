import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { Arrow, Button, Container, Reveal, Section } from '@/components/ui'
import { fetchPost, formatDate, readingTime, type Post } from '@/lib/wordpress'
import { site } from '@/data/site'
import { usePageMeta } from '@/lib/hooks'
import { getPrerenderData } from '@/lib/prerenderData'

export default function BlogPost() {
  const { slug = '' } = useParams()
  // Populated during the build-time prerender; empty in the browser, where the
  // effect below fetches as usual.
  const prerendered = getPrerenderData().post
  const [post, setPost] = useState<Post | null>(prerendered ?? null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'missing' | 'error'>(
    prerendered ? 'ready' : 'loading',
  )

  usePageMeta(post?.title ?? 'Blog', post?.excerpt)

  useEffect(() => {
    let active = true
    setStatus('loading')
    fetchPost(slug)
      .then((data) => {
        if (!active) return
        if (!data) {
          setStatus('missing')
          return
        }
        setPost(data)
        setStatus('ready')
      })
      .catch(() => active && setStatus('error'))
    return () => {
      active = false
    }
  }, [slug])

  return (
    <Section>
      <Container size="narrow">
        <Link
          to="/blog"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-forest-700"
        >
          <Arrow className="rotate-180 group-hover:-translate-x-1" />
          All posts
        </Link>

        {status === 'loading' && (
          <div className="mt-10 animate-pulse space-y-4">
            <div className="h-3 w-32 rounded-full bg-[var(--surface-alt)]" />
            <div className="h-10 w-4/5 rounded-full bg-[var(--surface-alt)]" />
            <div className="h-10 w-3/5 rounded-full bg-[var(--surface-alt)]" />
            <div className="mt-8 space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-3 w-full rounded-full bg-[var(--surface-alt)]" />
              ))}
            </div>
          </div>
        )}

        {(status === 'missing' || status === 'error') && (
          <div className="mt-12 rounded-3xl border border-[var(--line)] bg-[var(--surface-alt)] p-10 text-center">
            <h1 className="font-display text-2xl font-semibold text-[var(--ink)]">
              {status === 'missing' ? 'We couldn’t find that post' : 'We couldn’t load that post'}
            </h1>
            <p className="mx-auto mt-3 max-w-md text-[var(--ink-muted)]">
              It may have been moved or renamed. The full archive lives on WordPress.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button to="/blog" variant="secondary">
                Back to the blog
              </Button>
              <Button href={site.blogUrl}>Open the WordPress archive</Button>
            </div>
          </div>
        )}

        {status === 'ready' && post && (
          <Reveal>
            <article className="mt-10">
              <p className="text-xs font-semibold tracking-[0.16em] text-forest-600 uppercase">
                {formatDate(post.date)} · {readingTime(post.content)}
              </p>
              <h1 className="font-display mt-4 text-4xl leading-[1.1] font-semibold text-[var(--ink)] sm:text-5xl">
                {post.title}
              </h1>

              {post.image && (
                <img
                  src={post.image}
                  alt=""
                  className="mt-10 w-full rounded-3xl border border-[var(--line)] object-cover"
                />
              )}

              {/* Sanitized in lib/wordpress.ts before it reaches this point */}
              <div
                className="rich-text mt-10"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--line)] pt-8">
                <Button to="/blog" variant="secondary">
                  More posts
                </Button>
                <a
                  href={post.link}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-sm text-[var(--ink-muted)] underline underline-offset-4 transition-colors hover:text-forest-600"
                >
                  View this post on WordPress ↗
                </a>
              </div>
            </article>
          </Reveal>
        )}
      </Container>
    </Section>
  )
}
