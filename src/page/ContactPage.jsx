import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { motion } from 'framer-motion';
import { FiPhone, FiMail, FiGithub, FiLinkedin, FiSend, FiClock, FiCheck } from 'react-icons/fi';
import apiLinks from "../services/apliLinks";
import apiConnector from "../services/apiConnector";
import toast from "react-hot-toast";
import contactImg from "../assets/contact_object.png";

const ContactInfoCard = ({ title, value, href, Icon }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="flex items-center gap-4 p-4 bg-zinc-900/30 border border-white/5 rounded-xl hover:border-zinc-800 transition-colors group cursor-pointer"
  >
    <div className="p-3 bg-zinc-950 border border-white/5 rounded-lg text-zinc-400 group-hover:text-white group-hover:bg-zinc-900 transition-colors">
      <Icon size={16} />
    </div>
    <div>
      <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">{title}</p>
      <p className="text-xs font-semibold text-zinc-300 group-hover:text-white transition-colors mt-0.5">{value}</p>
    </div>
  </a>
);

const ContactPage = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      console.log("link: ",apiLinks.mailToAdmin)
      console.log(data)
      const res = await apiConnector("POST", apiLinks.mailToAdmin, data);
      console.log("res of mail ",res)
      if (res?.success || res?.data?.success) { 
        toast.success("Message sent successfully!"); 
        reset(); 
      } else {
        toast.error(res?.message || 'Failed to send message.');
      }
    } catch (e) { 
      console.log(e)
      toast.error('Failed to send message. Please try again.'); 
    } finally { 
      setLoading(false); 
    }
  };

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
              src={contactImg}
              alt="Contact Illustration"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Text — right side */}
          <div className="space-y-4 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 flex items-center justify-center md:justify-start gap-1.5">
              <FiPhone /> Contact Gateway
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Initiate a <span className="text-zinc-400 font-light italic">conversation</span>.
            </h1>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-2xl pt-2">
              Have a project, role, or idea in mind? Drop me a message below and I'll get back to you shortly.
            </p>
          </div>
        </motion.div>

        {/* Content Split: Channels & Form */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          {/* Column 1: Direct Channels */}
          <motion.div variants={itemVariants} className="md:col-span-5 flex flex-col gap-5">

            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Reach Me On</h3>
            
            <ContactInfoCard 
              title="Email Address"
              value="4r3keshav@gmail.com"
              href="mailto:4r3keshav@gmail.com"
              Icon={FiMail}
            />
            
            <ContactInfoCard 
              title="LinkedIn Profile"
              value="in/keshav4r3"
              href="https://linkedin.com/in/keshav4r3"
              Icon={FiLinkedin}
            />

            <ContactInfoCard 
              title="GitHub"
              value="github.com/keshav4r3"
              href="https://github.com/keshav4r3"
              Icon={FiGithub}
            />

            {/* Reply notice */}
            <div className="p-4 bg-zinc-900/10 border border-white/5 rounded-xl flex items-center gap-3 text-xs text-zinc-500">
              <FiClock className="flex-shrink-0" />
              <span>I usually reply within 24 hours. Let's build something great!</span>
            </div>
          </motion.div>

          {/* Column 2: Contact form */}
          <motion.div variants={itemVariants} className="md:col-span-7 bg-zinc-900/10 border border-white/5 rounded-2xl p-6 md:p-8 space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Send a Message</h3>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-xs">
              
              {/* Field 1: Name */}
              <div className="space-y-1.5">
                <label className="block font-bold text-zinc-300 uppercase tracking-wide">Your Name</label>
                <input 
                  type="text"
                  placeholder="John Doe"
                  {...register("name", { required: "Name payload is required" })}
                  className="w-full bg-zinc-950 border border-white/5 focus:border-zinc-500 px-4 py-3 rounded-lg text-white outline-none transition-colors"
                />
                {errors.name && (
                  <span className="text-[10px] text-red-500 font-mono">{errors.name.message}</span>
                )}
              </div>

              {/* Field 2: Email */}
              <div className="space-y-1.5">
                <label className="block font-bold text-zinc-300 uppercase tracking-wide">Email Address</label>
                <input 
                  type="email"
                  placeholder="john@example.com"
                  {...register("email", { 
                    required: "Email payload is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email format"
                    }
                  })}
                  className="w-full bg-zinc-950 border border-white/5 focus:border-zinc-500 px-4 py-3 rounded-lg text-white outline-none transition-colors"
                />
                {errors.email && (
                  <span className="text-[10px] text-red-500 font-mono">{errors.email.message}</span>
                )}
              </div>

              {/* Field 3: Message */}
              <div className="space-y-1.5">
                <label className="block font-bold text-zinc-300 uppercase tracking-wide">Message Details</label>
                <textarea 
                  rows={5}
                  placeholder="Outline the scope of your project, role details, or consulting inquiry..."
                  {...register("message", { required: "Message payload is required" })}
                  className="w-full bg-zinc-950 border border-white/5 focus:border-zinc-500 px-4 py-3 rounded-lg text-white outline-none transition-colors resize-none leading-relaxed"
                />
                {errors.message && (
                  <span className="text-[10px] text-red-500 font-mono">{errors.message.message}</span>
                )}
              </div>

              {/* Submit button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center font-bold rounded-lg text-xs uppercase tracking-widest cursor-pointer bg-white text-black hover:bg-zinc-200 active:scale-[0.98] py-4 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span>Sending...</span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <FiSend /> Send Message
                    </span>
                  )}
                </button>
              </div>

            </form>
          </motion.div>

        </div>

      </motion.div>
    </div>
  );
};

export default ContactPage;
