'use client'

import { experience } from '@/lib/data'
import { TechBadge } from '@/components/tech-badge'
import { Callout } from '@/components/callout'
import { Breadcrumb } from '@/components/breadcrumb'

export default function ExperiencePage() {
  return (
    <div className="px-6 py-12 max-w-3xl mx-auto lg:mx-0 lg:mr-auto animate-fade-in">
      <Breadcrumb />
      
      {/* Header */}
      <h1 className="text-4xl font-bold text-foreground mb-12">Experience</h1>

      {/* Work Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-foreground mb-8">Work</h2>
        {experience.work.map((job, idx) => (
          <div key={idx} className="mb-8">
            <h3 className="text-xl font-semibold text-foreground mb-2">{job.title}</h3>
            <p className="text-accent mb-1">{job.company}</p>
            <p className="text-sm text-muted-foreground mb-4">{job.duration}</p>
            <p className="text-foreground leading-relaxed mb-4">{job.description}</p>

            {job.responsibilities && job.responsibilities.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-medium text-foreground mb-2">Responsibilities:</p>
                <ul className="space-y-2">
                  {job.responsibilities.map((responsibility, i) => (
                    <li key={i} className="flex gap-2 text-sm text-foreground">
                      <span className="text-accent">•</span>
                      {responsibility}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {job.stack && job.stack.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {job.stack.map((tech) => (
                  <TechBadge key={tech}>{tech}</TechBadge>
                ))}
              </div>
            )}

            {job.note && (
              <Callout>
                {job.note}
              </Callout>
            )}
          </div>
        ))}
      </section>

      {/* Education Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-foreground mb-8">Education</h2>
        {experience.education.map((edu, idx) => (
          <div key={idx} className="mb-6">
            <h3 className="text-xl font-semibold text-foreground mb-2">{edu.degree}</h3>
            <p className="text-accent mb-1">{edu.school}</p>
            <p className="text-sm text-muted-foreground">{edu.status}</p>
          </div>
        ))}
      </section>

      {/* Certifications Section */}
      {experience.certifications && experience.certifications.length > 0 ? (
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-8">Certifications</h2>
          <div className="space-y-4">
            {experience.certifications.map((cert, idx) => (
              <div key={idx} className="border border-border rounded-lg p-4 bg-card">
                <h3 className="font-medium text-foreground">{cert.name}</h3>
                <p className="text-sm text-muted-foreground">{cert.issuer}</p>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-8">Certifications</h2>
          <p className="text-muted-foreground">Coming soon</p>
        </section>
      )}
    </div>
  )
}
