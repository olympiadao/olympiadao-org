import { FadeIn } from "@/components/ui/FadeIn";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { PermanenceBoundary } from "@/components/sections/PermanenceBoundary";

/**
 * Section 1 of `/governance`: what the DAO actually has to work with.
 *
 * Three vocabulary terms are fixed by the spec suite and are routinely
 * conflated, so this section is written to keep them apart: the **sovereignty
 * vault** is the fund, the **Olympia Treasury** is the Timelock that holds it,
 * and the **Olympia Sovereignty Vault** is the permanent consensus-facing contract.
 * A vocabulary word is never used here as a contract identifier.
 *
 * It is also the site's home for the fact the site did not carry at all:
 * exactly one contract is permanent. The qualification below the boundary
 * matters and ECIP-1113 §1.4 says it MUST NOT be glossed, so it is prose rather
 * than a caption: the Timelock IS replaceable, and what the fork fixes is where
 * new revenue lands, not who spends it.
 *
 * The boundary itself moved to `PermanenceBoundary` in Thread 6, so
 * `/overview/treasury` carries the same sentences rather than a second
 * paraphrase of a qualification that must not be glossed. Rendered output here
 * is unchanged by the extraction.
 */

export function SovereigntyVaultSection() {
  return (
    <>
      <SectionDivider />
      <section
        id="sovereignty-vault"
        aria-labelledby="sovereignty-vault-heading"
        className="section-alt py-20 md:py-24"
      >
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn>
            <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-widest text-[var(--brand-green)]">
              The Sovereignty Vault
            </p>
            <h2
              id="sovereignty-vault-heading"
              className="mb-4 text-3xl font-bold tracking-tight md:text-4xl"
            >
              What the DAO has to work with
            </h2>
            <p className="max-w-3xl text-base leading-relaxed text-[var(--text-muted)]">
              Ethereum Classic funds its own core work out of what the network earns from
              being used. No company owns that money, no foundation administers it, and
              nobody had to donate it. Base fee revenue is the only funding source the
              protocol itself defines, and anyone may add to it voluntarily and permissionlessly.
            </p>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--text-muted)]">
              What the design settles is where that revenue goes and who is able to spend it,
              and both answers are readable from chain state rather than taken on trust.
              Every credit into the Vault, every forwarding call and every payment the
              Treasury makes is an ordinary on-chain event that anyone can reconstruct
              independently.
            </p>
          </FadeIn>

          <FadeIn delay={80}>
            <h3 className="mt-12 text-lg font-semibold">
              Exactly one contract is permanent
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--text-muted)]">
              That single boundary is the architecture. Consensus has to name something in place
              of the burn, and whatever it names cannot be changed again without a hard fork, so
              the design puts as little as it can get away with on the permanent side of that
              line and leaves everything else on the other.
            </p>
          </FadeIn>

          <PermanenceBoundary delay={140} />
        </div>
      </section>
    </>
  );
}
