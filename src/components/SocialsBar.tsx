"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Phone } from "lucide-react";
import Link from "next/link";

/* Inline SVG icons for socials — lucide-react dropped brand icons */
const GithubIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);
const LinkedinIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
const TwitterIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
const InstagramIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);
const LeetcodeIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.048 10.743c0-2.62-1.942-4.743-4.332-4.743h-4.335c-2.39 0-4.332 2.123-4.332 4.743v4.743c0 2.62 1.942 4.743 4.332 4.743h4.335c2.39 0 4.332-2.123 4.332-4.743v-4.743zm-5.946 7.187l-6.905-6.67 1.21-1.17 6.905 6.67-1.21 1.17zm1.21-3.64l-5.092 4.9-2.39-2.31 1.21-1.17 1.18 1.14 3.882-3.73 1.21 1.17z"/>
  </svg>
);
const CodeforcesIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="11" width="4" height="10" rx="0.5" />
    <rect x="10" y="5" width="4" height="16" rx="0.5" />
    <rect x="17" y="14" width="4" height="7" rx="0.5" />
  </svg>
);
const CodechefIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21 11.5a3.5 3.5 0 0 0-3.5-3.5h-.8a6 6 0 0 0-9.4 0H6.5A3.5 3.5 0 0 0 3 11.5c0 1.6.8 3 2.1 3.8a4 4 0 0 0-.1.7v2a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3v-2a4 4 0 0 0-.1-.7c1.3-.8 2.1-2.2 2.1-3.8zm-13 6v-2h8v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1z" />
  </svg>
);

const socials = [
  { name: "GitHub", icon: GithubIcon, href: "https://github.com/aj-codespy" },
  { name: "LinkedIn", icon: LinkedinIcon, href: "https://www.linkedin.com/in/aj-codess/" },
  { name: "X (Twitter)", icon: TwitterIcon, href: "https://x.com/aj_livess" },
  { name: "Instagram", icon: InstagramIcon, href: "https://www.instagram.com/aj_ayushhh/" },
  { name: "LeetCode", icon: LeetcodeIcon, href: "https://leetcode.com/u/aj_codess/" },
  { name: "Codeforces", icon: CodeforcesIcon, href: "https://codeforces.com/profile/aj.codes.py" },
  { name: "CodeChef", icon: CodechefIcon, href: "https://www.codechef.com/users/aj_codespy" },
];

const EMAIL = "ajayush2301@gmail.com";

export default function SocialsBar() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback — silently fail
    }
  };

  return (
    <motion.footer
      id="contact"
      className="max-w-7xl mx-auto px-6 py-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left — Label + Social Links */}
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-text mb-4">
            Let&apos;s connect
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-3 items-center">
            {socials.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-dark-card hover:text-accent-blue transition-colors"
              >
                <social.icon />
                {social.name}
              </Link>
            ))}

            {/* Copy Email */}
            <button
              onClick={handleCopyEmail}
              className="flex items-center gap-2 text-sm font-medium text-dark-card hover:text-accent-blue transition-colors"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              {copied ? "Copied!" : "Copy email"}
            </button>

            {/* Phone */}
            <a
              href="tel:+918591413107"
              className="flex items-center gap-2 text-sm font-medium text-dark-card hover:text-accent-blue transition-colors"
            >
              <Phone className="w-4 h-4" />
              +91 8591413107
            </a>
          </div>
        </div>

        {/* Right — Availability Pill */}
        <div className="flex lg:justify-end">
          <div className="rounded-full border border-black/10 px-4 py-2 flex items-center gap-2 bg-surface-card">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 pulse-green" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
            </span>
            <span className="text-sm text-dark-card">
               Available for remote roles
            </span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
