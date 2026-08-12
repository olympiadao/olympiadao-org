import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { OverviewTopicPage } from "@/components/sections/OverviewTopicPage";
import { EmissionDecayFigure } from "@/components/ui/EmissionDecayFigure";
import {
  overviewTopic,
  overviewTopicMetadata,
  sectionId,
  topicSection,
} from "@/lib/overview-topics";

export const metadata = overviewTopicMetadata("security-budget");

/**
 * `/overview/security-budget` — what happens to miners when the block subsidy
 * runs out. ECIP-1115 for the adjustable governance-layer version, ECIP-1116 for
 * the consensus-layer graduation, ECIP-1017 for the schedule that creates the
 * question.
 *
 * Written against ECIPs `local-edits` @ 3f3453e, and re-checked at db669af,
 * which landed mid-thread and left ECIP-1115 and ECIP-1116 byte-identical. Both
 * specs were rewritten in the respec, so nothing here rests on a remembered
 * section number.
 *
 * **No value and no shape for `f`, `N` or `L(j)` appears anywhere on this page,
 * in prose, in a table or in a figure.** ECIP-1116 §"Parameter Values Are
 * Deliberately Unset" takes all three from what ECIP-1115 demonstrates in
 * production, so publishing one answers the question the sequencing exists to
 * ask, and a plausible curve on a public page is what gets quoted back as a
 * commitment. `0 < f < 1` is a bound and is publishable; a number is not. Nor is
 * a curve derived from a measured utilization figure: a real observation
 * multiplied by an invented fraction is still an invented number, and it reads
 * as more authoritative for having a measurement in it.
 *
 * Five more claims are the ones a paraphrase loses:
 *
 *  - **Direction of flow.** This is not a block-reward split. Value moves FROM
 *    the base-fee stream TO miners, from a stream that does not exist before the
 *    fee market activates and that no miner has ever received (ECIP-1115 §"This
 *    Is Not a Block-Reward Split"). ECIP-1017 rewards and priority tips are
 *    untouched by the entire suite.
 *  - **ECIP-1116 complements ECIP-1111 and does not replace it**, and does not
 *    repeal ECIP-1115 either: that machinery stays available for the retained
 *    `(1 − f)` Treasury share (ECIP-1116 §"BASEFEE Allocation", §"Relationship
 *    to ECIP-1115 After Activation").
 *  - **Activation moves block-producer revenue up, not down** (ECIP-1116
 *    §"Hashrate Impact"). An argument that it takes revenue from miners has to
 *    establish an entitlement to that stream first.
 *  - **The substantive change at graduation is that the payment path leaves
 *    governance**, not merely that the number is fixed.
 *  - **`B_k` is an observation of public chain history, not an on-chain read.**
 *    No EVM opcode exposes a block's `gasUsed`, so the figures are carried in
 *    the hash-bound proposal and are reproducible by anyone (ECIP-1115 §2.1).
 *
 * The figure draws the ECIP-1017 half only, and `EmissionDecayFigure` carries
 * the reasoning for why nothing is drawn against it.
 */

const topic = overviewTopic("security-budget");
/** Heading and anchor for the nth section, read from the single source. */
const H = (n: number) => topicSection(topic, n);
const S = (n: number) => sectionId(H(n));

/**
 * ECIP-1115 §"This Is Not a Block-Reward Split", which is the comparison this
 * page exists to make. Percentages are written as words so no reader mistakes a
 * historical proposal's share for an Olympia parameter.
 */
const notASplit = [
  {
    earlier: "The source is the block reward, cut from all of it to a smaller share",
    olympia:
      "The source is base-fee revenue the Treasury holds, which no miner receives today. Block rewards and tips are untouched",
  },
  {
    earlier: "Recipients are named in the proposal and hold standing withdrawal rights",
    olympia:
      "No privileged recipients, no admin keys and no discretionary veto, and registering as a recipient is open to anyone. No class of recipient, miners included, gets any priority or entitlement",
  },
  {
    earlier:
      "The allocation is fixed in the protocol and changeable only by another consensus change",
    olympia:
      "Every parameter is set by proposal, and the mechanism stays switched off until a proposal turns it on",
  },
  {
    earlier: "Control rests with keyholders, or with voting weighted by holdings",
    olympia:
      "Every payment is an ordinary funding proposal through the same public pipeline, and a vote is one seat per contributor with nothing to accumulate",
  },
];

/** ECIP-1116 §Activation, §"Parameter Values Are Deliberately Unset", §Specification. */
const preconditions = [
  {
    n: "01",
    title: "The fee market has to be running",
    body: "There is nothing to allocate until Ethereum Classic charges a base fee at all, which is the first hard fork. The second step also may not activate at that same fork block, so the two are separated by design rather than by scheduling.",
  },
  {
    n: "02",
    title: "The adjustable version has to run, on mainnet, and be observed",
    body: "Governance has to switch it on and leave it on long enough to produce real evidence about what allocation sustains block-producer participation without starving the work the Treasury funds. How long that takes is a community decision. That it has to happen at all is a requirement, not a recommendation.",
  },
  {
    n: "03",
    title: "The values have to be filled in from what that produced",
    body: "They are deliberately unset in the specification, and a client has to refuse to activate with them unset rather than fall back to a default. Naming them now would be exactly what the sequencing exists to avoid: fixing a monetary parameter before the evidence justifying it exists, at the one layer where correcting it costs a hard fork.",
  },
  {
    n: "04",
    title: "The values have to be checked, and two of the checks are load-bearing",
    body: "Every client verifies them at activation and refuses to proceed if any fails. Nothing downstream would catch two of those failures, which is why they are written as refusals rather than warnings.",
  },
  {
    n: "05",
    title: "The window length has to be argued against real chain history",
    body: "It has to be evaluated against how deep reorganizations actually go on Ethereum Classic and against the chain-selection defense that comes back on at the same upgrade, and the records that evaluation rests on have to be cited. Only then is there a block worth scheduling.",
  },
];

export default function SecurityBudgetPage() {
  return (
    <OverviewTopicPage slug="security-budget">
      {/* 1. Why the subsidy shrinks */}
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
                Ethereum Classic pays whoever produces a block a fixed amount of new
                ETC, and that amount has been shrinking since 2016 on a schedule the
                network chose deliberately. Every 5,000,000 blocks it drops by a fifth.
                It began at 5 ETC. Nothing in Olympia changes any of that, and nothing
                in Olympia could: the schedule is a consensus rule, settled on purpose
                and permanent by design.
              </p>
              <p>
                <span className="font-semibold text-[var(--text-primary)]">
                  That leaves the hardest question anyone asks about this network.
                </span>{" "}
                Miners secure it because it pays them. If the part of that payment set by
                the protocol keeps halving away toward nothing, either something else
                pays them or the security paid for by that revenue shrinks alongside it.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={80}>
            <div className="mt-8">
              <EmissionDecayFigure />
            </div>
          </FadeIn>

          <FadeIn delay={140}>
            <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-[var(--text-muted)]">
              <p>
                What is left is transaction fees, and the specifications are direct about
                which part of them. A transaction under the fee market Olympia activates
                pays a base fee plus a tip, and the tip goes to the miner exactly as it
                does today. Tips are the component expected to take over from the
                subsidy, and tips track demand block by block, which nobody controls and
                nobody can forecast. A revenue stream made only of tips is a volatile
                one.
              </p>
              <p>
                So the two specifications on this page do one thing: they make it
                possible to put a steadier component alongside that volatile one. The
                interesting part is how carefully they refuse to guess at it.{" "}
                <Link
                  href="/overview/funding"
                  className="font-medium text-[var(--brand-green)] transition hover:opacity-80"
                >
                  Where the money comes from
                </Link>{" "}
                covers the base fee itself.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* 2. What does not change */}
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
                <span className="font-semibold text-[var(--text-primary)]">
                  Block rewards and tips. Both, in full, throughout.
                </span>{" "}
                No part of Olympia alters issuance, the length of an era, the reduction
                at each one, or the subsidy itself. Priority tips continue to be paid in
                full to whoever produced the block, are not averaged across anything, and
                are not netted against any other payment. If you mine Ethereum Classic,
                every unit of revenue you receive today you still receive afterward.
              </p>
              <p>
                This matters because Ethereum Classic has been asked twice before to fund
                a treasury out of the block reward, and both proposals are in the public
                register with their outcomes recorded. One was rejected and one was
                withdrawn. One split the block reward between two treasury addresses and
                the miner; the other sent four fifths of it to miners and the rest to a
                treasury contract that only named parties could withdraw from.
              </p>
              <p>
                <span className="font-semibold text-[var(--text-primary)]">
                  The direction of flow is the distinction that matters most.
                </span>{" "}
                A reward split moves value out of miner revenue and into a treasury. What
                is described below moves value from the base-fee stream to miners, and
                that stream does not exist on Ethereum Classic until the fee market
                activates. No miner has ever received any of it.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={80}>
            <div className="mt-8 overflow-x-auto rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)]">
              <table className="w-full min-w-[40rem] text-left text-sm">
                <caption className="sr-only">
                  The two rejected block-reward designs compared with what these
                  specifications actually do
                </caption>
                <thead>
                  <tr className="border-b border-[var(--border-default)]">
                    <th scope="col" className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                      The earlier designs
                    </th>
                    <th scope="col" className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                      These two
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {notASplit.map((row) => (
                    <tr
                      key={row.earlier}
                      className="border-b border-[var(--border-default)] align-top last:border-0"
                    >
                      <th
                        scope="row"
                        className="px-4 py-3 text-left font-normal text-[var(--text-muted)]"
                      >
                        {row.earlier}
                      </th>
                      <td className="px-4 py-3 text-[var(--text-primary)]">{row.olympia}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>

          <FadeIn delay={140}>
            <div className="mt-6 max-w-3xl rounded-xl border border-[var(--border-brand)] bg-[var(--brand-green-subtle)] p-6">
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                <span className="font-semibold text-[var(--text-primary)]">
                  There is no point at which a miner is worse off than immediately
                  before.
                </span>{" "}
                Before the second step below, the whole base fee goes to the Treasury.
                After it, part of the base fee goes to whoever produced the block instead.
                Relative to the fee market as Olympia first ships it, activation moves
                block-producer revenue up rather than down. An argument that any of this
                takes revenue from miners has to establish an entitlement to a stream that
                does not exist yet, and that chains running the unmodified fee market
                destroy outright.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* 3. Step one: a curve governance can adjust */}
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
            <div className="mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-[var(--text-muted)]">
              <p>
                The first step does not touch consensus at all. Base-fee revenue arrives
                in the Treasury exactly as it does for every other purpose, and a share
                of it can be paid back out to block producers on a schedule that spreads
                each block&rsquo;s contribution across a window of later blocks.
              </p>
              <p>
                <span className="font-semibold text-[var(--text-primary)]">
                  Spreading it is the point, not a detail of the plumbing.
                </span>{" "}
                Base-fee revenue is volatile block to block, so paying it out as it
                arrives would hand that volatility straight to the recipient. Averaging
                each block&rsquo;s contribution forward across a window turns a lottery
                into something closer to a wage, which is the property that makes fee
                revenue usable as a security budget in the first place. The idea is
                adapted rather than invented: it generalizes a mechanism from
                Roughgarden&rsquo;s economic analysis of the fee market, which pays each
                block&rsquo;s revenue forward across a fixed number of following blocks
                to reduce variance without disturbing incentives.
              </p>
              <p>
                Three things are set by proposal: what share of each block&rsquo;s
                revenue enters the mechanism, how long the window is, and how the weight
                is distributed across it. Every one of them can be changed, suspended or
                switched off again by another proposal, with no fork and nobody&rsquo;s
                permission. The starting state is off, and nothing happens until a
                proposal turns it on.
              </p>
              <p>
                <span className="font-semibold text-[var(--text-primary)]">
                  Which is the whole reason this step exists before the next one.
                </span>{" "}
                A wrong number here costs a proposal. The same wrong number written into
                consensus costs a hard fork. And it runs while the block subsidy is still
                large enough to be securing the network on its own, which is what makes
                running the experiment safe rather than reckless.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={80}>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-[var(--divider)] bg-[var(--bg-elevated)] p-5">
                <p className="text-sm font-semibold">Nobody becomes owed anything</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  A schedule of intended payments is not a claim, a reserve, an earmark
                  or a liability. Nothing is set aside inside any contract, no automatic
                  transfer exists anywhere, and each payment is a separate proposal that
                  has to pass on its own. No miner and no pool acquires a right to any of
                  it, and neither does anyone else.
                </p>
              </div>
              <div className="rounded-xl border border-[var(--divider)] bg-[var(--bg-elevated)] p-5">
                <p className="text-sm font-semibold">The share is a judgment, not a reading</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  There is no on-chain notion of a surplus, an excess or an unmet need,
                  and no contract computes one. Whether revenue exceeds what the network
                  otherwise needs is something voters decide when they approve a
                  configuration and again when they approve each payment. Introducing a
                  metric or a trigger claiming to establish it is forbidden outright.
                </p>
              </div>
              <div className="rounded-xl border border-[var(--divider)] bg-[var(--bg-elevated)] p-5">
                <p className="text-sm font-semibold">Recipients are identified in the open</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  Governance may pick any method for identifying block producers as long
                  as it is deterministic, transparent and set through the proposal
                  process: addresses miners register themselves through an open process,
                  pool payout addresses named by proposal, or a rule computed on-chain.
                  Nothing may rest on a private feed, an interface nobody can verify, or
                  anyone&rsquo;s discretion.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={140}>
            <div className="mt-6 max-w-3xl space-y-4 rounded-xl border border-[var(--divider)] bg-[var(--bg-surface)] p-6 text-sm leading-relaxed text-[var(--text-muted)]">
              <p>
                <span className="font-semibold text-[var(--text-primary)]">
                  The figure every payment is computed from is measured, and anyone can
                  reproduce it.
                </span>{" "}
                What a block produced in base-fee revenue is the gas it used multiplied
                by the base fee it charged, and both are in the block header. It is
                deliberately not taken from the accumulating contract&rsquo;s balance or
                from what it reports moving on, because both of those can be gamed:
                anyone may trigger the transfer that moves funds along, so anyone could
                choose the period boundaries, and anyone may send money to that contract,
                so a voluntary contribution would be counted as fee revenue. The header
                product removes both rather than mitigating them.
              </p>
              <p>
                There is a catch worth knowing, because it shapes the whole design. No
                contract can read how much gas a block used, not even the block it is
                executing in. So the figures are stated in the proposal itself, folded
                into the identifier that binds it, and recomputable by any independent
                party from public block headers. No oracle, no third-party indexer, and
                nothing resting on a privileged attestation.
              </p>
              <p>
                Every payment then goes through the ordinary route:{" "}
                <Link
                  href="/overview/proposals#how-a-proposal-becomes-a-payment"
                  className="font-medium text-[var(--brand-green)] transition hover:opacity-80"
                >
                  the same vote, queue and public execution
                </Link>{" "}
                as anything else the Treasury pays for. There is no separate channel and
                no shortcut.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* 4. Step two: a curve the protocol enforces */}
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
                The second step is a hard fork, and it is the one place in the whole
                suite where a payment to miners stops being a governance decision. Once
                one configuration has been demonstrated in production under the first
                step, that configuration is written into the rules for finalizing a
                block. The protocol then computes what is due at each block and credits
                whoever produced it directly.
              </p>
              <p>
                <span className="font-semibold text-[var(--text-primary)]">
                  The substantive change is not that the number becomes fixed. It is that
                  the payment path leaves governance entirely.
                </span>{" "}
                The allocation no longer passes through the Treasury at any point: the
                accumulating contract never receives it, the Governor never sees it, the
                contract that holds the funds never releases it, and no proposal funds
                it. No proposal can alter it, withhold it or redirect it either, so a
                later DAO cannot set it to nothing through capture, apathy or a change of
                priorities. Changing it again needs a new specification and another hard
                fork, which is deliberately the same cost as changing any other consensus
                rule.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={80}>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-[var(--divider)] bg-[var(--bg-elevated)] p-5">
                <p className="text-sm font-semibold">Why harden it at all</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  While the block subsidy still dominates miner revenue, an allocation a
                  future vote could remove is a tolerable risk and a mistake is
                  correctable. Once fee revenue is the primary security budget, an
                  allocation a future vote could remove is a security budget a future
                  vote could remove. This exists to close that specific risk at the point
                  it starts to matter.
                </p>
              </div>
              <div className="rounded-xl border border-[var(--divider)] bg-[var(--bg-elevated)] p-5">
                <p className="text-sm font-semibold">Why a curve, not a flat share</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  Hardening a flat percentage would fix the size of the allocation and
                  throw away its shape, and the shape is what makes fee revenue usable as
                  a security budget rather than a lottery. So what is embedded is the
                  whole thing the first step demonstrated: the share, the window and the
                  weighting across it, carried over with their meanings unchanged.
                </p>
              </div>
              <div className="rounded-xl border border-[var(--divider)] bg-[var(--bg-elevated)] p-5">
                <p className="text-sm font-semibold">
                  Why the Treasury keeps a share of it
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  The two allocations are not independent. Base-fee revenue is a function
                  of demand, and demand depends on the work the Treasury funds: maintained
                  clients, patched vulnerabilities, EVM alignment, explorers and RPC,
                  audits. Handing the entire stream to block producers would permanently
                  remove the funding for the work that generates the stream, at the layer
                  where the decision cannot be revisited without another fork. A larger
                  permanent share of a revenue source that stops growing is not an
                  improvement.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={140}>
            <div className="mt-6 max-w-3xl space-y-4 rounded-xl border border-[var(--divider)] bg-[var(--bg-surface)] p-6 text-sm leading-relaxed text-[var(--text-muted)]">
              <p>
                <span className="font-semibold text-[var(--text-primary)]">
                  So the share is bounded at both ends, strictly, and the bound is the
                  only thing about it that can honestly be published.
                </span>{" "}
                The fraction going to block producers has to be greater than nothing and
                less than all of it. Nothing would harden no allocation at all and make
                activation pointless; all of it would permanently reduce the
                Treasury&rsquo;s protocol revenue to zero, leaving only what people
                choose to contribute voluntarily. Under the first step both ends are
                meaningful and the next proposal can undo either, which is why both are
                allowed there. At the consensus layer both are permanent and degenerate.
              </p>
              <p>
                <span className="font-semibold text-[var(--text-primary)]">
                  What the actual values are is deliberately unanswered, and this site
                  will not guess at them.
                </span>{" "}
                They are filled in from what the first step demonstrates in production,
                which is the entire reason for doing it in that order, and a client has
                to refuse to activate with them unset rather than fall back to a default.
                A number published here, or a shape drawn in a chart, would be an
                invented answer to the question the sequencing exists to ask, and it
                would be quoted back as a commitment.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-[var(--divider)] bg-[var(--bg-surface)] p-5">
                <p className="text-sm font-semibold">The first step is not repealed</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  Its machinery stays available for the share the Treasury keeps, which
                  goes on accumulating and can still be spread forward for the
                  Treasury&rsquo;s own purposes: client maintenance, audits,
                  infrastructure. Spreading revenue forward was never only a
                  miner-distribution mechanism. What graduates is the miner-facing part
                  of it.
                </p>
              </div>
              <div className="rounded-xl border border-[var(--divider)] bg-[var(--bg-surface)] p-5">
                <p className="text-sm font-semibold">
                  And it complements the fee market rather than replacing it
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  Everything the fee market specification establishes stays in force in
                  full: the fee market itself, the permanent floor under the base fee, the
                  way it is calculated and adjusted, the opcode that exposes it, and the
                  redirection itself. What is amended is where the redirected revenue
                  goes, and nothing else.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* 5. What has to happen first */}
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
              The order is the design rather than a plan, and it is written as a
              requirement. Five things have to be true before the consensus-layer step
              has a block worth scheduling.
            </p>
          </FadeIn>

          <FadeIn delay={80}>
            <ol className="mt-8 list-none space-y-4 p-0">
              {preconditions.map((step, i) => (
                <li key={step.title}>
                  <FadeIn delay={i * 60}>
                    <div className="flex gap-4 rounded-xl border border-[var(--divider)] bg-[var(--bg-elevated)] p-5">
                      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-[var(--brand-green)] bg-[var(--background)] font-mono text-xs font-bold text-[var(--brand-green)]">
                        {step.n}
                      </span>
                      <div>
                        <p className="text-sm font-semibold">{step.title}</p>
                        <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-muted)]">
                          {step.body}
                        </p>
                      </div>
                    </div>
                  </FadeIn>
                </li>
              ))}
            </ol>
          </FadeIn>

          <FadeIn delay={140}>
            <div className="mt-6 max-w-3xl space-y-4 rounded-xl border border-[var(--divider)] bg-[var(--bg-elevated)] p-6 text-sm leading-relaxed text-[var(--text-muted)]">
              <p>
                <span className="font-semibold text-[var(--text-primary)]">
                  Two of those checks exist because nothing afterward would catch the
                  mistake.
                </span>{" "}
                The weights have to add up to exactly one, in the whole-number form
                clients actually compute in rather than in the algebra. If they add up to
                more, the protocol pays out more at every block than was collected,
                permanently, and because every client computes the same excess no
                disagreement between them signals the error. And the window has to be at
                least one block long. If it is zero, the miner share is withheld at every
                block and never paid, silently. Both are correctable only by another hard
                fork, which is why a client has to refuse to start rather than proceed.
              </p>
              <p>
                <span className="font-semibold text-[var(--text-primary)]">
                  The arithmetic is specified too, and that is not fussiness.
                </span>{" "}
                Each block&rsquo;s payment passes through two successive rounding steps,
                in that order, and a client that folds them into one keeps more of the
                remainder and computes a different amount. Both versions are internally
                consistent and neither reports an error, so the disagreement would surface
                as a chain split at the first block where they differ. Test vectors have to
                be chosen at inputs where the two forms actually diverge, because a vector
                where they agree proves nothing at all. The order things are added in, by
                contrast, cannot cause a split, and an earlier revision that named it as
                the main risk was corrected: pointing the tests at the one property that
                cannot break is worse than not naming a property.
              </p>
              <p>
                What rounding leaves over is destroyed rather than credited to either
                side, because the base fee was already taken from the sender when the
                transaction ran. The amount is at most one of the smallest units of ETC
                for each block in the window, which is negligible at any plausible window
                length. It is a real effect on the total supply, though, so it is stated
                rather than left to be discovered.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="mt-6 max-w-3xl space-y-4 rounded-xl border border-[var(--divider)] bg-[var(--bg-surface)] p-6 text-sm leading-relaxed text-[var(--text-muted)]">
              <p>
                <span className="font-semibold text-[var(--text-primary)]">
                  How long the window should be has to be argued, and three
                  constraints bear on it simultaneously.
                </span>{" "}
                A window shorter than the depth reorganizations plausibly reach means a
                reorganization rewrites payments already made. A much longer one smooths
                better, but it delays revenue and widens the ramp at activation, and it is
                re-evaluated at every block by every validating node forever, which
                lengthens the time to sync a chain from scratch. So the cost a proposed
                window implies has to be measured rather than estimated, and the trade has
                to be made deliberately instead of by attending to one side of it.
              </p>
              <p>
                <span className="font-semibold text-[var(--text-primary)]">
                  The third argument is the one the first step cannot settle, and
                  that limit is worth stating plainly.
                </span>{" "}
                Paying revenue forward at the consensus layer gives whoever produces a
                block a reason to reorganize one in order to capture a windfall landing
                on it, and that reason is strongest when the payment is concentrated
                across few blocks. Nothing like it arises under the first step, where
                every payment is a governance-approved withdrawal rather than a credit
                attached to producing a block, so no windfall rides on any particular
                block and a reorganization has nothing to take. That is structural rather
                than fortunate, which is precisely why running the first step cannot
                produce evidence about it. So a window that behaved well there is not
                thereby shown safe here, whoever proposes one has to argue this on its
                own terms, and it pulls toward a longer window, with the depth argument
                and against the validation cost.
              </p>
              <p>
                The comparison also needs a conversion that is easy to skip. The
                chain-selection defense that comes back on at this upgrade measures the
                elapsed time of a competing segment rather than a number of blocks, and
                converting one into the other depends on block times that are neither
                fixed nor evenly spread. The conversion, and the period it was measured
                over, both have to be published alongside whatever window is proposed. So
                does the evidence: a chain does not record the segments it displaced
                beyond a depth of one, so the client and explorer records relied on have
                to be cited, and the stretch during which that defense was switched off
                has to be told apart from the stretch it was active.
              </p>
              <p>
                One last mechanical detail, because its absence would double-pay. For the
                length of one window after activation, the payment ramps up from nothing,
                since blocks mined before the fork scheduled nothing forward. Reading
                their real revenue into the curve would pay the same money out to
                miners that the Treasury already received.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={260}>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-[var(--text-muted)]">
              The first of these steps is a governance activation and the second is a
              hard fork, which is the distinction the roadmap is most often read past.{" "}
              <Link
                href="/overview#the-five-stages"
                className="font-medium text-[var(--brand-green)] transition hover:opacity-80"
              >
                The five stages
              </Link>{" "}
              shows which is which, and{" "}
              <Link
                href="/overview/what-ships"
                className="font-medium text-[var(--brand-green)] transition hover:opacity-80"
              >
                what ships at the fork
              </Link>{" "}
              covers the first one.
            </p>
          </FadeIn>
        </div>
      </section>
    </OverviewTopicPage>
  );
}
