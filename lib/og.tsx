/*
 * Satori renders this tree to a raster, not to the DOM. next/image does not
 * exist in that renderer and there is nothing for a screen reader to read — the
 * alt text for the finished card is the `alt` export in each
 * opengraph-image.tsx, which is what becomes og:image:alt.
 */
/* eslint-disable @next/next/no-img-element, jsx-a11y/alt-text */
import { readFile } from "node:fs/promises";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

/**
 * The shared social card. Every route's opengraph-image.tsx is a few lines of
 * copy handed to renderOgCard() — the layout lives here once.
 *
 * These routes are all static, so Next renders each card at build time and
 * serves it as a plain file. That matters more than it looks: Facebook's
 * scraper is impatient and only crawls the URL a couple of times before it
 * caches whatever it got, so the card cannot depend on a cold serverless start.
 *
 * Layout is pinned to the plate in public/assets/og/canvas.jpg. The winged
 * emblem sits in the right ~29% of that image, so text is capped at 700px wide
 * against a 72px left pad and never runs under it.
 */

const WIDTH = 1200;
const HEIGHT = 630;

// Palette lifted from app/globals.css. Blueprint is lifted a few steps for
// large text on near-black — #009dff stays for the solid CTA, where it is a
// background rather than a foreground.
const INK = "#0a1b2e";
const BLUEPRINT = "#009dff";
const BLUEPRINT_LIFTED = "#3db2ff";
const GILT = "#c9a227";
const PAPER = "#f2f5f8";

/**
 * Assets are addressed relative to this module rather than via
 * path.join(process.cwd(), …). A cwd-based path is opaque to the bundler, so it
 * gives up and traces the entire project into the deployed function; a literal
 * `new URL(…, import.meta.url)` is statically analysable and pulls in exactly
 * these four files.
 */
const asset = (relativePath: string) => new URL(relativePath, import.meta.url);

// Read once per build rather than once per card.
let cache: {
  canvas: string;
  mark: string;
  maglite: ArrayBuffer;
  inter: ArrayBuffer;
  interSemi: ArrayBuffer;
} | null = null;

async function load() {
  if (cache) return cache;

  const [canvas, mark, maglite, inter, interSemi] = await Promise.all([
    readFile(asset("../public/assets/og/canvas.jpg")),
    readFile(asset("../public/assets/og/mark.png")),
    readFile(asset("../app/fonts/Maglite-Regular.ttf")),
    readFile(asset("../app/fonts/Inter-Regular.ttf")),
    readFile(asset("../app/fonts/Inter-SemiBold.ttf")),
  ]);

  cache = {
    canvas: `data:image/jpeg;base64,${canvas.toString("base64")}`,
    mark: `data:image/png;base64,${mark.toString("base64")}`,
    maglite: maglite.buffer.slice(
      maglite.byteOffset,
      maglite.byteOffset + maglite.byteLength,
    ) as ArrayBuffer,
    inter: inter.buffer.slice(
      inter.byteOffset,
      inter.byteOffset + inter.byteLength,
    ) as ArrayBuffer,
    interSemi: interSemi.buffer.slice(
      interSemi.byteOffset,
      interSemi.byteOffset + interSemi.byteLength,
    ) as ArrayBuffer,
  };
  return cache;
}

// The Greek key from the .meander rule in globals.css, drawn straight in gilt
// instead of masked. It is the one gilt moment on the card.
const MEANDER = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="10" viewBox="0 0 1200 10">` +
    `<defs><pattern id="m" width="40" height="10" patternUnits="userSpaceOnUse">` +
    `<path d="M0 0h40v2H12v6h6V4h2v6H0V8h10V2H4v4H2V2H0z" fill="${GILT}"/>` +
    `</pattern></defs><rect width="1200" height="10" fill="url(#m)"/></svg>`,
)}`;

/** A headline line. Accented lines take the blueprint blue. */
export type OgLine = string | { text: string; accent: true };

const TEXT_WIDTH = 720;

/**
 * Satori neither shrinks text to fit nor reports overflow — a headline that is
 * too wide silently re-wraps and collides with the emblem. Sizing off the
 * longest line keeps every card intentional no matter what copy it is given.
 * Buckets are calibrated against Maglite's average advance width (~0.44em).
 */
function headlineSize(lines: readonly OgLine[]) {
  const longest = Math.max(
    ...lines.map((l) => (typeof l === "string" ? l : l.text).length),
  );
  if (longest <= 14) return 92;
  if (longest <= 18) return 82;
  if (longest <= 22) return 70;
  if (longest <= 27) return 58;
  return 50;
}

export type OgCard = {
  /** Small letterspaced eyebrow above the headline. */
  kicker: string;
  /**
   * Headline, one array entry per rendered line. Breaks are authored rather
   * than wrapped so the shape is identical on every card, and so an accented
   * line can carry its own colour without inline spans.
   *
   * Maglite has no peso glyph — keep prices in `sub`, which is Inter.
   */
  lines: readonly OgLine[];
  /** One supporting sentence. Keep it under ~110 characters. */
  sub: string;
  /** Button label. Defaults to the site-wide CTA. */
  cta?: string;
};

export async function renderOgCard({ kicker, lines, sub, cta }: OgCard) {
  const { canvas, mark, maglite, inter, interSemi } = await load();
  const fontSize = headlineSize(lines);

  return new ImageResponse(
    (
      <div style={{ display: "flex", position: "relative", width: WIDTH, height: HEIGHT }}>
        <img src={canvas} width={WIDTH} height={HEIGHT} style={{ position: "absolute" }} />

        {/* Warms the grey plate toward brand ink and guarantees text contrast,
            while thinning out to the right so the emblem stays visible. */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `linear-gradient(100deg, ${INK}f2 0%, ${INK}e0 40%, ${INK}80 68%, ${INK}1a 100%)`,
          }}
        />

        {/* Blueprint spine down the left edge. */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 7,
            height: HEIGHT,
            backgroundColor: BLUEPRINT,
          }}
        />

        <img
          src={MEANDER}
          width={WIDTH}
          height={10}
          style={{ position: "absolute", left: 0, top: HEIGHT - 10, opacity: 0.75 }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: WIDTH,
            height: HEIGHT,
            padding: "54px 0 64px 72px",
          }}
        >
          {/* Lockup: the official mark — the same asset the root layout
              declares as the organisation logo — beside the name, split the way
              the site navbar and footer split it. Maglite goes hairline-thin
              under ~24px, so the name sits at 28. */}
          <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
            <img src={mark} width={58} height={58} />
            <div
              style={{ display: "flex", fontFamily: "Maglite", fontSize: 28, color: PAPER }}
            >
              <div style={{ display: "flex" }}>Icarus</div>
              <div style={{ display: "flex", color: BLUEPRINT_LIFTED }}>.Automation</div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", maxWidth: TEXT_WIDTH }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                fontFamily: "Inter",
                fontWeight: 600,
                fontSize: 17,
                letterSpacing: "0.2em",
                color: BLUEPRINT_LIFTED,
              }}
            >
              <div style={{ display: "flex", width: 9, height: 9, backgroundColor: BLUEPRINT }} />
              <div style={{ display: "flex" }}>{kicker.toUpperCase()}</div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: 22,
                fontFamily: "Maglite",
                fontSize,
                lineHeight: 1.08,
                color: PAPER,
              }}
            >
              {lines.map((line, i) => {
                const text = typeof line === "string" ? line : line.text;
                const accent = typeof line !== "string";
                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      // Authored breaks only: a silent re-wrap would push the
                      // headline down into the sub line.
                      whiteSpace: "nowrap",
                      color: accent ? BLUEPRINT_LIFTED : PAPER,
                    }}
                  >
                    {text}
                  </div>
                );
              })}
            </div>

            <div
              style={{
                display: "flex",
                marginTop: 26,
                maxWidth: 640,
                fontFamily: "Inter",
                fontSize: 24,
                lineHeight: 1.45,
                color: "rgba(255,255,255,0.64)",
              }}
            >
              {sub}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
            {/* 2px corner is the house radius — see --radius-sm. */}
            <div
              style={{
                display: "flex",
                borderRadius: 2,
                backgroundColor: BLUEPRINT,
                padding: "15px 30px",
                fontFamily: "Inter",
                fontWeight: 600,
                fontSize: 20,
                color: "#04101c",
              }}
            >
              {cta ?? site.cta.label}
            </div>
            <div
              style={{
                display: "flex",
                fontFamily: "Inter",
                fontWeight: 600,
                fontSize: 18,
                letterSpacing: "0.08em",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              {site.domain}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: WIDTH,
      height: HEIGHT,
      fonts: [
        { name: "Maglite", data: maglite, weight: 400, style: "normal" },
        { name: "Inter", data: inter, weight: 400, style: "normal" },
        { name: "Inter", data: interSemi, weight: 600, style: "normal" },
      ],
    },
  );
}

/** Every card is the same shape; Next wants these next to the default export. */
export const ogImageSize = { width: WIDTH, height: HEIGHT };
export const ogContentType = "image/png";
