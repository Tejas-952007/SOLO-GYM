'use client';

import React, { useState } from 'react';
import { sfx } from '@/lib/audio-sfx';
import { ShieldCheck, BatteryCharging, AlertTriangle, Check, Sparkles } from 'lucide-react';
import { spawnCombatNumber } from '@/components/effects/FloatingDamageNumbers';

interface Symptom {
  id: string;
  label: string;
  points: number;
}

const SYMPTOMS: Symptom[] = [
  { id: 'grip', label: 'Grip feeling sluggish on deadlift warmups', points: 25 },
  { id: 'sleep', label: 'Waking up unrefreshed despite 8h in bed', points: 30 },
  { id: 'joints', label: 'Elbow, shoulder or patellar tendon stiffness', points: 25 },
  { id: 'motivation', label: 'Dreading gym sessions for 3+ consecutive days', points: 20 },
];

export function DeloadPlanner() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<Record<string, boolean>>({
    grip: true,
    joints: true,
  });
  const [strategy, setStrategy] = useState<'VOLUME' | 'INTENSITY' | 'ACTIVE'>('VOLUME');

  const toggleSymptom = (id: string, label: string) => {
    setSelectedSymptoms(prev => {
      const next = !prev[id];
      if (next) {
        sfx.playStatPointAlloc();
        spawnCombatNumber(`SYMPTOM LOGGED: ${label}`, undefined, undefined, 'damage');
      } else {
        sfx.playClick();
      }
      return { ...prev, [id]: next };
    });
  };

  const fatigueScore = Object.entries(selectedSymptoms).reduce((acc, [id, val]) => {
    if (val) {
      const s = SYMPTOMS.find(item => item.id === id);
      return acc + (s?.points || 0);
    }
    return acc;
  }, 0);

  const needsDeload = fatigueScore >= 50;

  return (
    <div className="w-full bg-[#080712] border border-blue-500/40 rounded-2xl p-5 sm:p-7 shadow-[0_0_35px_rgba(59,130,246,0.15)] relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <BatteryCharging className="w-5 h-5 text-blue-400" />
            <h3 className="font-orbitron font-bold text-base sm:text-lg text-white uppercase tracking-wider">
              CENTRAL NERVOUS SYSTEM REBOOT // DELOAD ARCHITECT
            </h3>
          </div>
          <p className="font-mono text-xs text-gray-400 mt-1">
            Fatigue masks fitness. A structured deload supercompensates muscle glycogen and tendons for a new PR wave.
          </p>
        </div>
        <div className={`px-3 py-1.5 rounded-lg border font-mono text-xs font-bold flex items-center gap-2 ${
          needsDeload ? 'bg-amber-950/60 border-amber-500/50 text-amber-300' : 'bg-blue-950/60 border-blue-500/40 text-blue-300'
        }`}>
          <AlertTriangle className="w-4 h-4" />
          <span>CNS FATIGUE INDEX: {fatigueScore}%</span>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Symptoms Checklist (6 Cols) */}
        <div className="lg:col-span-6 space-y-2.5">
          <div className="font-mono text-[10px] text-gray-400 uppercase tracking-widest pb-1">
            [ SELECT ACTIVE SYSTEM OVERREACHING SYMPTOMS ]
          </div>
          {SYMPTOMS.map(s => {
            const isChecked = selectedSymptoms[s.id];
            return (
              <div
                key={s.id}
                onClick={() => toggleSymptom(s.id, s.label)}
                className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                  isChecked
                    ? 'bg-blue-950/40 border-blue-400 text-white shadow-[0_0_12px_rgba(59,130,246,0.2)]'
                    : 'bg-black/40 border-white/5 text-gray-400 opacity-60 hover:opacity-100 hover:border-white/20'
                }`}
              >
                <div className="font-sans text-xs sm:text-sm font-semibold">{s.label}</div>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                  isChecked ? 'bg-blue-500 text-black' : 'bg-white/10 text-gray-400'
                }`}>
                  {isChecked ? 'ACTIVE' : 'NONE'}
                </span>
              </div>
            );
          })}
        </div>

        {/* Strategy Selector & Prescription (6 Cols) */}
        <div className="lg:col-span-6 p-5 rounded-2xl bg-black/85 border border-blue-500/30 space-y-4 shadow-system-glow font-mono text-xs">
          <div className="text-blue-300 font-bold uppercase pb-2 border-b border-white/10 flex items-center justify-between">
            <span>[ RECOMMENDED DELOAD PROTOCOL ]</span>
            <Sparkles className="w-4 h-4 text-cyan-400" />
          </div>

          <div className="flex gap-2">
            {(['VOLUME', 'INTENSITY', 'ACTIVE'] as const).map(st => (
              <button
                key={st}
                onClick={() => {
                  sfx.playClick();
                  setStrategy(st);
                }}
                className={`flex-1 py-1.5 rounded-lg font-bold text-[10px] transition-all cursor-pointer ${
                  strategy === st
                    ? 'bg-blue-500 text-black shadow-[0_0_12px_rgba(59,130,246,0.6)]'
                    : 'bg-white/5 text-gray-400 hover:text-white'
                }`}
              >
                {st} CUT
              </button>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-blue-950/20 border border-blue-500/20 text-gray-200 space-y-1 font-sans text-xs sm:text-sm leading-relaxed">
            {strategy === 'VOLUME' && 'Cut all workout sets by 50% (e.g. 4 sets -> 2 sets). Maintain heavy loads at 85% 1RM. This dissipates systemic fatigue while preserving neural firing patterns.'}
            {strategy === 'INTENSITY' && 'Keep working sets identical but drop barbell weights to 60-65% 1RM. Focus on moving the bar with maximal explosive concentric speed.'}
            {strategy === 'ACTIVE' && 'Take 5-7 days completely away from heavy barbells. Focus on 10,000 steps, swimming, thoracic mobility, and tissue restoration.'}
          </div>

          <div className="p-3 rounded-lg bg-black/60 border border-white/10 text-[11px] text-gray-400 leading-relaxed font-mono">
            {needsDeload
              ? '⚠ High systemic fatigue detected. Run a 1-week deload to unlock your next compound 1RM PR.'
              : '✓ CNS reserves intact. Continue standard progressive overload cycle.'}
          </div>
        </div>
      </div>
    </div>
  );
}
