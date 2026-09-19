const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const WIDTH = 1920;
const HEIGHT = 1200;

// Exact filters tuned for vein-cut 米黄
const svgBase = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <filter id="marble-crema-a" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
    <feTurbulence type="fractalNoise" baseFrequency="0.0006 0.0011" numOctaves="2" seed="5" result="n0"/>
    <feComponentTransfer in="n0" result="b0">
      <feFuncA type="linear" slope="0.22" intercept="0"/>
    </feComponentTransfer>
    <feGaussianBlur in="b0" stdDeviation="6" result="s0"/>
    <feFlood flood-color="#c6c0b1" flood-opacity="1" result="f0"/>
    <feComposite in="f0" in2="s0" operator="in" result="cloud"/>
    <feTurbulence type="fractalNoise" baseFrequency="0.0038 0.0007" numOctaves="3" seed="21" result="n1"/>
    <feComponentTransfer in="n1" result="b1">
      <feFuncA type="table" tableValues="0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0"/>
    </feComponentTransfer>
    <feGaussianBlur in="b1" stdDeviation="0.6" result="s1"/>
    <feFlood flood-color="#8a8375" flood-opacity="0.2" result="f1"/>
    <feComposite in="f1" in2="s1" operator="in" result="vein"/>
    <feMerge>
      <feMergeNode in="SourceGraphic"/>
      <feMergeNode in="cloud"/>
      <feMergeNode in="vein"/>
    </feMerge>
  </filter>
  <rect width="100%" height="100%" fill="#d9d4ca" filter="url(#marble-crema-a)"/>
</svg>`;

const svgVeil = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <filter id="marble-crema-b" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
    <feTurbulence type="fractalNoise" baseFrequency="0.009 0.0018" numOctaves="4" seed="9" result="n1"/>
    <feComponentTransfer in="n1" result="b1">
      <feFuncA type="table" tableValues="0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0"/>
    </feComponentTransfer>
    <feGaussianBlur in="b1" stdDeviation="0.4" result="s1"/>
    <feFlood flood-color="#9c9384" flood-opacity="0.13" result="f1"/>
    <feComposite in="f1" in2="s1" operator="in" result="vein"/>
  </filter>
  <rect width="100%" height="100%" fill="#000" filter="url(#marble-crema-b)"/>
</svg>`;

function makeSeamless(raw, width, height, channels, blendX = 140, blendY = 140) {
  const halfX = Math.floor(width / 2);
  const halfY = Math.floor(height / 2);
  const rolled = Buffer.alloc(raw.length);
  
  // Step 1: Wrap halves so original edges meet in the center
  for (let y = 0; y < height; y++) {
    const srcY = (y + halfY) % height;
    for (let x = 0; x < width; x++) {
      const srcX = (x + halfX) % width;
      const dstIdx = (y * width + x) * channels;
      const srcIdx = (srcY * width + srcX) * channels;
      for (let c = 0; c < channels; c++) {
        rolled[dstIdx + c] = raw[srcIdx + c];
      }
    }
  }

  // Step 2: Smoothly blend vertical seam at halfX
  const startX = halfX - Math.floor(blendX / 2);
  const endX = halfX + Math.floor(blendX / 2);
  const spanX = endX - startX;

  for (let y = 0; y < height; y++) {
    for (let x = startX; x < endX; x++) {
      const t = 0.5 * (1 - Math.cos(Math.PI * (x - startX) / spanX));
      const mirrorX = 2 * halfX - x;
      const idx = (y * width + x) * channels;
      const mIdx = (y * width + mirrorX) * channels;
      for (let c = 0; c < channels; c++) {
        rolled[idx + c] = Math.round((1 - t) * rolled[idx + c] + t * rolled[mIdx + c]);
      }
    }
  }

  // Step 3: Smoothly blend horizontal seam at halfY
  const startY = halfY - Math.floor(blendY / 2);
  const endY = halfY + Math.floor(blendY / 2);
  const spanY = endY - startY;

  for (let x = 0; x < width; x++) {
    for (let y = startY; y < endY; y++) {
      const t = 0.5 * (1 - Math.cos(Math.PI * (y - startY) / spanY));
      const mirrorY = 2 * halfY - y;
      const idx = (y * width + x) * channels;
      const mIdx = (mirrorY * width + x) * channels;
      for (let c = 0; c < channels; c++) {
        rolled[idx + c] = Math.round((1 - t) * rolled[idx + c] + t * rolled[mIdx + c]);
      }
    }
  }

  return rolled;
}

async function buildTiles() {
  const publicDir = path.join(__dirname, '..', 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  console.log('Rasterizing base SVG...');
  const baseRaw = await sharp(Buffer.from(svgBase))
    .raw()
    .toBuffer({ resolveWithObject: true });

  console.log('Making base seamless...');
  const baseSeamless = makeSeamless(baseRaw.data, WIDTH, HEIGHT, baseRaw.info.channels);

  console.log('Saving marble-base.webp...');
  await sharp(baseSeamless, {
    raw: { width: WIDTH, height: HEIGHT, channels: baseRaw.info.channels }
  })
    .webp({ quality: 82, effort: 6 })
    .toFile(path.join(publicDir, 'marble-base.webp'));

  console.log('Rasterizing veil SVG...');
  const veilRaw = await sharp(Buffer.from(svgVeil))
    .raw()
    .toBuffer({ resolveWithObject: true });

  console.log('Making veil seamless...');
  const veilSeamless = makeSeamless(veilRaw.data, WIDTH, HEIGHT, veilRaw.info.channels);

  console.log('Saving marble-veil.webp...');
  await sharp(veilSeamless, {
    raw: { width: WIDTH, height: HEIGHT, channels: veilRaw.info.channels }
  })
    .webp({ quality: 82, effort: 6 })
    .toFile(path.join(publicDir, 'marble-veil.webp'));

  console.log('Compositing combined marble...');
  const baseBuf = await sharp(baseSeamless, {
    raw: { width: WIDTH, height: HEIGHT, channels: baseRaw.info.channels }
  }).png().toBuffer();

  const veilBuf = await sharp(veilSeamless, {
    raw: { width: WIDTH, height: HEIGHT, channels: veilRaw.info.channels }
  }).png().toBuffer();

  const combinedWebp = await sharp(baseBuf)
    .composite([{ input: veilBuf }])
    .webp({ quality: 80, effort: 6 })
    .toBuffer();

  fs.writeFileSync(path.join(publicDir, 'marble.webp'), combinedWebp);
  console.log(`Saved marble.webp: ${(combinedWebp.length / 1024).toFixed(1)} KB`);

  const combinedPng = await sharp(baseBuf)
    .composite([{ input: veilBuf }])
    .png({ compressionLevel: 9 })
    .toBuffer();

  fs.writeFileSync(path.join(publicDir, 'marble.png'), combinedPng);
  console.log(`Saved marble.png: ${(combinedPng.length / 1024).toFixed(1)} KB`);

  console.log('All 4 tile assets successfully generated in public/ !');
}

buildTiles().catch(err => {
  console.error(err);
  process.exit(1);
});
