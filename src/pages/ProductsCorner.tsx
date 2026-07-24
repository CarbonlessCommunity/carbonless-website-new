import PageHeader from '@/components/PageHeader'
import { Button, Container, Reveal, Section } from '@/components/ui'
import { usePageMeta } from '@/lib/hooks'

export default function ProductsCorner() {
  usePageMeta(
    'Products Corner',
    'Repurposed and reclaimed materials — reduce, reuse, repurpose.',
  )

  return (
    <>
      <PageHeader
        eyebrow="Products Corner"
        title="Reduce. Reuse. Repurpose."
        lede="Products and suppliers worth knowing about, starting with reclaimed industrial materials."
      />

      <Section>
        <Container size="narrow">
          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-[var(--line)]">
              <div className="bg-forest-700 px-8 py-10 text-center sm:px-12">
                <p className="font-display text-3xl font-semibold text-white">
                  <span className="text-forest-300">Repurposed</span>Materials
                </p>
                <p className="mt-4 text-forest-100">
                  We BUY — SELL — TRADE all kinds of materials. If you don’t want it, we might.
                </p>
                <a
                  href="tel:+18772828733"
                  className="font-display mt-5 inline-block text-2xl font-semibold text-white underline underline-offset-6"
                >
                  1-877-282-8733
                </a>
              </div>

              <div className="p-8 sm:p-10">
                <div className="rich-text">
                  <p>
                    RepurposedMaterials offers a wide selection of used industrial materials for
                    sale. Explore their collections to find great prices on reclaimed materials like
                    billboard vinyl, surplus glass, used wood, and much more.
                  </p>
                  <p>
                    <strong>Repurposing</strong> is the act of taking one material and using it for
                    another purpose. When a product has reached the end of its useful life in its
                    primary industry, that doesn’t mean it will have no other use. Rather than just
                    tossing used materials into a landfill, repurposing is all about finding
                    innovative ways to make use of these materials.
                  </p>
                </div>
                <div className="mt-8">
                  <Button href="https://www.repurposedmaterialsinc.com/view-all-categories/">
                    Browse the categories
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  )
}
