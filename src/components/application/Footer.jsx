import { motion } from "framer-motion";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { FaGithub, FaLinkedin, FaMedium } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname.startsWith("/admin")) return null;

  const socialLinks = [
    { icon: FaGithub, link: "https://github.com/keshav4r3" },
    { icon: FaLinkedin, link: "https://www.linkedin.com/in/keshav4r3/" },
    { icon: FaMedium, link: "https://medium.com/@4r3keshav" },
    { icon: SiLeetcode, link: "https://leetcode.com/u/keshav4r3/" },
  ];

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Experience", path: "/experience" },
    { name: "Projects", path: "/projects" },
    { name: "Services", path: "/services" },
    { name: "Blogs", path: "/blogs" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <footer className="relative bg-[#050505] text-zinc-400 overflow-hidden border-t border-white/5 py-12">
      {/* Background Subtle Grid Pattern */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Column 1: Brand & Status */}
          <div className="md:col-span-5 space-y-4">
            <div 
              onClick={() => navigate("/")} 
              className="cursor-pointer font-bold text-xl tracking-tight text-white flex items-center gap-1.5"
            >
              <span className="text-zinc-500 font-light">&lt;</span>
              <span>4R3</span>
              <span className="text-zinc-500 font-light">/&gt;</span>
            </div>
            <p className="text-xs text-zinc-500 max-w-sm leading-relaxed">
              Full Stack Developer & Performance Engineer specializing in Next.js, React, Node.js, and Core Web Vitals optimization.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">Sitemap</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {quickLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  className="hover:text-white transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Socials */}
          <div className="md:col-span-3 space-y-4 md:text-right flex flex-col md:items-end">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">Connect</h4>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 bg-zinc-900 border border-white/5 rounded-full text-zinc-400 hover:text-white transition-colors hover:border-zinc-700 cursor-pointer"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/5 my-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] font-mono text-zinc-500">
          <p>© {new Date().getFullYear()} Keshav Kumar. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <p>v2.1.0</p>
            <button
              onClick={() => navigate("/admin")}
              className="flex items-center gap-2 px-2.5 py-1 rounded border border-white/5 bg-zinc-900/50 hover:border-zinc-700 hover:text-zinc-300 transition-all cursor-pointer group"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 group-hover:bg-zinc-400 transition-colors"></span>
              <span>Admin Login</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;