import PageHeader from '@/components/PageHeader'
import ContactForm from '@/components/ContactForm'
import { Button, Container, Reveal, Section } from '@/components/ui'
import { usePageMeta } from '@/lib/hooks'

export default function CreateCommunity() {
  usePageMeta(
    'Create a Community',
    'All you need is a committed group of at least 100 individuals with ties to a single organization.',
  )

  return (
    <>
      <PageHeader
        eyebrow="Get started"
        title="Creating a community is easy"
        lede="All you need is a committed group of at least 100 individuals who have ties to a single organization."
      >
        <Button to="/contact">Talk to us about starting one</Button>
      </PageHeader>

      <Section>
        <Container size="narrow">
          <Reveal>
            <div className="flex flex-wrap items-center gap-6 rounded-3xl border border-[var(--line)] bg-[var(--surface-alt)] p-8 sm:p-10">
              <p className="font-display text-6xl font-semibold text-forest-600">
                100
              </p>
              <p className="flex-1 leading-relaxed text-[var(--ink-muted)]">
                committed individuals with ties to a single organization — that’s the whole
                threshold.
              </p>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <div className="rich-text mt-12">
              <p>
                For example, your community could be a college or university with the community’s
                “members” being faculty, staff and students and their immediate and extended
                families. Or your community could be your company, with members being employees and
                their immediate and extended families.
              </p>
              <p>
                We understand that individuals have varying abilities to reduce their impact on the
                planet, but we ask each member to commit to doing the best they can in reducing
                carbon emissions by signing the Carbonless Community Commitment.
              </p>
              <p>
                The easiest and most cost-efficient measure for reducing one’s carbon footprint is to
                purchase energy-efficient appliances when it is time to replace your current washer,
                dishwasher, TV, etc.{' '}
                <strong>
                  Choosing the right energy-efficient equipment will not only save you money over
                  time but will also reduce your impact on the planet.
                </strong>
              </p>

              <h2>There are several reasons to create your own Carbonless Community</h2>
              <ol>
                <li>
                  Community members will receive great pricing and customer service when they
                  purchase an appliance through the Abt link below.
                </li>
                <li>
                  Your student group will receive revenue on the appliance purchases, which will help
                  further your group’s mission.
                </li>
                <li>
                  You will be helping your organization — school, college or company — reduce its
                  carbon footprint through the carbon offsets you provide, and at no cost to your
                  organization.
                </li>
              </ol>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* The page that explains the offer should also be the page that closes it. */}
      <Section tone="alt" id="start">
        <Container size="narrow">
          <Reveal>
            <h2 className="font-display text-3xl leading-tight font-semibold text-[var(--ink)]">
              Ready to start one?
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--ink-muted)]">
              Tell us who your community would be and roughly how many people it covers. We’ll come
              back with what’s worth doing first.
            </p>
            <ContactForm className="mt-9" />
          </Reveal>
        </Container>
      </Section>
    </>
  )
}
