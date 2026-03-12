import Image from "next/image";
import { Github } from "lucide-react";

export function FooterSection() {
  return (
    <footer className="border-t border-[var(--border-default)] py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <span className="flex items-center gap-2 text-sm font-semibold tracking-tight text-[var(--text-muted)]">
            <Image src="/logo.svg" alt="" width={20} height={20} />
            OLYMPIA
          </span>

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
          A community-driven initiative for Ethereum Classic protocol funding.
        </p>
      </div>
    </footer>
  );
}
