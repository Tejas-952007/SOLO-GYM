'use client';

import React from 'react';
import { sfx } from '@/lib/audio-sfx';
import { IndianRupee, Trophy, AlertTriangle, ShieldCheck, Sparkles } from 'lucide-react';

interface FoodRank {
  rank: number;
  name: string;
  category: string;
  proteinPer100g: string;
  costPer100g: string;
  costPerGramP: string;
  verdict: 'S-TIER' | 'A-TIER' | 'B-TIER' | 'TRAP';
  note: string;
}

const RANKINGS: FoodRank[] = [
  { rank: 1, name: 'Soya Chunks / Granules', category: 'PLANT', proteinPer100g: '52g', costPer100g: '₹30', costPerGramP: '₹0.58', verdict: 'S-TIER', note: 'Undisputed king of budget protein in India.' },
  { rank: 2, name: 'Farm Fresh Whole Eggs', category: 'EGG', proteinPer100g: '13g', costPer100g: '₹14', costPerGramP: '₹1.08', verdict: 'S-TIER', note: '100% biological value complete amino profile.' },
  { rank: 3, name: 'Chicken Breast (Boneless)', category: 'MEAT', proteinPer100g: '31g', costPer100g: '₹55', costPerGramP: '₹1.77', verdict: 'A-TIER', note: 'Cleanest low-fat animal protein source.' },
  { rank: 4, name: 'Low-Fat Cow Paneer', category: 'DAIRY', proteinPer100g: '18g', costPer100g: '₹45', costPerGramP: '₹2.50', verdict: 'A-TIER', note: 'Slow-release casein night recovery fuel.' },
  { rank: 5, name: 'Whey Protein Isolate 90%', category: 'SUPPLEMENT', proteinPer100g: '90g', costPer100g: '₹250', costPerGramP: '₹2.77', verdict: 'A-TIER', note: 'Fastest post-workout leucine spike.' },
  { rank: 6, name: 'Almonds / Walnuts', category: 'NUTS', proteinPer100g: '21g', costPer100g: '₹160', costPerGramP: '₹7.62', verdict: 'TRAP', note: 'Contains 50g fat! Eating for protein causes severe calorie surplus.' },
];

export function DesiProteinBudgetRanker() {
  return (
    <div className="w-full bg-[#080712] border border-system-gold/40 rounded-2xl p-5 sm:p-7 shadow-[0_0_35px_rgba(245,197,66,0.15)] relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-system-gold/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <IndianRupee className="w-5 h-5 text-system-gold" />
            <h3 className="font-orbitron font-bold text-base sm:text-lg text-white uppercase tracking-wider">
              PROTEIN VALUE AUDIT // COST-PER-GRAM LEADERBOARD
            </h3>
          </div>
          <p className="font-mono text-xs text-gray-400 mt-1">
            Don&apos;t fall for fitness marketing. Real breakdown of Indian protein sources ranked by economic efficiency.
          </p>
        </div>
        <div className="px-3 py-1.5 rounded-lg bg-system-gold/20 border border-system-gold/40 text-system-gold font-mono text-xs font-bold flex items-center gap-2">
          <Trophy className="w-4 h-4" />
          <span>#1 VALUE: SOYA CHUNKS (₹0.58 / G)</span>
        </div>
      </div>

      {/* Table / Grid */}
      <div className="relative z-10 space-y-2">
        {RANKINGS.map(item => (
          <div
            key={item.name}
            onMouseEnter={() => sfx.playHover()}
            className={`p-3.5 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-all ${
              item.verdict === 'TRAP'
                ? 'bg-red-950/20 border-red-500/30 text-gray-400'
                : 'bg-black/60 border-white/10 hover:border-system-gold/40 text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-orbitron font-bold text-xs ${
                item.rank === 1 ? 'bg-system-gold text-black shadow-[0_0_10px_#f5c542]' :
                item.rank === 2 ? 'bg-slate-300 text-black' :
                item.verdict === 'TRAP' ? 'bg-red-500/20 text-red-400' :
                'bg-white/10 text-white'
              }`}>
                #{item.rank}
              </span>

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-heading font-bold text-sm text-white">{item.name}</span>
                  <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold ${
                    item.verdict === 'S-TIER' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' :
                    item.verdict === 'A-TIER' ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/30' :
                    'bg-red-950 text-red-400 border border-red-500/30'
                  }`}>
                    {item.verdict}
                  </span>
                </div>
                <div className="text-xs text-gray-400 font-sans mt-0.5">{item.note}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-white/5 pt-2 sm:pt-0">
              <div className="text-right">
                <div className="text-[10px] text-gray-500 uppercase">DENSITY</div>
                <div className="text-xs font-bold text-cyan-300">{item.proteinPer100g} / 100g</div>
              </div>
              <div className="text-right px-2.5 border-l border-white/10">
                <div className="text-[10px] text-gray-500 uppercase">COST / G</div>
                <div className="text-sm font-bold text-system-gold">{item.costPerGramP}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
