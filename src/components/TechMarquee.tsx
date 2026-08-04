"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

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
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      // Note: this component deliberately does NOT use gsap.matchMedia —
      // mm.add() callbacks never fire here (observed in dev; other components
      // are fine), so we gate reduced-motion directly instead.
      if (prefersReducedMotion()) return;
      const ctx = gsap.context(() => {
        gsap.from(sectionRef.current, {
          autoAlpha: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 95%", once: true },
        });
        // Seamless ticker: track holds the stack twice; -50% of its
        // content width = exactly one stack, so the loop never jumps.
        tweenRef.current = gsap.to(trackRef.current, {
          xPercent: -50,
          duration: 25,
          ease: "none",
          repeat: -1,
        });
      }, sectionRef);
      return () => ctx.revert();
    },
    { scope: sectionRef }
  );

  // Smoothly slow to a stop / resume on hover (React-driven, no listener leaks).
  const setPaused = (paused: boolean) => {
    if (!tweenRef.current) return;
    gsap.to(tweenRef.current, {
      timeScale: paused ? 0 : 1,
      duration: 0.4,
      ease: "power2.out",
      overwrite: true,
    });
  };

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
          <div
            className="relative min-w-0 flex-1 overflow-hidden"
            onPointerEnter={() => setPaused(true)}
            onPointerLeave={() => setPaused(false)}
          >
            {/* Fade edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-page-base to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-page-base to-transparent" />

            {/* Scrolling track — duplicated for seamless loop */}
            <div ref={trackRef} className="flex w-max will-change-transform" aria-hidden="true">
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
