import SolutionPage from '@/components/SolutionPage'

export default function ReverseAuction() {
  return (
    <SolutionPage slug="reverse-auction" heroImage="/images/satori.jpg">
      <div className="rich-text">
        <h2>Online reverse auctions for energy procurement</h2>
        <p>
          We didn’t invent reverse auctions, but we thought long and hard about what information each
          participant in an auction — suppliers, auctioneer and client — would need to make the best
          online reverse auction available. Then we involved some of the best and brightest minds to
          turn our vision into reality. After months of testing to ensure the quality of our product,
          we rolled out our auction.
        </p>
        <p>
          In most auctions, buyers bid the price up as they compete with each other to secure a known
          product or service. In reverse auctions, the roles are switched, as vendors bid down a
          price to sell to a single buyer or buying group. Reverse auctions are most effective in
          purchasing commodities in markets where price transparency is lacking. Electricity
          procurement is a perfect reverse auction application.
        </p>
        <p>
          Technology has taken reverse auctions to a new level, providing additional value for
          consumers through the use of computers and the internet. Putting reverse auctions online
          allows suppliers from remote locations to effortlessly compete and secure business quickly.
          Sellers can continually assess their positions relative to their competitors, and cut
          margins where necessary to secure your business. Online reverse auctions not only reduce
          supplier margins further — thereby providing a lower price to consumers — but also reduce
          the size for economic transactions, bringing cost savings to more customers.
        </p>
      </div>

      <figure className="mt-12">
        <img
          src="/images/auction.png"
          alt="Screenshot of the auction results view a client sees at the conclusion of an auction"
          className="w-full rounded-2xl border border-[var(--line)] bg-white"
          loading="lazy"
        />
        <figcaption className="mt-3 text-sm text-[var(--ink-muted)]">
          What you, the client, see at the conclusion of an auction.
        </figcaption>
      </figure>

      <div className="rich-text mt-12">
        <h2>We give you choices</h2>
        <p>
          The creators of our online reverse auction platform have been working with customers for
          over 15 years in securing cost-effective energy for our clients’ facilities. We know that
          the auction is only one element in helping you reduce the energy expense line item in your
          budget. Our extensive experience issuing RFPs, evaluating responses, and analyzing contract
          terms and conditions adds to the value of our auction process, assuring that the most
          informed decisions are made.
        </p>

        <h2>Green power upgrade at no cost</h2>
        <p>
          Our recent experience on auctions we’ve conducted shows that the money saved by using an
          auction can completely offset the price premium for upgrading the entire purchase to green
          energy.
        </p>

        <h2>Savings for your environmental mission</h2>
        <p>
          As corporations, colleges and universities work towards becoming carbon neutral, there are
          going to be times when budgets are stressed and funding for environmental measures is
          limited. Savings can be created in other areas of procurement which can be utilized to move
          your organization’s environmental mission forward, resulting in a cleaner planet. This is
          where{' '}
          <a
            href="https://www.satorienergy.com/energy-solutions/auction/"
            target="_blank"
            rel="noreferrer noopener"
          >
            Satori Energy
          </a>{' '}
          and their online reverse auction can help. They bring their competitive cost advantage to
          institutions seeking lower-cost commodity energy. Satori Energy not only has an expansive
          back room — providing commodity pricing analysis and customer support — but they are also
          licensed to procure electricity and natural gas in all states where customers have the
          right to choose their energy provider.
        </p>
      </div>
    </SolutionPage>
  )
}
