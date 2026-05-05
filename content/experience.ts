export interface ExperienceItem {
  id: string
  company: string
  role: string
  startDate: string
  endDate: string | null
  location: string
  bullets: string[]
  tags: string[]
}

export const experience: ExperienceItem[] = [
  {
    id: 'nokia',
    company: 'Nokia',
    role: 'Software Engineering Co-op',
    startDate: '2024-01',
    endDate: '2024-08',
    location: 'Sunnyvale, CA',
    bullets: [
      'Developed embedded network tooling for high-throughput telecom systems in C++',
      'Implemented synchronization primitives (mutexes, semaphores) to eliminate race conditions in multi-threaded packet-processing pipelines',
      'Built diagnostic utilities that reduced mean time-to-identify (MTTI) for network faults by automating log correlation across distributed nodes',
      '[OWNER: add specific contribution — e.g. "Reduced X latency by Y% via…"]',
    ],
    tags: ['C++', 'Embedded Systems', 'Networking', 'Multi-threading'],
  },
]
