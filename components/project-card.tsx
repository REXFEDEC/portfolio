'use client'

import Link from 'next/link'
import { Project } from '@/lib/data'
import { Badge } from '@/components/ui/badge'

interface ProjectCardProps {
  project: Project
  featured?: boolean
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`} className="block">
      <div
        className={`group border border-border rounded-lg p-6 hover:border-accent/50 transition-all ${
          featured ? 'bg-card' : 'bg-background hover:bg-card'
        }`}
      >
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
            {project.title}
          </h3>
          {project.badge && (
            <Badge variant="secondary" className="whitespace-nowrap">
              {project.badge}
            </Badge>
          )}
        </div>

        <p className="text-sm text-muted-foreground mb-4">{project.description}</p>

        {featured && <p className="text-sm text-foreground mb-4">{project.tagline}</p>}

        <div className="flex flex-wrap gap-2 mb-4">
          {project.stack.map((tech) => (
            <code
              key={tech}
              className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground font-mono"
            >
              {tech}
            </code>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Built in {project.builtIn}</span>
          <span className="text-accent group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
    </Link>
  )
}
