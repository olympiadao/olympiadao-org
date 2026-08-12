import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { NavHeader } from "@/components/sections/NavHeader";
import { NavHeaderFallback } from "@/components/ui/SsrFallbacks";
import { FooterSection } from "@/components/sections/FooterSection";
import { OverviewFrameworkDiagram } from "@/components/sections/OverviewFrameworkDiagram";
import { OverviewStageSequence } from "@/components/sections/OverviewStageSequence";
import { overviewTopics } from "@/lib/overview-topics";

export const metadata: Metadata = {
  title: "What Olympia Is, and How It Works",
  description:
    "Olympia in one place: where Ethereum Classic's protocol revenue comes from, where it goes, who decides how it is spent, and what ships at the hard fork.",
  keywords: [
    "Olympia",
    "Olympia overview",
    "Olympia explained",
    "Ethereum Classic",
    "ETC governance",
    "base fee",
    "Olympia Treasury",
    "on-chain governance",
    "ECIP-1111",
    "ECIP-1112",
    "ECIP-1113",
    "ECIP-1114",
    "ECIP-1115",
    "ECIP-1116",
    "ECIP-1117",
    "ECIP-1118",
    "ECIP-1119",
    "ECIP-1121",
    "ECIP-1122",
    "hard fork",
    "security budget",
  ],
  alternates: { canonical: "/overview" },
  openGraph: {
    type: "website",
    url: "/overview",
    siteName: "OlympiaDAO",
    title: "Olympia: What It Is, and How It Works",
    description:
      "The whole Olympia framework in one place: where Ethereum Classic's protocol revenue comes from, where it goes, who decides how it is spent, what stops that being captured, and what ships at the hard fork.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "OlympiaDAO" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Olympia: What It Is, and How It Works",
    description:
      "The whole Olympia framework in one place: where Ethereum Classic's protocol revenue comes from, where it goes, who decides how it is spent, what stops that being captured, and what ships at the hard fork.",
    images: ["/og-image.png"],
  },
};

export default function OverviewPage() {
  return (
    <>
      <Suspense fallback={<NavHeaderFallback />}>
        <NavHeader />
      </Suspense>
      <main>
        <section className="hero-gradient relative pt-36 pb-12">
          <div className="relative z-10 mx-auto max-w-5xl px-6">
            <FadeIn>
              <p className="font-mono text-sm uppercase tracking-widest text-[var(--brand-green)]">
                Olympia
              </p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
                What Olympia is, and{" "}
                <span className="text-[var(--brand-green)]">how it works</span>
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
                Ethereum Classic is adopting the fee market Ethereum has run
                since 2021, with one change: the part Ethereum destroys, Olympia
                keeps. It goes to a vault the network owns, to pay for the
                network&rsquo;s own core development, infrastructure and
                security. This page is the whole framework in one place, and
                every part of it opens onto a page that goes further.
              </p>
            </FadeIn>
          </div>
        </section>

        <section
          id="how-it-fits-together"
          aria-labelledby="how-it-fits-together-heading"
          className="px-6 py-16 md:py-20"
        >
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <h2
                id="how-it-fits-together-heading"
                className="text-2xl font-bold tracking-tight md:text-3xl"
              >
                How Olympia fits together
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
                Follow the money. One transaction pays it, one contract holds
                it, three layers decide what happens to it, and it leaves as
                work someone did for Ethereum Classic.
              </p>
            </FadeIn>
            <OverviewFrameworkDiagram />
          </div>
        </section>

        <SectionDivider />

        <section
          id="the-five-stages"
          aria-labelledby="the-five-stages-heading"
          className="section-alt px-6 py-16 md:py-20"
        >
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <h2
                id="the-five-stages-heading"
                className="text-2xl font-bold tracking-tight md:text-3xl"
              >
                The five stages
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
                Olympia arrives in five stages, and the difference between them
                matters more than the order does. Two change the rules every
                node enforces, so they need a hard fork and everybody upgrades.
                The other three do not, and cannot.
              </p>
              <p className="mt-5 font-mono text-xs text-[var(--text-subtle)]">
                Each fork stage takes an activation block settled by open
                coordination. Mordor first, then mainnet.
              </p>
            </FadeIn>
            <OverviewStageSequence />
          </div>
        </section>

        <SectionDivider />

        <section
          id="question-by-question"
          aria-labelledby="question-by-question-heading"
          className="px-6 py-16 md:py-20"
        >
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <h2
                id="question-by-question-heading"
                className="text-2xl font-bold tracking-tight md:text-3xl"
              >
                The framework, question by question
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
                Seven questions a reader actually has, one page each, answered
                from the specifications that define the answer rather than from
                a summary of them.
              </p>
            </FadeIn>
            <FadeIn delay={60}>
              <ol className="m-0 mt-8 list-none p-0">
                {overviewTopics.map((topic, i) => (
                  <li key={topic.slug} className="border-t border-[var(--divider)] last:border-b">
                    <Link
                      href={`/overview/${topic.slug}`}
                      className="group flex items-start gap-4 py-6 transition-colors duration-200 sm:gap-5"
                    >
                      <span className="mt-1.5 font-mono text-xs text-[var(--text-subtle)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1">
                        <span className="block text-lg font-semibold tracking-tight transition-colors duration-200 group-hover:text-[var(--brand-green)]">
                          {topic.question}
                        </span>
                        <span className="mt-2 block max-w-2xl text-sm leading-relaxed text-[var(--text-muted)]">
                          {topic.summary}
                        </span>
                        <span className="mt-3 block font-mono text-xs text-[var(--text-subtle)]">
                          {topic.ecips.join(" · ")}
                        </span>
                      </span>
                      <ArrowRight
                        size={16}
                        aria-hidden="true"
                        className="mt-2 shrink-0 text-[var(--text-subtle)] transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </Link>
                  </li>
                ))}
              </ol>
            </FadeIn>
          </div>
        </section>
      </main>
      <FooterSection />
    </>
  );
}
