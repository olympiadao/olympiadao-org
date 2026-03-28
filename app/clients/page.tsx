import type { Metadata } from "next";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";

export const metadata: Metadata = {
  title: "Client Implementations",
  description:
    "Three independent client implementations ensure no single point of failure for Ethereum Classic — Fukuii (Scala), Core-Geth (Go), and Hyperledger Besu (Java).",
};

const clients = [
  {
    name: "Fukuii",
    language: "Scala",
    languageColor: "#DC322F",
    role: "Primary Client",
    roleColor: "#00ffae",
    description:
      "Next-generation ETC client built from the ground up. Full SNAP sync support, comprehensive RPC coverage, and the most extensive test suite in the ETC ecosystem.",
    stats: [
      { label: "RPC Methods", value: "143" },
      { label: "Tests", value: "2,706" },
      { label: "Runtime", value: "JDK 21" },
    ],
    githubUrl: "https://github.com/AlanVerbner/fukuii",
    docsUrl: "https://github.com/AlanVerbner/fukuii#readme",
    organization: "White B0x Inc.",
  },
  {
    name: "Core-Geth",
    language: "Go",
    languageColor: "#00ADD8",
    role: "Maintenance",
    roleColor: "#a78bfa",
    description:
      "Battle-tested ETC client based on go-ethereum. The current primary client, transitioning to maintenance role as Fukuii takes over post-Olympia.",
    stats: [
      { label: "Version", value: "v1.12.21" },
      { label: "Forks", value: "8 supported" },
      { label: "Runtime", value: "Go 1.24" },
    ],
    githubUrl: "https://github.com/etclabscore/core-geth",
    docsUrl: "https://etclabscore.github.io/core-geth/",
    organization: "ETC Labs",
  },
  {
    name: "Hyperledger Besu",
    language: "Java",
    languageColor: "#B07219",
    role: "Enterprise",
    roleColor: "#38bdf8",
    description:
      "Enterprise-grade client maintained by the Hyperledger Foundation. Supports SNAP state serving, permissioning, and privacy features for institutional deployments.",
    stats: [
      { label: "Version", value: "v26.3" },
      { label: "Foundation", value: "Hyperledger" },
      { label: "Runtime", value: "Java 21" },
    ],
    githubUrl: "https://github.com/hyperledger/besu",
    docsUrl: "https://besu.hyperledger.org/",
    organization: "Hyperledger Foundation",
  },
];

export default function ClientsPage() {
  return (
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
            Three independent client implementations ensure no single point of failure. Each
            client passes the cross-client test matrix covering 14 historical forks and all
            Olympia specifications.
          </p>
        </FadeIn>

        <div className="grid gap-6 md:grid-cols-3">
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
                    <div className="flex items-center gap-2">
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
                </div>

                <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)]">
                  {client.description}
                </p>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  {client.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-lg bg-[var(--background)] px-2 py-2 text-center"
                    >
                      <p className="text-xs text-[var(--text-muted)]">{stat.label}</p>
                      <p className="mt-0.5 text-sm font-semibold">{stat.value}</p>
                    </div>
                  ))}
                </div>

                <p className="mt-3 text-xs text-[var(--text-muted)]">{client.organization}</p>

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
    </main>
  );
}
