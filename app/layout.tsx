import type { Metadata } from 'next'
import { Fraunces, Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { siteData } from '@/lib/data'
import { PersonSchema } from '@/components/ui/PersonSchema'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['opsz', 'SOFT', 'WONK'],
})

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mitchelltoney.com'),
  title: `${siteData.name} — ${siteData.tagline}`,
  description: siteData.description,
  openGraph: {
    title: siteData.name,
    description: siteData.description,
    type: 'website',
    images: [{ url: '/og/default.png', width: 1200, height: 630, alt: siteData.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteData.name,
    description: siteData.description,
    images: ['/og/default.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${geistSans.variable} ${geistMono.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <PersonSchema />
      </head>
      <body className="bg-background text-foreground antialiased">{children}</body>
    </html>
  )
}
