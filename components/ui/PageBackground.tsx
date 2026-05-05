'use client'

import { useEffect, useRef } from 'react'

// Each orb: position as fraction of total page height, parallax speed, drift params
const ORBS = [
  { xFrac: 0.15, yFrac: 0.05, r: 460, speed: 0.00011, phase: 0.0, parallax: 0.25, a: 0.13 },
  { xFrac: 0.82, yFrac: 0.15, r: 380, speed: 0.00009, phase: 2.1, parallax: 0.45, a: 0.1 },
  { xFrac: 0.55, yFrac: 0.28, r: 500, speed: 0.00013, phase: 1.0, parallax: 0.35, a: 0.11 },
  { xFrac: 0.08, yFrac: 0.45, r: 420, speed: 0.0001, phase: 3.5, parallax: 0.55, a: 0.09 },
  { xFrac: 0.92, yFrac: 0.52, r: 350, speed: 0.00012, phase: 0.8, parallax: 0.3, a: 0.1 },
  { xFrac: 0.38, yFrac: 0.65, r: 480, speed: 0.00008, phase: 4.2, parallax: 0.42, a: 0.11 },
  { xFrac: 0.72, yFrac: 0.78, r: 390, speed: 0.00014, phase: 2.8, parallax: 0.5, a: 0.09 },
  { xFrac: 0.22, yFrac: 0.92, r: 430, speed: 0.00011, phase: 1.7, parallax: 0.38, a: 0.1 },
]

export function PageBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = 0,
      H = 0,
      scrollY = 0,
      totalH = 1

    const resize = () => {
      W = window.innerWidth
      H = window.innerHeight
      totalH = document.documentElement.scrollHeight
      canvas.width = W
      canvas.height = H
    }
    const onScroll = () => {
      scrollY = window.scrollY
    }

    resize()
    window.addEventListener('resize', resize, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })

    const drawOrbs = (t: number) => {
      ctx.clearRect(0, 0, W, H)
      for (const o of ORBS) {
        const drift = t * o.speed
        const cx = o.xFrac * W + Math.cos(o.phase + drift * 0.6) * 90
        const pageY = o.yFrac * totalH
        const cy = pageY - scrollY * o.parallax + Math.sin(o.phase + drift) * 60
        if (cy + o.r < 0 || cy - o.r > H) continue

        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, o.r)
        g.addColorStop(0, `rgba(96,165,250,${o.a})`)
        g.addColorStop(0.45, `rgba(59,130,246,${o.a * 0.45})`)
        g.addColorStop(1, `rgba(29,78,216,0)`)
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(cx, cy, o.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    if (prefersReduced) {
      drawOrbs(0)
      return () => {
        window.removeEventListener('resize', resize)
        window.removeEventListener('scroll', onScroll)
      }
    }

    let raf: number
    let t = 0
    const tick = () => {
      t++
      drawOrbs(t)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0" aria-hidden="true" />
  )
}
