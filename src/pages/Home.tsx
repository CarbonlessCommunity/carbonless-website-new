import { imageSize } from '@/lib/imageSize'
import { asset } from '@/lib/asset'
import { Link } from 'react-router'
import StatsStrip from '@/components/StatsStrip'
import SubscribeForm from '@/components/SubscribeForm'
import Testimonials from '@/components/Testimonials'
import { Arrow, Button, Container, Eyebrow, LogoPlate, Quote, Reveal, Section } from '@/components/ui'
import { focusSolutions } from '@/data/solutions'
import { currentProject, formatMonth } from '@/data/projects'
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
          {...imageSize(stills.hero.image)}
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
              Carbon offsets · Since {site.founded}
            </p>
            <h1 className="font-display text-[clamp(2.5rem,7vw,4.75rem)] leading-[1.02] font-semibold text-white">
              Most carbon spending buys a certificate.{' '}
              <span className="text-forest-300 italic">We’d rather buy a tonne.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-forest-100/85 sm:text-xl">
              You cannot get a footprint to zero today without buying something. Nearly all of it
              gets spent on Renewable Energy Certificates — and a REC is never required to prove it
              changed anything at all.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button to="/recs-vs-offsets">See the difference</Button>
              <Link
                to="/project-of-the-month"
                className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/45 hover:bg-white/5"
              >
                Project of the Month
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

/** The argument, in three moves, above the fold of the second screen. */
const premise = [
  {
    step: 'The situation',
    title: 'Zero requires buying something',
    body: 'No organization gets to zero on efficiency alone. Somewhere at the end of every net-zero plan is an instrument bought on a market.',
  },
  {
    step: 'The default',
    title: 'Almost everyone buys RECs',
    body: 'They are cheap, easy and regulated, and they are what the market hands you. Most commonly: a wind farm in another state that has been turning for years.',
  },
  {
    step: 'The catch',
    title: 'A REC proves nothing',
    body: 'It does not have to stand the test of additionality. Nothing requires your money to cause a single tonne to be removed, avoided or destroyed.',
  },
]

export default function Home() {
  usePageMeta(
    'Home',
    'Carbon offsets that have to prove they changed something — and one project written up in full every month.',
  )

  return (
    <>
      <Hero />

      {/* Proof numbers — hidden until data/site.ts has real ones */}
      <StatsStrip />

      {/* The case, compressed. /recs-vs-offsets makes it at full length. */}
      <Section>
        <Container size="wide">
          <Reveal>
            <Eyebrow>Why this matters</Eyebrow>
            <h2 className="font-display max-w-3xl text-3xl leading-tight font-semibold text-balance text-[var(--ink)] sm:text-4xl">
              The instrument nearly everyone buys is the one that never has to prove itself
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {premise.map((item, i) => (
              <Reveal key={item.title} delay={i * 90}>
                <article className="flex h-full flex-col rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-7">
                  <p className="text-xs font-semibold tracking-[0.16em] text-forest-700 uppercase">
                    {item.step}
                  </p>
                  <h3 className="font-display mt-4 text-xl leading-snug font-semibold text-[var(--ink)]">
                    {item.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-[var(--ink-muted)]">{item.body}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button to="/recs-vs-offsets">RECs vs. carbon offsets, point by point</Button>
              <p className="text-sm text-[var(--ink-muted)]">
                A carbon offset has to answer the question a REC is never asked.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* The standing feature. Sits high on the page on purpose: the cadence is
          the offer as much as the offsets are. */}
      <Section tone="deep">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <Reveal>
              <Eyebrow>Every month</Eyebrow>
              {currentProject ? (
                <>
                  <h2 className="font-display text-3xl leading-tight font-semibold text-white sm:text-4xl">
                    {currentProject.name}
                  </h2>
                  <p className="mt-3 text-sm font-semibold text-forest-300">
                    {formatMonth(currentProject.month)} · {currentProject.category} ·{' '}
                    {currentProject.location}
                  </p>
                  <p className="mt-5 text-lg leading-relaxed text-forest-100/85">
                    {currentProject.summary}
                  </p>
                  <div className="mt-8">
                    <Button to={`/project-of-the-month/${currentProject.slug}`}>
                      Read this month’s write-up
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="font-display text-3xl leading-tight font-semibold text-white sm:text-4xl">
                    One project, examined in full, every month
                  </h2>
                  <p className="mt-5 max-w-xl text-lg leading-relaxed text-forest-100/85">
                    What the project does, how the tonnes are measured, why they wouldn’t have
                    happened anyway — and the strongest fair objection to it, answered rather than
                    left out. Held to a published checklist, month after month.
                  </p>
                  <div className="mt-8">
                    <Button to="/project-of-the-month">See the standard</Button>
                  </div>
                </>
              )}
            </Reveal>

            <Reveal delay={100}>
              <div className="rounded-3xl bg-[var(--surface)] p-7">
                <h3 className="font-display text-xl font-semibold text-[var(--ink)]">
                  Get it when it lands
                </h3>
                <SubscribeForm variant="compact" className="mt-3" />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* What we actually do — two measures, not eight */}
      <Section tone="alt">
        <Container size="wide">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-2xl">
                <Eyebrow>What we do</Eyebrow>
                <h2 className="font-display text-3xl leading-tight font-semibold text-[var(--ink)] sm:text-4xl">
                  Two things, properly
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-[var(--ink-muted)]">
                  Offsets are the work. Storage is the one piece of hardware whose economics still
                  stand on their own. Everything else we’ve ever arranged is still available — it’s
                  just one click deeper.
                </p>
              </div>
              <Link
                to="/solutions"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-forest-700"
              >
                Other measures
                <Arrow />
              </Link>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {focusSolutions.map((s, i) => (
              <Reveal key={s.slug} delay={i * 90}>
                <Link
                  to={`/solutions/${s.slug}`}
                  className="group flex h-full flex-col rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-8 transition-all duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:border-forest-400 hover:shadow-xl hover:shadow-forest-950/8"
                >
                  <LogoPlate src={s.logo ?? s.image} name={s.name} className="mb-6 h-16" />
                  <h3 className="font-display text-2xl font-semibold text-[var(--ink)]">{s.name}</h3>
                  <p className="mt-3 flex-1 leading-relaxed text-[var(--ink-muted)]">{s.summary}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-forest-700">
                    Learn more
                    <Arrow />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Quote */}
      <Section>
        <Container size="narrow">
          <Reveal>
            <Quote attribution="Craig Schuttenberg" role="President, Carbonless Community">
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
                {...imageSize(asset('/images/seals-1200.webp'))}
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
              What are you offsetting with today?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-forest-200">
              Tell us what’s on your inventory and what you’re buying to cover it. We’ll tell you
              honestly where offsets would do more than the certificates you have now — and where
              they wouldn’t.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Button to="/contact">Get in touch</Button>
              <Link
                to="/solutions/carbon-offsets"
                className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/45 hover:bg-white/5"
              >
                How we choose projects
                <Arrow />
              </Link>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  )
}
