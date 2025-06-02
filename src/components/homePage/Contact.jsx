import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateCurrentSection } from "../../redux/slice/applicationSlice";
import apiLinks from "../../services/apliLinks";
import apiConnector from "../../services/apiConnector";
import toast from "react-hot-toast";
import { IoIosSend } from "react-icons/io";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const bubblesRef = useRef([]);
  const particlesRef = useRef([]);
  const [loading, setloading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            dispatch(updateCurrentSection("Contact"));
          }
        });
      },
      { threshold: 0.6 }
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

  const onSubmit = async (data) => {
    console.log(data);
    setloading(true);
    try {
      const url = apiLinks.mailToAdmin;
      const response = await apiConnector("post", url, data);
      if (!response.success) {
        throw new Error(success.message);
      } else {
        toast.success("messsage send to admin successfully");
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setloading(false);
    }
  };

  // Animation setup
  useEffect(() => {
    const section = sectionRef.current;
    const form = formRef.current;

    if (!section || !form) return;

    // Section animation
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
    });

    // Form animation
    gsap.from(form, {
      scrollTrigger: {
        trigger: form,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.3,
      ease: "back.out(1.7)",
    });

    // Bubble animations
    bubblesRef.current.forEach((bubble, index) => {
      if (!bubble) return;

      const size = Math.random() * 80 + 40;
      const duration = Math.random() * 15 + 15;
      const delay = Math.random() * 5;
      const x = Math.random() * 100;

      gsap.set(bubble, {
        width: size,
        height: size,
        x: `${x}%`,
        y: "120%",
        opacity: 0.2 + Math.random() * 0.3,
      });

      gsap.to(bubble, {
        y: `-${size}px`,
        duration: duration,
        delay: delay,
        repeat: -1,
        ease: "none",
        onComplete: () => {
          gsap.set(bubble, { y: "120%" });
        },
      });
    });

    // Particle animations
    particlesRef.current.forEach((particle, index) => {
      if (!particle) return;

      const size = Math.random() * 4 + 1;
      const duration = Math.random() * 20 + 10;
      const delay = Math.random() * 5;
      const x = Math.random() * 100;
      const opacity = 0.1 + Math.random() * 0.2;

      gsap.set(particle, {
        width: size,
        height: size,
        x: `${x}%`,
        y: "120%",
        opacity: opacity,
      });

      gsap.to(particle, {
        y: `-${size}px`,
        duration: duration,
        delay: delay,
        repeat: -1,
        ease: "none",
        onComplete: () => {
          gsap.set(particle, { y: "120%" });
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      onViewportEnter={() => {
        if (!isVisible) {
          setIsVisible(true); // Prevent future logs
        }
      }}
      className="relative overflow-hidden min-h-screen py-5 px-4 sm:px-6 lg:px-8 bg-gray-900"
      id="contact"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large bubbles */}
        {[...Array(10)].map((_, i) => (
          <div
            key={`bubble-${i}`}
            ref={(el) => (bubblesRef.current[i] = el)}
            className="absolute rounded-full bg-gradient-to-br from-indigo-600/10 to-purple-600/10 backdrop-blur-[1px]"
          />
        ))}

        {/* Small particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={`particle-${i}`}
            ref={(el) => (particlesRef.current[i] = el)}
            className="absolute rounded-full bg-indigo-400/20"
          />
        ))}

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
              Contact Me
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Let's build something amazing together. Send me a message and I'll
            respond promptly.
          </p>
        </div>

        <div className="flex justify-center">
          <form
            ref={formRef}
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-2xl bg-gray-800/80 backdrop-blur-md rounded-xl p-8 sm:p-10 shadow-xl border border-gray-700/30 hover:border-indigo-500/30 transition-all duration-300"
          >
            <div className="space-y-6">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name", { required: "Name is required" })}
                  className="w-full px-4 py-3 rounded-lg bg-gray-700/70 border border-gray-600/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 text-white placeholder-gray-400 transition-all duration-200"
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full px-4 py-3 rounded-lg bg-gray-700/70 border border-gray-600/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 text-white placeholder-gray-400 transition-all duration-200"
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  rows={5}
                  {...register("message", {
                    required: "Message is required",
                    minLength: {
                      value: 10,
                      message: "Message must be at least 10 characters",
                    },
                  })}
                  className="w-full px-4 py-3 rounded-lg bg-gray-700/70 border border-gray-600/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 text-white placeholder-gray-400 transition-all duration-200"
                  placeholder="Hello, I'd like to talk about..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="cursor-pointer disabled:cursor-not-allowed w-full px-6 py-3.5 text-lg font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:ring-4 focus:outline-none focus:ring-indigo-800/50 shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 flex items-center justify-center gap-2"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex justify-center items-center gap-3">
                      <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                      <div>Sending message ....</div>
                    </div>
                  ) : (
                    <div className="flex justify-center items-center gap-3">
                      <IoIosSend />
                      <div>Send Message</div>
                    </div>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Additional contact info */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-8 bg-gray-800/50 backdrop-blur-sm rounded-xl px-8 py-6 border border-gray-700/30">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-indigo-500/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-indigo-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <a
                href="mailto:keshav.buillds@gmail.com"
                className="text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                keshav.buillds@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-purple-500/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-purple-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <a
                href="tel:+1234567890"
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                +91 9693209390
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
