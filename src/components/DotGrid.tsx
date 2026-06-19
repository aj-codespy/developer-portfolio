"use client";

import { useEffect, useState } from "react";

export default function DotGrid() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
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
      {/* Subtle mouse spotlight glow */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(37, 99, 235, 0.05), transparent 80%)`,
          maskImage: "linear-gradient(to bottom, black 35%, transparent 90%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 35%, transparent 90%)",
        }}
      />
    </div>
  );
}
