import { useState, RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Timeline Label Constants ────────────────────────────────────────────────
export const Labels = {
  ENTER:    "enter",
  SETTLE:   "settle",
  TEXT:     "text",
  FEATURES: "features",
  IDLE:     "idle",
  EXIT:     "exit",
} as const;

// ─── Types ───────────────────────────────────────────────────────────────────
export interface CardRefs {
  shirtRef:      RefObject<HTMLDivElement | null>;
  mainCardRef:   RefObject<HTMLDivElement | null>;
  bgCardLeftRef: RefObject<HTMLDivElement | null>;
  bgCardRightRef:RefObject<HTMLDivElement | null>;
}

export interface MotionConfig {
  /** Direction shirt enters from. -1 = from left, 1 = from right */
  enter: "left" | "right";
  /**
   * What happens to the shirt on scroll-out.
   * "right"  → moves right + fades (Men)
   * "left"   → moves left  + fades (Women)
   * "fade"   → opacity + scale + slight Y  (Kids)
   */
  exit: "left" | "right" | "fade";
}

export interface CategoryAnimationOptions {
  sectionRef:   RefObject<HTMLElement | null>;
  showcaseRef:  RefObject<HTMLDivElement | null>;
  cardRefs:     CardRefs;
  circleRef:    RefObject<HTMLDivElement | null>;
  textRefs:     RefObject<HTMLElement[]>;
  featureRefs:  RefObject<HTMLElement[]>;
  thumbnailRefs:RefObject<HTMLElement[]>;
  motion:       MotionConfig;
}

// ─── Hook ────────────────────────────────────────────────────────────────────
export function useCategoryAnimation({
  sectionRef,
  showcaseRef,
  cardRefs,
  circleRef,
  textRefs,
  featureRefs,
  thumbnailRefs,
  motion,
}: CategoryAnimationOptions) {
  const [isInteractive, setIsInteractive] = useState(false);

  useGSAP(() => {
    const { shirtRef } = cardRefs;

    if (!sectionRef.current || !showcaseRef.current || !shirtRef.current || !circleRef.current) return;

    // ── Direction multiplier ─────────────────────────────────────────────────
    const enterDir = motion.enter === "left" ? -1 : 1; // -1 = comes from left

    // ── Initial state ────────────────────────────────────────────────────────
    gsap.set(shirtRef.current,   { x: `${enterDir * 110}vw`, rotateZ: enterDir * -15, autoAlpha: 0, scale: 1.15 });
    gsap.set(circleRef.current,  { scale: 0.7, autoAlpha: 0 });

    // ── Entrance timeline ────────────────────────────────────────────────────
    const tl = gsap.timeline({
      defaults: { ease: "power3.out", duration: 0.8 },
      scrollTrigger: {
        trigger: sectionRef.current,
        start:   "top 62%",
        toggleActions: "play none none none",
      },
      onComplete: () => setIsInteractive(true),
    });

    tl.addLabel(Labels.ENTER);

    // Background circle
    tl.to(circleRef.current, { scale: 1, autoAlpha: 1, duration: 1.2 }, Labels.ENTER);

    // Shirt slides in
    tl.to(
      shirtRef.current,
      { x: 0, rotateZ: 0, autoAlpha: 1, scale: 1, duration: 1.5, ease: "power4.out" },
      `${Labels.ENTER}+=0.1`,
    );

    // ── Settle label ─────────────────────────────────────────────────────────
    tl.addLabel(Labels.SETTLE);

    // Bounce settle: 12-15 px up → back to 0
    tl.to(shirtRef.current, { y: -14, duration: 0.22, ease: "power2.out" }, Labels.SETTLE)
      .to(shirtRef.current, { y:   0, duration: 0.32, ease: "bounce.out"  }, `${Labels.SETTLE}+=0.22`);



    tl.addLabel(Labels.IDLE);

    // ── EXIT — scroll scrub ──────────────────────────────────────────────────
    // Exit animation has been removed to prevent double-scroll behaviour.

    return () => {
      textRefs.current     = [];
      featureRefs.current  = [];
      thumbnailRefs.current = [];
    };
  }, { scope: sectionRef, dependencies: [] });

  return isInteractive;
}
