'use client';

import React, { useState } from 'react';
import { sfx } from '@/lib/audio-sfx';
import { Dumbbell, Shield, CheckCircle2, ChevronRight, Award } from 'lucide-react';
import { spawnCombatNumber } from '@/components/effects/FloatingDamageNumbers';

interface StepTier {
  step: number;
  title: string;
  repTarget: string;
  targetMuscle: string;
  benefit: string;
  cleared: boolean;
}

export function PullupProgressionLadder() {
  const [steps, setSteps] = useState<StepTier[]>([
    { step: 1, title: 'Bar Dead Hangs', repTarget: '3 sets x 30 sec', targetMuscle: 'Brachioradialis & Grip', benefit: 'Spine decompression & neural tendon preparation', cleared: true },
    { step: 2, title: 'Scapular Lat Depressions', repTarget: '3 sets x 10 reps', targetMuscle: 'Lower Trapezius & Lats', benefit: 'Teaches lats to initiate pull before biceps take over', cleared: true },
    { step: 3, title: '5-Second Negative Lowers', repTarget: '3 sets x 5 reps', targetMuscle: 'Latissimus Dorsi', benefit: 'Eccentric motor unit recruitment under supramaximal load', cleared: false },
    { step: 4, title: 'Band-Assisted Pull-ups', repTarget: '3 sets x 8 reps', targetMuscle: 'Full Upper Kinetic Chain', benefit: 'Full range of motion movement pattern without shoulder impingement', cleared: false },
    { step: 5, title: 'Strict Dead-Hang Pull-ups', repTarget: '3 sets x 5-8 reps', targetMuscle: 'True Hunter Back Density', benefit: 'Zero kipping or momentum. Pure sovereign body control', cleared: false },
  ]);

  const toggleStep = (idx: number, title: string) => {
    setSteps(prev =>
      prev.map((s, i) => {
        if (i === idx) {
          const next = !s.cleared;
          if (next) {
            sfx.playStatPointAlloc();
            spawnCombatNumber(`CLEARED STEP 0${s.step}! +150 XP`, undefined, undefined, 'stat');
          } else {
            sfx.playClick();
          }
          return { ...s, cleared: next };
        }
        return s;
      })
    );
  };

  const clearedCount = steps.filter(s => s.cleared).length;

  return (
    <div className="w-full bg-[#080712] border border-cyan-500/40 rounded-2xl p-5 sm:p-7 shadow-[0_0_35px_rgba(0,240,255,0.15)] relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Dumbbell className="w-5 h-5 text-cyan-400" />
            <h3 className="font-orbitron font-bold text-base sm:text-lg text-white uppercase tracking-wider">
              CALISTHENICS CRUCIBLE // 0 TO 10 PULL-UPS LADDER
            </h3>
          </div>
          <p className="font-mono text-xs text-gray-400 mt-1">
            Cannot do a single pull-up? Do not skip the progression. Master each rung sequentially.
          </p>
        </div>
        <div className="px-3 py-1.5 rounded-lg bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold flex items-center gap-2">
          <Award className="w-4 h-4 text-cyan-400" />
          <span>MASTERY: {clearedCount} / 5 RUNGS</span>
        </div>
      </div>

      {/* Steps List */}
      <div className="relative z-10 space-y-2.5">
        {steps.map((st, idx) => (
          <div
            key={st.step}
            onClick={() => toggleStep(idx, st.title)}
            onMouseEnter={() => sfx.playHover()}
            className={`p-3.5 rounded-xl border cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-all ${
              st.cleared
                ? 'bg-cyan-950/30 border-cyan-500/50 text-white shadow-[0_0_12px_rgba(0,240,255,0.15)]'
                : 'bg-black/40 border-white/10 text-gray-400 opacity-60 hover:opacity-100 hover:border-white/20'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-orbitron font-black text-xs ${
                st.cleared ? 'bg-cyan-400 text-black shadow-[0_0_10px_#00f0ff]' : 'bg-white/10 text-gray-400'
              }`}>
                0{st.step}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-heading font-bold text-sm text-white">{st.title}</span>
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-black/60 border border-white/10 text-cyan-300">
                    {st.repTarget}
                  </span>
                </div>
                <div className="text-xs text-gray-400 font-sans mt-0.5">
                  <strong className="text-gray-300">{st.targetMuscle}:</strong> {st.benefit}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-white/5 pt-2 sm:pt-0">
              <span className={`text-[10px] font-mono px-2 py-1 rounded font-bold ${
                st.cleared ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-white/5 text-gray-500'
              }`}>
                {st.cleared ? '✓ MASTERED' : 'TAP TO COMPLETE'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
