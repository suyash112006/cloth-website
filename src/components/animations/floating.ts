import gsap from "gsap";
import { RefObject, useEffect } from "react";

interface FloatingOptions {
  targetRef: RefObject<HTMLElement | null>;
  isActive: boolean;
}

export function useFloatingAnimation({ targetRef, isActive }: FloatingOptions) {
  useEffect(() => {
    if (!isActive || !targetRef.current) return;

    // Phase 10: Floating Animation
    // Y 0 -> -12 -> 0, duration 4s, infinite, sine.inOut
    const floatTween = gsap.to(targetRef.current, {
      y: -12,
      duration: 2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    return () => {
      floatTween.kill();
      gsap.to(targetRef.current, { y: 0, duration: 1, ease: "power2.out" });
    };
  }, [isActive, targetRef]);
}
