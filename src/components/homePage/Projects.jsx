import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "./ProjectCard";
import edunest from "../../assets/projects/edunest.png";
import portfolio from "../../assets/projects/portfolio.png";
import serch from "../../assets/projects/serch.png";

import { useDispatch } from "react-redux";
import { updateCurrentSection } from "../../redux/slice/applicationSlice";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef(null);
  const dispatch = useDispatch();
  const horizontalWrapperRef = useRef(null);
  const projectCardsRef = useRef([]);
  const headingRef = useRef(null);
  const [activeProject, setActiveProject] = useState(0);
  const [isAnimationReady, setIsAnimationReady] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            dispatch(updateCurrentSection("Projects"));
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

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Animation setup
  useEffect(() => {
    const section = sectionRef.current;
    const horizontalWrapper = horizontalWrapperRef.current;
    const heading = headingRef.current;

    if (!section || !horizontalWrapper || !heading) return;

    // Reset any existing ScrollTriggers
    ScrollTrigger.getAll().forEach((t) => t.kill());

    // Heading animation
    gsap.from(heading, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // Calculate the total width needed for horizontal scrolling
    const projectsWidth = horizontalWrapper.scrollWidth;
    const currentWindowWidth = window.innerWidth;

    // Adjust initial offset and total scroll based on screen size
    const initialOffset =
      windowWidth < 768 ? currentWindowWidth * 0.05 : currentWindowWidth * 0.1;
    const extraSpace = windowWidth < 768 ? 0 : currentWindowWidth * 0.2;
    const totalHorizontalScroll =
      projectsWidth - currentWindowWidth + extraSpace;

    // Set initial position with responsive padding
    gsap.set(horizontalWrapper, { x: initialOffset });

    // Calculate section height based on the tallest card
    let maxCardHeight = 0;
    projectCardsRef.current.forEach((card) => {
      if (card && card.offsetHeight > maxCardHeight) {
        maxCardHeight = card.offsetHeight;
      }
    });

    // Add extra space for heading and bottom padding
    const sectionHeight = maxCardHeight + (windowWidth < 768 ? 100 : 200) + 100;
    gsap.set(section, { height: sectionHeight });

    // Horizontal scrolling animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: `+=${Math.max(totalHorizontalScroll, 0)}`, // Ensure not negative
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const projectIndex = Math.min(
            Math.floor(progress * projects.length),
            projects.length - 1
          );
          setActiveProject(projectIndex);
        },
        onRefresh: () => setIsAnimationReady(true),
      },
    });

    tl.to(horizontalWrapper, {
      x: -totalHorizontalScroll + initialOffset,
      ease: "none",
    });

    // Individual card animations
    projectCardsRef.current.forEach((card, index) => {
      if (!card) return;

      // Initial animation
      gsap.from(card, {
        scale: 0.95,
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: index * 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: card,
          start: "left 85%",
          containerAnimation: tl,
          toggleActions: "play none none none",
          once: true,
        },
      });

      // Hover effects
      const hoverAnimation = gsap.to(card, {
        scale: 1.02,
        y: -10,
        boxShadow: "0 25px 50px -12px rgba(99, 102, 241, 0.25)",
        duration: 0.3,
        paused: true,
      });

      card.addEventListener("mouseenter", () => hoverAnimation.play());
      card.addEventListener("mouseleave", () => hoverAnimation.reverse());

      return () => {
        card.removeEventListener("mouseenter", () => hoverAnimation.play());
        card.removeEventListener("mouseleave", () => hoverAnimation.reverse());
      };
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [windowWidth]); // Re-run effect when window width changes

  // Projects data
  const projects = [
    {
      id: 1,
      title: "Edtech Platform",
      description:
        "A comprehensive EdTech platform offering online courses, student management, and secure payment integration. Built with modern technologies to ensure smooth learning experiences and efficient administration.",
      imageUrl: edunest,
      tags: ["React", "Node.js", "MongoDB", "ExpressJs", "Redux"],
      link: "https://edunestedtech.vercel.app/",
    },
    {
      id: 2,
      title: "Portfolio Webapge",
      description:
        "A personal portfolio website showcasing my projects, skills, and experiences — with an easy way to connect with me.",
      imageUrl: portfolio,
      tags: ["React", "Node.js", "MongoDB", "ExpressJs", "Redux"],
      link: "https://edunestedtech.vercel.app/",
    },
    {
      id: 3,
      title: "Serch Web serch portal",
      description:
        "A Google-like search interface delivering results across text, images, videos, and news, with smart features like query suggestions, trending stories, and category filters — all in a smooth, responsive UI.",
      imageUrl: serch,
      tags: ["React", "SerpStack API", "new API", "Redux"],
      link: "https://github.com/KESHAV4R3/s_e_r_c_h",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className={`relative w-full overflow-hidden bg-gray-900 py-16 ${
        !isAnimationReady ? "invisible" : "visible"
      }`}
      id="projects"
    >
      {/* Animated Heading */}
      <div className="relative z-10 pb-8 md:pb-16 px-4 md:px-16">
        <h2
          ref={headingRef}
          className="text-3xl md:text-6xl font-bold text-white text-center"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
            My Projects
          </span>
        </h2>
      </div>

      {/* Horizontal scrolling container */}
      <div
        ref={horizontalWrapperRef}
        className="flex w-max items-center relative pl-[5vw] md:pl-[20px] pr-[70px] md:pr-[20px]"
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            ref={(el) => (projectCardsRef.current[index] = el)}
            className="project-card mx-2 md:mx-8 flex-shrink-0"
            style={{
              width: windowWidth < 768 ? "85vw" : "80vw",
              maxWidth: "1000px",
              marginBottom: "60px",
            }}
          >
            <ProjectCard
              project={project}
              index={index}
              isActive={activeProject === index}
            />
          </div>
        ))}
      </div>

      {/* Bottom padding */}
      <div className="h-20 w-full"></div>
    </section>
  );
};

export default Projects;
