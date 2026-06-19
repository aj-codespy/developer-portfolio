"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const timelineData = [
  { year: "2021", title: "Found AI", subtitle: "A tutorial turned into an obsession with how models actually work." },
  { year: "2022", title: "First Real Build", subtitle: "Stopped watching tutorials, started shipping broken code that worked." },
  { year: "2023", title: "Datathon Wins", subtitle: "2nd place at IIT Goa and PICT — built under pressure, on a deadline." },
  { year: "2024", title: "Built getPlaced", subtitle: "Took an idea to a live product students actually use." },
  { year: "2025", title: "Aligned Automation", subtitle: "Built an agentic validation engine in production using LangGraph." },
  { year: "2026", title: "Going Global", subtitle: "Now building AI products and looking for the right team to build with." },
];

const nodeVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3 + i * 0.12,
      duration: 0.5,
      ease: "easeOut" as any,
    },
  }),
};

export default function JourneyTimeline() {
  return (
    <section id="journey" className="max-w-7xl mx-auto px-6 py-16">
      <div className="bg-dark-card rounded-2xl p-8 md:p-12 text-white overflow-hidden">
        {/* Header */}
        <p className="font-mono text-xs uppercase tracking-widest text-accent-blue mb-8">
          HOW I GOT HERE
        </p>

        {/* ===== Desktop / Horizontal Timeline (md+) ===== */}
        <div className="hidden md:block relative">
          {/* Connecting line */}
          <div className="absolute top-[calc(50%+2px)] left-0 right-0 h-0.5 bg-white/10">
            <motion.div
              className="h-full bg-accent-blue/40 origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </div>

          {/* Nodes grid */}
          <div className="grid grid-cols-6 relative z-10">
            {timelineData.map((item, i) => {
              const isLast = i === timelineData.length - 1;
              return (
                <motion.div
                  key={item.year}
                  className="flex flex-col items-center text-center group cursor-default"
                  custom={i}
                  variants={nodeVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover={{ y: -5 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  {/* Top label */}
                  <div className="mb-4">
                    <p className="text-sm font-bold text-white group-hover:text-accent-blue transition-colors">{item.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.subtitle}</p>
                  </div>

                  {/* Dot */}
                  <div className="w-3 h-3 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.3)] flex-shrink-0 group-hover:scale-150 group-hover:bg-accent-blue group-hover:shadow-[0_0_15px_rgba(37,99,235,0.8)] transition-all duration-300" />

                  {/* Bottom label — year */}
                  <div className="mt-4 flex items-center gap-1">
                    <span className="text-lg font-display font-bold">{item.year}</span>
                    {isLast && (
                      <ArrowRight className="w-4 h-4 text-accent-blue" />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ===== Mobile / Vertical Timeline (below md) ===== */}
        <div className="md:hidden relative pl-8">
          {/* Vertical connecting line */}
          <div className="absolute left-[5px] top-0 bottom-0 w-0.5 bg-white/10">
            <motion.div
              className="w-full bg-accent-blue/40 origin-top"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              style={{ height: "100%" }}
            />
          </div>

          <div className="flex flex-col gap-8">
            {timelineData.map((item, i) => {
              const isLast = i === timelineData.length - 1;
              return (
                <motion.div
                  key={item.year}
                  className="relative group cursor-default"
                  custom={i}
                  variants={nodeVariants}
                  initial="hidden"
                  whileHover={{ x: 5 }}
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                >
                  {/* Dot — positioned on the vertical line */}
                  <div className="absolute -left-8 top-1 w-3 h-3 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.3)] group-hover:scale-150 group-hover:bg-accent-blue group-hover:shadow-[0_0_15px_rgba(37,99,235,0.8)] transition-all duration-300" />

                  {/* Content */}
                  <div className="flex items-baseline gap-3">
                    <span className="text-lg font-display font-bold shrink-0 flex items-center gap-1">
                      {item.year}
                      {isLast && (
                        <ArrowRight className="w-4 h-4 text-accent-blue group-hover:translate-x-1 transition-transform" />
                      )}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-white group-hover:text-accent-blue transition-colors">{item.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{item.subtitle}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ===== Origin story footer ===== */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-start gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Photo placeholder */}
          <motion.div 
            whileHover={{ scale: 1.05, rotate: -2 }}
            className="w-32 h-20 rounded-xl bg-gray-600 flex-shrink-0 flex items-center justify-center overflow-hidden cursor-default shadow-lg relative"
          >
            <img
              src="/origin.jpg"
              alt="My workspace at late night"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Paragraph */}
          <p className="text-sm md:text-base text-gray-300 leading-relaxed max-w-2xl">
            It started with a tutorial and a curiosity I couldn't shake. That curiosity turned into late nights, broken code, and eventually working products. Datathons taught me to build under pressure. Internships taught me to build for production. Now I build AI products end to end — and I'm looking for a team that wants to build something real, together.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
