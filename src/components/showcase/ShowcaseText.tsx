import React, { forwardRef, MutableRefObject } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Product } from "./CategoryShowcase";

interface ShowcaseTextProps {
  product: Product;
  textRefs: MutableRefObject<HTMLElement[]>;
}

const ShowcaseText = forwardRef<HTMLDivElement, ShowcaseTextProps>(
  ({ product, textRefs }, ref) => {
    
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
          <Link
            href={`/shop/${product.title.toLowerCase()}`}
            className="group bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 inline-flex items-center gap-3 shadow-md hover:-translate-y-0.5 hover:shadow-lg"
          >
            {product.ctaLabel || `Shop ${product.title}`}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1.5" />
          </Link>
        </div>
      </div>
    );
  }
);

ShowcaseText.displayName = "ShowcaseText";

export default ShowcaseText;
