"use client";

import React, { ReactNode } from "react";
import { ReactLenis } from "lenis/react";
import dynamic from "next/dynamic";

const SearchOverlay = dynamic(() => import("./SearchOverlay"), { ssr: false });
const CartDrawer = dynamic(() => import("./CartDrawer"), { ssr: false });
const ProductModal = dynamic(() => import("../showcase/ProductModal"), { ssr: false });
const Agentation = dynamic(
  () => import("agentation").then((mod) => mod.Agentation),
  { ssr: false }
);

interface LenisProviderProps {
  children: ReactNode;
}

export default function LenisProvider({ children }: LenisProviderProps) {
  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.5, smoothWheel: true }}>
      {children}
      <SearchOverlay />
      <CartDrawer />
      <ProductModal />
      {process.env.NODE_ENV === "development" && <Agentation />}
    </ReactLenis>
  );
}
