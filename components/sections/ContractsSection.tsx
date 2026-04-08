"use client";

import { ExternalLink } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { useChainConfig } from "@/lib/hooks/use-chain-config";
import deployment from "@/lib/contracts.json";

const contracts = Object.values(deployment.contracts);

export function ContractsSection() {
  const config = useChainConfig();

  return (
    <>
      <SectionDivider />
      <section id="contracts" className="section-alt py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--brand-green)] font-mono">
              Deployed Contracts
            </p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              On-Chain Infrastructure
            </h2>
            <p className="mb-12 max-w-2xl text-sm text-[var(--text-muted)]">
              Review the contract suite that forms the Olympia framework.
            </p>
          </FadeIn>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {contracts.map((contract, i) => (
              <FadeIn key={contract.name} delay={i * 60}>
                <a
                  href={`${config.explorer}/address/${contract.address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-xl border border-[var(--divider)] bg-[var(--bg-elevated)] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--border-brand)]"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-sm font-semibold">{contract.name}</h3>
                    <ExternalLink
                      size={14}
                      className="text-[var(--text-subtle)] transition-colors group-hover:text-[var(--brand-green)]"
                    />
                  </div>
                  <p className="mb-2 text-xs text-[var(--text-muted)]">
                    {contract.role}
                  </p>
                  <code className="block truncate font-mono text-xs text-[var(--brand-green)]">
                    {contract.address}
                  </code>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
