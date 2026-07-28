import SolutionPage from '@/components/SolutionPage'

export default function Batteries() {
  return (
    <SolutionPage slug="batteries" heroImage={null}>
      <div className="rich-text">
        <p>
          Most behind-the-meter hardware has to earn its keep one way. A battery can earn it three
          or four ways at once, and that is the whole reason it is still interesting after the
          change in federal tax treatment thinned out the case for rooftop solar.
        </p>

        <h2>What a battery is actually paid for</h2>
        <ul>
          <li>
            <strong>Resilience.</strong> Critical load rides through an outage — the reason most
            hospitals, data closets, cold storage and municipal facilities start the conversation.
          </li>
          <li>
            <strong>Demand charges.</strong> On a demand-billed account a large share of the invoice
            is set by a handful of fifteen-minute peaks a month. Shaving those is the most legible
            saving on the list, because it shows up on the next bill.
          </li>
          <li>
            <strong>Frequency response and other ancillary services.</strong> Grid operators pay for
            fast, accurate response, and a battery is better at it than almost anything else on the
            system. What that is worth depends entirely on which market you sit in and what the
            current rules allow.
          </li>
          <li>
            <strong>Energy arbitrage.</strong> Charge when power is cheap, discharge when it isn’t.
            Rarely the whole case on its own; often the thing that closes the gap.
          </li>
        </ul>

        <h2>Where the economics tend to work</h2>
        <p>
          Facilities with real demand charges, a load worth protecting, and a utility or market
          program that pays for flexibility. Where any one of those three is missing, the payback
          usually stretches past the point where anyone signs, and we would rather say so early than
          run a study to reach the same answer slowly.
        </p>

        <h2>Where we are with this</h2>
        <p>
          Honestly stated: this is a measure we are building toward rather than one we have been
          running for a decade. The hard part in storage is not the hardware — it is the
          relationships with the developers, financiers and integrators who make a project real, and
          those take time to earn. We would rather tell you that than pretend to a bench we don’t
          have.
        </p>
        <p>
          What we can do today is look at your bills, tell you whether the demand and rate structure
          make a battery worth pursuing at all, and bring in the right party if it does. If your
          site has an outage problem or a demand charge problem, that conversation costs you an
          email.
        </p>
      </div>
    </SolutionPage>
  )
}
