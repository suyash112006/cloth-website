"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, Sparkles, RefreshCw, Layers, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useAppStore } from "@/lib/store";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Constants ───────────────────────────────────────────────────────────────
const COLORS = [
  { name: "Beige",    hex: "#C8A27A" },
  { name: "Olive",    hex: "#8A9A86" },
  { name: "Slate",    hex: "#708090" },
  { name: "Charcoal", hex: "#36454F" },
  { name: "White",    hex: "#FFFFFF" },
];

const FEATURES = [
  { icon: Sparkles,    title: "PREMIUM QUALITY",   desc: "Finest fabrics, perfectly crafted."   },
  { icon: RefreshCw,   title: "EASY RETURNS",      desc: "30-day hassle-free returns."           },
  { icon: Layers,      title: "EXCLUSIVE DESIGNS", desc: "Unique styles, just for you."          },
  { icon: ShieldCheck, title: "SECURE PAYMENT",    desc: "Safe & encrypted checkout."            },
];

const HERO_PRODUCT = {
  id:       101,
  name:     "Signature Beige Linen Shirt",
  price:    129.0,
  category: "men",
  image:    "/hero/shirt.png",
};

// ─── Hero Timeline Labels ─────────────────────────────────────────────────────
const HL = {
  START:          "hero-start",
  SHIRT_DROP:     "shirt-drop",
  SHIRT_BOUNCE:   "shirt-bounce",
  SUPPORT_SHIRTS: "support-shirts",
  HEADLINE:       "headline",
  BUTTONS:        "buttons",
  INTERACTIVE:    "interactive",
} as const;

// ─── Component ────────────────────────────────────────────────────────────────
const PremiumHero = React.forwardRef<HTMLElement, {}>((props, externalRef) => {
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);

  // Refs
  const innerRef          = useRef<HTMLElement>(null);
  const heroRef           = (externalRef as React.MutableRefObject<HTMLElement | null>) || innerRef;
  const bgRef             = useRef<HTMLDivElement>(null);

  // Phase A – Shadow
  const shadowRef         = useRef<HTMLDivElement>(null);

  // Phase B – Main shirt
  const mainShirtRef      = useRef<HTMLDivElement>(null);

  // Phase C – Supporting shirts
  const leftShirtRef      = useRef<HTMLDivElement>(null);
  const rightShirtRef     = useRef<HTMLDivElement>(null);

  // Phase D – Text content
  const headingRef        = useRef<HTMLDivElement>(null);
  const descRef           = useRef<HTMLParagraphElement>(null);
  const buttonsRef        = useRef<HTMLDivElement>(null);
  const colorsRef         = useRef<HTMLDivElement>(null);
  const labelRef          = useRef<HTMLDivElement>(null);

  // Feature bar
  const featureBarRef     = useRef<HTMLDivElement>(null);

  const { addToCart, setCartOpen } = useAppStore();

  // ─── Main GSAP entrance + scroll exit ──────────────────────────────────────
  useGSAP(() => {
    if (!heroRef.current) return;

    // ── Initial hidden states ─────────────────────────────────────────────
    gsap.set(mainShirtRef.current,  { yPercent: -140, opacity: 0, scale: 0.82, rotation: -8 });
    gsap.set(shadowRef.current,     { scale: 0.3, opacity: 0 });
    gsap.set(labelRef.current,      { opacity: 0, y: 16 });
    gsap.set(headingRef.current,    { opacity: 0, y: 30 });
    gsap.set(descRef.current,       { opacity: 0, y: 24 });
    gsap.set(buttonsRef.current,    { opacity: 0, y: 20 });
    gsap.set(colorsRef.current,     { opacity: 0, x: 12 });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // ══════════════════════════════════════════════════════════════════════
    // PHASE A — Background + nav already visible; shadow fades in
    // ══════════════════════════════════════════════════════════════════════
    tl.addLabel(HL.START, 0);
    tl.to(shadowRef.current, { scale: 0.5, opacity: 0.1, duration: 0.6 }, 0.2);

    // ══════════════════════════════════════════════════════════════════════
    // PHASE B — Main shirt drops with gravity + elastic bounce
    // ══════════════════════════════════════════════════════════════════════
    tl.addLabel(HL.SHIRT_DROP, "+=0.1");

    tl.to(
      mainShirtRef.current,
      {
        yPercent: 0,
        opacity:  1,
        scale:    1,
        rotation: 0,
        duration: 1.55,
        ease:     "elastic.out(1, 0.55)",
      },
      HL.SHIRT_DROP,
    );

    // Shadow grows as shirt falls
    tl.to(
      shadowRef.current,
      { scale: 1, opacity: 0.18, duration: 1.55, ease: "elastic.out(1, 0.55)" },
      HL.SHIRT_DROP,
    );

    // Bounce label — shirt has landed
    tl.addLabel(HL.SHIRT_BOUNCE);

    // ══════════════════════════════════════════════════════════════════════
    // PHASE D — Text content cascades in
    // ══════════════════════════════════════════════════════════════════════
    tl.addLabel(HL.HEADLINE, "-=0.4");

    tl.to(labelRef.current,   { opacity: 1, y: 0, duration: 0.55 }, HL.HEADLINE);
    tl.to(headingRef.current, { opacity: 1, y: 0, duration: 0.7  }, `${HL.HEADLINE}+=0.15`);
    tl.to(descRef.current,    { opacity: 1, y: 0, duration: 0.65 }, `${HL.HEADLINE}+=0.38`);

    tl.addLabel(HL.BUTTONS, "-=0.2");
    tl.to(buttonsRef.current, { opacity: 1, y: 0, duration: 0.6 }, HL.BUTTONS);
    tl.to(colorsRef.current,  { opacity: 1, x: 0, duration: 0.55 }, `${HL.BUTTONS}+=0.18`);

    tl.addLabel(HL.INTERACTIVE);

    // ── Idle float (starts after entrance) ──────────────────────────────
    tl.add(() => {
      gsap.to(mainShirtRef.current, {
        y: -16, rotation: -1.5, duration: 4.5, ease: "sine.inOut", repeat: -1, yoyo: true,
      });
      gsap.to(shadowRef.current, {
        scale: 0.82, opacity: 0.11, duration: 4.5, ease: "sine.inOut", repeat: -1, yoyo: true,
      });
    }, HL.INTERACTIVE);

    // ══════════════════════════════════════════════════════════════════════
    // HERO SCROLL EXIT — removed to prevent scrolling bugs
    // ══════════════════════════════════════════════════════════════════════

    // ── Desktop mouse-parallax ───────────────────────────────────────────
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      // handled in the useEffect below
    });
    return () => mm.revert();

  }, { scope: heroRef });

  // ─── Mouse Parallax ────────────────────────────────────────────────────────
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      const xPct = (e.clientX - window.innerWidth  / 2) / (window.innerWidth  / 2);
      const yPct = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);

      gsap.to(bgRef.current, { x: xPct * 14, y: yPct * 9, duration: 0.85, ease: "power2.out" });
      gsap.to(mainShirtRef.current, {
        x: xPct * 18, y: yPct * 11,
        rotateY: xPct * 7, rotateX: yPct * -4,
        duration: 0.85, ease: "power2.out",
      });
      gsap.to(leftShirtRef.current,  { x: xPct * 10, y: yPct * 7, duration: 0.9, ease: "power2.out" });
      gsap.to(rightShirtRef.current, { x: xPct * 10, y: yPct * 7, duration: 0.9, ease: "power2.out" });
      gsap.to(shadowRef.current, { x: xPct * 14, y: yPct * 8, duration: 0.85, ease: "power2.out" });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const headingWords = "ELEVATE YOUR EVERYDAY STYLE".split(" ");

  const handleAddToBag = () => {
    addToCart(HERO_PRODUCT, "M", selectedColor.name);
    setCartOpen(true);
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-white"
    >
      {/* ── Background Image ─────────────────────────────────────────────────── */}
      <div ref={bgRef} className="absolute inset-0 z-0 w-full h-full will-change-transform">
        <div className="hidden lg:block absolute inset-0 w-full h-full">
          <Image
            src="/hero/background.jpg"
            alt="Premium minimalist wall"
            fill
            priority
            sizes="100vw"
            className="object-cover object-right pointer-events-none select-none opacity-100"
          />
        </div>
        {/* Removed heavy white gradients to make the image crisp and clear */}
      </div>

      {/* ── Light Rays ───────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute -top-[10%] right-[5%] w-[300px] h-[150vh] opacity-25 blur-[90px] rotate-[-18deg] origin-top-right will-change-transform animate-ray-sway-1"
          style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.4) 0%, transparent 80%)" }}
        />
        <div
          className="absolute -top-[5%] right-[20%] w-[250px] h-[140vh] opacity-15 blur-[120px] rotate-[-15deg] origin-top-right will-change-transform animate-ray-sway-2"
          style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.3) 0%, transparent 70%)" }}
        />
      </div>

      {/* ── Main Grid ────────────────────────────────────────────────────────── */}
      <div className="flex-1 max-w-[1600px] mx-auto w-full px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-12 items-center pt-28 pb-10 gap-10 lg:gap-0 z-10 relative">

        {/* LEFT TEXT CONTENT */}
        <div className="col-span-1 lg:col-span-5 flex flex-col items-start text-left z-20 lg:-translate-y-10 w-full">

          {/* Collection Label */}
          <div ref={labelRef} className="flex items-center gap-2 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8A27A]" />
            <span className="text-[10px] md:text-xs font-sans font-bold tracking-[0.3em] uppercase text-[#7C7C7C]">
              NEW COLLECTION 2026
            </span>
          </div>

          {/* Heading */}
          <div ref={headingRef} className="mb-6">
            <h1 className="font-serif font-bold leading-[1.1] text-[#1B1B1B] tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.5rem] select-none">
              Elevate Your <br /> Everyday <span className="text-[#C8A27A]">Style</span>
            </h1>
          </div>

          {/* Description */}
          <p
            ref={descRef}
            className="text-[#7C7C7C] font-sans text-base md:text-lg max-w-md mb-10 leading-relaxed"
          >
            Premium fabrics. Timeless designs. Made for comfort. Built to last.
            Discover silhouettes tailored to your daily flow.
          </p>

          {/* Buttons */}
          <div ref={buttonsRef} className="flex flex-wrap items-center gap-4 mb-10">
            <button
              id="hero-add-to-bag"
              onClick={handleAddToBag}
              className="group bg-[#1C1C1C] hover:bg-[#C8A27A] text-white px-8 py-4 rounded-full font-medium transition-all duration-300 flex items-center gap-3 shadow-md hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-lg cursor-pointer"
            >
              Shop Now
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1.5" />
            </button>
            <button className="bg-white hover:bg-[#F7F2EC] border border-[#D9D9D9] hover:border-[#1B1B1B] text-[#222] px-8 py-4 rounded-full font-medium transition-all duration-300 shadow-sm hover:-translate-y-0.5 hover:scale-[1.03] cursor-pointer">
              Explore Collection
            </button>
          </div>

          {/* Color Selector */}
          <div ref={colorsRef} className="flex flex-col items-start gap-4 w-full">
            <span className="text-[10px] md:text-[11px] font-sans font-bold tracking-[0.2em] uppercase text-[#7C7C7C]">
              CHOOSE COLOR
            </span>
            <div className="flex gap-4">
              {COLORS.map((color) => {
                const isSelected = selectedColor.name === color.name;
                return (
                  <button
                    key={color.name}
                    id={`color-swatch-${color.name.toLowerCase()}`}
                    onClick={() => setSelectedColor(color)}
                    className={`group relative w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
                      isSelected ? "border-[#C8A27A] scale-110 shadow-sm" : "border-transparent hover:scale-[1.2]"
                    } cursor-pointer`}
                    title={color.name}
                    aria-label={`Select color ${color.name}`}
                    aria-selected={isSelected}
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="activeColorRing"
                        className="absolute inset-0 rounded-full border border-[#C8A27A] scale-[1.2] z-0"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                    <span
                      className="w-5 h-5 md:w-6 md:h-6 rounded-full block border border-black/5 relative z-10"
                      style={{ backgroundColor: color.hex }}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* CENTER — Product Showcase */}
        <div className="col-span-1 lg:col-span-7 flex items-center justify-center lg:justify-start relative w-full h-[380px] md:h-[480px] lg:h-[700px] lg:-translate-x-24 lg:-translate-y-12 xl:-translate-x-40">

          {/* ── Main Shirt ── */}
          <div
            ref={mainShirtRef}
            className="relative will-change-transform z-30 drop-shadow-[0_25px_40px_rgba(0,0,0,0.2)]"
            style={{ width: "100%", height: "120%", opacity: 0 }}
          >
            <Image
              src="/hero/shirt.png"
              alt="Signature Beige Linen Shirt"
              fill
              priority
              sizes="(max-width: 1024px) 65vw, 35vw"
              className="object-contain pointer-events-none select-none"
            />
          </div>

          {/* Main Floor shadow */}
          <div
            ref={shadowRef}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[50%] h-10 bg-black blur-[28px] rounded-full z-20 will-change-transform"
            style={{ opacity: 0 }}
          />
        </div>
      </div>

      {/* ── Bottom Feature Bar ────────────────────────────────────────────────── */}
      <div ref={featureBarRef} className="w-full bg-white/60 backdrop-blur-md border-t border-black/5 py-8 z-10 relative">
        <div className="max-w-[1600px] mx-auto w-full px-6 lg:px-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-4 bg-white/50 border border-[#C8A27A]/10 rounded-2xl p-5 cursor-default"
              >
                <div className="w-12 h-12 rounded-xl bg-[#C8A27A]/10 flex items-center justify-center text-[#C8A27A] flex-shrink-0">
                  <Icon size={22} className="stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="text-xs font-sans font-bold text-[#1B1B1B] uppercase tracking-wider mb-0.5">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-[#7C7C7C]">{feature.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

PremiumHero.displayName = "PremiumHero";
export default PremiumHero;
