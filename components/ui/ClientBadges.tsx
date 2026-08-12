import type { ClientRole } from "@/lib/clients";

/**
 * Badge vocabulary for the client pages.
 *
 * Green is ETC-native and gray is maintenance or neutral, per the badge
 * convention shared across the Olympia sites. Amber is reserved for
 * olympiatreasury-org and is deliberately absent here, and a language is a mono
 * label rather than a per-language hex, which could not invert between themes.
 */

/**
 * The green badge sits on a --bg-elevated card, which is the worst real light
 * surface. Measured on the rendered page, --brand-green over
 * --brand-green-subtle composited on that card is 4.39:1, under the 4.5:1 that
 * small badge text needs. Carrying the green on a --bg-surface chip with a brand
 * border instead reaches 5.4:1 in light and 14:1 in dark, uses only existing
 * tokens, and matches the bordered green pill the featured nav link already uses.
 */
const roleClass: Record<ClientRole, string> = {
  primary:
    "border border-[var(--border-brand)] bg-[var(--bg-surface)] text-[var(--brand-green)]",
  maintenance:
    "border border-[var(--divider)] bg-[var(--border-subtle)] text-[var(--text-secondary)]",
};

export function ClientRoleBadge({ role, label }: { role: ClientRole; label: string }) {
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${roleClass[role]}`}>
      {label}
    </span>
  );
}

export function LanguageChip({ language }: { language: string }) {
  return (
    <span className="rounded-full border border-[var(--divider)] px-2.5 py-0.5 font-mono text-xs text-[var(--text-secondary)]">
      {language}
    </span>
  );
}

/** Nothing in the plugin set ships today, and the badge has to say so. */
export function FutureWorkBadge() {
  return (
    <span className="rounded-full bg-[var(--border-subtle)] px-2.5 py-0.5 text-xs font-medium text-[var(--text-secondary)]">
      Future work
    </span>
  );
}
