import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";

/**
 * The hero states what Olympia is, in the present tense.
 *
 * It carried a countdown and a "Next Step" badge, which are the two clearest
 * forms of a timestamp in disguise: a completed product does not count down to
 * itself, and a next step is a position inside a plan rather than a property of
 * the network. What replaced them is the mechanism — the one sentence that
 * separates this fee market from Ethereum's, which is the thing a reader
 * arriving cold actually needs and which does not need updating.
 */
export function HeroSection() {
  return (
    <section aria-labelledby="hero-heading" className="hero-gradient noise-overlay relative pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <FadeIn>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border-brand)] bg-[var(--brand-green-subtle)] px-4 py-1.5 text-sm font-medium text-[var(--brand-green)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-green)]" />
            On-chain governance for Ethereum Classic
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <h1 id="hero-heading" className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
            The Olympia{" "}
            <span className="text-[var(--brand-green)]">Upgrade</span>
          </h1>
        </FadeIn>

        <FadeIn delay={200}>
          <p className="mb-10 text-lg text-[var(--text-muted)] md:text-xl">
            Ethereum Classic runs the fee market the rest of the EVM world runs on,
            with one change. Ethereum destroys the base fee on every transaction.
            Ethereum Classic keeps it, in a permanent contract the network owns,
            paying for the developers, infrastructure and security the chain depends
            on. Miners keep their block
            rewards and priority tips, undiminished.
          </p>
        </FadeIn>

        <FadeIn delay={300}>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
            <a
              href="https://app.olympiadao.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-green)] px-7 py-3 text-sm font-semibold text-[var(--background)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110"
            >
              Launch Governance App
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a
              href="/upgrade"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] px-7 py-3 text-sm font-semibold text-[var(--text-primary)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--brand-green)] hover:text-[var(--brand-green)]"
            >
              Upgrade Guide
            </a>
            <a
              href="https://olympiatreasury.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-[var(--text-muted)] transition hover:text-[var(--brand-green)]"
            >
              View Treasury →
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
