'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { ChevronDown, Home, Folder, Briefcase, Mail } from 'lucide-react'
import { projects } from '@/lib/data'
import { Button } from '@/components/ui/button'

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
              >
                <Home size={16} />
                Introduction
              </Link>
            </li>
          </ul>
        </div>

        {/* Projects Section */}
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
                    className={`flex items-center gap-2 text-sm px-3 py-2 rounded transition-colors ${
                      isActive(`/projects/${project.slug}`)
                        ? 'bg-accent/10 text-accent font-medium'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <Folder size={14} />
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
              >
                <Briefcase size={16} />
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
              >
                <Mail size={16} />
                Get in Touch
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  )
}
