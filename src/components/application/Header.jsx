import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaBars, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SiLeetcode } from "react-icons/si";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentSection = useSelector(
    (state) => state.application.currentSection
  );
  const [currentUnderline, setCurrentUnderLine] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [forbidScroll, setForbidScroll] = useState(false);

  // Effect to stop the scroll behaviour
  useEffect(() => {
    if (forbidScroll) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden"; // Also lock html element
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [forbidScroll]);

  // Effect to add scrolled state
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const navigateHome = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const handleNavLinkClick = (name, href) => {
    setCurrentUnderLine(name);
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(href);
    }
    setIsOpen(false);
    setForbidScroll(false);
  };

  // Animation variants
  const mobileMenuVariants = {
    hidden: { opacity: 0, x: "100%" },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
    exit: {
      opacity: 0,
      x: "100%",
      transition: {
        ease: "easeInOut",
        duration: 0.3,
      },
    },
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 150,
      },
    }),
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-lg shadow-md" : "bg-transparent"
      }`}
    >
      <div className={`w-full mx-auto px-4 sm:px-8 lg:px-13`}>
        <div className="flex justify-between items-center py-3 md:py-4">
          {/* Logo with enhanced animation */}
          <motion.div
            onClick={navigateHome}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{
              duration: 0.5,
              type: "spring",
              stiffness: 200,
            }}
            className="text-3xl cursor-pointer sm:text-4xl font-extrabold text-gray-800 dark:text-white"
          >
            <a href="#home">
              <span className="text-blue-600 dark:text-blue-400">{"<"}</span>{" "}
              <span className={`text-white`}>4R3</span>{" "}
              <span className="text-blue-600 dark:text-blue-400">{"/>"}</span>
            </a>
          </motion.div>
          {/* Desktop Navigation with enhanced animations */}
          {!location.pathname.includes("admin") && (
            <nav className="hidden md:flex items-center gap-x-6">
              <div className="flex md:gap-7 lg:gap-10">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.name}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={navItemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onHoverStart={() => setCurrentUnderLine("")}
                    onHoverEnd={() => setCurrentUnderLine("Home")}
                    onClick={() => handleNavLinkClick(link.name, link.href)}
                    className={`cursor-pointer relative text-base lg:text-lg font-semibold ${
                      currentSection === link.name
                        ? "text-blue-500"
                        : "text-white"
                    }  transition-all duration-200 group`}
                  >
                    {link.name}
                    <motion.span
                      className={`absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400`}
                      initial={{ scaleX: 0 }}
                      animate={{
                        scaleX: currentSection === link.name ? 1 : 0,
                        opacity: currentSection === link.name ? 1 : 0,
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                  </motion.button>
                ))}
              </div>

              {/* Social Icons with animations */}
              <motion.div
                className="flex space-x-4 ml-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <motion.a
                  href="https://github.com/keshav4r3"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <FaGithub size={20} />
                </motion.a>
                <motion.a
                  href="https://leetcode.com/u/keshav4r3/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <SiLeetcode size={20} />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/keshav4r3/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <FaLinkedin size={20} />
                </motion.a>
              </motion.div>
            </nav>
          )}
          {/* Mobile Menu Button with animation */}
          {!location.pathname.includes("admin") && (
            <motion.button
              onClick={() => {
                setIsOpen(!isOpen);
                setForbidScroll(!isOpen);
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="cursor-pointer md:hidden text-gray-700 dark:text-gray-300 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ type: "spring" }}
                >
                  <FaTimes size={24} />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 0 }}
                  transition={{ type: "spring" }}
                >
                  <FaBars size={24} />
                </motion.div>
              )}
            </motion.button>
          )}
        </div>
      </div>

      {/* Mobile Menu with enhanced animations */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="backdrop"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={() => {
                setIsOpen(false);
                setForbidScroll(false);
              }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
            />

            <motion.div
              key="mobile-menu"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`md:hidden fixed top-0 right-0 h-screen w-screen  bg-blue-900 dark:bg-gray-900 z-50 flex flex-col items-center justify-center space-y-8 pt-20 pb-10`}
            >
              <motion.button
                onClick={() => {
                  setIsOpen(false);
                  setForbidScroll(false);
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="cursor-pointer absolute top-6 right-6 text-gray-300"
                aria-label="Close menu"
              >
                <FaTimes size={24} />
              </motion.button>

              {navLinks.map((link, index) => (
                <motion.button
                  key={link.name}
                  custom={index}
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNavLinkClick(link.name, link.href)}
                  className={`cursor-pointer text-2xl font-medium ${
                    currentUnderline === link.name
                      ? "text-blue-400"
                      : "text-gray-300"
                  } hover:text-blue-400 transition-colors`}
                >
                  {link.name}
                </motion.button>
              ))}

              <motion.div
                className="flex space-x-8 mt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <motion.a
                  href="https://github.com/keshav4r3"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 text-gray-300 hover:text-blue-400 transition-colors"
                >
                  <FaGithub size={28} />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/keshav4r3/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 text-gray-300 hover:text-blue-400 transition-colors"
                >
                  <FaLinkedin size={28} />
                </motion.a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
