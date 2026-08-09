import { FadeIn } from "@/components/ui/FadeIn";
import { SectionDivider } from "@/components/ui/SectionDivider";

const stages = [
  {
    title: "Consensus Upgrades",
    status: "active" as const,
    description:
      "Olympia activates as a hard fork, and it is one of only two stages that change consensus rules. Glamsterdam-era EVM alignment means every Ethereum tool and framework runs on Ethereum Classic without modification. The EIP-1559 fee market redirects the base fee to a protocol treasury instead of burning it, and the treasury contract deploys at this fork. The governance suite that spends from it comes later.",
    deliverables: [
      "Glamsterdam-era EVM alignment: Dencun, Pectra, Fusaka, and Glamsterdam EIPs (ECIP-1121)",
      "EIP-1559 fee market with basefee redirected to the treasury (ECIP-1111)",
      "Protocol treasury contract deployed at the fork (ECIP-1112)",
      "Client security parameters: minimum miner tip, network-authoritative gas target, MESS restored (ECIP-1122)",
    ],
  },
  {
    title: "Core Governance",
    status: "active" as const,
    description:
      "Core development funding moves on-chain, open to any developer, infrastructure provider or critical service operator worldwide. No private employment contracts, and no prior relationships required. These are contracts on a chain whose rules are already settled, so no fork is involved. The gap after the first stage is an audit window, and the treasury accrues revenue throughout it.",
    deliverables: [
      "Governance suite deploys after the fork, against addresses reserved before it",
      "Full proposal lifecycle: submit, vote, queue, execute",
      "Governance and treasury contracts with timelock execution",
      "Core contributor voting with on-chain sanctions screening",
      "Open competitive bidding, any EVM developer or infrastructure provider can participate",
      "Core developers, infrastructure providers, and critical services funded on merit",
      "Direct on-chain contributions and ETC Cooperative donation channel",
    ],
  },
  {
    title: "Prediction Markets",
    status: "research" as const,
    description:
      "Open prediction markets let anyone take a financial position on protocol decisions. Public participants trade on what Ethereum Classic is worth if a proposal passes against what it is worth if it fails, and the higher-priced outcome wins. Because participants are paid for being right, prices become a public signal that core contributors can read alongside their own votes. Market activity also generates base fee revenue, which flows back into the treasury.",
    deliverables: [
      "Open to anyone with an ETC account",
      "Financially incentivizes the public to monitor and evaluate protocol proposals",
      "Onboards new participants to ETC through active market engagement",
      "Market activity generates base fee transactions that compound the treasury flywheel",
      "Collateral is ETC and Classic USD, both already live, custodied outside the treasury",
      "Market-informed proposal ranking alongside formal DAO votes, a signal layer, never binding",
      "Accurate predictions earn financial rewards, holding governance accountable",
    ],
  },
  {
    title: "Treasury Distribution",
    status: "future" as const,
    description:
      "A smoothing curve supplements miner security budgets as fixed-emission block subsidies decline, spreading each block's contribution across a future window so payouts stay steady rather than volatile. ECIP-1115 runs the curve at the contract layer, where the allocation fraction, window length and curve shape are all adjustable through governance without a fork. Running it here first means the network learns the right curve by measuring it, while ECIP-1017 block rewards still secure the chain and a mistake stays cheap to correct.",
    deliverables: [
      "Treasury smoothing curve at the contract layer (ECIP-1115)",
      "Allocation fraction, window length, and curve shape adjustable through governance, no fork required",
      "Each candidate curve is funded through the ordinary proposal process, like any other line item",
      "Complements ECIP-1017's 5M20 emission schedule so the treasury responds as subsidies decline",
      "Runs while block rewards still secure the network, so the curve is measured rather than assumed",
    ],
  },
  {
    title: "Protocol Integration",
    status: "future" as const,
    description:
      "The second hard fork, and the only other stage that changes consensus rules. Once the smoothing curve has proven itself in production, ECIP-1116 embeds it into block finalization. The protocol pays it directly rather than disbursing it from the treasury, and governance can no longer adjust it. Changing it afterward costs a fork, which is the guarantee being bought: a security budget that does not depend on continued cooperation at the moment it matters most.",
    deliverables: [
      "Consensus-layer hardening of the demonstrated curve (ECIP-1116)",
      "Paid at block finalization rather than disbursed from the treasury, which takes governance out of the payment path",
      "Cannot activate until the contract-layer stage has produced real observational data",
      "Follows the ECIP-1017 precedent of encoding proven rules natively into the protocol",
      "Parameters deliberately unset until measured; hardening an unmeasured number repeats the mistake the staging avoids",
    ],
  },
];

const statusConfig = {
  complete: { label: "Complete", className: "badge-complete" },
  active: { label: "Active", className: "badge-active" },
  research: { label: "Research", className: "badge-research" },
  future: { label: "Future", className: "badge-future" },
};

export function RoadmapSection() {
  return (
    <>
      <SectionDivider />
      <section aria-labelledby="roadmap-heading" className="section-gradient relative py-28">
        <div className="relative z-10 mx-auto max-w-5xl px-6">
          <FadeIn>
            <h2 id="roadmap-heading" className="text-3xl font-bold tracking-tight">
              Olympia Roadmap
            </h2>
            <p className="mt-3 text-base text-[var(--text-muted)]">
              Five stages from consensus upgrades to permanent protocol
              integration.
            </p>
          </FadeIn>

          <div className="mt-12 space-y-0">
            {stages.map((stage, i) => {
              const config = statusConfig[stage.status];
              return (
                <FadeIn key={stage.title} delay={i * 80}>
                  <div className="relative flex gap-6 pb-8">
                    {/* Timeline line */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`h-3 w-3 shrink-0 rounded-full ${
                          stage.status === "active"
                            ? "bg-[var(--brand-green)] animate-pulse"
                            : "bg-[var(--border-default)]"
                        }`}
                      />
                      {i < stages.length - 1 && (
                        <div className="mt-1 h-full w-px bg-[var(--border-default)]" />
                      )}
                    </div>

                    <div className="-mt-1 flex-1">
                      <div className="flex items-center gap-3">
                        <p className="text-base font-semibold">
                          {stage.title}
                        </p>
                        <span className={config.className}>
                          {config.label}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                        {stage.description}
                      </p>
                      <ul className="mt-3 space-y-1">
                        {stage.deliverables.map((d) => (
                          <li
                            key={d}
                            className="text-xs text-[var(--text-subtle)] before:mr-2 before:content-['·']"
                          >
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
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
