"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 150;
      setIsScrolled(scrolled);
      if (!scrolled) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    if (id === "portfolio") {
      const el = document.getElementById("portfolio-marquee") || document.getElementById("portfolio");
      if (el) {
        const navbarOffset = 60;
        const elementTop = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementTop - navbarOffset,
          behavior: "smooth"
        });
        return;
      }
    }

    if (id === "pricing") {
      const el = document.getElementById("pricing-grid") || document.getElementById("pricing");
      if (el) {
        const navbarOffset = 90;
        const elementTop = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementTop - navbarOffset,
          behavior: "smooth"
        });
        return;
      }
    }

    if (id === "contact") {
      const el = document.getElementById("contact");
      if (el) {
        const navbarOffset = 70;
        const elementTop = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementTop - navbarOffset,
          behavior: "smooth"
        });
        return;
      }
    }

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
          className="group flex items-baseline gap-2 cursor-pointer select-none" 
          onClick={() => {
            setMobileMenuOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <span className="font-serif text-2xl md:text-3xl font-normal tracking-wide text-text group-hover:text-primary transition-colors duration-300">
            CHOMPIFY
          </span>
          <span className="hidden sm:inline font-sans text-[10px] tracking-widest text-muted/70">
            by SAANVI
          </span>
        </div>
        
        {/* Desktop Navigation Items (Hidden on Mobile) */}
        <nav className="hidden md:flex items-center space-x-6 md:space-x-10 font-sans text-xs uppercase tracking-widest font-medium">
          {[
            { label: "Portfolio", id: "portfolio" },
            { label: "Pricing", id: "pricing" },
            { label: "Commission", id: "contact" },
            { label: "About", id: "about" }
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

        {/* Mobile 3-Bar Burger Button (Only on Mobile) */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 -mr-2 text-text hover:text-primary transition-colors focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Dropdown Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-background/95 backdrop-blur-md border-b border-text/10 shadow-lg px-6 py-4 mt-4"
          >
            <nav className="flex flex-col space-y-3 font-sans text-xs uppercase tracking-widest font-medium">
              {[
                { label: "Portfolio", id: "portfolio" },
                { label: "Pricing", id: "pricing" },
                { label: "Commission", id: "contact" },
                { label: "About", id: "about" }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    scrollTo(item.id);
                  }}
                  className="flex items-center justify-between text-left text-text/90 hover:text-primary transition-colors py-2 border-b border-text/5 last:border-none"
                >
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
