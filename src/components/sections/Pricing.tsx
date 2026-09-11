"use client";

import { PRICING_TIERS } from "@/lib/data";
import { Check, Info } from "lucide-react";

export default function Pricing() {
  return (
    <section id="pricing" className="py-32 md:py-40 bg-surface/50 border-t border-text/10">
      <div className="max-w-[1550px] mx-auto px-6 md:px-12">
        <div className="mb-16 md:mb-24 max-w-3xl">
          <span className="font-mono text-xs uppercase tracking-widest text-primary font-medium block mb-4">
            • Pricing & Investment Guide
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-text font-normal mb-6 leading-tight">
            Transparent pricing tailored to your creative vision.
          </h2>
          <p className="font-sans text-muted md:text-lg mb-8 leading-relaxed">
            General investment tiers to help plan your custom digital art commission.
          </p>

          <div className="inline-flex items-start md:items-center gap-3 p-4 bg-background/80 border border-text/10 rounded-xs text-xs md:text-sm font-sans text-muted leading-relaxed">
            <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5 md:mt-0" />
            <span>
              <strong>Note:</strong> Final investment varies based on complexity, usage scope, and turnaround deadline. Confirmed prior to project start.
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {PRICING_TIERS.map((tier) => (
            <div 
              key={tier.name} 
              className="bg-background border border-text/10 p-8 md:p-10 flex flex-col justify-between hover:border-primary/40 transition-colors duration-300 rounded-xs shadow-xs"
            >
              <div>
                <div className="mb-6 border-b border-text/10 pb-6">
                  <h3 className="font-serif text-2xl md:text-3xl mb-2 text-text font-normal">{tier.name}</h3>
                  <div className="font-mono text-2xl text-primary font-medium">{tier.guidePrice}</div>
                </div>
                <p className="font-sans text-text/80 text-sm mb-8 leading-relaxed">
                  {tier.description}
                </p>
                <ul className="space-y-3 mb-10 font-sans text-xs text-muted">
                  <li className="flex items-center">
                    <Check className="w-3.5 h-3.5 mr-2.5 text-primary flex-shrink-0" />
                    Turnaround: {tier.turnaround}
                  </li>
                  <li className="flex items-center">
                    <Check className="w-3.5 h-3.5 mr-2.5 text-primary flex-shrink-0" />
                    High-resolution deliverables (PNG / PSD)
                  </li>
                </ul>
              </div>

              <button 
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="w-full py-4 border border-text text-text font-sans uppercase tracking-widest text-xs font-medium hover:bg-text hover:text-background transition-colors duration-300 rounded-xs"
              >
                Inquire for {tier.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
