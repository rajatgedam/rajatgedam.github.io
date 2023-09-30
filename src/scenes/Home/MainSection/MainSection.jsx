import s from './MainSection.module.scss';
import homeMainIcon from '../../../assets/home-main.svg';
import Typewriter from '../../../components/UIElements/Typewriter/Typewriter';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import EmojiBullet from '../../../components/UIElements/Emoji/EmojiBullet';
import { Box } from '@mui/material';
import { info } from '../../../data/info';

const MainSection = () => {
 

  return (
    <section className={s.content}>
      <div className={s.header}>
        <h2 style={{ paddingBottom: 15 }} className={s.title}>
          Hi There! <span className={s.wave}>👋🏻</span>
        </h2>

        <h1 className={s.mainTitle}>
          I AM
          <strong className={s.mainName}> RAJAT GEDAM </strong>
        </h1>

        <div style={{ paddingTop: 50, height: '8.0em' }}>
          <Typewriter
            strings={[ 
              'Software Engineer',
              'Full Stack Developer   ', //◕‿↼ 
              'Web Developer  ', //(ಠ‿ಠ)              
              'French Fries Lover ◕‿↼ ' //(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ 
            ]}
            wrapperClassName={s.typewriterWrapper}
            cursorClassName={s.typewriterCursor}
          />         
        </div>
        <div>
        <Box component={'ul'} mt={'1rem'} p={'0.8rem'}>
          {info.miniBio.map((bio, index) => (
            <EmojiBullet key={index} emoji={bio.emoji} text={bio.text} />
          ))}
        </Box>
        </div>
      </div>

      <LazyLoadImage
        alt="home-img"
        effect="blur"
        src={homeMainIcon}
        wrapperClassName={s.homeMainIcon}
        width="396"
        height="400"
      />
    </section>
  );
};

export default MainSection;
