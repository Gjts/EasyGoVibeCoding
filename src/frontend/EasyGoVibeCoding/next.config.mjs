/** @type {import('next').NextConfig} */
const nextConfig = {
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
