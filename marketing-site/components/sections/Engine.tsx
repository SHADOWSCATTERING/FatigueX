"use client";

import { motion } from "framer-motion";
import GlassPanel from "../ui/GlassPanel";

const rules = [
  { name: "Rest Between Shifts", threshold: "≥ 11h", severity: "High", color: "text-risk-high" },
  { name: "Consecutive Working Days", threshold: "≤ 6 days", severity: "High", color: "text-risk-high" },
  { name: "Weekly Working Hours", threshold: "≤ 48h", severity: "Critical", color: "text-risk-critical" },
  { name: "Single Shift Length", threshold: "≤ 12h", severity: "Medium", color: "text-risk-medium" },
  { name: "Consecutive Night Shifts", threshold: "≤ 3 in a row", severity: "Critical", color: "text-risk-critical" },
  { name: "Shift Overlap", threshold: "0 allowed", severity: "Critical", color: "text-risk-critical" },
  { name: "Quick Turnaround", threshold: "< 11h rest", severity: "Medium", color: "text-risk-medium" },
];

export default function Engine() {
  return (
    <section id="fatigue-rules" className="relative min-h-[150vh] flex items-center justify-end">
      
      {/* Floating rule tags - absolute positioned over the viewport */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="max-w-7xl mx-auto px-6 relative w-full h-full">
          {rules.map((rule, i) => (
            <motion.div
              key={rule.name}
              initial={{ opacity: 0, scale: 0.8, y: 100 }}
              whileInView={{ 
                opacity: 1, 
                scale: 1, 
                y: [100, -20, 20], 
                x: [0, (i % 2 === 0 ? 30 : -30), 0] 
              }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ 
                duration: 4 + (i * 0.5), 
                repeat: Infinity, 
                repeatType: "reverse", 
                ease: "easeInOut" 
              }}
              style={{
                position: 'absolute',
                top: `${15 + (i * 12)}%`,
                left: `${10 + ((i * 15) % 40)}%`, // Keeping them mostly on the left to avoid the right text block
              }}
              className="glass-panel px-4 py-2 rounded-lg backdrop-blur-md flex items-center gap-3 border border-white/10 bg-black/40"
            >
              <span className="font-mono text-xs font-medium text-white/80">{rule.name}</span>
              <span className="font-mono text-xs font-bold text-white/90">{rule.threshold}</span>
              <span className={`font-mono text-xs uppercase tracking-wider font-bold ${rule.color}`}>
                {rule.severity}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full flex justify-end pb-32">
        <div className="w-full md:w-1/2 max-w-xl">
          <GlassPanel direction="right" className="glass-edge border-l border-r-0">
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
              A deterministic engine, checking everything, every time.
            </h2>
            <div className="space-y-6 text-lg text-muted">
              <p>
                Rest hours. Consecutive days. Weekly limits. Night streaks. Overlaps.
              </p>
              <p>
                The Fatigue Engine evaluates every dimension of a shift the instant it&apos;s created or reviewed — no manager has to remember a rule, because the system never forgets one.
              </p>
            </div>
          </GlassPanel>
        </div>
      </div>
    </section>
  );
}
