import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ServicesShowcase = () => {
  const [activeService, setActiveService] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const services = [
    {
      title: "Frontend Development",
      description:
        "I build modern, responsive interfaces that engage users and drive conversions. What I can create for you:",
      details: [
        "Single Page Applications (SPAs) with React.js",
        "Server-rendered apps with Next.js for better SEO",
        "Interactive dashboards with real-time data visualization",
        "E-commerce storefronts with shopping carts and product filters",
        "Admin panels with complex data tables and forms",
        "Animation-rich landing pages that tell your story",
      ],
      icon: "💻",
    },
    {
      title: "Backend Development",
      description:
        "I architect scalable server solutions that power your applications. What I can build:",
      details: [
        "RESTful APIs with Express.js and Node.js",
        "Authentication systems (JWT, OAuth, sessions)",
        "Database models and relationships in MongoDB",
        "Payment processing integrations (Stripe, PayPal)",
        "File upload and cloud storage solutions",
        "Real-time features with WebSockets",
        "Automated email systems and notification services",
      ],
      icon: "⚙️",
    },
    {
      title: "Full-Stack Solutions",
      description:
        "End-to-end web applications with seamless frontend-backend integration. Examples include:",
      details: [
        "Social media platforms with user profiles and feeds",
        "Task management systems with collaboration features",
        "Content management systems (CMS) with rich text editing",
        "Booking and reservation systems with calendars",
        "Learning management systems with progress tracking",
        "Custom CRM solutions tailored to your workflow",
      ],
      icon: "🔗",
    },
    {
      title: "API Development",
      description:
        "I design robust APIs that serve multiple clients. My API solutions include:",
      details: [
        "Documented REST APIs with Swagger/OpenAPI",
        "GraphQL endpoints with optimized queries",
        "Rate limiting and API key authentication",
        "Webhook integrations with third-party services",
        "Microservices architecture with clear boundaries",
        "WebSocket APIs for real-time communication",
      ],
      icon: "📡",
    },
    {
      title: "Collaboration & Consulting",
      description: "Beyond coding, I provide valuable partnership through:",
      details: [
        "Git workflow setup and team collaboration strategies",
        "Agile development processes and sprint planning",
        "Code reviews and architecture consultations",
        "Technical documentation and knowledge transfer",
        "Performance optimization audits",
        "Legacy code modernization plans",
      ],
      icon: "👥",
    },
    {
      title: "UI/UX Implementation",
      description:
        "I transform designs into functional, accessible interfaces with:",
      details: [
        "Pixel-perfect implementation from Figma/XD designs",
        "Responsive layouts that work on all devices",
        "Accessibility (a11y) compliant components",
        "Dark/light theme toggles with system preferences",
        "Micro-interactions and meaningful animations",
        "Progressive enhancement strategies",
      ],
      icon: "🎨",
    },
  ];

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setActiveService((prev) => (prev + 1) % services.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isHovered, services.length]);

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
            My Development Services
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            From concept to deployment, I deliver complete web solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Service Navigation */}
          <div className="md:col-span-1">
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg sticky top-8">
              <h3 className="text-xl font-semibold mb-6 text-blue-400">
                Service Portfolio
              </h3>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <button
                      onClick={() => setActiveService(index)}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                        activeService === index
                          ? "bg-blue-600 text-white shadow-md"
                          : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="text-xl mr-3">{service.icon}</span>
                        <span>{service.title}</span>
                      </div>
                    </button>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          {/* Service Details */}
          <div className="md:col-span-2">
            <div className="bg-gray-800 rounded-xl p-8 shadow-lg h-full min-h-[500px]">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  animate={activeService === index ? "visible" : "hidden"}
                  exit="exit"
                  variants={variants}
                  transition={{ duration: 0.5 }}
                  className={`${
                    activeService === index ? "block" : "hidden"
                  } h-full`}
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-center mb-6 cursor-pointer">
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl mr-4"
                      >
                        {service.icon}
                      </motion.span>
                      <motion.h3
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-2xl cursor-pointer font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500"
                      >
                        {service.title}
                      </motion.h3>
                    </div>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-gray-300 text-lg mb-4"
                    >
                      {service.description}
                    </motion.p>

                    <motion.ul
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="mb-8 space-y-2 flex-grow"
                    >
                      {service.details.map((detail, i) => (
                        <motion.li
                          key={i}
                          initial={{ x: -20 }}
                          animate={{ x: 0 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                          className="flex items-start"
                        >
                          <span className="text-blue-400 mr-2">▹</span>
                          <span className="text-gray-300">{detail}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesShowcase;
