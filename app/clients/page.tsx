import type { Metadata } from "next";
import { Suspense } from "react";
import { ExternalLink } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { NavHeader } from "@/components/sections/NavHeader";
import { NavHeaderFallback } from "@/components/ui/SsrFallbacks";
import { FooterSection } from "@/components/sections/FooterSection";

export const metadata: Metadata = {
  title: "ETC Client Implementations — Fukuii and Core-Geth",
  description:
    "Fukuii (Scala 3) is Ethereum Classic's first native client — an EVM execution client running several networks at once in one JVM process, where a further network is configuration rather than a new client. Core-Geth (Go), a go-ethereum derivative, is maintained through the Olympia upgrade. ETC compatibility plugins extend support to Besu, Erigon, Ethrex, Go-Ethereum, Nethermind, and Reth.",
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
  ],
};

// Client framing, descriptions and URLs are aligned with ethereumclassicdao-org,
// which is the reference for shared positioning across the Olympia sites.
const clients = [
  {
    name: "Fukuii",
    language: "Scala",
    languageColor: "#DC322F",
    role: "Primary",
    roleTheme: "brand" as const,
    description:
      "EVM execution client in Scala 3 — one binary runs several networks at once in one JVM process, each isolated with its own state, metrics, and configuration. A further network is configuration rather than a new client. Consensus is selected per deployment: native Proof-of-Work for Ethereum Classic and Mordor, or Proof-of-Stake with a built-in consensus layer or an external client over the Engine API. Ethereum Classic's first native client — built ground-up for ETC rather than derived from an Ethereum client — and the primary ETC client for the Olympia era.",
    websiteUrl: "https://fukuii.org",
    docsUrl: "https://docs.fukuii.org",
    releasesUrl: "https://github.com/fukuii-project/fukuii-cli/releases",
  },
  {
    name: "Core-Geth",
    language: "Go",
    languageColor: "#00ADD8",
    role: "Maintained",
    roleTheme: "muted" as const,
    description:
      "A go-ethereum derivative maintained for Ethereum Classic, in maintenance only. It implements the full Olympia specification — ECIP-1111, 1112, 1121 and 1122 — and its Mordor sync is confirmed, so existing operators have a supported path through the upgrade. New deployments should use Fukuii.",
    websiteUrl: "https://github.com/ethereumclassic/core-geth",
    docsUrl: "https://github.com/ethereumclassic/core-geth#readme",
    releasesUrl: "https://github.com/ethereumclassic/core-geth/releases",
  },
];

/**
 * Role badge colour keyed by theme, not decided in a ternary at the call site.
 * A ternary's else-branch silently absorbs every value it was not written for,
 * so a third role would inherit "muted" without anyone choosing that. Indexing a
 * map makes an unhandled role a type error instead.
 */
const roleThemeClass: Record<(typeof clients)[number]["roleTheme"], string> = {
  brand: "bg-[var(--brand-green-subtle)] text-[var(--brand-green)]",
  muted: "bg-[var(--border-subtle)] text-[var(--text-secondary)]",
};

/**
 * Language chips carry the language's own brand color, so the chip is opaque and
 * its label switches between white and near-black — whichever clears 4.5:1 on
 * that color. A translucent tint of the same color cannot: it fails in one theme
 * or both (Rust on a 12.5% tint measured 1.80:1 in light mode).
 */
function languageChipText(hex: string): string {
  const lin = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  const channel = (i: number) => lin(parseInt(hex.slice(i, i + 2), 16) / 255);
  const L = 0.2126 * channel(1) + 0.7152 * channel(3) + 0.0722 * channel(5);
  // contrast against white vs against near-black (#0a0f10, relative luminance
  // 0.0044); take whichever is higher
  return 1.05 / (L + 0.05) >= (L + 0.05) / 0.0544 ? "#ffffff" : "#0a0f10";
}

// Cards link the upstream project each plugin targets.
const plugins = [
  {
    name: "Besu",
    language: "Java",
    languageColor: "#B07219",
    upstreamUrl: "https://github.com/besu-eth/besu",
    description: "A plugin that adds ETC support into the Besu codebase.",
  },
  {
    name: "Erigon",
    language: "Go",
    languageColor: "#00ADD8",
    upstreamUrl: "https://github.com/erigontech/erigon",
    description: "A plugin that adds ETC support into the Erigon codebase.",
  },
  {
    name: "Ethrex",
    language: "Rust",
    languageColor: "#DEA584",
    upstreamUrl: "https://github.com/lambdaclass/ethrex",
    description: "A plugin that adds ETC support into the Ethrex codebase.",
  },
  {
    name: "Go-Ethereum",
    language: "Go",
    languageColor: "#00ADD8",
    upstreamUrl: "https://github.com/ethereum/go-ethereum",
    description: "A plugin that adds ETC support into the Go-Ethereum codebase.",
  },
  {
    name: "Nethermind",
    language: "C#",
    languageColor: "#178600",
    upstreamUrl: "https://github.com/NethermindEth/nethermind",
    description: "A plugin that adds ETC support into the Nethermind codebase.",
  },
  {
    name: "Reth",
    language: "Rust",
    languageColor: "#DEA584",
    upstreamUrl: "https://github.com/paradigmxyz/reth",
    description: "A plugin that adds ETC support into the Reth codebase.",
  },
];

export default function ClientsPage() {
  return (
    <>
      <Suspense fallback={<NavHeaderFallback />}><NavHeader /></Suspense>
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
                          backgroundColor: client.languageColor,
                          color: languageChipText(client.languageColor),
                        }}
                      >
                        {client.language.slice(0, 2)}
                      </span>
                      <div>
                        <h2 className="font-semibold">{client.name}</h2>
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${roleThemeClass[client.roleTheme]}`}
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
                        href={client.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-medium text-[var(--brand-green)] transition hover:opacity-80"
                      >
                        Website <ExternalLink size={12} />
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
                Future work. These are upstream cross-client references —
                established Ethereum clients that an ETC plugin would bring Ethereum Classic
                support to, without maintaining full forks.
              </p>
            </FadeIn>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {plugins.map((plugin, i) => (
                <FadeIn key={plugin.name} delay={i * 80} className="h-full">
                  <div className="flex h-full flex-col rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-5">
                    <div className="flex items-center gap-3">
                      <span
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-bold"
                        style={{
                          backgroundColor: plugin.languageColor,
                          color: languageChipText(plugin.languageColor),
                        }}
                      >
                        {plugin.language.slice(0, 2)}
                      </span>
                      <div>
                        <h3 className="font-semibold">{plugin.name}</h3>
                        <div className="flex items-center gap-1.5">
                          <span className="rounded-full bg-[var(--color-sky-bg)] px-2 py-0.5 text-xs font-medium text-[var(--color-sky)]">
                            Plugin
                          </span>
                          <span className="rounded-full bg-[var(--color-amber-bg)] px-2 py-0.5 text-xs font-medium text-[var(--color-amber)]">
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
                        href={plugin.upstreamUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium text-[var(--brand-green)] transition hover:opacity-80"
                      >
                        Upstream project <ExternalLink size={11} />
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
