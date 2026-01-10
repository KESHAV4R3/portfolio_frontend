import { motion } from "framer-motion";
import { useMemo, useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentSection } from "../../redux/slice/applicationSlice";

// ----------------------------------------------------------------------
// REACT ICONS IMPORTS
// ----------------------------------------------------------------------
import { 
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGitAlt, FaGithub, 
  FaBootstrap, FaSass, FaJira, FaTerminal 
} from "react-icons/fa";
import { 
  SiTypescript, SiNextdotjs, SiRedux, SiTailwindcss, SiMui, 
  SiExpress, SiMongodb, SiVercel, SiPostman, SiRender 
} from "react-icons/si";
import { TbApi } from "react-icons/tb"; // For ApiDog (Proxy)
import { LuMousePointer2 } from "react-icons/lu"; // For Cursor AI (Proxy)
import { BiMessageDetail } from "react-icons/bi"; // For MSG91 (Proxy)

const SkillsSet = () => {
  const dispatch = useDispatch();
  const sectionRef = useRef(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          dispatch(updateCurrentSection("Skills"));
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [dispatch]);

  // ----------------------------------------------------------------------
  // TECH SKILLS DATA
  // ----------------------------------------------------------------------
  const techSkills = useMemo(
    () => [
      // Core
      { name: "HTML5", icon: FaHtml5, color: "#E34F26" },
      { name: "CSS3", icon: FaCss3Alt, color: "#1572B6" },
      { name: "JavaScript", icon: FaJs, color: "#F7DF1E" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "React", icon: FaReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
      
      // Styling
      { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Bootstrap", icon: FaBootstrap, color: "#7952B3" },
      { name: "Material UI", icon: SiMui, color: "#0081CB" },
      { name: "Sass", icon: FaSass, color: "#CC6699" },
      
      // Backend
      { name: "Node.js", icon: FaNodeJs, color: "#339933" },
      { name: "Express", icon: SiExpress, color: "#ffffff" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      
      // State
      { name: "Redux", icon: SiRedux, color: "#764ABC" },
      { name: "Redux Thunk", icon: SiRedux, color: "#9975D0" }, 
      
      // DevOps & Tools
      { name: "Git", icon: FaGitAlt, color: "#F05032" },
      { name: "GitHub", icon: FaGithub, color: "#ffffff" },
      { name: "Vercel", icon: SiVercel, color: "#ffffff" },
      { name: "Render", icon: SiRender, color: "#46E3B7" }, 
      
      // New Additions
      { name: "Cursor AI", icon: LuMousePointer2, color: "#FFFFFF" },
      { name: "Postman", icon: SiPostman, color: "#FF6C37" },
      { name: "ApiDog", icon: TbApi, color: "#5C4EE5" },
      { name: "Jira", icon: FaJira, color: "#0052CC" },
      { name: "MSG91", icon: BiMessageDetail, color: "#008CFF" },
    ],
    []
  );

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.2 },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, scale: 0.5, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 60, damping: 15 },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative min-h-screen py-24 px-6 md:px-12 w-full flex flex-col justify-center bg-[#050505] text-white overflow-hidden font-mono"
    >
      {/* ---------------- BACKGROUND ATMOSPHERE ---------------- */}
      
      {/* 1. Cyber Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(30,30,30,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(30,30,30,0.2)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>

      {/* 2. Grain */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none"></div>

      {/* 3. Dynamic Spotlight */}
      <motion.div
        className="absolute right-0 top-1/4 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none opacity-20 transition-colors duration-700 ease-in-out"
        animate={{
          backgroundColor: hoveredSkill ? hoveredSkill.color : "#3b82f6",
        }}
      />
      
      {/* 4. Static Glow */}
      <div className="absolute left-[-10%] bottom-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none"></div>


      {/* ---------------- CONTENT LAYOUT ---------------- */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        
        {/* LEFT COLUMN: TEXT INFO */}
        <motion.div
          className="lg:col-span-5 flex flex-col gap-6"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-blue-500/30 bg-blue-500/10 w-fit backdrop-blur-md">
             <FaTerminal className="text-blue-400 text-xs" />
             <span className="text-xs font-bold text-blue-400 tracking-widest uppercase">System_Modules</span>
          </div>

          {/* Heading */}
          <h2 className="text-5xl md:text-6xl font-bold leading-tight tracking-tighter">
            Tech <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">
              Arsenal
            </span>
          </h2>

          {/* Description */}
          <div className="space-y-4 text-gray-400 text-sm md:text-base leading-relaxed border-l-2 border-blue-500/50 pl-6">
            <p>
              Specialized in the <strong className="text-white">MERN ecosystem, Next.js </strong> architecting scalable full-stack applications with a focus on clean code and performance.
            </p>
            <p>
              Equipped with modern dev-ops tools like <span className="text-white">Render</span> and <span className="text-white">Docker</span>, and productivity boosters like <span className="text-white">Cursor AI</span>.
            </p>
          </div>

          {/* Terminal Logs */}
          <div className="pt-4 font-mono text-[10px] text-gray-600 space-y-1 bg-[#0a0a0a] p-4 rounded border border-gray-800">
             <p className="flex items-center gap-2"><span className="text-green-500">✔</span> INITIALIZING_CORE_MODULES...</p>
             <p className="flex items-center gap-2"><span className="text-green-500">✔</span> CONNECTING_TO_API_GATEWAY...</p>
             <p className="flex items-center gap-2"><span className="text-blue-500">ℹ</span> LOADED_25_DEPENDENCIES</p>
             <p className="animate-pulse">{">"} WAITING_FOR_INPUT_</p>
          </div>
        </motion.div>


        {/* RIGHT COLUMN: SKILLS GRID */}
        <motion.div
          className="lg:col-span-7"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {techSkills.map((skill, index) => {
              const IconComponent = skill.icon;

              return (
                <motion.div
                  key={index}
                  variants={itemVariant}
                  onHoverStart={() => setHoveredSkill(skill)}
                  onHoverEnd={() => setHoveredSkill(null)}
                  className="group relative flex flex-col items-center justify-center p-4 rounded-lg bg-[#0a0a0a] border border-white/5 backdrop-blur-sm transition-all duration-300 cursor-pointer hover:bg-[#111] hover:border-white/20 hover:shadow-2xl hover:-translate-y-1"
                  style={{ aspectRatio: "1/1" }}
                >
                  {/* Card Glow Effect */}
                  <div 
                      className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                      style={{ background: `radial-gradient(circle at center, ${skill.color}, transparent)` }}
                  ></div>

                  {/* Icon */}
                  <div className="relative z-10 text-3xl sm:text-4xl transition-all duration-300 group-hover:scale-110 flex items-center justify-center">
                    <IconComponent 
                        className="transition-all duration-300"
                        style={{ 
                            color: hoveredSkill === skill ? skill.color : "#525252", 
                            filter: hoveredSkill === skill ? `drop-shadow(0 0 15px ${skill.color}50)` : "none"
                        }}
                    />
                  </div>

                  {/* Label */}
                  <span 
                      className="mt-3 text-[9px] sm:text-[10px] font-bold tracking-wider text-gray-600 group-hover:text-white transition-colors duration-300 uppercase text-center"
                  >
                    {skill.name}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSet;