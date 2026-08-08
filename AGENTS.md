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
  clients/             ETC client implementations
  governance/          governance architecture
  upgrade/             the Olympia upgrade
  sitemap.ts           enumerates every real route
  manifest.ts, robots.txt/route.ts, not-found.tsx
components/
  sections/            page sections
  ui/                  FadeIn, SectionDivider, Accordion, PropertyCard,
                       OlympiaCountdown, SsrFallbacks
  chain-selector.tsx, theme-toggle.tsx, theme-provider.tsx
lib/
  config.ts            chain config, reads contracts.json
  contracts.json       deployed contract addresses — single source of truth
  treasury.ts          Blockscout API v2 layer
  providers.tsx        React Query provider
  hooks/               use-treasury, use-chain, use-chain-config
public/
  llms.txt             MUST stay in sync with page copy
  logo.svg, og-image.png, chains/
```

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

Dark-first. Primary green is `#00ffae` in dark and `#00734d` in light (the light
value is set by the contrast rule above, not chosen aesthetically — do not
"restore" it to a brighter green). Dark background `#0a0f10`. Fonts are Inter for
UI and JetBrains Mono for code and addresses.

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

Public copy makes claims about ECIPs. The specs are authoritative and have been
rewritten — read them directly rather than trusting a summary.

- Nothing has activated. Activation blocks are **TBD** on Mordor and Mainnet.
  Mutable status belongs in a badge, never in prose.
- Basefee is the **only** protocol-defined Treasury funding source. No ECIP
  directs mining revenue to the Treasury.
- Treasury and Timelock deploy via plain `CREATE` from a reserved deployer
  nonce; only CoreNFT, Executor and Governor use `CREATE2`.
- The funding process is an **OFP** (Olympia Funding Proposal, ECIP-1114). The
  deployed Demo v0.3 contract is still named `ECFPRegistry` — that is the
  on-chain artifact name and is correct in a contract listing.
- Glamsterdam is the alignment target, but Fusaka is a delivered cycle and is
  not removed. Never write "full Glamsterdam parity".
- **Verify enumeration counts match what is enumerated** — "three upgrades"
  followed by two items plus a consequence is a recurring defect here.
- **Keep `public/llms.txt` in sync with page copy.** It has drifted before.

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
