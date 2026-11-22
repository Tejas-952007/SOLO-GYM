'use client';

import React, { useState } from 'react';
import { sfx } from '@/lib/audio-sfx';
import { Skull, Flame, ShieldAlert, CheckCircle2, Sparkles } from 'lucide-react';
import { spawnCombatNumber } from '@/components/effects/FloatingDamageNumbers';

export function CartenonCommandments() {
  const [sealed, setSealed] = useState<Record<number, boolean>>({
    1: true,
    2: false,
    3: false,
  });

  const commandments = [
    {
      id: 1,
      scripture: 'FIRST COMMANDMENT // RESPECT THE GOD',
      gymLaw: 'BOW YOUR EGO BEFORE THE BARBELL',
      desc: 'Leave half-reps and ego-lifting outside the temple. Full depth, locked knees, paused chest contact. The Iron does not lie.',
      xp: '+100 HUMILITY XP',
    },
    {
      id: 2,
      scripture: 'SECOND COMMANDMENT // PRAISE THE GOD',
      gymLaw: 'HONOR THE UNGLAMOROUS BASICS',
      desc: 'Praise the unsexy meals: plain paneer, steamed soya, boiled dal. No secret shortcuts exist. The temple favors unyielding repetition.',
      xp: '+100 CONSISTENCY XP',
    },
    {
      id: 3,
      scripture: 'THIRD COMMANDMENT // PROVE YOUR FAITH',
      gymLaw: 'HOLD THE CIRCLE OF PAIN',
      desc: 'When the final rep grinds to a halt at RPE 10, do not dump the bar. Battle through the sticking point to earn System Re-Awakening.',
      xp: '+150 MONARCH XP',
    },
  ];

  const toggleCommandment = (id: number, gymLaw: string) => {
    setSealed(prev => {
      const next = !prev[id];
      if (next) {
        sfx.playStatPointAlloc();
        spawnCombatNumber(`SEALED: ${gymLaw}`, undefined, undefined, 'mana');
      } else {
        sfx.playClick();
      }
      return { ...prev, [id]: next };
    });
  };

  const allSealed = sealed[1] && sealed[2] && sealed[3];

  return (
    <div className="w-full bg-[#080712] border border-red-500/40 rounded-2xl p-5 sm:p-7 shadow-[0_0_35px_rgba(239,68,68,0.15)] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Skull className="w-5 h-5 text-red-400" />
            <h3 className="font-orbitron font-bold text-base sm:text-lg text-white uppercase tracking-wider">
              CARTENON TEMPLE // THREE IRON COMMANDMENTS
            </h3>
          </div>
          <p className="font-mono text-xs text-gray-400 mt-1">
            Transcribed from the stone tablet of the God Statue. Only lifters who obey all three survive the Awakening.
          </p>
        </div>
        <div className={`px-3 py-1.5 rounded-lg border font-mono text-xs font-bold flex items-center gap-2 ${
          allSealed ? 'bg-amber-950/60 border-amber-500/50 text-amber-300 shadow-[0_0_15px_rgba(245,197,66,0.5)]' : 'bg-red-950/60 border-red-500/40 text-red-300'
        }`}>
          <Flame className={`w-4 h-4 ${allSealed ? 'text-amber-400 animate-bounce' : 'text-red-400'}`} />
          <span>{allSealed ? 'TEMPLE ALTAR IGNITED [AWAKENED]' : 'TRIAL IN PROGRESS'}</span>
        </div>
      </div>

      {/* 3 Commandments Cards */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        {commandments.map(c => {
          const isDone = sealed[c.id];
          return (
            <div
              key={c.id}
              onClick={() => toggleCommandment(c.id, c.gymLaw)}
              className={`p-4 rounded-xl border cursor-pointer flex flex-col justify-between transition-all ${
                isDone
                  ? 'bg-red-950/30 border-red-500/60 text-white shadow-[0_0_15px_rgba(239,68,68,0.25)]'
                  : 'bg-black/40 border-white/10 text-gray-400 opacity-60 hover:opacity-100 hover:border-white/20'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[9px] text-red-400 font-bold uppercase tracking-wider">
                    {c.scripture}
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                    isDone ? 'bg-red-500/20 text-red-300 border border-red-500/40' : 'bg-white/5 text-gray-500'
                  }`}>
                    {isDone ? 'SEALED' : 'UNSEALED'}
                  </span>
                </div>
                <h4 className="font-orbitron font-bold text-sm text-white mb-2 leading-snug">
                  {c.gymLaw}
                </h4>
                <p className="font-sans text-xs text-gray-300 leading-relaxed mb-4">
                  {c.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[11px]">
                <span className="text-cyan-400 font-bold">{c.xp}</span>
                <span className="text-gray-500">{isDone ? '✓ OBEYED' : 'TAP TO OBEY'}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
