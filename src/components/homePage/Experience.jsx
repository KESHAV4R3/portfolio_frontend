import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentSection } from "../../redux/slice/applicationSlice";

const Experience = () => {
  const dispatch = useDispatch();
  const { ref, inView } = useInView({ threshold: 0.2 });

  useEffect(() => { if (inView) dispatch(updateCurrentSection("Experience")); }, [inView, dispatch]);

  return (
    <section ref={ref} id="experience" className="relative py-5 bg-[#050505] text-green-500 font-mono overflow-hidden">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="mb-12 sm:mb-16 border-b border-green-900/50 pb-4 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-white inline-block">./Experience</h2>
        </div>

        <div className="relative sm:ml-4 border-l border-green-900/50 sm:pl-12 pl-6 space-y-12">
            <div className="relative">
              <div className="absolute -left-[30px] sm:-left-[54px] top-6 w-3 h-3 bg-black border border-green-500 z-10" />
              <div className="bg-[#0a0a0a] border border-green-900/50 p-4 sm:p-6 md:p-8 hover:border-green-500/50 transition-all w-full">
                <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{">"} Frontend Developer Intern</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-green-600">@</span>
                      <a href="https://seller.zupper.co" target="_blank" className="text-lg text-gray-400 font-bold hover:text-white transition-all">Zupper Commerce Pvt. Ltd.</a>
                    </div>
                  </div>
                  <div className="text-xs text-right"><span className="px-2 py-1 bg-green-900/20">Jul 2025 – Present</span><p className="mt-2">Remote Node</p></div>
                </div>
              <div className="space-y-3 text-sm text-gray-400 mb-6">
  <p className="flex items-start gap-2">
    <span className="text-green-500 mt-0.5">▹</span>
    <span>Improved Core Web Vitals by 30% using modular frontend components, code optimization, and optimized rendering patterns in Next.js.</span>
  </p>
  <p className="flex items-start gap-2">
    <span className="text-green-500 mt-0.5">▹</span>
    <span>Refactored Redux Thunk state management and built reusable UI components using React and Tailwind CSS.</span>
  </p>
  <p className="flex items-start gap-2">
    <span className="text-green-500 mt-0.5">▹</span>
    <span>Integrated automated MSG91 SMS notifications and dashboard analytics for user communication and activity tracking.</span>
  </p>
  <p className="flex items-start gap-2">
    <span className="text-green-500 mt-0.5">▹</span>
    <span>Resolved GitHub Actions build time errors and validated API responses using Apidog in an Agile environment.</span>
  </p>
</div>
                <div className="pt-4 border-t border-green-900/30 text-xs">
                  <span className="text-green-700">const tech_stack = [</span>
                  <span className="text-gray-500"> "React", 'Next.js', "Redux", "Tailwind", "Git", "Redux-Thunk" </span>
                  <span className="text-green-700">];</span>
                </div>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
};
export default Experience;