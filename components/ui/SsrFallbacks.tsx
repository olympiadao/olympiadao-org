import Image from "next/image";
import Link from "next/link";
import { navLinks } from "@/lib/nav-links";

/**
 * Static prerender fallbacks.
 *
 * A client component IS server-rendered. What opts these subtrees out of static
 * prerender is `useSearchParams()` (reached via the chain hooks), and what a
 * crawler then receives is the Suspense *fallback*. A bare `<Suspense>` has no
 * fallback, so those subtrees emitted nothing at all — the homepage prerendered
 * a single h2.
 *
 * These carry the same landmarks, headings and links as the real components, so
 * the SSR HTML is complete. Fix the fallback, not the boundary.
 */

export function NavHeaderFallback() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border-default)] bg-[var(--bg-overlay)] backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.svg" alt="Olympia" width={36} height={36} />
          <span className="text-lg font-bold tracking-tight">OLYMPIA</span>
        </Link>
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--text-muted)]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}

export function TreasurySectionFallback() {
  return (
    <section aria-labelledby="treasury-heading" className="section-alt px-6 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="mb-2 text-xs font-medium uppercase tracking-widest text-[var(--brand-green)]">
          Live Data
        </p>
        <h2 id="treasury-heading" className="text-2xl font-bold tracking-tight sm:text-3xl">
          Olympia <span className="text-[var(--brand-green)]">Treasury</span>
        </h2>
        <p className="mt-2 max-w-lg text-sm text-[var(--text-muted)]">
          Live monitoring of the protocol-funded vault for Ethereum Classic.
        </p>
      </div>
    </section>
  );
}

export function BalanceChartFallback() {
  return (
    <section className="px-6 pb-16 md:pb-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-6 text-lg font-semibold">Balance History</h2>
      </div>
    </section>
  );
}

export function ContractsSectionFallback() {
  return (
    <section id="contracts" aria-labelledby="contracts-heading" className="section-alt py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-2 text-xs font-medium uppercase tracking-widest text-[var(--brand-green)]">
          Deployed Contracts
        </p>
        <h2 id="contracts-heading" className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
          On-Chain Infrastructure
        </h2>
        <p className="mb-12 text-sm text-[var(--text-muted)]">
          Review the contract suite that forms the Olympia framework.
        </p>
      </div>
    </section>
  );
}
