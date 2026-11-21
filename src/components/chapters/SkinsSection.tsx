"use client";

import { useState } from "react";
import Image from "next/image";
import { Palette, Sparkles, Check, Lock } from "lucide-react";

interface SkinTheme {
  id: string;
  name: string;
  tagline: string;
  accent: string;
  glow: string;
  badge: string;
  unlockedAt: string;
  previewClass: string;
}

const SYSTEM_SKINS: SkinTheme[] = [
  {
    id: "obsidian",
    name: "OBSIDIAN SHADOW",
    tagline: "The Sovereign Monarch standard. Deep void purple with electric violet runes.",
    accent: "#8B5CF6",
    glow: "rgba(139, 92, 246, 0.5)",
    badge: "DEFAULT THEME",
    unlockedAt: "UNLOCKED AT RANK E",
    previewClass: "border-purple-500/40 from-purple-950/40 via-black to-black",
  },
  {
    id: "solar",
    name: "SOLAR FLARE",
    tagline: "Combustion of iron will. High-heat crimson amber for lifters pushing raw PRs.",
    accent: "#F97316",
    glow: "rgba(249, 115, 22, 0.5)",
    badge: "PREMIUM THEME",
    unlockedAt: "UNLOCKED AT 30-DAY STREAK",
    previewClass: "border-orange-500/40 from-orange-950/40 via-black to-black",
  },
  {
    id: "jade",
    name: "JADE CIPHER",
    tagline: "Digital bio-synthetic matrix. Neon emerald clarity calibrated for hyper-focus.",
    accent: "#10B981",
    glow: "rgba(16, 185, 129, 0.5)",
    badge: "ELITE REWARD",
    unlockedAt: "UNLOCKED AT RANK A",
    previewClass: "border-emerald-500/40 from-emerald-950/40 via-black to-black",
  },
];

export function SkinsSection() {
  const [activeSkin, setActiveSkin] = useState<string>("obsidian");

  return (
    <section
      id="skins-armory"
      className="relative w-full bg-[#07060D] border-t border-system-accent/15 py-20 px-4 sm:px-8 overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-system-accent/20 border border-system-accent/40 rounded text-xs font-mono tracking-wideSystem text-system-accent uppercase">
            <Palette className="w-3.5 h-3.5" />
            <span>THE ARMORY // SYSTEM SKINS</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-black uppercase tracking-wider text-system-text">
            CUSTOMIZE YOUR SYSTEM.
          </h2>
          <p className="font-inter text-xs sm:text-sm text-system-muted">
            Earn unlockable HUD themes as you hit streaks and rank milestones. No pay-to-win. True cosmetic trophies earned through sweat.
          </p>
        </div>

        {/* 3D Tilt Skin Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {SYSTEM_SKINS.map((skin) => {
            const isEquipped = activeSkin === skin.id;

            return (
              <div
                key={skin.id}
                onClick={() => setActiveSkin(skin.id)}
                className={`system-window corner-brackets p-6 rounded flex flex-col justify-between cursor-pointer transition-all duration-300 relative overflow-hidden group bg-gradient-to-b ${skin.previewClass} ${
                  isEquipped ? "ring-2 ring-system-glow scale-[1.02]" : "hover:border-system-text/40"
                }`}
                style={{
                  boxShadow: isEquipped ? `0 0 30px ${skin.glow}` : "none",
                }}
              >
                {/* Decorative Top Accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ backgroundColor: skin.accent }}
                />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span
                      className="text-[10px] font-mono tracking-wideSystem px-2.5 py-0.5 rounded border"
                      style={{
                        borderColor: skin.accent,
                        color: skin.accent,
                        backgroundColor: "rgba(0,0,0,0.5)",
                      }}
                    >
                      {skin.badge}
                    </span>
                    {isEquipped ? (
                      <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                        <Check className="w-3.5 h-3.5" />
                        EQUIPPED
                      </span>
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-system-muted" />
                    )}
                  </div>

                  {/* Visual Preview Window */}
                  <div className="h-44 w-full rounded border border-white/10 bg-black/80 p-4 flex flex-col justify-between font-mono text-[11px] relative overflow-hidden">
                    <div className="flex justify-between items-center text-system-muted border-b border-white/10 pb-2">
                      <span>HUD THEME PREVIEW</span>
                      <span style={{ color: skin.accent }}>● ACTIVE</span>
                    </div>

                    <div className="space-y-1.5 py-2">
                      <div className="flex justify-between">
                        <span className="text-system-muted">QUEST STATUS</span>
                        <span style={{ color: skin.accent }}>IN PROGRESS</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: "72%",
                            backgroundColor: skin.accent,
                          }}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] text-system-muted">
                        <span>XP: 7,200</span>
                        <span>TARGET: 10,000</span>
                      </div>
                    </div>

                    <div
                      className="text-[10px] uppercase tracking-wider text-center py-1 rounded border"
                      style={{
                        borderColor: skin.accent,
                        color: skin.accent,
                        backgroundColor: "rgba(0,0,0,0.4)",
                      }}
                    >
                      AURA INTENSITY: MAX
                    </div>
                  </div>

                  <h3 className="font-cinzel text-xl font-bold uppercase text-system-text tracking-wide">
                    {skin.name}
                  </h3>
                  <p className="font-inter text-xs text-system-muted leading-relaxed">
                    {skin.tagline}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 mt-4 flex items-center justify-between text-xs font-mono">
                  <span className="text-system-muted">{skin.unlockedAt}</span>
                  <span
                    className="font-bold underline"
                    style={{ color: skin.accent }}
                  >
                    {isEquipped ? "IN USE" : "TAP TO PREVIEW"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
