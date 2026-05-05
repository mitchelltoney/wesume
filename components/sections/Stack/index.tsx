'use client'

import { useEffect, useState } from 'react'
import { techStack, domainLabels, type TechDomain } from '@/lib/data'

const DOMAIN_COLORS: Record<TechDomain, string> = {
  systems: 'oklch(0.84 0.22 142)',
  ml: 'oklch(0.78 0.18 250)',
  data: 'oklch(0.82 0.15 60)',
  bio: 'oklch(0.8 0.18 320)',
  general: 'oklch(0.7 0.05 0)',
}

const POSITIONS: Record<TechDomain, { cx: number; cy: number }> = {
  systems: { cx: 25, cy: 35 },
  ml: { cx: 75, cy: 25 },
  data: { cx: 80, cy: 70 },
  bio: { cx: 55, cy: 75 },
  general: { cx: 45, cy: 50 },
}

interface Node {
  id: string
  label: string
  domain: TechDomain
  detail: string
  x: number
  y: number
}

function buildNodes(): Node[] {
  const domainCenters: Record<TechDomain, { items: (typeof techStack)[number][] }> = {
    systems: { items: [] },
    ml: { items: [] },
    data: { items: [] },
    bio: { items: [] },
    general: { items: [] },
  }

  techStack.forEach((t) => domainCenters[t.domain].items.push(t))

  const nodes: Node[] = []
  techStack.forEach((tech) => {
    const center = POSITIONS[tech.domain]
    const clusterItems = domainCenters[tech.domain].items
    const idx = clusterItems.indexOf(tech)
    const count = clusterItems.length
    const angle = (idx / count) * Math.PI * 2
    const r = count > 1 ? 10 : 0
    nodes.push({
      id: tech.name,
      label: tech.name,
      domain: tech.domain,
      detail: tech.detail,
      x: center.cx + r * Math.cos(angle),
      y: center.cy + r * Math.sin(angle),
    })
  })

  return nodes
}

const nodes = buildNodes()

const EDGES: [string, string][] = [
  ['C++', 'Embedded Systems'],
  ['C++', 'Mutexes / Semaphores'],
  ['Mutexes / Semaphores', 'Memory Architecture'],
  ['scikit-learn', 'Ensemble Methods'],
  ['scikit-learn', 'Weka'],
  ['Alteryx', 'Tableau'],
  ['AlphaFold', 'Cytoscape'],
  ['Python', 'scikit-learn'],
  ['Python', 'Alteryx'],
  ['Python', 'AlphaFold'],
  ['TypeScript', 'Next.js'],
]

export function Stack() {
  const [hoveredDomain, setHoveredDomain] = useState<TechDomain | null>(null)
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    queueMicrotask(() => setMounted(true))
  }, [])

  const getNodeOpacity = (node: Node) => {
    if (!hoveredDomain) return 1
    return node.domain === hoveredDomain ? 1 : 0.15
  }

  const getEdgeOpacity = ([a, b]: [string, string]) => {
    if (!hoveredDomain) return 0.15
    const nodeA = nodes.find((n) => n.id === a)
    const nodeB = nodes.find((n) => n.id === b)
    return nodeA?.domain === hoveredDomain && nodeB?.domain === hoveredDomain ? 0.5 : 0.05
  }

  const getNodePos = (id: string) => nodes.find((n) => n.id === id)

  return (
    <section id="stack" className="relative overflow-hidden px-6 py-24 md:px-16 lg:px-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, oklch(0.4 0 0 / 0.3) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl">
        <p className="mb-2 font-mono text-xs text-accent">tools</p>
        <h2 className="mb-4 font-display text-[clamp(2.5rem,6vw,4rem)] font-bold text-foreground">
          Toolkit
        </h2>
        <p className="mb-12 font-sans text-sm text-muted">
          Hover a cluster to explore. Each node — a tool, a domain, a decision.
        </p>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Constellation SVG */}
          <div className="flex-1">
            {mounted && (
              <svg
                viewBox="0 0 100 100"
                className="h-auto w-full max-w-lg"
                role="img"
                aria-label="Technology constellation"
              >
                {/* Edges */}
                {EDGES.map(([a, b], i) => {
                  const na = getNodePos(a)
                  const nb = getNodePos(b)
                  if (!na || !nb) return null
                  return (
                    <line
                      key={i}
                      x1={na.x}
                      y1={na.y}
                      x2={nb.x}
                      y2={nb.y}
                      stroke="oklch(0.84 0.22 142)"
                      strokeWidth="0.3"
                      opacity={getEdgeOpacity([a, b])}
                      style={{ transition: 'opacity 0.3s' }}
                    />
                  )
                })}

                {/* Domain label clusters */}
                {(Object.keys(POSITIONS) as TechDomain[]).map((domain) => (
                  <text
                    key={domain}
                    x={POSITIONS[domain].cx}
                    y={POSITIONS[domain].cy - 14}
                    textAnchor="middle"
                    fontSize="2.5"
                    fill="oklch(0.84 0.22 142)"
                    opacity={!hoveredDomain || hoveredDomain === domain ? 0.6 : 0.1}
                    style={{
                      transition: 'opacity 0.3s',
                      fontFamily: 'var(--font-geist-mono, monospace)',
                    }}
                  >
                    {domainLabels[domain]}
                  </text>
                ))}

                {/* Nodes */}
                {nodes.map((node) => (
                  <g
                    key={node.id}
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={() => {
                      setHoveredDomain(node.domain)
                      setHoveredNode(node)
                    }}
                    onMouseLeave={() => {
                      setHoveredDomain(null)
                      setHoveredNode(null)
                    }}
                    onFocus={() => {
                      setHoveredDomain(node.domain)
                      setHoveredNode(node)
                    }}
                    onBlur={() => {
                      setHoveredDomain(null)
                      setHoveredNode(null)
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={`${node.label}: ${node.detail}`}
                  >
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={hoveredNode?.id === node.id ? 2.5 : 1.5}
                      fill={DOMAIN_COLORS[node.domain]}
                      opacity={getNodeOpacity(node)}
                      style={{ transition: 'all 0.3s' }}
                    />
                    <text
                      x={node.x}
                      y={node.y + 4}
                      textAnchor="middle"
                      fontSize="2.2"
                      fill="oklch(0.9 0 0)"
                      opacity={getNodeOpacity(node)}
                      style={{
                        transition: 'opacity 0.3s',
                        fontFamily: 'var(--font-geist-sans, sans-serif)',
                        pointerEvents: 'none',
                        userSelect: 'none',
                      }}
                    >
                      {node.label}
                    </text>
                  </g>
                ))}
              </svg>
            )}
          </div>

          {/* Detail panel */}
          <div className="flex w-full flex-col justify-center lg:w-64">
            {hoveredNode ? (
              <div className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
                <p
                  className="mb-1 font-mono text-xs"
                  style={{ color: DOMAIN_COLORS[hoveredNode.domain] }}
                >
                  {domainLabels[hoveredNode.domain]}
                </p>
                <p className="mb-3 font-display text-lg font-bold text-foreground">
                  {hoveredNode.label}
                </p>
                <p className="font-sans text-sm leading-relaxed text-muted">{hoveredNode.detail}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {(Object.keys(POSITIONS) as TechDomain[]).map((domain) => (
                  <button
                    key={domain}
                    onMouseEnter={() => setHoveredDomain(domain)}
                    onMouseLeave={() => setHoveredDomain(null)}
                    className="flex w-full items-center gap-3 rounded px-3 py-2 text-left transition-colors hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <div
                      className="h-2 w-2 rounded-full shrink-0"
                      style={{ backgroundColor: DOMAIN_COLORS[domain] }}
                    />
                    <span className="font-mono text-sm text-muted">{domainLabels[domain]}</span>
                    <span className="ml-auto font-mono text-xs text-white/20">
                      {techStack.filter((t) => t.domain === domain).length}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
