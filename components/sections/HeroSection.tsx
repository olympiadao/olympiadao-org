import { ArrowRight, ExternalLink } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--brand-green)] opacity-[0.04] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border-brand)] bg-[var(--brand-green-subtle)] px-4 py-1.5 text-sm font-medium text-[var(--brand-green)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-green)]" />
          Mordor Testnet &mdash; Block 15,800,850
        </div>

        <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
          The Olympia Upgrade
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg text-[var(--text-muted)] md:text-xl">
          A staged governance and funding system for Ethereum Classic.
          Redirects the EIP-1559 basefee into an on-chain Treasury, then
          builds governance layers to allocate funds transparently.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="https://github.com/olympiadao/olympia-framework"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-green)] px-7 py-3 text-sm font-semibold text-[var(--background)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110"
          >
            Read the Framework
            <ArrowRight size={16} />
          </a>
          <a
            href="https://olympiatreasury.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] px-7 py-3 text-sm font-semibold text-[var(--brand-green)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--brand-green)]"
          >
            View Treasury
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
