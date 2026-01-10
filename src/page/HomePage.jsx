import HeroSection from "../components/homePage/HeroSection";
import SkillsSet from "../components/homePage/SkillsSet";
import Footer from "../components/application/Footer";
import Car from "../components/homePage/Car";
import Projects from "../components/homePage/Projects";
import Contact from "../components/homePage/Contact";
import ServicesShowcase from "../components/homePage/ServicesShowcase";
import Experience from "../components/homePage/Experience";

const HomePage = () => {
  return (
    // Updated background to match the deep black theme (#050505) of all components
    <div className="w-full min-h-screen bg-[#050505] text-white selection:bg-blue-500/30 selection:text-blue-200">
      <HeroSection />
      <SkillsSet />
      <Experience />
      <ServicesShowcase />
      <Projects />
      <Contact />
      {/* <Car /> -- Uncomment if you want the 3D car model section back */}
      <Footer />
    </div>
  );
};

export default HomePage;