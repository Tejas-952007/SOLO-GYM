'use client';

import React, { useState } from 'react';
import { sfx } from '@/lib/audio-sfx';
import { Activity, Shield, Zap, Sparkles, AlertCircle, Dumbbell } from 'lucide-react';
import { spawnCombatNumber } from '@/components/effects/FloatingDamageNumbers';

interface MuscleGroup {
  id: string;
  name: string;
  weeklySets: number;
  mevMavRange: string;
  recoveryPercent: number;
  optimalMovement: string;
  nutritionKey: string;
  status: 'RECOVERED' | 'HYPERTROPHY IN PROGRESS' | 'FATIGUED';
}

const MUSCLE_GROUPS: MuscleGroup[] = [
  {
    id: 'chest',
    name: 'Pectoralis Major & Clavicular Head',
    weeklySets: 14,
    mevMavRange: '12 - 18 Sets',
    recoveryPercent: 95,
    optimalMovement: 'Incline Barbell Press + Weighted Dips (3s eccentric)',
    nutritionKey: 'Requires 3.2g leucine bolus post-session (Paneer / Whey)',
    status: 'RECOVERED',
  },
  {
    id: 'back',
    name: 'Latissimus Dorsi & Rhomboids',
    weeklySets: 16,
    mevMavRange: '14 - 22 Sets',
    recoveryPercent: 88,
    optimalMovement: 'Chest-Supported T-Bar Rows + Dead-Stop Pullups',
    nutritionKey: 'Magnesium + slow casein prevents spinal erector cramps',
    status: 'HYPERTROPHY IN PROGRESS',
  },
  {
    id: 'delts',
    name: 'Lateral & Posterior Deltoid Complex',
    weeklySets: 18,
    mevMavRange: '16 - 24 Sets',
    recoveryPercent: 100,
    optimalMovement: 'Egyptian Cable Lateral Raises + Face Pulls',
    nutritionKey: 'High micro-capillary density responds to high reps (15-20)',
    status: 'RECOVERED',
  },
  {
    id: 'quads',
    name: 'Quadriceps (Vastus Medialis Tear-Drop)',
    weeklySets: 12,
    mevMavRange: '10 - 16 Sets',
    recoveryPercent: 72,
    optimalMovement: 'Ass-to-Grass Barbell Squats + Bulgarian Split Squats',
    nutritionKey: 'Massive glycogen depletion; refeed 200g complex rice carbs',
    status: 'FATIGUED',
  },
  {
    id: 'arms',
    name: 'Triceps Long Head & Biceps Brachii',
    weeklySets: 12,
    mevMavRange: '10 - 16 Sets',
    recoveryPercent: 92,
    optimalMovement: 'Overhead Cable Extensions + Incline Dumbbell Curls',
    nutritionKey: 'Fast-twitch dominant; benefits from 5g intra-workout creatine',
    status: 'RECOVERED',
  },
  {
    id: 'hamstrings',
    name: 'Posterior Chain & Glute Max',
    weeklySets: 10,
    mevMavRange: '8 - 14 Sets',
    recoveryPercent: 80,
    optimalMovement: 'Romanian Deadlifts (RDL) with 2-second stretch pause',
    nutritionKey: 'Connective tissue synthesis boosted with Vitamin C + lemon dal',
    status: 'HYPERTROPHY IN PROGRESS',
  },
];

export function MuscleHypertrophyHeatmap() {
  const [selectedId, setSelectedId] = useState<string>('chest');

  const selectMuscle = (id: string, name: string) => {
    sfx.playClick();
    setSelectedId(id);
    sfx.playStatPointAlloc();
    spawnCombatNumber(`ANATOMY: ${name.split(' ')[0]}`, undefined, undefined, 'stat');
  };

  const selected = MUSCLE_GROUPS.find(m => m.id === selectedId) || MUSCLE_GROUPS[0];

  return (
    <div className="p-4 sm:p-6 rounded-xl bg-slate-950/80 border border-blue-500/30 backdrop-blur-md shadow-[0_0_30px_rgba(59,130,246,0.15)] font-mono">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b border-blue-500/20 gap-2">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-400 animate-pulse" />
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-blue-300">
              [ 3D ANATOMICAL HYPERTROPHY HEATMAP & RECOVERY MATRIX ]
            </h3>
            <p className="text-[11px] text-system-muted">
              Neurological recovery & weekly set volume allocation across prime movers.
            </p>
          </div>
        </div>

        <span className="text-[10px] px-2.5 py-1 rounded bg-blue-950/80 border border-blue-500/30 text-blue-300 font-bold self-start sm:self-auto">
          SYSTEM SCAN: OPTIMAL MEV/MAV
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Muscle Selector Grid */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-2">
          {MUSCLE_GROUPS.map((m) => {
            const isCurrent = m.id === selectedId;
            return (
              <button
                key={m.id}
                onClick={() => selectMuscle(m.id, m.name)}
                onMouseEnter={() => sfx.playHover()}
                className={`p-3 rounded-lg border text-left transition-all relative overflow-hidden ${
                  isCurrent
                    ? 'bg-blue-950/60 border-blue-400 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                    : 'bg-black/40 border-white/10 text-gray-400 hover:border-blue-500/40 hover:text-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold truncate">{m.name.split(' ')[0]}</span>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      m.status === 'RECOVERED'
                        ? 'bg-emerald-400'
                        : m.status === 'HYPERTROPHY IN PROGRESS'
                        ? 'bg-blue-400'
                        : 'bg-red-400 animate-ping'
                    }`}
                  />
                </div>
                <div className="text-[10px] text-system-muted">
                  {m.weeklySets} sets / wk
                </div>
                <div className="mt-1 h-1 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      m.recoveryPercent > 90
                        ? 'bg-emerald-500'
                        : m.recoveryPercent > 75
                        ? 'bg-blue-500'
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${m.recoveryPercent}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Muscle Deep Diagnostics */}
        <div className="lg:col-span-7 p-4 rounded-xl bg-black/70 border border-blue-500/30 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
              <div>
                <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">
                  TARGET TARGET SPECIFICATION
                </span>
                <h4 className="text-sm font-bold text-white">{selected.name}</h4>
              </div>
              <span
                className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase ${
                  selected.status === 'RECOVERED'
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                    : selected.status === 'HYPERTROPHY IN PROGRESS'
                    ? 'bg-blue-950 text-blue-300 border border-blue-500/40'
                    : 'bg-red-950 text-red-300 border border-red-500/40'
                }`}
              >
                {selected.status}
              </span>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="p-2.5 rounded bg-slate-900/80 border border-white/10">
                <div className="text-[10px] text-gray-400">Current Volume:</div>
                <div className="text-sm font-bold text-blue-300">{selected.weeklySets} Hard Sets / Week</div>
                <div className="text-[9px] text-system-muted">Target: {selected.mevMavRange}</div>
              </div>

              <div className="p-2.5 rounded bg-slate-900/80 border border-white/10">
                <div className="text-[10px] text-gray-400">Recovery Integrity:</div>
                <div className="text-sm font-bold text-emerald-400">{selected.recoveryPercent}% Restored</div>
                <div className="text-[9px] text-system-muted">Ready for Max Contraction</div>
              </div>
            </div>

            {/* Exercise & Nutrition Recommendations */}
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded bg-blue-950/20 border border-blue-500/30">
                <div className="flex items-center gap-1.5 text-blue-300 font-bold text-[11px] mb-0.5">
                  <Dumbbell className="w-3.5 h-3.5" />
                  Primary Hypertrophy Vector:
                </div>
                <p className="text-[11px] text-gray-300">{selected.optimalMovement}</p>
              </div>

              <div className="p-2.5 rounded bg-purple-950/20 border border-purple-500/30">
                <div className="flex items-center gap-1.5 text-purple-300 font-bold text-[11px] mb-0.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Desi Nutrition Catalyst:
                </div>
                <p className="text-[11px] text-gray-300">{selected.nutritionKey}</p>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-white/10 flex justify-between items-center text-[10px] text-gray-400">
            <span>Progressive Overload Rule: Add 1 rep or +1.25kg once sets reach upper range</span>
            <span className="text-blue-400 font-bold">[ BIO-LOCKED ]</span>
          </div>
        </div>
      </div>
    </div>
  );
}
