import { formatEther } from "viem";
import { CHAIN_CONFIG } from "@/lib/config";
import { ecip1017Reward } from "@/lib/network";
import { ETC_NETWORK_FALLBACK } from "@/lib/network";

/**
 * The ECIP-1017 block subsidy, era by era. The half of the security-budget
 * picture that is fixed, published and already running.
 *
 * **The other half is deliberately not drawn.** ECIP-1116 takes `f`, `N` and
 * `L(j)` from what ECIP-1115 demonstrates in production, so a curve rising to
 * meet this one would be an invented answer to the question the sequencing
 * exists to ask. A bound is publishable and a shape is not, and a plausible
 * curve on a public page is what gets quoted back as a commitment.
 *
 * Three deliberate choices, so a later reader does not "improve" them back:
 *
 *  - **Server-rendered, no charting library.** The emission schedule is a step
 *    function by era rather than a smooth curve, so steps are the honest shape.
 *    Rendering it in CSS also means a crawler receives the real figures and the
 *    era table as text, which a canvas or an SVG chart mounted on the client
 *    does not. `ethereumclassic-com` draws the same schedule in Recharts; the
 *    argument and the era-by-era treatment are emulated from it, the technique
 *    is not, and `AGENTS.md`'s rule about Recharts needing literal colors is
 *    therefore untouched by this component.
 *  - **The subsidy math is read from `lib/network.ts`**, not reimplemented and
 *    not ported from the sibling's `emission.ts`. Two ECIP-1017 implementations
 *    in one repository is the copy-that-no-sweep-reads failure `token-copies.py`
 *    exists to catch.
 *  - **Era numbers are ECIP-1017's own, counting from 1.** ECIP-1116 §"Formal
 *    Revenue Distribution" warns that clients carry a zero-indexed era variable
 *    over identical block ranges, and that reading one as the other yields the
 *    wrong era's subsidy. Public copy uses the specification's vocabulary.
 */

const ERA_LENGTH = CHAIN_CONFIG[61].eraLength;

/** Twelve is enough to show the decay; the schedule itself does not stop there. */
const ERAS_SHOWN = 12;

/** ECIP-1017 era *n* spans blocks `(n-1) x eraLength + 1` through `n x eraLength`. */
function firstBlockOfEra(era: number): number {
  return (era - 1) * ERA_LENGTH + 1;
}

function subsidyWeiOfEra(era: number): bigint {
  return ecip1017Reward(firstBlockOfEra(era), ERA_LENGTH);
}

const ERA_ONE_WEI = subsidyWeiOfEra(1);

/** The era the reference block height falls in, in ECIP-1017's numbering. */
const CURRENT_ERA = Math.floor((ETC_NETWORK_FALLBACK.blockHeight - 1) / ERA_LENGTH) + 1;

const eras = Array.from({ length: ERAS_SHOWN }, (_, i) => {
  const era = i + 1;
  const wei = subsidyWeiOfEra(era);
  return {
    era,
    firstBlock: firstBlockOfEra(era),
    subsidy: formatEther(wei),
    // Integer arithmetic, so the bar height cannot drift from the subsidy it draws.
    heightPercent: Number((wei * 10_000n) / ERA_ONE_WEI) / 100,
    elapsed: era <= CURRENT_ERA,
  };
});

const figures = [
  {
    value: `${formatEther(subsidyWeiOfEra(1))} ETC`,
    label: `Era 1, from block ${firstBlockOfEra(1).toLocaleString("en-US")}`,
  },
  {
    value: `${formatEther(subsidyWeiOfEra(CURRENT_ERA))} ETC`,
    label: `Era ${CURRENT_ERA}, from block ${firstBlockOfEra(CURRENT_ERA).toLocaleString("en-US")}`,
  },
  {
    value: `${ERA_LENGTH.toLocaleString("en-US")} blocks`,
    label: "The length of an era, and the subsidy drops by a fifth at each new one",
  },
];

export function EmissionDecayFigure() {
  return (
    <figure className="rounded-xl border border-[var(--divider)] bg-[var(--bg-elevated)] p-6">
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <h4 className="text-sm font-semibold">The block subsidy, era by era</h4>
        <span className="rounded-full border border-[var(--border-default)] bg-[var(--bg-surface)] px-2.5 py-0.5 font-mono text-[11px] font-medium text-[var(--text-muted)]">
          ECIP-1017
        </span>
      </div>

      {/* Decoration. Every value is repeated as text in the table below, so a
          screen reader reads the schedule rather than a second copy of the bars. */}
      <div aria-hidden="true">
        <div className="flex h-40 items-end gap-1.5 sm:gap-2">
          {eras.map((row) => (
            <div key={row.era} className="flex h-full flex-1 flex-col justify-end">
              <span
                className={`block w-full rounded-t-sm ${
                  row.era === CURRENT_ERA
                    ? "bg-[var(--brand-green)] ring-2 ring-[var(--border-brand)] ring-offset-2 ring-offset-[var(--bg-elevated)]"
                    : row.elapsed
                      ? "bg-[var(--brand-green)]"
                      : "bg-[var(--text-subtle)]"
                }`}
                style={{ height: `${row.heightPercent}%` }}
              />
            </div>
          ))}
        </div>
        <div className="mt-2 flex gap-1.5 sm:gap-2">
          {eras.map((row) => (
            <span
              key={row.era}
              className={`flex-1 text-center font-mono text-[11px] ${
                row.era === CURRENT_ERA
                  ? "font-bold text-[var(--brand-green)]"
                  : "text-[var(--text-muted)]"
              }`}
            >
              {row.era}
            </span>
          ))}
        </div>
      </div>

      <dl className="mt-6 grid gap-5 sm:grid-cols-3">
        {figures.map((figure) => (
          <div key={figure.label}>
            <dt className="sr-only">{figure.label}</dt>
            <dd>
              <p className="font-mono text-xl font-bold text-[var(--text-primary)]">
                {figure.value}
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-[var(--text-muted)]">
                {figure.label}
              </p>
            </dd>
          </div>
        ))}
      </dl>

      <figcaption className="mt-5 text-xs leading-relaxed text-[var(--text-muted)]">
        Twelve eras are drawn and the schedule continues on the same interval. Every
        figure is fixed by ECIP-1017 rather than forecast, and none of it is changed by
        Olympia. What replaces the shrinking part is the subject of this page, and no
        second line is drawn against this one because the values that would shape it are
        deliberately unset.
      </figcaption>

      {/* The schedule as data, open to everyone rather than hidden for screen
          readers only. It started as an `sr-only` table and was measured twice:
          `sr-only` sets `overflow: hidden` with `width: 1px`, and a table box does
          not clip its own content the way a block container does, so the class on
          the `<table>` left every row at its intrinsic 678px and gave the page
          726px of horizontal scroll at 390 (`t8-overflow.py` named the element).
          Moving the class to a wrapping div fixed the scroll and still reported as
          clipped content on all three viewports, because clipped-inside-its-own-box
          is exactly what `sr-only` does. A disclosure is the honest answer to both:
          nothing is clipped, and the evidence is available to every reader instead
          of only to the ones using a screen reader. */}
      <details className="mt-5">
        <summary className="cursor-pointer text-xs font-medium text-[var(--brand-green)] transition hover:opacity-80">
          Show every era in the schedule
        </summary>
        <div className="mt-3 overflow-x-auto rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)]">
          <table className="w-full min-w-[22rem] text-left text-xs">
            <caption className="sr-only">
              The ECIP-1017 block subsidy for each of the first {ERAS_SHOWN} eras, with
              the first block of each era
            </caption>
            <thead>
              <tr className="border-b border-[var(--border-default)]">
                <th scope="col" className="px-3 py-2 font-semibold text-[var(--text-muted)]">
                  Era
                </th>
                <th scope="col" className="px-3 py-2 font-semibold text-[var(--text-muted)]">
                  First block
                </th>
                <th scope="col" className="px-3 py-2 font-semibold text-[var(--text-muted)]">
                  Subsidy in ETC
                </th>
              </tr>
            </thead>
            <tbody>
              {eras.map((row) => (
                <tr
                  key={row.era}
                  className="border-b border-[var(--border-default)] last:border-0"
                >
                  <th
                    scope="row"
                    className={`px-3 py-2 text-left font-mono ${
                      row.era === CURRENT_ERA
                        ? "font-bold text-[var(--brand-green)]"
                        : "font-normal text-[var(--text-primary)]"
                    }`}
                  >
                    {row.era}
                  </th>
                  <td className="px-3 py-2 font-mono text-[var(--text-muted)]">
                    {row.firstBlock.toLocaleString("en-US")}
                  </td>
                  <td className="px-3 py-2 font-mono text-[var(--text-muted)]">
                    {row.subsidy}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </figure>
  );
}
