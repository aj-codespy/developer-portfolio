"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const timelineData = [
  { year: "2007", title: "Mumbai Move", subtitle: "Moved to the city of dreams from Bihar. Rollercoaster school years began." },
  { year: "2019", title: "Lockdown Freelancing", subtitle: "Discovered hacking basics, starting content writing pre-AI." },
  { year: "2023", title: "Pune & AI Major", subtitle: "Entered university, starting from absolute zero in web dev, cloud, and AI." },
  { year: "2024", title: "Hackathons & Confidence", subtitle: "Won multiple hackathons outside the classroom; secured first internship." },
  { year: "2025", title: "Corporate Coding", subtitle: "Corporate engineering at Aligned Automation. Developed commercial, AI production code." },
  { year: "2026", title: "Shipped First SaaS", subtitle: "Launched getPlaced, scaling to 4k+ users. Upskilling in sales, marketing & GTM." },
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
    <section id="journey" className="max-w-7xl mx-auto px-6 py-20">
      <div className="bg-dark-card rounded-[2.5rem] p-10 md:p-16 text-white overflow-hidden border border-white/5">
        {/* Header */}
        <p className="font-mono text-xs uppercase tracking-widest text-accent-blue mb-10">
          HOW I GOT HERE
        </p>

        {/* ===== Desktop / Horizontal Timeline (md+) ===== */}
        <div className="hidden md:block relative py-16">
          {/* Connecting line */}
          <div className="absolute top-[calc(50%+1px)] left-0 right-0 h-0.5 bg-white/10">
            <motion.div
              className="h-full bg-accent-blue/40 origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </div>

          {/* Nodes grid */}
          <div className="grid grid-cols-6 relative z-10 gap-4">
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
                  whileHover={{ y: -10, scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  {/* Top label - set fixed minimum height to align dots perfectly */}
                  <div className="mb-6 min-h-[90px] flex flex-col justify-end">
                    <p className="text-sm font-bold text-white group-hover:text-accent-blue transition-colors duration-300">{item.title}</p>
                    <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">{item.subtitle}</p>
                  </div>

                  {/* Dot */}
                  <div className="w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.3)] flex-shrink-0 group-hover:scale-130 group-hover:bg-accent-blue group-hover:shadow-[0_0_15px_rgba(37,99,235,0.8)] transition-all duration-300" />

                  {/* Bottom label — year */}
                  <div className="mt-6 flex items-center gap-1.5 justify-center">
                    <span className="text-xl font-mono font-bold text-accent-blue">{item.year}</span>
                    {isLast && (
                      <ArrowRight className="w-4 h-4 text-accent-blue animate-pulse" />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ===== Mobile / Vertical Timeline (below md) ===== */}
        <div className="md:hidden relative pl-8 py-4">
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

          <div className="flex flex-col gap-10">
            {timelineData.map((item, i) => {
              const isLast = i === timelineData.length - 1;
              return (
                <motion.div
                  key={item.year}
                  className="relative group cursor-default"
                  custom={i}
                  variants={nodeVariants}
                  initial="hidden"
                  whileHover={{ x: 8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                >
                  {/* Dot — positioned on the vertical line */}
                  <div className="absolute -left-8 top-1.5 w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.3)] group-hover:scale-130 group-hover:bg-accent-blue group-hover:shadow-[0_0_15px_rgba(37,99,235,0.8)] transition-all duration-300" />

                  {/* Content */}
                  <div className="flex items-baseline gap-4">
                    <span className="text-xl font-mono font-bold text-accent-blue shrink-0 flex items-center gap-1">
                      {item.year}
                      {isLast && (
                        <ArrowRight className="w-4 h-4 text-accent-blue group-hover:translate-x-1 transition-transform" />
                      )}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-white group-hover:text-accent-blue transition-colors duration-300">{item.title}</p>
                      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">{item.subtitle}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ===== Origin story footer ===== */}
        <motion.div
          className="mt-16 flex flex-col sm:flex-row items-start gap-8 border-t border-white/5 pt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Photo placeholder */}
          <motion.div 
            whileHover={{ scale: 1.05, rotate: -2 }}
            className="w-36 h-24 rounded-2xl bg-gray-600 flex-shrink-0 flex items-center justify-center overflow-hidden cursor-default shadow-lg border border-white/5 relative"
          >
            <img
              src="/origin.jpg"
              alt="My workspace at late night"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Paragraph */}
          <p className="text-sm md:text-base text-gray-300 leading-relaxed max-w-3xl">
            {"Born in Bihar and raised in Mumbai, I've spent my engineering journey learning what textbooks don't teach. From freelance content writing pre-AI to building multi-agent clinical decision systems today, my drive is to reduce monetary stress for my parents and build a comfortable future. Whether it's training my body to run through shin splints or building software through late nights, I stay open to new challenges, upgrade my skills, and build for the real world."}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
