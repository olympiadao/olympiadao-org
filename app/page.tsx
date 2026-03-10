import { ExternalLink } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="flex max-w-lg flex-col items-center text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.svg" alt="Olympia" className="mb-8 h-16 w-16" />

        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[var(--brand-green)]">
          Olympia DAO
        </p>

        <h1 className="mb-4 text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl">
          Deploying Soon
        </h1>

        <p className="mb-8 text-lg leading-relaxed text-[var(--text-muted)]">
          Sustainable governance and funding for Ethereum Classic.
          The Olympia upgrade is under active development.
        </p>

        <a
          href="https://github.com/olympiadao"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-default)] px-5 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:border-[var(--brand-green)] hover:text-[var(--brand-green)]"
        >
          Follow development on GitHub
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </main>
  );
}
