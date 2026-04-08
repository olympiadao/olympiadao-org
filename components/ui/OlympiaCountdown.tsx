"use client";

import { Suspense, useState, useEffect, useMemo, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  OLYMPIA_ACTIVATION_BLOCK,
  AVG_BLOCK_TIME_SECONDS,
  type CountdownStatus,
} from "@/lib/olympia-countdown";
import { useActiveChainId } from "@/lib/hooks/use-chain";
import { getChainConfig } from "@/lib/config";

interface CountdownValues {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function DigitBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex h-14 w-16 items-center justify-center rounded-lg border border-[var(--border-brand)] bg-[var(--brand-green-subtle)] font-mono text-2xl font-bold text-[var(--brand-green)] shadow-[0_0_12px_rgba(0,255,174,0.15)]">
        {String(value).padStart(2, "0")}
      </div>
      <span className="mt-1.5 text-xs text-[var(--text-muted)]">{label}</span>
    </div>
  );
}

async function fetchCurrentBlock(chainId: number): Promise<number | null> {
  try {
    const config = getChainConfig(chainId);
    const res = await fetch(`${config.api}/main-page/blocks`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const data = await res.json();
    const first = Array.isArray(data) ? data[0] : null;
    return first?.height ?? null;
  } catch {
    return null;
  }
}

export function OlympiaCountdown({ variant = "hero" }: { variant?: "hero" | "banner" }) {
  return (
    <Suspense>
      <OlympiaCountdownInner variant={variant} />
    </Suspense>
  );
}

function OlympiaCountdownInner({ variant = "hero" }: { variant?: "hero" | "banner" }) {
  const chainId = useActiveChainId();
  const { data: currentBlock = null } = useQuery({
    queryKey: ["block-height", chainId],
    queryFn: () => fetchCurrentBlock(chainId),
    refetchInterval: 60_000,
    staleTime: 30_000,
  });

  const status: CountdownStatus = useMemo(() => {
    if (OLYMPIA_ACTIVATION_BLOCK === null) return "tbd";
    if (currentBlock !== null && currentBlock >= OLYMPIA_ACTIVATION_BLOCK) return "activated";
    return "pending";
  }, [currentBlock]);

  const initialCountdown = useMemo<CountdownValues | null>(() => {
    if (status !== "pending" || OLYMPIA_ACTIVATION_BLOCK === null || currentBlock === null)
      return null;
    const remaining = OLYMPIA_ACTIVATION_BLOCK - currentBlock;
    const totalSeconds = remaining * AVG_BLOCK_TIME_SECONDS;
    return {
      days: Math.floor(totalSeconds / 86400),
      hours: Math.floor((totalSeconds % 86400) / 3600),
      minutes: Math.floor((totalSeconds % 3600) / 60),
      seconds: totalSeconds % 60,
    };
  }, [status, currentBlock]);

  const [countdown, setCountdown] = useState<CountdownValues | null>(initialCountdown);

  useEffect(() => {
    setCountdown(initialCountdown);
  }, [initialCountdown]);

  const tick = useCallback(() => {
    setCountdown((prev) => {
      if (!prev) return null;
      let { days, hours, minutes, seconds } = prev;
      seconds--;
      if (seconds < 0) {
        seconds = 59;
        minutes--;
      }
      if (minutes < 0) {
        minutes = 59;
        hours--;
      }
      if (hours < 0) {
        hours = 23;
        days--;
      }
      if (days < 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      return { days, hours, minutes, seconds };
    });
  }, []);

  useEffect(() => {
    if (status !== "pending") return;
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [status, tick]);

  // TBD state
  if (status === "tbd") {
    if (variant === "banner") {
      return (
        <div className="flex items-center gap-3 rounded-lg border border-[var(--border-default)] bg-[var(--bg-elevated)] px-4 py-3">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--brand-green)]" />
          <span className="text-sm text-[var(--text-muted)]">
            Olympia Activation: Block TBD — announced on the Olympia Upgrade core developers call
          </span>
        </div>
      );
    }

    return (
      <div className="rounded-xl border border-[var(--border-brand)] bg-[var(--brand-green-subtle)] p-6 text-center">
        <div className="mb-2 flex items-center justify-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--brand-green)]" />
          <span className="text-sm font-medium text-[var(--brand-green)]">
            Activation Block Pending
          </span>
        </div>
        <p className="text-sm text-[var(--text-muted)]">
          The Mordor Testnet and Ethereum Classic Mainnet activation blocks will be announced on the Olympia Upgrade core developers call.
        </p>
      </div>
    );
  }

  // Activated state
  if (status === "activated") {
    return (
      <div className="rounded-xl border border-[var(--border-brand)] bg-[var(--brand-green-subtle)] p-6 text-center">
        <p className="text-lg font-bold text-[var(--brand-green)]">Olympia is Live</p>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          The Olympia upgrade has been activated on Ethereum Classic.
        </p>
      </div>
    );
  }

  // Counting state
  if (!countdown) return null;

  if (variant === "banner") {
    return (
      <div className="flex flex-wrap items-center justify-center gap-4 rounded-lg border border-[var(--border-brand)] bg-[var(--brand-green-subtle)] px-4 py-3">
        <span className="text-sm font-medium text-[var(--brand-green)]">Olympia in</span>
        <div className="flex gap-2">
          <DigitBox value={countdown.days} label="Days" />
          <DigitBox value={countdown.hours} label="Hrs" />
          <DigitBox value={countdown.minutes} label="Min" />
          <DigitBox value={countdown.seconds} label="Sec" />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[var(--border-brand)] bg-[var(--brand-green-subtle)] p-8 text-center">
      <p className="mb-4 text-sm font-medium text-[var(--brand-green)]">Olympia Activation</p>
      <div className="flex justify-center gap-4">
        <DigitBox value={countdown.days} label="Days" />
        <DigitBox value={countdown.hours} label="Hours" />
        <DigitBox value={countdown.minutes} label="Minutes" />
        <DigitBox value={countdown.seconds} label="Seconds" />
      </div>
      {OLYMPIA_ACTIVATION_BLOCK !== null && currentBlock !== null && (
        <p className="mt-4 text-xs text-[var(--text-muted)]">
          {(OLYMPIA_ACTIVATION_BLOCK - currentBlock).toLocaleString()} blocks remaining
        </p>
      )}
    </div>
  );
}
