import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { NetworkUtilizationFigure } from "@/components/ui/NetworkUtilizationFigure";
import { SECURITY_AUDIT_URL } from "@/lib/clients";

/**
 * Sections 2 to 6 of `/governance`: the five things the Treasury pays
 * for, in the operator's own order.
 *
 * Deliberately not five cards. The page already carries two card grids, and a
 * third would flatten five arguments of very different weight into one shape.
 * Each area is a numbered entry on a rail, prose-forward, with Network Security
 * carrying the live figures its argument actually rests on.
 *
 * Two constraints bind the Network Security copy and neither is negotiable:
 * no value or shape for the ECIP-1115/1116 parameters, which are unset by
 * design, and no framing of that mechanism as a block-reward split. The
 * direction of flow is the distinction, and the block reward is untouched.
 */

type Area = {
  eyebrow: string;
  heading: string;
  body: string[];
  items?: { term: string; detail: string }[];
  links?: { label: string; href: string }[];
  closing?: string;
};

const areas: Area[] = [
  {
    eyebrow: "Core Development",
    heading: "The software the network runs on",
    body: [
      "Ethereum Classic is whatever its client software says it is. Somebody has to write that software, review it, ship releases, and patch it when a vulnerability turns up. That work has never stopped being necessary and has never had a funding source the network itself controls.",
    ],
    items: [
      {
        term: "Fukuii",
        detail:
          "The primary client, and the first written for Ethereum Classic rather than adapted from an Ethereum one. One binary runs mainnet, the testnets and private networks.",
      },
      {
        term: "Core-Geth",
        detail:
          "In maintenance. A go-ethereum derivative, carried through the upgrade for the operators already running it. Its security record is published in full rather than described in the abstract.",
      },
      {
        term: "Client plugins",
        detail:
          "Adding Ethereum Classic support to Besu, Erigon, Ethrex, Go-Ethereum, Nethermind and Reth. This is future work, and nothing here ships today.",
      },
    ],
    links: [
      { label: "Compare the clients", href: "/clients" },
      { label: "Read the Core-Geth security audit", href: SECURITY_AUDIT_URL },
    ],
  },
  {
    eyebrow: "Critical Software",
    heading: "Developer tooling",
    body: [
      "A team deciding where to deploy compares what is in front of them on the day they look. If the testnet is awkward, the faucet is dry, or the explorer cannot show them their own transaction, they go elsewhere, and no argument about the chain's principles reaches them.",
      "The goal is unremarkable and that is the point: building on Ethereum Classic should feel like building on any other EVM chain, using the libraries a developer already knows.",
    ],
    items: [
      {
        term: "Public testnets",
        detail:
          "Somewhere to exercise a contract before it holds anything. Mordor is where the Olympia upgrade is tested first.",
      },
      {
        term: "Faucets",
        detail: "Testnet value handed out on request, without an application to fill in.",
      },
      {
        term: "Block explorers",
        detail:
          "Blockscout indexes both Mordor and mainnet, and it is where the live figures on this site come from.",
      },
      {
        term: "Endpoints and SDKs",
        detail:
          "Standard Ethereum tooling working unchanged. Rivet serves the public mainnet endpoint at etc.rivet.link.",
      },
    ],
  },
  {
    eyebrow: "Network Operations",
    heading: "Keeping the network reachable",
    body: [
      "Some infrastructure has no owner and everybody depends on it. It is invisible while it works, which is why it is chronically underfunded, and it is the first thing anyone notices when it stops.",
    ],
    items: [
      {
        term: "Public RPC endpoints",
        detail: "The address a wallet or an application actually talks to.",
      },
      {
        term: "Boot nodes",
        detail:
          "How a node that has just started finds the rest of the network. Without them a new node has nowhere to begin.",
      },
      {
        term: "Monitoring",
        detail:
          "Dashboards and alerting, so an outage is seen by somebody whose job it is to see it.",
      },
    ],
    closing:
      "None of this is a project that finishes. These are around-the-clock obligations, which is the kind of commitment a donation cycle funds badly and a standing treasury funds well.",
  },
  {
    eyebrow: "Network Security",
    heading: "Paying for security once the block reward runs down",
    body: [
      "Miner revenue on a proof-of-work chain has two parts: the block reward and transaction fees. Ethereum Classic's block reward is not a policy anyone revisits. Under ECIP-1017 it falls by a fifth every five million blocks, on a published schedule that continues until it approaches nothing.",
      "Fee income is what grows into the gap as the reward shrinks, and it only does so on a chain that has a fee market and demand to price. Ethereum Classic's schedule shrinks whether or not either exists.",
    ],
    closing:
      "So the fee market is what a falling reward has to be met with, and building it is core development work. That is why this counts as security spending rather than as a nice-to-have: a network that cannot pay the people securing it does not stay secure. Treasury revenue and miner fee income grow from the same thing, which is transactions people actually want to make.",
  },
  {
    eyebrow: "Development Community",
    heading: "Funding the work instead of employing the worker",
    body: [
      "Core development funding on Ethereum Classic has historically moved through private payrolls. An organization raises money, hires a team, and the network receives whatever that arrangement produces. Two consequences follow from the shape of the arrangement rather than from anyone's conduct: the work lasts exactly as long as the employer's balance sheet does, and the incentives that govern it are the employer's, which need not match growing the network.",
      "The alternative is to fund the work. Contribute, build on Ethereum Classic, then apply for funding for what you delivered. That opens the same process to any of the thousands of developers already working in the EVM ecosystem, without any of them having to be hired first.",
      "Retrospective funding is the preferred form. The work is complete and independently verifiable when the proposal is submitted, so voters are looking at merged changes, a published audit, or a service with a usage record, rather than at a plan. Prospective funding stays available where the work genuinely cannot be delivered first, and a proposal asking for it has to say why.",
    ],
    closing:
      "Two things about that preference are easy to get backwards in opposite directions, so both are worth stating. Completed work creates no claim on the Treasury, and a retrospective proposal can be declined like any other. And the preference is a governance norm rather than a rule in the contracts, because nothing on-chain tells the two forms apart. Anyone who wants to see this work funded can contribute to the Treasury directly, without standing up an organization to spend it, and what they add stays publicly accounted for and available to the whole development community.",
  },
];

function isExternal(href: string): boolean {
  return href.startsWith("http");
}

export function FundingMandateSection() {
  return (
    <>
      <SectionDivider />
      <section
        id="what-the-dao-funds"
        aria-labelledby="funding-mandate-heading"
        className="py-20 md:py-24"
      >
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn>
            <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-widest text-[var(--brand-green)]">
              What the DAO funds
            </p>
            <h2
              id="funding-mandate-heading"
              className="mb-4 text-3xl font-bold tracking-tight md:text-4xl"
            >
              Five things the Treasury pays for
            </h2>
            <p className="max-w-3xl text-base leading-relaxed text-[var(--text-muted)]">
              None of these are new needs. Every one of them is work the network has always
              depended on and has never had a reliable way to pay for. What changes is where the
              money for it comes from, and who gets to decide how it is spent.
            </p>
          </FadeIn>

          <ol className="mt-14 space-y-14">
            {areas.map((area, i) => (
              <li key={area.eyebrow}>
                <FadeIn delay={40}>
                  <div className="grid gap-5 md:grid-cols-[3.5rem_1fr] md:gap-8">
                    <div className="flex flex-row items-center gap-4 md:flex-col md:items-stretch md:gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--border-brand)] bg-[var(--bg-surface)] font-mono text-sm font-bold text-[var(--brand-green)]">
                        {i + 1}
                      </span>
                      <span
                        className="h-px flex-1 bg-[var(--divider)] md:mx-auto md:h-full md:w-px md:flex-none"
                        aria-hidden="true"
                      />
                    </div>

                    <div>
                      <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[var(--brand-green)]">
                        {area.eyebrow}
                      </p>
                      <h3 className="mt-1.5 text-xl font-semibold tracking-tight">
                        {area.heading}
                      </h3>

                      {area.body.map((paragraph) => (
                        <p
                          key={paragraph.slice(0, 40)}
                          className="mt-4 max-w-3xl text-sm leading-relaxed text-[var(--text-muted)]"
                        >
                          {paragraph}
                        </p>
                      ))}

                      {area.eyebrow === "Network Security" ? (
                        <div className="mt-6">
                          <NetworkUtilizationFigure />
                        </div>
                      ) : null}

                      {area.items ? (
                        <dl className="mt-6 space-y-4">
                          {area.items.map((item) => (
                            <div key={item.term}>
                              <dt className="text-sm font-semibold text-[var(--text-primary)]">
                                {item.term}
                              </dt>
                              <dd className="mt-1 max-w-3xl text-sm leading-relaxed text-[var(--text-muted)]">
                                {item.detail}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      ) : null}

                      {area.closing ? (
                        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[var(--text-muted)]">
                          {area.closing}
                        </p>
                      ) : null}

                      {area.eyebrow === "Network Security" ? (
                        <div className="mt-6 rounded-xl border border-[var(--divider)] bg-[var(--bg-surface)] p-5">
                          <h4 className="text-sm font-semibold">
                            What this does not do to mining revenue
                          </h4>
                          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--text-muted)]">
                            Nothing in Olympia changes what a miner is paid today. ECIP-1017 block
                            rewards are untouched and priority tips are untouched. The base fee is
                            a separate component Ethereum Classic does not have at
                            all, and ECIP-1111 introduces it and credits it to the Olympia
                            Sovereignty Vault rather than destroying it as Ethereum does, which
                            leaves every existing component of miner revenue untouched.
                          </p>
                          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--text-muted)]">
                            Later stages return part of that new stream to miners. That is the
                            opposite of a block-reward split: value moves toward miners, out of a
                            stream that does not exist before this upgrade and that no miner has
                            ever received. How large a part, and over what window, are both left
                            deliberately unset, and they stay unset until a real deployment has
                            shown what those answers should be.
                          </p>
                        </div>
                      ) : null}

                      {area.links ? (
                        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                          {area.links.map((link) =>
                            isExternal(link.href) ? (
                              <a
                                key={link.href}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--brand-green)] transition hover:opacity-80"
                              >
                                {link.label}
                                <ExternalLink size={12} aria-hidden="true" />
                              </a>
                            ) : (
                              <Link
                                key={link.href}
                                href={link.href}
                                className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--brand-green)] transition hover:opacity-80"
                              >
                                {link.label}
                              </Link>
                            )
                          )}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </FadeIn>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
