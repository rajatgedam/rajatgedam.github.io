import type { Profile } from '../types/portfolio'

export const profile: Profile = {
  name: 'Rajat Gedam',
  headline: 'Senior software engineer building AI-powered, cloud-first products with .NET, React, and AWS Bedrock.',
  intro:
    '7+ years shipping enterprise and AI-powered products on C#/.NET 8, React, TypeScript, and SQL, applying retrieval-augmented generation, LLM orchestration, and cloud-native architecture across AWS, Azure, and GCP as first-class delivery components.',
  quickFacts: [
    'Senior Software Engineer at Deloitte - Government of California State, Sacramento, CA (Remote)',
    'Former Software Engineer at University of Massachusetts, New Bedford',
    'Former .NET Developer at Yardi Systems, Pune, India',
    'MS in Computer Science, University of Massachusetts (GPA 3.77/4)',
  ],
  summary: [
    'At Deloitte, I architected a customer-facing AI chatbot on AWS Bedrock using retrieval-augmented generation over live task data, and re-architected multi-tenant identity governance services to cut API latency by 42% while supporting 200,000+ monthly audit transactions.',
    'I led the shift from monolithic services to containerized C# microservices on Docker and Kubernetes, reducing downtime by 45%, and built automated test coverage that cut production bugs by 65%.',
    'At UMass, I built a TurboTax-style degree-tracking platform with React and .NET, integrated MongoDB alongside SQL Server for unstructured audit data, and automated advisor workflows to save 4+ hours per week.',
    'At Yardi, I refactored SaaS APIs in C# .NET to achieve 80% code reuse and cut latency from 50ms to 37.5ms, built full-stack applications on AWS for real estate data systems reaching 99.99% uptime, and automated legacy data migrations that saved 40+ hours per month.',
  ],
  email: 'rajatgedam96@gmail.com',
  phone: '',
  socials: [
    {
      id: 'github',
      label: 'GitHub',
      url: 'https://github.com/rajatgedam?tab=repositories',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      url: 'https://linkedin.com/in/rajatgedam20',
    },
  ],
  skills: [
    {
      category: 'Languages',
      items: ['C# / .NET 8+', 'Python', 'Java', 'JavaScript', 'TypeScript', 'SQL'],
    },
    {
      category: 'AI / ML',
      items: [
        'AWS Bedrock',
        'Retrieval-Augmented Generation (RAG)',
        'LLM Orchestration',
        'Prompt Engineering',
        'LangGraph',
      ],
    },
    {
      category: 'Cloud & Infrastructure',
      items: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'DataDog'],
    },
    {
      category: 'Frameworks & Data',
      items: [
        'React',
        'Angular',
        '.NET Web API',
        'Entity Framework',
        'PostgreSQL',
        'MongoDB',
        'Redis',
      ],
    },
  ],
  contactMessage:
    'Open to senior software engineering opportunities focused on AI-powered products, cloud-native architecture, and high-impact enterprise systems.',
  resumeUrl: '/assets/resume/RajatGedamResume.pdf',
}
