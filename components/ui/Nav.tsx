'use client'

import { useEffect, useState } from 'react'
import { ThemeToggle } from './ThemeToggle'
import { siteData } from '@/lib/data'

const sections = [
  { id: 'trajectory', label: 'Journey' },
  { id: 'stack', label: 'Stack' },
  { id: 'work', label: 'Work' },
  { id: 'contact', label: 'Contact' },
]

export function Nav() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-500 ${
        visible
          ? 'translate-y-0 opacity-100 backdrop-blur-md bg-black/60 border-b border-white/[0.06]'
          : '-translate-y-full opacity-0'
      }`}
      aria-label="Site navigation"
    >
      <a
        href="#hero"
        className="font-mono text-sm text-white/60 transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
      >
        {siteData.name.split(' ')[1].toLowerCase()}
      </a>

      <div className="flex items-center gap-6">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="hidden font-mono text-xs text-white/40 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded sm:block"
          >
            {s.label}
          </a>
        ))}
        <ThemeToggle />
      </div>
    </nav>
  )
}
