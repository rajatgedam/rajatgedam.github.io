import msystem from '../data/projectImages/1_MSCapstone.png';
import chicagocrimes from '../data/projectImages/2_ChicagoCrimesMU.png';
import IoTimg from '../data/projectImages/3_AWS_IoT_Core.jpg';
import HDMasking from '../data/projectImages/4_Health_Data_Masking.jpg';
import NetX from '../data/projectImages/5_NetworkX.png';
import MovieApp from '../data/projectImages/6_MovieRating.png';

const data = [
  {
    id: '1',
    title: 'Cancer Diagnosis System',
    description:
      'Masters Capstone: Cancer Diagnosis System is a Microservices application which runs machine learning algorithms on input datasets. It makes use of an Anomaly Detection Framework to process cancer datasets and generate performance metrics.',
    image: {
      src: msystem,
      placeholderSrc:
        'CDS',
    },
    links: {
      repo: 'https://github.com/rajatgedam/microservices-ml-project',
    },
    technologies: [
      '#microservices',
      '#python flask',
      '#sci-kit-learn',
      '#docker',
      '#design-patterns',
      '#react-js',
      '#ml-anomaly-detection',
    ],
  },
  {
    id: '2',
    title: 'Crime Data Visualization',
    description:
      'A visualization of crime trends in the Chicago area, between 2 years pre and post Covid-19 pandemic. Portrays the effect of the pandemic on crime rates and the frequency of crime based on Chicago Crime dataset. The dataset is maintained live by City of Chicago public website. Built using D3.js library. ',
    image: {
      src: chicagocrimes,
      placeholderSrc:
        'CC',
    },
    links: {
      site: 'https://rajatgedam.github.io/ChicagoCrimesVisualization/',
      repo: 'https://github.com/rajatgedam/ChicagoCrimesVisualization'
    },
    technologies: [
      '#javascript',
      '#D3.js',
      '#Web-API',
      '#Git',
      '#HTML',
      '#CSS',
    ],
  },
  {
    id: '3',
    title: 'Real-Time IoT Device Monitoring',
    description:
      'AWS Cloud based solution for monitoring IoT devices. Users can track time series data on device connectivity and activity, helping users react quickly to changing conditions and emerging situations.',
    image: {
      src: IoTimg,
      placeholderSrc:
        'IoT',
    },
    links: {
      // site: '',
      // repo: '',
    },
    technologies: [
      '#aws-iot-core',
      '#aws-CloudFormation',
      '#amazon-kinesis',
      '#amazon-S3',
      '#amazon-Dynamo-DB',
      '#aws-lambda',
      '#anomaly-detection',
    ],
  },
  {
    id: '4',
    title: 'AI- Powered Health Data Masking Service',
    description:
      'The AI-Powered Health Data Masking solution helps customers identify and mask health data in images or text. This solution uses Amazon Comprehend Medical to detect health data in a body of text, Amazon Rekognition to identify text in an image, Amazon API Gateway and AWS Lambda to provide an API interface for this functionality, and AWS Identity and Access Management (IAM) to authorize API requests.',
    image: {
      src: HDMasking,
      placeholderSrc:
        'AI- Powered Health Data Masking',
    },
    links: {
      // site: 'https://apiko-marketplace-app-snaichuk.herokuapp.com/',
      // repo: 'https://github.com/vsnaichuk/apiko-marketplace-app-snaichuk',
    },
    technologies: [
      '#amazon-api-gateway',
      '#amazon-S3',
      '#aws-lambda',
      '#amazon-comprehend-medical',
      '#amazon-rekognition',
      '#aws-CloudFormation'
    ],
  },
  {
    id: '5',
    title: ' Research Publications Data Network',
    description:
      'A Network X visualization created using research publications data. There are about 550 nodes which contain the information - Title, Year, Citations and Publication. The edges are based on citation, year, and author as common links. The data was cleaned using Jupyter Notebook and then exported as a json data file. D3.js was applied to json data.',
    image: {
      src: NetX,
      placeholderSrc:
        'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzIDIiPjwvc3ZnPg==',
    },
    links: {
      site: 'https://rajatgedam.github.io/NetworkXd3vizRajat.github.io/',
      repo: 'https://github.com/rajatgedam/NetworkXd3vizRajat.github.io',
    },
    technologies: [
      '#d3.js',
      '#jupyter-notebook',
      '#javascript',
      '#python',
      '#json',
      '#data-science'
    ],
  },
  {
    id: '6',
    title: 'Movie Rating App',
    description:
      'A Movie Rating application built with Angular that includes movies descriptions, list management with user authentication login/register. The app is deployed using Firebase.',
    image: {
      src: MovieApp,
      placeholderSrc:
        'Moving Rating',
    },
    links: {
      site: 'https://angular-movie-rating-2510f.firebaseapp.com',
      repo: 'https://github.com/rajatgedam/movietask',
    },
    technologies: [
      '#angular',
      '#firebase',
      '#github',
      '#nodejs'
    ],
  },
  // {
  //   id: '7',
  //   title: 'Places Mobile App',
  //   description:
  //     'A Mobile application for sharing places that people visit from all over the world. Uses React Native, TypeScript, MobX and Native Device Features',
  //   image: {
  //     src: 'https://res.cloudinary.com/dx6tl6aa2/image/upload/v1628348073/portfolio/projects/rn-places/rn-places-lg_ljyikm.jpg',
  //     placeholderSrc:
  //       'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzIDIiPjwvc3ZnPg==',
  //   },
  //   links: {
  //     site: 'https://expo.dev/@v_snaichuk/rn-places',
  //     repo: 'https://github.com/vsnaichuk/RN-places',
  //   },
  //   technologies: [
  //     '#react-native',
  //     '#typescript',
  //     '#expo',
  //     '#mobx',
  //     '#sqlite',
  //     '#react-native-maps',
  //     '#expo-location',
  //   ],
  // },
  // {
  //   id: '8',
  //   title: 'Shopping Cart',
  //   description:
  //     'Simple eCommerce cart application built with React and TypeScript. Uses SWR hook to fetch the data from the API and Styled Components',
  //   image: {
  //     src: 'https://res.cloudinary.com/dx6tl6aa2/image/upload/v1628348073/portfolio/projects/react-shop-cart/rn-shop-cart-lg_w3qxn6.jpg',
  //     placeholderSrc:
  //       'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzIDIiPjwvc3ZnPg==',
  //   },
  //   links: {
  //     site: 'https://shopping-cart-sv.netlify.app/',
  //     repo: 'https://github.com/vsnaichuk/React-ShoppingCart',
  //   },
  //   technologies: [
  //     '#react',
  //     '#typescript',
  //     '#material-ui',
  //     '#styled-components',
  //     '#swr',
  //     '#fakestoreapi',
  //   ],
  // },
];

export default data;
