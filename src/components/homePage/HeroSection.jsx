import { useEffect, useRef, useCallback, useState } from "react";
import Typed from "typed.js";
import BikeModel from "../../../public/bikeModel/BikeModel";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useDispatch } from "react-redux";
import { updateCurrentSection } from "../../redux/slice/applicationSlice";
import resume_keshav from "../../assets/application/resume_keshav.pdf";

const HeroSection = () => {
  const [showResumeOptions, setShowResumeOptions] = useState(false);
  const sectionRef = useRef(null);
  const dispatch = useDispatch();
  const typedRef = useRef(null);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const handleResumeClick = () => {
    setShowResumeOptions(true);
  };
  const handleViewResume = () => {
    window.open(resume_keshav, "_blank");
    setShowResumeOptions(false);
  };
  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = resume_keshav;
    link.download = "Keshav_Kumar_Resume.pdf";
    link.click();
    setShowResumeOptions(false);
  };

  // Combine refs
  const setRefs = useCallback(
    (node) => {
      ref(node); // Set the useInView ref
      sectionRef.current = node; // Set your custom ref
    },
    [ref]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            dispatch(updateCurrentSection("Home"));
          }
        });
      },
      { threshold: 0.4 } // Trigger when at least 10% of element is visible
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

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: [
        "Full Stack Developer",
        "Web Developer",
        "MERN stack developer",
        "Backend Developer",
        "Software Engineer",
      ],
      loop: true,
      typeSpeed: 70,
      backSpeed: 50,
      backDelay: 1500,
      smartBackspace: true,
      showCursor: true,
      cursorChar: "|",
    });

    return () => {
      typed.destroy();
    };
  }, []);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 0.8,
      },
    },
  };

  const floatingBubbles = {
    hidden: { opacity: 0 },
    visible: {
      opacity: [0, 0.2, 0],
      transition: {
        duration: Math.random() * 10 + 10,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay: Math.random() * 5,
      },
    },
  };

  return (
    <section
      ref={setRefs}
      className={`pt-20 bg-gray-900 min-h-screen flex flex-col justify-center px-4 sm:px-8 relative overflow-hidden transition-colors duration-300`}
      id="home"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full bg-blue-400 opacity-10`}
            style={{
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: "blur(40px)",
            }}
            variants={floatingBubbles}
            initial="hidden"
            animate={controls}
          />
        ))}
      </div>

      {/* Resume Options Modal */}
      <div>
        {showResumeOptions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
            onClick={() => setShowResumeOptions(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-white mb-4">
                Resume Options
              </h3>
              <p className="text-gray-300 mb-6">
                Would you like to view or download the resume?
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleViewResume}
                  className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                >
                  View Resume
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleDownloadResume}
                  className="flex-1 py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
                >
                  Download Resume
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setShowResumeOptions(false)}
                  className="flex-1 py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors"
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>

      <div className="max-w-7xl pt-17 lg:pt-0 mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 relative z-10">
        {/* Text Content */}
        <motion.div
          className="max-w-2xl lg:max-w-none lg:w-1/2 z-10"
          variants={container}
          initial="hidden"
          animate={controls}
        >
          <motion.p
            className={`text-4xl sm:text-5xl md:text-6xl leading-tight font-extrabold text-gray-100 mb-2`}
            variants={item}
          >
            Hi, I'm{" "}
            <motion.span
              className="text-blue-600 dark:text-blue-400"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Keshav Kumar
            </motion.span>
          </motion.p>

          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6"
            variants={item}
          >
            <span className={"text-gray-300"}>I'm a </span>
            <span
              ref={typedRef}
              className="text-blue-600 dark:text-blue-400 font-bold"
            ></span>
          </motion.h2>

          <motion.p
            className={`text-lg md:text-xl mb-8 leading-relaxed text-gray-400`}
            variants={item}
          >
            Passionate about creating beautiful, functional, and user-friendly
            digital experiences. With expertise across the stack, I bring ideas
            to life with clean code and thoughtful design.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-start gap-4 mt-8"
            variants={item}
          >
            {/* View My Work Button */}
            <motion.a
              href="#projects"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 20px rgba(37, 99, 235, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 w-full sm:w-auto text-center bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 shadow-md relative overflow-hidden group"
            >
              <span className="relative z-10">View My Work</span>
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 dark:from-blue-600 dark:to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0 }}
              />
            </motion.a>

            {/* Contact Me Button */}
            <motion.a
              href="#contact"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 20px rgba(96, 165, 250, 0.2)",
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 w-full sm:w-auto text-center border-2 border-blue-400 text-blue-400 hover:bg-blue-900/30 font-semibold rounded-lg transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">Contact Me</span>
              <motion.span
                className="absolute inset-0 bg-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0 }}
              />
            </motion.a>

            {/* Download Resume Button */}
            <motion.button
              onClick={handleResumeClick}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 20px rgba(239, 68, 68, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 cursor-pointer py-3 w-full sm:w-auto text-center bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 shadow-md relative overflow-hidden group"
            >
              <span className="relative z-10">Explore Resume</span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* 3D Model Container */}
        <motion.div
          className="w-full lg:w-1/2 h-80 sm:h-96 lg:h-[500px] flex items-center justify-center relative"
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
              type: "spring",
              stiffness: 60,
              damping: 15,
              duration: 1,
            },
          }}
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.3 },
          }}
        >
          <BikeModel />
          {/* Floating elements around the model */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full bg-blue-400/20`}
              style={{
                width: `${Math.random() * 100 + 30}px`,
                height: `${Math.random() * 100 + 30}px`,
                filter: "blur(20px)",
              }}
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: Math.random() * 5,
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
