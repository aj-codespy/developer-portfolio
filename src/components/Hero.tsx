"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as any },
  },
};

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen pt-28 pb-16 flex items-center mesh-bg">
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
        {/* Left Column */}
        <motion.div
          className="lg:col-span-6 flex flex-col items-start"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-3 mb-5"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-700 text-sm font-semibold">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
              </span>
              Available for Hiring
            </div>
            <span className="text-muted-text text-sm font-medium hidden sm:inline">·</span>
            <span className="text-sm font-medium text-muted-text flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-accent-blue" />
              Application-Layer AI Engineer
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-display text-5xl sm:text-6xl lg:text-[4.5rem] font-extrabold tracking-tight text-dark-card leading-[1.05] mb-5"
          >
            I build AI apps
            <br />
            that ship.
          </motion.h1>

          <motion.div variants={itemVariants} className="max-w-lg mb-8">
            <p className="text-base text-muted-text leading-relaxed">
              I turn AI ideas into real, working products — not prototypes that die in a notebook.
            </p>
            <p className="text-base text-muted-text leading-relaxed mt-1.5">
              I work where the model meets the user: APIs, UI, and everything that makes it real.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-3"
          >
            <Link
              href="#contact"
              className="bg-dark-card text-white px-6 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 hover:bg-black transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              Get in touch
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#work"
              className="bg-white text-dark-card border border-black/10 px-6 py-3 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              See my work
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Column — Photo + Floating Cards */}
        <motion.div
          className="lg:col-span-6 relative flex justify-center"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Photo Card */}
          <motion.div 
            whileHover={{ scale: 1.03, rotate: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="relative w-full max-w-[360px] z-10"
          >
            <div className="aspect-[3/4] w-full rounded-2xl overflow-hidden bg-gray-100 border border-black/5 shadow-2xl relative">
              <img
                src="/ayush.jpg"
                alt="Ayush Jha"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5, scale: 1.05 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="absolute -top-2 -right-4 bg-dark-card text-white text-xs font-semibold px-4 py-2 rounded-full shadow-xl flex items-center gap-2 cursor-default"
            >
              <span className="w-2 h-2 rounded-full bg-accent-blue animate-pulse" />
              Built & shipped getPlaced
            </motion.div>
          </motion.div>

          {/* Dark Info Card — Bottom Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5, rotate: -2, scale: 1.05 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="hidden sm:block absolute bottom-6 -left-4 lg:-left-8 bg-dark-card text-white p-4 rounded-xl shadow-xl border border-white/10 max-w-[180px] z-20 cursor-default"
          >
            <p className="font-display font-bold text-sm mb-0.5">My edge:</p>
            <p className="text-xs text-gray-300 leading-relaxed">
              I ship, not just prototype.
            </p>
            <Zap className="w-3.5 h-3.5 text-accent-blue mt-2.5" />
          </motion.div>

          {/* Light Info Card — Bottom Right */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5, rotate: 2, scale: 1.05 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="hidden sm:block absolute bottom-0 -right-4 lg:-right-8 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-xl border border-black/5 max-w-[210px] z-20 cursor-default"
          >
            <p className="font-semibold text-sm text-dark-card leading-snug">
              FastAPI · LangGraph · Supabase
            </p>
            <p className="text-xs text-muted-text mt-1.5 leading-relaxed">
              Shipping agentic AI systems people actually use.
            </p>
            <div className="w-3 h-3 rounded-full border-2 border-accent-blue mt-2.5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
