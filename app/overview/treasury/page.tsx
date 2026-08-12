import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { OverviewTopicPage } from "@/components/sections/OverviewTopicPage";
import { PermanenceBoundary } from "@/components/sections/PermanenceBoundary";
import { CHAIN_CONFIG } from "@/lib/config";
import {
  overviewTopic,
  overviewTopicMetadata,
  sectionId,
  topicSection,
} from "@/lib/overview-topics";

export const metadata = overviewTopicMetadata("treasury");

/**
 * `/overview/treasury` — where the money goes and who owns it. ECIP-1112 for
 * the Vault, ECIP-1113 §1.3 and §1.4 for the contract that holds the
 * funds and the boundary above it.
 *
 * Written against ECIPs `local-edits` @ 7642ade. The page exists to keep two
 * contracts apart that copy keeps running together, so the vocabulary is
 * load-bearing rather than stylistic:
 *
 *   Olympia Sovereignty Vault  ECIP-1112. The permanent contract at the address
 *                              consensus credits. Funds LAND here, and it holds
 *                              nothing for long
 *   Olympia Treasury           ECIP-1113 §1.3. The TimelockController. Funds
 *                              LIVE here while governance decides
 *
 * **There is no third term.** ECIP-1112 §"Simple Summary" is explicit that
 * "Sovereignty Vault" is that contract's name and not a name for the fund, and
 * that the fund is not a thing the ECIP specifies. A lowercase "sovereignty
 * vault" standing for the money reads as the Treasury, which is the confusion
 * the two-row table above exists to prevent. **Never attribute the Treasury to
 * ECIP-1112.**
 *
 * The permanence boundary and its §1.4 qualification are rendered from
 * `PermanenceBoundary`, shared with `/governance`, rather than paraphrased a
 * second time: §1.4 says the qualification MUST NOT be glossed, and a second
 * paraphrase is how it gets glossed.
 */

const topic = overviewTopic("treasury");
/** Heading and anchor for the nth section, read from the single source. */
const H = (n: number) => topicSection(topic, n);
const S = (n: number) => sectionId(H(n));
const EXPLORER = CHAIN_CONFIG[61].explorer;

/** The two fixed terms. ECIP-1112 §"Simple Summary" and ECIP-1113 §1.3. */
const vocabulary = [
  {
    term: "The Olympia Sovereignty Vault",
    gloss: "Where funds land",
    body: "The address consensus credits, specified by ECIP-1112. It keeps nothing: whatever arrives is forwarded, unchanged, to one address fixed when the contract was built. It is the only contract in the suite that cannot be replaced.",
  },
  {
    term: "The Olympia Treasury",
    gloss: "Where funds live",
    body: "Where the money sits while governance decides what to do with it, and the only place a payment leaves from. Specified by ECIP-1113, it is a stock timelock chosen off the shelf rather than written for this, and governance can replace it without a fork.",
  },
];

const doesNotDo = [
  {
    title: "It does not invest",
    body: "The balance is not lent, staked, wrapped or put to work. It sits until a proposal moves it.",
  },
  {
    title: "It does not allocate",
    body: "Nothing splits the balance between purposes by formula. Every payment is a proposal that passed, one at a time.",
  },
  {
    title: "It does not choose recipients",
    body: "The contract has no opinion about who deserves anything. It executes what governance already decided, and reverts if it cannot.",
  },
  {
    title: "It does not keep its own books",
    body: "The Vault counts nothing. Consensus credits it by writing to its balance without running any code, so a contract totting up its own deposits would total zero and the money would never leave. Its balance is the only record, deliberately.",
  },
];

export default function TreasuryOverviewPage() {
  return (
    <OverviewTopicPage slug="treasury">
      {/* 1. Where the money lands */}
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
                In one address, written into every Olympia client and the same for all of
                them. As each block is finalized the client credits that address with the
                block&rsquo;s base fee revenue. There is no transaction, no sender and no
                code running at the far end.
              </p>
              <p>
                <span className="font-semibold text-[var(--text-primary)]">
                  Two contracts sit behind that, and they do different jobs.
                </span>{" "}
                The one consensus credits is the Olympia Sovereignty Vault, and it is
                deliberately almost nothing. Around thirty lines. No owner, no role, no
                setter, no parameter to tune, nothing to configure and therefore nothing to
                misconfigure. Whatever it receives it forwards to a single address fixed
                when it was built. That address is the Olympia Treasury, and the Treasury
                is what actually holds the money.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={80}>
            <dl className="mt-8 grid gap-4 md:grid-cols-2">
              {vocabulary.map((item) => (
                <div
                  key={item.term}
                  className="rounded-xl border border-[var(--divider)] bg-[var(--bg-elevated)] p-5"
                >
                  <dt>
                    <span className="block font-mono text-[10px] uppercase tracking-wider text-[var(--brand-green)]">
                      {item.gloss}
                    </span>
                    <span className="mt-1.5 block text-base font-semibold">{item.term}</span>
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                    {item.body}
                  </dd>
                </div>
              ))}
            </dl>
          </FadeIn>

          <FadeIn delay={160}>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-[var(--divider)] bg-[var(--bg-surface)] p-5">
                <p className="text-sm font-semibold">
                  The hand-off needs someone to trigger it
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  Moving a balance from the Vault to the Treasury takes one call, and
                  anyone at all may make it. Nothing pays them to, so at low revenue the gas
                  can cost more than the amount moved and a balance may sit there for a
                  while. That is inconvenience rather than risk: the caller chooses when the
                  money moves and never where, because the destination cannot be changed by
                  anyone. A disbursement that needs the funds simply leads with that call.
                </p>
              </div>
              <div className="rounded-xl border border-[var(--divider)] bg-[var(--bg-surface)] p-5">
                <p className="text-sm font-semibold">Nothing is predicted</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  No address is worked out in advance. The contracts are deployed by
                  ordinary transactions, the real deployed address is published, and only
                  then is it written into the clients. The fork commits to code that
                  already exists on-chain and that anyone can read first, rather than
                  asking the network to trust a deployment that has not happened yet.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* 2. Exactly one contract is permanent */}
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
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--text-muted)]">
              That single boundary is the architecture. Consensus has to name something in
              place of the burn, and whatever it names cannot be changed again without a
              hard fork, so the design puts as little as it can get away with on the
              permanent side of that line and leaves everything else on the other. The
              question it answers is not what a treasury contract should look like. It is
              what the smallest object the network is willing to make permanent could be.
            </p>
          </FadeIn>

          <PermanenceBoundary delay={100} />

          <FadeIn delay={280}>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-[var(--text-muted)]">
              This is what the extra contract buys. Crediting the Treasury from consensus
              directly would have removed a hop and made the Treasury itself the permanent
              object, so replacing it would have taken a hard fork and every guarantee
              would have had to be proved about a general purpose contract with a
              permissions table instead of about thirty lines with none.
            </p>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* 3. Who owns it */}
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
                No company, no foundation and no individual. It is not a multisig and there
                is no key that opens it. One account is able to tell the Treasury to pay,
                and that account is the Governor, which does nothing except carry out
                proposals that were voted through, queued where anyone could see them and
                held for a fixed delay before they moved.
              </p>
              <p>
                <span className="font-semibold text-[var(--text-primary)]">
                  There is an administrator, briefly, and then there is not.
                </span>{" "}
                Setting the contracts up takes a short sequence, and the account running it
                holds an administrative role between creating the Treasury and wiring the
                Governor to it. It gives that role up in the same sequence, before the
                Vault exists and before any address is published. Throughout that
                window the Treasury holds nothing, no revenue has ever been credited, and
                the network has not forked.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={80}>
            <div className="mt-8 max-w-3xl space-y-4 rounded-xl border border-[var(--divider)] bg-[var(--bg-elevated)] p-6 text-sm leading-relaxed text-[var(--text-muted)]">
              <p>
                <span className="font-semibold text-[var(--text-primary)]">
                  What holds this in place, said plainly.
                </span>{" "}
                The Treasury administers its own permissions, which means governance can
                change its own rules through exactly the same public process it uses for
                anything else. The permissions are set at deployment and published so that
                anyone can read them back off the chain and confirm for themselves that the
                Governor is the only account able to release funds and that no
                administrator remains.
              </p>
              <p>
                So what stands between a hostile proposal and the money is not a clever
                contract. It is the ordinary machinery: a proposal has to win a vote, it
                sits in a public queue for a delay that everybody can watch, and a
                counter-proposal can cancel it before it executes. Anyone claiming the
                arrangement enforces itself is describing something other than this.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={140}>
            <p className="mt-6">
              <Link
                href="/overview/proposals"
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-[var(--brand-green)] transition-opacity duration-200 hover:opacity-70"
              >
                Who decides how it is spent
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

      {/* 4. What the Treasury does not do */}
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
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--text-muted)]">
              Most of what a reader expects a treasury to do, it does not do, and the
              omissions are the design rather than gaps in it.
            </p>
          </FadeIn>

          <FadeIn delay={80}>
            <ul className="mt-8 grid list-none gap-4 p-0 sm:grid-cols-2">
              {doesNotDo.map((item) => (
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
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-[var(--text-muted)]">
              There is no minimum amount before the Vault can forward, either. On a
              chain whose revenue starts small, a threshold is a way to strand funds below
              it, which costs more than the nuisance a threshold removes.
            </p>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* 5. Watching the balance */}
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
                All of it is public, and none of it requires anyone&rsquo;s cooperation to
                see. Two addresses are worth watching rather than one: revenue lands at the
                Vault and is spent from the Treasury, so a balance sitting at the
                first simply has not been forwarded yet.
              </p>
              <p>
                <span className="font-semibold text-[var(--text-primary)]">
                  Read it from the chain rather than from anybody&rsquo;s dashboard.
                </span>{" "}
                Both balances, every credit into the Vault, every forwarding call and every
                payment the Treasury makes are ordinary chain state, so a block explorer
                answers all of it and no operator sits between the question and the answer.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={80}>
            <div className="mt-8 rounded-xl border border-[var(--divider)] bg-[var(--bg-surface)] p-6">
              <p className="text-sm font-semibold">
                What to check, and where
              </p>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--text-muted)]">
                The architecture is six contracts and the boundary between the first two is
                the whole of it. Which contract does what, and which ECIP specifies each, is
                set out on the home page; the balances and the transaction history behind
                them are on the block explorer for whichever chain you are asking about.
              </p>
              <p className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
                <Link
                  href="/#contracts"
                  className="group inline-flex items-center gap-1.5 text-sm font-medium text-[var(--brand-green)] transition-opacity duration-200 hover:opacity-70"
                >
                  The contract architecture
                  <ArrowRight
                    size={14}
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </Link>
                <a
                  href={EXPLORER}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--brand-green)] transition-opacity duration-200 hover:opacity-70"
                >
                  Check it on the block explorer
                  <ExternalLink size={13} aria-hidden="true" />
                </a>
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={140}>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-[var(--text-muted)]">
              Four things are published ahead of the activation block so that none of this
              has to be taken on trust: the Vault&rsquo;s deployed address and the code
              at it, the address it was built to forward to, the full permissions table for
              the Treasury, and the verified source of the Governor and the membership
              token. Publishing the permissions is the part that matters most. It is what
              lets anyone confirm from chain state, without trusting whoever deployed it,
              that one account can release funds and no administrator is left.
            </p>
          </FadeIn>
        </div>
      </section>
    </OverviewTopicPage>
  );
}
