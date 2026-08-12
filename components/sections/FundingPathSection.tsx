import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionDivider } from "@/components/ui/SectionDivider";

/**
 * The home page's answer to "where does the money come from and where does it
 * go", drawn as the one-way path ECIP-1117 §"Simple Summary" states:
 *
 *   BASEFEE -> ECIP-1112 Vault -> ECIP-1113 Treasury -> OFP seeds a season
 *              -> ECIP-1117 allocates
 *
 * It replaced a live treasury dashboard bound to a contract address. That
 * dashboard reported a balance, a mined-income figure and a transaction count,
 * every one of which is a measurement of one moment; this states the mechanism,
 * which is what the site is for and what stays true.
 *
 * **Two named contracts and no third term.** "Sovereignty Vault" is the
 * ECIP-1112 contract's name and never a name for the money; the Treasury is
 * ECIP-1113's and never ECIP-1112's. The verb *accumulates* is correct and is
 * the reason the contract has that name.
 */

const steps = [
  {
    n: "01",
    eyebrow: "ECIP-1111",
    title: "Every transaction pays a base fee",
    body: "The network sets it, the sender pays it, and it is credited inside consensus as each block is finalized. Priority tips and ECIP-1017 block rewards go to whoever produced the block, in full and unconditionally.",
  },
  {
    n: "02",
    eyebrow: "ECIP-1112",
    title: "It lands in the Olympia Sovereignty Vault",
    body: "One permanent address, written into every Olympia client, with no owner, no role, no setter and no parameter. It keeps nothing: whatever arrives is forwarded, unchanged, to a single address fixed when the contract was built. This is the only contract that cannot be replaced without a hard fork.",
  },
  {
    n: "03",
    eyebrow: "ECIP-1113",
    title: "It lives in the Olympia Treasury",
    body: "A stock timelock owned by no company, foundation or individual. It does not invest the balance and does not choose who receives anything. One account can tell it to pay, and that account carries out proposals that were voted through, queued in public, and held for a fixed delay.",
  },
  {
    n: "04",
    eyebrow: "ECIP-1114 · ECIP-1117",
    title: "Proposals decide where it goes",
    body: "Olympia DAO votes on the network's core: clients, network security, critical infrastructure. A proposal may instead seed a season for the Olympia Futarchy Grants DAO, which allocates that sum to public ecosystem work by open market rather than by committee.",
  },
];

export function FundingPathSection() {
  return (
    <>
      <SectionDivider variant="strong" />
      <section
        id="funding-path"
        aria-labelledby="funding-path-heading"
        className="px-6 py-16 md:py-24"
      >
        <div className="mx-auto max-w-5xl">
          <FadeIn>
            <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-widest text-[var(--brand-green)]">
              How it works
            </p>
            <h2
              id="funding-path-heading"
              className="text-3xl font-bold tracking-tight md:text-4xl"
            >
              The money moves one way
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--text-muted)]">
              Four steps, each specified by its own ECIP, and no step can be
              skipped or reversed. Nothing along the path holds an admin key, and
              no payment leaves without an approval recorded publicly beforehand.
            </p>
          </FadeIn>

          <ol className="m-0 mt-10 list-none p-0">
            {steps.map((step, i) => (
              <li
                key={step.n}
                className="border-t border-[var(--divider)] last:border-b"
              >
                <FadeIn
                  delay={i * 70}
                  className="flex flex-col gap-3 py-6 sm:flex-row sm:gap-6"
                >
                  <div className="flex items-baseline gap-3 sm:w-40 sm:shrink-0 sm:flex-col sm:gap-1">
                    <span className="font-mono text-sm font-bold text-[var(--brand-green)]">
                      {step.n}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-subtle)]">
                      {step.eyebrow}
                    </span>
                  </div>
                  <div className="max-w-3xl">
                    <h3 className="text-base font-semibold text-[var(--text-primary)] md:text-lg">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
                      {step.body}
                    </p>
                  </div>
                </FadeIn>
              </li>
            ))}
          </ol>

          <FadeIn delay={320}>
            <p className="mt-8">
              <Link
                href="/overview"
                className="group inline-flex items-center gap-2 text-sm font-medium text-[var(--brand-green)] transition-opacity duration-200 hover:opacity-70"
              >
                The whole framework, question by question
                <ArrowRight
                  size={15}
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Link>
            </p>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
