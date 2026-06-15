/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // Cloudflare Pages static export
  output: "export",
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
  // Domain configuration
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://projects.smann.cc' : '',
}

export default nextConfig
