import type { ReactNode } from 'react'
import { Container, Eyebrow } from './ui'

export default function PageHeader({
  eyebrow,
  title,
  lede,
  image,
  children,
}: {
  eyebrow?: string
  title: ReactNode
  lede?: ReactNode
  image?: string
  children?: ReactNode
}) {
  return (
    <div className="relative overflow-hidden border-b border-[var(--line)] bg-[var(--surface-alt)]">
      {/* Soft radial wash so the header reads as a distinct band */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-32 h-[28rem] w-[28rem] rounded-full bg-forest-300/25 blur-3xl dark:bg-forest-700/20"
      />
      <Container size="wide">
        <div className="reveal-in relative grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-[1.5fr_1fr] lg:py-24">
          <div>
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            <h1 className="font-display text-4xl leading-[1.08] font-semibold text-[var(--ink)] sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            {lede && (
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--ink-muted)]">
                {lede}
              </p>
            )}
            {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
          </div>
          {image && (
            <div className="relative">
              <img
                src={image}
                alt=""
                className="w-full rounded-3xl border border-[var(--line)] bg-white object-contain p-6 shadow-lg shadow-forest-950/5 dark:bg-white/95"
              />
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}
