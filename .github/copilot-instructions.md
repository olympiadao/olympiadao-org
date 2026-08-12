# GitHub Copilot Instructions: OlympiaDAO.org

> **Important:** GitHub Copilot only reads this file and your project code. It does NOT have access to global settings. All LTS rules must be included here.

## Project

Landing page for the Olympia upgrade — a staged governance and funding system for Ethereum Classic. Dark-first design (#0a0f10) with neon green (#00ffae) accents.

## LTS Enforcement (CRITICAL)

**ALWAYS use current stable LTS versions.**

| Technology | Version |
|------------|---------|
| Node.js | 24.x |
| Next.js | 16.x |
| React | 19.x |
| TypeScript | 5.x |
| Tailwind CSS | 4.x |
| pnpm | 10.x |

**Never suggest:** Node 22, Next.js 14/15, React 18.

## Tech Stack

- Next.js 16.x (App Router, Turbopack)
- React 19.x, TypeScript 5.x (strict)
- Tailwind CSS 4.x (CSS-first `@theme inline`)
- Lucide React (icons)
- Inter (UI) + JetBrains Mono (code/addresses)

## Commands

```bash
pnpm dev          # Dev server (Turbopack)
pnpm build        # Production build
pnpm lint         # ESLint
pnpm typecheck    # tsc --noEmit
```

## Key Rules

1. Use TypeScript strict mode
2. Use CSS custom properties from `app/globals.css` for brand colors
3. Use `cn()` from `@/lib/utils` for class merging. It is a thin `clsx` wrapper —
   there is no `tailwind-merge` here, so it does not de-duplicate conflicting
   Tailwind classes
4. Use Lucide React for icons — no Font Awesome
5. CSS transitions only — no GSAP, R3F, or Lenis
6. `lib/contracts.json` is the single source of truth for contract addresses
7. There is **no `test` script and no test runner** in this repo. Do not invent a
   call to one. There is no Prettier config either — match style by hand

## Server Rendering

A client component IS server-rendered. `useSearchParams()`, reached through the
chain hooks, opts a subtree out of static prerender, so a crawler receives the
**Suspense fallback**. A bare `<Suspense>` has no fallback and emits nothing.
Fallbacks live in `components/ui/SsrFallbacks.tsx` and carry the same headings
and links as the real components. Fix the fallback, not the boundary, and never
add a `<Suspense>` without one.

## Color and Contrast

Every `:root` token in `app/globals.css` has a matching `.dark` override — keep
it that way, or a token inherits its light value into dark mode.

- Measure contrast against the **actual composited background, not white**. The
  worst real light surface is `--bg-elevated`; measuring against white inflates
  every number
- Small badge and body text needs **4.5:1**; 3.0 is for large text and graphical
  objects only
- Never hardcode a hex or `rgba()` in a component — it cannot invert
- Recharts needs literal colors, so chart colors switch on `resolvedTheme`. Every
  color in such a file must switch; none may be a bare hex
- **`app/globals.css` is the authority for every color value.** Any hex written
  into an instruction file, this one included, is a convenience copy and is the
  side that is wrong when the two disagree
- Badge convention: **violet** = Ethereum upgrade tracks, **green** = ETC-native,
  **gray** = maintenance/neutral. **Amber is reserved for olympiatreasury-org**
  and must not be used here

## Content Accuracy

The ECIP specifications are authoritative and are revised as a set. The rendered
ECIPs site, the register's default branch and any `raw.githubusercontent.com`
fetch are an older document set that answers every question with no signal a
newer version exists. Check any claim about an ECIP against the specs in the same
pass that writes it.

**The suite is ECIP-1111, 1112, 1113, 1114, 1115, 1116, 1117, 1118, 1119, 1121
and 1122** — eleven, stated positively, with no exclusion clause naming
anything. No other ECIP number belongs in Olympia content except a dependency the
specs cite: ECIP-1000, 1017, 1051, 1098, 1100, 1109. A **client** page may name an
ECIP that client implements (ECIP-1099, the Etchash epoch schedule); that is
client content, not Olympia content.

### Fixed vocabulary — two named contracts, and no third term

| | **Olympia Sovereignty Vault** | **Olympia Treasury** |
|---|---|---|
| Spec | **ECIP-1112** | **ECIP-1113** §1.3 |
| Is | the permanent hardcoded `BASEFEE` destination | the `TimelockController` |
| Funds | **land** here | **live** here while governance decides |
| Lifetime | immutable, never replaced | replaceable by governance, no fork |

- **"Sovereignty Vault" is the contract's name, not a name for the fund**, and
  the fund is not a thing any ECIP specifies. A lowercase "sovereignty vault"
  standing for the money is a third term the suite does not have
- **Never attribute the Treasury to ECIP-1112.** ECIP-1112 specifies the Vault
  and only the Vault
- **The contract is not an accumulator; it is where base-fee revenue
  accumulates.** The verb is correct and stays — only the capitalized noun was
  retired, so never blanket-replace `accumulat*`

### The architecture

- **Exactly one contract is permanent** — the Vault, at the address
  consensus credits. Everything below it, the Timelock included, is replaceable
  by ordinary governance. That single boundary is the architecture
- **The Timelock's replaceability carries a qualification ECIP-1113 §1.4 says
  MUST NOT be glossed.** The Vault's `destination` is immutable, so it
  fixes where new revenue lands, not who spends it: the incumbent Timelock stays
  the standing inbox for base-fee revenue. A successor is deployable and fundable
  by ordinary proposal, with no hard fork (§11.3), so a replacement is a
  governance program with a recurring forwarding step rather than a single act.
  **Do not "correct" this into "the Treasury cannot be replaced"** — ECIP-1112
  §"Security Considerations" is about the address, ECIP-1113 §1.4 about the
  contract, and both hold at once
- **There is no Executor contract.** Execution is
  `TimelockController.execute()`/`executeBatch()` gated on `EXECUTOR_ROLE`, which
  ECIP-1113 §1.3 grants to the Governor and nothing else. The binding sanctions
  check is `Governor._executeOperations`, a `virtual` override, not a contract.
  Never write "the Governor, Timelock and Executor pipeline"
- **Nothing is predicted.** ECIP-1112 forbids `CREATE2` derivation, init-code
  freeze and reserved deployer nonces in terms. Deploy first, point consensus at
  the real published address afterward
- **The base fee is not the transaction fee.** A transaction pays a base fee
  **plus** a priority tip; Olympia changes only where the base fee goes, and
  ECIP-1017 block rewards and priority tips are untouched. **Never write "the
  burned half"** — EIP-1559 is not active on ETC, so nothing is burned today
- Basefee is the **only** protocol-defined Treasury funding source — no ECIP
  directs mining revenue to it
- **Two DAOs, two mandates, neither beneath the other.** ECIP-1113 **Olympia
  DAO** holds the network's core — clients, network security, critical
  infrastructure, and the work the ECIP process produces — by binding CoreNFT
  membership vote. ECIP-1117 **Olympia Futarchy Grants DAO** holds everything
  built on top, public ecosystem growth and grants, decided by conditional
  markets **anyone holding ETC or USC** may take a position in, with no
  membership, application, sponsor or CoreNFT. Neither replaces the ECIP process
- **Write "Affiliated DAO", and never any "Child" framing of it.** ECIP-1113 §6:
  *"An Affiliated DAO works alongside Olympia DAO, not beneath it."* Its
  constraints are the ones
  every recipient of Treasury funds operates under. Olympia DAO decides whether
  and how much to seed, never what the seeded funds are spent on
- **The funding path runs one way:** `BASEFEE -> ECIP-1112 Vault -> ECIP-1113
  Treasury -> OFP seeds a season (ECIP-1114) -> ECIP-1117 allocates`
- **The allocation unit is a SEASON, not a round** (ECIP-1117 §Seasons: *"A
  season is the unit."*). Seeded before it opens, never drawing on another
  season's seed, never rolling a remainder forward, never automatic, and MAY be
  confined to a theme that binds eligibility and not the outcome. The Grants DAO
  is permanent; its seasons are not. **Do not take "round" from the spec**, and
  make no claim about the precedent programs it names
- **ECIP-1118 is milestone-gated disbursement, not "streaming"**, and it is
  available to any Olympia funding proposal
- **The CoreNFT electorate is open to earn and closed to buy** — minted on proof
  of substantive contribution, no identity verification required or permitted,
  soulbound so the only exit is a burn, one non-delegable vote each. Never
  describe it as closed, exclusive, or a fixed council
- **Roadmap order and deployment order legitimately diverge.** ECIP-1121:
  *"Staging is a rollout schedule, not a deployment mechanism."* Every contract
  **the Stage 1 fork commits to** is deployed and audited **before that block**
  (CoreNFT, Timelock, Governor, Vault), so the audit window sits before the
  fork, not between the stages. Stages 1 and 5 are hard forks; 2 is governance
  going live, 3 a contract deployment, 4 a governance activation
- **But two Stage 2 components are deliberately outside that set.** The sanctions
  oracle and the ECIP-1114 OFPRegistry each attach through a Timelock-gated
  setter, are a constructor argument to nothing, and MAY be deployed and bound
  after activation; the Governor's gate fails closed until the oracle is bound.
  **Never write "every Stage 1 and Stage 2 contract is deployed before the
  fork"**, and never write that nothing deploys at Stage 2
- **Only ECIP-1119 checkpoint 2 binds today** — `Governor._executeOperations`.
  Checkpoint 1 (the ECIP-1114 Registry) is advisory and skippable; checkpoints 3
  and 4 bind the contracts taking custody after the Treasury releases, the
  ECIP-1118 milestone-gated disbursement contract and the liquidity vault of the
  ECIP-1117 Affiliated DAO. Claim no coverage beyond the Treasury path, and never
  call a code-bearing target exactly screened
- **Say coverage stops, not that a contract is unwritten.** A checkpoint is
  satisfied when its contract is deployed carrying the rule and audited.
  ECIP-1119 dropped its own deployment-status column because such a sentence is
  wrong from whenever it is next read and nothing forces the edit
- **`f`, `N` and `L(j)` are TBD by design** — ECIP-1116 takes them from what
  ECIP-1115 demonstrates in production. No value and no curve shape anywhere. **A
  bound is not a value**
- Nothing has activated; activation blocks are **TBD**. Status goes in a badge,
  never in prose

### `lib/contracts.json` is the architecture, and carries no addresses

Six contracts with the ECIP that specifies each: `OlympiaSovereigntyVault`,
`TimelockController`, `OlympiaGovernor`, `CoreNFT`, `SanctionsOracle`,
`OFPRegistry`. **No address, no salt, no deployer** — an address is a property of
a deployment and it dates the page, and a `salt` asserts the `CREATE2` derivation
ECIP-1112 forbids. Numbers on the site read live from chain state through
`lib/config.ts`, which holds endpoints only. The funding process is an **OFP**
(ECIP-1114) and its registry is `OFPRegistry`; `ECFP` is a dead draft name.

### Measured figures

Measured network figures **are** published here: measure, date, attribute to the
source, and re-measure before publishing rather than carrying a figure forward.
Three exclusions: any value or shape for `f`, `N` or `L(j)`; the hashrate series
that circulates in draft material, which was measured and refuted and is simply
wrong; and ECIP-1111's Motivation figures republished as the register's, which
carry an unresolved pre-publication marker. Measure and attribute, do not lift.

### Standing checks

- Glamsterdam is the alignment target; Fusaka is a delivered cycle and stays.
  Never write "full Glamsterdam parity"
- Verify enumeration counts match what is enumerated
- A copy fix is not applied until the phrase is swept repo-wide
- Keep `public/llms.txt` in sync with page copy. Its FAQ is **generated** from the
  pages' own `faqItems` — fix the page source and regenerate, never hand-edit

## Protected Files

Do not modify without explicit request:
- `app/globals.css` — design tokens
- `app/layout.tsx` — root layout
- `public/logo.svg` — brand logomark
- `tsconfig.json`, `next.config.ts`

## Code Style

- 2-space indentation
- Double quotes for strings
- Semicolons
- Trailing commas in multiline

## Structure

```
app/              # Pages, layout, globals, SEO files
  overview/       # the primary Olympia page + seven <topic> children
  clients/        # client index + a page per client
  governance/, upgrade/
components/
  sections/       # Page sections
  ui/             # Reusable components
lib/              # Data layer + single-source content files
  contracts.json  # deployed addresses
  treasury.ts, network.ts        # Blockscout reads
  overview-topics.ts, clients.ts # each feeds several routes at once
  nav-links.ts, config.ts, utils.ts
public/           # Static assets (logo, OG image, llms.txt)
```

`lib/overview-topics.ts` and `lib/clients.ts` supply slugs, headings, metadata and
`keywords` to several routes each — an edit there lands on every route that reads
it.

## Validation

Before committing:

```bash
pnpm lint && pnpm typecheck && pnpm build
```

## Don't

- Commit .env files or secrets
- Use `any` type
- Skip type errors with `@ts-ignore`
- Use deprecated versions
- Add animation libraries
- Add wallet connectivity — this is the marketing site, not the dApp
- Drop or regenerate `pnpm.overrides` in `package.json` — each pin closes a
  specific security advisory
- Add, change, or recommend changing `LICENSE` — licensing is deliberate

## Response Style

- Code first, explanations only if asked
- Concise bullet points over paragraphs
- Get straight to the answer
