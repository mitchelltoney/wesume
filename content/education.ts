export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startYear: number
  endYear: number | null
  location: string
  note?: string
}

export const education: Education[] = [
  {
    id: 'chapman',
    institution: 'Chapman University',
    degree: 'B.S.',
    field: 'Software Engineering',
    startYear: 2021,
    endYear: 2025,
    location: 'Orange, CA',
  },
  {
    id: 'ucsd',
    institution: 'UC San Diego',
    degree: 'M.S.',
    field: 'Computer Science',
    startYear: 2026,
    endYear: null,
    location: 'La Jolla, CA',
    note: 'Admitted & accepted — starting Fall 2026',
  },
]
