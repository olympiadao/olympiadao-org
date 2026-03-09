import { Layers, Shield, FlaskConical, Pickaxe } from "lucide-react";

const principles = [
  {
    icon: Layers,
    title: "Accumulate First, Govern Later",
    description:
      "The Treasury starts as a receive-only vault. Governance matures separately. No withdrawals until the governance pipeline is battle-tested.",
  },
  {
    icon: FlaskConical,
    title: "Contract Before Consensus",
    description:
      "Experiment with parameters at the contract layer (adjustable via OIP) before embedding them at the consensus layer (requires a hard fork).",
  },
  {
    icon: Shield,
    title: "Layered Defense",
    description:
      "Sanctions checking at three points — propose, cancel, execute — ensures no single failure mode bypasses screening.",
  },
  {
    icon: Pickaxe,
    title: "Miner-First Economics",
    description:
      "Block rewards and priority fees are untouched. The basefee redirect adds ~1 gwei/tx — negligible relative to the 2.048 ETC block reward.",
  },
];

export function PrinciplesSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-4 text-center text-3xl font-bold tracking-tight text-[var(--brand-green)]">
          Design Principles
        </h2>
        <p className="mx-auto mb-12 max-w-xl text-center text-[var(--text-muted)]">
          Olympia is designed to be cautious, staged, and empirical.
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          {principles.map((principle) => (
            <div
              key={principle.title}
              className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)] p-6 transition-all duration-250 hover:-translate-y-1 hover:border-[var(--brand-green)]"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--brand-green-subtle)]">
                  <principle.icon
                    size={18}
                    className="text-[var(--brand-green)]"
                  />
                </div>
                <h3 className="font-semibold">{principle.title}</h3>
              </div>
              <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
