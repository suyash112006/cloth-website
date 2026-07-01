"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Men", href: "#men" },
  { label: "Women", href: "#women" },
  { label: "Kids", href: "#kids" },
  { label: "Collections", href: "#collections" },
  { label: "About Us", href: "#about" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  const {
    cartCount,
    activeSection,
    setSearchOpen,
    setCartOpen,
    isMobileMenuOpen,
    setMobileMenuOpen,
  } = useAppStore();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else if (href === "#home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-white/75 backdrop-blur-[20px] -webkit-backdrop-blur-[20px] shadow-md border-b border-black/5" 
            : "bg-transparent border-b border-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="#home"
            className="flex flex-col cursor-magnetic group"
            onClick={(e) => handleSmoothScroll(e, "#home")}
          >
            <span className="font-serif text-2xl font-bold tracking-tight text-text">
              Krishna<span className="text-primary transition-transform group-hover:scale-110 inline-block">.</span>
            </span>
            <span className="text-[0.6rem] font-sans font-medium tracking-widest text-text-muted mt-[-2px]">
              CREATION NASHIK
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              // Home edge case
              const isHomeActive = link.href === "#home" && activeSection === "home";
              const isCurrentlyActive = isActive || isHomeActive;

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className={`text-sm font-sans font-medium transition-colors hover:text-primary ${
                    isCurrentlyActive ? "text-primary border-b-2 border-primary" : "text-text"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4 lg:gap-6">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 cursor-magnetic text-text hover:text-primary transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <button
              onClick={() => setCartOpen(true)}
              className="p-2 cursor-magnetic text-text hover:text-primary transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-text hover:text-primary transition-colors bg-bg-soft rounded-full border border-black/5"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-bg-soft/90 backdrop-blur-xl pt-28 px-8 pb-12 lg:hidden flex flex-col justify-between"
          >
            <nav className="flex flex-col gap-6 text-3xl font-serif">
              {NAV_LINKS.map((link, idx) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    className="text-text hover:text-primary transition-colors block"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div 
              className="border-t border-black/10 dark:border-white/10 pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-sm font-sans font-bold uppercase tracking-widest text-text-muted mb-4">Contact Us</p>
              <div className="flex flex-col gap-2 text-sm font-sans text-text">
                <a href="mailto:hello@krishnacreation.com" className="hover:text-primary transition-colors">hello@krishnacreation.com</a>
                <a href="tel:+919876543210" className="hover:text-primary transition-colors">+91 98765 43210</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
