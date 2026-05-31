import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCode, FiCpu, FiLayers, FiDatabase, FiBriefcase, FiFolder, FiPhone, FiBookOpen } from 'react-icons/fi';
import Button from '../components/shared/Button';
import resume_keshav from "../assets/application/resume_keshav.pdf";
import { fetchMediumBlogs } from '../services/blogService';
import freshTechAbstract from "../assets/application/fresh_tech_abstract.png";
import ctaAbstract from "../assets/application/cta_abstract.png";

// Project Thumbnails
import edunest from "../assets/projects/edunest.png";
import jarvis from "../assets/projects/jarvis.png";

const HeroVisual = () => {
  return (
    <div className="w-full max-w-sm md:max-w-md mx-auto aspect-square rounded-2xl overflow-hidden shadow-2xl smooth-gpu select-none">
      <img 
        src={freshTechAbstract} 
        alt="Technology Abstract Render" 
        className="w-full h-full object-cover opacity-95"
        loading="eager"
      />
    </div>
  );
};


const HomePage = () => {
  const fallbackBlogsList = [
    {
      title: "Next.js Core Web Vitals Optimization",
      date: "MAY 15, 2026",
      readTime: "6 min read",
      excerpt: "How I boosted production rendering speeds and LCP metrics by 30% utilizing prefetching heuristics and dynamic asset code-splitting rules.",
      link: "https://medium.com/@4r3keshav"
    },
    {
      title: "Refactoring State with Redux Toolkit",
      date: "APRIL 28, 2026",
      readTime: "8 min read",
      excerpt: "Simplifying complex async side-effects, cleaning up modular thunk slices, and securing layout stability by eliminating React memory leaks.",
      link: "https://medium.com/@4r3keshav"
    }
  ];

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const loadBlogs = async () => {
      try {
        const data = await fetchMediumBlogs();
        if (active) {
          if (data && data.length > 0) {
            setBlogs(data.slice(0, 2));
          } else {
            setBlogs(fallbackBlogsList);
          }
          setLoading(false);
        }
      } catch (err) {
        console.error("Failed to load live blogs feed, using fallback list:", err);
        if (active) {
          setBlogs(fallbackBlogsList);
          setLoading(false);
        }
      }
    };
    loadBlogs();
    return () => {
      active = false;
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="w-full min-h-screen bg-[#050505] text-zinc-100 selection:bg-zinc-800 selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-12 overflow-hidden">
        {/* Subtle grid and glows */}
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none"></div>
        <div className="absolute inset-0 radial-fade pointer-events-none"></div>
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-zinc-900/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto w-full px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">


            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.05]"
            >
              I build custom <span className="text-zinc-400 font-light italic">web applications</span> for startups.
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-base md:text-lg text-zinc-400 max-w-xl leading-relaxed"
            >
              Hi, I'm <strong className="text-white font-semibold">Keshav Kumar</strong>, a Full Stack Developer. I build custom, responsive web systems for startups and organizations, blending clean architectures with intelligent AI integrations.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <Button to="/projects" variant="primary">
                View Projects <FiArrowRight className="ml-1.5" />
              </Button>
              <Button to="/contact" variant="secondary">
                Let's Talk
              </Button>
              <Button to={resume_keshav} variant="text">
                Download Resume (PDF)
              </Button>
            </motion.div>
          </div>

          {/* Hero Visual Mockup */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 flex items-center justify-center"
          >
            <HeroVisual />
          </motion.div>
        </div>
      </section>

      {/* 2. VALUE PROPOSITION */}
      <section className="py-20 border-t border-white/5 bg-zinc-950/20 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-xl mb-12">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2">Development Philosophy</h2>
            <p className="text-2xl md:text-3xl font-bold tracking-tight text-white">How I bring ideas to life.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-zinc-900/30 border border-white/5 rounded-xl hover:border-zinc-800 transition-colors">
              <FiCode className="text-zinc-200 text-2xl mb-4" />
              <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-wide">Performance First</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">Optimization is not an afterthought. I ensure fast initial loads and optimized rendering times.</p>
            </div>
            <div className="p-6 bg-zinc-900/30 border border-white/5 rounded-xl hover:border-zinc-800 transition-colors">
              <FiLayers className="text-zinc-200 text-2xl mb-4" />
              <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-wide">Clean Architecture</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">I design modular systems, clean file structures, and structured state trees that scale seamlessly.</p>
            </div>
            <div className="p-6 bg-zinc-900/30 border border-white/5 rounded-xl hover:border-zinc-800 transition-colors">
              <FiDatabase className="text-zinc-200 text-2xl mb-4" />
              <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-wide">Full-Stack Capability</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">Proficient across the front and backend—from responsive React UI to robust Node.js/Express APIs.</p>
            </div>
            <div className="p-6 bg-zinc-900/30 border border-white/5 rounded-xl hover:border-zinc-800 transition-colors">
              <FiCpu className="text-zinc-200 text-2xl mb-4" />
              <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-wide">Direct AI Integration</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">I programmatically connect to model APIs to build dynamic logic and workflows, rather than utilizing them simply for static text generation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. EXPERIENCE HIGHLIGHTS */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 flex items-center gap-1.5">
                <FiBriefcase /> Internship Impact
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">Professional Experience</h2>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Currently optimizing production systems and scaling interfaces at <a href="https://seller.zupper.co/" target="_blank" rel="noopener noreferrer" className="text-white font-semibold hover:text-zinc-300 transition-colors">Zupper Commerce Pvt. Ltd.</a>, where I build and design core admin and seller panels for product listing and application control.
              </p>
              <div className="pt-2">
                <Button to="/experience" variant="secondary" className="text-xs">
                  View Career Timeline
                </Button>
              </div>
            </div>

            <div className="lg:col-span-7 bg-zinc-900/30 border border-white/5 rounded-xl p-6 md:p-8 space-y-6">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="text-lg font-bold text-white">Frontend Developer Intern</h3>
                  <a href="https://seller.zupper.co/" target="_blank" rel="noopener noreferrer" className="text-xs text-zinc-400 hover:text-white transition-colors">Zupper Commerce Pvt. Ltd.</a>
                </div>
                <span className="text-[10px] font-mono px-2 py-1 bg-zinc-900 border border-white/5 rounded text-zinc-400">
                  Jul 2025 - Present
                </span>
              </div>
              <div className="space-y-3 text-xs md:text-sm text-zinc-400 leading-relaxed">
                <div className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full mt-2 flex-shrink-0"></span>
                  <p>Contributed to Zupper’s seller and admin dashboards, building new features and improving workflows using React, Next.js, and Tailwind CSS.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full mt-2 flex-shrink-0"></span>
                  <p>Improved UI/UX and Core Web Vitals by <strong className="text-white">~30%</strong> through component refactoring and optimized rendering patterns.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full mt-2 flex-shrink-0"></span>
                  <p>Designed a secure RBAC + PBAC authorization system using Next.js middleware, enforcing access at the request layer.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full mt-2 flex-shrink-0"></span>
                  <p>Implemented secure private routing, authentication flows, and resolved critical frontend stability issues.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full mt-2 flex-shrink-0"></span>
                  <p>Collaborated in Agile teams to integrate APIs, standardize loading/error states, and deliver clean, scalable features.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED PROJECTS */}
      <section className="py-20 border-t border-white/5 bg-zinc-950/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 flex items-center gap-1.5 mb-2">
                <FiFolder /> Featured Builds
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">Case Studies</h2>
            </div>
            <Button to="/projects" variant="outline" className="text-xs">
              Open Project Archive
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Project 1 */}
            <div className="group bg-zinc-900/30 border border-white/5 rounded-xl overflow-hidden hover:border-zinc-800 transition-all duration-300">
              <div className="h-48 md:h-56 overflow-hidden relative">
                <img 
                  src={edunest} 
                  alt="EduNest LMS Platform" 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-300"
                />
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-bold text-white">EduNest Platform</h3>
                  <span className="text-[10px] font-mono bg-zinc-900 border border-white/5 px-2 py-0.5 rounded text-zinc-400">EdTech LMS</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  A comprehensive MERN stack learning management system with JWT RBAC authentication, Razorpay subscriptions, and detailed student analytics.
                </p>
                <div className="flex gap-2">
                  <span className="text-[9px] font-mono px-2 py-0.5 bg-zinc-900 text-zinc-500 rounded">React</span>
                  <span className="text-[9px] font-mono px-2 py-0.5 bg-zinc-900 text-zinc-500 rounded">Node.js</span>
                  <span className="text-[9px] font-mono px-2 py-0.5 bg-zinc-900 text-zinc-500 rounded">MongoDB</span>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="group bg-zinc-900/30 border border-white/5 rounded-xl overflow-hidden hover:border-zinc-800 transition-all duration-300">
              <div className="h-48 md:h-56 overflow-hidden relative">
                <img 
                  src={jarvis} 
                  alt="Jarvis AI Chat App" 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-300"
                />
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-bold text-white">Jarvis — AI Chat App</h3>
                  <span className="text-[10px] font-mono bg-zinc-900 border border-white/5 px-2 py-0.5 rounded text-zinc-400">Chat App</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  A real-time AI-powered chat app built with Next.js and WebSockets for instant messaging, backed by MongoDB for persistent chat history.
                </p>
                <div className="flex gap-2">
                  <span className="text-[9px] font-mono px-2 py-0.5 bg-zinc-900 text-zinc-500 rounded">Next.js</span>
                  <span className="text-[9px] font-mono px-2 py-0.5 bg-zinc-900 text-zinc-500 rounded">WebSockets</span>
                  <span className="text-[9px] font-mono px-2 py-0.5 bg-zinc-900 text-zinc-500 rounded">MongoDB</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SERVICES OVERVIEW */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 flex items-center gap-1.5 mb-2">
                <FiCode /> Freelance Services
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">Client Offerings</h2>
            </div>
            <Button to="/services" variant="outline" className="text-xs">
              Explore All Services
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-zinc-900/30 border border-white/5 rounded-xl hover:border-zinc-800 transition-colors">
              <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-wide">Full-Stack Apps</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">Building end-to-end web applications with custom database structures, robust server APIs, secure auth systems, and responsive frontends.</p>
            </div>
            <div className="p-6 bg-zinc-900/30 border border-white/5 rounded-xl hover:border-zinc-800 transition-colors">
              <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-wide">Next.js & SEO Apps</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">Search-engine optimized applications built for speed, indexability, metadata markup, and high-ranking organic Google search visibility.</p>
            </div>
            <div className="p-6 bg-zinc-900/30 border border-white/5 rounded-xl hover:border-zinc-800 transition-colors">
              <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-wide">AI & API Integration</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">Seamless wiring of backend rest endpoints, secure authentication systems, and intelligent LLM integrations (like vector search and custom prompts).</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS PLACEHOLDER / TRUST BLOCK */}
      <section className="py-20 border-t border-white/5 bg-zinc-950/20">
        <div className="max-w-6xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">Credibility</h2>
          <div className="max-w-xl mx-auto">
            <p className="text-lg md:text-xl text-zinc-300 italic">
              "Focused on building clean code systems, driving product performance targets, and maintaining transparent milestones."
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-6 opacity-80 text-[10px] tracking-widest font-mono text-zinc-300">
            <span>LEETCODE: 150+ SOLVED</span>
            <span>•</span>
            <span>CORE WEB VITALS: +30% SPEED</span>
            <span>•</span>
            <span>PRODUCTION EXPERIENCE</span>
          </div>
        </div>
      </section>

      {/* 6.2. SERVICE VIDEO CALLOUT SECTION */}
      <section className="py-24 border-t border-white/5 bg-zinc-950/40 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">Service Showcase</span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Want to build something <span className="text-zinc-400 font-light italic">great</span> that impacts your users?
            </h2>
            <p className="text-sm md:text-base text-zinc-400 leading-relaxed max-w-xl">
              I partner with startups and founders to build scalable digital products, develop modern web apps, and integrate intelligent AI tools that automate workflows and elevate user experiences. If you are looking to bring a product idea to life or integrate smart features into your systems, let's connect.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button to="/services" variant="primary">
                Explore Services &rarr;
              </Button>
              <Button to="/contact" variant="secondary">
                Get a Quote
              </Button>
            </div>
          </div>
          <div className="lg:col-span-5">
            {/* Video Showcase Mockup */}
            <div className="relative w-full aspect-video rounded-2xl bg-zinc-900 border border-white/5 overflow-hidden shadow-2xl group cursor-pointer smooth-gpu">
              {/* Play Overlay */}
              <div className="absolute inset-0 flex flex-col justify-between p-4 z-10 bg-black/20">
                <div className="flex justify-between items-center text-[9px] font-mono text-zinc-400 bg-black/50 backdrop-blur px-2.5 py-1 rounded-full border border-white/5 self-start">
                  <span>SHOWCASE_DEMO.MP4</span>
                </div>
                
                {/* Center Play Button */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 fill-current translate-x-0.5" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  {/* Outer pulse */}
                  <div className="absolute w-18 h-18 rounded-full border border-white/20 animate-ping pointer-events-none opacity-40"></div>
                </div>
                
                <div className="flex items-center justify-between text-[9px] font-mono text-zinc-500 w-full">
                  <span>0:00 / 2:45</span>
                  <span>1080P HD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6.5. RECENT WRITINGS (MEDIUM) */}
      <section className="py-20 border-t border-white/5 bg-[#050505] relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 flex items-center gap-1.5 mb-2">
                <FiBookOpen /> Technical Writings
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">Recent Articles</h2>
            </div>
            <Button to="/blogs" variant="outline" className="text-xs">
              View Publication Log
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loading ? (
              Array.from({ length: 2 }).map((_, idx) => (
                <div key={idx} className="p-6 bg-zinc-900/30 border border-white/5 rounded-xl animate-pulse space-y-4">
                  <div className="w-24 h-3 bg-zinc-900 rounded"></div>
                  <div className="w-3/4 h-5 bg-zinc-900 rounded"></div>
                  <div className="space-y-2">
                    <div className="w-full h-3 bg-zinc-900 rounded"></div>
                    <div className="w-5/6 h-3 bg-zinc-900 rounded"></div>
                  </div>
                  <div className="w-20 h-4 bg-zinc-900 rounded pt-2"></div>
                </div>
              ))
            ) : (
              blogs.map((post, index) => (
                <div key={index} className="p-6 bg-zinc-900/30 border border-white/5 rounded-xl hover:border-zinc-800 transition-colors space-y-4 flex flex-col justify-between smooth-gpu">
                  <div className="space-y-4">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">{post.date} // {post.readTime}</span>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wide">{post.title}</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">{post.excerpt}</p>
                  </div>
                  <div className="pt-2">
                    <a 
                      href={post.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-xs font-semibold text-white inline-flex items-center gap-1 hover:text-zinc-300 transition-colors cursor-pointer"
                    >
                      Read on Medium &rarr;
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* 7. CTA SECTION */}
      <section className="py-24 border-t border-white/5 relative overflow-hidden bg-zinc-950/10">
        <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none"></div>
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6 text-left">
            <FiPhone className="text-3xl text-zinc-400" />
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Let's build something <span className="text-zinc-400 font-light italic">premium</span>.
            </h2>
            <p className="text-sm md:text-base text-zinc-400 leading-relaxed max-w-xl">
              Whether you are a startup founder looking for web builds, or a recruiter looking for a full stack engineer, my inbox is open. Let's design and engineer high-performance software systems that scale.
            </p>
            <div className="pt-2">
              <Button to="/contact" variant="primary">
                Initiate Contact <FiArrowRight className="ml-1.5" />
              </Button>
            </div>
          </div>
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md aspect-[4/3] overflow-hidden smooth-gpu select-none">
              <img 
                src={ctaAbstract} 
                alt="Premium 3D Holographic Grid Network" 
                className="w-full h-full object-cover opacity-90 hover:scale-[1.02] transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;