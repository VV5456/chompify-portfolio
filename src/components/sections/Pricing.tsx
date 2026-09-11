"use client";

import Image from "next/image";
import { PRICING_CATEGORIES, ADDITIONAL_FEES, PRICING_NOTES } from "@/lib/data";
import { Info, Sparkles, Tag, ShieldCheck, Layers, Percent } from "lucide-react";

export default function Pricing() {
  return (
    <section id="pricing" className="py-32 md:py-40 bg-surface/50 border-t border-text/10 relative overflow-hidden select-none">
      <div className="max-w-[1550px] mx-auto px-6 md:px-12">
        
        {/* Editorial Section Header */}
        <div className="mb-16 md:mb-20 max-w-3xl">
          <span className="font-mono text-xs uppercase tracking-widest text-primary font-medium block mb-4">
            • Pricing & Investment Guide
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-text font-normal mb-6 leading-[1.15]">
            Clear, transparent rates for your digital art commission.
          </h2>
          <p className="font-sans text-muted text-base md:text-lg mb-8 leading-relaxed">
            Use this guide to estimate your investment. Final quotes are tailored and confirmed after discussing your specific vision.
          </p>

          {/* Guide Disclaimer Notice */}
          <div className="inline-flex items-start md:items-center gap-3.5 p-4 bg-background/90 border border-text/10 rounded-xs text-xs md:text-sm font-sans text-text/80 leading-relaxed shadow-xs">
            <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5 md:mt-0" />
            <span>
              <strong>Guide Notice:</strong> Displayed rates are starting estimates for standard requests. Final quotes are confirmed prior to project start.
            </span>
          </div>
        </div>

        {/* Core Pricing & Character Artwork Editorial Layout */}
        <div className="grid lg:grid-cols-12 gap-10 md:gap-12 items-stretch mb-16 md:mb-24">
          
          {/* Main 3 Tiers Comparison Grid (Headshots | Half-Body | Full-Body) */}
          <div className="lg:col-span-8 grid sm:grid-cols-3 gap-6 md:gap-8">
            {PRICING_CATEGORIES.map((cat) => (
              <div 
                key={cat.id}
                className="bg-background border border-text/10 p-6 md:p-8 flex flex-col justify-between hover:border-primary/40 transition-colors duration-300 rounded-xs shadow-xs group"
              >
                <div>
                  {/* Category Header */}
                  <div className="mb-6 pb-5 border-b border-text/10">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-primary font-semibold block mb-1">
                      Tier
                    </span>
                    <h3 className="font-serif text-2xl md:text-3xl text-text font-normal mb-2 group-hover:text-primary transition-colors">
                      {cat.title}
                    </h3>
                    <p className="font-sans text-xs text-muted leading-snug">
                      {cat.subtitle}
                    </p>
                  </div>

                  {/* Render Levels Breakdown */}
                  <div className="space-y-4 mb-8">
                    {/* Sketch */}
                    <div className="flex items-center justify-between p-3 bg-surface/60 rounded-xs border border-text/5">
                      <span className="font-sans text-xs md:text-sm font-medium text-text/90">
                        Sketch
                      </span>
                      <span className="font-mono text-base md:text-lg font-semibold text-primary">
                        ${cat.sketch}
                      </span>
                    </div>

                    {/* Flat Colours */}
                    <div className="flex items-center justify-between p-3 bg-surface/60 rounded-xs border border-text/5">
                      <span className="font-sans text-xs md:text-sm font-medium text-text/90">
                        Flat Colours
                      </span>
                      <span className="font-mono text-base md:text-lg font-semibold text-primary">
                        ${cat.flatColours}
                      </span>
                    </div>

                    {/* Full Render */}
                    <div className="flex items-center justify-between p-3.5 bg-primary/10 rounded-xs border border-primary/20">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-primary" />
                        <span className="font-sans text-xs md:text-sm font-semibold text-text">
                          Full Render
                        </span>
                      </div>
                      <span className="font-mono text-lg md:text-xl font-bold text-primary">
                        ${cat.fullRender}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Inquiry CTA per Tier */}
                <button 
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="w-full py-3.5 border border-text/20 text-text font-sans uppercase tracking-widest text-[11px] font-semibold hover:bg-text hover:text-background transition-all duration-300 rounded-xs mt-4"
                >
                  Inquire {cat.title}
                </button>
              </div>
            ))}
          </div>

          {/* Supporting Character Artwork Showcase */}
          <div className="lg:col-span-4 bg-background border border-text/10 p-6 md:p-8 flex flex-col justify-between rounded-xs shadow-xs relative overflow-hidden group">
            <div className="relative w-full h-[320px] sm:h-[400px] lg:h-[440px] mb-6 rounded-xs overflow-hidden bg-surface/50 border border-text/5 flex items-center justify-center">
              <Image 
                src="/artworks/artist_pricing_guide.png"
                alt="Artist Character Commission Pricing Reference"
                fill
                unoptimized
                className="object-contain object-center p-3 group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-primary font-semibold">
                  Reference Piece
                </span>
                <span className="font-mono text-[10px] text-muted uppercase tracking-wider">
                  Full Render
                </span>
              </div>
              <h4 className="font-serif text-xl text-text font-normal mb-2">
                Character Commission Study
              </h4>
              <p className="font-sans text-xs text-muted leading-relaxed">
                Demonstrating high-fidelity linework, expressive character styling, and detailed render textures.
              </p>
            </div>
          </div>
        </div>

        {/* Additional Fees, Backgrounds & Discount Details (Subordinate Hierarchy) */}
        <div className="grid md:grid-cols-12 gap-8 items-start pt-8 border-t border-text/10">
          
          {/* Fee Adjustments Grid */}
          <div className="md:col-span-7 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Layers className="w-4 h-4 text-primary" />
              <h3 className="font-serif text-lg md:text-xl text-text font-normal">
                Additional Options & Fees
              </h3>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {ADDITIONAL_FEES.map((fee) => (
                <div key={fee.label} className="p-4 bg-background border border-text/10 rounded-xs">
                  <span className="font-sans text-xs text-muted block mb-1">
                    {fee.label}
                  </span>
                  <span className="font-mono text-lg font-semibold text-primary">
                    {fee.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Background Pricing Note */}
            <div className="p-4 bg-background border border-text/10 rounded-xs flex items-start gap-3">
              <Tag className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-sans text-xs font-semibold text-text block mb-0.5">
                  Background Environments
                </span>
                <p className="font-sans text-xs text-muted leading-relaxed">
                  {PRICING_NOTES.background}
                </p>
              </div>
            </div>
          </div>

          {/* Multiple Character Discount & Final Action */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Percent className="w-4 h-4 text-primary" />
              <h3 className="font-serif text-lg md:text-xl text-text font-normal">
                Volume Discount
              </h3>
            </div>

            <div className="p-6 bg-gradient-to-br from-primary/15 via-background to-background border border-primary/30 rounded-xs">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-1 bg-primary text-background font-mono text-[10px] uppercase font-bold tracking-wider rounded-xs">
                  10% OFF
                </span>
                <span className="font-sans text-xs font-semibold text-text">
                  Group Commission Special
                </span>
              </div>
              <p className="font-sans text-xs md:text-sm text-text/90 leading-relaxed mb-4">
                {PRICING_NOTES.discount}
              </p>

              <button 
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="w-full py-3.5 bg-primary text-background font-sans uppercase tracking-widest text-xs font-semibold hover:opacity-90 transition-opacity rounded-xs shadow-xs"
              >
                Start Commission Request
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

