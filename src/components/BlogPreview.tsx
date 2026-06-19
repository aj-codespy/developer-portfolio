"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const blogPosts = [
  {
    title: "Building Agentic Pipelines with LangGraph",
    date: "Jun 10, 2026",
    readTime: "6 min read",
    category: "AI Engineering",
    topic: "Agentic Pipelines",
    bgColor: "bg-accent-blue",
    url: "#", // Replace with live Hashnode/Medium/Substack link once published
  },
  {
    title: "What I Learned Shipping getPlaced Solo",
    date: "May 28, 2026",
    readTime: "5 min read",
    category: "Building",
    topic: "Shipping Solo",
    bgColor: "bg-dark-card",
    url: "#", // Replace with live Hashnode/Medium/Substack link once published
  },
  {
    title: "Cold Outreach That Actually Gets Replies",
    date: "May 12, 2026",
    readTime: "4 min read",
    category: "Career",
    topic: "Cold Outreach",
    bgColor: "bg-gray-400",
    url: "#", // Replace with live Hashnode/Medium/Substack link once published
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
            Latest from the blog
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {blogPosts.map((post, i) => (
              <a
                key={post.title}
                href={post.url}
                target={post.url !== "#" ? "_blank" : undefined}
                rel={post.url !== "#" ? "noopener noreferrer" : undefined}
                className={post.url === "#" ? "cursor-default" : "cursor-pointer"}
              >
                <motion.article
                  className="bg-surface-card rounded-xl border border-black/5 overflow-hidden group hover:shadow-xl hover:shadow-black/5 transition-shadow h-full"
                  variants={cardVariants}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  whileHover={post.url !== "#" ? { y: -8 } : {}}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  {/* Image Placeholder */}
                  <div
                    className={`aspect-video ${post.bgColor} flex items-center justify-center p-4 overflow-hidden`}
                  >
                    <p className="text-white/90 font-display font-semibold text-sm text-center leading-snug group-hover:scale-105 transition-transform duration-500">
                      {post.topic}
                    </p>
                  </div>

                  {/* Card Content */}
                  <div className="p-4">
                    <h3 className={`font-medium text-sm text-dark-card transition-colors leading-snug ${
                      post.url !== "#" ? "group-hover:text-accent-blue" : ""
                    }`}>
                      {post.title}
                    </h3>
                    <p className="text-xs text-muted-text mt-1">
                      {post.date} · {post.readTime}
                    </p>
                    <span className="inline-block bg-accent-blue-light text-accent-blue text-xs px-2 py-0.5 rounded-full mt-2">
                      {post.category}
                    </span>
                  </div>
                </motion.article>
              </a>
            ))}
          </div>
        </div>

        {/* Right Column — Newsletter */}
        <motion.div
          className="lg:col-span-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
        >
          <div className="bg-surface-card rounded-xl border border-black/5 p-6 h-full flex flex-col justify-center">
            <h3 className="font-display font-bold text-xl text-dark-card">
              Get updates in your inbox
            </h3>
            <p className="text-sm text-muted-text mt-2">
              Thoughts on AI, building, and shipping products that matter.
            </p>

            <div className="flex mt-4">
              <input
                type="email"
                placeholder="you@email.com"
                className="border border-black/10 rounded-l-lg px-4 py-2.5 text-sm flex-1 bg-white outline-none focus:border-accent-blue transition-colors placeholder:text-muted-text/60"
              />
              <button className="bg-accent-blue text-white px-4 py-2.5 rounded-r-lg font-medium text-sm hover:bg-blue-700 transition-colors flex items-center gap-1.5 shrink-0">
                Subscribe
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-xs text-muted-text mt-2">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
