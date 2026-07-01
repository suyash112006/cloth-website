"use client";

import { useEffect, useRef } from "react";
import { X, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";

export default function SearchOverlay() {
  const { isSearchOpen, setSearchOpen } = useAppStore();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "unset";
    }
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, setSearchOpen]);

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex flex-col glass bg-white/80 dark:bg-black/80"
        >
          {/* Backdrop Click Area */}
          <div 
            className="absolute inset-0 z-0"
            onClick={() => setSearchOpen(false)}
          />

          <div className="relative z-10 w-full max-w-4xl mx-auto pt-24 px-6 flex flex-col flex-1">
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute top-6 right-6 p-2 text-text hover:text-primary transition-colors cursor-magnetic"
              aria-label="Close search"
            >
              <X size={32} />
            </button>

            <div className="flex items-center border-b-2 border-primary/20 pb-4 mt-12">
              <Search size={32} className="text-primary mr-4" />
              <input
                ref={inputRef}
                type="text"
                aria-label="Search collections, items, or colors"
                placeholder="Search collections, items, or colors..."
                className="w-full bg-transparent text-3xl font-serif text-text placeholder-text-muted focus:outline-none"
              />
            </div>

            {/* Placeholder results */}
            <div className="mt-12 overflow-y-auto pb-12">
              <h3 className="text-sm font-sans font-medium text-text-muted uppercase tracking-widest mb-6">
                Popular Searches
              </h3>
              <div className="flex flex-col gap-4">
                {["Men's Blazers", "Women's Evening Dresses", "Kids Summer Collection", "New Arrivals"].map((term) => (
                  <button 
                    key={term}
                    className="text-left font-serif text-xl text-text hover:text-primary transition-colors py-2"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
