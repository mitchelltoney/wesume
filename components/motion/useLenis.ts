'use client'

import { useEffect } from 'react'
import { initLenis, destroyLenis } from '@/lib/scroll'

export function useLenis() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    initLenis()
    return () => {
      destroyLenis()
    }
  }, [])
}
