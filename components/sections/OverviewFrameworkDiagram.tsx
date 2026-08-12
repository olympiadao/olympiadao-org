import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";

type TopicLink = { label: string; href: string };

type Layer = {
  title: string;
  body: string;
  links: TopicLink[];
};

type Station = {
  eyebrow: string;
  title: string;
  body: string;
  /**
   * The permanence boundary, which is the subject of this diagram: exactly one
   * contract is permanent and everything below it is replaceable by ordinary
   * governance. Carried as text rather than as color alone.
   */
  badge?: { text: string; permanent: boolean };
  /** Value that leaves the path at this point rather than continuing along it */
  branch?: { title: string; body: string };
  /** The three decision layers, rendered nested inside their station */
  layers?: Layer[];
  links: TopicLink[];
};

const stations: Station[] = [
  {
    eyebrow: "In",
    title: "Every transaction pays a base fee",
    body: "Olympia brings Ethereum Classic the fee market Ethereum has run since 2021. A transaction pays a base fee that the network sets, plus a tip on top of it. Ethereum destroys the base fee. Olympia instead credits it to a contract of its own. That crediting happens in consensus as each block is finalized, with no transaction involved.",
    branch: {
      title: "Tips and block rewards leave here",
      body: "They are paid to miners in full, exactly as they are today, and block rewards follow the same schedule they follow now. The base fee is the only part Olympia moves.",
    },
    links: [{ label: "Where the money comes from", href: "/overview/funding" }],
  },
  {
    eyebrow: "Credited",
    title: "One contract is permanent, and it is this one",
    badge: { text: "Permanent", permanent: true },
    body: "Consensus credits a single address, written into every Olympia client. The contract there is the Olympia Sovereignty Vault, and it is deliberately almost nothing: no owner, no role, no setter, no parameter. Its whole behavior is to receive value and forward it, unchanged, to one address fixed when it was built. Nothing in governance can change that address, and moving it would take a hard fork. This is the only permanent contract in the system, and that single boundary is what the rest of the design is built around.",
    links: [{ label: "Where it goes, and who owns it", href: "/overview/treasury" }],
  },
  {
    eyebrow: "Held",
    title: "The Treasury is what holds the money",
    badge: { text: "Replaceable", permanent: false },
    body: "The address the Vault forwards to is the Olympia Treasury, a stock timelock contract owned by no company, foundation or individual. It does not invest the balance and it does not choose who receives anything. Everything from here down is replaceable by ordinary governance, the Treasury included. One qualification: because the Vault's destination is fixed, a replacement Treasury is funded by the current one forwarding to it, rather than by pointing the revenue somewhere new.",
    links: [{ label: "Where it goes, and who owns it", href: "/overview/treasury" }],
  },
  {
    eyebrow: "Decided",
    title: "Three layers stand between the Treasury and a payment",
    body: "Nothing reaches a recipient without clearing all three of them, in order, on-chain, and where anyone at all can watch it happen.",
    layers: [
      {
        title: "Propose",
        body: "Submitting a funding proposal is open. There is no application to fill in, no affiliation to hold, and no gatekeeper to satisfy. The one bar is a proposal threshold the DAO sets for itself, which it can raise or lower through the same process as anything else.",
        links: [{ label: "Who decides how it is spent", href: "/overview/proposals" }],
      },
      {
        title: "Decide",
        body: "Core contributors vote. A vote comes from a CoreNFT, which is earned by contributing and by nothing else: it cannot be bought, sold, lent or delegated, and one address carries one vote however many tokens exist. Open prediction markets run alongside the vote, pricing what Ethereum Classic is worth with a proposal accepted against what it is worth with the same proposal rejected. They decide grant allocation for a season Olympia DAO has seeded: the contributors settle whether and how much, and the market settles to whom.",
        links: [
          { label: "What stops it being captured", href: "/overview/prediction-markets" },
        ],
      },
      {
        title: "Release",
        body: "An approved proposal is queued and waits out a fixed delay in public before anything moves. The Treasury then pays it out itself, and only the Governor can tell it to: no other account holds that permission. On the way through, the Governor checks the payment's target against a sanctions oracle and reverts if the target is listed or if no oracle has been attached.",
        links: [{ label: "Who cannot receive it", href: "/overview/eligibility" }],
      },
    ],
    links: [],
  },
  {
    eyebrow: "Out",
    title: "Core development, critical infrastructure, network security",
    body: "Those are the purposes the Treasury exists for. Which of them receives what is not the Treasury's decision and not any one party's. It is whatever the proposals passed, one at a time, on the record.",
    links: [{ label: "What the DAO funds", href: "/governance" }],
  },
];

function TopicLinks({ links }: { links: TopicLink[] }) {
  if (links.length === 0) return null;
  return (
    <p className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-[var(--brand-green)] transition-opacity duration-200 hover:opacity-70"
        >
          {link.label}
          <ArrowRight
            size={14}
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </Link>
      ))}
    </p>
  );
}

export function OverviewFrameworkDiagram() {
  return (
    <ol className="m-0 mt-10 list-none p-0">
      {stations.map((station, i) => (
        <li key={station.eyebrow}>
          <FadeIn delay={i * 70} className="flex gap-5 sm:gap-7">
            {/* The path itself: a node on a continuous rail */}
            <div className="flex flex-col items-center" aria-hidden="true">
              <span className="mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full border-2 border-[var(--brand-green)] bg-[var(--background)]" />
              {i < stations.length - 1 && (
                <span className="mt-1 w-px flex-1 bg-[var(--border-brand)]" />
              )}
            </div>

            <div className={i < stations.length - 1 ? "flex-1 pb-12" : "flex-1"}>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <p className="font-mono text-xs uppercase tracking-widest text-[var(--brand-green)]">
                  {station.eyebrow}
                </p>
                {station.badge && (
                  /* Chip built on --bg-surface with an outline rather than on
                     --brand-green-subtle, which measures 4.39:1 over a card and
                     fails the 4.5:1 small-text rule. */
                  <span
                    className={
                      station.badge.permanent
                        ? "rounded-full border border-[var(--border-brand)] bg-[var(--bg-surface)] px-2.5 py-0.5 font-mono text-[0.625rem] font-semibold tracking-wide text-[var(--brand-green)] uppercase"
                        : "rounded-full border border-[var(--border-default)] bg-[var(--bg-surface)] px-2.5 py-0.5 font-mono text-[0.625rem] font-semibold tracking-wide text-[var(--text-muted)] uppercase"
                    }
                  >
                    {station.badge.text}
                  </span>
                )}
              </div>
              <h3 className="mt-2 text-xl font-semibold tracking-tight md:text-2xl">
                {station.title}
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
                {station.body}
              </p>
              <TopicLinks links={station.links} />

              {station.branch && (
                <div className="mt-6 flex">
                  <span
                    aria-hidden="true"
                    className="mt-3 h-5 w-6 shrink-0 rounded-bl-lg border-b border-l border-[var(--divider)] sm:w-10"
                  />
                  <div className="max-w-xl pt-1 pl-4">
                    <p className="font-mono text-xs uppercase tracking-widest text-[var(--text-subtle)]">
                      {station.branch.title}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                      {station.branch.body}
                    </p>
                  </div>
                </div>
              )}

              {station.layers && (
                <ol className="m-0 mt-6 list-none space-y-5 border-l border-[var(--divider)] p-0 pl-5 sm:pl-7">
                  {station.layers.map((layer, n) => (
                    <li key={layer.title} className="relative">
                      <span
                        aria-hidden="true"
                        className="absolute top-0.5 -left-5 flex h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full bg-[var(--brand-green-subtle)] font-mono text-[0.625rem] font-semibold text-[var(--brand-green)] sm:-left-7"
                      >
                        {n + 1}
                      </span>
                      <h4 className="text-base font-semibold tracking-tight">
                        {layer.title}
                      </h4>
                      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--text-muted)]">
                        {layer.body}
                      </p>
                      <TopicLinks links={layer.links} />
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </FadeIn>
        </li>
      ))}
    </ol>
  );
}
