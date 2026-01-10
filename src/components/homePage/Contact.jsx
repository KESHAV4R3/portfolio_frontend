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
import { FaGithub, FaLinkedin, FaTwitter, FaTerminal, FaNetworkWired } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const dispatch = useDispatch();
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          dispatch(updateCurrentSection("Contact"));
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [dispatch]);

  // Submit Handler
  const onSubmit = async (data, e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await apiConnector("POST", apiLinks.mailToAdmin, data);
      
      // Robust check for different API response structures
      const isSuccess = response?.success || response?.data?.success;
      
      if (!isSuccess) throw new Error(response?.message || 'Failed');
      
      toast.success("Packet Transmission Successful!");
      e.target.reset();
    } catch (error) {
      toast.error('Transmission Failed. Connection Refused.');
    } finally {
      setLoading(false);
    }
  };

  // GSAP Animations
  useEffect(() => {
    const section = sectionRef.current;
    const form = formRef.current;

    const ctx = gsap.context(() => {
        // Entrance Animation
        gsap.fromTo(form, 
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 75%",
                }
            }
        );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen py-24 px-4 flex items-center justify-center bg-[#050505] overflow-hidden font-mono"
    >
      {/* ---------------- BACKGROUND ATMOSPHERE ---------------- */}
      <div className="absolute inset-0 pointer-events-none">
         {/* Cyber Grid */}
         <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
         
         {/* Scanline Overlay */}
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05]"></div>
         
         {/* Glows */}
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-900/10 rounded-full blur-[120px]"></div>
         <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px]"></div>
      </div>


      {/* ---------------- CONTENT CONTAINER ---------------- */}
      <div className="relative z-10 w-full max-w-6xl grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        
        {/* LEFT: TEXT & INFO */}
        <div className="text-left space-y-8">
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-green-500 text-xs tracking-widest uppercase">Encryption: Enabled</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                    Initialize <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
                        Handshake
                    </span>
                </h2>
                <p className="text-gray-400 text-lg max-w-md leading-relaxed border-l-2 border-green-500/30 pl-4">
                    Targeting a collaboration? Requesting system access? 
                    Open a secure channel and let's deploy solutions.
                </p>
            </div>

            {/* Connection Details */}
            <div className="space-y-4 text-sm">
                <div className="group flex items-center gap-4 p-4 bg-[#0a0a0a] border border-green-900/30 rounded hover:border-green-500/50 transition-colors">
                    <div className="p-3 bg-green-900/10 rounded text-green-500 group-hover:text-white transition-colors">
                        <FaTerminal size={18} />
                    </div>
                    <div>
                        <p className="text-gray-500 text-[10px] uppercase tracking-wider">Communication Protocol</p>
                        <a href="mailto:keshav.buillds@gmail.com" className="text-white hover:text-green-400 transition-colors">keshav.buillds@gmail.com</a>
                    </div>
                </div>

                <div className="group flex items-center gap-4 p-4 bg-[#0a0a0a] border border-green-900/30 rounded hover:border-green-500/50 transition-colors">
                    <div className="p-3 bg-green-900/10 rounded text-green-500 group-hover:text-white transition-colors">
                        <FaNetworkWired size={18} />
                    </div>
                    <div>
                        <p className="text-gray-500 text-[10px] uppercase tracking-wider">Direct Uplink</p>
                        <a href="tel:+919693209390" className="text-white hover:text-green-400 transition-colors">+91 9693209390</a>
                    </div>
                </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 pt-4">
                {[FaGithub, FaLinkedin, FaTwitter].map((Icon, i) => (
                    <a key={i} href="#" className="p-3 bg-[#0a0a0a] border border-gray-800 rounded-full text-gray-400 hover:text-white hover:border-green-500 hover:bg-green-900/20 transition-all">
                        <Icon size={18} />
                    </a>
                ))}
            </div>
        </div>


        {/* RIGHT: THE TERMINAL FORM */}
        <div ref={formRef} className="w-full">
            <div className="relative bg-[#0c0c0c] border border-gray-800 rounded-lg overflow-hidden shadow-[0_0_50px_rgba(0,255,0,0.05)]">
                
                {/* Terminal Header */}
                <div className="bg-[#111] px-4 py-3 flex items-center justify-between border-b border-gray-800">
                    <div className="flex gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50 border border-red-500/30"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50 border border-yellow-500/30"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/50 border border-green-500/30"></div>
                    </div>
                    <div className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">ROOT_USER/MSG_RELAY</div>
                </div>

                {/* Form Content */}
                <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8 space-y-6">
                    
                    {/* Name */}
                    <div className="group">
                        <label className="block text-[10px] text-green-600 mb-1.5 uppercase tracking-wider font-bold">User_ID</label>
                        <input
                            {...register("name", { required: true })}
                            className="w-full bg-[#050505] border border-gray-800 rounded p-3 text-white text-sm focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-900/50 transition-all"
                            placeholder="Enter Identity"
                            autoComplete="off"
                        />
                        {errors.name && <span className="text-red-500 text-[10px] mt-1 block">&gt;&gt; ERROR: IDENTITY_REQUIRED</span>}
                    </div>

                    {/* Email */}
                    <div className="group">
                        <label className="block text-[10px] text-green-600 mb-1.5 uppercase tracking-wider font-bold">Reply_Protocol</label>
                        <input
                            {...register("email", { required: true })}
                            className="w-full bg-[#050505] border border-gray-800 rounded p-3 text-white text-sm focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-900/50 transition-all"
                            placeholder="user@network.com"
                            autoComplete="off"
                        />
                         {errors.email && <span className="text-red-500 text-[10px] mt-1 block">&gt;&gt; ERROR: INVALID_DESTINATION</span>}
                    </div>

                    {/* Message */}
                    <div className="group">
                        <label className="block text-[10px] text-green-600 mb-1.5 uppercase tracking-wider font-bold">Data_Payload</label>
                        <textarea
                            rows={4}
                            {...register("message", { required: true })}
                            className="w-full bg-[#050505] border border-gray-800 rounded p-3 text-white text-sm focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-900/50 transition-all resize-none"
                            placeholder="Input transmission data..."
                        />
                         {errors.message && <span className="text-red-500 text-[10px] mt-1 block">&gt;&gt; ERROR: EMPTY_PAYLOAD</span>}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-green-700 hover:bg-green-600 text-black font-bold text-xs uppercase tracking-[0.2em] rounded shadow-lg shadow-green-900/20 hover:shadow-green-500/20 transition-all flex items-center justify-center gap-3 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                         {loading ? (
                             <>
                                <span className="animate-pulse">UPLOADING...</span>
                             </>
                         ) : (
                             <>
                                <span>EXECUTE_SEND</span>
                                <IoIosSend className="group-hover:translate-x-1 transition-transform" />
                             </>
                         )}
                    </button>
                </form>
            </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;