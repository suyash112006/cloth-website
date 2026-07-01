"use client";

import { useEffect, useRef, useState } from "react";
import { motion, type PanInfo, useMotionValue, useSpring, useVelocity, useTransform } from "framer-motion";
import { MousePointerClick } from "lucide-react";
import SideNav from "../layout/SideNav";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ITEM_COUNT = 7;
const ITEM_WIDTH = 280; // approximate width of a rack item
const ITEM_GAP = 40; // distance between items
const TOTAL_WIDTH = ITEM_WIDTH + ITEM_GAP;

export default function HeroCarouselRack() {
  const [centerIndex, setCenterIndex] = useState(Math.floor(ITEM_COUNT / 2));
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false,
  );

  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 100, damping: 20 });
  const xVelocity = useVelocity(springX);
  const blurAmount = useTransform(xVelocity, [-2500, 0, 2500], [10, 0, 10]);
  const blurFilter = useTransform(blurAmount, (val) => val > 0.1 ? `blur(${val}px)` : "none");

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleMotionChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleMotionChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, { offset }: PanInfo) => {
    const swipe = offset.x;

    if (swipe < -50 && centerIndex < ITEM_COUNT - 1) {
      setCenterIndex((prev) => prev + 1);
    } else if (swipe > 50 && centerIndex > 0) {
      setCenterIndex((prev) => prev - 1);
    }
  };

  useEffect(() => {
    // Snap to the selected index
    x.set(-centerIndex * TOTAL_WIDTH);
  }, [centerIndex, x]);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Use a matchMedia to disable this on small screens
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#home",
          start: "top top",
          end: "bottom top",
          scrub: 1, // Smooth scrubbing
        },
      });

      // Animate side items outward and fading out
      tl.to(".carousel-item-wrapper.is-side", {
        x: (i, el) => {
          const idx = parseInt(el.dataset.index || "0");
          return idx < centerIndex ? "-50vw" : "50vw";
        },
        opacity: 0,
        filter: "blur(20px)",
        duration: 1,
      }, 0);

      // Animate center item flying towards camera (scaling up, translating down to Men's section)
      tl.to(".carousel-item-wrapper.is-center", {
        y: "40vh", // Translate down slightly as the page scrolls up
        scale: 4,  // Huge scale up to mimic flying towards camera
        opacity: 0, // Fade out exactly as Men's viewer fades in
        duration: 1,
      }, 0);
    });

    return () => mm.revert();
  }, [centerIndex]);

  return (
    <section id="home" className="relative w-full h-screen flex flex-col justify-center overflow-hidden">
      {/* Background Glow */}
      <div className="glow-ring absolute top-1/2 left-[60%] -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-40 z-0" />
      {/* Floor Glow */}
      <div className="absolute bottom-10 left-[60%] -translate-x-1/2 w-[600px] h-20 bg-primary/20 blur-[60px] rounded-full z-0" />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col items-center px-6 lg:flex-row">
        {/* Left Content */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left pt-32 lg:pt-0 pb-12 lg:pb-0 z-20 pointer-events-none">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-xs font-sans font-bold tracking-widest uppercase text-text-muted">
              New Collection
            </span>
          </div>
          
          <h1 className="font-serif font-bold leading-[1.1] tracking-tight text-text mb-6 pointer-events-auto" style={{ fontSize: "var(--text-fluid-hero)" }}>
            Style That <br className="hidden lg:block" /> Moves With <em className="text-primary not-italic">You</em>
          </h1>
          
          <p className="text-text-muted font-sans text-lg lg:text-xl max-w-md mb-10 pointer-events-auto">
            Discover pieces tailored for modern living, designed to flow with every step you take.
          </p>
          
          <button className="glass px-8 py-4 rounded-full font-sans font-medium text-text transition-all hover:bg-primary hover:text-white cursor-magnetic pointer-events-auto shadow-md">
            Explore Collection
          </button>
        </div>

        {/* Right Carousel Rack */}
        <div className="flex-1 w-full h-full relative flex items-center justify-center lg:justify-start overflow-visible z-10" ref={containerRef}>
          <motion.div
            className="flex items-center gap-[40px] absolute left-1/2 lg:left-0 top-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing accelerate-gpu"
            style={{ x: springX, filter: blurFilter }}
            drag="x"
            dragConstraints={{ left: -(ITEM_COUNT - 1) * TOTAL_WIDTH, right: 0 }}
            onDragEnd={handleDragEnd}
          >
            {Array.from({ length: ITEM_COUNT }).map((_, i) => {
              // Calculate distance from center to determine scale/blur
              const isCenter = i === centerIndex;
              const distance = Math.abs(i - centerIndex);
              
              const scale = isCenter ? 1 : Math.max(0.7, 1 - distance * 0.15);
              const opacity = isCenter ? 1 : Math.max(0.3, 1 - distance * 0.3);
              const blur = isCenter ? 0 : distance * 4;

              return (
                <div 
                  key={i} 
                  className={`carousel-item-wrapper ${isCenter ? 'is-center' : 'is-side'}`}
                  data-index={i}
                >
                  <motion.div
                    animate={{ 
                      scale, 
                      opacity,
                      filter: `blur(${blur}px)`,
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    className={`relative flex-shrink-0 w-[240px] md:w-[280px] h-[360px] md:h-[420px] rounded-2xl overflow-hidden bg-bg-soft shadow-lg border border-primary/5 accelerate-gpu ${!prefersReducedMotion ? "animate-idle-sway" : ""}`}
                    style={{ animationDelay: `${i * -1.2}s` }}
                    onClick={() => setCenterIndex(i)}
                  >
                    {/* Thin top rail hanger visual */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-6 border-2 border-b-0 border-black/20 rounded-t-lg z-20" />
                    
                    {/* Garment Placeholder */}
                    <div className="absolute inset-x-4 top-8 bottom-4 bg-primary/10 rounded-xl" />
                    
                    {/* Subtle highlight if center */}
                    {isCenter && <div className="absolute inset-0 border-2 border-primary/20 rounded-2xl pointer-events-none" />}
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Scroll Hint */}
      <div className="absolute bottom-12 left-6 lg:left-12 flex items-center gap-4 z-20">
        <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center animate-bounce">
          <MousePointerClick size={16} className="text-text-muted" />
        </div>
        <span className="text-xs font-sans font-medium uppercase tracking-widest text-text-muted">
          Scroll to explore
        </span>
      </div>

      {/* Side Nav Dot Indicator */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 hidden lg:block">
        <SideNav variant="dots" />
      </div>
    </section>
  );
}
