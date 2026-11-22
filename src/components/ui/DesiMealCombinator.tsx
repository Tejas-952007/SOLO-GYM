'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { sfx } from '@/lib/audio-sfx';
import { Utensils, IndianRupee, Sparkles, Check, Plus, Minus } from 'lucide-react';
import { spawnCombatNumber } from '@/components/effects/FloatingDamageNumbers';

interface FoodItem {
  id: string;
  name: string;
  category: 'VEG' | 'EGG' | 'SUPPLEMENT';
  servingGrams: number;
  proteinGrams: number;
  costInr: number;
  calories: number;
}

const FOOD_DATABASE: FoodItem[] = [
  { id: 'soya', name: 'Fortune Soya Chunks', category: 'VEG', servingGrams: 50, proteinGrams: 26, costInr: 15, calories: 172 },
  { id: 'paneer', name: 'Low-Fat Cow Paneer', category: 'VEG', servingGrams: 100, proteinGrams: 18, costInr: 45, calories: 190 },
  { id: 'curd', name: 'Greek / Hung Curd', category: 'VEG', servingGrams: 150, proteinGrams: 12, costInr: 30, calories: 110 },
  { id: 'chana', name: 'Roasted Bengal Gram', category: 'VEG', servingGrams: 60, proteinGrams: 11, costInr: 12, calories: 210 },
  { id: 'moong', name: 'Sprouted Green Moong', category: 'VEG', servingGrams: 80, proteinGrams: 9, costInr: 10, calories: 95 },
  { id: 'eggs', name: 'Farm Fresh Boiled Eggs', category: 'EGG', servingGrams: 100, proteinGrams: 13, costInr: 14, calories: 155 },
  { id: 'whey', name: 'Raw Whey Isolate 90%', category: 'SUPPLEMENT', servingGrams: 30, proteinGrams: 27, costInr: 75, calories: 120 },
];

export function DesiMealCombinator() {
  const [quantities, setQuantities] = useState<Record<string, number>>({
    soya: 2, // 100g = 52g protein
    paneer: 1, // 100g = 18g protein
    curd: 1, // 150g = 12g protein
    whey: 1, // 30g = 27g protein
  });

  const totals = useMemo(() => {
    let totalP = 0;
    let totalCost = 0;
    let totalCals = 0;

    Object.entries(quantities).forEach(([id, count]) => {
      const item = FOOD_DATABASE.find(f => f.id === id);
      if (item && count > 0) {
        totalP += item.proteinGrams * count;
        totalCost += item.costInr * count;
        totalCals += item.calories * count;
      }
    });

    const costPerGram = totalP > 0 ? (totalCost / totalP).toFixed(2) : '0';
    return { totalP, totalCost, totalCals, costPerGram };
  }, [quantities]);

  const updateQuantity = (id: string, delta: number) => {
    setQuantities(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      if (next > current) {
        sfx.playStatPointAlloc();
        const item = FOOD_DATABASE.find(f => f.id === id);
        if (item) {
          spawnCombatNumber(`+${item.proteinGrams}g PROTEIN! [${item.name}]`, undefined, undefined, 'stat');
        }
      } else {
        sfx.playClick();
      }
      return { ...prev, [id]: next };
    });
  };

  return (
    <div className="w-full bg-[#080712] border border-system-gold/40 rounded-2xl p-5 sm:p-7 shadow-[0_0_35px_rgba(245,197,66,0.15)] relative overflow-hidden">
      {/* Background Accent Lines */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-system-gold/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Utensils className="w-5 h-5 text-system-gold" />
            <h3 className="font-orbitron font-bold text-base sm:text-lg text-white uppercase tracking-wider">
              DESI MACRO ENGINE // DAILY PLATE COMBINATOR
            </h3>
          </div>
          <p className="font-mono text-xs text-gray-400 mt-1">
            Build a 100% vegetarian or eggetarian daily stack. Calculate total protein &amp; daily budget in INR.
          </p>
        </div>
        <div className="px-3 py-1.5 rounded-lg bg-system-gold/20 border border-system-gold/50 text-system-gold font-mono text-xs font-bold flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          <span>EFFICIENCY: ₹{totals.costPerGram} / GRAM PROTEIN</span>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Food Items Selector (8 Cols) */}
        <div className="lg:col-span-8 space-y-2.5">
          {FOOD_DATABASE.map(item => {
            const count = quantities[item.id] || 0;
            return (
              <div
                key={item.id}
                className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                  count > 0
                    ? 'bg-black/75 border-system-gold/50 shadow-[0_0_15px_rgba(245,197,66,0.15)]'
                    : 'bg-black/40 border-white/5 opacity-70 hover:opacity-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                    item.category === 'VEG' ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/40' :
                    item.category === 'EGG' ? 'bg-amber-950/80 text-amber-400 border border-amber-500/40' :
                    'bg-cyan-950/80 text-cyan-400 border border-cyan-500/40'
                  }`}>
                    {item.category}
                  </span>
                  <div>
                    <div className="font-heading font-bold text-sm text-white">{item.name}</div>
                    <div className="font-mono text-xs text-gray-400">
                      {item.servingGrams}g portion = <strong className="text-cyan-300">{item.proteinGrams}g Protein</strong> • {item.calories} kcal • ₹{item.costInr}
                    </div>
                  </div>
                </div>

                {/* Counter controls */}
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    disabled={count === 0}
                    className="w-7 h-7 rounded bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-white transition-colors cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-mono text-sm font-bold w-6 text-center text-system-gold">
                    {count}x
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="w-7 h-7 rounded bg-system-gold/20 hover:bg-system-gold/40 border border-system-gold/40 flex items-center justify-center text-system-gold transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Daily Stack Summary Card (4 Cols) */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-black/80 border border-system-gold/40 shadow-system-glow space-y-4">
          <div className="font-mono text-xs text-system-gold font-bold uppercase tracking-wider pb-2 border-b border-white/10">
            [ YOUR DAILY FUEL TOTALS ]
          </div>

          <div>
            <div className="text-[11px] font-mono text-gray-400 uppercase">TOTAL DAILY PROTEIN</div>
            <div className="font-cinzel text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-200 mt-0.5">
              {totals.totalP}g
            </div>
            <div className="w-full h-2 bg-gray-800 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-yellow-500 to-amber-300 transition-all duration-300"
                style={{ width: `${Math.min(100, (totals.totalP / 180) * 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-gray-500 mt-1">
              <span>TARGET: 150g</span>
              <span>MONARCH: 180g</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
            <div className="p-2.5 rounded bg-white/5 font-mono">
              <div className="text-[10px] text-gray-400 uppercase">DAILY COST</div>
              <div className="text-base font-bold text-white mt-0.5">₹{totals.totalCost}</div>
            </div>
            <div className="p-2.5 rounded bg-white/5 font-mono">
              <div className="text-[10px] text-gray-400 uppercase">CALORIES</div>
              <div className="text-base font-bold text-cyan-300 mt-0.5">{totals.totalCals} kcal</div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/30 font-mono text-xs text-emerald-300 space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5" />
              <span>SYSTEM MACRO CERTIFICATION</span>
            </div>
            <div className="text-[11px] text-gray-300">
              {totals.totalP >= 140
                ? 'Optimal muscle protein synthesis reached. Leucine saturation verified.'
                : 'Add more Soya Chunks or Whey to reach optimal S-Rank hypertrophy.'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
