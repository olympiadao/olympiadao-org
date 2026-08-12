import { FadeIn } from "@/components/ui/FadeIn";
import { SectionDivider } from "@/components/ui/SectionDivider";
import deployment from "@/lib/contracts.json";

/**
 * The Olympia contract architecture: what each contract is, and which ECIP
 * specifies it.
 *
 * **No address appears here, and that is the design rather than a gap.** An
 * address is a property of a deployment; this section states the architecture,
 * which is a property of the specifications. `lib/contracts.json` carries the
 * same six entries and no addresses, so there is nothing for a reader to mistake
 * for a deployment record and nothing that dates the page.
 *
 * It is a server component on purpose. It reads no chain state and takes no
 * chain parameter, so it needs no `useSearchParams()` and therefore no Suspense
 * boundary, which means a crawler receives the whole table rather than a
 * fallback that carries only the heading.
 */

const contracts = Object.values(deployment.contracts);

export function ContractsSection() {
  return (
    <>
      <SectionDivider />
      <section
        id="contracts"
        aria-labelledby="contracts-heading"
        className="section-alt py-20 md:py-28"
      >
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-widest text-[var(--brand-green)]">
              {deployment.release}
            </p>
            <h2
              id="contracts-heading"
              className="mb-4 text-3xl font-bold tracking-tight md:text-4xl"
            >
              On-Chain Architecture
            </h2>
            <p className="mb-12 max-w-3xl text-sm leading-relaxed text-[var(--text-muted)]">
              Six contracts, and the boundary between the first two is the whole
              design. Base-fee revenue lands at a permanent address that keeps
              nothing and forwards everything; it lives in a timelock that pays
              only what governance approved. Everything below that first contract
              is replaceable by ordinary proposal, with no hard fork and
              nobody&rsquo;s permission.
            </p>
          </FadeIn>

          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {contracts.map((contract, i) => (
              <FadeIn key={contract.name} delay={i * 60}>
                <div className="flex h-full flex-col rounded-xl border border-[var(--divider)] bg-[var(--bg-elevated)] p-5 transition-colors duration-200 hover:border-[var(--border-brand)]">
                  <dt>
                    <span className="block font-mono text-[10px] uppercase tracking-widest text-[var(--brand-green)]">
                      {contract.spec}
                    </span>
                    <span className="mt-1.5 block font-mono text-sm font-semibold text-[var(--text-primary)]">
                      {contract.name}
                    </span>
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                    {contract.role}
                  </dd>
                </div>
              </FadeIn>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
