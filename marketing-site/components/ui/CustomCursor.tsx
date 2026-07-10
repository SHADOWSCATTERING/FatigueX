"use client";

import { useEffect } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  // Springs for smooth lagging ring
  const springX = useSpring(0, { stiffness: 500, damping: 28 });
  const springY = useSpring(0, { stiffness: 500, damping: 28 });
  
  const outerSpringX = useSpring(0, { stiffness: 150, damping: 15 });
  const outerSpringY = useSpring(0, { stiffness: 150, damping: 15 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      springX.set(e.clientX);
      springY.set(e.clientY);
      
      outerSpringX.set(e.clientX - 16); // Offset by half of width (32/2)
      outerSpringY.set(e.clientY - 16);
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, [springX, springY, outerSpringX, outerSpringY]);

  return (
    <>
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      {/* Outer lagging ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-white/30 rounded-full pointer-events-none z-50"
        style={{
          x: outerSpringX,
          y: outerSpringY,
        }}
      />
    </>
  );
}
