import type { ExperienceItem } from '../types/portfolio'

export const experience: ExperienceItem[] = [
  {
    id: 'deloitte',
    role: 'Senior Software Engineer (C# .NET 8, React, AWS Bedrock, PostgreSQL, Docker)',
    company: 'Deloitte - Government of California State',
    period: 'Jun 2024 - Present',
    location: 'Sacramento, CA (Remote)',
    summary: [
      'Architected a customer-facing AI chatbot on AWS Bedrock with retrieval-augmented generation (RAG) over live task data, letting users query pending tasks and retrieve status in natural language, reducing manual lookup time and support ticket volume.',
      'Addressed scalability limits across 30+ ERP/SaaS integrations, architected high-performance RESTful APIs and C# .NET background services for multi-tenant identity governance, reducing API latency by 42% and supporting 200,000+ monthly audit transactions.',
      'Redesigned monolithic backend components into C# microservices containerized with Docker and Kubernetes, reducing system downtime by 45% and enabling scalable deployment.',
      'Established automated testing suites spanning unit, integration, and regression coverage, reducing production software bugs by 65%.',
      'Led Git version-control workflows and design reviews across cross-functional Agile teams, cutting feature cycle delivery time by 2.5 weeks.',
    ],
    tools: ['.NET 8', 'React', 'AWS Bedrock', 'RAG', 'PostgreSQL', 'Docker', 'Kubernetes'],
  },
  {
    id: 'umass',
    role: 'Software Engineer (React.js, .NET, SQL)',
    company: 'University of Massachusetts',
    period: 'Jul 2022 - Apr 2024',
    location: 'New Bedford, MA',
    summary: [
      'Architected a TurboTax-style web form using .NET, SQL Server, and React to streamline the degree-tracking process for students, eliminating 35%+ of manual data-entry workload.',
      'Integrated MongoDB alongside MS SQL to handle unstructured legal documents and audit trails, expanding data-ingestion capacity 3x with zero performance degradation.',
      'Automated advisor approval workflows and SQL-based BI reporting, improving application efficiency by 25% and saving 4+ hours per week in admin work.',
    ],
    tools: ['React.js', '.NET', 'SQL Server', 'MongoDB', 'Entity Framework', 'BI Reporting'],
  },
  {
    id: 'yardi',
    role: '.NET Developer (Angular, C# .NET, MySQL)',
    company: 'Yardi Systems',
    period: 'Nov 2018 - Aug 2021',
    location: 'Pune, India',
    summary: [
      'Refactored SaaS APIs in C# .NET, achieving 80% code reuse and reducing average latency from 50ms to 37.5ms via an Azure DevOps CI/CD pipeline.',
      'Designed and deployed full-stack C#, .NET, and JavaScript applications on AWS for expanding Real Estate & Construction data demands, boosting platform reliability to 99.99% uptime.',
      'Automated legacy data migration using a C# .NET module, saving 40+ hours per month in manual work.',
    ],
    tools: ['Angular', 'C# .NET', 'MySQL', 'AWS', 'Azure DevOps', 'CI/CD'],
  },
]
