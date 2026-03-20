'use client'

import Link from 'next/link'
import { heroContent, stats, projects, testimonials } from '@/lib/data'
import { StatCard } from '@/components/stat-card'
import { ProjectCard } from '@/components/project-card'
import { QuoteCard } from '@/components/quote-card'

export default function Home() {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3)

  return (
    <div className="px-6 py-12 max-w-3xl mx-auto lg:mx-0 lg:mr-auto animate-fade-in">
      {/* Hero Section */}
      <section className="mb-16">
        <h1 className="text-5xl font-bold text-foreground mb-4 text-balance">{heroContent.name}</h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed text-balance">{heroContent.title}</p>
        <p className="text-foreground mb-8 leading-relaxed whitespace-pre-line">{heroContent.bio}</p>
      </section>

      {/* Stats Section */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} label={stat.label} value={stat.value} />
          ))}
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-foreground mb-6">Featured Projects</h2>
        <div className="space-y-6">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} featured={true} />
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-6">What researchers say about FactorSphere</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, idx) => (
            <QuoteCard key={idx} quote={testimonial.quote} author={testimonial.author} />
          ))}
        </div>
      </section>
    </div>
  )
}
