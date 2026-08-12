import type { Metadata } from "next";

export type OverviewTopic = {
  /** URL segment under /overview */
  slug: string;
  /** The reader's question. Page H1 and index link text. */
  question: string;
  /** The answer in brief, for the /overview index. Plain language, no jargon first. */
  summary: string;
  /** <title>; the root layout appends the site name */
  metaTitle: string;
  /** openGraph and twitter title */
  socialTitle: string;
  /** meta description, also used for openGraph and twitter */
  description: string;
  keywords: string[];
  /** ECIPs this page answers from */
  ecips: string[];
  /** H2 headings the page carries, in order */
  sections: string[];
};

export const overviewTopics: OverviewTopic[] = [
  {
    slug: "funding",
    question: "Where the money comes from",
    summary:
      "A base fee on every transaction, set by the network and paid by whoever sends it. Ethereum destroys that fee. Olympia keeps it. Block rewards and miner tips are not touched.",
    metaTitle: "Where Olympia's Money Comes From",
    socialTitle: "Where Olympia's Money Comes From: the EIP-1559 Base Fee",
    description:
      "Ethereum Classic is adopting the EIP-1559 fee market. Ethereum burns the base fee; Olympia sends it to the Treasury instead. Block rewards and tips go to miners exactly as they do today.",
    keywords: [
      "EIP-1559",
      "base fee",
      "basefee",
      "ECIP-1111",
      "Ethereum Classic fee market",
      "who pays the base fee",
      "block rewards untouched",
      "miner tips",
      "protocol funding",
      "EIP-3198",
      "minimum gas price",
      "ECIP-1122",
    ],
    /**
     * ECIP-1122 is here because the minimum gas price is jointly defined: the
     * base fee floor is ECIP-1111's consensus rule and the tip floor is
     * ECIP-1122's chain configuration, and quoting either alone understates
     * what a transaction costs.
     */
    ecips: ["ECIP-1111", "ECIP-1122"],
    sections: [
      "What a transaction pays",
      "What changes under Olympia",
      "What miners keep",
      "How much this actually raises",
      "Where the money does not come from",
    ],
  },
  {
    slug: "treasury",
    question: "Where it goes, and who owns it",
    summary:
      "Consensus credits one permanent contract, which keeps nothing and forwards every unit to the Olympia Treasury. The Treasury holds the money and has one withdrawal path, no admin key, and no company or individual behind it.",
    metaTitle: "The Olympia Treasury: Where the Money Goes",
    socialTitle: "The Olympia Treasury: Where Base-Fee Revenue Goes, and Who Owns It",
    description:
      "Base-fee revenue is credited to the Olympia Sovereignty Vault, the one permanent contract, which forwards it to the Olympia Treasury. The Treasury has exactly one withdrawal path. No admin keys and no multisig: only on-chain governance can release funds.",
    keywords: [
      "Olympia Treasury",
      "Olympia Sovereignty Vault",
      "ECIP-1112",
      "ECIP-1113",
      "protocol treasury",
      "immutable contract",
      "no admin keys",
      "treasury balance",
      "Ethereum Classic treasury",
      "on-chain treasury",
      "timelock",
    ],
    /**
     * ECIP-1112 owns the Vault, the one permanent contract. ECIP-1113
     * §1.3 owns the Timelock that actually holds the funds and §1.4 owns the
     * permanence boundary, so this page answers from both and citing 1112
     * alone would attribute custody to the wrong specification.
     */
    ecips: ["ECIP-1112", "ECIP-1113"],
    sections: [
      "Where the money lands",
      "Exactly one contract is permanent",
      "Who owns it",
      "What the Treasury does not do",
      "Watching the balance",
    ],
  },
  {
    slug: "proposals",
    question: "Who decides how it is spent",
    summary:
      "Submission is permissionless, bounded only by a governance-set threshold. Core contributors vote, each holding one vote that cannot be bought, sold, lent or delegated. An approved payment leaves the Treasury by one route and no other, and only the Governor can trigger it.",
    metaTitle: "Who Decides How Olympia Funds Are Spent",
    socialTitle: "Who Decides How Olympia Funds Are Spent: Proposals, Voting, Execution",
    description:
      "An Olympia Funding Proposal is submitted permissionlessly, subject only to the Governor's proposal threshold. Core contributors holding a soulbound CoreNFT vote on it, and an approved proposal is queued and then executed against the Olympia Treasury by the Governor, which is the only account that can execute at all.",
    keywords: [
      "Olympia Funding Proposal",
      "OFP",
      "ECIP-1113",
      "ECIP-1114",
      "CoreNFT",
      "soulbound token",
      "on-chain voting",
      "OpenZeppelin Governor",
      "timelock",
      "retrospective funding",
      "core contributors",
      "Olympia Improvement Proposal",
      "OIP",
      "proposal threshold",
      "quorum",
    ],
    ecips: ["ECIP-1113", "ECIP-1114"],
    sections: [
      "Who can propose",
      "Who votes",
      "How a proposal becomes a payment",
      "Funding work that is already done",
      "What a vote cannot change",
    ],
  },
  {
    slug: "prediction-markets",
    question: "What stops it being captured",
    summary:
      "Open markets price Ethereum Classic under a proposal accepted against the same proposal rejected. A position pays in proportion to being right, so the price carries information a poll cannot. Olympia DAO decides whether and how much to seed a season, and the market then settles the allocation independently.",
    metaTitle: "What Stops Olympia Being Captured",
    socialTitle: "What Stops Olympia Being Captured: Prediction Markets and Streamed Payments",
    description:
      "Open prediction markets price Ethereum Classic under a proposal accepted against rejected. Olympia DAO votes on whether, how much and within what scope to seed a season, and once seeded the market settles who is funded out of it.",
    keywords: [
      "futarchy",
      "prediction markets",
      "ECIP-1117",
      "ECIP-1118",
      "conditional markets",
      "Classic USD",
      "governance capture",
      "streaming disbursement",
      "milestone funding",
      "Affiliated DAO",
      "time-weighted average price",
      "market depth",
    ],
    ecips: ["ECIP-1117", "ECIP-1118"],
    /**
     * The outline carries a fourth section the brief did not ask for. ECIP-1117
     * §"Which Decisions Warrant a Market" bounds the mechanism twice, and
     * §"Price Manipulation" calls market depth "the security parameter of this
     * mechanism" while §"Minimum Depth" states that the floor it enforces binds
     * at promotion and not for a market's lifetime. "What stops it being
     * captured" is not answered without saying when the mechanism produces a
     * signal at all, so the bounds get a heading rather than a footnote.
     */
    sections: [
      "Why a second track",
      "How a market prices a proposal",
      "What a market result does, and what it does not",
      "Which decisions are worth a market",
      "Paying against delivery",
    ],
  },
  {
    slug: "eligibility",
    question: "Who cannot receive it",
    summary:
      "Treasury money cannot reach a sanctioned address. The binding check runs inside the Governor at the moment of execution, and because no other account is able to release Treasury funds, there is no route around it.",
    metaTitle: "Who Cannot Receive Olympia Treasury Funds",
    socialTitle: "Who Cannot Receive Olympia Treasury Funds: the Check That Binds",
    description:
      "ECIP-1119 names four sanctions checkpoints and only one of them covers the Treasury path: the Governor screens every externally-directed target before the Olympia Treasury pays, and no other account can release funds. The proposal-registry screen is advisory, and the other two bind inside the contracts that take custody afterward.",
    keywords: [
      "sanctions oracle",
      "ECIP-1119",
      "OFAC SDN",
      "sanctions compliance",
      "treasury compliance",
      "Olympia Governor",
      "fails closed",
      "Ethereum Classic compliance",
      "EIP-7702",
      "onward custody",
    ],
    ecips: ["ECIP-1119"],
    /**
     * The outline deliberately gives the oracle's own administration a section
     * of its own. ECIP-1119 §"Oracle List Management" calls it "the one
     * centralization the rest of this ECIP cannot mitigate", and a page that
     * states the guarantee without stating who maintains the list the guarantee
     * consults has described half the control.
     */
    sections: [
      "Why the check exists",
      "The check that binds",
      "The other screens, and what they are worth",
      "Who keeps the list",
      "What the check does not reach",
    ],
  },
  {
    slug: "security-budget",
    question: "What happens to miners when the subsidy runs out",
    summary:
      "Ethereum Classic's block subsidy shrinks on a fixed schedule, so something has to replace it. Olympia does not guess what: it runs a candidate where a mistake costs a proposal, and hardens only what production has demonstrated.",
    metaTitle: "The Security Budget: When the Block Subsidy Runs Out",
    socialTitle:
      "Ethereum Classic's Security Budget: What Happens When the Block Subsidy Runs Out",
    description:
      "Ethereum Classic's block subsidy shrinks on a fixed schedule under ECIP-1017. ECIP-1115 tests a base-fee allocation to miners that governance can adjust, and ECIP-1116 embeds a demonstrated curve into block finalization.",
    keywords: [
      "security budget",
      "ECIP-1017",
      "block reward reduction",
      "ECIP-1115",
      "ECIP-1116",
      "L-curve",
      "miner revenue",
      "Proof-of-Work security",
      "fee market",
      "ETC mining",
      "block subsidy",
      "emission schedule",
    ],
    /**
     * ECIP-1017 is cited alongside the two Olympia specs because the first
     * section answers from it directly: the schedule, the era length, the
     * one-fifth reduction and the current era are ECIP-1017's own, and
     * ECIP-1115 §Motivation quotes them rather than defining them. A reader who
     * wants the schedule itself should reach the specification that sets it.
     */
    ecips: ["ECIP-1017", "ECIP-1115", "ECIP-1116"],
    sections: [
      "Why the subsidy shrinks",
      "What does not change",
      "Step one: a curve governance can adjust",
      "Step two: a curve the protocol enforces",
      "What has to happen first",
    ],
  },
  {
    slug: "what-ships",
    question: "What ships at the fork",
    summary:
      "The execution layer catches up with Ethereum's, leaving out Proof-of-Stake and blob data. Three network settings that every Olympia client is required to enforce identically come with it.",
    metaTitle: "What Ships at the Olympia Hard Fork",
    socialTitle: "What Ships at the Olympia Hard Fork: EVM Alignment and Network Settings",
    description:
      "ECIP-1121 carries the Ethereum Classic execution layer through Dencun, Pectra and Fusaka and into Glamsterdam. ECIP-1122 sets three network parameters every Olympia client enforces.",
    keywords: [
      "ECIP-1121",
      "ECIP-1122",
      "Glamsterdam",
      "Fusaka",
      "Pectra",
      "Dencun",
      "EVM alignment",
      "hard fork",
      "minimum miner tip",
      "gas target",
      "MESS",
      "ECIP-1100",
    ],
    ecips: ["ECIP-1121", "ECIP-1122"],
    /**
     * The second heading gained "must" at ECIPs `7902fac`, which rewrote
     * ECIP-1122 §"Implementation & Reference Clients" to open on "no client
     * implements this ECIP in full, and the parameters that are implemented
     * predate it". A heading reading "every client enforces" states a
     * conformance status; the specification states a requirement, and only the
     * requirement is durable. This is `AGENTS.md`'s "state the bound as a
     * condition, not as a deployment status" applied to an H2.
     */
    sections: [
      "The execution-layer alignment",
      "Three settings every client must enforce",
      "What is deliberately not included",
      "Where this sits in the five stages",
    ],
  },
];

export function overviewTopic(slug: string): OverviewTopic {
  const topic = overviewTopics.find((entry) => entry.slug === slug);
  if (!topic) {
    throw new Error(`Unknown overview topic: ${slug}`);
  }
  return topic;
}

/**
 * The nth H2 a topic page carries, by position in `sections`.
 *
 * Throws rather than returning undefined, which `noUncheckedIndexedAccess`
 * would otherwise let a page render as an empty heading. A written page reads
 * its headings from here by index, so removing one from `sections` without
 * removing the section that renders it should fail the build loudly, not ship a
 * page whose outline and body have quietly diverged.
 */
export function topicSection(topic: OverviewTopic, index: number): string {
  const heading = topic.sections[index];
  if (heading === undefined) {
    throw new Error(
      `Overview topic "${topic.slug}" has no section at index ${index}; it carries ${topic.sections.length}.`
    );
  }
  return heading;
}

/** Public ECIP permalink, e.g. ECIP-1111 -> ecips.ethereumclassic.org/ECIPs/ecip-1111 */
export function ecipUrl(id: string): string {
  return `https://ecips.ethereumclassic.org/ECIPs/${id.toLowerCase()}`;
}

/** Stable anchor for a section heading */
export function sectionId(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function overviewTopicMetadata(slug: string): Metadata {
  const topic = overviewTopic(slug);
  const url = `/overview/${topic.slug}`;
  return {
    title: topic.metaTitle,
    description: topic.description,
    keywords: topic.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      siteName: "OlympiaDAO",
      title: topic.socialTitle,
      description: topic.description,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "OlympiaDAO" }],
    },
    twitter: {
      card: "summary_large_image",
      title: topic.socialTitle,
      description: topic.description,
      images: ["/og-image.png"],
    },
  };
}
