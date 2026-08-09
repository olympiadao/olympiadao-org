import { Wallet, Landmark, Vote } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionDivider } from "@/components/ui/SectionDivider";

const steps = [
  {
    icon: Wallet,
    title: "Base Fee Revenue",
    description:
      "Every transaction pays a base fee, set by the network, plus an optional tip to the miner. Ethereum destroys the base fee. Olympia sends it to the Treasury instead and changes nothing else: tips and block rewards are untouched, so miners earn exactly what they earn today.",
    detail: "Funded by base-fee revenue, not inflation",
  },
  {
    icon: Landmark,
    title: "Treasury",
    description:
      "Ethereum Classic's sovereignty vault accumulates base-fee revenue and voluntary on-chain donations, owned by no company, foundation, or individual. It holds funds and has one withdrawal path \u2014 it does not invest, allocate, or choose recipients. Real-time monitoring via public dashboard.",
    detail: "Immutable vault with on-chain transparency",
  },
  {
    icon: Vote,
    title: "Governance",
    description:
      "Community proposals allocate treasury funds through on-chain voting with timelock security. Every contract that releases value screens the recipient; for Treasury funds the binding check is the Executor, at execution time.",
    detail: "Olympia DAO core contributors + futarchy prediction markets",
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
              Funding that does not come out of anyone&rsquo;s pocket. Here is the path a
              fee takes, from the transaction that pays it to the work it funds.
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
