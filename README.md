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

## Deployed Contracts (Demo v0.2)

Identical addresses on Mordor (63) and ETC (61) via deterministic CREATE2:

| Contract | Address |
|----------|---------|
| OlympiaTreasury | `0x035b2e3c189B772e52F4C3DA6c45c84A3bB871bf` |
| SanctionsOracle | `0xfF2B8D7937D908D81C72D20AC99302EE6ACc2709` |
| OlympiaMemberNFT | `0x73e78d3a3470396325b975FcAFA8105A89A9E672` |
| TimelockController | `0xA5839b3e9445f7eE7AffdBC796DC0601f9b976C2` |
| OlympiaGovernor | `0xB85dbc899472756470EF4033b9637ff8fa2FD23D` |
| OlympiaExecutor | `0x64624f74F77639CbA268a6c8bEDC2778B707eF9a` |
| ECFPRegistry | `0xFB4De5674a6b9a301d16876795a74f3bdacfa722` |

## Deploy

Vercel (automatic from `main` branch).

## Authors

- [Cody Burns](https://github.com/realcodywburns)
- [Chris Mercer](https://github.com/chris-mercer)
