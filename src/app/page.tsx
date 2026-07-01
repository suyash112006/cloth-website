"use client";

import { useRef } from "react";
import PremiumHero from "@/components/hero/PremiumHero";
import CategoryShowcase from "@/components/showcase/CategoryShowcase";
import type { FeatureItem } from "@/components/showcase/FeatureIconList";
import SideNav from "@/components/layout/SideNav";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const CollectionsGrid = dynamic(() => import("@/components/showcase/CollectionsGrid"));
const AboutSection    = dynamic(() => import("@/components/layout/AboutSection"));
const FooterSection   = dynamic(() => import("@/components/layout/FooterSection"));

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      gsap.from("#about-copy", {
        scrollTrigger: { trigger: "#about", start: "top 72%", toggleActions: "play none none none" },
        y: -40, opacity: 0, duration: 0.85, ease: "power2.out",
      });
      gsap.from("#about-quote", {
        scrollTrigger: { trigger: "#about", start: "top 72%", toggleActions: "play none none none" },
        x: 40, opacity: 0, duration: 0.85, ease: "power2.out",
      });
      gsap.from("#about-values > *", {
        scrollTrigger: { trigger: "#about-values", start: "top 80%", toggleActions: "play none none none" },
        y: 30, opacity: 0, duration: 0.65, stagger: 0.12, ease: "power2.out",
      });
    });

    mm.add("(max-width: 1023px)", () => {
      // Small screen animations if needed
    });

    gsap.from("#about-copy", {
      scrollTrigger: { trigger: "#about", start: "top 80%", toggleActions: "play none none none" },
      y: 32, opacity: 0, duration: 0.7, ease: "power2.out",
    });
    gsap.from("#about-quote", {
      scrollTrigger: { trigger: "#about", start: "top 82%", toggleActions: "play none none none" },
      y: 32, opacity: 0, duration: 0.7, ease: "power2.out",
    });
    gsap.from("#about-values > *", {
      scrollTrigger: { trigger: "#about-values", start: "top 86%", toggleActions: "play none none none" },
      y: 24, opacity: 0, duration: 0.55, stagger: 0.1, ease: "power2.out",
    });

    return () => mm.revert();
  });

  // ─── Feature lists ─────────────────────────────────────────────────────────
  const menFeatures: FeatureItem[] = [
    { icon: "material", label: "100% Pure Linen",    description: "Breathable & lightweight" },
    { icon: "fabric",  label: "Premium Fabric",  description: "Finest quality materials"   },
    { icon: "fit",     label: "Perfect Fit",     description: "Tailored for excellence"    },
  ];

  const womenFeatures: FeatureItem[] = [
    { icon: "material", label: "Ethical Silk",       description: "Sustainably sourced"      },
    { icon: "fabric",  label: "Elegant Silk",    description: "Soft and breathable"        },
    { icon: "fit",     label: "Custom Fit",      description: "Tailored for comfort"       },
  ];

  const kidsFeatures: FeatureItem[] = [
    { icon: "material", label: "Organic Cotton",     description: "Gentle on sensitive skin" },
    { icon: "fabric",  label: "Playful Cotton",  description: "Durable and soft"           },
    { icon: "fit",     label: "Active Fit",      description: "Designed for movement"      },
  ];

  return (
    <main ref={containerRef} className="relative overflow-hidden bg-transparent">
      <SideNav variant="labeled" />

      {/* ── Hero: cinematic entrance, 3-shirt setup ── */}
      <PremiumHero />

      {/* ── Men: enters from left, exits right ── */}
      <CategoryShowcase
        id="men"
        product={{
          title:       "Men",
          subtitle:    "MEN'S COLLECTION",
          look:        "Look 01",
          badge:       "New",
          image:       "/hero/shirt.png",
          description: "Sophisticated style for the modern man.",
          ctaLabel:    "Shop Men",
          priority:    true,
        }}
        featureItems={menFeatures}
        thumbnails={[
          { id: "m_t1", look: "01", image: "/hero/shirt.png", productImage: "/hero/shirt.png", title: "Look 01" },
          { id: "m_t2", look: "02", image: "/hero/shirt.png", productImage: "/hero/shirt.png", title: "Look 02" },
          { id: "m_t3", look: "03", image: "/hero/shirt.png", productImage: "/hero/shirt.png", title: "Look 03" },
        ]}
        bgVariant="default"
        motion={{ enter: "left", exit: "right" }}
      />

      {/* ── Women: enters from right, exits left ── */}
      <CategoryShowcase
        id="women"
        product={{
          title:       "Women",
          subtitle:    "WOMEN'S COLLECTION",
          look:        "Look 01",
          image:       "/hero/shirt.png",
          description: "Elegance and comfort combined.",
          ctaLabel:    "Shop Women",
        }}
        featureItems={womenFeatures}
        thumbnails={[
          { id: "w_t1", look: "01", image: "/hero/shirt.png", productImage: "/hero/shirt.png", title: "Look 01" },
          { id: "w_t2", look: "02", image: "/hero/shirt.png", productImage: "/hero/shirt.png", title: "Look 02" },
          { id: "w_t3", look: "03", image: "/hero/shirt.png", productImage: "/hero/shirt.png", title: "Look 03" },
        ]}
        bgVariant="soft"
        motion={{ enter: "right", exit: "left" }}
      />

      {/* ── Kids: enters from left, fades out ── */}
      <CategoryShowcase
        id="kids"
        product={{
          title:       "Kids",
          subtitle:    "KIDS' COLLECTION",
          look:        "Look 01",
          image:       "/hero/shirt.png",
          description: "Playful styles for the little ones.",
          ctaLabel:    "Shop Kids",
        }}
        featureItems={kidsFeatures}
        thumbnails={[
          { id: "k_t1", look: "01", image: "/hero/shirt.png", productImage: "/hero/shirt.png", title: "Look 01" },
          { id: "k_t2", look: "02", image: "/hero/shirt.png", productImage: "/hero/shirt.png", title: "Look 02" },
          { id: "k_t3", look: "03", image: "/hero/shirt.png", productImage: "/hero/shirt.png", title: "Look 03" },
        ]}
        bgVariant="default"
        motion={{ enter: "left", exit: "fade" }}
      />

      <CollectionsGrid />
      <AboutSection />
      <FooterSection />
    </main>
  );
}
