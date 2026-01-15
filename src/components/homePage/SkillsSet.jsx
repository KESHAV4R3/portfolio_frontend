import { motion } from "framer-motion";
import { useMemo, useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentSection } from "../../redux/slice/applicationSlice";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGitAlt, FaGithub, FaBootstrap, FaSass, FaJira, FaTerminal } from "react-icons/fa";
import { SiTypescript, SiNextdotjs, SiRedux, SiTailwindcss, SiMui, SiExpress, SiMongodb, SiVercel, SiPostman, SiRender } from "react-icons/si";
import { TbApi } from "react-icons/tb"; 
import { LuMousePointer2 } from "react-icons/lu"; 
import { BiMessageDetail } from "react-icons/bi";

const SkillsSet = () => {
  const dispatch = useDispatch();
  const sectionRef = useRef(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver((e) => { 
      if (e[0].isIntersecting) dispatch(updateCurrentSection("Skills")); 
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [dispatch]);

  // Animation variants for the icons
  const iconVariants = {
    initial: { 
      y: 0,
      rotate: 0
    },
    animate: (i) => ({
      y: [0, -10, 0, -5, 0],
      rotate: [0, 2, -2, 1, 0],
      transition: {
        duration: 4,
        delay: i * 0.1,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    })
  };

  const techSkills = useMemo(() => [
    { name: "HTML5", icon: FaHtml5, color: "#E34F26" }, 
    { name: "CSS3", icon: FaCss3Alt, color: "#1572B6" },
    { name: "JavaScript", icon: FaJs, color: "#F7DF1E" }, 
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    { name: "React", icon: FaReact, color: "#61DAFB" }, 
    { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
    { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" }, 
    { name: "Bootstrap", icon: FaBootstrap, color: "#7952B3" },
    { name: "Material UI", icon: SiMui, color: "#0081CB" }, 
    { name: "Sass", icon: FaSass, color: "#CC6699" },
    { name: "Node.js", icon: FaNodeJs, color: "#339933" }, 
    { name: "Express", icon: SiExpress, color: "#ffffff" },
    { name: "MongoDB", icon: SiMongodb, color: "#47A248" }, 
    { name: "Redux", icon: SiRedux, color: "#764ABC" },
    { name: "Redux Thunk", icon: SiRedux, color: "#9975D0" }, 
    { name: "Git", icon: FaGitAlt, color: "#F05032" },
    { name: "GitHub", icon: FaGithub, color: "#ffffff" }, 
    { name: "Vercel", icon: SiVercel, color: "#ffffff" },
    { name: "Render", icon: SiRender, color: "#46E3B7" }, 
    { name: "Cursor AI", icon: LuMousePointer2, color: "#FFFFFF" },
    { name: "Postman", icon: SiPostman, color: "#FF6C37" }, 
    { name: "ApiDog", icon: TbApi, color: "#5C4EE5" },
    { name: "Jira", icon: FaJira, color: "#0052CC" }, 
    { name: "MSG91", icon: BiMessageDetail, color: "#008CFF" },
  ], []);

  return (
    <section ref={sectionRef} id="skills" className="relative min-h-screen py-24 bg-[#050505] text-white font-mono">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 z-10 relative">
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-blue-500/30 bg-blue-500/10 text-xs font-bold text-blue-400 uppercase tracking-widest">
            <FaTerminal /> System_Modules
          </div>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter">Tech <br /> <span className="text-gray-500">Arsenal</span></h2>
          <div className="space-y-4 text-gray-400 text-sm md:text-base border-l-2 border-blue-500/50 pl-6">
            <p>Specialized in the <strong className="text-white">MERN ecosystem, Next.js</strong> architecting scalable applications.</p>
            <p>Equipped with <span className="text-white">Render, Docker</span>, and <span className="text-white">Cursor AI</span>.</p>
          </div>
          <div className="p-4 bg-[#0a0a0a] border border-gray-800 text-[10px] space-y-1">
            <p><span className="text-green-500">✔</span> INITIALIZING_CORE_MODULES...</p>
            <p className="animate-pulse">{">"} WAITING_FOR_INPUT_</p>
          </div>
        </div>

        <div className="lg:col-span-7 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {techSkills.map((skill, index) => (
            <motion.div
              key={index}
              initial="initial"
              animate="animate"
              custom={index}
              variants={iconVariants}
              onMouseEnter={() => setHoveredSkill(skill)}
              onMouseLeave={() => setHoveredSkill(null)}
              className="flex flex-col items-center justify-center p-4 bg-[#0a0a0a] border border-white/5 transition-all hover:border-white/20 hover:bg-[#111]"
              style={{ aspectRatio: "1/1" }}
            >
              <motion.div
                className="text-4xl transition-all duration-300"
                style={{ 
                  color: hoveredSkill?.name === skill.name ? skill.color : "#9ca3af",
                  filter: hoveredSkill?.name === skill.name ? `drop-shadow(0 0 8px ${skill.color}80)` : 'none'
                }}
              >
                <skill.icon />
              </motion.div>
              <span className="mt-3 text-[14px] font-bold text-gray-600 uppercase text-center">{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSet;