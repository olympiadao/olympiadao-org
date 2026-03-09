import { Github } from "lucide-react";

export function FooterSection() {
  return (
    <footer className="border-t border-[var(--border-default)] py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold tracking-tight text-[var(--text-muted)]">
              OLYMPIA
            </span>
            <span className="text-xs text-[var(--text-subtle)]">
              CC0 &mdash; No rights reserved
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://olympiatreasury.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--brand-green)]"
            >
              Treasury
            </a>
            <a
              href="https://github.com/olympiadao/olympia-framework"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--brand-green)]"
            >
              Framework
            </a>
            <a
              href="https://github.com/olympiadao"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-muted)] transition-colors hover:text-[var(--brand-green)]"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-[var(--text-subtle)]">
          Olympia is a community-driven initiative for Ethereum Classic protocol
          funding.
          <br />
          Authors: Cody Burns (@realcodywburns) &middot; Chris Mercer
          (@chris-mercer)
        </p>
      </div>
    </footer>
  );
}
