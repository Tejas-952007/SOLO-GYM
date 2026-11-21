"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ChevronDown, Shield } from "lucide-react";

export function Chapter1() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const hunterRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Parallax on background ruined gym
      gsap.to(bgRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Subtle hunter retreat & scale
      gsap.to(hunterRef.current, {
        y: 40,
        scale: 0.92,
        opacity: 0.8,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Headline fade out as user scrolls
      gsap.to(headlineRef.current, {
        y: -60,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "15% top",
          end: "60% top",
          scrub: true,
        },
      });

      // Vignette closes in as emptiness tightens
      gsap.to(vignetteRef.current, {
        opacity: 0.95,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
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
      className="relative min-h-[100svh] w-full flex flex-col justify-between items-center px-4 sm:px-8 pt-20 pb-8 sm:pt-24 sm:pb-10 overflow-hidden bg-[#07060D]"
    >
      {/* Abandoned Gym Background Texture (15% opacity, desaturated) */}
      <div
        ref={bgRef}
        className="absolute inset-0 pointer-events-none opacity-15 grayscale mix-blend-luminosity will-change-transform"
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

      {/* Dynamic Vignette (Cold desaturated blue atmosphere) */}
      <div
        ref={vignetteRef}
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(11, 26, 51, 0.45) 0%, rgba(7, 6, 13, 0.85) 60%, rgba(7, 6, 13, 0.98) 100%)",
        }}
      />

      {/* Top Chapter Status HUD */}
      <div className="relative z-10 w-full max-w-6xl flex justify-between items-center text-xs font-mono tracking-widest text-system-muted">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-system-cyan" />
          <span className="font-orbitron text-system-cyan uppercase font-semibold">
            PHASE 01 // ORIGIN
          </span>
        </div>
        <div className="flex items-center gap-2 border border-system-cyan/30 px-3 py-1 rounded bg-black/40">
          <Shield className="w-3.5 h-3.5 text-system-cyan" />
          <span>STATUS: RANK E</span>
        </div>
      </div>

      {/* Main Narrative & Weak Hunter Composition */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center justify-center my-auto text-center space-y-6 sm:space-y-8">
        {/* Headline */}
        <div ref={headlineRef} className="space-y-3 sm:space-y-4 max-w-3xl">
          <div className="inline-block px-3 py-1 bg-system-blue/60 border border-system-cyan/30 rounded text-[11px] sm:text-xs font-mono tracking-wideSystem text-system-cyan uppercase">
            [ ARCHIVE LOG: DAY ZERO ]
          </div>
          <h1 className="font-cinzel text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-wide text-system-text leading-tight sm:leading-none">
            THIS IS YOU. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-system-cyan via-blue-200 to-indigo-300">
              RANK E.
            </span>
          </h1>
          <p className="font-inter text-sm sm:text-base md:text-lg text-system-muted max-w-xl mx-auto leading-relaxed">
            Unawakened. Carrying the weight of skipped meals, low protein, and the belief that genetics decided your ceiling.
          </p>
        </div>

        {/* Weak Hunter Cutout with soft gradient mask and cold aura */}
        <div
          ref={hunterRef}
          className="relative w-[240px] h-[320px] sm:w-[280px] sm:h-[380px] md:w-[320px] md:h-[420px] will-change-transform select-none"
        >
          {/* Cold Blue Atmospheric Backlight */}
          <div className="absolute inset-0 bg-system-cyan/15 rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="relative w-full h-full mask-radial">
            <Image
              src="/assets/01-weak/weak-hunter.webp"
              alt="Weak Hunter Standing in Shadows"
              fill
              priority
              sizes="(max-width: 768px) 280px, 420px"
              className="object-contain object-top filter brightness-110 contrast-115 drop-shadow-[0_0_30px_rgba(56,189,248,0.4)]"
            />
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="relative z-10 flex flex-col items-center gap-2 text-system-muted/70 font-mono text-xs tracking-wideSystem">
        <span className="uppercase">[ SCROLL TO AWAKEN ]</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-system-cyan" />
      </div>
    </section>
  );
}
