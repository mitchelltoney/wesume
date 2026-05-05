'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

interface Milestone {
  id: string
  year: string
  title: string
  org: string
  location: string
  bullets: string[]
  type: 'edu' | 'work' | 'future'
}

const milestones: Milestone[] = [
  {
    id: 'chapman',
    year: '2021',
    title: 'B.S. Software Engineering',
    org: 'Chapman University',
    location: 'Orange, CA',
    bullets: [
      'Systems programming — the part where you have to actually think about memory',
      'ML coursework: ensemble methods, evaluation pipelines, learning what accuracy alone does not tell you',
      'Bioinformatics research — graphs, proteins, AlphaFold',
    ],
    type: 'edu',
  },
  {
    id: 'nokia',
    year: '2024',
    title: 'Software Engineering Co-op',
    org: 'Nokia',
    location: 'Sunnyvale, CA',
    bullets: [
      'Embedded network tooling in C++',
      'Synchronization primitives for concurrent packet pipelines',
      'Diagnostic utilities for distributed fault correlation',
    ],
    type: 'work',
  },
  {
    id: 'ucsd',
    year: '2026',
    title: 'M.S. Computer Science',
    org: 'UC San Diego',
    location: 'La Jolla, CA',
    bullets: ['Admitted & accepted', 'Starting Fall 2026'],
    type: 'future',
  },
]

function MilestoneCard({ milestone, active }: { milestone: Milestone; active: boolean }) {
  const [expanded, setExpanded] = useState(false)

  const colorClass =
    milestone.type === 'future'
      ? 'border-accent/50 bg-accent/5'
      : milestone.type === 'work'
        ? 'border-white/20 bg-white/[0.03]'
        : 'border-white/10 bg-white/[0.02]'

  return (
    <div
      className={`rounded-lg border px-6 py-5 transition-all duration-500 ${colorClass} ${
        active ? 'opacity-100 translate-x-0' : 'opacity-30 translate-x-4'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="mb-1 font-mono text-xs text-accent">
            {milestone.year} · {milestone.location}
          </p>
          <h3 className="font-display text-xl font-bold text-foreground">{milestone.title}</h3>
          <p className="mt-0.5 font-sans text-sm text-muted">{milestone.org}</p>
        </div>
        {milestone.type === 'future' && (
          <span className="shrink-0 rounded-full border border-accent/30 px-2 py-0.5 font-mono text-[10px] text-accent">
            upcoming
          </span>
        )}
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-3 font-mono text-xs text-white/30 hover:text-white/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
        aria-expanded={expanded}
      >
        {expanded ? '— less' : '+ details'}
      </button>

      {expanded && (
        <ul className="mt-3 space-y-1.5 border-t border-white/10 pt-3">
          {milestone.bullets.map((b, i) => (
            <li key={i} className="flex gap-2 font-sans text-sm text-muted/80">
              <span
                className="mt-1 h-1 w-1 shrink-0 rounded-full bg-accent/60"
                aria-hidden="true"
              />
              {b}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function Trajectory() {
  const sectionRef = useRef<HTMLElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const [activeIdx, setActiveIdx] = useState(-1)
  const reducedMotionRef = useRef(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    reducedMotionRef.current = prefersReduced
    // Defer state update outside synchronous effect body
    queueMicrotask(() => setReducedMotion(prefersReduced))

    if (prefersReduced) {
      queueMicrotask(() => setActiveIdx(milestones.length - 1))
      if (pathRef.current) {
        pathRef.current.style.strokeDashoffset = '0'
      }
      return
    }

    const ctx = gsap.context(() => {
      if (!pathRef.current) return

      const totalLength = pathRef.current.getTotalLength()
      pathRef.current.style.strokeDasharray = String(totalLength)
      pathRef.current.style.strokeDashoffset = String(totalLength)

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 0.5,
        onUpdate: (self) => {
          if (!pathRef.current) return
          pathRef.current.style.strokeDashoffset = String(totalLength * (1 - self.progress))
          setActiveIdx(Math.floor(self.progress * milestones.length) - 1)
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="trajectory" ref={sectionRef} className="relative px-6 py-24 md:px-16 lg:px-24">
      {/* Dot grid motif — carried through */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle, oklch(0.4 0 0 / 0.3) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl">
        <p className="mb-2 font-mono text-xs text-accent">arc</p>
        <h2 className="mb-16 font-display text-[clamp(2.5rem,6vw,4rem)] font-bold text-foreground">
          The trajectory
        </h2>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_80px_1fr]">
          {/* Milestones left */}
          <div className="space-y-6 md:space-y-16">
            {milestones.slice(0, 2).map((m, i) => (
              <MilestoneCard key={m.id} milestone={m} active={reducedMotion || activeIdx >= i} />
            ))}
          </div>

          {/* SVG path down the middle */}
          <div className="hidden md:flex justify-center">
            <svg
              width="40"
              height="100%"
              viewBox="0 0 40 600"
              preserveAspectRatio="none"
              className="h-full"
              aria-hidden="true"
            >
              <path
                ref={pathRef}
                d="M 20 0 C 20 100, 20 200, 20 300 C 20 400, 20 500, 20 600"
                fill="none"
                stroke="oklch(0.84 0.22 142)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              {milestones.map((_, i) => (
                <circle
                  key={i}
                  cx="20"
                  cy={i === 0 ? 0 : i === 1 ? 300 : 600}
                  r="4"
                  fill={
                    reducedMotion || activeIdx >= i
                      ? 'oklch(0.84 0.22 142)'
                      : 'oklch(0.84 0.22 142 / 0.2)'
                  }
                  className="transition-all duration-500"
                />
              ))}
            </svg>
          </div>

          {/* Future milestone right */}
          <div className="md:pt-[calc(50%-3rem)]">
            <MilestoneCard milestone={milestones[2]} active={reducedMotion || activeIdx >= 2} />
          </div>
        </div>
      </div>
    </section>
  )
}
