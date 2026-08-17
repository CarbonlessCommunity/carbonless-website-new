import { imageSize } from '@/lib/imageSize'
import { asset } from '@/lib/asset'
import SolutionPage from '@/components/SolutionPage'

const advantages = [
  'You save 20% compared to ComEd’s energy pricing for well into the future',
  'The program is available to all ComEd residential customers — including renters, and co-op and condo owners along with home owners',
  'The agreement is no-risk: you can cancel at any time, and there are no fees',
]

export default function CommunitySolar() {
  return (
    <SolutionPage slug="community-solar" heroImage={asset('/images/nexamp_logo.webp')}>
      <div className="rich-text">
        <p>
          Every so often, we come across an <strong>energy-related opportunity</strong> for our
          clients that is outside our core business of assisting commercial, industrial and
          institutional customers with retail supply of electricity and natural gas. This is one of
          those times. This opportunity has to do with{' '}
          <strong>electricity supply for your home</strong>. You <strong>save money</strong> and you
          are <strong>truly supporting renewable energy in northern Illinois</strong>.
        </p>
        <p>
          We say “truly” because until recently, retail electricity suppliers who state that they are
          selling you renewable energy are almost exclusively selling Renewable Energy Certificates
          (RECs). Purchasing RECs from an established wind plant located in some other state changes
          nothing in the environment. These other electricity plans are still delivering 60% of your
          electricity from generators that burn coal and natural gas.
        </p>
        <p>
          This opportunity is different. It’s electricity generation that comes from newly erected
          solar farms in Illinois under the Community Solar program.{' '}
          <strong>The solar-energy provider is Nexamp.</strong>
        </p>
      </div>

      <div className="mt-12 rounded-3xl border border-[var(--line)] bg-[var(--surface-alt)] p-8 sm:p-10">
        <h2 className="font-display text-2xl font-semibold text-[var(--ink)]">
          Besides supporting construction, the program offers several advantages
        </h2>
        <ul className="mt-6 space-y-4">
          {advantages.map((a) => (
            <li key={a} className="flex gap-3.5 leading-relaxed text-[var(--ink-muted)]">
              <svg
                viewBox="0 0 20 20"
                aria-hidden="true"
                className="mt-1 h-5 w-5 shrink-0 text-forest-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="10" cy="10" r="8" />
                <path d="m6.5 10 2.5 2.5 4.5-5" />
              </svg>
              <span>{a}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rich-text mt-12">
        <p>
          I’ve signed up for my own home. Starting January 1, 2021, I will be receiving solar powered
          electricity from a solar farm located in Harvard, Illinois.{' '}
          <strong>It was a good way of supporting renewable energy in Illinois</strong> without
          having to cut down the huge maple trees that provide summer shade to our house — and I’m
          saving 20%.
        </p>
        <p>
          To sign up, please go to{' '}
          <a href="http://www.ilsolar.us" target="_blank" rel="noreferrer noopener">
            www.ilsolar.us
          </a>{' '}
          or phone (844) 303-4937.
        </p>
        <p>
          Thank you for your attention — and be well. If you would like to share your thoughts on the
          above, we’d love to hear from you.
        </p>
        <p>
          Regards,
          <br />
          Craig Schuttenberg
          <br />
          <a href="mailto:craig@carbonlesscommunity.com">craig@carbonlesscommunity.com</a>
        </p>
      </div>

      <blockquote className="mt-12 rounded-3xl border border-[var(--line)] bg-[var(--surface-alt)] p-8">
        <p className="font-display text-lg leading-relaxed text-[var(--ink)] italic">
          “Joining a solar community farm was the best option for me — no upfront costs, no panels
          that can deteriorate over time and subsequently produce less power. Plus, Nexamp customer
          service is excellent.”
        </p>
        <footer className="mt-4 text-sm text-[var(--ink-muted)]">
          Pat W, Nexamp Subscriber
        </footer>
      </blockquote>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        <img
          src={asset('/images/Nexamp_1.webp')}
          {...imageSize(asset('/images/Nexamp_1.webp'))}
          alt="Nexamp community solar"
          className="w-full rounded-2xl border border-[var(--line)] object-cover"
          loading="lazy"
        />
        <img
          src={asset('/images/Nexamp_2.webp')}
          {...imageSize(asset('/images/Nexamp_2.webp'))}
          alt="Nexamp community solar"
          className="w-full rounded-2xl border border-[var(--line)] object-cover"
          loading="lazy"
        />
      </div>
    </SolutionPage>
  )
}
