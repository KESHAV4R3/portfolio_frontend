import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { updateCurrentSection } from "../../redux/slice/applicationSlice";
import { useInView } from "react-intersection-observer";

// Icons
import { FaLaptopCode, FaServer, FaLayerGroup, FaRocket, FaTerminal, FaMicrochip } from "react-icons/fa";
import { GoCheck } from "react-icons/go";

const ServicesShowcase = () => {
  const [activeService, setActiveService] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  const [ref, inView] = useInView({ threshold: 0.3 });

  useEffect(() => {
    if (inView) {
      dispatch(updateCurrentSection("Services"));
    }
  }, [inView, dispatch]);

  const services = [
    {
      id: "SVC_01",
      title: "Frontend Engineering",
      description: "Building responsive, high-performance interfaces with modern React ecosystems.",
      details: [
        "React.js & Next.js Development",
        "Redux State Management",
        "Dashboard & Admin UI Architecture",
        "GSAP Animations & Interactivity",
        "Mobile-First Tailwind Styling",
        "Component Modularization",
      ],
      icon: FaLaptopCode,
    },
    {
      id: "SVC_02",
      title: "Backend Architecture",
      description: "Designing secure, scalable server-side logic and database schemas.",
      details: [
        "Node.js & Express.js APIs",
        "JWT & Google OAuth Auth",
        "Role-Based Access Control (RBAC)",
        "MongoDB & SQL Database Design",
        "REST API Development",
        "Nodemailer Automation",
      ],
      icon: FaServer,
    },
    {
      id: "SVC_03",
      title: "Full Stack Solutions",
      description: "End-to-end MERN stack development for complex platforms.",
      details: [
        "EdTech Platforms (EduNest)",
        "Payment Integration (Razorpay)",
        "Course & User Management",
        "Real-time Data Integration",
        "Secure Admin Portals",
        "Cloud Deployment (Vercel/Render)",
      ],
      icon: FaLayerGroup,
    },
    {
      id: "SVC_04",
      title: "Performance Optimization",
      description: "Enhancing speed and efficiency through algorithmic problem solving.",
      details: [
        "Legacy Code Refactoring",
        "30% Performance Boosts",
        "Data Structure Optimization",
        "Load Time Reduction",
        "Scalable System Design",
        "Code Quality & Peer Review",
      ],
      icon: FaRocket,
    },
  ];

  // Auto-switch timer
  useEffect(() => {
    if (!isHovered && inView) {
      const interval = setInterval(() => {
        setActiveService((prev) => (prev + 1) % services.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isHovered, inView, services.length]);

  return (
    <section 
        ref={ref} 
        id="services" 
        className="relative min-h-screen bg-[#050505] text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden font-mono selection:bg-green-900/30 selection:text-green-400"
    >
      
      {/* ---------------- BACKGROUND ATMOSPHERE (TERMINAL STYLE) ---------------- */}
      <div className="absolute inset-0 pointer-events-none">
         {/* Cyber Grid */}
         <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
         
         {/* Scanline Overlay */}
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05]"></div>
         
         {/* Glows */}
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-900/10 rounded-full blur-[120px]"></div>
         <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 border border-green-500/30 bg-green-900/10 rounded-sm backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-green-500 text-xs font-bold uppercase tracking-widest">System_Modules</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            <span className="text-white">Deployed </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
              Services
            </span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm">
            {`> Initializing full-stack protocols...`}
            <br className="md:hidden" />
            {` > Optimizing infrastructure.`}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: COMMAND MENU (Navigation) */}
          <div className="lg:col-span-4 flex flex-col gap-2">
            {services.map((service, index) => {
              const isActive = activeService === index;
              const Icon = service.icon;

              return (
                <button
                  key={index}
                  onClick={() => setActiveService(index)}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className={`group relative w-full text-left px-5 py-4 transition-all duration-200 border border-transparent ${
                    isActive
                      ? "bg-green-900/10 border-green-500/50"
                      : "bg-[#0a0a0a] border-gray-800 hover:border-green-500/30 hover:bg-[#0f0f0f]"
                  }`}
                >
                  {/* Active Indicator Square */}
                  {isActive && (
                    <div className="absolute top-0 right-0 w-2 h-2 bg-green-500"></div>
                  )}

                  <div className="flex items-center gap-4">
                    <span className={`text-lg p-2 rounded bg-black border border-gray-800 transition-colors ${isActive ? "text-green-500 border-green-500/50" : "text-gray-500 group-hover:text-green-400"}`}>
                        <Icon />
                    </span>
                    <div>
                        <h4 className={`text-xs font-bold uppercase tracking-wider transition-colors ${isActive ? "text-white" : "text-gray-500 group-hover:text-gray-300"}`}>
                            {service.title}
                        </h4>
                        {isActive && <span className="text-[10px] text-green-600 font-mono block mt-0.5 animate-pulse">● RUNNING</span>}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT: TERMINAL WINDOW (Content) */}
          <div className="lg:col-span-8">
            <div 
                className="relative h-full min-h-[500px] bg-[#0c0c0c] border border-green-900/30 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
              {/* Terminal Header */}
              <div className="bg-[#111] px-4 py-2 flex items-center justify-between border-b border-gray-800">
                  <div className="flex gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/50 border border-red-500/30"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50 border border-yellow-500/30"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/50 border border-green-500/30"></div>
                  </div>
                  <div className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">
                      SYS_ROOT/{services[activeService].id}
                  </div>
              </div>

              {/* Terminal Content Body */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="relative z-10 h-full flex flex-col p-8"
                >
                  <div className="mb-8">
                    <div className="flex items-start gap-4 mb-4">
                        {/* Big Icon */}
                        {(() => {
                            const ActiveIcon = services[activeService].icon;
                            return (
                                <span className="text-4xl p-3 bg-[#050505] border border-green-500/30 text-green-500 shadow-[0_0_15px_rgba(34,197,94,0.1)]">
                                    <ActiveIcon />
                                </span>
                            );
                        })()}
                        
                        <div>
                            <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tighter uppercase mb-1">
                                {services[activeService].title}
                            </h3>
                            <div className="flex items-center gap-2 text-[10px] text-green-600 font-mono">
                                <span>PID: {Math.floor(Math.random() * 9000) + 1000}</span>
                                <span>|</span>
                                <span>MEM: 64MB</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-4 bg-[#050505] border border-green-900/30 rounded-sm">
                        <p className="text-sm text-gray-400 font-mono leading-relaxed">
                            <span className="text-green-500 mr-2">{`>>`}</span>
                            {services[activeService].description}
                        </p>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-auto">
                    {services[activeService].details.map((detail, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 + i * 0.05 }}
                        className="flex items-center gap-3 p-3 border border-gray-800 bg-[#080808] hover:border-green-500/30 transition-colors group/item"
                      >
                        <div className="flex-shrink-0 w-4 h-4 flex items-center justify-center text-green-600 group-hover/item:text-green-400 transition-colors">
                            <GoCheck />
                        </div>
                        <span className="text-gray-400 text-xs font-mono group-hover/item:text-gray-200 transition-colors">
                            {detail}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Decorative Footer */}
                  <div className="absolute bottom-4 right-6 opacity-30 pointer-events-none">
                     <FaMicrochip size={40} className="text-green-900" />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default ServicesShowcase;