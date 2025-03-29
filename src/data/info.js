//import self from '../img/self.png';
// import mock1 from '../img/mock1.png';
// import mock2 from '../img/mock2.png';
// import mock3 from '../img/mock3.png';
// import mock4 from '../img/mock4.png';
// import mock5 from '../img/mock5.png';
// import mock6 from '../img/mock6.png';
// import mock7 from '../img/mock7.png';

/* Hi there! Thanks for checking out my portfolio template. Be sure to read the comments to get a better understanding of
how to make this template work best for you! */

export let colors = ['rgb(33,212,253)', 'rgb(209, 155, 238)'];
/*
I highly recommend using a gradient generator like https://gradientgenerator.paytonpierce.dev/ to generate a pair of colors that you like.
These colors will be used to style your name on the homepage, the background of your picture, and some other accents throughout
the site.
 */

export const info = {
  firstName: 'Rajat',
  lastName: 'Gedam',
  position: 'a Full Stack Developer',
  //selfPortrait: self,
  gradient: `-webkit-linear-gradient(135deg, ${colors})`,
  baseColor: colors[0],
  miniBio: [
    {
      emoji: '✨',
      text: 'Looking for exciting opportunities',
    },{
      emoji: '🌎',
      text: 'Based in PHX, USA',
    },
    {
      emoji: '💼',
      text: 'Software Engineer at Deloitte',
    },
    {
      emoji: '🎓',
      text: 'UMass Alumni',
    },
    {
      emoji: '💻',
      text: 'Masters in Computer Science | Bachelors in Computer Engineering',
    },
    {
      emoji: '📧',
      text: (
        <a href="mailto:rajatgedam20@gmail.com">rajatgedam20@gmail.com</a>
      ),
    },
  ],
  socials: [
    {
      link: 'https://github.com/rajatgedam',
      icon: 'fa-brands fa-github',
      label: 'github',
    },
    {
      link: 'https://www.linkedin.com/in/rajatgedam20/',
      icon: 'fa-brands fa-linkedin',
      label: 'linkedin',
    },
    {
      link: '',//https://twitter.com/ISutygina
      icon: 'fa-brands fa-twitter',
      label: 'twitter',
    },
    {
      link: '',//https://codepen.io/juls_sut
      icon: 'fa-brands fa-codepen',
      label: 'codepen',
    },
    {
      link: 'https://medium.com/@juliasutygina',
      icon: 'fa-brands fa-medium',
      label: 'medium',
    },
  ],

  bio: "I'm a dedicated software engineer with a background in SaaS, known for my exceptional communication and organizational skills. I enjoy contributing to innovative solutions that can positively impact both the organization and the people it serves. Most recently, I had the privilege of making a meaningful impact on homeless communities in California, driving positive transformation and lasting change with my software wizardy. Curious?",
  skillsDesc: "C/C++, C# .NET, Java, Python, JavaScript, TypeScript, SQL, Angular, React JS, React Native",
  
  skills: {
    proficientWith: [
      'javascript',
      'node.js',
      'express.js',
      'react',
      'git',
      'mui',
      'sql-nosql-dbs',
      'html5',
      'css',
      'jest',
      'ruby',
      'python',
      'typescript',
    ],
  },
  hobbies: [
    // {
    //   label: 'beta-testing Coursera courses',
    //   emoji: '✨',
    // },
    {
      label: 'road trips',
      emoji: '🚗',
    },
    {
      label: 'clicking cool pics',
      emoji: '📸',
    },
    {
      label: 'ramen-eating',
      emoji: '🍜',
    },
  ],
  portfolio: [
    {
      title: 'Hotel California',
      description:
        'Connects event planners with the hotel banquet crew. Next.js, Prisma ORM, Postgres',
      live: '',
      source: 'https://github.com/juliasut/hotel-california',
      //image: mock5,
    },
    {
      title: 'DALL-E 2.0',
      description:
        "Full Stack MERN AI Image Generation App. Node.js, Express.js, MongoDB, React.js, Tailwind, OpenAI's DALL-E model, Cloudinary",
      live: '',
      source: 'https://github.com/juliasut/DALL-E-2.0.git',
      //image: mock7,
    },
    {
      title: 'Interview Scheduler',
      description:
        'A single-page app to schedule interview appointments. React, Storybook, Jest, Cypress',
      live: '',
      source: 'https://github.com/juliasut/scheduler',
      //image: mock6,
    },
    {
      title: 'ICTapp (Institute for Career Transitions)',
      description:
        'Mini anti-ageism hackathon winner app written in React Native',
      live: '',
      source: 'https://github.com/juliasut/ICTapp.git',
      //image: mock3,
    },
    {
      title: 'Rhizone Learning Management System',
      description:
        'Allows mentees to post self-reflections and develop professional competencies. Typescript, React, NodeJS, Express, MySQL, MUI, Jest',
      live: 'https://rhi.zone/',
      source: 'https://github.com/OpenTree-Education/rhizone-lms',
      //image: mock4,
    },
    {
      title: 'NASA-Project',
      description:
        'Back-end project for pre-packaged react front end. Allows schedule launches to habitable planets. Node, Jest, SuperTest',
      live: '', //this should be a link to the live version of your project, think github pages, netlify, heroku, etc. Or your own domain, if you have it.
      source: 'https://github.com/juliasut/NASA-Project', // this should be a link to the **repository** of the project, where the code is hosted.
      //image: mock1,
    },
    {
      title: 'Retired Not Tired',
      description:
        "Masterschool's group front-end project. Helps retired people stay active and in touch. React, Firebase, MUI",
      live: '',
      source: 'https://github.com/juliasut/Retired-Not-Tired.git',
      //image: mock2,
    },
  ],
};
