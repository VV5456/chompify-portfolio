"use client";

import Image from "next/image";

export default function Footer() {
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
    <footer className="bg-surface/60 border-t border-text/10 pt-24 pb-16">
      <div className="max-w-[1550px] mx-auto px-6 md:px-12 flex flex-col justify-between min-h-[300px]">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-8 lg:col-span-8">
            <div className="relative w-full max-w-[320px] sm:max-w-[460px] md:max-w-[580px] lg:max-w-[680px] aspect-[2054/1035]">
              <Image 
                src="/artworks/BrandLogoTrimmed.PNG"
                alt="Chompify Brand Logo"
                fill
                className="object-contain object-left"
                priority
              />
              <p className="absolute top-[65.5%] left-[2%] sm:left-[4%] md:left-[5%] font-mono text-[5.2px] sm:text-[7.5px] md:text-[9.5px] lg:text-[10.5px] xl:text-[11.5px] uppercase tracking-tight text-text leading-none select-none pointer-events-none whitespace-nowrap">
                Saanvi • Digital Art Portfolio & Commission Studio
              </p>
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col md:flex-row justify-between md:justify-end gap-12 font-sans text-xs uppercase tracking-widest pt-4 sm:pt-6">
            <div className="space-y-3">
              <span className="font-mono text-muted/50 block mb-2">Navigation</span>
              <div>
                <a 
                  href="#portfolio-marquee" 
                  onClick={(e) => { e.preventDefault(); scrollTo("portfolio"); }}
                  className="text-text/80 hover:text-primary transition-colors cursor-pointer"
                >
                  Portfolio
                </a>
              </div>
              <div>
                <a 
                  href="#pricing" 
                  onClick={(e) => { e.preventDefault(); scrollTo("pricing"); }}
                  className="text-text/80 hover:text-primary transition-colors cursor-pointer"
                >
                  Pricing
                </a>
              </div>
              <div>
                <a 
                  href="#contact" 
                  onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}
                  className="text-text/80 hover:text-primary transition-colors cursor-pointer"
                >
                  Commission
                </a>
              </div>
              <div>
                <a 
                  href="#about" 
                  onClick={(e) => { e.preventDefault(); scrollTo("about"); }}
                  className="text-text/80 hover:text-primary transition-colors cursor-pointer"
                >
                  About
                </a>
              </div>
            </div>

            <div className="space-y-3">
              <span className="font-mono text-muted/50 block mb-2">Socials</span>
              <div><a href="https://www.instagram.com/chompify" target="_blank" rel="noopener noreferrer" className="text-text/80 hover:text-primary transition-colors">Instagram</a></div>
              <div><a href="https://vgen.co/chompify" target="_blank" rel="noopener noreferrer" className="text-text/80 hover:text-primary transition-colors">VGen</a></div>
              <div><a href="https://ko-fi.com/chompify" target="_blank" rel="noopener noreferrer" className="text-text/80 hover:text-primary transition-colors">Ko-fi</a></div>
              <div><a href="https://www.threads.com/@chompify" target="_blank" rel="noopener noreferrer" className="text-text/80 hover:text-primary transition-colors">Threads</a></div>
              <div><a href="mailto:chompifycomms@gmail.com" className="text-text/80 hover:text-primary transition-colors">Gmail</a></div>
              <div><a href="https://www.patreon.com/cw/chompify" target="_blank" rel="noopener noreferrer" className="text-text/80 hover:text-primary transition-colors">Patreon</a></div>
            </div>
          </div>
        </div>

        <div className="pt-16 mt-16 border-t border-text/10 flex flex-col sm:flex-row justify-between items-center font-mono text-[11px] text-muted/60">
          <span>&copy; {new Date().getFullYear()} Saanvi. All rights reserved.</span>
          <span className="mt-2 sm:mt-0">Chompify Digital Art Studio</span>
        </div>

      </div>
    </footer>
  );
}
