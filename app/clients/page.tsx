import type { Metadata } from "next";
import { Suspense } from "react";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import { NavHeader } from "@/components/sections/NavHeader";
import { FooterSection } from "@/components/sections/FooterSection";

export const metadata: Metadata = {
  title: "Client Implementations",
  description:
    "Independent Ethereum Classic client implementations — full clients and ETC plugins for major upstream clients.",
};

const clients = [
  {
    name: "Fukuii",
    language: "Scala",
    languageColor: "#DC322F",
    role: "Primary",
    roleColor: "#00ffae",
    description:
      "The primary Ethereum Classic client for the Olympia upgrade. Built from the ground up to support the full Olympia feature set with a focus on long-term protocol stewardship.",
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
];

export default function ClientsPage() {
  return (
    <>
      <Suspense><NavHeader /></Suspense>
      <main className="min-h-screen pt-28 pb-20">
        <div className="mx-auto max-w-4xl px-6">
          <FadeIn>
            <Link
              href="/"
              className="mb-6 inline-flex items-center gap-1.5 text-sm text-[var(--brand-green)] transition hover:opacity-80"
            >
              <ArrowLeft size={14} />
              Back to Home
            </Link>
          </FadeIn>

          <FadeIn delay={50}>
            <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              Client Implementations
            </h1>
          </FadeIn>

          <FadeIn delay={100}>
            <p className="mb-10 max-w-2xl text-[var(--text-muted)]">
              Multi-client architecture following best practices in client execution
              and enterprise-grade features.
            </p>
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-2">
            {clients.map((client, i) => (
              <FadeIn key={client.name} delay={150 + i * 100}>
                <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-6">
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-12 w-12 items-center justify-center rounded-xl text-base font-bold"
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

                  <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)]">
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

          <FadeIn delay={400}>
            <h2 className="mt-14 mb-2 text-xl font-bold tracking-tight">
              ETC Plugins
            </h2>
            <p className="mb-6 text-sm text-[var(--text-muted)]">
              ETC compatibility layers for major upstream clients — bringing Ethereum Classic
              support to the broader Ethereum client ecosystem without maintaining full forks.
            </p>
          </FadeIn>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {plugins.map((plugin, i) => (
              <FadeIn key={plugin.name} delay={450 + i * 80}>
                <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-5">
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

                  <p className="mt-3 text-xs leading-relaxed text-[var(--text-muted)]">
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
      </main>
      <FooterSection />
    </>
  );
}
