import { Vote, TrendingUp, Server } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionDivider } from "@/components/ui/SectionDivider";

const tiers = [
  {
    icon: Vote,
    title: "Binding On-Chain Protocol Governance",
    ecips: ["ECIP-1113", "ECIP-1114", "ECIP-1119"],
    description:
      "Membership NFT holders vote on treasury allocation, core client funding, and protocol upgrades. Every proposal — submit, vote, queue, execute — happens on-chain and is publicly verifiable.",
  },
  {
    icon: TrendingUp,
    title: "Open Prediction Markets",
    ecips: ["ECIP-1117", "ECIP-1118"],
    description:
      "Anyone can open a prediction market on a proposed protocol outcome without membership. Market prices feed back as financially-backed signal into governance decisions.",
  },
  {
    icon: Server,
    title: "Network Participant Layer",
    ecips: [],
    description:
      "Miners, exchanges, wallets, and node operators govern through the client software they run. An upgrade activates when the network adopts it — distributed participation made real.",
  },
];

export function GovernanceLinkSection() {
  return (
    <>
      <SectionDivider />
      <section id="governance" aria-labelledby="governance-link-heading" className="section-gradient py-20">
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn>
            <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[var(--brand-green)]">
              Governance
            </p>
            <h2 id="governance-link-heading" className="text-3xl font-bold tracking-tight">
              Governance Architecture
            </h2>
            <p className="mt-3 text-base text-[var(--text-muted)]">
              Three complementary systems designed to work together. No single group controls the protocol — binding on-chain governance, open prediction markets, and network participant adoption are mutually dependent.
            </p>
            <a
              href="/governance"
              className="mt-4 inline-flex items-center text-sm font-medium text-[var(--brand-green)] transition-colors hover:opacity-80"
            >
              Learn about Olympia governance →
            </a>
          </FadeIn>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {tiers.map((tier, i) => {
              const Icon = tier.icon;
              return (
                <FadeIn key={tier.title} delay={i * 80} className="h-full">
                  <div className="flex h-full flex-col rounded-xl border border-[var(--divider)] bg-[var(--bg-elevated)] p-6">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--brand-green-subtle)]">
                      <Icon size={20} className="text-[var(--brand-green)]" aria-hidden="true" />
                    </div>
                    {tier.ecips.length > 0 && (
                      <div className="mb-3 flex flex-wrap gap-1.5">
                        {tier.ecips.map((ecip) => (
                          <a
                            key={ecip}
                            href={`https://ecips.ethereumclassic.org/ECIPs/ecip-${ecip.toLowerCase().replace("ecip-", "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full bg-[var(--brand-green-subtle)] px-2.5 py-0.5 font-mono text-[10px] text-[var(--brand-green)] transition hover:opacity-70"
                          >
                            {ecip}
                          </a>
                        ))}
                      </div>
                    )}
                    <h3 className="mb-2 text-sm font-semibold">{tier.title}</h3>
                    <p className="flex-1 text-xs leading-relaxed text-[var(--text-muted)]">
                      {tier.description}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
