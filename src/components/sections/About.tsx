import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-32 md:py-44 bg-background border-t border-text/10">
      <div className="max-w-[1550px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column (Artist Portrait Moment) */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[3/4] w-full bg-surface overflow-hidden rounded-xs">
              <Image 
                src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2671&auto=format&fit=crop" 
                alt="Saanvi — Digital Artist" 
                fill
                className="object-cover transition-all duration-700 grayscale hover:grayscale-0"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
            <div className="mt-4 flex justify-between font-mono text-xs text-muted/60 uppercase">
              <span>Saanvi</span>
              <span>Digital Artist</span>
            </div>
          </div>

          {/* Right Column (Editorial Bio & Philosophy) */}
          <div className="lg:col-span-7 space-y-10 pl-0 lg:pl-10">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-primary font-medium block mb-4">
                • About the Artist
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-text font-normal leading-tight mb-8">
                Blending traditional atmosphere with digital precision.
              </h2>
            </div>

            <div className="space-y-6 font-sans text-base md:text-lg text-text/80 leading-relaxed font-light">
              <p>
                Hello, I am Saanvi — a digital artist specializing in emotive, narrative-driven visual art. 
                My work bridges classic painterly light with modern digital workflows, crafting pieces that evoke quiet reflection and mood.
              </p>
              <p>
                Operating out of my home studio, I collaborate with private collectors, brands, and creative teams to bring distinct visual identity and digital paintings to life.
              </p>
            </div>
            
            <div className="pt-8 border-t border-text/10 grid grid-cols-1 sm:grid-cols-2 gap-8 font-sans">
              <div>
                <h4 className="font-mono text-xs uppercase tracking-widest text-text font-medium mb-3">Specializations</h4>
                <ul className="text-sm space-y-2 text-muted/80">
                  <li>• Digital Painting & Illustration</li>
                  <li>• Character & Concept Design</li>
                  <li>• Visual Identity & Art Direction</li>
                </ul>
              </div>

              <div>
                <h4 className="font-mono text-xs uppercase tracking-widest text-text font-medium mb-3">Studio Focus</h4>
                <ul className="text-sm space-y-2 text-muted/80">
                  <li>• Limited Edition Digital Prints</li>
                  <li>• Custom Commercial Commissions</li>
                  <li>• Narrative Concept Archives</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
