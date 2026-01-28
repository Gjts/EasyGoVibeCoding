/**
 * 复制 functions 目录到 out/functions
 * 用于 Cloudflare Pages Functions 部署
 */

const fs = require('fs');
const path = require('path');

function copyDir(src, dest) {
  if (!fs.existsSync(src)) {
    console.log(`⚠️  源目录不存在: ${src}`);
    return;
  }

  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

const functionsDir = path.join(__dirname, '../functions');
const outFunctionsDir = path.join(__dirname, '../out/functions');

if (fs.existsSync(functionsDir)) {
  copyDir(functionsDir, outFunctionsDir);
  console.log('✅ Functions 目录已复制到 out/functions');
} else {
  console.log('⚠️  functions 目录不存在，跳过复制');
}
