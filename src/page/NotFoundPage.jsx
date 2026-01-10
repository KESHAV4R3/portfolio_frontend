import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaExclamationTriangle, FaHome } from "react-icons/fa";

const NotFoundPage = () => {
  const [typedText, setTypedText] = useState("");
  const fullText = "> ERROR_CODE: 404_NOT_FOUND\n> SYSTEM: ROUTE_MISSING\n> ACTION: INITIATE_RECOVERY...";

  // Typing effect for the terminal text
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505] text-white p-4 relative overflow-hidden font-mono selection:bg-red-500/30">
      
      {/* 1. Background Atmosphere */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,0,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
      
      {/* Red Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* 2. Main Content */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center max-w-2xl w-full"
      >
        {/* Warning Icon */}
        <motion.div 
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex justify-center mb-6 text-red-500"
        >
            <FaExclamationTriangle size={60} />
        </motion.div>

        {/* Glitch Title */}
        <div className="relative mb-8">
            <h1 className="text-[150px] md:text-[200px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-800 select-none">
                404
            </h1>
            {/* Glitch Overlay */}
            <h1 className="absolute top-0 left-0 w-full text-[150px] md:text-[200px] font-black leading-none tracking-tighter text-red-500/50 opacity-50 blur-[2px] animate-pulse select-none" style={{ clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)", transform: "translate(-2px, 2px)" }}>
                404
            </h1>
            <h1 className="absolute top-0 left-0 w-full text-[150px] md:text-[200px] font-black leading-none tracking-tighter text-blue-500/50 opacity-50 blur-[2px] animate-pulse select-none" style={{ clipPath: "polygon(0 60%, 100% 60%, 100% 100%, 0 100%)", transform: "translate(2px, -2px)" }}>
                404
            </h1>
        </div>

        {/* Terminal Output */}
        <div className="bg-black/50 border border-red-900/50 rounded-lg p-6 mb-10 text-left min-h-[120px] shadow-2xl backdrop-blur-sm">
            <div className="flex gap-2 mb-4 border-b border-white/10 pb-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <pre className="text-red-400 font-mono text-sm md:text-base whitespace-pre-wrap">
                {typedText}
                <span className="animate-pulse">_</span>
            </pre>
        </div>

        {/* Action Button */}
        <Link to="/">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-sm rounded transition-all hover:bg-gray-200"
            >
                <span className="flex items-center gap-2">
                    <FaHome />
                    System Reboot (Home)
                </span>
                {/* Button Glow */}
                <div className="absolute inset-0 rounded bg-white blur-[20px] opacity-0 group-hover:opacity-40 transition-opacity"></div>
            </motion.button>
        </Link>
        
      </motion.div>
    </div>
  );
};

export default NotFoundPage;