"use client";

import { useState } from "react";
import Image from "next/image";
import { Award, Zap, ChevronRight, Shield, Flame } from "lucide-react";

interface RankTier {
  rank: "E" | "D" | "C" | "B" | "A" | "S";
  title: string;
  tagline: string;
  xpRequired: string;
  image: string;
  accentColor: string;
  glowColor: string;
  stats: {
    str: number;
    vit: number;
    agi: number;
    discipline: number;
  };
  unlocks: string[];
}

const RANK_TIERS: RankTier[] = [
  {
    rank: "E",
    title: "THE WEAKEST HUNTER",
    tagline: "Scrawny, exhausted, unsure if lifting even works.",
    xpRequired: "0 - 500 XP",
    image: "/assets/07-ranks/rank-e-d-alone.webp",
    accentColor: "#38BDF8", // Cyan
    glowColor: "rgba(56, 189, 248, 0.4)",
    stats: { str: 12, vit: 15, agi: 18, discipline: 20 },
    unlocks: ["Daily Quest Log", "Basic Macro Tracking", "Floor 01 Dungeon Access"],
  },
  {
    rank: "D",
    title: "THE AWAKENED",
    tagline: "First callus forms. Soreness turns into hunger.",
    xpRequired: "500 - 2,500 XP",
    image: "/assets/07-ranks/rank-e-d-alone.webp",
    accentColor: "#60A5FA", // Blue
    glowColor: "rgba(96, 165, 250, 0.4)",
    stats: { str: 28, vit: 32, agi: 35, discipline: 45 },
    unlocks: ["Indian Recipe Hacks", "Progressive Overload Tracker", "7-Day Streak Shield"],
  },
  {
    rank: "C",
    title: "IRON VANGUARD",
    tagline: "Shoulders widen. Friends start asking what you're eating.",
    xpRequired: "2,500 - 7,500 XP",
    image: "/assets/07-ranks/rank-a-aura.webp",
    accentColor: "#818CF8", // Indigo
    glowColor: "rgba(129, 140, 248, 0.4)",
    stats: { str: 48, vit: 50, agi: 52, discipline: 68 },
    unlocks: ["AI Coach Numeric Advice", "Dungeon Radar (Gym Finder)", "Creatine XP Multiplier"],
  },
  {
    rank: "B",
    title: "SHADOW STRIKER",
    tagline: "100kg bench clearance. The gym stops being intimidating.",
    xpRequired: "7,500 - 18,000 XP",
    image: "/assets/07-ranks/rank-a-aura.webp",
    accentColor: "#A78BFA", // Violet
    glowColor: "rgba(167, 139, 250, 0.5)",
    stats: { str: 72, vit: 75, agi: 70, discipline: 85 },
    unlocks: ["Berserk Streak Mode", "Obsidian Theme Skin", "Hypertrophy Recovery Analysis"],
  },
  {
    rank: "A",
    title: "SOVEREIGN MONARCH",
    tagline: "V-taper locked. Veins visible through your forearms.",
    xpRequired: "18,000 - 40,000 XP",
    image: "/assets/07-ranks/rank-a-aura.webp",
    accentColor: "#C084FC", // Purple
    glowColor: "rgba(192, 132, 252, 0.6)",
    stats: { str: 90, vit: 92, agi: 88, discipline: 96 },
    unlocks: ["Leaderboard Crown", "Elite Raid Dungeons", "Solar Flare Armor"],
  },
  {
    rank: "S",
    title: "TRANSCENDENT HUNTER",
    tagline: "Monstrous physique. You walk into any room and command gravity.",
    xpRequired: "40,000+ XP",
    image: "/assets/07-ranks/rank-s-max.webp",
    accentColor: "#F5C542", // Gold
    glowColor: "rgba(245, 197, 66, 0.7)",
    stats: { str: 99, vit: 99, agi: 99, discipline: 100 },
    unlocks: ["S-Rank Sovereign Aura", "Arise Command Rights", "Zero Deceleration State"],
  },
];

export function Chapter7() {
  const [selectedRank, setSelectedRank] = useState<RankTier>(RANK_TIERS[0]);

  return (
    <section
      id="chapter-7"
      className="relative w-full bg-[#07060D] border-t border-system-accent/15 py-20 px-4 sm:px-8 overflow-hidden"
    >
      {/* Background Radial Glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-colors duration-700"
        style={{
          background: `radial-gradient(circle at 30% 50%, ${selectedRank.glowColor} 0%, transparent 60%)`,
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-system-accent/20 border border-system-accent/40 rounded text-xs font-mono tracking-wideSystem text-system-accent uppercase">
            <Award className="w-3.5 h-3.5" />
            <span>PHASE 07 // EVOLUTION LADDER</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-black uppercase tracking-wider text-system-text">
            RANK UP: FROM E TO S.
          </h2>
          <p className="font-inter text-xs sm:text-sm text-system-muted">
            In Level Up, your rank is not given—it is forged with sweat, protein, and progressive overload. Select any tier to inspect your future stats.
          </p>
        </div>

        {/* Rank Selection Tabs */}
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 p-2 bg-system-panel/60 border border-system-accent/20 rounded-lg max-w-3xl mx-auto backdrop-blur-md">
          {RANK_TIERS.map((tier) => {
            const isSelected = selectedRank.rank === tier.rank;
            const isGold = tier.rank === "S";

            return (
              <button
                key={tier.rank}
                onClick={() => setSelectedRank(tier)}
                className={`relative px-4 sm:px-6 py-2.5 rounded transition-all duration-300 font-cinzel text-sm sm:text-base font-bold flex items-center gap-2 ${
                  isSelected
                    ? isGold
                      ? "bg-system-gold text-black shadow-[0_0_20px_rgba(245,197,66,0.6)]"
                      : "bg-system-accent text-white shadow-[0_0_20px_rgba(139,92,246,0.5)]"
                    : "text-system-muted hover:text-system-text hover:bg-system-accent/10"
                }`}
              >
                <span>RANK {tier.rank}</span>
                {isGold && (
                  <span className="text-[10px] px-1 py-0.2 rounded font-mono bg-black text-system-gold uppercase">
                    MAX
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Main Rank Showcase: Left sticky visual + Right HUD details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Hunter Form Image (5 cols) */}
          <div className="lg:col-span-5 relative w-full h-[400px] sm:h-[500px] rounded-lg overflow-hidden border border-system-accent/30 bg-black/80 flex items-center justify-center group">
            <Image
              src={selectedRank.image}
              alt={`Hunter Rank ${selectedRank.rank}`}
              fill
              className="object-cover object-top transition-all duration-700"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            {/* Top & Bottom Vignettes */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#07060D] via-transparent to-transparent" />
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#07060D]/80" />

            {/* Rank Badge Stamp */}
            <div
              className="absolute top-4 left-4 p-3 rounded border backdrop-blur-md flex items-center gap-3"
              style={{
                borderColor: selectedRank.accentColor,
                backgroundColor: "rgba(7, 6, 13, 0.85)",
              }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-cinzel font-black text-xl text-black"
                style={{ backgroundColor: selectedRank.accentColor }}
              >
                {selectedRank.rank}
              </div>
              <div>
                <div className="font-cinzel text-xs font-bold text-system-text tracking-wider">
                  {selectedRank.title}
                </div>
                <div className="font-mono text-[10px] text-system-muted">
                  EXP: {selectedRank.xpRequired}
                </div>
              </div>
            </div>

            {/* Bottom Tagline */}
            <div className="absolute bottom-4 left-4 right-4 p-3 bg-system-panel/90 border border-system-accent/20 rounded backdrop-blur-sm">
              <p className="font-inter text-xs italic text-system-text text-center">
                &ldquo;{selectedRank.tagline}&rdquo;
              </p>
            </div>
          </div>

          {/* Right: Hunter Stat Matrix & Unlocked Perks (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="system-window corner-brackets p-6 sm:p-8 rounded space-y-6">
              
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-system-accent/15 pb-4">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wideSystem text-system-accent">
                    STATUS WINDOW // SPECIFICATION
                  </span>
                  <h3 className="font-cinzel text-2xl sm:text-3xl font-bold uppercase text-system-text">
                    RANK {selectedRank.rank}: {selectedRank.title}
                  </h3>
                </div>
                <div
                  className="px-3 py-1 rounded text-xs font-mono font-bold uppercase border"
                  style={{
                    borderColor: selectedRank.accentColor,
                    color: selectedRank.accentColor,
                    backgroundColor: "rgba(0,0,0,0.4)",
                  }}
                >
                  XP CAP: {selectedRank.xpRequired}
                </div>
              </div>

              {/* Stat Gauges (STR, VIT, AGI, DISCIPLINE) */}
              <div className="space-y-4">
                <div className="font-mono text-xs uppercase tracking-wider text-system-muted">
                  BIOMETRIC COMBAT METRICS
                </div>

                {/* STR */}
                <div className="space-y-1">
                  <div className="flex justify-between font-mono text-xs">
                    <span className="text-system-text font-bold">STRENGTH [STR]</span>
                    <span className="text-system-accent font-bold">{selectedRank.stats.str} / 100</span>
                  </div>
                  <div className="h-2 w-full bg-system-blue/40 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-system-accent transition-all duration-700 rounded-full"
                      style={{ width: `${selectedRank.stats.str}%` }}
                    />
                  </div>
                </div>

                {/* VIT */}
                <div className="space-y-1">
                  <div className="flex justify-between font-mono text-xs">
                    <span className="text-system-text font-bold">VITALITY [VIT]</span>
                    <span className="text-system-glow font-bold">{selectedRank.stats.vit} / 100</span>
                  </div>
                  <div className="h-2 w-full bg-system-blue/40 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-system-glow transition-all duration-700 rounded-full"
                      style={{ width: `${selectedRank.stats.vit}%` }}
                    />
                  </div>
                </div>

                {/* AGI */}
                <div className="space-y-1">
                  <div className="flex justify-between font-mono text-xs">
                    <span className="text-system-text font-bold">AGILITY [AGI]</span>
                    <span className="text-blue-400 font-bold">{selectedRank.stats.agi} / 100</span>
                  </div>
                  <div className="h-2 w-full bg-system-blue/40 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-400 transition-all duration-700 rounded-full"
                      style={{ width: `${selectedRank.stats.agi}%` }}
                    />
                  </div>
                </div>

                {/* DISCIPLINE */}
                <div className="space-y-1">
                  <div className="flex justify-between font-mono text-xs">
                    <span className="text-system-text font-bold">DISCIPLINE [CORE]</span>
                    <span
                      className="font-bold"
                      style={{ color: selectedRank.accentColor }}
                    >
                      {selectedRank.stats.discipline} / 100
                    </span>
                  </div>
                  <div className="h-2 w-full bg-system-blue/40 rounded-full overflow-hidden">
                    <div
                      className="h-full transition-all duration-700 rounded-full"
                      style={{
                        width: `${selectedRank.stats.discipline}%`,
                        backgroundColor: selectedRank.accentColor,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Unlocked Abilities / Perks */}
              <div className="pt-2 border-t border-system-accent/15 space-y-3">
                <div className="font-mono text-xs uppercase tracking-wider text-system-muted flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-system-accent" />
                  <span>UNLOCKED SYSTEM PERKS</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {selectedRank.unlocks.map((perk, i) => (
                    <div
                      key={i}
                      className="p-2.5 bg-system-panel/80 border border-system-accent/20 rounded text-[11px] font-mono text-system-text flex items-center gap-1.5"
                    >
                      <ChevronRight className="w-3 h-3 text-system-accent shrink-0" />
                      <span className="truncate">{perk}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
