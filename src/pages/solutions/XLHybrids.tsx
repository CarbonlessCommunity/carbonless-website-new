import { asset } from '@/lib/asset'
import SolutionPage from '@/components/SolutionPage'

export default function XLHybrids() {
  return (
    <SolutionPage slug="xl-hybrids" heroImage={asset('/images/XLlogo.webp')}>
      <div className="rich-text">
        <p>
          A hybrid conversion is a cutting-edge technology designed to transform your existing
          vehicle — or a new one via ship-thru installation — into a hybrid electric vehicle. XL
          Hybrids’ system is designed to work on the most popular Class 2–4 fleet vehicles, including
          cargo and passenger vans, cutaways, and stripped chassis.
        </p>
        <p>
          By adding hybrid powertrains to your fleet, you can cut fuel costs, reduce your exposure to
          fuel price fluctuations, and reduce emissions.{' '}
          <strong>Why wait?</strong>
        </p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {[
          { stat: '20%', label: 'reduction in CO₂ emissions' },
          { stat: 'Class 2–4', label: 'fleet vehicles supported' },
          { stat: 'Ship-thru', label: 'installation available' },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-[var(--line)] bg-[var(--surface-alt)] p-6 text-center"
          >
            <p className="font-display text-3xl font-semibold text-forest-600">
              {item.stat}
            </p>
            <p className="mt-2 text-sm text-[var(--ink-muted)]">{item.label}</p>
          </div>
        ))}
      </div>

      <img
        src={asset('/images/XLPage-1200.webp')}
        srcSet={`${asset('/images/XLPage-600.webp')} 600w, ${asset('/images/XLPage-1200.webp')} 1200w`}
        sizes="(min-width: 768px) 42rem, 100vw"
        alt="XL Hybrids conversion overview"
        className="mt-12 w-full rounded-2xl border border-[var(--line)] bg-white"
        loading="lazy"
      />
    </SolutionPage>
  )
}
