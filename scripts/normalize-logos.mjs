/**
 * Normalize the "Trusted by" client logos into one even, monochrome-ready set.
 *
 *   node scripts/normalize-logos.mjs      (or: npm run logos)
 *
 * ADDING A LOGO
 *   1. Drop the raw file at scripts/logo-sources/<slug>.png
 *   2. Add { "slug": "<slug>", "name": "Display Name" } to scripts/logos.json
 *   3. npm run logos
 * Everything else — background removal, trimming, optical sizing, and the
 * width/height metadata in content/clients.generated.ts — is worked out here.
 * Only reach for the optional overrides in logos.json if a logo comes out wrong.
 *
 * Raw client logos are wildly inconsistent: some ship with baked-in opaque
 * backgrounds (a solid red signboard, a cream sticker, a blue gradient card)
 * while others are clean transparent marks. On a logo strip that makes the
 * boxed ones dominate and the whole row look uneven.
 *
 * This pass, per logo:
 *   1. Strips the background. Two keyers, picked automatically:
 *      - "flood": EDGE-SEEDED flood fill for flat backgrounds. Unlike a global
 *        chroma-key it only removes pixels connected to the border, so
 *        same-coloured regions INSIDE the mark are preserved.
 *      - "gradient": for backgrounds that shade across the image, where no
 *        single seed colour works. Models the background per column, then
 *        solves each pixel's alpha as its blend toward the mark colour.
 *   2. Re-inks reversed logos. A mark that was white-on-dark is invisible on a
 *      light page, so it is recoloured to the source background's own brand
 *      hue — the standard "reverse" lockup, and it still greys out at rest.
 *   3. Trims transparent margins to the true content box.
 *   4. Resizes to a per-logo optical height so perceived weight is even
 *      (dense badges read large -> smaller; faint line marks -> larger).
 *   5. Pads to a common canvas height (200) + fixed side padding, so the
 *      component can render every logo at one CSS height with even gaps.
 *
 * Colour is kept (not baked to grey) so the component can grayscale at rest
 * and reveal the real brand colour on hover.
 *
 * Sources live in scripts/logo-sources/ (kept out of /public so they are not
 * deployed). Outputs overwrite public/assets/trusted-by/<slug>.png.
 */
import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";

const SRC = "scripts/logo-sources";
const OUT = "public/assets/trusted-by";
const MANIFEST = "scripts/logos.json";
const GENERATED = "content/clients.generated.ts";

const CANVAS_H = 200; // common height across all logos
const SIDE_PAD = 26; // transparent px left/right of content
const MAX_CONTENT_W = 300; // backstop so a very wide lockup can't run the row

// Auto optical-height tuning. TARGET_INK is the alpha-weighted pixel count a
// mark should settle at; MIN/MAX_OPTICAL_H bound the result. See opticalHeight().
const TARGET_INK = 14000;
const MIN_OPTICAL_H = 120;
const MAX_OPTICAL_H = 172;

const lum = (r, g, b) => 0.299 * r + 0.587 * g + 0.114 * b;
const sat = (r, g, b) => Math.max(r, g, b) - Math.min(r, g, b);
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

/** Every pixel on the 1px border, as [r,g,b,a]. */
function borderPixels(data, w, h, c) {
  const out = [];
  const at = (x, y) => {
    const i = (y * w + x) * c;
    return [data[i], data[i + 1], data[i + 2], data[i + 3]];
  };
  for (let x = 0; x < w; x++) {
    out.push(at(x, 0), at(x, h - 1));
  }
  for (let y = 0; y < h; y++) {
    out.push(at(0, y), at(w - 1, y));
  }
  return out;
}

/**
 * Decide how to strip this source's background by looking at its border:
 * mostly transparent -> nothing to do; one flat colour -> flood fill; a colour
 * that shades from edge to edge -> gradient key.
 */
function detectMode(data, w, h, c) {
  const border = borderPixels(data, w, h, c);
  const transparent = border.filter((p) => p[3] < 16).length;
  if (transparent > border.length * 0.05) return { mode: "none" };

  // Spread of the border colour decides flat vs. gradient.
  let min = [255, 255, 255];
  let max = [0, 0, 0];
  for (const p of border) {
    for (let k = 0; k < 3; k++) {
      if (p[k] < min[k]) min[k] = p[k];
      if (p[k] > max[k]) max[k] = p[k];
    }
  }
  const spread = Math.max(max[0] - min[0], max[1] - min[1], max[2] - min[2]);
  if (spread <= 24) {
    const seed = [0, 1, 2].map((k) =>
      Math.round(border.reduce((s, p) => s + p[k], 0) / border.length),
    );
    return { mode: "flood", bg: seed, tol: 40 };
  }
  return { mode: "gradient" };
}

/**
 * BFS from every border pixel; clear alpha on background-connected pixels
 * within `tol` of the seed colour.
 */
function floodKey(data, w, h, c, seed, tol) {
  const N = w * h;
  const visited = new Uint8Array(N);
  const stack = [];
  const t2 = tol * tol;
  const within = (i) => {
    const dr = data[i * c] - seed[0];
    const dg = data[i * c + 1] - seed[1];
    const db = data[i * c + 2] - seed[2];
    return dr * dr + dg * dg + db * db <= t2;
  };
  const push = (x, y) => {
    const i = y * w + x;
    if (visited[i]) return;
    visited[i] = 1;
    if (within(i)) stack.push(i);
  };
  for (let x = 0; x < w; x++) {
    push(x, 0);
    push(x, h - 1);
  }
  for (let y = 0; y < h; y++) {
    push(0, y);
    push(w - 1, y);
  }
  while (stack.length) {
    const i = stack.pop();
    data[i * c + 3] = 0;
    const x = i % w;
    const y = (i / w) | 0;
    if (x > 0) push(x - 1, y);
    if (x < w - 1) push(x + 1, y);
    if (y > 0) push(x, y - 1);
    if (y < h - 1) push(x, y + 1);
  }
}

/**
 * Key a background that shades across the image, where flood fill has no single
 * seed colour to chase.
 *
 * The mark on these is a flat wash (white on a coloured card), so within any
 * column the *most saturated* pixel is background — that gives a per-column
 * background model, smoothed sideways to stop the estimate banding. Each pixel
 * is then read as `px = a*mark + (1-a)*bg`, and `a` falls out as a least-squares
 * fit over the three channels. `ALPHA_FLOOR` drops the near-zero tail so faint
 * background haze doesn't survive as a grey film.
 */
function gradientKey(data, w, h, c) {
  const ALPHA_FLOOR = 0.08;
  const SMOOTH = 8; // ± columns averaged into the background model

  const raw = new Float64Array(w * 3);
  for (let x = 0; x < w; x++) {
    let best = -1;
    for (let y = 0; y < h; y++) {
      const i = (y * w + x) * c;
      const s = sat(data[i], data[i + 1], data[i + 2]);
      if (s > best) {
        best = s;
        raw[x * 3] = data[i];
        raw[x * 3 + 1] = data[i + 1];
        raw[x * 3 + 2] = data[i + 2];
      }
    }
  }

  const bg = new Float64Array(w * 3);
  for (let x = 0; x < w; x++) {
    const lo = Math.max(0, x - SMOOTH);
    const hi = Math.min(w - 1, x + SMOOTH);
    for (let k = 0; k < 3; k++) {
      let sum = 0;
      for (let j = lo; j <= hi; j++) sum += raw[j * 3 + k];
      bg[x * 3 + k] = sum / (hi - lo + 1);
    }
  }

  // The mark is whatever the background is blending toward: the least saturated
  // bright pixel for a reverse logo, else pure black for dark-on-light art.
  const bgMeanLum =
    Array.from({ length: w }, (_, x) =>
      lum(bg[x * 3], bg[x * 3 + 1], bg[x * 3 + 2]),
    ).reduce((a, b) => a + b, 0) / w;
  const mark = bgMeanLum < 140 ? [255, 255, 255] : [0, 0, 0];

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * c;
      let num = 0;
      let den = 0;
      for (let k = 0; k < 3; k++) {
        const d = mark[k] - bg[x * 3 + k];
        num += (data[i + k] - bg[x * 3 + k]) * d;
        den += d * d;
      }
      let a = den > 0 ? num / den : 0;
      a = clamp(a, 0, 1);
      a = a < ALPHA_FLOOR ? 0 : (a - ALPHA_FLOOR) / (1 - ALPHA_FLOOR);
      for (let k = 0; k < 3; k++) data[i + k] = mark[k];
      data[i + 3] = Math.round(a * 255);
    }
  }

  // Darkest point of the background is the brand colour a reverse mark sits on;
  // hand it back so the mark can be re-inked in it.
  let ink = null;
  let darkest = Infinity;
  for (let x = 0; x < w; x++) {
    const l = lum(bg[x * 3], bg[x * 3 + 1], bg[x * 3 + 2]);
    if (l < darkest) {
      darkest = l;
      ink = [bg[x * 3], bg[x * 3 + 1], bg[x * 3 + 2]].map(Math.round);
    }
  }
  return { ink };
}

/**
 * A mark that was white-on-dark vanishes on a light page. Repaint it in the
 * brand colour it used to sit on, keeping the alpha (so the shape and its
 * anti-aliased edges are untouched).
 */
function reInk(data, w, h, c, ink) {
  let inkSum = 0;
  let lumSum = 0;
  for (let i = 0; i < w * h; i++) {
    const a = data[i * c + 3] / 255;
    if (a <= 0.03) continue;
    inkSum += a;
    lumSum += a * lum(data[i * c], data[i * c + 1], data[i * c + 2]);
  }
  if (inkSum === 0 || lumSum / inkSum < 175) return false; // already dark enough

  for (let i = 0; i < w * h; i++) {
    if (data[i * c + 3] === 0) continue;
    data[i * c] = ink[0];
    data[i * c + 1] = ink[1];
    data[i * c + 2] = ink[2];
  }
  return true;
}

/**
 * Pick a height that makes this mark *look* the same weight as its neighbours.
 *
 * Two rules disagree in useful ways, so they are averaged geometrically:
 * equal-ink (scale until the alpha-weighted pixel count matches TARGET_INK)
 * gets dense badges right but blows sparse line marks up past the canvas;
 * equal-extent (shrink as the lockup gets wider) is the opposite. Together they
 * land within ~10% of the hand-tuned values already in logos.json.
 */
function opticalHeight(ink, contentW, contentH) {
  const aspect = contentW / contentH;
  const coverage = ink / (contentW * contentH);
  const byInk = Math.sqrt(TARGET_INK / (aspect * coverage));
  const byExtent = 160 / Math.sqrt(aspect / 1.15);
  return Math.round(
    clamp(Math.sqrt(byInk * byExtent), MIN_OPTICAL_H, MAX_OPTICAL_H),
  );
}

/** Alpha-weighted ink and tight content box of an RGBA buffer. */
function measure(data, w, h, c) {
  let ink = 0;
  let minX = w;
  let maxX = -1;
  let minY = h;
  let maxY = -1;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const a = data[(y * w + x) * c + 3];
      if (a <= 8) continue;
      ink += a / 255;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
  if (maxX < 0) throw new Error("logo is fully transparent after keying");
  return { ink, contentW: maxX - minX + 1, contentH: maxY - minY + 1 };
}

async function normalize(entry) {
  const { slug } = entry;
  const { data, info } = await sharp(`${SRC}/${slug}.png`)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: w, height: h, channels } = info;

  const auto = detectMode(data, w, h, channels);
  const mode = entry.mode ?? auto.mode;
  const notes = [entry.mode ? `mode=${mode}` : `mode=${mode} (auto)`];

  let ink = null;
  if (mode === "flood") {
    const bg = entry.bg ?? auto.bg;
    const tol = entry.tol ?? auto.tol ?? 40;
    if (!bg) throw new Error(`${slug}: flood mode needs a "bg" colour`);
    floodKey(data, w, h, channels, bg, tol);
  } else if (mode === "gradient") {
    ({ ink } = gradientKey(data, w, h, channels));
  } else if (mode !== "none") {
    throw new Error(`${slug}: unknown mode "${mode}"`);
  }

  const inkColor = entry.ink ?? ink;
  if (inkColor && reInk(data, w, h, channels, inkColor)) {
    notes.push(`re-inked rgb(${inkColor.join(",")})`);
  }

  const stats = measure(data, w, h, channels);
  const opticalH = entry.opticalH ?? opticalHeight(stats.ink, stats.contentW, stats.contentH);
  notes.push(entry.opticalH ? `h=${opticalH}` : `h=${opticalH} (auto)`);

  const trimmed = await sharp(data, {
    raw: { width: w, height: h, channels },
  })
    .png()
    .trim({ threshold: 1 })
    .toBuffer();

  const sized = await sharp(trimmed)
    .resize({
      height: opticalH,
      width: MAX_CONTENT_W,
      fit: "inside",
      withoutEnlargement: false,
    })
    .toBuffer();
  const m = await sharp(sized).metadata();

  const top = Math.round((CANVAS_H - m.height) / 2);
  const bottom = CANVAS_H - m.height - top;

  await sharp(sized)
    .extend({
      top,
      bottom,
      left: SIDE_PAD,
      right: SIDE_PAD,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toFile(`${OUT}/${slug}.png`);

  const out = await sharp(`${OUT}/${slug}.png`).metadata();
  return { name: entry.name, slug, w: out.width, h: out.height, notes };
}

const entries = JSON.parse(await readFile(MANIFEST, "utf8"));
const results = [];
for (const entry of entries) results.push(await normalize(entry));

const body = results
  .map(
    (r) =>
      `  {\n    name: ${JSON.stringify(r.name)},\n    logo: "/assets/trusted-by/${r.slug}.png",\n    w: ${r.w},\n    h: ${r.h},\n  },`,
  )
  .join("\n");

await writeFile(
  GENERATED,
  `// AUTO-GENERATED by scripts/normalize-logos.mjs — do not edit by hand.\n` +
    `// Source of truth: scripts/logos.json + scripts/logo-sources/*.png\n` +
    `// Regenerate with: npm run logos\n` +
    `//\n` +
    `// Every logo has been background-stripped to transparent and baked to one\n` +
    `// optical weight on a common height, so the strip renders as a single even\n` +
    `// ink tone with no standouts. w/h are each file's intrinsic pixel size.\n` +
    `export const clients = [\n${body}\n] as const;\n`,
  "utf8",
);

console.log(`Wrote ${results.length} logos -> ${OUT} and ${GENERATED}`);
for (const r of results) {
  console.log(`  ${r.slug.padEnd(26)} ${r.w}x${r.h}  ${r.notes.join(", ")}`);
}
