"use client";

import { useState } from "react";
import Image from "next/image";
import { Utensils, Sparkles, Check, Flame, Calculator, ChevronRight, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { DecodeText } from "@/components/ui/DecodeText";
import { BladeSliceHeading } from "@/components/ui/BladeSliceHeading";
import { AnimeTiltCard } from "@/components/ui/AnimeTiltCard";
import { DesiMealCombinator } from "@/components/ui/DesiMealCombinator";
import { ManaBrewFormulator } from "@/components/ui/ManaBrewFormulator";
import { HydrationChamber } from "@/components/ui/HydrationChamber";
import { MacroSwapper } from "@/components/ui/MacroSwapper";
import { MetabolicEngine } from "@/components/ui/MetabolicEngine";
import { DesiProteinBudgetRanker } from "@/components/ui/DesiProteinBudgetRanker";
import { SundayMealPrepChecklist } from "@/components/ui/SundayMealPrepChecklist";
import { spawnCombatNumber } from "@/components/effects/FloatingDamageNumbers";
import { sfx } from "@/lib/audio-sfx";

interface FoodItem {
  id: string;
  name: string;
  protein: string;
  calories: string;
  image: string;
  cropCorner?: boolean;
}

const NUTRITION_ITEMS: FoodItem[] = [
  {
    id: "chicken-plate",
    name: "Tandoori Chicken Breast",
    protein: "42g PROTEIN",
    calories: "280 kcal",
    image: "/assets/05-nutrition/food-chicken-plate.webp",
    cropCorner: true, // Crop corner watermark
  },
  {
    id: "sprout-chaat",
    name: "Kala Chana & Moong Sprout Chaat",
    protein: "24g PROTEIN",
    calories: "210 kcal",
    image: "/assets/05-nutrition/food-sprout-chaat.webp",
  },
  {
    id: "rice-beans",
    name: "Rajma Rice & Soya Bowl",
    protein: "32g PROTEIN",
    calories: "420 kcal",
    image: "/assets/05-nutrition/food-rice-beans.webp",
  },
  {
    id: "bowl-hand",
    name: "Low-Fat Paneer Bhurji Bowl",
    protein: "36g PROTEIN",
    calories: "290 kcal",
    image: "/assets/05-nutrition/food-bowl-hand.webp",
  },
];

const INDIAN_STAPLES = [
  { name: "Low-Fat Paneer", protein: "18g / 100g", badge: "VEG S-TIER" },
  { name: "Soya Chunks", protein: "52g / 100g", badge: "MAX DENSITY" },
  { name: "Sattu Drink", protein: "20g / scoop", badge: "DESI POWER" },
  { name: "Double Egg Omelette", protein: "14g / 2 eggs", badge: "DAILY BASIC" },
];

export function Chapter5() {
  const [activeFood, setActiveFood] = useState<string>("chicken-plate");
  const [weightKg, setWeightKg] = useState<number>(68);
  const [goal, setGoal] = useState<"bulk" | "cut">("bulk");
  const [nutritionTab, setNutritionTab] = useState<'combinator' | 'budget' | 'prep' | 'brew' | 'swapper' | 'metabolic'>('combinator');
  const [mobileCh5Tab, setMobileCh5Tab] = useState<'plates' | 'staples' | 'calibrator' | 'combinator'>('plates');

  // Interactive Plate Builder Tray
  const [plateItems, setPlateItems] = useState<{ name: string; protein: number; cal: number }[]>([
    { name: "Low-Fat Paneer (150g)", protein: 27, cal: 210 },
  ]);

  const addPlateItem = (name: string, protein: number, cal: number) => {
    sfx.playStatPointAlloc();
    setPlateItems((prev) => [...prev, { name, protein, cal }]);
    spawnCombatNumber(`+${protein}g PROTEIN ADDED!`, undefined, undefined, "stat");
  };

  const clearPlate = () => {
    sfx.playClick();
    setPlateItems([]);
    spawnCombatNumber("PLATE RESET", undefined, undefined, "mana");
  };

  const totalPlateProtein = plateItems.reduce((acc, cur) => acc + cur.protein, 0);
  const totalPlateCalories = plateItems.reduce((acc, cur) => acc + cur.cal, 0);

  const multiplier = goal === "bulk" ? 2.0 : 1.6;
  const targetProtein = Math.round(weightKg * multiplier);

  return (
    <section
      id="chapter-5"
      className="relative w-full bg-[#07060D] py-10 sm:py-24 px-4 sm:px-8 overflow-hidden"
    >
      {/* Seamless Volumetric Fog Portal Transition from Chapter 4 */}
      <div className="absolute top-0 inset-x-0 h-36 bg-gradient-to-b from-[#07060D] via-[#07060D]/80 to-transparent pointer-events-none z-20" />

      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-system-blue/40 border border-system-accent/30 rounded text-xs font-mono tracking-wideSystem text-system-accent uppercase">
            <Utensils className="w-3.5 h-3.5" />
            <span><DecodeText text="PHASE 05 // NUTRITION GRIMOIRE" /></span>
          </div>
          <BladeSliceHeading
            as="h2"
            accentText="NO STARVATION."
            className="font-cinzel text-2xl sm:text-5xl font-black uppercase tracking-wider text-system-text"
          >
            FOOD IS YOUR WEAPON.
          </BladeSliceHeading>
          <p className="font-inter text-xs sm:text-base text-system-muted max-w-xl mx-auto">
            You cannot out-train a 40-gram protein deficit. Calibrate your Indian diet with mathematical precision.
          </p>
        </div>

        {/* Mobile Segmented Nutrition Module Switcher */}
        <div className="flex lg:hidden items-center justify-center gap-1.5 p-1 bg-black/60 border border-system-accent/20 rounded-xl my-4 font-mono text-[11px] w-full max-w-md mx-auto relative z-20">
          <button
            onClick={() => {
              sfx.playClick();
              setMobileCh5Tab('plates');
            }}
            className={`flex-1 py-2 rounded-lg font-bold transition-all text-center ${mobileCh5Tab === 'plates'
              ? 'bg-cyan-600 text-white shadow-[0_0_12px_rgba(6,182,212,0.5)]'
              : 'text-system-muted hover:text-white'
              }`}
          >
            🍱 PLATES
          </button>
          <button
            onClick={() => {
              sfx.playClick();
              setMobileCh5Tab('staples');
            }}
            className={`flex-1 py-2 rounded-lg font-bold transition-all text-center ${mobileCh5Tab === 'staples'
              ? 'bg-yellow-500 text-black shadow-[0_0_12px_rgba(245,197,66,0.5)]'
              : 'text-system-muted hover:text-white'
              }`}
          >
            🥗 STAPLES
          </button>
          <button
            onClick={() => {
              sfx.playClick();
              setMobileCh5Tab('calibrator');
            }}
            className={`flex-1 py-2 rounded-lg font-bold transition-all text-center ${mobileCh5Tab === 'calibrator'
              ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(139,92,246,0.5)]'
              : 'text-system-muted hover:text-white'
              }`}
          >
            ⚖️ MACROS
          </button>
          <button
            onClick={() => {
              sfx.playClick();
              setMobileCh5Tab('combinator');
            }}
            className={`flex-1 py-2 rounded-lg font-bold transition-all text-center ${mobileCh5Tab === 'combinator'
              ? 'bg-emerald-600 text-white shadow-[0_0_12px_rgba(16,185,129,0.5)]'
              : 'text-system-muted hover:text-white'
              }`}
          >
            🍛 COMBINATOR
          </button>
        </div>

        {/* Section 1: Calibrator & Carbs Hero (Desktop: Normal, Mobile: when calibrator tab active) */}
        <div className={`space-y-12 sm:space-y-16 ${mobileCh5Tab === 'calibrator' ? 'block' : 'hidden lg:block'}`}>
          {/* Central Anchor: "Needs Carbs" Hero Banner + Floating Sticker Wrapped in 3D AnimeTiltCard */}
          <AnimeTiltCard
            maxTilt={8}
            glowColor="rgba(234, 179, 8, 0.25)"
            className="w-full"
          >
            <div className="relative system-window corner-brackets rounded-lg overflow-hidden border border-system-accent/30 p-6 sm:p-10 shadow-system-glow">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Visual with Unified Dark Overlay */}
                <div className="lg:col-span-7 relative h-[280px] sm:h-[360px] rounded-xl overflow-hidden border border-system-accent/20 bg-black/60 shadow-2xl">
                  <Image
                    src="/assets/05-nutrition/needs-carbs.webp"
                    alt="Fueling with Complex Carbohydrates"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 650px"
                    className="object-cover object-center filter contrast-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07060D] via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-4 left-4 bg-black/85 border border-system-cyan/40 px-3 py-1 rounded text-xs font-mono text-system-cyan backdrop-blur-sm shadow-md">
                    [ RULE: CARBS ARE NOT THE ENEMY ]
                  </div>
                </div>

                {/* Copy & Mascot Sticker */}
                <div className="lg:col-span-5 space-y-5">
                  <div className="space-y-2">
                    <span className="font-mono text-xs text-system-gold uppercase tracking-wider flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5" />
                      GLYCOGEN SYNTHESIS
                    </span>
                    <h3 className="font-cinzel text-2xl sm:text-3xl font-bold uppercase text-white leading-tight">
                      NOT JUST PROTEIN. <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-system-cyan via-purple-300 to-system-accent">
                        FUEL THE MACHINE.
                      </span>
                    </h3>
                    <p className="font-inter text-xs sm:text-sm text-system-muted leading-relaxed">
                      Protein repairs muscle. Roti, rice, and oats fuel the progressive overload in the gym dungeon. The System balances both in 1 tap.
                    </p>
                  </div>

                  {/* Bouncing Sticker Elements */}
                  <div className="flex items-center gap-4 pt-2">
                    <motion.div
                      whileHover={{ rotate: 8, scale: 1.08 }}
                      onMouseEnter={() => sfx.playHover()}
                      className="relative w-20 h-20 rounded-lg overflow-hidden border border-system-gold/40 shadow-gold-glow cursor-pointer bg-black/60 p-1"
                    >
                      <Image
                        src="/assets/05-nutrition/food-chicken-roti-sticker.webp"
                        alt="Roti & Chicken Macro Sticker"
                        fill
                        className="object-contain"
                      />
                    </motion.div>

                    <motion.div
                      whileHover={{ rotate: -8, scale: 1.08 }}
                      onMouseEnter={() => sfx.playHover()}
                      className="relative w-20 h-20 rounded-lg overflow-hidden border border-system-cyan/40 shadow-cyan-glow cursor-pointer bg-black/60 p-1"
                    >
                      <Image
                        src="/assets/05-nutrition/protein-mascot.webp"
                        alt="System Protein Mascot"
                        fill
                        className="object-contain"
                      />
                    </motion.div>

                    <div className="text-[11px] font-mono text-system-muted space-y-0.5">
                      <div className="text-system-text font-semibold">100% INDIAN FOOD DB</div>
                      <div>Roti, Paneer, Biryani, Dal</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimeTiltCard>

          {/* Interactive Desi Protein Calculator Widget Wrapped in 3D AnimeTiltCard */}
          <AnimeTiltCard
            maxTilt={6}
            glowColor="rgba(234, 179, 8, 0.3)"
            className="w-full"
          >
            <div className="system-window corner-brackets p-6 sm:p-8 rounded-lg border border-system-accent/30 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-system-accent/15 pb-4">
                <div className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-system-gold" />
                  <h3 className="font-cinzel text-lg sm:text-xl font-bold uppercase text-system-text">
                    DESI MACRO CALIBRATOR
                  </h3>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      sfx.playClick();
                      setGoal("bulk");
                      spawnCombatNumber("BULK PROTOCOL: 2.0g/kg", undefined, undefined, "mana");
                    }}
                    className={`px-3 py-1 rounded text-xs font-mono font-bold transition-colors ${goal === "bulk"
                      ? "bg-system-accent text-white"
                      : "bg-system-panel border border-white/10 text-system-muted"
                      }`}
                  >
                    BULK (2.0g/kg)
                  </button>
                  <button
                    onClick={() => {
                      sfx.playClick();
                      setGoal("cut");
                      spawnCombatNumber("CUT PROTOCOL: 1.6g/kg", undefined, undefined, "stat");
                    }}
                    className={`px-3 py-1 rounded text-xs font-mono font-bold transition-colors ${goal === "cut"
                      ? "bg-system-gold text-black"
                      : "bg-system-panel border border-white/10 text-system-muted"
                      }`}
                  >
                    CUT (1.6g/kg)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                {/* Slider Control */}
                <div className="md:col-span-6 space-y-4">
                  <div className="flex justify-between font-mono text-xs">
                    <span className="text-system-muted">YOUR CURRENT BODYWEIGHT:</span>
                    <span className="text-system-text font-bold text-sm">{weightKg} KG</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="105"
                    step="1"
                    value={weightKg}
                    onChange={(e) => {
                      sfx.playHover();
                      setWeightKg(Number(e.target.value));
                    }}
                    className="w-full accent-system-accent cursor-pointer"
                  />
                  <div className="flex justify-between font-mono text-[10px] text-system-muted">
                    <span>50 KG</span>
                    <span>75 KG</span>
                    <span>105 KG</span>
                  </div>
                </div>

                {/* Live Target Card */}
                <div className="md:col-span-6 bg-black/60 border border-system-accent/30 p-4 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] text-system-muted uppercase">
                      RECOMMENDED DAILY PROTOCOL ({weightKg}KG • {goal.toUpperCase()})
                    </span>
                    <div className="font-cinzel text-2xl sm:text-3xl font-black text-system-gold">
                      {targetProtein}g PROTEIN
                    </div>
                    <div className="grid grid-cols-3 gap-2 font-mono text-[11px] pt-1">
                      <span className="text-cyan-300">CARBS: {Math.round(weightKg * (goal === 'bulk' ? 3.5 : 2.0))}g</span>
                      <span className="text-amber-300">FATS: {Math.round(weightKg * 0.8)}g</span>
                      <span className="text-emerald-400">💧 {(weightKg * 0.045).toFixed(1)}L H2O</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-system-gold/10 border border-system-gold/30 flex items-center justify-center font-cinzel font-bold text-system-gold shrink-0">
                    S-TIER
                  </div>
                </div>
              </div>
            </div>
          </AnimeTiltCard>
        </div>

        {/* Section 2: 4 Interactive Food Weapon Cards (Desktop: Normal, Mobile: when plates tab active) */}
        <div className={`space-y-6 sm:space-y-8 ${mobileCh5Tab === 'plates' ? 'block' : 'hidden lg:block'}`}>
          {/* 4 Interactive Food Weapon Cards with Real-time Nutritional Scanner */}
          <div className="space-y-4">
            <div className="hidden sm:flex flex-wrap justify-between items-center text-xs font-mono text-system-muted gap-2">
              <span className="uppercase text-system-cyan font-bold">[ WEAPON INVENTORY: HIGH-PROTEIN PLATES ]</span>
              <span className="text-yellow-400">[ TAP ANY DISH TO RUN AI MACRO SCAN ]</span>
            </div>

            {/* Active Dish Laser Scanning HUD Box (Desktop/Tablet Only) */}
            <div className="hidden sm:block system-window corner-brackets p-4 sm:p-5 rounded-lg border border-system-cyan/40 bg-black/85 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-8 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-system-cyan animate-ping shrink-0" />
                  <div>
                    <div className="font-mono text-xs text-system-cyan font-bold uppercase">
                      AI SCANNER IDENTIFIED: {NUTRITION_ITEMS.find((f) => f.id === activeFood)?.name}
                    </div>
                    <div className="font-mono text-[11px] text-system-muted">
                      MACRO PROFILE: {NUTRITION_ITEMS.find((f) => f.id === activeFood)?.protein} • {NUTRITION_ITEMS.find((f) => f.id === activeFood)?.calories}
                    </div>
                  </div>
                </div>
                <div className="md:col-span-4 flex items-center justify-start md:justify-end gap-2 font-mono text-[10px]">
                  <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-300">
                    LEUCINE: 2.8g [PEAK]
                  </span>
                  <span className="px-2 py-0.5 rounded bg-system-accent/20 border border-system-accent/40 text-purple-300">
                    BIOAVAILABILITY: 94%
                  </span>
                </div>
              </div>
            </div>

            {/* Mobile Plate Selector Pills (Mobile Only) */}
            <div className="flex sm:hidden items-center justify-between gap-1.5 p-1 bg-black/70 border border-system-accent/30 rounded-xl font-mono text-[11px]">
              {NUTRITION_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    sfx.playBladeSheathe();
                    setActiveFood(item.id);
                    spawnCombatNumber(`${item.protein}! [LEUCINE SCAN]`, undefined, undefined, "stat");
                  }}
                  className={`flex-1 py-2 rounded-lg font-bold transition-all text-center truncate ${activeFood === item.id
                    ? "bg-system-cyan text-black shadow-[0_0_12px_rgba(56,189,248,0.5)]"
                    : "text-system-muted hover:text-white"
                    }`}
                >
                  {item.id === "chicken-plate" ? "🍗 CHICKEN" : item.id === "sprout-chaat" ? "🥗 SPROUTS" : item.id === "rice-beans" ? "🍛 RAJMA" : "🧀 PANEER"}
                </button>
              ))}
            </div>

            {/* Mobile Single Active Dish Card (Mobile Only: Spacious, Uncluttered & Punchy) */}
            <div className="block sm:hidden">
              {(() => {
                const item = NUTRITION_ITEMS.find((f) => f.id === activeFood) || NUTRITION_ITEMS[0];
                return (
                  <div className="system-window corner-brackets p-3.5 rounded-xl border border-system-cyan/50 shadow-[0_0_25px_rgba(56,189,248,0.3)] space-y-2.5 bg-black/80">
                    <div className="relative h-52 sm:h-64 w-full rounded-lg overflow-hidden bg-black">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover object-center filter brightness-100 contrast-110"
                      />
                      <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-system-cyan to-transparent opacity-80 animate-laser-sweep pointer-events-none" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#07060D] via-transparent to-transparent pointer-events-none" />
                      <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 font-mono text-[10px] backdrop-blur-sm">
                        LEUCINE: 2.8g [PEAK]
                      </div>
                      <div className="absolute bottom-2.5 left-2.5 px-3 py-1 rounded bg-black/85 border border-system-gold/40 text-system-gold font-mono text-xs font-bold shadow-md">
                        {item.protein}
                      </div>
                      <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded bg-black/85 border border-white/20 text-white font-mono text-xs shadow-md">
                        {item.calories}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="text-base font-cinzel font-bold text-system-text uppercase">
                        {item.name}
                      </div>
                      <span className="text-[11px] font-mono text-system-cyan font-semibold">
                        94% BIOAVAILABLE
                      </span>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Desktop/Tablet 4-Card Grid */}
            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {NUTRITION_ITEMS.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -4 }}
                  onClick={() => {
                    sfx.playBladeSheathe();
                    setActiveFood(item.id);
                    spawnCombatNumber(`${item.protein}! [LEUCINE SCAN]`, undefined, undefined, "stat");
                  }}
                  onMouseEnter={() => sfx.playHover()}
                  className={`system-window corner-brackets p-4 rounded-lg cursor-pointer border transition-all duration-300 ${activeFood === item.id
                    ? "border-system-cyan shadow-[0_0_20px_rgba(56,189,248,0.5)] scale-[1.02]"
                    : "border-system-accent/20 hover:border-system-accent/50"
                    }`}
                >
                  <div className="relative h-44 w-full rounded overflow-hidden mb-3 bg-black/80">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      loading="eager"
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover object-center filter brightness-95 contrast-105"
                    />
                    {/* Laser Sweeper on Active Dish */}
                    {activeFood === item.id && (
                      <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-system-cyan to-transparent opacity-80 animate-laser-sweep pointer-events-none" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07060D] via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/85 border border-system-gold/40 text-system-gold font-mono text-[10px] font-bold">
                      {item.protein}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-xs font-cinzel font-bold text-system-text uppercase truncate">
                      {item.name}
                    </div>
                    <div className="text-[11px] font-mono text-system-muted flex justify-between">
                      <span>{item.calories}</span>
                      <span className="text-system-accent font-semibold">VERIFIED</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 2.5: Indian Staples Quick Ratio Matrix & Interactive Plate Builder (Desktop: Normal, Mobile: when staples tab active) */}
        <div className={`space-y-6 ${mobileCh5Tab === 'staples' ? 'block' : 'hidden lg:block'}`}>
          <div className="system-window corner-brackets p-6 rounded-lg space-y-5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div className="font-mono text-xs uppercase tracking-wide text-system-accent flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>DESI STAPLE PROTEIN EFFICIENCY INDEX (TAP TO ADD TO PLATE)</span>
              </div>
              {plateItems.length > 0 && (
                <button
                  onClick={clearPlate}
                  className="text-[10px] font-mono text-yellow-400 underline hover:text-white cursor-pointer"
                >
                  [ CLEAR PLATE ]
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 text-center">
              {[
                { name: "Low-Fat Paneer", protein: "18g / 100g", badge: "VEG S-TIER", pVal: 18, cal: 140 },
                { name: "Soya Chunks", protein: "52g / 100g", badge: "MAX DENSITY", pVal: 52, cal: 345 },
                { name: "Sattu Drink", protein: "20g / scoop", badge: "DESI POWER", pVal: 20, cal: 180 },
                { name: "Double Egg Omelette", protein: "14g / 2 eggs", badge: "DAILY BASIC", pVal: 14, cal: 160 },
                { name: "Chicken Tikka", protein: "31g / 100g", badge: "PURE ANABOLIC", pVal: 31, cal: 165 },
                { name: "Boiled Chana Chaat", protein: "15g / cup", badge: "FIBER SHIELD", pVal: 15, cal: 210 },
                { name: "Moong Dal Cheela", protein: "16g / 2 cheelas", badge: "CLEAN BULK", pVal: 16, cal: 190 },
                { name: "Greek Curd Bowl", protein: "12g / 150g", badge: "GUT HEALING", pVal: 12, cal: 110 },
              ].map((staple, i) => (
                <button
                  key={i}
                  onClick={() => addPlateItem(staple.name, staple.pVal, staple.cal)}
                  onMouseEnter={() => sfx.playHover()}
                  className="p-3 bg-black/40 border border-system-accent/20 rounded hover:border-system-cyan hover:scale-[1.02] active:scale-95 transition-all text-center cursor-pointer"
                >
                  <div className="text-xs font-mono text-system-muted">{staple.name}</div>
                  <div className="text-base font-cinzel font-bold text-system-gold my-1">
                    {staple.protein}
                  </div>
                  <div className="text-[9px] font-mono px-2 py-0.5 bg-system-accent/15 border border-system-accent/30 text-system-accent rounded inline-block">
                    {staple.badge}
                  </div>
                  <div className="text-[9px] text-system-cyan font-mono mt-1 font-semibold">[+ ADD]</div>
                </button>
              ))}
            </div>

            {/* Live Cumulative Desi Plate Builder Summary */}
            <div className="p-4 bg-black/80 border border-system-accent/30 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-xs">
              <div className="space-y-1">
                <span className="text-system-muted text-[10px] uppercase">[ ACTIVE DESI WARRIOR PLATE ]</span>
                <div className="text-white font-bold text-sm">
                  TOTAL: <span className="text-system-gold">{totalPlateProtein}g PROTEIN</span> • <span className="text-system-cyan">{totalPlateCalories} KCAL</span>
                </div>
                {totalPlateProtein >= targetProtein && (
                  <div className="text-[11px] text-yellow-400 font-bold flex items-center gap-1.5 animate-pulse pt-0.5">
                    <Trophy className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                    <span>DAILY PROTEIN QUEST TARGET ACQUIRED (+1,000 XP)</span>
                  </div>
                )}
                <div className="text-[10px] text-system-muted truncate max-w-md">
                  ITEMS: {plateItems.length === 0 ? "Empty Plate (Tap staples above to add)" : plateItems.map((p) => p.name).join(", ")}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-right text-[10px]">
                  <div className="text-system-muted">TARGET RATIO</div>
                  <div className="text-emerald-400 font-bold">{Math.round((totalPlateProtein / targetProtein) * 100)}% MET</div>
                </div>
                <div className="w-16 h-2 bg-black/60 rounded-full overflow-hidden border border-emerald-500/30">
                  <div
                    className="h-full bg-emerald-400 transition-all duration-300"
                    style={{ width: `${Math.min(100, (totalPlateProtein / targetProtein) * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Unified Desi Nutrition Grimoire Terminal (Desktop: Normal, Mobile: when combinator tab active) */}
        <div className={`w-full mt-10 font-mono ${mobileCh5Tab === 'combinator' ? 'block' : 'hidden lg:block'}`}>
          {/* Terminal Header & Tab Bar */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-emerald-500/25 pb-3 mb-6 gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                [ DESI NUTRITION TACTICAL TERMINAL // MACRO ALCHEMY ]
              </span>
            </div>

            {/* Mobile-Responsive Pill Tabs */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                onClick={() => {
                  sfx.playClick();
                  setNutritionTab('combinator');
                }}
                onMouseEnter={() => sfx.playHover()}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${nutritionTab === 'combinator'
                  ? 'bg-emerald-600 text-white border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                  : 'bg-black/50 border-white/10 text-gray-400 hover:text-white hover:border-emerald-500/30'
                  }`}
              >
                🍱 MEAL STACK
              </button>

              <button
                onClick={() => {
                  sfx.playClick();
                  setNutritionTab('budget');
                }}
                onMouseEnter={() => sfx.playHover()}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${nutritionTab === 'budget'
                  ? 'bg-emerald-600 text-white border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                  : 'bg-black/50 border-white/10 text-gray-400 hover:text-white hover:border-emerald-500/30'
                  }`}
              >
                💰 RUPEE LEADERBOARD
              </button>

              <button
                onClick={() => {
                  sfx.playClick();
                  setNutritionTab('prep');
                }}
                onMouseEnter={() => sfx.playHover()}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${nutritionTab === 'prep'
                  ? 'bg-emerald-600 text-white border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                  : 'bg-black/50 border-white/10 text-gray-400 hover:text-white hover:border-emerald-500/30'
                  }`}
              >
                🥗 SUNDAY BATCH PREP
              </button>

              <button
                onClick={() => {
                  sfx.playClick();
                  setNutritionTab('brew');
                }}
                onMouseEnter={() => sfx.playHover()}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${nutritionTab === 'brew'
                  ? 'bg-amber-600 text-white border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                  : 'bg-black/50 border-white/10 text-gray-400 hover:text-white hover:border-amber-500/30'
                  }`}
              >
                ☕ PRE-WORKOUT
              </button>

              <button
                onClick={() => {
                  sfx.playClick();
                  setNutritionTab('swapper');
                }}
                onMouseEnter={() => sfx.playHover()}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${nutritionTab === 'swapper'
                  ? 'bg-cyan-600 text-white border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'bg-black/50 border-white/10 text-gray-400 hover:text-white hover:border-cyan-500/30'
                  }`}
              >
                🔄 MACRO SWAPPER
              </button>

              <button
                onClick={() => {
                  sfx.playClick();
                  setNutritionTab('metabolic');
                }}
                onMouseEnter={() => sfx.playHover()}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${nutritionTab === 'metabolic'
                  ? 'bg-purple-600 text-white border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                  : 'bg-black/50 border-white/10 text-gray-400 hover:text-white hover:border-purple-500/30'
                  }`}
              >
                ⚡ REVERSE DIETING
              </button>
            </div>
          </div>

          {/* Active Terminal Panel View */}
          <div className="w-full">
            {nutritionTab === 'combinator' && <DesiMealCombinator />}
            {nutritionTab === 'budget' && <DesiProteinBudgetRanker />}
            {nutritionTab === 'prep' && <SundayMealPrepChecklist />}
            {nutritionTab === 'brew' && <ManaBrewFormulator />}
            {nutritionTab === 'swapper' && <MacroSwapper />}
            {nutritionTab === 'metabolic' && <MetabolicEngine />}
          </div>
        </div>
      </div>
    </section>
  );
}
