"use client";

import { motion } from "framer-motion";
import MagneticButton from "../ui/MagneticButton";

export default function ReassemblyCTA() {
  return (
    <section id="dashboard" className="relative min-h-screen flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-6 w-full flex flex-col items-center text-center pb-20">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="glass-panel p-10 md:p-16 rounded-3xl flex flex-col items-center shadow-2xl w-full max-w-4xl border border-white/5"
        >
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6"
        >
          Every shift, resolved before it becomes a risk.
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-muted max-w-2xl mb-12 text-balance"
        >
          Upload a roster, connect a Google Sheet, or call the API directly — Fatigue X fits into the workflow you already have.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-6 mb-16"
        >
          <MagneticButton href="https://fatigue-x.vercel.app/">
            Launch the Dashboard
          </MagneticButton>
          <MagneticButton href="https://fatigue-x.vercel.app/api">
            View API Reference
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="font-mono text-xs md:text-sm text-white/30 tracking-wider"
        >
          POST /api/shifts/validate
        </motion.div>
        </motion.div>
        
      </div>
    </section>
  );
}
