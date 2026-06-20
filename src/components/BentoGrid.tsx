"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const highlights = [
  { category: "FOUNDER", desc: "Built and launched getPlaced, an AI resume builder scaled to 4,000+ active users at getplaced.online." },
  { category: "HACKATHONS", desc: "7 Hackathon wins outside the classroom — coding through 36-hour sprints, prototyping, and shipping under pressure." },
  { category: "INTERNSHIP", desc: "Built an agentic validation engine using LangGraph at Aligned Automation, aligning technical engineering with clients." },
  { category: "CLIENTS & SALES", desc: "Managed freelance content clients pre-AI. Handled pricing, feedback cycles, client negotiations, and end-to-end delivery." },
  { category: "PRESENTATION", desc: "Pitched AI products to judges, demoed to teams, and translated complex ML concepts into clear business narratives." },
];

export default function BentoGrid() {
  const [activeIdx, setActiveIdx] = useState(2);

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex flex-col gap-4">
        
        {/* ROW 1 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Identity Card */}
          <motion.div 
            whileHover={{ y: -6, scale: 1.01, rotate: -0.2 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="md:col-span-4 bg-accent-blue rounded-[2rem] p-6 flex flex-col items-center justify-center min-h-[200px] border border-black/5 shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="font-display text-[2.25rem] leading-[0.95] font-extrabold text-white text-center tracking-tighter">
              AYUSH
              <br />
              JHA
            </h2>
            <p className="mt-3 text-[10px] font-bold tracking-[0.25em] text-white/80 uppercase">
              AI Engineer & Builder
            </p>
          </motion.div>

          {/* Carousel Card */}
          <div className="md:col-span-8 bg-transparent rounded-[2rem] relative flex items-center justify-center min-h-[200px] overflow-hidden">
            {/* Soft background glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-accent-blue/5 to-transparent pointer-events-none rounded-[2rem]" />
            
            <div className="relative w-full h-full flex items-center justify-center">
              {highlights.map((item, idx) => {
                const isActive = idx === activeIdx;
                // Static layout positions to prevent layout-shift jittering on hover
                const x = (idx - 2) * 105;
                const rotate = isActive ? 0 : (idx - 2) * 4;
                const scale = isActive ? 1.08 : 0.92;
                const zIndex = isActive ? 30 : idx;
                
                return (
                  <motion.div
                    key={idx}
                    onHoverStart={() => setActiveIdx(idx)}
                    onMouseEnter={() => setActiveIdx(idx)}
                    onClick={() => setActiveIdx(idx)}
                    animate={{ x, rotate, scale, zIndex }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className={`absolute w-56 bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-black/5 shadow-md cursor-pointer ${
                      isActive ? 'shadow-[0_10px_40px_-10px_rgba(37,99,235,0.4)] border-accent-blue/20' : 'hover:opacity-80'
                    }`}
                  >
                    <p className={`text-[10px] font-bold tracking-widest text-center mb-3 ${isActive ? 'text-dark-card' : 'text-gray-400'}`}>
                      {item.category}
                    </p>
                    <p className="text-xs text-center text-gray-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          
          {/* Mindset Card */}
          <motion.div 
            whileHover={{ y: -6, scale: 1.01, rotate: 0.2 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="lg:col-span-4 bg-[#F4F3EF] rounded-[2rem] p-6 flex flex-col border border-black/5 shadow-sm hover:shadow-md transition-shadow min-h-[330px]"
          >
            <h3 className="font-display text-2xl font-extrabold text-dark-card mb-2 tracking-tight">Mindset</h3>
            <p className="text-gray-500 text-xs leading-relaxed mb-3">
              Building more than software. Running, training, and discipline give me the focus to keep shipping.
            </p>

            {/* Inner Image */}
            <div className="relative w-full flex-1 min-h-[90px] rounded-2xl overflow-hidden mb-3 group cursor-pointer border border-black/5 shadow-inner">
              <img
                src="/run.jpg"
                alt="Running for growth and discipline"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-card/90 via-dark-card/20 to-transparent opacity-90" />
              <div className="absolute bottom-3 left-0 right-0 text-center">
                <p className="text-[10px] font-bold text-white tracking-[0.2em] uppercase">
                  Growth & Discipline
                </p>
              </div>
            </div>

            <p className="text-gray-500 text-xs leading-relaxed mt-auto">
              Mastering body and mind is how I stay sharp.
            </p>
          </motion.div>

          {/* Middle Stack: Photo + Location */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <motion.div 
              whileHover={{ y: -6, scale: 1.01, rotate: -0.2 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="flex-1 bg-gray-300 rounded-[2rem] overflow-hidden relative border border-black/5 shadow-sm group cursor-pointer min-h-[150px]"
            >
              <img
                src="/scenic.jpg"
                alt="Scenic landscape"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -6, scale: 1.01, rotate: 0.2 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="bg-white/60 backdrop-blur-md rounded-[2rem] p-6 border border-black/5 shadow-sm relative overflow-hidden"
            >
              {/* Map background graphic hint */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-[radial-gradient(circle,rgba(0,0,0,0.03)_2px,transparent_2px)] bg-[size:10px_10px] rounded-bl-full -mr-8 -mt-8 opacity-50 pointer-events-none" />
              
              <h4 className="font-display text-2xl font-black text-dark-card uppercase tracking-tighter">
                Pune, India
              </h4>
              <p className="text-xs text-gray-500 font-mono mt-0.5">18.52° N, 73.85° E</p>
              <p className="text-[10px] font-bold tracking-widest text-accent-blue mt-4 uppercase">
                - GMT+5:30
              </p>
            </motion.div>
          </div>

          {/* Craft Card */}
          <motion.div 
            whileHover={{ y: -6, scale: 1.01, rotate: -0.2 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="lg:col-span-4 bg-[#F4F3EF] rounded-[2rem] p-6 flex flex-col border border-black/5 shadow-sm hover:shadow-md transition-shadow min-h-[330px]"
          >
            <h3 className="font-display text-2xl font-extrabold text-dark-card mb-2 tracking-tight">Craft</h3>
            <p className="text-gray-500 text-xs leading-relaxed mb-2.5">
              Building AI apps, automations, and the products behind them.
            </p>
            <p className="text-gray-500 text-xs leading-relaxed mb-3">
              Technical enough to build it, commercial enough to know if it's worth building — that's the gap I work in.
            </p>

            {/* Tech Pills */}
            <div className="flex flex-wrap gap-2 mb-3">
              {['LangGraph', 'FastAPI', 'Next.js', 'Supabase', 'Gemini'].map(tech => (
                <span key={tech} className="px-2.5 py-1 bg-white text-[10px] font-bold text-gray-600 rounded-lg border border-black/5 flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-blue opacity-70" />
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-auto border-t border-black/5 pt-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                  </span>
                  <span className="text-[9px] font-bold text-gray-700 tracking-wider uppercase">Active & Available</span>
                </div>
                <span className="text-[9px] font-mono font-bold bg-green-500/10 text-green-700 px-2 py-0.5 rounded-full uppercase">
                  Remote / Reloc
                </span>
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                Open to remote-first AI roles globally & select contract work.
              </p>
            </div>
          </motion.div>

        </div>

        {/* ROW 3 - Education & Status */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Education Dossier */}
          <motion.div 
            whileHover={{ y: -6, scale: 1.01, rotate: 0.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="lg:col-span-8 bg-[#F4F3EF] rounded-[2rem] p-6 flex flex-col border border-black/5 shadow-sm hover:shadow-md transition-shadow min-h-[220px]"
          >
            <h3 className="font-display text-[1.75rem] font-extrabold text-dark-card mb-4 tracking-tight">Education Dossier</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 flex-1">
              {/* University */}
              <div className="flex flex-col border-l-2 border-accent-blue/30 pl-4 py-1">
                <p className="text-[9px] font-bold tracking-wider text-accent-blue uppercase mb-1">UNIVERSITY</p>
                <a href="https://www.mmcoe.edu.in" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-dark-card hover:text-accent-blue transition-colors leading-tight mb-1.5 flex items-center gap-1">
                  MMCOE
                  <span className="text-[9px] font-normal text-gray-400">↗</span>
                </a>
                <p className="text-[10px] text-gray-500 leading-snug mb-2">B.E. Artificial Intelligence & Data Science</p>
                <div className="mt-auto">
                  <p className="text-[9px] text-gray-400">Class of 2027</p>
                  <p className="text-xs font-bold text-dark-card mt-0.5">GPA: 9.3/10</p>
                </div>
              </div>

              {/* High School */}
              <div className="flex flex-col border-l-2 border-accent-blue/30 pl-4 py-1">
                <p className="text-[9px] font-bold tracking-wider text-accent-blue uppercase mb-1">JUNIOR COLLEGE</p>
                <a href="https://www.chmcollege.in" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-dark-card hover:text-accent-blue transition-colors leading-tight mb-1.5 flex items-center gap-1">
                  Smt. CHM College
                  <span className="text-[9px] font-normal text-gray-400">↗</span>
                </a>
                <p className="text-[10px] text-gray-500 leading-snug mb-2">Higher Secondary Certificate (HSC)</p>
                <div className="mt-auto">
                  <p className="text-[9px] text-gray-400">Class of 2023</p>
                  <p className="text-xs font-bold text-dark-card mt-0.5">63% (US: ~3.0 GPA)</p>
                </div>
              </div>

              {/* School */}
              <div className="flex flex-col border-l-2 border-accent-blue/30 pl-4 py-1">
                <p className="text-[9px] font-bold tracking-wider text-accent-blue uppercase mb-1">SECONDARY SCHOOL</p>
                <a href="https://sssecondary.edu.in" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-dark-card hover:text-accent-blue transition-colors leading-tight mb-1.5 flex items-center gap-1">
                  New Era High School
                  <span className="text-[9px] font-normal text-gray-400">↗</span>
                </a>
                <p className="text-[10px] text-gray-500 leading-snug mb-2">Secondary School Certificate (SSC)</p>
                <div className="mt-auto">
                  <p className="text-[9px] text-gray-400">Class of 2021</p>
                  <p className="text-xs font-bold text-dark-card mt-0.5">93% (US: ~4.0 GPA)</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Job Status Card */}
          <motion.div 
            whileHover={{ y: -6, scale: 1.01, rotate: -0.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="lg:col-span-4 bg-dark-card rounded-[2rem] p-6 flex flex-col border border-white/5 shadow-sm hover:shadow-md transition-shadow min-h-[220px]"
          >
            <h3 className="font-display text-[1.5rem] font-bold text-white mb-2 tracking-tight">Status</h3>
            <div className="flex flex-col gap-3 my-auto font-mono text-xs">
              <div className="flex justify-between items-center border-b border-white/10 pb-1.5">
                <span className="text-gray-400 text-[10px]">EMPLOYMENT</span>
                <span className="text-green-400 font-bold text-[10px]">SEEKING ROLES</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-1.5">
                <span className="text-gray-400 text-[10px]">LATEST INT.</span>
                <span className="text-white text-[10px]">Aligned Automation</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-1.5">
                <span className="text-gray-400 text-[10px]">FREELANCE</span>
                <span className="text-accent-blue font-bold text-[10px]">ACTIVE & OPEN</span>
              </div>
            </div>
            <a href="#contact" className="mt-auto text-center py-2.5 px-4 bg-white/5 border border-white/10 text-white rounded-xl text-xs font-bold hover:bg-white/10 transition-colors uppercase tracking-wider">
              Discuss Opportunities
            </a>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
