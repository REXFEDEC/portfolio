'use client'

import { projects, buildTimes } from '@/lib/data'
import { ProjectCard } from '@/components/project-card'
import { Callout } from '@/components/callout'
import { Breadcrumb } from '@/components/breadcrumb'

export default function ProjectsPage() {
  const featured = projects.filter((p) => p.featured)
  const others = projects.filter((p) => !p.featured)

  return (
    <div className="px-6 py-12 max-w-3xl mx-auto lg:mx-0 lg:mr-auto animate-fade-in">
      <Breadcrumb />
      
      {/* Header */}
      <section className="mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">Projects</h1>
        <p className="text-foreground leading-relaxed">
          A collection of things I've built — solo, from scratch, and shipped to production. Build times are real.
        </p>
      </section>

      {/* Featured Projects */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-foreground mb-6">Featured</h2>
        <div className="space-y-4">
          {featured.map((project) => (
            <ProjectCard key={project.id} project={project} featured={true} />
          ))}
        </div>
      </section>

      {/* Callout */}
      <section className="mb-16">
        <Callout>
          ScanWeb and SecureNotes were both built on the same day — two production-grade full-stack applications
          with authentication, databases, and AI-powered features, shipped in a single sitting.
        </Callout>
      </section>

      {/* Other Projects */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-foreground mb-6">Other Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {others.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* Build Times Table */}
      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-6">How long things take</h2>
        <div className="overflow-x-auto border border-border rounded-lg">
          <table className="w-full text-sm">
            <thead className="bg-card border-b border-border">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-foreground">Project</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">What it is</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Built in</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {buildTimes.map((item, idx) => (
                <tr key={idx} className="hover:bg-card/50 transition-colors">
                  <td className="px-4 py-3 text-foreground font-mono">{item.project}</td>
                  <td className="px-4 py-3 text-muted-foreground">{item.description}</td>
                  <td className="px-4 py-3 text-muted-foreground">{item.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
