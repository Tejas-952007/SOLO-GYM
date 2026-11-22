'use client';

import React, { useState } from 'react';
import { sfx } from '@/lib/audio-sfx';
import { Flame, ShieldCheck, Check, Sparkles, Activity } from 'lucide-react';
import { spawnCombatNumber } from '@/components/effects/FloatingDamageNumbers';

interface WarmupDrill {
  id: string;
  name: string;
  target: string;
  reps: string;
  cleared: boolean;
}

export function DungeonWarmupCircuit() {
  const [drills, setDrills] = useState<WarmupDrill[]>([
    { id: 'facepull', name: 'Banded Face Pulls & External Rotations', target: 'Rear Delts & Rotator Cuff', reps: '2 sets x 15 reps', cleared: true },
    { id: 'hipflow', name: '90/90 Hip Flow & Deep Squat Prying', target: 'Hip Capsules & Ankle Mobility', reps: '2 minutes continuous', cleared: true },
    { id: 'catcow', name: 'Segmental Cat-Cow & Thoracic Extensions', target: 'Spinal Erectors & Core Brace', reps: '10 controlled waves', cleared: false },
    { id: 'emptybar', name: 'Empty Barbell Patterning with 3s Pause', target: 'Motor Unit Neurological Priming', reps: '2 sets x 10 reps', cleared: false },
  ]);

  const toggleDrill = (id: string, name: string) => {
    setDrills(prev =>
      prev.map(d => {
        if (d.id === id) {
          const next = !d.cleared;
          if (next) {
            sfx.playStatPointAlloc();
            spawnCombatNumber(`MOBILITY PRIMED: ${name}!`, undefined, undefined, 'mana');
          } else {
            sfx.playClick();
          }
          return { ...d, cleared: next };
        }
        return d;
      })
    );
  };

  const clearedCount = drills.filter(d => d.cleared).length;
  const isReady = clearedCount === drills.length;

  return (
    <div className="w-full bg-[#080712] border border-cyan-500/40 rounded-2xl p-5 sm:p-7 shadow-[0_0_35px_rgba(0,240,255,0.15)] relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            <h3 className="font-orbitron font-bold text-base sm:text-lg text-white uppercase tracking-wider">
              DUNGEON PRIMER // PRE-LIFT MOBILITY CIRCUIT
            </h3>
          </div>
          <p className="font-mono text-xs text-gray-400 mt-1">
            Cold tendons tear. Prime synovial fluid in shoulders, hips, and ankles before loading the bar.
          </p>
        </div>
        <div className={`px-3 py-1.5 rounded-lg border font-mono text-xs font-bold flex items-center gap-2 ${
          isReady ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300' : 'bg-cyan-950/60 border-cyan-500/40 text-cyan-300'
        }`}>
          <ShieldCheck className="w-4 h-4" />
          <span>{isReady ? 'JOINTS FULLY LUBRICATED [PRIMED]' : `${clearedCount} / 4 DRILLS COMPLETED`}</span>
        </div>
      </div>

      {/* Drills Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {drills.map(d => (
          <div
            key={d.id}
            onClick={() => toggleDrill(d.id, d.name)}
            className={`p-3.5 rounded-xl border cursor-pointer flex flex-col justify-between transition-all ${
              d.cleared
                ? 'bg-cyan-950/30 border-cyan-500/60 text-white shadow-[0_0_12px_rgba(0,240,255,0.15)]'
                : 'bg-black/40 border-white/10 text-gray-400 opacity-60 hover:opacity-100 hover:border-white/20'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-heading font-bold text-xs sm:text-sm text-white">{d.name}</span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                  d.cleared ? 'bg-cyan-500 text-black shadow-[0_0_8px_#00f0ff]' : 'bg-white/10 text-gray-400'
                }`}>
                  {d.cleared ? 'PRIMED' : 'PENDING'}
                </span>
              </div>
              <div className="font-mono text-[10px] text-cyan-400 mb-2">{d.target}</div>
            </div>

            <div className="pt-2 border-t border-white/5 flex items-center justify-between font-mono text-[11px] text-gray-400">
              <span>DOSE: {d.reps}</span>
              <span className="text-gray-500">{d.cleared ? '✓ READY' : 'TAP TO COMPLETE'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
