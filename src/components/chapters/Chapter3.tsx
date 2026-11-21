"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Dumbbell, ShieldCheck, Swords, Flame, Sparkles } from "lucide-react";
import { sfx } from "@/lib/audio-sfx";

interface DungeonStage {
  id: number;
  image: string;
  floor: string;
  subtitle: string;
  counter: string;
  cropTopWatermark?: boolean;
}

const STAGES: DungeonStage[] = [
  {
    id: 1,
    image: "/assets/03-gym/gym-abandoned.webp",
    floor: "FLOOR 01: RUINS OF INERTIA",
    subtitle: "Cold dust, skipped reps, and uncalibrated efforts.",
    counter: "DUNGEON CLEARED 1/4",
  },
  {
    id: 2,
    image: "/assets/03-gym/gym-wide-day.webp",
    floor: "FLOOR 02: DISCIPLINE'S DAWN",
    subtitle: "Daylight returns. Form over ego. Routine locked in.",
    counter: "DUNGEON CLEARED 2/4",
  },
  {
    id: 3,
    image: "/assets/03-gym/gym-bright-tall.webp",
    floor: "FLOOR 03: IRON SANCTUARY",
    subtitle: "Heavy compound progressive overload. Muscle fibers recruited.",
    counter: "DUNGEON CLEARED 3/4",
  },
  {
    id: 4,
    image: "/assets/03-gym/gym-neon.webp",
    floor: "FLOOR 04: AWAKENED DOMAIN",
    subtitle: "Violet mana ignited. PRs crushed. Full hypertrophy achieved.",
    counter: "DUNGEON CLEARED 4/4 [MASTERED]",
    cropTopWatermark: true,
  },
];

export function Chapter3() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const imagesContainerRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    const pinSection = pinSectionRef.current;
    if (!el || !pinSection) return;

    const mm = gsap.matchMedia();

    // Desktop: Pinned scrubbed crossfade (>= 768px)
    mm.add("(min-width: 768px)", () => {
      const stageImages = gsap.utils.toArray<HTMLElement>(".dungeon-stage-img");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinSection,
          start: "top top",
          end: "+=250%",
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => {
            const index = Math.min(
              STAGES.length - 1,
              Math.floor(self.progress * STAGES.length)
            );
            setActiveStage(index);
          },
        },
      });

      // Crossfade stages 1 -> 2 -> 3 -> 4
      stageImages.forEach((img, i) => {
        if (i > 0) {
          tl.to(
            img,
            {
              opacity: 1,
              duration: 1,
              ease: "power1.inOut",
            },
            `stage-${i}`
          );
        }
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="chapter-3"
      ref={containerRef}
      className="relative w-full bg-[#07060D] border-t border-system-accent/15"
    >
      {/* Dumbbells Divider Texture (Parallax Accent) */}
      <div className="relative w-full h-16 sm:h-20 overflow-hidden opacity-20 pointer-events-none border-b border-system-accent/10">
        <Image
          src="/assets/03-gym/gym-dumbbells.webp"
          alt="Iron Rack Divider"
          fill
          sizes="100vw"
          className="object-cover object-center filter grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07060D] via-transparent to-[#07060D]" />
      </div>

      {/* Main Pinned Stage Container */}
      <div
        ref={pinSectionRef}
        className="w-full min-h-[100svh] flex flex-col justify-between px-4 sm:px-8 py-12 sm:py-16 overflow-hidden relative"
      >
        {/* Header HUD */}
        <div className="relative z-20 w-full max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 bg-system-blue/60 border border-system-accent/30 rounded text-[10px] sm:text-xs font-mono tracking-wider sm:tracking-wideSystem text-system-accent uppercase mb-2 whitespace-nowrap">
              <Swords className="w-3.5 h-3.5 animate-pulse" />
              <span>PHASE 03 // RAIDING THE DUNGEON</span>
            </div>
            <h2 className="font-cinzel text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-wider text-system-text">
              THE GYM IS YOUR DUNGEON.
            </h2>
          </div>

          {/* Interactive Floor Fast-Travel Bar */}
          <div className="flex flex-wrap items-center gap-2">
            {STAGES.map((stg, i) => (
              <button
                key={stg.id}
                onClick={() => {
                  if (i === 3) sfx.playRankUp();
                  else sfx.playClick();
                  setActiveStage(i);
                }}
                onMouseEnter={() => sfx.playHover()}
                className={`px-2.5 sm:px-3 py-1 rounded text-[11px] font-mono tracking-wider uppercase transition-all ${
                  activeStage === i
                    ? "bg-system-accent text-black font-bold shadow-[0_0_15px_rgba(139,92,246,0.8)] scale-105"
                    : "bg-black/50 border border-white/10 text-system-muted hover:border-system-accent/50 hover:text-white"
                }`}
              >
                F0{i + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Centerpiece Visual Canvas (Desktop: Stacked Crossfade; Mobile: Vertical Scroll) */}
        <div className="relative z-10 w-full max-w-6xl mx-auto my-6 sm:my-8 flex-1 flex flex-col justify-center">
          {/* Desktop Stacked Frames (Hidden on Mobile) */}
          <div
            ref={imagesContainerRef}
            className="hidden md:block relative w-full h-[52vh] lg:h-[58vh] rounded-lg overflow-hidden border border-system-accent/30 shadow-system-glow-lg"
          >
            {STAGES.map((stage, idx) => (
              <div
                key={stage.id}
                className={`dungeon-stage-img absolute inset-0 w-full h-full transition-opacity will-change-transform ${
                  idx === 0 ? "opacity-100" : "opacity-0"
                }`}
              >
                <div
                  className={`relative w-full h-full ${
                    stage.cropTopWatermark ? "overflow-hidden" : ""
                  }`}
                >
                  <Image
                    src={stage.image}
                    alt={stage.floor}
                    fill
                    priority={idx === 0}
                    sizes="(max-width: 1440px) 100vw, 1440px"
                    className={`object-cover ${
                      stage.cropTopWatermark
                        ? "object-bottom scale-105" // Crop out top-left watermark cleanly
                        : "object-center"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07060D] via-transparent to-[#07060D]/40 pointer-events-none" />
                </div>
              </div>
            ))}

            {/* Bottom Floating Stage Info Bar */}
            <div className="absolute bottom-6 left-6 right-6 z-30 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 p-4 bg-black/80 backdrop-blur-md border border-system-accent/40 rounded">
              <div>
                <div className="font-orbitron text-base sm:text-lg font-bold text-system-accent uppercase tracking-wider">
                  {STAGES[activeStage].floor}
                </div>
                <div className="font-inter text-xs sm:text-sm text-system-muted">
                  {STAGES[activeStage].subtitle}
                </div>
              </div>
              <div className="flex gap-1.5 items-center">
                {STAGES.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === activeStage
                        ? "w-8 bg-system-accent shadow-[0_0_8px_var(--accent)]"
                        : "w-2 bg-white/20"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Vertical Flow (Rendered < 768px) */}
          <div className="block md:hidden space-y-6 w-full">
            {STAGES.map((stage) => (
              <div
                key={stage.id}
                className="system-window corner-brackets rounded-lg overflow-hidden border border-system-accent/30 shadow-system-glow"
              >
                <div className="relative w-full h-56 overflow-hidden">
                  <Image
                    src={stage.image}
                    alt={stage.floor}
                    fill
                    sizes="100vw"
                    className={`object-cover ${
                      stage.cropTopWatermark
                        ? "object-bottom scale-110"
                        : "object-center"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07060D] via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="p-4 space-y-1">
                  <div className="font-mono text-[10px] text-system-cyan">
                    {stage.counter}
                  </div>
                  <div className="font-orbitron text-sm font-bold text-system-text uppercase">
                    {stage.floor}
                  </div>
                  <div className="font-inter text-xs text-system-muted">
                    {stage.subtitle}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Dungeon Sub-HUD */}
        <div className="relative z-20 w-full max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center text-xs font-mono text-system-muted gap-2 pt-2 border-t border-system-accent/15">
          <div className="flex items-center gap-2">
            <Dumbbell className="w-3.5 h-3.5 text-system-accent" />
            <span>LOOT REWARDS: HYPERTROPHY // LEAN TISSUE // HUNTER XP</span>
          </div>
          <div className="text-[11px] text-system-accent/80 tracking-wider">
            [ PROGRESSION SCALED TO INDIAN NUTRITION PROFILES ]
          </div>
        </div>
      </div>
    </section>
  );
}
