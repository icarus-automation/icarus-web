# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Dependency constraints

- **Do NOT use or install `gsap`** (or its plugins: ScrollTrigger, MotionPathPlugin, etc.). It will never be added to this project. The former `IcarusFlight` component that depended on it has been removed. For any animation, use the already-installed `motion` package (Framer Motion, imported from `motion/react`) plus CSS. Note: `components/greek/icarus-glyph.tsx` is now unused — reuse or delete as needed.

## Typography

Locked decision: **Marcellus** (display) + **Inter** (body) + **Geist Mono** (prices and
technical data). This is settled — the fonts do not change. Alternatives were evaluated
and rejected; do not reopen the question or propose a replacement display face.

Standing rules:

- **Marcellus is display only, one weight (400).** Never pair `font-display` with
  `font-bold` / `font-semibold`, and never use it for body, buttons, or labels.
- **The display face has no `₱`.** Peso figures go in Inter or Geist Mono, never in a
  `font-display` element.

## Adding a "Trusted by" client logo

No code change needed — the strip is generated.

1. Drop the raw logo at `scripts/logo-sources/<slug>.png` (any size, any background).
2. Add one line to `scripts/logos.json`: `{ "slug": "<slug>", "name": "Display Name" }`.
3. `npm run logos`.

That keys out the background, re-inks reverse (white-on-dark) logos to their brand
colour, and rewrites `content/clients.generated.ts` with correct dimensions.
Never hand-edit `content/clients.generated.ts` or the files in `public/assets/trusted-by/`.

If a logo comes out wrong, add an override to its `logos.json` entry:
`opticalH` (make it smaller/larger in the row), `mode` (`"flood"` | `"gradient"` |
`"none"`), `bg` + `tol` (flood seed colour), `ink` (re-ink colour).

## SEO and social cards

`content/site.ts` holds the canonical origin (`site.url`). `metadataBase`, every
canonical, `og:url`, `sitemap.xml` and `robots.txt` derive from it — change it in one
place, never inline a URL.

Social cards are generated, not designed by hand:

- **Copy** lives in `content/og.ts`, one entry per route. This is the file to edit when a
  post underperforms.
- **Layout** lives in `lib/og.tsx`. Each route's `opengraph-image.tsx` is a thin wrapper.
  Next renders them at build time, so they cost nothing at request time.
- Headline lines are authored breaks, not wrapped. Keep lines under ~18 characters;
  past that `lib/og.tsx` steps the type size down so it can't collide with the emblem.
- **Cards are set in Marcellus**, matching what the site renders, so a click from
  Facebook lands on the same display face it promised.
- The display face has no `₱`. Prices go in `sub`, which is Inter.
- The logo is `public/assets/brand-logo-white.png` — a finished lockup, wordmark and
  mark together, so nothing is set in type beside it. It is white on transparent and
  needs no keying. If it's ever replaced, take the new aspect ratio from the
  `npm run og` output and update `LOGO_RATIO` in `lib/og.tsx`, or it will render
  stretched.

Page metadata must build its `openGraph` through `pageOpenGraph()` in `lib/seo.ts`.
Next replaces the whole `openGraph` field rather than merging it, so a page that
declares one inline silently loses `og:site_name`, `og:type` and `og:locale`.

Structured data lives in `lib/schema.ts` and renders through `components/seo/json-ld.tsx`.
Anything asserted there must also be visible on the page — that is why the phone number
appears in the footer and on `/contact`.

### Regenerating brand assets

`npm run og` derives, from sources already in the repo:

- `public/assets/og.png` (4800×2700) → `public/assets/og/canvas.jpg`, the 1200×630 plate
  the cards are composed on.
- `public/assets/brand-logo-white.png` → `public/assets/og/logo.png`, the lockup on the
  cards. Trim and resize only; it is already white on transparent.
- `public/assets/icarus-socials-pfp.png` → `app/icon.png`, `app/apple-icon.png`,
  `app/favicon.ico`. The portrait mark, not the wide lockup — a wordmark does not
  survive a 16px square.
- Inter and Marcellus TrueType into `app/fonts/` (Satori cannot read woff2, and
  `next/font` exposes nothing to it).

Outputs are committed. Only re-run it when one of those sources changes.

## Picking the right models for workflows and subagents
 
Rankings, higher = better. Cost = what you actually pay, not list price. Intelligence = how hard a problem you can hand the model unsupervised. Taste = UI/UX, code quality, API design, copy.
 
| model     | cost | intelligence | taste |
|-----------|------|---------------|-------|
| gpt-5.5   | 9    | 8             | 5     |
| sonnet-5  | 5    | 5             | 6     |
| opus-4.8  | 4    | 7             | 8     |
| fable-5   | 2    | 9             | 9     |
 
How to apply:
- Treat these as defaults: if a cheaper model's output doesn't meet the bar, rerun the work with a smarter model. Judge the output, not the price tag.
- When axes conflict, prioritize intelligence > taste > cost.
- Use gpt-5.5 for bulk/mechanical work — clear-spec implementation, data analysis, migrations.
- Use a model with taste ≥ 8 for anything user-facing — UI, copy, API design.
- Use fable-5 or opus-4.8 to review plans and implementations; add gpt-5.5 as an extra independent perspective when useful.
- Use sonnet-5, opus-4.8, or fable-5 for Claude-side work.
- Reach gpt-5.5 through the `codex-plugin-cc` slash commands:
  - `/codex:review [--base <ref>] [--wait|--background]` — review the current diff or a branch. Use for the reviews case above.
  - `/codex:adversarial-review [--base <ref>] [--wait|--background] <focus text>` — run a steerable, challenge-focused review of tradeoffs, hidden assumptions, and failure modes.
  - `/codex:rescue <task>` — delegate implementation, investigation, or bulk work to Codex. Supports `--model`, `--effort`, `--background`, `--wait`, `--resume`, `--fresh`. Use it for bulk/mechanical work and anything the review commands don't cover — give it a self-contained prompt.
  - `/codex:status [task-id]` / `/codex:result [task-id]` / `/codex:cancel [task-id]` — check, retrieve, or cancel a background job.
- Run Claude models via the Agent/Workflow `model` parameter.
Using gpt-5.5 inside workflows and subagents:
- Use the `codex:codex-rescue` subagent (in `/agents`) as the wrapper for reaching Codex from a workflow or subagent step. Reference it like any other subagent, or call `/codex:rescue [--model gpt-5.5] [--effort <level>] <self-contained task prompt>` directly.
- Run long tasks in the background and poll: `/codex:rescue --background ...` then `/codex:status` / `/codex:result`. Apply the same pattern to `/codex:adversarial-review --background`.
- Set the default model/effort once in `~/.codex/config.toml` (user-level) or `.codex/config.toml` (project-level, trusted projects only):
```toml
  model = "gpt-5.5"
  model_reasoning_effort = "xh"
```