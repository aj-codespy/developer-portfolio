"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const highlights = [
  { category: "INTERNSHIP", desc: "Built an agentic validation engine using LangGraph at Aligned Automation." },
  { category: "COMPETITIONS", desc: "2nd place at IIT Goa and PICT datathons — built under pressure, shipped on time." },
  { category: "FOUNDER", desc: "Built and launched getPlaced, an AI resume builder live at getplaced.online." },
];

export default function BentoGrid() {
  const [activeIdx, setActiveIdx] = useState(1);

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex flex-col gap-4">
        
        {/* ROW 1 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Identity Card */}
          <motion.div 
            whileHover={{ y: -6, scale: 1.01, rotate: -0.2 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="md:col-span-4 bg-[#EDEDE8] rounded-[2rem] p-6 flex flex-col items-center justify-center min-h-[200px] border border-black/5 shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="font-display text-[2.25rem] leading-[0.95] font-extrabold text-dark-card text-center tracking-tighter">
              AYUSH
              <br />
              JHA
            </h2>
            <p className="mt-3 text-[10px] font-bold tracking-[0.25em] text-gray-500 uppercase">
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
                // Calculate transform based on position relative to active card
                const offset = idx - activeIdx;
                const x = offset * 110; // push left or right
                const rotate = offset * 4; // rotate slightly
                const scale = isActive ? 1.05 : 0.9;
                const zIndex = isActive ? 10 : 0;
                
                return (
                  <motion.div
                    key={idx}
                    onHoverStart={() => setActiveIdx(idx)}
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
            className="lg:col-span-4 bg-[#F4F3EF] rounded-[2rem] p-6 flex flex-col border border-black/5 shadow-sm hover:shadow-md transition-shadow min-h-[380px]"
          >
            <h3 className="font-display text-[1.75rem] font-extrabold text-dark-card mb-3 tracking-tight">Mindset</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              Building more than software. Running, training, and discipline give me the focus to keep shipping.
            </p>

            {/* Inner Image */}
            <div className="relative w-full flex-1 min-h-[110px] rounded-2xl overflow-hidden mb-4 group cursor-pointer border border-black/5 shadow-inner">
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

            <p className="text-gray-500 text-sm leading-relaxed mt-auto">
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
            className="lg:col-span-4 bg-[#F4F3EF] rounded-[2rem] p-6 flex flex-col border border-black/5 shadow-sm hover:shadow-md transition-shadow min-h-[380px]"
          >
            <h3 className="font-display text-[1.75rem] font-extrabold text-dark-card mb-3 tracking-tight">Craft</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-3">
              Building AI apps, automations, and the products behind them.
            </p>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              Technical enough to build it, commercial enough to know if it's worth building — that's the gap I work in.
            </p>

            {/* Tech Pills */}
            <div className="flex flex-wrap gap-2 mb-4">
              {['LangGraph', 'FastAPI', 'Next.js', 'Supabase', 'Gemini'].map(tech => (
                <span key={tech} className="px-3 py-1.5 bg-white text-[11px] font-bold text-gray-600 rounded-lg border border-black/5 flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-blue opacity-70" />
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-auto border-t border-black/5 pt-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                  </span>
                  <span className="text-[10px] font-bold text-gray-700 tracking-wider uppercase">Active & Available</span>
                </div>
                <span className="text-[9px] font-mono font-bold bg-green-500/10 text-green-700 px-2 py-0.5 rounded-full uppercase">
                  Remote / Reloc
                </span>
              </div>
              <p className="text-gray-500 text-[13px] leading-relaxed">
                Open to remote-first AI roles globally & select contract work.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
