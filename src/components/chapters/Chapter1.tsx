"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { Shield, ChevronDown, CheckCircle2, Circle, Flame, Sparkles, Award } from "lucide-react";
import { DecodeText } from "@/components/ui/DecodeText";
import { GlitchHeading } from "@/components/ui/GlitchHeading";
import { BladeSliceHeading } from "@/components/ui/BladeSliceHeading";
import { AnimeTiltCard } from "@/components/ui/AnimeTiltCard";
import { spawnCombatNumber } from "@/components/effects/FloatingDamageNumbers";
import { sfx } from "@/lib/audio-sfx";

export function Chapter1() {
  const containerRef = useRef<HTMLDivElement>(null);
  const hunterRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  // Interactive Daily Quest Checklist in Hero
  const [completedQuests, setCompletedQuests] = useState<Record<number, boolean>>({});
  const [bonusXP, setBonusXP] = useState(0);

  // Interactive Hunter Stat Allocator (5 AP)
  const [activeHeroTab, setActiveHeroTab] = useState<"quests" | "stats">("quests");
  const [availableAP, setAvailableAP] = useState(5);
  const [stats, setStats] = useState({
    str: 10,
    agi: 10,
    vit: 10,
    discipline: 10,
  });

  // Interactive Character Aura Switcher (Cyan Mana / Crimson Berserk / Violet Shadow)
  const [hunterAura, setHunterAura] = useState<"cyan" | "crimson" | "violet">("cyan");

  const auraConfigs = {
    cyan: {
      name: "CYAN MANA",
      glowColor: "rgba(56, 189, 248, 0.45)",
      gradient: "from-system-cyan/40 via-system-accent/25 to-blue-900/45",
      eyeFlareBg: "bg-cyan-200",
      eyeFlareShadow: "shadow-[0_0_22px_rgba(56,189,248,1)]",
      borderColor: "border-system-cyan/50",
      textColor: "text-system-cyan",
      btnActive: "bg-system-cyan/25 border-system-cyan text-system-cyan shadow-[0_0_15px_rgba(56,189,248,0.5)]",
      xpLabel: "+500 MANA OVERDRIVE!",
    },
    crimson: {
      name: "CRIMSON BERSERK",
      glowColor: "rgba(239, 68, 68, 0.55)",
      gradient: "from-red-600/45 via-rose-700/35 to-amber-950/50",
      eyeFlareBg: "bg-red-400",
      eyeFlareShadow: "shadow-[0_0_22px_rgba(239,68,68,1)]",
      borderColor: "border-red-500/60",
      textColor: "text-red-400",
      btnActive: "bg-red-500/25 border-red-500 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.6)]",
      xpLabel: "BERSERK RAGE ACTIVATED!",
    },
    violet: {
      name: "SHADOW SOVEREIGN",
      glowColor: "rgba(168, 85, 247, 0.55)",
      gradient: "from-purple-600/45 via-violet-700/35 to-fuchsia-950/50",
      eyeFlareBg: "bg-purple-300",
      eyeFlareShadow: "shadow-[0_0_22px_rgba(168,85,247,1)]",
      borderColor: "border-purple-500/60",
      textColor: "text-purple-400",
      btnActive: "bg-purple-500/25 border-purple-500 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.6)]",
      xpLabel: "SHADOW MONARCH DOMAIN!",
    },
  };

  const switchAura = (aura: "cyan" | "crimson" | "violet") => {
    setHunterAura(aura);
    sfx.playBladeSlash();
    spawnCombatNumber(auraConfigs[aura].xpLabel, undefined, undefined, aura === "crimson" ? "damage" : "mana");
  };

  const allocateStat = (stat: "str" | "agi" | "vit" | "discipline") => {
    if (availableAP <= 0) {
      sfx.playClick();
      return;
    }
    sfx.playStatPointAlloc();
    setAvailableAP((prev) => prev - 1);
    setStats((prev) => ({ ...prev, [stat]: prev[stat] + 1 }));
    spawnCombatNumber(`+1 ${stat.toUpperCase()} ALLOCATED!`, undefined, undefined, "stat");
  };

  const resetStats = () => {
    sfx.playClick();
    setAvailableAP(5);
    setStats({ str: 10, agi: 10, vit: 10, discipline: 10 });
    spawnCombatNumber("STATS RESET // 5 AP READY", undefined, undefined, "mana");
  };

  const toggleQuest = (id: number, xpValue: number) => {
    setCompletedQuests((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      if (!prev[id]) {
        sfx.playChirp();
        setBonusXP((xp) => xp + xpValue);
        spawnCombatNumber(`+${xpValue} QUEST XP!`, undefined, undefined, "xp");
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

          {/* Main Hero Kinetic Blade Slice Title */}
          <div className="space-y-2">
            <BladeSliceHeading
              as="h1"
              accentText="RANK E."
              className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-system-text leading-none"
            >
              THIS IS YOU.
            </BladeSliceHeading>
            <p className="font-inter text-sm sm:text-base md:text-lg text-system-muted max-w-xl leading-relaxed pt-2">
              The weakest hunter of mankind. Bruised physique, skipped meals, zero discipline. The gym felt like an impossible dungeon. But today, the System chooses you.
            </p>
          </div>

          {/* Interactive System HUD Box (Daily Quests & Stat Allocator) */}
          <div className="w-full max-w-lg p-4 sm:p-5 rounded-xl border border-system-cyan/30 bg-[#0B1021]/80 backdrop-blur-md shadow-[0_0_25px_rgba(14,165,233,0.15)] space-y-3.5">
            {/* Tab Switches */}
            <div className="flex items-center justify-between border-b border-system-cyan/20 pb-2.5">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    sfx.playClick();
                    setActiveHeroTab("quests");
                  }}
                  onMouseEnter={() => sfx.playHover()}
                  className={`px-3 py-1 rounded text-xs font-mono tracking-wider transition-all ${
                    activeHeroTab === "quests"
                      ? "bg-system-cyan/20 border border-system-cyan text-white shadow-[0_0_12px_rgba(56,189,248,0.5)] font-bold"
                      : "text-system-muted hover:text-white"
                  }`}
                >
                  [ QUEST LOG ]
                </button>
                <button
                  onClick={() => {
                    sfx.playClick();
                    setActiveHeroTab("stats");
                  }}
                  onMouseEnter={() => sfx.playHover()}
                  className={`px-3 py-1 rounded text-xs font-mono tracking-wider transition-all flex items-center gap-1.5 ${
                    activeHeroTab === "stats"
                      ? "bg-yellow-500/20 border border-yellow-500 text-yellow-300 shadow-[0_0_12px_rgba(234,179,8,0.5)] font-bold"
                      : "text-system-muted hover:text-white"
                  }`}
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>STATS [{availableAP} AP]</span>
                </button>
              </div>
              <span className="text-yellow-400 font-mono text-xs font-bold">
                {activeHeroTab === "quests" ? `XP: +${bonusXP}/500` : `AP: ${availableAP} REMAINING`}
              </span>
            </div>

            {/* View 1: Daily Quests */}
            {activeHeroTab === "quests" ? (
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
                <div className="pt-1 flex items-center justify-between text-[11px] font-mono text-system-muted">
                  <span>PENALTY ZONE: 4-HOUR RUN IN THE DESERT</span>
                  <span className="text-system-cyan font-bold">STATUS: {bonusXP > 0 ? "PROGRESSING" : "PENDING"}</span>
                </div>
              </div>
            ) : (
              /* View 2: Interactive Hunter Stat Allocator */
              <div className="space-y-3 font-mono text-xs">
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { key: "str", name: "STR (STRENGTH)", val: stats.str, desc: "Compound Push/Pull 1RM" },
                    { key: "agi", name: "AGI (AGILITY)", val: stats.agi, desc: "Rest Interval Recovery" },
                    { key: "vit", name: "VIT (VITALITY)", val: stats.vit, desc: "Sleep Hypertrophy Index" },
                    { key: "discipline", name: "DISCIPLINE", val: stats.discipline, desc: "Macro Adherence Rate" },
                  ].map((s) => (
                    <div
                      key={s.key}
                      className="p-2.5 bg-black/50 border border-white/10 rounded flex flex-col justify-between"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] text-system-muted font-bold">{s.name}</span>
                        <span className="text-yellow-400 font-bold text-sm">{s.val}</span>
                      </div>
                      <div className="text-[9px] text-system-muted mb-2 leading-tight">{s.desc}</div>
                      <button
                        onClick={() => allocateStat(s.key as "str" | "agi" | "vit" | "discipline")}
                        disabled={availableAP <= 0}
                        className={`w-full py-1 rounded text-[10px] font-bold uppercase transition-all ${
                          availableAP > 0
                            ? "bg-yellow-500/20 hover:bg-yellow-500 text-yellow-300 hover:text-black border border-yellow-500/50 shadow-sm cursor-pointer"
                            : "bg-white/5 text-system-muted/40 border border-white/5 cursor-not-allowed"
                        }`}
                      >
                        [+1 ALLOCATE]
                      </button>
                    </div>
                  ))}
                </div>

                {/* Live Output Simulation */}
                <div className="p-2.5 bg-system-cyan/10 border border-system-cyan/30 rounded flex items-center justify-between text-[11px]">
                  <span>EST. BENCH: <strong className="text-white">{50 + (stats.str - 10) * 4} KG</strong></span>
                  <span>RECOVERY: <strong className="text-emerald-400">{60 + (stats.vit - 10) * 8}%</strong></span>
                  {availableAP === 0 && (
                    <button
                      onClick={resetStats}
                      className="text-[10px] text-yellow-400 underline hover:text-white ml-2"
                    >
                      RESET
                    </button>
                  )}
                </div>
              </div>
            )}
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

        {/* Right Column: Hero Hunter Character with 3D Anime Tilt & Glowing Eye */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          <AnimeTiltCard
            maxTilt={12}
            glowColor={auraConfigs[hunterAura].glowColor}
            className="w-full flex justify-center"
          >
            <div
              ref={hunterRef}
              className="relative w-[310px] h-[480px] sm:w-[380px] sm:h-[580px] lg:w-[440px] lg:h-[680px] will-change-transform select-none"
            >
              {/* Dynamic Pulsing Void Neon Aura Behind Hunter */}
              <div
                className={`absolute inset-x-4 top-10 bottom-10 bg-gradient-to-b ${auraConfigs[hunterAura].gradient} rounded-full blur-[80px] pointer-events-none -z-10 animate-pulse transition-all duration-500`}
              />

              {/* Glowing Hunter Eye Flare (Dynamic color reactive to selected aura) */}
              <div className="absolute top-[28%] left-[49%] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                <span
                  className={`block w-2.5 h-2.5 rounded-full ${auraConfigs[hunterAura].eyeFlareBg} ${auraConfigs[hunterAura].eyeFlareShadow} animate-ping`}
                />
                <span className="block w-1.5 h-1.5 rounded-full bg-white absolute top-0.5 left-0.5 shadow-[0_0_12px_rgba(255,255,255,1)]" />
              </div>

              {/* Character Image (object-[center_25%] ensures the face and fierce eyes are fully centered) */}
              <div
                className={`relative w-full h-full rounded-2xl overflow-hidden border ${auraConfigs[hunterAura].borderColor} shadow-[0_15px_50px_rgba(0,0,0,0.9)] transition-colors duration-500`}
              >
                <Image
                  src="/assets/01-weak/weak-hunter.webp"
                  alt="Rank E Hunter Awakening Visage"
                  fill
                  priority
                  sizes="(max-width: 768px) 380px, 480px"
                  className="object-cover object-[center_25%] filter brightness-110 contrast-125"
                />

                {/* Floating Holographic Hunter Stats Tag */}
                <div
                  className={`absolute top-4 right-4 bg-black/85 backdrop-blur-md border ${auraConfigs[hunterAura].borderColor} px-3 py-1.5 rounded font-mono text-[10px] ${auraConfigs[hunterAura].textColor} shadow-lg transition-colors`}
                >
                  <div>HP: 120 / 120</div>
                  <div className="text-yellow-400">FATIGUE: 84%</div>
                  <div className="text-[9px] uppercase tracking-wider opacity-80 mt-0.5">
                    AURA: {auraConfigs[hunterAura].name}
                  </div>
                </div>

                {/* Bottom Vignette melting into dungeon floor */}
                <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#07060D] via-[#07060D]/80 to-transparent pointer-events-none" />
              </div>

              {/* Tech Corner Brackets */}
              <div
                className={`absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 ${auraConfigs[hunterAura].borderColor} pointer-events-none transition-colors duration-300`}
              />
              <div
                className={`absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 ${auraConfigs[hunterAura].borderColor} pointer-events-none transition-colors duration-300`}
              />
            </div>
          </AnimeTiltCard>

          {/* Interactive Hunter Aura Mode Selector */}
          <div className="mt-4 flex items-center gap-2 p-1.5 bg-black/75 backdrop-blur-md border border-white/10 rounded-lg shadow-xl font-mono text-[10px] tracking-wider">
            <span className="text-system-muted px-1.5 text-[9px] uppercase hidden sm:inline">
              MANA FREQ:
            </span>
            {(["cyan", "crimson", "violet"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => switchAura(mode)}
                onMouseEnter={() => sfx.playHover()}
                className={`px-3 py-1.5 rounded font-semibold uppercase transition-all duration-200 cursor-pointer ${
                  hunterAura === mode
                    ? auraConfigs[mode].btnActive
                    : "text-system-muted/70 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                {mode === "cyan" && "CYAN"}
                {mode === "crimson" && "BERSERK"}
                {mode === "violet" && "SHADOW"}
              </button>
            ))}
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
