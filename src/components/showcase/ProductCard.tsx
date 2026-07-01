import Image from "next/image";
import React, { forwardRef } from "react";
import { useHoverAnimation } from "../animations/hover";
import { Product } from "./CategoryShowcase";
import { CardRefs } from "../hooks/useCategoryAnimation";

interface ProductCardProps {
  product: Product;
  isActive: boolean;
  cardRefs: CardRefs;
}

const ProductCard = forwardRef<HTMLDivElement, ProductCardProps>(
  ({ product, isActive, cardRefs }, ref) => {
    
    const { shirtRef, mainCardRef, bgCardLeftRef, bgCardRightRef } = cardRefs;

    // Bind hover effect
    useHoverAnimation({ cardRef: mainCardRef, shirtRef, isActive });

    return (
      <div ref={ref} className="relative w-full aspect-[3/4] max-w-[320px] mx-auto lg:mx-0 z-10 flex items-center justify-center pointer-events-none">
        
        {/* Left Background Card */}
        <div
          ref={bgCardLeftRef}
          className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[95%] h-[95%] bg-white/60 backdrop-blur-sm rounded-[2rem] border border-white/40 shadow-lg -z-10 opacity-0"
          style={{ transformOrigin: "center center" }}
        />
        {/* Right Background Card */}
        <div
          ref={bgCardRightRef}
          className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[95%] h-[95%] bg-white/60 backdrop-blur-sm rounded-[2rem] border border-white/40 shadow-lg -z-20 opacity-0"
          style={{ transformOrigin: "center center" }}
        />

        {/* Main Product Card */}
        <div
          ref={mainCardRef}
          className="relative w-full h-full bg-white/70 backdrop-blur-xl border border-white/40 rounded-[2rem] shadow-xl flex flex-col items-center justify-between py-10 will-change-transform opacity-0 pointer-events-auto cursor-pointer z-10 overflow-hidden"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Subtle glowing badge */}
          {product.badge && (
            <div className="absolute top-6 left-6 bg-white/80 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest text-[#C8A27A] shadow-sm uppercase">
              {product.badge}
            </div>
          )}

          <div className="flex-1 w-full" />

          {/* Footer Text on Card */}
          <div className="flex flex-col items-center gap-2 pb-2">
            <span className="text-[9px] font-sans font-bold tracking-[0.2em] uppercase text-text-muted">
              {product.subtitle}
            </span>
            <span className="font-serif text-2xl font-bold text-[#C8A27A]">
              {product.look}
            </span>
          </div>
        </div>

        {/* The Shirt (Floats in front of the card) */}
        <div
          ref={shirtRef}
          className="absolute inset-0 w-[140%] h-[140%] -left-[20%] -top-[20%] z-20 will-change-transform opacity-0 pointer-events-none drop-shadow-2xl"
          style={{ transformStyle: "preserve-3d" }}
        >
          <Image
            src={product.image}
            alt={`${product.title} Product Look`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain"
            priority={product.priority ?? false}
          />
        </div>

      </div>
    );
  }
);

ProductCard.displayName = "ProductCard";

export default ProductCard;
