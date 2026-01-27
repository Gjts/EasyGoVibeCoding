// 生成图标的脚本
// 需要安装 sharp: npm install sharp
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svgIcon = `
<svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="180" height="180" rx="37" fill="url(#gradient)"/>
  <defs>
    <linearGradient id="gradient" x1="0" y1="0" x2="180" y2="180" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#EC4899"/>
      <stop offset="50%" stop-color="#A855F7"/>
      <stop offset="100%" stop-color="#3B82F6"/>
    </linearGradient>
  </defs>
  <text x="90" y="120" font-family="Arial, sans-serif" font-size="100" font-weight="bold" fill="white" text-anchor="middle">E</text>
</svg>
`;

const publicDir = path.join(__dirname, '../public');

// 生成 32x32 PNG (light)
sharp(Buffer.from(svgIcon))
  .resize(32, 32)
  .png()
  .toFile(path.join(publicDir, 'icon-light-32x32.png'))
  .then(() => console.log('Generated icon-light-32x32.png'))
  .catch(err => console.error('Error generating icon-light-32x32.png:', err));

// 生成 32x32 PNG (dark - same for now)
sharp(Buffer.from(svgIcon))
  .resize(32, 32)
  .png()
  .toFile(path.join(publicDir, 'icon-dark-32x32.png'))
  .then(() => console.log('Generated icon-dark-32x32.png'))
  .catch(err => console.error('Error generating icon-dark-32x32.png:', err));

// 生成 180x180 PNG (Apple icon)
sharp(Buffer.from(svgIcon))
  .resize(180, 180)
  .png()
  .toFile(path.join(publicDir, 'apple-icon.png'))
  .then(() => console.log('Generated apple-icon.png'))
  .catch(err => console.error('Error generating apple-icon.png', err));
