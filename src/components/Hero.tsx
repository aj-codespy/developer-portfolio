"use client";

import { motion } from "framer-motion";
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
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-display text-[2.25rem] sm:text-5xl lg:text-[3.75rem] font-extrabold tracking-tight text-dark-card leading-[1.05] mb-5"
          >
            I build like it's my own company.
          </motion.h1>

          <motion.div variants={itemVariants} className="max-w-lg mb-8">
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
              , which just hit{" "}
              <span className="bg-accent-blue/10 text-accent-blue font-bold px-2 py-0.5 rounded-lg border border-accent-blue/20 inline-block font-mono text-sm">
                4,000 followers
              </span>
              !
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-3"
          >
            <Link
              href="#contact"
              className="bg-dark-card text-white px-6 py-3 rounded-xl font-semibold text-sm flex items-center hover:bg-black transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              Get in touch →
            </Link>
            <Link
              href="#work"
              className="bg-white text-dark-card border border-black/10 px-6 py-3 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              See my work
            </Link>
            <a
              href="https://drive.google.com/file/d/1btEtSIFYdw65ZmStVckE6DvITPPG4HRr/view?usp=share_link"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-dark-card border border-black/10 px-6 py-3 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              Résumé
            </a>
          </motion.div>

          {/* Credibility Strip */}
          <motion.div
            variants={itemVariants}
            className="mt-8 border-t border-black/5 pt-5 w-full text-xs text-muted-text font-mono flex flex-wrap gap-y-2 gap-x-4 items-center"
          >
            <span>20+ cold conversations with founders</span>
            <span className="text-accent-blue opacity-50">•</span>
            <span>1 product shipped solo</span>
            <span className="text-accent-blue opacity-50">•</span>
            <span>0 specs handed to me</span>
          </motion.div>
        </motion.div>

        {/* Right Column — Photo + Floating Cards */}
        <motion.div
          className="lg:col-span-6 flex justify-center lg:self-start lg:pt-1.5"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Wrapper container for photo and cards so absolute positioning is relative to this wrapper, not the column */}
          <div className="relative w-full max-w-[400px]">
            {/* Photo Card */}
            <motion.div 
              whileHover={{ scale: 1.03, rotate: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 border border-black/5 shadow-2xl z-10"
            >
              <img
                src="/ayush.jpg"
                alt="Ayush Jha"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </motion.div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5, scale: 1.05 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="absolute -top-3 -right-4 md:-right-[206px] lg:-right-[100px] xl:-right-[206px] bg-dark-card text-white text-xs font-semibold px-4 py-2 rounded-full shadow-xl cursor-default animate-bounce-subtle z-20"
            >
              Built & scaled getPlaced to 4K+ users
            </motion.div>

            {/* Dark Info Card — Bottom Left */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5, rotate: -2, scale: 1.05 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="hidden sm:block absolute bottom-16 -left-12 lg:-left-[117px] bg-dark-card text-white p-4 rounded-xl shadow-xl border border-white/10 max-w-[180px] z-20 cursor-default"
            >
              <p className="font-display font-bold text-sm mb-1">My edge:</p>
              <p className="text-[11px] text-gray-300 leading-relaxed">
                I've sat in the user call AND written the code.
              </p>
            </motion.div>

            {/* Light Info Card — Bottom Right */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5, rotate: 2, scale: 1.05 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="hidden sm:block absolute bottom-4 -right-16 lg:-right-[90px] xl:-right-[136px] bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-xl border border-black/5 max-w-[210px] z-20 cursor-default"
            >
              <p className="font-semibold text-xs text-dark-card leading-snug">
                FastAPI · LangGraph · Firebase
              </p>
              <p className="text-[10px] text-muted-text mt-1.5 leading-relaxed">
                The tools change. What doesn't: understanding the actual problem before writing a line of code.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
