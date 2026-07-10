"use client";

import { motion } from "framer-motion";

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "left" | "right" | "up" | "down" | "none";
  withEdge?: boolean;
}

export default function GlassPanel({ 
  children, 
  className = "", 
  delay = 0,
  direction = "none",
  withEdge = false
}: GlassPanelProps) {
  
  const getInitial = () => {
    switch (direction) {
      case "left": return { opacity: 0, x: -50 };
      case "right": return { opacity: 0, x: 50 };
      case "up": return { opacity: 0, y: 50 };
      case "down": return { opacity: 0, y: -50 };
      case "none": return { opacity: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`glass-panel p-8 md:p-12 rounded-2xl ${withEdge ? "glass-edge" : ""} ${className}`}
    >
      {children}
    </motion.div>
  );
}
