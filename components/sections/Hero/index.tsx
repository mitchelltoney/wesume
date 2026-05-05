'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { siteData } from '@/lib/data'
// Direct import — HeroCanvas is SSR-safe (renders stable placeholder until mounted)
import { HeroCanvas } from './HeroCanvas'

gsap.registerPlugin(ScrollTrigger)

const [firstName, lastName] = siteData.name.split(' ')

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)
  // Shared scroll progress ref passed into the 3D canvas via stable ref (no re-renders)
  const scrollProgressRef = useRef(0)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      scrollProgressRef.current = max > 0 ? window.scrollY / max : 0
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    if (prefersReduced) return () => window.removeEventListener('scroll', onScroll)

    const ctx = gsap.context(() => {
      const letters = nameRef.current?.querySelectorAll('.hero-letter')
      if (letters) {
        gsap.fromTo(
          letters,
          { y: '110%', opacity: 0 },
          { y: '0%', opacity: 1, duration: 1.1, stagger: 0.04, ease: 'expo.out', delay: 0.1 }
        )
      }

      gsap.fromTo(
        taglineRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.8, ease: 'power3.out' }
      )

      gsap.fromTo(
        scrollHintRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, delay: 1.4, ease: 'power2.out' }
      )

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress
          gsap.set(nameRef.current, { scale: 1 - p * 0.15, opacity: 1 - p * 0.8 })
          gsap.set(taglineRef.current, { opacity: 1 - p * 2 })
        },
      })
    }, sectionRef)

    return () => {
      ctx.revert()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden"
    >
      {/* 3D background — lazy loaded, code-split */}
      <HeroCanvas scrollRef={scrollProgressRef} />

      {/* Dot grid over canvas */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, oklch(0.4 0 0 / 0.3) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Vignette so text stays readable over canvas */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, oklch(0.08 0 0 / 0.6) 0%, transparent 100%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">
        <div ref={nameRef} aria-label={siteData.name}>
          <div className="flex flex-wrap justify-center leading-none">
            <div className="flex overflow-hidden">
              {firstName.split('').map((char, i) => (
                <span
                  key={i}
                  className="hero-letter inline-block font-display text-[clamp(3.5rem,12vw,11rem)] font-black tracking-[-0.03em] text-foreground"
                >
                  {char}
                </span>
              ))}
            </div>
            <span className="hero-letter inline-block w-[0.25em]" aria-hidden="true" />
            <div className="flex overflow-hidden">
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

        <p
          ref={taglineRef}
          className="max-w-md font-mono text-sm text-muted opacity-0 md:text-base"
        >
          {siteData.tagline}
        </p>
      </div>

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
