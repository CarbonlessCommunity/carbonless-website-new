import SolutionPage from '@/components/SolutionPage'
import { Quote } from '@/components/ui'

export default function EnergyStar() {
  return (
    <SolutionPage slug="energy-star">
      <Quote attribution="Craig Schuttenberg" role="President, Carbonless Community">
        The easiest way to reduce your carbon footprint is to choose the “right” household appliance
        — clothes washer, dishwasher, refrigerator, and so on — when you need to upgrade.
      </Quote>

      <div className="rich-text mt-14">
        <p>
          While it rarely makes economic sense to junk a working appliance in favor of a new
          energy-efficient Energy Star washer, refrigerator, etc., when it comes time to buy a new
          one, it does make sense to purchase an Energy Star rated appliance.
        </p>
        <p>
          <strong>
            The savings over time will outweigh the incremental cost for buying a more efficient
            appliance.
          </strong>
        </p>
        <p>Our goal is to make the appliance decision simple, convenient and cost-effective.</p>
      </div>
    </SolutionPage>
  )
}
