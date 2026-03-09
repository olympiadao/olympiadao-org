import { BookOpen, FileCode, Landmark, Github, ExternalLink } from "lucide-react";

const resources = [
  {
    icon: BookOpen,
    title: "Framework",
    description: "Canonical Olympia specification and design document",
    href: "https://github.com/olympiadao/olympia-framework",
  },
  {
    icon: FileCode,
    title: "ECIPs",
    description: "11 Ethereum Classic Improvement Proposals (1111–1122)",
    href: "https://github.com/ethereumclassic/ECIPs",
  },
  {
    icon: Landmark,
    title: "Treasury Contract",
    description: "Olympia Treasury on Mordor testnet",
    href: "https://etc-mordor.blockscout.com/address/0xCfE1e0ECbff745e6c800fF980178a8dDEf94bEe2",
  },
  {
    icon: Github,
    title: "GitHub Org",
    description: "All Olympia repositories and code",
    href: "https://github.com/olympiadao",
  },
];

export function ResourcesSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-[var(--brand-green)]">
          Resources
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          {resources.map((resource) => (
            <a
              key={resource.title}
              href={resource.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--brand-green)]"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--brand-green-subtle)]">
                <resource.icon
                  size={20}
                  className="text-[var(--brand-green)]"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold">{resource.title}</h3>
                <p className="text-sm text-[var(--text-muted)]">
                  {resource.description}
                </p>
              </div>
              <ExternalLink
                size={16}
                className="shrink-0 text-[var(--text-subtle)] transition-colors group-hover:text-[var(--brand-green)]"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
