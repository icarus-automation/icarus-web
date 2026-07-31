# Typography

**Maglite (display) + Inter (body).** Maglite replaces Marcellus. Not yet applied.

| role | font | source |
| ---- | ---- | ------ |
| Display — h1, h2, section/card titles | **Maglite** | local, `app/fonts/Maglite-Regular.otf` |
| Body — everything else | **Inter** | Google Fonts, unchanged |
| Mono | **Geist Mono** | Google Fonts, unchanged |

## Maglite constraints

- One weight. No bold, no italic.
- No `₱` glyph. Keep peso signs out of display text — `components/home/keepinv-teaser.tsx:17`
  is the one heading that has one.
- Hairlines thin out below ~24px. Exposed spots: navbar logotype
  (`layout/navbar.tsx:57`, 18px) and process step headlines (`home/process.tsx:66`, white on
  dark, drops to 20px at `lg`).
- Title case, not caps. Headings are 3–6 words and read as poetry — caps flattens them.
- Swash alternates (`ss01` / `salt`) are hero-only.

## Mono

Used once: `components/keepinv/pricing.tsx:39`, the price figures. Stays as-is. It also
carries the `₱` that Maglite lacks.

## Note

`DESIGN.md` still specifies Marcellus and is out of date.
