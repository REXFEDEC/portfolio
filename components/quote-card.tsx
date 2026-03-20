'use client'

interface QuoteCardProps {
  quote: string
  author: string
}

export function QuoteCard({ quote, author }: QuoteCardProps) {
  return (
    <div className="border border-border rounded-lg p-6 bg-card">
      <p className="text-foreground mb-4 leading-relaxed">"{quote}"</p>
      <p className="text-sm font-medium text-muted-foreground">— {author}</p>
    </div>
  )
}
