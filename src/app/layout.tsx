import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import AmbientBackground from "@/components/layout/AmbientBackground";
import LenisProvider from "@/components/layout/LenisProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Krishna Creation Nashik",
  description: "Where Style Meets Perfection",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-text bg-bg selection:bg-primary-soft selection:text-primary relative">
        <LenisProvider>
          <AmbientBackground />
          <Navbar />
          <div className="flex-1 flex flex-col pt-20">
            {children}
          </div>
        </LenisProvider>
      </body>
    </html>
  );
}
