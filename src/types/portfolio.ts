export interface SocialLink {
  id: 'github' | 'linkedin'
  label: string
  url: string
}

export interface Profile {
  name: string
  headline: string
  intro: string
  quickFacts: string[]
  summary: string[]
  email: string
  phone?: string
  socials: SocialLink[]
  skills: string[]
  contactMessage: string
  resumeUrl: string
}

export interface ExperienceItem {
  id: string
  role: string
  company: string
  period: string
  location: string
  summary: string[]
  tools: string[]
}

export interface ProjectItem {
  id: string
  title: string
  period?: string
  archived?: boolean
  description: string
  image: string
  technologies: string[]
  site?: string
  repo?: string
}