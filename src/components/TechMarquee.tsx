"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_QUERIES } from "@/lib/gsap";

const techStack = [
  { name: "FastAPI", color: "#F97316" },
  { name: "LangChain", color: "#22C55E" },
  { name: "React", color: "#61DAFB" },
  { name: "Firebase", color: "#FFA611" },
  { name: "Gemini", color: "#4285F4" },
  { name: "LangGraph", color: "#7C3AED" },
  { name: "Next.js", color: "#0F0F0F" },
  { name: "Python", color: "#EAB308" },
  { name: "Vercel", color: "#0F0F0F", triangle: true },
];

export default function TechMarquee() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ reduce: MOTION_QUERIES.reduce }, (ctx) => {
        const { reduce } = (ctx.conditions ?? {}) as { reduce: boolean };
        if (reduce) return;
        gsap.from(sectionRef.current, {
          autoAlpha: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 95%", once: true },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
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
            <div className="marquee-track" aria-hidden="true">
              {[...techStack, ...techStack].map((tech, i) => (
                <div
                  key={`${tech.name}-${i}`}
                  className="flex shrink-0 items-center gap-2 px-5"
                >
                  {tech.triangle ? (
                    <span
                      className="inline-block h-0 w-0 border-l-[6px] border-r-[6px] border-b-[10px] border-l-transparent border-r-transparent"
                      style={{ borderBottomColor: tech.color }}
                    />
                  ) : (
                    <span
                      className="inline-block h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: tech.color }}
                    />
                  )}
                  <span className="whitespace-nowrap text-sm font-medium">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Accessible single listing — the scrolling track is decorative */}
            <ul className="sr-only">
              {techStack.map((tech) => (
                <li key={tech.name}>{tech.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
