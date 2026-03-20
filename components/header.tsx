'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Github, Menu, X } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { MobileNav } from '@/components/mobile-nav'
import { siteConfig } from '@/lib/data'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-16 border-b border-border bg-background/80 backdrop-blur-sm z-40">
        <div className="h-full px-6 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
            aria-label={siteConfig.name}
          >
            <img
              src="/standard.png"
              alt={siteConfig.name}
              className="h-7 sm:h-8 md:h-9 w-auto"
            />
            <span className="font-semibold text-foreground hidden sm:inline">{siteConfig.name}</span>
          </Link>

          <div className="flex items-center gap-4">
            {/* Desktop Links */}
            <a
              href={`https://github.com/${siteConfig.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex text-foreground hover:text-accent transition-colors"
              title="GitHub"
            >
              <Github size={20} />
            </a>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-foreground hover:text-accent transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      {mobileMenuOpen && <MobileNav onClose={() => setMobileMenuOpen(false)} />}
    </>
  )
}
