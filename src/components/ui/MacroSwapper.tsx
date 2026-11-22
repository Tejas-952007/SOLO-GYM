'use client';

import React, { useState } from 'react';
import { sfx } from '@/lib/audio-sfx';
import { RefreshCw, Sparkles, Check, ArrowRight, Utensils } from 'lucide-react';
import { spawnCombatNumber } from '@/components/effects/FloatingDamageNumbers';

interface SwapOption {
  foodToSwap: string;
  originalMacros: string;
  alternatives: {
    title: string;
    items: string;
    protein: string;
    calories: string;
    cost: string;
  }[];
}

const SWAP_PROFILES: SwapOption[] = [
  {
    foodToSwap: '100g Soya Chunks (52g Protein)',
    originalMacros: '52g Protein • 345 kcal • ₹30',
    alternatives: [
      {
        title: 'Low-Fat Cow Paneer Stack',
        items: '280g Fresh Cow Paneer with Jeera & Green Chillies',
        protein: '50.4g Protein',
        calories: '532 kcal',
        cost: '₹125',
      },
      {
        title: 'Whey + Greek Dahi Bio-Alloy',
        items: '1 Scoop Whey Isolate + 300g Hung Curd',
        protein: '51.0g Protein',
        calories: '340 kcal',
        cost: '₹135',
      },
      {
        title: 'Desi Legume Trinity (Budget)',
        items: '100g Roasted Chana + 80g Moong Sprouts + 200ml Skim Milk',
        protein: '36.5g Protein',
        calories: '490 kcal',
        cost: '₹40',
      },
    ],
  },
  {
    foodToSwap: '200g Fresh Paneer (36g Protein)',
    originalMacros: '36g Protein • 520 kcal • ₹90',
    alternatives: [
      {
        title: 'Lean Soya Bhurji (Cut Phase)',
        items: '70g Soya Granules sauted with onions & tomatoes',
        protein: '36.4g Protein',
        calories: '240 kcal (-280 kcal!)',
        cost: '₹22',
      },
      {
        title: 'Farm Whole Egg Skillet',
        items: '4 Whole Boiled Eggs + 2 Egg Whites',
        protein: '31.0g Protein',
        calories: '340 kcal',
        cost: '₹35',
      },
    ],
  },
];

export function MacroSwapper() {
  const [profileIdx, setProfileIdx] = useState(0);
  const activeProfile = SWAP_PROFILES[profileIdx];

  const handleApplySwap = (title: string, p: string) => {
    sfx.playRankUp();
    spawnCombatNumber(`SWAP APPLIED: ${p}!`, undefined, undefined, 'stat');
  };

  return (
    <div className="w-full bg-[#080712] border border-system-gold/40 rounded-2xl p-5 sm:p-7 shadow-[0_0_35px_rgba(245,197,66,0.15)] relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-system-gold/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-system-gold" />
            <h3 className="font-orbitron font-bold text-base sm:text-lg text-white uppercase tracking-wider">
              MACRO SWAPPER // INGREDIENT ALCHEMY MATRIX
            </h3>
          </div>
          <p className="font-mono text-xs text-gray-400 mt-1">
            Bored of soya or low-fat paneer? Swap any staple for identical bioavailable protein targets.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-2 font-mono text-[10px]">
          {SWAP_PROFILES.map((p, i) => (
            <button
              key={p.foodToSwap}
              onClick={() => {
                sfx.playClick();
                setProfileIdx(i);
              }}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                profileIdx === i
                  ? 'bg-system-gold text-black shadow-[0_0_12px_rgba(245,197,66,0.6)]'
                  : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              {p.foodToSwap.split(' ')[1]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 space-y-4">
        <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 font-mono text-xs">
          <div>
            <span className="text-[10px] text-gray-500 uppercase">SWAPPING OUT:</span>
            <div className="font-bold text-white text-sm mt-0.5">{activeProfile.foodToSwap}</div>
          </div>
          <span className="text-gray-400 font-mono text-xs">{activeProfile.originalMacros}</span>
        </div>

        {/* Alternatives Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {activeProfile.alternatives.map((alt) => (
            <div
              key={alt.title}
              className="p-4 rounded-xl bg-black/80 border border-white/10 hover:border-system-gold/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="font-orbitron font-bold text-xs text-system-gold mb-1">{alt.title}</div>
                <div className="text-xs text-gray-300 font-sans mb-3 leading-snug">{alt.items}</div>

                <div className="space-y-1 font-mono text-[11px] border-t border-white/5 pt-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">PROTEIN:</span>
                    <strong className="text-cyan-300">{alt.protein}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">CALORIES:</span>
                    <strong className="text-white">{alt.calories}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">EST. BUDGET:</span>
                    <strong className="text-amber-300">{alt.cost}</strong>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleApplySwap(alt.title, alt.protein)}
                onMouseEnter={() => sfx.playHover()}
                className="mt-4 w-full py-2 rounded-lg bg-system-gold/15 hover:bg-system-gold/30 border border-system-gold/40 text-system-gold font-mono text-[11px] font-bold uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>APPLY SWAP</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
