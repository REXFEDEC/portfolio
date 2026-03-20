'use client'

import { ReactNode } from 'react'

interface CalloutProps {
  children: ReactNode
  type?: 'info' | 'note' | 'warning'
}

export function Callout({ children, type = 'info' }: CalloutProps) {
  const borderColor = type === 'warning' ? 'border-l-red-500' : 'border-l-accent'
  const bgColor = type === 'warning' ? 'bg-red-500/5' : 'bg-accent/5'

  return (
    <div className={`border-l-4 ${borderColor} ${bgColor} p-4 rounded-r-lg my-6`}>
      <div className="text-sm text-foreground/90">{children}</div>
    </div>
  )
}
