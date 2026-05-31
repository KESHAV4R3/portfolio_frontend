import React from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiCode, FiTerminal, FiBriefcase, FiCheckCircle, FiMousePointer, FiShield } from 'react-icons/fi';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGitAlt, FaGithub, FaJira } from "react-icons/fa";
import { SiTypescript, SiNextdotjs, SiRedux, SiTailwindcss, SiMui, SiExpress, SiMongodb, SiVercel, SiPostman, SiRender, SiFirebase, SiRazorpay } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import aboutImg from "../assets/about_object.png";

const SkillCard = ({ name, Icon, color }) => {
  return (
    <div className="flex items-center gap-3 p-3 bg-zinc-900/30 border border-white/5 rounded-lg hover:border-zinc-800 transition-all duration-300 group">
      <span className="text-xl text-zinc-500 group-hover:text-white transition-colors duration-300">
        <Icon />
      </span>
      <span className="text-xs font-medium text-zinc-400 group-hover:text-white transition-colors duration-300">{name}</span>
    </div>
  );
};

const AboutPage = () => {
  const skillsData = {
    frontend: [
      { name: "React", icon: FaReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Redux / Thunk", icon: SiRedux },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Material UI", icon: SiMui },
      { name: "JavaScript (ES6+)", icon: FaJs },
      { name: "HTML5 / CSS3", icon: FaHtml5 },
    ],
    backend: [
      { name: "Node.js", icon: FaNodeJs },
      { name: "Express.js", icon: SiExpress },
      { name: "MongoDB", icon: SiMongodb },
      { name: "SQL Databases", icon: SiMongodb }, // MySQL representation
    ],
    devops: [
      { name: "Git", icon: FaGitAlt },
      { name: "GitHub Actions", icon: FaGithub },
      { name: "VS Code", icon: VscVscode },
      { name: "Cursor.AI", icon: FiMousePointer },
      { name: "APIdog", icon: FiTerminal },
      { name: "OAuth", icon: FiShield },
      { name: "Razorpay", icon: SiRazorpay },
      { name: "Postman", icon: SiPostman },
      { name: "Vercel / Render", icon: SiVercel },
      { name: "Firebase", icon: SiFirebase },
      { name: "Jira / Agile", icon: FaJira },
    ]
  };

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
        className="max-w-4xl mx-auto px-6 space-y-20 relative z-10"
      >
        
        {/* Intro Header */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center gap-8 md:gap-10">
          {/* Image — left side */}
          <div className="flex-shrink-0 w-48 h-48 md:w-56 md:h-56">
            <img 
              src={aboutImg} 
              alt="About Illustration" 
              className="w-full h-full object-contain"
            />
          </div>

          {/* Text — right side */}
          <div className="space-y-4 text-center md:text-left flex-1">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 flex items-center justify-center md:justify-start gap-1.5">
              <FiUser /> About Me
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              I write code to optimize <br />
              <span className="text-zinc-400 font-light italic">user experiences</span>.
            </h1>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed pt-2">
              I am a Full Stack Developer specializing in front-end performance, state optimization, and web security. With hands-on intern experience shipping code in production, I focus on constructing clean codebases that perform exceptionally.
            </p>
          </div>
        </motion.div>

        {/* Development Philosophy */}
        <motion.div variants={itemVariants} className="space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">Philosophy</h2>
            <p className="text-2xl md:text-3xl font-bold tracking-tight text-white">Core guidelines that I follow.</p>
          </div>

          <div className="flex flex-col items-center w-full relative">
            {/* Root Node */}
            <div className="px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white font-mono text-[10px] uppercase tracking-wider relative z-10 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-400"></span>
              <span>PHILOSOPHY_ROOT</span>
            </div>
            
            {/* Vertical Trunk Line from Root */}
            <div className="w-px h-8 bg-zinc-800"></div>

            {/* Branch Wrapper */}
            <div className="w-full relative">
              {/* Horizontal Split Line */}
              <div className="absolute top-0 left-1/4 right-1/4 h-px bg-zinc-800 hidden md:block"></div>
              {/* Vertical drops to columns */}
              <div className="absolute top-0 left-1/4 w-px h-6 bg-zinc-800 hidden md:block"></div>
              <div className="absolute top-0 right-1/4 w-px h-6 bg-zinc-800 hidden md:block"></div>

              {/* Two Columns Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 pt-6 w-full">
                {/* Column 1 (Left Branch) */}
                <div className="space-y-6 flex flex-col items-center">
                  {/* Child Card 1 */}
                  <div className="p-5 bg-zinc-900/10 border border-white/5 rounded-xl hover:border-zinc-800 hover:bg-zinc-900/20 transition-all duration-300 w-full text-left relative group">
                    <div className="absolute -top-3 left-4 px-2 py-0.5 bg-zinc-900 border border-white/5 rounded text-[8px] font-mono text-zinc-500 group-hover:text-white transition-colors">
                      CHILD_NODE_01
                    </div>
                    <h3 className="font-semibold text-white text-xs md:text-sm">1. Core Web Vitals Optimization</h3>
                    <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                      Performance is usability. I focus heavily on optimizing page load speeds, minimizing render-blocking script times, and securing excellent mobile layout stability scores.
                    </p>
                  </div>

                  {/* Child Card 2 */}
                  <div className="p-5 bg-zinc-900/10 border border-white/5 rounded-xl hover:border-zinc-800 hover:bg-zinc-900/20 transition-all duration-300 w-full text-left relative group">
                    <div className="absolute -top-3 left-4 px-2 py-0.5 bg-zinc-900 border border-white/5 rounded text-[8px] font-mono text-zinc-500 group-hover:text-white transition-colors">
                      CHILD_NODE_02
                    </div>
                    <h3 className="font-semibold text-white text-xs md:text-sm">2. Clean & Componentized Architectures</h3>
                    <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                      Writing scalable code is about encapsulation and predictability. I implement clean directory separations, modular state flows (using toolkit slices), and reusable layout components.
                    </p>
                  </div>
                </div>

                {/* Column 2 (Right Branch) */}
                <div className="space-y-6 flex flex-col items-center">
                  {/* Child Card 3 */}
                  <div className="p-5 bg-zinc-900/10 border border-white/5 rounded-xl hover:border-zinc-800 hover:bg-zinc-900/20 transition-all duration-300 w-full text-left relative group">
                    <div className="absolute -top-3 left-4 px-2 py-0.5 bg-zinc-900 border border-white/5 rounded text-[8px] font-mono text-zinc-500 group-hover:text-white transition-colors">
                      CHILD_NODE_03
                    </div>
                    <h3 className="font-semibold text-white text-xs md:text-sm">3. Programmatic AI Integration</h3>
                    <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                      I build direct integrations with AI model APIs, wiring them programmatically as functional application logic rather than using them purely for static copy or basic wrappers.
                    </p>
                  </div>

                  {/* Child Card 4 */}
                  <div className="p-5 bg-zinc-900/10 border border-white/5 rounded-xl hover:border-zinc-800 hover:bg-zinc-900/20 transition-all duration-300 w-full text-left relative group">
                    <div className="absolute -top-3 left-4 px-2 py-0.5 bg-zinc-900 border border-white/5 rounded text-[8px] font-mono text-zinc-500 group-hover:text-white transition-colors">
                      CHILD_NODE_04
                    </div>
                    <h3 className="font-semibold text-white text-xs md:text-sm">4. Structured & Timely Delivery</h3>
                    <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                      I believe in professional, clear deadlines. I outline development milestones, coordinate clean code releases, and validate end-to-end user flows systematically.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Career Timeline */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <FiBriefcase className="text-zinc-500" /> Career Journey
            </h2>
            <p className="text-xs text-zinc-500 mt-2">My professional and educational milestones.</p>
          </div>
          <div className="md:col-span-8 border-l border-zinc-800 pl-6 space-y-8 relative">
            <div className="relative">
              <div className="absolute -left-[30px] top-1.5 w-2 h-2 rounded-full bg-white ring-4 ring-zinc-950"></div>
              <span className="text-[10px] font-mono text-zinc-500">JULY 2025 - PRESENT</span>
              <h3 className="text-sm font-bold text-white mt-1">Frontend Developer Intern</h3>
              <p className="text-xs text-zinc-400 font-medium">Zupper Commerce Pvt. Ltd.</p>
              <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                Designing and building responsive admin and seller panels for product listing and application control, refactoring state models, and resolving automated testing pipelines in Agile environments.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -left-[30px] top-1.5 w-2 h-2 rounded-full bg-zinc-800 ring-4 ring-zinc-950"></div>
              <span className="text-[10px] font-mono text-zinc-500">2024 - 2025</span>
              <h3 className="text-sm font-bold text-white mt-1">Self-Directed Development & Projects</h3>
              <p className="text-xs text-zinc-400 font-medium">Independent Research</p>
              <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                Solved 150+ coding problems on Leetcode, constructed full-stack MERN systems (EduNest LMS), and designed modular email templates.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Tech Arsenal (Refactored Skills) */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <FiTerminal className="text-zinc-500" /> Skills & Tools
            </h2>
            <p className="text-xs text-zinc-500 mt-2">Languages, frameworks, and developer tools I work with.</p>
          </div>
          <div className="md:col-span-8 space-y-8">
            
            {/* Frontend Skills */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Frontend & Interface</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {skillsData.frontend.map((skill, index) => (
                  <SkillCard key={index} name={skill.name} Icon={skill.icon} />
                ))}
              </div>
            </div>

            {/* Backend Skills */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Backend & Database</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {skillsData.backend.map((skill, index) => (
                  <SkillCard key={index} name={skill.name} Icon={skill.icon} />
                ))}
              </div>
            </div>

            {/* DevOps Skills */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">DevOps & Tooling</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {skillsData.devops.map((skill, index) => (
                  <SkillCard key={index} name={skill.name} Icon={skill.icon} />
                ))}
              </div>
            </div>

          </div>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default AboutPage;
