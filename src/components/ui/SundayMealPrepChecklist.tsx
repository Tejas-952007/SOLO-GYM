'use client';

import React, { useState } from 'react';
import { sfx } from '@/lib/audio-sfx';
import { CheckSquare, Square, ChefHat, Sparkles, AlertCircle, Clock } from 'lucide-react';
import { spawnCombatNumber } from '@/components/effects/FloatingDamageNumbers';

interface PrepItem {
  id: string;
  name: string;
  category: 'Protein Core' | 'Carb Base' | 'Micronutrients' | 'Hydration & Ferment';
  time: string;
  yieldInfo: string;
  tip: string;
}

const PREP_ITEMS: PrepItem[] = [
  {
    id: 'soya-boil',
    name: 'Bulk Pressure-Boil Soya Chunks (500g)',
    category: 'Protein Core',
    time: '20 Mins',
    yieldInfo: '260g pure plant protein stored in airtight glassware for 4 days.',
    tip: 'Boil with 1 tsp rock salt, squeeze hot starchy water out 3 times to remove bitter beany aftertaste.'
  },
  {
    id: 'paneer-cube',
    name: 'Cube & Marinate Low-Fat Paneer (1kg)',
    category: 'Protein Core',
    time: '15 Mins',
    yieldInfo: '180g slow-digesting micellar casein protein.',
    tip: 'Marinate in curd, turmeric, degi mirch, and kasuri methi for high bioavailability without heavy oils.'
  },
  {
    id: 'sprout-jar',
    name: 'Moong & Kala Chana Sprout Incubation',
    category: 'Micronutrients',
    time: '24-48 Hrs',
    yieldInfo: 'Enzyme-activated living bio-protein + high zinc & fiber.',
    tip: 'Sprouting increases protein bioavailability by 22% and reduces anti-nutritional phytic acid.'
  },
  {
    id: 'rice-pot',
    name: 'Batch Cook Brown / Parboiled Rice (1.5kg)',
    category: 'Carb Base',
    time: '35 Mins',
    yieldInfo: 'Clean glycogen replenishment for 5 heavy training days.',
    tip: 'Cool overnight in the fridge to create retrograde resistant starch, reducing insulin spikes by 30%.'
  },
  {
    id: 'dal-palak',
    name: 'Slow-Simmered Dal Palak / Rajma Stew',
    category: 'Protein Core',
    time: '45 Mins',
    yieldInfo: 'Complex amino acid pairing + non-heme iron reservoir.',
    tip: 'Add a squeeze of lemon (vitamin C) right before eating to multiply iron absorption 3x.'
  },
  {
    id: 'sattu-mix',
    name: 'Dry-Roast Sattu & Roasted Chana Stash',
    category: 'Protein Core',
    time: '10 Mins',
    yieldInfo: 'Instant 25g protein emergency shake powder.',
    tip: 'Store in moisture-sealed glass container with black salt and roasted cumin powder.'
  }
];

export function SundayMealPrepChecklist() {
  const [completed, setCompleted] = useState<Record<string, boolean>>({
    'soya-boil': true,
    'sprout-jar': true,
  });

  const toggleItem = (id: string, name: string) => {
    sfx.playClick();
    setCompleted(prev => {
      const next = !prev[id];
      if (next) {
        sfx.playItemPickup();
        spawnCombatNumber(`PREPPED: ${name.split(' ')[0]}`, undefined, undefined, 'mana');
      }
      return { ...prev, [id]: next };
    });
  };

  const completedCount = Object.values(completed).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / PREP_ITEMS.length) * 100);

  return (
    <div className="p-4 sm:p-6 rounded-xl bg-slate-950/80 border border-emerald-500/30 backdrop-blur-md shadow-[0_0_30px_rgba(16,185,129,0.15)] font-mono">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b border-emerald-500/20 gap-2">
        <div className="flex items-center gap-2">
          <ChefHat className="w-5 h-5 text-emerald-400 animate-pulse" />
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-300">
              [ SUNDAY DESI MEAL PREP & BATCH COOKING PROTOCOL ]
            </h3>
            <p className="text-[11px] text-system-muted">
              Pre-arm your refrigerator to prevent weekday cheat-meal catastrophic failure.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-emerald-400 font-bold">
            {completedCount}/{PREP_ITEMS.length} READY ({progressPercent}%)
          </span>
          <div className="w-24 h-2.5 bg-black rounded-full overflow-hidden border border-emerald-500/40">
            <div
              className="h-full bg-emerald-500 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Grid of Checklist Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {PREP_ITEMS.map(item => {
          const isDone = !!completed[item.id];
          return (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id, item.name)}
              onMouseEnter={() => sfx.playHover()}
              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                isDone
                  ? 'bg-emerald-950/30 border-emerald-500/50 text-white'
                  : 'bg-black/40 border-white/10 text-gray-400 hover:border-emerald-500/30 hover:bg-black/60'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <button className="mt-0.5 text-emerald-400 shrink-0">
                  {isDone ? (
                    <CheckSquare className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Square className="w-4 h-4 text-gray-500" />
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className={`text-xs font-bold leading-tight ${isDone ? 'text-emerald-200 line-through opacity-90' : 'text-gray-200'}`}>
                      {item.name}
                    </span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-black/60 text-emerald-400 border border-emerald-500/30 shrink-0 flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      {item.time}
                    </span>
                  </div>

                  <p className="text-[10px] text-gray-300 mt-1">
                    {item.yieldInfo}
                  </p>

                  <div className="mt-2 text-[9px] text-emerald-400/80 bg-emerald-950/40 px-2 py-1 rounded border border-emerald-500/20">
                    <strong className="text-white">Pro Tip:</strong> {item.tip}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
