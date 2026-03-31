'use client'

import Link from 'next/link'
import { heroContent, stats, projects, testimonials } from '@/lib/data'
import { StatCard } from '@/components/stat-card'
import { ProjectCard } from '@/components/project-card'
import { QuoteCard } from '@/components/quote-card'

export default function Home() {
  // Only show Sieve and FactorSphere as featured (exclude aipdf)
  const featuredProjects = projects.filter((p) => p.featured && p.slug !== 'aipdf').slice(0, 2)

  return (
    <div className="px-6 py-12 max-w-5xl mx-auto animate-fade-in">
      {/* Hero Section */}
      <section className="mb-16">
        <div className="flex flex-col lg:flex-row lg:gap-12">
          {/* Hero Text */}
          <div className="lg:flex-1">
            <h1 className="text-5xl font-bold text-foreground mb-4 text-balance">{heroContent.name}</h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed text-balance">{heroContent.title}</p>
            <p className="text-foreground mb-8 leading-relaxed whitespace-pre-line">{heroContent.bio}</p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-colors"
              >
                View all projects
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground rounded-lg font-medium hover:bg-card transition-colors"
              >
                Get in touch
              </Link>
            </div>
          </div>

          {/* Stats Grid - 2x2 on all screens */}
          <div className="mt-8 lg:mt-0 grid grid-cols-2 gap-4 lg:w-80">
            {stats.map((stat) => (
              <StatCard key={stat.label} label={stat.label} value={stat.value} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects & Testimonials Section */}
      <section className="mb-16">
        <div className="flex flex-col lg:flex-row lg:gap-8">
          {/* Projects - Left */}
          <div className="flex-1 flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-foreground">Featured Projects</h2>
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} featured={true} />
            ))}
          </div>

          {/* Testimonials - Right (2x2 grid with blurred text) */}
          <div className="mt-8 lg:mt-0 lg:w-96 flex flex-col gap-4">
            <h2 className="text-2xl font-semibold text-foreground">Testimonials</h2>
            <div className="grid grid-cols-2 gap-4">
              {testimonials.map((testimonial, idx) => (
                <div key={idx} className="relative h-32">
                  <div className="h-full p-4 border border-border rounded-lg bg-card overflow-hidden relative">
                    <p className="text-sm text-muted-foreground line-clamp-4">
                      {testimonial.quote}
                    </p>
                    {/* Gradient blur overlay at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-card to-transparent" />
                  </div>
                </div>
              ))}
            </div>
            
            {/* Link to full testimonials */}
            <Link
              href="/projects/factorsphere#testimonials"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-colors text-sm"
            >
              Read all testimonials
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
