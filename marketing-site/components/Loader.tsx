"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoaderProps {
  progress: number; // 0 to 100
  onComplete: () => void;
}

export default function Loader({ progress, onComplete }: LoaderProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (progress >= 100) {
      // Active Theory pause before revealing
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onComplete, 800); // wait for exit animation
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center text-white"
        >
          <div className="flex flex-col items-center gap-6">
            <h1 className="font-display text-4xl font-bold tracking-tight">Fatigue <span className="text-red-700">X</span></h1>
            
            <div className="w-48 h-px bg-white/20 relative overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 bottom-0 bg-white"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
            
            <div className="font-mono text-sm text-white/60">
              {Math.round(progress).toString().padStart(3, "0")}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
