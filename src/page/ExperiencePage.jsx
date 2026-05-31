import React from 'react';
import { motion } from 'framer-motion';
import { FiBriefcase, FiCheckSquare, FiTrendingUp, FiActivity, FiGlobe, FiClock, FiCode, FiShield, FiSliders, FiUsers, FiExternalLink } from 'react-icons/fi';
import Button from '../components/shared/Button';
import experienceImg from '../assets/experience_object.png';

const MetricBadge = ({ value, label }) => (
  <div className="p-4 bg-zinc-900/30 border border-white/5 rounded-xl space-y-1 text-left">
    <div className="text-2xl font-extrabold text-white tracking-tight">{value}</div>
    <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">{label}</div>
  </div>
);

const ExperiencePage = () => {
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
              src={experienceImg}
              alt="Experience Illustration"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Text — right side */}
          <div className="space-y-4 text-center md:text-left flex-1">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 flex items-center justify-center md:justify-start gap-1.5">
              <FiBriefcase /> Career Profile
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Professional <span className="text-zinc-400 font-light italic">Experience</span>.
            </h1>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-2xl pt-2">
              A review of my industry roles, contributions, and the measurable impact I have shipped to production systems.
            </p>
          </div>
        </motion.div>

        {/* Core Metrics Summary */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
          <MetricBadge value="+30%" label="Core Web Vitals Boost" />
          <MetricBadge value="Next.js" label="Refactored codebase" />
          <MetricBadge value="MSG91" label="SMS Integrations" />
          <MetricBadge value="Agile" label="Product Team cycles" />
        </motion.div>

        {/* Detailed Career Timeline Entry */}
        <motion.div variants={itemVariants} className="bg-zinc-900/10 border border-white/5 rounded-2xl p-6 md:p-8 space-y-8 mt-6">
          
          {/* Header Block */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-white/5">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-white tracking-tight">Frontend Developer Intern</h2>
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <a
                  href="https://seller.zupper.co/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-zinc-300 hover:text-white transition-colors flex items-center gap-1"
                >
                  Zupper Commerce Pvt. Ltd. <FiExternalLink size={12} />
                </a>
                <span>•</span>
                <span className="flex items-center gap-1"><FiGlobe size={12} /> Remote</span>
              </div>
            </div>
            <div className="flex flex-col sm:items-end gap-2 text-xs font-mono text-zinc-500">
              <span className="px-2.5 py-1 bg-zinc-900 border border-white/5 rounded text-zinc-400 flex items-center gap-1.5">
                <FiClock /> Jul 2025 – Present
              </span>
              <a
                href="https://seller.zupper.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 bg-zinc-900 border border-white/5 rounded text-zinc-400 flex items-center gap-1.5 hover:text-white hover:border-zinc-700 transition-colors"
              >
                <FiExternalLink size={11} /> Visit Live App
              </a>
            </div>
          </div>

          {/* Detailed Contributions */}
          <div className="space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Key Contributions & Accomplishments</h3>
            
            <div className="space-y-6 text-sm text-zinc-400 leading-relaxed">
              
              {/* Point 1 */}
              <div className="flex items-start gap-3.5">
                <div className="p-1.5 bg-zinc-900 border border-white/5 rounded-lg text-white mt-0.5">
                  <FiSliders size={14} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-semibold text-zinc-200">Dashboard & Workflow Development</h4>
                  <p className="text-xs">
                    Contributed to the development of Zupper’s seller and admin dashboards by building new features and improving frontend workflows using React, Next.js, and Tailwind CSS.
                  </p>
                </div>
              </div>

              {/* Point 2 */}
              <div className="flex items-start gap-3.5">
                <div className="p-1.5 bg-zinc-900 border border-white/5 rounded-lg text-white mt-0.5">
                  <FiTrendingUp size={14} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-semibold text-zinc-200">UI/UX & Core Web Vitals Optimization</h4>
                  <p className="text-xs">
                    Improved UI/UX and Core Web Vitals by ~30% through component refactoring, optimized rendering patterns, efficient state management, and modular design approaches.
                  </p>
                </div>
              </div>

              {/* Point 3 */}
              <div className="flex items-start gap-3.5">
                <div className="p-1.5 bg-zinc-900 border border-white/5 rounded-lg text-white mt-0.5">
                  <FiShield size={14} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-semibold text-zinc-200">RBAC + PBAC Authorization System</h4>
                  <p className="text-xs">
                    Designed and implemented a secure Role-Based (RBAC) + Policy-Based (PBAC) authorization system for the admin platform using Next.js middleware, centralized policy mapping, and cookie-based authentication. Enabled sub-role support (e.g., admin → manager, ops) with action-level permissions (CRUD), enforcing authorization at the request layer rather than relying on UI-level checks.
                  </p>
                </div>
              </div>

              {/* Point 4 */}
              <div className="flex items-start gap-3.5">
                <div className="p-1.5 bg-zinc-900 border border-white/5 rounded-lg text-white mt-0.5">
                  <FiCheckSquare size={14} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-semibold text-zinc-200">Access Control & Production Debugging</h4>
                  <p className="text-xs">
                    Implemented secure private routing and authentication flows to ensure proper access control and application security. Debugged and resolved critical frontend issues, significantly improving application stability and runtime reliability.
                  </p>
                </div>
              </div>

              {/* Point 5 */}
              <div className="flex items-start gap-3.5">
                <div className="p-1.5 bg-zinc-900 border border-white/5 rounded-lg text-white mt-0.5">
                  <FiUsers size={14} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-semibold text-zinc-200">Agile API Integration & Standards</h4>
                  <p className="text-xs">
                    Collaborated closely with backend, product, and QA teams in an Agile environment to integrate REST APIs, standardize loading/error states, validate response structures, and deliver scalable, production-ready features under clean architecture principles.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Tech Tag Capsule */}
          <div className="pt-6 border-t border-white/5 flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-mono text-zinc-500 mr-2 uppercase tracking-wider">Technologies deployed:</span>
            {["React", "Next.js", "Redux Toolkit", "Redux Thunk", "Tailwind CSS", "Apidog", "Postman", "GitHub Actions"].map((tech) => (
              <span key={tech} className="text-[10px] font-mono px-2 py-0.5 bg-zinc-900 border border-white/5 rounded text-zinc-400">
                {tech}
              </span>
            ))}
          </div>

        </motion.div>

        {/* Contact CTA Redirect */}
        <motion.div variants={itemVariants} className="pt-6 text-center">
          <p className="text-xs text-zinc-500 mb-4">Want detailed reference letters or case writeups?</p>
          <Button to="/contact" variant="outline">
            Request Reference Details
          </Button>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default ExperiencePage;
