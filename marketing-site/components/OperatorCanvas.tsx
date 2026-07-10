"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Canvas } from "@react-three/fiber";
import ParticleField from "./ParticleField";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface OperatorCanvasProps {
  onProgress: (progress: number) => void;
}

export default function OperatorCanvas({ onProgress }: OperatorCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const totalFrames = 300;
  const images = useRef<HTMLImageElement[]>([]);
  const currentFrame = useRef(1);
  const isLoaded = useRef(false);

  // Draw image to fit/fill canvas
  const drawImage = useCallback((ctx: CanvasRenderingContext2D, img: HTMLImageElement, canvas: HTMLCanvasElement) => {
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;
    
    let drawWidth = canvas.width;
    let drawHeight = canvas.height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawWidth = canvas.width;
      drawHeight = canvas.width / imgRatio;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      drawHeight = canvas.height;
      drawWidth = canvas.height * imgRatio;
      offsetX = (canvas.width - drawWidth) / 2;
    }

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, []);

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const urls = Array.from({ length: totalFrames }, (_, i) => 
      `/sequence/ezgif-frame-${(i + 1).toString().padStart(3, "0")}.png`
    );

    const loadImages = async () => {
      const promises = urls.map((url, i) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = url;
          img.onload = () => {
            images.current[i] = img;
            loadedCount++;
            onProgress((loadedCount / totalFrames) * 100);
            
            if (i === 0 && canvasRef.current) {
              const ctx = canvasRef.current.getContext("2d");
              if (ctx) drawImage(ctx, img, canvasRef.current);
            }
            resolve(true);
          };
          img.onerror = () => {
            console.error(`Failed to load frame ${i + 1}`);
            resolve(false);
          };
        });
      });
      
      await Promise.all(promises);
      isLoaded.current = true;
    };

    loadImages();
  }, [onProgress, drawImage]);


  // Set up ScrollTrigger and rAF loop
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // We animate a dummy object to map scroll progress
    const scrollProxy = { frame: 1 };
    
    // Custom easing that lingers near the middle (Engine section)
    const customEase = gsap.parseEase("power2.inOut");
    
    const tl = gsap.to(scrollProxy, {
      frame: totalFrames,
      snap: "frame",
      ease: customEase, // We can refine this later or keep linear for precise mapping
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
      },
      onUpdate: () => {
        currentFrame.current = Math.round(scrollProxy.frame);
      }
    });

    // Render loop decoupled from scroll event for performance
    let animationFrameId: number;
    let lastRenderedFrame = -1;

    const render = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      
      if (canvas && ctx && isLoaded.current) {
        // Resize canvas to match display size
        const { clientWidth, clientHeight } = canvas;
        if (canvas.width !== clientWidth || canvas.height !== clientHeight) {
          canvas.width = clientWidth;
          canvas.height = clientHeight;
          lastRenderedFrame = -1; // Force redraw on resize
        }

        // Only draw if frame changed
        if (lastRenderedFrame !== currentFrame.current && images.current[currentFrame.current - 1]) {
          drawImage(ctx, images.current[currentFrame.current - 1], canvas);
          lastRenderedFrame = currentFrame.current;
        }
      }
      
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      tl.kill();
      cancelAnimationFrame(animationFrameId);
    };
  }, [drawImage]);

  return (
    <div ref={containerRef} className="fixed inset-0 w-full h-full -z-10 bg-black">
      {/* 2D Image Sequence Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Optional 3D Particle Field Overlay for depth */}
      <div className="absolute inset-0 z-10 pointer-events-none mix-blend-screen">
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <ParticleField />
        </Canvas>
      </div>
    </div>
  );
}
