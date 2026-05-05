# mitchelltoney.com

Personal portfolio — scrollytelling resume built with Next.js 16, Tailwind v4, GSAP, and Lenis.

## Quickstart

```bash
pnpm install
pnpm dev       # http://localhost:3000
pnpm build     # production build
pnpm start     # serve production build
pnpm lint      # ESLint
```

## Where to edit content

All résumé content is single-sourced in `/content/` and `/lib/data.ts`. Edit those files; the site updates automatically.

| What | File |
|------|------|
| Name, tagline, email, links | `lib/data.ts` → `siteData` |
| Tech stack + domains | `lib/data.ts` → `techStack` |
| Personal interests | `lib/data.ts` → `interests` |
| Work experience | `content/experience.ts` |
| Education | `content/education.ts` |
| Projects | `content/projects.ts` |

## How to add a project

1. Open `content/projects.ts`
2. Add a new entry to the `projects` array:

```ts
{
  id: 'your-project-id',       // unique, kebab-case
  title: 'Project Name',
  year: 2025,
  role: 'Your role',
  description: 'One paragraph narrative.',
  tags: ['TypeScript', 'React'],
  repo: 'https://github.com/you/repo',
  live: 'https://yourproject.com', // optional
  image: '/images/your-project.png', // optional
}
```

3. The Work section picks it up automatically. No other changes needed.

## How to redeploy

Push to `main`. Vercel picks it up automatically.

To set your site URL (affects OG images and sitemap):

```
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

Set this in Vercel → Project → Settings → Environment Variables.

## Replace before going live

- `lib/data.ts` — real GitHub URL, LinkedIn URL, email
- `content/experience.ts` — Nokia co-op bullet specifics
- `content/projects.ts` — add your projects, remove `[OWNER]` placeholders
- `public/resume.pdf` — replace with actual résumé
- `public/og/default.png` — replace with real OG image, or the `/api/og` route generates one automatically

## Tech stack

- **Next.js 16** (App Router, Turbopack)
- **TypeScript** strict
- **Tailwind CSS v4**
- **GSAP + ScrollTrigger** — scroll choreography per section
- **Lenis** — smooth scrolling (disabled for `prefers-reduced-motion`)
- **Motion** (Framer Motion) — available for component-level animation
- **Fraunces** display serif + **Geist Sans** + **Geist Mono**
