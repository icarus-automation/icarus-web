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
  white: "#ffffff"
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
  title:
    fontFamily: "Marcellus, Georgia, serif"
    fontSize: "clamp(1.5rem, 2.5vw, 1.75rem)"
    fontWeight: 400
    lineHeight: 1.12
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
    textColor: "{colors.white}"
    rounded: "{rounded.sm}"
    padding: "0 24px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.blueprint-pressed}"
  button-secondary:
    backgroundColor: "{colors.white}"
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
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0 24px"
    height: "44px"
  button-inverse-hover:
    backgroundColor: "{colors.gilt-tint}"
  button-sm:
    padding: "0 16px"
    height: "36px"
  button-lg:
    padding: "0 32px"
    height: "52px"
  card:
    backgroundColor: "{colors.folio-raised}"
    rounded: "{rounded.sm}"
    padding: "24px"
  card-plain:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.sm}"
    padding: "24px"
  card-featured:
    backgroundColor: "{colors.blueprint-tint}"
    rounded: "{rounded.sm}"
    padding: "24px"
  badge:
    backgroundColor: "{colors.gilt-tint}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "4px 12px"
  nav-link:
    textColor: "{colors.ink-mid}"
    rounded: "{rounded.sm}"
    padding: "8px 14px"
  nav-link-hover:
    textColor: "{colors.ink}"
  nav-link-active:
    textColor: "{colors.blueprint-deep}"
---

# Design System: Icarus.Automation

## Overview

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

## Colors

A two-accent system. Cerulean blue marks action and direction — the ruling line on the draft. Gold marks quality and heritage — the illuminated letter on the master document. Neutrals carry everything else without competing.

### Primary
- **Cerulean Blueprint** (#009dff): The brand's action hue as energy: the `::selection` highlight, tint washes, and blueprint accents on dark (ink) grounds. Carries white text only on ink (6.01:1); on light grounds it fails as a text or fill color (white on blueprint is 2.89:1) — interactive fills on light surfaces use Blueprint Deep instead.
- **Blueprint Deep** (#0074c2): The working interactive color: button fills (white label passes AA at 4.91:1), links (4.70:1 on folio), active nav states, focus rings. Also the word ".Automation" in the logotype — the blue that reads as authorship and precision rather than energy.
- **Blueprint Pressed** (#00588f): Hover/pressed state for blueprint-deep fills. Tonal variant, not a new accent.
- **Blueprint Tint** (#e5f5ff): Soft background wash behind blueprint-adjacent or featured content. Used as icon container fills and contextual card highlights. Never as the primary page surface.

### Secondary
- **Gilt** (#c9a227): The quality seal. Used for laurel accent elements, figures on ink (7.18:1), and sparse decorative emphasis. Never on interactive elements (blueprint owns that domain). Never as fill on large surfaces. Appears at most once per viewport. Fails AA as small text on light grounds (2.31:1) — use Gilt Deep there.
- **Gilt Deep** (#856809): Engraved gilt for small text on light surfaces (eyebrow kickers, gilt labels). Tonal variant, not a new accent. **Its margin is thin and load-bearing:** 5.05:1 on folio, 4.74:1 on folio-raised. Both clear AA, but only just — any darkening of a ground, any texture, or any tint behind it pushes it under. Re-measure before placing it on any new surface.
- **Gilt Tint** (#f6efd8): Inverse button hover state and gilt-inflected contextual areas. Always secondary to Gilt itself; where Gilt marks the edge, Gilt Tint fills the interior.

### Neutral
- **Ink** (#0a1b2e): Primary text (16.62:1 on folio). Near-black with a navigational navy lean — not a warm charcoal, not pure black. All display type, headline type, and critical UI text. The ink on the blueprint.
- **Ink Mid** (#47586c): Secondary text, captions, descriptive copy, nav links at rest. 6.98:1 on folio, 6.56:1 on folio-raised, 7.29:1 on white — comfortable on every ground in the system.
- **Folio** (#fafaf8): Page ground. The near-neutral working surface of the draft — not cream, not warm. Effectively hue-free at normal viewing (it carries a 2-point blue reduction, invisible in isolation). Never used to signal warmth or heritage (Gilt carries that); it is simply the field everything sits on. **Flat.** The ground is an untextured fill by decision, not by omission — see The Untextured Ground Rule.
- **Folio Raised** (#f1f3f6): Cards, alternating section backgrounds, table rows. One tonal step above Folio, leaning very slightly cool where Folio leans very slightly warm — the reason the two read as distinct surfaces despite being nine levels apart.
- **White** (#ffffff): A real surface, not an absence. Secondary and Inverse button fills, and cards that must sit brighter than the raised tone (the module grid uses white cards on a folio-raised band, inverting the usual figure/ground).
- **Ruling** (#e3e7ec): Borders, dividers, and structural lines. The ruling lines on blueprint paper. Used structurally (dividing things that need dividing), never decoratively.

### Named Rules
**The Blueprint Monopoly Rule.** Cerulean blue (`blueprint` / `blueprint-deep`) is the sole color of interactive intent. Links, buttons, active states, and focus indicators use nothing else. If a purple link or a teal CTA appears: fix it.

**The Gilt Discipline Rule.** Gold appears at most once per viewport. If two sections are simultaneously visible and both have a gilt element, one has too much. Gilt marks what is worth marking; ubiquity destroys the signal.

**The Ruling Line Rule.** Borders are structural, not decorative. Every `border-ruling` usage must divide something that needs dividing. Card outlines separating cards from a background: legitimate. A border on a hero text block for style: prohibit.

**The Untextured Ground Rule.** Folio and Folio Raised carry no *material* — no grain, noise, paper tile, or fibre overlay. The tonal step plus the ruling line is the entire depth mechanism; adding material to the ground both muddies that step and eats Gilt Deep's ~0.24 of contrast headroom. A textured ground was built, measured, and rejected; do not re-propose it. The `.marble` hero wash is not a counter-example and does not license one: it is a broad tonal gradient on a single band, carrying no high-frequency detail and no per-pixel variance, which is why it costs nothing in contrast.

## Typography

**Display Font:** Marcellus, Georgia, serif
**Body Font:** Inter, ui-sans-serif, system-ui, sans-serif
**Monospace:** Geist Mono, ui-monospace, monospace

**Character:** Marcellus carries the weight of Roman inscription — evenly stroked, classically proportioned, with a gravity that earns authority without performing it. Inter is the modern technical brief: clean, humanist, precise at any size. Together they express the brand's core tension — ancient confidence grounded in present-day precision. Geist Mono appears only for code and data-adjacent contexts.

This pairing is locked. Alternatives were evaluated and rejected; the typefaces do not change.

### Hierarchy
- **Display** (Marcellus 400, clamp(2.25rem–3.75rem), line-height 1.08, letter-spacing −0.01em): Hero headlines only. Steps `text-4xl → sm:text-5xl → md:text-6xl`. The largest text in the system. `text-wrap: balance` always applied. Never Inter at this scale.
- **Headline** (Marcellus 400, clamp(1.875rem–2.75rem), line-height 1.15): Section headings (h2). Steps `text-3xl → sm:text-4xl → md:2.75rem`. Always Marcellus; always `text-wrap: balance`.
- **Title** (Marcellus 400, clamp(1.5rem–1.75rem), line-height 1.12): The third display level — card headings, solution names, and sub-headings inside dark bands. Marcellus at a size that still reads as display rather than as a bolded body line. This is the tier that keeps card headings from defaulting to Inter semibold.
- **Body Large** (Inter 400, 1.125rem/18px, line-height 1.6): Hero supporting copy, lead paragraphs, section subtitles. Max line length 65–75ch.
- **Body** (Inter 400, 1rem/16px, line-height 1.6): Standard paragraphs, card descriptions. Max line length 65–75ch. `text-wrap: pretty` on prose ≥4 lines.
- **Label** (Inter 600, 0.75rem/12px, letter-spacing 0.25em, uppercase): Eyebrow kickers (in gilt-deep), status chips, nav items. Uppercase is intentional at this scale; do not use uppercase on body or larger text.
- **Mono** (Geist Mono 400, 0.875rem/14px, line-height 1.5): Code references, technical data, and prices where a monospaced rhythm is wanted.

### Named Rules
**The Marcellus Ceiling Rule.** Marcellus is the display voice — Display, Headline, and Title only. Never on body copy, labels, button text, captions, or any interactive element. If a paragraph or form element is in Marcellus: fix it.

**The Single-Weight Rule.** Marcellus ships one weight (400). Never pair `font-display` with `font-bold` or `font-semibold` — the browser will synthesise a fake bold and the inscription character collapses. Emphasis in display type comes from scale, never weight.

**The Peso Rule.** The display face has no `₱`. Any figure carrying a peso sign is set in Inter or Geist Mono, never in a `font-display` element.

**The Chart-Space Exception.** The type ramp governs DOM text only. Text inside an SVG `viewBox` is in user-space units, not CSS pixels — it scales with the graphic, so the `13px` and `11px` labels in the philosophy chart render larger than their nominal size on desktop and smaller on mobile. Those values are deliberately off-ramp and must stay numeric: a `rem` step in SVG user space does not scale with the viewBox, so snapping them to the ramp would break each label's alignment with its plotted coordinate at every width but one. A source scanner will flag them; that is a false positive, not drift.

**The Letter-Spacing Floor Rule.** Display type uses letter-spacing no tighter than −0.04em. The current value (−0.01em) is the comfortable operating point; do not go below −0.04em under any circumstances, as the Marcellus letterforms begin to touch. "Designed tight" ends at −0.04em.

## Layout

A single centred column, not a visible grid. The page is a stack of full-bleed horizontal bands; structure comes from the rhythm between them and from the ruling lines that separate them.

- **Container:** `max-width: 72rem (1152px)`, centred, with `padding: 0 20px` rising to `0 32px` at ≥640px. Every section's content passes through this one container — there is no second container width.
- **Measure:** headings and their subtitles are constrained to `max-width: 42rem (672px)` regardless of container width, so a headline never runs the full 1152px. Body prose holds 65–75ch.
- **Section rhythm:** vertical padding is one of three steps — `56/64px` for compressed utility bands (the client logo strip), `80/96px` standard, `80/112px` for sections that carry a decision (pricing, custom builds). Horizontal band padding always grows at the `sm` breakpoint, never shrinks.
- **Internal rhythm:** `48px` between a section heading and its content, `56px` where the content is a grid. Grid gutters are `16–20px`. More space sits above a heading than below it.
- **Grids:** feature and module grids run `1 → 2 → 3` columns across `sm` and `lg`. Card grids use equal-height items; a grid never mixes column spans.
- **Breakpoints:** the Tailwind defaults — `sm 640`, `md 768`, `lg 1024`, `xl 1280`. Navigation collapses to the drawer below `lg`.
- **Alternation:** bands alternate `folio` and `folio-raised` down the page. Two raised bands never touch; where they would, the ruling border between them carries the separation instead.
- **Stacking order:** a fixed scale, in this order — navigation `50`, scroll progress `60`, drawer backdrop `70`, drawer `80`. Nothing else in the system is given a z-index.

### Named Rules
**The One Container Rule.** Every band routes its content through the same 1152px container. A section that needs to feel wider gets a full-bleed *background* with contained *content* — it never widens the container.

## Elevation & Depth

This system is flat by principle. Greek architecture did not require ambient glow to express weight; neither does this design system. Depth is expressed through two mechanisms only: tonal layering (a card at `folio-raised` sits above a `folio` page without a shadow announcing it) and structural ruling borders (the line between sections is a ruling line, not a shadow).

The one moving depth cue is the navigation, which is transparent and borderless over the hero and resolves to an opaque folio bar with a ruling underline after 12px of scroll. Depth here is a change of state, not a change of altitude.

### Shadow Vocabulary
**None at rest.** `box-shadow` is prohibited on cards, containers, and surfaces in their default state. There are no elevation tiers expressed through shadow.

The sole intentional exception: a glow treatment on the animated `<SunRays />` hero component, because it is a literal light-emitting motif from the Icarus mythology — not a UI depth affordance.

### Named Rules
**The Flat Ground Rule.** When you want to lift a card off the page, use `background: folio-raised` + `border: 1px solid ruling`. Do not add `box-shadow`. If the tonal difference is insufficient, add the ruling border — do not add shadow.

**The No-Ghost-Card Rule.** `border: 1px solid ruling` and `box-shadow` with blur ≥16px on the same element is always a mistake. Choose one: a structural ruling border, or — in genuinely exceptional UI-state contexts — a shadow no larger than 8px blur. Never both.

## Shapes

The form language is rectilinear and machined. Corners exist to avoid the look of something printed directly onto the page, not to soften anything.

- **Radius:** `2px` on everything — buttons, cards, containers, inputs, badges, images. The system does not vary radius by component type; that uniformity is the signature. `9999px` (full pill) is valid only on small label chips.
- **Borders:** `1px solid ruling`, always. There is no 2px border, no double border, and no colored accent border in the system.
- **Dividers:** the same 1px ruling line, used as `border-y` on bands and `divide-y` inside lists and accordions.
- **The meander:** the one non-rectilinear form, and it is a band rather than a shape — a 10px horizontal strip masked with the Greek key at a 40×10px repeat.
- **Iconography:** Lucide, drawn at a single consistent stroke, typically 20px (`size-5`) inline and 32px (`size-8`) as a section mark. Icons are never emoji and never a second illustration style.
- **Imagery:** rectangular, 2px radius, `border: 1px solid ruling`. Square (`aspect-square`) for product shots; no circular crops, no rounded-full avatars.

### Named Rules
**The 2px Rule.** If a radius is not 2px, it is either a pill chip or a mistake. Nothing in this system is `rounded-lg`, `rounded-xl`, or `rounded-2xl`.

## Components

### Buttons
The primary conversion mechanism. Precision-machined: 2px radius, exact heights, no decorative excess. Four variants for four distinct use cases.

- **Shape:** 2px radius on all variants. `transition: colors 150ms`. Focus: `outline: 2px solid blueprint-deep`, `outline-offset: 2px`. Active: `translateY(1px)`. Disabled: `opacity: 0.5`, `pointer-events: none` — same shape and color, no special disabled palette.
- **Primary (CTA):** `background: blueprint-deep`, `color: white` (4.91:1). The page's single highest-priority action.
- **Secondary:** `border: 1px solid ruling`, `background: white`, `color: ink`. Hover: `border-color: ink/40`. Used alongside Primary when a second path deserves equal presence.
- **Ghost:** `color: ink-mid`. Hover: `color: blueprint-deep`. No background, no border. Navigation-weight links and tertiary actions.
- **Inverse:** `background: white`, `color: ink`. Hover: `background: gilt-tint`. For dark grounds (the CTA band) where Primary would need to reverse.
- **Sizes:** Small (36px, `px-4`, text-sm), Medium (44px, `px-6`, text-sm — default), Large (52px, `px-8`, text-base). Label is Inter 500 at every size.

### Navigation
- **Brand mark:** Marcellus 400, 1.125rem, `color: ink`. Set as "Icarus.Automation" with ".Automation" in `blueprint-deep`. Currently typographic, with no emblem at nav level. *PRODUCT.md commits to replacing this with the `brandlogo.png` lockup; that replacement is not yet implemented, and when it lands this entry changes.*
- **Nav links:** Inter 0.875rem. Rest `ink-mid`, hover `ink`, active `blueprint-deep` at weight 600. `padding: 8px 14px`, 2px radius.
- **Scroll behavior:** transparent and borderless at page top → `background: folio` + `border-bottom: 1px solid ruling` after 12px. `transition: colors 200ms ease`.
- **Mobile drawer:** a right-hand panel at 82% width (max 24rem), `border-left: 1px solid ruling`, `background: folio`, over a backdrop. Motion `AnimatePresence`. Full-width Primary button at the bottom as the mobile conversion point.
- **CTA in nav:** Small Primary. The only blueprint-filled element always visible above the fold.

### Cards / Containers
- **Corner:** 2px. **Shadow:** none. **Border:** `1px solid ruling`, required on any card sitting directly on folio — the tonal step alone is narrow, and the ruling line confirms the boundary.
- **Background:** `folio-raised` for a standard card on a folio page; `white` for a card on a folio-raised band (the inversion is deliberate — the card must read brighter than its band); `blueprint-tint` for featured or highlighted content.
- **Padding:** 24px standard, 16px in compact grids.
- **Nested cards:** prohibited. If you are placing a card inside a card, redesign the structure.

### Badge
A small gilt-inflected chip: `background: gilt-tint`, `border: 1px solid gilt/30`, `color: ink`, `padding: 4px 12px`, 2px radius, Inter 600 at 0.75rem. It counts against the Gilt Discipline Rule — a badge is a gilt element.

### Section Heading
Optional eyebrow → headline → optional subtitle, centred by default, left-aligned in feature and comparison layouts. Carries a `dark` tone for use on ink bands, which swaps eyebrow to `gilt`, headline to `white`, and subtitle to `white/70`.

- **Eyebrow:** Label style in `gilt-deep` (or `gilt` on dark). Maximum one per page.
- **Headline:** Headline scale, `text-wrap: balance`, `margin-top: 16px` when an eyebrow precedes it.
- **Subtitle:** Body Large in `ink-mid`, `margin-top: 16px`, constrained with the heading block to 42rem.

### Accordion
Used for FAQ. A single `folio-raised` container with a ruling border and `divide-y` between items — not a stack of separate cards. Trigger: full-width, `padding: 20px 24px`, question at 1.125rem Inter 500 `ink`, hover lifts the row to `folio`. A Plus icon in `blueprint-deep` rotates 45° to a close mark over 300ms. Panels animate height with `AnimatePresence` and honour reduced motion by collapsing to an opacity-only transition. Full `aria-expanded` / `aria-controls` wiring.

### Greek Signature Components
The three Greek motifs are the brand's most distinctive elements. They operate as a system with explicit deployment rules.

- **Meander band (`.meander`):** a 10px horizontal band, CSS `mask-image` of the Greek key at a 40×10px repeat, inheriting `currentColor`. Section boundaries and the footer accent only. Never a card border, side stripe, or decorative fill.
- **Laurel (`<Laurel />`):** an SVG pair flanking eyebrow text. Always a matched pair. Canonical placement is the hero kicker line: gilt label centred between two laurels. Never solo, never on a heading without its kicker, never in body sections.
- **Sun-rays (`<SunRays />`):** an animated radial SVG behind the hero illustration, one 90-second rotation. Once per page, hero only. Must pause under `prefers-reduced-motion`.

### Hero Wash (`.marble`)
The one atmospheric treatment in the system: two very faint radial gradients — blueprint at 7% from the upper right, gilt at 6% from the lower left — layered behind the hero and featured bands. It is the light falling across a drawing board, not a gradient hero. It never carries text contrast on its own (the ground beneath it does), never appears on more than one band per page, and is the sole exception to the system's otherwise flat fills. Do not extend it into a full-page background or raise its opacity; at these values it is felt rather than seen, which is the entire point.

### Motion
- **Reveal:** `opacity 0→1`, `translateY 24px→0`, `700ms`, `cubic-bezier(0.21, 0.47, 0.32, 0.98)`. Fires once when the element enters the viewport at a −80px margin. This is the system's one entrance gesture.
- **Stagger:** parent staggers children at `0.1s`. Feature lists, client logos, process steps.
- **Logo marquee:** the client strip translates `0 → −50%` over 32s, linear, infinite, with the track duplicated for a seamless loop.
- **Scroll progress:** a 3px `blueprint-deep` rule pinned to the top of the viewport, `scaleX` bound directly to scroll position with `origin-left`. Because it is bound rather than animated, it is inherently reduced-motion safe — the ruling line being drawn across the draft.
- **Smooth scroll:** Lenis drives native scroll; `scroll-behavior: smooth` is the fallback and is disabled while Lenis is active.
- **Reduced motion:** the global in `globals.css` collapses animation and transition durations to `0.01ms`. It is a floor, not a ceiling — any component that animates layout (height, presence) must add its own guard, as the accordion does.

## Do's and Don'ts

### Do:
- **Do** use `background: folio-raised` + `border: 1px solid ruling` as the elevation pair for cards and raised surfaces. This is the only permitted depth mechanism at rest.
- **Do** keep the ground flat. Folio is an untextured fill; the tonal step and the ruling line carry all the depth this system needs.
- **Do** reserve Marcellus for Display, Headline, and Title, at weight 400 only. Every other typographic element uses Inter.
- **Do** put peso figures in Inter or Geist Mono — the display face has no `₱`.
- **Do** deploy the meander only at structural horizontal dividers: section breaks, the footer accent, explicit band components.
- **Do** apply gilt to at most one element per viewport — the most important qualifier or eyebrow on that screen. Rarity is the mechanism.
- **Do** use `text-wrap: balance` on every h1 and h2, and `text-wrap: pretty` on body paragraphs of four or more lines.
- **Do** re-measure gilt-deep whenever it lands on a new ground. It clears AA by 0.24 on folio-raised; that margin is real and easy to spend.
- **Do** route every band's content through the single 1152px container, and let full-bleed backgrounds do the widening.
- **Do** give any component that animates layout its own `prefers-reduced-motion` guard.

### Don't:
- **Don't** use the cheap local agency aesthetic: bright primary fills on large sections, drop shadows on every card, stock photos, loud decorative fonts, clip-art icons.
- **Don't** use the corporate enterprise aesthetic: heavy navy body backgrounds, formal IBM-style grids, a tone so removed it distances rather than welcomes.
- **Don't** use the trendy AI aesthetic: purple or teal gradients, glassmorphism, chat-bubble chrome, pastel gradient heroes. This is the single most common way for this site to read as off-the-shelf.
- **Don't** add grain, noise, or a paper texture to any ground. It was built and rejected — it muddies the folio → folio-raised step and pushes gilt-deep under AA.
- **Don't** pair `font-display` with `font-bold` or `font-semibold`. Marcellus has one weight; the browser will fake the rest.
- **Don't** add `border-left` or `border-right` greater than 1px as a colored accent. Rewrite with full ruling borders, tint containers, or leading iconography.
- **Don't** pair `border: 1px solid ruling` with `box-shadow` blur ≥16px on the same element.
- **Don't** use `border-radius` greater than 2px on cards, containers, or interactive elements. Full pill is valid only on small label chips.
- **Don't** put a gilt eyebrow above more than one section per page. If every section has an eyebrow, none of them do.
- **Don't** apply gilt to buttons, links, or any interactive affordance. Blueprint owns interactive intent.
- **Don't** place a Greek motif without structural justification. If removing it doesn't change what a reader understands, remove it.
- **Don't** use `background-clip: text` with a gradient. Emphasis belongs to weight or scale, not color gradient.
- **Don't** invent a fourth accent color. The system has two. If a third semantic role seems needed, use a tonal variant of an existing one.
- **Don't** assign a z-index outside the fixed scale (nav 50, progress 60, backdrop 70, drawer 80).
