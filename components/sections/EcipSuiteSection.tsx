const ecips = [
  {
    number: "1111",
    title: "EIP-1559 + EIP-3198",
    stage: 1,
    type: "Consensus",
    status: "Implemented",
    description: "Dynamic basefee pricing. Basefee redirected to Treasury instead of burned.",
  },
  {
    number: "1112",
    title: "Treasury Contract",
    stage: 1,
    type: "Consensus",
    status: "Deployed",
    description: "Immutable vault with AccessControlDefaultAdminRules for staged governance.",
  },
  {
    number: "1121",
    title: "EVM Compatibility Sprint",
    stage: 1,
    type: "Consensus",
    status: "Implemented",
    description: "15 EIPs: MCOPY, transient storage, BLS12-381, secp256r1, EOA delegation.",
  },
  {
    number: "1113",
    title: "CoreDAO Governance",
    stage: 2,
    type: "Contract",
    status: "In Progress",
    description: "Governor → Timelock → Executor pipeline with modular voting modules.",
  },
  {
    number: "1114",
    title: "ECFP Funding Proposals",
    stage: 2,
    type: "Contract",
    status: "In Progress",
    description: "Permissionless hash-bound proposal registry for transparent allocation.",
  },
  {
    number: "1119",
    title: "Sanctions Constraint",
    stage: 2,
    type: "Contract",
    status: "In Progress",
    description: "Three-layer defense: propose check, mid-lifecycle cancel, execution gate.",
  },
  {
    number: "1117",
    title: "Futarchy DAO",
    stage: 3,
    type: "Contract",
    status: "Prototype",
    description: "Prediction market governance with conditional outcome markets.",
  },
  {
    number: "1118",
    title: "Streaming Disbursements",
    stage: 3,
    type: "Contract",
    status: "Planned",
    description: "Milestone-gated fund releases with governance-authorized clawback.",
  },
  {
    number: "1115",
    title: "L-Curve Smoothing",
    stage: 4,
    type: "Contract",
    status: "Phase 4",
    description: "Governance-controlled miner incentive reshaping via smooth allocation curves.",
  },
  {
    number: "1116",
    title: "Basefee Split",
    stage: 5,
    type: "Consensus",
    status: "Deferred",
    description: "Embed validated basefee split at consensus layer.",
  },
  {
    number: "1122",
    title: "Miner Distribution",
    stage: 5,
    type: "Consensus",
    status: "Deferred",
    description: "Protocol-native miner distribution curve. Supersedes ECIP-1120.",
  },
];

export function EcipSuiteSection() {
  return (
    <section id="upgrade" className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-4 text-center text-3xl font-bold tracking-tight text-[var(--brand-green)]">
          ECIP Suite
        </h2>
        <p className="mx-auto mb-12 max-w-xl text-center text-[var(--text-muted)]">
          11 Ethereum Classic Improvement Proposals across 5 stages.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--border-default)]">
                <th className="pb-3 pr-4 font-semibold text-[var(--text-subtle)]">
                  ECIP
                </th>
                <th className="pb-3 pr-4 font-semibold text-[var(--text-subtle)]">
                  Title
                </th>
                <th className="hidden pb-3 pr-4 font-semibold text-[var(--text-subtle)] sm:table-cell">
                  Stage
                </th>
                <th className="hidden pb-3 pr-4 font-semibold text-[var(--text-subtle)] md:table-cell">
                  Type
                </th>
                <th className="pb-3 font-semibold text-[var(--text-subtle)]">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {ecips.map((ecip) => (
                <tr
                  key={ecip.number}
                  className="border-b border-[var(--border-subtle)] transition-colors hover:bg-[var(--brand-green-subtle)]"
                >
                  <td className="py-3 pr-4 font-mono text-[var(--brand-green)]">
                    {ecip.number}
                  </td>
                  <td className="py-3 pr-4">
                    <div className="font-medium">{ecip.title}</div>
                    <div className="mt-0.5 text-xs text-[var(--text-subtle)]">
                      {ecip.description}
                    </div>
                  </td>
                  <td className="hidden py-3 pr-4 text-[var(--text-muted)] sm:table-cell">
                    {ecip.stage}
                  </td>
                  <td className="hidden py-3 pr-4 text-[var(--text-muted)] md:table-cell">
                    {ecip.type}
                  </td>
                  <td className="py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        ecip.status === "Implemented" || ecip.status === "Deployed"
                          ? "bg-[var(--brand-green-subtle)] text-[var(--brand-green)]"
                          : ecip.status === "In Progress"
                            ? "bg-[rgba(245,158,11,0.08)] text-[var(--brand-amber)]"
                            : "bg-[rgba(107,114,128,0.08)] text-[var(--text-subtle)]"
                      }`}
                    >
                      {ecip.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
