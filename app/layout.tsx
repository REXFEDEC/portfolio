import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Header } from '@/components/header'
import { Sidebar } from '@/components/sidebar'
import { Footer } from '@/components/footer'
import { ScrollToTop } from '@/components/scroll-to-top'
import { siteConfig, siteUrl } from '@/lib/data'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${siteConfig.name} - ${siteConfig.title}`,
  description: `Portfolio of ${siteConfig.name}, a software engineer passionate about building high-quality applications.`,
  applicationName: siteConfig.name,
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png', sizes: '48x48', type: 'image/png' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#7085FF' },
    ],
  },
  openGraph: {
    type: 'website',
    url: '/',
    title: `${siteConfig.name} - ${siteConfig.title}`,
    description: `Portfolio of ${siteConfig.name}`,
    images: [
      {
        url: '/meta.png',
        alt: `${siteConfig.name} preview`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} - ${siteConfig.title}`,
    description: `Portfolio of ${siteConfig.name}`,
    images: ['/meta.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased dark min-h-screen flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Header />
          <Sidebar />
          <main id="main-content" className="pt-16 lg:pl-56 flex-1">
            {children}
          </main>
          <Footer />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  )
}
