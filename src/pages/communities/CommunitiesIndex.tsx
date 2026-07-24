import PageHeader from '@/components/PageHeader'
import { Button, Container, Eyebrow, Reveal, Section } from '@/components/ui'
import { usePageMeta } from '@/lib/hooks'

const reasons = [
  {
    title: 'Great pricing on appliances',
    body: 'Community members receive great pricing and customer service when they purchase an appliance through the Abt link.',
  },
  {
    title: 'Revenue for your student group',
    body: 'Your student group receives revenue on the appliance purchases, which helps further your group’s mission.',
  },
  {
    title: 'A lower footprint at no cost',
    body: 'You help your organization — school, college or company — reduce its carbon footprint through the carbon offsets you provide, at no cost to the organization.',
  },
]

export default function CommunitiesIndex() {
  usePageMeta(
    'Communities',
    'What a Carbonless Community is, and why an organization would want to create one.',
  )

  return (
    <>
      <PageHeader
        eyebrow="Communities"
        title="A community is a group that decides to act together"
        lede="Carbonless Community expands your organization’s activities to include specific carbon avoidance measures taken by employees, staff, faculty, students and their immediate and extended families."
      >
        <Button to="/communities/create">Create a community</Button>
        <Button to="/communities/app" variant="secondary">
          See the tracker app
        </Button>
      </PageHeader>

      <Section>
        <Container size="narrow">
          <Reveal>
            <div className="rich-text">
              <p>
                Reducing greenhouse gas emissions, most notably carbon dioxide, does not have to be
                difficult nor does it have to be costly. The mission of Carbonless Community is to
                assist groups of like-minded people in executing easy and thoughtful measures that
                not only reduce their personal carbon footprints, but also reduce the carbon
                footprint of the larger community to which they belong — all the while, saving money.
              </p>
              <p>
                We understand that individuals have varying abilities to reduce their impact on the
                planet, but we ask each member to commit to doing the best they can in reducing
                carbon emissions by signing the Carbonless Community Commitment.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section tone="alt">
        <Container size="wide">
          <Reveal>
            <Eyebrow>Why bother</Eyebrow>
            <h2 className="font-display text-3xl leading-tight font-semibold text-[var(--ink)] sm:text-4xl">
              Three reasons to create your own
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {reasons.map((r, i) => (
              <Reveal key={r.title} delay={i * 90}>
                <div className="h-full rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-8">
                  <p className="font-display text-3xl font-semibold text-forest-300 dark:text-forest-700">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 className="font-display mt-4 text-xl font-semibold text-[var(--ink)]">
                    {r.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-[var(--ink-muted)]">{r.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}
