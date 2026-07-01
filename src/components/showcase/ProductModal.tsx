"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Heart, Star, Sparkles } from "lucide-react";
import { useAppStore } from "@/lib/store";

const SIZES = ["S", "M", "L", "XL"];
const COLORS = [
  { name: "Lavender", value: "#7C5CFF", class: "bg-[#7C5CFF]" },
  { name: "Midnight", value: "#1A1D2D", class: "bg-[#1A1D2D]" },
  { name: "Charcoal", value: "#2E2E38", class: "bg-[#2E2E38]" },
  { name: "Sand", value: "#E1D5C1", class: "bg-[#E1D5C1]" },
];

export default function ProductModal() {
  const { activeProduct, setActiveProduct, addToCart, setCartOpen } = useAppStore();
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [isLiked, setIsLiked] = useState(false);

  // Close modal on escape key
  useEffect(() => {
    if (!activeProduct) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveProduct(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeProduct, setActiveProduct]);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (activeProduct) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeProduct]);

  if (!activeProduct) return null;

  const handleAddToBag = () => {
    addToCart(activeProduct, selectedSize, selectedColor.name);
    setActiveProduct(null);
    setCartOpen(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-6">
        {/* Backdrop click area */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/40 backdrop-blur-md"
          onClick={() => setActiveProduct(null)}
        />

        {/* Modal Panel Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-bg rounded-3xl shadow-2xl overflow-hidden border border-primary/10 z-10 flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh]"
        >
          {/* Close Button */}
          <button
            onClick={() => setActiveProduct(null)}
            className="absolute top-4 right-4 md:top-6 md:right-6 z-30 p-2.5 rounded-full bg-white/80 hover:bg-primary hover:text-white backdrop-blur-md border border-primary/5 text-text transition-all duration-300 shadow-sm cursor-magnetic"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          {/* Left Side: Product Image Display */}
          <div className="relative w-full md:w-1/2 bg-bg-soft flex items-center justify-center p-8 border-b md:border-b-0 md:border-r border-black/5 min-h-[300px] md:min-h-[500px]">
            {/* Ambient Background Glows */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary-soft/10 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] aspect-square bg-primary/5 blur-[50px] rounded-full pointer-events-none" />
            
            {/* Clothes hanger wire loop aesthetic */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-8 border-2 border-b-0 border-primary/15 rounded-t-lg pointer-events-none" />

            <div className="relative w-full h-full aspect-[4/5] max-w-[340px] flex items-center justify-center">
              <Image
                src={activeProduct.image}
                alt={activeProduct.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain p-6 transition-transform duration-700 hover:scale-105"
                priority
              />
            </div>

            {/* Bottom floating details */}
            <div className="absolute bottom-4 left-4 z-20 flex items-center gap-1.5 bg-white/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-primary/10 text-[10px] font-bold text-primary tracking-wider shadow-sm uppercase">
              <Sparkles size={10} className="animate-spin-slow" />
              Tailored Premium Fit
            </div>
          </div>

          {/* Right Side: Product Customization and Checkout */}
          <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-between overflow-y-auto">
            <div>
              {/* Category & Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-primary bg-primary-soft/40 px-3 py-1 rounded-full">
                  {activeProduct.category} Collection
                </span>
                
                {/* Rating */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={12} className={i < 4 ? "fill-primary text-primary" : "text-black/10"} />
                  ))}
                  <span className="text-[10px] font-sans font-bold text-text-muted ml-1">(12)</span>
                </div>
              </div>

              {/* Title & Price */}
              <h2 className="font-serif font-bold text-2xl md:text-3xl text-text mb-4 leading-tight">
                {activeProduct.name}
              </h2>
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-2xl md:text-3xl font-bold text-text">${activeProduct.price.toFixed(2)}</span>
                <span className="text-xs text-text-muted line-through">${(activeProduct.price * 1.25).toFixed(2)}</span>
                <span className="text-xs font-bold text-[#E5484D] bg-[#FFEBEB] px-2 py-1 rounded">20% OFF</span>
              </div>

              <div className="w-full h-[1px] bg-black/5 mb-6" />

              {/* Description */}
              <p className="text-text-muted text-sm md:text-base leading-relaxed mb-6 font-sans">
                Experience unparalleled comfort and style with our classic range, meticulously designed using high-quality linen-cotton blends. Designed for active wearability, this piece combines structural excellence with breathable daily convenience.
              </p>

              {/* Colors Swatches */}
              <div className="mb-6">
                <span className="text-xs uppercase font-bold tracking-wider text-text-muted block mb-3">
                  Select Color: <span className="text-text font-medium capitalize">{selectedColor.name}</span>
                </span>
                <div className="flex items-center gap-3">
                  {COLORS.map((color) => {
                    const isSelected = selectedColor.name === color.name;
                    return (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color)}
                        className={`relative w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                          isSelected ? "border-primary scale-110 shadow-md" : "border-transparent hover:scale-105"
                        } cursor-magnetic`}
                        title={color.name}
                        aria-label={`Select color ${color.name}`}
                        aria-selected={isSelected}
                      >
                        <span className={`w-6 h-6 rounded-full block ${color.class}`} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sizes Swatches */}
              <div className="mb-8">
                <span className="text-xs uppercase font-bold tracking-wider text-text-muted block mb-3">
                  Select Size: <span className="text-text font-medium">{selectedSize}</span>
                </span>
                <div className="flex items-center gap-3">
                  {SIZES.map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`relative w-12 h-12 rounded-xl text-sm font-semibold flex items-center justify-center border transition-all ${
                          isSelected
                            ? "border-primary bg-primary text-white shadow-md"
                            : "border-black/10 text-text hover:border-primary/50 hover:bg-bg-soft"
                        } cursor-magnetic`}
                      >
                        {isSelected && (
                          <motion.div
                            layoutId="selectedSizeBox"
                            className="absolute inset-0 bg-primary rounded-xl -z-10"
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                          />
                        )}
                        <span>{size}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* CTA action buttons */}
            <div className="flex items-center gap-4 mt-4">
              <button
                onClick={handleAddToBag}
                className="flex-1 glass bg-text text-bg hover:bg-primary py-4 rounded-full flex items-center justify-center gap-3 font-semibold transition-all shadow-md active:scale-95 cursor-magnetic"
              >
                <ShoppingBag size={18} />
                Add to Bag
              </button>
              
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-4 rounded-full border flex items-center justify-center transition-all ${
                  isLiked
                    ? "bg-[#FFEBEB] border-[#FFC7C7] text-[#E5484D] scale-105"
                    : "border-black/10 text-text hover:border-[#E5484D] hover:text-[#E5484D] hover:bg-[#FFEBEB]/30"
                } active:scale-90 cursor-magnetic`}
                aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart size={18} className={isLiked ? "fill-[#E5484D]" : ""} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
