'use client'

interface StatCardProps {
  label: string
  value: string
}

export function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="border border-border rounded-lg p-4 bg-background">
      <div className="text-2xl font-semibold text-accent mb-2">{value}</div>
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
    </div>
  )
}
