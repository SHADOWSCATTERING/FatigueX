"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface MagneticButtonProps {
  children: React.ReactNode;
  href: string;
  className?: string;
}

export default function MagneticButton({ children, href, className = "" }: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.div
      style={{ position: "relative" }}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      <Link
        href={href}
        ref={ref}
        onMouseMove={handleMouse}
        onMouseLeave={reset}
        className={`inline-flex items-center justify-center px-6 py-3 rounded-full relative group ${className}`}
      >
        {/* Gradient border container */}
        <div className="absolute inset-0 rounded-full p-[1px] bg-gradient-to-r from-brand-indigo to-brand-cyan opacity-80 group-hover:opacity-100 transition-opacity">
          <div className="absolute inset-0 bg-background rounded-full" />
        </div>
        
        {/* Glowing effect on hover */}
        <div className="absolute inset-0 rounded-full bg-brand-cyan/0 group-hover:bg-brand-cyan/10 transition-colors blur-md" />
        
        {/* Content */}
        <span className="relative z-10 font-medium text-white group-hover:text-brand-cyan transition-colors">
          {children}
        </span>
      </Link>
    </motion.div>
  );
}
