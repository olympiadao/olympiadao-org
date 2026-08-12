import type { Metadata } from "next";
import { Suspense } from "react";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { Accordion } from "@/components/ui/Accordion";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { SovereigntyVaultSection } from "@/components/sections/SovereigntyVaultSection";
import { FundingMandateSection } from "@/components/sections/FundingMandateSection";
import { GovernanceSection } from "@/components/sections/GovernanceSection";
import { NavHeader } from "@/components/sections/NavHeader";
import { NavHeaderFallback } from "@/components/ui/SsrFallbacks";
import { FooterSection } from "@/components/sections/FooterSection";

export const metadata: Metadata = {
  title: "Olympia Governance and Treasury Funding",
  description:
    "What the Olympia Treasury pays for and who decides: client development, developer tooling, network operations, the fee market that has to replace a falling block reward, and funding contributors instead of employing them.",
  keywords: [
    "Olympia governance",
    "on-chain governance",
    "OpenZeppelin Governor",
    "futarchy",
    "prediction markets",
    "contributor NFT",
    "CoreNFT",
    "ETC governance",
    "ECIP-1113",
    "ECIP-1114",
    "ECIP-1117",
    "ECIP-1118",
    "ECIP-1119",
    "Olympia Sovereignty Vault",
    "ECIP-1017",
    "block reward schedule",
    "fee market",
    "retrospective funding",
    "protocol treasury",
    "basefee",
    "timelock",
    "Ethereum Classic DAO",
    "Wyoming DAO LLC",
    "Olympia DAO core contributors",
    "on-chain voting",
    "ETC treasury",
    "governance proposal",
    "network upgrade governance",
  ],
  openGraph: {
    type: "website",
    url: "/governance",
    siteName: "OlympiaDAO",
    title: "Olympia Governance Architecture: On-Chain Protocol Governance for Ethereum Classic",
    description:
      "What the Olympia Treasury pays for and who decides: client development, developer tooling, network operations and the fee market, allocated by binding on-chain voting, with futarchy prediction markets for public signal and software adoption as the network participant layer.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "OlympiaDAO" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Olympia Governance Architecture: On-Chain Protocol Governance for Ethereum Classic",
    description:
      "What the Olympia Treasury pays for and who decides: client development, developer tooling, network operations and the fee market, allocated by binding on-chain voting, with futarchy prediction markets for public signal and software adoption as the network participant layer.",
    images: ["/og-image.png"],
  },
};

const ecips = [
  { id: "ECIP-1113", label: "ECIP-1113" },
  { id: "ECIP-1114", label: "ECIP-1114" },
  { id: "ECIP-1117", label: "ECIP-1117" },
  { id: "ECIP-1118", label: "ECIP-1118" },
  { id: "ECIP-1119", label: "ECIP-1119" },
];

const faqItems = [
  {
    question: "How does the protocol treasury work?",
    answer:
      "The Olympia Treasury is funded by EIP-1559 basefee revenue, the only protocol-defined source, alongside voluntary on-chain donations. No ECIP directs mining revenue to the Treasury: block rewards and tips remain completely untouched and go entirely to miners. Futarchy prediction market activity generates additional transaction volume that flows back into the treasury as basefee revenue. Any stakeholder, whether exchanges, custodians, miners, investment product issuers, or institutions holding ETC on behalf of fund shareholders, can contribute directly on-chain with no overhead. Stakeholders who prefer a traditional giving model can contribute through the ETC Cooperative, a US 501(c)(3) non-profit that accepts tax-deductible donations.",
  },
  {
    question: "Who is coordinating the Olympia upgrade?",
    answer:
      "Olympia is coordinated by the same developers, organizations, and community stewards who have delivered every Ethereum Classic network upgrade since 2016. The ETC Cooperative, a US 501(c)(3) non-profit, funds Ethereum Classic's client development teams and has managed the hard fork coordination process throughout that history. Stakeholder outreach, client release sequencing, and cross-client testing are all established practice. Olympia is a significant upgrade carried forward by a team with a clean delivery record across a decade of ETC network upgrades.",
  },
  {
    question: "Who can participate in governance?",
    answer:
      "Submitting a funding proposal is permissionless: no application, no affiliation, and no gatekeeper who can decline to put it in front of the vote. The one bar is the Governor's proposal threshold, a minimum amount of voting power an author must hold, which the DAO sets for itself; at zero any ETC account can author a proposal, and above zero authorship narrows to core contributors. Voting is limited to Olympia DAO core contributors, who hold a soulbound CoreNFT carrying one non-delegable vote each. Prediction markets are open to anyone, with no contributor NFT and no identity check. Network participants such as miners, exchanges, wallets and infrastructure providers govern through the client software they run.",
  },
  {
    question: "Does the DAO fund work before or after it is done?",
    answer:
      "Both are available, and retrospective is the preferred form. In a retrospective Olympia Funding Proposal the work is already complete and independently verifiable when the proposal is submitted, so the DAO votes on delivered work carrying evidence, merged changes, a published audit, an operated service with a usage record, rather than on a plan. Prospective funding remains available where work cannot reasonably be delivered first, such as a third-party security audit, infrastructure that must be paid for before it can run, or sustained work no contributor can reasonably self-finance; a prospective proposal must state why. Two points are easy to get backwards in opposite directions. Completed work creates no claim on the Treasury: a retrospective proposal may be declined like any other, and performing work confers no entitlement to payment. And the preference is a governance norm, not a contract-level rule, nothing on-chain distinguishes the two forms, both reach the Treasury through the same Governor and Timelock path, and voters enforce the preference by how they vote. The closest precedents are Optimism Retro Funding and Base Builder Grants.",
  },
  {
    question: "How does voting work?",
    answer:
      "Proposals pass through five on-chain stages: Submit, Vote, Queue, Execute, Disclose. Voting power is fixed by a snapshot rather than read live, so admitting or revoking a contributor mid-vote cannot rewrite a tally already in flight, and each core contributor holds exactly one vote. A proposal that reaches quorum only near its deadline extends it, so a late surge cannot close the window before anyone can answer it. Approved proposals enter a configurable timelock before execution. All outcomes are publicly recorded and verifiable on-chain via the Olympia DAO governance app at app.olympiadao.org.",
  },
  {
    question: "When does Olympia activate?",
    answer:
      "Olympia is targeted for mainnet activation in 2027. The testnet activation block on Mordor is announced first. The mainnet activation block follows after a successful Mordor run and a coordinated stakeholder readiness check with exchanges, mining pools, node operators, and infrastructure providers. All client implementations publish Olympia-compatible releases well before activation.",
  },
  {
    question: "Is Ethereum Classic a security or commodity after Olympia?",
    answer:
      "Olympia strengthens ETC's regulatory profile. As a Proof-of-Work blockchain with no pre-mine, no ICO, no foundation controlling the protocol, and now a community-governed on-chain treasury, ETC is positioned for classification as a digital commodity under the CLARITY Act. In the EU, ETC qualifies as a decentralized asset under MiCA, exempt from per-asset issuer requirements. Japan's FSA lists ETC among approved digital assets. The three-layer governance structure, protocol clients, Wyoming DAO LLC, and on-chain Olympia DAO, maintains clear decentralization while satisfying compliance requirements at the legal entity layer.",
  },
];

export default function GovernancePage() {
  return (
    <>
      <Suspense fallback={<NavHeaderFallback />}><NavHeader /></Suspense>
      <main>
        {/* Hero */}
        <section className="hero-gradient relative pt-36 pb-16">
          <div className="relative z-10 mx-auto max-w-5xl px-6">
            <FadeIn>
              <p className="text-sm font-mono uppercase tracking-widest text-[var(--brand-green)]">Olympia</p>
              <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
                Governance{" "}
                <span className="text-[var(--brand-green)]">Architecture</span>
              </h1>
            </FadeIn>
            <FadeIn delay={100}>
              <p className="text-lg text-[var(--text-muted)]">
                Three systems that work together. Core contributors decide binding protocol questions on-chain. Open prediction markets give the public a financially incentivized stake in network direction, and pay participants for being right. Miners, exchanges, wallets and infrastructure providers govern through the client software they choose to run.
              </p>
              <p className="mt-4 text-lg text-[var(--text-muted)]">
                Below: where the money comes from, what the Treasury holds, the five things it
                pays for, and how a proposal turns into a payment that lands.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {ecips.map((ecip) => (
                  <a
                    key={ecip.id}
                    href={`https://ecips.ethereumclassic.org/ECIPs/ecip-${ecip.id.toLowerCase().replace("ecip-", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-[var(--brand-green-subtle)] px-3 py-1 font-mono text-xs text-[var(--brand-green)] transition hover:opacity-70"
                  >
                    {ecip.label}
                  </a>
                ))}
              </div>
              <a
                href="https://app.olympiadao.org"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--brand-green)] px-6 py-2.5 text-sm font-semibold text-[var(--background)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110"
              >
                View Governance App
                <ArrowRight size={14} aria-hidden="true" />
              </a>
            </FadeIn>
          </div>
        </section>

        {/* How It Works, treasury funding */}
        <HowItWorksSection />

        {/* What the DAO has to work with, and the permanence boundary */}
        <SovereigntyVaultSection />

        {/* The five things the Treasury pays for */}
        <FundingMandateSection />

        {/* Full Governance Architecture, 3 tiers with StepLists */}
        <GovernanceSection />

        <SectionDivider />

        {/* FAQ */}
        <section className="py-16 px-6">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <h2 className="mb-8 text-2xl font-bold tracking-tight">
                Frequently Asked Questions
              </h2>
            </FadeIn>
            <FadeIn delay={60}>
              <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] px-6">
                <Accordion items={faqItems} defaultAllOpen />
              </div>
            </FadeIn>
          </div>
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqItems.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: { "@type": "Answer", text: item.answer },
              })),
            }),
          }}
        />
      </main>
      <FooterSection />
    </>
  );
}
