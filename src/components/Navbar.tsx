"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Home", href: "/#home", mobile: true },
    { name: "Work", href: "/work", mobile: true },
    { name: "Journey", href: "/#journey", mobile: true },
    { name: "Blog", href: "/#blog", mobile: false },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 rounded-full flex items-center px-1.5 py-1.5 max-w-[95%] sm:max-w-none ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-lg shadow-black/5 border border-black/5"
          : "bg-white/60 backdrop-blur-sm border border-black/5"
      }`}
    >
      <ul className="flex items-center">
        {links.map((link) => (
          <li key={link.name} className={link.mobile ? "" : "hidden md:block"}>
            <Link
              href={link.href}
              className="text-xs sm:text-sm font-medium text-dark-card/70 hover:text-dark-card px-2.5 sm:px-4 py-2 rounded-full transition-colors hover:bg-black/5 whitespace-nowrap"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href="/#booking"
        className="bg-dark-card text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 rounded-full flex items-center gap-1.5 hover:bg-black transition-colors ml-1 whitespace-nowrap"
      >
        Book a Call
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </motion.nav>
  );
}
