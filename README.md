# OlympiaDAO.org — Demo v0.1

> **Branch:** `demo_v0.1` (preserved snapshot)
> **Superseded by:** `demo_v0.2`
>
> **Note:** Demo v0.1 was a fast-iteration development branch and is not aligned to the public Olympia ECIP specifications. See `demo_v0.2` for the spec-compliant implementation.

Landing page for the Olympia upgrade — a staged governance and funding system for Ethereum Classic.

## Version Context

Demo v0.1 was the initial public deployment of the Olympia website ecosystem. Key characteristics:

- **Single chain:** Mordor Testnet only (Chain 63)
- **Treasury:** OZ 5.6 AccessControlDefaultAdminRules (`0xd6165F3aF4281037bce810621F62B43077Fb0e37`)
- **Static content:** No live treasury data (Blockscout integration added in v0.2)
- **Sections:** Hero, Problem, Timeline, ECIP Suite, Client Status, Key Dates, Principles, Contracts, Footer

This branch is preserved as a historical snapshot. Active development continues on `demo_v0.2`.

## Tech Stack

- Next.js 16 (App Router, Turbopack)
- React 19, TypeScript 5 (strict)
- Tailwind CSS 4 (CSS-first config)
- Lucide React (icons)
- pnpm 10, Node 24

## Development

```bash
pnpm install
pnpm dev          # Dev server (Turbopack)
pnpm build        # Production build
pnpm lint         # ESLint
pnpm typecheck    # TypeScript check
```

## Branch Strategy

| Branch | Purpose |
|--------|---------|
| `demo_v0.1` | Preserved snapshot — initial public demo |
| `demo_v0.2` | Active development — live treasury data, multi-chain, institutional redesign |
| `main` | Production — deployed after Olympia activates on ETC mainnet |

## Authors

- [Cody Burns](https://github.com/realcodywburns)
- [Chris Mercer](https://github.com/chris-mercer)
