import Link from "next/link";
import { Suspense } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { NavHeader } from "@/components/sections/NavHeader";
import { NavHeaderFallback } from "@/components/ui/SsrFallbacks";
import { FooterSection } from "@/components/sections/FooterSection";
import { ecipUrl, overviewTopic, overviewTopics, sectionId } from "@/lib/overview-topics";

/**
 * The shared shell for an `/overview/<topic>` page: hero, ECIP chips, prev/next
 * and BreadcrumbList JSON-LD.
 *
 * A page that has been written passes its real sections as `children`; one that
 * has not falls back to rendering `topic.sections` as bare headings, which is
 * what Thread 1 built the shell for. Both forms keep the hero, the navigation
 * and the structured data identical, so a written page cannot drift from an
 * unwritten one on any of them.
 */
export function OverviewTopicPage({
  slug,
  children,
}: {
  slug: string;
  children?: React.ReactNode;
}) {
  const topic = overviewTopic(slug);
  const index = overviewTopics.findIndex((entry) => entry.slug === slug);
  const previous = index > 0 ? overviewTopics[index - 1] : undefined;
  const next = index < overviewTopics.length - 1 ? overviewTopics[index + 1] : undefined;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://olympiadao.org" },
      { "@type": "ListItem", position: 2, name: "Overview", item: "https://olympiadao.org/overview" },
      {
        "@type": "ListItem",
        position: 3,
        name: topic.question,
        item: `https://olympiadao.org/overview/${topic.slug}`,
      },
    ],
  };

  return (
    <>
      <Suspense fallback={<NavHeaderFallback />}>
        <NavHeader />
      </Suspense>
      <main>
        <section className="hero-gradient relative pt-36 pb-12">
          <div className="relative z-10 mx-auto max-w-5xl px-6">
            <FadeIn>
              <Link
                href="/overview"
                className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-[var(--brand-green)] transition-opacity duration-200 hover:opacity-70"
              >
                <ArrowLeft size={13} aria-hidden="true" />
                Overview
              </Link>
              <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
                {topic.question}
              </h1>
              <div className="mt-5 flex flex-wrap gap-2">
                {topic.ecips.map((ecip) => (
                  <a
                    key={ecip}
                    href={ecipUrl(ecip)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-[var(--brand-green-subtle)] px-3 py-1 font-mono text-xs text-[var(--brand-green)] transition hover:opacity-70"
                  >
                    {ecip}
                  </a>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {children ??
          topic.sections.map((heading) => (
            <section
              key={heading}
              id={sectionId(heading)}
              aria-labelledby={`${sectionId(heading)}-heading`}
              className="px-6 py-10"
            >
              <div className="mx-auto max-w-5xl">
                <h2
                  id={`${sectionId(heading)}-heading`}
                  className="text-2xl font-bold tracking-tight"
                >
                  {heading}
                </h2>
              </div>
            </section>
          ))}

        <SectionDivider />

        <nav aria-label="Overview topics" className="px-6 py-12">
          <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:flex-row sm:justify-between">
            {previous ? (
              <Link
                href={`/overview/${previous.slug}`}
                className="group flex-1 rounded-xl border border-[var(--divider)] bg-[var(--bg-elevated)] px-5 py-4 transition-colors duration-200 hover:border-[var(--border-brand)]"
              >
                <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--text-subtle)]">
                  <ArrowLeft size={12} aria-hidden="true" />
                  Previous
                </span>
                <span className="mt-1 block text-sm font-semibold">{previous.question}</span>
              </Link>
            ) : (
              <span className="flex-1" />
            )}
            {next ? (
              <Link
                href={`/overview/${next.slug}`}
                className="group flex-1 rounded-xl border border-[var(--divider)] bg-[var(--bg-elevated)] px-5 py-4 text-right transition-colors duration-200 hover:border-[var(--border-brand)]"
              >
                <span className="flex items-center justify-end gap-2 font-mono text-xs uppercase tracking-widest text-[var(--text-subtle)]">
                  Next
                  <ArrowRight size={12} aria-hidden="true" />
                </span>
                <span className="mt-1 block text-sm font-semibold">{next.question}</span>
              </Link>
            ) : (
              <span className="flex-1" />
            )}
          </div>
        </nav>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      </main>
      <FooterSection />
    </>
  );
}
