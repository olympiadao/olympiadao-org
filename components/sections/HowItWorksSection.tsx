import { Wallet, Landmark, Vote } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionDivider } from "@/components/ui/SectionDivider";

const steps = [
  {
    icon: Wallet,
    title: "Basefee Revenue",
    description:
      "Every transaction pays a basefee via EIP-1559. The basefee is directed to the Treasury. Block rewards and tips remain completely untouched \u2014 miners are unaffected.",
    detail: "Funded by basefee revenue, not inflation",
  },
  {
    icon: Landmark,
    title: "Treasury",
    description:
      "Protocol-managed vault accumulates basefee revenue, voluntary donations, and mining rewards directed to the treasury address. Real-time monitoring via public dashboard.",
    detail: "Immutable vault with on-chain transparency",
  },
  {
    icon: Vote,
    title: "Governance",
    description:
      "Community proposals allocate treasury funds through on-chain voting with timelock security and sanctions compliance at every layer. Funding proposals require a 1 ETC quality bond — returned when activated, slashed to the treasury if rejected.",
    detail: "Olympia DAO membership NFTs + futarchy prediction markets",
  },
];

export function HowItWorksSection() {
  return (
    <>
      <SectionDivider />
      <section id="how-it-works" aria-labelledby="how-it-works-heading" className="section-gradient py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--brand-green)] font-mono">
              Treasury Funding
            </p>
            <h2 id="how-it-works-heading" className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              How It Works
            </h2>
            <p className="mb-12 text-sm text-[var(--text-muted)]">
              Sustainable protocol funding without impacting miners. Transaction
              basefee revenue flows through three stages.
            </p>
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step, i) => (
              <FadeIn key={step.title} delay={i * 100}>
                <div className="flex h-full flex-col rounded-xl border border-[var(--divider)] bg-[var(--bg-elevated)] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--border-brand)]">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--brand-green-subtle)]">
                      <step.icon
                        size={20}
                        className="text-[var(--brand-green)]"
                        aria-hidden={true}
                      />
                    </div>
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--brand-green)] text-xs font-bold text-[var(--background)]">
                      {i + 1}
                    </div>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
                  <p className="mb-3 text-sm leading-relaxed text-[var(--text-muted)]">
                    {step.description}
                  </p>
                  <p className="font-mono text-xs text-[var(--text-subtle)]">
                    {step.detail}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
