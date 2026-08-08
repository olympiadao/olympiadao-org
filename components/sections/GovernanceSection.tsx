import {
  FileText,
  Vote,
  Clock,
  Zap,
  FileCheck,
  TrendingUp,
  BarChart2,
  Scale,
  Lightbulb,
  ArrowRight,
  GitBranch,
  Server,
  CheckCircle,
} from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionDivider } from "@/components/ui/SectionDivider";

const formalSteps = [
  {
    icon: FileText,
    number: "01",
    title: "Propose",
    description: "Any ETC account can submit a funding proposal on-chain",
  },
  {
    icon: Vote,
    number: "02",
    title: "Vote",
    description: "Membership NFT holders cast weighted on-chain votes",
  },
  {
    icon: Clock,
    number: "03",
    title: "Queue",
    description: "Approved proposals enter a configurable security timelock",
  },
  {
    icon: Zap,
    number: "04",
    title: "Execute",
    description: "After timelock, proposals execute on-chain without manual intervention",
  },
  {
    icon: FileCheck,
    number: "05",
    title: "Disclose",
    description: "All outcomes are publicly recorded and verifiable on-chain",
  },
];

const futarchySteps = [
  {
    icon: TrendingUp,
    number: "01",
    title: "Open",
    description: "Anyone opens a prediction market on a proposed protocol outcome",
  },
  {
    icon: BarChart2,
    number: "02",
    title: "Speculate",
    description: "Public participants stake on outcomes with no membership required",
  },
  {
    icon: Scale,
    number: "03",
    title: "Resolve",
    description: "Markets settle when the underlying governance event executes on-chain",
  },
  {
    icon: Lightbulb,
    number: "04",
    title: "Signal",
    description: "Market prices feed back as on-chain signal into future governance decisions",
  },
];

const powSteps = [
  {
    icon: Vote,
    number: "01",
    title: "DAO Approval",
    description: "Olympia DAO votes to approve a protocol upgrade through the on-chain governance process",
  },
  {
    icon: GitBranch,
    number: "02",
    title: "Client Releases",
    description: "Independent client teams publish compatible implementations of the approved upgrade",
  },
  {
    icon: Server,
    number: "03",
    title: "Network Adoption",
    description: "Miners, exchanges, wallets, and node operators upgrade their software across the network",
  },
  {
    icon: CheckCircle,
    number: "04",
    title: "Distributed Consensus",
    description: "The upgrade activates when the broader network has adopted the new software — distributed participation made real",
  },
];

function StepList({ steps }: { steps: typeof formalSteps }) {
  return (
    <>
      {/* Desktop: horizontal with connecting line */}
      <div className="mt-8 hidden md:block">
        <div className="relative">
          <div className="absolute top-5 left-5 right-5 h-px bg-[var(--divider)]" />
          <div
            className="relative grid gap-3"
            style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}
          >
            {steps.map((step, i) => (
              <FadeIn key={step.title} delay={i * 80}>
                <div className="text-center">
                  <div className="relative mx-auto flex h-10 w-10 items-center justify-center rounded-full border-2 border-[var(--brand-green)] bg-[var(--background)]">
                    <span className="text-xs font-mono font-bold text-[var(--brand-green)]">
                      {step.number}
                    </span>
                  </div>
                  <p className="mt-3 text-sm font-semibold">{step.title}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-[var(--text-muted)]">
                    {step.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: vertical */}
      <div className="mt-6 space-y-5 md:hidden">
        {steps.map((step, i) => (
          <FadeIn key={step.title} delay={i * 60}>
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-[var(--brand-green)] bg-[var(--background)]">
                  <span className="text-[10px] font-mono font-bold text-[var(--brand-green)]">
                    {step.number}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className="mt-2 h-full w-px bg-[var(--divider)]" />
                )}
              </div>
              <div className="pb-3">
                <p className="text-sm font-semibold">{step.title}</p>
                <p className="mt-1 text-xs text-[var(--text-muted)]">
                  {step.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </>
  );
}

export function GovernanceSection() {
  return (
    <>
      <SectionDivider />
      <section aria-labelledby="governance-heading" className="relative py-28">
        <div className="relative z-10 mx-auto max-w-5xl px-6">
          <FadeIn>
            <h2 id="governance-heading" className="text-3xl font-bold tracking-tight">
              Governance Architecture
            </h2>
            <p className="mt-3 text-base text-[var(--text-muted)]">
              Three complementary systems designed to work together. Membership-based
              on-chain governance handles binding protocol decisions. Open prediction
              markets give the broader public a financially incentivized stake in
              network direction. Network participants — miners, exchanges, wallets,
              and infrastructure providers — govern through the client software they run.
            </p>
          </FadeIn>

          <div className="mt-12 grid gap-6">
            {/* Formal Governance */}
            <FadeIn delay={80}>
              <div className="rounded-xl border border-[var(--divider)] bg-[var(--bg-elevated)] p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-mono uppercase tracking-wider text-[var(--brand-green)]">
                      Core Development Governance
                    </p>
                    <h3 className="mt-1.5 text-lg font-semibold">
                      Binding On-Chain Protocol Governance
                    </h3>
                    <div className="mt-3 flex gap-2">
                      <span className="rounded-full bg-[var(--brand-green-subtle)] px-2.5 py-0.5 text-[10px] font-mono text-[var(--brand-green)]">
                        ECIP-1113
                      </span>
                      <span className="rounded-full bg-[var(--brand-green-subtle)] px-2.5 py-0.5 text-[10px] font-mono text-[var(--brand-green)]">
                        ECIP-1114
                      </span>
                      <span className="rounded-full bg-[var(--brand-green-subtle)] px-2.5 py-0.5 text-[10px] font-mono text-[var(--brand-green)]">
                        ECIP-1119
                      </span>
                    </div>
                    <p className="mt-4 text-sm text-[var(--text-muted)]">
                      Binding governance scoped to core client software, critical
                      infrastructure, network security, treasury allocation, and
                      emergency protocol responses. The treasury is funded
                      continuously by basefee revenue, on-chain donations, and
                      miners directing hashpower to the treasury address.
                      Stakeholders who prefer a traditional giving model can also
                      contribute through the ETC Cooperative, a US 501(c)(3)
                      non-profit that accepts tax-deductible donations.
                    </p>
                    <p className="mt-3 text-sm text-[var(--text-muted)]">
                      Any stakeholder, whether exchanges, custodians, miners,
                      investment product issuers, or institutions holding ETC
                      on behalf of fund shareholders, can contribute directly
                      on-chain with no overhead and no intermediaries. Settlement
                      is immediate and verifiable. No coordination calls, no
                      invoices, no preferred relationships.
                    </p>
                    <p className="mt-3 text-sm text-[var(--text-muted)]">
                      Core development is no longer gated behind employment.
                      Open proposals let any of the thousands of EVM developers
                      worldwide bid for development funds, infrastructure
                      contracts, and critical service agreements covering block
                      explorers, RPC endpoints, oracles, bridges, and ecosystem
                      integrations. Open proposals, open bids, open funding,
                      all executed by the Wyoming DAO LLC on behalf of what the
                      Olympia DAO approves on-chain.
                    </p>
                  </div>
                </div>
                <StepList steps={formalSteps} />
                <div className="mt-6">
                  <a
                    href="https://app.olympiadao.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-[var(--brand-green)] transition-colors hover:text-[var(--brand-green-hover)]"
                  >
                    View the Olympia DAO Governance App
                    <ArrowRight size={14} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </FadeIn>

            {/* Futarchy Markets */}
            <FadeIn delay={160}>
              <div className="rounded-xl border border-[var(--divider)] bg-[var(--bg-elevated)] p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-mono uppercase tracking-wider text-[var(--brand-green)]">
                      Futarchy Markets
                    </p>
                    <h3 className="mt-1.5 text-lg font-semibold">
                      Open Prediction Markets and Public Signal
                    </h3>
                    <div className="mt-3 flex gap-2">
                      <span className="rounded-full bg-[var(--brand-green-subtle)] px-2.5 py-0.5 text-[10px] font-mono text-[var(--brand-green)]">
                        ECIP-1117
                      </span>
                      <span className="rounded-full bg-[var(--brand-green-subtle)] px-2.5 py-0.5 text-[10px] font-mono text-[var(--brand-green)]">
                        ECIP-1118
                      </span>
                    </div>
                    <p className="mt-4 text-sm text-[var(--text-muted)]">
                      Open prediction markets where anyone can speculate on
                      protocol outcomes without membership. Participants are
                      financially rewarded for accurate predictions, bringing
                      new users onto ETC and generating transaction volume that
                      flows as basefee revenue into the protocol treasury.
                      Better signal produces more development funding and better
                      protocol outcomes, creating a self-reinforcing loop between
                      public participation and core development capacity.
                    </p>
                  </div>
                </div>
                <StepList steps={futarchySteps} />
              </div>
            </FadeIn>

            {/* Network Participant Layer */}
            <FadeIn delay={240}>
              <div className="rounded-xl border border-[var(--divider)] bg-[var(--bg-elevated)] p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-mono uppercase tracking-wider text-[var(--brand-green)]">
                      Network Participant Layer
                    </p>
                    <h3 className="mt-1.5 text-lg font-semibold">
                      Software Adoption as Governance Signal
                    </h3>
                    <div className="mt-3 flex gap-2">
                      <span className="rounded-full bg-[var(--brand-green-subtle)] px-2.5 py-0.5 text-[10px] font-mono text-[var(--brand-green)]">
                        Software Releases
                      </span>
                    </div>
                    <p className="mt-4 text-sm text-[var(--text-muted)]">
                      Every node operator, mining pool, exchange, and wallet
                      provider participates in governance through the client
                      software they choose to run. When the DAO approves a
                      protocol upgrade and independent client teams publish
                      compatible releases, network adoption is the final step.
                      An upgrade becomes real when the infrastructure that
                      secures, settles, and routes ETC transactions upgrades to
                      support it. No membership required, no market position to
                      open — running the software is the governance act.
                    </p>
                  </div>
                </div>
                <StepList steps={powSteps} />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
