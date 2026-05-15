import type { Metadata } from "next";
import { Suspense } from "react";
import { ExternalLink } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { NavHeader } from "@/components/sections/NavHeader";
import { FooterSection } from "@/components/sections/FooterSection";

export const metadata: Metadata = {
  title: "ETC Client Implementations — Fukuii and Core-Geth",
  description:
    "Independent Ethereum Classic client implementations. Fukuii (Scala) is the primary client for the Olympia era — purpose-built for ETC protocol stewardship. Core-Geth (Go) is actively maintained through Olympia. ETC plugins for Besu, Erigon, Go-Ethereum, Nethermind, and Reth are planned post-Olympia.",
  keywords: [
    "Fukuii",
    "Core-Geth",
    "Ethereum Classic client",
    "ETC node",
    "ETC client implementations",
    "Olympia client",
    "Besu ETC",
    "Erigon ETC",
    "Go-Ethereum ETC",
    "Nethermind ETC",
    "ETC plugin",
    "Scala blockchain client",
    "Go ETC client",
    "ETC node software",
    "Proof-of-Work client",
  ],
};

const clients = [
  {
    name: "Fukuii",
    language: "Scala",
    languageColor: "#DC322F",
    role: "Primary",
    roleColor: "#00ffae",
    description:
      "EVM-compliant execution layer client in Scala 3. Native PoW consensus for ETC and Mordor; pairs with any consensus client via Engine API V1–V4 for post-Merge Ethereum. Forked from Mantis, purpose-built for the Olympia era.",
    githubUrl: "https://github.com/ethereumclassic/fukuii",
    docsUrl: "https://github.com/ethereumclassic/fukuii#readme",
    releasesUrl: "https://github.com/ethereumclassic/fukuii/releases",
  },
  {
    name: "Core-Geth",
    language: "Go",
    languageColor: "#00ADD8",
    role: "Maintained",
    roleColor: "#a78bfa",
    description:
      "The legacy ETC client, actively maintained and carried forward through the Olympia upgrade for network continuity. Core-Geth is scheduled to phase out as Fukuii assumes the primary client role in the Olympia era. The upstream go-ethereum plugin architecture is the long-term path, replacing the need for a dedicated fork.",
    githubUrl: "https://github.com/ethereumclassic/core-geth",
    docsUrl: "https://github.com/ethereumclassic/core-geth#readme",
    releasesUrl: "https://github.com/ethereumclassic/core-geth/releases",
  },
];

const plugins = [
  {
    name: "Besu",
    language: "Java",
    languageColor: "#B07219",
    releasesUrl: "https://github.com/ethereumclassic/besu/releases",
    docsUrl: "https://github.com/ethereumclassic/besu#readme",
    description: "A plugin that adds ETC support into the Besu codebase.",
  },
  {
    name: "Erigon",
    language: "Go",
    languageColor: "#00ADD8",
    releasesUrl: "https://github.com/ethereumclassic/erigon/releases",
    docsUrl: "https://github.com/ethereumclassic/erigon#readme",
    description: "A plugin that adds ETC support into the Erigon codebase.",
  },
  {
    name: "Go-Ethereum",
    language: "Go",
    languageColor: "#00ADD8",
    releasesUrl: "https://github.com/ethereumclassic/go-ethereum/releases",
    docsUrl: "https://github.com/ethereumclassic/go-ethereum#readme",
    description: "A plugin that adds ETC support into the Go-Ethereum codebase.",
  },
  {
    name: "Nethermind",
    language: "C#",
    languageColor: "#178600",
    releasesUrl: "https://github.com/ethereumclassic/nethermind/releases",
    docsUrl: "https://github.com/ethereumclassic/nethermind#readme",
    description: "A plugin that adds ETC support into the Nethermind codebase.",
  },
  {
    name: "Reth",
    language: "Rust",
    languageColor: "#DEA584",
    releasesUrl: "https://github.com/ethereumclassic/reth-etc/releases",
    docsUrl: "https://github.com/ethereumclassic/reth-etc#readme",
    description: "A plugin that adds ETC support into the Reth codebase.",
  },
];

export default function ClientsPage() {
  return (
    <>
      <Suspense><NavHeader /></Suspense>
      <main>
        {/* Hero */}
        <section className="hero-gradient relative pt-36 pb-16">
          <div className="relative z-10 mx-auto max-w-5xl px-6">
            <FadeIn>
              <p className="text-sm font-mono uppercase tracking-widest text-[var(--brand-green)]">Olympia</p>
              <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
                Client{" "}
                <span className="text-[var(--brand-green)]">Implementations</span>
              </h1>
            </FadeIn>
            <FadeIn delay={100}>
              <p className="text-lg text-[var(--text-muted)]">
                Multi-client architecture for the Olympia upgrade. Multiple independent implementations
                ensure network resilience — no single team controls the canonical chain.
              </p>
            </FadeIn>
          </div>
        </section>

        <SectionDivider />

        {/* Primary Clients */}
        <section className="section-alt py-16 px-6">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <h2 className="mb-8 text-2xl font-bold tracking-tight">Full Clients</h2>
            </FadeIn>
            <div className="grid gap-6 md:grid-cols-2">
              {clients.map((client, i) => (
                <FadeIn key={client.name} delay={i * 80} className="h-full">
                  <div className="flex h-full flex-col rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-6">
                    <div className="flex items-center gap-3">
                      <span
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-bold"
                        style={{
                          backgroundColor: `${client.languageColor}20`,
                          color: client.languageColor,
                        }}
                      >
                        {client.language.slice(0, 2)}
                      </span>
                      <div>
                        <h2 className="font-semibold">{client.name}</h2>
                        <span
                          className="rounded-full px-2 py-0.5 text-xs font-medium"
                          style={{
                            backgroundColor: `${client.roleColor}15`,
                            color: client.roleColor,
                          }}
                        >
                          {client.role}
                        </span>
                      </div>
                    </div>

                    <p className="mt-4 flex-1 text-sm leading-relaxed text-[var(--text-muted)]">
                      {client.description}
                    </p>

                    <div className="mt-4 flex gap-3">
                      <a
                        href={client.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-medium text-[var(--brand-green)] transition hover:opacity-80"
                      >
                        GitHub <ExternalLink size={12} />
                      </a>
                      <a
                        href={client.releasesUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-medium text-[var(--brand-green)] transition hover:opacity-80"
                      >
                        Releases <ExternalLink size={12} />
                      </a>
                      <a
                        href={client.docsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-medium text-[var(--brand-green)] transition hover:opacity-80"
                      >
                        Docs <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* Plugins */}
        <section className="py-16 px-6">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <h2 className="mb-2 text-2xl font-bold tracking-tight">ETC Plugins</h2>
              <p className="mb-8 text-sm text-[var(--text-muted)]">
                ETC compatibility layers for major upstream clients — bringing Ethereum Classic
                support to the broader Ethereum client ecosystem without maintaining full forks.
              </p>
            </FadeIn>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {plugins.map((plugin, i) => (
                <FadeIn key={plugin.name} delay={i * 80} className="h-full">
                  <div className="flex h-full flex-col rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-5">
                    <div className="flex items-center gap-3">
                      <span
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-bold"
                        style={{
                          backgroundColor: `${plugin.languageColor}20`,
                          color: plugin.languageColor,
                        }}
                      >
                        {plugin.language.slice(0, 2)}
                      </span>
                      <div>
                        <h3 className="font-semibold">{plugin.name}</h3>
                        <div className="flex items-center gap-1.5">
                          <span className="rounded-full bg-[#38bdf815] px-2 py-0.5 text-xs font-medium text-[#38bdf8]">
                            Plugin
                          </span>
                          <span className="rounded-full bg-[#f59e0b15] px-2 py-0.5 text-xs font-medium text-[#f59e0b]">
                            Future
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="mt-3 flex-1 text-xs leading-relaxed text-[var(--text-muted)]">
                      {plugin.description}
                    </p>

                    <div className="mt-3 flex gap-3">
                      <a
                        href={plugin.releasesUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium text-[var(--brand-green)] transition hover:opacity-80"
                      >
                        Releases <ExternalLink size={11} />
                      </a>
                      <a
                        href={plugin.docsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium text-[var(--brand-green)] transition hover:opacity-80"
                      >
                        Docs <ExternalLink size={11} />
                      </a>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </>
  );
}
