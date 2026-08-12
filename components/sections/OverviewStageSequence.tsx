import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";

type Stage = {
  name: string;
  /** True where the stage changes rules every node enforces */
  fork: boolean;
  /** What a stage that is not a fork actually is, in ECIP-1121's own terms */
  kind?: string;
  ecips: string[];
  body: string;
};

const stages: Stage[] = [
  {
    name: "Consensus Upgrades",
    fork: true,
    ecips: ["ECIP-1111", "ECIP-1112", "ECIP-1121", "ECIP-1122"],
    body: "Client and consensus changes activate, and consensus begins crediting the Olympia Sovereignty Vault, which was deployed and audited well before this block. It keeps nothing and forwards what it receives to the Olympia Treasury. Nothing can spend that revenue yet, because the Governor's execution gate fails closed until the sanctions oracle is bound.",
  },
  {
    name: "Core Governance",
    fork: false,
    kind: "Governance goes live",
    ecips: ["ECIP-1113", "ECIP-1114", "ECIP-1119"],
    body: "The contracts that vote and hold the money are already on-chain. What happens at this stage is binding the sanctions oracle and the proposal registry, after which the DAO can spend. Those two attach through a setter rather than being built into anything, so they may be deployed on either side of the fork, and revenue accrues unspendably until the oracle is bound.",
  },
  {
    name: "Prediction Markets",
    fork: false,
    kind: "Contract deployment",
    ecips: ["ECIP-1117", "ECIP-1118"],
    body: "The market contracts deploy, paid for by a funding proposal that the second stage's DAO passes. These contracts hold and release funds themselves, so ECIP-1119 puts the sanctions check inside them rather than upstream. That is an obligation on whoever writes them, and it is not met until they are written and audited.",
  },
  {
    name: "Treasury Distribution",
    fork: false,
    kind: "Governance activation",
    ecips: ["ECIP-1115"],
    body: "A candidate curve for returning part of the base fee to miners runs at the contract layer, on funds the Treasury already holds. Its fraction, its window and its shape are all set through the proposal process, so a wrong number costs a proposal rather than a fork.",
  },
  {
    name: "Protocol Integration",
    fork: true,
    ecips: ["ECIP-1116"],
    body: "The curve the previous stage demonstrated is written into block finalization. The protocol pays it directly instead of disbursing it, and the payment path leaves governance entirely. It cannot activate until real production data justifies the number it hardens.",
  },
];

/** One line in, two lines out: what a hard fork does to the rules. */
function ForkGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M2 12h6" />
      <path d="M8 12l4-5h6" />
      <path d="M8 12l4 5h6" />
    </svg>
  );
}

/** One line straight through: no rule any node enforces moves. */
function NoForkGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M2 12h20" />
    </svg>
  );
}

function ForkBadge({ fork }: { fork: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest ${
        fork ? "text-[var(--brand-green)]" : "text-[var(--text-subtle)]"
      }`}
    >
      {fork ? <ForkGlyph /> : <NoForkGlyph />}
      {fork ? "Hard fork" : "No fork"}
    </span>
  );
}

export function OverviewStageSequence() {
  return (
    <>
      {/* The sequence at a glance. Every word of it is repeated as text below, so
          it is decoration to a screen reader rather than a second reading of the list. */}
      <FadeIn>
        <div aria-hidden="true" className="mt-10">
          <div className="grid grid-cols-5 gap-2 sm:gap-4">
            {stages.map((stage, i) => (
              <div key={stage.name} className="flex flex-col">
                <span
                  className={`block h-1 w-full rounded-full ${
                    stage.fork
                      ? "bg-[var(--brand-green)]"
                      : "bg-[var(--border-default)]"
                  }`}
                />
                <span
                  className={`mt-3 ${
                    stage.fork
                      ? "text-[var(--brand-green)]"
                      : "text-[var(--text-subtle)]"
                  }`}
                >
                  {stage.fork ? <ForkGlyph /> : <NoForkGlyph />}
                </span>
                <span className="mt-2 font-mono text-xs text-[var(--text-subtle)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mt-1 hidden text-sm font-semibold tracking-tight sm:block">
                  {stage.name}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-5 font-mono text-xs uppercase tracking-widest text-[var(--text-subtle)]">
            Two forks, at the ends
          </p>
        </div>
      </FadeIn>

      <ol className="m-0 mt-12 list-none p-0">
        {stages.map((stage, i) => (
          <li key={stage.name} className="border-t border-[var(--divider)] last:border-b">
            <FadeIn delay={i * 60} className="py-6">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                <h3 className="text-lg font-semibold tracking-tight">
                  <span className="font-mono text-[var(--text-subtle)]">
                    {`${String(i + 1).padStart(2, "0")} `}
                  </span>
                  {stage.name}
                </h3>
                <ForkBadge fork={stage.fork} />
                {stage.kind && (
                  <span className="font-mono text-xs text-[var(--text-subtle)]">
                    {stage.kind}
                  </span>
                )}
              </div>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
                {stage.body}
              </p>
              <p className="mt-3 font-mono text-xs text-[var(--text-subtle)]">
                {stage.ecips.join(" · ")}
              </p>
            </FadeIn>
          </li>
        ))}
      </ol>

      <FadeIn delay={120}>
        <div className="mt-10 border-l-2 border-[var(--brand-green)] pl-5">
          <p className="max-w-3xl text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
            The three stages in the middle are not forks. They deploy contracts
            and run governance on a chain whose rules are already settled, so no
            node can end up disagreeing with any other over them. Reading the
            roadmap as five forks is the first misreading this sequence is drawn
            to prevent.
          </p>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
            The second is reading it as a build order. Staging is a rollout
            schedule, not a deployment mechanism: every contract the first fork
            commits to is deployed, audited and readable on-chain before that
            block, so the audit window sits in front of the fork rather than in
            a gap after it. Two pieces sit deliberately outside that set, the
            sanctions oracle and the proposal registry, and either may be
            deployed on either side of the fork because each attaches through a
            setter rather than being built into anything. What arrives later is
            the ability to spend, not the code. Each stage still depends only on
            the stages before it, and the last cannot arrive until the fourth has
            produced the evidence that it hardens into consensus.
          </p>
          <p className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <Link
              href="/overview/what-ships"
              className="font-medium text-[var(--brand-green)] transition-opacity duration-200 hover:opacity-70"
            >
              What ships at the first fork
            </Link>
            <Link
              href="/overview/security-budget"
              className="font-medium text-[var(--brand-green)] transition-opacity duration-200 hover:opacity-70"
            >
              What the last two stages are for
            </Link>
          </p>
        </div>
      </FadeIn>
    </>
  );
}
