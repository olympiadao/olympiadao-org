import { Calendar, Zap } from "lucide-react";

export function KeyDatesSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-[var(--brand-green)]">
          Activation Timeline
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-[var(--border-brand)] bg-[var(--brand-green-subtle)] p-8">
            <div className="mb-4 flex items-center gap-3">
              <Calendar size={24} className="text-[var(--brand-green)]" />
              <span className="text-sm font-semibold text-[var(--brand-green)]">
                Mordor Testnet
              </span>
            </div>
            <p className="mb-2 text-3xl font-bold">Block 15,800,850</p>
            <p className="text-[var(--text-muted)]">
              ~March 28, 2026
            </p>
            <p className="mt-3 text-sm text-[var(--text-subtle)]">
              All 3 clients will activate Olympia simultaneously on the Mordor
              testnet for validation before mainnet.
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)] p-8">
            <div className="mb-4 flex items-center gap-3">
              <Zap size={24} className="text-[var(--brand-amber)]" />
              <span className="text-sm font-semibold text-[var(--brand-amber)]">
                ETC Mainnet
              </span>
            </div>
            <p className="mb-2 text-3xl font-bold">Block ~24,751,337</p>
            <p className="text-[var(--text-muted)]">
              ~Mid-June 2026
            </p>
            <p className="mt-3 text-sm text-[var(--text-subtle)]">
              Production activation after successful Mordor validation.
              Treasury begins accumulating basefee revenue.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
