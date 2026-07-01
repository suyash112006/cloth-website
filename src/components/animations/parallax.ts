import gsap from "gsap";
import { RefObject, useEffect } from "react";

interface ParallaxOptions {
  containerRef:    RefObject<HTMLElement | null>;
  shirtRef:        RefObject<HTMLElement | null>;
  mainCardRef?:    RefObject<HTMLElement | null>;
  bgCardLeftRef?:  RefObject<HTMLElement | null>;
  bgCardRightRef?: RefObject<HTMLElement | null>;
  circleRef?:      RefObject<HTMLElement | null>;
  isActive:        boolean;
}

export function useShowcaseParallax({
  containerRef,
  shirtRef,
  mainCardRef,
  bgCardLeftRef,
  bgCardRightRef,
  circleRef,
  isActive,
}: ParallaxOptions) {
  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = container.getBoundingClientRect();
      const x = (e.clientX - left - width  / 2) / (width  / 2);
      const y = (e.clientY - top  - height / 2) / (height / 2);

      const rotateY = x * 8;
      const rotateX = y * -5;

      gsap.to(shirtRef.current, {
        rotateY: rotateY * 1.0, rotateX: rotateX * 1.0,
        duration: 0.8, ease: "power2.out", overwrite: "auto",
      });

      if (mainCardRef?.current) {
        gsap.to(mainCardRef.current, {
          rotateY: rotateY * 0.6, rotateX: rotateX * 0.6,
          duration: 0.8, ease: "power2.out", overwrite: "auto",
        });
      }

      const bgTargets = [bgCardLeftRef?.current, bgCardRightRef?.current].filter(Boolean);
      if (bgTargets.length) {
        gsap.to(bgTargets, {
          rotateY: rotateY * 0.3, rotateX: rotateX * 0.3,
          duration: 0.8, ease: "power2.out", overwrite: "auto",
        });
      }

      if (circleRef?.current) {
        gsap.to(circleRef.current, {
          rotateY: rotateY * 0.15, rotateX: rotateX * 0.15,
          duration: 0.8, ease: "power2.out", overwrite: "auto",
        });
      }
    };

    const handleMouseLeave = () => {
      const targets = [
        shirtRef.current,
        mainCardRef?.current,
        bgCardLeftRef?.current,
        bgCardRightRef?.current,
        circleRef?.current,
      ].filter(Boolean);

      gsap.to(targets, {
        rotateY: 0, rotateX: 0,
        duration: 1.2, ease: "power2.out", overwrite: "auto",
      });
    };

    container.addEventListener("mousemove",  handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove",  handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isActive, containerRef, shirtRef, mainCardRef, bgCardLeftRef, bgCardRightRef, circleRef]);
}
