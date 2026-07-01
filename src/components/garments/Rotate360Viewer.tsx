"use client";

import { useEffect, useRef, useState } from "react";
import { MousePointer2 } from "lucide-react";

interface Rotate360ViewerProps {
  frames: string[];
  selectedIndex?: number;
  garmentLabel?: string;
}

const previewThemes = [
  {
    shell: "from-primary/20 via-primary-soft/60 to-white",
    panel: "bg-gradient-to-br from-primary/20 via-white to-primary-soft/70",
    accent: "bg-primary/20",
  },
  {
    shell: "from-[#ffd7d7] via-white to-[#f5d0fe]",
    panel: "bg-gradient-to-br from-[#ffe3e3] via-white to-[#f7d7ff]",
    accent: "bg-[#f2b3d4]/30",
  },
  {
    shell: "from-[#d8f1ff] via-white to-[#fff2bf]",
    panel: "bg-gradient-to-br from-[#e0f4ff] via-white to-[#fff5cf]",
    accent: "bg-[#bde6ff]/35",
  },
];

export default function Rotate360Viewer({
  frames,
  selectedIndex = 0,
  garmentLabel,
}: Rotate360ViewerProps) {
  const [rotation, setRotation] = useState(0); // For CSS rotation placeholder
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const startXRef = useRef(0);
  const startRotRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const theme = previewThemes[selectedIndex % previewThemes.length];
  const viewerLabel = garmentLabel ?? (frames.length > 0 ? `${frames.length} views` : "GARMENT");
  
  // Intersection Observer for auto-rotate hint
  useEffect(() => {
    if (!containerRef.current || hasInteracted) return;
    
    let animationFrameId: number;
    let startTime: number;
    const duration = 4000; // 4s full rotation
    
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && !hasInteracted) {
        observer.disconnect();
        
        const animate = (time: number) => {
          if (!startTime) startTime = time;
          const progress = (time - startTime) / duration;
          
          if (progress < 1 && !hasInteracted) {
            setRotation(progress * 360);
            animationFrameId = requestAnimationFrame(animate);
          } else if (!hasInteracted) {
            setRotation(0); // Snap back to 0 at the end
          }
        };
        animationFrameId = requestAnimationFrame(animate);
      }
    }, { threshold: 0.5 });
    
    observer.observe(containerRef.current);
    
    return () => {
      observer.disconnect();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [hasInteracted]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setHasInteracted(true); // Hide hint permanently
    startXRef.current = e.clientX;
    startRotRef.current = rotation;
    if (containerRef.current) {
      containerRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startXRef.current;
    // Map drag distance to rotation (e.g., 2px = 1 degree)
    setRotation(startRotRef.current + (deltaX * 0.5));
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    if (containerRef.current && containerRef.current.hasPointerCapture(e.pointerId)) {
      containerRef.current.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`relative w-full max-w-[450px] aspect-[3/4] max-h-[600px] rounded-2xl overflow-hidden flex items-center justify-center ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} shadow-xl`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{ touchAction: 'none' }} // Prevent scrolling on touch devices while dragging
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${theme.shell} pointer-events-none`} />
      <div className={`absolute inset-x-12 bottom-6 h-14 rounded-full blur-[32px] ${theme.accent} pointer-events-none`} />

      <div 
        className={`absolute inset-x-8 top-12 bottom-8 rounded-xl flex items-center justify-center shadow-lg transition-transform pointer-events-none accelerate-gpu ${theme.panel}`}
        style={{
          transform: `perspective(1000px) rotateY(${rotation}deg)`,
          transitionDuration: isDragging ? '0ms' : '50ms' // instant during drag
        }}
      >
        <div className="flex flex-col items-center gap-3 select-none text-center pointer-events-none">
          <span className="rounded-full border border-primary/15 bg-white/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-text-muted">
            3D Preview
          </span>
          <span className="px-4 font-serif text-2xl font-bold text-primary/70">
            {viewerLabel}
          </span>
        </div>
      </div>
      
      {/* Hanger Hook Placeholder (Static) */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-10 border-4 border-b-0 border-primary/40 rounded-t-lg z-20 pointer-events-none" />
      
      {/* Drag Hint - Fades out on interaction */}
      <div 
        className={`absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 text-text-muted transition-opacity duration-500 pointer-events-none ${
          hasInteracted ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <MousePointer2 size={20} className="animate-pulse text-primary" />
        <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-primary/80 whitespace-nowrap">
          Drag to rotate
        </span>
      </div>
    </div>
  );
}
