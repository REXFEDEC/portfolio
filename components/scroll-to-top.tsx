'use client'

import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed right-[104px] bottom-8 z-[10001] w-12 h-12 rounded-full bg-[#7085FF] shadow-[0_4px_16px_rgba(112,133,255,0.4)] flex items-center justify-center transition-transform transition-shadow duration-150 hover:scale-[1.08] hover:shadow-[0_6px_24px_rgba(112,133,255,0.55)] animate-slide-up"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </>
  )
}
