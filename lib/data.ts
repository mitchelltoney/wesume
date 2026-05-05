export const siteData = {
  name: 'Mitchell Toney',
  tagline: 'Software engineer working close to the metal.',
  location: 'Orange County, CA',
  relocating: 'San Diego, CA — Fall 2026',
  email: 'mitchjt97@gmail.com',
  github: 'https://github.com/mitchelltoney',
  linkedin: 'https://linkedin.com/in/[OWNER]',
  resumePdf: '/resume.pdf',
  description:
    'Systems-leaning software engineer. Spent time at Nokia teaching network packets to behave. Headed to UCSD for an M.S. in CS, presumably to do harder problems.',
} as const

export const techStack = [
  { name: 'C++', domain: 'systems' as const, detail: 'Nokia co-op — embedded network tooling' },
  {
    name: 'Python',
    domain: 'general' as const,
    detail: 'Daily driver for scripting, ML, and data work',
  },
  {
    name: 'Embedded Systems',
    domain: 'systems' as const,
    detail: 'Multi-threaded packet processing at Nokia',
  },
  {
    name: 'Mutexes / Semaphores',
    domain: 'systems' as const,
    detail: 'Synchronization in concurrent C++ systems',
  },
  {
    name: 'Memory Architecture',
    domain: 'systems' as const,
    detail: 'Low-level memory management and layout',
  },
  {
    name: 'scikit-learn',
    domain: 'ml' as const,
    detail: 'Ensemble methods, classifiers, evaluation pipelines',
  },
  { name: 'Weka', domain: 'ml' as const, detail: 'ML experimentation and model comparison' },
  { name: 'Ensemble Methods', domain: 'ml' as const, detail: 'Random forests, boosting, stacking' },
  {
    name: 'Alteryx',
    domain: 'data' as const,
    detail: 'Alteryx Designer Cloud — analytics pipelines',
  },
  { name: 'Tableau', domain: 'data' as const, detail: 'Data visualization and dashboarding' },
  { name: 'AlphaFold', domain: 'bio' as const, detail: 'Protein structure prediction research' },
  {
    name: 'Cytoscape',
    domain: 'bio' as const,
    detail: 'Protein network analysis and visualization',
  },
  {
    name: 'TypeScript',
    domain: 'general' as const,
    detail: 'Typed JavaScript for anything frontend or full-stack',
  },
  { name: 'Next.js', domain: 'general' as const, detail: 'This site, built from scratch' },
] as const

export type TechDomain = 'systems' | 'ml' | 'data' | 'bio' | 'general'

export const domainLabels: Record<TechDomain, string> = {
  systems: 'Systems',
  ml: 'ML / AI',
  data: 'Data',
  bio: 'Bioinformatics',
  general: 'General',
}

export const interests = [
  { label: 'Orbital Mechanics', detail: 'KSP is a documentary. The Δv math is not optional.' },
  { label: 'Japanese', detail: 'WaniKani. Level unknown. Humility: high.' },
  { label: 'FPS / Hero Shooters', detail: 'Marvel Rivals, OW2, Deadlock. Calling it research.' },
  { label: 'Strength Training', detail: 'Shows up. Does the work. Mentions it once.' },
  { label: 'Skincare', detail: 'SPF every morning. Non-negotiable.' },
  { label: 'AI Forecasting', detail: 'Watching the P(doom) bets closely.' },
] as const
