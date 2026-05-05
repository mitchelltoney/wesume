'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { siteData } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

const links = [
  {
    label: 'Email',
    href: `mailto:${siteData.email}?subject=Hello%20from%20your%20portfolio`,
    external: false,
  },
  {
    label: 'GitHub',
    href: siteData.github,
    external: true,
  },
  {
    label: 'LinkedIn',
    href: siteData.linkedin,
    external: true,
  },
  {
    label: 'Résumé',
    href: siteData.resumePdf,
    download: true,
    external: false,
  },
]

export function Coda() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      const letters = headingRef.current?.querySelectorAll('.coda-letter')
      if (letters) {
        gsap.fromTo(
          letters,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.06,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 80%',
            },
          }
        )
      }

      gsap.fromTo(
        linksRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: linksRef.current,
            start: 'top 85%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const heading = 'Make something worth making.'

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative flex min-h-[80vh] flex-col items-start justify-center overflow-hidden px-6 py-24 md:px-16 lg:px-24"
    >
      {/* Gradient that fades the grid toward center — motif resolution */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 30% 50%, oklch(0.08 0 0) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-4xl">
        <p className="mb-6 font-mono text-xs text-accent">coda</p>

        <h2
          ref={headingRef}
          className="mb-16 overflow-hidden font-display text-[clamp(2.5rem,7vw,5.5rem)] font-black leading-none tracking-[-0.03em] text-foreground"
          aria-label={heading}
        >
          {heading.split('').map((char, i) =>
            char === ' ' ? (
              <span key={i} className="inline-block w-[0.2em]" aria-hidden="true" />
            ) : (
              <span key={i} className="coda-letter inline-block" style={{ opacity: 0 }}>
                {char}
              </span>
            )
          )}
        </h2>

        <div ref={linksRef} className="flex flex-wrap gap-x-12 gap-y-4" style={{ opacity: 0 }}>
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.external && { target: '_blank', rel: 'noopener noreferrer' })}
              {...('download' in link && link.download ? { download: true } : {})}
              className="group relative font-display text-2xl font-bold text-foreground/60 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded md:text-3xl"
            >
              {link.label}
              <span
                aria-hidden="true"
                className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full"
              />
            </a>
          ))}
        </div>

        <p className="mt-20 font-mono text-xs text-muted/30">
          {siteData.location} · relocating to {siteData.relocating}
        </p>
      </div>
    </section>
  )
}
