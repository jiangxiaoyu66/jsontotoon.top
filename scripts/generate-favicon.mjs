import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const svgPath = path.join(root, 'public', 'icon.svg');
const outPath = path.join(root, 'public', 'favicon', 'favicon.ico');

const sizes = [16, 32, 48, 256];
const svgBuffer = fs.readFileSync(svgPath);

const pngBuffers = await Promise.all(
  sizes.map((size) =>
    sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toBuffer()
  )
);

const icoBuffer = await pngToIco(pngBuffers);
fs.writeFileSync(outPath, icoBuffer);
fs.writeFileSync(path.join(root, 'public', 'favicon.ico'), icoBuffer);
console.log('Generated:', outPath, 'and public/favicon.ico');
