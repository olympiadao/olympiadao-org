import { formatEther } from "viem";
import { CHAIN_CONFIG } from "./config";

/**
 * ECIP-1017: 5 ETC base reward, reduced to 4/5 of the previous era each era.
 *
 * The era boundary follows ECIP-1017's own ranges, in which era *n* spans blocks
 * `(n-1) x eraLength + 1` through `n x eraLength`. Era 1 is therefore 1 to
 * 5,000,000 and Era 6 begins at 25,000,001, which is the figure ECIP-1115
 * §Motivation quotes. A plain `floor(blockNumber / eraLength)` is one block early and
 * returns the *next* era's subsidy for a block sitting exactly on a multiple of
 * the era length. That is one block in five million, and it was wrong on three
 * rendered surfaces through `nextEraBlock` below before Thread 8 checked it
 * against the specification.
 *
 * Returned zero-indexed internally on purpose: ECIP-1116 §"Formal Revenue
 * Distribution" warns that clients carry a zero-indexed era variable over
 * identical block ranges and that mixing the two conventions yields the wrong
 * era's subsidy. Public copy uses ECIP-1017's 1-indexed numbering; this is the
 * exponent, not the era number.
 */
export function ecip1017Reward(blockNumber: number, eraLength: number): bigint {
  const era = Math.floor((blockNumber - 1) / eraLength);
  let reward = 5_000_000_000_000_000_000n; // 5 ETC in wei
  for (let i = 0; i < era; i++) {
    reward = (reward * 4n) / 5n;
  }
  return reward;
}

/**
 * Ethereum Classic mainnet network figures, for the operator-facing parts of
 * `/upgrade`.
 *
 * Deliberately mainnet-only and deliberately not chain-aware. The chain hooks
 * read `useSearchParams()`, which opts the whole subtree out of static
 * prerender and leaves a crawler reading the Suspense fallback instead of the
 * numbers. An operator asking what the network looks like is asking about
 * chain 61 in any case, so there is nothing to select.
 */

const MAINNET = CHAIN_CONFIG[61];

export interface EtcNetworkSnapshot {
  /** Height of the most recent block the explorer has indexed. */
  blockHeight: number;
  /**
   * Blockscout's own network utilization figure, as a percentage.
   *
   * It is the mean over the most recent **50 blocks**, not a daily average.
   * Measured, not assumed: `.local/scratch/t6-utilization-window.py` matches it
   * to the 50-block window to six decimal places and to no other window tried
   * (10, 25, 75, 100, 150, 200). Fifty blocks is about eleven minutes, which is
   * why this figure moves several-fold within an hour and why no page states it
   * in prose.
   */
  utilizationPercent: number;
  /** Gas limit of the most recent block. ECIP-1122 makes this network-authoritative. */
  gasLimit: number;
  /**
   * ECIP-1017 era the current height falls in, in ECIP-1017's own 1-indexed
   * numbering: era *n* spans blocks `(n-1) x eraLength + 1` through
   * `n x eraLength`, so Era 1 is 1 to 5,000,000 and Era 6 begins at 25,000,001.
   *
   * It was zero-based until Thread 8, which is the convention ECIP-1116
   * §"Formal Revenue Distribution" warns about: clients carry a zero-indexed era
   * variable over identical block ranges, and reading one convention as the
   * other yields the wrong era's subsidy. Nothing renders this number, but
   * `nextEraBlock` is derived from it and three surfaces render that.
   */
  era: number;
  /** Block subsidy for that era, in ETC. */
  blockRewardEtc: string;
  /** First block of the next ECIP-1017 era, where the subsidy falls by a fifth. */
  nextEraBlock: number;
}

interface BlockscoutStats {
  network_utilization_percentage?: number;
}

interface BlockscoutBlockRow {
  height: number;
  gas_limit: string;
}

interface BlockscoutBlockList {
  items?: BlockscoutBlockRow[];
}

/** Everything below the height is derived, so the two live reads carry the whole snapshot. */
function snapshot(
  blockHeight: number,
  utilizationPercent: number,
  gasLimit: number
): EtcNetworkSnapshot {
  // ECIP-1017's own numbering, and the boundary is inclusive at the top: era n
  // ends AT n x eraLength, so the next era's first block is one past it. The
  // previous derivation named `(era + 1) x eraLength`, which is the last block of
  // the current era rather than the first of the next, and three surfaces
  // rendered it as the block where the subsidy falls.
  const era = Math.floor((blockHeight - 1) / MAINNET.eraLength) + 1;
  return {
    blockHeight,
    utilizationPercent,
    gasLimit,
    era,
    blockRewardEtc: formatEther(ecip1017Reward(blockHeight, MAINNET.eraLength)),
    nextEraBlock: era * MAINNET.eraLength + 1,
  };
}

/**
 * Measured from Blockscout on 2026-08-11 at block 25,124,079. Rendered when the
 * live read has not resolved or has failed, which includes the server-rendered
 * HTML a crawler receives, so the figures are labelled as reference values
 * rather than presented as current.
 *
 * Re-measured rather than carried forward, and it moved: the 2026-08-09 reading
 * was 0.20%. Every page that publishes a utilization figure reads it from here,
 * so there is one reference value on the site rather than several that disagree.
 *
 * Thread 6 re-measured before reusing it and left the value alone deliberately.
 * The figure read 0.29% at block 25,124,208, half an hour after the 0.12% here,
 * because it is a 50-block mean rather than a daily one (see
 * `utilizationPercent` above). Re-pointing a constant that swings several-fold
 * within an hour buys nothing and churns every assertion aimed at it; the fix
 * that was needed was the caption, which claimed a window this quantity does not
 * have.
 *
 * The gas limit is the one figure here a block producer still sets. Over the
 * 300 blocks measured, 285 carried 8,000,000 and 15 carried 8,007,811, which is
 * the drift ECIP-1122 closes by making the target network-authoritative. Do not
 * restate "8,000,000 on every block" as an observation; it is a spec constant.
 */
export const ETC_NETWORK_FALLBACK: EtcNetworkSnapshot = snapshot(
  25_124_079,
  0.12,
  8_000_000
);

/**
 * Both reads must succeed. A snapshot half live and half months old would still
 * carry a "live" label, which is worse than showing the reference figures and
 * saying so.
 */
export async function fetchEtcNetwork(): Promise<EtcNetworkSnapshot> {
  const [statsRes, blocksRes] = await Promise.all([
    fetch(`${MAINNET.api}/stats`),
    fetch(`${MAINNET.api}/blocks?type=block`),
  ]);

  if (!statsRes.ok || !blocksRes.ok) {
    throw new Error("Blockscout unavailable");
  }

  const stats: BlockscoutStats = await statsRes.json();
  const blocks: BlockscoutBlockList = await blocksRes.json();
  const latest = blocks.items?.[0];

  if (!latest || typeof stats.network_utilization_percentage !== "number") {
    throw new Error("Blockscout returned an unusable response");
  }

  return snapshot(
    latest.height,
    stats.network_utilization_percentage,
    Number(latest.gas_limit)
  );
}
