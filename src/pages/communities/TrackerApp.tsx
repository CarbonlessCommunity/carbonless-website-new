import PageHeader from '@/components/PageHeader'
import { Container, Reveal, Section } from '@/components/ui'
import { usePageMeta } from '@/lib/hooks'

export default function TrackerApp() {
  usePageMeta(
    'CC Tracker App',
    'Helping communities reduce carbon usage through friendly competition.',
  )

  return (
    <>
      <PageHeader
        eyebrow="CC Tracker"
        title="Helping communities reduce carbon usage through competition"
        lede="Log your pro-environmental actions as you go about your day, and watch your score — and your school’s — climb."
      />

      <Section>
        <Container size="narrow">
          <Reveal>
            <div className="rich-text">
              <p>
                Carbonless Community provides an accounting of daily positive actions members of a
                university community — or that of a corporation or other community group — take to
                reduce greenhouse gas emissions, and thus the university’s carbon footprint. A point
                value is assigned to each positive action based on its ability to reduce GHG
                emissions.
              </p>
              <p>
                Through use of Carbonless Community’s website and iPhone app, students, employees,
                faculty and staff can track their daily activities that promote a healthy environment
                and see how these activities directly contribute to a reduction in their school’s
                carbon footprint by watching the points accumulate.
              </p>
              <p>
                Each participant has a personal score, which also contributes to the overall score of
                their university or other community group. With the CC Tracker, participants can log
                their pro-environmental actions as they go about their daily lives and get immediate
                positive feedback as their personal scores, and that of their school, increase.
              </p>

              <h2>Competition and cooperation</h2>
              <p>
                Carbonless Community’s online resources can be used by an individual member of a
                community to watch their positive actions accumulate and see how their efforts
                compare to other members’. However, the most benefit will be gained when members of
                the university — or corporation, organization, etc. — team up into groups that
                compete with each other to accumulate the most points.
              </p>
              <p>
                Teams can challenge each other on a monthly or weekly basis and monitor their efforts
                online. Teams with greater competitive ambition will benefit from the CC Tracker,
                which allows them to check a team’s status from anywhere and at any time.
              </p>
              <p>
                Competition among the groups and teams is vital in making environmental actions
                exciting, but equally important is cooperation within one’s group. Beyond the obvious
                benefits gained by rooting on one’s teammates, when certain positive actions are
                taken together by teammates, their point values increase exponentially. This is
                because the creators of Carbonless Community believe that{' '}
                <strong>
                  a necessary component of saving our environment is getting people to work together.
                </strong>
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  )
}
