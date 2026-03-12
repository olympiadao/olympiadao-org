import { ArrowDown, Wallet, Landmark, Vote } from "lucide-react";
import { CollapsibleSection } from "@/components/ui/collapsible-section";

const steps = [
  {
    icon: Wallet,
    title: "Basefee Collected",
    description:
      "Every transaction pays a basefee via EIP-1559. On Ethereum, this is burned. On ETC, 100% is redirected to the Treasury.",
    detail: "~1 gwei/tx at current volumes",
  },
  {
    icon: Landmark,
    title: "Treasury Accumulates",
    description:
      "An immutable vault contract receives basefee via consensus state credit. Also accepts voluntary donations. No withdrawals during Stage 1.",
    detail: "OpenZeppelin AccessControlDefaultAdminRules",
  },
  {
    icon: Vote,
    title: "Governance Allocates",
    description:
      "Stage 2 activates the CoreDAO pipeline. Proposals go through Governor → Timelock → Executor → Treasury with sanctions checks at every layer.",
    detail: "3-layer sanctions defense",
  },
];

export function HowItWorksSection() {
  return (
    <CollapsibleSection
      id="how-it-works"
      title="How It Works"
      subtitle="Olympia builds from the bottom up: first accumulate, then govern, then experiment, then harden."
      maxWidth="max-w-4xl"
    >
      <div className="flex flex-col items-center gap-2">
        {steps.map((step, i) => (
          <div key={step.title}>
            <div className="w-full max-w-lg rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)] p-6 transition-all duration-250 hover:-translate-y-1 hover:border-[var(--brand-green)]">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--brand-green-subtle)]">
                  <step.icon
                    size={18}
                    className="text-[var(--brand-green)]"
                  />
                </div>
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--brand-green)] text-xs font-bold text-[var(--background)]">
                  {i + 1}
                </div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
              </div>
              <p className="mb-2 text-sm leading-relaxed text-[var(--text-muted)]">
                {step.description}
              </p>
              <p className="font-mono text-xs text-[var(--text-subtle)]">
                {step.detail}
              </p>
            </div>
            {i < steps.length - 1 && (
              <div className="flex justify-center py-1">
                <ArrowDown
                  size={20}
                  className="text-[var(--brand-green)] opacity-40"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </CollapsibleSection>
  );
}
