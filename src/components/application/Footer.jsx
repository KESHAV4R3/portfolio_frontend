import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();
  const navigateAdminPage = () => {
    navigate("/admin");
  };
  return (
    <motion.footer
      className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-8"
      initial="hidden"
      whileInView="visible"
    >
      {/* Copyright section */}
      <motion.div
        className="mt-12 pt-6 border-t border-gray-800 text-center text-gray-500"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <p>© {new Date().getFullYear()} Keshav Kumar. All rights reserved.</p>
        <div className="text-blue-600 cursor-pointer hover:text-blue-500 text-[17px] pt-2"
        onClick={navigateAdminPage}>
          Admin Login
        </div>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
