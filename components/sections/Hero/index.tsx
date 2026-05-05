'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { siteData } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

const [firstName, lastName] = siteData.name.split(' ')

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)
  const grainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      // Initial reveal: stagger name letters
      const letters = nameRef.current?.querySelectorAll('.hero-letter')
      if (letters) {
        gsap.fromTo(
          letters,
          { y: '110%', opacity: 0 },
          {
            y: '0%',
            opacity: 1,
            duration: 1.1,
            stagger: 0.04,
            ease: 'expo.out',
            delay: 0.1,
          }
        )
      }

      // Tagline fades in after name
      gsap.fromTo(
        taglineRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.8, ease: 'power3.out' }
      )

      // Scroll hint fades in last
      gsap.fromTo(
        scrollHintRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, delay: 1.4, ease: 'power2.out' }
      )

      // Scroll-driven: hero compresses as user scrolls
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress
          gsap.set(nameRef.current, {
            scale: 1 - p * 0.15,
            opacity: 1 - p * 0.8,
          })
          gsap.set(taglineRef.current, {
            opacity: 1 - p * 2,
          })
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden"
    >
      {/* Dot grid motif */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, oklch(0.4 0 0 / 0.35) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Grain overlay */}
      <div
        ref={grainRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">
        {/* Name */}
        <div ref={nameRef} aria-label={siteData.name} className="overflow-hidden">
          <div className="flex flex-wrap justify-center leading-none">
            {/* First name */}
            <div className="flex">
              {firstName.split('').map((char, i) => (
                <span
                  key={i}
                  className="hero-letter inline-block font-display text-[clamp(3.5rem,12vw,11rem)] font-black tracking-[-0.03em] text-foreground"
                >
                  {char}
                </span>
              ))}
            </div>
            {/* Thin space between names on large screens */}
            <span className="hero-letter w-[0.25em] inline-block" aria-hidden="true" />
            {/* Last name — rendered in accent on last letter for a touch of character */}
            <div className="flex">
              {lastName.split('').map((char, i) => (
                <span
                  key={i}
                  className={`hero-letter inline-block font-display text-[clamp(3.5rem,12vw,11rem)] font-black tracking-[-0.03em] ${
                    i === lastName.length - 1 ? 'text-accent' : 'text-foreground'
                  }`}
                >
                  {char}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="max-w-md font-mono text-sm text-muted opacity-0 md:text-base"
        >
          {siteData.tagline}
        </p>
      </div>

      {/* Scroll hint */}
      <div
        ref={scrollHintRef}
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-xs text-muted/50">scroll</span>
          <div className="h-8 w-px bg-gradient-to-b from-muted/30 to-transparent" />
        </div>
      </div>
    </section>
  )
}
