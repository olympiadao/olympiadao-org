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
- Badge convention: **violet** = Ethereum upgrade tracks, **green** = ETC-native,
  **gray** = maintenance/neutral. **Amber is reserved for olympiatreasury-org**
  and must not be used here

## Content Accuracy

- Nothing has activated; activation blocks are **TBD**. Status goes in a badge,
  never in prose
- Basefee is the **only** protocol-defined Treasury funding source — no ECIP
  directs mining revenue to it
- Treasury and Timelock use plain `CREATE`; only CoreNFT, Executor and Governor
  use `CREATE2`
- The process is an **OFP** (ECIP-1114). The deployed Demo v0.3 contract is still
  named `ECFPRegistry` — correct in a contract listing
- Glamsterdam is the alignment target; Fusaka is a delivered cycle and stays.
  Never write "full Glamsterdam parity"
- Verify enumeration counts match what is enumerated
- Keep `public/llms.txt` in sync with page copy

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
components/
  sections/       # Page sections
  ui/             # Reusable components
lib/              # Utilities (cn helper)
public/           # Static assets (logo, OG image)
```

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
