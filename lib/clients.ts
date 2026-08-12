import type { Metadata } from "next";

/**
 * Single source for the client pages: `/clients` and `/clients/<slug>`.
 *
 * Content is sourced from each client's own project rather than paraphrased.
 * Fukuii's facts come from `fukuii-project/fukuii-org` (`src/data/site.ts`,
 * `src/content/*.json`, and the homepage sections); Core-Geth's maintenance
 * history comes from the security audit published on ethereumclassic.com,
 * which `SECURITY_AUDIT_URL` below links.
 */

/** Drives the badge only. Green is ETC-native, gray is maintenance and neutral. */
export type ClientRole = "primary" | "maintenance";

export type ClientLink = { label: string; href: string };

export type ClientFact = { label: string; value: string };

export type ClientListItem = {
  term: string;
  detail: string;
  /** Render the term in the mono face. For flags, commands and coordinates. */
  mono?: boolean;
};

export type ClientSection = {
  heading: string;
  paragraphs: string[];
  list?: ClientListItem[];
  link?: ClientLink;
};

export type EtcClient = {
  /** URL segment under /clients */
  slug: string;
  name: string;
  /** Implementation language, shown as a chip. Palette tokens only, no language hex. */
  language: string;
  role: ClientRole;
  roleLabel: string;
  /** One plain-language line. Index card and page hero. */
  summary: string;
  /** The longer index-card body. */
  cardDescription: string;
  /** Three points the index card carries under the description. */
  cardPoints: string[];
  metaTitle: string;
  socialTitle: string;
  description: string;
  keywords: string[];
  facts: ClientFact[];
  links: ClientLink[];
  sections: ClientSection[];
};

/**
 * The Core-Geth maintenance record, published on ethereumclassic.com. Linked
 * rather than restated so the framing is explicit instead of implied, and so a
 * reader can check the CVE list and the timeline at the source.
 */
export const SECURITY_AUDIT_URL =
  "https://ethereumclassic.com/build/clients/core-geth-security-audit";

/**
 * Each client's canonical home, and the channel its own project publishes.
 *
 * These name the repository a reader is meant to arrive at, not whichever
 * working fork a change happens to be staged on while it is written. A
 * development coordinate is true of a moment; this site is written from the
 * completed state, so a transient one does not belong in copy that outlives it.
 *
 * `fukuii-org` derives its own `SECURITY_URL` from `FUKUII_REPO` and forbids
 * pointing a security report at the issue tracker, so that channel is the
 * project's to set and is never redirected from here.
 */
export const FUKUII_REPO = "https://github.com/fukuii-project/fukuii-cli";
export const CORE_GETH_REPO = "https://github.com/ethereumclassic/core-geth";

export const etcClients: EtcClient[] = [
  {
    slug: "fukuii",
    name: "Fukuii",
    language: "Scala",
    role: "primary",
    roleLabel: "Primary",
    summary:
      "Ethereum Classic's first native client, built for this network from the start rather than adapted from an existing Ethereum client.",
    cardDescription:
      "An EVM execution client written in Scala 3 and running on the JVM. One binary runs several networks at once in a single process, each with its own state, its own metrics and its own configuration, so a further network is configuration rather than a new client. Consensus is chosen per deployment: native Proof-of-Work for Ethereum Classic and Mordor, or Proof-of-Stake with a built-in consensus layer or an external consensus client driving it over the Engine API.",
    cardPoints: [
      "Built ground-up for Ethereum Classic, not derived from an Ethereum client",
      "Runs Ethereum Classic and Mordor from the same binary as any other configured network",
      "Apache 2.0, developed in public, with signed builds and a bill of materials on every release",
    ],
    metaTitle: "Fukuii: Ethereum Classic's First Native Client",
    socialTitle: "Fukuii: Ethereum Classic's First Native Client",
    description:
      "Fukuii is an EVM execution client in Scala 3 on the JVM, and Ethereum Classic's first native client. One binary runs several networks at once, and consensus is selected per deployment. Apache 2.0, maintained by The Fukuii Authors.",
    keywords: [
      "Fukuii",
      "Fukuii client",
      "Ethereum Classic native client",
      "Scala blockchain client",
      "Scala 3 EVM client",
      "JVM Ethereum client",
      "ETC node software",
      "Pekko",
      "ETChash",
      "Engine API",
      "SNAP sync",
      "MCP server",
      "The Fukuii Authors",
    ],
    facts: [
      { label: "Role", value: "Primary client for the Olympia era" },
      { label: "Language", value: "Scala 3 LTS on the JVM" },
      { label: "License", value: "Apache 2.0" },
      { label: "Maintainer", value: "The Fukuii Authors" },
    ],
    links: [
      { label: "fukuii.org", href: "https://fukuii.org" },
      { label: "Documentation", href: "https://docs.fukuii.org" },
      { label: "Source", href: FUKUII_REPO },
      { label: "Releases", href: `${FUKUII_REPO}/releases` },
    ],
    sections: [
      {
        heading: "What Fukuii is",
        paragraphs: [
          "Fukuii is an execution client. It holds a copy of the chain, checks every block against the rules, keeps the account state that results, and answers questions about it over a public interface. That is the job every node on the network is there to do.",
          "What makes it unusual for Ethereum Classic is where it came from. Every client this network has run until now began life as an Ethereum client and had Ethereum Classic support added to it afterward. Fukuii was written for Ethereum Classic from the start, which is why it is described as the first client native to this network.",
          "It is written in Scala 3 and runs on the Java Virtual Machine. That choice is not incidental: the language's type system makes a class of consensus mistake impossible to write down, so it is caught when the code is compiled rather than when a block is processed.",
        ],
      },
      {
        heading: "One binary, several networks",
        paragraphs: [
          "Fukuii can run more than one network at the same time, inside one process. Each network keeps its own state, its own metrics and its own configuration, and each is supervised on its own, so a failure in one of them does not take the others down with it.",
          "The practical result is that adding a network is configuration rather than a new client to install, learn and audit. For an operator that means fewer machines to run and one supply chain to check.",
        ],
        list: [
          { term: "Ethereum Classic", detail: "chain 61, Proof-of-Work, the network Olympia upgrades" },
          { term: "Mordor", detail: "chain 63, the Ethereum Classic test network, which activates first" },
          { term: "Ethereum mainnet", detail: "chain 1, Proof-of-Stake, from the same binary" },
          { term: "Sepolia", detail: "chain 11155111, the Ethereum test network" },
        ],
      },
      {
        heading: "How it reaches agreement",
        paragraphs: [
          "Consensus is selected per deployment and sits behind a single interface, so the rest of the client does not change when that choice changes.",
          "On Ethereum Classic and Mordor that is native Proof-of-Work. Fukuii implements ETChash and the ECIP-1099 epoch schedule, and it serves the work interface that mining software connects to, so it can be the node behind a mining operation rather than only a node beside one.",
          "On Proof-of-Stake networks it can run a consensus layer inside the same process, which makes a node one thing to deploy instead of two. That is an option rather than a requirement: the Engine API is implemented either way, so an external consensus client can drive Fukuii instead.",
        ],
      },
      {
        heading: "What it exposes to the outside",
        paragraphs: [
          "The interfaces an operator actually integrates against are in the binary rather than in a sidecar.",
        ],
        list: [
          { term: "JSON-RPC and GraphQL", detail: "the standard query surface, plus a typed alternative to it" },
          { term: "SNAP, full and archive", detail: "state sync modes, so a node can be brought up fast or kept complete" },
          { term: "Prometheus and Grafana", detail: "metrics, dashboards, and liveness and readiness endpoints" },
          {
            term: "An MCP server",
            detail:
              "node state, sync progress, peer counts and block data offered as structured tools to any Model Context Protocol agent",
          },
        ],
      },
      {
        heading: "Who maintains it, and how",
        paragraphs: [
          "Fukuii is maintained by The Fukuii Authors, an organization whose members are Chippr Robotics LLC and White B0x Inc. The authors maintain the repository, review what lands in it, and publish the releases. There is no foundation or steering body sitting between the code and the people who are accountable for what it does.",
          "Development happens in the open on GitHub. Changes arrive as pull requests and ship in tagged releases, and each release carries a build signature and a software bill of materials, so a running binary can be traced back to the commit and the build that produced it. The license is Apache 2.0, which permits commercial use, modification and redistribution, and carries a patent grant from the contributors.",
          "The authors' work extends past the client itself: they include a credited contributor to the EEA Enterprise Ethereum Client Specification, the document that sets out implementation requirements for Enterprise Ethereum clients. That is a contribution to the specification, and it is not a conformance claim about Fukuii itself.",
        ],
        link: {
          label: "Report a vulnerability privately",
          href: `${FUKUII_REPO}/security/advisories/new`,
        },
      },
      {
        heading: "What running it needs",
        paragraphs: [
          "Fukuii is distributed for Windows, macOS and Linux, and as a container image. The container bundles a Java runtime, so it is the shortest path from nothing to a running node.",
          "Instructions for upgrading an existing node through the Olympia hard fork, including which release to take and when, live on the upgrade page.",
        ],
        list: [
          { term: "docker pull ghcr.io/fukuii-project/fukuii-cli:latest", detail: "the published container image", mono: true },
          { term: "--network=etc", detail: "run Ethereum Classic mainnet", mono: true },
          { term: "--network=mordor", detail: "run the Mordor test network", mono: true },
          {
            term: "Current JDK LTS (25)",
            detail: "required for the platform distributions; the container image bundles one",
          },
        ],
        link: { label: "How to upgrade a node", href: "/upgrade" },
      },
    ],
  },
  {
    slug: "core-geth",
    name: "Core-Geth",
    language: "Go",
    role: "maintenance",
    roleLabel: "Maintenance",
    summary:
      "The client Ethereum Classic has run for years. It is a go-ethereum derivative, and it is now kept working rather than actively developed.",
    cardDescription:
      "A go-ethereum derivative maintained for Ethereum Classic. It carries the Olympia parameters, so an operator already running it has a path through the upgrade without changing client. It is in maintenance rather than active development, and new deployments should use Fukuii.",
    cardPoints: [
      "A derivative of Ethereum's go-ethereum, not a native Ethereum Classic client",
      "A path through Olympia for operators already running it",
      "Maintained in the ethereumclassic organization, after a documented gap",
    ],
    metaTitle: "Core-Geth: Ethereum Classic's Maintained Go Client",
    socialTitle: "Core-Geth: a go-ethereum Derivative in Maintenance",
    description:
      "Core-Geth is a go-ethereum derivative maintained for Ethereum Classic. It carries the Olympia parameters and takes existing operators through the upgrade, but it is in maintenance: new deployments should use Fukuii.",
    keywords: [
      "Core-Geth",
      "core-geth ETC",
      "go-ethereum derivative",
      "Ethereum Classic Go client",
      "ETC node",
      "core-geth security audit",
      "core-geth CVE",
      "ethereumclassic core-geth",
      "etclabscore core-geth",
      "ETC client maintenance",
    ],
    facts: [
      { label: "Role", value: "Maintained through the upgrade" },
      { label: "Language", value: "Go" },
      { label: "Derived from", value: "go-ethereum" },
      { label: "Repository", value: "ethereumclassic/core-geth" },
    ],
    links: [
      { label: "Source", href: CORE_GETH_REPO },
      { label: "Releases", href: `${CORE_GETH_REPO}/releases` },
      { label: "Security audit", href: SECURITY_AUDIT_URL },
    ],
    sections: [
      {
        heading: "What Core-Geth is",
        paragraphs: [
          "Core-Geth is a derivative of go-ethereum, the most widely deployed Ethereum client. It takes that codebase and adds the chain rules Ethereum Classic needs. Most Ethereum Classic infrastructure running today runs Core-Geth, and for years it has been the network's default answer to the question of what a node should run.",
          "Being a derivative is the whole of both its strength and its limit. It inherits a large body of tested Ethereum work for free, and it inherits that work's assumptions, its dependencies and its release pace along with them, whether or not those suit this network.",
        ],
      },
      {
        heading: "Where it stands for Olympia",
        paragraphs: [
          "Core-Geth carries the Olympia parameters: the base-fee floor, the credit at block finalization, the destination address, the era gas targets and the MESS re-activation block.",
          "Carrying the parameters is not the same as conforming to the specification, and ECIP-1122 is precise about the difference. It asks for the minimum-tip check at both points a transaction can enter a block, at pool admission and again at block production, and it asks for the era gas target to override rather than defer to an operator's own configuration.",
          "What settles conformance is not a client's own account of itself. Cross-client state-transition equivalence is demonstrated on Mordor before a mainnet activation block is scheduled, which is the point at which a claim about any client stops being an assertion.",
          "An operator already running Core-Geth does not have to change client in order to take the upgrade. That is deliberate: an upgrade is harder to land safely if it forces every operator on the network to migrate simultaneously.",
        ],
      },
      {
        heading: "Why it is described as maintenance",
        paragraphs: [
          "Maintenance is a real status here rather than a polite word for old. The upstream repository at etclabscore received no substantive code commit after June 2024, and the gap that followed ran 21 months, which is the longest in this network's history.",
          "During it, six security vulnerabilities went unpatched. Two of them let a remote attacker crash a node, and one of those needs no authentication at all: a single crafted message during the opening handshake is enough. A third lets any connected peer exhaust a node's processor. The remaining three weaken the cryptography the peer-to-peer layer depends on, and one of those can leak bits of a node's own private key.",
          "In March 2026 the gap stopped being theoretical. Ethereum Classic mainnet bootnodes came under active attack, and an emergency release followed within hours of the pull request that carried it.",
          "All six are fixed. The client lives in the ethereumclassic organization, the patches were published there, and the Go toolchain it builds on was brought back to a supported version at the same time. The audit below lists each vulnerability, the commit that closed it, and the timeline of the signals that were available beforehand.",
        ],
        link: { label: "Read the Core-Geth security audit", href: SECURITY_AUDIT_URL },
      },
      {
        heading: "Which repository to run",
        paragraphs: [
          "There are two Core-Geth repositories and the difference matters. The original at etclabscore is the one that carried the unpatched releases. The maintained client is at ethereumclassic, which is where the security work was published, and the distinction matters operationally.",
          "Run the ethereumclassic build. An operator on an older etclabscore release is running a node with known remote-crash vulnerabilities in it, and rotating the node key afterward is a sensible precaution on any node that has been running for a long time.",
          "Take a release that carries the Olympia changes. ECIP-1111 and ECIP-1121 are consensus changes, so a node without them leaves the canonical chain at the activation block instead of merely running in non-conformance.",
        ],
        list: [
          { term: "github.com/ethereumclassic/core-geth", detail: "the maintained client, and the one to run", mono: true },
          { term: "github.com/etclabscore/core-geth", detail: "the original repository, superseded", mono: true },
        ],
      },
      {
        heading: "What to run for something new",
        paragraphs: [
          "Use Fukuii. Core-Geth exists in the Olympia era to carry the operators who are already on it, not to be the choice for a node that does not exist yet.",
          "The reason is the one this page has just described. A single client that only one organization is positioned to maintain is a network-level risk, and Ethereum Classic has now watched that risk turn into an incident. More than one independent implementation is the structural answer to it.",
        ],
        link: { label: "Read about Fukuii", href: "/clients/fukuii" },
      },
    ],
  },
];

/**
 * Planned ETC support for upstream Ethereum clients. A plugin is future work in
 * every case: nothing here ships today, and nothing here is a client of its own.
 *
 * `tracked` is a separate axis and must not be collapsed into the plugin one.
 * ECIP-1111 lists Besu and Nethermind as Olympia implementations, and ECIP-1122
 * §"Implementation & Reference Clients" says describing them as upstream
 * references *not tracked here* "was therefore inaccurate". An implementation of
 * the client is not the plugin described below, so both facts hold at once and
 * the page has to state them apart.
 */
export type ExecutionPlugin = {
  name: string;
  language: string;
  upstreamUrl: string;
  description: string;
  /**
   * The specifications track this client as an Olympia implementation. Optional,
   * and absent means untracked rather than false, which is the honest default:
   * the specs name the two that are tracked and leave the rest as future work.
   */
  tracked?: boolean;
};

export const executionPlugins: ExecutionPlugin[] = [
  {
    name: "Besu",
    language: "Java",
    upstreamUrl: "https://github.com/besu-eth/besu",
    description: "Adds Ethereum Classic support to Besu, an enterprise-grade Java client.",
    tracked: true,
  },
  {
    name: "Erigon",
    language: "Go",
    upstreamUrl: "https://github.com/erigontech/erigon",
    description: "Adds Ethereum Classic support to Erigon, a storage-optimized archival client.",
  },
  {
    name: "Ethrex",
    language: "Rust",
    upstreamUrl: "https://github.com/lambdaclass/ethrex",
    description: "Adds Ethereum Classic support to Ethrex, a minimalist Rust client.",
  },
  {
    name: "Go-Ethereum",
    language: "Go",
    upstreamUrl: "https://github.com/ethereum/go-ethereum",
    description: "Adds Ethereum Classic support to Go-Ethereum, the most widely deployed EVM client.",
  },
  {
    name: "Nethermind",
    language: "C#",
    upstreamUrl: "https://github.com/NethermindEth/nethermind",
    description: "Adds Ethereum Classic support to Nethermind, a high-performance .NET client.",
    tracked: true,
  },
  {
    name: "Reth",
    language: "Rust",
    upstreamUrl: "https://github.com/paradigmxyz/reth",
    description: "Adds Ethereum Classic support to Reth, a modular Rust client built for throughput.",
  },
];

export function etcClient(slug: string): EtcClient {
  const client = etcClients.find((entry) => entry.slug === slug);
  if (!client) {
    throw new Error(`Unknown client: ${slug}`);
  }
  return client;
}

/** Stable anchor for a section heading */
export function clientSectionId(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function clientMetadata(slug: string): Metadata {
  const client = etcClient(slug);
  const url = `/clients/${client.slug}`;
  return {
    title: client.metaTitle,
    description: client.description,
    keywords: client.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      siteName: "OlympiaDAO",
      title: client.socialTitle,
      description: client.description,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "OlympiaDAO" }],
    },
    twitter: {
      card: "summary_large_image",
      title: client.socialTitle,
      description: client.description,
      images: ["/og-image.png"],
    },
  };
}
