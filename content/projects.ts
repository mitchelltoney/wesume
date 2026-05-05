export interface Project {
  id: string
  title: string
  year: number
  role: string
  description: string
  tags: string[]
  repo?: string
  live?: string
  image?: string
}

export const projects: Project[] = [
  {
    id: 'brawl-counter',
    title: 'Brawl Stars Counter-Pick Calculator',
    year: 2024,
    role: 'Solo developer',
    description:
      'A data-driven tool that recommends optimal counter-picks in Brawl Stars based on current meta matchup data. Scraped win-rate relationships across the brawler roster and surfaced actionable picks in real time. The tool is correct. Whether players follow its advice is a separate problem.',
    tags: ['Python', 'Data Modeling', 'Web Scraping'],
    repo: 'https://github.com/mitchelltoney',
  },
  {
    id: 'protein-network',
    title: 'Protein Structure Network Analysis',
    year: 2024,
    role: 'Researcher',
    description:
      'Applied AlphaFold-predicted structures and Cytoscape network analysis to map functional relationships between proteins. Identified candidate interaction hubs using graph centrality metrics. Biology turned out to have surprisingly good graph problems.',
    tags: ['Bioinformatics', 'AlphaFold', 'Cytoscape', 'Python'],
  },
  {
    id: 'placeholder-3',
    title: 'Coming soon',
    year: 2025,
    role: 'TBD',
    description:
      'This slot is reserved for a project description that will be here shortly. The project exists. The write-up is pending. These things happen.',
    tags: ['TBD'],
  },
  {
    id: 'placeholder-4',
    title: 'Also coming soon',
    year: 2024,
    role: 'TBD',
    description:
      'Another placeholder. Four projects felt like the right number. Two real, two imminent. Check GitHub in the meantime.',
    tags: ['TBD'],
    repo: 'https://github.com/mitchelltoney',
  },
]
