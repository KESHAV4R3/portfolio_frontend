import { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaBars, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { SiLeetcode } from "react-icons/si";

// Memoized for performance
const SocialLink = memo(({ href, Icon, size = 18 }) => (
  <a 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-400 hover:text-green-400 transition-colors duration-200"
  >
    <Icon size={size} />
  </a>
));

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentSection = useSelector((state) => state.application.currentSection);
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const handleLink = (href) => {
    if (href.startsWith("#")) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    } else navigate(href);
    setIsOpen(false);
  };

  if (location.pathname.includes("admin")) return null;

  return (
    <header className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
      scrolled ? "bg-[#050505]/90 border-b border-white/10 py-3" : "bg-transparent py-5"
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div onClick={() => navigate("/")} className="cursor-pointer font-bold text-5xl tracking-tighter text-white">
          <span className="text-green-500">{"<"}</span>4R3<span className="text-green-500">{"/>"}</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <div className="flex bg-white/5 border border-white/10 rounded-full px-4 py-1.5 gap-6">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleLink(link.href)}
                className={`text-md cursor-pointer font-bold uppercase tracking-widest transition-colors ${
                  currentSection === link.name ? "text-green-400" : "text-gray-400 hover:text-white"
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>
          <div className="flex gap-4 border-l border-white/10 pl-6">
            <SocialLink href="https://github.com/keshav4r3" Icon={FaGithub} />
            <SocialLink href="https://linkedin.com/in/keshav4r3" Icon={FaLinkedin} />
          </div>
        </nav>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
          {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-[#050505] z-[90] flex flex-col justify-center items-center gap-8 md:hidden"
          >
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleLink(link.href)}
                className="text-3xl font-bold uppercase tracking-tighter hover:text-green-500"
              >
                {link.name}
              </button>
            ))}
            <div className="flex gap-8 mt-4">
              <SocialLink href="https://github.com/keshav4r3" Icon={FaGithub} size={28} />
              <SocialLink href="https://linkedin.com/in/keshav4r3" Icon={FaLinkedin} size={28} />
              <SocialLink href="https://leetcode.com/u/keshav4r3/" Icon={SiLeetcode} size={28} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;