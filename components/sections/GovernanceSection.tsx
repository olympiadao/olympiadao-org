import { FileText, Vote, Timer, Zap, Eye } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionDivider } from "@/components/ui/SectionDivider";

const steps = [
  {
    icon: FileText,
    title: "Propose",
    description:
      "Any member can submit a governance proposal on-chain. Proposals define the action to execute and the supporting rationale.",
  },
  {
    icon: Vote,
    title: "Vote",
    description:
      "Members cast on-chain votes during a defined voting period. A quorum threshold must be met for the proposal to pass.",
  },
  {
    icon: Timer,
    title: "Queue",
    description:
      "Approved proposals enter a security timelock. This delay provides the community time to review before execution.",
  },
  {
    icon: Zap,
    title: "Execute",
    description:
      "After the timelock expires, the proposal executes automatically. Treasury transfers happen on-chain with full auditability.",
  },
  {
    icon: Eye,
    title: "Disclose",
    description:
      "All outcomes are publicly reported and independently verifiable. Proposal records form a permanent on-chain record.",
  },
];

export function GovernanceSection() {
  return (
    <>
      <SectionDivider />
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--brand-green)] font-mono">
              Governance Process
            </p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              From Proposal to Execution
            </h2>
            <p className="mb-12 max-w-2xl text-sm text-[var(--text-muted)]">
              Five stages from idea to execution &mdash; every step on-chain,
              transparent, and auditable.
            </p>
          </FadeIn>

          {/* Desktop: horizontal timeline */}
          <div className="hidden md:block">
            <div className="grid grid-cols-5 gap-4">
              {steps.map((step, i) => (
                <FadeIn key={step.title} delay={i * 100}>
                  <div className="relative flex flex-col items-center text-center">
                    {/* Connector line */}
                    {i < steps.length - 1 && (
                      <div className="absolute top-5 left-[calc(50%+24px)] right-[calc(-50%+24px)] h-px bg-[var(--border-brand)]" />
                    )}
                    <div className="relative z-10 mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--brand-green)] text-sm font-bold text-[var(--background)]">
                      {i + 1}
                    </div>
                    <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--brand-green-subtle)]">
                      <step.icon
                        size={18}
                        className="text-[var(--brand-green)]"
                      />
                    </div>
                    <h3 className="mb-2 text-sm font-semibold">{step.title}</h3>
                    <p className="text-xs leading-relaxed text-[var(--text-muted)]">
                      {step.description}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Mobile: vertical timeline */}
          <div className="md:hidden">
            <div className="relative border-l-2 border-[var(--border-brand)] pl-8">
              {steps.map((step, i) => (
                <FadeIn key={step.title} delay={i * 80}>
                  <div className="relative mb-8 last:mb-0">
                    <div className="absolute -left-[calc(1rem+5px)] top-0 flex h-7 w-7 items-center justify-center rounded-full bg-[var(--brand-green)] text-xs font-bold text-[var(--background)]">
                      {i + 1}
                    </div>
                    <div className="mb-1 flex items-center gap-2">
                      <step.icon
                        size={16}
                        className="text-[var(--brand-green)]"
                      />
                      <h3 className="text-sm font-semibold">{step.title}</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-[var(--text-muted)]">
                      {step.description}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
