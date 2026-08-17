import { Link } from 'react-router'
import { imageSize } from '@/lib/imageSize'
import SolutionPage from '@/components/SolutionPage'
import { Arrow, Quote } from '@/components/ui'
import { vettingCriteria } from '@/data/offsets'
import { supportedProjects } from '@/data/projects'
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
          A <strong>carbon offset</strong> comes from a project that avoids, reduces, destroys or
          removes greenhouse gases. The unit is one metric tonne of CO₂ equivalent (MTCO₂e), and
          unlike a Renewable Energy Certificate it can be applied against any Scope 1, 2 or 3
          source on your inventory — building heat, fleet fuel, air travel, supply chain,
          electricity. Because the beneficiary is the atmosphere rather than a particular grid, a
          project anywhere on the planet counts equally.
        </p>
        <p>
          That breadth is the practical argument. The argument that matters more is that an offset
          has to answer for itself:{' '}
          <Link to="/recs-vs-offsets">a REC never has to prove it changed anything</Link>, and an
          offset from a credible standard is issued only after someone has asked whether the
          reduction would have happened without the money.
        </p>
        <p>
          We only sell carbon offsets. We don’t sell RECs, and we no longer chase retail electricity
          and gas brokering — a market where the way to grow is to call buyers who are already
          fielding calls from a dozen brokers quoting a lower number. Selling offsets is harder work
          and thinner margin, which is precisely why so few people do it and why the buyers who care
          about the difference are so poorly served.
        </p>
        <p>
          For clients addressing Scope 1 and Scope 3 after having decarbonized their electricity
          purchases, our work has shown that emissions from fossil fuels used for building heating
          and transportation can often be mitigated at{' '}
          <strong>less than half the cost of offsetting current electricity purchases.</strong>
        </p>

        <h2>What we refuse</h2>
        <p>
          The fair criticism of offsets is that some projects do nothing of consequence. The classic
          case is a promise not to log a stand of trees that nobody had any intention of logging:
          money changes hands, a certificate is issued, and the forest goes on standing exactly as
          it would have. That happens often enough that anyone selling offsets has to answer for it.
        </p>
        <p>
          Our answer is a published standard and a monthly write-up held to it. These are the six
          questions every project has to survive before we will put it in front of you.
        </p>
      </div>

      <ol className="mt-10 grid gap-4 sm:grid-cols-2">
        {vettingCriteria.map((criterion, i) => (
          <li
            key={criterion.title}
            className="rounded-2xl border border-[var(--line)] bg-[var(--surface-alt)] p-6"
          >
            <p className="font-display text-sm font-semibold text-forest-700">
              {String(i + 1).padStart(2, '0')}
            </p>
            <h3 className="font-display mt-2 text-lg font-semibold text-[var(--ink)]">
              {criterion.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--ink-muted)]">{criterion.body}</p>
          </li>
        ))}
      </ol>

      <div className="mt-10 rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-8">
        <h2 className="font-display text-2xl font-semibold text-[var(--ink)]">
          One project, in full, every month
        </h2>
        <p className="mt-3 leading-relaxed text-[var(--ink-muted)]">
          Rather than ask you to take the checklist on faith, we apply it in public — a single
          project written up each month against all six questions, including the strongest fair
          objection to it and our response.
        </p>
        <Link
          to="/project-of-the-month"
          className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-forest-700"
        >
          Read the Project of the Month
          <Arrow />
        </Link>
      </div>

      <div className="rich-text mt-16">
        <h2>Who we work with</h2>
        <p>
          Carbonless Community has joined forces with UCapture to offer carbon mitigation
          alternatives that better meet our clients’ environmental and social justice goals in a
          more cost-effective manner. On UCapture’s site there are over 25 carbon-reducing projects
          around the world, independently verified by the Gold Standard, the American Carbon
          Registry, the Climate Action Reserve and others.
        </p>
        <p>
          From us you don’t just get a generic tonne. You get to know the amount of carbon offset,
          who the local beneficiaries are, and how the project changes their lives — which is the
          part your own stakeholders will actually read.
        </p>
      </div>

      <div className="mt-12">
        <h2 className="font-display text-2xl font-semibold text-[var(--ink)]">
          Projects we currently support
        </h2>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {supportedProjects.map((project) => (
            <a
              key={project.url}
              href={project.url}
              target="_blank"
              rel="noreferrer noopener"
              className="group overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] transition-all duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:border-forest-400 hover:shadow-lg"
            >
              <img
                src={project.image}
                {...imageSize(project.image)}
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
                  className="break-all text-forest-700 underline underline-offset-3"
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
