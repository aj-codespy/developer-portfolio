"use client";

import { useEffect, useRef } from "react";

export default function DotGrid() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect reduced-motion: keep the static dot layer, skip the mouse spotlight
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      const el = glowRef.current;
      if (!el) return;
      // Direct style write — no React re-render per mousemove
      el.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(37, 99, 235, 0.05), transparent 80%)`;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 h-[100vh]">
      {/* Dotted Grid Layer */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0, 0, 0, 0.15) 1.2px, transparent 1.2px)",
          backgroundSize: "24px 24px",
          maskImage: "linear-gradient(to bottom, black 30%, transparent 90%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 30%, transparent 90%)",
        }}
      />
      {/* Subtle mouse spotlight glow (updated via ref, no re-render) */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: "transparent",
          maskImage: "linear-gradient(to bottom, black 35%, transparent 90%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 35%, transparent 90%)",
        }}
      />
    </div>
  );
}
