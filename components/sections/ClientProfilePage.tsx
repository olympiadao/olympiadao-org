import Link from "next/link";
import { Suspense } from "react";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { NavHeader } from "@/components/sections/NavHeader";
import { NavHeaderFallback } from "@/components/ui/SsrFallbacks";
import { FooterSection } from "@/components/sections/FooterSection";
import { ClientRoleBadge, LanguageChip } from "@/components/ui/ClientBadges";
import { clientSectionId, etcClient, etcClients } from "@/lib/clients";

/** A link that leaves the site, versus one that stays on it. */
function isExternal(href: string): boolean {
  return href.startsWith("http");
}

export function ClientProfilePage({ slug }: { slug: string }) {
  const client = etcClient(slug);
  const other = etcClients.find((entry) => entry.slug !== slug);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://olympiadao.org" },
      { "@type": "ListItem", position: 2, name: "Clients", item: "https://olympiadao.org/clients" },
      {
        "@type": "ListItem",
        position: 3,
        name: client.name,
        item: `https://olympiadao.org/clients/${client.slug}`,
      },
    ],
  };

  return (
    <>
      <Suspense fallback={<NavHeaderFallback />}>
        <NavHeader />
      </Suspense>
      <main>
        <section className="hero-gradient relative pt-36 pb-12">
          <div className="relative z-10 mx-auto max-w-5xl px-6">
            <FadeIn>
              <Link
                href="/clients"
                className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-[var(--brand-green)] transition-opacity duration-200 hover:opacity-70"
              >
                <ArrowLeft size={13} aria-hidden="true" />
                Clients
              </Link>
              <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">{client.name}</h1>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <ClientRoleBadge role={client.role} label={client.roleLabel} />
                <LanguageChip language={client.language} />
              </div>
              <p className="mt-5 max-w-3xl text-lg text-[var(--text-muted)]">{client.summary}</p>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                {client.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target={isExternal(link.href) ? "_blank" : undefined}
                    rel={isExternal(link.href) ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--brand-green)] transition hover:opacity-80"
                  >
                    {link.label}
                    {isExternal(link.href) ? <ExternalLink size={12} aria-hidden="true" /> : null}
                  </a>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* At a glance */}
        <section aria-label="At a glance" className="px-6 pb-4">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <dl className="grid gap-px overflow-hidden rounded-xl border border-[var(--divider)] bg-[var(--divider)] sm:grid-cols-2 lg:grid-cols-4">
                {client.facts.map((fact) => (
                  <div key={fact.label} className="bg-[var(--bg-elevated)] px-5 py-4">
                    <dt className="font-mono text-xs uppercase tracking-widest text-[var(--text-subtle)]">
                      {fact.label}
                    </dt>
                    <dd className="mt-1.5 text-sm font-semibold leading-snug">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </FadeIn>
          </div>
        </section>

        {client.sections.map((section, i) => (
          <section
            key={section.heading}
            id={clientSectionId(section.heading)}
            aria-labelledby={`${clientSectionId(section.heading)}-heading`}
            className={i % 2 === 1 ? "section-alt px-6 py-12" : "px-6 py-12"}
          >
            <div className="mx-auto max-w-5xl">
              <FadeIn>
                <div className="grid gap-8 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)]">
                  <h2
                    id={`${clientSectionId(section.heading)}-heading`}
                    className="text-2xl font-bold tracking-tight lg:sticky lg:top-28 lg:self-start"
                  >
                    {section.heading}
                  </h2>

                  <div>
                    {section.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 40)}
                        className="mb-4 text-[0.9375rem] leading-relaxed text-[var(--text-muted)] last:mb-0"
                      >
                        {paragraph}
                      </p>
                    ))}

                    {section.list ? (
                      <dl className="mt-6 space-y-3">
                        {section.list.map((item) => (
                          // A mono term is a command or a flag and can be far wider than
                          // the term column, which broke `ghcr.io/fukuii-project/...`
                          // mid-word. Those stack full width instead of sitting beside
                          // the detail.
                          <div
                            key={item.term}
                            className={`rounded-lg border border-[var(--divider)] bg-[var(--bg-elevated)] px-4 py-3 ${
                              item.mono ? "" : "sm:flex sm:items-baseline sm:gap-4"
                            }`}
                          >
                            <dt
                              className={
                                item.mono
                                  ? "font-mono text-[0.8125rem] font-semibold break-all text-[var(--text-primary)]"
                                  : "shrink-0 text-sm font-semibold text-[var(--text-primary)] sm:w-56"
                              }
                            >
                              {item.term}
                            </dt>
                            <dd
                              className={`text-sm leading-relaxed text-[var(--text-muted)] ${
                                item.mono ? "mt-1.5" : "mt-1 sm:mt-0"
                              }`}
                            >
                              {item.detail}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    ) : null}

                    {section.link ? (
                      <a
                        href={section.link.href}
                        target={isExternal(section.link.href) ? "_blank" : undefined}
                        rel={isExternal(section.link.href) ? "noopener noreferrer" : undefined}
                        className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--brand-green)] transition hover:opacity-80"
                      >
                        {section.link.label}
                        {isExternal(section.link.href) ? (
                          <ExternalLink size={12} aria-hidden="true" />
                        ) : (
                          <ArrowRight size={13} aria-hidden="true" />
                        )}
                      </a>
                    ) : null}
                  </div>
                </div>
              </FadeIn>
            </div>
          </section>
        ))}

        <SectionDivider />

        <nav aria-label="More on clients" className="px-6 py-12">
          <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:flex-row">
            {other ? (
              <Link
                href={`/clients/${other.slug}`}
                className="flex-1 rounded-xl border border-[var(--divider)] bg-[var(--bg-elevated)] px-5 py-4 transition-colors duration-200 hover:border-[var(--border-brand)]"
              >
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-subtle)]">
                  The other client
                </span>
                <span className="mt-1 block text-sm font-semibold">{other.name}</span>
                <span className="mt-1 block text-sm text-[var(--text-muted)]">{other.summary}</span>
              </Link>
            ) : null}
            <Link
              href="/upgrade"
              className="flex-1 rounded-xl border border-[var(--divider)] bg-[var(--bg-elevated)] px-5 py-4 transition-colors duration-200 hover:border-[var(--border-brand)]"
            >
              <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--text-subtle)]">
                Next
                <ArrowRight size={12} aria-hidden="true" />
              </span>
              <span className="mt-1 block text-sm font-semibold">How to upgrade a node</span>
              <span className="mt-1 block text-sm text-[var(--text-muted)]">
                What an operator has to do before the activation block, and when.
              </span>
            </Link>
          </div>
        </nav>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      </main>
      <FooterSection />
    </>
  );
}
