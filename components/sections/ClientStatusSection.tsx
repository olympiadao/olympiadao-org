import { CheckCircle } from "lucide-react";

const clients = [
  {
    name: "core-geth",
    language: "Go 1.24",
    version: "v1.12.21",
    branch: "olympia",
    commit: "b1c759dcc",
    tests: "ALL PASS",
    repo: "https://github.com/ethereumclassic/core-geth",
  },
  {
    name: "besu-etc",
    language: "Java 21",
    version: "v26.3",
    branch: "olympia",
    commit: "52dc37b5bf",
    tests: "ALL PASS",
    repo: "https://github.com/ethereumclassic/besu",
  },
  {
    name: "fukuii",
    language: "Scala 3.3",
    version: "v0.1.240",
    branch: "olympia",
    commit: "126c1fd5c",
    tests: "ALL PASS",
    repo: "https://github.com/ethereumclassic/fukuii",
  },
];

export function ClientStatusSection() {
  return (
    <section id="clients" className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-4 text-center text-3xl font-bold tracking-tight text-[var(--brand-green)]">
          Three Independent Clients
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-[var(--text-muted)]">
          Cross-client verification completed March 2026. All consensus-critical
          bugs found and fixed. All 3 clients produce identical Treasury
          balances.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {clients.map((client) => (
            <a
              key={client.name}
              href={client.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)] p-6 transition-all duration-250 hover:-translate-y-1.5 hover:border-[var(--brand-green)]"
              style={{ boxShadow: "var(--card-shadow)" }}
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold">{client.name}</h3>
                <CheckCircle
                  size={20}
                  className="text-[var(--brand-green)]"
                />
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--text-subtle)]">Language</span>
                  <span className="text-[var(--text-secondary)]">
                    {client.language}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-subtle)]">Version</span>
                  <span className="text-[var(--text-secondary)]">
                    {client.version}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-subtle)]">Branch</span>
                  <span className="font-mono text-xs text-[var(--brand-green)]">
                    {client.branch}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-subtle)]">Tests</span>
                  <span className="font-semibold text-[var(--brand-green)]">
                    {client.tests}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
