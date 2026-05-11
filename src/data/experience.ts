import type { ExperienceItem } from '../types/portfolio'

export const experience: ExperienceItem[] = [
  {
    id: 'deloitte',
    role: 'Software Engineer (.NET 8, Blazor, Postgres, Docker)',
    company: 'Deloitte - Department of Healthcare Services (DHCS)',
    period: 'Apr 2024 - Present',
    location: 'Sacramento, CA (Remote)',
    summary: [
      'Engineered a .NET 8 web application to digitize license acquisition and reduce processing timelines from 10-12 months to 8-10 weeks.',
      'Delivered 15 end-to-end application types across 40+ screens using Entity Framework for robust database management.',
      'Created technical specifications with stakeholders to keep high alignment with software requirements and implementation outcomes.',
      'Improved quality through maintainable coding, test coverage across unit/integration/end-to-end levels, and recurring code reviews.',
      'Leveraged GitHub Copilot for AI-assisted code analysis and automated review bot workflows, accelerating pull request throughput and code delivery — consistent with GitHub\'s published benchmark of 46% more code shipped per developer and 55% faster task completion.',
    ],
    tools: [
      '.NET 8',
      'Blazor',
      'PostgreSQL',
      'Docker',
      'Entity Framework',
      'Jira',
      'Confluence',
    ],
  },
  {
    id: 'umass',
    role: 'Software Engineer (React.js, .NET, SQL)',
    company: 'University of Massachusetts',
    period: 'Jul 2022 - Apr 2024',
    location: 'New Bedford, MA',
    summary: [
      'Architected a TurboTax-style web form using .NET, SQL Server, and React to streamline student degree tracking.',
      'Automated advisor approval workflows and generated SQL-driven BI reports to improve functionality and reduce administrative effort.',
      'Collaborated with stakeholders on technical specifications and owned delivery across design, coding, testing, deployment, and documentation.',
    ],
    tools: ['React.js', '.NET', 'SQL Server', 'Entity Framework', 'BI Reporting'],
  },
  {
    id: 'yardi',
    role: '.NET Developer (Angular, C# .NET, MySQL)',
    company: 'Yardi Systems',
    period: 'Nov 2018 - Aug 2021',
    location: 'Pune, India',
    summary: [
      'Built and optimized REST APIs to improve retrieval performance and modernized multi-stage Angular workflows for faster UX.',
      'Automated migration workloads using C# .NET modules, reducing recurring manual effort.',
      'Improved reliability through exception analysis and observability practices with Elasticsearch and Kibana.',
      'Refactored SaaS APIs to increase code reuse and reduce latency while contributing to CI/CD delivery pipelines.',
    ],
    tools: ['Angular', 'C# .NET', 'MySQL', 'REST APIs', 'Azure DevOps', 'Kibana'],
  },
]