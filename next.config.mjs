/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // Cloudflare Pages Functions support
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  logging: {
    browserToTerminal: true,
  },
  // Cloudflare Pages optimizations
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  reactStrictMode: true,
}

export default nextConfig
