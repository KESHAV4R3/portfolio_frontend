import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { updateCurrentSection } from "../../redux/slice/applicationSlice";

// Assets
import edunest from "../../assets/projects/edunest.png";
import portfolio from "../../assets/projects/portfolio.png";
import serch from "../../assets/projects/serch.png";

// Icons
import { FaTerminal, FaCode, FaExternalLinkAlt, FaGithub } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const dispatch = useDispatch();
  
  // State for Modal
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          dispatch(updateCurrentSection("Projects"));
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [dispatch]);

  // GSAP Animation Setup
  useEffect(() => {
    const trigger = triggerRef.current;
    
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".project-card-wrapper");
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trigger,
          start: "top top",
          end: "+=3000",
          pin: true,
          scrub: 1, 
          snap: {
            snapTo: 1 / (cards.length - 1),
            duration: 0.5,
            delay: 0.1,
            ease: "power1.inOut"
          },
          onUpdate: (self) => {
            const index = Math.round(self.progress * (cards.length - 1));
            setActiveProjectIndex(index);
          }
        }
      });

      tl.to(cards, {
        xPercent: -100 * (cards.length - 1),
        ease: "none",
      });

    }, triggerRef);

    return () => ctx.revert();
  }, []);

  const projects = [
    {
      id: "LOG_01",
      title: "EduNest_Platform",
      category: "LMS_Protocol",
      description: "Comprehensive MERN stack architecture for course management. Features role-based access control (RBAC), secure JWT authentication handshake, and Razorpay payment gateway integration.",
      imageUrl: edunest,
      tags: ["React_Engine", "Node_Core", "MongoDB_DB", "Redux_State", "JWT_Auth"],
      links: {
        live: "https://edunestedtech.vercel.app/",
        code: "https://github.com/KESHAV4R3/EduNest"
      }
    },
    {
      id: "LOG_02",
      title: "Portfolio_V2",
      category: "Identity_Mainframe",
      description: "High-performance digital identity system. Utilizing React and GSAP for 3D spatial rendering. Includes dynamic theme switching matrix and secure Nodemailer backend uplink.",
      imageUrl: portfolio,
      tags: ["React_Core", "GSAP_Anim", "Three_JS", "Tailwind_CSS"],
      links: {
        live: "https://portfolio-frontend-lac-theta.vercel.app/",
        code: "https://github.com/KESHAV4R3/Portfolio"
      }
    },
    {
      id: "LOG_03",
      title: "SERCH_Engine",
      category: "Data_Crawler",
      description: "Multi-threaded search aggregation tool. Integrates RapidAPI endpoints to parse web, image, and news data streams. Features real-time query suggestions and Glassmorphic UI layer.",
      imageUrl: serch,
      tags: ["React_Core", "Redux_Toolkit", "REST_API", "Glass_UI"],
      links: {
        live: "https://github.com/KESHAV4R3/s_e_r_c_h",
        code: "https://github.com/KESHAV4R3/s_e_r_c_h"
      }
    },
  ];

  return (
    <div ref={triggerRef} className="bg-[#050505] text-green-500 font-mono">
      <section
        ref={sectionRef}
        id="projects"
        className="relative h-screen overflow-hidden flex flex-col justify-center"
      >
        {/* ---------------- BACKGROUND ATMOSPHERE ---------------- */}
        <div className="absolute inset-0 pointer-events-none">
            {/* Cyber Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            {/* Scanline Overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05]"></div>
            {/* Glows */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-900/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-900/10 rounded-full blur-[100px] pointer-events-none"></div>
        </div>

        {/* 1. Hacker Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 relative z-10"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-500 text-xs tracking-widest uppercase">Database_Access: Granted</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-4 text-white">
            Project_<span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Directory</span>
          </h2>
          <p className="text-green-700 text-sm">
            {`> SELECT * FROM PROJECTS WHERE STATUS = 'COMPLETED'`}
          </p>
        </motion.div>

        {/* 2. Horizontal Scroll Container */}
        <div className="flex items-center h-[60vh] mt-8 w-max px-[10vw] gap-12 md:gap-24 relative z-10">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card-wrapper w-[85vw] md:w-[800px] h-full flex-shrink-0 perspective-1000"
            >
              <ProjectCard
                project={project}
                index={index}
                onClick={() => setSelectedProject(project)}
              />
            </div>
          ))}
        </div>

        {/* Progress Bar (Hacker Style) */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-green-900/20">
            <motion.div 
                className="h-full bg-green-500 shadow-[0_0_10px_#22c55e]"
                initial={{ width: 0 }}
                animate={{ width: `${((activeProjectIndex + 1) / projects.length) * 100}%` }}
                transition={{ ease: "linear" }}
            />
        </div>

      </section>

      {/* 3. The Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// =========================================================================
// COMPONENT: PROJECT CARD (Terminal File)
// =========================================================================
const ProjectCard = ({ project, index, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group relative w-full h-full bg-[#0a0a0a] border border-green-900/30 hover:border-green-500/50 transition-all duration-500 cursor-pointer overflow-hidden rounded-sm"
    >
      {/* Terminal Header Bar */}
      <div className="absolute top-0 left-0 w-full h-8 bg-green-900/10 border-b border-green-900/30 flex items-center justify-between px-4 z-20">
         <span className="text-[10px] text-green-600 font-bold tracking-widest">{project.id} // READ_ONLY</span>
         <div className="flex gap-1.5">
            <div className="w-2 h-2 bg-green-500/20 rounded-full"></div>
            <div className="w-2 h-2 bg-green-500/20 rounded-full"></div>
         </div>
      </div>

      {/* 1. Full Image (Initial State) */}
      <div className="absolute inset-0 z-0 overflow-hidden mt-8">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover opacity-60 group-hover:opacity-30 group-hover:scale-105 group-hover:blur-sm transition-all duration-700 ease-in-out grayscale group-hover:grayscale-0"
          loading="lazy"
        />
        {/* Scanline Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] opacity-20 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent"></div>
      </div>

      {/* 2. Content (Slide Up) */}
      <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end">
        
        <div className="transform translate-y-[100px] group-hover:translate-y-0 transition-transform duration-500 ease-[0.22, 1, 0.36, 1]">
            
            <div className="border-l-2 border-green-500 pl-4 mb-4">
                <h3 className="text-3xl font-bold text-white mb-1 tracking-tighter">
                    {project.title}
                </h3>
                <p className="text-green-500 text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity delay-75 duration-300">
                    [{project.category}]
                </p>
            </div>

            {/* Hidden Details */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity delay-150 duration-500 space-y-4">
                <p className="text-gray-400 text-sm line-clamp-2 font-sans">
                    {project.description}
                </p>
                
                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="text-[10px] uppercase font-bold px-2 py-1 bg-green-900/20 border border-green-500/20 text-green-400">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Main Action Button */}
                <button className="w-full py-3 mt-4 bg-green-700 hover:bg-green-600 text-black font-bold text-xs uppercase tracking-[0.2em] rounded-sm transition-all shadow-[0_0_15px_rgba(21,128,61,0.3)] flex items-center justify-center gap-2 group-active:scale-95">
                    <span>INITIALIZE_ANALYSIS</span>
                    <FaTerminal className="w-3 h-3" />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// COMPONENT: PROJECT MODAL (System Log)
// =========================================================================
const ProjectModal = ({ project, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-[#0c0c0c] border border-green-900 rounded-sm shadow-[0_0_50px_rgba(0,255,0,0.1)] overflow-hidden relative font-mono"
      >
        {/* Terminal Top Bar */}
        <div className="bg-[#111] px-4 py-2 border-b border-green-900 flex justify-between items-center">
            <span className="text-xs text-green-500">ROOT_USER/PROJECTS/{project.id}.EXE</span>
            <button 
                onClick={onClose}
                className="text-green-700 hover:text-green-400 transition-colors text-xs uppercase"
            >
                [CLOSE_WINDOW]
            </button>
        </div>

        {/* Modal Header Image */}
        <div className="relative h-48 w-full group">
            <img 
                src={project.imageUrl} 
                alt={project.title} 
                className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] to-transparent"></div>
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.8)_50%)] bg-[size:100%_4px] opacity-30 pointer-events-none"></div>
            
            <div className="absolute bottom-4 left-6">
                <h2 className="text-3xl font-bold text-white tracking-tighter">{project.title}</h2>
                <div className="flex items-center gap-2 mt-1">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-green-400 text-xs uppercase">{project.category} // DEPLOYED</span>
                </div>
            </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8">
            <div className="mb-6 p-4 border border-green-900/30 bg-[#0a0a0a]">
                <p className="text-gray-400 text-sm leading-relaxed">
                    <span className="text-green-600 mr-2">{`>>`}</span>
                    {project.description}
                </p>
            </div>

            <div className="mb-8">
                <h4 className="text-xs font-bold text-green-600 uppercase tracking-wider mb-3 border-b border-green-900/30 pb-1 w-fit">Tech_Stack_Array</h4>
                <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                        <span key={i} className="px-2 py-1 text-[10px] font-bold text-black bg-green-900/40 border border-green-500/30 rounded-sm text-green-300">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-green-900/30">
                <a
                    href={project.links.live}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-3 bg-green-700 hover:bg-green-600 text-black text-xs font-bold uppercase tracking-widest text-center rounded-sm transition-all shadow-lg shadow-green-900/20 flex items-center justify-center gap-2"
                >
                    <FaExternalLinkAlt /> Execute Live Demo
                </a>
                <a
                    href={project.links.code}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-3 bg-transparent border border-green-700 hover:border-green-500 text-green-500 hover:text-green-400 text-xs font-bold uppercase tracking-widest text-center rounded-sm transition-all flex items-center justify-center gap-2"
                >
                    <FaGithub /> Access Source
                </a>
            </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Projects;