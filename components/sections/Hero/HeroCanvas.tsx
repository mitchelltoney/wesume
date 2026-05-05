'use client'

import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Light blue accent — matches CSS --color-accent oklch(0.72 0.19 225)
const ACCENT_HEX = '#60a5fa'

interface ShapeProps {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
  speed: number
  scrollRef: React.RefObject<number>
  depth: number
}

function FloatingShape({ position, rotation, scale, speed, scrollRef, depth }: ShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const geo = useMemo(
    () =>
      depth % 2 === 0 ? new THREE.IcosahedronGeometry(1, 0) : new THREE.OctahedronGeometry(1, 0),
    [depth]
  )

  useFrame((_, delta) => {
    if (!meshRef.current) return
    const scroll = scrollRef.current ?? 0
    meshRef.current.rotation.x += delta * speed * 0.4
    meshRef.current.rotation.y += delta * speed * 0.6
    meshRef.current.position.y = position[1] - scroll * depth * 1.2
    const mat = meshRef.current.material as THREE.MeshBasicMaterial
    mat.opacity = Math.max(0, 0.14 - scroll * 0.2)
  })

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
      <primitive object={geo} />
      <meshBasicMaterial color={ACCENT_HEX} wireframe transparent opacity={0.14} />
    </mesh>
  )
}

// Deterministic positions — no Math.random() during render
const PARTICLE_POSITIONS = (() => {
  const count = 180
  const pos = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const t = (i / count) * Math.PI * 2 * 17.3
    const u = (i / count) * Math.PI * 2 * 7.9
    pos[i * 3] = Math.sin(t) * 12 + Math.cos(u * 3) * 4
    pos[i * 3 + 1] = Math.cos(t * 0.7) * 8 + Math.sin(u * 2) * 2
    pos[i * 3 + 2] = Math.sin(u) * 5 - 2
  }
  return pos
})()

function ParticleField({ scrollRef }: { scrollRef: React.RefObject<number> }) {
  const pointsRef = useRef<THREE.Points>(null)

  useFrame((_, delta) => {
    if (!pointsRef.current) return
    const scroll = scrollRef.current ?? 0
    pointsRef.current.rotation.y += delta * 0.02
    pointsRef.current.position.y = -scroll * 0.8
    const mat = pointsRef.current.material as THREE.PointsMaterial
    mat.opacity = Math.max(0, 0.28 - scroll * 0.35)
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[PARTICLE_POSITIONS, 3]} />
      </bufferGeometry>
      <pointsMaterial color={ACCENT_HEX} size={0.04} transparent opacity={0.28} sizeAttenuation />
    </points>
  )
}

const SHAPES: Omit<ShapeProps, 'scrollRef'>[] = [
  { position: [-5, 2.5, -3], rotation: [0.5, 0.3, 0], scale: 0.7, speed: 0.6, depth: 1 },
  { position: [5, -1.5, -4], rotation: [0.2, 0.8, 0.1], scale: 0.9, speed: 0.4, depth: 2 },
  { position: [-3, -3, -2], rotation: [1.2, 0.1, 0.5], scale: 0.5, speed: 0.8, depth: 1 },
  { position: [4, 3, -5], rotation: [0.3, 1.1, 0.2], scale: 1.1, speed: 0.3, depth: 3 },
  { position: [1, -4, -6], rotation: [0.7, 0.4, 0.9], scale: 0.6, speed: 0.5, depth: 2 },
  { position: [-6, 0, -5], rotation: [0.1, 0.6, 1.3], scale: 0.8, speed: 0.7, depth: 2 },
  { position: [6, 1, -3], rotation: [0.9, 0.2, 0.4], scale: 0.45, speed: 0.9, depth: 1 },
  { position: [-1, 4, -7], rotation: [0.4, 0.9, 0.6], scale: 1.2, speed: 0.25, depth: 3 },
]

function Scene({ scrollRef }: { scrollRef: React.RefObject<number> }) {
  return (
    <>
      <ParticleField scrollRef={scrollRef} />
      {SHAPES.map((props, i) => (
        <FloatingShape key={i} {...props} scrollRef={scrollRef} />
      ))}
    </>
  )
}

interface HeroCanvasProps {
  scrollRef: React.RefObject<number>
}

// SSR-safe: renders a stable placeholder div on both server and initial client render.
// The Canvas only mounts after hydration — no Suspense wrapper, no tree mismatch.
export function HeroCanvas({ scrollRef }: HeroCanvasProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    queueMicrotask(() => setMounted(true))
  }, [])

  return (
    <div className="absolute inset-0" aria-hidden="true">
      {mounted && (
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
          style={{ width: '100%', height: '100%' }}
        >
          <Scene scrollRef={scrollRef} />
        </Canvas>
      )}
    </div>
  )
}
