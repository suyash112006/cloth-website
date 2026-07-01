"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";

export default function CartDrawer() {
  const {
    isCartOpen,
    setCartOpen,
    cartCount,
    cartItems,
    updateQuantity,
    removeFromCart,
  } = useAppStore();

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCartOpen(false);
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isCartOpen, setCartOpen]);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop Click Area */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/20 backdrop-blur-sm z-0"
            onClick={() => setCartOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative z-10 w-full max-w-md h-full bg-bg shadow-2xl flex flex-col border-l border-primary/10"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-black/5">
              <h2 className="font-serif text-2xl font-bold text-text">Your Bag ({cartCount})</h2>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 text-text hover:text-primary transition-colors cursor-magnetic rounded-full hover:bg-bg-soft"
                aria-label="Close cart"
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-text-muted">
                  <p className="font-serif text-xl mb-4">Your bag is empty.</p>
                  <button 
                    onClick={() => setCartOpen(false)}
                    className="text-primary font-medium hover:underline"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {cartItems.map((item) => (
                    <div 
                      key={`${item.id}-${item.size}-${item.color}`}
                      className="flex gap-4 border-b border-black/5 pb-6 last:border-b-0 last:pb-0"
                    >
                      {/* Product Thumbnail */}
                      <div className="w-20 h-24 bg-bg-soft rounded-xl overflow-hidden flex-shrink-0 relative flex items-center justify-center p-2 border border-primary/5">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary-soft/10 pointer-events-none" />
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="80px"
                          className="object-contain p-2"
                        />
                      </div>

                      {/* Item Details */}
                      <div className="flex flex-col flex-1 justify-between py-0.5">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h3 className="font-serif font-bold text-base text-text line-clamp-1">
                              {item.name}
                            </h3>
                            <button
                              onClick={() => removeFromCart(item.id, item.size, item.color)}
                              className="text-text-muted hover:text-[#E5484D] transition-colors p-1"
                              aria-label="Remove item"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <p className="text-xs text-text-muted mt-0.5">
                            Color: <span className="text-text capitalize">{item.color}</span>
                          </p>
                          <p className="text-xs text-text-muted">
                            Size: <span className="text-text">{item.size}</span>
                          </p>
                        </div>

                        {/* Quantity and Price */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-black/10 rounded-full bg-white">
                            <button 
                              onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                              className="p-1 px-2.5 text-text hover:text-primary transition-colors text-xs font-semibold"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12}/>
                            </button>
                            <span className="text-xs font-bold w-4 text-center text-text">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                              className="p-1 px-2.5 text-text hover:text-primary transition-colors text-xs font-semibold"
                              aria-label="Increase quantity"
                            >
                              <Plus size={12}/>
                            </button>
                          </div>
                          <p className="font-bold text-sm text-text">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Summary */}
            <div className="p-6 border-t border-black/5 bg-bg-soft">
              <div className="flex justify-between mb-4 font-serif text-xl">
                <span>Subtotal</span>
                <span className="font-bold">${subtotal.toFixed(2)}</span>
              </div>
              <p className="text-xs text-text-muted mb-6 text-center">Shipping and taxes calculated at checkout.</p>
              
              <button 
                disabled={cartItems.length === 0}
                className="w-full glass bg-text text-bg hover:bg-primary py-4 rounded-full font-medium transition-colors disabled:opacity-50 disabled:hover:bg-text cursor-magnetic"
                onClick={() => console.log("Checkout initiated", { items: cartItems, subtotal })}
              >
                Checkout
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
