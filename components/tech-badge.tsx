'use client'

interface TechBadgeProps {
  children: string
}

export function TechBadge({ children }: TechBadgeProps) {
  return (
    <code className="inline-block text-xs px-3 py-1 rounded bg-muted text-muted-foreground font-mono hover:text-accent transition-colors">
      {children}
    </code>
  )
}
