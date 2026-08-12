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
import {
  BLOB_DEFERRED,
  BLOCKED_BY_DEPENDENCY,
  CLIENT_PARAMETERS,
  CORE_DEVS_REVIEW,
  EXECUTION_EIP_COUNT,
  EXECUTION_EIP_GROUPS,
  FEE_MARKET_EXCLUDED,
  GLAMSTERDAM_ADOPTED,
  NETWORKING_PROTOCOLS,
  PROOF_OF_STAKE_EXCLUDED,
} from "@/lib/olympia-eips";

export const metadata = overviewTopicMetadata("what-ships");

/**
 * `/overview/what-ships` — ECIP-1121 and ECIP-1122, the two specifications that
 * ship at the first hard fork without changing anything economic.
 *
 * Drafted against ECIPs `local-edits` @ `db669af` and re-checked at `7902fac`,
 * both read in full rather than trusting section numbers: ECIP-1121 was revised
 * twice after the brief for this page was written, once to widen the Stage 2
 * carve-out and once to rewrite the eth/69 row end to end.
 *
 * **`7902fac` landed mid-thread and reaches this page.** `ecip-1121.md` is
 * byte-identical across the move, so everything below drawn from it is
 * unaffected, and `t85-verify.py` asserts that rather than assuming it. What
 * changed is `ecip-1122.md`, whose implementation section now opens on "no
 * client implements this ECIP in full, and the parameters that are implemented
 * predate it". Nothing here reports which clients do what, and it deliberately
 * did not before either; what the revision falsified was the present tense in
 * "three values every Olympia client enforces", which is now written as the
 * requirement it always was. **Do not add a conformance table in response.**
 * ECIP-1119 removed its own deployment-status column for the reason that
 * reaches this site too: a sentence reporting which clients implement what is
 * wrong from whenever it is next read, and nothing forces the edit.
 *
 * **This page explains; `/upgrade` is where a reader acts.** It states no EIP
 * table, no fork bucket and no fee-floor row of its own. Every count it does
 * state is derived from `lib/olympia-eips.ts`, which `/upgrade` also reads, so
 * the two pages cannot drift into quoting different numbers for the same set.
 *
 * Five claims are the ones a paraphrase loses:
 *
 *  - **The exclusions are content, not omissions.** ECIP-1121 is written as an
 *    inventory because "an EIP that appears in no section is indistinguishable
 *    from one that was considered and declined". Deferred, excluded, blocked
 *    and un-classified are four different dispositions and the page keeps them
 *    apart.
 *  - **EIP-3198 belongs to ECIP-1111, not to ECIP-1121**, which excludes it by
 *    name as fee-market governance defined elsewhere. `t35-verify.py` asserts
 *    both directions, so writing it into a 1121 table fails an existing check.
 *  - **Chain configuration is not operator discretion.** ECIP-1122 §Rationale
 *    is explicit that it means a value every client ships identically and no
 *    operator flag can override, which is the opposite of the defect each
 *    parameter exists to close.
 *  - **Only `MIN_BASE_FEE` is consensus-enforced**, so 2 gwei is the
 *    conformant-network figure rather than a protocol guarantee (ECIP-1122
 *    §"Security Considerations"). `/upgrade` and `llms.txt` already carry this
 *    form and this page matches it.
 *  - **Roadmap order is not deployment order.** Every contract the Stage 1 fork
 *    commits to is on-chain and audited before that block, and the sanctions
 *    oracle and the ECIP-1114 OFPRegistry are deliberately outside that set.
 *
 * **Nothing about eth/69 appears here, in either direction.** ECIP-1121's row
 * was rewritten at `3f3453e` and a query with the specification's authors is
 * still open on the capability naming; the page needs no networking sentence
 * that depends on it, so it makes none.
 *
 * **No activation block appears anywhere, and no countdown to one.** The page
 * states how the block is decided, which is a property of the process and stays
 * true; a number, or a clock running down to a number, is the page telling a
 * reader when it was written.
 */

const topic = overviewTopic("what-ships");
/** Heading and anchor for the nth section, read from the single source. */
const H = (n: number) => topicSection(topic, n);
const S = (n: number) => sectionId(H(n));

/**
 * The three constraints ECIP-1121 §Specification states, which are the answer
 * to "why that set" rather than "what is in it". A reader who has only the list
 * cannot tell an omission from a decision; these are what make it an inventory.
 */
const inclusionTests = [
  {
    n: "01",
    title: "Not already done",
    body: "Ethereum Classic did not activate it at Spiral in 2024 or at Mystique in 2022. Anything those upgrades already delivered is not on the list, because it is already running.",
  },
  {
    n: "02",
    title: "Execution layer only",
    body: "It changes how contracts run, what an operation costs, or what a node exposes over its interfaces. Anything that changes the rules a block is judged by belongs in a different specification, and one candidate is held out on exactly that ground.",
  },
  {
    n: "03",
    title: "Works on Proof-of-Work",
    body: "It carries no dependency on validators, on a beacon chain, or on the data-availability machinery Ethereum built for its Layer 2s. Ethereum Classic is and stays a Proof-of-Work chain, so anything resting on those foundations cannot be adopted here whatever its merits.",
  },
];

/**
 * ECIP-1122's three parameters, in the terms this page needs. Titles and
 * constants come from `lib/olympia-eips.ts` so they cannot diverge from the
 * cards on `/upgrade`; only the "what it was before" framing is local, and it
 * is the framing this page exists to add.
 */
const parameterBackground: Record<string, { before: string; after: string }> = {
  tip: {
    before:
      "Miners set their own price floors by convention. The limit a client actually enforces has been one wei since it was inherited from Ethereum's own software, a billionth of what people pay in practice, and any operator can change it.",
    after:
      "A conformant client enforces the same floor and checks it twice: when a transaction arrives, and again when it selects transactions for a block.",
  },
  gas: {
    before:
      "The 8,000,000 target was social convention rather than a rule. Nothing prevented an operator from deviating, and Ethereum Classic has watched that turn into an incident.",
    after:
      "The target for each era becomes a value the network sets, which an operator's own gas-limit flag cannot override. It rises to 60,000,000 at Olympia.",
  },
  mess: {
    before:
      "Chain-reorganization resistance was active from block 11,380,000, then switched off at block 19,250,000. That block is Spiral, so the deactivation was a scheduled part of that upgrade rather than a response to anything.",
    after:
      "It is restored at the Olympia activation block, which closes a window that runs precisely from Spiral to Olympia.",
  },
};

/**
 * The four dispositions, kept apart because they are routinely flattened into
 * "not supported". Counts are derived; only the reasoning is written here.
 */
const dispositions = [
  {
    label: "Excluded",
    kind: "Proof-of-Stake",
    count: PROOF_OF_STAKE_EXCLUDED.length,
    body: "Not applicable rather than postponed. Beacon-chain dependencies, the separation of block proposers from block builders, and the machinery for validators joining and leaving all assume a network Ethereum Classic is not and does not intend to become. There is no version of this list that gets adopted later.",
  },
  {
    label: "Deferred",
    kind: "Blob data availability",
    count: BLOB_DEFERRED.length,
    body: "Ethereum added blobs to carry data for the networks settling on top of it. Ethereum Classic is a Layer 1 execution chain and does not have that problem, so it takes the execution-layer work without inheriting the scaffolding underneath it. The specification is careful that deferral does not imply rejection.",
  },
  {
    label: "Excluded",
    kind: "Fee-market governance",
    count: FEE_MARKET_EXCLUDED.length,
    body: "The only exclusion that is a filing decision rather than a judgment. The fee market and the opcode that exposes the base fee to a contract both ship at this same fork; they are simply specified in ECIP-1111 instead, because the question of where the money goes is the subject of its own set of documents.",
  },
  {
    label: "Blocked",
    kind: "Waiting on a dependency",
    count: BLOCKED_BY_DEPENDENCY.length,
    body: "Tracked rather than rejected, and each meets this specification's own tests. Five of them resolve to one proposal that adds a field to the block header, which makes it a change to the rules a block is judged by and so needs a specification of its own. The sixth waits on a proposal that is itself in the Proof-of-Stake list above.",
  },
];

export default function WhatShipsPage() {
  const networkingCount = NETWORKING_PROTOCOLS.length;

  return (
    <OverviewTopicPage slug="what-ships">
      {/* 1. The execution-layer alignment */}
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
                Two of the specifications that activate at the first hard fork
                change nothing about money. One brings the machine that runs
                contracts back into line with Ethereum&rsquo;s. The other writes
                down three network settings that have been held together by habit.
                Both are unglamorous, and both are the reason the rest of Olympia
                has something solid to sit on.
              </p>
              <p>
                Ethereum Classic and Ethereum run the same virtual machine. Over a
                decade of Ethereum upgrades, Ethereum Classic took some of the
                changes and deliberately left others, and the distance between the
                two accumulated. That distance is not abstract. It is why a
                developer&rsquo;s tools sometimes needed Ethereum Classic-specific
                handling, and why a wallet or an exchange had to decide whether
                supporting this chain was worth the extra work.
              </p>
              <p>
                <span className="font-semibold text-[var(--text-primary)]">
                  This specification closes that distance in a single upgrade, and
                  what it writes down is an inventory rather than a redesign.
                </span>{" "}
                It invents nothing. It lists the changes Ethereum has already made
                that Ethereum Classic can take without becoming a different kind of
                network, and it says in the same document which ones it is leaving
                out and why.
              </p>
            </div>
          </FadeIn>

          {/* What is in the set, as counts rather than as a table /upgrade owns */}
          <FadeIn delay={80}>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-[var(--border-brand)] bg-[var(--brand-green-subtle)] p-5">
                <p className="font-mono text-3xl font-bold text-[var(--brand-green)]">
                  {EXECUTION_EIP_COUNT}
                </p>
                <p className="mt-1 text-sm font-semibold text-[var(--text-primary)]">
                  changes to the execution layer
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                  Grouped by what they do, in four sets: {" "}
                  {EXECUTION_EIP_GROUPS.map((group, i) => (
                    <span key={group.key}>
                      {i > 0 && (i === EXECUTION_EIP_GROUPS.length - 1 ? " and " : ", ")}
                      <span className="text-[var(--text-primary)]">
                        {group.label.toLowerCase()}
                      </span>
                    </span>
                  ))}
                  . They arrive together at the activation block.
                </p>
              </div>
              <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-5">
                <p className="font-mono text-3xl font-bold text-[var(--text-primary)]">
                  {networkingCount}
                </p>
                <p className="mt-1 text-sm font-semibold text-[var(--text-primary)]">
                  peer-to-peer protocol versions
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  These are how nodes talk to each other rather than how contracts
                  run, and they do not need the fork at all. Two nodes agree on a
                  version when they connect, so a network can move to a newer one
                  without every participant changing at the same moment.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Why that set: the three tests */}
          <FadeIn delay={120}>
            <h3 className="mt-12 text-lg font-semibold tracking-tight">
              Why that set, and not another
            </h3>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-[var(--text-muted)]">
              A list of changes does not explain itself. The specification states
              three tests, and every entry passes all three of them. They are also
              what makes the exclusions further down readable as decisions rather
              than as gaps in the coverage.
            </p>
            <ol className="m-0 mt-6 list-none p-0">
              {inclusionTests.map((test, i) => (
                <li
                  key={test.n}
                  className="border-t border-[var(--divider)] last:border-b"
                >
                  <FadeIn delay={i * 60} className="flex flex-col gap-2 py-5 sm:flex-row sm:gap-6">
                    <span className="font-mono text-sm text-[var(--brand-green)] sm:w-12 sm:shrink-0">
                      {test.n}
                    </span>
                    <div className="max-w-3xl">
                      <h4 className="text-base font-semibold text-[var(--text-primary)]">
                        {test.title}
                      </h4>
                      <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
                        {test.body}
                      </p>
                    </div>
                  </FadeIn>
                </li>
              ))}
            </ol>
          </FadeIn>

          <FadeIn delay={160}>
            <div className="mt-10 border-l-2 border-[var(--brand-green)] pl-5">
              <p className="max-w-3xl text-base leading-relaxed text-[var(--text-muted)]">
                <span className="font-semibold text-[var(--text-primary)]">
                  It changes nothing economic, and that is deliberate.
                </span>{" "}
                This specification defines no governance behavior and no monetary
                behavior, and it replaces no other specification in the set. It is
                the execution-layer bookend: the part of the upgrade a reader can
                understand without knowing anything about treasuries or voting.
              </p>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--text-muted)]">
                It does depend on the fee market activating alongside it. A client
                that shipped one without the other would start applying new
                behavior at a block where the rest of the network was not, and
                stop agreeing with it. The specification names that outcome as a
                client bug rather than a flaw in the design, which is the same
                reason every client publishes its release well ahead of the block.
              </p>
              <p className="mt-5 text-base">
                <Link
                  href="/upgrade#evm"
                  className="font-medium text-[var(--brand-green)] transition-opacity duration-200 hover:opacity-70"
                >
                  Every change, one by one, and which Ethereum upgrade it came from
                </Link>
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* 2. Three settings every client enforces */}
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
                The second specification is shorter and, for anyone running a node,
                more immediately felt. It sets three values that every Olympia
                client is required to enforce identically.
              </p>
              <p>
                <span className="font-semibold text-[var(--text-primary)]">
                  All three have one thing in common, and it is the point of the
                  document.
                </span>{" "}
                Each writes down something the network was already relying on and
                had never actually stated. Miners held a price floor by convention.
                The size of a block was kept in range by people agreeing to keep it
                there. The defense against chain reorganizations was switched on
                because operators chose to run it, and later switched off.
              </p>
              <p>
                Informal arrangements of that kind work until they do not, and each
                of these three has already been tested. The specification&rsquo;s
                own word for what it is doing is codifying: turning practice that
                everyone assumed into something a client enforces.
              </p>
            </div>
          </FadeIn>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {CLIENT_PARAMETERS.map((param, i) => {
              const background = parameterBackground[param.key];
              return (
                <FadeIn key={param.key} delay={i * 80}>
                  <div className="flex h-full flex-col rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-5">
                    <h3 className="text-base font-semibold text-[var(--text-primary)]">
                      {param.title}
                    </h3>
                    <p className="mt-1 font-mono text-[11px] text-[var(--brand-green)]">
                      {param.constant}
                    </p>
                    <dl className="mt-4 flex-1 space-y-3">
                      <div>
                        <dt className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-subtle)]">
                          Until now
                        </dt>
                        <dd className="mt-1 text-sm leading-relaxed text-[var(--text-muted)]">
                          {background?.before}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-mono text-[10px] uppercase tracking-widest text-[var(--brand-green)]">
                          From Olympia
                        </dt>
                        <dd className="mt-1 text-sm leading-relaxed text-[var(--text-muted)]">
                          {background?.after}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </FadeIn>
              );
            })}
          </div>

          {/* The misreading this section exists to prevent */}
          <FadeIn delay={240}>
            <div className="mt-10 rounded-xl border border-[var(--border-brand)] bg-[var(--brand-green-subtle)] p-6">
              <h3 className="text-base font-semibold text-[var(--text-primary)]">
                &ldquo;Configuration&rdquo; here means the opposite of what it
                usually means
              </h3>
              <p className="mt-3 max-w-3xl text-base leading-relaxed text-[var(--text-secondary)]">
                None of the three is a rule that blocks are judged by. They live in
                the configuration a client ships with, which sounds weaker than a
                rule and in one specific way is: a node that ignores them still
                follows the same chain as everyone else, so nobody can be forced
                off the network for non-conformance.
              </p>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--text-secondary)]">
                <span className="font-semibold text-[var(--text-primary)]">
                  What it does not mean is that each operator picks a value.
                </span>{" "}
                That is precisely the defect all three exist to close. Configuration
                here means a value every client ships with and no operator flag can
                override. The gain from keeping it out of the block rules is that
                the network can revise a number by releasing new client software
                rather than by scheduling another hard fork.
              </p>
            </div>
          </FadeIn>

          {/* The honest scope of the floor */}
          <FadeIn delay={280}>
            <div className="mt-8 max-w-3xl space-y-4 text-base leading-relaxed text-[var(--text-muted)]">
              <p>
                <span className="font-semibold text-[var(--text-primary)]">
                  That distinction has one consequence worth stating plainly.
                </span>{" "}
                Two of the floors under a transaction&rsquo;s price come from
                different places. The one on the protocol&rsquo;s share is a
                consensus rule and holds against everybody. The one on the
                miner&rsquo;s share is configuration, so a block producer that
                declines to enforce it can still include cheaper transactions, and
                every other node has to accept and store them.
              </p>
              <p>
                So the combined two gwei is what a conformant network charges rather
                than a promise the protocol makes, and one gwei is the figure that
                holds regardless. The specification says so in its own security
                section rather than leaving a reader to discover it, which is also
                why it asks every client to adopt the value instead of treating it
                as a local preference.
              </p>
              <p className="text-base">
                <Link
                  href="/upgrade#what-changes"
                  className="font-medium text-[var(--brand-green)] transition-opacity duration-200 hover:opacity-70"
                >
                  The floors side by side, and what a transaction actually costs
                </Link>
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* 3. What is deliberately not included */}
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
                Most specifications list what they contain. This one also lists what
                it does not, and gives a reason for each. The stated principle is
                worth quoting because it is unusual:{" "}
                <span className="text-[var(--text-primary)]">
                  a proposal that appears in no section is indistinguishable from
                  one that was considered and declined
                </span>
                , and that ambiguity is itself treated as a defect.
              </p>
              <p>
                So the omissions below are content. They also do not all mean the
                same thing, and collapsing them into &ldquo;not supported&rdquo; is
                the most common way this document gets misread.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={80}>
            <dl className="mt-8 grid gap-4 sm:grid-cols-2">
              {dispositions.map((item) => (
                <div
                  key={item.kind}
                  className="flex flex-col rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-5"
                >
                  <dt>
                    <span className="inline-flex w-fit items-center rounded-full border border-[var(--border-default)] bg-[var(--bg-surface)] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                      {item.label}
                    </span>
                    <span className="mt-3 flex items-baseline gap-2">
                      <span className="font-mono text-2xl font-bold text-[var(--text-primary)]">
                        {item.count}
                      </span>
                      <span className="text-base font-semibold text-[var(--text-primary)]">
                        {item.kind}
                      </span>
                    </span>
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                    {item.body}
                  </dd>
                </div>
              ))}
            </dl>
          </FadeIn>

          {/* The one exclusion a reader will misread as a missing feature */}
          <FadeIn delay={140}>
            <div className="mt-8 max-w-3xl space-y-4 text-base leading-relaxed text-[var(--text-muted)]">
              <p>
                <span className="font-semibold text-[var(--text-primary)]">
                  The third of those is the one to read twice.
                </span>{" "}
                The base fee is excluded from this specification, and the base fee
                is the whole reason Olympia exists. Nothing is missing. It is
                specified next door, in the document that also decides where the
                money goes, and it activates at this same block. A reader who takes
                the exclusion at face value concludes the opposite of what happens.
              </p>
              <p>
                The same applies to the opcode that lets a contract read the current
                base fee. It ships, it is simply not this document&rsquo;s to
                define.
              </p>
              <p>
                <span className="font-semibold text-[var(--text-primary)]">
                  A further {CORE_DEVS_REVIEW.length} proposals are listed without
                  being decided.
                </span>{" "}
                They pass all three tests and none of them is adopted or rejected
                here; classifying them is a decision for the developer call that
                sets the activation block. Listing them anyway is the same principle
                as the exclusions: an undecided proposal that appears nowhere reads
                as one nobody thought about.
              </p>
            </div>
          </FadeIn>

          {/* Glamsterdam framing, stated with no denominator */}
          <FadeIn delay={200}>
            <div className="mt-10 border-l-2 border-[var(--brand-green)] pl-5">
              <p className="max-w-3xl text-base leading-relaxed text-[var(--text-muted)]">
                <span className="font-semibold text-[var(--text-primary)]">
                  Glamsterdam is the target, not a finished job.
                </span>{" "}
                Ethereum&rsquo;s next upgrade is still being assembled, so nobody
                can align to a set that is not settled yet. What this specification
                does is take the {GLAMSTERDAM_ADOPTED.length} pieces of it that are
                ready and stable, track the rest, and say which is which. Reading
                that as full parity overstates it in one direction, and reading it
                as Ethereum Classic sitting the upgrade out overstates it in the
                other.
              </p>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--text-muted)]">
                Fusaka is a different case and gets confused with it. That cycle is
                delivered and settled on Ethereum, and its execution-layer work is
                in this set wherever it does not depend on blobs or on
                Proof-of-Stake. It is not something Ethereum Classic is still
                waiting on.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* 4. Where this sits in the five stages */}
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
                Both specifications on this page are stage one, and stage one is a
                hard fork: every node has to be running a release that knows about
                it before the block arrives. Of the five stages, only the first and
                the last are forks. The three in between deploy contracts and run
                governance on a chain whose rules are already settled.
              </p>
              <p>
                <span className="font-semibold text-[var(--text-primary)]">
                  The roadmap is a schedule for rolling things out, not an order for
                  building them.
                </span>{" "}
                That sentence is the specification&rsquo;s own, and flattening the
                two is the most common way the five stages get misread.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={80}>
            <div className="mt-8 rounded-xl border border-[var(--border-brand)] bg-[var(--brand-green-subtle)] p-6">
              <h3 className="text-base font-semibold text-[var(--text-primary)]">
                Nothing is deployed at the fork
              </h3>
              <p className="mt-3 max-w-3xl text-base leading-relaxed text-[var(--text-secondary)]">
                Every contract the first fork commits to is already on-chain,
                already audited and already readable before that block: the
                membership token, the contract that holds the money, the one that
                counts votes, and the permanent contract consensus credits. The fork
                is the moment the protocol begins paying a published address, which
                is not the same act as creating it. The audit window therefore sits
                in front of the fork rather than in a gap after it.
              </p>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--text-secondary)]">
                <span className="font-semibold text-[var(--text-primary)]">
                  Two pieces are deliberately outside that set, and the reason is
                  worth following.
                </span>{" "}
                The sanctions oracle and the proposal registry each attach later
                through a setter that only governance can call, and neither is built
                into anything else, so both may be deployed and audited on either
                side of the fork. Until the oracle is attached the spending gate
                refuses to open at all, so revenue accumulates and cannot be spent.
                Failing shut is what makes deferring that audit safe.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={140}>
            <div className="mt-8 max-w-3xl space-y-4 text-base leading-relaxed text-[var(--text-muted)]">
              <p>
                After the fork the stages stop being about consensus. The second is
                governance becoming able to spend, the third deploys the market
                contracts, and the fourth switches on a distribution experiment
                using funds the treasury already holds. Only the fifth is a second
                hard fork, and it cannot be scheduled until the fourth has produced
                the evidence it exists to harden.
              </p>
            </div>
            <p className="mt-5 text-base">
              <Link
                href="/overview#the-five-stages"
                className="font-medium text-[var(--brand-green)] transition-opacity duration-200 hover:opacity-70"
              >
                All five stages, and which of them are forks
              </Link>
            </p>
          </FadeIn>

          {/* How the block is decided, not what it is. A number dates the page
              and a countdown to it is the same number wearing a clock. */}
          <FadeIn delay={200}>
            <div className="mt-10">
              <p className="max-w-3xl text-base leading-relaxed text-[var(--text-muted)]">
                Both specifications leave the activation block to open
                coordination among the people who have to act on it: client
                developers, node operators, miners, exchanges and infrastructure
                providers. Mordor activates first, and the mainnet block follows a
                clean run there and a stakeholder readiness check.
              </p>
              <p className="mt-5 text-base">
                <Link
                  href="/upgrade"
                  className="font-medium text-[var(--brand-green)] transition-opacity duration-200 hover:opacity-70"
                >
                  What to do about it, if you run a node
                </Link>
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </OverviewTopicPage>
  );
}
