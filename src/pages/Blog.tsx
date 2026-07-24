import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '@/components/PageHeader'
import { Arrow, Button, Container, Reveal, Section } from '@/components/ui'
import { fetchPosts, formatDate, readingTime, type Post } from '@/lib/wordpress'
import { site } from '@/data/site'
import { usePageMeta } from '@/lib/hooks'

function PostSkeleton() {
  return (
    <div className="animate-pulse rounded-3xl border border-[var(--line)] p-8">
      <div className="h-3 w-28 rounded-full bg-[var(--surface-alt)]" />
      <div className="mt-5 h-6 w-3/4 rounded-full bg-[var(--surface-alt)]" />
      <div className="mt-3 h-6 w-1/2 rounded-full bg-[var(--surface-alt)]" />
      <div className="mt-6 space-y-2">
        <div className="h-3 w-full rounded-full bg-[var(--surface-alt)]" />
        <div className="h-3 w-5/6 rounded-full bg-[var(--surface-alt)]" />
      </div>
    </div>
  )
}

export default function Blog() {
  usePageMeta(
    'Blog',
    'Information on all sides of the energy and environment discussions.',
  )

  const [posts, setPosts] = useState<Post[]>([])
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')

  useEffect(() => {
    let active = true
    fetchPosts()
      .then((data) => {
        if (!active) return
        setPosts(data)
        setStatus('ready')
      })
      .catch(() => active && setStatus('error'))
    return () => {
      active = false
    }
  }, [])

  const [lead, ...rest] = posts

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="All sides of the conversation"
        lede="We humans have an overriding tendency to seek out information that only confirms our beliefs without questioning its validity or value — psychologists call this confirmation bias. While comforting, it can result in wasted resources on activities and products that don’t improve our environment. Our aim is to present information that generates discussion and shared thought."
      />

      <Section>
        <Container size="wide">
          {status === 'loading' && (
            <div className="grid gap-6 md:grid-cols-2">
              <PostSkeleton />
              <PostSkeleton />
              <PostSkeleton />
              <PostSkeleton />
            </div>
          )}

          {status === 'error' && (
            <div className="rounded-3xl border border-[var(--line)] bg-[var(--surface-alt)] p-10 text-center">
              <h2 className="font-display text-2xl font-semibold text-[var(--ink)]">
                We couldn’t load the posts
              </h2>
              <p className="mx-auto mt-3 max-w-md text-[var(--ink-muted)]">
                The blog is hosted on WordPress and its API isn’t responding right now. You can read
                everything directly there instead.
              </p>
              <div className="mt-7 flex justify-center">
                <Button href={site.blogUrl}>Open the blog on WordPress</Button>
              </div>
            </div>
          )}

          {status === 'ready' && lead && (
            <>
              <Reveal>
                <Link
                  to={`/blog/${lead.slug}`}
                  className="group grid overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--surface)] transition-all duration-300 ease-[var(--ease-out-soft)] hover:border-forest-400 hover:shadow-xl hover:shadow-forest-950/8 lg:grid-cols-2"
                >
                  <div className="order-2 flex flex-col justify-center p-8 sm:p-12 lg:order-1">
                    <p className="text-xs font-semibold tracking-[0.16em] text-forest-600 uppercase dark:text-forest-300">
                      Latest · {formatDate(lead.date)}
                    </p>
                    <h2 className="font-display mt-4 text-3xl leading-tight font-semibold text-[var(--ink)] sm:text-4xl">
                      {lead.title}
                    </h2>
                    <p className="mt-5 line-clamp-4 leading-relaxed text-[var(--ink-muted)]">
                      {lead.excerpt}
                    </p>
                    <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-forest-700 dark:text-forest-300">
                      Read the post
                      <Arrow />
                    </span>
                  </div>
                  <div className="order-1 min-h-56 bg-forest-950 lg:order-2">
                    {lead.image ? (
                      <img
                        src={lead.image}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-105"
                      />
                    ) : (
                      <img
                        src="/images/image6.jpg"
                        alt=""
                        className="h-full w-full object-cover opacity-70 transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-105"
                      />
                    )}
                  </div>
                </Link>
              </Reveal>

              <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((post, i) => (
                  <Reveal key={post.id} delay={(i % 3) * 80}>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="group flex h-full flex-col rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-7 transition-all duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:border-forest-400 hover:shadow-lg"
                    >
                      <p className="text-xs font-medium text-[var(--ink-muted)]">
                        {formatDate(post.date)} · {readingTime(post.content)}
                      </p>
                      <h3 className="font-display mt-3 text-xl leading-snug font-semibold text-[var(--ink)]">
                        {post.title}
                      </h3>
                      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-[var(--ink-muted)]">
                        {post.excerpt}
                      </p>
                      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-forest-700 dark:text-forest-300">
                        Read
                        <Arrow />
                      </span>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </>
          )}

          {status === 'ready' && !posts.length && (
            <p className="text-center text-[var(--ink-muted)]">No posts published yet.</p>
          )}
        </Container>
      </Section>
    </>
  )
}
