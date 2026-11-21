"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { ChevronDown, Shield, Eye } from "lucide-react";
import { DecodeText } from "@/components/ui/DecodeText";
import { GlitchHeading } from "@/components/ui/GlitchHeading";
import { sfx } from "@/lib/audio-sfx";

export function Chapter1() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const hunterRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Background abandoned gym slow parallax
      gsap.to(bgRef.current, {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Hunter character scales and emerges
      gsap.fromTo(
        hunterRef.current,
        { scale: 0.95, y: 10 },
        {
          scale: 1.05,
          y: 40,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // Headline fade out as user scrolls down
      gsap.to(headlineRef.current, {
        y: -50,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "20% top",
          end: "65% top",
          scrub: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="chapter-1"
      ref={containerRef}
      className="relative min-h-[100svh] w-full flex flex-col justify-between items-center px-4 sm:px-8 pt-20 pb-8 sm:pt-24 sm:pb-12 overflow-hidden bg-[#07060D]"
    >
      {/* 1. Abandoned Ruined Gym Background Texture */}
      <div
        ref={bgRef}
        className="absolute inset-0 pointer-events-none opacity-20 grayscale mix-blend-luminosity will-change-transform"
      >
        <Image
          src="/assets/03-gym/gym-abandoned.webp"
          alt="Ruined Training Grounds"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* 2. Cold Desaturated Blue Dungeon Atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(14, 165, 233, 0.25) 0%, rgba(11, 26, 51, 0.6) 45%, #07060D 90%)",
        }}
      />

      {/* 3. Top Chapter Status HUD */}
      <div className="relative z-10 w-full max-w-6xl flex justify-between items-center text-xs font-mono tracking-widest text-system-muted">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-system-cyan animate-pulse shadow-[0_0_12px_rgba(56,189,248,0.9)]" />
          <span className="font-orbitron text-system-cyan uppercase font-bold text-xs sm:text-sm">
            <DecodeText text="CHAPTER 01 // COLD REALITY" />
          </span>
        </div>
        <div
          onMouseEnter={() => sfx.playHover()}
          className="flex items-center gap-2 border border-system-cyan/40 px-3.5 py-1.5 rounded bg-black/60 shadow-[0_0_15px_rgba(56,189,248,0.2)] cursor-default"
        >
          <Shield className="w-4 h-4 text-system-cyan" />
          <span className="text-system-cyan font-bold">STATUS: RANK E [UNAWAKENED]</span>
        </div>
      </div>

      {/* 4. Main Narrative & Large Centered Hunter Character */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center justify-center my-auto text-center space-y-6">
        
        {/* Headline */}
        <div ref={headlineRef} className="space-y-3 sm:space-y-4 max-w-3xl">
          <div className="inline-block px-3.5 py-1 bg-system-blue/70 border border-system-cyan/40 rounded text-[11px] sm:text-xs font-mono tracking-wideSystem text-system-cyan uppercase shadow-lg">
            [ ARCHIVE LOG: DAY ZERO // BEFORE THE SYSTEM ]
          </div>
          <GlitchHeading as="h1" className="font-cinzel text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-wide text-system-text leading-tight sm:leading-none">
            THIS IS YOU. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-system-cyan via-blue-200 to-indigo-300 drop-shadow-[0_0_30px_rgba(56,189,248,0.6)]">
              RANK E.
            </span>
          </GlitchHeading>
          <p className="font-inter text-sm sm:text-base md:text-lg text-system-muted max-w-xl mx-auto leading-relaxed">
            Unawakened. Wounded. Carrying the weight of skipped meals, low protein, and the doubt that you were never meant to be strong.
          </p>
        </div>

        {/* Hero Hunter Cutout - High Impact & Visible Facial Expression */}
        <div
          ref={hunterRef}
          className="relative w-[300px] h-[460px] sm:w-[380px] sm:h-[560px] md:w-[440px] md:h-[640px] will-change-transform select-none"
        >
          {/* Intense Backlight Behind Character */}
          <div className="absolute inset-x-8 top-12 bottom-12 bg-system-cyan/30 rounded-full blur-[80px] pointer-events-none -z-10" />

          {/* Glowing Eye Glint Effect */}
          <div className="absolute top-[38%] left-[49%] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
            <span className="block w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(56,189,248,1)] animate-ping" />
          </div>

          {/* Hunter Image (Focal point aligned to Y=35% so face is crystal clear) */}
          <div className="relative w-full h-full">
            <Image
              src="/assets/01-weak/weak-hunter.webp"
              alt="Weak Hunter Looking Forward"
              fill
              priority
              sizes="(max-width: 768px) 380px, 440px"
              className="object-cover object-[center_35%] filter brightness-110 contrast-120 drop-shadow-[0_10px_40px_rgba(0,0,0,0.9)]"
            />
            {/* Seamless Bottom Vignette so character melts into the dungeon floor */}
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#07060D] via-[#07060D]/80 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>

      {/* 5. Bottom Scroll Prompt */}
      <div
        onMouseEnter={() => sfx.playHover()}
        className="relative z-10 flex flex-col items-center gap-2 text-system-muted font-mono text-xs tracking-wideSystem cursor-pointer group"
      >
        <span className="uppercase text-system-cyan font-semibold group-hover:tracking-widest transition-all">
          [ SCROLL TO RECEIVE ASSIGNMENT ]
        </span>
        <ChevronDown className="w-4 h-4 animate-bounce text-system-cyan" />
      </div>
    </section>
  );
}
