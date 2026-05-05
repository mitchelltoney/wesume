'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATES = [
  {
    label: 'Orange County, CA',
    sublabel: 'Where it started',
    description:
      'Grew up in OC. Studied software engineering at Chapman. Learned C++, learned how memory works, and learned that most software abstracts away the interesting parts.',
    visual: 'oc',
  },
  {
    label: 'Sunnyvale, CA',
    sublabel: 'Nokia Co-op',
    description:
      'Spent a season in the Bay writing embedded network tooling. Packet pipelines, mutex discipline, the occasional race condition that only manifests under production load at 2am. Good times.',
    visual: 'nokia',
  },
  {
    label: 'La Jolla, CA',
    sublabel: 'UC San Diego — Fall 2026',
    description:
      'M.S. Computer Science. The plan: go deeper. The backup plan: still go deeper, just with a better view of the ocean.',
    visual: 'ucsd',
  },
]

// Stable grid pattern — pre-computed to avoid impure function calls during render
const NOKIA_GRID = Array.from({ length: 16 }, (_, i) =>
  [0, 2, 3, 5, 7, 8, 10, 11, 13, 14].includes(i) ? 0.7 : 0.1
)

function VisualState({ state }: { state: string }) {
  if (state === 'oc') {
    return (
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="font-mono text-xs text-muted/60">33.7°N 117.8°W</div>
        <div className="relative h-32 w-32">
          <div className="absolute inset-0 rounded-full border border-accent/20" />
          <div className="absolute inset-4 rounded-full border border-accent/30" />
          <div className="absolute inset-8 rounded-full border border-accent/50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_oklch(0.84_0.22_142)]" />
          </div>
        </div>
        <div className="font-display text-xl font-bold text-foreground">Orange County</div>
      </div>
    )
  }
  if (state === 'nokia') {
    return (
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="font-mono text-xs text-muted/60">37.4°N 122.0°W</div>
        <div className="grid grid-cols-4 gap-1">
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              className="h-3 w-3 rounded-sm"
              style={{ backgroundColor: `oklch(0.84 0.22 142 / ${NOKIA_GRID[i]})` }}
            />
          ))}
        </div>
        <div className="font-mono text-sm text-accent">Nokia · Sunnyvale</div>
        <div className="font-mono text-xs text-muted/40">embedded · networked · concurrent</div>
      </div>
    )
  }
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="font-mono text-xs text-muted/60">32.9°N 117.2°W</div>
      <div className="relative h-24 w-24">
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <polyline
            points="50,10 90,90 10,90"
            fill="none"
            stroke="oklch(0.84 0.22 142)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <circle cx="50" cy="10" r="3" fill="oklch(0.84 0.22 142)" />
          <circle cx="90" cy="90" r="3" fill="oklch(0.84 0.22 142 / 0.4)" />
          <circle cx="10" cy="90" r="3" fill="oklch(0.84 0.22 142 / 0.4)" />
        </svg>
      </div>
      <div className="font-display text-xl font-bold text-foreground">UC San Diego</div>
      <div className="font-mono text-xs text-accent">M.S. CS · Fall 2026</div>
    </div>
  )
}

export function Premise() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeState, setActiveState] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // No GSAP pin — CSS sticky handles that. We just track scroll progress.
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          // Map progress 0→1 across 3 states, but clamp so the last state
          // doesn't immediately snap away when the section starts to leave.
          const raw = self.progress * STATES.length
          const idx = Math.min(STATES.length - 1, Math.floor(raw))
          setActiveState(idx)
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="premise"
      ref={sectionRef}
      // 300vh gives us 3 "pages" of scroll distance for 3 states
      style={{ height: '300vh' }}
      className="relative"
    >
      {/* Sticky viewport — pinned with CSS, no GSAP conflict */}
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden md:flex-row">
        {/* Text side */}
        <div className="relative flex flex-1 flex-col justify-center px-8 py-16 md:px-16 lg:px-24">
          {/* All states stacked via absolute positioning so none affect layout */}
          <div className="relative h-64">
            {STATES.map((state, i) => (
              <div
                key={i}
                aria-hidden={activeState !== i}
                className="absolute inset-0 flex flex-col justify-center transition-all duration-600"
                style={{
                  opacity: activeState === i ? 1 : 0,
                  transform: `translateY(${activeState === i ? 0 : activeState > i ? -24 : 24}px)`,
                  pointerEvents: activeState === i ? 'auto' : 'none',
                }}
              >
                <p className="mb-2 font-mono text-xs text-accent">{state.sublabel}</p>
                <h2 className="mb-4 font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight text-foreground">
                  {state.label}
                </h2>
                <p className="max-w-prose font-sans text-base leading-relaxed text-muted md:text-lg">
                  {state.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Visual side */}
        <div className="flex flex-1 items-center justify-center border-l border-white/[0.06] bg-black/20 px-8">
          <div className="relative h-48 w-full max-w-xs">
            {STATES.map((state, i) => (
              <div
                key={i}
                aria-hidden={activeState !== i}
                className="absolute inset-0 flex items-center justify-center transition-all duration-600"
                style={{
                  opacity: activeState === i ? 1 : 0,
                  transform: `scale(${activeState === i ? 1 : 0.92})`,
                  pointerEvents: activeState === i ? 'auto' : 'none',
                }}
              >
                <VisualState state={state.visual} />
              </div>
            ))}
          </div>
        </div>

        {/* Progress dots */}
        <div
          className="absolute right-6 top-1/2 flex -translate-y-1/2 flex-col gap-2"
          aria-hidden="true"
        >
          {STATES.map((_, i) => (
            <div
              key={i}
              className="h-1 w-1 rounded-full transition-all duration-300"
              style={{
                backgroundColor: i === activeState ? 'oklch(0.84 0.22 142)' : 'oklch(1 0 0 / 0.2)',
                transform: i === activeState ? 'scale(1.6)' : 'scale(1)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
