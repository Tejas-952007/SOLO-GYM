"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { Skull, Moon, Flame, Zap, ShieldAlert, Sparkles, Swords, HeartPulse } from "lucide-react";
import { DecodeText } from "@/components/ui/DecodeText";
import { BladeSliceHeading } from "@/components/ui/BladeSliceHeading";
import { AnimeTiltCard } from "@/components/ui/AnimeTiltCard";
import { RecoverySleepChamber } from "@/components/ui/RecoverySleepChamber";
import { DeloadPlanner } from "@/components/ui/DeloadPlanner";
import { MuscleHypertrophyHeatmap } from "@/components/ui/MuscleHypertrophyHeatmap";
import { spawnCombatNumber } from "@/components/effects/FloatingDamageNumbers";
import { sfx } from "@/lib/audio-sfx";

export function Chapter6() {
  const containerRef = useRef<HTMLDivElement>(null);
  const chainCardRef = useRef<HTMLDivElement>(null);
  const [selectedPhysique, setSelectedPhysique] = useState<"berserk" | "monarch">("berserk");
  const [showAnatomyScan, setShowAnatomyScan] = useState(false);
  const [recoveryTab, setRecoveryTab] = useState<'anatomy' | 'sleep' | 'deload'>('anatomy');
  const [mobileCh6Tab, setMobileCh6Tab] = useState<'chains' | 'chamber' | 'berserk' | 'physique' | 'recovery'>('chains');

  // Interactive Hunter Telemetry Controls
  const [sleepPreset, setSleepPreset] = useState<'6h' | '7.5h' | '8.5h'>('7.5h');
  const [waterLitres, setWaterLitres] = useState<number>(3.5);
  const [procrastinationSlayed, setProcrastinationSlayed] = useState<boolean>(false);
  const [berserkActive, setBerserkActive] = useState<boolean>(false);

  const toggleAnatomyScan = () => {
    sfx.playBladeSlash();
    setShowAnatomyScan((prev) => !prev);
    spawnCombatNumber(showAnatomyScan ? "SCANNER OFF" : "ANATOMICAL SCAN ACTIVE", undefined, undefined, "stat");
  };

  useEffect(() => {
    const el = containerRef.current;
    const chainCard = chainCardRef.current;
    if (!el || !chainCard) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Chain tension jitter animation on scroll
      gsap.to(chainCard, {
        x: () => (Math.random() - 0.5) * 8,
        repeat: 5,
        yoyo: true,
        ease: "rough",
        scrollTrigger: {
          trigger: chainCard,
          start: "top 70%",
          end: "top 30%",
          scrub: 0.5,
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="chapter-6"
      ref={containerRef}
      className="relative w-full bg-[#07060D] py-10 sm:py-20 px-4 sm:px-8 overflow-hidden"
    >
      {/* Seamless Volumetric Fog Portal Transition from Chapter 5 */}
      <div className="absolute top-0 inset-x-0 h-36 bg-gradient-to-b from-[#07060D] via-[#07060D]/80 to-transparent pointer-events-none z-20" />

      {/* Background Ambience */}
      <div className="absolute inset-0 bg-radial-gradient from-red-950/15 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto space-y-6 sm:space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-2 sm:space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-950/40 border border-red-500/40 rounded text-xs font-mono tracking-wideSystem text-red-400 uppercase">
            <Skull className="w-3.5 h-3.5" />
            <span><DecodeText text="PHASE 06 // DUNGEON THREATS" /></span>
          </div>
          <BladeSliceHeading
            as="h2"
            accentText="NO MERCY."
            className="font-cinzel text-2xl sm:text-5xl font-black uppercase tracking-wider text-system-text"
          >
            THE ENEMIES YOU MUST SLAY.
          </BladeSliceHeading>
          <p className="font-inter text-xs sm:text-sm text-system-muted">
            The monsters aren&apos;t in a dungeon. They live in your comfort zone. Break the chains, protect your recovery, and unlock Berserk Rage mode.
          </p>
        </div>

        {/* Mobile Single-Tier Module Switcher (Absolute Zero Clutter) */}
        <div className="flex lg:hidden items-center justify-between gap-1 p-1 bg-black/70 border border-system-accent/30 rounded-xl my-4 font-mono text-[11px] w-full max-w-lg mx-auto relative z-20">
          <button
            onClick={() => {
              sfx.playClick();
              setMobileCh6Tab('chains');
            }}
            className={`flex-1 py-2 rounded-lg font-bold transition-all text-center truncate ${
              mobileCh6Tab === 'chains'
                ? 'bg-red-600 text-white shadow-[0_0_12px_rgba(239,68,68,0.5)]'
                : 'text-system-muted hover:text-white'
            }`}
          >
            ⛓️ CHAINS
          </button>
          <button
            onClick={() => {
              sfx.playClick();
              setMobileCh6Tab('chamber');
            }}
            className={`flex-1 py-2 rounded-lg font-bold transition-all text-center truncate ${
              mobileCh6Tab === 'chamber'
                ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.5)]'
                : 'text-system-muted hover:text-white'
            }`}
          >
            🧪 CHAMBER
          </button>
          <button
            onClick={() => {
              sfx.playClick();
              setMobileCh6Tab('berserk');
            }}
            className={`flex-1 py-2 rounded-lg font-bold transition-all text-center truncate ${
              mobileCh6Tab === 'berserk'
                ? 'bg-amber-600 text-white shadow-[0_0_12px_rgba(245,158,11,0.5)]'
                : 'text-system-muted hover:text-white'
            }`}
          >
            ⚡ BERSERK
          </button>
          <button
            onClick={() => {
              sfx.playClick();
              setMobileCh6Tab('physique');
            }}
            className={`flex-1 py-2 rounded-lg font-bold transition-all text-center truncate ${
              mobileCh6Tab === 'physique'
                ? 'bg-cyan-600 text-white shadow-[0_0_12px_rgba(6,182,212,0.5)]'
                : 'text-system-muted hover:text-white'
            }`}
          >
            ⚡ BODY
          </button>
          <button
            onClick={() => {
              sfx.playClick();
              setMobileCh6Tab('recovery');
            }}
            className={`flex-1 py-2 rounded-lg font-bold transition-all text-center truncate ${
              mobileCh6Tab === 'recovery'
                ? 'bg-emerald-600 text-white shadow-[0_0_12px_rgba(16,185,129,0.5)]'
                : 'text-system-muted hover:text-white'
            }`}
          >
            🧬 RECOVERY
          </button>
        </div>

        {/* Section 1: 3 Pillars of Dungeon Threats */}
        <div className={`space-y-4 ${mobileCh6Tab === 'chains' || mobileCh6Tab === 'chamber' || mobileCh6Tab === 'berserk' ? 'block' : 'hidden lg:block'}`}>
        {/* 3 Pillars of Dungeon Threats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          
          {/* Card 1: Chained Distraction (Streak Killer) */}
          <AnimeTiltCard
            maxTilt={8}
            glowColor="rgba(239, 68, 68, 0.35)"
            className={`w-full flex-col ${mobileCh6Tab === 'chains' ? 'flex' : 'hidden lg:flex'}`}
          >
            <div
              ref={chainCardRef}
              onMouseEnter={() => sfx.playHover()}
              className="system-window corner-brackets p-4 sm:p-6 rounded flex flex-col justify-between relative overflow-hidden group border-red-500/30 hover:border-red-500/60 transition-colors h-full"
            >
              <div className="absolute -top-12 -right-12 w-36 h-36 bg-red-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-wideSystem px-2.5 py-0.5 bg-red-500/20 text-red-400 border border-red-500/30 rounded">
                    BOSS // GRAVITY OF COMFORT
                  </span>
                  <ShieldAlert className="w-4 h-4 text-red-400" />
                </div>

                {/* Struggling Hunter Face & Chains Clearly Visible */}
                <div className="relative w-full h-52 sm:h-72 rounded overflow-hidden border border-red-500/30 bg-black/80">
                  <Image
                    src="/assets/06-enemies/chained-distraction.webp"
                    alt="Hunter Struggling Against Chains of Distraction"
                    fill
                    className="object-cover object-[center_30%] group-hover:scale-105 transition-transform duration-700 opacity-95 filter brightness-110 contrast-125"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07060D] via-transparent to-transparent pointer-events-none" />

                  {/* Debuff Flashes */}
                  <div className="absolute bottom-3 left-3 right-3 flex flex-col gap-1.5 font-mono text-[10px]">
                    <span className="px-2 py-0.5 bg-red-950/80 border border-red-500/40 text-red-300 rounded inline-block w-fit">
                      [ JUNK FOOD // -40 XP ]
                    </span>
                    <span className={`px-2 py-0.5 rounded inline-block w-fit border transition-colors ${
                      procrastinationSlayed
                        ? "bg-emerald-950/90 border-emerald-500/60 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.5)] font-bold"
                        : "bg-red-950/80 border-red-500/40 text-red-300"
                    }`}>
                      {procrastinationSlayed ? "[ CHAIN SHATTERED // 14-DAY STREAK PROTECTED ]" : "[ SKIPPED WORKOUT // -1 STREAK ]"}
                    </span>
                  </div>
                </div>

                <h3 className="font-cinzel text-xl font-bold uppercase text-system-text tracking-wide">
                  CHAIN OF PROCRASTINATION
                </h3>
                <p className="font-inter text-xs text-system-muted leading-relaxed">
                  Miss a single day and your Hunter rank halts. The Level Up System forces daily accountability—no missed logs, no skipped protein targets.
                </p>
              </div>

              <div className="pt-4 border-t border-system-accent/15 mt-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-red-400">
                  <span>PENALTY: RANK DECAY</span>
                  <span>{procrastinationSlayed ? "STATUS: SHATTERED" : "SLAY: COMPLETE QUEST"}</span>
                </div>
                <button
                  onClick={() => {
                    sfx.playBladeSlash();
                    setProcrastinationSlayed(true);
                    spawnCombatNumber(
                      procrastinationSlayed ? "-1,200 COMBO SLASH!" : "-3,500 CRITICAL SLASH! STREAK SAVED",
                      undefined,
                      undefined,
                      "damage"
                    );
                  }}
                  className={`w-full py-1.5 rounded text-[11px] font-mono font-bold tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    procrastinationSlayed
                      ? "bg-emerald-950/80 border border-emerald-500/60 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                      : "bg-red-950/60 hover:bg-red-600/30 border border-red-500/50 hover:border-red-400 text-red-300 shadow-[0_0_12px_rgba(239,68,68,0.3)]"
                  }`}
                >
                  <Swords className={`w-3.5 h-3.5 ${procrastinationSlayed ? "text-emerald-400" : "text-red-400"}`} />
                  <span>{procrastinationSlayed ? "[ ⚔️ PROCRASTINATION SLAIN // +500 XP ]" : "[ SLAY PROCRASTINATION ]"}</span>
                </button>
              </div>
            </div>
          </AnimeTiltCard>

          {/* Card 2: Recovery Tank (Rest Quest) */}
          <AnimeTiltCard
            maxTilt={8}
            glowColor="rgba(139, 92, 246, 0.35)"
            className={`w-full flex-col ${mobileCh6Tab === 'chamber' ? 'flex' : 'hidden lg:flex'}`}
          >
            <div
              onMouseEnter={() => sfx.playHover()}
              className="system-window corner-brackets p-4 sm:p-6 rounded flex flex-col justify-between relative overflow-hidden group border-system-accent/30 hover:border-system-accent/60 transition-colors h-full"
            >
              <div className="absolute -top-12 -right-12 w-36 h-36 bg-system-accent/10 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-wideSystem px-2.5 py-0.5 bg-system-accent/20 text-system-accent border border-system-accent/30 rounded">
                    SANCTUARY // RECOVERY CHAMBER
                  </span>
                  <Moon className="w-4 h-4 text-system-accent" />
                </div>

                {/* Recovery Tank Visual */}
                <div className="relative w-full h-52 sm:h-72 rounded overflow-hidden border border-system-accent/30 bg-black/80">
                  <Image
                    src="/assets/06-enemies/recovery-tank.webp"
                    alt="Hunter Healing in Recovery Chamber"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-95 filter brightness-110 contrast-115"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07060D] via-transparent to-transparent pointer-events-none" />

                  {/* Dynamic Healing Status Badges */}
                  <div className="absolute bottom-3 left-3 right-3 flex flex-col gap-1.5 font-mono text-[10px]">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-2 py-0.5 bg-system-panel/90 border border-system-accent/40 text-system-glow rounded inline-block w-fit">
                        [ SLEEP: {sleepPreset === '6h' ? '6.0 HRS // +65 HP' : sleepPreset === '7.5h' ? '7.5 HRS // +120 HP' : '8.5 HRS // +180 HP'} ]
                      </span>
                      <span className="px-2 py-0.5 bg-system-panel/90 border border-system-cyan/40 text-system-cyan rounded inline-block w-fit">
                        [ 💧 {waterLitres.toFixed(1)}L WATER ]
                      </span>
                    </div>
                    <span className="px-2 py-0.5 bg-system-panel/90 border border-emerald-500/40 text-emerald-300 rounded inline-block w-fit">
                      [ MUSCLE REPAIR: {sleepPreset === '6h' ? 'PARTIAL (72%)' : sleepPreset === '7.5h' ? 'OPTIMAL (94%)' : 'TRANSCENDENT (100%)'} ]
                    </span>
                  </div>
                </div>

                {/* Interactive Sleep Protocol Switcher */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] font-mono text-system-muted">
                    <span>SELECT SLEEP PROTOCOL:</span>
                    <button
                      onClick={() => {
                        sfx.playStatPointAlloc();
                        setWaterLitres((w) => (w >= 4.5 ? 2.5 : w + 0.5));
                        spawnCombatNumber("+0.5L HYDRATION LOGGED", undefined, undefined, "xp");
                      }}
                      className="text-system-cyan hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      + ADD 500ML WATER
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 p-1 bg-black/60 border border-system-accent/30 rounded-lg font-mono text-[10px]">
                    <button
                      onClick={() => {
                        sfx.playClick();
                        setSleepPreset('6h');
                      }}
                      className={`py-1 rounded text-center transition-all ${
                        sleepPreset === '6h'
                          ? 'bg-amber-600/40 text-amber-300 border border-amber-500/50 font-bold'
                          : 'text-system-muted hover:text-white'
                      }`}
                    >
                      6.0H BASE
                    </button>
                    <button
                      onClick={() => {
                        sfx.playClick();
                        setSleepPreset('7.5h');
                      }}
                      className={`py-1 rounded text-center transition-all ${
                        sleepPreset === '7.5h'
                          ? 'bg-system-accent/40 text-system-glow border border-system-accent/60 font-bold'
                          : 'text-system-muted hover:text-white'
                      }`}
                    >
                      7.5H ANABOLIC
                    </button>
                    <button
                      onClick={() => {
                        sfx.playRankUp();
                        setSleepPreset('8.5h');
                      }}
                      className={`py-1 rounded text-center transition-all ${
                        sleepPreset === '8.5h'
                          ? 'bg-emerald-600/40 text-emerald-300 border border-emerald-500/60 font-bold'
                          : 'text-system-muted hover:text-white'
                      }`}
                    >
                      8.5H MAX
                    </button>
                  </div>
                </div>

                <h3 className="font-cinzel text-xl font-bold uppercase text-system-text tracking-wide">
                  RECOVERY IS A QUEST TOO
                </h3>
                <p className="font-inter text-xs text-system-muted leading-relaxed">
                  Muscles are not built in the gym; they are built in the tank. Level Up rewards you XP for 8 hours of sleep and adequate rest-day hydration.
                </p>
              </div>

              <div className="pt-4 border-t border-system-accent/15 mt-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-system-accent">
                  <span>BUFF: {sleepPreset === '6h' ? '+15% STAMINA' : sleepPreset === '7.5h' ? '+30% STAMINA' : '+45% SOVEREIGN VIGOR'}</span>
                  <span>PROTOCOL: {sleepPreset.toUpperCase()}</span>
                </div>
                <button
                  onClick={() => {
                    sfx.playStatPointAlloc();
                    spawnCombatNumber(
                      sleepPreset === '8.5h' ? "+500 TRANSCENDENT HEAL!" : "+350 VITALITY HEAL!",
                      undefined,
                      undefined,
                      "stat"
                    );
                  }}
                  className="w-full py-1.5 bg-purple-950/60 hover:bg-purple-600/30 border border-purple-500/50 hover:border-purple-400 rounded text-[11px] font-mono text-purple-300 font-bold tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-[0_0_12px_rgba(168,85,247,0.3)]"
                >
                  <HeartPulse className="w-3.5 h-3.5 text-purple-400" />
                  <span>[ INJECT RECOVERY NECTAR ]</span>
                </button>
              </div>
            </div>
          </AnimeTiltCard>

          {/* Card 3: Berserk Rage Mode (Streak 30+) */}
          <AnimeTiltCard
            maxTilt={8}
            glowColor="rgba(245, 158, 11, 0.35)"
            className={`w-full flex-col ${mobileCh6Tab === 'berserk' ? 'flex' : 'hidden lg:flex'}`}
          >
            <div
              onMouseEnter={() => sfx.playHover()}
              className="system-window corner-brackets p-4 sm:p-6 rounded flex flex-col justify-between relative overflow-hidden group border-amber-500/30 hover:border-amber-500/60 transition-colors h-full"
            >
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-wideSystem px-2.5 py-0.5 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded">
                  AWAKENING // 30-DAY STREAK
                </span>
                <Flame className="w-4 h-4 text-amber-400" />
              </div>

              {/* Hunter Berserk Face with Blazing Red Eyes Clearly Visible */}
              <div className={`relative w-full h-52 sm:h-72 rounded overflow-hidden border bg-black/80 transition-all duration-300 ${
                berserkActive ? 'border-amber-400 ring-2 ring-amber-500/50' : 'border-amber-500/30'
              }`}>
                <Image
                  src="/assets/06-enemies/rage-mindset.webp"
                  alt="Berserk Mindset with Burning Eyes"
                  fill
                  className="object-cover object-[center_32%] group-hover:scale-105 transition-transform duration-700 opacity-95 filter brightness-115 contrast-125"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07060D] via-transparent to-transparent pointer-events-none" />

                {/* Rage Mode Status */}
                <div className="absolute bottom-3 left-3 right-3 flex flex-col gap-1.5 font-mono text-[10px]">
                  <span className="px-2 py-0.5 bg-amber-950/80 border border-amber-500/40 text-amber-300 rounded inline-block w-fit">
                    [ STREAK 30 // BERSERK STATE ]
                  </span>
                  <span className={`px-2 py-0.5 rounded inline-block w-fit border transition-colors ${
                    berserkActive
                      ? 'bg-amber-500 text-black border-amber-400 font-bold shadow-[0_0_15px_rgba(245,158,11,0.6)]'
                      : 'bg-amber-950/80 border-amber-500/40 text-amber-300'
                  }`}>
                    {berserkActive ? '[ 🔥 3.0X OVERDRIVE ACTIVATED ]' : '[ 2X XP BONUS READY ]'}
                  </span>
                </div>
              </div>

              <h3 className="font-cinzel text-xl font-bold uppercase text-system-text tracking-wide">
                UNSTOPPABLE MOMENTUM
              </h3>
              <p className="font-inter text-xs text-system-muted leading-relaxed">
                Cross 30 days without breaking protocol. Your hunter aura ignites, unlocking legendary badges, 2x quest XP multipliers, and elite dungeon raids.
              </p>
            </div>

            <div className="pt-4 border-t border-system-accent/15 mt-4 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-amber-400">
                <span>STATE: {berserkActive ? '🔥 OVERDRIVE' : 'ASCENDED'}</span>
                <span>MULTIPLIER: {berserkActive ? '3.0X' : '2.0X'}</span>
              </div>
              <button
                onClick={() => {
                  sfx.playDemonRoar();
                  setBerserkActive((b) => !b);
                  spawnCombatNumber(
                    berserkActive ? "BERSERK NORMALIZED" : "🔥 +1,000 XP & 3.0X OVERDRIVE IGNITED!",
                    undefined,
                    undefined,
                    "mana"
                  );
                }}
                className={`w-full py-1.5 rounded text-[11px] font-mono font-bold tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  berserkActive
                    ? 'bg-amber-500 text-black border border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.6)]'
                    : 'bg-amber-950/60 hover:bg-amber-600/30 border border-amber-500/50 hover:border-amber-400 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                }`}
              >
                <Flame className={`w-3.5 h-3.5 ${berserkActive ? 'text-black fill-black' : 'text-amber-400'}`} />
                <span>{berserkActive ? '[ 🔥 BERSERK OVERDRIVE ACTIVE ]' : '[ UNLEASH BERSERK OVERDRIVE ]'}</span>
              </button>
            </div>
          </div>
        </AnimeTiltCard>

        </div>
        </div>

        {/* The Body You Are Building - Full Width Physique Reveal (Desktop: Normal, Mobile: when physique tab active) */}
        <div className={`w-full ${mobileCh6Tab === 'physique' ? 'block' : 'hidden lg:block'}`}>
        <AnimeTiltCard
          maxTilt={6}
          glowColor={selectedPhysique === "berserk" ? "rgba(239, 68, 68, 0.35)" : "rgba(56, 189, 248, 0.35)"}
          className="w-full"
        >
          <div className="system-window corner-brackets p-6 sm:p-8 rounded relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-system-accent/20 border border-system-accent/40 rounded text-xs font-mono text-system-accent uppercase">
                  <Zap className="w-3.5 h-3.5" />
                  <span>THE PHYSICAL OUTCOME</span>
                </div>
                <BladeSliceHeading
                  as="h3"
                  accentText="ASCENDED POWER."
                  className="font-cinzel text-2xl sm:text-4xl font-bold uppercase tracking-wider text-system-text"
                >
                  THE BODY YOU ARE BUILDING.
                </BladeSliceHeading>
              <p className="font-inter text-xs sm:text-sm text-system-muted leading-relaxed">
                Every rep tracked in the gym, every gram of protein measured in your Indian meals, and every night of 8-hour sleep compounds. You are sculpting dense, armor-like muscle.
              </p>
              <div className="grid grid-cols-3 gap-3 pt-2 text-center">
                <div className="p-3 bg-system-panel/60 border border-system-accent/20 rounded">
                  <div className="font-mono text-lg font-bold text-system-accent">+14 KG</div>
                  <div className="font-mono text-[10px] text-system-muted uppercase">LEAN TISSUE</div>
                </div>
                <div className="p-3 bg-system-panel/60 border border-system-accent/20 rounded">
                  <div className="font-mono text-lg font-bold text-system-glow">10-12%</div>
                  <div className="font-mono text-[10px] text-system-muted uppercase">BODY FAT</div>
                </div>
                <div className="p-3 bg-system-panel/60 border border-system-accent/20 rounded">
                  <div className="font-mono text-lg font-bold text-system-gold">S-RANK</div>
                  <div className="font-mono text-[10px] text-system-muted uppercase">METABOLISM</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 w-full">
              <div className="relative h-80 sm:h-96 md:h-[420px] w-full rounded overflow-hidden border border-system-accent/30 bg-black/90 shadow-system-glow">
                {/* Berserk Brand Physique */}
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    selectedPhysique === "berserk" ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  <Image
                    src="/assets/06-enemies/berserk-physique-brand.webp"
                    alt="Berserk Sacrificial Rune Anatomy"
                    fill
                    className="object-cover object-[center_50%] filter contrast-125 brightness-110"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  {/* Pulsing Crimson Brand Rune */}
                  <div className="absolute top-[28%] left-[50%] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                    <span className="block w-6 h-6 rounded-full bg-red-600 blur-md animate-pulse" />
                  </div>
                </div>

                {/* Monarch Peak Physique */}
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    selectedPhysique === "monarch" ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  <Image
                    src="/assets/06-enemies/peak-physique-back.webp"
                    alt="Monarch Hypertrophy Peak Back"
                    fill
                    className="object-cover object-[center_28%] filter contrast-125 brightness-110"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                {/* Interactive Anatomical Callout Pins */}
                {showAnatomyScan && (
                  <div className="absolute inset-0 pointer-events-none z-20">
                    <div className="absolute top-[22%] left-[48%] -translate-x-1/2 bg-black/90 border border-system-cyan px-2 py-0.5 rounded text-[9px] font-mono text-system-cyan shadow-lg animate-pulse">
                      TRAPEZIUS COBRA HOOD
                    </div>
                    <div className="absolute top-[45%] left-[24%] bg-black/90 border border-purple-400 px-2 py-0.5 rounded text-[9px] font-mono text-purple-300 shadow-lg animate-pulse">
                      LATISSIMUS V-TAPER
                    </div>
                    <div className="absolute top-[45%] right-[24%] bg-black/90 border border-purple-400 px-2 py-0.5 rounded text-[9px] font-mono text-purple-300 shadow-lg animate-pulse">
                      TERES MAJOR DENSITY
                    </div>
                    <div className="absolute bottom-[28%] left-[48%] -translate-x-1/2 bg-black/90 border border-system-gold px-2 py-0.5 rounded text-[9px] font-mono text-system-gold shadow-lg animate-pulse">
                      LUMBAR TREE ERECTORS
                    </div>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-[#07060D] via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-3 right-3 font-mono text-[10px] px-2.5 py-1 bg-black/85 border border-system-gold/50 text-system-gold rounded shadow-md">
                  {selectedPhysique === "berserk" ? "BERSERK SACRIFICE // BRANDED" : "HUNTER ANATOMY // 100% UNLOCKED"}
                </div>
              </div>

              {/* Physique Toggle Selector & Anatomy Scanner */}
              <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-xs">
                <button
                  onClick={() => {
                    sfx.playSubBassBoom();
                    setSelectedPhysique("berserk");
                    spawnCombatNumber("DEMON BACK ACTIVATED // 100% UNLEASHED!", undefined, undefined, "damage");
                  }}
                  onMouseEnter={() => sfx.playHover()}
                  className={`px-3 py-1.5 rounded-sm border transition-all cursor-pointer ${
                    selectedPhysique === "berserk"
                      ? "bg-red-950/70 border-red-500 text-red-400 shadow-[0_0_18px_rgba(239,68,68,0.5)]"
                      : "bg-black/40 border-white/10 text-system-muted hover:text-red-400"
                  }`}
                >
                  [ BERSERK BRAND ]
                </button>
                <button
                  onClick={() => {
                    sfx.playRankUp();
                    setSelectedPhysique("monarch");
                    spawnCombatNumber("SOVEREIGN ANATOMY // S-RANK ASCENSION", undefined, undefined, "stat");
                  }}
                  onMouseEnter={() => sfx.playHover()}
                  className={`px-3 py-1.5 rounded-sm border transition-all cursor-pointer ${
                    selectedPhysique === "monarch"
                      ? "bg-system-cyan/25 border-system-cyan text-system-cyan shadow-system-glow"
                      : "bg-black/40 border-white/10 text-system-muted hover:text-white"
                  }`}
                >
                  [ MONARCH HYPERTROPHY ]
                </button>
                <button
                  onClick={toggleAnatomyScan}
                  onMouseEnter={() => sfx.playHover()}
                  className={`px-3 py-1.5 rounded-sm border transition-all cursor-pointer ${
                    showAnatomyScan
                      ? "bg-system-gold/25 border-system-gold text-system-gold shadow-[0_0_12px_rgba(245,197,66,0.5)] font-bold"
                      : "bg-black/40 border-white/10 text-system-muted hover:text-system-gold"
                  }`}
                >
                  [ {showAnatomyScan ? "HIDE ANATOMY" : "SCAN ANATOMY"} ]
                </button>
              </div>
            </div>
          </div>
        </div>
        </AnimeTiltCard>
        </div>

        {/* Bio-Recovery & Muscle Hypertrophy Terminal (Desktop: Normal, Mobile: when recovery tab active) */}
        <div className={`w-full max-w-6xl mx-auto mt-10 font-mono ${mobileCh6Tab === 'recovery' ? 'block' : 'hidden lg:block'}`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-system-accent/25 pb-3 mb-6 gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-red-300">
                [ BIO-RECOVERY & CNS RESTORATION TERMINAL ]
              </span>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                onClick={() => {
                  sfx.playClick();
                  setRecoveryTab('anatomy');
                }}
                onMouseEnter={() => sfx.playHover()}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                  recoveryTab === 'anatomy'
                    ? 'bg-blue-600 text-white border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.4)]'
                    : 'bg-black/50 border-white/10 text-gray-400 hover:text-white hover:border-blue-500/30'
                }`}
              >
                🧬 3D ANATOMY HEATMAP
              </button>

              <button
                onClick={() => {
                  sfx.playClick();
                  setRecoveryTab('sleep');
                }}
                onMouseEnter={() => sfx.playHover()}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                  recoveryTab === 'sleep'
                    ? 'bg-purple-600 text-white border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                    : 'bg-black/50 border-white/10 text-gray-400 hover:text-white hover:border-purple-500/30'
                }`}
              >
                🛌 SLEEP RECOVERY TANK
              </button>

              <button
                onClick={() => {
                  sfx.playClick();
                  setRecoveryTab('deload');
                }}
                onMouseEnter={() => sfx.playHover()}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                  recoveryTab === 'deload'
                    ? 'bg-red-600 text-white border-red-400 shadow-[0_0_15px_rgba(239,68,68,0.4)]'
                    : 'bg-black/50 border-white/10 text-gray-400 hover:text-white hover:border-red-500/30'
                }`}
              >
                🧠 CNS DELOAD ARCHITECT
              </button>
            </div>
          </div>

          {/* Active Recovery Module */}
          <div className="w-full">
            {recoveryTab === 'anatomy' && <MuscleHypertrophyHeatmap />}
            {recoveryTab === 'sleep' && <RecoverySleepChamber />}
            {recoveryTab === 'deload' && <DeloadPlanner />}
          </div>
        </div>
      </div>
    </section>
  );
}
