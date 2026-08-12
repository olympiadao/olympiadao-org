import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import {
  ExternalLink,
  CheckCircle2,
  Cpu,
  Layers,
  Code2,
  ShieldCheck,
  Network,
  LayoutDashboard,
  Github,
  Vote,
  Landmark,
  Coins,
  Gauge,
  Lock,
  Terminal,
  ArrowRight,
} from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { Accordion } from "@/components/ui/Accordion";
import { RoadmapSection } from "@/components/sections/RoadmapSection";
import { NetworkStatsStrip } from "@/components/sections/NetworkStatsStrip";
import { PropertyCard } from "@/components/ui/PropertyCard";
import { NavHeader } from "@/components/sections/NavHeader";
import { NavHeaderFallback } from "@/components/ui/SsrFallbacks";
import { FooterSection } from "@/components/sections/FooterSection";
import { CORE_GETH_REPO, FUKUII_REPO, SECURITY_AUDIT_URL } from "@/lib/clients";
import {
  BLOB_DEFERRED,
  CLIENT_PARAMETERS,
  CORE_DEVS_REVIEW,
  EXECUTION_EIP_GROUPS,
  FEE_FLOORS,
  FORK_TIMELINE,
  GLAMSTERDAM_ADOPTED,
  NETWORKING_PROTOCOLS,
} from "@/lib/olympia-eips";

const FUKUII_RELEASES = `${FUKUII_REPO}/releases`;
const FUKUII_DOCS = "https://docs.fukuii.org";
const FUKUII_SECURITY = `${FUKUII_REPO}/security/advisories/new`;
const CORE_GETH_RELEASES = `${CORE_GETH_REPO}/releases`;

export const metadata: Metadata = {
  title: "Upgrade Your Node for Olympia",
  description:
    "How to run Fukuii through the Olympia hard fork: install, run, and mining flags, what changes for node operators and miners, and every EIP the upgrade activates. Core-Geth is a supported path for operators already on it.",
  keywords: [
    "Ethereum Classic node upgrade",
    "run an Ethereum Classic node",
    "Fukuii",
    "Fukuii install",
    "Core-Geth",
    "ETC upgrade",
    "Olympia upgrade",
    "hard fork",
    "ETC mining node",
    "ETChash",
    "ECIP-1017",
    "ECIP-1100",
    "MESS",
    "MIN_MINER_TIP",
    "minimum gas price ETC",
    "Glamsterdam EVM alignment",
    "Glamsterdam EVM",
    "Glamsterdam",
    "EVM alignment",
    "EIP-1559",
    "EIP-3198",
    "BASEFEE opcode",
    "ECIP-1111",
    "ECIP-1112",
    "ECIP-1121",
    "ECIP-1122",
    "Fusaka",
    "Pectra",
    "Dencun",
    "protocol treasury",
    "Foundry ETC",
    "Hardhat ETC",
    "wagmi ETC",
    "viem ETC",
    "EIP-7702",
    "EIP-2537",
    "BLS12-381",
    "transient storage",
    "EIP-1153",
    "MCOPY",
    "EIP-5656",
    "Solidity compatibility",
  ],
  alternates: { canonical: "/upgrade" },
  openGraph: {
    type: "website",
    url: "/upgrade",
    siteName: "OlympiaDAO",
    title: "Upgrade Your Node for Olympia: Fukuii and Core-Geth",
    description:
      "Install and run Fukuii, the primary Ethereum Classic client, through the Olympia hard fork. What changes for operators and miners, and every EIP the upgrade activates.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "OlympiaDAO" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Upgrade Your Node for Olympia: Fukuii and Core-Geth",
    description:
      "Install and run Fukuii, the primary Ethereum Classic client, through the Olympia hard fork. What changes for operators and miners, and every EIP the upgrade activates.",
    images: ["/og-image.png"],
  },
};

/**
 * Fukuii's requirements come from `fukuii-project/fukuii-org`
 * (`src/content/hardware.json`), not from a guess at a disk figure. The project
 * declines to state one, because it depends on the network and on whether the
 * node is pruned or archive.
 */
const fukuiiRequirements = [
  {
    item: "Java",
    requirement: "Current JDK LTS, 25",
    note: "Any OpenJDK build of the current LTS. The container image bundles one, so a container node needs no JDK at all.",
  },
  {
    item: "Memory",
    requirement: "8 GB minimum for the JVM heap",
    note: "Add headroom for each additional network run in the same process.",
  },
  {
    item: "Disk space",
    requirement: "Set by the network and the storage mode",
    note: "An Ethereum Classic node is substantially smaller than an Ethereum one. An archive node is a multiple of the pruned figure on either.",
  },
  {
    item: "Disk type",
    requirement: "SSD, and NVMe for a mining pool or a public RPC node",
    note: "State access during sync is random rather than sequential, which a spinning disk cannot keep up with.",
  },
  {
    item: "CPU",
    requirement: "Highest while syncing, lower at the chain tip",
    note: "Size for the sync, then scale down on observed usage rather than on the peak.",
  },
];

const fukuiiUpgradeSteps = [
  "Take the release marked for Olympia from the releases page, which publishes builds for every supported platform well ahead of the activation block.",
  "Stop the node.",
  "Replace the binary, or pull the new container tag.",
  "Start it again and confirm the version.",
];

const coreGethUpgradeSteps = [
  "Take the Olympia release from the ethereumclassic repository, not from etclabscore.",
  "Stop the node.",
  "Replace the binary, or update through your package manager.",
  "Start it again and confirm the version.",
];

/**
 * ECIP-1122's three parameters, in the language an operator uses.
 *
 * Titles and constants come from `lib/olympia-eips.ts`, which
 * `/overview/what-ships` also reads, so the two pages cannot quote different
 * values for the same floor. Only the icon and the operator-facing description
 * are local to this page.
 */
const parameterDetail: Record<
  string,
  { icon: typeof Coins; description: string }
> = {
  tip: {
    icon: Coins,
    description:
      "Your node rejects a transaction whose effective tip falls below one gwei, and it checks twice: when the transaction arrives over RPC or peer-to-peer gossip, and again when it selects transactions for a block. This codifies what wallets already recommend rather than introducing a new cost. The transaction-pool price limit inherited from go-ethereum defaults to one wei, a billionth of the figure people actually pay, and any operator can override it.",
  },
  gas: {
    icon: Gauge,
    description:
      "The gas target becomes a network-authoritative value that overrides an operator's own gas-limit flag: 8,000,000 through the Spiral era, and 60,000,000 from Olympia onward. Over three weeks in late 2023 the mainnet limit was dragged from 8,000,000 down toward 1,000,000, blocking deployment of any contract that needed more, and the block headers still show it. One operator's configuration moved the whole network's limit, and the network had no protocol-level defense against that. This parameter is that defense.",
  },
  mess: {
    icon: Lock,
    /**
     * The deactivation was scheduled into Spiral, not a reaction to hashrate.
     * ECIP-1122 §Motivation 3 pins both heights to `params/config_classic.go`
     * and notes that 19,250,000 is Spiral's own activation block, which is what
     * makes the window "precisely Spiral to Olympia". The previous wording here
     * ("switched off after a period of low network hashrate") invented a
     * rationale the specification does not give.
     */
    description:
      "Modified Exponential Subjective Scoring scores competing chains exponentially rather than linearly by total difficulty, which makes a low-cost chain reorganization expensive to attempt. It ran from block 11,380,000 and was switched off at block 19,250,000, which is Spiral's own activation block, so the deactivation was scheduled into that upgrade rather than a response to conditions. Olympia restores it, closing a window that runs precisely from Spiral to Olympia.",
  },
};

const clientParameters = CLIENT_PARAMETERS.map((param) => ({
  title: param.title,
  constant: param.constant,
  icon: parameterDetail[param.key]!.icon,
  description: parameterDetail[param.key]!.description,
}));

const feeFloors = FEE_FLOORS;
const forkTimeline = FORK_TIMELINE;

/**
 * The EIP membership of each card is read from `lib/olympia-eips.ts`, which
 * mirrors ECIP-1121 §Specification's own functional grouping and is the same
 * source `/overview/what-ships` derives its counts from. Only the icon and the
 * builder-facing description are local to this page.
 *
 * The networking row is appended rather than living in that grouping: it is the
 * one entry that does not arrive at the fork, because devp2p negotiates the
 * capability. Nothing here describes eth/69's wire format, which is an open
 * question with the specification's authors.
 */
const evmCategoryDetail: Record<string, { icon: typeof Layers; description: string }> = {
  gas: {
    icon: Layers,
    description:
      "Account code for externally owned accounts, recalibrated calldata and MODEXP pricing, a bound of 8,192 bits on MODEXP inputs, a per-transaction cap of 16,777,216 gas, and the 60,000,000 gas target. Type-4 transactions use chain ID 61 on mainnet and 63 on Mordor for replay protection.",
  },
  safety: {
    icon: ShieldCheck,
    description:
      "SELFDESTRUCT restricted to the transaction that created the contract, a block size limit of 8 MiB, the eth_config JSON-RPC method, and a deterministic factory contract. That 8 MiB is the same execution-layer limit Ethereum enforces rather than a smaller one: Ethereum reaches it by holding 2 MiB of a 10 MiB budget back for its beacon block, and the figure each chain applies to the block itself is identical.",
  },
  crypto: {
    icon: Cpu,
    description:
      "BLS12-381 pairing operations for proof verification, and secp256r1 verification for passkey and WebAuthn authentication. Neither of them depends on Proof-of-Stake or on blob data availability.",
  },
  context: {
    icon: Code2,
    description:
      "Transient storage through TSTORE and TLOAD, historical block hashes served from state, MCOPY for memory copies, and the CLZ opcode at 0x1e. Between them they unlock reentrancy guards and cross-contract patterns that do not have to touch persistent storage.",
  },
};

const evmCategories = [
  ...EXECUTION_EIP_GROUPS.map((group) => ({
    title: group.label,
    icon: evmCategoryDetail[group.key]!.icon,
    eips: group.eips,
    description: evmCategoryDetail[group.key]!.description,
  })),
  {
    title: "Networking",
    icon: Network,
    eips: NETWORKING_PROTOCOLS.map((protocol) => protocol.eip),
    description:
      "Two peer-to-peer protocol versions rather than changes to how contracts run. eth/69 also drops receipt bloom filters, and eth/70 paginates receipts for blocks above the peer-to-peer size limit. Both negotiate as devp2p capabilities, so neither needs a hard fork.",
  },
];

const devTools = [
  {
    name: "Solidity 0.8.x and later",
    description:
      "Recent compiler versions and optimization passes produce compatible bytecode for Ethereum Classic without modification.",
  },
  {
    name: "Foundry and Hardhat",
    description:
      "Standard EVM testing and deployment toolchains work without ETC-specific forks or patches.",
  },
  {
    name: "wagmi, viem and ethers.js",
    description:
      "Standard wallet libraries and RPC types work without patching or overrides. One codebase, every EVM chain.",
  },
];

const faqItems = [
  {
    question: "What happens if I do not upgrade my node?",
    answer:
      "A node still running the old rules at the activation block stops following the canonical chain. It keeps producing and accepting blocks under rules the rest of the network has left behind, so it is no longer on Ethereum Classic. Exchanges, wallets, RPC providers and services in that position cannot process transactions on the post-Olympia chain. Client releases are published well ahead of activation to give operators time, and the fix afterward is to upgrade the client and resync from the fork point.",
  },
  {
    question: "Do I have to resync?",
    answer:
      "Not if you upgrade before the activation block. A hard fork changes the rules a node applies from that block onward; it does not rewrite the chain behind it, so an upgraded node keeps the state it already has and carries on. Resyncing is only the recovery path for a node that missed the activation and followed the old rules past it.",
  },
  {
    question: "Which client should I run?",
    answer:
      "Fukuii for anything new. It is Ethereum Classic's first native client, written for this network rather than adapted from an Ethereum client, and it is the primary client for the Olympia era. Core-Geth is a path for an operator already running it, so nobody has to migrate in order to take the upgrade, but it is in maintenance rather than active development and a node that does not exist yet should not be starting there. Both carry the Olympia parameters. What settles conformance is not a client's own account of itself: cross-client state-transition equivalence is demonstrated on Mordor before a mainnet activation block is scheduled.",
  },
  {
    question: "Will my miner rewards change?",
    answer:
      "Block rewards do not change. ECIP-1017's emission schedule is untouched, and Olympia changes where a fee component goes rather than ETC's supply or issuance. Tips still go to the miner in full. What Olympia adds is a base fee, which Ethereum Classic does not have today because EIP-1559 is not active here, and that base fee is redirected to the Treasury instead of being burned. At the minimum gas price the miner's position improves rather than worsens: the base fee is new cost paid by the sender, and the 1 gwei floor under the tip becomes enforceable for the first time, where the client default today is 1 wei. Above the floor it runs the other way, because at a fixed total gas price one gwei per unit of gas moves from the tip to the Treasury. ECIP-1111 puts that at a low single-digit percentage of fee income measured against Ethereum Classic's observed fee levels, and fee income is itself a fraction of a percent of total miner revenue while block subsidies dominate.",
  },
  {
    question: "When is the mainnet activation block?",
    answer:
      "It is not set. ECIP-1111 and ECIP-1121 both carry TBD for Mordor and for mainnet, to be finalized through open coordination among client implementers, node operators, miners, exchanges and infrastructure providers. Olympia is targeted for mainnet activation in 2027. Mordor activates first; the mainnet block follows a clean Mordor run and a coordinated stakeholder readiness check with exchanges, mining pools, node operators and infrastructure providers. All client implementations publish Olympia-compatible releases well before activation, and the process follows the same sequence used for every previous ETC hard fork.",
  },
  {
    question: "How was Olympia tested before mainnet?",
    answer:
      "Olympia activates on the Mordor testnet first. Mordor is Ethereum Classic's Proof-of-Work testnet and mirrors mainnet conditions closely. Multiple independent client implementations run the Mordor fork before any mainnet activation is scheduled. Cross-client validation using the Hive integration testing framework confirms consensus compatibility across implementations. The mainnet activation block is not set until Mordor has run cleanly and major network stakeholders, including exchanges, custodians, and mining pools, have confirmed readiness.",
  },
  {
    question: "Can I roll back if something goes wrong?",
    answer:
      "In the unlikely event of a critical issue after activation, the same client teams that have managed every ETC emergency response since 2016 would coordinate a patch release promptly. The established stakeholder communication channels, including the ETC Cooperative, client maintainers, and major exchange contacts, are the same ones used for every previous upgrade. Olympia has broader test coverage across more independent client implementations than any previous ETC hard fork, and the Mordor testnet run provides a real network validation environment before mainnet activation.",
  },
  {
    question: "What does EVM alignment to Glamsterdam actually mean for builders?",
    answer:
      "ECIP-1121 closes years of execution-layer divergence in a single upgrade, filling the remaining Shanghai gaps left by Spiral's partial implementation and delivering the improvements from Dencun, Pectra and Fusaka that are independent of Proof-of-Stake and blob data availability, then carrying that work into Glamsterdam. Glamsterdam is the alignment target rather than a completed one: that upgrade is still being assembled on Ethereum, so ECIP-1121 adopts the pieces of it that are ready and stable, lists a further set for the Olympia Core Devs Call to classify, and tracks the rest behind the dependencies that gate them rather than rejecting any of it. What changes for a builder is tooling. Solidity 0.8.x, Foundry, Hardhat, wagmi, viem and ethers.js all work on ETC without modification, patching, or ETC-specific overrides, so one codebase deploys to every EVM chain. The consequences extend past tooling: wallets, exchanges, oracles and bridges make integration decisions based on EVM compatibility, and ETC re-enters the default support scope of those products without requiring custom work from their teams. Security auditing tools, compiler improvements and best practices the EVM community produces continuously now apply to ETC as well.",
  },
  {
    question: "How does the protocol treasury work?",
    answer:
      "The Olympia Treasury is funded by EIP-1559 base-fee revenue, the only protocol-defined source, alongside voluntary on-chain donations. No ECIP directs mining revenue to the Treasury. A transaction pays a base fee plus a priority-fee tip; Ethereum burns the base fee and Olympia redirects it instead. Tips and ECIP-1017 block rewards remain untouched and go entirely to miners. Futarchy prediction market activity generates additional transaction volume that flows back into the treasury as base-fee revenue. Any stakeholder, whether exchanges, custodians, miners, investment product issuers, or institutions holding ETC on behalf of fund shareholders, can contribute directly on-chain with no overhead. Stakeholders who prefer a traditional giving model can instead contribute through the ETC Cooperative, which is a US 501(c)(3) non-profit and accepts tax-deductible donations.",
  },
  {
    question: "Who is coordinating the Olympia upgrade?",
    answer:
      "Olympia is coordinated by the same developers, organizations, and community stewards who have delivered every Ethereum Classic network upgrade since 2016: Gotham, Die Hard, Defuse Difficulty Bomb, Thanos, and the full EVM compatibility series spanning Gas Reprice, Atlantis, Agharta, Phoenix, Magneto, Mystique, and Spiral. The ETC Cooperative, a US 501(c)(3) non-profit, funds Ethereum Classic's client development teams and has managed the hard fork coordination process throughout that history. Stakeholder outreach, client release sequencing, and cross-client testing are all established practice. Olympia is a significant upgrade carried forward by a team with a clean delivery record across a decade of ETC network upgrades.",
  },
  {
    question: "What role has the ETC Cooperative played, and what changes with Olympia?",
    answer:
      "The ETC Cooperative is a US 501(c)(3) non-profit that has funded Ethereum Classic's core client development for years, contributing millions of dollars to the network's client teams and infrastructure through every upgrade cycle. Every hard fork, every client release, and every cross-client coordination effort has been backed by their balance sheet. Olympia is what they were building toward: a protocol-native funding model that does not depend on any single organization's continued generosity. The Olympia Treasury, governed and paid out on-chain by the Olympia DAO, with a Wyoming DAO LLC standing behind it as an off-chain legal interface rather than as its executor, extends beyond institutional dependency to a durable financial foundation that scales with network usage. The model changes, not the commitment. The ETC Cooperative continues as an active steward, and any developer, mining operation, hardware manufacturer, or individual worldwide can now contribute directly on-chain without fielding a team or managing a non-profit to do it.",
  },
  {
    question: "What is Grayscale's role in Ethereum Classic's development?",
    answer:
      "Grayscale launched the Grayscale Ethereum Classic Trust (ETCG) in 2018, years before Bitcoin ETFs existed as a product category, and became a major institutional donor to the ETC Cooperative, indirectly funding the network's core client development at a time when no other investment product issuer was doing anything comparable. What Grayscale was practicing on Ethereum Classic in 2018 is now a recognized trend: ETF issuers funding protocol development, corporate treasury strategies reinvesting in network ecosystems. Taking that model on-chain is only possible on Ethereum Classic because ETC is the only Proof-of-Work blockchain with native smart contracts. Olympia DAO makes it permissionless, opening a direct on-chain contribution path to every holder, whether through ETCG, a direct wallet, or any future investment product.",
  },
  {
    question: "Is Ethereum Classic a security or commodity after Olympia?",
    answer:
      "Olympia strengthens ETC's regulatory profile. As a Proof-of-Work blockchain with no pre-mine, no ICO, no foundation controlling the protocol, and now a community-governed on-chain treasury, ETC is positioned for classification as a digital commodity under the CLARITY Act. In the EU, ETC qualifies as a decentralized asset under MiCA, exempt from per-asset issuer requirements. Japan's FSA lists ETC among approved digital assets. UK and UAE regulatory frameworks treat Proof-of-Work assets with distinct treatment from staking-based networks. The three-layer governance structure, protocol clients, Wyoming DAO LLC, and on-chain Olympia DAO, maintains clear decentralization while satisfying compliance requirements at the legal entity layer. The network remains decentralized, and governance is open to any qualified participant worldwide.",
  },
];

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] p-4 font-mono text-xs leading-relaxed text-[var(--text-secondary)]">
      <code>{children}</code>
    </pre>
  );
}

function EipChip({ eip }: { eip: string }) {
  return (
    <a
      href={`https://eips.ethereum.org/EIPS/eip-${eip.replace("EIP-", "")}`}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-sm border border-[var(--color-violet)]/20 bg-[var(--color-violet-bg)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--color-violet)] transition hover:bg-[var(--color-violet)]/15"
    >
      {eip}
    </a>
  );
}

function EcipLink({ ecip, className = "" }: { ecip: string; className?: string }) {
  return (
    <a
      href={`https://ecips.ethereumclassic.org/ECIPs/ecip-${ecip.replace("ECIP-", "")}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`font-mono text-[var(--brand-green)] transition hover:opacity-70 ${className}`}
    >
      {ecip}
    </a>
  );
}

export default function UpgradePage() {
  return (
    <>
      <Suspense fallback={<NavHeaderFallback />}><NavHeader /></Suspense>
      <main>
        {/* Hero: the funnel starts here */}
        <section className="hero-gradient relative pt-36 pb-14">
          <div className="relative z-10 mx-auto max-w-5xl px-6">
            <FadeIn>
              <p className="text-sm font-mono uppercase tracking-widest text-[var(--brand-green)]">
                Olympia · Node operators
              </p>
              <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
                Upgrade Your <span className="text-[var(--brand-green)]">Node</span>
              </h1>
            </FadeIn>
            <FadeIn delay={100}>
              <p className="max-w-3xl text-lg text-[var(--text-muted)]">
                Olympia is a hard fork. Before it activates, every Ethereum
                Classic node has to be running a release that knows about it, or
                it stops following the network at that block. This page is how you
                get there, and what changes once you do.
              </p>
            </FadeIn>
            <FadeIn delay={160}>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <a
                  href="#run-fukuii"
                  className="group flex flex-col rounded-xl border border-[var(--border-brand)] bg-[var(--brand-green-subtle)] p-5 transition hover:opacity-90"
                >
                  <span className="mb-1 inline-flex w-fit items-center gap-1.5 rounded-full border border-[var(--border-brand)] bg-[var(--bg-surface)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--brand-green)]">
                    Recommended
                  </span>
                  <span className="mt-2 flex items-center gap-2 text-base font-semibold text-[var(--text-primary)]">
                    Run Fukuii
                    <ArrowRight size={16} aria-hidden="true" className="text-[var(--brand-green)]" />
                  </span>
                  <span className="mt-1 text-sm text-[var(--text-muted)]">
                    Install it, run it, and the flags a mining node needs. This is
                    the path for a new node and for a Fukuii node you already run.
                  </span>
                </a>
                <a
                  href="#core-geth"
                  className="group flex flex-col rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-5 transition hover:border-[var(--border-brand)]"
                >
                  <span className="mb-1 inline-flex w-fit items-center gap-1.5 rounded-full border border-[var(--border-default)] bg-[var(--bg-surface)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--text-muted)]">
                    Supported
                  </span>
                  <span className="mt-2 flex items-center gap-2 text-base font-semibold text-[var(--text-primary)]">
                    Already on Core-Geth
                    <ArrowRight size={16} aria-hidden="true" className="text-[var(--text-muted)]" />
                  </span>
                  <span className="mt-1 text-sm text-[var(--text-muted)]">
                    A supported path through the fork, so nobody has to change
                    client to take the upgrade.
                  </span>
                </a>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* How the activation block is decided, which is timeless. What the
            block IS is a number that dates the page, and a countdown to it is
            the same number wearing a clock. */}
        <section className="px-6 pb-12">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <p className="text-sm text-[var(--text-muted)]">
                Activation blocks for <EcipLink ecip="ECIP-1111" /> and{" "}
                <EcipLink ecip="ECIP-1121" /> are settled through open
                coordination among the people who have to act on them: client
                implementers, node operators, miners, exchanges and
                infrastructure providers. Mordor activates first, and the mainnet
                block follows a clean Mordor run and a stakeholder readiness
                check. Every client publishes a compatible release well ahead of
                the block.
              </p>
            </FadeIn>
          </div>
        </section>

        <SectionDivider />

        {/* 1. Run Fukuii */}
        <section id="run-fukuii" className="scroll-mt-24 section-alt py-16 px-6">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <p className="font-mono text-xs uppercase tracking-widest text-[var(--brand-green)]">
                The recommended path
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight">Run Fukuii</h2>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--text-muted)]">
                Fukuii is Ethereum Classic&rsquo;s first native client, written for
                this network rather than adapted from an Ethereum one, and it is the
                primary client for the Olympia era. It carries the Olympia changes
                from <EcipLink ecip="ECIP-1111" />, <EcipLink ecip="ECIP-1112" />,{" "}
                <EcipLink ecip="ECIP-1121" /> and <EcipLink ecip="ECIP-1122" />. It is
                Apache 2.0, developed in public, and every release carries a build
                signature and a bill of materials.
              </p>
              <Link
                href="/clients/fukuii"
                className="mt-3 inline-flex items-center gap-1.5 text-sm text-[var(--brand-green)] transition hover:opacity-80"
              >
                Read about Fukuii <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </FadeIn>

            {/* What it needs */}
            <FadeIn delay={80}>
              <h3 className="mt-10 mb-4 text-base font-semibold">What it needs</h3>
              <dl className="grid gap-3 sm:grid-cols-2">
                {fukuiiRequirements.map((req) => (
                  <div
                    key={req.item}
                    className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-4"
                  >
                    <dt className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                      {req.item}
                    </dt>
                    <dd className="mt-1 text-sm font-semibold text-[var(--text-primary)]">
                      {req.requirement}
                    </dd>
                    <dd className="mt-1 text-xs leading-relaxed text-[var(--text-muted)]">
                      {req.note}
                    </dd>
                  </div>
                ))}
              </dl>
            </FadeIn>

            {/* Install */}
            <FadeIn delay={120}>
              <h3 className="mt-10 mb-2 flex items-center gap-2 text-base font-semibold">
                <Terminal size={16} aria-hidden="true" className="text-[var(--brand-green)]" />
                Install it
              </h3>
              <p className="mb-4 text-sm text-[var(--text-muted)]">
                The container image is the shortest path from nothing to a running
                node, because it bundles a Java runtime and there is no JDK to
                install first.
              </p>
              <CodeBlock>{`docker pull ghcr.io/fukuii-project/fukuii-cli:latest
docker run ghcr.io/fukuii-project/fukuii-cli:latest --version`}</CodeBlock>
              <p className="mt-4 mb-3 text-sm text-[var(--text-muted)]">
                Or install the archive build. Fukuii runs on the JVM, so one archive
                covers every platform that has a JDK rather than there being a build
                per operating system, and the checksums file published beside it is
                what verifies the distribution.
              </p>
              <CodeBlock>{`# 1. Install the current JDK LTS (25)
sudo apt update && sudo apt install -y openjdk-25-jdk    # Debian, Ubuntu
# sudo dnf install java-25-openjdk-devel                 # Fedora, RHEL

# 2. Download the distribution and verify it against the published checksums
curl -LO ${FUKUII_RELEASES}/latest/download/fukuii-<ver>.tgz
curl -LO ${FUKUII_RELEASES}/latest/download/SHA256SUMS.txt
sha256sum -c SHA256SUMS.txt --ignore-missing

# 3. Extract, put the launcher on PATH, then verify
tar -xzf fukuii-<ver>.tgz
export PATH="$PWD/fukuii-<ver>/bin:$PATH"
fukuii --version`}</CodeBlock>
            </FadeIn>

            {/* Run */}
            <FadeIn delay={160}>
              <h3 className="mt-10 mb-2 flex items-center gap-2 text-base font-semibold">
                <Terminal size={16} aria-hidden="true" className="text-[var(--brand-green)]" />
                Run it
              </h3>
              <p className="mb-4 text-sm text-[var(--text-muted)]">
                A network is selected with one flag. The same binary runs Mordor,
                and can run both at once in a single process, so adding a network is
                configuration rather than a second client to install and audit.
              </p>
              <CodeBlock>{`# Ethereum Classic mainnet, chain 61
fukuii --network=etc

# Mordor, chain 63, which activates first
fukuii --network=mordor

# Or in a container, with a named volume so state survives a restart
docker run -v fukuii-data:/var/lib/fukuii \\
  ghcr.io/fukuii-project/fukuii-cli:latest --network=etc`}</CodeBlock>
            </FadeIn>

            {/* Mining */}
            <FadeIn delay={200}>
              <h3 className="mt-10 mb-2 text-base font-semibold">If you mine</h3>
              <p className="mb-4 text-sm text-[var(--text-muted)]">
                Fukuii implements ETChash and the ECIP-1099 epoch schedule, and it
                serves the work interface mining software connects to, so it can be
                the node behind a mining operation rather than only a node beside
                one. A pool talks to it over JSON-RPC, so that surface has to be
                reachable from the pool process and the payout address has to be set
                on the node that builds the blocks.
              </p>
              <CodeBlock>{`fukuii --network=etc \\
  --miner-enabled \\
  --miner-coinbase=0xYourPayoutAddress \\
  --rpc-http-enabled \\
  --rpc-http-port=8545 \\
  --rpc-http-api=ETH,NET,WEB3`}</CodeBlock>
            </FadeIn>

            {/* Upgrade an existing node */}
            <FadeIn delay={240}>
              <h3 className="mt-10 mb-4 text-base font-semibold">
                Upgrading a node you already run
              </h3>
              <ol className="space-y-2">
                {fukuiiUpgradeSteps.map((step, i) => (
                  <li key={step} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[var(--border-brand)] font-mono text-[10px] font-bold text-[var(--brand-green)]">
                      {i + 1}
                    </span>
                    <span className="text-sm text-[var(--text-muted)]">{step}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-4 text-sm text-[var(--text-muted)]">
                There is no resync. A hard fork changes the rules a node applies from
                the activation block onward, not the chain behind it, so an upgraded
                node keeps the state it already has. Missing the block is the case
                that costs a resync, because the node follows the old rules past it
                and leaves the canonical chain.
              </p>

              <div className="mt-6 flex flex-wrap gap-4">
                <a
                  href={FUKUII_RELEASES}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-[var(--brand-green)] transition hover:opacity-80"
                >
                  Releases <ExternalLink size={12} aria-hidden="true" />
                </a>
                <a
                  href={FUKUII_DOCS}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-[var(--brand-green)] transition hover:opacity-80"
                >
                  Documentation <ExternalLink size={12} aria-hidden="true" />
                </a>
                <a
                  href={FUKUII_SECURITY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-[var(--brand-green)] transition hover:opacity-80"
                >
                  Report a vulnerability privately <ExternalLink size={12} aria-hidden="true" />
                </a>
              </div>
            </FadeIn>
          </div>
        </section>

        <SectionDivider />

        {/* 2. Core-Geth */}
        <section id="core-geth" className="scroll-mt-24 py-16 px-6">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <p className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]">
                A supported path
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight">
                Already running Core-Geth
              </h2>
              <div className="mt-4 max-w-3xl space-y-4 text-sm leading-relaxed text-[var(--text-muted)]">
                <p>
                  Core-Geth carries the Olympia parameters from{" "}
                  <EcipLink ecip="ECIP-1111" />, <EcipLink ecip="ECIP-1112" />,{" "}
                  <EcipLink ecip="ECIP-1121" /> and <EcipLink ecip="ECIP-1122" />. An
                  operator already running it does not have to change client in order
                  to take the upgrade, which is deliberate: an upgrade that forced
                  every operator to migrate at the same time would be a harder
                  upgrade to land safely.
                </p>
                <p>
                  What settles conformance is not a client&rsquo;s own account of
                  itself. Cross-client state-transition equivalence is demonstrated on
                  Mordor before a mainnet activation block is scheduled, and{" "}
                  <EcipLink ecip="ECIP-1122" /> asks for the minimum-tip check at both
                  points a transaction can enter a block, at pool admission and again
                  at block production.
                </p>
                <p>
                  It is in maintenance rather than active development, and that is a
                  real status rather than a polite word for old. The upstream
                  repository received no substantive code commit after June 2024, and
                  the 21-month gap that followed is the longest in this
                  network&rsquo;s history. Six security vulnerabilities went unpatched
                  during it, and in March 2026 mainnet bootnodes came under active
                  attack. All six are fixed, and the maintained client lives in
                  the ethereumclassic organization.
                </p>
                <p>
                  <span className="font-semibold text-[var(--text-primary)]">
                    Run the ethereumclassic build.
                  </span>{" "}
                  The original repository at etclabscore is the one that carried the
                  unpatched releases, and an operator still on one of those is running
                  a node with known remote-crash vulnerabilities in it. Rotating the
                  node key afterward is a sensible precaution on any node that has
                  been running a long time.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={80}>
              <div className="mt-8 rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-6">
                <h3 className="mb-4 text-base font-semibold">
                  Upgrading a Core-Geth node
                </h3>
                <ol className="space-y-2">
                  {coreGethUpgradeSteps.map((step, i) => (
                    <li key={step} className="flex items-start gap-3">
                      <CheckCircle2
                        size={16}
                        aria-hidden="true"
                        className="mt-0.5 shrink-0 text-[var(--brand-green)]"
                      />
                      <span className="text-sm text-[var(--text-muted)]">
                        <span className="font-mono text-xs text-[var(--text-subtle)]">
                          {i + 1}.
                        </span>{" "}
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
                <div className="mt-5 flex flex-wrap gap-4">
                  <a
                    href={CORE_GETH_RELEASES}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-[var(--brand-green)] transition hover:opacity-80"
                  >
                    Releases <ExternalLink size={12} aria-hidden="true" />
                  </a>
                  <a
                    href={SECURITY_AUDIT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-[var(--brand-green)] transition hover:opacity-80"
                  >
                    Read the security audit <ExternalLink size={12} aria-hidden="true" />
                  </a>
                  <Link
                    href="/clients/core-geth"
                    className="inline-flex items-center gap-1.5 text-sm text-[var(--brand-green)] transition hover:opacity-80"
                  >
                    Read about Core-Geth <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={120}>
              <p className="mt-6 max-w-3xl text-sm leading-relaxed text-[var(--text-muted)]">
                <span className="font-semibold text-[var(--text-primary)]">
                  New deployments should use Fukuii.
                </span>{" "}
                A single client that only one organization is positioned to maintain
                is a network-level risk, and Ethereum Classic has now watched that
                risk turn into an incident. More than one independent implementation
                is the structural answer to it.
              </p>
            </FadeIn>
          </div>
        </section>

        <SectionDivider />

        {/* 3. What changes for an operator */}
        <section id="what-changes" className="scroll-mt-24 section-alt py-16 px-6">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <EcipLink ecip="ECIP-1122" className="text-xs" />
              <h2 className="mt-1 text-2xl font-bold tracking-tight">
                What changes for an operator
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--text-muted)]">
                Three client parameters change, and all three are chain configuration
                rather than consensus rules. A client that does not implement them
                still follows the chain; it gives weaker guarantees while doing so.
                Each one codifies something the network has been relying on informally,
                which is exactly the class of property that works until it does not.
              </p>
            </FadeIn>

            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {clientParameters.map((param, i) => {
                const Icon = param.icon;
                return (
                  <FadeIn key={param.title} delay={i * 80}>
                    <div className="flex h-full flex-col rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-5">
                      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--brand-green-subtle)]">
                        <Icon size={18} aria-hidden="true" className="text-[var(--brand-green)]" />
                      </div>
                      <h3 className="text-sm font-semibold">{param.title}</h3>
                      <p className="mt-1 font-mono text-[11px] text-[var(--brand-green)]">
                        {param.constant}
                      </p>
                      <p className="mt-2 flex-1 text-xs leading-relaxed text-[var(--text-muted)]">
                        {param.description}
                      </p>
                    </div>
                  </FadeIn>
                );
              })}
            </div>

            {/* The two fee floors */}
            <FadeIn delay={240}>
              <h3 className="mt-12 mb-2 text-base font-semibold">
                Two floors, on the two halves of the gas price
              </h3>
              <p className="mb-5 max-w-3xl text-sm leading-relaxed text-[var(--text-muted)]">
                Olympia introduces two separate floors, set by two different ECIPs,
                and quoting one of them alone understates what a transaction costs.
                Ethereum Classic has no base fee at all today, because EIP-1559 is
                not active here, and its miner tip is floored at one wei by client
                default, so the one gwei people actually pay is a wallet convention
                rather than a rule the network enforces.
              </p>
              <div className="overflow-x-auto rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)]">
                <table className="w-full min-w-[36rem] text-left text-sm">
                  <thead>
                    <tr className="border-b border-[var(--border-default)]">
                      <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                        Per unit of gas
                      </th>
                      <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                        Set by
                      </th>
                      <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                        Amount
                      </th>
                      <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                        Paid to
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {feeFloors.map((floor) => (
                      <tr
                        key={floor.constant}
                        className="border-b border-[var(--border-default)] last:border-0"
                      >
                        <td className="px-4 py-3">
                          <span className="font-semibold text-[var(--text-primary)]">
                            {floor.name}
                          </span>
                          <span className="mt-0.5 block font-mono text-[11px] text-[var(--text-subtle)]">
                            {floor.constant}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-[var(--text-muted)]">{floor.setBy}</td>
                        <td className="px-4 py-3 font-mono font-semibold text-[var(--brand-green)]">
                          {floor.amount}
                        </td>
                        <td className="px-4 py-3 text-[var(--text-muted)]">{floor.paidTo}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-5">
                  <p className="text-sm font-semibold">What it costs a sender</p>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--text-muted)]">
                    A standard transfer consumes 21,000 gas, so the two-gwei floor
                    puts its minimum cost at 0.000042 ETC. What people actually pay
                    today is around one gwei by convention, which puts the same
                    transfer at 0.000021 ETC. The floor doubles a very small number.
                    Against what clients permit it is a far larger
                    multiple, and that gap is the point: it is friction at spam
                    scale and nothing at all at ordinary human scale.
                  </p>
                </div>
                <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-5">
                  <p className="text-sm font-semibold">
                    Not EIP-1559&rsquo;s initial base fee
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--text-muted)]">
                    <span className="font-mono text-[11px]">MIN_BASE_FEE</span>{" "}
                    is a permanent floor applied at every block. EIP-1559&rsquo;s{" "}
                    <span className="font-mono text-[11px]">INITIAL_BASE_FEE</span>{" "}
                    applies once, to the fork block itself. The two happen to share
                    the value of one gwei and they are distinct constants, so they
                    must not be conflated in client configuration.
                  </p>
                </div>
                <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-5">
                  <p className="text-sm font-semibold">
                    What a block producer can still do
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--text-muted)]">
                    Only{" "}
                    <span className="font-mono text-[11px]">MIN_BASE_FEE</span>{" "}
                    is a consensus rule. The tip floor is chain configuration, so
                    a producer that declines to enforce it can still include
                    cheaper transactions, and every other node has to accept and
                    store them. Two gwei is therefore what a conformant network
                    charges rather than a guarantee the protocol makes, and one
                    gwei is the floor that holds regardless.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        <SectionDivider />

        {/* 4. If you mine */}
        <section id="mining" className="scroll-mt-24 py-16 px-6">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <h2 className="text-2xl font-bold tracking-tight">
                What Olympia means if you mine
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--text-muted)]">
                The short answer is that block rewards do not change and tips still
                go to the miner in full. The longer answer is worth the paragraphs
                below, because the honest version has a nuance in it and the network
                figures are the reason the question matters at all.
              </p>
            </FadeIn>

            <FadeIn delay={80}>
              <div className="mt-8">
                <NetworkStatsStrip />
              </div>
            </FadeIn>

            <FadeIn delay={120}>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-[var(--border-brand)] bg-[var(--brand-green-subtle)] p-5">
                  <p className="text-sm font-semibold">Block rewards do not change</p>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--text-secondary)]">
                    ECIP-1017&rsquo;s emission schedule is untouched. Olympia changes
                    where a fee component goes, not ETC&rsquo;s supply or its issuance.
                  </p>
                </div>
                <div className="rounded-xl border border-[var(--border-brand)] bg-[var(--brand-green-subtle)] p-5">
                  <p className="text-sm font-semibold">Tips still go to the miner</p>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--text-secondary)]">
                    In full, and paid directly to block producers as they are today.
                    Olympia puts an enforceable floor under the tip for the first
                    time.
                  </p>
                </div>
                <div className="rounded-xl border border-[var(--border-brand)] bg-[var(--brand-green-subtle)] p-5">
                  <p className="text-sm font-semibold">
                    The base fee does not exist yet
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--text-secondary)]">
                    EIP-1559 is not active on Ethereum Classic, so nothing is being
                    burned and nothing is being discarded. Olympia creates the
                    component and sends it to the Treasury.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={160}>
              <div className="mt-8 max-w-3xl space-y-4 text-sm leading-relaxed text-[var(--text-muted)]">
                <p>
                  <span className="font-semibold text-[var(--text-primary)]">
                    The nuance, stated rather than skipped.
                  </span>{" "}
                  At the minimum gas price the miner&rsquo;s floor rises rather than
                  falls: the Treasury&rsquo;s gwei is new cost borne by the sender,
                  and the tip floor beneath the miner becomes enforceable where the
                  client default today is one wei. Above the floor it runs the other
                  way. At a fixed total gas price, one gwei per unit of gas moves
                  from the tip to the Treasury. <EcipLink ecip="ECIP-1111" />{" "}
                  puts that at a low single-digit percentage of fee income measured
                  against Ethereum Classic&rsquo;s observed fee levels, and fee income
                  is itself a fraction of a percent of total miner revenue while
                  block subsidies dominate.
                </p>
                <p>
                  <span className="font-semibold text-[var(--text-primary)]">
                    That last clause is the whole argument.
                  </span>{" "}
                  The block subsidy falls by a fifth every 5,000,000 blocks under
                  ECIP-1017, and it keeps falling. On any Proof-of-Work network, fee
                  income has to grow into the gap the subsidy leaves behind.
                  Ethereum Classic&rsquo;s fee income cannot do that yet, and the
                  figures above are why: block space is almost entirely unused, so
                  there is very little fee income to grow.
                </p>
                <p>
                  Olympia does not close that gap on its own, and nothing here claims
                  it does. What it does is put the parts in place. A fee market that
                  exists at all, rather than one deferred at Mystique pending a
                  decision on where the base fee should go. A floor under it, so it
                  cannot decay to nothing while blocks stay empty. And a funding path
                  for the development that would produce the usage that makes any of
                  this matter at all.
                </p>
                <p>
                  The security budget question gets its own answer later in the
                  roadmap, in two stages that are sequenced on purpose.{" "}
                  <EcipLink ecip="ECIP-1115" /> runs a candidate curve at the contract
                  layer, where the allocation fraction, window length and curve shape
                  are adjustable through governance and a mistake costs a proposal
                  rather than a fork. Only once a curve is demonstrated in production
                  does <EcipLink ecip="ECIP-1116" /> spend a second hard fork
                  embedding it into block finalization, after which the protocol pays
                  it directly and the payment path leaves governance entirely.
                </p>
              </div>
              <Link
                href="/overview/security-budget"
                className="mt-5 inline-flex items-center gap-1.5 text-sm text-[var(--brand-green)] transition hover:opacity-80"
              >
                What happens to miners when the subsidy runs out{" "}
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </FadeIn>
          </div>
        </section>

        <SectionDivider />

        {/* 5. What changes in the EVM */}
        <section id="evm" className="scroll-mt-24 section-alt py-16 px-6">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <h2 className="text-2xl font-bold tracking-tight">
                What Olympia changes in the EVM
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--text-muted)]">
                Two ECIPs touch the execution layer.{" "}
                <EcipLink ecip="ECIP-1111" /> activates the fee market.{" "}
                <EcipLink ecip="ECIP-1121" /> brings the rest of the execution layer
                into line with Ethereum, excluding everything that depends on
                Proof-of-Stake or on blob data availability.
              </p>
            </FadeIn>

            {/* ECIP-1111: two EIPs, and EIP-3198 is the one the site was missing */}
            <FadeIn delay={80}>
              <h3 className="mt-10 mb-4 text-base font-semibold">
                ECIP-1111 activates two EIPs
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-5">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <EipChip eip="EIP-1559" />
                    <span className="text-sm font-semibold">The fee market</span>
                  </div>
                  <p className="text-xs leading-relaxed text-[var(--text-muted)]">
                    A transaction pays a base fee the protocol sets and a tip the
                    sender chooses, with the base fee adjusting block by block to
                    demand. Ethereum burns that base fee. Ethereum Classic redirects
                    it at the consensus layer to the Treasury, credited once per
                    block as gas used multiplied by the base fee for that block.
                  </p>
                </div>
                <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-5">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <EipChip eip="EIP-3198" />
                    <span className="text-sm font-semibold">
                      The <span className="font-mono">BASEFEE</span> opcode
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-[var(--text-muted)]">
                    Opcode <span className="font-mono">0x48</span>, which gives a
                    contract access to the current block&rsquo;s base fee. It is what
                    makes fee-aware contract logic possible, and it is half of why
                    tooling that assumes EIP-1559 semantics works on Ethereum Classic
                    without ETC-specific handling.
                  </p>
                </div>
              </div>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[var(--text-muted)]">
                Both are fully additive: a new transaction type and a new opcode.
                Type-0 and Type-1 transactions, already-deployed contracts and
                historical state are all unaffected.
              </p>
            </FadeIn>

            {/* ECIP-1121 */}
            <FadeIn delay={120}>
              <h3 className="mt-12 mb-2 text-base font-semibold">
                ECIP-1121 aligns the rest of the execution layer
              </h3>
              <p className="mb-6 max-w-3xl text-sm leading-relaxed text-[var(--text-muted)]">
                Ethereum Classic implemented partial London EIPs at Mystique in 2022
                and partial Shanghai EIPs at Spiral in 2024, deliberately deferring
                the fee market so its governance could be designed separately.
                ECIP-1121 fills the Shanghai gaps Spiral left and carries the
                execution layer forward through three delivered Ethereum upgrades and
                into a fourth that has not activated yet.
              </p>

              <div className="relative mb-8">
                <div className="hidden md:block absolute top-[18px] left-9 right-9 h-px bg-[var(--border-default)]" />
                <div className="flex flex-col gap-6 md:flex-row md:justify-between">
                  {forkTimeline.map((fork, i) => (
                    <div
                      key={fork.name}
                      className="flex items-start gap-3 md:flex-1 md:flex-col md:items-center md:text-center"
                    >
                      <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-[var(--brand-green)] bg-[var(--bg-elevated)] font-mono text-xs font-bold text-[var(--brand-green)]">
                        {i + 1}
                      </div>
                      <div className="md:mt-2">
                        <p className="text-sm font-semibold">{fork.name}</p>
                        <p className="font-mono text-[10px] text-[var(--brand-green)]">
                          {fork.fullName}
                        </p>
                        <p className="text-xs text-[var(--text-muted)]">{fork.when}</p>
                        <div className="mt-1.5 flex flex-wrap gap-1 md:justify-center">
                          {fork.eips.map((eip) => (
                            <EipChip key={eip} eip={eip} />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-8 rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-5">
                <p className="text-xs leading-relaxed text-[var(--text-muted)]">
                  <span className="font-semibold text-[var(--text-primary)]">
                    Two more arrive without a fork.
                  </span>{" "}
                  eth/69 and eth/70 are peer-to-peer protocol versions rather than
                  consensus changes, and they negotiate as devp2p capabilities, so
                  they activate independently of the activation block.
                </p>
              </div>
            </FadeIn>

            {/* Glamsterdam framing */}
            <FadeIn delay={160}>
              <div className="mb-8 rounded-xl border border-[var(--border-brand)] bg-[var(--brand-green-subtle)] p-5">
                <p className="text-sm font-semibold text-[var(--text-primary)]">
                  Glamsterdam is the alignment target, not a finished one
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                  Glamsterdam is still being assembled on Ethereum, so there is no
                  settled set to align to yet. ECIP-1121 adopts the{" "}
                  {GLAMSTERDAM_ADOPTED.length} pieces of it that are ready and
                  stable: the deterministic factory contract (EIP-7997), which gives
                  Ethereum Classic the same deployment addresses as every other EVM
                  chain, and eth/70 (EIP-7975). A further{" "}
                  {CORE_DEVS_REVIEW.length} are listed for the Olympia Core Devs
                  Call, adopted by nothing and rejected by nothing until that call
                  classifies them. Three more, EIP-2780, EIP-8037 and EIP-8038, are a
                  mutually dependent gas-repricing cluster that resolves to EIP-7928,
                  which adds a field to the block header and so needs its own ECIP
                  rather than fitting inside an execution-layer-only one. EIP-7708
                  waits on EIP-4788, which is itself excluded here as Proof-of-Stake.
                  Fusaka is a delivered cycle, and its execution-layer work is in
                  this set wherever it does not depend on blobs or on Proof-of-Stake.
                </p>
              </div>
            </FadeIn>

            {/* EIP category cards */}
            <div className="mb-8 grid gap-4 sm:grid-cols-2">
              {evmCategories.map((cat, i) => {
                const Icon = cat.icon;
                return (
                  <FadeIn key={cat.title} delay={i * 60}>
                    <div className="flex h-full flex-col rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-5">
                      <div className="mb-3 flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--brand-green-subtle)]">
                          <Icon size={18} aria-hidden="true" className="text-[var(--brand-green)]" />
                        </div>
                        <h3 className="text-sm font-semibold">{cat.title}</h3>
                      </div>
                      <div className="mb-2 flex flex-wrap gap-1">
                        {cat.eips.map((eip) => (
                          <EipChip key={eip} eip={eip} />
                        ))}
                      </div>
                      <p className="text-xs leading-relaxed text-[var(--text-muted)]">
                        {cat.description}
                      </p>
                    </div>
                  </FadeIn>
                );
              })}
            </div>

            {/* Blobs excluded */}
            <FadeIn delay={200}>
              <div className="mb-8 rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-5">
                <p className="text-xs leading-relaxed text-[var(--text-muted)]">
                  <span className="font-semibold text-[var(--text-primary)]">
                    Blobs are excluded by design.
                  </span>{" "}
                  {BLOB_DEFERRED.length} EIPs that depend on blob data availability
                  are left out: {BLOB_DEFERRED.slice(0, -1).join(", ")} and{" "}
                  {BLOB_DEFERRED.at(-1)}. Ethereum introduced blobs to carry Layer 2
                  data.
                  Ethereum Classic is a Layer 1 execution chain and does not have
                  that problem, so it takes the execution-layer work without
                  inheriting the scaffolding underneath it. The Proof-of-Stake set,
                  from beacon-chain dependencies through proposer-builder separation,
                  is excluded on the same basis: not applicable rather than deferred.
                </p>
              </div>
            </FadeIn>

            {/* Developer tooling */}
            <FadeIn delay={240}>
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                Developer tooling: works without modification
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                {devTools.map((tool) => (
                  <div
                    key={tool.name}
                    className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-elevated)] p-4"
                  >
                    <p className="mb-1 text-sm font-semibold">{tool.name}</p>
                    <p className="text-xs leading-relaxed text-[var(--text-muted)]">
                      {tool.description}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Roadmap: an operator's reason to read it is that stage 5 is a second fork */}
        <RoadmapSection />

        <SectionDivider />

        {/* Where to go next */}
        <section className="py-16 px-6">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <h2 className="text-2xl font-bold tracking-tight">Where to go next</h2>
              <p className="mt-3 max-w-3xl text-sm text-[var(--text-muted)]">
                Governance tooling, treasury figures, and the repositories behind
                all of it.
              </p>
            </FadeIn>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: Vote,
                  name: "Governance App",
                  description:
                    "Proposal submission, on-chain voting, and execution tooling for network contributors",
                  href: "https://app.olympiadao.org",
                },
                {
                  icon: Landmark,
                  name: "Olympia Treasury",
                  description:
                    "Real-time treasury monitoring, funding allocation, balance, and disbursement history",
                  href: "https://olympiatreasury.org",
                },
                {
                  icon: LayoutDashboard,
                  name: "Ethereum Classic DAO",
                  description:
                    "Institutional site for the Wyoming DAO LLC, the legal entity behind Olympia governance",
                  href: "https://ethereumclassicdao.org",
                },
                {
                  icon: Github,
                  name: "GitHub",
                  description:
                    "Client implementations, governance contracts, and protocol infrastructure, all open-source",
                  href: "https://github.com/olympiadao",
                },
              ].map((p, i) => (
                <FadeIn key={p.name} delay={i * 80}>
                  <PropertyCard
                    icon={p.icon}
                    name={p.name}
                    description={p.description}
                    href={p.href}
                  />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* FAQ */}
        <section className="py-16 px-6">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <h2 className="mb-8 text-2xl font-bold tracking-tight">
                Frequently Asked Questions
              </h2>
            </FadeIn>
            <FadeIn delay={60}>
              <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] px-6">
                <Accordion items={faqItems} defaultAllOpen />
              </div>
            </FadeIn>
          </div>
        </section>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqItems.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: { "@type": "Answer", text: item.answer },
              })),
            }),
          }}
        />
      </main>
      <FooterSection />
    </>
  );
}
