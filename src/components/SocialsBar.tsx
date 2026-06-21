"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Phone, ArrowUpRight } from "lucide-react";

/* Inline SVG icons for socials */
const GithubIcon = () => (
  <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);
const LinkedinIcon = () => (
  <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
const TwitterIcon = () => (
  <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
const InstagramIcon = () => (
  <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);
const LeetcodeIcon = () => (
  <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16.102 17.93l-2.69-2.6c-.305-.296-.305-.774 0-1.07l2.69-2.6c.304-.296.797-.296 1.101 0l2.69 2.6c.304.296.304.774 0 1.07l-2.69 2.6a.784.784 0 01-1.101 0zM11.603 9.87l5.24 5.06c.305.295.305.773 0 1.07l-1.101 1.06a.784.784 0 01-1.1 0L9.4 11.996a.747.747 0 010-1.07l1.101-1.06a.784.784 0 011.1 0zm-3.877 7.02l2.69-2.6c.305-.296.305-.774 0-1.07l-2.69-2.6a.784.784 0 00-1.101 0l-2.69 2.6c-.305.296-.305.774 0 1.07l2.69 2.6c.305.296.797.296 1.101 0z" />
  </svg>
);
const CodeforcesIcon = () => (
  <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="11" width="4" height="10" rx="0.5" />
    <rect x="10" y="5" width="4" height="16" rx="0.5" />
    <rect x="17" y="14" width="4" height="7" rx="0.5" />
  </svg>
);
const CodechefIcon = () => (
  <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21 11.5a3.5 3.5 0 0 0-3.5-3.5h-.8a6 6 0 0 0-9.4 0H6.5A3.5 3.5 0 0 0 3 11.5c0 1.6.8 3 2.1 3.8a4 4 0 0 0-.1.7v2a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3v-2a4 4 0 0 0-.1-.7c1.3-.8 2.1-2.2 2.1-3.8zm-13 6v-2h8v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1z" />
  </svg>
);

const EMAIL = "ajayush2301@gmail.com";

export default function SocialsBar() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const items = [
    {
      name: "GitHub",
      icon: <GithubIcon />,
      href: "https://github.com/aj-codespy",
      bgColor: "bg-[#181717]",
      textColor: "text-white",
      spanClass: "col-span-1 md:col-span-6 lg:col-span-4",
      username: "@aj-codespy",
      subtitle: "Open Source Projects"
    },
    {
      name: "LinkedIn",
      icon: <LinkedinIcon />,
      href: "https://www.linkedin.com/in/aj-codess/",
      bgColor: "bg-[#0A66C2]",
      textColor: "text-white",
      spanClass: "col-span-1 md:col-span-6 lg:col-span-4",
      username: "@aj-codess",
      subtitle: "Professional Network"
    },
    {
      name: "X (Twitter)",
      icon: <TwitterIcon />,
      href: "https://x.com/aj_livess",
      bgColor: "bg-[#0F1419]",
      textColor: "text-white",
      spanClass: "col-span-1 md:col-span-6 lg:col-span-4",
      username: "@aj_livess",
      subtitle: "Thoughts & Updates"
    },
    {
      name: "Copy Email",
      icon: copied ? <Check className="w-4.5 h-4.5 text-green-300 animate-pulse" /> : <Copy className="w-4.5 h-4.5" />,
      isCopy: true,
      bgColor: "bg-[#2563EB]",
      textColor: "text-white",
      spanClass: "col-span-1 md:col-span-12 lg:col-span-8",
      username: EMAIL,
      subtitle: copied ? "Email address copied!" : "Click to copy address"
    },
    {
      name: "Call Me",
      icon: <Phone className="w-4.5 h-4.5" />,
      href: "tel:+918591413107",
      bgColor: "bg-[#16A34A]",
      textColor: "text-white",
      spanClass: "col-span-1 md:col-span-6 lg:col-span-4",
      username: "+91 85914 13107",
      subtitle: "Let's talk directly"
    },
    {
      name: "LeetCode",
      icon: <LeetcodeIcon />,
      href: "https://leetcode.com/u/aj_codess/",
      bgColor: "bg-[#FFA116]",
      textColor: "text-[#1A1A1A]",
      spanClass: "col-span-1 md:col-span-6 lg:col-span-3",
      username: "@aj_codess",
      subtitle: "Rating: 1572"
    },
    {
      name: "Codeforces",
      icon: <CodeforcesIcon />,
      href: "https://codeforces.com/profile/aj.codes.py",
      bgColor: "bg-[#1F8ACB]",
      textColor: "text-white",
      spanClass: "col-span-1 md:col-span-6 lg:col-span-3",
      username: "aj.codes.py",
      subtitle: "Rating: 1308"
    },
    {
      name: "CodeChef",
      icon: <CodechefIcon />,
      href: "https://www.codechef.com/users/aj_codespy",
      bgColor: "bg-[#5B4636]",
      textColor: "text-white",
      spanClass: "col-span-1 md:col-span-6 lg:col-span-3",
      username: "aj_codespy",
      subtitle: "Rating: 1633"
    },
    {
      name: "Instagram",
      icon: <InstagramIcon />,
      href: "https://www.instagram.com/aj_ayushhh/",
      bgColor: "bg-[#E4405F]",
      textColor: "text-white",
      spanClass: "col-span-1 md:col-span-6 lg:col-span-3",
      username: "@aj_ayushhh",
      subtitle: "Life & Stories"
    },
  ];

  return (
    <motion.footer
      id="contact"
      className="max-w-7xl mx-auto px-6 py-16 font-mono"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="border-t border-black/5 pt-12 mb-8 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-accent-blue mb-2 font-bold">
            // LET&apos;S CONNECT
          </p>
          <h2 className="font-display text-2xl font-black text-dark-card tracking-tight uppercase">
            Find Me Online
          </h2>
        </div>
        {/* Availability Pill */}
        <div className="rounded-full border border-black/10 px-4 py-2 flex items-center gap-2 bg-surface-card w-fit shrink-0">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 pulse-green" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
          </span>
          <span className="text-xs text-dark-card font-bold">
             Available for remote roles
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {items.map((item) => {
          const CardContent = (
            <motion.div
              whileHover={{ scale: 1.035, y: -4 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className={`relative group rounded-[1.5rem] p-5 border border-white/5 shadow-sm flex flex-col justify-between cursor-pointer transition-shadow hover:shadow-lg ${item.bgColor} ${item.textColor} h-[130px] overflow-hidden`}
              onClick={item.isCopy ? (e) => handleCopyEmail(e) : undefined}
            >
              {/* Soft inner glow on hover */}
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />
              
              {/* Top Row: Icon Container and Go To Arrow */}
              <div className="flex items-center justify-between relative z-10 w-full">
                {/* Icon Container */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-sm shrink-0 border shadow-inner ${item.name === "LeetCode" ? "bg-black/5 border-black/10 text-[#1A1A1A]" : "bg-white/10 border-white/10 text-white"}`}>
                  {item.icon}
                </div>
                
                {/* Go To Arrow (slides and fades in on hover) */}
                <div className={`opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 shrink-0 relative z-10`}>
                  <ArrowUpRight className={`w-5 h-5 ${item.name === "LeetCode" ? "text-[#1A1A1A]/85" : "text-white/85"}`} />
                </div>
              </div>

              {/* Bottom Row: Name and Username */}
              <div className="flex flex-col relative z-10 mt-auto">
                <span className="font-display font-black text-base tracking-tight leading-none uppercase">
                  {item.name === "Copy Email" && copied ? "Email Copied!" : item.name}
                </span>
                <span className={`text-[10px] uppercase tracking-widest font-bold mt-1 font-mono leading-none ${item.name === "LeetCode" ? "text-[#1A1A1A]/60" : "text-white/60"}`}>
                  {item.username}
                </span>
                <span className={`text-[8px] uppercase tracking-wider mt-1 leading-none ${item.name === "LeetCode" ? "text-[#1A1A1A]/40" : "text-white/40"}`}>
                  {item.subtitle}
                </span>
              </div>
            </motion.div>
          );

          if (item.href) {
            return (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`block ${item.spanClass}`}
              >
                {CardContent}
              </a>
            );
          } else {
            return (
              <div key={item.name} className={`block ${item.spanClass}`}>
                {CardContent}
              </div>
            );
          }
        })}
      </div>
    </motion.footer>
  );
}
