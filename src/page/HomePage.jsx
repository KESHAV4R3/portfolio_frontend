import HeroSection from "../components/homePage/HeroSection";
import SkillsSet from "../components/homePage/SkillsSet";
import Footer from "../components/application/Footer";
import Car from "../components/homePage/Car";
import Projects from "../components/homePage/Projects";
import Contact from "../components/homePage/Contact";
import ServicesShowcase from "../components/homePage/ServicesShowcase";
const HomePage = () => {
  return (
    <div className={`overflow-hidde bg-gray-900`}>
      <HeroSection />
      <SkillsSet />
      <ServicesShowcase />
      <Projects />
      <Contact />
      {/* <Car /> */}
      <Footer />
    </div>
  );
};

export default HomePage;
