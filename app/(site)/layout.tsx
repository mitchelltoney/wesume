import { SkipLink } from '@/components/ui/SkipLink'
import { Nav } from '@/components/ui/Nav'
import { ScrollProgress } from '@/components/ui/ScrollProgress'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SkipLink />
      <Nav />
      <ScrollProgress />
      {children}
    </>
  )
}
