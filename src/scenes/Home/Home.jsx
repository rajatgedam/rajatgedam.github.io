import MainSection from './MainSection/MainSection';
import IntroSection from './IntroSection/IntroSection';
import FirstSection from './FirstSection/FirstSection';
import HomeLayout from '../../layouts/HomeLayout/HomeLayout';
import SectionBG from '../../components/UIElements/SectionBG/SectionBG';

const Home = () => {
  return (
    <HomeLayout>
      <SectionBG>
        <MainSection />
      </SectionBG>

      <IntroSection />
      <FirstSection />
    </HomeLayout>
  );
};

export default Home;
