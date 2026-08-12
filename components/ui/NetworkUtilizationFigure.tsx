"use client";

import { ExternalLink } from "lucide-react";
import { useEtcNetwork } from "@/lib/hooks/use-network";
import { ETC_NETWORK_FALLBACK } from "@/lib/network";
import { CHAIN_CONFIG } from "@/lib/config";

const EXPLORER = CHAIN_CONFIG[61].explorer;

/**
 * The three figures the Network Security argument rests on, read live from
 * Blockscout with the measured reference snapshot rendered until the fetch
 * resolves. A crawler therefore receives real numbers with a date rather than a
 * spinner, which is the same posture `NetworkStatsStrip` takes on `/upgrade`.
 *
 * It reuses `lib/network.ts` rather than re-deriving anything: that layer is
 * mainnet-only and deliberately not chain-aware, so nothing beneath this reads
 * `useSearchParams()` and the route stays statically prerendered.
 *
 * Used by `/governance` and by `/overview/funding`. Both read one shared
 * reference snapshot, so the two pages cannot show a crawler figures that
 * disagree.
 *
 * The utilization caption said "daily figure" until Thread 6 measured it: the
 * reported value is the mean over the most recent **50 blocks**, roughly eleven
 * minutes, which is why it swings several-fold within an hour. Pinned rather
 * than assumed, in `.local/scratch/t6-utilization-window.py` — it matches the
 * 50-block window to six decimal places while missing 10, 25, 75, 100, 150 and
 * 200, so the test discriminates.
 */
export function NetworkUtilizationFigure() {
  const { data, isSuccess } = useEtcNetwork();
  const net = data ?? ETC_NETWORK_FALLBACK;

  const figures = [
    {
      value: `${net.utilizationPercent.toFixed(2)}%`,
      label: "of block space is used",
      caption: "Blockscout's own figure, averaged over the last 50 blocks",
    },
    {
      value: `${net.blockRewardEtc} ETC`,
      label: "per block, and falling",
      caption: `Drops by a fifth at block ${net.nextEraBlock.toLocaleString("en-US")} under ECIP-1017`,
    },
    {
      value: "None",
      label: "collected in base fees",
      caption:
        "EIP-1559 is not active here, so the revenue does not exist rather than being zero",
    },
  ];

  return (
    <div className="rounded-xl border border-[var(--divider)] bg-[var(--bg-elevated)] p-6">
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <h4 className="text-sm font-semibold">Ethereum Classic today</h4>
        {isSuccess ? (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-brand)] bg-[var(--bg-surface)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--brand-green)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-green)]" />
            Live
          </span>
        ) : (
          <span className="rounded-full border border-[var(--border-default)] bg-[var(--bg-surface)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--text-muted)]">
            Reference figures
          </span>
        )}
      </div>

      <dl className="grid gap-5 sm:grid-cols-3">
        {figures.map((figure) => (
          <div key={figure.label}>
            <dt className="sr-only">{figure.label}</dt>
            <dd>
              <p className="font-mono text-2xl font-bold text-[var(--text-primary)]">
                {figure.value}
              </p>
              <p className="mt-1 text-sm font-medium text-[var(--text-primary)]">{figure.label}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-[var(--text-muted)]">
                {figure.caption}
              </p>
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-5 text-xs leading-relaxed text-[var(--text-muted)]">
        {isSuccess
          ? "Read from the Blockscout explorer, refreshed every ten minutes."
          : "Measured from Blockscout on 11 August 2026 and shown until the live read arrives."}{" "}
        <a
          href={EXPLORER}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[var(--brand-green)] transition hover:opacity-80"
        >
          Check it yourself <ExternalLink size={11} aria-hidden="true" />
        </a>
      </p>
    </div>
  );
}
