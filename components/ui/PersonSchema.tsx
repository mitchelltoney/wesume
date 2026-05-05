import { siteData } from '@/lib/data'

export function PersonSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteData.name,
    description: siteData.description,
    email: siteData.email,
    url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mitchelltoney.com',
    sameAs: [siteData.github, siteData.linkedin].filter((u) => !u.includes('[OWNER]')),
    alumniOf: [
      { '@type': 'CollegeOrUniversity', name: 'Chapman University' },
      { '@type': 'CollegeOrUniversity', name: 'UC San Diego' },
    ],
    knowsAbout: ['C++', 'Embedded Systems', 'Machine Learning', 'Bioinformatics', 'TypeScript'],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
