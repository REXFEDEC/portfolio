/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // Cloudflare Pages "Static HTML Export" requires a static-export build that
  // writes plain HTML files into `out/` (not only `.next/server`).
  output: "export",
  // Ensure exported routes use "pretty URLs" (`/foo/`), which avoids hosts
  // returning 404 when they don't automatically map `/foo` -> `/foo.html`.
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
