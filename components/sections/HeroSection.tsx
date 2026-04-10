import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { OlympiaCountdown } from "@/components/ui/OlympiaCountdown";

export function HeroSection() {
  return (
    <section className="hero-gradient noise-overlay relative pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <FadeIn>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border-brand)] bg-[var(--brand-green-subtle)] px-4 py-1.5 text-sm font-medium text-[var(--brand-green)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-green)]" />
            Next Step: Mordor Testnet Deployment
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
            The Olympia{" "}
            <span className="text-[var(--brand-green)]">Upgrade</span>
          </h1>
        </FadeIn>

        <FadeIn delay={150}>
          <div className="mx-auto mb-8 max-w-lg">
            <OlympiaCountdown variant="hero" />
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-[var(--text-muted)] md:text-xl">
            On-chain governance and treasury infrastructure for Ethereum Classic.
            Basefee revenue funds the protocol vault &mdash; block rewards
            and tips remain completely untouched.
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
              <ArrowRight size={16} />
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
