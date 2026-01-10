import { useEffect, useRef, useCallback, useState } from "react";
import Typed from "typed.js";
import BikeModel from "../../../public/bikeModel/BikeModel";
import { motion, useAnimation, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useDispatch } from "react-redux";
import { updateCurrentSection } from "../../redux/slice/applicationSlice";
import resume_keshav from "../../assets/application/resume_keshav.pdf";

const HeroSection = () => {
  const [showResumeOptions, setShowResumeOptions] = useState(false);
  const sectionRef = useRef(null);
  const dispatch = useDispatch();
  const typedRef = useRef(null);
  const controls = useAnimation();
  
  // Parallax & Scroll transforms
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const rotateGrid = useTransform(scrollY, [0, 500], [0, 45]);

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const handleResumeClick = () => {
    setShowResumeOptions(true);
  };
  const handleViewResume = () => {
    window.open(resume_keshav, "_blank");
    setShowResumeOptions(false);
  };
  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = resume_keshav;
    link.download = "Keshav_Kumar_Resume.pdf";
    link.click();
    setShowResumeOptions(false);
  };

  const setRefs = useCallback(
    (node) => {
      ref(node);
      sectionRef.current = node;
    },
    [ref]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            dispatch(updateCurrentSection("Home"));
          }
        });
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: [
        "Full_Stack_Dev.exe",
        "MERN_Stack_Architect",
        "System_Engineer",
        "Bug_Hunter",
      ],
      loop: true,
      typeSpeed: 40,
      backSpeed: 20,
      backDelay: 1500,
      showCursor: true,
      cursorChar: "█",
    });

    return () => {
      typed.destroy();
    };
  }, []);

  // ---------------- ANIMATIONS ----------------
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const item = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { type: "spring", stiffness: 120 }
    },
  };

  // Glitch Effect Variant for Heading
  const glitchText = {
    hidden: { skew: 0 },
    visible: {
      skew: [0, -2, 2, 0],
      x: [0, -2, 2, 0],
      transition: { repeat: Infinity, repeatDelay: 4, duration: 0.5 }
    }
  };

  return (
    <section
      ref={setRefs}
      id="home"
      className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden bg-[#09090b] text-white selection:bg-green-500/30 selection:text-green-200 font-sans"
    >
      {/* ---------------- BACKGROUND / HACKER ATMOSPHERE ---------------- */}
      
      {/* 1. CRT Monitor Scanline Overlay (Subtle moving line) */}
      <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden opacity-10">
        <div className="w-full h-[2px] bg-green-400 absolute animate-scanline shadow-[0_0_20px_rgba(74,222,128,0.5)]"></div>
      </div>

      {/* 2. Cyber Grid Floor */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#22c55e1a_1px,transparent_1px),linear-gradient(to_bottom,#22c55e1a_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0 pointer-events-none"></div>

      {/* 3. Glowing Orbs (Cyber Blue & Green) */}
      <motion.div style={{ y: y1 }} className="absolute top-20 right-20 w-96 h-96 bg-green-500/10 rounded-full blur-[100px] z-0" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] z-0" />

      {/* 4. Random Floating Binary / Code Snippets */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-green-500/20 font-mono text-sm"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "-100%", opacity: [0, 1, 0] }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
            style={{ left: `${Math.random() * 100}%` }}
          >
            {Math.random() > 0.5 ? "01001" : "<code>"}
          </motion.div>
        ))}
      </div>


      {/* ---------------- MAIN CONTENT ---------------- */}
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-8 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 relative z-10 pt-24 lg:pt-0">
        
        {/* LEFT: TEXT CONTENT */}
        <motion.div
          className="w-full lg:w-1/2 flex flex-col items-start text-left"
          variants={container}
          initial="hidden"
          animate={controls}
        >
          {/* Status Badge */}
          <motion.div variants={item} className="flex items-center gap-2 mb-6 border border-green-500/30 bg-green-900/10 px-3 py-1 rounded-sm backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-green-400 text-xs font-mono tracking-widest uppercase">System Online</span>
          </motion.div>

          {/* Name Heading with Tech Gradient */}
          <motion.h1 variants={item} className="text-5xl sm:text-7xl font-bold leading-tight mb-4 tracking-tight">
            Hi, I'm <br />
            <motion.span 
              variants={glitchText}
              className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-green-100 to-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]"
            >
              Keshav Kumar
            </motion.span>
          </motion.h1>

          {/* Terminal Typed Effect */}
          <motion.div variants={item} className="flex items-center gap-2 text-lg sm:text-2xl md:text-3xl font-mono text-gray-400 mb-8 h-8">
            <span className="text-green-500">{">"}</span>
            <span ref={typedRef} className="text-green-400 font-semibold"></span>
          </motion.div>

          {/* Description */}
          <motion.p variants={item} className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-lg mb-10 border-l-2 border-green-500/20 pl-4">
            <span className="text-green-500 font-mono">const mission =</span> "Engineering robust digital solutions with a focus on security, performance, and user experience.";
          </motion.p>

          {/* Hacking Style Buttons */}
          <motion.div variants={item} className="flex flex-wrap gap-5 w-full font-mono">
            
            {/* Primary Command Button */}
            <a
              href="#projects"
              className="group relative px-8 py-3 bg-green-600/10 border border-green-500 text-green-400 hover:bg-green-500 hover:text-black transition-all duration-300 rounded-sm overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>./view_projects</span>
              </span>
              <div className="absolute inset-0 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </a>

            {/* Secondary Command Button */}
            <a
              href="#contact"
              className="group px-8 py-3 bg-transparent border border-gray-700 text-gray-300 hover:border-blue-400 hover:text-blue-400 transition-all duration-300 rounded-sm"
            >
              contact_me()
            </a>

             {/* Resume Button */}
             <button
              onClick={handleResumeClick}
              className="relative overflow-hidden group px-6 py-3 rounded-lg border border-green-500/20 bg-gradient-to-r from-green-900/20 to-emerald-900/10 text-green-400 hover:from-green-900/30 hover:to-emerald-900/20 hover:border-green-400/40 hover:text-green-300 transition-all duration-300 shadow-lg shadow-green-900/10 hover:shadow-green-500/20"
            >
              <span className="relative z-10 flex items-center gap-2 font-mono text-sm">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Download_CV()
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
            </button>
          </motion.div>
        </motion.div>


        {/* RIGHT: 3D MODEL & HOLOGRAPHIC STAGE */}
        <motion.div
          className="w-full lg:w-1/2 h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center relative perspective-1000"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
           {/* Holographic Circle Base */}
           <motion.div 
             style={{ rotateX: 70, rotateZ: rotateGrid }}
             className="absolute bottom-10 w-[300px] h-[300px] border-2 border-green-500/30 rounded-full bg-[radial-gradient(circle,rgba(34,197,94,0.1)_0%,transparent_70%)] z-0 shadow-[0_0_30px_rgba(34,197,94,0.2)]"
           >
              {/* Spinning inner rings */}
              <div className="absolute inset-2 border border-dashed border-green-500/20 rounded-full animate-spin-slow"></div>
              <div className="absolute inset-8 border border-dotted border-blue-500/30 rounded-full animate-reverse-spin"></div>
           </motion.div>
           
           <div className="relative z-10 w-full h-full hover:scale-105 transition-transform duration-500">
             <BikeModel />
           </div>

           {/* Tech Decoration Lines */}
           <div className="absolute top-1/4 right-0 w-20 h-[1px] bg-gradient-to-l from-green-500 to-transparent"></div>
           <div className="absolute bottom-1/4 left-0 w-20 h-[1px] bg-gradient-to-r from-blue-500 to-transparent"></div>
        </motion.div>
      </div>


      {/* ---------------- RESUME MODAL (SYSTEM PROMPT STYLE) ---------------- */}
      {showResumeOptions && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm font-mono"
          onClick={() => setShowResumeOptions(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-[#0c0c0e] border border-green-500/40 rounded-sm shadow-[0_0_50px_rgba(34,197,94,0.1)] relative overflow-hidden"
          >
            {/* Terminal Header */}
            <div className="bg-green-900/20 border-b border-green-500/20 p-2 px-4 flex justify-between items-center">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
                <span className="text-xs text-green-400">root@portfolio:~</span>
            </div>

            <div className="p-8">
                <h3 className="text-xl font-bold text-white mb-2">Execute Resume Action?</h3>
                <p className="text-gray-400 mb-6 text-sm border-l-2 border-blue-500 pl-3">
                    Select a protocol to access the document <br/>
                    <span className="text-xs text-gray-500">ID: KESHAV_RESUME_V1.0</span>
                </p>
                
                <div className="space-y-3">
                <button
                    onClick={handleViewResume}
                    className="w-full py-3 px-4 bg-transparent border border-gray-600 hover:border-green-400 hover:text-green-400 hover:bg-green-900/10 text-gray-300 transition-all flex items-center justify-between group"
                >
                    <span>{">"} View_in_Browser</span>
                    <span className="text-green-500 opacity-0 group-hover:opacity-100">●</span>
                </button>
                
                <button
                    onClick={handleDownloadResume}
                    className="w-full py-3 px-4 bg-green-600 hover:bg-green-500 text-black font-bold transition-all shadow-lg shadow-green-900/20"
                >
                    DOWNLOAD_PDF
                </button>
                
                <button
                    onClick={() => setShowResumeOptions(false)}
                    className="w-full py-2 text-xs text-center text-gray-600 hover:text-red-400 mt-2"
                >
                    [ Abort Process ]
                </button>
                </div>
            </div>
          </motion.div>
        </div>
      )}
      
      {/* CSS for Scanline Animation */}
      <style jsx global>{`
        @keyframes scanline {
          0% { top: 0%; }
          100% { top: 100%; }
        }
        .animate-scanline {
          animation: scanline 3s linear infinite;
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        .animate-reverse-spin {
            animation: spin 12s linear infinite reverse;
        }
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;