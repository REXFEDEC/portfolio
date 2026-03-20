'use client'

import Link from 'next/link'
import { contactLinks, siteConfig } from '@/lib/data'
import { Callout } from '@/components/callout'
import { Breadcrumb } from '@/components/breadcrumb'

export default function ContactPage() {
  return (
    <div className="px-6 py-12 max-w-5xl mx-auto animate-fade-in">
      <Breadcrumb />
      
      {/* Header */}
      <h1 className="text-4xl font-bold text-foreground mb-4">Contact</h1>

      {/* Body */}
      <section className="mb-12">
        <p className="text-foreground leading-relaxed">
          I'm currently open to full-time roles, remote/WFH positions, freelance projects, and interesting things to
          collaborate on. If you're building something and think I'd be useful, reach out.
        </p>
      </section>

      {/* Contact Links */}
      <section className="mb-12">
        <ul className="space-y-3">
          {contactLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.label !== 'Email' ? '_blank' : undefined}
                rel={link.label !== 'Email' ? 'noopener noreferrer' : undefined}
                className="text-accent hover:underline"
              >
                <span className="font-medium">{link.label}:</span> {link.value}
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Support Callout */}
      <section>
        <Callout>
          If you want to support any of the open source projects, you can{' '}
          <a
            href={`https://buymeacoffee.com/sameermann`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline font-medium"
          >
            buy me a coffee
          </a>
          .
        </Callout>
      </section>
    </div>
  )
}
