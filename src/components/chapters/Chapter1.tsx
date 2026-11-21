"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { Shield, ChevronDown, CheckCircle2, Circle, Flame, Sparkles, Award } from "lucide-react";
import { DecodeText } from "@/components/ui/DecodeText";
import { GlitchHeading } from "@/components/ui/GlitchHeading";
import { sfx } from "@/lib/audio-sfx";

export function Chapter1() {
  const containerRef = useRef<HTMLDivElement>(null);
  const hunterRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  // Interactive Daily Quest Checklist in Hero
  const [completedQuests, setCompletedQuests] = useState<Record<number, boolean>>({});
  const [bonusXP, setBonusXP] = useState(0);

  const toggleQuest = (id: number, xpValue: number) => {
    setCompletedQuests((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      if (!prev[id]) {
        sfx.playChirp();
        setBonusXP((xp) => xp + xpValue);
      } else {
        sfx.playClick();
        setBonusXP((xp) => Math.max(0, xp - xpValue));
      }
      return next;
    });
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Background abandoned gym slow parallax
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

      // Character gentle float and scale on scroll
      gsap.fromTo(
        hunterRef.current,
        { scale: 0.98, y: 0 },
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
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="chapter-1"
      ref={containerRef}
      className="relative min-h-[100svh] w-full flex flex-col justify-between items-center px-4 sm:px-8 lg:px-12 pt-20 pb-10 sm:pt-24 sm:pb-14 overflow-hidden bg-[#07060D]"
    >
      {/* 1. Abandoned Ruined Gym Background Texture */}
      <div
        ref={bgRef}
        className="absolute inset-0 pointer-events-none opacity-25 grayscale mix-blend-luminosity will-change-transform"
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

      {/* 2. Cold Eerie Dungeon Atmosphere Radial Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 25%, rgba(14, 165, 233, 0.22) 0%, rgba(11, 26, 51, 0.65) 50%, #07060D 95%)",
        }}
      />

      {/* 3. Top Chapter Status HUD */}
      <div className="relative z-10 w-full max-w-7xl flex justify-between items-center text-xs font-mono tracking-widest text-system-muted mb-6">
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
          <span className="text-system-cyan font-bold tracking-wider">RANK E // UNAWAKENED</span>
        </div>
      </div>

      {/* 4. Cinematic Two-Column Anime Stage (Desktop) / Layered Responsive Stage (Mobile) */}
      <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
        
        {/* Left Column: Gothic Solo Leveling Title & Story Narrative */}
        <div ref={leftColRef} className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
          
          {/* System Protocol Tag */}
          <div className="flex items-center gap-2.5 px-3 py-1 bg-black/70 border border-system-cyan/40 rounded text-[11px] sm:text-xs font-mono text-system-cyan uppercase tracking-widest shadow-[0_0_15px_rgba(56,189,248,0.25)]">
            <Flame className="w-3.5 h-3.5 text-system-cyan animate-pulse" />
            <span>[ SYSTEM NOTICE // AWAKENING PROTOCOL 00 ]</span>
          </div>

          {/* Gothic Solo Leveling Calligraphy Art Overlay */}
          <div className="relative w-full max-w-[320px] sm:max-w-[420px] h-20 sm:h-24 -mb-2">
            <Image
              src="/assets/logo/solo-leveling-gothic-title.png"
              alt="Solo Leveling Gothic Calligraphy Title"
              fill
              priority
              className="object-contain object-left filter drop-shadow-[0_0_20px_rgba(139,92,246,0.85)] brightness-125"
            />
          </div>

          {/* Main Hero Glitch Title */}
          <div className="space-y-2">
            <GlitchHeading as="h1" className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-system-text leading-none">
              THIS IS YOU. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-system-cyan via-white to-purple-400 drop-shadow-[0_0_35px_rgba(56,189,248,0.7)]">
                RANK E.
              </span>
            </GlitchHeading>
            <p className="font-inter text-sm sm:text-base md:text-lg text-system-muted max-w-xl leading-relaxed pt-2">
              The weakest hunter of mankind. Bruised physique, skipped meals, zero discipline. The gym felt like an impossible dungeon. But today, the System chooses you.
            </p>
          </div>

          {/* Interactive System Quest Card (Simulating App Gameplay) */}
          <div className="w-full max-w-lg p-4 sm:p-5 rounded-xl border border-system-cyan/30 bg-[#0B1021]/80 backdrop-blur-md shadow-[0_0_25px_rgba(14,165,233,0.15)] space-y-3.5">
            <div className="flex justify-between items-center text-xs font-mono text-system-cyan border-b border-system-cyan/20 pb-2">
              <span className="flex items-center gap-2 font-bold tracking-wider">
                <Sparkles className="w-4 h-4 text-system-cyan" />
                DAILY QUEST: SURVIVAL CALIBRATION
              </span>
              <span className="text-yellow-400 font-bold">XP: +{bonusXP}/500</span>
            </div>

            <div className="space-y-2">
              {[
                { id: 1, label: "100 Pushups (Or to failure)", xp: 150 },
                { id: 2, label: "140g High-Protein Intake (Paneer/Soya/Eggs)", xp: 200 },
                { id: 3, label: "Enter Iron Dungeon (No excuses)", xp: 150 },
              ].map((quest) => (
                <button
                  key={quest.id}
                  onClick={() => toggleQuest(quest.id, quest.xp)}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded text-left text-xs font-mono transition-all ${
                    completedQuests[quest.id]
                      ? "bg-system-cyan/20 border border-system-cyan/60 text-white shadow-[0_0_12px_rgba(56,189,248,0.4)]"
                      : "bg-black/40 border border-white/10 text-system-muted hover:border-system-cyan/40 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    {completedQuests[quest.id] ? (
                      <CheckCircle2 className="w-4 h-4 text-system-cyan shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-system-muted shrink-0" />
                    )}
                    <span className={completedQuests[quest.id] ? "line-through opacity-80" : ""}>
                      {quest.label}
                    </span>
                  </span>
                  <span className="text-yellow-400/90 text-[10px] shrink-0 font-bold">+{quest.xp} XP</span>
                </button>
              ))}
            </div>

            <div className="pt-1 flex items-center justify-between text-[11px] font-mono text-system-muted">
              <span>PENALTY ZONE: 4-HOUR RUN IN THE DESERT</span>
              <span className="text-system-cyan font-bold">STATUS: {bonusXP > 0 ? "PROGRESSING" : "PENDING"}</span>
            </div>
          </div>

          {/* Interactive CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#chapter-2"
              onClick={() => sfx.playRankUp()}
              className="px-6 py-3 rounded bg-gradient-to-r from-system-cyan via-blue-500 to-system-accent text-black font-orbitron font-bold text-xs sm:text-sm tracking-widest uppercase shadow-[0_0_30px_rgba(56,189,248,0.7)] hover:shadow-[0_0_45px_rgba(139,92,246,0.9)] hover:scale-105 active:scale-95 transition-all duration-200"
            >
              [ ENTER THE SYSTEM ]
            </a>
            <a
              href="#chapter-7"
              onClick={() => sfx.playHover()}
              className="px-5 py-3 rounded border border-white/20 hover:border-system-cyan/60 bg-black/50 text-system-text font-orbitron text-xs tracking-wider uppercase transition-all duration-200"
            >
              VIEW RANK EVOLUTION
            </a>
          </div>
        </div>

        {/* Right Column: Hero Hunter Character with Crystal-Clear Visage & Glowing Eye */}
        <div className="lg:col-span-5 flex justify-center items-center relative">
          <div
            ref={hunterRef}
            className="relative w-[310px] h-[480px] sm:w-[380px] sm:h-[580px] lg:w-[440px] lg:h-[680px] will-change-transform select-none"
          >
            {/* Pulsing Void Neon Aura Behind Hunter */}
            <div className="absolute inset-x-4 top-10 bottom-10 bg-gradient-to-b from-system-cyan/35 via-system-accent/25 to-blue-900/40 rounded-full blur-[80px] pointer-events-none -z-10 animate-pulse" />

            {/* Glowing Hunter Eye Flare (Positioned precisely at Jin-Woo archetype eye at 27% from top) */}
            <div className="absolute top-[28%] left-[49%] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
              <span className="block w-2.5 h-2.5 rounded-full bg-cyan-200 shadow-[0_0_20px_rgba(56,189,248,1)] animate-ping" />
              <span className="block w-1.5 h-1.5 rounded-full bg-white absolute top-0.5 left-0.5 shadow-[0_0_12px_rgba(255,255,255,1)]" />
            </div>

            {/* Character Image (object-[center_25%] ensures the face and fierce eyes are fully centered) */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-system-cyan/30 shadow-[0_15px_50px_rgba(0,0,0,0.9)]">
              <Image
                src="/assets/01-weak/weak-hunter.webp"
                alt="Rank E Hunter Awakening Visage"
                fill
                priority
                sizes="(max-width: 768px) 380px, 480px"
                className="object-cover object-[center_25%] filter brightness-110 contrast-125"
              />

              {/* Floating Holographic Hunter Stats Tag */}
              <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md border border-system-cyan/50 px-3 py-1.5 rounded font-mono text-[10px] text-system-cyan shadow-[0_0_15px_rgba(56,189,248,0.3)]">
                <div>HP: 120 / 120</div>
                <div className="text-yellow-400">FATIGUE: 84%</div>
              </div>

              {/* Bottom Vignette melting into dungeon floor */}
              <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#07060D] via-[#07060D]/80 to-transparent pointer-events-none" />
            </div>

            {/* Tech Corner Brackets */}
            <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-system-cyan pointer-events-none" />
            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-system-cyan pointer-events-none" />
          </div>
        </div>

      </div>

      {/* 5. Bottom Prompt */}
      <div
        onMouseEnter={() => sfx.playHover()}
        className="relative z-10 flex flex-col items-center gap-2 text-system-muted font-mono text-xs tracking-wideSystem cursor-pointer group mt-6"
      >
        <span className="uppercase text-system-cyan font-semibold group-hover:tracking-widest transition-all">
          [ SCROLL TO WITNESS THE SYSTEM SELECTION ]
        </span>
        <ChevronDown className="w-4 h-4 animate-bounce text-system-cyan" />
      </div>
    </section>
  );
}
