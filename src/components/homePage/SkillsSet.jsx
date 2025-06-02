import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useRef, useEffect } from "react";

// Import all images
import Next from "../../assets/tech_stack/Next.svg";
import Bootstrap from "../../assets/tech_stack/Bootstrap.svg";
import CSS from "../../assets/tech_stack/CSS.png";
import Express from "../../assets/tech_stack/Express.png";
import Git from "../../assets/tech_stack/Git.svg";
import Github from "../../assets/tech_stack/Github.svg";
import HTML from "../../assets/tech_stack/HTML.png";
import Javascript from "../../assets/tech_stack/Javascript.svg";
import MaterialUI from "../../assets/tech_stack/MaterialUI.svg";
import MongoDB from "../../assets/tech_stack/MongoDB.svg";
import NodeJs from "../../assets/tech_stack/NodeJs.svg";
import ReactIcon from "../../assets/tech_stack/React.png";
import Redux from "../../assets/tech_stack/Redux.svg";
import Saas from "../../assets/tech_stack/Saas.svg";
import Tailwind from "../../assets/tech_stack/Tailwind.png";
import Typescript from "../../assets/tech_stack/Typescript.svg";
import Vercel from "../../assets/tech_stack/Vercel.svg";

import { useDispatch } from "react-redux";
import { updateCurrentSection } from "../../redux/slice/applicationSlice";

const SkillsSet = () => {
   const dispatch = useDispatch();
  const sectionRef = useRef(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            dispatch(updateCurrentSection("Skills"));
          }
        });
      },
      { threshold: 0.6 } // Trigger when at least 10% of element is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Tech skills data with colors
  const techSkills = useMemo(
    () => [
      { name: "HTML", icon: HTML, color: "#E34F26" },
      { name: "Bootstrap", icon: Bootstrap, color: "#7952B3" },
      { name: "CSS", icon: CSS, color: "#1572B6" },
      { name: "Express", icon: Express, color: "#000000" },
      { name: "Git", icon: Git, color: "#F05032" },
      { name: "GitHub", icon: Github, color: "#181717" },
      { name: "JavaScript", icon: Javascript, color: "#F7DF1E" },
      { name: "NextJs", icon: Next, color: "#000000" },
      { name: "MongoDB", icon: MongoDB, color: "#47A248" },
      { name: "Node.js", icon: NodeJs, color: "#339933" },
      { name: "React", icon: ReactIcon, color: "#61DAFB" },
      { name: "Redux", icon: Redux, color: "#764ABC" },
      { name: "Tailwind CSS", icon: Tailwind, color: "#06B6D4" },
      { name: "TypeScript", icon: Typescript, color: "#3178C6" },
      { name: "Vercel", icon: Vercel, color: "#000000" },
      { name: "Material UI", icon: MaterialUI, color: "#0081CB" },
      { name: "Saas", icon: Saas, color: "#CC6699" },
    ],
    []
  );

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const techSkillItem = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    hover: {
      scale: 1.15,
      y: -8,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 15,
      },
    },
  };

  // Classic dark theme background elements
  const BackgroundElements = () => (
    <>
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute inset-0 bg-[length:40px_40px] bg-[linear-gradient(to_right,gray_1px,transparent_1px),linear-gradient(to_bottom,gray_1px,transparent_1px)]" />
      </div>

      {/* Floating circles */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full border border-gray-700 opacity-10"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full border border-gray-700 opacity-10"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
      />

      {/* Subtle particle animation */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-1 h-1 rounded-full ${
            i % 2 === 0 ? "bg-gray-500" : "bg-gray-400"
          } opacity-30`}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 5 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </>
  );

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="min-h-screen py-20 px-4 md:px-8 lg:px-16 relative overflow-hidden bg-gray-900 text-gray-200"
    >
      <BackgroundElements />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Section - Content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          onViewportEnter={() => {
            if (!isVisible) {
              console.log("Skills section is now visible on screen!");
              setIsVisible(true); // Prevent future logs
            }
          }}
          className="lg:pr-12"
        >
          <motion.div variants={fadeInUp} className="mb-12">
            <div className="flex items-baseline">
              <motion.h1
                className="text-7xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                M
              </motion.h1>
              <motion.h2
                className="text-4xl md:text-5xl font-semibold text-gray-300"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                e and
              </motion.h2>
            </div>
            <motion.h2
              className="text-4xl md:text-5xl font-semibold text-gray-300"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              My Tech Stack
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="space-y-6 leading-relaxed"
          >
            <motion.p variants={fadeInUp} className="text-lg text-gray-400">
              Hi, I'm Keshav Kumar — a passionate Full Stack Developer. I'm
              currently a 3rd-year B.Tech CSE student with a strong foundation
              in the MERN stack (MongoDB, Express.js, React, Node.js) and a deep
              interest in building modern, responsive, and user-friendly web
              applications.
            </motion.p>
            <motion.p variants={fadeInUp} className="text-lg text-gray-400">
              I also enjoy solving real-world problems through code and have a
              solid grip on data structures and algorithms.
            </motion.p>
            <motion.p variants={fadeInUp} className="text-lg text-gray-400">
              I'm always open to collaborating on exciting projects, learning
              new technologies, and growing as a developer. Let's build
              something amazing together!
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Right Section - Skills */}
        <div className="relative h-full min-h-[500px]">
          {/* Tech Skills Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6 relative z-10 p-8"
          >
            {techSkills.map((skill, index) => (
              <motion.div
                key={`${skill.name}-${index}`}
                variants={techSkillItem}
                whileHover="hover"
                onHoverStart={() => setHoveredSkill(skill)}
                onHoverEnd={() => setHoveredSkill(null)}
                className="flex flex-col items-center"
              >
                <motion.div
                  className="w-16 h-16 sm:w-20 sm:h-20 cursor-pointer rounded-lg flex items-center justify-center p-2 bg-gray-800/50 hover:bg-gray-700/50 backdrop-blur-sm border border-gray-700/50"
                  whileTap={{ scale: 0.9 }}
                  style={{
                    boxShadow:
                      hoveredSkill === skill
                        ? `0 0 20px -5px ${skill.color}`
                        : "none",
                    borderColor:
                      hoveredSkill === skill ? skill.color : "transparent",
                  }}
                >
                  <motion.img
                    src={skill.icon}
                    alt={skill.name}
                    className="w-full h-full object-contain"
                    loading="lazy"
                    initial={{ filter: "grayscale(30%) brightness(0.9)" }}
                    animate={{
                      filter:
                        hoveredSkill === skill
                          ? "grayscale(0%) brightness(1.1)"
                          : "grayscale(30%) brightness(0.9)",
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
                <motion.span
                  className="text-xs sm:text-sm mt-2 text-center font-medium text-gray-300"
                  animate={{
                    color: hoveredSkill === skill ? skill.color : "#D1D5DB",
                    scale: hoveredSkill === skill ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {skill.name}
                </motion.span>
              </motion.div>
            ))}
          </motion.div>

          {/* Skill highlight effect */}
          {hoveredSkill && (
            <motion.div
              className="absolute inset-0 -z-10 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 0.05,
                background: `radial-gradient(circle at center, ${hoveredSkill.color} 0%, transparent 70%)`,
              }}
              transition={{ duration: 0.3 }}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default SkillsSet;
