# SEO Phase 2 — what to build when the assets land

Phase 1 (2026-08-03) rebuilt the metadata, social cards, structured data and sitemap.
It is done and deployed-ready. This document covers the four things that were blocked
on assets Ace didn't have yet, and is written so a fresh session can execute without
re-deriving Phase 1.

**How to use this:** read § 0 first, then jump to whichever section matches the asset
that just arrived. The sections are independent — landing one asset does not require
the others.

---

## 0. State of play — read before touching anything

### Facts that are settled

| | |
| --- | --- |
| Canonical origin | `https://icarusautomation.tech` — **apex, no www**. Vercel 307s `www` → apex. |
| Single source | `content/site.ts`. `metadataBase`, canonicals, `og:url`, sitemap and robots all derive from `site.url`. Never inline a URL. |
| Business identity | Manila, Metro Manila, PH · `+63 991 789 7907` · DTI-registered as `Icarus.Automation`. |
| Social cards | Generated at build time. Layout `lib/og.tsx`, copy `content/og.ts`, one `opengraph-image.tsx` per route. |
| Structured data | `lib/schema.ts`, rendered via `components/seo/json-ld.tsx`. `ProfessionalService` + `WebSite` sitewide, `SoftwareApplication` on Keep Inv, `FAQPage` on /faq, breadcrumbs on subpages. |
| Brand assets | `npm run og` regenerates the OG plate, favicons and Inter TTFs from sources in the repo. Outputs are committed. |

### Traps that will bite you

- **`openGraph` does not merge.** Next replaces the whole field, so a page declaring its
  own inline loses `og:site_name`, `og:type` and `og:locale`. Always go through
  `pageOpenGraph()` in `lib/seo.ts`. This was a live bug in Phase 1; don't reintroduce it.
- **The card display face has no `₱` glyph.** Prices go in Inter — in the OG cards that
  means the `sub` field, never `lines`.
- **OG headline lines are authored breaks, not wrapped.** Keep each under ~18 characters
  to hold the largest size. `headlineSize()` in `lib/og.tsx` steps the type down past
  that so a long line can't collide with the emblem, but the card looks weaker.
- **Satori can't read woff2** and `next/font` exposes nothing to it. Any new font needs a
  TTF/OTF committed to `app/fonts/` — see `buildFonts()` in `scripts/prepare-og.mjs`.
- **No `process.cwd()` in `lib/og.tsx`.** It defeats the bundler's tracing and pulls the
  whole project into the deployed function. Use `new URL(path, import.meta.url)`.
- **Schema must match visible content.** Google treats structured data describing things
  not on the page as spam. The phone number is in the footer and on `/contact` for
  exactly this reason.
- **Never publish a placeholder price.** `keepinvPricing` tiers carry a `provisional`
  flag; `lib/schema.ts` drops those from the `Offer` list. Google will print a price it
  finds in structured data.

### Typography note

The cards are set in **Marcellus**, matching what the site renders today, so a click
from Facebook lands on the same display face it promised.

`docs/typography.md` still records **Maglite** as the locked decision for the site, and
that migration has not been applied. If it ever is, switch the cards over with it — the
font is loaded in `lib/og.tsx` from `app/fonts/`, and `headlineSize()` will need
recalibrating, since Maglite runs about 6% narrower per em than Marcellus and its
buckets would then be sizing text smaller than it needs to be.

---

## 1. Real photos

The single biggest gap. Right now there is not one photograph of a human being anywhere
on the site, and the schema's `image` points at a generated graphic. For a Philippine SME
deciding whether to wire money to an unfamiliar brand, that is the trust ceiling.

### 1a. A photo-backed OG card variant

Add a `variant` to the card renderer rather than a second layout:

```ts
// lib/og.tsx
export type OgCard = {
  /* …existing fields… */
  /** "plate" (default) uses the dark emblem canvas; "photo" swaps in a treated photo. */
  variant?: "plate" | "photo";
};
```

The photo needs different handling from the plate, because a photograph is busy where the
plate is flat:

- **Treatment** — extend `scripts/prepare-og.mjs` with a `treatPhoto()` pass: cover-crop
  to 1200×630, desaturate ~25%, multiply-tint toward ink `#0a1b2e`, then JPEG q80. This
  is what keeps a warm real-world photo inside the Blueprint & Gilding palette instead of
  looking like a different brand's card.
- **Gradient** — the plate uses `${INK}f2 → ${INK}1a`. A photo needs roughly `f7 → 60`,
  i.e. darker for longer, or the headline loses contrast over highlights.
- **Text width** — no emblem to dodge, so `TEXT_WIDTH` can go from 720 to ~820 and the
  headline can hold 92px on longer lines.

**Which routes get it:** home and `/success-stories`. Keep the plate on `/solutions/keepinv`
— a photo fights the price message, and that page's job is the number.

### 1b. A trust band on the page

A founder photo, name, role, and one sentence, placed:

- above `CtaBand` on the home page, and
- inside `/philosophy` — it is a manifesto written in the first person, and an unattributed
  manifesto from an unknown company reads as marketing. A face makes it a person's
  position.

This is an E-E-A-T signal (Google's experience/expertise/authoritativeness/trust framing),
and AI answer engines disproportionately cite pages with named, attributable humans.

### 1c. `Person` schema

Add to `lib/schema.ts` and reference it from the organisation node:

```ts
const founder = {
  "@type": "Person",
  "@id": id("founder"),
  name: "…",
  jobTitle: "…",
  image: abs("/assets/team/…"),
  worksFor: { "@id": ORG_ID },
  sameAs: [/* LinkedIn — see § 4 */],
};
// then on `organization`:  founder: { "@id": id("founder") },
```

### 1d. Real images in the org schema

Replace `image: abs("/opengraph-image")` with an array. Google's local guidance wants at
least three, and prefers one of each aspect: **16:9, 4:3, and 1:1** of the same subject.

### What to shoot

Landscape, ≥2400px wide, natural light, no stock-photo posing. Phone camera is fine —
authenticity beats production value here.

1. **You (and team), waist-up, in your actual workspace.** Eyes to camera. This is the
   one that does the most work.
2. **A client install in situ** — the POS on a real counter, the RFID handheld in a real
   stockroom. Get written permission before shooting on a client's premises.
3. **Over-the-shoulder of Keep Inv running on real hardware.** Screen legible.
4. **A wide of the workspace**, no people — useful as a section background.

---

## 2. Client results with numbers

This is the highest-leverage SEO work left. `/success-stories` is currently a
`ComingSoon` stub that is in the sitemap and indexable — it is a promise with nothing
behind it. Real case studies turn it into the site's strongest ranking asset, because
they are the only content here that no competitor can copy.

### Shape

```ts
// content/case-studies.ts
export const caseStudies = [
  {
    slug: "lugawjuan-pos",          // matches the logo slug where possible
    client: "Lugaw Juan",
    industry: "Food service",
    city: "…",
    published: "2026-08",
    problem: "…",                    // what was manual, and what it cost them
    build: "…",                      // what we actually shipped
    results: [                       // hard numbers only — no "improved efficiency"
      { metric: "Stock count time", before: "2 days", after: "20 minutes" },
    ],
    quote: { text: "…", author: "…", role: "…" },
    images: ["/assets/case-studies/…"],
  },
] as const;
```

### Routes

- `/success-stories` — hub. Replaces `ComingSoon`, lists the cards.
- `/success-stories/[slug]` — one page per study, via `generateStaticParams()` +
  `generateMetadata()`.
- Each gets its own OG card. Derive the copy from the headline metric rather than hand-
  writing it: `lines: ["Two days of counting,", { text: "down to 20 minutes.", accent: true }]`
  is a better card than anything generic.
- `app/sitemap.ts` maps over `caseStudies` instead of listing `/success-stories` alone.

### Schema

`Article` per case study, `ItemList` on the hub, both referencing `{ "@id": ORG_ID }` as
publisher.

> **Do not add `Review` or `AggregateRating` markup.** Google explicitly disallows
> self-serving review markup — reviews of your own business, hosted by your own business.
> It is ineligible for rich results and can draw a manual action. Client quotes go in as
> ordinary page content. They still work; they just aren't marked up as reviews.

### Internal linking

Orphan pages don't rank. Wire each case study into the site:

- Hub → each case (obviously).
- Each case → `/solutions/keepinv` and `/contact`.
- `/solutions/keepinv` → the most relevant case, placed **beside the pricing table**.
  Proof next to price is the highest-converting position on that page.
- `components/home/trusted-by.tsx` → link each logo to its case study where one exists.
  Six logos already ship (`scripts/logos.json`): `lthmi`, `rapido-motorsiklo-garage`,
  `richmond-square`, `lugawjuan`, `topwin`, `rcdc`. That list is the candidate roster.

### Quality bar

Each study needs ~400+ words of genuinely unique content and real numbers. **Two real
case studies beat six padded ones** — templated near-duplicates are what triggers thin-
content demotion, and this is precisely the pattern Google polices hardest.

Long-tail targets fall out of the data for free: *"inventory system for [industry]
Philippines"*, *"POS for [industry] Manila"*.

### What to collect per client

1. Business name — **and explicit permission to name them publicly**.
2. Industry, city.
3. What was manual before, and what it cost in hours or pesos.
4. What we built.
5. Two or three numbers, each with before → after and a timeframe.
6. One verbatim quote, with the speaker's name and role.
7. A photo (see § 1).
8. Month they went live.

---

## 3. The real YouTube ID

`content/keepinv.ts` still carries `youtubeId: "dQw4w9WgXcQ"` — a Rickroll placeholder,
currently embedded and live on `/solutions/keepinv`. Fix this first whatever else happens.

### Then

- **`VideoObject` schema** → eligibility for video rich results and Google Video search.
  Required: `name`, `description`, `thumbnailUrl`, `uploadDate` (ISO 8601), `duration`
  (ISO 8601 e.g. `PT2M14S`), `embedUrl`, `contentUrl`. So collect the **upload date and
  runtime** along with the ID.
  Thumbnail: `https://img.youtube.com/vi/<id>/maxresdefault.jpg` — note this 404s on
  videos never processed at 1080p; fall back to `hqdefault.jpg`.
- **Facade the embed.** `components/keepinv/video.tsx` currently drops a
  `youtube-nocookie.com/embed/` iframe straight into the page. Even with `loading="lazy"`,
  that is a heavy third-party frame on the site's most important commercial page. Replace
  it with a click-to-play facade: render the YouTube thumbnail plus a play button, and
  only inject the iframe on click. Core Web Vitals are a ranking signal and this is the
  largest single win available on that page.

---

## 4. X / LinkedIn handles

Small job, real payoff — `sameAs` is how Google confirms that the site, the Facebook
page and the LinkedIn company page are all one entity, which consolidates authority
instead of splitting it.

1. `lib/seo.ts` / root layout metadata:
   ```ts
   twitter: { card: "summary_large_image", site: "@handle", creator: "@handle" },
   ```
2. `lib/schema.ts` — add every profile URL to the organisation's `sameAs` array (it
   currently holds Facebook alone).
3. `content/site.ts` — add the handles, then link them in `components/layout/footer.tsx`
   next to the existing Facebook link.

Worth creating a **LinkedIn company page even if you never post to it.** It is a
high-trust `sameAs` node and it ranks for the brand name, which means you occupy a second
slot on your own branded search results.

---

## 5. Carried-over decisions

Open items from Phase 1, none blocking:

- **`public/BNRS_Certificate.pdf`** is linked from the footer and fully indexable. Google
  may surface it as a standalone result. It is a DTI certificate with personal details —
  decide whether to `noindex` it. Left crawlable pending Ace's call.
- **~9 MB of dead deploy weight**: `public/assets/og.png` (6 MB) and
  `icarus-socials-pfp.png` (3.3 MB) are now build sources only. Moving them under
  `scripts/` and repointing `prepare-og.mjs` would drop it.
- **`gsap` is still in `package.json` dependencies** despite the ban in `CLAUDE.md`.
  Unused, uninstallable-by-policy, still installed.
- **`₱4,999` is a placeholder** (`content/keepinv.ts`, `PRO + Devices`). It is flagged
  `provisional: true` and therefore withheld from structured data. Once the real bundle
  price is set, delete the flag and it publishes itself.

---

## 6. Post-launch checklist

Independent of any asset. If these haven't been done yet, do them first — the phases
above are worthless if the site isn't in the index.

- [ ] Search Console: add `icarusautomation.tech`, verify by **DNS TXT** (survives
      redeploys), submit `sitemap.xml`, request indexing on the homepage.
- [ ] Facebook Sharing Debugger → **Scrape Again** before posting. FB caches the old card.
- [ ] Bing Webmaster Tools — import from Search Console. Feeds ChatGPT search.
- [ ] Google Business Profile — the address and phone now exist. Biggest remaining local
      lever, and free.
