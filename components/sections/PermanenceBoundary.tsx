import { FadeIn } from "@/components/ui/FadeIn";

/**
 * The permanence boundary and its qualification, shared by `/governance` and
 * `/overview/treasury`.
 *
 * Extracted rather than written twice. ECIP-1113 §1.4's qualification MUST NOT
 * be glossed, and the surest way to gloss it is to paraphrase it a second time
 * on a second page: the four clauses below are the checked wording, and one
 * copy of them cannot drift from another. Hosts supply their own heading and
 * lead-in; what is shared is every sentence that states what the specs say.
 *
 * Sourced from ECIP-1113 §1.4 (the immutability table and the qualification)
 * and ECIP-1112 §"Security Considerations" (the permanent commitment is the
 * destination). Read at ECIPs `local-edits` @ 3f3453e.
 */

const boundary = [
  {
    badge: "Permanent",
    permanent: true,
    title: "The Olympia Sovereignty Vault",
    spec: "ECIP-1112",
    body: "Around thirty lines of code with no owner, no role, no setter and no parameter to tune. It holds one address, fixed when it is built, and it forwards everything it receives there. This is the address consensus credits, so changing it is a hard fork.",
  },
  {
    badge: "Replaceable",
    permanent: false,
    title: "Everything below it",
    spec: "ECIP-1113",
    body: "The Olympia Treasury that holds the money, the Governor that spends it, the voting model, the sanctions oracle. Each of them is changed by an ordinary proposal, and none of it needs a fork or the agreement of anyone running a node.",
  },
];

export function PermanenceBoundary({ delay = 140 }: { delay?: number }) {
  return (
    <>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {boundary.map((item, i) => (
          <FadeIn key={item.title} delay={delay + i * 80} className="h-full">
            <div
              className={
                item.permanent
                  ? "flex h-full flex-col rounded-xl border border-[var(--border-brand)] bg-[var(--bg-elevated)] p-6"
                  : "flex h-full flex-col rounded-xl border border-[var(--divider)] bg-[var(--bg-elevated)] p-6"
              }
            >
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span
                  className={
                    item.permanent
                      ? "rounded-full border border-[var(--border-brand)] bg-[var(--bg-surface)] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[var(--brand-green)]"
                      : "rounded-full border border-[var(--border-default)] bg-[var(--bg-surface)] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]"
                  }
                >
                  {item.badge}
                </span>
                <a
                  href={`https://ecips.ethereumclassic.org/ECIPs/ecip-${item.spec.replace("ECIP-", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-[var(--border-brand)] bg-[var(--bg-surface)] px-2.5 py-0.5 font-mono text-[10px] text-[var(--brand-green)] transition hover:opacity-70"
                >
                  {item.spec}
                </a>
              </div>
              <h4 className="mb-2 text-base font-semibold">{item.title}</h4>
              <p className="text-sm leading-relaxed text-[var(--text-muted)]">{item.body}</p>
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={delay + 160}>
        <div className="mt-6 rounded-xl border border-[var(--divider)] bg-[var(--bg-surface)] p-6">
          <h4 className="text-sm font-semibold">
            The Treasury is replaceable, with one qualification worth stating
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
            What the fork makes unchangeable is where new revenue lands, not who is allowed to
            spend it. The Vault&rsquo;s destination is fixed at construction, so the
            Treasury standing at that address keeps receiving whatever arrives next. Governance
            can still deploy a successor and move the whole balance across by ordinary
            proposal, because the Treasury forwards arbitrary calls, and everything that
            accrues afterward can be moved the same way, indefinitely.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
            What never ends is the forwarding. So replacing the Treasury is a governance
            program with a step that repeats, rather than one vote that finishes the job, and
            no part of it needs a hard fork.
          </p>
        </div>
      </FadeIn>
    </>
  );
}
