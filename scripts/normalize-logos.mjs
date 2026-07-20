/**
 * Normalize the "Trusted by" client logos into one even, monochrome-ready set.
 *
 * Raw client logos are wildly inconsistent: some ship with baked-in opaque
 * backgrounds (a solid red signboard, a cream sticker, a white card) while
 * others are clean transparent marks. On a logo strip that makes the boxed
 * ones dominate and the whole row look uneven.
 *
 * This pass, per logo:
 *   1. Strips the background via an EDGE-SEEDED flood fill (tolerance-based).
 *      Unlike a global chroma-key it only removes pixels connected to the
 *      border, so same-coloured regions INSIDE the mark are preserved.
 *   2. Trims transparent margins to the true content box.
 *   3. Resizes to a per-logo optical height so perceived weight is even
 *      (circular badges read large -> smaller; faint line marks -> larger).
 *   4. Pads to a common canvas height (200) + fixed side padding, so the
 *      component can render every logo at one CSS height with even gaps.
 *
 * Colour is kept (not baked to grey) so the component can grayscale at rest
 * and reveal the real brand colour on hover.
 *
 *   node scripts/normalize-logos.mjs
 *
 * Sources live in scripts/logo-sources/ (kept out of /public so they are not
 * deployed). Outputs overwrite public/assets/trusted-by/<name>.png.
 */
import sharp from "sharp";

const SRC = "scripts/logo-sources";
const OUT = "public/assets/trusted-by";

const CANVAS_H = 200; // common height across all logos
const SIDE_PAD = 26; // transparent px left/right of content

// Per-logo config. `bg` = the background colour to key out (null if the source
// is already transparent); `tol` = flood-fill colour tolerance; `opticalH` =
// target content height that evens perceived weight.
const LOGOS = [
  { name: "lthmi", bg: [255, 255, 255], tol: 40, opticalH: 172 },
  { name: "rapido-motorsiklo-garage", bg: [189, 8, 10], tol: 70, opticalH: 150 },
  { name: "richmond-square", bg: null, tol: 0, opticalH: 166 },
  { name: "lugawjuan", bg: [250, 243, 233], tol: 38, opticalH: 154 },
  { name: "topwin", bg: null, tol: 0, opticalH: 150 },
];

// BFS from every border pixel; clear alpha on background-connected pixels
// within `tol` of the seed colour.
function floodRemoveBg(data, w, h, c, seed, tol) {
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

async function normalize({ name, bg, tol, opticalH }) {
  const { data, info } = await sharp(`${SRC}/${name}.png`)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: w, height: h, channels } = info;

  if (bg) floodRemoveBg(data, w, h, channels, bg, tol);

  const trimmed = await sharp(data, { raw: { width: w, height: h, channels } })
    .png()
    .trim({ threshold: 1 })
    .toBuffer();

  const sized = await sharp(trimmed)
    .resize({ height: opticalH, fit: "inside", withoutEnlargement: false })
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
    .toFile(`${OUT}/${name}.png`);

  const out = await sharp(`${OUT}/${name}.png`).metadata();
  return { name, w: out.width, h: out.height };
}

const dims = [];
for (const logo of LOGOS) dims.push(await normalize(logo));
console.log("Wrote normalized logos. Update w/h in content/site.ts if changed:");
for (const d of dims) console.log(`  ${d.name}: ${d.w}x${d.h}`);
