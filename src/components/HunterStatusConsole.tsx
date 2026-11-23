"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, Award, Shield, Swords, Flame, Sparkles, Trophy, Zap, Utensils, CheckCircle2 } from "lucide-react";
import { spawnCombatNumber } from "@/components/effects/FloatingDamageNumbers";
import { sfx } from "@/lib/audio-sfx";

interface Artifact {
  id: string;
  name: string;
  grade: "MYTHIC" | "LEGENDARY" | "S-RANK" | "RARE";
  effect: string;
  equipped: boolean;
  color: string;
}

export function HunterStatusConsole() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"vitals" | "gear" | "diet">("vitals");

  const [artifacts, setArtifacts] = useState<Artifact[]>([
    {
      id: "casaka",
      name: "Casaka's Poison Fang",
      grade: "MYTHIC",
      effect: "+25 STR Compound Push/Pull",
      equipped: true,
      color: "text-amber-400 border-amber-500/50 bg-amber-950/30",
    },
    {
      id: "demon-dagger",
      name: "Demon Monarch's Dagger",
      grade: "LEGENDARY",
      effect: "+40 AGI Speed & Rest Recovery",
      equipped: true,
      color: "text-purple-400 border-purple-500/50 bg-purple-950/30",
    },
    {
      id: "orb-avarice",
      name: "Orb of Avarice",
      grade: "S-RANK",
      effect: "+100% Nutrient Absorption",
      equipped: false,
      color: "text-red-400 border-red-500/50 bg-red-950/30",
    },
    {
      id: "desi-whey",
      name: "Elixir of Desi Whey",
      grade: "RARE",
      effect: "+45g Peak Leucine Spike",
      equipped: true,
      color: "text-cyan-400 border-cyan-500/50 bg-cyan-950/30",
    },
  ]);

  const [dailyDiet, setDailyDiet] = useState([
    { name: "200g Low-Fat Paneer Bhurji", p: "36g P", logged: true },
    { name: "100g Soya Chunks Pulao", p: "52g P", logged: true },
    { name: "1 Scoop Gold Whey Isolate", p: "27g P", logged: false },
    { name: "4 Whole Boiled Eggs", p: "24g P", logged: false },
  ]);

  const toggleArtifact = (id: string) => {
    sfx.playBladeSlash();
    setArtifacts((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const next = !item.equipped;
          spawnCombatNumber(next ? `EQUIPPED: ${item.name}` : `UNEQUIPPED: ${item.name}`, undefined, undefined, next ? "stat" : "mana");
          return { ...item, equipped: next };
        }
        return item;
      })
    );
  };

  const toggleDiet = (idx: number) => {
    sfx.playStatPointAlloc();
    setDailyDiet((prev) =>
      prev.map((item, i) => {
        if (i === idx) {
          const next = !item.logged;
          if (next) spawnCombatNumber(`LOGGED ${item.p}! +150 XP`, undefined, undefined, "xp");
          return { ...item, logged: next };
        }
        return item;
      })
    );
  };

  // Keyboard shortcut listener ('C' key toggles character sheet)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "c" || e.key === "C") {
        setIsOpen((prev) => {
          const next = !prev;
          if (next) sfx.playRankAscent();
          else sfx.playClick();
          return next;
        });
      }
    };
    const handleCustomOpen = () => {
      setIsOpen(true);
      sfx.playRankAscent();
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-hunter-console", handleCustomOpen);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-hunter-console", handleCustomOpen);
    };
  }, []);

  return (
    <>
      {/* Floating trigger handled cleanly by unified HunterCommandDock */}

      {/* Cyberpunk Holographic Character Sheet Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg animate-fade-in">
          {/* Modal Container */}
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto system-window corner-brackets p-6 sm:p-8 rounded-2xl border-system-gold/50 shadow-[0_0_60px_rgba(139,92,246,0.4)] space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-system-gold/30 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-system-gold/20 border border-system-gold/50 flex items-center justify-center font-cinzel font-black text-xl text-system-gold shadow-md">
                  S+
                </div>
                <div>
                  <div className="font-cinzel text-lg sm:text-xl font-bold uppercase text-white tracking-wider flex items-center gap-2">
                    <span>SUNG JIN-WOO (성진우)</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-purple-500/20 border border-purple-500/40 text-purple-300 rounded">
                      LV. 88
                    </span>
                  </div>
                  <div className="font-mono text-xs text-system-gold">
                    TITLE: SHADOW MONARCH // S-RANK SOVEREIGN
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  sfx.playClick();
                  setIsOpen(false);
                }}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-system-muted hover:text-white transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-2 border-b border-white/10 pb-3">
              {[
                { id: "vitals", label: "VITALS & 1RM", icon: Flame },
                { id: "gear", label: "EQUIPPED ARTIFACTS", icon: Swords },
                { id: "diet", label: "DESI NUTRITION LOG", icon: Utensils },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      sfx.playClick();
                      setActiveTab(tab.id as "vitals" | "gear" | "diet");
                    }}
                    onMouseEnter={() => sfx.playHover()}
                    className={`px-4 py-2 rounded-lg font-mono text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer ${
                      activeTab === tab.id
                        ? "bg-system-gold text-black shadow-[0_0_15px_rgba(245,197,66,0.6)]"
                        : "bg-black/40 border border-white/10 text-system-muted hover:text-white"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab 1: Vitals & 1RM Matrix */}
            {activeTab === "vitals" && (
              <div className="space-y-6 font-mono text-xs">
                {/* Vitals Gauges */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 bg-black/60 border border-emerald-500/40 rounded-xl space-y-1.5">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-system-muted">HIT POINTS [HP]</span>
                      <span className="text-emerald-400 font-bold">14,250 / 14,250</span>
                    </div>
                    <div className="w-full h-2 bg-black/90 rounded-full overflow-hidden border border-emerald-500/20">
                      <div className="w-full h-full bg-emerald-400" />
                    </div>
                  </div>

                  <div className="p-3 bg-black/60 border border-cyan-500/40 rounded-xl space-y-1.5">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-system-muted">MANA POINTS [MP]</span>
                      <span className="text-cyan-400 font-bold">8,920 / 8,920</span>
                    </div>
                    <div className="w-full h-2 bg-black/90 rounded-full overflow-hidden border border-cyan-500/20">
                      <div className="w-full h-full bg-cyan-400" />
                    </div>
                  </div>

                  <div className="p-3 bg-black/60 border border-amber-500/40 rounded-xl space-y-1.5">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-system-muted">FATIGUE</span>
                      <span className="text-amber-400 font-bold">0% [WELL RESTED]</span>
                    </div>
                    <div className="w-full h-2 bg-black/90 rounded-full overflow-hidden border border-amber-500/20">
                      <div className="w-[5%] h-full bg-amber-400" />
                    </div>
                  </div>
                </div>

                {/* Core Attributes */}
                <div className="p-4 bg-black/60 border border-system-accent/30 rounded-xl space-y-3">
                  <div className="text-[11px] text-system-accent uppercase font-bold tracking-wider">
                    CALIBRATED BIOMETRIC ATTRIBUTES
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                    <div className="p-2.5 bg-black/40 border border-white/5 rounded-lg">
                      <div className="text-[10px] text-system-muted">STRENGTH [STR]</div>
                      <div className="text-lg font-bold text-white mt-1">128</div>
                    </div>
                    <div className="p-2.5 bg-black/40 border border-white/5 rounded-lg">
                      <div className="text-[10px] text-system-muted">AGILITY [AGI]</div>
                      <div className="text-lg font-bold text-cyan-300 mt-1">115</div>
                    </div>
                    <div className="p-2.5 bg-black/40 border border-white/5 rounded-lg">
                      <div className="text-[10px] text-system-muted">VITALITY [VIT]</div>
                      <div className="text-lg font-bold text-emerald-300 mt-1">122</div>
                    </div>
                    <div className="p-2.5 bg-black/40 border border-white/5 rounded-lg">
                      <div className="text-[10px] text-system-muted">DISCIPLINE</div>
                      <div className="text-lg font-bold text-system-gold mt-1">100/100</div>
                    </div>
                  </div>
                </div>

                {/* Real-World Estimated 1RM */}
                <div className="p-4 bg-yellow-950/20 border border-system-gold/40 rounded-xl space-y-3">
                  <div className="text-[11px] text-system-gold uppercase font-bold tracking-wider flex justify-between">
                    <span>ESTIMATED REAL-WORLD 1RM COMPOUND LIFTS</span>
                    <span className="text-white/60">INDIAN LIFTER SCALE</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-2 bg-black/50 border border-system-gold/30 rounded-lg">
                      <div className="text-[10px] text-system-muted">FLAT BENCH</div>
                      <div className="text-base font-bold text-white mt-0.5">140 KG</div>
                    </div>
                    <div className="p-2 bg-black/50 border border-system-gold/30 rounded-lg">
                      <div className="text-[10px] text-system-muted">BARBELL SQUAT</div>
                      <div className="text-base font-bold text-cyan-300 mt-0.5">180 KG</div>
                    </div>
                    <div className="p-2 bg-black/50 border border-system-gold/30 rounded-lg">
                      <div className="text-[10px] text-system-muted">DEADLIFT</div>
                      <div className="text-base font-bold text-yellow-400 mt-0.5">220 KG</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Equipped Artifacts */}
            {activeTab === "gear" && (
              <div className="space-y-4 font-mono text-xs">
                <div className="text-[11px] text-system-muted uppercase tracking-wider">
                  TAP ANY ARTIFACT TO EQUIP OR UNEQUIP:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {artifacts.map((art) => (
                    <button
                      key={art.id}
                      onClick={() => toggleArtifact(art.id)}
                      onMouseEnter={() => sfx.playHover()}
                      className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all hover:scale-[1.02] cursor-pointer ${art.color} ${
                        art.equipped ? "ring-2 ring-white/40 shadow-lg" : "opacity-50"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="font-cinzel font-bold text-sm text-white">{art.name}</div>
                          <div className="text-[10px] opacity-80 mt-0.5">{art.grade} GRADE</div>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${art.equipped ? "bg-white text-black" : "bg-black/60 text-white/60"}`}>
                          {art.equipped ? "EQUIPPED" : "BAG"}
                        </span>
                      </div>
                      <div className="text-[11px] font-semibold text-white/90 border-t border-white/10 pt-2">
                        {art.effect}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Desi Nutrition Log */}
            {activeTab === "diet" && (
              <div className="space-y-4 font-mono text-xs">
                <div className="flex justify-between items-center text-[11px] text-system-muted">
                  <span>TODAY&apos;S INDIAN MACRO INTAKE CHECKLIST:</span>
                  <span className="text-system-gold font-bold">TARGET: 140g+ PROTEIN</span>
                </div>
                <div className="space-y-2">
                  {dailyDiet.map((meal, idx) => (
                    <button
                      key={idx}
                      onClick={() => toggleDiet(idx)}
                      onMouseEnter={() => sfx.playHover()}
                      className={`w-full p-3.5 rounded-xl border flex items-center justify-between text-left transition-all cursor-pointer ${
                        meal.logged
                          ? "bg-emerald-950/40 border-emerald-500/60 text-white shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                          : "bg-black/50 border-white/10 text-system-muted hover:text-white hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className={`w-4 h-4 ${meal.logged ? "text-emerald-400" : "text-system-muted/40"}`} />
                        <span className={`font-semibold ${meal.logged ? "line-through opacity-90" : ""}`}>
                          {meal.name}
                        </span>
                      </div>
                      <span className="font-bold text-system-gold shrink-0">{meal.p}</span>
                    </button>
                  ))}
                </div>
                <div className="p-3 bg-black/60 border border-system-accent/30 rounded-xl flex justify-between items-center text-[11px]">
                  <span>TOTAL ESTIMATED PROTEIN TODAY:</span>
                  <span className="text-emerald-400 font-bold text-sm">
                    {dailyDiet.filter((d) => d.logged).reduce((acc, cur) => acc + parseInt(cur.p), 0)}g / 140g
                  </span>
                </div>
              </div>
            )}

            {/* Modal Footer Note */}
            <div className="text-center font-mono text-[10px] text-system-muted/70 pt-2 border-t border-white/10">
              [ PRESS &apos;C&apos; OR TAP OUTSIDE TO RETURN TO DUNGEON ]
            </div>
          </div>
        </div>
      )}
    </>
  );
}
