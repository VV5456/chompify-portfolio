import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-32 md:py-44 bg-background border-t border-text/10">
      <div className="max-w-[1550px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column (Artist Portrait Moment) */}
          <div className="lg:col-span-5 max-w-[430px] w-full mx-auto lg:mx-0">
            <div className="relative aspect-[3/4] w-full bg-surface overflow-hidden rounded-xs">
              <Image 
                src="/about/portrait.jpeg" 
                alt="Saanvi — Digital Artist" 
                fill
                className="object-cover transition-all duration-700 grayscale hover:grayscale-0 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 35vw"
              />
            </div>
            <div className="mt-4 flex justify-between font-mono text-xs text-muted/60 uppercase">
              <span>Saanvi</span>
              <span>Digital Artist</span>
            </div>
          </div>

          {/* Right Column (Editorial Bio & Philosophy) */}
          <div className="lg:col-span-7 space-y-8 pl-0 lg:pl-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-primary font-medium block mb-4">
                • About the Artist
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-text font-normal leading-tight mb-6">
                Hi! I&apos;m Chomp (Saanvi), a digital bookish illustrator.
              </h2>
            </div>

            <div className="space-y-6 font-sans text-base md:text-lg text-text/80 leading-relaxed font-light">
              <p>
                Specializing in semi-realistic portraits, character art, fantasy illustrations, and colourful artwork.
              </p>
              <p>
                Every project is approached collaboratively - from discussing your vision and references to sharing sketches and updates throughout the process. I use procreate for my work. My goal is to create artwork that feels true to your story.
              </p>
              <p>
                I would love it if you consider me for your project! I&apos;m excited to collaborate with you and bring your ideas to life. If you have any questions or custom requests, don&apos;t hesitate to reach out before placing an order.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
