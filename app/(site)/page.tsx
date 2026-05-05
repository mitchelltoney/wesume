'use client'

import { useLenis } from '@/components/motion/useLenis'
import { Hero } from '@/components/sections/Hero'
import { Premise } from '@/components/sections/Premise'
import { Trajectory } from '@/components/sections/Trajectory'
import { Stack } from '@/components/sections/Stack'
import { Work } from '@/components/sections/Work'
import { FieldNotes } from '@/components/sections/FieldNotes'
import { Coda } from '@/components/sections/Coda'

export default function Home() {
  useLenis()

  return (
    <main id="main-content">
      <Hero />
      <Premise />
      <Trajectory />
      <Stack />
      <Work />
      <FieldNotes />
      <Coda />
    </main>
  )
}
