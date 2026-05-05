'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ShapeProps {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
  speed: number
  scrollRef: React.RefObject<number>
  depth: number
}

// Individual wireframe geometry — icosahedra and octahedra
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
    // Parallax: shapes further back (negative z) move less
    meshRef.current.position.y = position[1] - scroll * depth * 1.2
    // Fade out on scroll
    const mat = meshRef.current.material as THREE.MeshBasicMaterial
    mat.opacity = Math.max(0, 0.12 - scroll * 0.18)
  })

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
      <primitive object={geo} />
      <meshBasicMaterial
        color={new THREE.Color().setStyle('oklch(0.84 0.22 142)')}
        wireframe
        transparent
        opacity={0.12}
      />
    </mesh>
  )
}

// Pre-computed outside component — stable, no re-render impurity
const PARTICLE_POSITIONS = (() => {
  const count = 180
  const pos = new Float32Array(count * 3)
  // Use a seeded-ish deterministic spread instead of Math.random
  for (let i = 0; i < count; i++) {
    const t = (i / count) * Math.PI * 2 * 17.3
    const u = (i / count) * Math.PI * 2 * 7.9
    pos[i * 3] = Math.sin(t) * 12 + Math.cos(u * 3) * 4
    pos[i * 3 + 1] = Math.cos(t * 0.7) * 8 + Math.sin(u * 2) * 2
    pos[i * 3 + 2] = Math.sin(u) * 5 - 2
  }
  return pos
})()

// Particle field — small dots scattered in depth
function ParticleField({ scrollRef }: { scrollRef: React.RefObject<number> }) {
  const pointsRef = useRef<THREE.Points>(null)

  useFrame((_, delta) => {
    if (!pointsRef.current) return
    const scroll = scrollRef.current ?? 0
    pointsRef.current.rotation.y += delta * 0.02
    pointsRef.current.position.y = -scroll * 0.8
    const mat = pointsRef.current.material as THREE.PointsMaterial
    mat.opacity = Math.max(0, 0.25 - scroll * 0.3)
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[PARTICLE_POSITIONS, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={new THREE.Color().setStyle('oklch(0.84 0.22 142)')}
        size={0.04}
        transparent
        opacity={0.25}
        sizeAttenuation
      />
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

export function HeroCanvas({ scrollRef }: HeroCanvasProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
      style={{ position: 'absolute', inset: 0 }}
      aria-hidden="true"
    >
      <Scene scrollRef={scrollRef} />
    </Canvas>
  )
}
