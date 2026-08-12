import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { OverviewTopicPage } from "@/components/sections/OverviewTopicPage";
import { NetworkUtilizationFigure } from "@/components/ui/NetworkUtilizationFigure";
import {
  overviewTopic,
  overviewTopicMetadata,
  sectionId,
  topicSection,
} from "@/lib/overview-topics";

export const metadata = overviewTopicMetadata("funding");

/**
 * `/overview/funding` — where the money comes from. ECIP-1111, with the tip
 * floor from ECIP-1122 where the two combine into a minimum gas price.
 *
 * Written against ECIPs `local-edits` @ 3f3453e. Three claims on this page are
 * the ones the suite most often loses in paraphrase, so each is stated the way
 * the spec states it:
 *
 *  - Ethereum Classic has NO base fee today. EIP-1559 is not active here, so
 *    the component does not exist rather than sitting at zero, and nothing is
 *    being burned or discarded that could be redirected (ECIP-1112 §Simple
 *    Summary, which prohibits all three forms in terms).
 *  - The 2 gwei minimum is a conformant-network figure, not a protocol
 *    guarantee. Only MIN_BASE_FEE is a consensus rule; MIN_MINER_TIP is chain
 *    configuration (ECIP-1111 §"Minimum Gas Price Constants", tightened at
 *    e3a350b). `/upgrade` carries the same caveat in operator terms.
 *  - Gas consumed is the revenue input; the gas limit is not. A figure quoted
 *    as a percentage of the limit is a statement about the limit
 *    (ECIP-1111 §Rationale).
 *
 * This page is the public explainer. `/upgrade` is where an operator acts, and
 * it carries the constant names, the two-floor table and the mining detail, so
 * the depth here stops at the point that page begins and links to it.
 */

const topic = overviewTopic("funding");
/** Heading and anchor for the nth section, read from the single source. */
const H = (n: number) => topicSection(topic, n);
const S = (n: number) => sectionId(H(n));

/** ECIP-1111 §"Where each gwei goes", in plain language and without the constant names. */
const gasPrice = [
  {
    part: "Base fee",
    today: "Does not exist",
    olympia: "At least 1 gwei",
    goesTo: "The Treasury",
  },
  {
    part: "Miner tip",
    today: "1 wei enforced, around 1 gwei by convention",
    olympia: "At least 1 gwei",
    goesTo: "The miner",
  },
  {
    part: "Least a transaction can pay",
    today: "1 wei",
    olympia: "2 gwei",
    goesTo: "Split between them",
  },
];

const notSources = [
  {
    title: "Not from inflation",
    body: "ECIP-1017's emission schedule is untouched and no new ETC is created. Olympia changes where one fee component goes, not the supply or the rate it is issued at.",
  },
  {
    title: "Not from block rewards",
    body: "No ECIP in the suite directs mining revenue to the Treasury. Block rewards are paid to whoever produced the block, in full, on the schedule they already follow.",
  },
  {
    title: "Not from a foundation, a donor or a premine",
    body: "Base fee revenue is the only funding source the protocol itself defines. Anyone may send ETC to the Treasury voluntarily, and some will, but that is a gift rather than a mechanism.",
  },
  {
    title: "Not from Ethereum's burn",
    body: "Ethereum destroys its base fee. Ethereum Classic destroys nothing, because it has no base fee to destroy. Olympia creates the component and points it somewhere, rather than moving something that was already flowing.",
  },
];

export default function FundingPage() {
  return (
    <OverviewTopicPage slug="funding">
      {/* 1. What a transaction pays */}
      <section
        id={S(0)}
        aria-labelledby={`${S(0)}-heading`}
        className="scroll-mt-24 px-6 py-14"
      >
        <div className="mx-auto max-w-5xl">
          <FadeIn>
            <h2 id={`${S(0)}-heading`} className="text-2xl font-bold tracking-tight md:text-3xl">
              {H(0)}
            </h2>
            <div className="mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-[var(--text-muted)]">
              <p>
                A transaction buys room in a block, and room is priced in gas. Under the
                fee market Ethereum has run since 2021, that price comes in two parts. The
                network sets a base fee that applies to everyone in the block, and the
                sender adds a tip on top of it for whoever produces that block. Ethereum
                destroys the base fee and pays the tip to the miner.
              </p>
              <p>
                <span className="font-semibold text-[var(--text-primary)]">
                  Ethereum Classic does not have a base fee at all today.
                </span>{" "}
                That fee market has never been active here, so the component does not
                exist rather than sitting at zero. Nothing on Ethereum Classic is being
                burned or thrown away that Olympia then redirects. Olympia creates the
                base fee, and in the same change decides where it goes.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={80}>
            <div className="mt-8 overflow-x-auto rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)]">
              <table className="w-full min-w-[38rem] text-left text-sm">
                <caption className="sr-only">
                  What one unit of gas costs today and under Olympia, and who receives each part
                </caption>
                <thead>
                  <tr className="border-b border-[var(--border-default)]">
                    <th
                      scope="col"
                      className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]"
                    >
                      Per unit of gas
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]"
                    >
                      Today
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]"
                    >
                      Under Olympia
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]"
                    >
                      Goes to
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {gasPrice.map((row) => (
                    <tr
                      key={row.part}
                      className="border-b border-[var(--border-default)] last:border-0"
                    >
                      <th
                        scope="row"
                        className="px-4 py-3 text-left font-semibold text-[var(--text-primary)]"
                      >
                        {row.part}
                      </th>
                      <td className="px-4 py-3 text-[var(--text-muted)]">{row.today}</td>
                      <td className="px-4 py-3 font-mono font-semibold text-[var(--brand-green)]">
                        {row.olympia}
                      </td>
                      <td className="px-4 py-3 text-[var(--text-muted)]">{row.goesTo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>

          <FadeIn delay={140}>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-[var(--divider)] bg-[var(--bg-surface)] p-5">
                <p className="text-sm font-semibold">What that costs in practice</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  A plain transfer consumes 21,000 gas, so a two gwei minimum puts the
                  cheapest possible transfer at 0.000042 ETC. What people actually pay
                  today is about one gwei, which puts the same transfer at 0.000021 ETC.
                  The floor doubles a very small number. Against what clients technically
                  permit it is a far larger multiple, and that gap is deliberate: it is
                  friction at spam scale and nothing at human scale.
                </p>
              </div>
              <div className="rounded-xl border border-[var(--divider)] bg-[var(--bg-surface)] p-5">
                <p className="text-sm font-semibold">
                  Two gwei is what a conformant network charges
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  It is not a promise the protocol can keep on its own. Only the base fee
                  floor is a consensus rule that every node checks. The tip floor is a
                  client setting, so a block producer that declines to enforce it can
                  still include cheaper transactions. One gwei is the part that holds
                  regardless.{" "}
                  <Link
                    href="/upgrade#what-changes"
                    className="text-[var(--brand-green)] transition hover:opacity-80"
                  >
                    The operator detail is on the upgrade page
                  </Link>
                  .
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* 2. What changes under Olympia */}
      <section
        id={S(1)}
        aria-labelledby={`${S(1)}-heading`}
        className="section-alt scroll-mt-24 px-6 py-14"
      >
        <div className="mx-auto max-w-5xl">
          <FadeIn>
            <h2 id={`${S(1)}-heading`} className="text-2xl font-bold tracking-tight md:text-3xl">
              {H(1)}
            </h2>
            <div className="mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-[var(--text-muted)]">
              <p>
                Two upstream Ethereum changes switch on: the fee market itself, and an
                instruction that lets a contract read the current base fee. Both have been
                in production on Ethereum since 2021 and across most of the EVM ecosystem
                since. Ethereum Classic adopts both of them as written, with a
                single deliberate exception.
              </p>
              <p>
                <span className="font-semibold text-[var(--text-primary)]">
                  The difference is the destination.
                </span>{" "}
                Where Ethereum destroys the base fee, Ethereum Classic credits it to a
                contract. That happens inside consensus as each block is finalized, not
                through a transaction anybody sends: the client writes the amount to a
                balance directly, and no code runs at the other end. Every Olympia client
                does it identically, because a client that did it differently would no
                longer be on the same chain.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={80}>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-[var(--divider)] bg-[var(--bg-elevated)] p-5">
                <p className="text-sm font-semibold">A floor, rather than zero</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  The fee market prices congestion, and Ethereum Classic has none to
                  price: block space runs well under one percent used, with most blocks
                  carrying nothing at all. Left free to fall, a base fee in those
                  conditions reaches zero and stays there, which is not a market clearing
                  price but the absence of one. The floor keeps the mechanism from going
                  inert.
                </p>
              </div>
              <div className="rounded-xl border border-[var(--divider)] bg-[var(--bg-elevated)] p-5">
                <p className="text-sm font-semibold">Nothing else moves</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  No other consensus rule changes and no other instruction is added. The
                  new transaction format sits alongside the existing ones, historical
                  state is untouched, and a contract that never asks about the base fee
                  behaves exactly as it does now.
                </p>
              </div>
              <div className="rounded-xl border border-[var(--divider)] bg-[var(--bg-elevated)] p-5">
                <p className="text-sm font-semibold">One later change, already specified</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  A later hard fork can pay a share of this same stream back to whoever
                  produces the block, leaving the rest for the Treasury. It adds to this
                  design rather than replacing it, and everything above keeps working
                  unchanged. The size of that share is deliberately not set yet.{" "}
                  <Link
                    href="/overview/security-budget"
                    className="text-[var(--brand-green)] transition hover:opacity-80"
                  >
                    Why it waits
                  </Link>
                  .
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* 3. What miners keep */}
      <section
        id={S(2)}
        aria-labelledby={`${S(2)}-heading`}
        className="scroll-mt-24 px-6 py-14"
      >
        <div className="mx-auto max-w-5xl">
          <FadeIn>
            <h2 id={`${S(2)}-heading`} className="text-2xl font-bold tracking-tight md:text-3xl">
              {H(2)}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--text-muted)]">
              Everything they earn today. This is the first question a miner asks and it
              deserves a direct answer before the qualifications: block rewards do not
              change, and tips are still paid in full to whoever produced the block.
            </p>
          </FadeIn>

          <FadeIn delay={80}>
            <ul className="mt-8 grid list-none gap-4 p-0 sm:grid-cols-2">
              <li className="rounded-xl border border-[var(--border-brand)] bg-[var(--brand-green-subtle)] p-5">
                <p className="text-sm font-semibold">Block rewards are untouched</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                  ECIP-1017 sets how much ETC each block creates and when that amount
                  steps down. Olympia does not amend it, does not pause it and does not
                  route any part of it anywhere. It is the same schedule after the fork as
                  before.
                </p>
              </li>
              <li className="rounded-xl border border-[var(--border-brand)] bg-[var(--brand-green-subtle)] p-5">
                <p className="text-sm font-semibold">Tips are untouched, and gain a floor</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                  Tips go to the block producer exactly as they do now. Olympia puts an
                  enforceable minimum under them for the first time, where the client
                  default today is one wei and the gwei people actually pay is a wallet
                  convention rather than a rule.
                </p>
              </li>
            </ul>
          </FadeIn>

          <FadeIn delay={140}>
            <div className="mt-6 max-w-3xl space-y-4 rounded-xl border border-[var(--divider)] bg-[var(--bg-surface)] p-6 text-sm leading-relaxed text-[var(--text-muted)]">
              <p>
                <span className="font-semibold text-[var(--text-primary)]">
                  The nuance, stated rather than skipped.
                </span>{" "}
                At the minimum, a miner is better off, not worse: the Treasury&rsquo;s
                gwei is new cost carried by the sender, and the tip floor beneath the
                miner becomes enforceable for the first time. Above the floor it runs the
                other way. When a sender pays a fixed total, one gwei per unit of gas
                moves from the tip to the Treasury.
              </p>
              <p>
                ECIP-1111 puts that at a low single digit percentage of fee income,
                measured against Ethereum Classic&rsquo;s observed fee levels, and fee
                income is itself a fraction of a percent of what a miner earns while block
                subsidies dominate. That last clause cuts both ways, and it is the reason
                the next section matters: the same emptiness that makes the cost
                negligible makes the revenue small.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <p className="mt-6">
              <Link
                href="/upgrade#mining"
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-[var(--brand-green)] transition-opacity duration-200 hover:opacity-70"
              >
                What Olympia means if you mine
                <ArrowRight
                  size={14}
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Link>
            </p>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* 4. How much this actually raises */}
      <section
        id={S(3)}
        aria-labelledby={`${S(3)}-heading`}
        className="section-alt scroll-mt-24 px-6 py-14"
      >
        <div className="mx-auto max-w-5xl">
          <FadeIn>
            <h2 id={`${S(3)}-heading`} className="text-2xl font-bold tracking-tight md:text-3xl">
              {H(3)}
            </h2>
            <div className="mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-[var(--text-muted)]">
              <p>
                Very little at first, and that is the honest answer rather than an
                awkward one. Revenue is the gas a block actually consumes, multiplied by
                the base fee, multiplied by the blocks in a year. On a chain where most
                blocks are empty, the first of those three numbers is close to nothing.
              </p>
              <p>
                <span className="font-semibold text-[var(--text-primary)]">
                  Gas consumed is what sets the revenue. The gas limit is not.
                </span>{" "}
                This is the mistake almost everyone makes with this mechanism. Raising the
                limit creates no demand, so at the same usage it leaves revenue exactly
                where it was while making that usage look like a smaller fraction of a
                bigger number. Olympia does raise the target, so the trap is live: a
                percentage quoted against the limit describes the limit, not the money.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={80}>
            <div className="mt-8">
              <NetworkUtilizationFigure />
            </div>
          </FadeIn>

          <FadeIn delay={140}>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-[var(--divider)] bg-[var(--bg-elevated)] p-5">
                <p className="text-sm font-semibold">It grows without anyone voting</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  Revenue rises in direct proportion to the gas people consume, so
                  adoption funds the network automatically. No proposal, no rate to set
                  and nobody to ask. That is the property being bought here, and it is
                  worth more than any figure the mechanism raises on day one.
                </p>
              </div>
              <div className="rounded-xl border border-[var(--divider)] bg-[var(--bg-elevated)] p-5">
                <p className="text-sm font-semibold">The point is the schedule, not the sum</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  While blocks stay mostly empty, what the floor collects is small. The
                  near term value of doing this now is that the funding path exists and is
                  tested before the block subsidy has decayed far enough for its absence
                  to hurt.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* 5. Where the money does not come from */}
      <section
        id={S(4)}
        aria-labelledby={`${S(4)}-heading`}
        className="scroll-mt-24 px-6 py-14"
      >
        <div className="mx-auto max-w-5xl">
          <FadeIn>
            <h2 id={`${S(4)}-heading`} className="text-2xl font-bold tracking-tight md:text-3xl">
              {H(4)}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--text-muted)]">
              Four things this is regularly mistaken for. None of them is what happens.
            </p>
          </FadeIn>

          <FadeIn delay={80}>
            <ul className="mt-8 grid list-none gap-4 p-0 sm:grid-cols-2">
              {notSources.map((item) => (
                <li
                  key={item.title}
                  className="rounded-xl border border-[var(--divider)] bg-[var(--bg-elevated)] p-5"
                >
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={160}>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-[var(--text-muted)]">
              What the base fee does instead is land in a contract nobody can change, which
              forwards it to the one that holds it.{" "}
              <Link
                href="/overview/treasury"
                className="font-medium text-[var(--brand-green)] transition hover:opacity-80"
              >
                Where it goes, and who owns it
              </Link>
              .
            </p>
          </FadeIn>
        </div>
      </section>
    </OverviewTopicPage>
  );
}
