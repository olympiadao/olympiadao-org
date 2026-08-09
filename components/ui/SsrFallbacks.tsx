import Link from "next/link";
import { navLinks } from "@/lib/nav-links";
import { OlympiaMark } from "@/components/ui/OlympiaMark";


export function NavHeaderFallback() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border-default)] bg-[var(--bg-overlay)] backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <OlympiaMark size={36} alt="Olympia" />
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
          Live monitoring of Ethereum Classic&rsquo;s sovereignty vault &mdash; funded by the
          network&rsquo;s own base-fee revenue and owned by no company, foundation, or individual.
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
