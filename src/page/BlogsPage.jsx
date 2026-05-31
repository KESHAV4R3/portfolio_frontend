import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiBookOpen, FiArrowRight, FiClock, FiExternalLink, FiAlertCircle } from 'react-icons/fi';
import Button from '../components/shared/Button';
import { fetchMediumBlogs } from '../services/blogService';
import blogsImg from '../assets/blogs_object.png';

const BlogCard = ({ post }) => {
  return (
    <div className="bg-zinc-900/10 border border-white/5 rounded-2xl p-6 md:p-8 hover:border-zinc-800 transition-all duration-300 flex flex-col justify-between space-y-4 smooth-gpu">
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-4 text-[10px] font-mono text-zinc-500">
          <span>{post.date}</span>
          <span className="flex items-center gap-1"><FiClock /> {post.readTime}</span>
        </div>
        <h2 className="text-lg font-bold text-white tracking-tight hover:text-zinc-300 transition-colors">
          <a href={post.link} target="_blank" rel="noopener noreferrer" className="cursor-pointer">{post.title}</a>
        </h2>
        <p className="text-xs text-zinc-400 leading-relaxed">{post.excerpt}</p>
      </div>

      <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-4">
        <div className="flex flex-wrap gap-1.5">
          {post.tags.map(tag => (
            <span key={tag} className="text-[9px] font-mono px-2 py-0.5 bg-zinc-900 text-zinc-500 rounded uppercase">
              {tag}
            </span>
          ))}
        </div>
        
        <a 
          href={post.link} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-xs font-semibold text-white hover:text-zinc-300 flex items-center gap-1 cursor-pointer flex-shrink-0"
        >
          Read <FiExternalLink size={12} />
        </a>
      </div>
    </div>
  );
};

const BlogSkeletonCard = () => (
  <div className="bg-zinc-900/10 border border-white/5 rounded-2xl p-6 md:p-8 space-y-4 animate-pulse">
    <div className="space-y-3">
      <div className="flex justify-between items-center text-[10px] font-mono text-zinc-700">
        <div className="w-20 h-3 bg-zinc-900 rounded"></div>
        <div className="w-16 h-3 bg-zinc-900 rounded"></div>
      </div>
      <div className="w-3/4 h-5 bg-zinc-900 rounded mt-2"></div>
      <div className="space-y-2 mt-3">
        <div className="w-full h-3 bg-zinc-900 rounded"></div>
        <div className="w-5/6 h-3 bg-zinc-900 rounded"></div>
      </div>
    </div>
    <div className="pt-6 border-t border-white/5 flex justify-between items-center">
      <div className="flex gap-2">
        <div className="w-12 h-3.5 bg-zinc-900 rounded"></div>
        <div className="w-12 h-3.5 bg-zinc-900 rounded"></div>
      </div>
      <div className="w-10 h-3.5 bg-zinc-900 rounded"></div>
    </div>
  </div>
);

const BlogsPage = () => {
  const fallbackBlogsList = [
    {
      title: "How I Boosted Core Web Vitals by 30% in a Next.js Production Build",
      date: "May 15, 2026",
      readTime: "6 min read",
      excerpt: "A practical guide to diagnosing layout shifts, tree-shaking third-party loaders, and configuring dynamic prefetching rules in Next.js applications.",
      tags: ["Next.js", "Performance", "SEO"],
      link: "https://medium.com/@4r3keshav"
    },
    {
      title: "Deep Dive: Refactoring Redux Thunk into Clean Redux Toolkit Slices",
      date: "April 28, 2026",
      readTime: "8 min read",
      excerpt: "Explaining how to modularize complex async side-effects, simplify global state selection rules, and eliminate common React render-loop memory leaks.",
      tags: ["React", "Redux", "State"],
      link: "https://medium.com/@4r3keshav"
    },
    {
      title: "Setting up Robust CI/CD Build Pipelines with GitHub Actions",
      date: "March 12, 2026",
      readTime: "5 min read",
      excerpt: "Resolving Webpack module resolution mismatches, configuring dependency cache rules, and ensuring regression-free deploys for React apps.",
      tags: ["CI/CD", "Actions", "DevOps"],
      link: "https://medium.com/@4r3keshav"
    },
    {
      title: "Agile API Debugging: Transitioning from Postman to Apidog for Team Sync",
      date: "February 20, 2026",
      readTime: "4 min read",
      excerpt: "How to automate request validation, synchronize endpoint specs, and generate mock payloads within agile software workflows.",
      tags: ["API Testing", "Apidog", "Workflows"],
      link: "https://medium.com/@4r3keshav"
    }
  ];

  const [blogsList, setBlogsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let active = true;
    const loadBlogs = async () => {
      try {
        const data = await fetchMediumBlogs();
        if (active) {
          if (data && data.length > 0) {
            setBlogsList(data);
            setIsLive(true);
          } else {
            setBlogsList(fallbackBlogsList);
            setIsLive(false);
          }
          setLoading(false);
        }
      } catch (err) {
        console.error("Failed to load live blogs feed, using fallback list:", err);
        if (active) {
          setBlogsList(fallbackBlogsList);
          setIsLive(false);
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
              src={blogsImg}
              alt="Technical Writing Illustration"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Text — right side */}
          <div className="space-y-4 text-center md:text-left flex-1">
            <div className="flex items-center justify-center md:justify-between">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 flex items-center gap-1.5">
                <FiBookOpen /> Publication Logs
              </span>
              {isLive && (
                <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/5 px-2 py-0.5 border border-emerald-500/10 rounded flex items-center gap-1 select-none">
                  <span className="w-1 h-1 bg-emerald-400 rounded-full animate-ping"></span>
                  LIVE FROM MEDIUM
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Technical <span className="text-zinc-400 font-light italic">Writing</span>.
            </h1>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-2xl pt-2">
              I write articles explaining how to resolve complex engineering bottlenecks, build modular state flows, and secure web architectures.
            </p>
          </div>
        </motion.div>

        {/* Blogs Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading ? (
            Array.from({ length: 4 }).map((_, idx) => (
              <BlogSkeletonCard key={idx} />
            ))
          ) : (
            blogsList.map((post, index) => (
              <BlogCard key={index} post={post} />
            ))
          )}
        </motion.div>

        {/* Profile CTA */}
        <motion.div variants={itemVariants} className="bg-zinc-900/20 border border-white/5 rounded-2xl p-6 text-center space-y-4">
          <p className="text-sm text-zinc-300 font-medium">Follow my latest updates on Medium</p>
          <p className="text-xs text-zinc-500 max-w-md mx-auto leading-relaxed">
            I regularly publish analyses on React, state optimization, bundler rules, and production web performance diagnostics.
          </p>
          <div className="pt-2">
            <Button to="https://medium.com/@4r3keshav" variant="primary">
              Visit Medium Profile <FiArrowRight className="ml-1.5" />
            </Button>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default BlogsPage;
