"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { CheckCircle2, Flame, Sparkles, Trophy, Zap } from "lucide-react";
import { DecodeText } from "@/components/ui/DecodeText";
import { BladeSliceHeading } from "@/components/ui/BladeSliceHeading";
import { AnimeTiltCard } from "@/components/ui/AnimeTiltCard";
import { CartenonCommandments } from "@/components/ui/CartenonCommandments";
import { GymBagLoadout } from "@/components/ui/GymBagLoadout";
import { sfx } from "@/lib/audio-sfx";

export function Chapter2() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinTargetRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const grinAuraRef = useRef<HTMLDivElement>(null);
  const questBoxRef = useRef<HTMLDivElement>(null);
  const questRow1Ref = useRef<HTMLDivElement>(null);
  const questRow2Ref = useRef<HTMLDivElement>(null);
  const questRow3Ref = useRef<HTMLDivElement>(null);
  const xpBarRef = useRef<HTMLDivElement>(null);
  const hpBarRef = useRef<HTMLDivElement>(null);

  const [typedTitle, setTypedTitle] = useState("");
  const [showPotential, setShowPotential] = useState(false);
  const [activeVisual, setActiveVisual] = useState(0);
  const [templeReverence, setTempleReverence] = useState(false);
  const [claimedReward, setClaimedReward] = useState(false);
  const [cartenonTab, setCartenonTab] = useState<'commandments' | 'edc'>('commandments');
  const [mobileTab, setMobileTab] = useState<'entity' | 'quest' | 'commandments'>('entity');
  const fullTitle = "DAILY QUEST: PREPARATION FOR STRENGTH";

  const triggerReverence = () => {
    sfx.playDemonRoar();
    setTempleReverence(true);
    setTimeout(() => setTempleReverence(false), 800);
  };

  const claimAwakeningXP = () => {
    if (claimedReward) return;
    sfx.playRankUp();
    setClaimedReward(true);
  };

  useEffect(() => {
    const el = containerRef.current;
    const pinTarget = pinTargetRef.current;
    if (!el || !pinTarget) return;

    const mm = gsap.matchMedia();

    // Desktop: Pinned Scrubbed Choreography (>= 768px)
    mm.add("(min-width: 768px)", () => {
      setTypedTitle(fullTitle);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinTarget,
          start: "top top",
          end: "+=160%",
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      // 1. Entity scales in slowly from behind
      tl.fromTo(
        visualRef.current,
        { scale: 0.95, opacity: 0.9 },
        { scale: 1.08, opacity: 1, ease: "power1.out", duration: 1 }
      )
        // Red / purple eye aura pulses
        .to(
          grinAuraRef.current,
          { opacity: 0.9, scale: 1.15, ease: "sine.inOut", duration: 0.5 },
          "<0.2"
        )
        // 2. System Quest Window highlights and pulses
        .fromTo(
          questBoxRef.current,
          { y: 20, opacity: 0.85, scale: 0.98 },
          { y: 0, opacity: 1, scale: 1, ease: "power2.out", duration: 0.8 },
          "<"
        )
        // 3. Quest rows slide and glow sequentially
        .fromTo(
          [questRow1Ref.current, questRow2Ref.current, questRow3Ref.current],
          { x: 20, opacity: 0.7 },
          { x: 0, opacity: 1, stagger: 0.25, ease: "power2.out" },
          "-=0.4"
        )
        // 4. XP and HP fill with scrub
        .fromTo(
          xpBarRef.current,
          { width: "20%" },
          { width: "78%", ease: "power1.inOut", duration: 0.8 },
          "-=0.2"
        )
        .fromTo(
          hpBarRef.current,
          { width: "50%" },
          { width: "100%", ease: "power1.inOut", duration: 0.6 },
          "<"
        );
    });

    // Mobile: Unpinned Natural Flow (< 768px)
    mm.add("(max-width: 767px)", () => {
      setTypedTitle(fullTitle);

      gsap.from(visualRef.current, {
        scrollTrigger: {
          trigger: visualRef.current,
          start: "top 80%",
        },
        scale: 0.95,
        opacity: 0.5,
        duration: 0.8,
        ease: "power2.out",
      });

      gsap.from(questBoxRef.current, {
        scrollTrigger: {
          trigger: questBoxRef.current,
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });

      gsap.fromTo(
        xpBarRef.current,
        { width: "0%" },
        {
          width: "78%",
          duration: 1.2,
          scrollTrigger: {
            trigger: questBoxRef.current,
            start: "top 80%",
          },
        }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="chapter-2"
      ref={containerRef}
      className="relative w-full bg-[#07060D] overflow-hidden"
    >
      {/* Seamless Volumetric Fog Portal Transition from Chapter 1 */}
      <div className="absolute top-0 inset-x-0 h-36 bg-gradient-to-b from-[#07060D] via-[#07060D]/80 to-transparent pointer-events-none z-20" />

      <div
        ref={pinTargetRef}
        className="w-full min-h-[100svh] flex flex-col justify-center items-center px-4 sm:px-8 py-16 sm:py-20 overflow-hidden"
      >
        {/* Subtle Background Glow */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-25">
          <div className="w-[600px] h-[600px] rounded-full bg-system-accent/20 blur-[140px]" />
        </div>

        {/* Section Heading Badge */}
        <div className="relative z-10 w-full max-w-6xl mb-8 flex flex-col items-center text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-system-blue/40 border border-system-accent/30 rounded text-xs font-mono tracking-wideSystem text-system-accent uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span><DecodeText text="PHASE 02 // INITIATION" /></span>
          </div>
          <BladeSliceHeading
            as="h2"
            accentText="THE AWAKENING."
            className="font-cinzel text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-wider text-system-text"
          >
            THE SYSTEM CHOSE YOU.
          </BladeSliceHeading>
          <p className="font-inter text-xs sm:text-sm text-system-muted max-w-lg">
            Fitness is no longer a chore. It is an algorithmic RPG designed to level your real-world physiology.
          </p>
        </div>

        {/* Mobile Segmented Module Switcher */}
        <div className="flex md:hidden items-center justify-center gap-1.5 p-1 bg-black/60 border border-system-accent/20 rounded-xl mb-6 font-mono text-xs w-full max-w-md mx-auto relative z-20">
          <button
            onClick={() => {
              sfx.playClick();
              setMobileTab('entity');
            }}
            className={`flex-1 py-2 rounded-lg font-bold transition-all text-center ${
              mobileTab === 'entity'
                ? 'bg-red-600 text-white shadow-[0_0_12px_rgba(239,68,68,0.5)]'
                : 'text-system-muted hover:text-white'
            }`}
          >
            🗿 ENTITY
          </button>
          <button
            onClick={() => {
              sfx.playClick();
              setMobileTab('quest');
            }}
            className={`flex-1 py-2 rounded-lg font-bold transition-all text-center ${
              mobileTab === 'quest'
                ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(139,92,246,0.5)]'
                : 'text-system-muted hover:text-white'
            }`}
          >
            📜 QUESTS
          </button>
          <button
            onClick={() => {
              sfx.playClick();
              setMobileTab('commandments');
            }}
            className={`flex-1 py-2 rounded-lg font-bold transition-all text-center ${
              mobileTab === 'commandments'
                ? 'bg-cyan-600 text-white shadow-[0_0_12px_rgba(6,182,212,0.5)]'
                : 'text-system-muted hover:text-white'
            }`}
          >
            ⚔️ COMMANDS
          </button>
        </div>

        {/* Dual-Column Interactive Composition */}
        <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left: Interactive Visual Stage with 3 Iconic Anime States Wrapped in 3D AnimeTiltCard */}
          <div className={`md:col-span-6 flex flex-col justify-center items-center relative space-y-3 ${mobileTab === 'entity' ? 'flex' : 'hidden md:flex'}`}>
            <AnimeTiltCard
              maxTilt={10}
              glowColor={activeVisual === 0 || activeVisual === 2 ? "rgba(239, 68, 68, 0.4)" : "rgba(56, 189, 248, 0.4)"}
              className="w-full flex justify-center"
            >
              <div
                ref={visualRef}
                className={`relative w-full max-w-[480px] h-[360px] sm:h-[520px] md:h-[620px] rounded-lg overflow-hidden border border-system-accent/40 shadow-system-glow will-change-transform group cursor-pointer transition-transform duration-200 ${
                  templeReverence ? "scale-95 ring-4 ring-red-600 animate-pulse" : ""
                }`}
                onClick={() => {
                  sfx.playClick();
                  setActiveVisual((prev) => (prev + 1) % 3);
                }}
              >
              {/* State 0: The Terrifying Cartenon Temple God Grin */}
              <div
                className={`absolute inset-0 transition-opacity duration-700 ${
                  activeVisual === 0 ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <Image
                  src="/assets/02-system/system-grin.webp"
                  alt="Cartenon Temple System Entity Grin and Glowing Eyes"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 480px"
                  className="object-cover object-[center_60%] filter contrast-125 brightness-110"
                />
                
                {/* Ancient Temple Commandments Top Banner */}
                <div className="absolute top-3 inset-x-3 z-20 flex justify-between items-center text-[9px] font-mono bg-black/85 border border-red-500/40 px-3 py-1.5 rounded text-red-400">
                  <span>COMMANDMENT I: REVERE THE LORD</span>
                  <span className="text-white/60">TEMPLE 0-0</span>
                </div>

                {/* Glowing Crimson Eyes Flare */}
                <div className="absolute top-[58%] left-[48%] -translate-x-1/2 -translate-y-1/2 flex gap-12 z-20 pointer-events-none">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_20px_rgba(239,68,68,1)] animate-ping" />
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_20px_rgba(239,68,68,1)] animate-ping" />
                </div>
                <div
                  ref={grinAuraRef}
                  className="absolute inset-0 bg-radial-gradient from-red-600/35 via-system-accent/20 to-transparent opacity-60 pointer-events-none mix-blend-color-dodge z-10 animate-pulse"
                />

                {/* Reverence Trigger Button */}
                <div className="absolute bottom-12 inset-x-4 z-20 flex justify-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      triggerReverence();
                    }}
                    className="px-4 py-1.5 bg-red-950/80 hover:bg-red-700 border border-red-500 text-white font-mono text-[10px] uppercase font-bold tracking-widest rounded shadow-[0_0_15px_rgba(239,68,68,0.7)] transition-all cursor-pointer active:scale-95"
                  >
                    [ BOW BEFORE THE STATUE ]
                  </button>
                </div>
              </div>

              {/* State 1: Weak Hunter Facing the Looming Blue System Window */}
              <div
                className={`absolute inset-0 transition-opacity duration-700 ${
                  activeVisual === 1 ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <Image
                  src="/assets/02-system/weak-meets-system.webp"
                  alt="Weak Hunter Accepts System Pact"
                  fill
                  sizes="(max-width: 768px) 100vw, 480px"
                  className="object-cover object-[center_42%] filter contrast-120 brightness-110"
                />
                <div className="absolute inset-0 bg-radial-gradient from-system-cyan/30 via-system-accent/20 to-transparent opacity-50 pointer-events-none mix-blend-screen z-10" />
              </div>

              {/* State 2: Berserk S-Rank Anatomy with Glowing Brand of Sacrifice */}
              <div
                className={`absolute inset-0 transition-opacity duration-700 ${
                  activeVisual === 2 ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <Image
                  src="/assets/06-enemies/berserk-physique-brand.webp"
                  alt="Berserk Sacrificial Rune Muscular Anatomy"
                  fill
                  sizes="(max-width: 768px) 100vw, 480px"
                  className="object-cover object-[center_50%] filter contrast-130 brightness-110"
                />
                {/* Brand of Sacrifice Crimson Glow */}
                <div className="absolute top-[28%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                  <span className="block w-4 h-4 rounded-full bg-red-600 blur-[8px] animate-pulse" />
                </div>
                <div className="absolute inset-0 bg-radial-gradient from-red-600/40 via-red-950/30 to-transparent opacity-70 pointer-events-none mix-blend-color-dodge z-10 animate-pulse" />
              </div>

              {/* Seamless Bottom Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#07060D] via-transparent to-transparent pointer-events-none" />

              {/* Bottom Interactive HUD Status Bar */}
              <div className="absolute bottom-3 left-3 right-3 z-20 font-mono text-[10px] sm:text-[11px] flex justify-between items-center text-system-cyan bg-black/85 px-2.5 sm:px-3 py-1.5 border border-system-cyan/40 rounded backdrop-blur-sm">
                <span className="truncate">
                  {activeVisual === 0 && "[ ENTITY VISAGE: CARTENON GOD GRIN ]"}
                  {activeVisual === 1 && "[ HUNTER CONTRACT: WINDOW OF AWAKENING ]"}
                  {activeVisual === 2 && "[ SACRIFICIAL ANATOMY: BERSERK BRAND ]"}
                </span>
                <span className="text-[9px] sm:text-[10px] text-system-muted font-normal underline shrink-0 ml-2">
                  TAP TO CYCLE
                </span>
              </div>
            </div>
            </AnimeTiltCard>

            {/* Visual State Selectors */}
            <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-[11px]">
              <button
                onClick={() => {
                  sfx.playClick();
                  setActiveVisual(0);
                }}
                onMouseEnter={() => sfx.playHover()}
                className={`px-2.5 py-1 rounded-sm border transition-all ${
                  activeVisual === 0
                    ? "bg-red-950/60 border-red-500 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                    : "bg-black/40 border-white/10 text-system-muted hover:text-white"
                }`}
              >
                [ GOD GRIN ]
              </button>
              <button
                onClick={() => {
                  sfx.playClick();
                  setActiveVisual(1);
                }}
                onMouseEnter={() => sfx.playHover()}
                className={`px-2.5 py-1 rounded-sm border transition-all ${
                  activeVisual === 1
                    ? "bg-system-cyan/20 border-system-cyan text-system-cyan shadow-system-glow"
                    : "bg-black/40 border-white/10 text-system-muted hover:text-white"
                }`}
              >
                [ PACT WINDOW ]
              </button>
              <button
                onClick={() => {
                  sfx.playRankAscent();
                  setActiveVisual(2);
                }}
                onMouseEnter={() => sfx.playHover()}
                className={`px-2.5 py-1 rounded-sm border transition-all ${
                  activeVisual === 2
                    ? "bg-red-950/60 border-red-500 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                    : "bg-black/40 border-white/10 text-system-muted hover:text-red-400"
                }`}
              >
                [ BERSERK BRAND ]
              </button>
            </div>
          </div>

          {/* Right: Live Interactive HTML System Window with 3D AnimeTiltCard */}
          <div className={`md:col-span-6 w-full flex justify-center ${mobileTab === 'quest' ? 'flex' : 'hidden md:flex'}`}>
            <AnimeTiltCard
              maxTilt={8}
              glowColor="rgba(139, 92, 246, 0.35)"
              className="w-full flex justify-center"
            >
              <div
                ref={questBoxRef}
                className="w-full max-w-[480px] system-window corner-brackets corner-brackets-full p-6 sm:p-7 rounded-sm shadow-system-glow space-y-5"
              >
              {/* Decorative Corner Brackets (TR & BL) */}
              <span className="bracket-tr" />
              <span className="bracket-bl" />

              {/* System Header with Claimable XP Badge */}
              <div className="flex items-center justify-between border-b border-system-accent/30 pb-3">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-system-accent animate-pulse" />
                  <span className="font-orbitron text-xs sm:text-sm font-bold tracking-wideSystem text-system-accent uppercase">
                    QUEST LOG // AWAKENING
                  </span>
                </div>
                <button
                  onClick={claimAwakeningXP}
                  disabled={claimedReward}
                  className={`font-mono text-[10px] px-2.5 py-1 rounded transition-all cursor-pointer ${
                    claimedReward
                      ? "bg-emerald-950/60 border border-emerald-500 text-emerald-300 font-bold"
                      : "bg-system-gold/20 border border-system-gold/50 text-system-gold hover:bg-system-gold hover:text-black font-bold animate-pulse shadow-[0_0_10px_rgba(245,197,66,0.4)]"
                  }`}
                >
                  {claimedReward ? "[ XP CLAIMED! ]" : "[ CLAIM +250 EXP ]"}
                </button>
              </div>

              {/* Typewriter Quest Title */}
              <div className="min-h-[28px] flex items-center">
                <h3 className="font-orbitron text-sm sm:text-base font-bold text-system-text uppercase tracking-wide">
                  {typedTitle}
                  <span className="inline-block w-2 h-4 ml-1 bg-system-accent animate-pulse" />
                </h3>
              </div>

              {/* Quest Rows */}
              <div className="space-y-3 font-mono text-xs sm:text-sm">
                {/* Quest 1 */}
                <div
                  ref={questRow1Ref}
                  className="p-3 bg-black/40 border border-system-accent/25 rounded flex items-center justify-between gap-3 hover:border-system-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-system-accent shrink-0" />
                    <div>
                      <div className="text-system-text font-semibold">
                        Ingest 150g Protein
                      </div>
                      <div className="text-[11px] text-system-muted">
                        Paneer, Soya, Chicken, Whey
                      </div>
                    </div>
                  </div>
                  <span className="text-system-accent font-bold shrink-0">
                    150/150g
                  </span>
                </div>

                {/* Quest 2 */}
                <div
                  ref={questRow2Ref}
                  className="p-3 bg-black/40 border border-system-accent/25 rounded flex items-center justify-between gap-3 hover:border-system-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-system-accent shrink-0" />
                    <div>
                      <div className="text-system-text font-semibold">
                        Log 3 Whole Meals
                      </div>
                      <div className="text-[11px] text-system-muted">
                        Food Grimoire Scanner
                      </div>
                    </div>
                  </div>
                  <span className="text-system-accent font-bold shrink-0">
                    3/3 Done
                  </span>
                </div>

                {/* Quest 3 */}
                <div
                  ref={questRow3Ref}
                  className="p-3 bg-black/40 border border-system-accent/25 rounded flex items-center justify-between gap-3 hover:border-system-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Zap className="w-4 h-4 text-system-gold shrink-0 animate-bounce" />
                    <div>
                      <div className="text-system-text font-semibold">
                        Clear Dungeon Session
                      </div>
                      <div className="text-[11px] text-system-muted">
                        Iron Progressive Overload
                      </div>
                    </div>
                  </div>
                  <span className="text-system-gold font-bold shrink-0">
                    COMPLETED
                  </span>
                </div>
              </div>

              {/* Progress Bars (XP & Stamina) */}
              <div className="pt-2 border-t border-system-accent/20 space-y-3 font-mono text-xs">
                {/* XP Gauge */}
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-system-muted flex items-center gap-1">
                      <Trophy className="w-3 h-3 text-system-gold" />
                      XP PROGRESS
                    </span>
                    <span className="text-system-accent font-bold">
                      {claimedReward ? "2,200 / 2,500 XP" : "1,950 / 2,500 XP"}
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-black/60 rounded-full overflow-hidden border border-system-accent/30">
                    <div
                      ref={xpBarRef}
                      className="h-full bg-gradient-to-r from-system-cyan via-system-accent to-purple-400 rounded-full shadow-[0_0_12px_rgba(139,92,246,0.6)] transition-all duration-500"
                      style={{ width: claimedReward ? "88%" : "78%" }}
                    />
                  </div>
                </div>

                {/* HP Gauge */}
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-system-muted">STAMINA RECOVERY</span>
                    <span className="text-green-400 font-bold">100%</span>
                  </div>
                  <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden border border-green-500/30">
                    <div
                      ref={hpBarRef}
                      className="h-full bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
              </div>

              {/* Footer Note */}
              <div className="text-center pt-1 font-mono text-[10px] text-system-muted/80 tracking-widest uppercase">
                [ COMPLETE DAILY QUESTS TO TRIGGER RANK AWAKENING ]
              </div>
            </div>
            </AnimeTiltCard>
          </div>
        </div>

        {/* Cartenon Temple Awakening & EDC Gear Terminal */}
        <div className={`w-full max-w-6xl mx-auto mt-10 relative z-10 font-mono ${mobileTab === 'commandments' ? 'block' : 'hidden md:block'}`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-system-accent/25 pb-3 mb-6 gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-red-300">
                [ CARTENON SANCTUARY TRIAL & EDC GEAR MATRIX ]
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  sfx.playClick();
                  setCartenonTab('commandments');
                }}
                onMouseEnter={() => sfx.playHover()}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                  cartenonTab === 'commandments'
                    ? 'bg-red-600 text-white border-red-400 shadow-[0_0_15px_rgba(239,68,68,0.4)]'
                    : 'bg-black/50 border-white/10 text-gray-400 hover:text-white hover:border-red-500/30'
                }`}
              >
                📜 3 IRON COMMANDMENTS
              </button>

              <button
                onClick={() => {
                  sfx.playClick();
                  setCartenonTab('edc');
                }}
                onMouseEnter={() => sfx.playHover()}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                  cartenonTab === 'edc'
                    ? 'bg-cyan-600 text-white border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                    : 'bg-black/50 border-white/10 text-gray-400 hover:text-white hover:border-cyan-500/30'
                }`}
              >
                🎒 EDC GYM BAG LOADOUT
              </button>
            </div>
          </div>

          {/* Active Module View */}
          <div className="w-full">
            {cartenonTab === 'commandments' && <CartenonCommandments />}
            {cartenonTab === 'edc' && <GymBagLoadout />}
          </div>
        </div>
      </div>
    </section>
  );
}
