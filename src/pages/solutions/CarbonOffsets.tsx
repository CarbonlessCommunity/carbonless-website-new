import SolutionPage from '@/components/SolutionPage'
import { Quote } from '@/components/ui'
import { offsetProjects } from '@/data/solutions'
import { contacts } from '@/data/site'

export default function CarbonOffsets() {
  return (
    <SolutionPage slug="carbon-offsets">
      <Quote attribution="Craig Schuttenberg" role="President of Carbonless Community">
        If chosen correctly, carbon offsets can be an effective way to mitigate your carbon
        footprint. But not all offsets are equal. We can help you choose the right combination of
        price and effectiveness when buying offsets to reach your carbon reduction goals.
      </Quote>

      <div className="rich-text mt-14">
        <p>
          With many corporations and institutions having well-established processes for decarbonizing
          their electricity purchases (i.e., Scope 2 emissions), proactive entities are now moving on
          to addressing Scope 1 and Scope 3 GHG emissions. While this may seem like a daunting task,
          our investigation shows that emissions from using fossil fuels for building heating and
          transportation can be mitigated at{' '}
          <strong>less than half the cost of offsetting current electricity purchases.</strong>
        </p>
        <p>
          In response to our findings, Carbonless Community has joined forces with UCapture. The goal
          of our effort is to offer carbon mitigation alternatives that better meet our clients’
          environmental and social justice goals in a more cost-effective manner.
        </p>
        <p>
          We only offer carbon offsets. And because we only sell carbon offsets (and not RECs), we
          work to match the underlying project with your environmental goals and objectives. From us
          you don’t just get a generic carbon offset. With our projects you get to know not only the
          amount of carbon offset, but you also get to see who the local beneficiaries of the project
          are and how it enhances their lives.
        </p>
        <p>
          On UCapture’s website there are over 25 carbon-reducing projects in locations around the
          world. We endeavor to provide carbon offsets that are sustainable and resilient over the
          long term; and all projects are independently verified by the Gold Standard, American
          Carbon Registry, Climate Action Reserve and others.
        </p>

        <h2>What a carbon offset actually is</h2>
        <p>
          <strong>Carbon offsets</strong> result from projects that avoid, reduce or remove
          greenhouse gases from the atmosphere. The unit of measure is one metric tonne of CO₂
          equivalent (MTCO₂e). Like RECs they are subjected to third-party certification to ensure
          compliance. But unlike RECs, they can be used to reduce any Scope 1, 2 or 3 carbon-emitting
          source from your facility’s carbon footprint accounting, including electricity purchases.
        </p>
        <p>
          And because the direct beneficiary of carbon offsets is the earth’s atmosphere, projects
          generating offsets can be located anywhere on the planet with equal efficacy.
        </p>
      </div>

      <div className="mt-16">
        <h2 className="font-display text-2xl font-semibold text-[var(--ink)]">
          Projects we currently support
        </h2>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {offsetProjects.map((project) => (
            <a
              key={project.url}
              href={project.url}
              target="_blank"
              rel="noreferrer noopener"
              className="group overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] transition-all duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:border-forest-400 hover:shadow-lg"
            >
              <img
                src={project.image}
                alt={`UCapture project: ${project.name}`}
                className="w-full object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-105"
                loading="lazy"
              />
            </a>
          ))}
        </div>
      </div>

      <div className="mt-16 rounded-3xl border border-[var(--line)] bg-[var(--surface-alt)] p-8 sm:p-10">
        <h2 className="font-display text-2xl font-semibold text-[var(--ink)]">
          Please call us for more information
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {contacts.map((c) => (
            <div key={c.email} className="text-sm">
              <p className="font-semibold text-[var(--ink)]">{c.name}</p>
              <p className="mt-1">
                <a
                  href={c.phoneHref}
                  className="text-[var(--ink-muted)] transition-colors hover:text-forest-600"
                >
                  {c.phone} (mobile)
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${c.email}`}
                  className="break-all text-forest-700 underline underline-offset-3 dark:text-forest-300"
                >
                  {c.email}
                </a>
              </p>
            </div>
          ))}
        </div>
      </div>
    </SolutionPage>
  )
}
