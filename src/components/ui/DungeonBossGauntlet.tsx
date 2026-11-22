'use client';

import React, { useState } from 'react';
import { sfx } from '@/lib/audio-sfx';
import { Skull, Swords, Shield, Trophy, Sparkles } from 'lucide-react';
import { spawnCombatNumber } from '@/components/effects/FloatingDamageNumbers';

interface BossProfile {
  id: string;
  name: string;
  title: string;
  rank: string;
  hp: number;
  weakness: string;
  drop: string;
  color: string;
  border: string;
}

const BOSSES: BossProfile[] = [
  {
    id: 'kasaka',
    name: 'BLUE POISON-FANG KASAKA',
    title: 'SWAMP OF SORENESS // FLOOR 01',
    rank: 'RANK C+',
    hp: 2500,
    weakness: 'Barbell Deadlifts & Forearm Grip Endurance',
    drop: "Kasaka's Poison Fang (+25 STR)",
    color: 'text-cyan-400',
    border: 'border-cyan-500/40 hover:border-cyan-400',
  },
  {
    id: 'cerberus',
    name: 'HELLHOUND CERBERUS',
    title: 'GATEKEEPER OF TIREDNESS // FLOOR 02',
    rank: 'RANK B',
    hp: 4200,
    weakness: 'Electrolyte Hydration & 8hr Stage-3 Sleep',
    drop: 'Pelt of the Hellhound (+30% Joint Armor)',
    color: 'text-amber-400',
    border: 'border-amber-500/40 hover:border-amber-400',
  },
  {
    id: 'kargalgan',
    name: 'HIGH ORC SHAMAN KARGALGAN',
    title: 'CURSE OF THE EGO-LIFTER // FLOOR 03',
    rank: 'RANK A',
    hp: 6800,
    weakness: 'Full Range of Motion & Strict 3s Pauses',
    drop: 'Orb of Avarice (Doubles Muscle Synthesis)',
    color: 'text-red-400',
    border: 'border-red-500/40 hover:border-red-400',
  },
  {
    id: 'ant-king',
    name: 'BERU: THE UNPROMOTED ANT KING',
    title: 'APEX ISLAND GAUNTLET // FLOOR 04',
    rank: 'RANK S',
    hp: 10000,
    weakness: 'Progressive Overload + 180g Desi Protein Matrix',
    drop: 'Monarch Dagger (+100% Shadow Extraction)',
    color: 'text-purple-400',
    border: 'border-purple-500/40 hover:border-purple-400',
  },
];

export function DungeonBossGauntlet() {
  const [activeBossId, setActiveBossId] = useState('kasaka');
  const [currentHp, setCurrentHp] = useState<Record<string, number>>({
    kasaka: 2500,
    cerberus: 4200,
    kargalgan: 6800,
    'ant-king': 10000,
  });

  const activeBoss = BOSSES.find(b => b.id === activeBossId) || BOSSES[0];
  const bossHp = currentHp[activeBossId] ?? activeBoss.hp;

  const attackBoss = (dmg: number, moveName: string) => {
    if (bossHp <= 0) return;
    sfx.playBladeSlash();
    const next = Math.max(0, bossHp - dmg);
    setCurrentHp(prev => ({ ...prev, [activeBossId]: next }));
    spawnCombatNumber(`CRIT! -${dmg} DMG [${moveName}]`, undefined, undefined, 'damage');

    if (next === 0) {
      sfx.playRankUp();
      spawnCombatNumber(`BOSS SLAIN! [${activeBoss.drop}] CLAIMED`, undefined, undefined, 'stat');
    }
  };

  const selectBoss = (b: BossProfile) => {
    sfx.playMenuOpen();
    setActiveBossId(b.id);
  };

  return (
    <div className="w-full bg-[#080712] border border-system-accent/40 rounded-2xl p-5 sm:p-7 shadow-[0_0_35px_rgba(139,92,246,0.15)] relative overflow-hidden">
      {/* Header */}
      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Swords className="w-5 h-5 text-purple-400" />
            <h3 className="font-orbitron font-bold text-base sm:text-lg text-white uppercase tracking-wider">
              DUNGEON GAUNTLET // 4 BOSS RAID REGISTRY
            </h3>
          </div>
          <p className="font-mono text-xs text-gray-400 mt-1">
            Choose your floor boss. Exploit lifting biomechanic weaknesses to claim legendary artifacts.
          </p>
        </div>
        <div className={`px-3 py-1.5 rounded-lg border font-mono text-xs font-bold ${activeBoss.color} border-white/20 bg-black/60`}>
          ACTIVE TARGET: {activeBoss.rank}
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Boss Registry Buttons (4 Cols) */}
        <div className="lg:col-span-4 space-y-2">
          {BOSSES.map(b => (
            <button
              key={b.id}
              onClick={() => selectBoss(b)}
              className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                activeBossId === b.id
                  ? 'bg-purple-950/40 border-purple-400 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]'
                  : 'bg-black/40 border-white/5 text-gray-400 hover:text-white hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`font-orbitron font-bold text-xs ${b.color}`}>{b.name}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-white">{b.rank}</span>
              </div>
              <div className="font-mono text-[10px] text-gray-400">{b.title}</div>
            </button>
          ))}
        </div>

        {/* Boss Combat Arena (8 Cols) */}
        <div className="lg:col-span-8 p-5 rounded-2xl bg-black/85 border border-purple-500/30 space-y-4 shadow-system-glow">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-white/10 pb-3">
            <div>
              <div className="font-orbitron font-black text-lg text-white">{activeBoss.name}</div>
              <div className="font-mono text-xs text-gray-400">{activeBoss.title}</div>
            </div>
            <div className="font-mono text-sm font-bold text-yellow-400">
              {bossHp > 0 ? `${bossHp} / ${activeBoss.hp} HP` : '[ BOSS CRUSHED! ]'}
            </div>
          </div>

          {/* Health Bar */}
          <div>
            <div className="w-full h-3 bg-black rounded-full overflow-hidden border border-red-500/40 p-0.5">
              <div
                className="h-full bg-gradient-to-r from-red-600 via-orange-500 to-amber-400 rounded-full transition-all duration-300"
                style={{ width: `${(bossHp / activeBoss.hp) * 100}%` }}
              />
            </div>
          </div>

          {/* Weakness & Drop Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 rounded-lg bg-black/60 border border-white/10">
              <div className="text-[10px] text-gray-500 uppercase">BIOMECHANICAL WEAKNESS</div>
              <div className="text-cyan-300 font-bold mt-0.5">{activeBoss.weakness}</div>
            </div>
            <div className="p-3 rounded-lg bg-black/60 border border-white/10">
              <div className="text-[10px] text-gray-500 uppercase">MYTHIC RAID DROP</div>
              <div className="text-amber-300 font-bold mt-0.5">{activeBoss.drop}</div>
            </div>
          </div>

          {/* Player Attack Actions */}
          <div className="pt-2 flex flex-wrap gap-2.5">
            <button
              onClick={() => attackBoss(600, 'EXPLOSIVE DEADLIFT')}
              disabled={bossHp <= 0}
              className="px-4 py-2 rounded-lg bg-red-950/60 hover:bg-red-900/60 border border-red-500/60 text-red-300 font-mono text-xs font-bold uppercase transition-all disabled:opacity-40 cursor-pointer"
            >
              [ EXPLOSIVE DEADLIFT: -600 HP ]
            </button>
            <button
              onClick={() => attackBoss(1200, 'PAUSED SQUAT OVERLOAD')}
              disabled={bossHp <= 0}
              className="px-4 py-2 rounded-lg bg-purple-950/60 hover:bg-purple-900/60 border border-purple-500/60 text-purple-300 font-mono text-xs font-bold uppercase transition-all disabled:opacity-40 cursor-pointer"
            >
              [ PAUSED SQUAT: -1,200 HP ]
            </button>
            {bossHp <= 0 && (
              <button
                onClick={() => setCurrentHp(prev => ({ ...prev, [activeBossId]: activeBoss.hp }))}
                className="px-4 py-2 rounded-lg bg-yellow-500 text-black font-mono text-xs font-bold uppercase transition-all cursor-pointer"
              >
                [ RESPAWN BOSS ]
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
