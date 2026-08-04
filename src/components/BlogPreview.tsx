"use client";

import { useRef } from "react";
import { PhosphorIcon } from "@/components/icons/phosphor-icon";
import { gsap, useGSAP, MOTION_QUERIES } from "@/lib/gsap";

const blogPosts = [
  {
    title: "Why I Choose Rust over Python for FastAPI",
    excerpt: "Being an AI Engineer, most of my work revolves around Python — but for my backend APIs, I deliberately choose Rust. Here's my honest take on the trade-offs.",
    date: "2025-05-02",
    readTime: "4 min read",
    url: "https://blog.ajayush.in/why-i-choose-rust-over-python-for-fastapi",
  },
  {
    title: "The 100 Days of ML Challenge",
    excerpt: "I ran a 100-day deep learning challenge documenting my progress and honest failures — here's what the last 100 days of consistency taught me.",
    date: "2025-08-01",
    readTime: "6 min read",
    url: "https://blog.ajayush.in/the-100-days-of-ml-challenge",
  },
  {
    title: "My 2026 AI Engineering Roadmap",
    excerpt: "Thoughts on what to learn next as an AI engineer in 2026 — agents, evaluations, and building for the real world.",
    date: "2026-01-03",
    readTime: "5 min read",
    url: "https://blog.ajayush.in/my-2026-ai-engineering-roadmap",
  },
];

export default function BlogPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);
  const lift = useRef<(over: boolean, el: HTMLElement | null) => void>(() => {});

  useGSAP(
    (_ctx, contextSafeArg) => {
      const contextSafe = contextSafeArg!;
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduce: MOTION_QUERIES.reduce,
          fine: MOTION_QUERIES.fine,
        },
        (ctx) => {
          const { reduce, fine } = (ctx.conditions ?? {}) as { reduce: boolean; fine: boolean };
          if (reduce) return;

          // Cards rise in with a stagger as they enter
          cardRefs.current.forEach((card, i) => {
            if (!card) return;
            gsap.from(card, {
              y: 28,
              autoAlpha: 0,
              duration: 0.5,
              delay: i * 0.1,
              ease: "power2.out",
              scrollTrigger: { trigger: card, start: "top 92%", once: true },
            });
          });

          // Substack CTA reveal
          if (ctaRef.current) {
            gsap.from(ctaRef.current, {
              y: 24,
              autoAlpha: 0,
              duration: 0.55,
              delay: 0.15,
              ease: "power2.out",
              scrollTrigger: { trigger: ctaRef.current, start: "top 92%", once: true },
            });
          }

          if (fine) {
            lift.current = contextSafe((over, el) => {
              if (!el) return;
              gsap.to(el, { y: over ? -6 : 0, duration: over ? 0.3 : 0.45, ease: "power2.out", overwrite: "auto" });
            });
          }
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section id="blog" ref={sectionRef} className="max-w-7xl mx-auto px-6 pt-20 pb-10">
      <p className="text-xs uppercase tracking-widest text-gray-500 mb-4 font-bold font-mono">
        {"// LATEST FROM THE BLOG"}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {blogPosts.map((post, i) => (
          <a
            key={post.url}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={(e) => lift.current(true, e.currentTarget)}
            onMouseLeave={(e) => lift.current(false, e.currentTarget)}
            className="group bg-white/60 backdrop-blur-md rounded-[2rem] border border-black/5 shadow-sm p-6 hover:shadow-xl hover:shadow-black/5 transition-shadow duration-300 flex flex-col min-h-[220px]"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">
                {post.date}
              </span>
              <PhosphorIcon name="ArrowUpRight" className="w-4 h-4 text-gray-400 group-hover:text-accent-blue group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
            </div>
            <h3 className="font-display text-lg font-bold text-dark-card leading-snug mb-2 group-hover:text-accent-blue transition-colors duration-300">
              {post.title}
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed mb-6">
              {post.excerpt}
            </p>
            <div className="mt-auto flex items-center justify-between border-t border-black/5 pt-3">
              <span className="text-xs font-mono text-gray-500">{post.readTime}</span>
              <span className="text-xs font-bold text-accent-blue inline-flex items-center gap-1">
                Read article
                <PhosphorIcon name="ArrowRight" className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-300" />
              </span>
            </div>
          </a>
        ))}
      </div>

      {/* Substack CTA */}
      <div
        ref={ctaRef}
        className="mt-6 bg-white/40 backdrop-blur-md rounded-[2rem] border border-black/5 shadow-sm px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-accent-blue/10 text-accent-blue flex items-center justify-center flex-shrink-0">
            <PhosphorIcon name="PenLine" className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-dark-card">Get the full essays</p>
            <p className="text-xs text-gray-600">Deep dives on AI, engineering, and building in public. Straight to your inbox.</p>
          </div>
        </div>
        <a
          href="https://ajayush.substack.com"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 px-4 py-2.5 bg-accent-blue text-white text-xs font-bold rounded-xl hover:bg-accent-blue/90 transition-colors duration-300 inline-flex items-center gap-1.5"
        >
          Subscribe on Substack
          <PhosphorIcon name="ArrowUpRight" className="w-3.5 h-3.5" />
        </a>
      </div>
    </section>
  );
}
