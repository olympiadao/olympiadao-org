/**
 * ECIP-1121's EIP inventory and ECIP-1122's three client parameters.
 *
 * Read from the specifications at ECIPs `local-edits` @ `db669af`.
 *
 * **This file exists because two pages state counts derived from the same
 * inventory.** `/upgrade` answers what an operator does about the upgrade and
 * renders the per-fork and per-category tables; `/overview/what-ships` answers
 * what changes and why that set, and states how many of each kind there are.
 * A count typed on two pages drifts, and the drift is invisible because each
 * page is internally consistent. Every count on either page is derived from an
 * array here, so adding or removing an EIP moves both.
 *
 * **Neither page may restate the other's tables.** `/overview/*` explains and
 * the top-level pages are where a reader acts, which is the division Thread 1
 * set for the whole site.
 *
 * The group headings are ECIP-1121 §Specification's own, and the membership of
 * each is copied from its tables rather than sorted by topic. Ethereum-upgrade
 * attribution is NOT in that specification: ECIP-1121 groups by function and
 * never names an Ethereum hard fork, so `FORK_TIMELINE` below is the site's own
 * claim, checked against the hardfork meta EIPs (EIP-7569 Dencun, EIP-7600
 * Pectra, EIP-7607 Fusaka, EIP-7773 Glamsterdam) rather than read out of the
 * ECIP.
 */

export type EipGroup = {
  /** Stable key a page uses to attach its own icon and description */
  key: string;
  /** ECIP-1121 §Specification's own heading for the group */
  specHeading: string;
  /** Short label for a card or a chip row */
  label: string;
  eips: string[];
};

/**
 * The execution-layer EIPs ECIP-1121 adopts, in its four functional groups.
 *
 * Every one satisfies the three constraints ECIP-1121 §Specification states:
 * not activated in Spiral or Mystique, execution-layer only, and compatible
 * with Proof-of-Work block production.
 */
export const EXECUTION_EIP_GROUPS: EipGroup[] = [
  {
    key: "gas",
    specHeading: "Gas Accounting and State Access",
    label: "Gas and state access",
    eips: ["EIP-7623", "EIP-7702", "EIP-7823", "EIP-7825", "EIP-7883", "EIP-7935"],
  },
  {
    key: "safety",
    specHeading: "EVM Safety and Forward Compatibility",
    label: "EVM safety",
    eips: ["EIP-6780", "EIP-7910", "EIP-7934", "EIP-7997"],
  },
  {
    key: "crypto",
    specHeading: "Cryptographic and Precompile Enhancements",
    label: "Cryptographic precompiles",
    eips: ["EIP-2537", "EIP-7951"],
  },
  {
    key: "context",
    specHeading: "Execution Context Optimizations",
    label: "Execution context",
    eips: ["EIP-1153", "EIP-2935", "EIP-5656", "EIP-7939"],
  },
];

/**
 * ECIP-1121 §"Networking Protocol Specifications".
 *
 * Held apart from the four groups above because these are the only two entries
 * that do not need the hard fork at all: devp2p negotiates a capability, so
 * they activate independently of the activation block. A page that folds them
 * into the execution-layer count loses that distinction.
 */
export const NETWORKING_PROTOCOLS = [
  { label: "eth/69", eip: "EIP-7642" },
  { label: "eth/70", eip: "EIP-7975" },
];

/** Derived, never typed: the number of execution-layer EIPs ECIP-1121 adopts. */
export const EXECUTION_EIP_COUNT = EXECUTION_EIP_GROUPS.reduce(
  (total, group) => total + group.eips.length,
  0
);

/**
 * Which Ethereum upgrade each adopted execution-layer EIP comes from.
 *
 * The site's own attribution, not ECIP-1121's: verified against the hardfork
 * meta EIPs and the activation dates on ethereum.org/history. Covers exactly
 * the EIPs in `EXECUTION_EIP_GROUPS`, which `assertEipInventoryIsConsistent`
 * below checks rather than trusts. The two networking protocol versions are
 * absent by design, because they do not arrive at a fork.
 */
export const FORK_TIMELINE = [
  {
    name: "Dencun",
    fullName: "Cancun-Deneb",
    when: "Delivered 2024",
    eips: ["EIP-1153", "EIP-5656", "EIP-6780"],
  },
  {
    name: "Pectra",
    fullName: "Prague-Electra",
    when: "Delivered 2025",
    eips: ["EIP-2537", "EIP-2935", "EIP-7623", "EIP-7702"],
  },
  {
    name: "Fusaka",
    fullName: "Fulu-Osaka",
    when: "Delivered 2025",
    eips: [
      "EIP-7823",
      "EIP-7825",
      "EIP-7883",
      "EIP-7910",
      "EIP-7934",
      "EIP-7935",
      "EIP-7939",
      "EIP-7951",
    ],
  },
  {
    name: "Glamsterdam",
    fullName: "Gloas-Amsterdam",
    when: "In assembly on Ethereum",
    eips: ["EIP-7997"],
  },
];

/**
 * ECIP-1121 §"Blocked by Dependency". Tracked, not rejected: each satisfies the
 * ECIP's own execution-layer and PoW-compatibility criteria, and each is gated
 * on resolving a dependency rather than on a judgment about the EIP.
 *
 * EIP-7708's blocker is EIP-4788, which is itself one of the Proof-of-Stake
 * exclusions. **That is not the same as EIP-7708 being excluded on
 * Proof-of-Stake grounds**, and the site has carried that error once already.
 */
export const BLOCKED_BY_DEPENDENCY = [
  { eip: "EIP-2780", blocker: "EIP-7928" },
  { eip: "EIP-8037", blocker: "EIP-7928" },
  { eip: "EIP-8038", blocker: "EIP-7928" },
  { eip: "EIP-8159", blocker: "EIP-7928" },
  { eip: "EIP-8189", blocker: "EIP-7928" },
  { eip: "EIP-7708", blocker: "EIP-4788" },
];

/**
 * ECIP-1121 §"Deferred and Excluded EIPs", the blob-dependent set.
 *
 * **EIP-4788 is deliberately absent here even though the specification lists
 * it.** It appears in that sentence AND in the Proof-of-Stake exclusion, and it
 * is carried in `PROOF_OF_STAKE_EXCLUDED` only, so a total taken across the two
 * sets does not count it twice.
 */
export const BLOB_DEFERRED = [
  "EIP-4844",
  "EIP-7516",
  "EIP-7594",
  "EIP-7691",
  "EIP-7840",
  "EIP-7892",
  "EIP-7918",
  "EIP-8070",
  "EIP-8136",
];

/** ECIP-1121 §"Deferred and Excluded EIPs", excluded as Proof-of-Stake. */
export const PROOF_OF_STAKE_EXCLUDED = [
  "EIP-4788",
  "EIP-7044",
  "EIP-7045",
  "EIP-7514",
  "EIP-7251",
  "EIP-7002",
  "EIP-7685",
  "EIP-6110",
  "EIP-7549",
  "EIP-7917",
  "EIP-7732",
  "EIP-8045",
  "EIP-8061",
  "EIP-7843",
  "EIP-7688",
  "EIP-8282",
];

/**
 * ECIP-1121 §"Deferred and Excluded EIPs", excluded as fee-market governance
 * because it is defined elsewhere in the suite.
 *
 * **EIP-3198 is on this list, so it belongs to ECIP-1111 and not to
 * ECIP-1121.** Putting it in an ECIP-1121 table would be a new error rather
 * than a fix, and `t35-verify.py` asserts both directions.
 */
export const FEE_MARKET_EXCLUDED = ["EIP-1559", "EIP-3198"];

/**
 * ECIP-1121 §"Proposed for Olympia Core Devs Review". Each is execution-layer,
 * PoW-compatible and scheduled for inclusion in Glamsterdam. **None is adopted
 * by the ECIP and none is rejected by it**; classification is for the Olympia
 * Core Devs Call.
 */
export const CORE_DEVS_REVIEW = [
  "EIP-7610",
  "EIP-7976",
  "EIP-7981",
  "EIP-8246",
  "EIP-7778",
  "EIP-7954",
  "EIP-8024",
];

/**
 * The Glamsterdam-era EIPs ECIP-1121 adopts.
 *
 * **Stated as a numerator with no denominator, deliberately.** The site carried
 * "two of Glamsterdam's seven execution-layer EIPs" until 2026-08-11, and that
 * denominator is false: ECIP-1121 alone names thirteen Glamsterdam-era
 * execution-layer EIPs across four sections, so seven is neither the size of
 * Glamsterdam's set nor the size of anything in the ECIP. The sentence also
 * promised five and enumerated four. Say what is adopted and what each of the
 * other groups is; do not quote a total for an Ethereum upgrade that is still
 * being assembled.
 */
export const GLAMSTERDAM_ADOPTED = ["EIP-7997", "EIP-7975"];

/**
 * ECIP-1122's three parameters, keyed so a page can attach its own icon and
 * prose. The constants live here so `/upgrade` and `/overview/what-ships`
 * cannot quote different values for the same floor.
 */
export const CLIENT_PARAMETERS = [
  { key: "tip", title: "A floor under the miner's tip", constant: "MIN_MINER_TIP = 1 gwei" },
  { key: "gas", title: "A gas target the network sets", constant: "8,000,000 to 60,000,000" },
  { key: "mess", title: "MESS comes back on", constant: "ECIP-1100 re-activated" },
];

/**
 * The three fee-floor values, and which layer actually enforces each.
 *
 * The last row is the qualification that must travel with the figure: only
 * `MIN_BASE_FEE` is consensus-enforced, so 2 gwei is what a conformant network
 * charges rather than a guarantee the protocol makes (ECIP-1122 §"Security
 * Considerations").
 */
export const FEE_FLOORS = [
  {
    name: "Base fee floor",
    constant: "MIN_BASE_FEE",
    setBy: "ECIP-1111, a consensus rule applied at every block",
    amount: "1 gwei",
    paidTo: "The Treasury",
  },
  {
    name: "Miner tip floor",
    constant: "MIN_MINER_TIP",
    setBy: "ECIP-1122, chain configuration",
    amount: "1 gwei",
    paidTo: "The miner",
  },
  {
    name: "Minimum gas price",
    constant: "MIN_GAS_PRICE",
    setBy: "Derived from the two above, on a conformant network",
    amount: "2 gwei",
    paidTo: "Split between them",
  },
];

/**
 * Fails the build if the fork attribution and the functional grouping stop
 * describing the same set of EIPs.
 *
 * The two are maintained against different sources, ECIP-1121 §Specification
 * for the grouping and the hardfork meta EIPs for the attribution, so they can
 * drift apart silently. Every previous count on this site was a literal in JSX,
 * where nothing could check it at all: Thread 4 found four wrong fork
 * attributions by hand, and the "two of seven" claim survived four threads.
 * Throwing at module scope means a mismatch is a build failure rather than a
 * page that renders a number nobody re-derived.
 */
function assertEipInventoryIsConsistent(): void {
  const grouped = new Set(EXECUTION_EIP_GROUPS.flatMap((group) => group.eips));
  const attributed = new Set(FORK_TIMELINE.flatMap((fork) => fork.eips));

  const missing = [...grouped].filter((eip) => !attributed.has(eip));
  const extra = [...attributed].filter((eip) => !grouped.has(eip));

  if (missing.length > 0 || extra.length > 0) {
    throw new Error(
      "olympia-eips: FORK_TIMELINE and EXECUTION_EIP_GROUPS describe different sets. " +
        `Grouped but unattributed: ${missing.join(", ") || "none"}. ` +
        `Attributed but ungrouped: ${extra.join(", ") || "none"}.`
    );
  }

  if (grouped.size !== EXECUTION_EIP_COUNT) {
    throw new Error(
      `olympia-eips: EXECUTION_EIP_GROUPS carries a duplicate EIP; ${EXECUTION_EIP_COUNT} entries reduce to ${grouped.size} distinct.`
    );
  }

  const glamsterdamNotAdopted = GLAMSTERDAM_ADOPTED.filter(
    (eip) => !grouped.has(eip) && !NETWORKING_PROTOCOLS.some((p) => p.eip === eip)
  );
  if (glamsterdamNotAdopted.length > 0) {
    throw new Error(
      `olympia-eips: GLAMSTERDAM_ADOPTED names EIPs this ECIP does not adopt: ${glamsterdamNotAdopted.join(", ")}.`
    );
  }
}

assertEipInventoryIsConsistent();
