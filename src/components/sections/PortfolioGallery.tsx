"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { ARTWORKS, Artwork } from "@/lib/data";
import Image from "next/image";
import { ArrowRight, Sparkles, X } from "lucide-react";

interface PortfolioGalleryProps {
  onSelectSimilar?: (artwork: Artwork) => void;
}

export default function PortfolioGallery({ onSelectSimilar }: PortfolioGalleryProps) {
  const [activeArtwork, setActiveArtwork] = useState<Artwork | null>(null);
  const [activeSketchId, setActiveSketchId] = useState<string | null>(null);

  // Lock body scroll and handle Escape key when modal is open
  useEffect(() => {
    if (activeArtwork) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setActiveArtwork(null);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [activeArtwork]);

  // Solstice-Style Hero Scroll Parallax Animation
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Parallax upward translate & scale transition linked directly to user scrolling
  const logoY = useTransform(scrollYProgress, [0, 1], ["0px", "-160px"]);
  const logoScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const logoOpacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 0.85, 0.2]);
  const bgGlowY = useTransform(scrollYProgress, [0, 1], ["0px", "-80px"]);

  const handleGetSimilar = (art: Artwork) => {
    setActiveArtwork(null);
    if (onSelectSimilar) {
      onSelectSimilar(art);
    }
    const contactEl = document.getElementById("contact");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Featured Concept Focus Artwork (Ravana)
  const featuredArtwork = ARTWORKS.find(a => a.id === "ravana") || ARTWORKS[0];
  // Top Grid Artworks (First 3 artworks)
  const topGridArtworks = ARTWORKS.slice(0, 3);
  // Remaining artworks for sequential editorial layouts
  const remainingArtworks = ARTWORKS.slice(3);

  // Triplicated array for seamless infinite marquee loop & scroll buffer
  const marqueeArtworks = [...ARTWORKS, ...ARTWORKS, ...ARTWORKS];

  // Interactive Marquee Ref & State
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isInteracting = useRef(false);
  const isMouseDown = useRef(false);
  const scrollPosRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);

  // Smooth momentum velocity & speed refs
  const baseAutoScrollSpeed = 38; // Pixels per second continuous auto-scroll speed
  const currentVelocityRef = useRef(baseAutoScrollSpeed); // Active scrolling velocity (px/s)
  
  // Touch & Drag velocity tracking refs
  const lastXRef = useRef(0);
  const lastTimeTrackRef = useRef(0);
  const trackedVelocityRef = useRef(0);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  // Auto scroll animation frame ref
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    scrollPosRef.current = el.scrollLeft;
    lastTimeRef.current = null;

    const autoScroll = (time: number) => {
      if (el) {
        if (lastTimeRef.current !== null) {
          // Time delta in seconds between frames
          const dt = (time - lastTimeRef.current) / 1000;
          // Cap dt to max 0.1s to avoid jumps on tab switch/lag spikes
          const safeDt = Math.min(dt, 0.1);

          if (!isInteracting.current && !isMouseDown.current) {
            // Smooth exponential friction deceleration towards baseAutoScrollSpeed (38 px/s)
            const frictionRate = 2.2;
            const blend = Math.exp(-frictionRate * safeDt);
            currentVelocityRef.current = currentVelocityRef.current * blend + baseAutoScrollSpeed * (1 - blend);

            scrollPosRef.current += currentVelocityRef.current * safeDt;

            const maxScroll = el.scrollWidth / 3;
            if (maxScroll > 0) {
              if (scrollPosRef.current >= maxScroll * 2) {
                scrollPosRef.current -= maxScroll;
              } else if (scrollPosRef.current <= 0) {
                scrollPosRef.current += maxScroll;
              }
            }

            el.scrollLeft = scrollPosRef.current;
          } else {
            // During active touch/mouse interaction, keep scrollPosRef synced with el.scrollLeft
            scrollPosRef.current = el.scrollLeft;
          }
        }
        lastTimeRef.current = time;
      }

      animFrameId.current = requestAnimationFrame(autoScroll);
    };

    animFrameId.current = requestAnimationFrame(autoScroll);

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const currentScroll = el.scrollLeft;
    const maxScroll = el.scrollWidth / 3;

    // Infinite loop wrap during manual scroll
    if (maxScroll > 0) {
      if (currentScroll >= maxScroll * 2) {
        el.scrollLeft = currentScroll - maxScroll;
        scrollPosRef.current = el.scrollLeft;
        return;
      } else if (currentScroll <= 0) {
        el.scrollLeft = currentScroll + maxScroll;
        scrollPosRef.current = el.scrollLeft;
        return;
      }
    }

    if (isInteracting.current || isMouseDown.current) {
      scrollPosRef.current = currentScroll;
    }
  };

  // Mouse drag handlers for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    isMouseDown.current = true;
    if (!scrollContainerRef.current) return;
    startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeftStart.current = scrollContainerRef.current.scrollLeft;
    scrollPosRef.current = scrollContainerRef.current.scrollLeft;

    lastXRef.current = e.pageX;
    lastTimeTrackRef.current = performance.now();
    trackedVelocityRef.current = 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown.current || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    const newScroll = scrollLeftStart.current - walk;
    scrollContainerRef.current.scrollLeft = newScroll;
    scrollPosRef.current = newScroll;

    const now = performance.now();
    const dt = (now - lastTimeTrackRef.current) / 1000;
    if (dt > 0.008) {
      const dx = e.pageX - lastXRef.current;
      const instVelocity = -dx / dt;
      trackedVelocityRef.current = trackedVelocityRef.current * 0.3 + instVelocity * 0.7;
      lastXRef.current = e.pageX;
      lastTimeTrackRef.current = now;
    }
  };

  const handleMouseLeaveOrUp = () => {
    if (isMouseDown.current) {
      isMouseDown.current = false;
      if (scrollContainerRef.current) {
        scrollPosRef.current = scrollContainerRef.current.scrollLeft;
      }
      const maxVelocity = 2200;
      const initialVelocity = Math.max(-maxVelocity, Math.min(maxVelocity, trackedVelocityRef.current));
      if (Math.abs(initialVelocity) > 20) {
        currentVelocityRef.current = initialVelocity;
      }
    }
  };

  // Touch event handlers for mobile interaction with smooth momentum physics
  const handleTouchStart = (e: React.TouchEvent) => {
    isInteracting.current = true;
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      lastXRef.current = touch.clientX;
      lastTimeTrackRef.current = performance.now();
      trackedVelocityRef.current = 0;
    }
    if (scrollContainerRef.current) {
      scrollPosRef.current = scrollContainerRef.current.scrollLeft;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isInteracting.current || e.touches.length === 0) return;
    const touch = e.touches[0];
    const now = performance.now();
    const dt = (now - lastTimeTrackRef.current) / 1000;

    if (dt > 0.008) {
      const dx = touch.clientX - lastXRef.current;
      const instVelocity = -dx / dt;
      trackedVelocityRef.current = trackedVelocityRef.current * 0.3 + instVelocity * 0.7;
      lastXRef.current = touch.clientX;
      lastTimeTrackRef.current = now;
    }

    if (scrollContainerRef.current) {
      scrollPosRef.current = scrollContainerRef.current.scrollLeft;
    }
  };

  const handleTouchEnd = () => {
    isInteracting.current = false;
    if (scrollContainerRef.current) {
      scrollPosRef.current = scrollContainerRef.current.scrollLeft;
    }

    const maxVelocity = 2200;
    const initialVelocity = Math.max(-maxVelocity, Math.min(maxVelocity, trackedVelocityRef.current));
    if (Math.abs(initialVelocity) > 20) {
      currentVelocityRef.current = initialVelocity;
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (scrollContainerRef.current && (e.deltaX !== 0 || Math.abs(e.deltaX) > Math.abs(e.deltaY))) {
      scrollContainerRef.current.scrollLeft += e.deltaX;
      scrollPosRef.current = scrollContainerRef.current.scrollLeft;
    }
  };

  // Variations for Curved Moving Stream (Upright Pictures, Curved Wave Path, Spacing & Proportions)
  const MARQUEE_VARIATIONS = [
    { offset: "-translate-y-6 md:-translate-y-10", aspect: "aspect-[3/4]", margin: "mr-8 md:mr-14", scale: "scale-95" },
    { offset: "translate-y-4 md:translate-y-8", aspect: "aspect-[4/5]", margin: "mr-12 md:mr-16", scale: "scale-100" },
    { offset: "-translate-y-3 md:-translate-y-5", aspect: "aspect-[3/4]", margin: "mr-6 md:mr-10", scale: "scale-[1.02]" },
    { offset: "translate-y-6 md:translate-y-10", aspect: "aspect-[4/5]", margin: "mr-14 md:mr-20", scale: "scale-95" },
    { offset: "-translate-y-5 md:-translate-y-8", aspect: "aspect-[3/4]", margin: "mr-10 md:mr-14", scale: "scale-100" },
    { offset: "translate-y-3 md:translate-y-5", aspect: "aspect-[4/5]", margin: "mr-12 md:mr-16", scale: "scale-[1.03]" },
  ];

// Hand-drawn sketch elements positioned cleanly with duplicated accents in negative space
const SKETCH_ELEMENTS = [
  // --- TOP LEFT QUADRANT ---
  {
    id: "grimoire_1",
    name: "Grimoire & Dagger",
    src: "/sketches/grimoire_dagger.png",
    alt: "Grimoire with Dagger Sketch",
    className: "top-[2%] left-[2%] sm:left-[4%] w-[70px] sm:w-[95px] md:w-[115px] -rotate-12",
    delay: 0.1,
    floatY: [-5, 5, -5],
    duration: 5.5
  },
  {
    id: "sword_1",
    name: "Ornate Rapier",
    src: "/sketches/ornate_sword.png",
    alt: "Ornate Rapier Sword Sketch",
    className: "top-[3%] left-[22%] sm:left-[25%] w-[32px] sm:w-[45px] md:w-[58px] rotate-6",
    delay: 0.25,
    floatY: [-7, 3, -7],
    duration: 6.2
  },
  {
    id: "key_1",
    name: "Antique Key",
    src: "/sketches/antique_key.png",
    alt: "Antique Skeleton Key Sketch",
    className: "top-[28%] left-[1%] sm:left-[3%] w-[26px] sm:w-[36px] md:w-[45px] -rotate-[30deg]",
    delay: 0.3,
    floatY: [-4, 4, -4],
    duration: 4.8
  },
  {
    id: "crescent_2",
    name: "Crescent Scimitar",
    src: "/sketches/crescent_blade.png",
    alt: "Crescent Scimitar Blade Sketch",
    className: "top-[48%] left-[12%] sm:left-[15%] w-[30px] sm:w-[42px] md:w-[52px] -rotate-[35deg]",
    delay: 0.35,
    floatY: [4, -4, 4],
    duration: 5.4
  },
  {
    id: "candle_1",
    name: "Candlestick",
    src: "/sketches/candlestick.png",
    alt: "Candlestick & Flame Sketch",
    className: "bottom-[2%] left-[2%] sm:left-[4%] w-[38px] sm:w-[50px] md:w-[62px] -rotate-6",
    delay: 0.4,
    floatY: [3, -6, 3],
    duration: 5.2
  },

  // --- TOP RIGHT QUADRANT ---
  {
    id: "clouds_1",
    name: "Celestial Sun & Clouds",
    src: "/sketches/celestial_clouds.png",
    alt: "Celestial Sun & Clouds Sketch",
    className: "top-[2%] right-[22%] sm:right-[25%] w-[70px] sm:w-[100px] md:w-[120px] -rotate-3",
    delay: 0.2,
    floatY: [-6, 4, -6],
    duration: 6.5
  },
  {
    id: "crescent_1",
    name: "Crescent Blade",
    src: "/sketches/crescent_blade.png",
    alt: "Crescent Scimitar Blade Sketch",
    className: "top-[3%] right-[2%] sm:right-[4%] w-[36px] sm:w-[52px] md:w-[66px] rotate-[15deg]",
    delay: 0.15,
    floatY: [4, -6, 4],
    duration: 5.8
  },
  {
    id: "mirror_1",
    name: "Cracked Mirror",
    src: "/sketches/cracked_mirror.png",
    alt: "Cracked Oval Mirror Sketch",
    className: "top-[32%] right-[1%] sm:right-[3%] w-[45px] sm:w-[65px] md:w-[82px] rotate-6",
    delay: 0.35,
    floatY: [5, -5, 5],
    duration: 6.0
  },
  {
    id: "sword_2",
    name: "Ornate Sword",
    src: "/sketches/ornate_sword.png",
    alt: "Ornate Rapier Sword Sketch",
    className: "top-[52%] right-[12%] sm:right-[15%] w-[28px] sm:w-[40px] md:w-[50px] -rotate-[15deg]",
    delay: 0.4,
    floatY: [-5, 5, -5],
    duration: 6.1
  },

  // --- BOTTOM QUADRANT & CORNERS ---
  {
    id: "key_2",
    name: "Skeleton Key",
    src: "/sketches/antique_key.png",
    alt: "Antique Skeleton Key Sketch",
    className: "bottom-[26%] right-[1%] sm:right-[3%] w-[24px] sm:w-[34px] md:w-[42px] rotate-[40deg]",
    delay: 0.45,
    floatY: [-4, 4, -4],
    duration: 5.1
  },
  {
    id: "candle_2",
    name: "Candle Flame",
    src: "/sketches/candlestick.png",
    alt: "Candlestick Sketch",
    className: "bottom-[2%] left-[24%] sm:left-[28%] w-[32px] sm:w-[44px] md:w-[55px] rotate-[12deg]",
    delay: 0.48,
    floatY: [4, -4, 4],
    duration: 5.6
  },
  {
    id: "wings",
    name: "Feathered Wings",
    src: "/sketches/feathered_wings.png",
    alt: "Feathered Wings Sketch",
    className: "bottom-[0%] left-[50%] -translate-x-1/2 w-[50px] sm:w-[72px] md:w-[90px] rotate-3",
    delay: 0.45,
    floatY: [-5, 5, -5],
    duration: 5.9
  },
  {
    id: "clouds_2",
    name: "Celestial Clouds",
    src: "/sketches/celestial_clouds.png",
    alt: "Celestial Clouds Sketch",
    className: "bottom-[2%] right-[22%] sm:right-[26%] w-[60px] sm:w-[85px] md:w-[100px] rotate-6",
    delay: 0.52,
    floatY: [-5, 5, -5],
    duration: 6.4
  },
  {
    id: "floral",
    name: "Floral Flourish",
    src: "/sketches/floral_flourish.png",
    alt: "Floral Blossom Flourish Sketch",
    className: "bottom-[2%] right-[2%] sm:right-[4%] w-[55px] sm:w-[78px] md:w-[95px] rotate-12",
    delay: 0.5,
    floatY: [5, -4, 5],
    duration: 6.3
  }
];

  return (
    <section 
      id="portfolio" 
      className="relative w-full bg-background pt-16 md:pt-24 pb-36 px-6 md:px-12 overflow-hidden select-none"
    >
      {/* Studio Centered Hero Brand Logo Header with Solstice Scroll Parallax */}
      <div 
        ref={heroRef}
        className="relative max-w-[1550px] mx-auto mb-12 md:mb-20 min-h-[75vh] md:min-h-[85vh] flex flex-col items-center justify-center text-center overflow-visible"
      >
        {/* Subtle Theme-Aligned Visual Aid Prompt & Editorial Scroll Cue */}
        <motion.div 
          style={{ y: logoY }}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 font-mono text-[9px] sm:text-[10px] text-[#C4B8A5]/80 uppercase tracking-[0.24em] pointer-events-none select-none z-10 whitespace-nowrap"
        >
          <div>
            <span className="sm:hidden">Tap or hover elements to explore sketches</span>
            <span className="hidden sm:inline">Hover elements to explore sketches</span>
          </div>

          <div className="flex items-center gap-1 text-text/75 font-medium">
            <span>Scroll To Explore</span>
            <motion.span
              animate={{ y: [0, 2.5, 0] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="inline-block text-[10px] sm:text-xs font-semibold"
            >
              ↓
            </motion.span>
          </div>
        </motion.div>

        {/* Soft Ambient Background Glow */}
        <motion.div 
          style={{ y: bgGlowY }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[600px] md:w-[950px] h-[220px] sm:h-[380px] md:h-[500px] bg-gradient-to-r from-primary/20 via-amber-600/15 to-primary/20 rounded-full blur-[90px] md:blur-[120px] pointer-events-none -z-10" 
        />

        {/* Individual Authentic Hand-Drawn Item Sketches (Balanced Watermark Backdrop) */}
        {SKETCH_ELEMENTS.map((item) => {
          const isItemActive = activeSketchId === item.id;
          return (
            <motion.div
              key={item.id}
              style={{ y: logoY }}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ 
                opacity: isItemActive ? 0.95 : [0.20, 0.32, 0.20], 
                scale: isItemActive ? 1.15 : 1,
                translateY: item.floatY
              }}
              whileHover={{ 
                opacity: 0.8, 
                scale: 1.12, 
                transition: { duration: 0.25, ease: "easeOut" } 
              }}
              transition={{ 
                opacity: { duration: item.duration, repeat: Infinity, ease: "easeInOut" },
                translateY: { duration: item.duration, repeat: Infinity, ease: "easeInOut" },
                scale: { duration: 0.8, delay: item.delay }
              }}
              onClick={(e) => {
                e.stopPropagation();
                setActiveSketchId(prev => prev === item.id ? null : item.id);
              }}
              className={`absolute ${item.className} ${
                isItemActive ? "opacity-95 z-30 scale-115" : "opacity-20 hover:opacity-85 z-20 hover:z-30"
              } transition-all cursor-pointer pointer-events-auto group/sketch`}
            >
              <Image 
                src={item.src}
                alt={item.alt}
                width={160}
                height={160}
                unoptimized
                className={`w-full h-auto object-contain select-none pointer-events-none filter transition-all duration-300 ${
                  isItemActive 
                    ? "contrast-140 brightness-80" 
                    : "contrast-110 brightness-95 group-hover/sketch:contrast-135 group-hover/sketch:brightness-85"
                }`}
              />
            </motion.div>
          );
        })}

        {/* Ambient Floating Sparkle Accents - Repositioned into clear negative space */}
        <motion.div 
          style={{ y: logoY }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute top-[18%] left-[14%] sm:left-[16%] md:left-[18%] text-amber-700/50 hidden sm:block pointer-events-none z-10"
        >
          <Sparkles className="w-5 h-5 animate-pulse" />
        </motion.div>
        <motion.div 
          style={{ y: logoY }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute bottom-[18%] right-[14%] sm:right-[16%] md:right-[18%] text-amber-700/50 hidden sm:block pointer-events-none z-10"
        >
          <Sparkles className="w-6 h-6 animate-pulse" />
        </motion.div>

        {/* Hero Enlarged Brand Logo — Solstice Scroll Upward Parallax Motion */}
        <motion.div
          style={{ y: logoY, scale: logoScale, opacity: logoOpacity }}
          initial={{ opacity: 0, scale: 0.78 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.025 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative w-full max-w-[500px] sm:max-w-[700px] md:max-w-[850px] lg:max-w-[950px] aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] filter drop-shadow-2xl cursor-pointer group z-10 pointer-events-none"
        >
          <Image 
            src="/artworks/BrandLogo.PNG"
            alt="Chompify Brand Logo"
            fill
            className="object-contain object-center transition-transform duration-500 group-hover:scale-[1.01] pointer-events-auto"
            priority
          />
        </motion.div>
      </div>

      {/* SECTION 1: Clean 3-Column Editorial Grid Showcase */}
      <div className="max-w-[1550px] mx-auto mb-28 md:mb-36">
        <div className="flex justify-between items-baseline mb-8 pb-4 border-b border-text/10 font-mono text-xs text-muted/70 uppercase">
          <span>Selected Feature Works</span>
          <span>Grid Overview</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {topGridArtworks.map((art, idx) => (
            <motion.div
              key={art.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => setActiveArtwork(art)}
              className="group cursor-pointer flex flex-col justify-between"
            >
              <div className="relative w-full aspect-[4/5] bg-surface overflow-hidden rounded-xs border border-text/5 group-hover:border-primary/30 transition-colors duration-300">
                <Image 
                  src={art.imageSrc} 
                  alt={art.title}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-text/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="bg-background/95 text-text font-sans text-xs uppercase tracking-widest px-4 py-2 rounded-full shadow-md flex items-center gap-1.5 font-medium">
                    View Work <ArrowRight className="w-3.5 h-3.5 text-primary" />
                  </span>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-baseline font-sans">
                <div>
                  <h3 className="font-serif text-lg md:text-xl text-text group-hover:text-primary transition-colors font-normal">
                    {art.title}
                  </h3>
                  <p className="text-xs text-muted/80 font-mono mt-0.5">
                    {art.medium} • {art.year}
                  </p>
                </div>
                <span className="font-mono text-xs text-muted/50">
                  0{idx + 1}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* SECTION 2: Infinite Horizontal Artwork Marquee Banner (Deep Mahogany #611f10 Stream) */}
      <div id="portfolio-marquee" className="w-screen relative left-1/2 -translate-x-1/2 my-20 md:my-32 py-20 md:py-28 bg-[#611f10] text-background overflow-hidden border-y border-[#611f10]/30 shadow-xl scroll-mt-20 md:scroll-mt-24">
        <div className="max-w-[1550px] mx-auto px-6 md:px-12 mb-8 md:mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2.5 sm:gap-0 font-mono text-[11px] sm:text-xs text-background/80 uppercase tracking-widest">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-background animate-pulse shrink-0" />
            <span>Continuous Artwork Gallery Stream</span>
          </span>
          <span className="text-background/70 sm:text-background/80">Scroll or Drag Left/Right</span>
        </div>

        {/* Marquee Interactive Stream Motion Container */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseLeaveOrUp}
          onMouseLeave={handleMouseLeaveOrUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          className="relative w-full overflow-x-auto no-scrollbar flex py-8 cursor-grab active:cursor-grabbing select-none touch-pan-x"
        >
          <div className="flex items-center flex-nowrap min-w-max">
            {marqueeArtworks.map((art, idx) => {
              const variation = MARQUEE_VARIATIONS[idx % MARQUEE_VARIATIONS.length];
              return (
                <div
                  key={`${art.id}-marquee-${idx}`}
                  onClick={() => setActiveArtwork(art)}
                  className={`group cursor-pointer flex-none w-[240px] sm:w-[300px] md:w-[360px] ${variation.margin} ${variation.offset} transition-transform duration-500`}
                >
                  <div className={`relative w-full ${variation.aspect} ${variation.scale} bg-background/10 overflow-hidden rounded-xs border border-white/25 group-hover:border-background transition-all duration-300 shadow-xl`}>
                    <Image 
                      src={art.imageSrc} 
                      alt={art.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03] pointer-events-none"
                      sizes="360px"
                    />
                    <div className="absolute inset-0 bg-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="bg-background text-text font-sans text-xs uppercase tracking-widest px-4 py-2 rounded-full shadow-md flex items-center gap-1.5 font-medium">
                        Explore <ArrowRight className="w-3.5 h-3.5 text-primary" />
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-between items-baseline font-sans text-xs">
                    <span className="font-serif text-base text-background group-hover:text-text transition-colors font-normal">
                      {art.title}
                    </span>
                    <span className="font-mono text-background/70">{art.year}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* SECTION 3: Sequential Editorial Layouts (Featured Concept Focus Piece) */}
      <div className="max-w-[1550px] mx-auto space-y-32 md:space-y-44">
        {featuredArtwork && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Editorial Info Block */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 space-y-8 pr-0 lg:pr-8"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-muted/70 block">
                • Featured Concept Focus
              </span>
              <div className="space-y-3">
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-text font-normal leading-tight">
                  {featuredArtwork.title}
                </h2>
                <p className="font-mono text-xs uppercase tracking-wider text-primary font-medium">
                  {featuredArtwork.commissionStatus}
                </p>
              </div>

              <div className="w-16 h-[1px] bg-primary/40" />

              <p className="font-sans text-sm md:text-base text-text/80 leading-relaxed font-light">
                {featuredArtwork.description}
              </p>

              <div className="pt-4 border-t border-text/10 grid grid-cols-2 gap-4 font-mono text-xs">
                <div>
                  <span className="text-muted/60 block mb-1">Medium</span>
                  <span className="text-text">{featuredArtwork.medium}</span>
                </div>
                <div>
                  <span className="text-muted/60 block mb-1">Created</span>
                  <span className="text-text">{featuredArtwork.year}</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Large Feature Image */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              onClick={() => setActiveArtwork(featuredArtwork)}
              className="lg:col-span-7 group cursor-pointer"
            >
              <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] bg-surface overflow-hidden rounded-xs border border-text/10 group-hover:border-primary/30 shadow-lg transition-colors duration-300">
                <Image 
                  src={featuredArtwork.imageSrc} 
                  alt={featuredArtwork.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
                <div className="absolute inset-0 bg-text/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="bg-background/95 text-text font-sans text-xs uppercase tracking-widest px-5 py-2.5 rounded-full shadow-md flex items-center gap-2 font-medium">
                    View Details <ArrowRight className="w-3.5 h-3.5 text-primary" />
                  </span>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-baseline font-sans border-t border-text/10 pt-3">
                <span className="font-serif text-lg md:text-xl text-text group-hover:text-primary transition-colors font-normal">
                  {featuredArtwork.title}
                </span>
                <span className="font-mono text-xs text-muted/60 font-light">
                  {featuredArtwork.medium} • {featuredArtwork.year}
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      {/* Artwork Detail Modal */}
      <AnimatePresence>
        {activeArtwork && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-text/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-8 overflow-y-auto"
            onClick={() => setActiveArtwork(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background border border-border max-w-4xl w-full max-h-[85vh] sm:max-h-[90vh] overflow-y-auto rounded-sm p-4 sm:p-6 md:p-10 shadow-2xl relative flex flex-col md:flex-row gap-6 md:gap-8 my-auto"
            >
              {/* Top-Right Close Button for Modal */}
              <button 
                onClick={() => setActiveArtwork(null)}
                className="absolute top-3 right-3 md:top-4 md:right-4 text-text hover:text-primary p-2 rounded-full bg-background/90 md:bg-transparent border border-border md:border-none shadow-md md:shadow-none transition-colors z-50 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Uncropped Full Artwork Image Frame */}
              <div className="md:w-1/2 relative w-full aspect-[4/5] min-h-[360px] sm:min-h-[440px] md:min-h-[480px] bg-surface/60 overflow-hidden rounded-sm border border-border flex items-center justify-center shrink-0">
                <Image 
                  src={activeArtwork.imageSrc} 
                  alt={activeArtwork.title}
                  fill
                  className="object-contain p-1.5"
                  sizes="(max-width: 768px) 100vw, 500px"
                  priority
                />
              </div>

              {/* Artwork Text & Details Content */}
              <div className="md:w-1/2 flex flex-col justify-between pt-2 md:pt-0">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface text-primary font-sans text-xs font-medium uppercase tracking-wider rounded-full mb-4 border border-border">
                    <Sparkles className="w-3 h-3" />
                    {activeArtwork.commissionStatus}
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-text mb-2 font-normal">{activeArtwork.title}</h2>
                  <div className="font-sans text-sm text-muted mb-4 md:mb-6 flex items-center gap-4">
                    <span>{activeArtwork.medium}</span>
                    <span>•</span>
                    <span>{activeArtwork.year}</span>
                  </div>
                  <p className="font-sans text-text/80 text-sm md:text-base leading-relaxed mb-6 md:mb-8 font-light">
                    {activeArtwork.description}
                  </p>
                </div>

                <div className="border-t border-border pt-5 mt-2 space-y-2.5">
                  <button 
                    onClick={() => handleGetSimilar(activeArtwork)}
                    className="w-full py-3.5 md:py-4 bg-primary text-background font-sans uppercase tracking-widest text-xs md:text-sm font-medium hover:bg-primary/90 transition-colors duration-300 flex items-center justify-center gap-2 shadow-md"
                  >
                    <span>Get Something Similar</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveArtwork(null)}
                    className="w-full py-3 bg-surface text-text font-sans uppercase tracking-widest text-xs font-medium hover:bg-surface/80 transition-colors duration-300 md:hidden flex items-center justify-center gap-1.5 border border-border rounded-xs"
                  >
                    <X className="w-4 h-4 text-primary" />
                    <span>Close View</span>
                  </button>
                  <p className="text-center text-xs text-muted font-sans mt-2">
                    Directs you to the commission form with this piece as reference.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
