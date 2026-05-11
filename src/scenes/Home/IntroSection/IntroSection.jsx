import s from './IntroSection.module.scss';
import avatar from '../../../assets/avatar.svg';
import { AiFillGithub } from 'react-icons/ai';
import {
  FaFacebookSquare,
  FaLinkedinIn,
  FaTelegramPlane,
} from 'react-icons/fa';
import Tilt from 'react-parallax-tilt';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Box } from '@mui/material';
import { info } from '../../../data/info';

const IntroSection = () => {
  return (
    <section className={s.content}>
      <div className={s.introduction}>
        <div className={s.introductionText}>
          <h1 className={s.title}>
            {/* LET ME  */}
            <span className={s.purple}> INTRODUCTION </span>{' '}
            {/* MYSELF */}
          </h1>

          <div className={s.description} >
            <p >
              A Full Stack Developer with 6+ years of industry experience creating Cloud Web Applications.
            </p>
            <p>{info.bio}</p>
            <p>I bring a strong technical foundation with proficiency in C/C++, C# .NET, Java, Python, JavaScript, TypeScript, and SQL, complemented by expertise in modern frontend frameworks like Angular, React JS, React Native, and Blazor. With hands-on experience in .NET 8, EF Core, Postgres, and SQL, I specialize in building scalable APIs, integrating third-party libraries, and crafting intuitive front-end experiences. Additionally, I have worked extensively with AWS and Azure, leveraging cloud technologies to deliver robust, high-performance solutions.</p>
            {/* <p>
              My skills include proficiency in <b className={s.purple}>{info.skillsDesc}</b> and other relevant technologies. I have experience in integrating various third-party libraries, developing API and creating front-end design.
            </p> */}

            <p>
            I am passionate about developing cutting-edge cloud-based products and scalable web platforms, leveraging modern technologies to drive innovation and performance.
              {/* <i>
                <b className={s.purple}> Cloud based Products and Web Platforms</b> My field of interests are building new Cloud based Products and Web Platforms.
              </i> */}
            </p>
          </div>
        </div>
      </div>

    </section>
  );
};

export default IntroSection;
