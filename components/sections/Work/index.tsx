'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '@/content/projects'

gsap.registerPlugin(ScrollTrigger)

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  return (
    <article className="flex h-full w-[85vw] max-w-lg shrink-0 flex-col justify-between rounded-xl border border-white/10 bg-white/[0.02] p-8 md:w-[480px]">
      <div>
        <div className="mb-6 flex items-start justify-between gap-4">
          <span className="font-mono text-xs text-muted/40">
            {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </span>
          <span className="font-mono text-xs text-accent">{project.year}</span>
        </div>

        <h3 className="mb-2 font-display text-2xl font-bold leading-tight text-foreground">
          {project.title}
        </h3>
        <p className="mb-4 font-mono text-xs text-muted/60">{project.role}</p>
        <p className="font-sans text-sm leading-relaxed text-muted">{project.description}</p>
      </div>

      <div>
        <div className="mb-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-muted/60"
            >
              {tag}
            </span>
          ))}
        </div>

        {project.repo && !project.repo.includes('[OWNER]') && (
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
          >
            View repo →
          </a>
        )}
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 inline-flex items-center gap-2 font-mono text-xs text-muted/60 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
          >
            Live →
          </a>
        )}
      </div>
    </article>
  )
}

export function Work() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || window.innerWidth < 768) return

    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    // Measure scroll distance and set section tall enough to provide it
    const measure = () => track.scrollWidth - window.innerWidth

    let totalWidth = measure()
    section.style.height = `calc(100vh + ${totalWidth}px)`

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -measure(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          // No pin — CSS sticky handles the lock, no JS position switch = no jump
          invalidateOnRefresh: true,
        },
      })
    }, sectionRef)

    const onResize = () => {
      totalWidth = measure()
      section.style.height = `calc(100vh + ${totalWidth}px)`
      ScrollTrigger.refresh()
    }
    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      ctx.revert()
      section.style.height = ''
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <section id="work" ref={sectionRef} className="relative">
      {/*
        CSS sticky viewport — locks to top of screen while the section scrolls.
        No GSAP pin means no position:fixed switch, so entry/exit are seamless.
      */}
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        {/* Header */}
        <div className="shrink-0 px-6 pt-16 pb-8 md:px-16 lg:px-24">
          <p className="mb-2 font-mono text-xs text-accent">selected work</p>
          <h2 className="font-display text-[clamp(2.5rem,6vw,4rem)] font-bold text-foreground">
            Projects
          </h2>
        </div>

        {/* Horizontal track — GSAP drives x, overflow hidden clips it cleanly */}
        <div
          ref={trackRef}
          className="flex min-h-0 flex-1 items-stretch gap-6 px-6 pb-8 md:px-16"
          aria-label="Project list"
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
          <div className="w-[10vw] shrink-0" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
