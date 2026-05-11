import type { ProjectItem } from '../types/portfolio'

export const projects: ProjectItem[] = [
  {
    id: 'ai-file-sorter',
    title: 'AI File Sorter',
    period: 'Apr 2026 - May 2026',
    description:
      'AI-powered file organization desktop app that scans folders, proposes smart groupings with a local Ollama model, supports approve/reject review, conflict-safe moves, and one-click undo.',
    image: '/assets/projects/7_ai_file_sorter.png',
    repo: 'https://github.com/rajatgedam/ai-file-sorter.git',
    technologies: [
      'React',
      'TypeScript',
      'FastAPI',
      'Python',
      'Ollama',
      'Docker Compose',
      'LLM-powered File Operations',
    ],
  },
  {
    id: 'ai-chat-bot',
    title: 'AI Chat Bot (NexusChat)',
    period: 'Apr 2026 - May 2026',
    description:
      'Full-stack chat application with persistent PostgreSQL sessions, multi-session sidebar workflow, Hugging Face LLM integration, context memory, and token/limit telemetry in the UI.',
    image: '/assets/projects/8_ai_chat_bot.png',
    repo: 'https://github.com/rajatgedam/chat-starter.git',
    technologies: [
      'React',
      'TypeScript',
      'Express',
      'PostgreSQL',
      'Hugging Face Router API',
      'Session Persistence',
      'Docker Compose',
    ],
  },
  {
    id: 'enterprise-cloud-iot',
    title: 'Enterprise Cloud Systems - IoT Real-Time Analytics ETL Pipeline',
    period: 'Jan 2023 - Apr 2023',
    description:
      'Built an IoT time-series analytics pipeline using AWS IoT Core, Kinesis Data Firehose, S3, Lambda, Cognito, and CloudFront with infrastructure deployment via EC2 and CloudFormation.',
    image: '/assets/projects/3_AWS_IoT_Core.jpg',
    technologies: [
      'AWS IoT Core',
      'Kinesis Data Firehose',
      'CloudFormation',
      'S3',
      'DynamoDB',
      'Lambda',
      'Cognito',
      'CloudFront',
      'EC2',
    ],
  },
  {
    id: 'enterprise-cloud-health',
    title: 'Enterprise Cloud Systems - AI-Powered Health Data Masking Service',
    period: 'Jan 2023 - Apr 2023',
    description:
      'Deployed a protected health information data extraction and identification service using Amazon API Gateway, AWS Lambda, and Amazon Rekognition.',
    image: '/assets/projects/4_Health_Data_Masking.jpg',
    technologies: [
      'API Gateway',
      'Lambda',
      'Rekognition',
      'PHI Identification',
      'Healthcare Data Privacy',
      'AWS',
    ],
  },
  {
    id: 'cancer-diagnosis-system',
    title: 'Cancer Diagnosis System',
    archived: true,
    description:
      'Masters capstone microservices application that runs machine learning algorithms on cancer datasets and generates anomaly-detection performance metrics.',
    image: '/assets/projects/1_MSCapstone.png',
    repo: 'https://github.com/rajatgedam/microservices-ml-project',
    technologies: [
      'Microservices',
      'Python Flask',
      'Scikit-learn',
      'Docker',
      'Design Patterns',
      'React',
      'ML Anomaly Detection',
    ],
  },
  {
    id: 'crime-data-visualization',
    title: 'Crime Data Visualization',
    archived: true,
    description:
      'Visualization of Chicago crime trends across pre and post COVID periods, using public city datasets and D3.js.',
    image: '/assets/projects/2_ChicagoCrimesMU.png',
    site: 'https://rajatgedam.github.io/ChicagoCrimesVisualization/',
    repo: 'https://github.com/rajatgedam/ChicagoCrimesVisualization',
    technologies: ['JavaScript', 'D3.js', 'Web APIs', 'Git', 'HTML', 'CSS'],
  },
  {
    id: 'research-publications-network',
    title: 'Research Publications Data Network',
    archived: true,
    description:
      'NetworkX and D3.js visualization of publication datasets with relationship mapping across citations, years, and authors.',
    image: '/assets/projects/5_NetworkX.png',
    site: 'https://rajatgedam.github.io/NetworkXd3vizRajat.github.io/',
    repo: 'https://github.com/rajatgedam/NetworkXd3vizRajat.github.io',
    technologies: ['D3.js', 'NetworkX', 'Jupyter Notebook', 'Python', 'Data Science'],
  },
  {
    id: 'movie-rating-app',
    title: 'Movie Rating App',
    archived: true,
    description:
      'Angular-based movie rating platform with user authentication and list management, deployed on Firebase.',
    image: '/assets/projects/6_MovieRating.png',
    site: 'https://angular-movie-rating-2510f.firebaseapp.com',
    repo: 'https://github.com/rajatgedam/movietask',
    technologies: ['Angular', 'Firebase', 'Node.js', 'GitHub'],
  },
]