# OlympiaDAO.org — Claude Code Instructions

## Project Context

Landing page for the Olympia upgrade — on-chain governance and treasury infrastructure for Ethereum Classic. Aligned with ETC DAO institutional design patterns and live treasury data from Blockscout.

**URL:** https://olympiadao.org
**Repo:** `olympiadao/olympiadao-org`
**Deploy:** Vercel
**Version:** 0.2.0 (Demo v0.2)

## Tech Stack

- Next.js 16 (App Router, Turbopack)
- React 19, TypeScript 5 (strict)
- Tailwind CSS 4 (CSS-first config)
- React Query (@tanstack/react-query) — live treasury data
- Recharts — balance history chart
- Viem — chain definitions, formatEther
- Lucide React (icons)
- next-themes (light/dark)
- pnpm 10, Node 24

## Quick Commands

```bash
pnpm dev          # Dev server (Turbopack)
pnpm build        # Production build
pnpm lint         # ESLint
pnpm typecheck    # TypeScript check
```

## Structure

```
app/
  globals.css     # Tailwind + Olympia design tokens (light/dark)
  layout.tsx      # Root layout, fonts, Providers wrapper
  page.tsx        # Main page (all sections)
components/
  sections/       # NavHeader, Hero, Treasury, BalanceChart, HowItWorks, Governance, Contracts, Footer
  ui/             # FadeIn, SectionDivider
  chain-selector.tsx  # Mordor/ETC chain dropdown
  theme-toggle.tsx    # Light/dark toggle
  theme-provider.tsx  # next-themes wrapper
lib/
  config.ts       # Chain config (Mordor 63, ETC 61), contract addresses
  treasury.ts     # Blockscout API v2 fetching layer
  providers.tsx   # React Query provider
  hooks/
    use-treasury.ts     # Treasury data hooks (balance, stats, history, txns)
    use-chain.ts        # Active chain from URL params
    use-chain-config.ts # Config for active chain
  utils.ts        # cn() helper
public/
  logo.svg        # Olympia torch logomark
  chains/         # Chain icons (mordor.svg, etc.svg)
```

## Live Data

- Blockscout API v2: Mordor (`etc-mordor.blockscout.com`) + ETC (`etc.blockscout.com`)
- Refresh: 10min (`refetchInterval: 600_000`), stale: 5min
- Chain selector via URL search params (`?chain=63` or `?chain=61`)
- Default chain: Mordor (63)

## Deployed Contracts (Demo v0.2)

Identical on Mordor (63) and ETC (61) via deterministic CREATE2:
- OlympiaTreasury: `0x035b2e3c189B772e52F4C3DA6c45c84A3bB871bf`
- OlympiaExecutor: `0x64624f74F77639CbA268a6c8bEDC2778B707eF9a`
- 5 more in `components/sections/ContractsSection.tsx`

## Brand

- Primary dark: `#00ffae` (neon green)
- Primary light: `#00a872` (WCAG AA compliant)
- Background dark: `#0a0f10`
- Font: Inter (UI) + JetBrains Mono (code/addresses)
- Dark-first, CSS transitions only, IntersectionObserver FadeIn

## Design Alignment

Follows ETC DAO institutional patterns from `ethereumclassicdao-org`:
- FadeIn scroll animations (700ms ease-out)
- SectionDivider gradient lines between sections
- Card pattern: `rounded-xl border border-[var(--divider)] bg-[var(--bg-elevated)]`
- Section-alt alternating backgrounds
- Narrative: "Coordinating Organizations", "basefee revenue", "block rewards untouched"

## Boundaries

### Always Do
- Keep contract addresses consistent across sites
- Use Lucide icons (not Font Awesome)
- Maintain WCAG AA contrast ratios
- Align narrative with ETC DAO framing

### Ask First
- Changing section order or content structure
- Adding new dependencies
- Modifying brand colors

### Never Do
- Commit secrets
- Add R3F, GSAP, or Lenis (CSS transitions only)
- Use colors outside the Olympia palette
- Dev-facing labels in nav (no "ECIPs", "Stages", "Clients")

## Protected Files

Modify with care — these affect the entire site:
- `app/globals.css` — design tokens and Tailwind theme
- `app/layout.tsx` — root layout, fonts, providers, metadata
- `lib/config.ts` — chain config and contract addresses
- `public/logo.svg` — brand logomark (do not regenerate)
- `tsconfig.json`, `next.config.ts` — build configuration

## Validation

Before every commit:

```bash
pnpm lint && pnpm typecheck && pnpm build
```

All three must pass.
