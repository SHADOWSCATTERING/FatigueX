"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import MagneticButton from "./ui/MagneticButton";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  // Fade in nav after 40px scroll
  const opacity = useTransform(scrollY, [0, 40], [0, 1]);

  useEffect(() => {
    const updateScrolled = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", updateScrolled);
    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  return (
    <motion.nav
      style={{ opacity }}
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
        isScrolled ? "bg-black/70 backdrop-blur-md border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Left: Wordmark */}
        <div className="flex-1">
          <Link href="/" className="font-display font-bold text-xl tracking-tight text-white">
            Fatigue <span className="text-red-700">X</span>
          </Link>
        </div>

        {/* Center: Links */}
        <div className="hidden md:flex items-center space-x-8 flex-1 justify-center">
          {["Overview", "How It Works", "Fatigue Rules", "Dashboard", "API"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-sm font-medium text-white/60 hover:text-white transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </div>

        {/* Right: CTA */}
        <div className="flex-1 flex justify-end">
          <MagneticButton href="https://fatigue-x.vercel.app/" className="text-sm">
            Launch Dashboard
          </MagneticButton>
        </div>
      </div>
    </motion.nav>
  );
}
