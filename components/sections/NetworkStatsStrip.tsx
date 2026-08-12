"use client";

import { ExternalLink } from "lucide-react";
import { useEtcNetwork } from "@/lib/hooks/use-network";
import { ETC_NETWORK_FALLBACK, type EtcNetworkSnapshot } from "@/lib/network";
import { CHAIN_CONFIG } from "@/lib/config";

const OLYMPIA_GAS_TARGET = 60_000_000;
const EXPLORER = CHAIN_CONFIG[61].explorer;

function Tile({
  label,
  value,
  caption,
}: {
  label: string;
  value: string;
  caption: string;
}) {
  return (
    <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
        {label}
      </p>
      <p className="mt-2 font-mono text-2xl font-bold text-[var(--text-primary)]">
        {value}
      </p>
      <p className="mt-1 text-xs text-[var(--text-muted)]">{caption}</p>
    </div>
  );
}

function tiles(net: EtcNetworkSnapshot) {
  const blocksToNextEra = net.nextEraBlock - net.blockHeight;
  return [
    {
      label: "Block height",
      value: net.blockHeight.toLocaleString("en-US"),
      caption: "Ethereum Classic mainnet, chain 61",
    },
    {
      label: "Block space used",
      value: `${net.utilizationPercent.toFixed(2)}%`,
      caption: "Almost every block has room to spare",
    },
    {
      label: "Gas limit",
      value: net.gasLimit.toLocaleString("en-US"),
      caption:
        net.gasLimit < OLYMPIA_GAS_TARGET
          ? `Olympia raises the target to ${OLYMPIA_GAS_TARGET.toLocaleString("en-US")}`
          : "The Olympia-era target, set by the network",
    },
    {
      label: "Block reward",
      value: `${net.blockRewardEtc} ETC`,
      caption: `Falls by a fifth at block ${net.nextEraBlock.toLocaleString("en-US")}, ${blocksToNextEra.toLocaleString("en-US")} away`,
    },
  ];
}

/**
 * Live mainnet figures, with the measured reference snapshot rendered until the
 * fetch resolves. The server-rendered HTML therefore carries real numbers and
 * the same four labels rather than a blank or a spinner, and the caption below
 * says which of the two a reader is looking at.
 */
export function NetworkStatsStrip() {
  const { data, isSuccess } = useEtcNetwork();
  const net = data ?? ETC_NETWORK_FALLBACK;

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <h3 className="text-sm font-semibold">Ethereum Classic today</h3>
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

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tiles(net).map((tile) => (
          <Tile key={tile.label} {...tile} />
        ))}
      </div>

      <p className="mt-3 text-xs text-[var(--text-muted)]">
        {isSuccess
          ? "Read from the Blockscout explorer, refreshed every ten minutes. Block reward is derived from the height under ECIP-1017."
          : "Measured from Blockscout on 11 August 2026 and shown until the live read arrives. Block reward is derived from the height under ECIP-1017."}{" "}
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
