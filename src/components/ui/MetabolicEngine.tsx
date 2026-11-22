'use client';

import React, { useState } from 'react';
import { sfx } from '@/lib/audio-sfx';
import { Flame, ShieldAlert, Sparkles, RefreshCw, Zap } from 'lucide-react';
import { spawnCombatNumber } from '@/components/effects/FloatingDamageNumbers';

export function MetabolicEngine() {
  const [deficit, setDeficit] = useState(400);
  const [weeks, setWeeks] = useState(6);

  // Approximate adaptive thermogenesis calculation
  const bmrSlowdown = Math.min(350, Math.round((deficit * 0.25) + (weeks * 15)));
  const effectiveFatLossPerWeek = Math.max(0.1, Number(((deficit - bmrSlowdown) * 7 / 7700).toFixed(2)));
  const needsRefeed = weeks >= 4 && deficit >= 400;

  return (
    <div className="w-full bg-[#080712] border border-system-gold/40 rounded-2xl p-5 sm:p-7 shadow-[0_0_35px_rgba(245,197,66,0.15)] relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-system-gold/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-400" />
            <h3 className="font-orbitron font-bold text-base sm:text-lg text-white uppercase tracking-wider">
              METABOLIC ADAPTATION // REVERSE DIET RADAR
            </h3>
          </div>
          <p className="font-mono text-xs text-gray-400 mt-1">
            Starvation diets destroy leptin and thyroid T3 output. Calibrate fat loss without crashing your basal metabolic rate.
          </p>
        </div>
        <div className={`px-3 py-1.5 rounded-lg border font-mono text-xs font-bold flex items-center gap-2 ${
          needsRefeed ? 'bg-amber-950/60 border-amber-500/50 text-amber-300' : 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
        }`}>
          <RefreshCw className="w-4 h-4" />
          <span>{needsRefeed ? 'REFEED PROTOCOL RECOMMENDED' : 'METABOLIC RATE STABLE'}</span>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Sliders Area (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div>
            <div className="flex justify-between font-mono text-xs text-gray-300 mb-1">
              <span className="text-amber-400 font-bold uppercase">CALORIC DEFICIT TARGET</span>
              <span className="font-bold text-white">-{deficit} KCAL / DAY</span>
            </div>
            <input
              type="range"
              min="200"
              max="800"
              step="50"
              value={deficit}
              onChange={e => {
                sfx.playHover();
                setDeficit(Number(e.target.value));
              }}
              className="w-full accent-amber-400 cursor-pointer"
            />
            <div className="flex justify-between font-mono text-[10px] text-gray-500 mt-1">
              <span>-200 kcal (Recomp)</span>
              <span>-400 kcal (Optimal Cut)</span>
              <span>-800 kcal (Crash Dieting)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between font-mono text-xs text-gray-300 mb-1">
              <span className="text-cyan-400 font-bold uppercase">WEEKS IN CONTINUOUS DEFICIT</span>
              <span className="font-bold text-white">{weeks} WEEKS</span>
            </div>
            <input
              type="range"
              min="1"
              max="16"
              step="1"
              value={weeks}
              onChange={e => {
                sfx.playHover();
                setWeeks(Number(e.target.value));
              }}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <div className="flex justify-between font-mono text-[10px] text-gray-500 mt-1">
              <span>Week 01 (Fresh)</span>
              <span>Week 06 (Adaptive Point)</span>
              <span>Week 16 (Extreme Fatigue)</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 font-mono text-xs space-y-1">
            <div className="text-[10px] text-gray-500 uppercase">PREDICTED FAT LOSS VELOCITY:</div>
            <div className="text-sm font-bold text-emerald-400">
              ~{effectiveFatLossPerWeek} kg pure adipose tissue loss / week
            </div>
          </div>
        </div>

        {/* Telemetry Output (5 Cols) */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-black/85 border border-system-gold/30 space-y-3 font-mono text-xs">
          <div className="text-system-gold font-bold uppercase pb-2 border-b border-white/10 flex items-center justify-between">
            <span>[ SYSTEM HORMONAL STATUS ]</span>
            <Sparkles className="w-4 h-4 text-system-gold" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-gray-300">
              <span>Adaptive BMR Drop:</span>
              <strong className={bmrSlowdown >= 200 ? 'text-red-400' : 'text-emerald-400'}>
                -{bmrSlowdown} kcal/day
              </strong>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Thyroid T3 &amp; Leptin:</span>
              <strong className={needsRefeed ? 'text-amber-400' : 'text-emerald-400'}>
                {needsRefeed ? 'SUPPRESSED (REFEED NEEDED)' : 'OPTIMAL SURPLUS'}
              </strong>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Muscle Preservation:</span>
              <strong className="text-cyan-300">{deficit <= 500 ? '97% LEAN RETENTION' : '75% RISK OF LOSS'}</strong>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-black/60 border border-white/10 text-[11px] text-gray-400 leading-relaxed">
            {needsRefeed
              ? 'Recommendation: Schedule a 48-hour Maintenance Diet Break with 150g extra clean carbs (Rice & Oats) to reset thyroid T3.'
              : 'Deficit is clean and conservative. Muscle fibers are fully protected while fat oxidizes smoothly.'}
          </div>
        </div>
      </div>
    </div>
  );
}
