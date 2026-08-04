"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, MOTION_QUERIES } from "@/lib/gsap";
import { PhosphorIcon } from "@/components/icons/phosphor-icon";
import TypingEyebrow from "@/components/TypingEyebrow";

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

interface Project {
  name: string;
  description: string;
  pills: string[];
  github: string;
  liveUrl: string;
  color: string;
  iconColor: string;
  iconType: string;
  metric?: string;
  mockup?: "ats" | "transcript";
}

const projects: Project[] = [
  {
    name: "getPlaced",
    description:
      "AI resume builder that turns your background and any job description into an ATS-optimized resume: scored, tailored, and ready to apply.",
    pills: ["Next.js", "FastAPI", "Firebase"],
    github: "https://github.com/aj-codespy/getplaced",
    liveUrl: "https://getplaced.online",
    color: "from-emerald-500/10 to-teal-500/10",
    iconColor: "text-emerald-600",
    iconType: "graduation-cap",
    metric: "5,000+ users",
    mockup: "ats",
  },
  {
    name: "HireLoop",
    description:
      "AI interview platform: a live AI interviewer screens candidates, streams a structured transcript to the team, and hands over a qualified shortlist.",
    pills: ["Next.js", "FastAPI", "Supabase", "WebSockets"],
    github: "",
    liveUrl: "",
    color: "from-blue-500/10 to-indigo-500/10",
    iconColor: "text-blue-600",
    iconType: "message-square",
    mockup: "transcript",
  },
  {
    name: "Cureify",
    description:
      "Multimodal clinical decision support system utilizing a multi-agent AI architecture to analyze patient records, handwritten notes, and medical images.",
    pills: ["LangGraph", "Multimodal AI", "FastAPI", "React"],
    github: "https://github.com/aj-codespy/Cureify-02",
    liveUrl: "https://cureifyy.streamlit.app",
    color: "from-cyan-500/10 to-blue-500/10",
    iconColor: "text-cyan-600",
    iconType: "stethoscope",
  },
  {
    name: "FinChat",
    description:
      "AI financial analyst with interactive Plotly visualizations, real-time yFinance metrics, and LangChain-based IPO document Q&A.",
    pills: ["Streamlit", "Gemini API", "LangChain", "yFinance"],
    github: "https://github.com/aj-codespy/FinChat",
    liveUrl: "https://finchat-hackx.streamlit.app",
    color: "from-amber-500/10 to-orange-500/10",
    iconColor: "text-amber-600",
    iconType: "trending-up",
  },
  {
    name: "Vital",
    description:
      "Real-time medical agentic monitoring system streaming clinical vitals via WebSockets to predict patient risk and alert doctors.",
    pills: ["Next.js", "WebSockets", "Firebase", "Chart.js"],
    github: "https://github.com/aj-codespy/NFC4_DevDeities",
    liveUrl: "",
    color: "from-rose-500/10 to-red-500/10",
    iconColor: "text-rose-600",
    iconType: "activity",
  },
  {
    name: "AI Form Builder",
    description:
      "Dynamic form generator for SMBs that structures, customizes, and renders complete surveys and questionnaires instantly from simple prompts.",
    pills: ["Next.js", "Gemini API", "Tailwind CSS", "Firebase"],
    github: "https://github.com/aj-codespy/AIFormBuilder",
    liveUrl: "https://aj-aiformbuilder.streamlit.app",
    color: "from-blue-500/10 to-sky-500/10",
    iconColor: "text-blue-600",
    iconType: "clipboard",
  },
  {
    name: "LawBuddy",
    description:
      "Legal RAG agent trained on the Indian Constitution and acts, translating complex legal terminology into clear, actionable advice.",
    pills: ["LangChain", "Gemini API", "Pinecone", "Python"],
    github: "https://github.com/aj-codespy/LawBuddy",
    liveUrl: "https://aj-law-buddy.streamlit.app",
    color: "from-slate-500/10 to-stone-500/10",
    iconColor: "text-slate-600",
    iconType: "scale",
  },
  {
    name: "Lead Scraper",
    description:
      "Lead scraping automation engine for agencies and freelancers to extract, compile, and export Yelp business leads across multiple countries into downloadable Excel spreadsheets.",
    pills: ["Streamlit", "Python", "BeautifulSoup", "Pandas"],
    github: "https://github.com/aj-codespy/Lead_Scraper",
    liveUrl: "https://lead-scraper.streamlit.app",
    color: "from-slate-500/10 to-stone-500/10",
    iconColor: "text-slate-600",
    iconType: "search",
  },
  {
    name: "Tax Minimisation",
    description:
      "Full-stack gamified learning platform educating students on tax structures, income generation, assets, liabilities, and investment strategies.",
    pills: ["Next.js", "Node.js", "Firebase", "Framer Motion"],
    github: "https://github.com/aj-codespy/tax_minimisation",
    liveUrl: "",
    color: "from-blue-500/10 to-cyan-500/10",
    iconColor: "text-blue-600",
    iconType: "coins",
  },
];

const getProjectIcon = (type: string, className: string) => {
  switch (type) {
    case "graduation-cap":
      return <PhosphorIcon name="GraduationCap" className={className} />;
    case "trending-up":
      return <PhosphorIcon name="TrendingUp" className={className} />;
    case "activity":
      return <PhosphorIcon name="Activity" className={className} />;
    case "clipboard":
      return <PhosphorIcon name="Clipboard" className={className} />;
    case "scale":
      return <PhosphorIcon name="Scale" className={className} />;
    case "coins":
      return <PhosphorIcon name="Coins" className={className} />;
    case "stethoscope":
      return <PhosphorIcon name="Stethoscope" className={className} />;
    case "search":
      return <PhosphorIcon name="Search" className={className} />;
    case "file-text":
      return <PhosphorIcon name="FileText" className={className} />;
    case "message-square":
      return <PhosphorIcon name="MessageSquare" className={className} />;
    default:
      return <PhosphorIcon name="FileText" className={className} />;
  }
};

/* getPlaced: scroll-driven ATS product-sheet mockup (pipeline → score) */
function GetPlacedSheetMockup() {
  return (
    <div
      data-ats-mockup
      aria-label="getPlaced demonstration: resume goes through AI tailoring and scores 92 out of 100 on the ATS"
      className="mt-5 rounded-2xl border border-accent-blue/20 bg-white p-4 shadow-sm relative overflow-hidden"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-gray-500">
          ATS pipeline · getplaced
        </span>
        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-gray-400">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-blue animate-pulse" aria-hidden />
          live
        </span>
      </div>

      {/* product-sheet pipeline */}
      <div className="mt-3 flex items-center gap-2" aria-hidden>
        <span className="flex flex-col items-center justify-center w-12 h-10 rounded-lg border border-black/10 bg-surface-muted">
          <PhosphorIcon name="FileText" className="w-4 h-4 text-gray-500" />
          <span className="font-mono text-[8px] text-gray-400 mt-0.5">resume</span>
        </span>
        <PhosphorIcon name="ArrowRight" className="w-3.5 h-3.5 text-accent-blue shrink-0" />
        <span className="flex flex-col items-center justify-center w-12 h-10 rounded-lg bg-accent-blue/10 border border-accent-blue/25">
          <PhosphorIcon name="Check" className="w-4 h-4 text-accent-blue" />
          <span className="font-mono text-[8px] text-accent-blue mt-0.5">AI tailors</span>
        </span>
        <PhosphorIcon name="ArrowRight" className="w-3.5 h-3.5 text-accent-blue shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-gray-500">ATS score</span>
            <span data-ats-score className="font-display text-xl font-black text-accent-blue tabular-nums leading-none">
              0
            </span>
          </div>
          <div className="mt-1.5 h-1.5 rounded-full bg-accent-blue/10 overflow-hidden">
            <div
              data-ats-bar
              className="h-full w-full rounded-full bg-gradient-to-r from-accent-blue to-blue-400"
              style={{ transform: "scaleX(0)", transformOrigin: "left" }}
            />
          </div>
          <p className="mt-1 font-mono text-[9px] text-gray-400">target: frontend engineer · 0 → 92</p>
        </div>
      </div>
    </div>
  );
}

/* HireLoop: scroll-driven live-interview transcript mockup */
function HireLoopTranscriptMockup() {
  return (
    <div
      data-hl-mockup
      aria-label="HireLoop demonstration: a live AI interview transcript streams while the candidate answers"
      className="mt-5 rounded-2xl bg-dark-card p-4 text-white shadow-sm relative overflow-hidden"
    >
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-accent-blue opacity-75 animate-ping" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-blue" />
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400">
          live interview · hireloop
        </span>
      </div>
      <div className="mt-3 space-y-2 font-mono text-[11px] leading-relaxed">
        <p data-hl-line className="text-gray-300">ai&gt; Tell me about a time you shipped under pressure.</p>
        <p data-hl-line className="text-accent-blue">you&gt; Cut scope twice, shipped the core path. 5k users on it.</p>
        <p data-hl-line className="text-gray-300">ai&gt; Strong. Scoring against the rubric — 4.2/5. Next.</p>
        <p data-hl-line className="text-gray-500">sys&gt; Transcript streamed to hiring team · qualified</p>
      </div>
    </div>
  );
}

interface FeaturedProjectsProps {
  title?: string;
  subtitle?: string;
}

export default function FeaturedProjects({
  title = "Crafted Software",
  subtitle = "// Featured Projects",
}: FeaturedProjectsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [slideIdx, setSlideIdx] = useState(0);

  // Assigned inside useGSAP (gated by pointer type + reduced-motion)
  const lift = useRef<(over: boolean, el: HTMLElement | null) => void>(() => {});
  const tiltTo = useRef<(el: HTMLElement | null, rx: number, ry: number) => void>(() => {});
  const playTranscript = useRef<() => void>(() => {});

  useGSAP(
    (_ctx, contextSafeArg) => {
      const contextSafe = contextSafeArg!;
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduce: MOTION_QUERIES.reduce,
          fine: MOTION_QUERIES.fine,
        },
        (ctx) => {
          const { reduce, fine } = (ctx.conditions ?? {}) as { reduce: boolean; fine: boolean };
          if (reduce) return;

          // Reveal: cards rise in as they enter (each its own trigger)
          cardRefs.current.forEach((card, i) => {
            if (!card) return;
            gsap.from(card, {
              y: 30,
              autoAlpha: 0,
              duration: 0.5,
              delay: (i % 3) * 0.08,
              ease: "power2.out",
              scrollTrigger: { trigger: card, start: "top 92%", once: true },
            });
          });

          // getPlaced: scroll-driven ATS score (count-up 0 → 92 + bar fill)
          const atsPanel = sectionRef.current?.querySelector("[data-ats-mockup]");
          if (atsPanel) {
            const atsScore = atsPanel.querySelector("[data-ats-score]");
            const atsBar = atsPanel.querySelector("[data-ats-bar]");
            if (atsScore && atsBar) {
              const counter = { v: 0 };
              gsap.to(counter, {
                v: 92,
                duration: 1.6,
                ease: "power2.out",
                scrollTrigger: { trigger: atsPanel, start: "top 88%", once: true },
                onUpdate: () => {
                  atsScore.textContent = String(Math.round(counter.v));
                },
              });
              gsap.fromTo(
                atsBar,
                { scaleX: 0 },
                {
                  scaleX: 0.92,
                  duration: 1.6,
                  ease: "power2.out",
                  scrollTrigger: { trigger: atsPanel, start: "top 88%", once: true },
                }
              );
            }
          }

          // HireLoop: transcript stream — played once the card enters the
          // carousel viewport (carousel onScroll drives it; see handleScroll)
          const hlPanel = sectionRef.current?.querySelector("[data-hl-mockup]") as HTMLElement | null;
          if (hlPanel) {
            const hlLines = hlPanel.querySelectorAll("[data-hl-line]");
            gsap.set(hlLines, { autoAlpha: 0 });
            playTranscript.current = contextSafe(() => {
              if (hlPanel.dataset.played) return;
              hlPanel.dataset.played = "true";
              gsap.fromTo(
                hlLines,
                { y: 10, autoAlpha: 0 },
                {
                  y: 0,
                  autoAlpha: 1,
                  duration: 0.5,
                  stagger: 0.9,
                  ease: "power2.out",
                }
              );
            });
          }

          if (fine) {
            lift.current = contextSafe((over, el) => {
              if (!el || el.dataset.lift !== "true") return;
              gsap.to(el, { y: over ? -6 : 0, duration: over ? 0.3 : 0.45, ease: "power2.out", overwrite: "auto" });
            });
            tiltTo.current = contextSafe((el, rx, ry) => {
              if (!el) return;
              gsap.to(el, { rotationX: rx, rotationY: ry, duration: 0.3, ease: "power2.out", overwrite: "auto" });
            });
          }
        }
      );
    },
    { scope: sectionRef }
  );

  const handleTiltMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    if (e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    tiltTo.current(el, gsap.utils.clamp(-2.5, 2.5, -ny * 5), gsap.utils.clamp(-2.5, 2.5, nx * 5));
  };
  const handleTiltLeave = (e: React.PointerEvent<HTMLDivElement>) => tiltTo.current(e.currentTarget, 0, 0);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const card = container.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 24 : container.clientWidth;
    const idx = Math.round(container.scrollLeft / Math.max(step, 1));
    setSlideIdx(Math.min(Math.max(idx, 0), projects.length - 1));

    // HireLoop transcript: play when its card enters the carousel viewport
    const hlPanel = sectionRef.current?.querySelector("[data-hl-mockup]") as HTMLElement | null;
    if (hlPanel && !hlPanel.dataset.played) {
      const panelRect = hlPanel.getBoundingClientRect();
      const cRect = container.getBoundingClientRect();
      if (panelRect.left < cRect.right - 48) playTranscript.current();
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      container.scrollBy({ left: -container.clientWidth, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      container.scrollBy({ left: container.clientWidth, behavior: "smooth" });
    }
  };

  return (
    <section id="work" ref={sectionRef} className="mx-auto max-w-7xl px-6 pt-16 pb-20">
      {/* Header row */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <TypingEyebrow className="font-mono text-xs uppercase tracking-widest text-muted-text">
            {subtitle}
          </TypingEyebrow>
          <h2 className="font-display text-2xl font-black text-dark-card tracking-tight uppercase">
            {title}
          </h2>
        </div>
        
        {/* Slider Navigation Buttons */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-gray-500 tabular-nums mr-1" aria-live="polite">
            {String(slideIdx + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </span>
          <button
            onClick={scrollLeft}
            className="w-11 h-11 rounded-xl bg-white hover:bg-gray-50 border border-black/10 flex items-center justify-center text-dark-card transition-all hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
            aria-label="Previous projects"
          >
            <PhosphorIcon name="ArrowLeft" className="w-5 h-5" />
          </button>
          <button
            onClick={scrollRight}
            className="w-11 h-11 rounded-xl bg-white hover:bg-gray-50 border border-black/10 flex items-center justify-center text-dark-card transition-all hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
            aria-label="Next projects"
          >
            <PhosphorIcon name="ArrowRight" className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Project cards slider */}
      <div 
        ref={scrollContainerRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Featured projects"
        className="flex gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-4"
        onScroll={handleScroll}
        style={{ scrollBehavior: "smooth" }}
      >
        {projects.map((project, i) => (
          <div
            key={project.name}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            data-lift={project.liveUrl ? "true" : "false"}
            onMouseEnter={(e) => lift.current(true, e.currentTarget)}
            onMouseLeave={(e) => lift.current(false, e.currentTarget)}
            onPointerMove={handleTiltMove}
            onPointerLeave={handleTiltLeave}
            className={`flex-none w-full md:w-[calc(33.333%-16px)] snap-start overflow-hidden rounded-[2rem] border border-black/5 bg-surface-muted p-6 flex flex-col justify-between group transition-[box-shadow,background-color] duration-300 min-h-[250px] relative ${
              project.liveUrl 
                ? "cursor-pointer hover:bg-black/5 hover:shadow-xl hover:shadow-black/5" 
                : "cursor-default"
            }`}
          >
            {/* Top link to liveUrl / project (only if liveUrl exists) */}
            {project.liveUrl && (
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label={`Open ${project.name} live site`}
                className="absolute inset-0 z-10" 
              />
            )}

            <div className="relative z-0 flex flex-col h-full justify-between">
              <div>
                {/* Header: Icon on Left, Title on Right, GitHub on far Right */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    {/* Small square image/icon container */}
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${project.color} border border-black/5 flex items-center justify-center shadow-sm relative overflow-hidden transition-transform duration-300 ${
                      project.liveUrl ? "group-hover:scale-105" : ""
                    }`}>
                      {getProjectIcon(project.iconType, `w-6 h-6 ${project.iconColor}`)}
                    </div>
                    
                    {/* Title & Arrow */}
                    <div className="flex flex-col">
                      <h3 className={`font-display text-lg font-black text-dark-card tracking-tight flex items-center gap-1 transition-colors ${
                        project.liveUrl ? "group-hover:text-accent-blue" : ""
                      }`}>
                        {project.name}
                        {project.liveUrl && (
                          <PhosphorIcon name="ArrowUpRight" className="h-4 w-4 text-accent-blue transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        )}
                      </h3>
                      <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mt-0.5">
                        {project.pills[0]}
                      </p>
                      {project.metric && (
                        <span className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-accent-blue/10 border border-accent-blue/20 text-accent-blue font-mono text-[11px] font-bold w-fit">
                          <span className="h-1.5 w-1.5 rounded-full bg-accent-blue" aria-hidden />
                          {project.metric}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* GitHub button (above link so it is clickable) */}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`View ${project.name} source on GitHub`}
                      title="View Source Code"
                      className="w-10 h-10 rounded-full bg-white hover:bg-gray-100 border border-black/5 flex items-center justify-center text-gray-500 hover:text-dark-card transition-all hover:scale-110 shadow-sm relative z-20"
                    >
                      <GithubIcon className="w-4.5 h-4.5" />
                    </a>
                  )}
                </div>

                {/* Short Description */}
                <p className="mt-4 text-[15px] text-gray-600 leading-relaxed font-normal">
                  {project.description}
                </p>

                {/* Scroll-driven product mockups */}
                {project.mockup === "ats" && <GetPlacedSheetMockup />}
                {project.mockup === "transcript" && <HireLoopTranscriptMockup />}
              </div>

              {/* Footer details: pills */}
              <div className="mt-5 flex flex-wrap gap-1.5">
                {project.pills.map((pill) => (
                  <span
                    key={pill}
                    className="px-2.5 py-1 bg-white/80 text-xs font-mono font-bold text-gray-600 rounded-lg border border-black/5 shadow-sm"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
