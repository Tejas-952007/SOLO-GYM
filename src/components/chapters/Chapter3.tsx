"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Dumbbell, ShieldCheck, Swords, Flame, Sparkles, Trophy } from "lucide-react";
import { BladeSliceHeading } from "@/components/ui/BladeSliceHeading";
import { AnimeTiltCard } from "@/components/ui/AnimeTiltCard";
import { DungeonWarmupCircuit } from "@/components/ui/DungeonWarmupCircuit";
import { RestTimerMetronome } from "@/components/ui/RestTimerMetronome";
import { DungeonBossGauntlet } from "@/components/ui/DungeonBossGauntlet";
import { ThreeDaggerArmory } from "@/components/ThreeDaggerArmory";
import { spawnCombatNumber } from "@/components/effects/FloatingDamageNumbers";
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

  // Interactive Boss Encounter State
  const [bossHp, setBossHp] = useState(3000);
  const [staggerHp, setStaggerHp] = useState(1000);
  const [comboCount, setComboCount] = useState(0);
  const [tacticalTab, setTacticalTab] = useState<'armory' | 'timer' | 'warmup' | 'gauntlet'>('armory');
  const [combatLog, setCombatLog] = useState<string[]>([
    "[SYSTEM EVENT] Dungeon Boss: Titan of Inertia has appeared on Floor 04!",
  ]);
  const [shakeCrit, setShakeCrit] = useState(false);
  const [mobileCh3Tab, setMobileCh3Tab] = useState<'gauntlet' | 'boss' | 'armory'>('gauntlet');

  const strikeBoss = (type: "heavy" | "protein" | "shadow" | "overload") => {
    if (bossHp <= 0) return;

    const nextCombo = comboCount + 1;
    setComboCount(nextCombo);

    if (type === "heavy") {
      sfx.playBladeSheathe();
      const comboMultiplier = nextCombo >= 3 ? 1.3 : 1.0;
      const dmg = Math.floor((650 + Math.random() * 250) * comboMultiplier);
      const nextHp = Math.max(0, bossHp - dmg);
      const nextStagger = Math.max(0, staggerHp - 300);
      setBossHp(nextHp);
      setStaggerHp(nextStagger);
      setShakeCrit(true);
      setTimeout(() => setShakeCrit(false), 200);
      spawnCombatNumber(`-${dmg} CRIT DMG! [${nextCombo}x COMBO]`, undefined, undefined, "damage");
      setCombatLog((prev) => [
        `[CRIT STRIKE ${nextCombo}x] 100kg Heavy Compound blow dealt -${dmg} DMG! (Stagger: ${nextStagger}/1000)`,
        ...prev.slice(0, 3),
      ]);
      if (nextHp === 0) {
        sfx.playRankUp();
        spawnCombatNumber("BOSS SLAIN! +5,000 XP & MYTHIC DROPS", undefined, undefined, "xp");
      }
    } else if (type === "protein") {
      sfx.playStatPointAlloc();
      spawnCombatNumber("+160g PROTEIN BUFF!", undefined, undefined, "stat");
      setCombatLog((prev) => [
        `[PROTEIN INFUSION] 160g Whey & Soya absorbed! Fatigue wiped! Hunter ATK Buffed!`,
        ...prev.slice(0, 3),
      ]);
    } else if (type === "shadow") {
      sfx.playSubBassBoom();
      const comboMultiplier = nextCombo >= 3 ? 1.4 : 1.0;
      const dmg = Math.floor(1500 * comboMultiplier);
      const nextHp = Math.max(0, bossHp - dmg);
      setBossHp(nextHp);
      setStaggerHp(0);
      setShakeCrit(true);
      setTimeout(() => setShakeCrit(false), 300);
      spawnCombatNumber(`-${dmg} FATAL SHADOW CRIT!`, undefined, undefined, "damage");
      setCombatLog((prev) => [
        `[SHADOW DOMAIN] Sovereign Violet Mana exploded! -${dmg} FATAL DAMAGE! (ARMOR SHATTERED)`,
        ...prev.slice(0, 3),
      ]);
      if (nextHp === 0) {
        sfx.playRankUp();
        spawnCombatNumber("BOSS SLAIN! +5,000 XP & MYTHIC DROPS", undefined, undefined, "xp");
      }
    } else if (type === "overload") {
      sfx.playDemonRoar();
      const dmg = 2200;
      const nextHp = Math.max(0, bossHp - dmg);
      setBossHp(nextHp);
      setShakeCrit(true);
      setTimeout(() => setShakeCrit(false), 400);
      spawnCombatNumber(`-${dmg} ⚡ TITANIC OVERLOAD!`, undefined, undefined, "damage");
      setCombatLog((prev) => [
        `[⚡ 200KG DEADLIFT OVERLOAD] Armor pulverized! -${dmg} DESTRUCTIVE CRIT!`,
        ...prev.slice(0, 3),
      ]);
      if (nextHp === 0) {
        sfx.playRankUp();
        spawnCombatNumber("BOSS SLAIN! +5,000 XP & MYTHIC DROPS", undefined, undefined, "xp");
      }
    }
  };

  const resetBoss = () => {
    sfx.playClick();
    setBossHp(3000);
    setStaggerHp(1000);
    setComboCount(0);
    setCombatLog(["[SYSTEM RESET] Titan of Inertia respawned with 3,000 HP."]);
  };

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
      className="relative w-full bg-[#07060D] overflow-hidden"
    >
      {/* Seamless Volumetric Fog Portal Transition from Chapter 2 */}
      <div className="absolute top-0 inset-x-0 h-36 bg-gradient-to-b from-[#07060D] via-[#07060D]/80 to-transparent pointer-events-none z-20" />

      {/* Dumbbells Divider Texture (Parallax Accent) */}
      <div className="relative w-full h-16 sm:h-20 overflow-hidden opacity-20 pointer-events-none">
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
        className="w-full min-h-[100svh] flex flex-col justify-between px-4 sm:px-8 py-8 sm:py-16 overflow-hidden relative"
      >
        {/* Header HUD */}
        <div className="relative z-20 w-full max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 bg-system-blue/60 border border-system-accent/30 rounded text-[10px] sm:text-xs font-mono tracking-wider sm:tracking-wideSystem text-system-accent uppercase mb-2 whitespace-nowrap">
              <Swords className="w-3.5 h-3.5 animate-pulse" />
              <span>PHASE 03 // RAIDING THE DUNGEON</span>
            </div>
            <BladeSliceHeading
              as="h2"
              accentText="ENTER THE GAUNTLET."
              className="font-cinzel text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-wider text-system-text"
            >
              THE GYM IS YOUR DUNGEON.
            </BladeSliceHeading>
          </div>

          {/* Interactive Floor Fast-Travel Bar (Desktop/Tablet) */}
          <div className="hidden md:flex flex-wrap items-center gap-2">
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

        {/* Mobile Segmented Gauntlet vs Boss vs Armory Switcher */}
        <div className="flex md:hidden items-center justify-center gap-1.5 p-1 bg-black/60 border border-system-accent/20 rounded-xl my-4 font-mono text-[11px] w-full max-w-md mx-auto relative z-20">
          <button
            onClick={() => {
              sfx.playClick();
              setMobileCh3Tab('gauntlet');
            }}
            className={`flex-1 py-2 rounded-lg font-bold transition-all text-center ${
              mobileCh3Tab === 'gauntlet'
                ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(139,92,246,0.5)]'
                : 'text-system-muted hover:text-white'
            }`}
          >
            🏰 FLOORS
          </button>
          <button
            onClick={() => {
              sfx.playDemonRoar();
              setMobileCh3Tab('boss');
            }}
            className={`flex-1 py-2 rounded-lg font-bold transition-all text-center ${
              mobileCh3Tab === 'boss'
                ? 'bg-red-600 text-white shadow-[0_0_12px_rgba(239,68,68,0.5)]'
                : 'text-system-muted hover:text-white'
            }`}
          >
            ⚔️ BOSS RAID
          </button>
          <button
            onClick={() => {
              sfx.playBladeSlash();
              setMobileCh3Tab('armory');
              setTacticalTab('armory');
            }}
            className={`flex-1 py-2 rounded-lg font-bold transition-all text-center ${
              mobileCh3Tab === 'armory'
                ? 'bg-cyan-600 text-white shadow-[0_0_12px_rgba(6,182,212,0.5)]'
                : 'text-system-muted hover:text-white'
            }`}
          >
            🗡️ 3D WEAPONS
          </button>
        </div>

        {/* Centerpiece Visual Canvas (Desktop: Stacked Crossfade; Mobile: Active Stage Only) */}
        <div className={`relative z-10 w-full max-w-6xl mx-auto my-4 sm:my-8 flex-1 flex flex-col justify-center ${mobileCh3Tab === 'gauntlet' ? 'block' : 'hidden md:block'}`}>
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

          {/* Mobile Active Floor Stage (< 768px: Single interactive card with floor selector) */}
          <div className="block md:hidden w-full space-y-3">
            {/* Mobile Floor Tabs */}
            <div className="flex items-center justify-between gap-1 p-1 bg-black/70 border border-system-accent/30 rounded-xl font-mono text-[11px]">
              {STAGES.map((stg, i) => (
                <button
                  key={stg.id}
                  onClick={() => {
                    if (i === 3) sfx.playRankUp();
                    else sfx.playClick();
                    setActiveStage(i);
                  }}
                  className={`flex-1 py-1.5 rounded-lg font-bold transition-all text-center ${
                    activeStage === i
                      ? "bg-system-accent text-white shadow-[0_0_12px_rgba(139,92,246,0.6)]"
                      : "text-system-muted hover:text-white"
                  }`}
                >
                  F0{i + 1}
                </button>
              ))}
            </div>

            <div className="system-window corner-brackets rounded-xl overflow-hidden border border-system-accent/40 shadow-system-glow bg-black/80">
              <div className="relative w-full h-48 sm:h-64 overflow-hidden">
                <Image
                  src={STAGES[activeStage].image}
                  alt={STAGES[activeStage].floor}
                  fill
                  priority
                  sizes="100vw"
                  className={`object-cover ${
                    STAGES[activeStage].cropTopWatermark
                      ? "object-bottom scale-110"
                      : "object-center"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07060D] via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded bg-black/85 border border-purple-500/40 text-purple-300 font-mono text-[10px] font-bold shadow-md">
                  {STAGES[activeStage].counter}
                </div>
              </div>
              <div className="p-4 space-y-1">
                <div className="font-orbitron text-base font-bold text-system-text uppercase">
                  {STAGES[activeStage].floor}
                </div>
                <div className="font-inter text-xs text-system-muted">
                  {STAGES[activeStage].subtitle}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Interactive Dungeon Boss Raid Encounter Mini-Game with 3D AnimeTiltCard */}
        <div className={mobileCh3Tab === 'boss' ? 'block' : 'hidden md:block'}>
        <AnimeTiltCard
          maxTilt={5}
          glowColor="rgba(239, 68, 68, 0.35)"
          className="relative z-20 w-full max-w-6xl mx-auto my-4"
        >
          <div className={`p-4 sm:p-5 rounded-lg border bg-black/80 backdrop-blur-md transition-all duration-300 ${
            shakeCrit ? "border-red-500 shadow-[0_0_35px_rgba(239,68,68,0.7)] scale-[1.01]" : "border-system-accent/30 shadow-system-glow"
          }`}>
            {/* Boss Header & Health Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2 border-b border-system-accent/20 pb-2.5">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-red-500 animate-pulse" />
                <span className="font-orbitron text-xs sm:text-sm font-bold text-red-400 uppercase tracking-wider">
                  DUNGEON BOSS // TITAN OF INERTIA (FLOOR 04)
                </span>
                {comboCount > 1 && (
                  <span className="px-2 py-0.5 rounded bg-yellow-500/20 border border-yellow-500/40 text-yellow-300 font-mono text-[9px] font-bold animate-bounce">
                    {comboCount}x COMBO BUFF!
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 font-mono text-xs">
                <span className="text-yellow-400 font-bold">{bossHp > 0 ? `${bossHp} / 3,000 HP` : "[ BOSS SLAIN! ]"}</span>
                {bossHp === 0 && (
                  <button
                    onClick={resetBoss}
                    className="px-2 py-0.5 bg-yellow-500/20 text-yellow-300 border border-yellow-500/40 rounded text-[10px] hover:bg-yellow-500 hover:text-black transition-colors"
                  >
                    RESPAWN BOSS
                  </button>
                )}
              </div>
            </div>

            {/* Boss Dual Layer Meters: Layer 1 Stagger Armor, Layer 2 Primary HP */}
            <div className="space-y-1.5 mb-3.5">
              {/* Primary HP */}
              <div>
                <div className="flex justify-between items-center text-[9px] font-mono text-system-muted mb-0.5">
                  <span>BOSS HP VITALITY</span>
                  <span className="text-red-400 font-bold">{Math.round((bossHp / 3000) * 100)}%</span>
                </div>
                <div className="w-full h-3 bg-black/90 rounded-full border border-red-500/40 overflow-hidden p-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 rounded-full transition-all duration-300 shadow-[0_0_12px_rgba(239,68,68,0.8)]"
                    style={{ width: `${(bossHp / 3000) * 100}%` }}
                  />
                </div>
              </div>

              {/* Stagger Gauge */}
              <div>
                <div className="flex justify-between items-center text-[9px] font-mono text-system-muted mb-0.5">
                  <span>ARMOR STAGGER GAUGE</span>
                  <span className="text-cyan-400 font-bold">{staggerHp > 0 ? `${staggerHp}/1000` : "STAGGERED!"}</span>
                </div>
                <div className="w-full h-1.5 bg-black/90 rounded-full border border-cyan-500/30 overflow-hidden">
                  <div
                    className="h-full bg-cyan-400 transition-all duration-300"
                    style={{ width: `${(staggerHp / 1000) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Mythic Loot Victory Banner when Boss is Defeated */}
            {bossHp === 0 && (
              <div className="mb-3 p-3 rounded-lg bg-yellow-950/40 border border-yellow-500/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-yellow-300 font-mono text-xs shadow-[0_0_20px_rgba(234,179,8,0.4)] animate-pulse">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-yellow-400 shrink-0" />
                  <div>
                    <strong className="text-white uppercase">[MYTHIC DROP UNLOCKED]</strong>: Casaka&apos;s Poison Dagger (+20kg 1RM Strength Buff)
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-yellow-500 text-black font-bold text-[10px]">CLAIMED</span>
              </div>
            )}

            {/* Player Attack Moves & Combat Telemetry */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              {/* 4 Combat Moves */}
              <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
                <button
                  onClick={() => strikeBoss("heavy")}
                  disabled={bossHp <= 0}
                  onMouseEnter={() => sfx.playHover()}
                  className="p-2 sm:p-2.5 rounded bg-red-950/40 border border-red-500/40 hover:border-red-500 hover:bg-red-900/60 text-red-300 font-mono text-[10px] sm:text-xs font-bold uppercase transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed text-center"
                >
                  <div>[ HEAVY STRIKE ]</div>
                  <div className="text-[9px] text-system-muted font-normal mt-0.5">100kg Squat</div>
                </button>

                <button
                  onClick={() => strikeBoss("protein")}
                  disabled={bossHp <= 0}
                  onMouseEnter={() => sfx.playHover()}
                  className="p-2 sm:p-2.5 rounded bg-system-cyan/20 border border-system-cyan/40 hover:border-system-cyan hover:bg-system-cyan/40 text-cyan-300 font-mono text-[10px] sm:text-xs font-bold uppercase transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed text-center"
                >
                  <div>[ MACRO BUFF ]</div>
                  <div className="text-[9px] text-system-muted font-normal mt-0.5">160g Protein</div>
                </button>

                <button
                  onClick={() => strikeBoss("shadow")}
                  disabled={bossHp <= 0}
                  onMouseEnter={() => sfx.playHover()}
                  className="p-2 sm:p-2.5 rounded bg-system-accent/30 border border-system-accent/50 hover:border-white hover:bg-system-accent/60 text-purple-200 font-mono text-[10px] sm:text-xs font-bold uppercase transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed text-center shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                >
                  <div>[ SHADOW CRIT ]</div>
                  <div className="text-[9px] text-system-muted font-normal mt-0.5">1,500 FATAL</div>
                </button>

                <button
                  onClick={() => strikeBoss("overload")}
                  disabled={bossHp <= 0}
                  onMouseEnter={() => sfx.playHover()}
                  className={`p-2 sm:p-2.5 rounded font-mono text-[10px] sm:text-xs font-bold uppercase transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed text-center ${
                    staggerHp <= 0 && bossHp > 0
                      ? "bg-yellow-500 text-black border border-yellow-300 shadow-[0_0_20px_rgba(245,197,66,0.8)] animate-pulse"
                      : "bg-amber-950/40 border border-amber-500/40 text-amber-300 hover:border-amber-400 hover:bg-amber-900/60"
                  }`}
                >
                  <div>[ ⚡ OVERLOAD ]</div>
                  <div className="text-[9px] text-system-muted font-normal mt-0.5">200kg Pull</div>
                </button>
              </div>

              {/* Combat Log Box */}
              <div className="md:col-span-4 p-2 bg-black/60 border border-white/10 rounded font-mono text-[10px] space-y-1 h-16 overflow-hidden">
                {combatLog.map((log, idx) => (
                  <div
                    key={idx}
                    className={`truncate ${idx === 0 ? "text-yellow-300 font-semibold" : "text-system-muted/70"}`}
                  >
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimeTiltCard>
        </div>

        {/* Tactical Dungeon Terminal & 3D Shadow Armory Switcher */}
        <div className={`relative z-20 w-full max-w-6xl mx-auto my-6 font-mono ${mobileCh3Tab === 'armory' ? 'block' : 'hidden md:block'}`}>
          <div className="flex items-center justify-between border-b border-system-accent/25 pb-3 mb-6 flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-system-cyan animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-system-text">
                [ TACTICAL DUNGEON MODULE // SYSTEM LEVEL 03 ]
              </span>
            </div>

            {/* Mobile-Friendly Tactical Navigation Pills */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                onClick={() => {
                  sfx.playClick();
                  setTacticalTab('armory');
                }}
                onMouseEnter={() => sfx.playHover()}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                  tacticalTab === 'armory'
                    ? 'bg-purple-600 text-white border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                    : 'bg-black/50 border-white/10 text-gray-400 hover:text-white hover:border-purple-500/30'
                }`}
              >
                🗡️ 3D WEAPONS ARMORY
              </button>

              <button
                onClick={() => {
                  sfx.playClick();
                  setTacticalTab('timer');
                }}
                onMouseEnter={() => sfx.playHover()}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                  tacticalTab === 'timer'
                    ? 'bg-cyan-600 text-white border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                    : 'bg-black/50 border-white/10 text-gray-400 hover:text-white hover:border-cyan-500/30'
                }`}
              >
                ⏱️ REST & BREATHING
              </button>

              <button
                onClick={() => {
                  sfx.playClick();
                  setTacticalTab('warmup');
                }}
                onMouseEnter={() => sfx.playHover()}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                  tacticalTab === 'warmup'
                    ? 'bg-blue-600 text-white border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.4)]'
                    : 'bg-black/50 border-white/10 text-gray-400 hover:text-white hover:border-blue-500/30'
                }`}
              >
                🤸 MOBILITY CIRCUIT
              </button>

              <button
                onClick={() => {
                  sfx.playClick();
                  setTacticalTab('gauntlet');
                }}
                onMouseEnter={() => sfx.playHover()}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                  tacticalTab === 'gauntlet'
                    ? 'bg-red-600 text-white border-red-400 shadow-[0_0_15px_rgba(239,68,68,0.4)]'
                    : 'bg-black/50 border-white/10 text-gray-400 hover:text-white hover:border-red-500/30'
                }`}
              >
                👹 4-BOSS GAUNTLET
              </button>
            </div>
          </div>

          {/* Active Module View */}
          <div className="w-full">
            {tacticalTab === 'armory' && <ThreeDaggerArmory />}
            {tacticalTab === 'timer' && <RestTimerMetronome />}
            {tacticalTab === 'warmup' && <DungeonWarmupCircuit />}
            {tacticalTab === 'gauntlet' && <DungeonBossGauntlet />}
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
