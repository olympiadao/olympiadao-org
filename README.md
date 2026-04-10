# OlympiaDAO.org

Landing page for the Olympia upgrade — on-chain governance and treasury infrastructure for Ethereum Classic.

## Tech Stack

- Next.js 16 (App Router, Turbopack)
- React 19, TypeScript 5 (strict)
- Tailwind CSS 4 (CSS-first config)
- React Query (live treasury data)
- Recharts (balance history chart)
- Viem (chain definitions)

## Development

```bash
pnpm install
pnpm dev          # Dev server (Turbopack)
pnpm build        # Production build
pnpm lint         # ESLint
pnpm typecheck    # TypeScript check
```

## Structure

```
app/
  globals.css     # Tailwind + Olympia design tokens
  layout.tsx      # Root layout, Inter + JetBrains Mono
  page.tsx        # Main page (imports all sections)
components/
  sections/       # Page sections (NavHeader, Hero, Treasury, etc.)
  ui/             # Reusable UI (FadeIn, SectionDivider)
lib/
  config.ts       # Chain config (Mordor + ETC)
  treasury.ts     # Blockscout API layer
  providers.tsx   # React Query provider
  hooks/          # Data hooks (treasury, chain)
  utils.ts        # cn() helper
public/
  logo.svg        # Olympia torch logomark
  chains/         # Chain icons (Mordor, ETC)
```

## Live Data

Treasury data fetched from Blockscout API v2:
- Mordor: `etc-mordor.blockscout.com/api/v2`
- ETC: `etc.blockscout.com/api/v2`

Chain selector switches between networks. Data refreshes every 10 minutes.

## Deployed Contracts (Demo v0.3)

Identical addresses on Mordor (63) and ETC (61) via deterministic CREATE2 (salt: `OLYMPIA_DEMO_V0_3`).

All addresses in [`lib/contracts.json`](lib/contracts.json) — single source of truth.

## Branch Strategy

| Branch | Purpose |
|--------|---------|
| `demo_v0.1` | Preserved snapshot — fast-iteration development, not ECIP-aligned |
| `demo_v0.2` | On-chain SVG art, membership verifier, one-NFT-per-address |
| `demo_v0.3` | Active development — spec-compliant, multi-chain, institutional redesign |
| `main` | Production — deployed after Olympia activates on ETC mainnet |

## Deploy

Vercel (automatic from `main` branch).

## Related Repos

- [olympia-brand](https://github.com/olympiadao/olympia-brand) — Design tokens, logos, favicons
- [olympiatreasury-org](https://github.com/olympiadao/olympiatreasury-org) — Treasury dashboard
- [ethereumclassicdao-org](https://github.com/EthereumClassicDAO/ethereumclassicdao-org) — Institutional website
- [olympia-app](https://github.com/olympiadao/olympia-app) — Governance UI
- [olympia-governance-contracts](https://github.com/olympiadao/olympia-governance-contracts) — Governor, Executor, ECFPRegistry
- [olympia-treasury-contract](https://github.com/olympiadao/olympia-treasury-contract) — Treasury vault

## Authors

- [Cody Burns](https://github.com/realcodywburns)
- [Chris Mercer](https://github.com/chris-mercer)
