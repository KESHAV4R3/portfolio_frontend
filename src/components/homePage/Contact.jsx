import { useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateCurrentSection } from "../../redux/slice/applicationSlice";
import apiLinks from "../../services/apliLinks";
import apiConnector from "../../services/apiConnector";
import toast from "react-hot-toast";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaPhone, FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";

const Contact = () => {
  const dispatch = useDispatch();
  const sectionRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  useEffect(() => {
    const observer = new IntersectionObserver((e) => { 
      if (e[0].isIntersecting) dispatch(updateCurrentSection("Contact")); 
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [dispatch]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await apiConnector("POST", apiLinks.mailToAdmin, data);
      if (res?.success || res?.data?.success) { 
        toast.success("Message sent successfully!"); 
        reset(); 
      }
    } catch (e) { 
      toast.error('Failed to send message. Please try again.'); 
    } finally { 
      setLoading(false); 
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="py-24 px-6 bg-[#050505] font-mono">
      <motion.div 
        className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <motion.div className="space-y-8" variants={itemVariants}>
          <h2 className="text-5xl md:text-7xl font-bold">Get In <span className="text-green-500">Touch</span></h2>
          <p className="text-gray-400 text-lg border-l-2 border-green-500/30 pl-4">
            Have a project in mind or want to collaborate? I'd love to hear from you.
          </p>
          
          <motion.div className="space-y-4" variants={itemVariants}>
            <motion.div 
              className="flex items-center gap-4 p-4 bg-[#0a0a0a] border border-gray-800 hover:border-green-500/50 transition-colors"
              whileHover={{ x: 5 }}
            >
              <FaEnvelope className="text-green-500 text-xl" />
              <div>
                <p className="text-gray-500 text-xs uppercase">Email</p>
                <a 
                  href="mailto:keshav.buillds@gmail.com" 
                  className="text-white hover:text-green-500 transition-colors"
                >
                  keshav.buillds@gmail.com
                </a>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-4 p-4 bg-[#0a0a0a] border border-gray-800 hover:border-green-500/50 transition-colors"
              whileHover={{ x: 5 }}
            >
              <FaPhone className="text-green-500 text-xl" />
              <div>
                <p className="text-gray-500 text-xs uppercase">Phone</p>
                <a 
                  href="tel:+919693209390" 
                  className="text-white hover:text-green-500 transition-colors"
                >
                  +91 9693209390
                </a>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.form 
          onSubmit={handleSubmit(onSubmit)} 
          className="bg-[#0c0c0c] border border-gray-800 p-8 space-y-6"
          variants={itemVariants}
        >
          <motion.div variants={itemVariants}>
            <label className="text-xs text-green-500 font-medium mb-1 block">Your Name</label>
            <input 
              {...register("name", { required: true })} 
              className="w-full bg-black/50 border border-gray-800 p-3 text-white text-sm focus:border-green-600 outline-none" 
              placeholder="John Doe" 
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <label className="text-xs text-green-500 font-medium mb-1 block">Email Address</label>
            <input 
              {...register("email", { required: true })} 
              className="w-full bg-black/50 border border-gray-800 p-3 text-white text-sm focus:border-green-600 outline-none" 
              placeholder="your@email.com" 
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <label className="text-xs text-green-500 font-medium mb-1 block">Your Message</label>
            <textarea 
              rows={4} 
              {...register("message", { required: true })} 
              className="w-full bg-black/50 border border-gray-800 p-3 text-white text-sm focus:border-green-600 outline-none resize-none" 
              placeholder="How can I help you?" 
            />
          </motion.div>
          
          <motion.button 
            type="submit" 
            disabled={loading} 
            className="w-full py-4 bg-green-600 text-black font-bold uppercase tracking-widest hover:bg-green-500 transition-all flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              "Sending..."
            ) : (
              <>
                <FaPaperPlane /> Send Message
              </>
            )}
          </motion.button>
        </motion.form>
      </motion.div>
    </section>
  );
};

export default Contact;