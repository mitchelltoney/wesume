'use client'

import { useScrollProgress } from '@/components/motion/useScrollProgress'

export function ScrollProgress() {
  const progress = useScrollProgress()
  const pct = Math.round(progress * 100)

  return (
    <div
      className="fixed bottom-6 right-6 z-50 hidden select-none font-mono text-xs tabular-nums text-white/30 md:block"
      aria-hidden="true"
    >
      <span style={{ color: `color-mix(in oklch, var(--color-accent) ${pct}%, transparent)` }}>
        {String(pct).padStart(3, '0')}
      </span>
      <span className="text-white/20">%</span>
    </div>
  )
}
