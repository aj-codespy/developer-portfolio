"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

interface TypingEyebrowProps {
  children: string;
  className?: string;
}

/**
 * Section eyebrow that types itself character-by-character when it scrolls
 * into view (the code motif as motion language). Reduced-motion users get
 * the full text instantly (rendered server-side, never cleared).
 */
export default function TypingEyebrow({ children, className = "" }: TypingEyebrowProps) {
  const ref = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const el = ref.current;
      if (!el) return;
      const full = children;
      el.textContent = "";
      const typed = { n: 0 };
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
      tl.to(typed, {
        n: full.length,
        duration: Math.max(0.6, full.length * 0.045),
        ease: "none",
        onUpdate: () => {
          el.textContent = full.slice(0, Math.floor(typed.n));
        },
        onComplete: () => {
          el.textContent = full;
        },
      });
    },
    { scope: ref }
  );

  return (
    <p ref={ref} className={className} aria-label={children}>
      {children}
    </p>
  );
}
