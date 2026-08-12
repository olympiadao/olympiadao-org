# OlympiaDAO.org

Landing page for the Olympia upgrade — on-chain governance and treasury
infrastructure for Ethereum Classic. Public marketing/documentation site, not a
dApp: there is no wallet connectivity here and none should be added.

- **Production:** https://olympiadao.org (Vercel)
- **Chains referenced:** Mordor testnet (63, default) and ETC mainnet (61)

## Setup

```bash
pnpm install      # Node >=24, pnpm 10.x
pnpm dev          # dev server (Turbopack)
pnpm build        # production build
pnpm lint         # ESLint
pnpm typecheck    # tsc --noEmit
```

**There is no `test` script in `package.json`, and no test runner is
configured.** Do not assume either exists and do not invent a call to one. There
is also no Prettier config anywhere in the repo — match surrounding style by
hand rather than trusting a formatter to normalize it. ESLint is configured in
`eslint.config.mjs` (flat config) from `eslint-config-next` core-web-vitals plus
typescript.

## Stack

Versions are read from `package.json`; prefer the major series over an exact
patch when citing them.

| Layer | What | Version |
|---|---|---|
| Runtime | Node.js | >=24 (`.nvmrc` pins 24) |
| Package manager | pnpm | 10.x (`packageManager` pins the exact patch) |
| Framework | Next.js | 16.x, App Router, Turbopack |
| UI | React | 19.x |
| Language | TypeScript | 5.x, strict |
| Styling | Tailwind CSS | 4.x, CSS-first `@theme inline` |
| Data | @tanstack/react-query | 5.x — live treasury data |
| Charts | Recharts | 3.x |
| Chain | viem | 2.x — chain defs, `formatEther` |
| Icons | lucide-react | — |
| Theme | next-themes | light/dark |

`cn()` in `lib/utils.ts` is a thin `clsx` wrapper — there is no `tailwind-merge`
in this repo, so it does not de-duplicate conflicting Tailwind classes.

## Structure

```
app/
  globals.css          design tokens (light + dark) and Tailwind theme
  layout.tsx           root layout, fonts, metadata, JSON-LD, providers
  page.tsx             home
  overview/            the primary Olympia page, plus seven <topic> children
  clients/             ETC client implementations, plus a page per client
  governance/          what the DAO funds and why
  upgrade/             how to upgrade, a funnel to running Fukuii
  sitemap.ts           enumerates every real route
  manifest.ts, robots.txt/route.ts, not-found.tsx
components/
  sections/            page sections
  ui/                  FadeIn, SectionDivider, Accordion, PropertyCard,
                       SsrFallbacks, ClientBadges
  chain-selector.tsx, theme-toggle.tsx, theme-provider.tsx
lib/
  config.ts            per-chain endpoints and constants. No contract address
  contracts.json       the contract ARCHITECTURE — name, spec, role. No addresses
  network.ts           mainnet-only network stats and the ECIP-1017 reward math,
                       deliberately not chain-aware
  overview-topics.ts   single source for the seven /overview/<topic> pages
  clients.ts           single source for both client pages and the index
  olympia-eips.ts      single source for every EIP count and fee floor
  nav-links.ts         nav entries, including the featured /overview link
  providers.tsx        React Query provider
  hooks/               use-network, use-chain, use-chain-config
public/
  llms.txt             MUST stay in sync with page copy
  logo.svg, og-image.png, chains/
```

`lib/overview-topics.ts` and `lib/clients.ts` each feed several routes at once —
slugs, headings, metadata and `keywords` — so a change there lands everywhere
those routes render. Check what else reads a file before editing either.

## Data

Blockscout API v2 — `etc-mordor.blockscout.com` and `etc.blockscout.com`.
Refetch 10 min, stale 5 min. Active chain comes from the `?chain=` search param.

## Server rendering

**A client component IS server-rendered.** If content is missing from the SSR
HTML the cause is conditional rendering, not the client boundary.

`useSearchParams()` — reached through the chain hooks — opts a subtree out of
static prerender, so what a crawler receives is the **Suspense fallback**. A
bare `<Suspense>` has no fallback and therefore emits nothing at all.
`components/ui/SsrFallbacks.tsx` holds fallbacks that carry the same landmarks,
headings and links as the real components. **Fix the fallback, not the
boundary**, and never add a `<Suspense>` without one.

## Color and contrast

All color goes through the CSS custom properties in `app/globals.css`. Every
`:root` token has a matching `.dark` override; keep it that way, because a token
defined only in `:root` inherits its light value into dark mode.

- **Measure contrast against the actual composited background, not white.**
  `--bg-card` is a translucent white over `--background`; the worst real surface
  in light mode is `--bg-elevated`. Measuring against white inflates every number.
- Small badge and body text needs **4.5:1**. The 3.0 threshold is for large text
  and graphical objects (chart strokes, icons) only.
- Never hardcode a hex or `rgba()` in a component — it cannot invert, so it
  renders the dark-mode value in light mode.
- **Recharts needs literal color values**, so chart colors switch on
  `resolvedTheme` in JS. Every color in such a file must switch; none may be a
  bare hex.

Badge color convention across the Olympia sites: **violet** = Ethereum upgrade
tracks · **green** = ETC-native · **gray** = maintenance/neutral · **amber** is
reserved for `olympiatreasury-org` and must not be introduced here.

## Brand and design alignment

Dark-first. Primary green is `#00ffae` in dark and `#007a53` in light (the light
value is set by the contrast rule above, not chosen aesthetically — do not
"restore" it to a brighter green). Dark background `#0a0f10`. Fonts are Inter for
UI and JetBrains Mono for code and addresses.

**`app/globals.css` and `olympia-brand/tokens/colors.json` are the authority for
every value in that paragraph; the hex codes here are a convenience copy.** Read
them from the token files rather than from this file, and when they disagree,
this file is the one that is wrong. It carried `#00734d` for the light green
until 2026-08-09, against `#007a53` in both token files, and
`verify-contrast.py` reported zero drift from the brand repo throughout, so the
sweep that would have caught it was measuring the two places that already
agreed.

Follows the ETC DAO institutional patterns from `ethereumclassicdao-org`:

- FadeIn scroll animations, 700ms ease-out, via IntersectionObserver
- SectionDivider gradient lines between sections
- Card pattern: `rounded-xl border border-[var(--divider)] bg-[var(--bg-elevated)]`
- `section-alt` alternating backgrounds
- Narrative: "Coordinating Organizations", "basefee revenue", "block rewards
  untouched"

**`ethereumclassicdao-org` is the reference for shared positioning.** Client
descriptions, the five-stage roadmap, and badge vocabulary are aligned to it
rather than paraphrased — compare against that repo before rewriting any of them.

## Content accuracy

Public copy makes claims about ECIPs. **The specs are authoritative, they are
revised as a set, and three surfaces that read as canonical are an older
document set** — the rendered ECIPs site, the register's default branch, and any
`raw.githubusercontent.com` fetch. Each answers every question you ask it, with
no error and no signal that a newer version exists. **Confirm which copy you are
reading before quoting it** — `CLAUDE.local.md`, which is gitignored, names the
authoritative one where a local copy exists. Then check every sentence stating
what an ECIP specifies **in the same pass that writes it**, never as a later
accuracy sweep.

**The Olympia suite is ECIP-1111, 1112, 1113, 1114, 1115, 1116, 1117, 1118,
1119, 1121 and 1122.** Eleven specifications, stated positively, with no
exclusion clause naming anything. **No ECIP number outside those eleven belongs
in Olympia content**, except a dependency the specs themselves cite: ECIP-1000
(the ECIP process), 1017 (monetary policy), 1051 and 1098 (earlier treasury
designs), 1100 (MESS) and 1109 (Spiral). A **client** page may separately name
an ECIP that client implements — ECIP-1099, the Etchash epoch schedule, is the
live instance — which is client content rather than Olympia content. Any other
number is an error whatever the sentence says about it, so check the number
before checking the claim.

### Vocabulary, fixed

**There are exactly two named contracts and no third term.**

| | **Olympia Sovereignty Vault** | **Olympia Treasury** |
|---|---|---|
| Spec | **ECIP-1112** | **ECIP-1113** §1.3 |
| Is | the permanent hardcoded `BASEFEE` destination | the `TimelockController` |
| Funds | **land** here | **live** here while governance decides |
| Lifetime | immutable, never replaced | replaceable by governance, no fork |

**"Sovereignty Vault" is the contract's name. It is not a name for the fund, and
the fund is not a thing any ECIP specifies** (ECIP-1112 §"Simple Summary"). A
lowercase "sovereignty vault" standing for the money itself is a third term the
suite does not have, and it reads as the Treasury. Write one of the two
contracts.

**Never attribute the Treasury to ECIP-1112.** ECIP-1112 specifies the Vault and
only the Vault; the Treasury is ECIP-1113's. That error was live in the specs
three times before it was fixed there, so check copy for it specifically.

**The contract is not an accumulator; it is the place where base-fee revenue
accumulates.** The verb is correct everywhere and stays. Only the capitalized
noun was retired, so do not blanket-replace `accumulat*`.

### The architecture, stated as the facts copy keeps missing

**Exactly one contract is permanent, and that single boundary is the
architecture.** The Vault sits at the address consensus credits, and changing it
costs a hard fork. Everything below it — the Governor, the Timelock, the voting
model, the sanctions oracle — is replaceable by ordinary governance. Copy that
does not carry this has not described the design.

**The Timelock is replaceable, and the qualification ECIP-1113 §1.4 says MUST
NOT be glossed is that the incumbent stays the inbox.** The Vault's
`destination` is immutable, so it fixes where new revenue *lands*, not who
spends it. A successor Timelock is deployable and fundable by ordinary proposal,
because the incumbent forwards arbitrary calls and can move its whole balance
onward, and it can do so again for any later accrual (§11.3). No hard fork is
involved. What never ends is the forwarding, so a replacement is a governance
program with a recurring step rather than a single act. **Do not "correct" this
into "the Treasury cannot be replaced."** ECIP-1112 §"Security Considerations"
says the permanent commitment is the destination, which is a statement about the
address; ECIP-1113 §1.4 says the Timelock itself is replaceable. Both hold at
once, and reading only the first inverts the claim.

**There is no Executor contract.** Execution is
`TimelockController.execute()`/`executeBatch()`, gated on `EXECUTOR_ROLE`, which
ECIP-1113 §1.3 grants to the Governor and to nothing else. The binding sanctions
check is `Governor._executeOperations`, a `virtual` override rather than a
contract. Never write "the Governor, Timelock and Executor pipeline", and never
name an Executor as the binding check.

**Nothing is predicted.** ECIP-1112 forbids `CREATE2` derivation, an init-code
freeze and a reserved deployer nonce in terms. Contracts deploy first and the
real, published address is what consensus is pointed at afterward. Any sentence
reasoning about a derived, frozen or reserved address describes a design that no
longer exists, and there is no true version of it to rewrite into.

**The base fee is not the transaction fee.** A transaction pays a base fee
**plus** a priority tip. Olympia changes where the base fee goes and nothing
else: ECIP-1017 block rewards and priority tips are untouched. **Do not write
"the burned half."** ETC has no base fee today because EIP-1559 is not active,
so nothing is being burned that could be redirected — the phrase has already
been swept off four surfaces and it returns every time someone paraphrases from
Ethereum. Where copy goes past "tips are untouched", ECIP-1111 §Rationale is the
bound: at the minimum the miner's floor rises, and above it one gwei moves from
tip to Treasury at a fixed total gas price.

**Basefee is the only protocol-defined Treasury funding source.** No ECIP
directs mining revenue to the Treasury.

**Two DAOs, two mandates, neither beneath the other.** ECIP-1113 **Olympia DAO**
holds the network's core: client development and maintenance, network security,
critical infrastructure, and the work the ECIP process produces, decided by
binding CoreNFT membership vote. ECIP-1117 **Olympia Futarchy Grants DAO** holds
everything built on top: public ecosystem growth and grants, decided by
conditional markets that **anyone holding ETC or USC** may take a position in,
with no membership, application, sponsor or CoreNFT. **Neither replaces the ECIP
process.**

**Write "Affiliated DAO", and never any "Child" framing of it.** ECIP-1113 §6:
*"An Affiliated DAO works
alongside Olympia DAO, not beneath it."* The constraints §6 imposes are the ones
**every** recipient of Treasury funds operates under, so they are not marks of
subordination. Olympia DAO's whole authority over one is deciding whether and
how much to seed, never what the seeded funds are spent on. Core needs are
funded first because every seeding proposal competes against client maintenance
and security response in the same Governor, under the same quorum.

**The funding path runs one way:**

```
BASEFEE -> ECIP-1112 Vault -> ECIP-1113 Treasury -> OFP seeds a season -> ECIP-1117 allocates
                                (Olympia DAO votes)     (ECIP-1114)        (the public decides)
```

**The allocation unit is a SEASON, not a round.** ECIP-1117 §Seasons: *"A season
is the unit."* A season is seeded before it opens, MUST NOT draw on another
season's seed, MUST NOT roll a remainder forward, and is never automatic. It MAY
be confined to a stated theme, and that scope binds eligibility and never the
outcome. **The Grants DAO is permanent; its seasons are not**, and between them
it holds nothing to allocate. Operating costs are funded by their own ordinary
proposal and are not season-scoped, so do not conflate the two. **Do not take
"round" from the spec** — it survives there only for the precedent programs
others ran, and no claim about those may appear here.

**ECIP-1118 is milestone-gated disbursement, not "streaming"**, and it is
available to **any** Olympia funding proposal rather than only to
futarchy-originated ones.

**The CoreNFT electorate is open to earn and closed to buy.** Minted on proof of
substantive contribution; no identity verification is required and none may be
imposed; soulbound, so the only exit is a burn; one non-delegable vote each. Do
not describe membership as closed, exclusive, or a fixed council.

**Roadmap order and deployment order legitimately diverge**, and flattening them
is the most common misreading of the roadmap. ECIP-1121: *"Staging is a rollout
schedule, not a deployment mechanism."* Every contract **the Stage 1 fork commits
to** is deployed, audited and readable on-chain **before that block**: CoreNFT,
the Timelock, the Governor and the Vault. So the audit window sits before
the fork rather than between the two stages. Stages 1 and 5 are hard forks;
Stage 2 is governance going live, Stage 3 is a contract deployment, and Stage 4
is a governance activation.

**Two Stage 2 components are deliberately outside that set, and writing "every
Stage 1 and Stage 2 contract is deployed before the fork" is the error this
paragraph replaced.** The sanctions oracle and the ECIP-1114 OFPRegistry each
attach through a Timelock-gated setter, are a constructor argument to nothing,
and MAY be deployed, audited and bound after activation. Until the oracle is
bound the Governor's gate fails closed, which is what makes deferring that audit
safe. ECIP-1121 §"The Five-Stage Olympia Roadmap" states both halves; four specs
contradicted the older summary and the summary was the thing that was wrong.
**Stage 2 is therefore not "nothing deploys here"** either.

**Sanctions coverage stops at the Treasury path.** ECIP-1119 names four
checkpoints and **only checkpoint 2 binds today**: `Governor._executeOperations`,
unavoidable because `EXECUTOR_ROLE` is Governor-only. Checkpoint 1, the ECIP-1114
Registry, is advisory and skippable through a direct `propose()`. Checkpoints 3
and 4 bind the contracts that take custody **after** the Treasury releases: the
milestone-gated disbursement contract of ECIP-1118, and the liquidity vault and
promotion path of the ECIP-1117 Affiliated DAO. Claim coverage over checkpoints 1 and
2 and nothing beyond, and never describe a code-bearing target as exactly
screened.

**State the bound as a condition, not as a deployment status.** A checkpoint is
satisfied when its contract is deployed carrying the rule and an audit confirms
it. ECIP-1119 deliberately removed its own "the contract is not yet written"
column for the reason that reaches this site too: a sentence reporting which
contracts exist is wrong from whenever it is next read, and nothing forces the
edit. Write that coverage stops at the Treasury path, not that someone has yet
to write something.

**`f`, `N` and `L(j)` are TBD by design.** ECIP-1116 takes them from what
ECIP-1115 demonstrates in production, so publishing a value or a curve shape
anywhere — prose, a table, a chart — answers the question the sequencing exists
to ask. **A bound is not a value:** `0 < f < 1` is publishable; a number for `f`
is not.

**Nothing has activated.** Activation blocks are **TBD** on Mordor and Mainnet.
Mutable status belongs in a badge, never in prose.

### `lib/contracts.json` is the architecture, and carries no addresses

Six contracts, each with the ECIP that specifies it and what it does:
`OlympiaSovereigntyVault`, `TimelockController`, `OlympiaGovernor`, `CoreNFT`,
`SanctionsOracle`, `OFPRegistry`. **No address, no salt, no deployer.**

**An address is a property of a deployment; this file states the design.** A
published address also dates the page, and a `salt` would assert the `CREATE2`
derivation ECIP-1112 forbids in terms. Anything on the site showing a number
reads it live from chain state through `lib/config.ts`, which holds endpoints
only.

**The funding process is an OFP** (Olympia Funding Proposal, ECIP-1114) and its
registry is `OFPRegistry`. `ECFP` is a dead draft name with zero hits across the
whole spec suite; there is no Executor contract, and no Sybil-resistance
requirement on an Affiliated DAO's internal mechanism.

### Measured figures are published here, with three exclusions

This is an explainer site whose job is to make the network legible to the
public, and a measured data point with provenance is what does that work. The
ECIPs register publishes under a different standard, being a normative document
set where an unresolved figure becomes a claim the specification has to stand
behind; that standard does not transfer here. Measure it, date it, attribute it
to the source, and **re-measure before publishing** rather than carrying a
figure forward.

Three things stay off the site, and none of them is a publishing-standards
question:

- **Any value or shape for `f`, `N` or `L(j)`** — a spec constraint, above.
- **The hashrate series that circulates in draft material.** It was measured and
  refuted, so it is simply wrong, and wrong does not become publishable under a
  different standard. A fresh measurement carrying its own provenance is a
  different thing; that series is not it.
- **ECIP-1111's Motivation figures, republished as the register's.** They carry
  an unresolved pre-publication marker, which is the register's gate on its own
  numbers. Measuring ETC mainnet from here and citing Blockscout is a different
  act from lifting a figure the register has not cleared. Measure and attribute;
  do not lift.

### Standing checks

- Glamsterdam is the alignment target, but Fusaka is a delivered cycle and is
  not removed. Never write "full Glamsterdam parity".
- **Verify enumeration counts match what is enumerated** — "three upgrades"
  followed by two items plus a consequence is a recurring defect here.
- **A copy fix is not applied until the phrase is swept.** Fixing one instance
  and moving on has left the same wrong sentence live on three other surfaces
  more than once. Grep the phrase across the repo after every copy correction.
- **Keep `public/llms.txt` in sync with page copy.** It has drifted before. Its
  FAQ is **generated** from the pages' own `faqItems` — fix the page source and
  regenerate rather than hand-editing it.

## Boundaries

**Ask first**
- Adding or changing any dependency
- Changing section order or content structure
- Modifying design tokens in `app/globals.css`

**Never**
- Commit secrets, or a `.env`
- Add wallet connectivity — this is not the dApp
- Add R3F, GSAP or Lenis (CSS transitions only)
- Use colors outside the Olympia palette
- Use `any` without justification, or silence an error with `@ts-ignore`
- Put dev-facing labels in the nav ("ECIPs", "Stages", "Clients" as jargon)

**Handle with care** — these affect the whole site:
`app/globals.css` · `app/layout.tsx` · `lib/config.ts` · `lib/contracts.json` ·
`public/logo.svg` · `tsconfig.json` · `next.config.ts`

`pnpm.overrides` in `package.json` pins transitive dependencies for security.
Do not drop or regenerate them casually — each pin closes a specific advisory.

**Licensing is deliberate and out of scope for routine work.** Do not add,
change, or recommend changing `LICENSE`.

## Validation

```bash
pnpm lint && pnpm typecheck && pnpm build
```

All three must pass before a commit.
