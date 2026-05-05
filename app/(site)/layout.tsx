import { SkipLink } from '@/components/ui/SkipLink'
import { Nav } from '@/components/ui/Nav'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { PageBackground } from '@/components/ui/PageBackground'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SkipLink />
      <Nav />
      <ScrollProgress />
      {/* Fixed ambient canvas — sits behind all content */}
      <PageBackground />
      {/* Main content above the canvas */}
      <div className="relative z-[1]">{children}</div>
    </>
  )
}
