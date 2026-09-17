import {
  CreditCard,
  RefreshCw,
  Clock,
  FileImage,
  ShieldCheck,
  Eye,
  RotateCcw,
  Ban
} from "lucide-react";

export default function TermsOfService() {
  return (
    <section id="terms" className="pt-8 md:pt-12 pb-28 md:pb-36 bg-surface/50 border-t border-text/10 relative overflow-hidden select-none scroll-mt-20">
      <div className="max-w-[1550px] mx-auto px-6 md:px-12">

        {/* Compact Header */}
        <div className="mb-5 pb-3 border-b border-text/10 flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-primary font-semibold block mb-1">
              • Client Agreement & Policy
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-text font-normal">
              Terms of Service
            </h2>
          </div>
          <p className="font-sans text-[clamp(8.5px,2.1vw,14px)] text-text/80 whitespace-nowrap tracking-tight leading-relaxed overflow-hidden">
            Please read the following before commissioning me. By placing an order, you agree to these terms.
          </p>
        </div>

        {/* 4-Column x 2-Row Ultra-Compact Grid (Fits 100% in single screen) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-3.5">

          {/* 01. Payment */}
          <div className="p-4 bg-background border border-text/10 border-l-4 border-l-primary rounded-xs shadow-xs hover:border-primary/40 transition-all duration-300 group flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-primary" />
                  <h3 className="font-serif text-base md:text-lg text-text font-normal group-hover:text-primary transition-colors">
                    Payment
                  </h3>
                </div>
                <span className="font-mono text-[10px] font-medium tracking-widest text-primary/80 bg-primary/10 border border-primary/20 px-1.5 py-0.5 rounded-xs">
                  01
                </span>
              </div>
              <ul className="space-y-1 font-sans text-xs md:text-sm text-text/85 leading-relaxed">
                <li className="flex items-start gap-1.5">
                  <span className="text-primary font-bold select-none">•</span>
                  <span><strong className="text-primary font-semibold">Half payment</strong> upfront as safety deposit.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-primary font-bold select-none">•</span>
                  <span>Remaining balance paid after sketch approval.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-primary font-bold select-none">•</span>
                  <span>All prices are listed in <strong className="text-primary font-semibold">USD</strong>.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-primary font-bold select-none">•</span>
                  <span>Add payment through either Paypal or VGen</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 02. Revisions */}
          <div className="p-4 bg-background border border-text/10 border-l-4 border-l-primary rounded-xs shadow-xs hover:border-primary/40 transition-all duration-300 group flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <RefreshCw className="w-4 h-4 text-primary" />
                  <h3 className="font-serif text-base md:text-lg text-text font-normal group-hover:text-primary transition-colors">
                    Revisions
                  </h3>
                </div>
                <span className="font-mono text-[10px] font-medium tracking-widest text-primary/80 bg-primary/10 border border-primary/20 px-1.5 py-0.5 rounded-xs">
                  02
                </span>
              </div>
              <ul className="space-y-1 font-sans text-xs md:text-sm text-text/85 leading-relaxed">
                <li className="flex items-start gap-1.5">
                  <span className="text-primary font-bold select-none">•</span>
                  <span><strong className="text-primary font-semibold">Minor revisions</strong> included during sketch stage.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-primary font-bold select-none">•</span>
                  <span>Major changes after rendering begin incur fees.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-primary font-bold select-none">•</span>
                  <span>Post-completion edits charged separately.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 03. Turnaround */}
          <div className="p-4 bg-background border border-text/10 border-l-4 border-l-primary rounded-xs shadow-xs hover:border-primary/40 transition-all duration-300 group flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-primary" />
                  <h3 className="font-serif text-base md:text-lg text-text font-normal group-hover:text-primary transition-colors">
                    Turnaround
                  </h3>
                </div>
                <span className="font-mono text-[10px] font-medium tracking-widest text-primary/80 bg-primary/10 border border-primary/20 px-1.5 py-0.5 rounded-xs">
                  03
                </span>
              </div>
              <ul className="space-y-1 font-sans text-xs md:text-sm text-text/85 leading-relaxed">
                <li className="flex items-start gap-1.5">
                  <span className="text-primary font-bold select-none">•</span>
                  <span>Turnaround: <strong className="text-primary font-semibold">2 weeks to 1 month</strong>.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-primary font-bold select-none">•</span>
                  <span>Unexpected delays communicated promptly.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 04. References */}
          <div className="p-4 bg-background border border-text/10 border-l-4 border-l-primary rounded-xs shadow-xs hover:border-primary/40 transition-all duration-300 group flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <FileImage className="w-4 h-4 text-primary" />
                  <h3 className="font-serif text-base md:text-lg text-text font-normal group-hover:text-primary transition-colors">
                    References
                  </h3>
                </div>
                <span className="font-mono text-[10px] font-medium tracking-widest text-primary/80 bg-primary/10 border border-primary/20 px-1.5 py-0.5 rounded-xs">
                  04
                </span>
              </div>
              <p className="font-sans text-xs md:text-sm text-text/85 leading-relaxed">
                Please provide clear references before work begins. Incomplete or changing references may cause extra fees or delays.
              </p>
            </div>
          </div>

          {/* 05. Copyright & Usage */}
          <div className="p-4 bg-background border border-text/10 border-l-4 border-l-primary rounded-xs shadow-xs hover:border-primary/40 transition-all duration-300 group flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <h3 className="font-serif text-base md:text-lg text-text font-normal group-hover:text-primary transition-colors">
                    Copyright & Usage
                  </h3>
                </div>
                <span className="font-mono text-[10px] font-medium tracking-widest text-primary/80 bg-primary/10 border border-primary/20 px-1.5 py-0.5 rounded-xs">
                  05
                </span>
              </div>
              <ul className="space-y-1 font-sans text-xs md:text-sm text-text/85 leading-relaxed">
                <li className="flex items-start gap-1.5">
                  <span className="text-primary font-bold select-none">•</span>
                  <span>Artist retains copyright to all artwork.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-primary font-bold select-none">•</span>
                  <span>Personal-use only (no commercial resale).</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-primary font-bold select-none">•</span>
                  <span><strong className="text-primary font-semibold">Commercial License (+50%)</strong></span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-primary font-bold select-none">•</span>
                  <span><strong className="text-primary font-semibold">Merchandise License (+40%)</strong></span>
                </li>
              </ul>
            </div>
          </div>

          {/* 06. Portfolio Rights */}
          <div className="p-4 bg-background border border-text/10 border-l-4 border-l-primary rounded-xs shadow-xs hover:border-primary/40 transition-all duration-300 group flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-primary" />
                  <h3 className="font-serif text-base md:text-lg text-text font-normal group-hover:text-primary transition-colors">
                    Portfolio Rights
                  </h3>
                </div>
                <span className="font-mono text-[10px] font-medium tracking-widest text-primary/80 bg-primary/10 border border-primary/20 px-1.5 py-0.5 rounded-xs">
                  06
                </span>
              </div>
              <p className="font-sans text-xs md:text-sm text-text/85 leading-relaxed">
                Unless agreed otherwise, I reserve the right to display commissioned artwork in my portfolio, social media, and promo materials.
              </p>
            </div>
          </div>

          {/* 07. Cancellations & Refunds */}
          <div className="p-4 bg-background border border-text/10 border-l-4 border-l-primary rounded-xs shadow-xs hover:border-primary/40 transition-all duration-300 group flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <RotateCcw className="w-4 h-4 text-primary" />
                  <h3 className="font-serif text-base md:text-lg text-text font-normal group-hover:text-primary transition-colors">
                    Cancellations & Refunds
                  </h3>
                </div>
                <span className="font-mono text-[10px] font-medium tracking-widest text-primary/80 bg-primary/10 border border-primary/20 px-1.5 py-0.5 rounded-xs">
                  07
                </span>
              </div>
              <ul className="space-y-1 font-sans text-xs md:text-sm text-text/85 leading-relaxed">
                <li className="flex items-start gap-1.5">
                  <span className="text-primary font-bold select-none">•</span>
                  <span><strong className="text-primary font-semibold">Full refund</strong> before work begins.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-primary font-bold select-none">•</span>
                  <span>Once work starts, deposits are <strong className="text-primary font-semibold">non-refundable</strong>.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 08. Right To Decline */}
          <div className="p-4 bg-background border border-text/10 border-l-4 border-l-primary rounded-xs shadow-xs hover:border-primary/40 transition-all duration-300 group flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <Ban className="w-4 h-4 text-primary" />
                  <h3 className="font-serif text-base md:text-lg text-text font-normal group-hover:text-primary transition-colors">
                    Right To Decline
                  </h3>
                </div>
                <span className="font-mono text-[10px] font-medium tracking-widest text-primary/80 bg-primary/10 border border-primary/20 px-1.5 py-0.5 rounded-xs">
                  08
                </span>
              </div>
              <p className="font-sans text-xs md:text-sm text-text/85 leading-relaxed">
                I may refuse or cancel commissions involving content that is offensive, hateful, illegal, explicit, or outside my comfort level.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
