import { imageSize } from '@/lib/imageSize'
import { asset } from '@/lib/asset'
import SolutionPage from '@/components/SolutionPage'

export default function EnerFusion() {
  return (
    <SolutionPage slug="enerfusion" heroImage={asset('/images/enerfusion-logo.webp')}>
      <div className="rich-text">
        <p>
          EnerFusion Inc. is a provider of solar PV charging tables that provide not only meeting
          space, but also 110 VAC and USB charging ports for laptops, smart phones and other
          electrical devices.
        </p>
        <p>
          The vision of{' '}
          <a href="http://www.enerfusioninc.com" target="_blank" rel="noreferrer noopener">
            EnerFusion’s
          </a>{' '}
          owners and workforce is providing consumers with an easy, convenient, and safe source of
          “green” power to connect and recharge portable electronic devices when away from the home
          or office. Products are aimed to ensure that whenever you need to plug in, we will be there
          to provide green power for your electronic devices.
        </p>
        <p>
          Through Carbonless Community, EnerFusion also provides AASHE members special pricing on
          their products. They are excellent PV demonstration projects and they show your commitment
          to renewable energy in an affordable, onsite fashion.
        </p>
      </div>

      <p className="font-display mt-12 rounded-3xl bg-forest-950 px-8 py-10 text-center text-2xl font-semibold text-forest-200 sm:text-3xl">
        Go on, plug in green.
      </p>

      <img
        src={asset('/images/orion.webp')}
        {...imageSize(asset('/images/orion.webp'))}
        alt="An EnerFusion solar PV charging table"
        className="mt-12 w-full rounded-2xl border border-[var(--line)] object-cover"
        loading="lazy"
      />
    </SolutionPage>
  )
}
