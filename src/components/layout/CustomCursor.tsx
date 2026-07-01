"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  // Use framer-motion values for smooth tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Apply spring physics for the lagging outer ring
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if device has touch capability or prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (prefersReducedMotion || isTouchDevice) {
      return;
    }

    const manageMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const manageMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if hovered element or its closest parent has the cursor-magnetic class
      if (target.closest(".cursor-magnetic")) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const manageMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", manageMouseMove);
    window.addEventListener("mouseover", manageMouseOver);
    document.addEventListener("mouseleave", manageMouseLeave);

    return () => {
      window.removeEventListener("mousemove", manageMouseMove);
      window.removeEventListener("mouseover", manageMouseOver);
      document.removeEventListener("mouseleave", manageMouseLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Small Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[9999]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      {/* Lagging Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-primary/50 rounded-full pointer-events-none z-[9998]"
        animate={{
          scale: isHovering ? 2 : 1,
          backgroundColor: isHovering ? "rgba(124, 92, 255, 0.1)" : "rgba(124, 92, 255, 0)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      {/* Massive Flashlight Glow (Dynamic Lighting) */}
      <motion.div
        className="fixed top-0 left-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none z-[0] hidden lg:block"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </>
  );
}
