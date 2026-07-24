import PageHeader from '@/components/PageHeader'
import { Container, Reveal, Section } from '@/components/ui'
import { contacts } from '@/data/site'
import { usePageMeta } from '@/lib/hooks'

export default function Contact() {
  usePageMeta('Contact Us', 'Get in touch with the Carbonless Community team.')

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let’s talk"
        lede="Tell us about your organization and where you’re trying to get to. We’ll help you figure out what’s worth doing first."
      />

      <Section>
        <Container size="wide">
          <div className="grid gap-6 md:grid-cols-2">
            {contacts.map((c, i) => (
              <Reveal key={c.email} delay={i * 90}>
                <div className="flex h-full flex-col rounded-3xl border border-[var(--line)] bg-[var(--surface-alt)] p-8 sm:p-10">
                  <h2 className="font-display text-2xl font-semibold text-[var(--ink)]">
                    {c.name}
                  </h2>
                  <p className="mt-1.5 text-sm font-medium text-forest-600 dark:text-forest-300">
                    {c.role}
                  </p>
                  <dl className="mt-8 space-y-5 text-sm">
                    <div>
                      <dt className="text-xs font-semibold tracking-[0.14em] text-[var(--ink-muted)] uppercase">
                        Phone
                      </dt>
                      <dd className="mt-1.5">
                        <a
                          href={c.phoneHref}
                          className="font-display text-xl text-[var(--ink)] transition-colors hover:text-forest-600 dark:hover:text-forest-300"
                        >
                          {c.phone}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold tracking-[0.14em] text-[var(--ink-muted)] uppercase">
                        Email
                      </dt>
                      <dd className="mt-1.5">
                        <a
                          href={`mailto:${c.email}`}
                          className="break-all text-[var(--ink)] transition-colors hover:text-forest-600 dark:hover:text-forest-300"
                        >
                          {c.email}
                        </a>
                      </dd>
                    </div>
                  </dl>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}
