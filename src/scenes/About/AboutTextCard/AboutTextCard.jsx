import s from './AboutTextCard.module.scss';
import { ImPointRight } from 'react-icons/im';
import EmojiBullet from '../../../components/UIElements/Emoji/EmojiBullet';
import { Box } from '@mui/material';
import { info } from '../../../data/info';


const AboutTextCard = () => {
  return (
    <div className={s.card}>
      <p style={{ textAlign: 'justify' }}>
        {/* Hello again, I am{' '} */}
        
        {/* <span className={s.purple}>Rajat Gedam</span> */}
        Based in <span className={s.purple}> Phoenix AZ, USA </span> 
        I'm a software engineer with expertise in full stack development{' '} 
        using React, Angular, .NET, Python. 
        <br />

        <br />
        I have successfully identified and resolved complex issues 🎯, often working collaboratively with team members to develop creative solutions that deliver results. 
        <br />
        <br />
        I am a Software Engineer at Deloitte and I have a Master's degree in Computer Science. 🐳 
        <br /><br /> 
        Presently, I work on impactful client deliverables that transform the society for the greater good. My most recent project dealt with fast tracking applications at rehabilitation centers.
        The primary purpose of this application is reduce paperwork for the administrative team and reduce redunduncy in the data.📎
        <br /><br />
        My last engagement with the UMass Marine Sciences Department was deeply fulfilling, as I developed a powerful web application to streamline and enhance student degree progress tracking. Implemented AI 🤖 with Power BI to generate analytics 📊 and reports from graduate program data resulting in bird's eye view reports of all the students' current progress. 
        <br /><br />
        I previously worked for Yardi Systems, Santa Barbara, developing a co-working space management platform. (2018 - 2021) 
        <br /><br />
        At Yardi Systems, I tailored end-to-end solutions, from creating database schemas, tables, and developing <span className={s.purple}>REST APIs</span> to designing web pages for these services. In the <span className={s.purple}>AGILE</span> environment, I worked on implementating and maintaining new features, fixing bugs, defects and actively took part in code reviews.
        <br /><br />
        I used the frameworks .NET and React JS, Angular, Blazor with tools such as <span className={s.purple}>Datadog, Kibana, Postman, Swagger, Confluence and JIRA</span> for the software development life cycle activites at these positions. 
        <br /><br />
        🚀 I am looking for new opportunities and I'm willing to relocate. 
        <br /> <br />
        Apart from coding, some other activities that I love to do!
      </p>

      <Box component={'ul'} mt={'1rem'} p={'0.8rem'}>
          {info.hobbies.map((hobby, index) => (
            <EmojiBullet key={index} emoji={hobby.emoji} text={hobby.label} />
          ))}
        </Box>
      {/* <ul>
        <li className={s.aboutActivity}>
          <ImPointRight /> Travelling
        </li>
        <li className={s.aboutActivity}>
          <ImPointRight /> Reading
        </li>
        <li className={s.aboutActivity}>
          <ImPointRight /> Fitness Training
        </li>
      </ul> */}
    </div>
  );
};

export default AboutTextCard;
