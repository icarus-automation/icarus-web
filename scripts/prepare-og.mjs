/**
 * Prepare the build-time inputs the social cards and favicons need.
 *
 *   node scripts/prepare-og.mjs      (or: npm run og)
 *
 * Everything here is a one-off derivation from assets already in the repo, so
 * this only needs re-running when one of those sources changes:
 *
 *   public/assets/og.png              -> public/assets/og/canvas.jpg
 *       The raw plate is 4800x2700 and ~6 MB. Facebook's scraper gives up on
 *       slow images, and og:image wants 1.91:1, so it is cover-cropped to
 *       1200x630 and squeezed to a JPEG the renderer can inline as a data URI
 *       without bloating every generated card.
 *
 *   public/assets/icarus-socials-pfp.png -> app/icon.png, app/apple-icon.png
 *       The stock create-next-app triangle shipped as app/favicon.ico. Google
 *       renders favicons in mobile results, so the brand mark replaces it.
 *
 *   Google Fonts -> app/fonts/Inter-{Regular,SemiBold}.ttf
 *       next/font hands Satori nothing it can use: ImageResponse needs real
 *       font buffers. Maglite already lives in app/fonts as a local file;
 *       Inter has to be fetched once and committed next to it.
 *
 * The generated files are committed. This is not part of `next build` — a
 * network fetch in the build path would fail deploys for no good reason.
 */

import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const rel = (...p) => path.join(root, ...p);

// og:image is spec'd at 1.91:1. The plate is 16:9, so a cover crop trims ~22px
// top and bottom — the emblem is off-centre to the right and survives it.
const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

async function buildCanvas() {
  const src = rel("public/assets/og.png");
  if (!existsSync(src)) {
    throw new Error(`missing OG plate at ${src}`);
  }

  await mkdir(rel("public/assets/og"), { recursive: true });
  const out = rel("public/assets/og/canvas.jpg");

  const info = await sharp(src)
    .resize(OG_WIDTH, OG_HEIGHT, { fit: "cover", position: "centre" })
    // The plate is a near-black texture: chroma subsampling is invisible here
    // and mozjpeg buys back most of the weight the data URI would cost.
    .jpeg({ quality: 82, mozjpeg: true, chromaSubsampling: "4:2:0" })
    .toFile(out);

  console.log(
    `canvas   ${OG_WIDTH}x${OG_HEIGHT}  ${(info.size / 1024).toFixed(0)} KB  -> public/assets/og/canvas.jpg`,
  );
}

async function buildIcons() {
  const src = rel("public/assets/icarus-socials-pfp.png");
  if (!existsSync(src)) {
    console.warn("skip icons: no icarus-socials-pfp.png");
    return;
  }

  // The mark is a winged figure ringed by sun rays. At 16-32px the rays turn to
  // noise, so the icon crops to the central 76% and lets the figure carry it.
  const { width = 0, height = 0 } = await sharp(src).metadata();
  const side = Math.round(Math.min(width, height) * 0.76);
  const left = Math.round((width - side) / 2);
  const top = Math.round((height - side) / 2);

  const cropped = () =>
    sharp(src)
      .extract({ left, top, width: side, height: side })
      .flatten({ background: "#ffffff" });

  const targets = [
    { file: "app/icon.png", size: 512 },
    { file: "app/apple-icon.png", size: 180 },
  ];

  for (const { file, size } of targets) {
    const info = await cropped()
      .resize(size, size)
      .png({ compressionLevel: 9, palette: true })
      .toFile(rel(file));
    console.log(
      `icon     ${size}x${size}      ${(info.size / 1024).toFixed(0)} KB  -> ${file}`,
    );
  }

  // app/icon.png covers modern browsers, but /favicon.ico is still requested at
  // the root by crawlers and older clients, and the file sitting there is the
  // Vercel triangle create-next-app ships. Rewrite it with the brand mark.
  // ensureAlpha matters: flatten() drops the alpha channel, and Next's ICO
  // decoder rejects frames that are not RGBA.
  const frames = await Promise.all(
    [16, 32, 48].map(async (size) => ({
      size,
      png: await cropped()
        .resize(size, size)
        .ensureAlpha()
        .png({ compressionLevel: 9 })
        .toBuffer(),
    })),
  );

  // ICO container: 6-byte header, then a 16-byte directory entry per frame,
  // then the PNG payloads. PNG-in-ICO is supported everywhere that matters.
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(frames.length, 4);

  let offset = 6 + frames.length * 16;
  const entries = frames.map(({ size, png }) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(size, 0); // width  (0 would mean 256)
    e.writeUInt8(size, 1); // height
    e.writeUInt8(0, 2); // palette size, 0 = truecolour
    e.writeUInt8(0, 3); // reserved
    e.writeUInt16LE(1, 4); // colour planes
    e.writeUInt16LE(32, 6); // bits per pixel
    e.writeUInt32LE(png.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += png.length;
    return e;
  });

  const ico = Buffer.concat([header, ...entries, ...frames.map((f) => f.png)]);
  await writeFile(rel("app/favicon.ico"), ico);
  console.log(
    `favicon  16/32/48     ${(ico.length / 1024).toFixed(0)} KB  -> app/favicon.ico`,
  );
}

/**
 * The official mark, keyed off its white background so it can sit on the dark
 * social card. This is the same asset app/layout.tsx declares as the
 * organisation logo (lib/schema.ts -> /icon.png), not a redrawn one.
 *
 * Method matches the "gradient" keyer in normalize-logos.mjs: the source is a
 * mark printed on white, so every pixel reads as `px = a*ink + (1-a)*white`.
 * The darkest channel gives the strongest estimate of `a`, and the ink colour
 * falls out by unmixing the white back off. A plain luminance threshold would
 * instead throw away the pale gilt rays entirely.
 */
async function buildMark() {
  const src = rel("public/assets/icarus-socials-pfp.png");
  if (!existsSync(src)) {
    console.warn("skip mark: no icarus-socials-pfp.png");
    return;
  }

  const { data, info } = await sharp(src)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  for (let i = 0; i < width * height * channels; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const alpha = 1 - Math.min(r, g, b) / 255;
    if (alpha < 0.06) {
      data[i + 3] = 0; // paper, not ink
      continue;
    }

    // Unmix the white so the colour is the mark's own, not a tint of it.
    data[i] = Math.max(0, Math.min(255, (r - 255 * (1 - alpha)) / alpha));
    data[i + 1] = Math.max(0, Math.min(255, (g - 255 * (1 - alpha)) / alpha));
    data[i + 2] = Math.max(0, Math.min(255, (b - 255 * (1 - alpha)) / alpha));
    data[i + 3] = Math.round(alpha * 255);
  }

  // The mark is a blue winged figure inside a ring of gilt sun rays. At the ~60px
  // it renders in the card the rays collapse into noise and shrink the figure to
  // an unreadable smudge, so the lockup crops to the figure and lets the rays go.
  // The figure is the only blue element, which makes it cheap to isolate.
  // Bounds come from where the blue *mass* is, not from its outermost pixel:
  // the artwork is a halftone, and a few stray blue specks out among the rays
  // would otherwise drag an absolute min/max back out to the full frame.
  const colMass = new Float64Array(width);
  const rowMass = new Float64Array(height);
  let total = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels;
      if (data[i + 3] < 40) continue;
      if (data[i + 2] <= data[i] + 25) continue; // not blue-dominant
      const w = data[i + 3] / 255;
      colMass[x] += w;
      rowMass[y] += w;
      total += w;
    }
  }

  /** Range covering the central `keep` fraction of the mass along one axis. */
  const span = (mass, keep) => {
    const edge = (total * (1 - keep)) / 2;
    let acc = 0;
    let lo = 0;
    let hi = mass.length - 1;
    for (let i = 0; i < mass.length; i++) {
      acc += mass[i];
      if (acc >= edge) {
        lo = i;
        break;
      }
    }
    acc = 0;
    for (let i = mass.length - 1; i >= 0; i--) {
      acc += mass[i];
      if (acc >= edge) {
        hi = i;
        break;
      }
    }
    return [lo, hi];
  };

  const [minX, maxX] = span(colMass, 0.98);
  const [minY, maxY] = span(rowMass, 0.98);

  // Square the crop off the figure's centre so it never renders stretched, with
  // a little air so the wingtips do not touch the edge.
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  const side = Math.min(
    Math.round(Math.max(maxX - minX, maxY - minY) * 1.1),
    Math.min(width, height),
  );
  const left = Math.max(0, Math.min(width - side, Math.round(cx - side / 2)));
  const top = Math.max(0, Math.min(height - side, Math.round(cy - side / 2)));

  await mkdir(rel("public/assets/og"), { recursive: true });
  const out = rel("public/assets/og/mark.png");

  // Rendered at ~60px in the card; 240 keeps it crisp and costs nothing since
  // it is inlined once per build.
  const result = await sharp(data, { raw: { width, height, channels } })
    .extract({ left, top, width: side, height: side })
    .resize(240, 240, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(out);

  console.log(
    `mark     ${result.width}x${result.height}      ${(result.size / 1024).toFixed(0)} KB  -> public/assets/og/mark.png`,
  );
}

async function buildFonts() {
  await mkdir(rel("app/fonts"), { recursive: true });

  const wanted = [
    { weight: 400, file: "app/fonts/Inter-Regular.ttf" },
    { weight: 600, file: "app/fonts/Inter-SemiBold.ttf" },
  ];

  if (wanted.every(({ file }) => existsSync(rel(file)))) {
    console.log("fonts    Inter already present, skipping fetch");
    return;
  }

  // Satori reads ttf/otf/woff but not woff2, and css2 negotiates the format off
  // the User-Agent. Modern UAs get woff2; MSIE gets EOT; an old Android is the
  // one that still hands back plain TrueType. Weights are requested one at a
  // time because the legacy responses collapse a multi-weight query to a
  // single @font-face.
  const UA =
    "Mozilla/5.0 (Linux; U; Android 4.0.3; en-us) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30";

  for (const { weight, file } of wanted) {
    if (existsSync(rel(file))) continue;

    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=Inter:wght@${weight}`,
      { headers: { "User-Agent": UA } },
    ).then((r) => {
      if (!r.ok) throw new Error(`google fonts responded ${r.status}`);
      return r.text();
    });

    // The legacy endpoint serves extensionless /l/font?kit= URLs, so the format
    // is confirmed from the magic number rather than the filename.
    const url = css.match(/url\((https:\/\/[^)]+)\)/)?.[1];
    if (!url) throw new Error(`no font url for Inter ${weight}`);

    const buf = Buffer.from(
      await fetch(url, { headers: { "User-Agent": UA } }).then((r) => r.arrayBuffer()),
    );
    const magic = buf.readUInt32BE(0);
    if (magic !== 0x00010000 && magic !== 0x74727565) {
      throw new Error(
        `Inter ${weight} came back as 0x${magic.toString(16)}, not TrueType — Satori would reject it`,
      );
    }

    await writeFile(rel(file), buf);
    console.log(
      `font     Inter ${weight}       ${(buf.length / 1024).toFixed(0)} KB  -> ${file}`,
    );
  }
}

async function report() {
  // The renderer inlines the canvas as base64; base64 costs 4 bytes per 3.
  const canvas = await readFile(rel("public/assets/og/canvas.jpg"));
  console.log(
    `\ninlined canvas adds ~${((canvas.length * 4) / 3 / 1024).toFixed(0)} KB to each generated card`,
  );
}

await buildCanvas();
await buildMark();
await buildIcons();
await buildFonts();
await report();
