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
      "The primary Ethereum Classic client for the Olympia upgrade. Built from the ground up to support the full Olympia feature set with a focus on long-term protocol stewardship.",
    githubUrl: "https://github.com/ethereumclassic/fukuii",
    docsUrl: "https://github.com/ethereumclassic/fukuii#readme",
  },
  {
    name: "Core-Geth",
    language: "Go",
    languageColor: "#00ADD8",
    role: "Maintenance",
    roleColor: "#a78bfa",
    description:
      "The established Ethereum Classic client with years of mainnet history. Widely deployed and well understood, continuing in a maintenance role alongside Fukuii.",
    githubUrl: "https://github.com/ethereumclassic/core-geth",
    docsUrl: "https://github.com/ethereumclassic/core-geth#readme",
  },
  {
    name: "Hyperledger Besu",
    language: "Java",
    languageColor: "#B07219",
    role: "Reference",
    roleColor: "#38bdf8",
    description:
      "An independent implementation maintained by the Hyperledger Foundation. Provides a second point of verification for the Olympia upgrade, ensuring no single team controls the protocol.",
    githubUrl: "https://github.com/ethereumclassic/besu",
    docsUrl: "https://github.com/ethereumclassic/besu#readme",
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
    <FooterSection />
    </>
  );
}
