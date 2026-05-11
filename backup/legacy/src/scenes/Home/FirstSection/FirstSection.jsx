import s from './FirstSection.module.scss';
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

const FirstSection = () => {
  return (
    <section className={s.content}>
      {/* <div className={s.introduction}>
        <div className={s.introductionText}>
            <div className={s.description} >
            <p >
              A Full Stack Developer with 4 years of industry experience creating Cloud Web Applications.
            </p>
            <p>{info.bio}</p>
            <p>
               C/C++, C# .NET, Java, Python, JavaScript, TypeScript, SQL, React JS, React Native, Angular, and other relevant technologies. I have experience in integrating various third-party libraries, API development & integration with front end development.
            </p>

            <p>
              My field of interests are building new Cloud based Products and Web Platforms.
             </p>
          </div>
        </div>

        
      </div> */}

      <div className={s.introSocial}>
      <Tilt trackOnWindow={true}>
          <LazyLoadImage alt="avatar" effect="blur" src={avatar} />
        </Tilt>
        <h1>FIND ME ON</h1>
        
        <ul className={s.socialLinks}>
         <li className={s.socialLink}>
            <a
              href="https://www.linkedin.com/in/rajatgedam20/"
              target="_blank"
              rel="noreferrer"
              className={s.socialIcon}
              aria-label="linkedin"
            >
              <FaLinkedinIn />
            </a>
          </li>
          <li className={s.socialLink}>
            <a
              href="https://github.com/rajatgedam"
              target="_blank"
              rel="noreferrer"
              className={s.socialIcon}
              aria-label="github"
            >
              <AiFillGithub />
            </a>
          </li>
          {/* <li className={s.socialLink}>
            <a
              href="https://www.facebook.com/Snaychuk"
              target="_blank"
              rel="noreferrer"
              className={s.socialIcon}
              aria-label="facebook"
            >
              <FaFacebookSquare />
            </a>
          </li> */}
          {/* <li className={s.socialLink}>
            <a
              href="https://t.me/snaichuk_v"
              target="_blank"
              rel="noreferrer"
              className={s.socialIcon}
              aria-label="telegram"
            >
              <FaTelegramPlane />
            </a>
          </li> */}
          
        </ul>
        <p>
          Feel free to <span className={s.purple}>connect </span>with
          me
        </p>
      </div>
    </section>
  );
};

export default FirstSection;
