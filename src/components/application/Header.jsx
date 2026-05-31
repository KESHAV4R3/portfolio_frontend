import { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaBars, FaTimes, FaMedium } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { useNavigate, useLocation, NavLink } from "react-router-dom";

const SocialLink = memo(({ href, Icon, size = 16 }) => (
  <a 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-zinc-400 hover:text-white transition-colors duration-200"
  >
    <Icon size={size} />
  </a>
));

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Experience", path: "/experience" },
    { name: "Projects", path: "/projects" },
    { name: "Services", path: "/services" },
    { name: "Blogs", path: "/blogs" },
    { name: "Contact", path: "/contact" },
  ];

  if (location.pathname.startsWith("/admin")) return null;

  return (
    <header className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
      scrolled 
        ? "bg-zinc-950/70 border-b border-white/5 py-3 backdrop-blur-md" 
        : "bg-transparent py-5"
    }`}>
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        {/* Brand Logo */}
        <div 
          onClick={() => navigate("/")} 
          className="cursor-pointer font-bold text-xl tracking-tight text-white flex items-center gap-1.5"
        >
          <span className="text-zinc-500 font-light">&lt;</span>
          <span>4R3</span>
          <span className="text-zinc-500 font-light">/&gt;</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <div className="flex bg-zinc-900/50 border border-white/5 rounded-full px-1 py-1 gap-1 backdrop-blur-sm">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => 
                  `text-xs px-4 py-1.5 rounded-full font-medium tracking-wide uppercase transition-all duration-200 cursor-pointer ${
                    isActive 
                      ? "bg-white text-black font-semibold shadow-sm" 
                      : "text-zinc-400 hover:text-white"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
          
          <div className="flex gap-4 border-l border-white/5 pl-6">
            <SocialLink href="https://github.com/keshav4r3" Icon={FaGithub} />
            <SocialLink href="https://linkedin.com/in/keshav4r3" Icon={FaLinkedin} />
            <SocialLink href="https://medium.com/@4r3keshav" Icon={FaMedium} />
            <SocialLink href="https://leetcode.com/u/keshav4r3/" Icon={SiLeetcode} />
          </div>
        </nav>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden text-zinc-400 hover:text-white transition-colors duration-200 focus:outline-none"
        >
          {isOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[60px] p-6 bg-zinc-950/95 border-b border-white/5 backdrop-blur-lg z-90 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => 
                  `text-sm font-semibold tracking-widest uppercase py-2 transition-all ${
                    isActive ? "text-white pl-2 border-l-2 border-white" : "text-zinc-500 hover:text-zinc-200"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <div className="flex gap-6 mt-4 pt-4 border-t border-white/5 justify-center">
              <SocialLink href="https://github.com/keshav4r3" Icon={FaGithub} size={20} />
              <SocialLink href="https://linkedin.com/in/keshav4r3" Icon={FaLinkedin} size={20} />
              <SocialLink href="https://medium.com/@4r3keshav" Icon={FaMedium} size={20} />
              <SocialLink href="https://leetcode.com/u/keshav4r3/" Icon={SiLeetcode} size={20} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;