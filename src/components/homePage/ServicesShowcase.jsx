import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { updateCurrentSection } from "../../redux/slice/applicationSlice";
import { useInView } from "react-intersection-observer";
import { FaRocket, FaCode, FaLaptopCode, FaServer, FaTools, FaChartLine } from "react-icons/fa";
import { GoCheck } from "react-icons/go";

const ServicesShowcase = () => {
  const [activeService, setActiveService] = useState(0);
  const dispatch = useDispatch();
  const [ref, inView] = useInView({ threshold: 0.1 });

  // Auto-rotate services every 8 seconds
  useEffect(() => {
    if (inView) dispatch(updateCurrentSection("Services"));
    
    const interval = setInterval(() => {
      setActiveService(prev => (prev === services.length - 1 ? 0 : prev + 1));
    }, 8000);
    
    return () => clearInterval(interval);
  }, [inView, dispatch]);

  const services = [
    { 
      id: "01", 
      title: "Frontend Performance", 
      description: "Optimizing web applications for speed, efficiency, and superior user experience through modern techniques and best practices.", 
      icon: FaRocket, 
      details: [
        "Core Web Vitals Optimization", 
        "Code Splitting & Lazy Loading", 
        "Bundle Size Reduction", 
        "Rendering Performance"
      ] 
    },
    { 
      id: "02", 
      title: "MERN Stack Development", 
      description: "Building scalable and efficient full-stack applications using MongoDB, Express, React, and Node.js.", 
      icon: FaCode, 
      details: [
        "Custom Web Applications", 
        "RESTful API Development", 
        "Real-time Features", 
        "Database Design"
      ] 
    },
    { 
      id: "03", 
      title: "Modern Frontend", 
      description: "Creating responsive, accessible, and engaging user interfaces with the latest frontend technologies.", 
      icon: FaLaptopCode, 
      details: [
        "React & Next.js", 
        "Responsive Design", 
        "Component Libraries", 
        "Animation & Micro-interactions"
      ] 
    },
    { 
      id: "04", 
      title: "E-commerce Solutions", 
      description: "Developing robust e-commerce platforms with secure payment processing and inventory management.", 
      icon: FaChartLine, 
      details: [
        "Online Stores", 
        "Payment Integration", 
        "Admin Dashboards", 
        "Inventory Systems"
      ] 
    },
   
    { 
      id: "05", 
      title: "Technical Consulting", 
      description: "Providing expert guidance on architecture, performance, and technical strategy.", 
      icon: FaServer, 
      details: [
        "Codebase Audits", 
        "Performance Optimization", 
        "Technical Roadmapping", 
        "Team Mentorship"
      ] 
    },
  ];

  return (
    <section ref={ref} id="services" className="relative min-h-screen bg-[#050505] py-24 px-6 font-mono selection:bg-green-500/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(circle at 2px 2px, #1a1a1a 1px, transparent 0)`, 
                   backgroundSize: '32px 32px' }}>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16 text-center">
          <span className="text-green-500 text-xs font-bold tracking-[0.3em] uppercase mb-2 block">Expertise</span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
            CORE <span className="text-gray-500 italic">SERVICES</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Service List */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {services.map((s, i) => (
              <motion.button
                key={s.id}
                onClick={() => setActiveService(i)}
                whileHover={{ x: 5 }}
                className={`relative p-5 text-left border transition-all duration-300 ${
                  activeService === i 
                    ? "border-green-500 bg-green-500/5" 
                    : "border-white/5 bg-[#0a0a0a] opacity-60 hover:opacity-100"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <s.icon className={`text-xl ${activeService === i ? "text-green-500" : "text-white"}`} />
                    <h3 className="text-sm font-bold uppercase tracking-wider">{s.title}</h3>
                  </div>
                  <span className="text-[10px] opacity-30">[{s.id}]</span>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Service Details */}
          <div className="lg:col-span-7 bg-[#0a0a0a] border border-white/10 p-8 relative overflow-hidden min-h-[400px]">
            {/* Corner Accents */}
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-green-500/30"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-green-500/30"></div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeService}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="h-full flex flex-col"
              >
                <div className="mb-8">
                  <h3 className="text-3xl font-bold mb-4 text-green-500 uppercase">
                    {services[activeService].title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm border-l-2 border-green-500/50 pl-4">
                    {services[activeService].description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
                  {services[activeService].details.map((detail, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-3 bg-white/5 p-4 border border-white/5 hover:border-green-500/30 transition-all"
                    >
                      <GoCheck className="text-green-500 flex-shrink-0" />
                      <span className="text-xs text-gray-300">{detail}</span>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center opacity-30 text-[10px]">
                  <span>AUTH_MODE: ENCRYPTED</span>
                  <span>ID: 0x00{activeService + 1}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesShowcase;