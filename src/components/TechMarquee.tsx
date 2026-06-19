"use client";

import { motion } from "framer-motion";

const techStack = [
  { name: "FastAPI", color: "#F97316" },
  { name: "LangChain", color: "#22C55E" },
  { name: "React", color: "#3B82F6" },
  { name: "Supabase", color: "#22C55E" },
  { name: "Gemini", color: "#3B82F6" },
  { name: "LangGraph", color: "#7C3AED" },
  { name: "Next.js", color: "#0F0F0F" },
  { name: "Python", color: "#EAB308" },
  { name: "Vercel", color: "#0F0F0F" },
];

export default function TechMarquee() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full border-t border-black/5"
    >
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex items-center gap-8">
          {/* Label */}
          <span className="shrink-0 font-mono text-xs uppercase tracking-widest text-muted-text">
            Tech Stack
          </span>

          {/* Marquee container */}
          <div className="relative min-w-0 flex-1 overflow-hidden">
            {/* Fade edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-page-base to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-page-base to-transparent" />

            {/* Scrolling track — duplicated for seamless loop */}
            <div className="marquee-track">
              {[...techStack, ...techStack].map((tech, i) => (
                <div
                  key={`${tech.name}-${i}`}
                  className="flex shrink-0 items-center gap-2 px-5"
                >
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: tech.color }}
                  />
                  <span className="whitespace-nowrap text-sm font-medium">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
