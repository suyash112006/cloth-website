"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ShoppingBag, Filter, ChevronDown, Heart, Star } from "lucide-react";
import { useState } from "react";

const MEN_PRODUCTS = [
  { id: 1, title: "Oxford Linen Shirt", subtitle: "Relaxed Fit", price: 2499, originalPrice: 3200, badge: "New", rating: 4.8, reviews: 124, colors: ["#C8A27A", "#1C1C1C", "#E8E0D5"], sizes: ["S", "M", "L", "XL"], image: "/hero/shirt.png" },
  { id: 2, title: "Classic Poplin Shirt", subtitle: "Slim Fit", price: 1999, originalPrice: null, badge: null, rating: 4.6, reviews: 89, colors: ["#FFFFFF", "#C8A27A", "#6D6D6D"], sizes: ["S", "M", "L", "XL", "XXL"], image: "/hero/shirt.png" },
  { id: 3, title: "Chambray Utility Shirt", subtitle: "Regular Fit", price: 2799, originalPrice: 3500, badge: "Sale", rating: 4.7, reviews: 56, colors: ["#5B7FA6", "#1C1C1C"], sizes: ["M", "L", "XL"], image: "/hero/shirt.png" },
  { id: 4, title: "Premium Kurta", subtitle: "Straight Fit", price: 3299, originalPrice: null, badge: "Best Seller", rating: 4.9, reviews: 210, colors: ["#F5ECE3", "#C8A27A", "#1C1C1C"], sizes: ["S", "M", "L", "XL", "XXL"], image: "/hero/shirt.png" },
  { id: 5, title: "Mandarin Collar Shirt", subtitle: "Slim Fit", price: 2199, originalPrice: 2800, badge: null, rating: 4.5, reviews: 43, colors: ["#FFFFFF", "#1C1C1C"], sizes: ["S", "M", "L"], image: "/hero/shirt.png" },
  { id: 6, title: "Dobby Texture Shirt", subtitle: "Regular Fit", price: 2599, originalPrice: null, badge: "New", rating: 4.7, reviews: 67, colors: ["#C8A27A", "#E8E0D5", "#5B7FA6"], sizes: ["S", "M", "L", "XL"], image: "/hero/shirt.png" },
  { id: 7, title: "Linen Blend Kurta", subtitle: "Relaxed Fit", price: 3499, originalPrice: 4200, badge: null, rating: 4.8, reviews: 91, colors: ["#F5ECE3", "#6D6D6D"], sizes: ["M", "L", "XL", "XXL"], image: "/hero/shirt.png" },
  { id: 8, title: "Print Georgette Shirt", subtitle: "Oversized", price: 1799, originalPrice: null, badge: null, rating: 4.4, reviews: 35, colors: ["#C8A27A", "#1C1C1C", "#FFFFFF"], sizes: ["S", "M", "L", "XL"], image: "/hero/shirt.png" },
];

const SORT_OPTIONS = ["Featured", "Price: Low to High", "Price: High to Low", "Newest", "Best Rated"];
const FILTER_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export default function MenShopPage() {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState("Featured");
  const [activeSize, setActiveSize] = useState<string | null>(null);
  const [showSort, setShowSort] = useState(false);

  const toggleWishlist = (id: number) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const filteredProducts = activeSize
    ? MEN_PRODUCTS.filter(p => p.sizes.includes(activeSize))
    : MEN_PRODUCTS;

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "Price: Low to High") return a.price - b.price;
    if (sortBy === "Price: High to Low") return b.price - a.price;
    if (sortBy === "Best Rated") return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="min-h-screen bg-bg font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-bg/80 backdrop-blur-md border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-text-muted hover:text-text transition-colors duration-200 group"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            <span className="text-sm font-medium tracking-wide">Back</span>
          </Link>

          <div className="flex flex-col items-center">
            <span className="font-serif text-xl text-text">Krishna Creation</span>
            <span className="text-[9px] font-sans tracking-[0.3em] uppercase text-text-muted">Men&apos;s Collection</span>
          </div>

          <button className="relative flex items-center gap-2 text-text-muted hover:text-text transition-colors">
            <ShoppingBag size={20} />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-white text-[9px] flex items-center justify-center font-bold">0</span>
          </button>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="relative bg-bg-soft overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-primary/8 blur-2xl" />
        </div>
        <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
          <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.3em] uppercase text-primary mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Men&apos;s Collection 2025
          </span>
          <h1 className="font-serif text-5xl md:text-6xl text-text mb-4">Shop Men</h1>
          <p className="text-text-muted font-sans text-base md:text-lg max-w-md leading-relaxed">
            Sophisticated styles crafted for the modern man. Premium fabrics, refined cuts.
          </p>
          <div className="mt-6 flex items-center gap-4 text-sm text-text-muted">
            <span>{sortedProducts.length} Products</span>
            <span className="w-1 h-1 rounded-full bg-text-muted/40" />
            <span>Free shipping on orders above ₹999</span>
          </div>
        </div>
      </div>

      {/* Filters & Sort Bar */}
      <div className="sticky top-16 z-40 bg-bg/90 backdrop-blur-sm border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {/* Filter label */}
          <div className="flex items-center gap-2 text-xs font-medium text-text-muted shrink-0">
            <Filter size={13} />
            <span>Size</span>
          </div>
          <div className="w-px h-4 bg-black/10 shrink-0" />

          {/* Size filters */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveSize(null)}
              className={`px-3 py-1 text-xs font-medium rounded-full border transition-all duration-200 shrink-0 ${
                !activeSize
                  ? "bg-text text-white border-text"
                  : "bg-transparent text-text-muted border-black/15 hover:border-text/40"
              }`}
            >
              All
            </button>
            {FILTER_SIZES.map(size => (
              <button
                key={size}
                onClick={() => setActiveSize(activeSize === size ? null : size)}
                className={`px-3 py-1 text-xs font-medium rounded-full border transition-all duration-200 shrink-0 ${
                  activeSize === size
                    ? "bg-primary text-white border-primary"
                    : "bg-transparent text-text-muted border-black/15 hover:border-primary/50"
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="ml-auto relative shrink-0">
            <button
              onClick={() => setShowSort(v => !v)}
              className="flex items-center gap-2 text-xs font-medium text-text-muted hover:text-text border border-black/15 hover:border-text/30 rounded-full px-4 py-1.5 transition-all"
            >
              {sortBy}
              <ChevronDown size={12} className={`transition-transform ${showSort ? "rotate-180" : ""}`} />
            </button>
            {showSort && (
              <div className="absolute right-0 top-10 bg-white rounded-xl shadow-xl border border-black/5 overflow-hidden z-50 min-w-[180px]">
                {SORT_OPTIONS.map(opt => (
                  <button
                    key={opt}
                    onClick={() => { setSortBy(opt); setShowSort(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-bg-soft ${sortBy === opt ? "text-primary font-medium" : "text-text-muted"}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
          {sortedProducts.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-2xl overflow-hidden border border-black/5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* Badge */}
              {product.badge && (
                <div className={`absolute top-3 left-3 z-10 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide ${
                  product.badge === "Sale" ? "bg-red-500 text-white" :
                  product.badge === "Best Seller" ? "bg-primary text-white" :
                  "bg-text text-white"
                }`}>
                  {product.badge}
                </div>
              )}

              {/* Wishlist */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
              >
                <Heart
                  size={14}
                  className={wishlist.includes(product.id) ? "fill-red-500 text-red-500" : "text-text-muted"}
                />
              </button>

              {/* Product Image */}
              <div className="relative aspect-[4/5] bg-bg-soft overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Product Info */}
              <div className="p-4">
                <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-text-muted mb-1">{product.subtitle}</p>
                <h3 className="font-serif text-base text-text mb-2 leading-tight">{product.title}</h3>

                {/* Rating */}
                <div className="flex items-center gap-1.5 mb-3">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={10}
                        className={i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-black/10 fill-black/10"}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] text-text-muted">({product.reviews})</span>
                </div>

                {/* Color Swatches */}
                <div className="flex items-center gap-1.5 mb-3">
                  {product.colors.map((color, idx) => (
                    <span
                      key={idx}
                      className="w-3.5 h-3.5 rounded-full border border-black/10 cursor-pointer hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="font-serif text-lg font-medium text-text">₹{product.price.toLocaleString("en-IN")}</span>
                  {product.originalPrice && (
                    <span className="text-xs text-text-muted line-through">₹{product.originalPrice.toLocaleString("en-IN")}</span>
                  )}
                  {product.originalPrice && (
                    <span className="text-[10px] font-bold text-green-600">
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% off
                    </span>
                  )}
                </div>

                {/* Add to Cart */}
                <button className="w-full bg-text text-white py-2.5 rounded-xl text-xs font-medium tracking-wide hover:bg-text/80 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2">
                  <ShoppingBag size={13} />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="flex justify-center mt-16">
          <button className="border border-primary/30 text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-full font-medium text-sm tracking-wide transition-all duration-300 hover:-translate-y-0.5">
            Load More Products
          </button>
        </div>
      </main>

      {/* Footer Strip */}
      <footer className="border-t border-black/5 mt-8">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-serif text-lg text-text">Krishna Creation</span>
          <span className="text-xs text-text-muted">© 2025 All rights reserved</span>
        </div>
      </footer>
    </div>
  );
}
