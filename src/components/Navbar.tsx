"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { PhosphorIcon } from "@/components/icons/phosphor-icon";
import { gsap, ScrollTrigger, useGSAP, MOTION_QUERIES } from "@/lib/gsap";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const magnetTo = useRef<{ x?: (v: number) => void; y?: (v: number) => void }>({});
  const navCtaRef = useRef<HTMLSpanElement>(null);

  const handleMagnetMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    const el = navCtaRef.current;
    const xTo = magnetTo.current.x;
    const yTo = magnetTo.current.y;
    if (!el || !xTo || !yTo) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    xTo(gsap.utils.clamp(-6, 6, dx * 0.3));
    yTo(gsap.utils.clamp(-6, 6, dy * 0.3));
  };
  const handleMagnetLeave = () => {
    magnetTo.current.x?.(0);
    magnetTo.current.y?.(0);
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Entrance (skipped for reduced-motion users — nav stays visible)
      mm.add({ reduce: MOTION_QUERIES.reduce }, (ctx) => {
        if ((ctx.conditions ?? {}).reduce) return;
        gsap.from(navRef.current, { y: -20, autoAlpha: 0, duration: 0.5, ease: "power2.out" });
      });

      // Scroll-aware pill: class swap at 80px (matches the previous listener)
      ScrollTrigger.create({
        start: "top -80",
        end: "max",
        onToggle: (self) => setIsScrolled(self.isActive),
      });

      // Magnetic nav CTA (fine pointers only)
      mm.add(
        {
          reduce: MOTION_QUERIES.reduce,
          fine: MOTION_QUERIES.fine,
        },
        (ctx) => {
          const { reduce, fine } = (ctx.conditions ?? {}) as { reduce: boolean; fine: boolean };
          if (reduce || !fine) return;
          magnetTo.current.x = gsap.quickTo(navCtaRef.current, "x", { duration: 0.5, ease: "power3.out" });
          magnetTo.current.y = gsap.quickTo(navCtaRef.current, "y", { duration: 0.5, ease: "power3.out" });
        }
      );
    },
    { scope: navRef }
  );

  const links = [
    { name: "Work", href: "/#experience", mobile: true },
    { name: "Journey", href: "/#journey", mobile: true },
    { name: "Blog", href: "/#blog", mobile: false },
  ];

  return (
    <nav
      ref={navRef}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 rounded-full flex items-center px-1.5 py-1.5 max-w-[95%] sm:max-w-none ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-lg shadow-black/5 border border-black/5"
          : "bg-white/60 backdrop-blur-sm border border-black/5"
      }`}
    >
      <Link
        href="/#home"
        aria-label="Ayush Jha — back to top"
        className="flex items-center gap-2 text-sm sm:text-base font-bold text-dark-card pl-1.5 pr-3 py-1.5 rounded-full hover:bg-black/5 transition-colors whitespace-nowrap"
      >
        <span
          className="flex items-center justify-center w-7 h-7 rounded-full bg-dark-card text-white font-mono text-[11px] font-bold shrink-0"
          aria-hidden
        >
          aj<span className="text-accent-blue">&gt;</span>
        </span>
        Ayush&nbsp;Jha
      </Link>
      <span className="h-5 w-px bg-black/10 mx-1" aria-hidden="true" />
      <ul className="flex items-center">
        {links.map((link) => (
          <li key={link.name} className={link.mobile ? "" : "hidden md:block"}>
            <Link
              href={link.href}
              className="text-xs sm:text-sm font-medium text-dark-card/70 hover:text-dark-card px-2.5 sm:px-4 py-2.5 rounded-full transition-colors hover:bg-black/5 whitespace-nowrap"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
      <span
        ref={navCtaRef}
        className="inline-block ml-1"
        onMouseMove={handleMagnetMove}
        onMouseLeave={handleMagnetLeave}
      >
        <Link
          href="/#booking"
          className="bg-dark-card text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2.5 rounded-full flex items-center gap-1.5 hover:bg-black transition-colors whitespace-nowrap"
        >
          Book a Call
          <PhosphorIcon name="ArrowRight" className="w-3.5 h-3.5 hidden sm:block" />
        </Link>
      </span>
    </nav>
  );
}
