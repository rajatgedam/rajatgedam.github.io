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
              A Full Stack Developer with 4+ years of industry experience creating Cloud Web Applications.
            </p>
            <p>{info.bio}</p>
            <p>My skills include proficiency in <b className={s.purple}>{info.skillsDesc}</b> and other relevant technologies. I have experience in integrating various third-party libraries, developing API and creating front-end design.</p>
            {/* <p>
              
            </p> */}

            <p>
              My field of interests are building new Cloud based Products and Web Platforms.
              {/* <i>
                <b className={s.purple}> Cloud based Products and Web Platforms</b>
              </i> */}
            </p>
          </div>
        </div>
      </div>

    </section>
  );
};

export default IntroSection;
