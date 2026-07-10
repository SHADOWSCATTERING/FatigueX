"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/ui/CustomCursor";

const OperatorCanvas = dynamic(() => import("@/components/OperatorCanvas"), { ssr: false });

import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Engine from "@/components/sections/Engine";
import AILayer from "@/components/sections/AILayer";
import ReassemblyCTA from "@/components/sections/ReassemblyCTA";

export default function Home() {
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <main className="relative min-h-screen bg-transparent text-white">
      {!isLoaded && (
        <Loader 
          progress={loadProgress} 
          onComplete={() => setIsLoaded(true)} 
        />
      )}
      
      {/* Background Canvas (Sequence + optional 3D) */}
      <OperatorCanvas onProgress={setLoadProgress} />
      
      {/* Global UI */}
      <CustomCursor />
      <Navbar />

      {/* Scroll Sections Container */}
      <div className="relative z-20 flex flex-col gap-[50vh] pb-[50vh]">
        <Hero />
        <Problem />
        <Engine />
        <AILayer />
        <ReassemblyCTA />
      </div>
    </main>
  );
}
