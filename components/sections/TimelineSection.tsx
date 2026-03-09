const stages = [
  {
    number: 1,
    title: "Olympia Hard Fork",
    ecips: "1111, 1112, 1121",
    type: "Consensus",
    description:
      "EIP-1559 basefee redirect to Treasury + 15 EVM compatibility EIPs. Three independent client implementations.",
    status: "implemented" as const,
  },
  {
    number: 2,
    title: "CoreDAO Governance",
    ecips: "1113, 1114, 1119",
    type: "Contract",
    description:
      "Traditional DAO pipeline: OlympiaGovernor → Timelock → Executor → Treasury. NFT-based voting. Sanctions constraint.",
    status: "in-progress" as const,
  },
  {
    number: 3,
    title: "Futarchy DAO",
    ecips: "1117, 1118",
    type: "Contract",
    description:
      "Prediction market governance with LMSR AMM. Streaming disbursements with milestone-gated releases and clawback.",
    status: "planned" as const,
  },
  {
    number: 4,
    title: "Miner Distribution",
    ecips: "1115",
    type: "Contract",
    description:
      "L-curve smoothing experiments. Test curves, amounts, and strategies before hardcoding at protocol level.",
    status: "planned" as const,
  },
  {
    number: 5,
    title: "Protocol Hardcode",
    ecips: "1116, 1122",
    type: "Consensus",
    description:
      "Embed validated basefee split (5%/95%) and miner distribution at consensus. Second hard fork.",
    status: "deferred" as const,
  },
];

const statusColors = {
  implemented: {
    bg: "bg-[var(--brand-green-subtle)]",
    text: "text-[var(--brand-green)]",
    border: "border-[var(--brand-green)]",
    label: "Implemented",
  },
  "in-progress": {
    bg: "bg-[rgba(245,158,11,0.08)]",
    text: "text-[var(--brand-amber)]",
    border: "border-[var(--brand-amber)]",
    label: "In Progress",
  },
  planned: {
    bg: "bg-[rgba(56,189,248,0.08)]",
    text: "text-[var(--color-info)]",
    border: "border-[var(--color-info)]",
    label: "Planned",
  },
  deferred: {
    bg: "bg-[rgba(107,114,128,0.08)]",
    text: "text-[var(--text-subtle)]",
    border: "border-[var(--text-subtle)]",
    label: "Deferred",
  },
};

export function TimelineSection() {
  return (
    <section id="timeline" className="py-20">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="mb-4 text-center text-3xl font-bold tracking-tight text-[var(--brand-green)]">
          Five Stages
        </h2>
        <p className="mx-auto mb-14 max-w-2xl text-center text-[var(--text-muted)]">
          Each stage addresses a specific concern and unlocks the next. Nothing
          is optional — each layer builds on the operational reality of the
          previous one.
        </p>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute top-0 bottom-0 left-6 w-px bg-[var(--border-default)] md:left-1/2" />

          <div className="space-y-12">
            {stages.map((stage) => {
              const status = statusColors[stage.status];
              return (
                <div key={stage.number} className="relative">
                  {/* Dot */}
                  <div
                    className={`absolute left-6 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-2 ${status.border} bg-[var(--background)] md:left-1/2`}
                    style={{ top: "1.75rem" }}
                  />

                  <div className="ml-14 md:ml-0 md:grid md:grid-cols-2 md:gap-8">
                    {/* Stage number side */}
                    <div
                      className={`md:text-right ${stage.number % 2 === 0 ? "md:order-2 md:text-left" : ""}`}
                    >
                      <div className="mb-2 flex items-center gap-3 md:justify-end">
                        {stage.number % 2 === 0 && (
                          <span
                            className={`hidden md:inline-flex items-center rounded-full ${status.bg} px-2.5 py-0.5 text-xs font-medium ${status.text}`}
                          >
                            {status.label}
                          </span>
                        )}
                        <span className="text-sm font-semibold text-[var(--text-subtle)]">
                          Stage {stage.number}
                        </span>
                        {stage.number % 2 !== 0 && (
                          <span
                            className={`inline-flex items-center rounded-full ${status.bg} px-2.5 py-0.5 text-xs font-medium ${status.text}`}
                          >
                            {status.label}
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold">{stage.title}</h3>
                    </div>

                    {/* Content side */}
                    <div
                      className={`mt-2 md:mt-0 ${stage.number % 2 === 0 ? "md:order-1 md:text-right" : ""}`}
                    >
                      <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                        {stage.description}
                      </p>
                      <p className="mt-2 font-mono text-xs text-[var(--text-subtle)]">
                        ECIPs: {stage.ecips} &middot; {stage.type}
                      </p>
                      <span
                        className={`mt-2 inline-flex items-center rounded-full ${status.bg} px-2.5 py-0.5 text-xs font-medium ${status.text} md:hidden`}
                      >
                        {status.label}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
