"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP, MOTION_QUERIES } from "@/lib/gsap";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const darkCardRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const glow1Ref = useRef<HTMLDivElement>(null);
  const glow2Ref = useRef<HTMLDivElement>(null);
  const magnetRef = useRef<HTMLSpanElement>(null);

  // Hover/magnet functions are assigned inside useGSAP (gated by pointer type +
  // reduced-motion); these refs make the handlers safe no-ops until then.
  const hoverPhoto = useRef<(over: boolean) => void>(() => {});
  const hoverBadge = useRef<(over: boolean) => void>(() => {});
  const hoverDarkCard = useRef<(over: boolean) => void>(() => {});
  const magnetTo = useRef<{ x?: (v: number) => void; y?: (v: number) => void }>({});

  const handleMagnetMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    const el = magnetRef.current;
    const xTo = magnetTo.current.x;
    const yTo = magnetTo.current.y;
    if (!el || !xTo || !yTo) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    xTo(gsap.utils.clamp(-10, 10, dx * 0.35));
    yTo(gsap.utils.clamp(-10, 10, dy * 0.35));
  };
  const handleMagnetLeave = () => {
    magnetTo.current.x?.(0);
    magnetTo.current.y?.(0);
  };

  useGSAP(
    (_context, contextSafeArg) => {
      const contextSafe = contextSafeArg!; // useGSAP always provides this at runtime
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(sectionRef.current);

      mm.add(
        {
          reduce: MOTION_QUERIES.reduce,
          fine: MOTION_QUERIES.fine,
          desktop: MOTION_QUERIES.desktop,
        },
        (ctx) => {
          const { reduce, fine, desktop } = (ctx.conditions ?? {}) as {
            reduce: boolean;
            fine: boolean;
            desktop: boolean;
          };
          if (reduce) return; // reduced-motion: fully static, content visible

          // --- Ambient mesh glows: slow drift (transform-only) ----------
          gsap.to(glow1Ref.current, { x: 70, y: 50, duration: 24, repeat: -1, yoyo: true, ease: "sine.inOut" });
          gsap.to(glow2Ref.current, { x: -60, y: -40, duration: 30, repeat: -1, yoyo: true, ease: "sine.inOut" });

          // --- Entrance choreography -------------------------------------
          const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
          tl.from(q("[data-hero='eyebrow']"), { y: 16, autoAlpha: 0, duration: 0.4 })
            .from(q("[data-hero='copy']"), { y: 20, autoAlpha: 0, duration: 0.5 }, "-=0.2")
            .from(
              q("[data-hero='cta']"),
              { y: 14, autoAlpha: 0, duration: 0.4, stagger: 0.08 },
              "-=0.3"
            )
            .from(q("[data-hero='cred']"), { y: 10, autoAlpha: 0, duration: 0.4 }, "-=0.3");
          tl.from(rightRef.current, { x: 40, autoAlpha: 0, duration: 0.6 }, 0.1);
          tl.from(badgeRef.current, { scale: 0.8, autoAlpha: 0, duration: 0.35, ease: "back.out(1.7)" }, 0.45);

          // --- Headline: word-by-word rise (re-splits on font load) ------
          if (h1Ref.current) {
            SplitText.create(h1Ref.current, {
              type: "words",
              aria: "auto",
              autoSplit: true,
              onSplit: (self) =>
                gsap.from(self.words, {
                  y: 26,
                  autoAlpha: 0,
                  stagger: 0.04,
                  delay: 0.1,
                  duration: 0.6,
                  ease: "power3.out",
                }),
            });
          }

          // --- 5K+ count-up when the badge scrolls into view -------------
          const countUp = contextSafe(() => {
            const counter = { val: 0 };
            gsap.to(counter, {
              val: 5,
              duration: 1.4,
              ease: "power1.out",
              snap: { val: 1 },
              onUpdate: () => {
                if (countRef.current) countRef.current.textContent = `${Math.round(counter.val)}K+`;
              },
            });
          });
          ScrollTrigger.create({
            trigger: badgeRef.current,
            start: "top bottom",
            once: true,
            onEnter: countUp,
          });

          // --- Gentle float after the entrance completes -----------------
          const startFloat = contextSafe(() =>
            gsap.to(badgeRef.current, {
              y: -6,
              duration: 2.6,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            })
          );
          tl.eventCallback("onComplete", startFloat);

          // --- Desktop scroll parallax on the photo stack ----------------
          if (desktop) {
            gsap.to(leftColRef.current, {
              yPercent: 16,
              autoAlpha: 0.35,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 0.6,
              },
            });
            gsap.to(rightRef.current, {
              yPercent: 10,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 0.6,
              },
            });
          }

          // --- Hover micro-interactions + magnetic CTA (fine pointers) ----
          if (fine) {
            hoverPhoto.current = contextSafe((over) =>
              gsap.to(photoRef.current, {
                scale: over ? 1.03 : 1,
                rotation: over ? 1 : 0,
                duration: 0.45,
                ease: "power2.out",
                overwrite: "auto",
              })
            );
            hoverBadge.current = contextSafe((over) =>
              gsap.to(badgeRef.current, {
                y: over ? -5 : 0,
                scale: over ? 1.05 : 1,
                duration: 0.35,
                ease: "power2.out",
                overwrite: "auto",
              })
            );
            hoverDarkCard.current = contextSafe((over) =>
              gsap.to(darkCardRef.current, {
                y: over ? -5 : 0,
                rotation: over ? -2 : 0,
                scale: over ? 1.05 : 1,
                duration: 0.4,
                ease: "power2.out",
                overwrite: "auto",
              })
            );
            magnetTo.current.x = gsap.quickTo(magnetRef.current, "x", { duration: 0.5, ease: "power3.out" });
            magnetTo.current.y = gsap.quickTo(magnetRef.current, "y", { duration: 0.5, ease: "power3.out" });
          }
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section id="home" ref={sectionRef} className="relative min-h-screen pt-28 pb-16 flex items-center mesh-bg overflow-hidden">
      {/* Ambient mesh glows — slow drift (reduced-motion gated in useGSAP) */}
      <div
        aria-hidden
        ref={glow1Ref}
        className="pointer-events-none absolute -top-24 -left-20 w-[460px] h-[460px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(37,99,235,0.16) 0%, transparent 65%)" }}
      />
      <div
        aria-hidden
        ref={glow2Ref}
        className="pointer-events-none absolute top-1/4 -right-28 w-[520px] h-[520px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 65%)" }}
      />
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
        {/* Left Column */}
        <div ref={leftColRef} className="lg:col-span-6 flex flex-col items-start">
          {/* Eyebrow */}
          <div
            data-hero="eyebrow"
            className="flex flex-wrap items-center gap-3 mb-5"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-accent-blue text-sm font-semibold">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-500" />
              </span>
              Available for Hiring
            </div>
          </div>

          {/* Headline */}
          <h1
            ref={h1Ref}
            className="font-display text-[2.25rem] sm:text-5xl lg:text-[3.75rem] font-extrabold tracking-tight text-dark-card leading-[1.05] mb-5"
          >
            I build like it&apos;s my own company.
          </h1>

          <div data-hero="copy" className="max-w-lg mb-8">
            <p className="text-base text-muted-text leading-relaxed">
              Most engineers wait to be told what to build. I get on the call, hear the actual problem, and go build it. As an AI Engineer & Agent Developer, I specialize in LangGraph orchestrations, workflow automations, and custom machine learning pipelines.
            </p>
            <p className="text-base text-muted-text leading-relaxed mt-2.5">
              I&apos;ve built my own product,{" "}
              <a
                href="https://getplaced.online"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-blue hover:underline font-extrabold"
              >
                getPlaced
              </a>
              , which is now at{" "}
              <span className="bg-accent-blue/10 text-accent-blue font-bold px-2 py-0.5 rounded-lg border border-accent-blue/20 inline-block font-mono text-sm">
                5,000+ users
              </span>
              !
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <span ref={magnetRef} className="inline-block" onMouseMove={handleMagnetMove} onMouseLeave={handleMagnetLeave}>
              <Link
                data-hero="cta"
                href="#contact"
                className="bg-dark-card text-white px-6 py-3 rounded-xl font-semibold text-sm flex items-center shadow-md hover:shadow-lg hover:shadow-black/10 hover:bg-black transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                Get in touch →
              </Link>
            </span>
            <Link
              data-hero="cta"
              href="#work"
              className="bg-white text-dark-card border border-black/10 px-6 py-3 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              See my work
            </Link>
            <a
              data-hero="cta"
              href="https://drive.google.com/file/d/1btEtSIFYdw65ZmStVckE6DvITPPG4HRr/view?usp=share_link"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-dark-card border border-black/10 px-6 py-3 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              Résumé
            </a>
          </div>

          {/* Credibility Strip */}
          <div
            data-hero="cred"
            className="mt-8 border-t border-black/5 pt-5 w-full text-xs text-muted-text font-mono flex flex-wrap gap-y-2 gap-x-4 items-center"
          >
            <span>20+ cold conversations with founders</span>
            <span className="text-accent-blue opacity-50">•</span>
            <span>2 products shipped</span>
            <span className="text-accent-blue opacity-50">•</span>
            <span>
              0 specs. Just raw problems.
              <span className="cursor-blink text-accent-blue ml-0.5" aria-hidden>▊</span>
            </span>
          </div>
        </div>

        {/* Right Column — Photo + Floating Cards */}
        <div ref={rightRef} className="lg:col-span-6 flex justify-center lg:self-start lg:pt-1.5">
          {/* Wrapper container for photo and cards so absolute positioning is relative to this wrapper, not the column */}
          <div className="relative w-full max-w-[400px]">
            {/* Photo Card */}
            <div
              ref={photoRef}
              onMouseEnter={() => hoverPhoto.current(true)}
              onMouseLeave={() => hoverPhoto.current(false)}
              className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 border border-black/5 shadow-2xl z-10"
            >
              <Image
                src="/ayush.jpg"
                alt="Ayush Jha"
                priority
                fill
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Floating Badge */}
            <div
              ref={badgeRef}
              onMouseEnter={() => hoverBadge.current(true)}
              onMouseLeave={() => hoverBadge.current(false)}
              className="absolute -top-3 -right-4 md:-right-10 lg:-right-12 bg-dark-card text-white text-xs font-semibold px-4 py-2 rounded-full shadow-xl cursor-default z-20"
            >
              Built &amp; scaled getPlaced to <span ref={countRef}>5K+</span> users
            </div>

            {/* Dark Info Card — Bottom Left */}
            <div
              ref={darkCardRef}
              onMouseEnter={() => hoverDarkCard.current(true)}
              onMouseLeave={() => hoverDarkCard.current(false)}
              className="hidden sm:block absolute bottom-16 -left-8 lg:-left-10 bg-dark-card text-white p-4 rounded-xl shadow-xl border border-white/10 max-w-[180px] z-20 cursor-default"
            >
              <p className="font-display font-bold text-sm mb-1">My edge:</p>
              <p className="text-xs text-gray-300 leading-relaxed">
                I&apos;ve sat in the user call AND written the code.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
