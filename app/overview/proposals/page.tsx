import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { OverviewTopicPage } from "@/components/sections/OverviewTopicPage";
import {
  overviewTopic,
  overviewTopicMetadata,
  sectionId,
  topicSection,
} from "@/lib/overview-topics";

export const metadata = overviewTopicMetadata("proposals");

/**
 * `/overview/proposals` — who decides how the money is spent. ECIP-1113 for the
 * governance architecture and the voting token, ECIP-1114 for the proposal
 * process that runs through it.
 *
 * Written against ECIPs `local-edits` @ 3f3453e. Five claims here are the ones
 * a paraphrase loses, so each is stated the way the specs state it:
 *
 *  - There is NO Executor contract. Execution is the Timelock's own
 *    `execute()`/`executeBatch()`, and the Governor is the only account that
 *    may call either (ECIP-1113 §"Specification", §1.3, §1.4).
 *  - Submission is permissionless SUBJECT TO the proposal threshold. At zero
 *    any account may author; above zero only a core contributor may, and
 *    ECIP-1113 §2 requires the value to be a stated decision rather than a
 *    default. An unqualified "any ETC account can submit" asserts a parameter
 *    nobody has set (ECIP-1114 §"OFP Lifecycle" step 1).
 *  - The approval rule is a property of the vote-counting module, not a
 *    settable percentage. A supermajority requires a different Governor with
 *    its own audit (ECIP-1113 §"Governance Parameter Invariants").
 *  - The Registry is the standard route, not a chokepoint. What a direct
 *    proposal skips is the audit trail, not the vote, the delay or the
 *    execution screen, and the norm that fills the gap is enforced by voters
 *    rather than by a contract (ECIP-1114 §"Specification").
 *  - Quorum percentages at the bootstrap population size are not a
 *    cryptoeconomic guarantee, and ECIP-1113 §1.2 says they SHOULD NOT be
 *    described as one. The security property is public accountability of named
 *    contributors.
 *
 * The permanence boundary, the deployment admin window and the "nothing here
 * enforces itself" disclaimer are `/overview/treasury`'s and are linked rather
 * than paraphrased a second time.
 */

const topic = overviewTopic("proposals");
/** Heading and anchor for the nth section, read from the single source. */
const H = (n: number) => topicSection(topic, n);
const S = (n: number) => sectionId(H(n));

/** ECIP-1113 §1.2's property table, in plain language. Each closes one attack. */
const coreNftProperties = [
  {
    property: "It cannot be transferred",
    closes: "Buying a seat, or any market forming in them",
  },
  {
    property: "The vote cannot be lent or delegated",
    closes: "Renting influence while keeping the token",
  },
  {
    property: "One vote per address, however many exist",
    closes: "Accumulating until one holder outweighs the rest",
  },
  {
    property: "Only a passed proposal can create one",
    closes: "Any single account handing out seats",
  },
];

/** ECIP-1113 §2 and §8. What an Olympia Improvement Proposal may not do. */
const outOfReach = [
  {
    title: "The fee rule and the permanent contract",
    body: "No proposal can amend the consensus rule that creates the base fee, or change the contract consensus credits. Both take a hard fork, which is a decision for everyone running a node rather than for the people holding a vote.",
  },
  {
    title: "Turning the safeguards off",
    body: "Quorum, the proposal threshold and the delays cannot be set to zero, voting cannot be disabled, and no contract may be swapped for another behind the same address. A proposal attempting any of it is invalid on its face.",
  },
  {
    title: "Creating an owner",
    body: "No owner-only function, no privileged multisig and no standing committee. Nothing outside the process may approve or veto what comes through it, and no emergency route skips the public queue.",
  },
  {
    title: "Changing the bar for approval",
    body: "How votes are counted is a property of the module that counts them, not a dial. Requiring a supermajority for anything means a different Governor, audited on its own terms, rather than a number somebody edits.",
  },
];

export default function ProposalsPage() {
  return (
    <OverviewTopicPage slug="proposals">
      {/* 1. Who can propose */}
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
                Asking for money is deliberately open. There is no application, no
                committee to get past, no affiliation to declare and nobody who can
                decline to put a request in front of the vote. A proposal names who is to
                be paid, how much, and where to read the case being made.
              </p>
              <p>
                <span className="font-semibold text-[var(--text-primary)]">
                  One setting decides how far open goes.
                </span>{" "}
                The Governor carries a proposal threshold, a minimum amount of voting
                power an author has to hold. Left at zero, any account on Ethereum Classic
                can author a proposal. Set above zero, authorship narrows to core
                contributors, because voting power comes from one place and nowhere else.
                It is the only anti-spam control the specification requires, so the value
                has to be chosen deliberately rather than inherited from a default, and it
                is a governance decision like any other.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={80}>
            <div className="mt-8 max-w-3xl space-y-4 rounded-xl border border-[var(--divider)] bg-[var(--bg-elevated)] p-6 text-sm leading-relaxed text-[var(--text-muted)]">
              <p>
                <span className="font-semibold text-[var(--text-primary)]">
                  What a proposal is bound to, and why it cannot be edited afterward.
                </span>{" "}
                The recipient, the amount and a fingerprint of the supporting document are
                folded into the proposal&rsquo;s own identifier. Change any of them and it
                becomes a different proposal with a different identifier, so what voters
                read is provably what executes. Revising is possible only before
                submission; afterward it means withdrawing and starting again.
              </p>
              <p>
                The document itself says whether the work is already finished or is being
                asked for in advance, and carries the evidence either way. It lives at a
                content address rather than a link somebody controls, so it cannot be
                quietly rewritten between the vote and the payment.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={140}>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-[var(--divider)] bg-[var(--bg-surface)] p-5">
                <p className="text-sm font-semibold">
                  A standard route, and not a chokepoint
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  Proposals normally arrive through a registry that records them and binds
                  the metadata. Nothing forces that, and a proposal can be put straight to
                  the Governor instead. It then faces the identical delay, voting period,
                  quorum, approval rule and execution screen. What it skips is the audit
                  trail: no registry record, no bound document for voters to check. Voters
                  are expected to reject a Treasury proposal that arrives without one,
                  which is a norm they enforce by voting rather than a rule a contract
                  applies.
                </p>
              </div>
              <div className="rounded-xl border border-[var(--divider)] bg-[var(--bg-surface)] p-5">
                <p className="text-sm font-semibold">Authorship has to be claimed</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  A proposal is identified by its contents, all of which are public before
                  it is submitted. Somebody watching could copy it word for word and
                  submit it first, becoming its recorded author and acquiring the right to
                  withdraw it repeatedly. The defense is one line at the end of the
                  document naming the intended author, which locks the proposal to that
                  address. It is opt-in and silent when malformed, so it is written as a
                  requirement rather than a convention.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* 2. Who votes */}
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
                Core contributors, and one vote each. The vote is carried by a token that
                is minted to a contributor and can never leave them: it cannot be sold,
                lent, pooled or delegated, and holding two of them would still be one
                vote. There is no second token, and no fungible or purchasable Olympia
                token exists at all, so there is nothing on which a market in votes could
                form.
              </p>
              <p>
                <span className="font-semibold text-[var(--text-primary)]">
                  A seat is earned and cannot be bought.
                </span>{" "}
                It is minted on evidence of contribution to Ethereum Classic and on
                nothing else. No amount of capital admits anyone, and no holder can pass
                one on. Every admission is a proposal that passed, with the evidence
                attached where anyone can inspect it afterward.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={80}>
            <div className="mt-8 overflow-x-auto rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)]">
              <table className="w-full min-w-[34rem] text-left text-sm">
                <caption className="sr-only">
                  Each property of the contributor token, and the attack it forecloses
                </caption>
                <thead>
                  <tr className="border-b border-[var(--border-default)]">
                    <th
                      scope="col"
                      className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]"
                    >
                      The property
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]"
                    >
                      What it rules out
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {coreNftProperties.map((row) => (
                    <tr
                      key={row.property}
                      className="border-b border-[var(--border-default)] last:border-0"
                    >
                      <th
                        scope="row"
                        className="px-4 py-3 text-left font-semibold text-[var(--text-primary)]"
                      >
                        {row.property}
                      </th>
                      <td className="px-4 py-3 text-[var(--text-muted)]">{row.closes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>

          <FadeIn delay={140}>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-[var(--divider)] bg-[var(--bg-surface)] p-5">
                <p className="text-sm font-semibold">Nobody has to identify themselves</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  No identity check is required and none may be imposed. The work is what
                  is being judged, and merged changes, published research and operated
                  infrastructure are all public and attributable without knowing who did
                  them. A pseudonymous contributor holds a seat on exactly the same terms
                  as a named one.
                </p>
              </div>
              <div className="rounded-xl border border-[var(--divider)] bg-[var(--bg-surface)] p-5">
                <p className="text-sm font-semibold">What counts as a contribution</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  Substantial and good for the network. Client and specification work,
                  security research and disclosure, running infrastructure, documentation
                  and sustained review all qualify, so it is not only code. Typo and
                  dependency-bump volume does not, and attacking the network or its users
                  disqualifies rather than being averaged against a good record.
                </p>
              </div>
              <div className="rounded-xl border border-[var(--divider)] bg-[var(--bg-surface)] p-5">
                <p className="text-sm font-semibold">Leaving, and being asked to leave</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  A contributor can surrender their seat at any time without permission or
                  a reason. The DAO can revoke one by proposal, on the same footing as
                  admission and for conduct that would have disqualified the holder in the
                  first place. Neither reaches backward into a vote already cast, and a
                  former contributor can be admitted again later.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="mt-6 max-w-3xl space-y-4 rounded-xl border border-[var(--divider)] bg-[var(--bg-elevated)] p-6 text-sm leading-relaxed text-[var(--text-muted)]">
              <p>
                <span className="font-semibold text-[var(--text-primary)]">
                  How many seats there are is not fixed, and the honest reading of that
                  matters.
                </span>{" "}
                Membership is expected to grow, and the quorum a proposal needs is a
                fraction of the whole, so it rises automatically as contributors are
                admitted. The cost is that each admission slightly dilutes everyone
                already there, and nothing caps it. What holds it in check is that
                admitting anyone is itself a public proposal.
              </p>
              <p>
                The starting set is minted from a list published before the contracts are
                deployed, against a single verifiable criterion: contribution to the
                Olympia specifications or to the client implementations that carry them.
                It is narrower than the ongoing test on purpose, because at the beginning
                there is no membership to judge admissions.{" "}
                <span className="font-semibold text-[var(--text-primary)]">
                  At that size a quorum percentage is not much of a guarantee
                </span>{" "}
                and should not be presented as one. What is actually load bearing early on
                is that the contributors are named, their work is checkable, and every
                vote they cast is on the public record.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={260}>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-[var(--text-muted)]">
              Deciding is restricted. Informing the decision is not: the prediction markets
              that price a proposal are open to anyone holding ETC, with no seat and no
              application.{" "}
              <Link
                href="/overview/prediction-markets"
                className="font-medium text-[var(--brand-green)] transition hover:opacity-80"
              >
                What stops it being captured
              </Link>
              .
            </p>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* 3. How a proposal becomes a payment */}
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
                Four steps, all on-chain, none of which anyone can skip. A proposal waits
                before voting opens, is voted on for a fixed window, sits in a public queue
                for a delay, and is then carried out exactly as it was approved. Every one
                of those durations is a governance setting, and the specification forbids
                setting any of them to zero.
              </p>
              <p>
                <span className="font-semibold text-[var(--text-primary)]">
                  There is no separate execution contract, and nothing that could turn into
                  one.
                </span>{" "}
                The Treasury carries out operations itself, and exactly one account is
                permitted to tell it to: the Governor. That is what makes the compliance
                screen unavoidable rather than customary, because every payment that
                leaves passes through the same account, whatever route the proposal took to
                get there.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={80}>
            <ol className="mt-8 list-none space-y-4 p-0">
              {[
                {
                  n: "01",
                  title: "Submit",
                  body: "The proposal is created and voting has not opened yet. That delay is deliberate: it gives everyone a window to read the proposal and check the document it is bound to before a single vote can be cast.",
                },
                {
                  n: "02",
                  title: "Vote",
                  body: "For, against or abstain, one vote each, for a fixed period. Voting power comes from a snapshot rather than being read live, so admitting or revoking a contributor mid-vote cannot rewrite a tally in flight. A proposal that reaches quorum only near the deadline extends it, so a late surge cannot close the window before anyone can answer it.",
                },
                {
                  n: "03",
                  title: "Queue",
                  body: "An approved proposal is scheduled and waits. The operation is public for the whole delay, which is the point of it: anyone can see what is about to happen, and a counter-proposal can cancel it before it does.",
                },
                {
                  n: "04",
                  title: "Execute",
                  body: "The Governor screens every address the operation is directed at, and then the Treasury pays. The operation runs exactly as queued, in full or not at all, with nothing inserted between approval and release. What it leaves behind is a permanent public record, joinable to the proposal that authorized it and to the vote that carried it.",
                },
              ].map((step, i) => (
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

          <FadeIn delay={160}>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-[var(--divider)] bg-[var(--bg-surface)] p-5">
                <p className="text-sm font-semibold">Passing is a strict majority, not a setting</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  More for than against, with abstentions counting toward whether enough
                  people turned out and toward nothing else. That rule belongs to the
                  module that counts the votes, so unlike quorum and the delays it is not
                  a number governance can raise. Requiring a supermajority for anything
                  would mean deploying a different Governor and auditing it.
                </p>
              </div>
              <div className="rounded-xl border border-[var(--divider)] bg-[var(--bg-surface)] p-5">
                <p className="text-sm font-semibold">Withdrawing, and being stopped</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  An author can withdraw their own proposal at any stage, including after
                  voting opens, and nobody else holds that power over it.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  Separately, a queued operation can be cancelled by a proposal that
                  passes. That is what gives governance any way at all to stop something
                  already approved, and without it an approved proposal would simply be
                  unstoppable.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={220}>
            <p className="mt-6">
              <a
                href="https://app.olympiadao.org"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-[var(--brand-green)] transition-opacity duration-200 hover:opacity-70"
              >
                See proposals and votes in the governance app
                <ArrowRight
                  size={14}
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </a>
            </p>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* 4. Funding work that is already done */}
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
                A proposal comes in one of two forms, and it has to say which. In the
                preferred one the work is finished and independently checkable before
                anyone votes, so contributors are paid for what they delivered rather than
                for what they promised.
              </p>
              <p>
                <span className="font-semibold text-[var(--text-primary)]">
                  Paying afterward removes a problem instead of managing it.
                </span>{" "}
                Funding a plan asks voters to price an undertaking, and every control that
                follows exists to cover the gap between what was promised and what
                arrives. Funding finished work has no such gap: it can be inspected at the
                moment of the vote, a proposal that overstates its own value is refuted by
                the evidence attached to it, and non-delivery costs the Treasury nothing
                because nothing was paid out. It also asks the easier question. Recognizing
                which work turned out to be useful is something a distributed group does
                well; forecasting which team will succeed is not.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={80}>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-[var(--border-brand)] bg-[var(--brand-green-subtle)] p-5">
                <p className="text-sm font-semibold">Finished work, the preferred form</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                  The proposal carries evidence rather than a plan: merged changes, a
                  published audit, or a service that has been running long enough to have
                  a usage record.
                </p>
              </div>
              <div className="rounded-xl border border-[var(--divider)] bg-[var(--bg-elevated)] p-5">
                <p className="text-sm font-semibold">Work paid for in advance</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  Still available, and it has to say why the work cannot reasonably be
                  delivered first. Some genuinely cannot: a third-party audit and
                  infrastructure that has to be paid for before it can run both cost money
                  up front, and sustained work is not something every contributor can
                  self-finance. Payment should be structured against verified milestones
                  rather than handed over in one piece.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={140}>
            <div className="mt-6 max-w-3xl space-y-4 rounded-xl border border-[var(--divider)] bg-[var(--bg-surface)] p-6 text-sm leading-relaxed text-[var(--text-muted)]">
              <p>
                <span className="font-semibold text-[var(--text-primary)]">
                  Two things are easy to get backwards, in opposite directions.
                </span>{" "}
                Finished work creates no claim on the Treasury. A proposal for completed
                work can be declined like any other, and doing the work confers no
                entitlement to be paid for it.
              </p>
              <p>
                And the preference is a norm rather than a rule in code. Nothing on-chain
                tells the two forms apart, both reach the Treasury by the same route, and
                voters enforce the preference by how they vote. The reason it is not
                absolute is real: paying only in arrears asks contributors to carry the
                cost and the risk of rejection, which favors whoever can afford to work
                unpaid.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-[var(--text-muted)]">
              The pattern is established rather than novel. Optimism&rsquo;s Retro Funding
              runs it at treasury scale through elected evaluators and explicit impact
              measures, and Base&rsquo;s Builder Grants run it as small frequent awards for
              work already shipped, with no application at all. Olympia sits nearer the
              first, since its evaluators are the contributors themselves and every payment
              passes through a public on-chain pipeline.{" "}
              <Link
                href="/governance"
                className="font-medium text-[var(--brand-green)] transition hover:opacity-80"
              >
                What the DAO funds, and why
              </Link>
              .
            </p>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* 5. What a vote cannot change */}
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
              Governance changes almost everything beneath it, and that is the design: the
              Governor, the Treasury, the voting model and the compliance oracle are all
              replaceable by ordinary proposal, with no fork and nobody&rsquo;s permission.
              Four things sit outside that reach.
            </p>
          </FadeIn>

          <FadeIn delay={80}>
            <ul className="mt-8 grid list-none gap-4 p-0 sm:grid-cols-2">
              {outOfReach.map((item) => (
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
            <div className="mt-6 max-w-3xl rounded-xl border border-[var(--divider)] bg-[var(--bg-surface)] p-6">
              <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                <span className="font-semibold text-[var(--text-primary)]">
                  The last three of those are maintained rather than enforced, and saying
                  otherwise would be the one dishonest sentence on this page.
                </span>{" "}
                They are established when the contracts are deployed, published so anyone
                can check them, and kept in place by governance afterward. What actually
                stands between a hostile proposal and the money is the ordinary machinery:
                a vote it has to win, a public queue it has to sit in, and a
                counter-proposal that can cancel it in the meantime.{" "}
                <Link
                  href="/overview/treasury#who-owns-it"
                  className="font-medium text-[var(--brand-green)] transition hover:opacity-80"
                >
                  Who owns the Treasury
                </Link>{" "}
                says the same thing about the permissions on the contract that holds the
                money.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={220}>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-[var(--text-muted)]">
              One limit is not about governance at all. Some addresses cannot be paid,
              whatever a proposal says, and the check runs at the moment the money leaves.{" "}
              <Link
                href="/overview/eligibility"
                className="font-medium text-[var(--brand-green)] transition hover:opacity-80"
              >
                Who cannot receive it
              </Link>
              .
            </p>
          </FadeIn>
        </div>
      </section>
    </OverviewTopicPage>
  );
}
