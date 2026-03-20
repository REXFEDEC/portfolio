import Link from 'next/link'
import { notFound } from 'next/navigation'
import { projects } from '@/lib/data'
import { MetadataBlock } from '@/components/metadata-block'
import { QuoteCard } from '@/components/quote-card'
import { TechBadge } from '@/components/tech-badge'
import { Callout } from '@/components/callout'
import { Breadcrumb } from '@/components/breadcrumb'

interface ProjectPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)

  if (!project || !project.content) {
    notFound()
  }

  const { content } = project

  return (
    <div className="px-6 py-12 max-w-3xl mx-auto lg:mx-0 lg:mr-auto animate-fade-in">
      <Breadcrumb />
      
      {/* Header */}
      <section className="mb-12">
        <Link
          href="/projects"
          className="text-sm text-accent hover:underline mb-4 inline-block"
        >
          ← Back to projects
        </Link>
        <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">{project.title}</h1>
        <p className="text-lg text-muted-foreground">{content.subheading}</p>
      </section>

      {/* Metadata */}
      {content.metadata && (
        <section className="mb-12">
          <MetadataBlock metadata={content.metadata} />
        </section>
      )}

      {/* Overview */}
      <section className="mb-12">
        <p className="text-foreground leading-relaxed whitespace-pre-line">{content.overview}</p>
      </section>

      {/* Features Section */}
      {content.features && content.features.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Features</h2>
          <ul className="space-y-3">
            {content.features.map((feature, idx) => (
              <li key={idx} className="flex gap-3 text-foreground">
                <span className="text-accent mt-1">•</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Providers Section */}
      {content.providers && content.providers.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Supported Providers</h2>
          <div className="flex flex-wrap gap-2">
            {content.providers.map((provider, idx) => (
              <TechBadge key={idx}>{provider}</TechBadge>
            ))}
          </div>
        </section>
      )}

      {/* Tech Stack */}
      {project.stack && project.stack.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <TechBadge key={tech}>{tech}</TechBadge>
            ))}
          </div>
        </section>
      )}

      {/* Callout/Why It Matters */}
      {content.whyItMatters && (
        <section className="mb-12">
          <Callout>{content.whyItMatters}</Callout>
        </section>
      )}

      {/* Additional Sections */}
      {content.sections && content.sections.length > 0 && (
        <section className="mb-12">
          {content.sections.map((section, idx) => (
            <div key={idx} className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">{section.title}</h2>
              <p className="text-foreground leading-relaxed whitespace-pre-line">{section.content}</p>
            </div>
          ))}
        </section>
      )}

      {/* Testimonials for FactorSphere */}
      {project.slug === 'factorsphere' && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Import testimonials from data */}
            {[
              {
                quote:
                  'In the rapidly evolving landscape of scientific research, identifying the most suitable journal for publication can be a challenging task for a PhD student. This website serves as a valuable resource by bringing together comprehensive information about a wide range of journals, including direct links and their respective impact factors — everything on one platform. An added advantage is the AI-assisted journal recommender, which provides tailored recommendations based on the abstract, making the process even more efficient and user-friendly.',
                author: 'Atharva Mahajan',
              },
              {
                quote:
                  'Factorsphere is an extremely simple portal to utilise in searching for your academic needs. The layout is extremely nice and lucid to use — the interface is contemporary to any research journal page. The catalogue creation is structured and minimalistic, which is what any academic individual wishes for. It can truly democratize rankings by trying to preserve the integrity of academic studies.',
                author: 'Abhishek Rajwade',
              },
              {
                quote:
                  'FactorSphere is an amazing tool with an easy user interface, that helps one quickly access the impact factor of journals in multiple fields and decide which journals one could consider to publish their work in.',
                author: 'Mincy Kunjumon',
              },
              {
                quote:
                  'Using this website has helped to narrow down the journals I would like to publish my paper in. Thank you so much! It has been of a great help!',
                author: 'Sristi Pradhan',
              },
            ].map((testimonial, idx) => (
              <QuoteCard key={idx} quote={testimonial.quote} author={testimonial.author} />
            ))}
          </div>
        </section>
      )}

      {/* Footer Navigation */}
      <section className="pt-8 border-t border-border">
        <Link
          href="/projects"
          className="text-sm text-accent hover:underline"
        >
          ← Back to projects
        </Link>
      </section>
    </div>
  )
}
