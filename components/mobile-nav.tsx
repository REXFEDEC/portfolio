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

  const isActive = (href: string) => pathname === href

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
                className={`block text-sm px-3 py-2 rounded transition-colors ${
                  isActive('/') ? 'bg-accent/10 text-accent font-medium' : 'text-foreground hover:bg-muted'
                }`}
              >
                Introduction
              </Link>
            </li>
          </ul>
        </div>

        {/* Projects */}
        <div>
          <button
            onClick={() => setIsProjectsOpen(!isProjectsOpen)}
            className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-muted-foreground mb-4 hover:text-foreground transition-colors w-full"
          >
            Projects
            <ChevronDown
              size={14}
              className={`ml-auto transition-transform ${isProjectsOpen ? 'rotate-0' : '-rotate-90'}`}
            />
          </button>
          {isProjectsOpen && (
            <ul className="space-y-2 animate-expand">
              {projects.map((project) => (
                <li key={project.id}>
                  <Link
                    href={`/projects/${project.slug}`}
                    onClick={handleLinkClick}
                    className={`block text-sm px-3 py-2 rounded transition-colors flex items-center gap-2 ${
                      isActive(`/projects/${project.slug}`)
                        ? 'bg-accent/10 text-accent font-medium'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    {project.badge === 'Latest' && <span className="w-2 h-2 rounded-full bg-accent" />}
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
                className={`block text-sm px-3 py-2 rounded transition-colors ${
                  isActive('/experience') ? 'bg-accent/10 text-accent font-medium' : 'text-foreground hover:bg-muted'
                }`}
              >
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
                className={`block text-sm px-3 py-2 rounded transition-colors ${
                  isActive('/contact') ? 'bg-accent/10 text-accent font-medium' : 'text-foreground hover:bg-muted'
                }`}
              >
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
