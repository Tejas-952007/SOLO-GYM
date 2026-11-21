"use client";

import { useState } from "react";
import Image from "next/image";
import { Utensils, Sparkles, Check, Flame } from "lucide-react";
import { motion } from "framer-motion";

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

  return (
    <section
      id="chapter-5"
      className="relative w-full bg-[#07060D] border-t border-system-accent/15 py-16 sm:py-24 px-4 sm:px-8 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-system-blue/40 border border-system-accent/30 rounded text-xs font-mono tracking-wideSystem text-system-accent uppercase">
            <Utensils className="w-3.5 h-3.5" />
            <span>PHASE 05 // NUTRITION GRIMOIRE</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-black uppercase tracking-wider text-system-text">
            FOOD IS YOUR WEAPON.
          </h2>
          <p className="font-inter text-sm sm:text-base text-system-muted max-w-xl mx-auto">
            You cannot out-train a 40-gram protein deficit. Calibrate your Indian diet with mathematical precision.
          </p>
        </div>

        {/* Central Anchor: "Needs Carbs" Hero Banner + Floating Sticker */}
        <div className="relative system-window corner-brackets rounded-lg overflow-hidden border border-system-accent/30 p-6 sm:p-10 shadow-system-glow">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual with Unified Dark Overlay */}
            <div className="lg:col-span-7 relative h-[260px] sm:h-[340px] rounded-lg overflow-hidden border border-system-accent/20">
              <Image
                src="/assets/05-nutrition/needs-carbs.webp"
                alt="Fueling with Complex Carbohydrates"
                fill
                sizes="(max-width: 1024px) 100vw, 650px"
                className="object-cover object-center filter contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#120F24] via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-4 left-4 bg-black/85 border border-system-cyan/40 px-3 py-1 rounded text-xs font-mono text-system-cyan backdrop-blur-sm">
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

        {/* 4 Interactive Food Weapon Cards */}
        <div className="space-y-4">
          <div className="flex justify-between items-center text-xs font-mono text-system-muted">
            <span className="uppercase">[ WEAPON INVENTORY: HIGH-PROTEIN PLATES ]</span>
            <span className="text-system-accent">HOVER / TAP FOR MACROS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {NUTRITION_ITEMS.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                onClick={() => setActiveFood(item.id)}
                className={`system-window corner-brackets rounded-lg overflow-hidden border transition-all duration-300 cursor-pointer ${
                  activeFood === item.id
                    ? "border-system-accent shadow-system-glow scale-[1.02]"
                    : "border-system-accent/25 hover:border-system-accent/60"
                }`}
              >
                {/* Image Frame with crop filter */}
                <div className="relative w-full h-44 overflow-hidden bg-black">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 300px"
                    className={`object-cover ${
                      item.cropCorner ? "object-bottom scale-105" : "object-center"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#120F24] via-transparent to-transparent pointer-events-none" />

                  {/* Glowing Macro Tag */}
                  <div className="absolute top-2.5 right-2.5 bg-black/85 border border-system-gold/50 px-2 py-0.5 rounded text-[10px] font-mono font-bold text-system-gold shadow-gold-glow">
                    {item.protein}
                  </div>
                </div>

                <div className="p-4 space-y-1">
                  <div className="font-orbitron text-xs sm:text-sm font-bold text-system-text truncate">
                    {item.name}
                  </div>
                  <div className="font-mono text-[11px] text-system-muted flex justify-between">
                    <span>{item.calories}</span>
                    <span className="text-system-cyan">VERIFIED // 100%</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Indian Staples Quick Grid */}
        <div className="p-6 bg-black/40 border border-system-accent/20 rounded-lg">
          <div className="font-mono text-xs text-system-muted uppercase tracking-wider mb-4">
            [ DESI HIGH-PROTEIN RATIOS (CALIBRATED BY AI COACH) ]
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {INDIAN_STAPLES.map((staple) => (
              <div
                key={staple.name}
                className="p-3 bg-[#120F24]/50 border border-white/5 rounded space-y-1"
              >
                <div className="text-[10px] font-mono text-system-cyan">
                  {staple.badge}
                </div>
                <div className="font-orbitron text-xs font-bold text-system-text">
                  {staple.name}
                </div>
                <div className="font-mono text-xs text-system-gold font-semibold">
                  {staple.protein}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
