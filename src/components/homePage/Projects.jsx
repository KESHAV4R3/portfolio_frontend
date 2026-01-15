import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiExternalLink, FiX } from "react-icons/fi";

import edunest from "../../assets/projects/edunest.png";
import portfolio from "../../assets/projects/portfolio.png";
import serch from "../../assets/projects/serch.png";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: "SYS_01",
      title: "EduNest Platform",
      category: "EdTech LMS",
      description:
        "A MERN stack learning management system with authentication, payments, and student progress tracking.",
      imageUrl: edunest,
      tags: ["React", "Node.js", "MongoDB", "Redux", "Razorpay", "JWT"],
      links: {
        live: "https://edunestedtech.vercel.app/",
        frontend: "https://github.com/KESHAV4R3/frontend_edunest",
        backend: "https://github.com/KESHAV4R3/backend_edunest",
      },
    },
    {
      id: "SYS_02",
      title: "Portfolio V2",
      category: "Digital Identity",
      description:
        "A modern portfolio website with animations, responsive layout, and optimized performance.",
      imageUrl: portfolio,
      tags: ["React", "Tailwind CSS", "Framer Motion", "NodeMailer"],
      links: {
        live: "https://portfolio-frontend-lac-theta.vercel.app/",
        frontend: "https://github.com/KESHAV4R3/portfolio_frontend",
        backend: "https://github.com/KESHAV4R3/portfolio_backend",
      },
    },
    {
      id: "SYS_03",
      title: "SERCH Engine",
      category: "Search Aggregator",
      description:
        "A Google-like search experience aggregating data from multiple APIs with filters and suggestions.",
      imageUrl: serch,
      tags: ["React", "Redux", "RapidAPI", "Axios"],
      links: {
        code: "https://github.com/KESHAV4R3/s_e_r_c_h",
      },
    },
  ];

  return (
    <section className="bg-[#050505] px-6 md:px-24 py-20 font-mono">
      <h2 className="text-center text-4xl md:text-6xl font-bold uppercase mb-16">
        Project <span className="text-green-500">Archive</span>
      </h2>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map((p, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="bg-[#0a0a0a] border border-gray-800 hover:border-green-500 transition-all p-6"
          >
            <img
              src={p.imageUrl}
              alt={p.title}
              className="w-full h-48 object-cover mb-4 opacity-70"
            />

            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold">{p.title}</h3>
              <span className="text-[10px] bg-gray-900 px-2 py-1 rounded">
                {p.id}
              </span>
            </div>

            <p className="text-green-500 text-xs uppercase mt-1">
              {p.category}
            </p>

            <p className="text-gray-400 text-sm mt-3 line-clamp-3">
              {p.description}
            </p>

            <button
              onClick={() => setSelectedProject(p)}
              className="mt-6 w-full bg-green-600 hover:bg-green-500 text-black font-bold text-xs py-3 uppercase"
            >
              View Details
            </button>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="bg-[#0a0a0a] border border-green-500/30 rounded-lg w-full max-w-2xl"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-green-500">
                    {selectedProject.title}
                  </h3>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-gray-400 hover:text-white"
                  >
                    <FiX size={20} />
                  </button>
                </div>

                <p className="text-gray-300 text-sm">
                  {selectedProject.description}
                </p>

                <div>
                  <h4 className="text-green-500 text-sm mb-2">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-800 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-gray-800">
                  {selectedProject.links.live && (
                    <a
                      href={selectedProject.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between border border-gray-700 hover:border-green-500 px-4 py-3 rounded"
                    >
                      Live Demo <FiExternalLink />
                    </a>
                  )}

                  {selectedProject.links.frontend && (
                    <a
                      href={selectedProject.links.frontend}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between border border-gray-700 hover:border-green-500 px-4 py-3 rounded"
                    >
                      Frontend Code <FiGithub />
                    </a>
                  )}

                  {selectedProject.links.backend && (
                    <a
                      href={selectedProject.links.backend}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between border border-gray-700 hover:border-green-500 px-4 py-3 rounded"
                    >
                      Backend Code <FiGithub />
                    </a>
                  )}

                  {selectedProject.links.code && (
                    <a
                      href={selectedProject.links.code}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between border border-gray-700 hover:border-green-500 px-4 py-3 rounded"
                    >
                      View Code <FiGithub />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
