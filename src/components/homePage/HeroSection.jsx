import { useEffect, useRef, useState, useCallback } from "react";
import Typed from "typed.js";
import BikeModel from "../../../public/bikeModel/BikeModel";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useDispatch } from "react-redux";
import { updateCurrentSection } from "../../redux/slice/applicationSlice";
import resume_keshav from "../../assets/application/resume_keshav.pdf";

const HeroSection = () => {
  const [showResumeOptions, setShowResumeOptions] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dispatch = useDispatch();
  const typedRef = useRef(null);
  const controls = useAnimation();

  const [ref, inView] = useInView({ threshold: 0.1 });

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    if (inView) {
      dispatch(updateCurrentSection("Home"));
      controls.start("visible");
    }
  }, [inView, controls, dispatch]);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: ["Full_Stack_Dev.exe", "MERN_Stack_Architect", "System_Engineer", "Bug_Hunter"],
      loop: true,
      typeSpeed: 40,
      backSpeed: 20,
      backDelay: 1500,
      showCursor: true,
      cursorChar: "█",
    });
    return () => typed.destroy();
  }, []);

  const handleViewResume = () => { window.open(resume_keshav, "_blank"); setShowResumeOptions(false); };
  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = resume_keshav;
    link.download = "Keshav_Kumar_Resume.pdf";
    link.click();
    setShowResumeOptions(false);
  };

  return (
    <section ref={ref} id="home" className="relative min-h-screen w-full flex flex-col justify-center bg-[#09090b] text-white font-mono overflow-hidden">
      {/* Optimized Background - No moving SVGs for performance */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#22c55e0a_1px,transparent_1px),linear-gradient(to_bottom,#22c55e0a_1px,transparent_1px)] bg-[size:50px_50px] opacity-20 pointer-events-none" />
      <div className="absolute top-20 right-20 w-72 h-72 bg-green-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full px-6 flex flex-col-reverse lg:flex-row items-center z-10">
        <motion.div 
          className="w-full lg:w-1/2 mt-12 lg:mt-0"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{ visible: { opacity: 1, y: 0 } }}
        >
          <div className="inline-flex items-center gap-2 mb-6 border border-green-500/30 bg-[#0a1a0a] px-3 py-1 text-green-400 text-xs uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> System Online
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-4">
            Hi, I'm <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-green-400">Keshav Kumar</span>
          </h1>

          <div className="text-xl md:text-3xl text-green-400 mb-8 h-8">
            <span className="text-white mr-2">{">"}</span>
            <span ref={typedRef}></span>
          </div>

          <p className="text-gray-400 text-base md:text-lg max-w-lg mb-10 border-l-2 border-green-500/20 pl-4">
            <span className="text-green-500">const mission =</span> "Engineering robust digital solutions with a focus on security, performance, and user experience.";
          </p>

          <div className="flex flex-wrap gap-5">
            <a href="#projects" className="px-8 py-3 bg-green-600 text-black font-bold hover:bg-green-500 transition-all">./view_projects</a>
            <a href="#contact" className="px-8 py-3 border border-gray-700 text-gray-300 hover:border-blue-400 transition-all">contact_me()</a>
            <button onClick={() => setShowResumeOptions(true)} className="px-8 py-3 text-gray-400 hover:text-white underline decoration-green-500 underline-offset-8">Download_CV</button>
          </div>
        </motion.div>

        <div className="w-full lg:w-1/2 h-[350px] md:h-[500px] relative flex items-center justify-center">
           {!isMobile ? <BikeModel /> : <div className="w-64 h-64 bg-green-500/10 rounded-full blur-[80px] animate-pulse" />}
        </div>
      </div>

      {/* Simplified Modal - High Speed */}
      {showResumeOptions && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4" onClick={() => setShowResumeOptions(false)}>
          <div className="w-full max-w-sm bg-[#0c0c0e] border border-green-500/40 p-8 text-center" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold mb-6">Execute Resume Action?</h3>
            <div className="space-y-3">
              <button onClick={handleViewResume} className="w-full py-3 border border-gray-700 hover:border-green-500 text-white transition-all">View_in_Browser</button>
              <button onClick={handleDownloadResume} className="w-full py-3 bg-green-600 text-black font-bold hover:bg-green-500 transition-all">DOWNLOAD_PDF</button>
              <button onClick={() => setShowResumeOptions(false)} className="block w-full text-xs text-gray-500 pt-4">[ Abort ]</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;