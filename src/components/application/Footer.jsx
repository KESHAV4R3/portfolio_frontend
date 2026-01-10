import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter, FaHeart } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const Footer = () => {
  const navigate = useNavigate();

  const navigateAdminPage = () => {
    navigate("/admin");
  };

  const socialLinks = [
    { icon: FaGithub, link: "https://github.com/keshav4r3" },
    { icon: FaLinkedin, link: "https://www.linkedin.com/in/keshav4r3/" },
    { icon: SiLeetcode, link: "https://leetcode.com/u/keshav4r3/" },
    { icon: FaTwitter, link: "#" }, // Add link if available
  ];

  return (
    <footer className="relative bg-[#050505] text-gray-300 overflow-hidden border-t border-white/5">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px] opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Brand / Status */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-white tracking-tight mb-2">
              <span className="text-blue-500">&lt;</span> 4R3 <span className="text-blue-500">/&gt;</span>
            </h2>
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-mono text-gray-500">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span>SYSTEM STATUS: OPERATIONAL</span>
            </div>
          </div>

          {/* Socials */}
          <div className="flex gap-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.link}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -3, color: "#60A5FA" }}
                className="p-3 bg-white/5 rounded-full border border-white/10 text-gray-400 transition-colors hover:border-blue-500/50 hover:bg-blue-900/10"
              >
                <social.icon size={18} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent my-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-mono text-gray-500">
          <p className="flex items-center gap-1">
            © {new Date().getFullYear()} Engineered by Keshav Kumar.
          </p>

          <div className="flex items-center gap-6">
            <p className="hidden md:block">v2.0.4</p>
            
            <motion.button
              onClick={navigateAdminPage}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-3 py-1 rounded border border-white/5 bg-black/50 hover:border-red-500/50 hover:text-red-400 transition-colors group"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-red-500 transition-colors"></span>
              <span>sudo login</span>
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;