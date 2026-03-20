'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'
import { projects } from '@/lib/data'

export function Breadcrumb() {
  const pathname = usePathname()

  // Generate breadcrumb items based on pathname
  const getBreadcrumbs = () => {
    const segments = pathname.split('/').filter(Boolean)
    const breadcrumbs = [{ label: 'Home', href: '/' }]

    if (segments.length === 0) {
      return []
    }

    let currentPath = ''
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`

      if (segment === 'projects') {
        breadcrumbs.push({ label: 'Projects', href: '/projects' })
      } else if (segment === 'experience') {
        breadcrumbs.push({ label: 'Experience', href: '/experience' })
      } else if (segment === 'contact') {
        breadcrumbs.push({ label: 'Contact', href: '/contact' })
      } else {
        // Check if it's a project slug
        const project = projects.find(p => p.slug === segment)
        if (project) {
          breadcrumbs.push({ label: project.title, href: currentPath })
        }
      }
    })

    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs()

  if (breadcrumbs.length === 0) {
    return null
  }

  return (
    <nav className="flex items-center gap-2 flex-wrap mb-8 pb-4 border-b border-border/40 text-xs text-muted-foreground animate-slide-in-left">
      <Link href="/" className="hover:text-foreground transition-colors inline-flex items-center gap-1">
        <Home size={14} />
      </Link>

      {breadcrumbs.map((breadcrumb, index) => (
        <div key={breadcrumb.href} className="flex items-center gap-2">
          <ChevronRight size={12} className="text-muted-foreground/50" />
          {index === breadcrumbs.length - 1 ? (
            <span className="text-foreground">{breadcrumb.label}</span>
          ) : (
            <Link
              href={breadcrumb.href}
              className="hover:text-foreground transition-colors"
            >
              {breadcrumb.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
}
