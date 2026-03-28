import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import { OlympiaCountdown } from "@/components/ui/OlympiaCountdown";

const clients = [
  {
    name: "Fukuii",
    language: "Scala",
    languageColor: "#DC322F",
    role: "Primary Client",
    roleColor: "#00ffae",
    version: "TBD",
    prerequisites: ["JDK 21+", "8 GB RAM minimum", "500 GB SSD (full sync)"],
    installCommands: [
      { platform: "Docker", command: "docker pull ghcr.io/alanverbner/fukuii:latest" },
      { platform: "Source", command: "sbt stage" },
    ],
    verifyCommand: "fukuii --version",
    githubUrl: "https://github.com/AlanVerbner/fukuii",
  },
  {
    name: "Core-Geth",
    language: "Go",
    languageColor: "#00ADD8",
    role: "Maintenance",
    roleColor: "#a78bfa",
    version: "TBD",
    prerequisites: ["Go 1.24+", "8 GB RAM minimum", "500 GB SSD (full sync)"],
    installCommands: [
      { platform: "Docker", command: "docker pull etclabscore/core-geth:latest" },
      { platform: "Linux/macOS", command: "make geth" },
    ],
    verifyCommand: "geth version",
    githubUrl: "https://github.com/etclabscore/core-geth",
  },
  {
    name: "Hyperledger Besu",
    language: "Java",
    languageColor: "#B07219",
    role: "Enterprise",
    roleColor: "#38bdf8",
    version: "TBD",
    prerequisites: ["JDK 21+", "8 GB RAM minimum", "500 GB SSD (full sync)"],
    installCommands: [
      { platform: "Docker", command: "docker pull hyperledger/besu:latest" },
      { platform: "Binary", command: "Download from GitHub releases" },
    ],
    verifyCommand: "besu --version",
    githubUrl: "https://github.com/hyperledger/besu",
  },
];

export default function UpgradePage() {
  return (
    <main className="min-h-screen pt-28 pb-20">
      <div className="mx-auto max-w-4xl px-6">
        <FadeIn>
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-[var(--brand-green)] transition hover:opacity-80"
          >
            <ArrowLeft size={14} />
            Back to Home
          </Link>
        </FadeIn>

        <FadeIn delay={50}>
          <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Upgrade Your Node
          </h1>
        </FadeIn>

        <FadeIn delay={100}>
          <p className="mb-8 max-w-2xl text-[var(--text-muted)]">
            Three independent client implementations support the Olympia upgrade. Choose your
            client and follow the guide to stay on the canonical ETC chain.
          </p>
        </FadeIn>

        <FadeIn delay={150}>
          <div className="mb-10">
            <OlympiaCountdown variant="banner" />
          </div>
        </FadeIn>

        <div className="space-y-8">
          {clients.map((client, i) => (
            <FadeIn key={client.name} delay={200 + i * 100}>
              <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-6">
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold"
                    style={{
                      backgroundColor: `${client.languageColor}20`,
                      color: client.languageColor,
                    }}
                  >
                    {client.language.slice(0, 2)}
                  </span>
                  <div>
                    <h2 className="text-lg font-semibold">{client.name}</h2>
                    <div className="flex items-center gap-2">
                      <span
                        className="rounded-full px-2 py-0.5 text-xs font-medium"
                        style={{
                          backgroundColor: `${client.roleColor}15`,
                          color: client.roleColor,
                        }}
                      >
                        {client.role}
                      </span>
                      <span className="text-xs text-[var(--text-muted)]">{client.language}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-xs text-[var(--text-muted)]">Olympia Version</p>
                  <p className="font-mono text-sm">{client.version}</p>
                </div>

                <div className="mt-4">
                  <p className="mb-2 text-sm font-medium">Prerequisites</p>
                  <ul className="space-y-1">
                    {client.prerequisites.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--brand-green)]" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 space-y-2">
                  {client.installCommands.map(({ platform, command }) => (
                    <div
                      key={platform}
                      className="rounded-lg border border-[var(--border-default)] bg-[var(--background)] p-3"
                    >
                      <p className="text-xs text-[var(--text-muted)]">{platform}</p>
                      <code className="mt-1 block font-mono text-sm text-[var(--brand-green)]">
                        {command}
                      </code>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-lg border border-[var(--border-default)] bg-[var(--background)] p-3">
                  <p className="text-xs text-[var(--text-muted)]">Verify</p>
                  <code className="mt-1 block font-mono text-sm text-[var(--brand-green)]">
                    {client.verifyCommand}
                  </code>
                </div>

                <a
                  href={client.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--brand-green)] transition hover:opacity-80"
                >
                  GitHub
                  <ExternalLink size={14} />
                </a>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </main>
  );
}
