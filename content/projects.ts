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
      'A data-driven tool that recommends optimal counter-picks in Brawl Stars based on current meta matchup data. Scraped, cleaned, and modeled win-rate relationships across the brawler roster to surface actionable picks in real time.',
    tags: ['Python', 'Data Modeling', 'Web Scraping'],
    repo: '[OWNER: add repo URL]',
  },
  {
    id: 'protein-network',
    title: 'Protein Structure Network Analysis',
    year: 2024,
    role: 'Researcher',
    description:
      'Applied AlphaFold-predicted structures and Cytoscape network analysis to map functional relationships between proteins. Identified candidate interaction hubs using graph centrality metrics.',
    tags: ['Bioinformatics', 'AlphaFold', 'Cytoscape', 'Python'],
    repo: '[OWNER: add repo URL or remove]',
  },
  {
    id: 'ml-classifier',
    title: '[OWNER: project name]',
    year: 2023,
    role: 'Solo developer',
    description:
      '[OWNER: 1–2 sentence description. Suggested angle: ensemble methods or evaluation metrics work from coursework/research]',
    tags: ['scikit-learn', 'Python', 'ML'],
    repo: '[OWNER: add repo URL]',
  },
  {
    id: 'placeholder-4',
    title: '[OWNER: project name]',
    year: 2023,
    role: '[OWNER: role]',
    description: '[OWNER: description]',
    tags: ['[OWNER: tags]'],
    repo: '[OWNER: add repo URL]',
  },
]
