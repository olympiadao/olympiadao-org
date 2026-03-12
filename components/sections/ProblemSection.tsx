import { TrendingDown, Landmark, Coins, Vote } from "lucide-react";
import { CollapsibleSection } from "@/components/ui/collapsible-section";

const problems = [
  {
    icon: TrendingDown,
    title: "Block Reward Decline",
    description:
      "Era 4: 2.048 ETC/block. Each era is a 20% reduction. By Era 6, rewards drop to 1.31 ETC.",
    stat: "-20%",
    statLabel: "per era",
  },
  {
    icon: Landmark,
    title: "No Protocol Funding",
    description:
      "ETC relies entirely on external donations for development, infrastructure, and tooling. Voluntary and fragile.",
    stat: "$0",
    statLabel: "protocol revenue",
  },
  {
    icon: Coins,
    title: "Negligible Fee Revenue",
    description:
      "At ~5 txs/block, tips represent 0.01% of miner income. The basefee is effectively zero.",
    stat: "0.01%",
    statLabel: "of miner income",
  },
  {
    icon: Vote,
    title: "No Governance",
    description:
      "Even if funds accumulate, there's no on-chain process to allocate them transparently.",
    stat: "0",
    statLabel: "governance mechanisms",
  },
];

export function ProblemSection() {
  return (
    <CollapsibleSection
      id="problem"
      title="The Problem"
      subtitle="Ethereum Classic faces four structural challenges that Olympia addresses from the bottom up."
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {problems.map((problem) => (
          <div
            key={problem.title}
            className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)] p-6 transition-all duration-250 hover:-translate-y-1.5 hover:border-[var(--brand-green)]"
            style={{ boxShadow: "var(--card-shadow)" }}
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--brand-green-subtle)]">
                <problem.icon
                  size={20}
                  className="text-[var(--brand-green)]"
                />
              </div>
              <h3 className="text-lg font-semibold">{problem.title}</h3>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-[var(--text-muted)]">
              {problem.description}
            </p>
            <div className="border-t border-[var(--border-subtle)] pt-4">
              <span className="text-2xl font-bold text-[var(--brand-green)]">
                {problem.stat}
              </span>
              <span className="ml-2 text-xs text-[var(--text-subtle)]">
                {problem.statLabel}
              </span>
            </div>
          </div>
        ))}
      </div>
    </CollapsibleSection>
  );
}
