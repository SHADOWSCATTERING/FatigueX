"use client";

import { motion } from "framer-motion";
import MagneticButton from "../ui/MagneticButton";

export default function Hero() {
  return (
    <section id="overview" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full pt-20 z-10 flex flex-col items-center text-center">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="glass-panel p-10 md:p-16 rounded-3xl flex flex-col items-center shadow-2xl w-full max-w-4xl border border-white/5"
        >
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6"
        >
          Fatigue <span className="text-red-700">X</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="text-xl md:text-2xl text-muted max-w-2xl mb-4 text-balance"
        >
          Workforce shift planning, and the fatigue risk hiding inside it.
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
          className="text-lg md:text-xl text-white/40 max-w-2xl mb-12"
        >
          Deterministic rule engine. AI-driven explanations. Safer schedules, automatically.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <MagneticButton href="#how-it-works">
            See How It Works
          </MagneticButton>
          <MagneticButton href="#fatigue-rules">
            View the Fatigue Rules
          </MagneticButton>
        </motion.div>
        </motion.div>
        
      </div>
    </section>
  );
}
