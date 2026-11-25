import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SOURCE_DIR = path.resolve('src/assets/Cloth Rack');
const OUTPUT_DIR = path.resolve('src/assets/Cloth Rack_trimmed');
const BOTTOM_PAD_PX = 6;
const SIDE_PAD_PX = 4;

async function getWebpFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await getWebpFiles(fullPath)));
    } else if (
      entry.isFile() &&
      entry.name.toLowerCase().endsWith('.webp') &&
      entry.name.toLowerCase() !== 'garment rack.webp'
    ) {
      files.push(fullPath);
    }
  }
  return files;
}

async function trimImage(filePath) {
  const relPath = path.relative(SOURCE_DIR, filePath);
  const outPath = path.join(OUTPUT_DIR, relPath);
  await fs.mkdir(path.dirname(outPath), { recursive: true });

  const { data, info } = await sharp(filePath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  let minX = info.width;
  let minY = info.height;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const idx = (y * info.width + x) * info.channels;
      const alpha = data[idx + 3];
      if (alpha > 10) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (maxX < minX || maxY < minY) {
    console.log(`Skipped (empty): ${relPath}`);
    return;
  }

  const cropLeft = Math.max(0, minX - SIDE_PAD_PX);
  const cropTop = minY;
  const cropRight = Math.min(info.width - 1, maxX + SIDE_PAD_PX);
  const cropBottom = Math.min(info.height - 1, maxY + BOTTOM_PAD_PX);

  const cropWidth = cropRight - cropLeft + 1;
  const cropHeight = cropBottom - cropTop + 1;

  await sharp(filePath)
    .extract({
      left: cropLeft,
      top: cropTop,
      width: cropWidth,
      height: cropHeight,
    })
    .webp({ quality: 92 })
    .toFile(outPath);

  console.log(
    `Trimmed ${relPath}: ${info.width}x${info.height} -> ${cropWidth}x${cropHeight}`
  );
}

const files = await getWebpFiles(SOURCE_DIR);
for (const file of files) {
  await trimImage(file);
}
console.log(`Done. Wrote ${files.length} trimmed files to ${OUTPUT_DIR}`);