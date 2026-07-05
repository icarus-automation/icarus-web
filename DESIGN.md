---
name: Icarus.Automation
description: Automation, custom systems & IoT for Philippine businesses
colors:
  blueprint: "#009dff"
  blueprint-deep: "#0074c2"
  blueprint-pressed: "#00588f"
  blueprint-tint: "#e5f5ff"
  ink: "#0a1b2e"
  ink-mid: "#47586c"
  gilt: "#c9a227"
  gilt-deep: "#856809"
  gilt-tint: "#f6efd8"
  folio: "#fafaf8"
  folio-raised: "#f1f3f6"
  ruling: "#e3e7ec"
typography:
  display:
    fontFamily: "Marcellus, Georgia, serif"
    fontSize: "clamp(2.25rem, 5vw, 3.75rem)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Marcellus, Georgia, serif"
    fontSize: "clamp(1.875rem, 4vw, 2.75rem)"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "normal"
  body-lg:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.25em"
  mono:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: "2px"
  pill: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "48px"
  2xl: "96px"
components:
  button-primary:
    backgroundColor: "{colors.blueprint-deep}"
    textColor: "#ffffff"
    rounded: "{rounded.sm}"
    padding: "0 24px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.blueprint-pressed}"
  button-secondary:
    backgroundColor: "#ffffff"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0 24px"
    height: "44px"
  button-secondary-hover:
    textColor: "{colors.ink}"
  button-ghost:
    textColor: "{colors.ink-mid}"
  button-ghost-hover:
    textColor: "{colors.blueprint-deep}"
  button-inverse:
    backgroundColor: "#ffffff"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0 24px"
    height: "44px"
  button-inverse-hover:
    backgroundColor: "{colors.gilt-tint}"
---

# Design System: Icarus.Automation

## 1. Overview

**Creative North Star: "The Architect of the Polis"**

Icarus Automation is not a startup with ambitions — it is a builder of civic infrastructure for business. The design language draws from the ordered precision of Greek architectural planning: the ruling line on the blueprint, the measured stone, the gilded notation marking what deserves to be marked. Every visual decision should feel like the working documents of a master builder — functional, exact, carrying the weight of expertise without demanding admiration for itself. The mythology is structural, not decorative. Greek motifs appear because they frame the brand's core assertion: that building systems for a community to function is as old and necessary as civilization itself.

This is a brand-register surface with one conversion goal: book the consultation. Every section exists to build sufficient trust, demonstrate sufficient capability, and make the price-to-value gap obvious enough that the decision to book becomes easy. Nothing on the page earns its place by looking interesting. It earns its place by moving the visitor one step closer to booking.

The design explicitly rejects three failure modes: the cheap local agency look (bright fills, drop shadows, stock photos, unserious fonts); the corporate enterprise look (full-navy grids, formal language, intimidating uniformity that distances the small business owner Icarus is trying to serve); and the trendy AI aesthetic (purple gradients, glassmorphism, chat-bubble chrome, pastel gradient heroes — the off-the-shelf 2025 template that reads as no-one's brand).

**Key Characteristics:**
- Blueprint precision: 2px corners, structural ruling borders, purposeful spacing — no decorative slack
- Gilt discipline: the gold accent marks quality the way a seal marks a document; its rarity is the signal
- Classical authority: Marcellus's Roman inscription heritage carries the register that a sans-serif alone cannot
- Flat by principle: depth is tonal (folio → folio-raised) and structural (ruling borders), never cosmetic
- Greek motifs as grammar: meander, laurel, and sun-rays appear in designated roles, never as wallpaper

## 2. Colors: The Blueprint & Gilding Palette

A two-accent system. Cerulean blue marks action and direction — the ruling line on the draft. Gold marks quality and heritage — the illuminated letter on the master document. Neutrals carry everything else without competing.

### Primary
- **Cerulean Blueprint** (#009dff): The brand's action hue as energy: the `::selection` highlight, tint washes, and blueprint accents on dark (ink) grounds. Too light to carry white text or a focus ring on light grounds at AA (2.9:1) — interactive fills on light surfaces use Blueprint Deep instead.
- **Blueprint Deep** (#0074c2): The working interactive color: button fills (white text passes AA at 4.9:1), links, active nav states, focus rings. Also the word ".Automation" in the logotype — the blue that reads as authorship and precision rather than energy.
- **Blueprint Pressed** (#00588f): Hover/pressed state for blueprint-deep fills. Tonal variant, not a new accent.
- **Blueprint Tint** (#e5f5ff): Soft background wash behind blueprint-adjacent or featured content. Used as icon container fills and contextual card highlights. Never as the primary page surface.

### Secondary
- **Gilt** (#c9a227): The quality seal. Used for laurel accent elements, stat figures on ink, and sparse decorative emphasis. Never on interactive elements (blueprint owns that domain). Never as fill on large surfaces. Appears at most once per viewport. Fails AA as small text on light grounds (2.3:1) — use Gilt Deep there.
- **Gilt Deep** (#856809): Engraved gilt for small text on light surfaces (eyebrow kickers, gilt labels). ≥4.5:1 on folio and folio-raised. Tonal variant, not a new accent.
- **Gilt Tint** (#f6efd8): Inverse button hover state and gilt-inflected contextual areas. Always secondary to Gilt itself; where Gilt marks the edge, Gilt Tint fills the interior.

### Neutral
- **Ink** (#0a1b2e): Primary text. Near-black with a navigational navy lean — not a warm charcoal, not pure black. All display type, headline type, and critical UI text. The ink on the blueprint.
- **Ink Mid** (#47586c): Secondary text, captions, descriptive copy, nav links at rest, placeholder text. Contrast ≥4.5:1 against Folio is confirmed; verify against any new background before shipping.
- **Folio** (#fafaf8): Page ground. The near-neutral working surface of the draft — not cream, not warm, not paper. Zero perceived hue temperature at normal viewing. Never used to signal warmth or heritage (Gilt carries that); it is simply the field everything sits on.
- **Folio Raised** (#f1f3f6): Cards, alternating section backgrounds, table rows. One tonal step above Folio — structural depth without shadow.
- **Ruling** (#e3e7ec): Borders, dividers, and structural lines. The ruling lines on blueprint paper. Used structurally (dividing things that need dividing), never decoratively.

### Named Rules
**The Blueprint Monopoly Rule.** Cerulean blue (`blueprint` / `blueprint-deep`) is the sole color of interactive intent. Links, buttons, active states, and focus indicators use nothing else. If a purple link or a teal CTA appears: fix it.

**The Gilt Discipline Rule.** Gold appears at most once per viewport. If two sections are simultaneously visible and both have a gilt element, one has too much. Gilt marks what is worth marking; ubiquity destroys the signal.

**The Ruling Line Rule.** Borders are structural, not decorative. Every `border-ruling` usage must divide something that needs dividing. Card outlines separating cards from a background: legitimate. A border on a hero text block for style: prohibit.

## 3. Typography: The Inscription & the Brief

**Display Font:** Marcellus, Georgia, serif
**Body Font:** Inter, ui-sans-serif, system-ui, sans-serif
**Monospace:** Geist Mono, ui-monospace, monospace

**Character:** Marcellus carries the weight of Roman inscription — evenly stroked, classically proportioned, with a gravity that earns authority without performing it. Inter is the modern technical brief: clean, humanist, precise at any size. Together they express the brand's core tension — ancient confidence grounded in present-day precision. Geist Mono appears only for code and data-adjacent contexts.

### Hierarchy
- **Display** (Marcellus 400, clamp(2.25rem–3.75rem), line-height 1.08, letter-spacing −0.01em): Hero headlines only. The largest text in the system. `text-wrap: balance` always applied. Never Inter at this scale.
- **Headline** (Marcellus 400, clamp(1.875rem–2.75rem), line-height 1.15): Section headings (h2). The second display level. Always Marcellus; always `text-wrap: balance`.
- **Body Large** (Inter 400, 1.125rem/18px, line-height 1.6): Hero supporting copy, lead paragraphs. Max line length 65–75ch enforced via `max-w-xl` or equivalent.
- **Body** (Inter 400, 1rem/16px, line-height 1.6): Standard paragraphs, card descriptions, form labels. Max line length 65–75ch. `text-wrap: pretty` on prose ≥4 lines.
- **Label** (Inter 600, 0.75rem/12px, letter-spacing 0.25em, uppercase): Hero eyebrow kicker (in gilt), status chips, nav items. Uppercase is intentional at this scale; do not use uppercase on body or larger text.
- **Mono** (Geist Mono 400, 0.875rem/14px, line-height 1.5): Code references, technical data, pricing display when a monospaced rhythm is needed.

### Named Rules
**The Marcellus Ceiling Rule.** Marcellus is the display and headline voice — h1 and h2 only. Never on body copy, labels, button text, captions, or any interactive element. If a paragraph or form element is in Marcellus: fix it.

**The Letter-Spacing Floor Rule.** Display type uses letter-spacing no tighter than −0.04em. The current value (−0.01em) is the comfortable operating point; do not go below −0.04em under any circumstances, as the Marcellus letterforms begin to touch. "Designed tight" ends at −0.04em.

## 4. Elevation

This system is flat by principle. Greek architecture did not require ambient glow to express weight; neither does this design system. Depth is expressed through two mechanisms only: tonal layering (a card at `folio-raised` sits above a `folio` page without a shadow announcing it) and structural ruling borders (the line between sections is a ruling line, not a shadow).

### Shadow Vocabulary
**None at rest.** `box-shadow` is prohibited on cards, containers, and surfaces in their default state. There are no elevation tiers expressed through shadow.

The sole intentional exception: a glow treatment on the animated `<SunRays />` hero component is permissible, because it is a literal light-emitting motif from the Icarus mythology — not a UI depth affordance.

### Named Rules
**The Flat Ground Rule.** When you want to lift a card off the page, use `background: folio-raised` + `border: 1px solid ruling`. Do not add `box-shadow`. If the tonal difference is insufficient, add the ruling border — do not add shadow.

**The No-Ghost-Card Rule.** `border: 1px solid ruling` and `box-shadow` with blur ≥16px on the same element is always a mistake. Choose one: a structural ruling border, or — in genuinely exceptional UI-state contexts — a shadow no larger than 8px blur. Never both.

## 5. Components

### Buttons
The primary conversion mechanism. Precision-machined: 2px radius, exact heights, no decorative excess. The system has four button variants corresponding to four distinct use cases.

- **Shape:** 2px radius (`rounded-sm`) on all variants. The corner exists to avoid the "printed" look; it is not a softening choice.
- **Primary (CTA):** `background: blueprint-deep (#0074c2)`, `color: white` (AA 4.9:1), `height: 44px (h-11)`, `padding: 0 24px`. Hover: `background: blueprint-pressed (#00588f)`. Focus: `outline: 2px solid blueprint-deep`, `outline-offset: 2px`. Active: `translateY(1px)`. Used only for the page's single highest-priority action.
- **Secondary:** `border: 1px solid ruling`, `background: white`, `color: ink`. Hover: `border-color: ink/40`. Used alongside Primary when a secondary path deserves equal visual presence.
- **Ghost:** `color: ink-mid`. Hover: `color: blueprint-deep`. No background, no border. Navigation-weight links and tertiary actions only.
- **Inverse:** `background: white`, `color: ink`. Hover: `background: gilt-tint`. Used on dark or colored backgrounds (CTA band, dark hero variants) where Primary would need to reverse.
- **Sizes:** Small (`h-9/36px`, `px-4`, text-sm), Medium (`h-11/44px`, `px-6`, text-sm — default), Large (`h-13/52px`, `px-8`, text-base). Font: Inter 500 on all sizes.
- **Disabled:** `opacity: 0.5`, `pointer-events: none`. Same shape and color; no special disabled palette.

### Navigation
- **Brand mark:** Marcellus 400, 1.125rem, `color: ink`. Set as "Icarus.Automation" (the DTI-registered name) with ".Automation" in `blueprint-deep`. The logotype is typographic — no icon or emblem at the nav bar level.
- **Nav links:** Inter, 0.875rem. Default: `color: ink-mid`, `padding: 8px 14px`, `border-radius: 2px`. Hover: `color: ink`. Active: `color: blueprint-deep`, `font-weight: 600`.
- **Scroll behavior:** Transparent + borderless at page top → `background: folio`, `border-bottom: 1px solid ruling` after 12px scroll. Transition: `colors 200ms ease`. This is the system's primary use of the tonal-shift elevation concept.
- **Mobile menu:** Animated height expansion beneath the fixed header, using Motion `AnimatePresence`. Inherits all link styles. Full-width Primary button at the bottom as the mobile conversion point.
- **CTA button in nav:** Small size (`h-9/36px`). Primary variant. The only blueprint-filled element always visible above the fold.

### Cards / Containers
- **Corner Style:** 2px (`rounded-sm`). The system does not vary radius by container type; the uniformity is intentional.
- **Background:** `folio-raised (#f1f3f6)` for standard cards sitting on a folio page. `blueprint-tint (#e5f5ff)` for featured or highlighted content.
- **Border:** `1px solid ruling (#e3e7ec)`. Required on cards that sit directly on folio — the tonal difference alone is narrow; the ruling border confirms the boundary.
- **Shadow:** None.
- **Internal Padding:** 24px (`lg`) standard. 16px (`md`) in compact grid contexts.
- **Nested cards:** Prohibited. If you are placing a card inside a card, redesign the structure.

### Greek Signature Components
The three Greek motifs are the brand's most distinctive visual elements. They operate as a system with explicit deployment rules.

- **Meander border (`.meander`):** A 10px horizontal band rendered via CSS `mask-image` of the Greek key (meander) pattern at 40×10px repeat. Applied at section boundaries and the footer as a structural accent. Color inherits `currentColor` — ink in body contexts, gold when used in a gold-toned band. Never used as a card border, side stripe, or decorative fill.
- **Laurel wreath (`<Laurel />`):** SVG pair flanking eyebrow text. Always deployed as a matched pair (one left, one right). The canonical placement is the hero kicker line: gilt label text centered between two laurels. Never solo, never on headings without the accompanying gilt kicker, never in body sections.
- **Sun-rays (`<SunRays />`):** Animated radial SVG behind the hero illustration. 90-second full rotation. The "rising" motif that embodies the Icarus aspiration. Used once per page, hero position only. `@media (prefers-reduced-motion: reduce)` must pause the rotation.

### Section Heading
The standard composition for any section that requires a heading: optional eyebrow → headline → optional subtitle.

- **Eyebrow (when used):** Label style (Inter 600, 0.75rem, tracking 0.25em, uppercase, gilt). Maximum one eyebrow per page. Eyebrows on every section dissolve the signal into pattern.
- **Headline:** Headline scale (Marcellus, clamp(1.875rem–2.75rem), ink). `text-wrap: balance`. Center-aligned by default in marketing sections; left-aligned in feature or comparison layouts.
- **Subtitle:** Body Large (Inter 400, 1.125rem, ink-mid). `max-width: 64ch`. `margin-top: 16px`.

### Reveal Motion
The standard entrance animation for all above-the-fold and in-view content.

- **Reveal:** `opacity 0→1`, `translateY 24px→0`, `duration: 700ms`, `ease: cubic-bezier(0.21, 0.47, 0.32, 0.98)` (ease-out-expo). Triggered once per element when it enters the viewport (`margin: -80px` threshold).
- **Stagger:** Parent wrapper staggers children with `staggerChildren: 0.1s`. Used on feature lists, client logos, process steps.
- **Reduced motion:** `@media (prefers-reduced-motion: reduce)` in `globals.css` collapses all animation-duration and transition-duration to `0.01ms`. Component-level animations that override this must add their own guard.

## 6. Do's and Don'ts

### Do:
- **Do** use `background: folio-raised` + `border: 1px solid ruling` as the elevation pair for all cards and raised surfaces. This is the only permitted depth mechanism at rest.
- **Do** apply Marcellus exclusively to display (h1) and headline (h2) text. Every other typographic element — subheadings, body, labels, buttons, captions — uses Inter.
- **Do** deploy the meander border only at structural horizontal dividers: section breaks, the footer accent, and explicit band components. Never as side stripes, card outlines, or decorative borders.
- **Do** apply gilt to at most one element per viewport — the most important qualifier, stat label, or eyebrow kicker on that screen. Rarity is the mechanism.
- **Do** use `text-wrap: balance` on every h1 and h2; use `text-wrap: pretty` on body paragraphs of four or more lines.
- **Do** confirm ≥4.5:1 contrast for all body text, ≥3:1 for large/bold text, against every background combination before shipping. `ink-mid (#47586c)` on `folio (#fafaf8)` passes at ~5.4:1; verify any deviation.
- **Do** include `@media (prefers-reduced-motion: reduce)` coverage for every animation added. The global in `globals.css` is a floor; component-level overrides require their own guard.
- **Do** treat every Greek motif as earned: the absence of a meander, laurel, or sun-rays when the design doesn't call for one is correct.

### Don't:
- **Don't** use the cheap local agency aesthetic: bright primary color fills on large sections, drop shadows on every card, stock photos of Filipino small businesses, loud decorative fonts, clip-art icons. This reads as low-budget and undercuts trust.
- **Don't** use the corporate enterprise aesthetic: heavy navy body backgrounds, formal IBM-style grid layouts, tone so removed it distances rather than welcomes. This contradicts the brand's "enterprise capability, human cost" proposition.
- **Don't** use the trendy AI aesthetic: purple or teal gradients, glassmorphism cards, chat-bubble UI chrome, pastel gradient hero sections. This is the single most common way for this site to read as off-the-shelf.
- **Don't** add `border-left` or `border-right` greater than 1px as a colored accent on cards, callouts, or list items. Rewrite with full ruling borders, background-tint containers, or leading iconography.
- **Don't** pair `border: 1px solid ruling` with `box-shadow` blur ≥16px on the same element (the ghost-card pattern). Choose one: structural ruling border, or (in rare UI-state contexts only) a shadow with blur ≤8px.
- **Don't** use `border-radius` greater than 8px on cards, containers, or interactive elements. Anything above 16px on a card is a design tell; `rounded-sm` (2px) is the system default. Full pill is valid only on small label chips.
- **Don't** add a gilt eyebrow kicker above more than one section per page. The hero kicker is the canonical and only regular placement. If every section has an eyebrow, none of them have one.
- **Don't** apply gilt to buttons, links, or any interactive affordance. Blueprint owns interactive intent. Gilt is a quality marker, not a call to action.
- **Don't** place a Greek motif (meander, laurel, sun-rays) without a structural justification. If removing it doesn't change what a reader understands, remove it.
- **Don't** use `background-clip: text` with a gradient. Gradient text is decorative, never meaningful. Emphasis belongs to weight (font-weight 600) or scale, not color gradient.
- **Don't** invent a fourth accent color. The system has two (blueprint + gilt). A third color is a brand drift, not a design improvement. If a third semantic role seems needed, use tonal variants of the existing two.
