"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP, prefersReducedMotion, MOTION_QUERIES } from "@/lib/gsap";

/**
 * Typewriter cycler sentences — all real product claims, all ≤40 chars so each
 * wraps to exactly 2 lines on every viewport (zero CLS while cycling).
 * Arc: identity → shipped proof → shipping now.
 */
const HEADLINE_SENTENCES = [
  "I build like it's my own company.",
  "I shipped getPlaced — 5K people use it.",
  "Now I'm teaching AI to interview for me.",
];

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
  const pillRingRef = useRef<HTMLSpanElement>(null);
  const heartbeatRef = useRef<HTMLSpanElement>(null);
  const chipGetRef = useRef<HTMLSpanElement>(null);
  const chipHireRef = useRef<HTMLSpanElement>(null);
  const statusStackRef = useRef<HTMLDivElement>(null);

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

      // Reduced-motion: fully static, all content visible.
      if (prefersReducedMotion()) return;

      const q = gsap.utils.selector(sectionRef.current);

      // --- Ambient mesh glows: slow drift + breath (transform/opacity only) --
      const drift1 = gsap.to(glow1Ref.current, { x: 70, y: 50, duration: 24, repeat: -1, yoyo: true, ease: "sine.inOut" });
      const drift2 = gsap.to(glow2Ref.current, { x: -60, y: -40, duration: 30, repeat: -1, yoyo: true, ease: "sine.inOut" });
      const breath1 = gsap.to(glow1Ref.current, { opacity: 0.72, scale: 1.05, duration: 9, repeat: -1, yoyo: true, ease: "sine.inOut" });
      const breath2 = gsap.to(glow2Ref.current, { opacity: 0.65, scale: 1.06, duration: 11, repeat: -1, yoyo: true, ease: "sine.inOut" });

      // --- GSAP ping ring on the availability pill (replaces CSS animate-ping) --
      gsap.set(pillRingRef.current, { scale: 1, opacity: 0.7 });
      const pillRing = gsap.to(pillRingRef.current, {
        scale: 2.6,
        opacity: 0,
        duration: 1.8,
        repeat: -1,
        ease: "power2.out",
        delay: 0.4,
      });

      // --- Heartbeat dot on the "currently shipping" line --------------------
      gsap.set(heartbeatRef.current, { scale: 1, opacity: 0.7 });
      const heartbeat = gsap.to(heartbeatRef.current, {
        scale: 2.2,
        opacity: 0,
        duration: 1.6,
        repeat: -1,
        ease: "power2.out",
        delay: 0.9,
      });

      // --- Proof chips: dim by default, pop when the cycler names them -------
      gsap.set([chipGetRef.current, chipHireRef.current], { autoAlpha: 0.35, scale: 0.96, y: 6 });
      const dimChips = () => {
        gsap.to([chipGetRef.current, chipHireRef.current], {
          autoAlpha: 0.35,
          scale: 0.96,
          y: 6,
          duration: 0.3,
          overwrite: "auto",
        });
      };
      const popChip = (chip: HTMLElement | null) => {
        if (!chip) return;
        gsap.fromTo(
          chip,
          { autoAlpha: 0.35, scale: 0.9, y: 6 },
          { autoAlpha: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.7)", overwrite: "auto" }
        );
      };

      // --- "My edge:" card → live terminal slot-roller (desktop only) --------
      const step = 19; // 15px row + 4px space-y-1 gap
      const roll = gsap.timeline({ repeat: -1, delay: 1.2 });
      [1, 2, 3, 4].forEach((i) => {
        roll
          .to(statusStackRef.current, { y: -step * i, duration: 0.55, ease: "power3.inOut" })
          .to(statusStackRef.current, { y: -step * i, duration: 1.3 });
      });
      roll.set(statusStackRef.current, { y: 0 }); // seamless: last row duplicates row 1

      // --- Entrance choreography ---------------------------------------------
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

      // --- Headline: word-by-word rise, then the typewriter cycler -----------
      let splitInst: SplitText | null = null;
      let cyclerStarted = false;
      if (h1Ref.current) {
        splitInst = SplitText.create(h1Ref.current, {
          type: "words",
          aria: "auto",
          autoSplit: false,
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

      const startCycler = contextSafe(() => {
        const h1 = h1Ref.current;
        if (!h1 || cyclerStarted) return;
        cyclerStarted = true;
        splitInst?.revert(); // textContent writes would destroy split word spans
        const text = h1.querySelector<HTMLElement>("[data-hl-text]");
        if (!text) return;
        // SplitText.revert() clears the span — restore the SSR sentence so the
        // initial hold phase shows it (and reduced-motion/SEO never depend on this).
        text.textContent = HEADLINE_SENTENCES[0];

        const ct = gsap.timeline();
        const type = (s: string) => {
          const tp = { n: 0 };
          ct.to(tp, {
            n: s.length,
            duration: Math.max(0.5, s.length * 0.045),
            ease: "none",
            onStart: () => {
              // Side effects fire when the playhead reaches this tween (not at build time).
              text.textContent = "";
              if (s === HEADLINE_SENTENCES[1]) popChip(chipGetRef.current);
              else if (s === HEADLINE_SENTENCES[2]) popChip(chipHireRef.current);
              else dimChips();
            },
            onUpdate: () => {
              text.textContent = s.slice(0, Math.floor(tp.n));
            },
            onComplete: () => {
              text.textContent = s;
            },
          });
        };
        const erase = (s: string) => {
          const ep = { n: s.length };
          ct.to(ep, {
            n: 0,
            duration: Math.max(0.4, s.length * 0.02),
            ease: "none",
            onUpdate: () => {
              text.textContent = s.slice(0, Math.floor(ep.n));
            },
          });
        };
        const hold = (ms: number) => ct.to({}, { duration: ms / 1000 });

        // Sentence 1 is already rendered (SSR + entrance). Show it, then run
        // one full cycle [s2 → s3 → s1] and settle on s1 forever.
        hold(2400);
        erase(HEADLINE_SENTENCES[0]);
        type(HEADLINE_SENTENCES[1]);
        hold(2400);
        erase(HEADLINE_SENTENCES[1]);
        type(HEADLINE_SENTENCES[2]);
        hold(2400);
        erase(HEADLINE_SENTENCES[2]);
        type(HEADLINE_SENTENCES[0]);
        hold(1200);
      });

      // --- 5K+ count-up when the badge scrolls into view ---------------------
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

      // --- Gentle float after the entrance completes -------------------------
      const startFloat = contextSafe(() =>
        gsap.to(badgeRef.current, {
          y: -6,
          duration: 2.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })
      );
      tl.eventCallback("onComplete", () => {
        startFloat();
        startCycler();
      });

      // --- Pause looping tweens when the tab is hidden -----------------------
      const loopers: gsap.core.Animation[] = [drift1, drift2, breath1, breath2, pillRing, heartbeat, roll];
      const onVisibility = () => {
        const hidden = document.hidden;
        loopers.forEach((t) => (hidden ? t.pause() : t.play()));
      };
      document.addEventListener("visibilitychange", onVisibility);

      // --- Desktop scroll parallax on the photo stack ------------------------
      mm.add({ desktop: MOTION_QUERIES.desktop }, () => {
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
      });

      // --- Hover micro-interactions + magnetic CTA (fine pointers only) ------
      mm.add({ fine: MOTION_QUERIES.fine }, () => {
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
      });

      return () => document.removeEventListener("visibilitychange", onVisibility);
    },
    { scope: sectionRef }
  );

  return (
    <section id="home" ref={sectionRef} className="relative min-h-screen pt-28 pb-16 flex items-center mesh-bg overflow-hidden">
      {/* Ambient mesh glows — slow drift + breath (reduced-motion gated in useGSAP) */}
      <div
        aria-hidden
        ref={glow1Ref}
        className="pointer-events-none absolute -top-24 -left-20 w-[460px] h-[460px] rounded-full blur-3xl opacity-80 md:opacity-100"
        style={{ background: "radial-gradient(circle, rgba(37,99,235,0.16) 0%, transparent 65%)" }}
      />
      <div
        aria-hidden
        ref={glow2Ref}
        className="pointer-events-none absolute top-1/4 -right-28 w-[520px] h-[520px] rounded-full blur-3xl opacity-80 md:opacity-100"
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
                <span ref={pillRingRef} aria-hidden className="absolute inset-0 rounded-full bg-blue-400/70" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-500" />
              </span>
              Open to Freelance + AI Full-time
            </div>
          </div>

          {/* Headline — static sentence 1 for SEO/SSR; typewriter cycler takes over client-side */}
          <h1
            ref={h1Ref}
            className="td-cycler font-display text-[2.25rem] max-[360px]:text-[1.8rem] sm:text-5xl lg:text-[3.75rem] font-extrabold tracking-tight text-dark-card leading-[1.05] mb-5"
          >
            <span data-hl-text>I build like it&apos;s my own company.</span>
            <span aria-hidden className="cursor-blink text-accent-blue select-none inline-block w-0 overflow-visible">▊</span>
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

          {/* Currently-shipping heartbeat line */}
          <p className="flex items-center gap-2 font-mono text-xs text-muted-text mb-6">
            <span className="relative flex h-2 w-2">
              <span ref={heartbeatRef} aria-hidden className="absolute inset-0 rounded-full bg-accent-blue" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-blue" />
            </span>
            {"// currently shipping: hireloop (live ai interviews)"}
          </p>

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
              href="https://drive.google.com/file/d/1Lvo6cVsWBiSF6tZw9zeQP6i9eN7cbxKR/view?usp=share_link"
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
            <span className="text-gray-300">•</span>
            <span>2 products shipped</span>
            <span className="text-gray-300">•</span>
            <span>
              0 specs. Just raw problems.
              <span className="cursor-blink text-accent-blue ml-0.5" aria-hidden>▊</span>
            </span>
          </div>

          {/* Proof chips — dim, light up when the headline cycler names them */}
          <div className="mt-4 flex flex-wrap gap-2" aria-hidden>
            <span
              ref={chipGetRef}
              data-chip="getplaced"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-black/10 bg-white font-mono text-[10px] text-dark-card shadow-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> getPlaced · 5K+ users
            </span>
            <span
              ref={chipHireRef}
              data-chip="hireloop"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-black/10 bg-white font-mono text-[10px] text-dark-card shadow-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent-blue" /> HireLoop · live AI interviews
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-black/10 bg-white font-mono text-[10px] text-dark-card shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F97316]" /> freelance · open
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

            {/* Dark Info Card — Bottom Left (live terminal slot-roller) */}
            <div
              ref={darkCardRef}
              onMouseEnter={() => hoverDarkCard.current(true)}
              onMouseLeave={() => hoverDarkCard.current(false)}
              className="hidden sm:block absolute bottom-16 -left-8 lg:-left-10 bg-dark-card text-white p-4 rounded-xl shadow-xl border border-white/10 max-w-[180px] z-20 cursor-default"
            >
              <p className="font-display font-bold text-sm mb-1.5">My edge:</p>
              <div className="overflow-hidden" style={{ height: 15 }}>
                <div ref={statusStackRef} className="space-y-1">
                  {["user call: listened", "shipped: getPlaced", "building: hireloop", "open: freelance", "user call: listened"].map(
                    (row, i) => (
                      <p key={i} className="text-xs leading-[15px] text-gray-300 whitespace-nowrap">
                        {row}
                      </p>
                    )
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
