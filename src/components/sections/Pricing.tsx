"use client";

import Image from "next/image";
import { PRICING_CATEGORIES, ADDITIONAL_FEES, PRICING_NOTES } from "@/lib/data";
import { Info, Sparkles, Tag, Layers, Percent } from "lucide-react";

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-32 bg-surface/50 border-t border-text/10 relative overflow-hidden select-none">
      <div className="max-w-[1550px] mx-auto px-6 md:px-12">
        
        {/* Streamlined Section Header & Guide Notice (Grids Moved Up) */}
        <div className="mb-8 md:mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-text/10">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-primary font-medium block mb-1">
              • Investment & Commission Rates
            </span>
            <span className="font-serif text-2xl md:text-3xl text-text font-normal">
              Pricing Guide
            </span>
          </div>

          {/* Compact Guide Notice */}
          <div className="inline-flex items-center gap-3 px-4 py-2.5 bg-background border border-text/10 rounded-xs text-xs md:text-sm font-sans text-muted shadow-xs">
            <Info className="w-4 h-4 text-primary flex-shrink-0" />
            <span>
              <strong>Note:</strong> Displayed rates are starting estimates. Final quotes are confirmed prior to project start.
            </span>
          </div>
        </div>

        {/* Core Pricing & Character Artwork Editorial Layout */}
        <div className="grid lg:grid-cols-12 gap-8 md:gap-10 items-stretch mb-16 md:mb-20">
          
          {/* Main 3 Tiers Comparison Grid & Single Unified CTA */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div>
              {/* 3 Tier Grid Cards */}
              <div className="grid sm:grid-cols-3 gap-6 md:gap-8 mb-5">
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
                      <div className="space-y-4 mb-6">
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

                    {/* Compact Tier Summary Line */}
                    <div className="pt-4 border-t border-text/5 flex items-center justify-between text-[10px] font-mono text-muted uppercase tracking-wider">
                      <span>Starting rate</span>
                      <span className="text-primary font-semibold">${cat.sketch} USD</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Single Unified Commission Request Button Directly Under Grids */}
            <button 
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="w-full py-4 border border-text/20 bg-background text-text font-sans uppercase tracking-widest text-[11px] font-semibold hover:bg-text hover:text-background transition-all duration-300 rounded-xs shadow-xs flex items-center justify-center gap-2 group mt-2"
            >
              <span>Inquire Commission Rates & Availability</span>
              <span className="text-primary group-hover:text-background transition-colors">→</span>
            </button>
          </div>

          {/* Supporting Character Coverage Visual Guide */}
          <div className="lg:col-span-4 bg-background border border-text/10 p-6 md:p-8 flex flex-col justify-between rounded-xs shadow-xs relative overflow-hidden group">
            {/* Figure Indicator Canvas */}
            <div className="relative w-full h-[300px] sm:h-[360px] lg:h-[380px] mb-6 rounded-xs overflow-hidden bg-surface/60 border border-text/10 flex items-center justify-center p-6 sm:p-8">
              <div className="relative h-full aspect-[195/360] flex items-center justify-center">
                {/* Mannequin Graphic */}
                <Image 
                  src="/artworks/coverage_guide_mannequin_clean.png"
                  alt="Character Commission Coverage & Sizing Guide"
                  fill
                  unoptimized
                  className="object-contain object-right group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                />
                
                {/* Tier Pointer Overlay Labels on the LEFT side of each indicator line */}
                {/* Headshots (Top Line ~21%) */}
                <div className="absolute top-[21.1%] left-[-24px] sm:left-[-32px] transform -translate-y-1/2 flex items-center">
                  <span className="px-2 sm:px-2.5 py-1 bg-background border border-text/15 text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-primary font-semibold rounded-xs shadow-xs whitespace-nowrap">
                    Headshots
                  </span>
                </div>

                {/* Half-Body (Middle Line ~47%) */}
                <div className="absolute top-[47.2%] left-[-24px] sm:left-[-32px] transform -translate-y-1/2 flex items-center">
                  <span className="px-2 sm:px-2.5 py-1 bg-background border border-text/15 text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-primary font-semibold rounded-xs shadow-xs whitespace-nowrap">
                    Half-Body
                  </span>
                </div>

                {/* Full-Body (Bottom Line ~88%) */}
                <div className="absolute top-[88.0%] left-[-24px] sm:left-[-32px] transform -translate-y-1/2 flex items-center">
                  <span className="px-2 sm:px-2.5 py-1 bg-background border border-text/15 text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-primary font-semibold rounded-xs shadow-xs whitespace-nowrap">
                    Full-Body
                  </span>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-primary font-semibold">
                  Coverage Reference
                </span>
                <span className="font-mono text-[10px] text-muted uppercase tracking-wider">
                  3 Tiers
                </span>
              </div>
              <h4 className="font-serif text-xl text-text font-normal mb-1">
                Figure Framing Guide
              </h4>
              <p className="font-sans text-xs text-muted leading-relaxed">
                Visual proportion reference illustrating crop coverage for Headshots, Half-Body, and Full-Body commissions.
              </p>
            </div>
          </div>
        </div>

        {/* Additional Fees, Backgrounds & Discount Details (Matching Main Pricing Cards Style) */}
        <div className="pt-10 border-t border-text/10">
          <div className="grid lg:grid-cols-12 gap-8 md:gap-10 items-stretch">
            
            {/* Fee Adjustments Grid */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-primary font-semibold block mb-1">
                  Adjustments
                </span>
                <h3 className="font-serif text-2xl md:text-3xl text-text font-normal">
                  Additional Options & Fees
                </h3>
              </div>

              {/* Matching Fees Cards Grid */}
              <div className="grid sm:grid-cols-3 gap-4">
                {ADDITIONAL_FEES.map((fee) => (
                  <div 
                    key={fee.label} 
                    className="bg-background border border-text/10 p-5 flex flex-col justify-between hover:border-primary/40 transition-colors duration-300 rounded-xs shadow-xs"
                  >
                    <span className="font-sans text-xs text-muted block mb-2">
                      {fee.label}
                    </span>
                    <span className="font-mono text-xl font-medium text-primary block">
                      {fee.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Matching Background Pricing Note */}
              <div className="bg-background border border-text/10 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xs shadow-xs">
                <div className="flex items-center gap-3">
                  <Tag className="w-4 h-4 text-primary flex-shrink-0" />
                  <div>
                    <span className="font-sans text-sm text-text font-medium block">
                      Background Environments
                    </span>
                    <span className="font-sans text-xs text-muted">
                      Complex or detailed scenic backdrops
                    </span>
                  </div>
                </div>
                <div className="font-mono text-sm font-medium text-primary bg-surface/60 px-3.5 py-1.5 rounded-xs border border-text/5 self-start sm:self-auto">
                  {PRICING_NOTES.background}
                </div>
              </div>
            </div>

            {/* Multiple Character Discount & Final Action */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div className="bg-background border border-text/10 p-6 md:p-8 flex flex-col justify-between h-full rounded-xs shadow-xs">
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4 pb-4 border-b border-text/10">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-primary font-semibold block mb-1">
                        Group Rates
                      </span>
                      <h3 className="font-serif text-2xl md:text-3xl text-text font-normal">
                        Volume Discount
                      </h3>
                    </div>
                    <span className="px-2.5 py-1 bg-primary/10 border border-primary/20 font-mono text-[10px] text-primary uppercase font-medium tracking-wider rounded-xs">
                      10% OFF
                    </span>
                  </div>

                  <p className="font-sans text-xs md:text-sm text-text/80 leading-relaxed mb-6">
                    {PRICING_NOTES.discount}
                  </p>
                </div>

                <button 
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="w-full py-3.5 border border-text/20 text-text font-sans uppercase tracking-widest text-[11px] font-semibold hover:bg-text hover:text-background transition-all duration-300 rounded-xs"
                >
                  Start Commission Request
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

