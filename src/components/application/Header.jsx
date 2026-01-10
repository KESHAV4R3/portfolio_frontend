import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaBars, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { SiLeetcode } from "react-icons/si";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentSection = useSelector((state) => state.application.currentSection);
  
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Scroll Detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock Body Scroll on Mobile Menu Open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const handleNavLinkClick = (href) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(href);
    }
    setIsOpen(false);
  };

  // ---------------- VARIANTS ----------------
  const menuVariants = {
    closed: { x: "100%", opacity: 0 },
    open: { 
        x: 0, 
        opacity: 1,
        transition: { type: "spring", stiffness: 300, damping: 30 }
    }
  };

  const linkVariants = {
    closed: { x: 50, opacity: 0 },
    open: (i) => ({ 
        x: 0, 
        opacity: 1, 
        transition: { delay: i * 0.1 } 
    })
  };

  // Hide Navbar on Admin Page
  if (location.pathname.includes("admin")) return null;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled 
          ? "bg-[#050505]/80 backdrop-blur-md border-white/5 py-3 shadow-lg shadow-blue-900/5" 
          : "bg-transparent border-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* LOGO */}
        <motion.div
          onClick={() => navigate("/")}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="cursor-pointer group"
        >
            <h1 className="text-2xl font-bold tracking-tighter text-white">
                <span className="text-blue-500 group-hover:text-purple-500 transition-colors duration-300">{"<"}</span>
                <span className="mx-1">4R3</span>
                <span className="text-blue-500 group-hover:text-purple-500 transition-colors duration-300">{"/>"}</span>
            </h1>
        </motion.div>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-8 bg-white/5 px-6 py-2 rounded-full border border-white/5 backdrop-blur-sm">
                {navLinks.map((link) => {
                    const isActive = currentSection === link.name;
                    return (
                        <li key={link.name}>
                            <button
                                onClick={() => handleNavLinkClick(link.href)}
                                className={`relative text-sm font-medium transition-colors duration-300 ${
                                    isActive ? "text-white" : "text-gray-400 hover:text-white"
                                }`}
                            >
                                {link.name}
                                {/* Active Dot Indicator */}
                                {isActive && (
                                    <motion.span 
                                        layoutId="activeDot"
                                        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full shadow-[0_0_8px_#3b82f6]"
                                    />
                                )}
                            </button>
                        </li>
                    );
                })}
            </ul>

            {/* Social Icons (Desktop) */}
            <div className="flex gap-4 border-l border-white/10 pl-6">
                <SocialLink href="https://github.com/keshav4r3" Icon={FaGithub} />
                <SocialLink href="https://linkedin.com/in/keshav4r3" Icon={FaLinkedin} />
            </div>
        </nav>

        {/* MOBILE TOGGLE */}
        <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2 z-50 relative"
        >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isOpen && (
            <>
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                />
                
                <motion.div
                    variants={menuVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    className="fixed top-0 right-0 h-full w-[75%] max-w-sm bg-[#0a0a0a] border-l border-white/10 z-50 md:hidden flex flex-col justify-center px-8 shadow-2xl"
                >
                    <div className="absolute top-8 left-8">
                        <span className="text-blue-500 font-mono text-xs">Menu_v1.0</span>
                    </div>

                    <ul className="space-y-6">
                        {navLinks.map((link, i) => (
                            <motion.li 
                                key={link.name}
                                custom={i}
                                variants={linkVariants}
                            >
                                <button
                                    onClick={() => handleNavLinkClick(link.href)}
                                    className={`text-3xl font-bold tracking-tight transition-colors ${
                                        currentSection === link.name ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500" : "text-gray-400 hover:text-white"
                                    }`}
                                >
                                    {link.name}
                                </button>
                            </motion.li>
                        ))}
                    </ul>

                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-12 pt-8 border-t border-white/10 flex gap-6"
                    >
                        <SocialLink href="https://github.com/keshav4r3" Icon={FaGithub} size={24} />
                        <SocialLink href="https://linkedin.com/in/keshav4r3" Icon={FaLinkedin} size={24} />
                        <SocialLink href="https://leetcode.com/u/keshav4r3/" Icon={SiLeetcode} size={24} />
                    </motion.div>
                </motion.div>
            </>
        )}
      </AnimatePresence>
    </header>
  );
};

// Helper Component for Social Links to reduce repetition
const SocialLink = ({ href, Icon, size = 20 }) => (
    <a 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-white hover:scale-110 transition-all duration-200"
    >
        <Icon size={size} />
    </a>
);

export default Header;