"use client";

import React, { useState, useRef } from "react";
import BackgroundCircle from "./BackgroundCircle";
import ShowcaseText from "./ShowcaseText";
import FeatureIconList, { FeatureItem } from "./FeatureIconList";
import ThumbnailSwitcher from "./ThumbnailSwitcher";
import Image from "next/image";
import { useCategoryAnimation, MotionConfig, CardRefs } from "../hooks/useCategoryAnimation";
import { useFloatingAnimation } from "../animations/floating";

// ─── Types ───────────────────────────────────────────────────────────────────
export type Product = {
  title: string;
  subtitle: string;
  look: string;
  badge?: string;
  image: string;
  description: string;
  ctaLabel?: string;
  priority?: boolean;
};

export type Thumbnail = {
  id: string;
  image: string;
  productImage: string;
  look: string;
  title: string;
};

export interface CategoryShowcaseProps {
  id: string;
  product: Product;
  featureItems: FeatureItem[];
  thumbnails: Thumbnail[];
  bgVariant?: "default" | "soft";
  /** Controls shirt entrance direction and scroll-exit behaviour */
  motion: MotionConfig;
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function CategoryShowcase({
  id,
  product,
  featureItems,
  thumbnails,
  bgVariant = "default",
  motion,
}: CategoryShowcaseProps) {
  const [activeThumbnail, setActiveThumbnail] = useState(0);

  // DOM refs
  const sectionRef   = useRef<HTMLElement>(null);
  const showcaseRef  = useRef<HTMLDivElement>(null);
  const shirtRef     = useRef<HTMLDivElement>(null);
  const circleRef    = useRef<HTMLDivElement>(null);
  const textRefs     = useRef<HTMLElement[]>([]);
  const featureRefs  = useRef<HTMLElement[]>([]);
  const thumbnailRefs = useRef<HTMLElement[]>([]);

  // CardRefs still needed by the hook signature; bg cards are null for category sections
  const dummyRef = useRef<HTMLDivElement>(null);
  const cardRefs: CardRefs = {
    shirtRef,
    mainCardRef:    dummyRef,
    bgCardLeftRef:  dummyRef,
    bgCardRightRef: dummyRef,
  };

  // Entrance + exit animations
  const isInteractive = useCategoryAnimation({
    sectionRef,
    showcaseRef,
    cardRefs,
    circleRef,
    textRefs,
    featureRefs,
    thumbnailRefs,
    motion,
  });

  // Idle floating after entrance completes
  useFloatingAnimation({ targetRef: shirtRef, isActive: isInteractive });

  // ── Layout: left-content for left-enter, right-content for right-enter ──
  const isRightEnter = motion.enter === "right";

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`relative w-full min-h-screen py-32 flex items-center overflow-hidden showcase-section ${
        bgVariant === "soft" ? "bg-bg-soft" : "bg-transparent"
      }`}
    >
      <div
        ref={showcaseRef}
        className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center"
      >
        {/* Ambient background circle */}
        <BackgroundCircle ref={circleRef} />

        {/* ── TEXT COLUMN ── */}
        <div
          className={`lg:col-span-4 relative z-20 flex justify-center ${
            isRightEnter
              ? "lg:order-3 lg:justify-end lg:translate-x-8 xl:translate-x-20"
              : "lg:order-1 lg:justify-start lg:-translate-x-8 xl:-translate-x-20"
          }`}
        >
          <ShowcaseText product={product} textRefs={textRefs} />
        </div>

        {/* ── SHIRT COLUMN (always center) ── */}
        <div className="lg:col-span-4 relative z-30 flex justify-center lg:order-2 py-10 lg:py-0 lg:-translate-x-12 xl:-translate-x-16">
          {/* Floor shadow */}
          <div
            className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[60%] h-8 bg-black/20 blur-[28px] rounded-full pointer-events-none"
          />

          {/* Floating shirt container */}
          <div
            ref={shirtRef}
            className="relative w-[280px] h-[360px] sm:w-[340px] sm:h-[440px] md:w-[380px] md:h-[480px] lg:w-[420px] lg:h-[540px] xl:w-[460px] xl:h-[600px] will-change-transform flex items-center justify-center"
            style={{ opacity: 0 }}
          >
            {/* White Background Card (smaller top/bottom) */}
            <div className="absolute inset-x-0 top-[12%] bottom-[12%] bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_20px_40px_rgba(0,0,0,0.08)] rounded-[2.5rem] flex flex-col justify-between py-6 px-6 sm:py-8 sm:px-8">
              {/* Top Badge */}
              <div className="w-full flex justify-start z-10">
                <span className="bg-white/90 text-[#C8A27A] text-[10px] sm:text-xs font-bold tracking-widest px-3 py-1.5 rounded-full uppercase shadow-sm">
                  New
                </span>
              </div>

              {/* Bottom Text */}
              <div className="flex flex-col items-center z-10">
                <span className="text-[9px] sm:text-[11px] font-bold tracking-[0.2em] text-[#4A4A4A] uppercase mb-1.5 sm:mb-2">
                  {product.title} Collection
                </span>
                <span className="font-serif text-lg sm:text-2xl text-[#C8A27A]">
                  Look 01
                </span>
              </div>
            </div>

            {/* Shirt Image (no shadow) */}
            <div className="absolute w-[115%] h-[115%] -mt-[15%] sm:w-[130%] sm:h-[130%] sm:-mt-[10%] z-20 pointer-events-none">
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>

        {/* ── FEATURES + THUMBNAILS COLUMN ── */}
        <div
          className={`lg:col-span-4 relative z-20 flex flex-col gap-16 justify-center ${
            isRightEnter
              ? "lg:order-1 lg:justify-start lg:-translate-x-8 xl:-translate-x-20"
              : "lg:order-3 lg:justify-end lg:translate-x-8 xl:translate-x-20"
          }`}
        >
          <div className="w-full flex justify-center lg:justify-start">
            <FeatureIconList featureItems={featureItems} featureRefs={featureRefs} />
          </div>

          <div className="w-full flex justify-center lg:justify-start">
            <ThumbnailSwitcher
              thumbnails={thumbnails}
              active={activeThumbnail}
              onSelect={setActiveThumbnail}
              thumbnailRefs={thumbnailRefs}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
