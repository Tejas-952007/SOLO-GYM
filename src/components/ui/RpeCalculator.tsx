'use client';

import React, { useState } from 'react';
import { sfx } from '@/lib/audio-sfx';
import { Gauge, ShieldAlert, Zap, Check, Sparkles } from 'lucide-react';
import { spawnCombatNumber } from '@/components/effects/FloatingDamageNumbers';

export function RpeCalculator() {
  const [rpe, setRpe] = useState(8);

  const rir = Math.max(0, 10 - rpe);

  const getRpeData = (val: number) => {
    if (val >= 10) return { label: 'RPE 10 // ABSOLUTE FAILURE', fatigue: 'CRITICAL (48H RECOVERY)', tension: 'MAXIMAL', color: 'text-red-400 border-red-500/50 bg-red-950/20', advice: 'Zero reps left. Bar ground to complete standstill. Reserve only for final sets of compounds or isolation drop sets.' };
    if (val >= 9) return { label: 'RPE 9 // 1 REP IN RESERVE', fatigue: 'HIGH INTENSITY', tension: '96% PEAK', color: 'text-amber-400 border-amber-500/50 bg-amber-950/20', advice: 'Could grind out 1 more clean rep with maximal effort. Prime hypertrophy stimulus for progressive overload.' };
    if (val >= 8) return { label: 'RPE 8 // 2 REPS IN RESERVE (GOLDEN ZONE)', fatigue: 'SUSTAINABLE', tension: '92% OPTIMAL', color: 'text-cyan-400 border-cyan-500/50 bg-cyan-950/20', advice: 'The scientific sweet spot for natural lifters. Maximal mechanical tension with zero systemic CNS overtraining.' };
    if (val >= 7) return { label: 'RPE 7 // 3 REPS IN RESERVE', fatigue: 'MILD FATIGUE', tension: '85% MODERATE', color: 'text-emerald-400 border-emerald-500/50 bg-emerald-950/20', advice: 'Bar moved with explosive speed. Excellent for speed sets and building technical consistency.' };
    return { label: 'RPE 6 // WARMUP WEIGHT', fatigue: 'LOW', tension: 'SUB-HYPERTROPHIC', color: 'text-gray-400 border-gray-600/50 bg-gray-900/20', advice: 'Too light to trigger substantial high-threshold motor unit recruitment. Increase load on bar.' };
  };

  const data = getRpeData(rpe);

  return (
    <div className="w-full bg-[#080712] border border-cyan-500/40 rounded-2xl p-5 sm:p-7 shadow-[0_0_35px_rgba(0,240,255,0.15)] relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Gauge className="w-5 h-5 text-cyan-400" />
            <h3 className="font-orbitron font-bold text-base sm:text-lg text-white uppercase tracking-wider">
              AUTOREGULATION DIAL // RPE &amp; REPS IN RESERVE (RIR)
            </h3>
          </div>
          <p className="font-mono text-xs text-gray-400 mt-1">
            Training to failure every day destroys progress. Calibrate training intensity like an S-Rank strategist.
          </p>
        </div>
        <div className={`px-3 py-1.5 rounded-lg border font-mono text-xs font-bold flex items-center gap-2 ${data.color}`}>
          <Zap className="w-4 h-4" />
          <span>{data.label}</span>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Slider Dial (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div>
            <div className="flex justify-between font-mono text-xs text-gray-300 mb-1.5">
              <span className="text-cyan-400 font-bold uppercase">INTENSITY RATING (RPE)</span>
              <span className="font-bold text-white">RPE {rpe} / 10 ({rir} REPS IN RESERVE)</span>
            </div>
            <input
              type="range"
              min="6"
              max="10"
              step="0.5"
              value={rpe}
              onChange={e => {
                sfx.playHover();
                setRpe(Number(e.target.value));
              }}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <div className="flex justify-between font-mono text-[10px] text-gray-500 mt-1">
              <span>RPE 6 (Speed)</span>
              <span>RPE 8 (Hypertrophy Target)</span>
              <span>RPE 10 (True Failure)</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-black/60 border border-white/10 space-y-2 font-mono text-xs">
            <div className="text-[10px] text-gray-500 uppercase">SYSTEM COACH VERDICT:</div>
            <p className="font-sans text-sm text-gray-200 leading-relaxed">
              {data.advice}
            </p>
          </div>
        </div>

        {/* Telemetry Vectors (5 Cols) */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-black/85 border border-cyan-500/30 space-y-3 font-mono text-xs">
          <div className="text-cyan-400 font-bold uppercase pb-2 border-b border-white/10 flex items-center justify-between">
            <span>[ NEURAL FATIGUE TELEMETRY ]</span>
            <Sparkles className="w-4 h-4 text-cyan-400" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-gray-300">
              <span>Reps in Reserve:</span>
              <strong className="text-cyan-300">{rir} REPS</strong>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Mechanical Stimulus:</span>
              <strong className="text-white">{data.tension}</strong>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>CNS Cost:</span>
              <strong className={rpe >= 9.5 ? 'text-red-400' : 'text-emerald-400'}>{data.fatigue}</strong>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-black/60 border border-white/10 text-[11px] text-gray-400 leading-relaxed">
            {rpe >= 7.5 && rpe <= 8.5
              ? '✓ Perfect progression threshold. Delivers 95% of growth with 50% less joint wear.'
              : 'Notice: If working at RPE 10, reduce set volume to prevent tendon inflammation.'}
          </div>
        </div>
      </div>
    </div>
  );
}
