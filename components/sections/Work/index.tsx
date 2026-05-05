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

    const ctx = gsap.context(() => {
      const track = trackRef.current
      if (!track) return

      const totalWidth = track.scrollWidth - window.innerWidth

      gsap.to(track, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="work" ref={sectionRef} className="relative">
      {/* Section header — visible before pin starts */}
      <div className="relative z-10 px-6 pt-24 pb-12 md:px-16 lg:px-24">
        <p className="mb-2 font-mono text-xs text-accent">selected work</p>
        <h2 className="font-display text-[clamp(2.5rem,6vw,4rem)] font-bold text-foreground">
          Projects
        </h2>
      </div>

      {/* Horizontal scroll track */}
      <div ref={trackRef} className="flex gap-6 px-6 pb-24 md:px-16" aria-label="Project list">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
        {/* End spacer */}
        <div className="w-[10vw] shrink-0" aria-hidden="true" />
      </div>

      {/* Edge fades — blend entry and exit into surrounding page */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-32"
        style={{ background: 'linear-gradient(to bottom, var(--color-background), transparent)' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-32"
        style={{ background: 'linear-gradient(to top, var(--color-background), transparent)' }}
      />
    </section>
  )
}
