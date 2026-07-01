import gsap from "gsap";
import { RefObject, useEffect } from "react";

interface HoverOptions {
  cardRef: RefObject<HTMLElement | null>;
  shirtRef: RefObject<HTMLElement | null>;
  isActive: boolean;
}

export function useHoverAnimation({ cardRef, shirtRef, isActive }: HoverOptions) {
  useEffect(() => {
    if (!isActive || !cardRef.current || !shirtRef.current) return;

    const card = cardRef.current;
    const shirt = shirtRef.current;

    const handleMouseEnter = () => {
      // Phase 11: Hover effect
      gsap.to(card, {
        scale: 1.03,
        rotateY: 6,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        duration: 0.6,
        ease: "power2.out",
        overwrite: "auto",
      });

      gsap.to(shirt, {
        rotateZ: 1,
        duration: 0.6,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        scale: 1,
        rotateY: 0,
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        duration: 0.8,
        ease: "power2.out",
        overwrite: "auto",
      });

      gsap.to(shirt, {
        rotateZ: 0,
        duration: 0.8,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isActive, cardRef, shirtRef]);
}
