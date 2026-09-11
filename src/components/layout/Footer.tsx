export default function Footer() {
  return (
    <footer className="bg-surface/60 border-t border-text/10 pt-24 pb-16">
      <div className="max-w-[1550px] mx-auto px-6 md:px-12 flex flex-col justify-between min-h-[300px]">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-6">
            <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl text-text font-normal tracking-tight mb-4">
              CHOMPIFY
            </h2>
            <p className="font-mono text-xs uppercase tracking-widest text-muted/70">
              Saanvi • Digital Art Portfolio & Commission Studio
            </p>
          </div>

          <div className="md:col-span-6 flex flex-col md:flex-row justify-between md:justify-end gap-12 font-sans text-xs uppercase tracking-widest">
            <div className="space-y-3">
              <span className="font-mono text-muted/50 block mb-2">Navigation</span>
              <div><a href="#portfolio" className="text-text/80 hover:text-primary transition-colors">Portfolio</a></div>
              <div><a href="#pricing" className="text-text/80 hover:text-primary transition-colors">Pricing</a></div>
              <div><a href="#about" className="text-text/80 hover:text-primary transition-colors">About</a></div>
              <div><a href="#contact" className="text-text/80 hover:text-primary transition-colors">Commission</a></div>
            </div>

            <div className="space-y-3">
              <span className="font-mono text-muted/50 block mb-2">Socials</span>
              <div><a href="#" className="text-text/80 hover:text-primary transition-colors">Instagram</a></div>
              <div><a href="#" className="text-text/80 hover:text-primary transition-colors">ArtStation</a></div>
              <div><a href="#" className="text-text/80 hover:text-primary transition-colors">Behance</a></div>
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
