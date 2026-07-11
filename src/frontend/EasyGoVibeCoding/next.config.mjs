const academyBasePaths = {
  "zh-CN": "",
  ja: "/ja/academy",
  en: "/en/academy",
  fr: "/fr/academy",
  de: "/de/academy",
}

const buildLocale = process.env.NEXT_PUBLIC_SITE_LOCALE ?? "zh-CN"
if (!(buildLocale in academyBasePaths)) {
  throw new Error(`Unsupported site locale: ${buildLocale}`)
}
const expectedBasePath = academyBasePaths[buildLocale]
const buildBasePath = process.env.NEXT_PUBLIC_SITE_BASE_PATH ?? expectedBasePath
if (buildBasePath !== expectedBasePath) {
  throw new Error(`Invalid site base path for ${buildLocale}: ${buildBasePath}`)
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: buildBasePath,
  // 静态导出模式
  output: 'export',
  
  typescript: {
    ignoreBuildErrors: true,
  },
  
  images: {
    unoptimized: true,
  },
  
  // 禁用尾部斜杠以兼容 Cloudflare Pages
  trailingSlash: false,
}

export default nextConfig
