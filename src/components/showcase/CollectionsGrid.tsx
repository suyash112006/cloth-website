"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Eye } from "lucide-react";
import { useAppStore } from "@/lib/store";

interface Product {
  id: number;
  name: string;
  price: number;
  category: "men" | "women" | "kids" | "accessories";
  image: string;
  tag?: string;
  isFeatured?: boolean;
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Classic Khaki Overshirt",
    price: 129.00,
    category: "men",
    image: "/hero/shirt1.png",
    tag: "New Arrival",
    isFeatured: true,
  },
  {
    id: 2,
    name: "Linen Casual Shirt",
    price: 89.00,
    category: "men",
    image: "/hero/shirt2.png",
    tag: "Best Seller",
  },
  {
    id: 3,
    name: "Ethereal Silk Gown",
    price: 249.00,
    category: "women",
    image: "/hero/shirt3.png",
    tag: "Trending",
  },
  {
    id: 4,
    name: "Signature Silver Band",
    price: 189.00,
    category: "accessories",
    image: "/hero/ring.png",
    tag: "Signature Pieces",
  },
  {
    id: 5,
    name: "Pastel Linen Blouse",
    price: 119.00,
    category: "women",
    image: "/hero/shirt4.png",
  },
  {
    id: 6,
    name: "Comfy Playtime Dungarees",
    price: 69.00,
    category: "kids",
    image: "/hero/shirt5.png",
    tag: "Organic Cotton",
  },
  {
    id: 7,
    name: "Everyday Denim Shirt",
    price: 99.00,
    category: "men",
    image: "/hero/shirt6.png",
  },
];

const CATEGORIES = [
  { id: "all", label: "All Collections" },
  { id: "men", label: "Men" },
  { id: "women", label: "Women" },
  { id: "kids", label: "Kids" },
  { id: "accessories", label: "Accessories" },
];

export default function CollectionsGrid() {
  const { selectedCollectionCategory: selectedCategory, setSelectedCollectionCategory: setSelectedCategory } = useAppStore();
  const [activeMobileCard, setActiveMobileCard] = useState<number | null>(null);
  const { addToCart, setCartOpen, setActiveProduct } = useAppStore();

  const filteredProducts = PRODUCTS.filter(
    (product) => selectedCategory === "all" || product.category === selectedCategory
  );

  const handleAddToBag = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addToCart(product, "M", "Lavender");
    setCartOpen(true);
  };

  return (
    <section id="collections" className="relative w-full py-24 lg:py-32 overflow-hidden bg-bg-soft">
      {/* Background Orbs */}
      <div className="absolute top-1/3 left-[-10%] w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none animate-orb-float-1" />
      <div className="absolute bottom-10 right-[-10%] w-[600px] h-[600px] bg-primary-soft/40 blur-[130px] rounded-full pointer-events-none animate-orb-float-2" />

      <div className="max-w-[1600px] mx-auto px-6 lg:px-16 w-full">
        {/* Section Header */}
        <div className="text-center mb-16 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-sans font-bold tracking-[0.2em] uppercase text-text-muted">
              Curated Lookbook
            </span>
          </div>
          <h2 className="font-serif font-bold text-text mb-6 tracking-tight leading-tight" style={{ fontSize: "var(--text-fluid-h1)" }}>
            The Collections
          </h2>
          <div className="w-16 h-[2px] bg-primary/20 mb-8" />
          
          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-3 bg-white/40 backdrop-blur-md p-2 rounded-full border border-primary/10 shadow-sm">
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  aria-pressed={isActive}
                  className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-colors cursor-magnetic ${
                    isActive ? "text-white" : "text-text-muted hover:text-text"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFilter"
                      className="absolute inset-0 bg-primary rounded-full z-0 shadow-md"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{category.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Standard Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 overflow-hidden"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => {
              const isMobileActive = activeMobileCard === product.id;

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  key={product.id}
                  className={`group relative flex flex-col justify-between bg-white rounded-2xl border border-primary/5 shadow-md overflow-hidden transition-all duration-500 hover:shadow-xl hover:border-primary/10`}
                >
                  {/* Badge */}
                  {product.tag && (
                    <div className="absolute top-4 left-4 z-20">
                      <span className="bg-white/80 backdrop-blur-md border border-primary/10 text-primary text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                        {product.tag}
                      </span>
                    </div>
                  )}

                  {/* Image Container */}
                  <div 
                    className={`relative w-full overflow-hidden bg-bg-soft flex items-center justify-center cursor-pointer aspect-[4/5]`}
                    onClick={() => {
                      if (window.innerWidth < 1024) {
                        setActiveMobileCard(isMobileActive ? null : product.id);
                      }
                    }}
                  >
                    {/* Double-depth reflection plate */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary-soft/20 opacity-40 z-0 pointer-events-none" />
                    
                    {/* Hanger Hook Visual overlay */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-6 border-2 border-b-0 border-primary/15 rounded-t-lg z-10 pointer-events-none" />

                    <div className="relative w-full h-full p-6 sm:p-10 flex items-center justify-center">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className={`object-contain p-8 transition-transform duration-700 ease-out z-10 ${isMobileActive ? 'scale-110' : 'group-hover:scale-110'}`}
                        priority={product.isFeatured}
                      />
                    </div>

                    {/* Hover Glassmorphism Overlay */}
                    <div className={`absolute inset-0 bg-black/10 backdrop-blur-[2px] transition-opacity duration-300 z-20 flex flex-col items-center justify-center gap-4 ${isMobileActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleAddToBag(e, product); }}
                        className={`glass bg-white text-text hover:bg-primary hover:text-white px-5 py-3 rounded-full flex items-center gap-2 text-sm font-medium transition-all shadow-md transform transition-transform duration-300 delay-[50ms] cursor-magnetic ${isMobileActive ? 'translate-y-0' : 'translate-y-4 group-hover:translate-y-0'}`}
                      >
                        <ShoppingBag size={16} />
                        Add to Bag
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); setActiveProduct(product); }}
                        className={`glass bg-text/90 text-bg hover:bg-primary px-5 py-3 rounded-full flex items-center gap-2 text-sm font-medium transition-all shadow-md transform transition-transform duration-300 delay-[100ms] cursor-magnetic ${isMobileActive ? 'translate-y-0' : 'translate-y-4 group-hover:translate-y-0'}`}
                      >
                        <Eye size={16} />
                        Quick View
                      </button>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-6 bg-white z-10 relative border-t border-black/5 flex flex-col flex-1 justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-text-muted block mb-1">
                        {product.category}
                      </span>
                      <h3 className="font-serif font-bold text-lg text-text group-hover:text-primary transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xl font-bold text-text">${product.price.toFixed(2)}</span>
                      <span className="text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        View Details →
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
