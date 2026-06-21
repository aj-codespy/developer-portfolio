"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Calendar, Briefcase } from "lucide-react";

interface Job {
  id: string;
  role: string;
  company: string;
  url: string;
  duration: string;
  points: string[];
  tech: string[];
}

const jobs: Job[] = [
  {
    id: "aligned",
    role: "AI Engineer Intern",
    company: "Aligned Automation",
    url: "https://alignedautomation.com",
    duration: "June 2025 - Nov 2025",
    points: [
      "Built and deployed an agentic validation engine using LangGraph and FastAPI to streamline document workflows.",
      "Collaborated closely with seasoned software engineers to implement production-grade, secure, and clean code architectures.",
      "Optimized model inference pipelines and established robust unit testing suites to ensure system reliability.",
      "Aligned technical engineering with client specifications, translating complex system designs into business value."
    ],
    tech: ["LangGraph", "FastAPI", "Python", "Supabase", "Git"]
  },
  {
    id: "freelancing",
    role: "Freelance AI & Full-Stack Developer",
    company: "Solo Operator",
    url: "",
    duration: "2024 - 2025 (Intermittent)",
    points: [
      "Designed, developed, and launched custom AI tools, scraping automation pipelines, and analytics dashboards for clients.",
      "Managed end-to-end client communications: gathered requirements, negotiated pricing, and handled product delivery.",
      "Built and marketed getPlaced organically, scaling the AI resume builder platform to over 4,000+ active users.",
      "Wrote and published long-form technical content on AI engineering, building personal brand and audience engagement."
    ],
    tech: ["Next.js", "React", "Python", "Streamlit", "Gemini API", "Pinecone"]
  },
  {
    id: "rhv",
    role: "Software / AI Intern",
    company: "RHV Group",
    url: "",
    duration: "July 2024 - Oct 2024",
    points: [
      "Developed web applications and integrated database systems to optimize data storage and operational workflows.",
      "Explored machine learning architectures and assisted in writing data preprocessing scripts for training datasets.",
      "Gained hands-on experience in building under pressure, shipping on-time deliverables, and working in a team environment."
    ],
    tech: ["Web Development", "Python", "SQL", "APIs", "Data Prep"]
  },
  {
    id: "buildspace",
    role: "Builder & Graduate",
    company: "Buildspace (N&W)",
    url: "https://buildspace.so",
    duration: "2023 - 2024",
    points: [
      "Participated in the Nights & Weekends program, focusing on idea validation, rapid prototyping, and shipping digital products.",
      "Designed and launched several experimental products, gathering user feedback and iterating through rapid build cycles.",
      "Learned core principles of user distribution, pitch creation, and product positioning for early-stage software launches."
    ],
    tech: ["Prototyping", "Product GTM", "Idea Validation", "Product Design"]
  }
];

export default function Experience() {
  const [activeJobIdx, setActiveJobIdx] = useState(0);
  const activeJobIdxRef = useRef(activeJobIdx);
  activeJobIdxRef.current = activeJobIdx;
  const lastScrollTime = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      const isScrollDown = e.deltaY > 0;
      const isScrollUp = e.deltaY < 0;

      if (isScrollDown) {
        if (activeJobIdxRef.current < jobs.length - 1) {
          // Prevent page scroll as long as we can slide down in the list
          e.preventDefault();

          const now = Date.now();
          if (now - lastScrollTime.current >= 650 && Math.abs(e.deltaY) >= 15) {
            setActiveJobIdx((prev) => prev + 1);
            lastScrollTime.current = now;
          }
        }
      } else if (isScrollUp) {
        if (activeJobIdxRef.current > 0) {
          // Prevent page scroll as long as we can slide up in the list
          e.preventDefault();

          const now = Date.now();
          if (now - lastScrollTime.current >= 650 && Math.abs(e.deltaY) >= 15) {
            setActiveJobIdx((prev) => prev - 1);
            lastScrollTime.current = now;
          }
        }
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 py-10 font-mono">
      <div 
        ref={containerRef}
        className="bg-white/60 backdrop-blur-md rounded-[2rem] p-6 md:p-8 border border-black/5 shadow-sm relative overflow-hidden"
      >
        <p className="text-xs uppercase tracking-widest text-accent-blue mb-4 font-bold">
          // PROFESSIONAL EXPERIENCE
        </p>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h2 className="font-display text-3xl font-extrabold text-dark-card tracking-tight">
            Work History
          </h2>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-dark-card text-white hover:bg-black px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md hover:-translate-y-0.5 active:translate-y-0 w-fit"
          >
            <span>View Resume PDF →</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Sidebar / Tabs List */}
          <div className="md:col-span-4 flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible border-b md:border-b-0 md:border-l border-black/10 pb-2 md:pb-0 md:pr-4 gap-2 shrink-0 scrollbar-none z-10">
            {jobs.map((job, idx) => {
              const isActive = idx === activeJobIdx;
              return (
                <button
                  key={job.id}
                  onClick={() => setActiveJobIdx(idx)}
                  className={`relative text-left px-4 py-3 rounded-xl text-xs font-bold transition-colors duration-250 whitespace-nowrap md:whitespace-normal flex items-center gap-2.5 ${
                    isActive ? "text-accent-blue" : "text-gray-500 hover:text-dark-card hover:bg-gray-50/50"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeJobBg"
                      className="absolute inset-0 bg-accent-blue/10 rounded-xl border-l-2 md:border-l-4 border-accent-blue -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Briefcase className="w-3.5 h-3.5 flex-shrink-0 z-10" />
                  <span className="z-10">{job.company}</span>
                </button>
              );
            })}
          </div>

          {/* Job Details Box */}
          <div className="md:col-span-8 min-h-[300px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeJobIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex-1 flex flex-col"
              >
                {/* Title & Dates */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-black/5 pb-4 mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-dark-card flex items-baseline gap-1.5 flex-wrap">
                      <span>{jobs[activeJobIdx].role}</span>
                      {jobs[activeJobIdx].url ? (
                        <a
                          href={jobs[activeJobIdx].url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-bold text-accent-blue hover:underline inline-flex items-center gap-0.5"
                        >
                          @{jobs[activeJobIdx].company}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="text-xs font-bold text-gray-400">@{jobs[activeJobIdx].company}</span>
                      )}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium whitespace-nowrap">
                    <Calendar className="w-3.5 h-3.5 text-accent-blue/70" />
                    <span>{jobs[activeJobIdx].duration}</span>
                  </div>
                </div>

                {/* Bullet Points */}
                <ul className="space-y-3 mb-6 flex-1">
                  {jobs[activeJobIdx].points.map((point, i) => (
                    <li key={i} className="text-xs text-gray-500 leading-relaxed flex items-start gap-2">
                      <span className="text-accent-blue mt-1">▹</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-black/5 mt-auto">
                  {jobs[activeJobIdx].tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 bg-white text-[10px] font-bold text-gray-600 rounded-lg border border-black/5 flex items-center gap-1 shadow-sm"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-blue/70" />
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
