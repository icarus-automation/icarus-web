# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Small business owners, startup founders, and corporate department heads across the Philippines — evaluating technology and automation partners. They're budget-conscious but ambitious: they've seen what enterprise software can do and want it at a price their operation can actually absorb. Non-technical, but decisive; they're comparing vendors and need to feel confident fast. Visiting from a work device, during business hours, probably mid-evaluation of multiple service providers.

## Product Purpose

Convert visitors into "Book a Free Demo" bookings. Icarus.Automation (the DTI-registered business name) provides n8n workflow automations, custom web systems, IoT + embedded solutions, and Keep Inv (a POS/inventory platform, live with paying customers) — all positioned as enterprise-grade capability at a price Philippine SMBs can actually pay. Success is a booked consultation. Secondary conversion: Keep Inv purchase interest from businesses with specific inventory or asset-tracking needs, which routes to Facebook Messenger rather than the booking calendar.

## Positioning

Two claims carry the business, confirmed 2026-08-03:

1. **Enterprise capability at a ₱1,299 entry price.** RFID asset auditing, an integrated POS, and production automations at a price point Philippine SMBs can absorb without financing. The gap between the capability and the number is the offer.
2. **Real n8n + AI automation depth.** Working AI content pipelines, lead routing, and reporting automations — not the surface-level integrations a general web shop can assemble. This is the technical claim a neighboring agency could not truthfully make.

**Not the positioning:** "Licensed, not subscribed" / one-time lifetime licensing. The business is moving toward recurring revenue to sustain itself. Affordability survives this shift; the anti-subscription framing does not. Future work must not build new argument on it. (See Capabilities and Constraints for the copy this still affects.)

## Operating Context

- **Team:** 2–5 people covering development, hardware, and client delivery. Engagement promises must stay inside what a team that size can sustain.
- **Reach:** Philippines-wide. Hardware installs are on-site; everything else is delivered remotely.
- **Primary conversion path:** "Book a Free Demo" → `/contact` → a Google Calendar appointment schedule (URL in `content/site.ts`). Every demo ends with a clear quote and no obligation.
- **Secondary path:** Keep Inv purchases and hardware-bundle enquiries route to the Facebook page's Messenger, not the calendar. Facebook is the only social channel.
- **Delivery shape:** discover (free consultation) → build (client in the loop) → launch (deploy, integrate hardware, migrate data, train staff) → support (ongoing monitoring and change requests, not a separate contract).

## Capabilities and Constraints

**Services:** workflow automation (n8n, AI content pipelines, lead routing, reports); custom web systems and internal tools with third-party integration; IoT and embedded (sensors, firmware, dashboards); business digitization (process assessment, data migration, staff training). Hardware is sourced and installed by Icarus: thermal and label printers, barcode scanners, handheld RFID readers.

**Keep Inv** — live at `app.keepinv.com` with 2 paying customers. Inventory management with integrated POS and RFID auditing. Current pricing: BASIC ₱1,299 (inventory only), PRO ₱1,499 (inventory + POS), plus hardware bundles and custom change requests (₱650 flat labour + hourly by complexity). The live app is intentionally not linked publicly — prospects would land on a login screen.

**Lease Linq** — a second Icarus-owned SaaS product: property and lease management. In development, not launched. No public page exists yet; do not assert availability, pricing, or features.

**Pricing model in transition.** Recurring pricing is being introduced. The current lifetime-access prices above are what is published today, but the model is not settled. Do not treat any specific pricing structure as durable product truth; verify before writing new pricing copy.

**Copy carrying the retired anti-subscription framing** (leave in place until the user asks for a rewrite): the entire `/philosophy` route and `philosophy` object in `content/site.ts`, the "How much does it cost?" FAQ entry, and "One payment, no subscription" in `content/keepinv.ts`.

**Known placeholders in the codebase** (not product facts — never surface them as real): the Keep Inv YouTube video ID (`dQw4w9WgXcQ`), the ₱4,999 "PRO + Devices" bundle price, and the `/blog` and `/success-stories` routes, which are empty `ComingSoon` stubs.

**Technical constraints:** Next.js 16 / React 19 / Tailwind 4. `gsap` is banned from this project — animation uses `motion` (Framer Motion) plus CSS. Client logos are generated, never hand-edited (see `CLAUDE.md`).

## Brand Commitments

**Name:** Icarus.Automation. "Icarus Automation" was unavailable in DTI BNRS; the registered name includes the period and the logotype is set that way.

**Personality — Ambitious · Mythic · Trusted.** Confident and authoritative without being corporate or intimidating. The Icarus mythology is reframed: not hubris and the fall, but the audacity to rise — and the craft to sustain the flight. Tone is warm but serious; professional without being inaccessible. The emotional goal: visitors leave convinced these people are serious, know what they're doing, and will make their business better without breaking the bank.

**The Greek identity is a deliberate differentiator, not decoration.** Classical motifs are intentional marks of craft and quality, not a theme layered on.

**Typography (locked):** Maglite (display, local file in `app/fonts/`) + Inter (body). Read `docs/typography.md` before touching fonts. Sonar Sans was rejected.

**Assets:** `public/assets/icarus-illustration.png`, `public/assets/icarus-socials-pfp.png`, the four-step flight illustrations in `public/assets/icarus-step/`, and brand references in `docs/brand/`.

**Anti-references:**

- **Cheap local agency** — bright primary colors, drop shadows, stock photos, loud fonts. Reads unserious and undercuts trust.
- **Corporate enterprise** — SAP / IBM formality. Intimidates the small business owner Icarus is trying to serve.
- **Trendy AI aesthetic** — purple gradients, glassmorphism, chat-bubble UI, pastel gradients. The off-the-shelf 2024–2025 startup template.

## Evidence on Hand

**Real, as of 2026-08-03:**

- **8 projects deployed to real clients.** This is the accurate count. The previously asserted "12+" was not confirmed and must not be reused.
- **6 named clients**, logos in `public/assets/trusted-by/`: LTHMI, Rapido Motorsiklo Garage, Richmond Square, Lugaw Juan, Topwin, RCDC Property Management.
- **Keep Inv has 2 live paying customers** on `app.keepinv.com`.
- **2 client engagements in flight** — converting landing pages; one also includes Facebook post automation.

**Absences future work must not fabricate:**

- **No testimonials, quotes, or written case studies exist.** None. The dashed placeholder in `components/keepinv/testimonials.tsx` and the empty `/success-stories` route reflect reality, not an oversight.
- No press, awards, certifications, benchmark data, uptime figures, or named client results.
- No customer count, revenue figure, or "hours saved" statistic has been measured. Do not invent stat counters.

## Product Principles

1. **The price gap is the product.** The distance between enterprise-grade capability and a ₱1,299 entry point is the whole argument. Any decision that makes the offer feel expensive, exclusive, or out of reach attacks the business model itself.
2. **One vendor, whole system.** Software, hardware sourcing, on-site install, data migration, staff training, and ongoing support come from Icarus. Never present a partial system or push the client toward a second supplier to finish the job.
3. **Lead with what the business becomes.** Outcomes before feature lists. Every headline answers "what does the client gain?" before "what does Icarus provide?"
4. **Proof is named, never numbered.** With 8 deployments and 6 named clients, every social-proof reference must be a real, attributable engagement. Volume-signalling — stat counters, generic avatars, invented quotes — is prohibited, not merely discouraged.
5. **World-class execution, Filipino identity.** A local company competing above its weight class. International in craft, distinctly Filipino in context — never "local business website," never an imitation of a Western agency.

## Accessibility & Inclusion

WCAG 2.1 AA minimum. Philippine market users may be on mid-range Android devices with variable bandwidth; performance is a real accessibility dimension here, not a secondary concern. Reduced-motion support is already wired in `globals.css` and must be maintained across all new animations.
