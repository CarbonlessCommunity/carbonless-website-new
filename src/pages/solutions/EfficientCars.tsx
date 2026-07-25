import { asset } from '@/lib/asset'
import SolutionPage from '@/components/SolutionPage'

export default function EfficientCars() {
  return (
    <SolutionPage slug="efficient-cars" heroImage={asset('/images/go-green-transportation-car.webp')}>
      <div className="rich-text">
        <p>
          We know there are a lot of considerations that go into buying a car — why not buy one that
          will not only save money on fuel, but also reduce future carbon emissions?
        </p>
        <p>
          To assist you in the future, we will secure an agreement with a buying service that will
          get you the best deal on a car from a local dealer, and we have a listing of suggested
          fuel-efficient cars for you to consider.{' '}
          <strong>All of the cars burn significantly less fuel than the current CAFE standard.</strong>
        </p>
      </div>

      <div className="mt-12 rounded-3xl border border-dashed border-[var(--line)] bg-[var(--surface-alt)] p-8 text-center sm:p-10">
        <p className="font-display text-xl font-semibold text-[var(--ink)]">
          The vehicle listing is coming soon
        </p>
        <p className="mt-3 text-[var(--ink-muted)]">
          Get in touch and we’ll let you know as soon as it’s published.
        </p>
      </div>
    </SolutionPage>
  )
}
