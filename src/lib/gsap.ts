import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

// Register plugins once, before any GSAP usage.
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

// Project-wide defaults for a calm, editorial motion language.
gsap.defaults({ duration: 0.6, ease: "power2.out" });

export { gsap, ScrollTrigger, SplitText, useGSAP };

/**
 * Standard responsive + accessibility gates for the portfolio's motion.
 *
 * Every animated component should route its tweens through these conditions so:
 *  - prefers-reduced-motion users get ZERO JS-driven animation (the CSS
 *    kill-switch in globals.css already handles CSS transitions/animations),
 *  - coarse pointers (phones/tablets) skip hover-only effects like tilt/magnet,
 *  - parallax/scrub effects stay desktop-only.
 */
export const MOTION_QUERIES = {
  reduce: "(prefers-reduced-motion: reduce)",
  fine: "(pointer: fine)",
  desktop: "(min-width: 1024px)",
  mobile: "(max-width: 1023px)",
} as const;

/**
 * Returns true when JS-driven motion should be skipped entirely.
 * Use inside gsap.matchMedia handlers via `ctx.conditions.reduce`.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
