import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentSection } from "../../redux/slice/applicationSlice";

const Experience = () => {
  const dispatch = useDispatch();
  const sectionRef = useRef(null);
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      dispatch(updateCurrentSection("Experience"));
    }
  }, [inView, dispatch]);

  const experiences = [
    {
      id: "LOG_01",
      company: "Zupper Commerce Pvt. Ltd.",
      position: "Frontend Developer Intern",
      duration: "Jul 2025 – Current Working",
      location: "Remote Node",
      website: "https://seller.zupper.co",
      tech: ["React", "Redux", "Tailwind", "Git"],
      points: [
        "Engineered responsive UI for seller/admin features (product listing, views, modals) improving workflow efficiency by 40%.",
        "Boosted application performance by debugging and refactoring legacy codebases, resulting in faster load times.",
        "Collaborated in an Agile environment using Git for version control and participating in daily sprints."
      ]
    }
  ];

  // Animation Variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariant = {
    hidden: { opacity: 0, x: -50, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      x: 0, 
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 50, damping: 20 }
    }
  };

  return (
    <section ref={ref} id="experience" className="relative py-24 bg-[#050505] text-green-500 overflow-hidden font-mono">
      
      {/* ---------------- BACKGROUND ATMOSPHERE ---------------- */}
      <div className="absolute inset-0 pointer-events-none">
          {/* Cyber Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:30px_30px] opacity-50"></div>
          {/* Scanline */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05]"></div>
          {/* Glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-900/10 rounded-full blur-[120px]"></div>
      </div>


      {/* ---------------- MAIN INTERFACE ---------------- */}
      <div className="max-w-5xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 border-b border-green-900/50 pb-4 flex items-end gap-4"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
            <span className="text-green-500">./</span>Experience<span className="animate-pulse">_</span>
          </h2>
          <span className="text-xs text-green-700 pb-2 mb-1 hidden sm:block">
            // EXECUTE_HISTORY_LOG
          </span>
        </motion.div>
        
        {/* Timeline Layout */}
        <motion.div 
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative ml-4 md:ml-6 space-y-12"
        >
          {/* Timeline Vertical Line (Circuit Trace) */}
          <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-green-500/50 via-green-900/20 to-transparent border-r border-dashed border-green-500/30"></div>

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              variants={itemVariant}
              className="relative pl-12"
            >
              {/* Timeline Connector Node */}
              <div className="absolute -left-[6px] top-6 flex items-center justify-center">
                  <div className="w-3 h-3 bg-[#050505] border border-green-500 relative z-10 group-hover:bg-green-500 transition-colors"></div>
                  <div className="absolute w-full h-[1px] bg-green-500/50 w-8 -right-8"></div>
              </div>

              {/* The "Terminal Window" Card */}
              <div className="group relative bg-[#0a0a0a] border border-green-900/50 hover:border-green-500/50 transition-all duration-300 rounded-sm overflow-hidden">
                
                {/* Decoration: Top Bar */}
                <div className="bg-green-900/10 px-4 py-1 flex justify-between items-center border-b border-green-900/30">
                    <span className="text-[10px] text-green-600 uppercase tracking-widest">ID: {exp.id}</span>
                    <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500/20"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500/20"></div>
                    </div>
                </div>

                <div className="p-6 md:p-8 relative">
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

                    {/* Header Info */}
                    <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 gap-4">
                        <div>
                            <h3 className="text-2xl font-bold text-white group-hover:text-green-400 transition-colors flex items-center gap-2">
                                <span>{">"}</span> {exp.position}
                            </h3>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-green-600">@</span>
                                <a 
                                    href={exp.website} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-lg text-gray-400 font-bold hover:text-white hover:underline decoration-green-500 underline-offset-4 transition-all"
                                >
                                    {exp.company}
                                </a>
                                <svg className="w-3 h-3 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                            </div>
                        </div>
                        
                        <div className="flex flex-col items-end gap-1 text-xs text-green-600/80 font-bold">
                            <span className="px-2 py-1 border border-green-900/50 bg-green-900/10 rounded-sm">
                                {exp.duration}
                            </span>
                            <span className="flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                                {exp.location}
                            </span>
                        </div>
                    </div>
                    
                    {/* Console Output (Description) */}
                    <div className="space-y-3 mb-6 font-mono text-sm">
                        {exp.points.map((point, i) => (
                        <div key={i} className="flex items-start gap-3 text-gray-400 group-hover:text-gray-300 transition-colors">
                            <span className="text-green-500 mt-0.5 shrink-0">
                                {i === 0 ? ">>" : "::"}
                            </span>
                            <span className="leading-relaxed">{point}</span>
                        </div>
                        ))}
                    </div>

                    {/* Tech Stack Array */}
                    <div className="pt-4 border-t border-green-900/30">
                        <span className="text-xs text-green-700 block mb-2">const tech_stack = [</span>
                        <div className="flex flex-wrap gap-2 pl-4">
                            {exp.tech.map((tag, i) => (
                                <span key={i} className="text-xs font-bold text-gray-500 group-hover:text-green-400 transition-colors">
                                    "{tag}"{i !== exp.tech.length -1 && ","}
                                </span>
                            ))}
                        </div>
                        <span className="text-xs text-green-700 block mt-2">];</span>
                    </div>

                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;