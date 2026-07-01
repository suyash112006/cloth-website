"use client";

import { useEffect, useState } from "react";

export default function AmbientBackground() {
  const [noiseUrl, setNoiseUrl] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handleMotionChange);

    // Pause animations on tab hide
    const handleVisibilityChange = () => {
      setIsPaused(document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Generate procedural noise texture once
    const generateNoise = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const imgData = ctx.createImageData(128, 128);
        const data = imgData.data;
        for (let i = 0; i < data.length; i += 4) {
          const v = Math.random() * 255;
          data[i] = v;     // red
          data[i + 1] = v; // green
          data[i + 2] = v; // blue
          data[i + 3] = 20; // alpha
        }
        ctx.putImageData(imgData, 0, 0);
        setNoiseUrl(canvas.toDataURL());
      }
    };
    generateNoise();

    return () => {
      mediaQuery.removeEventListener("change", handleMotionChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const animationPlayState = isPaused || prefersReducedMotion ? "paused" : "running";

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-bg">
      {/* Aurora Layer 1 */}
      <div 
        className="absolute w-[150vw] h-[150vh] -top-[25%] -left-[25%] opacity-10 blur-[100px]"
        style={{
          background: "radial-gradient(ellipse at center, var(--color-primary) 0%, transparent 50%)",
          animation: "var(--animate-aurora-1)",
          animationPlayState,
        }}
      />
      
      {/* Aurora Layer 2 */}
      <div 
        className="absolute w-[150vw] h-[150vh] top-[10%] left-[10%] opacity-15 blur-[120px]"
        style={{
          background: "radial-gradient(ellipse at center, var(--color-primary-soft) 0%, transparent 60%)",
          animation: "var(--animate-aurora-2)",
          animationPlayState,
        }}
      />

      {/* Floating Glow Orbs */}
      <div 
        className="absolute top-[20%] left-[30%] w-96 h-96 rounded-full blur-[80px] opacity-15 mix-blend-screen"
        style={{
          background: "var(--color-primary)",
          animation: "var(--animate-orb-float-1)",
          animationPlayState,
        }}
      />
      <div 
        className="absolute top-[60%] left-[70%] w-80 h-80 rounded-full blur-[90px] opacity-20 mix-blend-screen"
        style={{
          background: "var(--color-primary-soft)",
          animation: "var(--animate-orb-float-2)",
          animationPlayState,
        }}
      />
      <div 
        className="absolute top-[70%] left-[20%] w-[400px] h-[400px] rounded-full blur-[100px] opacity-10 mix-blend-screen"
        style={{
          background: "var(--color-primary)",
          animation: "var(--animate-orb-float-3)",
          animationPlayState,
        }}
      />
      <div 
        className="absolute top-[10%] right-[10%] w-[350px] h-[350px] rounded-full blur-[90px] opacity-15 mix-blend-screen"
        style={{
          background: "var(--color-primary-soft)",
          animation: "var(--animate-orb-float-4)",
          animationPlayState,
        }}
      />

      {/* Volumetric Light Rays */}
      <div 
        className="absolute -top-[10%] left-[20%] w-[150px] h-[150vh] blur-[40px] mix-blend-screen pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, var(--color-primary) 0%, transparent 80%)",
          transformOrigin: "top center",
          animation: "var(--animate-ray-sway-1)",
          animationPlayState,
        }}
      />
      <div 
        className="absolute -top-[10%] right-[30%] w-[200px] h-[150vh] blur-[60px] mix-blend-screen pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, var(--color-primary-soft) 0%, transparent 70%)",
          transformOrigin: "top center",
          animation: "var(--animate-ray-sway-2)",
          animationPlayState,
        }}
      />

      {/* Procedural Grain Texture Layer */}
      {noiseUrl && (
        <div 
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url(${noiseUrl})`,
            backgroundRepeat: "repeat",
          }}
        />
      )}
    </div>
  );
}
