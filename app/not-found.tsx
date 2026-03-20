'use client'

import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="px-6 py-12 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-foreground mb-4">Page not found</h1>
      <p className="text-foreground mb-6">The page you're looking for doesn't exist.</p>
      <Link href="/" className="text-accent hover:underline">
        ← Back to home
      </Link>
    </div>
  )
}
