'use client';

import React, { useState } from 'react';
import { sfx } from '@/lib/audio-sfx';
import { Crown, Sparkles, Shield, Swords, ChevronUp, Zap } from 'lucide-react';
import { spawnCombatNumber } from '@/components/effects/FloatingDamageNumbers';

interface Soldier {
  id: string;
  name: string;
  koreanName: string;
  tier: string;
  level: number;
  maxLevel: number;
  buffs: string[];
  color: string;
}

const INITIAL_SOLDIERS: Soldier[] = [
  {
    id: 'igris',
    name: 'IGRIS',
    koreanName: '이그리트',
    tier: 'BLOOD-RED COMMANDER',
    level: 1,
    maxLevel: 3,
    buffs: ['+20kg Barbell Deadlift', '+35kg Deadlift & Strict Lockout', '+50kg Deadlift & Demon Grip Mastery'],
    color: 'text-red-400 border-red-500/50',
  },
  {
    id: 'iron',
    name: 'IRON',
    koreanName: '아이언',
    tier: 'SHIELD VANGUARD',
    level: 1,
    maxLevel: 3,
    buffs: ['+15kg Bench Press Stability', '+25kg Bench & Scapular Lock', '+40kg Bench & Ribcage Armor'],
    color: 'text-cyan-400 border-cyan-500/50',
  },
  {
    id: 'tank',
    name: 'TANK',
    koreanName: '탱크',
    tier: 'ICE BEAR ALPHA',
    level: 1,
    maxLevel: 3,
    buffs: ['+25kg Squat Core Drive', '+40kg Squat Depth Mastery', '+60kg Squat & Quad Hypertrophy'],
    color: 'text-amber-400 border-amber-500/50',
  },
  {
    id: 'beru',
    name: 'BERU',
    koreanName: '베르',
    tier: 'ANT MARSHAL',
    level: 1,
    maxLevel: 3,
    buffs: ['+30g Daily Protein Bioavailability', '+50g Protein & Leucine Saturation', '+100% Hypertrophic Synthesis'],
    color: 'text-purple-400 border-purple-500/50',
  },
];

export function ShadowBarracks() {
  const [soldiers, setSoldiers] = useState<Soldier[]>(INITIAL_SOLDIERS);

  const promoteSoldier = (id: string, name: string) => {
    setSoldiers(prev =>
      prev.map(s => {
        if (s.id === id && s.level < s.maxLevel) {
          sfx.playRankAscent();
          const nextLvl = s.level + 1;
          spawnCombatNumber(`${name} PROMOTED TO LVL ${nextLvl}!`, undefined, undefined, 'stat');
          return { ...s, level: nextLvl };
        }
        return s;
      })
    );
  };

  return (
    <div className="w-full bg-[#080712] border border-purple-500/40 rounded-2xl p-5 sm:p-7 shadow-[0_0_35px_rgba(168,85,247,0.15)] relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-purple-400" />
            <h3 className="font-orbitron font-bold text-base sm:text-lg text-white uppercase tracking-wider">
              SHADOW ARMY BARRACKS // SOVEREIGN PROMOTION CRUCIBLE
            </h3>
          </div>
          <p className="font-mono text-xs text-gray-400 mt-1">
            Shadow soldiers evolve alongside your lifting PRs. Promote commanders to amplify compound strength buffs.
          </p>
        </div>
        <div className="px-3 py-1.5 rounded-lg bg-purple-950/60 border border-purple-500/40 text-purple-300 font-mono text-xs font-bold flex items-center gap-2">
          <Zap className="w-4 h-4 text-system-gold" />
          <span>MONARCH EXTRACTION PROTOCOL</span>
        </div>
      </div>

      {/* Soldiers Roster Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {soldiers.map(s => {
          const currentBuff = s.buffs[s.level - 1];
          const isMax = s.level >= s.maxLevel;
          return (
            <div
              key={s.id}
              className={`p-4 rounded-xl border bg-black/75 flex flex-col justify-between transition-all ${s.color} shadow-[0_0_15px_rgba(0,0,0,0.8)]`}
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-orbitron font-black text-sm text-white">{s.name}</span>
                    <span className="font-cinzel text-xs text-gray-500">{s.koreanName}</span>
                  </div>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/10 text-white font-bold">
                    LVL {s.level}/{s.maxLevel}
                  </span>
                </div>

                <div className="font-mono text-[10px] text-gray-400 mb-3">{s.tier}</div>

                {/* Mana Level Gauge */}
                <div className="w-full h-2 bg-gray-900 rounded-full overflow-hidden border border-white/10 mb-3">
                  <div
                    className="h-full bg-gradient-to-r from-purple-600 to-cyan-400 rounded-full transition-all duration-300 shadow-[0_0_8px_#a855f7]"
                    style={{ width: `${(s.level / s.maxLevel) * 100}%` }}
                  />
                </div>

                {/* Active Buff */}
                <div className="p-2.5 rounded-lg bg-black/60 border border-white/5 font-mono text-xs">
                  <div className="text-[9px] text-gray-500 uppercase">ACTIVE GYM BUFF:</div>
                  <div className="text-white font-bold text-[11px] mt-0.5 leading-tight">{currentBuff}</div>
                </div>
              </div>

              {/* Promote Button */}
              <button
                onClick={() => promoteSoldier(s.id, s.name)}
                disabled={isMax}
                onMouseEnter={() => sfx.playHover()}
                className={`mt-4 w-full py-2 px-3 rounded-lg font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  isMax
                    ? 'bg-white/5 border border-white/10 text-gray-500 cursor-not-allowed'
                    : 'bg-purple-950/80 hover:bg-purple-900/80 border border-purple-500 text-purple-200 shadow-[0_0_12px_rgba(168,85,247,0.3)] hover:scale-105 active:scale-95'
                }`}
              >
                {isMax ? (
                  <span>[ MAX RANK REACHED ]</span>
                ) : (
                  <>
                    <ChevronUp className="w-3.5 h-3.5" />
                    <span>PROMOTE RANK</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
