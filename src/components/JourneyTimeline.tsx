"use client";

import { useRef } from "react";
import Image from "next/image";
import { PhosphorIcon } from "@/components/icons/phosphor-icon";
import TypingEyebrow from "@/components/TypingEyebrow";
import { gsap, useGSAP, MOTION_QUERIES } from "@/lib/gsap";

const timelineData = [
  { year: "2007", title: "Mumbai Move", subtitle: "Moved to the city of dreams from Bihar. Rollercoaster school years began." },
  { year: "2020", title: "Lockdown Freelancing", subtitle: "Discovered hacking basics, starting content writing pre-AI." },
  { year: "2023", title: "Pune & AI Major", subtitle: "Entered university, starting from absolute zero in web dev, cloud, and AI." },
  { year: "2024", title: "Hackathons & Confidence", subtitle: "Won competitions outside the classroom; secured first internship." },
  { year: "2026", title: "Corporate Coding", subtitle: "Corporate engineering at Aligned Automation. Developed commercial, AI production code." },
  { year: "2026", title: "Shipped First SaaS", subtitle: "Launched getPlaced, scaling to 5,000+ users. Upskilling in sales, marketing & GTM." },
];

export default function JourneyTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineHRef = useRef<HTMLDivElement>(null);
  const lineVRef = useRef<HTMLDivElement>(null);
  const deskNodesRef = useRef<(HTMLDivElement | null)[]>([]);
  const mobNodesRef = useRef<(HTMLDivElement | null)[]>([]);
  const footerRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const bleed1Ref = useRef<HTMLDivElement>(null);
  const bleed2Ref = useRef<HTMLDivElement>(null);
  const hoverPhoto = useRef<(over: boolean) => void>(() => {});

  useGSAP(
    (_ctx, contextSafeArg) => {
      const contextSafe = contextSafeArg!;
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduce: MOTION_QUERIES.reduce,
          fine: MOTION_QUERIES.fine,
          tablet: "(min-width: 768px)",
          phone: "(max-width: 767px)",
        },
        (ctx) => {
          const { reduce, fine, tablet, phone } = (ctx.conditions ?? {}) as {
            reduce: boolean;
            fine: boolean;
            tablet: boolean;
            phone: boolean;
          };
          if (reduce) return;

          // Ambient bleed glows around the dark card (slow drift)
          gsap.to(bleed1Ref.current, { x: 60, y: 18, duration: 20, repeat: -1, yoyo: true, ease: "sine.inOut" });
          gsap.to(bleed2Ref.current, { x: -45, y: 30, duration: 26, repeat: -1, yoyo: true, ease: "sine.inOut" });

          // Connecting line draw (scrub, follows scroll)
          if (tablet && lineHRef.current) {
            gsap.fromTo(
              lineHRef.current,
              { scaleX: 0 },
              {
                scaleX: 1,
                ease: "none",
                scrollTrigger: { trigger: lineHRef.current, start: "top 85%", end: "top 25%", scrub: 0.4 },
              }
            );
          }
          if (phone && lineVRef.current) {
            gsap.fromTo(
              lineVRef.current,
              { scaleY: 0 },
              {
                scaleY: 1,
                ease: "none",
                scrollTrigger: { trigger: lineVRef.current, start: "top 90%", end: "bottom 60%", scrub: 0.4 },
              }
            );
          }

          // Node pops (the variant that is visible in this layout)
          const nodes = (tablet ? deskNodesRef : mobNodesRef).current.filter(Boolean) as HTMLDivElement[];
          if (nodes.length) {
            gsap.from(nodes, {
              y: tablet ? 30 : 24,
              autoAlpha: 0,
              duration: 0.5,
              ease: "power2.out",
              stagger: 0.12,
              scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
            });
          }

          // Origin story footer reveal
          if (footerRef.current) {
            gsap.from(footerRef.current, {
              y: 20,
              autoAlpha: 0,
              duration: 0.6,
              delay: 0.15,
              scrollTrigger: { trigger: footerRef.current, start: "top 92%", once: true },
            });
          }

          // Origin photo hover (fine pointers)
          if (fine) {
            hoverPhoto.current = contextSafe((over) =>
              gsap.to(photoRef.current, {
                scale: over ? 1.05 : 1,
                rotate: over ? -2 : 0,
                duration: 0.4,
                ease: "power2.out",
                overwrite: "auto",
              })
            );
          }
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section id="journey" ref={sectionRef} className="relative max-w-7xl mx-auto px-6 pt-20 pb-20 overflow-x-clip">
      {/* Ambient bleed: blue glow crosses the light/dark boundary (GSAP drift) */}
      <div
        aria-hidden
        ref={bleed1Ref}
        className="pointer-events-none absolute -top-16 -left-12 w-[400px] h-[240px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(ellipse, rgba(37,99,235,0.16) 0%, transparent 70%)" }}
      />
      <div className="bg-dark-card rounded-[2rem] pt-6 pb-8 px-6 md:pt-8 md:pb-10 md:px-10 text-white overflow-hidden border border-white/5 relative">
        {/* Inner glow (clipped to card) */}
        <div
          aria-hidden
          ref={bleed2Ref}
          className="pointer-events-none absolute -top-20 -right-20 w-[380px] h-[380px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(37,99,235,0.13) 0%, transparent 70%)" }}
        />
        {/* Header */}
        <TypingEyebrow className="text-xs uppercase tracking-widest text-accent-blue mb-4 font-bold font-mono">
          {"// HOW I GOT HERE"}
        </TypingEyebrow>

        {/* ===== Desktop / Horizontal Zig-Zag Timeline (md+) ===== */}
        <div className="hidden md:block relative h-[240px] my-2">
          {/* Centered Connecting Line */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-0.5 bg-white/10">
            <div ref={lineHRef} className="h-full bg-accent-blue/40 origin-left" />
          </div>

          {/* Nodes grid */}
          <div className="grid grid-cols-6 h-full relative z-10">
            {timelineData.map((item, i) => {
              const isLast = i === timelineData.length - 1;
              const isEven = i % 2 === 0;

              return (
                <div
                  key={item.title}
                  ref={(el) => {
                    deskNodesRef.current[i] = el;
                  }}
                  className="flex flex-col items-center justify-center h-full relative group cursor-default"
                >
                  {/* Alternating Text Containers positioned absolutely relative to center */}
                  {isEven ? (
                    /* EVEN index: Content goes ABOVE the line */
                    <div className="absolute bottom-[calc(50%+10px)] left-1/2 -translate-x-1/2 w-48 text-center flex flex-col items-center justify-end">
                      <p className="text-sm font-bold text-white group-hover:text-accent-blue transition-colors duration-300">{item.title}</p>
                      <p className="text-xs text-gray-500 mt-2 leading-relaxed">{item.subtitle}</p>
                      <span className="text-sm font-bold text-accent-blue mt-3 bg-white/5 border border-white/10 px-2 py-0.5 rounded-md">{item.year}</span>
                    </div>
                  ) : (
                    /* ODD index: Content goes BELOW the line */
                    <div className="absolute top-[calc(50%+10px)] left-1/2 -translate-x-1/2 w-48 text-center flex flex-col items-center justify-start">
                      <span className="text-sm font-bold text-accent-blue mb-3 bg-white/5 border border-white/10 px-2 py-0.5 rounded-md">{item.year}</span>
                      <p className="text-sm font-bold text-white group-hover:text-accent-blue transition-colors duration-300">{item.title}</p>
                      <p className="text-xs text-gray-500 mt-2 leading-relaxed">{item.subtitle}</p>
                    </div>
                  )}

                  {/* Dot (Guaranteed to be perfectly centered in the row) */}
                  <div className={`w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.3)] flex-shrink-0 z-20 group-hover:scale-110 group-hover:bg-accent-blue group-hover:shadow-[0_0_15px_rgba(37,99,235,0.8)] transition-all duration-300 relative ${isLast ? "node-ping" : ""}`} />
                  
                  {/* Arrow Indicator for last item */}
                  {isLast && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 hidden lg:block">
                      <PhosphorIcon name="ArrowRight" className="w-4 h-4 text-accent-blue animate-pulse" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ===== Mobile / Vertical Timeline (below md) ===== */}
        <div className="md:hidden relative pl-8 py-4">
          {/* Vertical connecting line */}
          <div className="absolute left-[5px] top-0 bottom-0 w-0.5 bg-white/10">
            <div ref={lineVRef} className="w-full bg-accent-blue/40 origin-top" style={{ height: "100%" }} />
          </div>

          <div className="flex flex-col gap-10">
            {timelineData.map((item, i) => {
              const isLast = i === timelineData.length - 1;
              return (
                <div
                  key={item.title}
                  ref={(el) => {
                    mobNodesRef.current[i] = el;
                  }}
                  className="relative group cursor-default"
                >
                  {/* Dot — positioned on the vertical line */}
                  <div className={`absolute -left-8 top-1.5 w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.3)] group-hover:scale-110 group-hover:bg-accent-blue group-hover:shadow-[0_0_15px_rgba(37,99,235,0.8)] transition-all duration-300 ${isLast ? "node-ping" : ""}`} />

                  {/* Content */}
                  <div className="flex items-baseline gap-4">
                    <span className="text-sm font-bold text-accent-blue bg-white/5 border border-white/10 px-2 py-0.5 rounded-md shrink-0 flex items-center gap-1">
                      {item.year}
                      {isLast && (
                        <PhosphorIcon name="ArrowRight" className="w-4 h-4 text-accent-blue group-hover:translate-x-1 transition-transform" />
                      )}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-white group-hover:text-accent-blue transition-colors duration-300">{item.title}</p>
                      <p className="text-xs text-gray-500 mt-2 leading-relaxed">{item.subtitle}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ===== Origin story footer ===== */}
        <div
          ref={footerRef}
          className="mt-4 flex flex-col sm:flex-row items-start gap-8 border-t border-white/5 pt-6"
        >
          {/* Photo placeholder */}
          <div
            ref={photoRef}
            onMouseEnter={() => hoverPhoto.current(true)}
            onMouseLeave={() => hoverPhoto.current(false)}
            className="w-36 h-24 rounded-2xl bg-gray-600 flex-shrink-0 flex items-center justify-center overflow-hidden cursor-default shadow-lg border border-white/5 relative"
          >
            <Image
              src="/origin.jpg"
              alt="My workspace at late night"
              fill
              sizes="144px"
              className="object-cover"
            />
          </div>

          {/* Paragraph */}
          <p className="text-xs md:text-sm text-gray-300 leading-relaxed max-w-3xl">
            {"Born in Bihar and raised in Mumbai, I've spent my engineering journey learning what textbooks don't teach. From freelance content writing pre-AI to building multi-agent clinical decision systems today, my drive is to reduce monetary stress for my parents and build a comfortable future. Whether it's training my body to run through shin splints or building software through late nights, I stay open to new challenges, upgrade my skills, and build for the real world."}
          </p>
        </div>
      </div>
    </section>
  );
}
