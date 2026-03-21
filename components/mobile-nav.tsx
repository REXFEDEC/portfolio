'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { ChevronDown, Github } from 'lucide-react'
import { projects, siteConfig } from '@/lib/data'

interface MobileNavProps {
  onClose: () => void
}

export function MobileNav({ onClose }: MobileNavProps) {
  const pathname = usePathname()
  const [isProjectsOpen, setIsProjectsOpen] = useState(false)

  const isActive = (href: string) => {
    const normalizedPath = pathname.replace(/\/$/, '') || '/'
    const normalizedHref = href.replace(/\/$/, '') || '/'
    return normalizedPath === normalizedHref
  }

  const handleLinkClick = () => {
    onClose()
  }

  return (
    <nav className="fixed top-16 left-0 right-0 bottom-0 bg-background border-b border-border overflow-y-auto lg:hidden z-30 animate-slide-in-left">
      <div className="p-6 space-y-6">
        {/* Getting Started */}
        <div>
          <div className="text-xs uppercase tracking-widest font-semibold text-muted-foreground mb-4">Getting Started</div>
          <ul className="space-y-2">
            <li>
              <Link
                href="/"
                onClick={handleLinkClick}
                className={`flex items-center gap-2 text-sm px-3 py-2 rounded transition-colors ${
                  isActive('/') ? 'bg-accent/10 text-accent font-medium' : 'text-foreground hover:bg-muted'
                }`}
                aria-current={isActive('/') ? 'page' : undefined}
              >
                {/* Light mode icon */}
                <img src="/svg/intro-light.svg" alt="" className="w-4 h-4 icon-light" />
                {/* Dark mode icon */}
                <img src="/svg/intro-dark.svg" alt="" className="w-4 h-4 icon-dark" />
                Introduction
              </Link>
            </li>
          </ul>
        </div>

        {/* Projects */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <Link
              href="/projects"
              onClick={handleLinkClick}
              className={`text-xs uppercase tracking-widest font-semibold transition-colors ${
                isActive('/projects') ? 'text-accent' : 'text-muted-foreground hover:text-foreground'
              }`}
              aria-current={isActive('/projects') ? 'page' : undefined}
            >
              Projects
            </Link>
            <button
              onClick={() => setIsProjectsOpen(!isProjectsOpen)}
              className="flex items-center text-muted-foreground hover:text-foreground transition-colors p-1"
              aria-expanded={isProjectsOpen}
              aria-controls="mobile-projects-nav"
              aria-label={isProjectsOpen ? 'Collapse projects' : 'Expand projects'}
            >
              <ChevronDown
                size={14}
                className={`transition-transform ${isProjectsOpen ? 'rotate-0' : '-rotate-90'}`}
              />
            </button>
          </div>
          {isProjectsOpen && (
            <ul id="mobile-projects-nav" className="space-y-2 animate-expand">
              {projects.map((project) => (
                <li key={project.id}>
                  <Link
                    href={`/projects/${project.slug}`}
                    onClick={handleLinkClick}
                    className={`flex items-center gap-2 text-sm px-3 py-2 rounded transition-colors ${
                      isActive(`/projects/${project.slug}`)
                        ? 'bg-accent/10 text-accent font-medium'
                        : 'text-foreground hover:bg-muted'
                    }`}
                    aria-current={isActive(`/projects/${project.slug}`) ? 'page' : undefined}
                  >
                    {/* Light mode icon */}
                    <img src={`/svg/${project.slug === 'factorsphere' ? 'fs' : project.slug === 'aipdf' ? 'pdf' : project.slug === 'scanweb' ? 'scan' : project.slug === 'securenotes' ? 'sn' : project.slug === 'dreambit' ? 'dbt' : project.slug === 'labi-old' ? 'labi' : project.slug}-light.svg`} alt="" className="w-3.5 h-3.5 icon-light" />
                    {/* Dark mode icon */}
                    <img src={`/svg/${project.slug === 'factorsphere' ? 'fs' : project.slug === 'aipdf' ? 'pdf' : project.slug === 'scanweb' ? 'scan' : project.slug === 'securenotes' ? 'sn' : project.slug === 'dreambit' ? 'dbt' : project.slug === 'labi-old' ? 'labi' : project.slug}-dark.svg`} alt="" className="w-3.5 h-3.5 icon-dark" />
                    {project.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Experience */}
        <div>
          <div className="text-xs uppercase tracking-widest font-semibold text-muted-foreground mb-4">Experience</div>
          <ul className="space-y-2">
            <li>
              <Link
                href="/experience"
                onClick={handleLinkClick}
                className={`flex items-center gap-2 text-sm px-3 py-2 rounded transition-colors ${
                  isActive('/experience') ? 'bg-accent/10 text-accent font-medium' : 'text-foreground hover:bg-muted'
                }`}
                aria-current={isActive('/experience') ? 'page' : undefined}
              >
                {/* Light mode icon */}
                <img src="/svg/we-light.svg" alt="" className="w-4 h-4 icon-light" />
                {/* Dark mode icon */}
                <img src="/svg/we-dark.svg" alt="" className="w-4 h-4 icon-dark" />
                Work & Education
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <div className="text-xs uppercase tracking-widest font-semibold text-muted-foreground mb-4">Contact</div>
          <ul className="space-y-2">
            <li>
              <Link
                href="/contact"
                onClick={handleLinkClick}
                className={`flex items-center gap-2 text-sm px-3 py-2 rounded transition-colors ${
                  isActive('/contact') ? 'bg-accent/10 text-accent font-medium' : 'text-foreground hover:bg-muted'
                }`}
                aria-current={isActive('/contact') ? 'page' : undefined}
              >
                {/* Light mode icon */}
                <img src="/svg/gt-light.svg" alt="" className="w-4 h-4 icon-light" />
                {/* Dark mode icon */}
                <img src="/svg/gt-dark.svg" alt="" className="w-4 h-4 icon-dark" />
                Get in Touch
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="pt-6 border-t border-border">
          <a
            href={`https://github.com/${siteConfig.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-foreground hover:text-accent transition-colors"
          >
            <Github size={18} />
            GitHub
          </a>
        </div>
      </div>
    </nav>
  )
}
