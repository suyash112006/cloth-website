"use client";

import { useRef } from "react";
import { useAppStore } from "@/lib/store";
import { User, Shirt } from "lucide-react";
import { useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SideNavProps {
  variant: 'dots' | 'labeled';
}

const SECTIONS = [
  { id: 'men', label: 'MEN', Icon: Shirt },
  { id: 'women', label: 'WOMEN', Icon: User },
  { id: 'kids', label: 'KIDS', Icon: User },
  { id: 'collections', label: 'COLLECTIONS', Icon: Shirt },
  { id: 'about', label: 'ABOUT', Icon: User }
];

export default function SideNav({ variant }: SideNavProps) {
  const { activeSection, setActiveSection } = useAppStore();
  const lenis = useLenis();
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Only run scroll spy from the global labeled variant so we don't register twice
    if (variant === 'dots') return;

    const sections = ['home', 'men', 'women', 'kids', 'collections', 'about', 'footer'];
    
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        ScrollTrigger.create({
          trigger: el,
          start: "top 50%",
          end: "bottom 50%",
          onEnter: () => setActiveSection(id),
          onEnterBack: () => setActiveSection(id),
        });
      }
    });

    // Fade the labeled nav in/out based on whether we are in the hero
    const homeEl = document.getElementById('home');
    if (homeEl && containerRef.current) {
      ScrollTrigger.create({
        trigger: homeEl,
        start: "bottom 50%",
        onEnter: () => {
          gsap.to(containerRef.current, { opacity: 1, duration: 0.5, pointerEvents: 'auto' });
        },
        onLeaveBack: () => {
          gsap.to(containerRef.current, { opacity: 0, duration: 0.5, pointerEvents: 'none' });
        }
      });
    }

  }, { dependencies: [variant] });

  const handleSmoothScroll = (targetId: string) => {
    if (lenis) {
      lenis.scrollTo(`#${targetId}`, { duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
      // Fallback
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (variant === 'dots') {
    return (
      <div className="flex flex-col items-center gap-4">
        {['home', ...SECTIONS.map(s => s.id), 'collections'].map((id) => (
          <button
            key={id}
            onClick={() => handleSmoothScroll(id)}
            className="group relative flex items-center justify-center p-2"
            aria-label={`Scroll to ${id}`}
          >
            <span 
              className={`block w-2 h-2 rounded-full transition-all duration-300 ${
                activeSection === id 
                  ? "bg-primary scale-125" 
                  : "bg-black/20 group-hover:bg-primary/50"
              }`}
            />
          </button>
        ))}
      </div>
    );
  }

  // Variant 'labeled' (global floating tabs)
  return (
    <div ref={containerRef} className="fixed inset-y-0 left-0 pointer-events-none z-40 hidden lg:flex flex-col justify-center px-6 opacity-0">
      <div className="flex flex-col gap-12">
        {SECTIONS.map(({ id, label, Icon }) => {
          const isActive = activeSection === id;
          return (
            <button
              key={id}
              onClick={() => handleSmoothScroll(id)}
              className={`flex flex-col items-center gap-4 pointer-events-auto transition-opacity duration-500 ${
                isActive ? 'opacity-100' : 'opacity-40 hover:opacity-80'
              }`}
            >
              <span 
                className={`font-serif text-sm tracking-[0.2em] font-medium transition-colors ${isActive ? 'text-primary' : 'text-text'}`}
                style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
              >
                {label}
              </span>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${isActive ? 'border-primary text-primary bg-primary-soft/30 scale-110 shadow-sm' : 'border-black/20 text-text'}`}>
                <Icon size={14} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
