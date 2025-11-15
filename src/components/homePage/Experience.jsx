import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentSection } from "../../redux/slice/applicationSlice";

const Experience = () => {
  const dispatch = useDispatch();
  const sectionRef = useRef(null);
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      dispatch(updateCurrentSection("Experience"));
    }
  }, [inView, dispatch]);

  const experiences = [
    {
      company: "Zupper Commerce Pvt. Ltd.",
      position: "Frontend Developer Intern",
      duration: "Jul 2025 – October 2025",
      location: "Remote",
      website: "https://seller.zupper.co",
      points: [
        "Engineered responsive UI for seller/admin features (product listing, views, modals) to improve workflow",
        "Boosted performance and scalability by debugging, refactoring, and modularizing legacy code",
        "Collaborated in an Agile environment using Git and peer reviews to maintain code quality and meet sprint goals"
      ]
    }
  ];

  return (
    <section ref={ref} id="experience" className="py-1 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400 mb-4">
            Experience
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full"></div>
        </motion.div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-cyan-400 transform -translate-x-1/2"></div>
          
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className={`relative mb-16 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Timeline dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 md:left-0 md:right-auto md:translate-x-0 w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 border-4 border-gray-900 z-10"></div>
              
              <div className="bg-gray-800 rounded-xl p-8 shadow-2xl transform transition-all duration-300 hover:scale-[1.02]">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-2xl font-bold text-blue-400">{exp.position}</h3>
                    <a 
                      href={exp.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xl font-semibold text-white hover:text-blue-400 transition-colors inline-flex items-center"
                    >
                      @ {exp.company}
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                  <div className="px-4 py-2 bg-gray-700 rounded-lg text-sm font-medium">
                    {exp.duration}
                  </div>
                </div>
                
                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <ul className="space-y-3">
                    {exp.points.map((point, i) => (
                      <li key={i} className="flex items-start group">
                        <span className="text-blue-400 mr-3 mt-1 transform group-hover:scale-125 transition-transform">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </span>
                        <span className="text-gray-200">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-4 flex items-center text-sm text-gray-400">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {exp.location}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
