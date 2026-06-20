"use client";

import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";

const SUBSTACK_URL = "https://ayushwritess.substack.com";

const blogPosts = [
  {
    title: "The Boy Who Kept Moving",
    subtitle: "The beginning of my writing journey with a story about myself.",
    date: "Jun 20, 2026",
    readTime: "12 min read",
    category: "Personal",
    topic: "Origin Story",
    bgColor: "from-slate-800 to-slate-900",
    url: "https://ayushwritess.substack.com/p/the-boy-who-kept-moving",
    isLive: true,
  },
  {
    title: "What I Learned Shipping getPlaced Solo",
    subtitle: "From idea to 4,000+ users — the unfiltered build log.",
    date: "Coming Soon",
    readTime: "~8 min read",
    category: "Building",
    topic: "Shipping Solo",
    bgColor: "from-blue-900 to-indigo-900",
    url: SUBSTACK_URL,
    isLive: false,
  },
  {
    title: "Building Agentic Pipelines with LangGraph",
    subtitle: "How I architect multi-agent systems that actually work in prod.",
    date: "Coming Soon",
    readTime: "~6 min read",
    category: "AI Engineering",
    topic: "Agentic Systems",
    bgColor: "from-emerald-900 to-teal-900",
    url: SUBSTACK_URL,
    isLive: false,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12, ease: "easeOut" as any },
  }),
};

export default function BlogPreview() {
  return (
    <section id="blog" className="max-w-7xl mx-auto px-6 pt-4 pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column — Blog Cards */}
        <div className="lg:col-span-8">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-text mb-6">
            // LATEST FROM THE BLOG
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {blogPosts.map((post, i) => (
              <a
                key={post.title}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer"
              >
                <motion.article
                  className="bg-surface-card rounded-xl border border-black/5 overflow-hidden group hover:shadow-xl hover:shadow-black/8 transition-shadow h-full"
                  variants={cardVariants}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  {/* Card Header / Thumbnail */}
                  <div
                    className={`aspect-video bg-gradient-to-br ${post.bgColor} flex flex-col items-start justify-end p-4 overflow-hidden relative`}
                  >
                    {/* Live / Coming Soon badge */}
                    <span
                      className={`absolute top-3 right-3 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                        post.isLive
                          ? "bg-green-500/20 text-green-400 border border-green-500/30"
                          : "bg-white/10 text-white/50 border border-white/15"
                      }`}
                    >
                      {post.isLive ? "● Live" : "Soon"}
                    </span>
                    <p className="text-white/80 font-mono font-bold text-xs uppercase tracking-widest group-hover:scale-[1.03] transition-transform duration-500">
                      {post.topic}
                    </p>
                  </div>

                  {/* Card Content */}
                  <div className="p-4">
                    <h3 className="font-bold text-sm text-dark-card transition-colors leading-snug group-hover:text-accent-blue">
                      {post.title}
                    </h3>
                    <p className="text-xs text-muted-text mt-1 leading-relaxed line-clamp-2">
                      {post.subtitle}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="inline-block bg-accent-blue-light text-accent-blue text-[10px] px-2 py-0.5 rounded-full font-medium">
                        {post.category}
                      </span>
                      <span className="text-[10px] text-muted-text">
                        {post.date} · {post.readTime}
                      </span>
                    </div>
                  </div>
                </motion.article>
              </a>
            ))}
          </div>
        </div>

        {/* Right Column — Substack CTA */}
        <motion.div
          className="lg:col-span-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
        >
          <div className="bg-dark-card rounded-xl border border-white/5 p-6 h-full flex flex-col justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-blue-400 mb-3">
                // AYUSH WRITES
              </p>
              <h3 className="font-bold text-lg text-white leading-snug">
                Long-form writing on AI, building & the journey.
              </h3>
              <p className="text-sm text-white/50 mt-2 leading-relaxed">
                Essays, reflections, and honest build logs from someone still in the middle of figuring it out.
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <a
                href={SUBSTACK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-white text-dark-card font-bold text-sm px-4 py-3 rounded-lg hover:bg-white/90 transition-colors"
              >
                Read on Substack
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href={`${SUBSTACK_URL}?utm_source=portfolio&utm_medium=cta`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border border-white/15 text-white/70 font-medium text-sm px-4 py-2.5 rounded-lg hover:border-white/30 hover:text-white transition-colors"
              >
                Subscribe free
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <p className="text-[11px] text-white/30 mt-3">
              No spam. Unsubscribe anytime. Written by Ayush Jha.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
