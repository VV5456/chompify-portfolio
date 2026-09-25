"use client";

import { useState } from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";

export default function About() {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <section id="about" className="py-32 md:py-44 bg-background border-t border-text/10">
      <div className="max-w-[1550px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column (Artist Portrait Moment) */}
          <div className="lg:col-span-5 max-w-[430px] w-full mx-auto lg:mx-0">
            <div 
              onClick={() => setIsRevealed((prev) => !prev)}
              className="relative aspect-[3/4] w-full bg-surface overflow-hidden rounded-xs group cursor-pointer border border-text/10 hover:border-primary/30 transition-colors duration-500"
            >
              <Image 
                src="/about/portrait.jpeg" 
                alt="Saanvi — Digital Artist" 
                fill
                className={`object-cover transition-all duration-700 ${
                  isRevealed ? "grayscale-0 scale-105" : "grayscale hover:grayscale-0 hover:scale-105"
                }`}
                sizes="(max-width: 1024px) 100vw, 35vw"
              />

              {/* Subtle Floating Visual Prompt Badge */}
              <div className="absolute bottom-3 right-3 pointer-events-none z-10">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border backdrop-blur-xs font-mono text-[10px] uppercase tracking-wider transition-all duration-500 ${
                  isRevealed 
                    ? "bg-primary text-background border-primary shadow-md"
                    : "bg-background/80 text-muted/80 border-text/10 group-hover:bg-primary group-hover:text-background group-hover:border-primary group-hover:shadow-md"
                }`}>
                  <Sparkles className={`w-2.5 h-2.5 transition-colors ${
                    isRevealed ? "text-background" : "text-primary group-hover:text-background"
                  }`} />
                  {isRevealed ? (
                    <span>Color Revealed</span>
                  ) : (
                    <>
                      <span className="sm:hidden">Tap or hover for color</span>
                      <span className="hidden sm:inline group-hover:hidden">Hover to reveal color</span>
                      <span className="hidden group-hover:inline">Color Revealed</span>
                    </>
                  )}
                </span>
              </div>
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
                Hi! I&apos;m Chomp (Saanvi), a 21 year old, Indian bookish Artist/Illustrator.
              </h2>
            </div>

            <div className="space-y-6 font-sans text-base md:text-lg text-text/80 leading-relaxed font-light">
              <p>
                I specialise in semi-realistic portraits, stylised character art, fantasy illustrations, and colourful artwork. Every project is approached collaboratively - from discussing your vision and references to sharing sketches and updates throughout the process. At the end of the day, I want us to create something that feels true to your story.
              </p>
              <p>
                I have been drawing for as long as I can remember, traditional art for more than 15 years and digital art for the last 5+ years. I started with the free software Krita, and eventually upgraded to my current art system which is the IPad and Procreate.
              </p>
              <p>
                I would love it if you consider me for your project! If you have any questions or custom requests, don&apos;t hesitate to reach out before placing an order. Thank you for supporting Chompify! xx
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
