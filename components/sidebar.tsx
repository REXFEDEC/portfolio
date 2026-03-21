'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { projects } from '@/lib/data'

export function Sidebar() {
  const pathname = usePathname()
  const [isProjectsOpen, setIsProjectsOpen] = useState(true)

  const isActive = (href: string) => {
    const normalizedPath = pathname.replace(/\/$/, '') || '/'
    const normalizedHref = href.replace(/\/$/, '') || '/'
    return normalizedPath === normalizedHref
  }

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-56 border-r border-border bg-background p-6 overflow-y-auto hidden lg:block">
      <nav className="space-y-8">
        {/* Getting Started Section */}
        <div>
          <div className="text-xs uppercase tracking-widest font-semibold text-muted-foreground mb-4">
            Getting Started
          </div>
          <ul className="space-y-2">
            <li>
              <Link
                href="/"
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

        {/* Projects Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <Link
              href="/projects"
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
              aria-controls="projects-nav"
              aria-label={isProjectsOpen ? 'Collapse projects' : 'Expand projects'}
            >
              <ChevronDown
                width={14}
                height={14}
                className={`transition-transform ${isProjectsOpen ? 'rotate-0' : '-rotate-90'}`}
              />
            </button>
          </div>
          {isProjectsOpen && (
            <ul id="projects-nav" className="space-y-2 animate-expand">
              {projects.map((project) => (
                <li key={project.id}>
                  <Link
                    href={`/projects/${project.slug}`}
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

        {/* Experience Section */}
        <div>
          <div className="text-xs uppercase tracking-widest font-semibold text-muted-foreground mb-4">Experience</div>
          <ul className="space-y-2">
            <li>
              <Link
                href="/experience"
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

        {/* Contact Section */}
        <div>
          <div className="text-xs uppercase tracking-widest font-semibold text-muted-foreground mb-4">Contact</div>
          <ul className="space-y-2">
            <li>
              <Link
                href="/contact"
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
      </nav>
    </aside>
  )
}
