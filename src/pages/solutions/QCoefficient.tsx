import { asset } from '@/lib/asset'
import SolutionPage from '@/components/SolutionPage'

export default function QCoefficient() {
  return (
    <SolutionPage slug="qcoefficient" heroImage={asset('/images/qlogoBlue.webp')}>
      <div className="rich-text">
        <p>
          Contracts from renewable generators don’t typically guarantee or specify{' '}
          <em>when</em> you will receive your electricity. As electricity is a real-time commodity —
          with a price that changes constantly throughout the day — you don’t know what your ultimate
          cost will be to operate your facility.
        </p>
        <p>
          QCoefficient provides the technology and structure to use the thermal mass of your
          building(s) to vary consumption over short periods, minimizing electricity price risk.
        </p>
      </div>
    </SolutionPage>
  )
}
