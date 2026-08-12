import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { OverviewTopicPage } from "@/components/sections/OverviewTopicPage";
import {
  overviewTopic,
  overviewTopicMetadata,
  sectionId,
  topicSection,
} from "@/lib/overview-topics";

export const metadata = overviewTopicMetadata("eligibility");

/**
 * `/overview/eligibility` — who cannot receive Treasury funds. ECIP-1119, which
 * is the sanctions specification for the whole Olympia suite rather than for
 * one contract in it.
 *
 * Written against ECIPs `local-edits` @ 3f3453e. This page is where the site
 * has historically overclaimed, so five bounds are load-bearing:
 *
 *  - Coverage stops at the Treasury path, and that is stated as a SCOPE claim,
 *    never as a deployment status. ECIP-1119 §"Every Checkpoint Traced" removed
 *    its own deployment-status column on purpose: "a specification that reports
 *    which contracts exist is wrong from whenever it is next read". So do not
 *    write that checkpoints 3 and 4 name contracts nobody has written. Write
 *    that each is satisfied when its contract is deployed carrying the rule and
 *    an audit confirms it.
 *  - A code-bearing target is SCREENED, never "exactly screened". ECIP-1119
 *    §"Checkpoints" forbids the second phrasing in terms.
 *  - The guarantee is over RECEIPT, not participation. A sanctioned address can
 *    still author a proposal, because proposing is public. §Rationale says this
 *    MUST NOT be described as covering both.
 *  - The submission screen is skippable and no guarantee rests on it. Calling
 *    it a second barrier "would overstate the control by exactly the amount a
 *    single direct propose() call removes" (§Security Considerations).
 *  - There is no Executor contract. The binding check is an override inside the
 *    Governor, and it binds because the Governor alone may trigger the Treasury.
 *
 * `.local/olympia/framework/diagrams.md` §5 is HALF-corrected: its diagram body
 * and gap table track this SHA, but its opening line still says two checkpoints
 * "bind contracts nobody has written". That half was not lifted.
 */

const topic = overviewTopic("eligibility");
/** Heading and anchor for the nth section, read from the single source. */
const H = (n: number) => topicSection(topic, n);
const S = (n: number) => sectionId(H(n));

/**
 * ECIP-1119 §"Checkpoints", by what each one covers rather than by whether it
 * exists yet. The `binding` flag drives the badge, and it is the specification's
 * own word: checkpoint 1 is advisory, 2 is binding, 3 and 4 are binding within
 * the contracts that hold the funds at that point.
 */
const checkpoints = [
  {
    n: "1",
    where: "When a proposal is submitted",
    scope: "The proposal registry, against the named recipient",
    binding: false,
    badge: "Advisory",
    note: "Skippable by design, because a proposal can be put straight to the Governor instead. Worth having so voters do not spend a fortnight on something that cannot execute, and nothing rests on it.",
  },
  {
    n: "2",
    where: "When the money leaves",
    scope: "The Governor, against every outward address in the operation",
    binding: true,
    badge: "Binding",
    note: "Unavoidable. One account is able to tell the Treasury to pay, and this check runs inside that account, so every release passes through here whatever route its proposal took.",
  },
  {
    n: "3",
    where: "Every time a stream pays out",
    scope: "The milestone-gated streaming contract",
    binding: false,
    badge: "Onward custody",
    note: "Binding inside that contract, and satisfied when it is deployed carrying the rule and an audit confirms it. Written as a property of the contract rather than a list of its functions, because an earlier list missed a real path.",
  },
  {
    n: "4",
    where: "Every admission and every redemption",
    scope: "A Affiliated DAO's own vault and promotion path",
    binding: false,
    badge: "Onward custody",
    note: "Same condition, and the reference is held under that Affiliated DAO's own governance rather than Olympia's, so an Affiliated DAO applying a different sanctions list has to disclose that it is doing so.",
  },
];

export default function EligibilityPage() {
  return (
    <OverviewTopicPage slug="eligibility">
      {/* 1. Why the check exists */}
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
                People who take part in Ethereum Classic are subject to sanctions law
                wherever they live, and no design choice inside a protocol changes that.
                Olympia pays money to named recipients, and the people voting those
                payments through are the ones the obligation attaches to. So the network
                needs a real working control rather than a symbolic one.
              </p>
              <p>
                <span className="font-semibold text-[var(--text-primary)]">
                  The obvious counterargument does not reach this design.
                </span>{" "}
                A US federal appeals court held in 2024 that an immutable smart contract
                is not the kind of property that can be sanctioned, and the sanction on
                the contract at issue was lifted the following March. That reasoning turns
                on the immutability of the specific contract, and everything Olympia
                governs is replaceable by ordinary proposal. A separate case established
                that a group governing a protocol by vote can itself be treated as an
                entity carrying obligations. Both point the same way.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={80}>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-[var(--divider)] bg-[var(--bg-elevated)] p-5">
                <p className="text-sm font-semibold">It cannot touch the audited code</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  The Governor and the Treasury are widely reviewed off-the-shelf
                  contracts, and threading compliance logic through their internals would
                  throw that away. The check hangs off an extension point those contracts
                  publish for the purpose, so nothing audited is edited.
                </p>
              </div>
              <div className="rounded-xl border border-[var(--divider)] bg-[var(--bg-elevated)] p-5">
                <p className="text-sm font-semibold">It cannot hold up the deployment</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  The list is a separate contract the Treasury attaches later, rather than
                  something baked into the others when they are built. It can be designed,
                  audited and swapped on its own schedule, including after the fork, and
                  replacing it never means replacing anything else.
                </p>
              </div>
              <div className="rounded-xl border border-[var(--divider)] bg-[var(--bg-elevated)] p-5">
                <p className="text-sm font-semibold">It has to fail shut, not open</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  Until a list is attached, the Treasury cannot pay anybody at all. A
                  missing or broken list blocks payments rather than waving them through,
                  so the worst case is that nothing works rather than that everything does
                  unchecked.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* 2. The check that binds */}
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
                It sits inside the Governor and runs at the last possible moment, after
                the vote, after the queue, in the same transaction that releases the
                money. It reads every address the operation is directed at, and if any of
                them is on the list the whole thing reverts and nothing moves.
              </p>
              <p>
                <span className="font-semibold text-[var(--text-primary)]">
                  There is no way around it, and the reason is structural rather than
                  vigilant.
                </span>{" "}
                Exactly one account is permitted to tell the Treasury to pay, and the
                check lives inside that account. A proposal that skipped the registry
                still meets it. A proposal written by a core contributor meets it. There
                is no second executor, no administrator and no emergency path, so there is
                no route that reaches the money without passing through here.
              </p>
              <p>
                It also runs at release rather than at approval, which is the difference
                that matters in practice. Somebody who was clear when the proposal passed
                may be designated during the weeks of voting and delay that follow, and
                checking only at the start would pay them anyway.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={80}>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-[var(--divider)] bg-[var(--bg-surface)] p-5">
                <p className="text-sm font-semibold">
                  The general-purpose escape hatch is welded shut
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  The standard Governor ships with a recovery function that pays anything
                  to anyone, meant for retrieving tokens sent to it by mistake. Left in
                  place, a single proposal naming the Governor itself would pass the
                  screen and then pay an unscreened address. Olympia overrides it to fail.
                  Any replacement Governor has to carry that override too, or the check
                  above it guarantees nothing.
                </p>
              </div>
              <div className="rounded-xl border border-[var(--divider)] bg-[var(--bg-surface)] p-5">
                <p className="text-sm font-semibold">Two addresses are skipped, deliberately</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  The Governor and the Treasury themselves. An operation aimed at either is
                  the governance system configuring itself rather than paying anyone. It
                  also removes a way to lose everything: if the list ever named the
                  Governor, every proposal that could fix it would revert, and the Treasury
                  would be permanently unspendable with no fork able to repair it. The
                  contract additionally refuses to accept a list that flags either address.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={140}>
            <div className="mt-6 max-w-3xl space-y-4 rounded-xl border border-[var(--divider)] bg-[var(--bg-elevated)] p-6 text-sm leading-relaxed text-[var(--text-muted)]">
              <p>
                <span className="font-semibold text-[var(--text-primary)]">
                  What the check sees, stated as a condition rather than a promise.
                </span>{" "}
                For an ordinary payment, the address being screened is the address the
                money settles at, and there the screen is exact. That holds only while
                that address carries no code. A contract routes value onward by its own
                logic, and an ordinary account can carry a delegation that makes it behave
                like one, so neither is exactly screened and neither may be described that
                way. The saving grace is that the distinction is checkable rather than a
                matter of trust: a delegation is itself code, so the check can see that it
                is there.
              </p>
              <p>
                One case is deliberately not claimed against. An address that holds no code
                when it is paid can take on a delegation in a later block and forward the
                money afterward. Nothing here prevents that, and the guarantee is over the
                state at the moment of release, which is when the obligation attaches.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* 3. The other screens, and what they are worth */}
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
              There are four checkpoints in the specification, and they are not equally
              strong. Reading them as four layers of the same defense is the mistake this
              section exists to prevent.
            </p>
          </FadeIn>

          <FadeIn delay={80}>
            <ol className="mt-8 list-none space-y-4 p-0">
              {checkpoints.map((cp, i) => (
                <li key={cp.n}>
                  <FadeIn delay={i * 60}>
                    <div
                      className={
                        cp.binding
                          ? "rounded-xl border border-[var(--border-brand)] bg-[var(--bg-elevated)] p-5"
                          : "rounded-xl border border-[var(--divider)] bg-[var(--bg-elevated)] p-5"
                      }
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs text-[var(--text-subtle)]">
                          {cp.n}
                        </span>
                        <span className="text-sm font-semibold">{cp.where}</span>
                        <span
                          className={
                            cp.binding
                              ? "rounded-full border border-[var(--border-brand)] bg-[var(--bg-surface)] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[var(--brand-green)]"
                              : "rounded-full border border-[var(--border-default)] bg-[var(--bg-surface)] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]"
                          }
                        >
                          {cp.badge}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-[var(--text-secondary)]">{cp.scope}</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-muted)]">
                        {cp.note}
                      </p>
                    </div>
                  </FadeIn>
                </li>
              ))}
            </ol>
          </FadeIn>

          <FadeIn delay={180}>
            <div className="mt-8 max-w-3xl space-y-4 rounded-xl border border-[var(--border-brand)] bg-[var(--bg-surface)] p-6 text-sm leading-relaxed text-[var(--text-muted)]">
              <p>
                <span className="font-semibold text-[var(--text-primary)]">
                  Coverage stops at the Treasury path.
                </span>{" "}
                The first two checkpoints secure the money on its way out of the Treasury
                and nothing beyond that, and no claim here reaches further. The other two
                cover what happens to funds afterward, inside contracts that take custody
                once the Treasury has released, and each is satisfied when its contract is
                deployed carrying the rule and an audit confirms it. Anyone assessing the
                position should establish from the chain which of the four are actually
                running, rather than reading a four-row table as a description of what
                exists.
              </p>
              <p>
                The submission screen looks like a second barrier and is not one. Anyone
                with enough voting power can put a proposal straight to the Governor
                without touching the registry, so treating that screen as redundant cover
                overstates the control by exactly what a single direct proposal removes.
                It is also mistimed: submission comes before the voting delay, the voting
                period and the queue, so somebody designated during that stretch would
                pass it and be paid anyway. That is the whole reason the binding check
                lives at the other end.
              </p>
              <p>
                <span className="font-semibold text-[var(--text-primary)]">
                  Onward custody is the requirement it is easiest to miss.
                </span>{" "}
                Once the Treasury has paid a streaming contract, its guarantee is spent:
                that contract now holds the funds and releases them in tranches for months,
                against an address that can be designated at any point in between. A
                contract that takes custody of Treasury money inherits the obligation along
                with it, and satisfying the check at the moment the Treasury paid is not
                satisfying it.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={240}>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-[var(--text-muted)]">
              One thing is deliberately not screened: money returning to the Treasury.
              Reclaiming an unspent remainder is not a payment to a recipient, and
              screening it would mean that a list which ever named the Treasury would
              strand every reclaimable balance where governance could not reach it.
            </p>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* 4. Who keeps the list */}
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
                Every checkpoint consults a list, and somebody maintains that list. This is
                the one point of central control the rest of the design cannot remove, and
                it is disclosed rather than glossed. The rest of Olympia has no
                administrator; this part has one, with limits on what it can do.
              </p>
              <p>
                <span className="font-semibold text-[var(--text-primary)]">
                  Editing the list and deciding who may edit it are separated on purpose.
                </span>{" "}
                A new designation has to be reflected in hours, so routing every edit
                through a full governance cycle would produce a list that is stale rather
                than safe. Granting or withdrawing the ability to edit is not urgent, so
                that goes through the same proposal process as a Treasury payment. Handing
                over administrative control takes two steps and at least forty-eight hours,
                and the role cannot be abandoned in a way that leaves it permanently
                unassignable.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={80}>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-[var(--divider)] bg-[var(--bg-elevated)] p-5">
                <p className="text-sm font-semibold">A stale list looks exactly like a clean one</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  Failing shut catches a missing list, and it cannot catch a list that
                  simply stopped being updated: an address designated yesterday and an
                  address never designated both come back the same way. So the list
                  publishes when it was last updated, on-chain, and whoever operates it has
                  to disclose the source, the arrangement for polling it, and the lag actually
                  observed between the two.
                </p>
              </div>
              <div className="rounded-xl border border-[var(--divider)] bg-[var(--bg-elevated)] p-5">
                <p className="text-sm font-semibold">
                  The dangerous error leaves no trace
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  An address wrongly added blocks a payment, which is visible immediately
                  and corrected on the next update. An address that should have been added
                  and was not lets a payment through and leaves nothing behind. Failing
                  shut does not defend that direction, which is why the operating detail is
                  published rather than assumed.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={140}>
            <div className="mt-6 max-w-3xl space-y-4 rounded-xl border border-[var(--divider)] bg-[var(--bg-surface)] p-6 text-sm leading-relaxed text-[var(--text-muted)]">
              <p>
                <span className="font-semibold text-[var(--text-primary)]">
                  Being wrongly listed costs a payment, never the money.
                </span>{" "}
                No incorrect flag can send funds somewhere they should not go; it stops
                them going anywhere. The blast radius is wider than one payment, though,
                since a flagged stream beneficiary stalls every remaining instalment until
                the list is corrected. And there is no appeals process, because none is
                needed: the check is asked fresh every single time, so an address removed
                from a list is payable again on the next attempt with nothing to unwind.
              </p>
              <p>
                The interface is deliberately the one already in general use elsewhere, so
                any conforming list can be adopted without changing a contract, and the
                list may be run as a mirror of one published on another network. A mirror
                has to say which list it mirrors and must not be presented as equivalent
                to it.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* 5. What the check does not reach */}
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
            <div className="mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-[var(--text-muted)]">
              <p>
                The rule reaches the contracts Olympia deploys. It does not reach the
                third-party contracts underneath them, and pretending otherwise would be
                worse than the gap.
              </p>
              <p>
                <span className="font-semibold text-[var(--text-primary)]">
                  Stated plainly: a sanctioned address can trade in a prediction market and
                  redeem its own collateral, and no Olympia contract can stop it.
                </span>{" "}
                The collateral in those markets is held by a general-purpose contract
                nobody here deployed, and it was posted by the traders who own it. Claiming
                back your own money from a contract Olympia is not part of leaves nothing
                for Olympia to check. The same is true of a swap in a liquidity pool.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={80}>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-[var(--border-brand)] bg-[var(--brand-green-subtle)] p-5">
                <p className="text-sm font-semibold">What is actually guaranteed</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                  That no Treasury money, and no money held by a contract Olympia deployed,
                  reaches a sanctioned recipient. It is checked at the moment of every
                  release, whatever route the authorizing proposal took to get there.
                </p>
              </div>
              <div className="rounded-xl border border-[var(--divider)] bg-[var(--bg-elevated)] p-5">
                <p className="text-sm font-semibold">What is not</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  Anything happening in a permissionless contract Olympia does not control.
                  An Affiliated DAO wanting broader cover has to gate the edge it does control,
                  which is admission to its own vault, because the market itself is not
                  Olympia&rsquo;s to gate.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={140}>
            <div className="mt-6 max-w-3xl space-y-4 rounded-xl border border-[var(--divider)] bg-[var(--bg-surface)] p-6 text-sm leading-relaxed text-[var(--text-muted)]">
              <p>
                <span className="font-semibold text-[var(--text-primary)]">
                  A sanctioned address can still ask. It cannot be paid.
                </span>{" "}
                Putting a proposal forward is open to anyone, so nothing prevents one being
                authored from a designated address. The guarantee is about receiving money,
                not about taking part, and it must not be described as covering both.
              </p>
              <p>
                The check screens whoever receives value, and never a voter. There is no
                identity requirement anywhere in Olympia governance and none may be
                imposed. Identity checks appear in exactly one place, the optional legal
                wrapper that converts an already-approved payment to cash, and that is a
                property of the wrapper rather than of holding a vote.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-[var(--text-muted)]">
              Blocking addresses at the consensus layer was considered and rejected. It
              would take a hard fork, and it would stop a designated address transacting on
              Ethereum Classic at all, which is far wider than the obligation Olympia is
              answering.{" "}
              <Link
                href="/overview/prediction-markets"
                className="font-medium text-[var(--brand-green)] transition hover:opacity-80"
              >
                The markets this section is drawing a boundary around
              </Link>
              .
            </p>
          </FadeIn>
        </div>
      </section>
    </OverviewTopicPage>
  );
}
