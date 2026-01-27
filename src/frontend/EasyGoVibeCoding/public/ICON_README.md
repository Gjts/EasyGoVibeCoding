# 图标生成说明

## 当前状态

已创建新的 EasyGoVibeCoding SVG 图标 (`icon.svg`)，使用渐变背景（粉色→紫色→蓝色）和白色字母 "E"。

## 生成 PNG 图标的方法

### 方法 1: 使用在线工具（推荐）

1. 访问 https://cloudconvert.com/svg-to-png 或 https://convertio.co/svg-png/
2. 上传 `public/icon.svg` 文件
3. 设置尺寸：
   - `icon-light-32x32.png`: 32x32 像素
   - `icon-dark-32x32.png`: 32x32 像素（可以使用相同文件）
   - `apple-icon.png`: 180x180 像素
4. 下载并保存到 `public/` 目录

### 方法 2: 使用 Node.js 脚本

如果已安装 `sharp` 包：

```bash
cd src/frontend/EasyGoVibeCoding
npm install sharp --save-dev
node scripts/generate-icons.js
```

### 方法 3: 使用 ImageMagick

```bash
# 生成 32x32 图标
magick public/icon.svg -resize 32x32 public/icon-light-32x32.png
magick public/icon.svg -resize 32x32 public/icon-dark-32x32.png

# 生成 Apple 图标
magick public/icon.svg -resize 180x180 public/apple-icon.png
```

## 更新 layout.tsx

生成 PNG 文件后，需要更新 `app/layout.tsx` 中的图标配置：

```typescript
icons: {
  icon: [
    {
      url: '/icon-light-32x32.png',
      media: '(prefers-color-scheme: light)',
    },
    {
      url: '/icon-dark-32x32.png',
      media: '(prefers-color-scheme: dark)',
    },
    {
      url: '/icon.svg',
      type: 'image/svg+xml',
    },
  ],
  apple: '/apple-icon.png',
},
```

## 当前图标设计

- **背景**: 渐变（粉色 #EC4899 → 紫色 #A855F7 → 蓝色 #3B82F6）
- **文字**: 白色粗体字母 "E"
- **形状**: 圆角矩形（圆角半径 37px for 180x180）
- **风格**: 现代、简洁、与网站设计一致
