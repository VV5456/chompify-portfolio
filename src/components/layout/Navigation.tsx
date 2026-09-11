"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 150);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out",
        isScrolled 
          ? "opacity-100 pointer-events-auto translate-y-0 bg-background/90 backdrop-blur-md py-4 border-b border-text/10 shadow-sm" 
          : "opacity-0 pointer-events-none -translate-y-full"
      )}
    >
      <div className="max-w-[1550px] mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Studio Brand Header */}
        <div 
          className="group flex items-baseline gap-3 cursor-pointer select-none" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <span className="font-serif text-2xl md:text-3xl font-normal tracking-wide text-text group-hover:text-primary transition-colors duration-300">
            CHOMPIFY
          </span>
          <span className="hidden sm:inline font-sans text-[10px] tracking-widest text-muted/70 uppercase">
            — Saanvi
          </span>
        </div>
        
        {/* Minimal Navigation Items */}
        <nav className="flex items-center space-x-6 md:space-x-10 font-sans text-xs uppercase tracking-widest font-medium">
          {[
            { label: "Portfolio", id: "portfolio" },
            { label: "Pricing", id: "pricing" },
            { label: "About", id: "about" },
            { label: "Commission", id: "contact" }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="relative text-text/80 hover:text-text transition-colors duration-300 group py-1"
            >
              <span>{item.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
