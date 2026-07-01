import React, { forwardRef, MutableRefObject } from "react";
import { ArrowRight } from "lucide-react";
import { Product } from "./CategoryShowcase";
import { useAppStore } from "@/lib/store";
import { useLenis } from "lenis/react";

interface ShowcaseTextProps {
  product: Product;
  textRefs: MutableRefObject<HTMLElement[]>;
}

const ShowcaseText = forwardRef<HTMLDivElement, ShowcaseTextProps>(
  ({ product, textRefs }, ref) => {
    const { setSelectedCollectionCategory } = useAppStore();
    const lenis = useLenis();

    const handleShopClick = () => {
      setSelectedCollectionCategory(product.title.toLowerCase());
      
      if (lenis) {
        lenis.scrollTo("#collections", { duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
      } else {
        document.getElementById("collections")?.scrollIntoView({ behavior: "smooth" });
      }
    };
    
    // Helper to push refs safely
    const setRef = (el: HTMLElement | null) => {
      if (el && !textRefs.current.includes(el)) {
        textRefs.current.push(el);
      }
    };

    return (
      <div 
        ref={ref}
        className="w-full flex flex-col items-center lg:items-start text-center lg:text-left z-20"
      >
        {/* Subtitle */}
        <div ref={setRef} className="flex items-center gap-2 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C8A27A]" />
          <span className="text-[10px] md:text-xs font-sans font-bold tracking-[0.3em] uppercase text-text-muted">
            {product.subtitle}
          </span>
        </div>

        {/* Heading */}
        <h2 
          ref={setRef} 
          className="font-serif text-5xl md:text-6xl lg:text-[5rem] leading-[1.1] mb-6 text-text"
        >
          {product.title}
        </h2>

        {/* Description */}
        <p 
          ref={setRef} 
          className="text-text-muted font-sans text-base md:text-lg max-w-sm mb-10 leading-relaxed"
        >
          {product.description}
        </p>

        {/* Button */}
        <div ref={setRef}>
          <button
            onClick={handleShopClick}
            className="group bg-[#1C1C1C] hover:bg-[#C8A27A] text-white px-8 py-4 rounded-full font-medium transition-all duration-300 inline-flex items-center gap-3 shadow-md hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-lg cursor-pointer"
          >
            {product.ctaLabel || `Shop ${product.title}`}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1.5" />
          </button>
        </div>
      </div>
    );
  }
);

ShowcaseText.displayName = "ShowcaseText";

export default ShowcaseText;
