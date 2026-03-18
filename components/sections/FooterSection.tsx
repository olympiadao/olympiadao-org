import Image from "next/image";
import { Github } from "lucide-react";
import { SectionDivider } from "@/components/ui/SectionDivider";

const links = [
  { label: "Ethereum Classic DAO", href: "https://ethereumclassicdao.org" },
  { label: "Olympia Treasury", href: "https://olympiatreasury.org" },
  { label: "Governance App", href: "https://app.olympiadao.org" },
];

export function FooterSection() {
  return (
    <>
      <SectionDivider />
      <footer className="section-alt py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
            <span className="flex items-center gap-2 text-sm font-semibold tracking-tight text-[var(--text-muted)]">
              <Image src="/logo.svg" alt="" width={28} height={28} />
              OLYMPIA
            </span>

            <div className="flex items-center gap-6">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://github.com/olympiadao"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
            </div>
          </div>

          <p className="mt-8 text-center text-xs text-[var(--text-subtle)]">
            On-chain governance and treasury infrastructure for Ethereum Classic.
          </p>
        </div>
      </footer>
    </>
  );
}
