"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { PhosphorIcon } from "@/components/icons/phosphor-icon";
import { gsap, useGSAP, MOTION_QUERIES } from "@/lib/gsap";

const highlights = [
  { category: "FOUNDER", desc: "Built and launched getPlaced, an AI resume builder scaled to 5,000+ active users at getplaced.online." },
  { category: "HACKATHONS", desc: "9 competition wins outside the classroom. 36-hour sprints, prototyping, and shipping under pressure." },
  { category: "INTERNSHIP", desc: "Built an agentic validation engine using LangGraph at Aligned Automation, aligning technical engineering with clients." },
  { category: "CLIENTS & SALES", desc: "Managed freelance content clients pre-AI. Handled pricing, feedback cycles, client negotiations, and end-to-end delivery." },
  { category: "PRESENTATION", desc: "Pitched AI products to judges, demoed to teams, and translated complex ML concepts into clear business narratives." },
];

export default function BentoGrid() {
  const [activeIdx, setActiveIdx] = useState(2);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768
  );

  const wrapRef = useRef<HTMLElement>(null);
  const fanWrapRef = useRef<HTMLDivElement>(null);
  const fanRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeCardRef = useRef<HTMLDivElement | null>(null);
  const ranOnce = useRef(false);

  // Interactivity fns assigned inside useGSAP (gated by pointer type + reduced-motion)
  const lift = useRef<(over: boolean, el: HTMLElement | null) => void>(() => {});
  const fanHover = useRef<(over: boolean, idx: number) => void>(() => {});
  const tiltTo = useRef<(rx: number, ry: number) => void>(() => {});

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Static layout positions (no layout-shift jitter): instant on mount,
  // animated on isMobile (breakpoint) change.
  const positionFan = (animate: boolean) => {
    fanRefs.current.forEach((el, i) => {
      if (!el) return;
      const x = i === activeIdx ? 0 : (i - activeIdx) * (isMobile ? 48 : 105);
      const rotate = i === activeIdx ? 0 : (i - activeIdx) * 4;
      const scale = i === activeIdx ? 1.08 : 0.92;
      gsap.set(el, { zIndex: i === activeIdx ? 30 : i });
      if (animate) {
        gsap.to(el, { x, rotate, scale, duration: 0.55, ease: "back.out(1.4)", overwrite: "auto" });
      } else {
        gsap.set(el, { x, rotate, scale });
      }
    });
  };

  useGSAP(() => {
    positionFan(ranOnce.current);
    ranOnce.current = true;
  }, { dependencies: [isMobile] });

  // Active card change: animate the fan to its new static layout
  useEffect(() => {
    positionFan(true);
    const fans = fanRefs.current;
    return () => gsap.killTweensOf(fans);
  }, [activeIdx]); // eslint-disable-line react-hooks/exhaustive-deps

  // Hover lifts + active-card 3D tilt (fine pointers, no reduced motion)
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
          if (reduce || !fine) return;

          lift.current = contextSafe((over, el) => {
            if (!el) return;
            const rot = parseFloat(el.dataset.rotate || "0");
            gsap.to(el, {
              y: over ? -6 : 0,
              scale: over ? 1.01 : 1,
              rotate: over ? rot : 0,
              duration: over ? 0.35 : 0.45,
              ease: "power2.out",
              overwrite: "auto",
            });
          });

          fanHover.current = contextSafe((over, idx) => {
            const el = fanRefs.current[idx];
            if (!el || el.dataset.fanActive === "true") return; // active card keeps its spot
            gsap.to(el, { y: over ? -8 : 0, duration: over ? 0.3 : 0.45, ease: "power2.out", overwrite: "auto" });
          });

          tiltTo.current = contextSafe((rx, ry) => {
            const el = activeCardRef.current;
            if (!el) return;
            gsap.to(el, { rotationX: rx, rotationY: ry, duration: 0.3, ease: "power2.out", overwrite: "auto" });
          });
        }
      );
    },
    { scope: wrapRef }
  );

  const handleFanTilt = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = fanWrapRef.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    tiltTo.current(gsap.utils.clamp(-3, 3, -ny * 6), gsap.utils.clamp(-3, 3, nx * 6));
  };
  const handleFanTiltLeave = () => tiltTo.current(0, 0);

  const hoverCard = {
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => lift.current(true, e.currentTarget),
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => lift.current(false, e.currentTarget),
  };

  return (
    <section ref={wrapRef} className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex flex-col gap-4">
        
        {/* ROW 1 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Identity Card */}
          <div
            data-hovercard
            data-rotate="-0.2"
            {...hoverCard}
            className="md:col-span-4 bg-accent-blue rounded-[2rem] p-6 flex flex-col items-center justify-center min-h-[200px] border border-black/5 shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="font-display text-[2.25rem] leading-[0.95] font-extrabold text-white text-center tracking-tighter">
              AYUSH
              <br />
              JHA
            </h2>
            <p className="mt-3 text-xs font-bold tracking-[0.25em] text-white/90 uppercase">
              AI Engineer & Builder
            </p>
          </div>

          {/* Carousel Card */}
          <div className="md:col-span-8 bg-transparent rounded-[2rem] relative flex items-center justify-center min-h-[200px] overflow-hidden">
            {/* Soft background glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-accent-blue/5 to-transparent pointer-events-none rounded-[2rem]" />
            
            <div
              ref={fanWrapRef}
              className="relative w-full h-full flex items-center justify-center"
              style={{ perspective: 800 }}
              onPointerMove={handleFanTilt}
              onPointerLeave={handleFanTiltLeave}
            >
              {highlights.map((item, idx) => {
                const isActive = idx === activeIdx;
                return (
                  <div
                    key={idx}
                    ref={(el) => {
                      fanRefs.current[idx] = el;
                      if (isActive) activeCardRef.current = el;
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`${item.category}: ${item.desc}`}
                    aria-current={isActive ? "true" : undefined}
                    data-fan="true"
                    data-fan-active={isActive ? "true" : "false"}
                    onMouseEnter={() => fanHover.current(true, idx)}
                    onMouseLeave={() => fanHover.current(false, idx)}
                    onClick={() => setActiveIdx(idx)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveIdx(idx);
                      }
                    }}
                    className={`absolute w-56 bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-black/5 shadow-md cursor-pointer focus:outline-2 focus:outline-accent-blue ${
                      isActive ? 'shadow-[0_10px_40px_-10px_rgba(37,99,235,0.4)] border-accent-blue/20' : 'hover:opacity-80'
                    }`}
                  >
                    <p className={`text-xs font-bold tracking-widest text-center mb-3 ${isActive ? 'text-dark-card' : 'text-gray-500'}`}>
                      {item.category}
                    </p>
                    <p className="text-xs text-center text-gray-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-mono uppercase tracking-widest text-gray-600/70 pointer-events-none">
              Hover or tap to explore
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          
          {/* Mindset Card */}
          <div
            data-hovercard
            data-rotate="0.2"
            {...hoverCard}
            className="lg:col-span-4 bg-surface-muted rounded-[2rem] p-6 flex flex-col border border-black/5 shadow-sm hover:shadow-md transition-shadow min-h-[330px]"
          >
            <h3 className="font-display text-2xl font-extrabold text-dark-card mb-2 tracking-tight">Mindset</h3>
            <p className="text-gray-600 text-xs leading-relaxed mb-3">
              Building more than software. Running, training, and discipline give me the focus to keep shipping.
            </p>

            {/* Inner Image */}
            <div className="relative w-full flex-1 min-h-[90px] rounded-2xl overflow-hidden mb-3 group border border-black/5 shadow-inner">
              <Image
                src="/run.jpg"
                alt="Running for growth and discipline"
                fill
                sizes="(max-width: 1024px) 100vw, 350px"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-card/90 via-dark-card/20 to-transparent opacity-90" />
              <div className="absolute bottom-3 left-0 right-0 text-center">
                <p className="text-xs font-bold text-white tracking-[0.2em] uppercase">
                  Growth & Discipline
                </p>
              </div>
            </div>

            <p className="text-gray-600 text-xs leading-relaxed mt-auto">
              Mastering body and mind is how I stay sharp.
            </p>
          </div>

          {/* Middle Stack: Photo + Location */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div
              data-hovercard
              data-rotate="-0.2"
              {...hoverCard}
              className="flex-1 bg-gray-300 rounded-[2rem] overflow-hidden relative border border-black/5 shadow-sm group min-h-[150px]"
            >
              <Image
                src="/scenic.jpg"
                alt="Scenic landscape"
                fill
                sizes="(max-width: 1024px) 100vw, 350px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            
            <div
              data-hovercard
              data-rotate="0.2"
              {...hoverCard}
              className="bg-white/60 backdrop-blur-md rounded-[2rem] p-6 border border-black/5 shadow-sm relative overflow-hidden"
            >
              {/* Map background graphic hint */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-[radial-gradient(circle,rgba(0,0,0,0.03)_2px,transparent_2px)] bg-[size:10px_10px] rounded-bl-full -mr-8 -mt-8 opacity-50 pointer-events-none" />
              
              <h4 className="font-display text-2xl font-black text-dark-card uppercase tracking-tighter">
                Pune, India
              </h4>
              <p className="text-xs text-gray-600 font-mono mt-0.5">18.52° N, 73.85° E</p>
              <p className="text-xs font-bold tracking-widest text-accent-blue mt-4 uppercase">
                - GMT+5:30
              </p>
            </div>
          </div>

          {/* Craft Card */}
          <div
            data-hovercard
            data-rotate="-0.2"
            {...hoverCard}
            className="lg:col-span-4 bg-surface-muted rounded-[2rem] p-6 flex flex-col border border-black/5 shadow-sm hover:shadow-md transition-shadow min-h-[330px]"
          >
            <h3 className="font-display text-2xl font-extrabold text-dark-card mb-2 tracking-tight">Craft</h3>
            
            {/* Visual Timeline of Skills */}
            <div className="flex flex-col gap-2.5 my-2.5 font-mono text-xs text-gray-600">
              <div className="flex gap-2">
                <span className="text-accent-blue font-bold">01/</span>
                <div>
                  <strong className="text-dark-card uppercase font-semibold">Data Science</strong>
                  <p className="text-xs text-gray-600">Solid practice in stats, analysis, and cleaning.</p>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="text-accent-blue font-bold">02/</span>
                <div>
                  <strong className="text-dark-card uppercase font-semibold">Deep Learning</strong>
                  <p className="text-xs text-gray-600">Custom model practice on image & text tasks.</p>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="text-accent-blue font-bold">03/</span>
                <div>
                  <strong className="text-dark-card uppercase font-semibold">AI, Agents & Automation</strong>
                  <p className="text-xs text-gray-600">Spent past year solving problems at the frontier.</p>
                </div>
              </div>
            </div>

            <p className="text-gray-600 text-xs leading-relaxed mb-3">
              Professionally interned as DS, ML, and AI engineer, tackling everything from data pipelines to production backends.
            </p>

            {/* Tech Pills */}
            <div className="flex flex-wrap gap-2 mb-3">
              {['LangGraph', 'FastAPI', 'Next.js', 'Firebase', 'Gemini'].map(tech => (
                <span key={tech} className="px-2.5 py-1 bg-white text-xs font-bold text-gray-600 rounded-lg border border-black/5 flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-blue opacity-70" />
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-auto border-t border-black/5 pt-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold bg-green-500/10 text-green-700 px-2 py-0.5 rounded-full uppercase">
                  Remote / Reloc
                </span>
              </div>
              <p className="text-gray-600 text-xs leading-relaxed">
                Open to remote-first AI roles globally & select contract work.
              </p>
            </div>
          </div>

        </div>

        {/* ROW 3 - Education & Status */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Education Dossier */}
          <div
            data-hovercard
            data-rotate="0.1"
            {...hoverCard}
            className="lg:col-span-8 bg-surface-muted rounded-[2rem] p-6 flex flex-col border border-black/5 shadow-sm hover:shadow-md transition-shadow min-h-[220px]"
          >
            <h3 className="font-display text-[1.75rem] font-extrabold text-dark-card mb-4 tracking-tight">Education Dossier</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 flex-1 items-stretch">
              {/* University (Highlighted Blue Card) */}
              <div className="flex flex-col bg-accent-blue text-white rounded-2xl p-4 border border-white/10 shadow-md shadow-accent-blue/15 justify-between min-h-[150px]">
                <div>
                  <p className="text-xs font-bold tracking-wider text-white/90 uppercase mb-1">UNIVERSITY</p>
                  <a href="https://www.mmcoe.edu.in" target="_blank" rel="noopener noreferrer" className="text-sm font-black text-white hover:text-white/80 transition-colors leading-tight mb-1 flex items-center gap-1">
                    MMCOE
                    <PhosphorIcon name="ArrowUpRight" className="w-3 h-3 text-white/75" />
                  </a>
                  <p className="text-xs text-white/90 leading-snug">B.E. Artificial Intelligence & Data Science</p>
                </div>
                <div className="mt-4 pt-2 border-t border-white/10">
                  <p className="text-xs text-white/85">Class of 2027</p>
                  <p className="text-sm font-black text-white mt-0.5">GPA: 9.3/10</p>
                </div>
              </div>

              {/* High School */}
              <div className="flex flex-col bg-white/60 text-dark-card rounded-2xl p-3.5 border border-black/5 shadow-sm justify-between min-h-[135px] my-1.5">
                <div>
                  <p className="text-xs font-bold tracking-wider text-gray-500 uppercase mb-1">JUNIOR COLLEGE</p>
                  <a href="https://www.chmcollege.in" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-dark-card hover:text-accent-blue transition-colors leading-tight mb-1.5 flex items-center gap-1">
                    Smt. CHM College
                    <PhosphorIcon name="ArrowUpRight" className="w-3 h-3 text-gray-500" />
                  </a>
                  <p className="text-xs text-gray-600 leading-snug mb-2">Higher Secondary Certificate (HSC)</p>
                </div>
                <div className="mt-auto">
                  <p className="text-xs text-gray-600">Class of 2023</p>
                  <p className="text-xs font-bold text-dark-card mt-0.5">63% (US: ~3.0 GPA)</p>
                </div>
              </div>

              {/* School */}
              <div className="flex flex-col bg-white/60 text-dark-card rounded-2xl p-3.5 border border-black/5 shadow-sm justify-between min-h-[135px] my-1.5">
                <div>
                  <p className="text-xs font-bold tracking-wider text-gray-500 uppercase mb-1">SECONDARY SCHOOL</p>
                  <a href="https://sssecondary.edu.in" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-dark-card hover:text-accent-blue transition-colors leading-tight mb-1.5 flex items-center gap-1">
                    New Era High School
                    <PhosphorIcon name="ArrowUpRight" className="w-3 h-3 text-gray-500" />
                  </a>
                  <p className="text-xs text-gray-600 leading-snug mb-2">Secondary School Certificate (SSC)</p>
                </div>
                <div className="mt-auto">
                  <p className="text-xs text-gray-600">Class of 2021</p>
                  <p className="text-xs font-bold text-dark-card mt-0.5">93% (US: ~4.0 GPA)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Job Status Card */}
          <div
            data-hovercard
            data-rotate="-0.1"
            {...hoverCard}
            className="lg:col-span-4 bg-dark-card rounded-[2rem] p-6 flex flex-col border border-white/5 shadow-sm hover:shadow-md transition-shadow min-h-[220px]"
          >
            <h3 className="font-display text-[1.5rem] font-bold text-white mb-2 tracking-tight">Status</h3>
            <div className="flex flex-col gap-3 my-auto font-mono text-xs">
              <div className="flex justify-between items-center border-b border-white/10 pb-1.5">
                <span className="text-gray-400 text-xs">EMPLOYMENT</span>
                <span className="text-green-400 font-bold text-xs">SEEKING ROLES</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-1.5">
                <span className="text-gray-400 text-xs">LATEST INT.</span>
                <span className="text-white text-xs">Aligned Automation</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-1.5">
                <span className="text-gray-400 text-xs">FREELANCE</span>
                <span className="text-accent-blue font-bold text-xs">ACTIVE & OPEN</span>
              </div>
            </div>
            <a href="#contact" className="mt-auto text-center py-2.5 px-4 bg-white/5 border border-white/10 text-white rounded-xl text-xs font-bold hover:bg-white/10 transition-colors uppercase tracking-wider">
              Get in Touch
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
