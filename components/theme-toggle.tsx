'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleThemeToggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    
    // Ensure scrollbar colors transition smoothly
    document.documentElement.classList.toggle('light')
  }

  if (!mounted) {
    return <div className="w-10 h-10" />
  }

  return (
    <button
      onClick={handleThemeToggle}
      className="inline-flex items-center justify-center w-10 h-10 rounded-md text-foreground hover:text-accent hover:bg-muted transition-colors"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      aria-pressed={theme === 'dark'}
    >
      {theme === 'dark' ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
    </button>
  )
}
