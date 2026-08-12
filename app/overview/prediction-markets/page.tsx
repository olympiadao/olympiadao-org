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

export const metadata = overviewTopicMetadata("prediction-markets");

/**
 * `/overview/prediction-markets` — what stops the Treasury being captured.
 * ECIP-1117 for the futarchy Affiliated DAO, ECIP-1118 for how it is funded and for
 * milestone-gated payout.
 *
 * Written against ECIPs `local-edits` @ 3f3453e, and re-checked at db669af,
 * which landed mid-thread and left ECIP-1117 and ECIP-1118 byte-identical.
 *
 * Six claims here are the ones a paraphrase loses, and the first has already
 * shipped wrong on this site once:
 *
 *  - Futarchy INFORMS; it does not decide. Binding authority stays with the
 *    Governor, and a market result is "an input to a decision the membership
 *    still makes rather than a substitute for making it" (ECIP-1117 §"Why
 *    Coexistence Rather Than Replacement", and §"Relationship to ECIP-1113").
 *    "The higher-priced outcome wins" was live on this site and said the
 *    opposite. The market's own outcome is a price comparison; the funding
 *    decision is a vote.
 *  - No base fee reaches these contracts and none may be made to. The flow is
 *    the other way and it is indirect: activity generates base fee, which
 *    accumulates to the Treasury (ECIP-1117 §"This ECIP Receives No Base Fee",
 *    ECIP-1118 §"The Base-Fee Loop, Stated Precisely").
 *  - The Treasury is not the counterparty. Collateral is held by the
 *    third-party Conditional Token Framework, so there is no settlement vault
 *    and a per-market spending limit would bound nothing (ECIP-1117 §"Custody
 *    of Collateral").
 *  - A pro-rata exit against the Treasury is PROHIBITED, not merely absent
 *    (ECIP-1117 §"Exit Rights").
 *  - The depth floor binds at promotion, NOT for a market's lifetime, and
 *    ECIP-1117 §"Minimum Depth" forbids describing it as the latter in terms.
 *  - The disbursement contract's screen is a property of the contract rather
 *    than a list of its functions, and exactly two destinations are outside it:
 *    the Timelock and the Governor (ECIP-1118).
 *
 * Vocabulary trap, and it is specific to this page. ECIP-1117 has a share-based
 * **liquidity vault**, and ECIP-1112 names the permanent contract the **Olympia
 * Sovereignty Vault**. Two different things, one word, so a bare "the vault"
 * here is ambiguous in a way it is nowhere else. Every occurrence on this page
 * is qualified as the liquidity vault.
 *
 * The sanctions boundary is `/overview/eligibility`'s and the "deciding is
 * restricted, informing is not" line is `/overview/proposals`'s. Both are linked
 * rather than paraphrased a second time.
 */

const topic = overviewTopic("prediction-markets");
/** Heading and anchor for the nth section, read from the single source. */
const H = (n: number) => topicSection(topic, n);
const S = (n: number) => sectionId(H(n));

/** ECIP-1117's own values-versus-beliefs table, in plain language. */
const twoTracks = [
  {
    row: "Settled by",
    values: "Core contributors, and the result binds",
    beliefs: "Anyone, through what they are willing to pay",
  },
  {
    row: "Getting in",
    values: "Earned by contributing, and unavailable at any price",
    beliefs: "Open to anyone, and gated only by capital",
  },
  {
    row: "Why that way",
    values:
      "Spending revenue the network raised should rest with people accountable to it",
    beliefs:
      "Shutting out informed outsiders throws away the knowledge the mechanism exists to collect",
  },
];

/** ECIP-1117 §"Proposal Promotion" and §Resolution, as the four mechanical steps. */
const marketSteps = [
  {
    n: "01",
    title: "Open",
    body: "One transaction reads the current price of ETC, creates the two branches, opens a pool for each at that price, extends the price history each pool keeps far enough to cover the averaging window, and binds the contract that will resolve it. If any part fails, none of it happens. That is a security property rather than tidiness: a market opened across several transactions would leave a window in which a pool exists, carries a price and is watched by nothing.",
  },
  {
    n: "02",
    title: "Trade",
    body: "Both branches trade continuously and both prices are public the whole time. Anyone can take either side, and a position can be closed at any point rather than being locked in until the end.",
  },
  {
    n: "03",
    title: "Average",
    body: "At a deadline fixed when the market opened, the price of each branch is averaged across a set window instead of being read at an instant. That is what raises the cost of pushing a price around: a false price has to be held across the whole window, against everyone else who stands to profit from correcting it.",
  },
  {
    n: "04",
    title: "Compare",
    body: "The two averages are compared and the higher branch is recorded. There is no reporter, no bond, no challenge period and no vote, because the comparison is the resolution. Nothing is reported that anyone could dispute.",
  },
];

export default function PredictionMarketsPage() {
  return (
    <OverviewTopicPage slug="prediction-markets">
      {/* 1. Why a second track */}
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
                A vote answers two different questions at once, and it is only good at
                one of them. What the network should want is a question about values,
                and the people accountable to the network are the right ones to settle
                it. Which proposal actually gets there is a question about the world,
                and the answer usually depends on things known by people who hold no
                seat and have no particular reason to speak up.
              </p>
              <p>
                <span className="font-semibold text-[var(--text-primary)]">
                  A market pays for the second answer.
                </span>{" "}
                A position pays in proportion to being right and costs in proportion to
                being wrong, so doing the research stops being a favor to everyone else
                and becomes how a participant makes money. That is the whole of why a
                price carries information a poll does not. In a poll one more careful
                opinion changes nothing and conviction is free; in a market conviction
                costs capital, and someone with no interest in Ethereum Classic at all
                still contributes an accurate reading by trying to profit.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={80}>
            <div className="mt-8 overflow-x-auto rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)]">
              <table className="w-full min-w-[40rem] text-left text-sm">
                <caption className="sr-only">
                  How the two tracks divide: values are settled by contributors, beliefs
                  by anyone through prices
                </caption>
                <thead>
                  <tr className="border-b border-[var(--border-default)]">
                    <th scope="col" className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                      &nbsp;
                    </th>
                    <th scope="col" className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                      What outcome we want
                    </th>
                    <th scope="col" className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                      Which action gets there
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {twoTracks.map((row) => (
                    <tr
                      key={row.row}
                      className="border-b border-[var(--border-default)] align-top last:border-0"
                    >
                      <th
                        scope="row"
                        className="px-4 py-3 text-left font-semibold text-[var(--text-primary)]"
                      >
                        {row.row}
                      </th>
                      <td className="px-4 py-3 text-[var(--text-muted)]">{row.values}</td>
                      <td className="px-4 py-3 text-[var(--text-muted)]">{row.beliefs}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>

          <FadeIn delay={140}>
            <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-[var(--text-muted)]">
              <p>
                Restricting the first question is defensible. Restricting the second
                would defeat the purpose: someone who has never written a line of code
                may still know more than every contributor about whether a funding
                decision will work.
              </p>
              <p>
                <span className="font-semibold text-[var(--text-primary)]">
                  Both tracks run permanently, and neither is a stage on the way to the
                  other.
                </span>{" "}
                Markets aggregate beliefs well and express values badly, and the
                contributor vote does the reverse. Their weaknesses point in opposite
                directions, which is the reason for running both rather than a flaw in
                either: influence in a market is weighted by capital, which is exactly
                the plutocracy the contributor vote exists to avoid, while the
                contributor vote is blind to capital and therefore blind to what capital
                would have surfaced. Neither one corrects itself, and each corrects the
                other.
              </p>
              <p>
                It is worth being precise about what open access means here. Nobody can
                refuse a participant, which is not the same thing as every participant
                being able to afford to move a price.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-[var(--text-muted)]">
              Deciding is restricted. Informing the decision is not, and the seat that
              carries a vote is described in full on{" "}
              <Link
                href="/overview/proposals#who-votes"
                className="font-medium text-[var(--brand-green)] transition hover:opacity-80"
              >
                who votes
              </Link>
              .
            </p>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* 2. How a market prices a proposal */}
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
                A market here does not ask whether a proposal will pass. It asks what
                Ethereum Classic is worth under two futures: the proposal accepted, and
                the same proposal rejected. Both are priced at the same time, in the
                same unit, and the gap between them is the market&rsquo;s estimate of
                what the decision actually does. Asking whether it will pass would
                measure the governance process, not the decision&rsquo;s consequences.
              </p>
              <p>
                Depositing collateral splits it into two claims, one that pays out if
                the proposal is accepted and one that pays out if it is rejected. A
                separate pool trades each branch, and both open at the price ETC is
                trading at right then, so neither future starts with an advantage. The
                unit on the other side is Classic USD, a dollar-denominated token issued
                natively on Ethereum Classic rather than bridged in from another
                network. That matters because a bridged unit would put whatever risk the
                bridge carries inside the denominator of every market.
              </p>
              <p>
                <span className="font-semibold text-[var(--text-primary)]">
                  The measure has to be a price, and that is a constraint rather than a
                  preference.
                </span>{" "}
                The mechanism needs something whose payout follows the measure, and a
                pair of conditional claims is exactly that for a price. A market on a
                composite score can be built, and this is a dependency the design
                declines rather than something that cannot be done: it takes a market
                whose payout slides between fixed bounds and a reporter who states the
                measured value at the end. That reporter is the thing being refused.
                Resolution here reads two pool prices and reports the larger, so there
                is no route by which a reported number enters at all, and adopting
                treasury value, transaction counts, developer activity or share of
                hashrate would mean adopting the reporter, the dispute process and the
                bond along with it. Pricing ETC
                rather than a token of the DAO&rsquo;s own is the more principled choice
                too, because the objective is the health of the network and a separate
                token can rise while the network it funds does not. The cost of that
                choice stands and is stated rather than answered: a price is a proxy for
                a network&rsquo;s health, not a definition of it.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={80}>
            <ol className="mt-8 list-none space-y-4 p-0">
              {marketSteps.map((step, i) => (
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
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-[var(--divider)] bg-[var(--bg-surface)] p-5">
                <p className="text-sm font-semibold">Nothing feeds it a price</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  Branch prices stay tied to the real one without any oracle. Anyone can
                  turn one unit of collateral into one of each branch claim at any time,
                  and turn them back again. Any gap between the pair and the ordinary
                  price of the same asset is therefore something any holder can profit
                  from closing. There is no feed to attack, and resolution never depends
                  on a venue outside the chain that settles it.
                </p>
              </div>
              <div className="rounded-xl border border-[var(--divider)] bg-[var(--bg-surface)] p-5">
                <p className="text-sm font-semibold">
                  A price that cannot be read counts as a rejection
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  Never as an acceptance and never as a market stuck open, so an
                  unreadable market cannot jam the queue behind it. That safe answer is
                  itself an attack surface, since forcing a healthy market to look
                  unreadable would force a rejection. So the resolver has to tell a
                  genuinely unreadable pool from a deliberately starved read and refuse
                  the second, which the specification names as the single most likely
                  implementation mistake in that contract.
                </p>
              </div>
              <div className="rounded-xl border border-[var(--divider)] bg-[var(--bg-surface)] p-5">
                <p className="text-sm font-semibold">Depth is checked before it opens</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  A market is refused unless each branch pool holds a minimum amount,
                  checked per branch rather than across the total, because an attacker
                  only needs to move the cheaper of the two. The floor is fixed when the
                  contract is deployed and cannot be lowered while a market is running:
                  whoever could lower it could choose which markets are cheap to
                  manipulate. The timing parameters are fixed the same way and for the
                  same reason.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* 3. What a market result does, and what it does not */}
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
                <span className="font-semibold text-[var(--text-primary)]">
                  It informs the vote. It never replaces it.
                </span>{" "}
                A resolved market is published as an input to a decision the
                contributors still make, and authority over Treasury money stays exactly
                where it was. Nothing in a market can move a single unit out of the
                Treasury, and a profitable position is not an approval of anything.
              </p>
              <p>
                That is structural rather than a promise. The markets run as a child
                organization with its own rules: it holds no permission on the contract
                that holds the money, holds no key, and has no way to start a payment.
                When it needs funding it submits an ordinary proposal and faces the same
                waiting period, voting period, quorum, approval rule, public queue and
                compliance screen as anything else. There is no fast lane and no
                standing budget.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={80}>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-[var(--border-brand)] bg-[var(--brand-green-subtle)] p-5">
                <p className="text-sm font-semibold">What a result is</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                  A published comparison of two prices, produced by people with money at
                  stake, that contributors can read before they vote. On a decision large
                  enough to move the network&rsquo;s prospects, that is a better estimate
                  than a show of hands.
                </p>
              </div>
              <div className="rounded-xl border border-[var(--divider)] bg-[var(--bg-elevated)] p-5">
                <p className="text-sm font-semibold">What it is not</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  An instruction, an authorization, or a claim on any money. No contract
                  reads a market result and releases funds because of it, and there is no
                  route by which one could be added without replacing the Governor
                  through the ordinary process.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={140}>
            <div className="mt-6 max-w-3xl space-y-4 rounded-xl border border-[var(--divider)] bg-[var(--bg-elevated)] p-6 text-sm leading-relaxed text-[var(--text-muted)]">
              <p>
                <span className="font-semibold text-[var(--text-primary)]">
                  No base fee reaches these markets, and none may be made to.
                </span>{" "}
                Anyone finishing this page believing they are paid for out of protocol
                revenue has read it backwards. The base fee has exactly one destination
                and this is not it. What flows the other way is indirect and worth
                stating plainly: moving governance argument from forums into
                transactions produces activity, activity pays base fees, and those base
                fees accumulate in the Treasury like any others. Every step between is a
                separate human decision. No contract measures that loop, nothing is
                tuned by it, and no spending is triggered by it.
              </p>
              <p>
                <span className="font-semibold text-[var(--text-primary)]">
                  Nor is the Treasury the counterparty.
                </span>{" "}
                Collateral is held by a general-purpose contract that nobody in Olympia
                deployed, and it was posted by the traders and liquidity providers who
                own it. A market that goes badly costs its participants and not the
                Treasury. There is no settlement pot to drain, which is also why a
                per-market spending limit would bound nothing: there is nothing there to
                bound. The Treasury&rsquo;s entire exposure is the amount named in
                whichever infrastructure proposal it approved.
              </p>
              <p>
                <span className="font-semibold text-[var(--text-primary)]">
                  And no participant acquires a claim on the Treasury.
                </span>{" "}
                Disagreeing with an outcome means redeeming what you own: branch claims
                redeem once the condition resolves, and liquidity providers redeem their
                shares whenever they choose. The pro-rata exit some organizations offer,
                paying a departing holder a share of the treasury, is prohibited here
                rather than merely missing, and there would be nothing for it to operate
                on: a contributor seat is one vote rather than a proportional claim, and
                the collateral is ETC and Classic USD, which participants already hold
                and can already exit.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-[var(--divider)] bg-[var(--bg-surface)] p-5">
                <p className="text-sm font-semibold">Traders are charged nothing</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  No trading fee, no platform cut and no spread taken by an operator.
                  Public prediction venues typically charge a percentage of every trade,
                  and a fee widens spreads and degrades exactly the price discovery this
                  is being built for. Taxing the mechanism to pay for something already
                  funded would be the wrong trade.
                </p>
              </div>
              <div className="rounded-xl border border-[var(--divider)] bg-[var(--bg-surface)] p-5">
                <p className="text-sm font-semibold">
                  Liquidity comes from providers, not from the Treasury
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  Providers deposit into a liquidity vault and earn the ordinary pool
                  fees their liquidity generates, and they carry the risk of loss from
                  price movement that goes with it. There is no subsidy, no guaranteed
                  yield and no bond to be slashed. The Treasury may take part as one
                  provider among many where a proposal authorizes it, bounded by that
                  proposal, and such a proposal has to state the risk and cannot renew
                  automatically.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={260}>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-[var(--text-muted)]">
              One boundary is drawn elsewhere rather than restated here. A sanctioned
              address can trade a market and redeem its own collateral, because neither
              the pool nor the contract holding the collateral is Olympia&rsquo;s to
              gate. What is gated is the edge Olympia does control, which is admission
              to the liquidity vault it deploys.{" "}
              <Link
                href="/overview/eligibility#what-the-check-does-not-reach"
                className="font-medium text-[var(--brand-green)] transition hover:opacity-80"
              >
                What the check does not reach
              </Link>
              .
            </p>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* 4. Which decisions are worth a market */}
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
                Not every one, and this is where the design is most candid about itself.
                Ethereum Classic is large next to any single funding request, so for a
                routine grant the gap between the two branches may be smaller than the
                cost of trading it, leaving a market that is busy and says nothing.
                Running one below that point produces noise dressed as a signal, which
                is worse than running none. Ordinary funding proposals are meant to go
                through the vote alone.
              </p>
              <p>
                <span className="font-semibold text-[var(--text-primary)]">
                  Two different limits apply, and treating them as one understates the
                  constraint.
                </span>
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={80}>
            <dl className="mt-6 max-w-3xl space-y-4">
              <div className="rounded-xl border border-[var(--divider)] bg-[var(--bg-elevated)] p-5">
                <dt className="text-sm font-semibold text-[var(--text-primary)]">
                  How big the decision is, next to the network
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  A proposal too small to move the network&rsquo;s prospects leaves no
                  separation between the branches to measure. Nothing enforces this one:
                  it is a judgment about whether a market is worth opening, and only
                  judgment can make it.
                </dd>
              </div>
              <div className="rounded-xl border border-[var(--divider)] bg-[var(--bg-elevated)] p-5">
                <dt className="text-sm font-semibold text-[var(--text-primary)]">
                  How deep the venue is that it actually trades on
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  That venue is the two branch pools, not the market for ETC at large. A
                  decision big enough to separate the branches still cannot be priced on
                  a venue thin enough to push around cheaply. This one is enforced, by
                  the depth floor checked when a market opens.
                </dd>
              </div>
            </dl>
          </FadeIn>

          <FadeIn delay={140}>
            <div className="mt-6 max-w-3xl space-y-4 rounded-xl border border-[var(--divider)] bg-[var(--bg-surface)] p-6 text-sm leading-relaxed text-[var(--text-muted)]">
              <p>
                <span className="font-semibold text-[var(--text-primary)]">
                  Both of those argue for fewer markets, and one pressure runs the other
                  way that the specification deliberately leaves unresolved.
                </span>{" "}
                A venue draws a standing population of traders from the breadth of what
                it lists rather than from the quality of its aggregation, so one that
                lists too little has nobody present when the decision that matters
                arrives. Subjects are therefore not restricted to core-development
                topics, and the two constraints are set against each other on purpose.
              </p>
              <p>
                That choice widens the legal exposure rather than leaving it unchanged,
                and the specification says so instead of claiming a narrow scope it does
                not require. The prominent public prediction venues operating in the
                United States do so as registered contract markets, and registration is
                not a path available to a permissionless venue with no operator. So any
                deployment needs legal review of the subjects it intends to list, in the
                jurisdictions it intends to reach, and being technically permissionless
                is not a finding about legality in any jurisdiction.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="mt-8 max-w-3xl space-y-4 rounded-xl border border-[var(--divider)] bg-[var(--bg-elevated)] p-6 text-sm leading-relaxed text-[var(--text-muted)]">
              <p>
                <span className="font-semibold text-[var(--text-primary)]">
                  Depth is the security parameter of the whole mechanism, and the check
                  on it binds when a market opens rather than throughout.
                </span>{" "}
                The averaging window makes manipulation expensive, and how expensive
                depends on how deep the branch pools are. Liquidity that satisfied the
                floor at the start can be withdrawn afterward by the same provider who
                supplied it, because redemption is guaranteed to stay available at all
                times. Three mechanisms are admissible for closing that gap and each
                costs something, the choice depends on measured depth rather than on
                anything a specification can settle, and it has to be made before these
                contracts are deployed. What is ruled out is describing the floor as
                bounding the cost of manipulation for a market&rsquo;s lifetime when it
                bounds it at the start.
              </p>
              <p>
                Two consequences of that are worth being explicit about. Opening a
                market divides one pool of liquidity across two branches, so each branch
                is roughly half as deep as the venue was beforehand. And what bounds how
                secure any market here can be is the supply of the unit on the other
                side, Classic USD, rather than the market capitalization of ETC.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={260}>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-[var(--divider)] bg-[var(--bg-surface)] p-5">
                <p className="text-sm font-semibold">Positions are public</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  There is no privacy layer and none is required for the mechanism to
                  work, so a large position is visible before the market settles and can
                  be traded against. The averaging window is the main defense and it is
                  a partial one. Adding privacy later would fit the design, and is not
                  part of it.
                </p>
              </div>
              <div className="rounded-xl border border-[var(--divider)] bg-[var(--bg-surface)] p-5">
                <p className="text-sm font-semibold">
                  A contributor can hold a position and then vote
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  Nothing prevents it, and no control is written against it, because
                  every available one contradicts the design: restricting who may trade
                  needs the identity gate open access forbids, policing conduct needs a
                  venue operator nobody here is, and a blackout before a vote needs
                  authority over live markets that is deliberately not granted. The
                  exposure is written down instead of papered over.
                </p>
              </div>
              <div className="rounded-xl border border-[var(--divider)] bg-[var(--bg-surface)] p-5">
                <p className="text-sm font-semibold">Extra identities buy nothing</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  Taking part costs capital, so splitting into many addresses gains an
                  attacker no additional influence. The corollary is the trade this
                  mechanism makes on purpose: it resists identity multiplication and does
                  not resist concentrated capital.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={320}>
            <div className="mt-6 max-w-3xl space-y-4 rounded-xl border border-[var(--divider)] bg-[var(--bg-surface)] p-6 text-sm leading-relaxed text-[var(--text-muted)]">
              <p>
                <span className="font-semibold text-[var(--text-primary)]">
                  Two dependencies sit outside Olympia&rsquo;s reach, and both are
                  disclosed rather than solved.
                </span>{" "}
                Classic USD can be upgraded by its issuer and can be paused globally,
                which would halt every market priced in it at once. Neither is governed
                by Olympia, and the guarantee stops at the contracts Olympia deploys.
                That is a statement about who holds authority rather than about who wrote
                the code.
              </p>
              <p>
                The venue itself already exists: ETCswap V3 supplies the pools and the
                price history the resolver reads, at the same addresses on the test
                network and on mainnet, so a rehearsal runs against an identical
                surface. What the design also needs is a general-purpose
                conditional-token contract and a wrapper presenting its positions as
                ordinary tokens. Both are permissionless deployments requiring
                nobody&rsquo;s cooperation and depending on nothing else in Olympia,
                which is why this stage is a sequencing choice rather than a technical
                dependency.
              </p>
              <p>
                <span className="font-semibold text-[var(--text-primary)]">
                  And one readiness condition is not about contracts at all.
                </span>{" "}
                Because markets are priced in Classic USD, the supply of that token
                bounds how deep a branch pool can get and therefore what it costs to
                move one. The depth floor has to be set from depth measured on the
                network being deployed to, and both figures have to be re-measured when
                the decision is actually taken, because a number written into a document
                ages into a false statement about a live network. Anyone can check both.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* 5. Paying against delivery */}
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
                A market approval says a decision is expected to work. It does not say
                the work was done. Handing over the whole amount at once gives a
                recipient everything before anything has been verified, so any proposal
                may choose to be paid in instalments against delivery instead. It is not
                specific to markets, and it is available to any large or long-running
                proposal.
              </p>
              <p>
                The milestones, the share of the total each one carries, the condition
                that unlocks it and the method used to verify it are all written into the
                proposal before submission and folded into its identifier, so none of
                them can be renegotiated after the vote. The method has to be objective:
                a measurement taken on-chain, a published attestation such as a commit
                hash, or a report from an oracle. Sign-off at somebody&rsquo;s discretion
                is not allowed.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={80}>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-[var(--divider)] bg-[var(--bg-elevated)] p-5">
                <p className="text-sm font-semibold">
                  Governance can stop it, and only governance can
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  Cancelling a stream and reclaiming whatever has not been paid out yet
                  is an ordinary proposal, carrying the same quorum, the same vote and
                  the same delay as the payment it reverses. No key, committee or role
                  can cancel one on its own. The recipient sees it coming and the
                  community has time to object, which leaves the residual risk of a
                  determined majority that every governance action carries.
                </p>
              </div>
              <div className="rounded-xl border border-[var(--divider)] bg-[var(--bg-elevated)] p-5">
                <p className="text-sm font-semibold">
                  Why the paying contract screens too
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  The Governor screens once, when the stream is set up, and what it
                  screens is the contract being paid, because that is the address the
                  operation is directed at. The stream then runs for months from a
                  contract the Treasury no longer controls, and a recipient designated
                  the day after it was created would keep being paid on that single
                  earlier approval. A contract taking custody of Treasury money inherits
                  the obligation along with it.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={140}>
            <div className="mt-6 max-w-3xl space-y-4 rounded-xl border border-[var(--border-brand)] bg-[var(--brand-green-subtle)] p-6 text-sm leading-relaxed text-[var(--text-secondary)]">
              <p>
                <span className="font-semibold text-[var(--text-primary)]">
                  Every release is screened, on whatever path it takes.
                </span>{" "}
                The paying contract checks the sanctions list against whoever is about to
                receive value, every time it releases any, and refuses to operate at all
                if it has no list to check. That is written as a property of the contract
                rather than as a list of its functions, and the reason is a defect an
                earlier version actually had: the requirement named the milestone payment
                and its recipient, and a reclaim, which sends money somewhere else
                entirely on a different path, fell outside the list. A path added later
                inherits the obligation without anything being amended.
              </p>
              <p>
                So the destination a cancelling proposal names is screened at the moment
                the money moves, exactly as a milestone recipient is. A blocked release
                is not a cancellation: it reverts, the money stays unpaid, and if the
                address is delisted later the next release goes through, because the
                question is asked fresh every time rather than answered once.
              </p>
              <p>
                <span className="font-semibold text-[var(--text-primary)]">
                  One exclusion exists, and it is what keeps a reclaim from being
                  strandable.
                </span>{" "}
                Sending money back to the Treasury is a return rather than a payment to
                a recipient, so a return to the contract that holds the funds, or to the
                Governor, is not screened. Screening it would mean that a list naming the
                Treasury trapped every reclaimable balance in the contract holding it,
                out of reach of the governance that voted to reclaim it. The exclusion
                covers those two and nothing else, and a cancelling proposal naming any
                third party is screened as before.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-[var(--divider)] bg-[var(--bg-surface)] p-5">
                <p className="text-sm font-semibold">A vague milestone is a weak one</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  Fixing the verification method at submission stops it being
                  renegotiated. It does not make a loosely worded milestone checkable,
                  and reviewing the proposal before voting is where that has to be
                  caught rather than in the contract.
                </p>
              </div>
              <div className="rounded-xl border border-[var(--divider)] bg-[var(--bg-surface)] p-5">
                <p className="text-sm font-semibold">Nothing caps spending</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  There is no automatic limit and no circuit breaker, because the
                  contract holding the money keeps no accounts to run one from.
                  Instalments reduce what a single bad proposal costs to whatever was
                  already paid out. They do not make spending discipline a property of
                  the code, and saying otherwise would misdescribe the control.
                </p>
              </div>
              <div className="rounded-xl border border-[var(--divider)] bg-[var(--bg-surface)] p-5">
                <p className="text-sm font-semibold">
                  An audit attaches to code, not to a deployment
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  Instalment payment is the one place the suite reaches outside its
                  audited standard library, whose two vesting contracts pay out on a
                  clock and support neither cancellation nor milestone gating. Deploying
                  identical code carries the audit&rsquo;s findings about that code and
                  does not make the deployment audited. The settings it is deployed with
                  and the integration around it are where Olympia&rsquo;s own audit
                  requirement lands.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={260}>
            <div className="mt-6 max-w-3xl space-y-4 rounded-xl border border-[var(--divider)] bg-[var(--bg-elevated)] p-6 text-sm leading-relaxed text-[var(--text-muted)]">
              <p>
                <span className="font-semibold text-[var(--text-primary)]">
                  One more funding pattern belongs here, because it is easy to mistake
                  for a grant.
                </span>{" "}
                A market that settles on-chain cannot form at all until the venue it
                settles on has depth, and depth does not appear because a specification
                asked for it. So a proposal may have deployed liquidity as its
                deliverable rather than a payment to a contributor. Money deployed that
                way is a position and has to be described as one: it stays recoverable,
                net of price movement and of whatever the position has traded into,
                rather than being spent. Such a proposal has to name the withdrawal path
                and who may use it, has to be bounded, cannot renew itself, and has to
                state the risk.
              </p>
              <p>
                One limit on it is specific to the markets above. The Treasury must not
                end up the dominant supplier of liquidity in any pool whose price
                resolves a market, because that price is the thing the mechanism exists
                to learn from an independent venue. Seeding is meant to make a venue
                exist, not to make governance the counterparty its own decisions are
                priced against.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={320}>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-[var(--text-muted)]">
              Instalments are optional. Where the work is already finished and checkable
              before the vote there is no gap for milestones to close, and a single
              payment is the right shape.{" "}
              <Link
                href="/overview/proposals#funding-work-that-is-already-done"
                className="font-medium text-[var(--brand-green)] transition hover:opacity-80"
              >
                Funding work that is already done
              </Link>
              .
            </p>
          </FadeIn>
        </div>
      </section>
    </OverviewTopicPage>
  );
}
