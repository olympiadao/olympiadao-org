import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { NavHeader } from "@/components/sections/NavHeader";
import { NavHeaderFallback } from "@/components/ui/SsrFallbacks";
import { FooterSection } from "@/components/sections/FooterSection";
import { ClientRoleBadge, FutureWorkBadge, LanguageChip } from "@/components/ui/ClientBadges";
import { etcClient, etcClients, executionPlugins, SECURITY_AUDIT_URL } from "@/lib/clients";

export const metadata: Metadata = {
  title: "ETC Clients: Fukuii and Core-Geth",
  description:
    "Fukuii is Ethereum Classic's first native client and the primary client for Olympia. Core-Geth is a go-ethereum derivative in maintenance. ETC plugins for upstream clients are future work.",
  keywords: [
    "Fukuii",
    "Core-Geth",
    "Ethereum Classic client",
    "ETC node",
    "ETC client implementations",
    "Olympia client",
    "Besu ETC",
    "Erigon ETC",
    "Ethrex ETC",
    "Go-Ethereum ETC",
    "Nethermind ETC",
    "Reth ETC",
    "ETC plugin",
    "Scala blockchain client",
    "Go ETC client",
    "ETC node software",
    "Proof-of-Work client",
    "multi-client",
  ],
  alternates: { canonical: "/clients" },
  openGraph: {
    type: "website",
    url: "/clients",
    siteName: "OlympiaDAO",
    title: "Ethereum Classic Client Implementations",
    description:
      "Fukuii, written in Scala 3, is Ethereum Classic's first native client and the primary client for the Olympia era. Core-Geth, a go-ethereum derivative, is maintained through the upgrade. ETC plugins for Besu, Erigon, Ethrex, Go-Ethereum, Nethermind and Reth are future work.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "OlympiaDAO" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ethereum Classic Client Implementations",
    description:
      "Fukuii, written in Scala 3, is Ethereum Classic's first native client and the primary client for the Olympia era. Core-Geth, a go-ethereum derivative, is maintained through the upgrade. ETC plugins for Besu, Erigon, Ethrex, Go-Ethereum, Nethermind and Reth are future work.",
    images: ["/og-image.png"],
  },
};

/**
 * Why the network carries more than one implementation. The middle point is the
 * concrete instance rather than the general argument, which is what makes the
 * Core-Geth framing further down explicit instead of implied.
 */
const multiClientReasons = [
  {
    heading: "One client's bugs become the network's rules",
    body: "If every node runs the same software, nothing on the network is in a position to disagree with it. A second independent implementation of the same specification turns a silent wrong answer into a visible argument between two clients, which is the only way a fault of that kind gets caught before it becomes the network's history.",
  },
  {
    heading: "Software stops being maintained",
    body: "This is not a hypothetical on Ethereum Classic. The client the network relied on went 21 months without a maintenance release while six security fixes waited, and in March 2026 its mainnet bootnodes came under active attack. A network with one client has no answer to that. A network with two independent ones does.",
    link: { label: "The record, in full", href: SECURITY_AUDIT_URL },
  },
  {
    heading: "Operators are not all the same",
    body: "An exchange, a mining pool, a block explorer and a person running a node at home are solving different problems on different infrastructure. More than one implementation means the choice of language, runtime and operational model belongs to the operator rather than to the protocol.",
  },
];

export default function ClientsPage() {
  const fukuii = etcClient("fukuii");
  const coreGeth = etcClient("core-geth");

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Ethereum Classic client implementations",
    itemListElement: etcClients.map((client, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: client.name,
      url: `https://olympiadao.org/clients/${client.slug}`,
    })),
  };

  return (
    <>
      <Suspense fallback={<NavHeaderFallback />}>
        <NavHeader />
      </Suspense>
      <main>
        {/* Hero */}
        <section className="hero-gradient relative pt-36 pb-16">
          <div className="relative z-10 mx-auto max-w-5xl px-6">
            <FadeIn>
              <p className="text-sm font-mono uppercase tracking-widest text-[var(--brand-green)]">
                Olympia
              </p>
              <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
                Client <span className="text-[var(--brand-green)]">Implementations</span>
              </h1>
            </FadeIn>
            <FadeIn delay={100}>
              <p className="max-w-3xl text-lg text-[var(--text-muted)]">
                A client is the software a node runs. It keeps a copy of the chain, checks every
                block against the rules, and passes on the ones that hold up. Ethereum Classic has
                two clients through the Olympia upgrade, and for the first time one of them was
                built for this network rather than adapted from an Ethereum client.
              </p>
            </FadeIn>
          </div>
        </section>

        <SectionDivider />

        {/* Why more than one */}
        <section
          aria-labelledby="why-more-than-one"
          className="section-alt px-6 py-16"
        >
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <h2 id="why-more-than-one" className="text-2xl font-bold tracking-tight">
                Why the network needs more than one
              </h2>
            </FadeIn>
            <ol className="mt-8 space-y-px overflow-hidden rounded-xl border border-[var(--divider)] bg-[var(--divider)]">
              {multiClientReasons.map((reason, i) => (
                <li key={reason.heading}>
                  <FadeIn delay={i * 80}>
                    <div className="bg-[var(--bg-elevated)] px-6 py-6 sm:flex sm:gap-6">
                      <span
                        aria-hidden="true"
                        className="font-mono text-sm font-semibold text-[var(--brand-green)] sm:pt-0.5"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="mt-2 sm:mt-0">
                        <h3 className="text-base font-semibold">{reason.heading}</h3>
                        <p className="mt-2 text-[0.9375rem] leading-relaxed text-[var(--text-muted)]">
                          {reason.body}
                        </p>
                        {reason.link ? (
                          <a
                            href={reason.link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--brand-green)] transition hover:opacity-80"
                          >
                            {reason.link.label}
                            <ExternalLink size={12} aria-hidden="true" />
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </FadeIn>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <SectionDivider />

        {/* The two clients. Deliberately not two equal cards: Fukuii is primary. */}
        <section aria-labelledby="the-clients" className="px-6 py-16">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <h2 id="the-clients" className="text-2xl font-bold tracking-tight">
                The clients
              </h2>
              <p className="mt-2 max-w-3xl text-sm text-[var(--text-muted)]">
                Both carry the Olympia parameters. What settles conformance is not a client&rsquo;s
                own account of itself: cross-client state-transition equivalence is demonstrated on
                Mordor before a mainnet activation block is scheduled. The two are not
                interchangeable choices, and the page for each says why.
              </p>
            </FadeIn>

            {/* Primary */}
            <FadeIn delay={80}>
              <article className="mt-8 rounded-xl border border-[var(--border-brand)] bg-[var(--bg-elevated)] p-6 md:p-8">
                <div className="grid gap-8 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <ClientRoleBadge role={fukuii.role} label={fukuii.roleLabel} />
                      <LanguageChip language={fukuii.language} />
                    </div>
                    <h3 className="mt-3 text-2xl font-bold tracking-tight">{fukuii.name}</h3>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-[var(--text-secondary)]">
                      {fukuii.summary}
                    </p>
                    <Link
                      href={`/clients/${fukuii.slug}`}
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--brand-green)] transition hover:opacity-80"
                    >
                      More on {fukuii.name}
                      <ArrowRight size={13} aria-hidden="true" />
                    </Link>
                  </div>

                  <div>
                    <p className="text-[0.9375rem] leading-relaxed text-[var(--text-muted)]">
                      {fukuii.cardDescription}
                    </p>
                    <ul className="mt-5 space-y-2.5">
                      {fukuii.cardPoints.map((point) => (
                        <li key={point} className="flex gap-3 text-sm text-[var(--text-muted)]">
                          <span
                            aria-hidden="true"
                            className="mt-[0.4rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-green)]"
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                      {fukuii.links.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--brand-green)] transition hover:opacity-80"
                        >
                          {link.label}
                          <ExternalLink size={12} aria-hidden="true" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            </FadeIn>

            {/* Maintained */}
            <FadeIn delay={160}>
              <article className="mt-5 rounded-xl border border-[var(--divider)] bg-[var(--bg-elevated)] p-6">
                <div className="grid gap-6 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <ClientRoleBadge role={coreGeth.role} label={coreGeth.roleLabel} />
                      <LanguageChip language={coreGeth.language} />
                    </div>
                    <h3 className="mt-3 text-xl font-bold tracking-tight">{coreGeth.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                      {coreGeth.summary}
                    </p>
                    <Link
                      href={`/clients/${coreGeth.slug}`}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--brand-green)] transition hover:opacity-80"
                    >
                      More on {coreGeth.name}
                      <ArrowRight size={13} aria-hidden="true" />
                    </Link>
                  </div>

                  <div>
                    <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                      {coreGeth.cardDescription}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                      {coreGeth.links.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--brand-green)] transition hover:opacity-80"
                        >
                          {link.label}
                          <ExternalLink size={12} aria-hidden="true" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            </FadeIn>
          </div>
        </section>

        <SectionDivider />

        {/* Plugins */}
        <section aria-labelledby="etc-plugins" className="section-alt px-6 py-16">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <div className="flex flex-wrap items-center gap-3">
                <h2 id="etc-plugins" className="text-2xl font-bold tracking-tight">
                  Plugins for upstream clients
                </h2>
                <FutureWorkBadge />
              </div>
              <div className="mt-4 max-w-3xl space-y-4">
                <p className="text-[0.9375rem] leading-relaxed text-[var(--text-muted)]">
                  Ethereum clients keep the part that agrees on blocks separate from the part that
                  executes them. A plugin uses that seam to add Ethereum Classic support to a client
                  that already exists, so nobody has to maintain a full fork of it just to follow
                  this chain.
                </p>
                <p className="text-[0.9375rem] leading-relaxed text-[var(--text-muted)]">
                  A plugin is not a client of its own and it carries no mining or Proof-of-Work
                  consensus, which is why the ones below would serve exchanges, RPC providers, block
                  explorers and indexers rather than miners. All six plugins are future work, and
                  none of them ships today.
                </p>
                <p className="text-[0.9375rem] leading-relaxed text-[var(--text-muted)]">
                  Two of the six clients are separately in scope, and that is a different thing from
                  a plugin for them. The specifications track Besu and Nethermind as Olympia
                  implementations, carrying the era gas target hardcoded so miner configuration
                  cannot override it. An implementation of the client is not the plugin described
                  here, and neither fact cancels the other.
                </p>
              </div>
            </FadeIn>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {executionPlugins.map((plugin, i) => (
                <li key={plugin.name} className="h-full">
                  <FadeIn delay={i * 60} className="h-full">
                    <div className="flex h-full flex-col rounded-xl border border-[var(--divider)] bg-[var(--bg-elevated)] p-5">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-semibold">{plugin.name}</h3>
                        <LanguageChip language={plugin.language} />
                      </div>
                      <p className="mt-3 flex-1 text-xs leading-relaxed text-[var(--text-muted)]">
                        {plugin.description}
                      </p>
                      {plugin.tracked ? (
                        <p className="mt-2.5 border-t border-[var(--divider)] pt-2.5 text-xs leading-relaxed text-[var(--text-secondary)]">
                          The specifications track this client as an Olympia implementation,
                          separately from the plugin.
                        </p>
                      ) : null}
                      <a
                        href={plugin.upstreamUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-[var(--brand-green)] transition hover:opacity-80"
                      >
                        Upstream project
                        <ExternalLink size={11} aria-hidden="true" />
                      </a>
                    </div>
                  </FadeIn>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <SectionDivider />

        {/* Act */}
        <section aria-labelledby="clients-next" className="px-6 py-14">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <h2 id="clients-next" className="text-2xl font-bold tracking-tight">
                Running one
              </h2>
              <p className="mt-2 max-w-3xl text-[0.9375rem] leading-relaxed text-[var(--text-muted)]">
                Every node has to be on an Olympia release before the activation block, whichever
                client it runs. The upgrade page has the instructions and the timing.
              </p>
              <Link
                href="/upgrade"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[var(--brand-green)] px-5 py-2.5 text-sm font-semibold text-[var(--background)] transition hover:opacity-90"
              >
                How to upgrade a node
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </FadeIn>
          </div>
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
        />
      </main>
      <FooterSection />
    </>
  );
}
