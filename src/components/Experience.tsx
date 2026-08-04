"use client";

import { useState, useRef, useEffect } from "react";
import { gsap, useGSAP, MOTION_QUERIES } from "@/lib/gsap";
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
    role: "AI Intern",
    company: "Aligned Automation",
    url: "https://alignedautomation.com",
    duration: "Jan 2026 - Apr 2026",
    points: [
      "Developed an Agentic Validation engine using LangGraph and LLMs, automating 80% of data validation.",
      "Engineered a robust supervisor agent architecture, reducing data quality issues by 30% through automated fixes.",
      "Analyzed complex NASCAR race data, performing preprocessing on 100GB+ to derive critical performance insights.",
      "Automated a comprehensive data analysis pipeline for NASCAR data, improving processing efficiency by 40%."
    ],
    tech: ["LangGraph", "Python", "LLMs", "Data Pipelines", "NASCAR Data"]
  },
  {
    id: "freelancing",
    role: "Freelance AI & Full-Stack Developer",
    company: "Solo Operator",
    url: "",
    duration: "2024 - 2025 (Intermittent)",
    points: [
      "Designed and shipped custom full-stack web applications and AI workflows, automating key business processes to improve client operational efficiency.",
      "Engineered high-volume data extraction and web scraping engines to compile and deliver qualified leads for business agencies.",
      "Built interactive dashboards and integrated third-party APIs (analytics, database sync, and services) to streamline client operations.",
      "Managed end-to-end client communication: gathered requirements, negotiated pricing, and handled complete product lifecycle delivery."
    ],
    tech: ["Next.js", "React", "Python", "Full Stack", "AI Integrations"]
  },
  {
    id: "rhv",
    role: "ML Intern",
    company: "RHV Group",
    url: "",
    duration: "Aug 2024 - Nov 2024",
    points: [
      "Built machine learning recommendation models using Python, increasing client engagement by 15%.",
      "Optimized sales data quality through rigorous cleaning, improving data accuracy by 25% for models.",
      "Delivered impactful technical presentations to 5+ clients, securing positive feedback on model value.",
      "Collaborated closely with 3+ clients to understand business requirements, ensuring tailored ML solution development."
    ],
    tech: ["Python", "Machine Learning", "Data Prep", "Client Relations"]
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
  const [displayedIdx, setDisplayedIdx] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const tablistRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const hlRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const reducedRef = useRef(false);
  const ranOnce = useRef(false);
  const ranPanel = useRef(false);
  const fadeOutPanel = useRef<(idx: number) => void>(() => {});

  const positionHighlight = (animate: boolean) => {
    const tab = tabRefs.current[displayedIdx];
    const list = tablistRef.current;
    if (!tab || !hlRef.current || !list) return;
    const vars = {
      x: tab.offsetLeft - list.scrollLeft,
      y: tab.offsetTop - list.scrollTop,
      width: tab.offsetWidth,
      height: tab.offsetHeight,
    };
    if (animate) gsap.to(hlRef.current, { ...vars, duration: 0.45, ease: "power2.out", overwrite: "auto" });
    else gsap.set(hlRef.current, vars);
  };

  // Sliding highlight + panel entrance; re-runs when the displayed panel changes
  useGSAP(
    (_ctx, contextSafeArg) => {
      const contextSafe = contextSafeArg!;
      const mm = gsap.matchMedia();
      mm.add({ reduce: MOTION_QUERIES.reduce }, (ctx) => {
        reducedRef.current = (ctx.conditions ?? {}).reduce ?? false;
      });

      positionHighlight(ranOnce.current && !reducedRef.current);
      ranOnce.current = true;

      if (ranPanel.current && !reducedRef.current) {
        gsap.from(panelRef.current, {
          opacity: 0,
          y: 8,
          duration: 0.28,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
      ranPanel.current = true;

      fadeOutPanel.current = contextSafe((idx: number) => {
        gsap.to(panelRef.current, {
          opacity: 0,
          y: -8,
          duration: 0.12,
          ease: "power1.in",
          onComplete: () => setDisplayedIdx(idx),
        });
      });
    },
    { scope: sectionRef, dependencies: [displayedIdx] }
  );

  // Keep the highlight glued to its tab across resizes / horizontal scroll
  useEffect(() => {
    const list = tablistRef.current;
    if (!list) return;
    const onLayout = () => positionHighlight(false);
    list.addEventListener("scroll", onLayout);
    window.addEventListener("resize", onLayout);
    return () => {
      list.removeEventListener("scroll", onLayout);
      window.removeEventListener("resize", onLayout);
    };
  }, [displayedIdx]); // eslint-disable-line react-hooks/exhaustive-deps

  const switchJob = (idx: number) => {
    if (idx === displayedIdx) return;
    setActiveJobIdx(idx);
    if (reducedRef.current) {
      setDisplayedIdx(idx);
      return;
    }
    fadeOutPanel.current(idx);
  };

  const handleTabKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    idx: number
  ) => {
    const count = jobs.length;
    let next: number | null = null;

    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        next = (idx + 1) % count;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        next = (idx - 1 + count) % count;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = count - 1;
        break;
    }

    if (next !== null) {
      e.preventDefault();
      switchJob(next);
      tabRefs.current[next]?.focus();
    }
  };

  return (
    <section id="experience" ref={sectionRef} className="max-w-7xl mx-auto px-6 py-10">
      <div 
        className="bg-white/60 backdrop-blur-md rounded-[2rem] p-6 md:p-8 border border-black/5 shadow-sm relative overflow-hidden"
      >
        <p className="text-xs uppercase tracking-widest text-accent-blue mb-4 font-bold font-mono">
          {"// PROFESSIONAL EXPERIENCE"}
        </p>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h2 className="font-display text-3xl font-extrabold text-dark-card tracking-tight">
            Work History
          </h2>
          <a
            href="https://drive.google.com/file/d/1btEtSIFYdw65ZmStVckE6DvITPPG4HRr/view?usp=share_link"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-dark-card text-white hover:bg-black px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md hover:-translate-y-0.5 active:translate-y-0 w-fit"
          >
            <span>View Résumé →</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Sidebar / Tabs List */}
          <div
            ref={tablistRef}
            role="tablist"
            aria-label="Work history"
            className="md:col-span-4 relative flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible border-b md:border-b-0 md:border-l border-black/10 pb-2 md:pb-0 md:pr-4 gap-2 shrink-0 scrollbar-none z-10"
          >
            {/* Sliding active-tab highlight (positioned via GSAP) */}
            <div
              ref={hlRef}
              aria-hidden="true"
              className="absolute inset-0 bg-accent-blue/10 rounded-xl border border-accent-blue pointer-events-none z-0"
            />
            {jobs.map((job, idx) => {
              const isActive = idx === activeJobIdx;
              return (
                <button
                  key={job.id}
                  id={`tab-${job.id}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${job.id}`}
                  tabIndex={isActive ? 0 : -1}
                  ref={(el) => {
                    tabRefs.current[idx] = el;
                  }}
                  onClick={() => switchJob(idx)}
                  onKeyDown={(e) => handleTabKeyDown(e, idx)}
                  className={`relative text-left px-4 py-3 rounded-xl text-xs font-bold transition-colors duration-250 whitespace-nowrap md:whitespace-normal flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-accent-blue ${
                    isActive ? "text-accent-blue" : "text-gray-600 hover:text-dark-card hover:bg-gray-50/50"
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5 flex-shrink-0 z-10" />
                  <span className="z-10">{job.company}</span>
                </button>
              );
            })}
          </div>

          {/* Job Details Box */}
          <div className="md:col-span-8 min-h-[300px] md:h-[360px] flex flex-col justify-between">
            <div
              ref={panelRef}
              id={`panel-${jobs[displayedIdx].id}`}
              role="tabpanel"
              aria-labelledby={`tab-${jobs[displayedIdx].id}`}
              className="flex-1 flex flex-col"
            >
                {/* Title & Dates */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-black/5 pb-4 mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-dark-card flex items-baseline gap-1.5 flex-wrap">
                      <span>{jobs[displayedIdx].role}</span>
                      {jobs[displayedIdx].url ? (
                        <a
                          href={jobs[displayedIdx].url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-bold text-accent-blue hover:underline inline-flex items-center gap-0.5"
                        >
                          @{jobs[displayedIdx].company}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="text-xs font-bold text-gray-500">@{jobs[displayedIdx].company}</span>
                      )}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-600 font-medium whitespace-nowrap">
                    <Calendar className="w-3.5 h-3.5 text-accent-blue/70" />
                    <span>{jobs[displayedIdx].duration}</span>
                  </div>
                </div>

                {/* Bullet Points */}
                <ul className="space-y-3 mb-6 flex-1">
                  {jobs[displayedIdx].points.map((point, i) => (
                    <li key={i} className="text-xs text-gray-600 leading-relaxed flex items-start gap-2">
                      <span className="text-accent-blue mt-1">▹</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-black/5 mt-auto">
                  {jobs[displayedIdx].tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 bg-white text-xs font-mono font-bold text-gray-600 rounded-lg border border-black/5 flex items-center gap-1 shadow-sm"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-blue/70" />
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}
