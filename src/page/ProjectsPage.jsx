import React from 'react';
import { motion } from 'framer-motion';
import { FiFolder, FiGithub, FiExternalLink, FiCpu, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import Button from '../components/shared/Button';
import projectsImg from '../assets/projects_object.png';

// Image assets
import edunest from "../assets/projects/edunest.png";
import portfolio from "../assets/projects/portfolio.png";
import serch from "../assets/projects/serch.png";
import jarvis from "../assets/projects/jarvis.png";

const CaseStudyCard = ({ project }) => {
  return (
    <div className="bg-zinc-900/10 border border-white/5 rounded-2xl overflow-hidden hover:border-zinc-800 transition-all duration-300 space-y-6 p-6 md:p-8 smooth-gpu">
      {/* Header Block */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Thumbnail */}
        <div className="md:col-span-4 h-32 md:h-40 rounded-xl overflow-hidden bg-zinc-950 relative border border-white/5">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover opacity-60"
          />
        </div>

        {/* Project Info */}
        <div className="md:col-span-8 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-xl font-bold text-white tracking-tight">{project.title}</h2>
            <span className="text-[10px] font-mono px-2 py-0.5 bg-zinc-900 border border-white/5 rounded text-zinc-400">
              {project.category}
            </span>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">{project.description}</p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.tags.map(tag => (
              <span key={tag} className="text-[9px] font-mono px-2 py-0.5 bg-zinc-900 text-zinc-500 rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Case Study Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/5 text-xs text-zinc-400 leading-relaxed">
        <div className="space-y-4">
          <div className="space-y-1">
            <h4 className="font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
              <FiAlertCircle className="text-zinc-500" /> The Problem
            </h4>
            <p>{project.problem}</p>
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
              <FiCpu className="text-zinc-500" /> Technical Challenge
            </h4>
            <p>{project.challenge}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <h4 className="font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
              <FiCheckCircle className="text-zinc-500" /> The Solution
            </h4>
            <p>{project.solution}</p>
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
              <FiCheckCircle className="text-zinc-500" /> Measurable Result
            </h4>
            <p>{project.result}</p>
          </div>
        </div>
      </div>

      {/* External Links */}
      <div className="pt-4 flex flex-wrap gap-3">
        {project.links.live && (
          <Button to={project.links.live} variant="primary" className="text-[11px] py-1.5 px-4">
            Live Demo <FiExternalLink className="ml-1.5" />
          </Button>
        )}
        {project.links.frontend && (
          <Button to={project.links.frontend} variant="secondary" className="text-[11px] py-1.5 px-4">
            Frontend Code <FiGithub className="ml-1.5" />
          </Button>
        )}
        {project.links.backend && (
          <Button to={project.links.backend} variant="secondary" className="text-[11px] py-1.5 px-4">
            Backend Code <FiGithub className="ml-1.5" />
          </Button>
        )}
        {project.links.code && (
          <Button to={project.links.code} variant="secondary" className="text-[11px] py-1.5 px-4">
            View Source Code <FiGithub className="ml-1.5" />
          </Button>
        )}
      </div>

    </div>
  );
};

const ProjectsPage = () => {
  const projectsList = [
    {
      title: "EduNest Platform",
      category: "EdTech LMS",
      image: edunest,
      description: "A secure MERN learning management system with JWT role authentication, Razorpay subscriptions, and course analytics.",
      tags: ["React", "Redux", "Node.js", "Express", "MongoDB", "Razorpay", "JWT"],
      problem: "Many education portals lack granular Access Control (RBAC), leaving video nodes vulnerable to scraper bots or subscription bypass. In addition, admins lack unified sales metric summaries.",
      solution: "Engineered strict authentication middlewares using JWT cookies for student vs. instructor vs. admin roles. Embedded checkout gateways and built admin sales dashboards tracking metrics dynamically.",
      challenge: "Implementing payment webhooks securely to ensure course content triggers instantly upon payment success, even when users exit checkout prematurely.",
      result: "Successfully handled subscription unlocks under 200ms with fully encrypted route node protections.",
      links: {
        live: "https://edunestedtech.vercel.app/",
        frontend: "https://github.com/KESHAV4R3/frontend_edunest",
        backend: "https://github.com/KESHAV4R3/backend_edunest"
      }
    },
    {
      title: "Developer Portfolio V2",
      category: "Digital Identity",
      image: portfolio,
      description: "A high-performance personal portfolio site built to display technical experience, featuring email automations and optimized assets.",
      tags: ["React", "Tailwind CSS", "Framer Motion", "Node.js", "Axios"],
      problem: "Static developer portfolios often suffer from sluggish loading speeds due to heavy graphical elements, leading to high bounce rates for mobile hiring managers.",
      solution: "Migrated layouts to pure React components with clean CSS variables. Removed heavy 3D GLTF loaders (50MB+) and consolidated transitions to framer-motion.",
      challenge: "Balancing sleek visual design (glassmorphic containers, dark gradients) with mobile rendering speed and thread unblocking.",
      result: "Drastically reduced bundle footprint, achieving near-perfect LCP speeds and excellent responsive layouts.",
      links: {
        live: "https://portfolio-frontend-lac-theta.vercel.app/",
        frontend: "https://github.com/KESHAV4R3/portfolio_frontend",
        backend: "https://github.com/KESHAV4R3/portfolio_backend"
      }
    },
    {
      title: "SERCH Engine",
      category: "Search Aggregator",
      image: serch,
      description: "A search aggregator combining queries from multiple public developer API streams into a unified layout.",
      tags: ["React", "Redux Toolkit", "RapidAPI", "Axios"],
      problem: "Developers frequently have to query multiple separate API documents to fetch user feeds, repository stats, or package indexes.",
      solution: "Built a centralized engine caching inputs and querying multiple APIs concurrently. Added interactive filtering, tags, and autocompletion templates.",
      challenge: "Managing asynchronous network contention and avoiding API request throttle lockouts during typing inputs.",
      result: "Reduced search latency and implemented search recommendations without hitting API rate caps.",
      links: {
        code: "https://github.com/KESHAV4R3/s_e_r_c_h"
      }
    },
    {
      title: "Jarvis — AI Chat App",
      category: "Chat Application",
      image: jarvis,
      description: "A real-time AI-powered chat web application built with Next.js, WebSockets, Tailwind CSS, and MongoDB for persistent message storage.",
      tags: ["Next.js", "WebSockets", "Tailwind CSS", "MongoDB", "Node.js"],
      problem: "Most chat interfaces lack real-time responsiveness and persistent storage, making it difficult to maintain a seamless conversation experience across sessions.",
      solution: "Built a full-stack chat app with WebSocket connections for instant bidirectional messaging and MongoDB to persist chat history across sessions.",
      challenge: "Handling WebSocket reconnection logic and ensuring message delivery consistency when users temporarily lose network connectivity.",
      result: "Achieved sub-100ms real-time message delivery with full chat history persistence and seamless reconnection handling.",
      links: {
        live: "https://jarvis-8rew.onrender.com/",
        code: "https://github.com/KESHAV4R3/jarvis_webApp"
      }
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="w-full min-h-screen bg-[#050505] text-zinc-100 py-24 selection:bg-zinc-800 selection:text-white">
      {/* Background Grids */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none"></div>
      <div className="absolute inset-0 radial-fade pointer-events-none"></div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto px-6 space-y-12 relative z-10"
      >
        {/* Intro */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center gap-8">
          {/* Image — left side */}
          <div className="flex-shrink-0 w-48 h-48 md:w-56 md:h-56">
            <img
              src={projectsImg}
              alt="Projects Illustration"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Text — right side */}
          <div className="space-y-4 text-center md:text-left flex-1">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 flex items-center justify-center md:justify-start gap-1.5">
              <FiFolder /> Project Archive
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Case <span className="text-zinc-400 font-light italic">Studies</span>.
            </h1>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-2xl pt-2">
              A deep-dive review of my full-stack developments, from core problems to structural solutions and performance audit results.
            </p>
          </div>
        </motion.div>

        {/* Projects Case Study List */}
        <motion.div variants={itemVariants} className="space-y-10">
          {projectsList.map((project, index) => (
            <CaseStudyCard key={index} project={project} />
          ))}
        </motion.div>

      </motion.div>
    </div>
  );
};

export default ProjectsPage;
