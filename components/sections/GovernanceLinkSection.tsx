import { Vote, TrendingUp, Server } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionDivider } from "@/components/ui/SectionDivider";

type Tier = {
  icon: typeof Vote;
  title: string;
  ecips: string[];
  description: string;
  links?: { label: string; href: string }[];
};

const tiers: Tier[] = [
  {
    icon: Vote,
    title: "Binding On-Chain Protocol Governance",
    ecips: ["ECIP-1113", "ECIP-1114", "ECIP-1119"],
    description:
      "Core contributors vote on treasury allocation, core client funding, and protocol upgrades. Every proposal is submitted, voted on, queued and executed on-chain, and every step is publicly verifiable.",
  },
  {
    icon: TrendingUp,
    title: "Open Prediction Markets",
    ecips: ["ECIP-1117", "ECIP-1118", "ECIP-1119"],
    description:
      "Anyone can open a prediction market on a proposed protocol outcome. Prices become a public signal core contributors read alongside their own votes.",
  },
  {
    icon: Server,
    title: "Network Participant Layer",
    ecips: [],
    links: [{ label: "Fukuii", href: "https://fukuii.org" }],
    description:
      "Miners, exchanges, wallets and node operators govern through the client software they run. An upgrade activates only when the network adopts it.",
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
              Three systems that work together, and no single group controls the protocol. Binding on-chain governance, open prediction markets and network adoption each depend on the other two.
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
                    {(tier.ecips.length > 0 || tier.links) && (
                      <div className="mb-3 flex flex-wrap gap-1.5">
                        {tier.links?.map((link) => (
                            <a
                              key={link.label}
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-full border border-[var(--border-brand)] bg-[var(--bg-surface)] px-2.5 py-0.5 font-mono text-[10px] text-[var(--brand-green)] transition hover:opacity-70"
                            >
                            {link.label}
                          </a>
                        ))}
                        {tier.ecips.map((ecip) => (
                          <a
                            key={ecip}
                            href={`https://ecips.ethereumclassic.org/ECIPs/ecip-${ecip.toLowerCase().replace("ecip-", "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full border border-[var(--border-brand)] bg-[var(--bg-surface)] px-2.5 py-0.5 font-mono text-[10px] text-[var(--brand-green)] transition hover:opacity-70"
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
