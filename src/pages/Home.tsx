import { asset } from '@/lib/asset'
import { Link } from 'react-router'
import StatsStrip from '@/components/StatsStrip'
import Testimonials from '@/components/Testimonials'
import { Arrow, Button, Container, Eyebrow, Quote, Reveal, Section } from '@/components/ui'
import { solutions } from '@/data/solutions'
import { site } from '@/data/site'
import { usePageMeta } from '@/lib/hooks'

type Slide = { image: string; small: string }

/**
 * Each still ships at two widths; `srcSet` keeps phones off the 1920 file.
 *
 * Keyed by where the image is used rather than indexed, so a reader can tell
 * which still moves when one of these changes.
 */
const slide = (name: string): Slide => ({
  image: asset(`/images/${name}-1920.webp`),
  small: asset(`/images/${name}-960.webp`),
})

const stills = {
  hero: slide('reserve1-10'),
  efficiency: slide('image6'),
  everyday: slide('image5'),
}

const srcSet = (s: Slide) => `${s.small} 960w, ${s.image} 1920w`

function Hero() {
  // -mt-18 cancels the layout's header offset so the art runs under the header
  return (
    <div className="relative isolate -mt-18 overflow-hidden bg-forest-950">
      {/* Layered stills replace the old auto-rotating carousel — no motion, no CLS */}
      <div aria-hidden="true" className="absolute inset-0">
        <img
          src={stills.hero.image}
          srcSet={srcSet(stills.hero)}
          sizes="100vw"
          alt=""
          className="h-full w-full object-cover opacity-55"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-forest-950 via-forest-950/80 to-forest-900/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-transparent to-transparent" />
      </div>

      <Container size="wide">
        <div className="relative flex min-h-[min(88vh,46rem)] flex-col justify-center pt-38 pb-24 sm:pt-46 sm:pb-32">
          <div className="reveal-in max-w-3xl">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-forest-400/30 bg-forest-400/10 px-4 py-1.5 text-xs font-semibold tracking-[0.14em] text-forest-200 uppercase backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-forest-300" />
              Since {site.founded}
            </p>
            <h1 className="font-display text-[clamp(2.5rem,7vw,4.75rem)] leading-[1.02] font-semibold text-white">
              Reducing your carbon footprint is easy —{' '}
              <span className="text-forest-300 italic">and can save you money.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-forest-100/85 sm:text-xl">
              We help groups of like-minded people execute thoughtful measures that cut their own
              carbon footprint — and the footprint of the larger community they belong to.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button to="/communities/create">Start a community</Button>
              <Link
                to="/solutions"
                className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/45 hover:bg-white/5"
              >
                Explore our solutions
                <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </Container>

      {/* Definition strip — the org's own words about what a "community" is */}
      <div className="relative border-t border-white/10 bg-forest-950/70 backdrop-blur-sm">
        <Container size="wide">
          <p className="font-display py-8 text-base leading-relaxed text-forest-100/75 italic sm:text-lg">
            “{site.definition}”
          </p>
        </Container>
      </div>
    </div>
  )
}

const principles = [
  {
    title: 'The cleanest energy',
    body: 'It’s been said many times that the cleanest energy is the energy that does not have to be produced. We agree — efficiency comes first.',
    slide: stills.efficiency,
  },
  {
    title: 'Start where you already are',
    body: 'The easiest way to cut your footprint is to choose the right appliance, the right car, the right electricity supplier at the moment you were going to buy anyway.',
    slide: stills.everyday,
  },
]

export default function Home() {
  usePageMeta(
    'Home',
    'Carbonless Community helps groups of like-minded people reduce greenhouse gas emissions — and save money doing it.',
  )

  const featured = solutions.filter((s) => s.featured)
  const rest = solutions.filter((s) => !s.featured)

  return (
    <>
      <Hero />

      {/* Proof numbers — hidden until data/site.ts has real ones */}
      <StatsStrip />

      {/* Principles */}
      <Section>
        <Container size="wide">
          <div className="grid gap-6 lg:grid-cols-2">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 90}>
                <article className="group relative h-full overflow-hidden rounded-3xl border border-[var(--line)]">
                  <img
                    src={p.slide.small}
                    srcSet={srcSet(p.slide)}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    alt=""
                    className="h-64 w-full object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="p-8">
                    <h2 className="font-display text-2xl font-semibold text-[var(--ink)]">
                      {p.title}
                    </h2>
                    <p className="mt-3 leading-relaxed text-[var(--ink-muted)]">{p.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Featured partners */}
      <Section tone="alt">
        <Container size="wide">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-2xl">
                <Eyebrow>What we offer</Eyebrow>
                <h2 className="font-display text-3xl leading-tight font-semibold text-[var(--ink)] sm:text-4xl">
                  Practical measures, real partners
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-[var(--ink-muted)]">
                  There is no single silver bullet. We assemble a portfolio of measures — some with
                  attractive project economics, some without — that together move the needle.
                </p>
              </div>
              <Link
                to="/solutions"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-forest-700"
              >
                See all solutions
                <Arrow />
              </Link>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {featured.map((s, i) => (
              <Reveal key={s.slug} delay={i * 90}>
                <Link
                  to={`/solutions/${s.slug}`}
                  className="group flex h-full flex-col rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-7 transition-all duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:border-forest-400 hover:shadow-xl hover:shadow-forest-950/8"
                >
                  <div className="mb-6 flex h-16 w-fit items-center rounded-xl bg-white px-3">
                    <img
                      src={s.logo ?? s.image}
                      alt=""
                      className="max-h-12 max-w-[10rem] object-contain"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-[var(--ink)]">{s.name}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--ink-muted)]">
                    {s.summary}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-forest-700">
                    Learn more
                    <Arrow />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* Secondary measures, compact */}
          <Reveal delay={120}>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {rest.map((s) => (
                <Link
                  key={s.slug}
                  to={`/solutions/${s.slug}`}
                  className="group flex items-center justify-between gap-3 rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-5 py-4 text-sm font-semibold text-[var(--ink)] transition-colors hover:border-forest-400 hover:text-forest-700"
                >
                  {s.name}
                  <Arrow className="shrink-0 opacity-50 group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Quote */}
      <Section>
        <Container size="narrow">
          <Reveal>
            <Quote
              attribution="Craig Schuttenberg"
              role="President, Carbonless Community"
            >
              There is no single measure that will act as a silver bullet to solve the carbon threat
              to our environment. Many measures have attractive project economics, while others will
              have no quantifiable revenue streams. We can help assess your threats and
              opportunities to build a comprehensive plan that achieves your goals.
            </Quote>
          </Reveal>
        </Container>
      </Section>

      {/* Participants in their own words — the quote above is the org's own
          voice, which can't do this job. Hidden until data/site.ts has real ones. */}
      <Testimonials />

      {/* Creating a community */}
      <Section tone="alt">
        <Container size="wide">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <img
                src={asset('/images/seals-1200.webp')}
                srcSet={`${asset('/images/seals-600.webp')} 600w, ${asset('/images/seals-1200.webp')} 1200w`}
                sizes="(min-width: 1024px) 50vw, 100vw"
                alt="Seals resting on a shoreline"
                className="w-full rounded-3xl object-cover shadow-xl shadow-forest-950/10"
                loading="lazy"
              />
            </Reveal>
            <Reveal delay={100}>
              <Eyebrow>Get started</Eyebrow>
              <h2 className="font-display text-3xl leading-tight font-semibold text-[var(--ink)] sm:text-4xl">
                Creating a community is easy
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-[var(--ink-muted)]">
                All you need is a committed group of at least 100 individuals who have ties to a
                single organization — a college with its faculty, staff, students and their
                families, or a company with its employees and theirs.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button to="/communities/create">How it works</Button>
                <Button to="/communities" variant="secondary">
                  Why join
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Closing CTA */}
      <Section tone="deep">
        <Container size="narrow" className="text-center">
          <Reveal>
            <Eyebrow>Talk to us</Eyebrow>
            <h2 className="font-display text-3xl leading-tight font-semibold text-white sm:text-4xl">
              Let’s build a plan that actually fits your organization
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-forest-200">
              Tell us where you are and what you’re trying to reach. We’ll help you assess the
              threats and the opportunities.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Button to="/contact">Get in touch</Button>
              <Link
                to="/solutions/carbon-offsets"
                className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/45 hover:bg-white/5"
              >
                Start with carbon offsets
                <Arrow />
              </Link>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  )
}
