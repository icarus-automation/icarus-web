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
 * The official logo lockup for the social cards.
 *
 * public/assets/brand-logo-white.png is already white on transparent, so unlike
 * the favicon source there is nothing to key — it only needs trimming to its
 * own ink and rasterising at 2x the size it renders at.
 *
 * Deliberately scoped to the cards. The favicon and the schema.org logo still
 * come from the portrait mark via buildIcons(), because a wide wordmark does
 * not survive being squeezed into a 16px square.
 */
async function buildLogo() {
  const src = rel("public/assets/brand-logo-white.png");
  if (!existsSync(src)) {
    console.warn("skip logo: no brand-logo-white.png");
    return;
  }

  await mkdir(rel("public/assets/og"), { recursive: true });
  const out = rel("public/assets/og/logo.png");

  const info = await sharp(src)
    .trim({ threshold: 1 })
    // Renders ~62px tall in the card; 140 keeps the letterforms crisp.
    .resize({ height: 140 })
    .png({ compressionLevel: 9 })
    .toFile(out);

  // lib/og.tsx needs the trimmed aspect ratio to size the lockup without
  // distorting it, so it is printed here rather than guessed there.
  console.log(
    `logo     ${info.width}x${info.height}     ${(info.size / 1024).toFixed(0)} KB  -> public/assets/og/logo.png  (ratio ${(info.width / info.height).toFixed(3)})`,
  );
}

async function buildFonts() {
  await mkdir(rel("app/fonts"), { recursive: true });

  // `query` is the css2 family spec. Marcellus has no weight axis, so asking it
  // for one returns nothing.
  const wanted = [
    { label: "Inter 400", query: "Inter:wght@400", file: "app/fonts/Inter-Regular.ttf" },
    { label: "Inter 600", query: "Inter:wght@600", file: "app/fonts/Inter-SemiBold.ttf" },
    { label: "Marcellus", query: "Marcellus", file: "app/fonts/Marcellus-Regular.ttf" },
  ];

  if (wanted.every(({ file }) => existsSync(rel(file)))) {
    console.log("fonts    all present, skipping fetch");
    return;
  }

  // Satori reads ttf/otf/woff but not woff2, and css2 negotiates the format off
  // the User-Agent. Modern UAs get woff2; MSIE gets EOT; an old Android is the
  // one that still hands back plain TrueType. Weights are requested one at a
  // time because the legacy responses collapse a multi-weight query to a
  // single @font-face.
  const UA =
    "Mozilla/5.0 (Linux; U; Android 4.0.3; en-us) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30";

  for (const { label, query, file } of wanted) {
    if (existsSync(rel(file))) continue;

    const css = await fetch(`https://fonts.googleapis.com/css2?family=${query}`, {
      headers: { "User-Agent": UA },
    }).then((r) => {
      if (!r.ok) throw new Error(`google fonts responded ${r.status} for ${label}`);
      return r.text();
    });

    // The legacy endpoint serves extensionless /l/font?kit= URLs, so the format
    // is confirmed from the magic number rather than the filename.
    const url = css.match(/url\((https:\/\/[^)]+)\)/)?.[1];
    if (!url) throw new Error(`no font url for ${label}`);

    const buf = Buffer.from(
      await fetch(url, { headers: { "User-Agent": UA } }).then((r) => r.arrayBuffer()),
    );
    const magic = buf.readUInt32BE(0);
    if (magic !== 0x00010000 && magic !== 0x74727565) {
      throw new Error(
        `${label} came back as 0x${magic.toString(16)}, not TrueType — Satori would reject it`,
      );
    }

    await writeFile(rel(file), buf);
    console.log(
      `font     ${label.padEnd(10)}   ${(buf.length / 1024).toFixed(0)} KB  -> ${file}`,
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
await buildLogo();
await buildIcons();
await buildFonts();
await report();
