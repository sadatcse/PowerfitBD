/* eslint-disable @typescript-eslint/no-require-imports, no-console */
/**
 * One-off production image pass: shrinks raw camera/photo assets under
 * public/ to sane web dimensions and re-encodes them, in place, using
 * atomic (temp-file + rename) writes so a mid-run failure can't corrupt
 * a source file. Run with: node scripts/optimize-images.js
 */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

sharp.cache(false);

/** [directory, maxLongestEdgePx, jpegQuality] — png inputs are still
 *  re-encoded as jpeg at this quality since none of these are photos
 *  that need an alpha channel. */
const JPEG_RULES = [
  ["public/images/full-gallery", 2000, 80],
  ["public/images/team", 1400, 82],
  ["public/images/headers", 2200, 82],
  ["public/images/services", 2200, 82],
  ["public/images/branches", 2200, 82],
  ["public/images/about", 2200, 82],
  ["public/images/home", 2200, 82],
  ["public/images/leadership", 1600, 82],
];

/** PNGs that must keep transparency — recompressed, not converted, not resized. */
const PNG_RULES = [["public/inbody", 84]];

function listFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isFile())
    .map((e) => path.join(dir, e.name));
}

async function processJpeg(file, maxDim, quality, totals) {
  const before = fs.statSync(file).size;
  const tmp = `${file}.tmp`;

  const buffer = await sharp(file)
    .rotate() // bake in EXIF orientation before we strip metadata
    .resize({ width: maxDim, height: maxDim, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality, mozjpeg: true })
    .toBuffer();

  fs.writeFileSync(tmp, buffer);
  fs.renameSync(tmp, file);

  const after = fs.statSync(file).size;
  totals.before += before;
  totals.after += after;
  console.log(`${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB  ${file}`);
}

async function processPng(file, quality, totals) {
  const before = fs.statSync(file).size;
  const tmp = `${file}.tmp`;

  const buffer = await sharp(file)
    .rotate()
    .png({ quality, compressionLevel: 9, palette: true })
    .toBuffer();

  fs.writeFileSync(tmp, buffer);
  fs.renameSync(tmp, file);

  const after = fs.statSync(file).size;
  totals.before += before;
  totals.after += after;
  console.log(`${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB  ${file}`);
}

async function main() {
  const totals = { before: 0, after: 0 };

  for (const [dir, maxDim, quality] of JPEG_RULES) {
    for (const file of listFiles(dir)) {
      if (![".jpg", ".jpeg", ".png"].includes(path.extname(file).toLowerCase())) continue;
      await processJpeg(file, maxDim, quality, totals);
    }
  }

  for (const [dir, quality] of PNG_RULES) {
    for (const file of listFiles(dir)) {
      if (path.extname(file).toLowerCase() !== ".png") continue;
      await processPng(file, quality, totals);
    }
  }

  console.log(
    `\nTotal: ${(totals.before / 1024 / 1024).toFixed(1)}MB -> ${(totals.after / 1024 / 1024).toFixed(1)}MB`,
  );
}

main();
