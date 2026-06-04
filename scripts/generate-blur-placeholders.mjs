/**
 * Generates per-image blur placeholders for next/image.
 * Uses sharp (bundled with Next.js) to produce a 10×10 blurred JPEG
 * for each image, base64-encoded as a data URL.
 *
 * Run: node scripts/generate-blur-placeholders.mjs
 * Output: data/blur-placeholders.ts
 */

import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const PUBLIC = path.join(ROOT, "public");
const OUTPUT = path.join(ROOT, "data", "blur-placeholders.ts");

const images = [
  // ── Hero posters ────────────────────────────────────────
  "/projects/cancuncito/images/poster-hero-cancuncito.jpg",
  "/projects/red-moon-apostles/images/poster-hero-red-moon-apostles.jpg",
  "/projects/snow-king/images/poster-hero-snow-king.jpg",
  "/projects/booming-dunes/images/poster-hero-booming-dunes.jpg",
  "/projects/breathing-chamber/images/poster-hero-breathing-chamber.jpg",
  "/projects/mad-denizen/images/poster-hero-mad-denizen.jpg",

  // ── Card posters ─────────────────────────────────────────
  "/projects/cancuncito/images/poster-card-cancuncito.jpg",
  "/projects/red-moon-apostles/images/poster-card-red-moon-apostles.jpg",
  "/projects/snow-king/images/poster-card-snow-king.jpg",
  "/projects/booming-dunes/images/poster-card-booming-dunes.jpg",
  "/projects/breathing-chamber/images/poster-card-breathing-chamber.jpg",
  "/projects/mad-denizen/images/poster-card-mad-denizen.jpg",

  // ── Gallery — Cancuncito ──────────────────────────────────
  "/projects/cancuncito/images/cancuncito-teo.jpg",
  "/projects/cancuncito/images/cancuncito-aces.jpg",
  "/projects/cancuncito/images/cancuncito-confession.jpg",
  "/projects/cancuncito/images/cancuncito-beach.jpg",
  "/projects/cancuncito/images/cancuncito-reyna.jpg",
  "/projects/cancuncito/images/cancuncito-roulette.jpg",

  // ── Gallery — Red Moon Apostles ───────────────────────────
  "/projects/red-moon-apostles/images/red-moon-apostles-name.jpg",
  "/projects/red-moon-apostles/images/red-moon-apostles-phones.jpg",
  "/projects/red-moon-apostles/images/red-moon-apostles-static.jpg",
  "/projects/red-moon-apostles/images/red-moon-apostles-eye.jpg",
  "/projects/red-moon-apostles/images/red-moon-apostles-sun.jpg",
  "/projects/red-moon-apostles/images/red-moon-apostles-posters.jpg",

  // ── Gallery — Snow King ───────────────────────────────────
  "/projects/snow-king/images/snow-king-clock.jpg",
  "/projects/snow-king/images/snow-king-boy.jpg",
  "/projects/snow-king/images/snow-king-creature.jpg",
  "/projects/snow-king/images/snow-king-dude.jpg",
  "/projects/snow-king/images/snow-king-train.jpg",
  "/projects/snow-king/images/snow-king-wolf.jpg",

  // ── Gallery — Booming Dunes ───────────────────────────────
  "/projects/booming-dunes/images/booming-dunes-nagra.jpg",
  "/projects/booming-dunes/images/booming-dunes-teac.jpg",
  "/projects/booming-dunes/images/booming-dunes-piano.jpg",
  "/projects/booming-dunes/images/booming-dunes-tascam.jpg",

  // ── Gallery — Breathing Chamber ───────────────────────────
  "/projects/breathing-chamber/images/breathing-chamber-hallway.jpg",
  "/projects/breathing-chamber/images/breathing-chamber-boy.jpg",
  "/projects/breathing-chamber/images/breathing-chamber-dad.jpg",
  "/projects/breathing-chamber/images/breathing-chamber-mom.jpg",
  "/projects/breathing-chamber/images/breathing-chamber-girl.jpg",
  "/projects/breathing-chamber/images/breathing-chamber-beach.jpg",

  // ── Gallery — Mad Denizen ─────────────────────────────────
  "/projects/mad-denizen/images/mad-denizen-statue.jpg",
  "/projects/mad-denizen/images/mad-denizen-388.jpg",
  "/projects/mad-denizen/images/mad-denizen-guitar.jpg",
  "/projects/mad-denizen/images/mad-denizen-roof.jpg",
  "/projects/mad-denizen/images/mad-denizen-tiny-telephone.jpg",
  "/projects/mad-denizen/images/mad-denizen-music.jpg",
];

async function toBlurDataURL(srcPath) {
  const buf = await sharp(path.join(PUBLIC, srcPath))
    .resize(10, 10, { fit: "cover" })
    .jpeg({ quality: 50 })
    .toBuffer();
  return `data:image/jpeg;base64,${buf.toString("base64")}`;
}

async function main() {
  console.log(`Generating ${images.length} blur placeholders…\n`);
  const entries = [];

  for (const src of images) {
    try {
      const dataUrl = await toBlurDataURL(src);
      entries.push(`  "${src}": "${dataUrl}"`);
      console.log(`✓  ${src}`);
    } catch (err) {
      console.error(`✗  ${src}: ${err.message}`);
    }
  }

  const output = [
    "// Auto-generated — do not edit by hand.",
    "// Regenerate: node scripts/generate-blur-placeholders.mjs",
    "export const blurMap: Record<string, string> = {",
    entries.join(",\n"),
    "};",
    "",
  ].join("\n");

  fs.writeFileSync(OUTPUT, output, "utf8");
  console.log(`\nWrote ${entries.length} entries → data/blur-placeholders.ts`);
}

main();
