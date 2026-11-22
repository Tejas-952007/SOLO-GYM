'use client';

import React, { useState } from 'react';
import { sfx } from '@/lib/audio-sfx';
import { Trophy, Medal, MapPin, Sparkles, Flame, Shield } from 'lucide-react';
import { spawnCombatNumber } from '@/components/effects/FloatingDamageNumbers';

interface LeaderboardEntry {
  rankPos: number;
  name: string;
  city: string;
  hunterRank: string;
  big3Total: string;
  streakDays: number;
  dietTag: string;
  badgeColor: string;
}

const HUNTERS: LeaderboardEntry[] = [
  { rankPos: 1, name: 'Rohan "Vajra" Sharma', city: 'MUMBAI', hunterRank: 'S-RANK', big3Total: '685 KG', streakDays: 142, dietTag: 'Low-Fat Paneer & Whey', badgeColor: 'text-amber-400 border-amber-500/50 bg-amber-950/20' },
  { rankPos: 2, name: 'Arjun "Ironheart" Verma', city: 'DELHI-NCR', hunterRank: 'S-RANK', big3Total: '660 KG', streakDays: 118, dietTag: '100% Soya & Dahi Stack', badgeColor: 'text-amber-400 border-amber-500/50 bg-amber-950/20' },
  { rankPos: 3, name: 'Kavya "Valkyrie" Nair', city: 'BENGALURU', hunterRank: 'A-RANK', big3Total: '495 KG', streakDays: 89, dietTag: 'Sprouts, Whey & Eggs', badgeColor: 'text-purple-400 border-purple-500/50 bg-purple-950/20' },
  { rankPos: 4, name: 'Tanmay "Titan" Deshmukh', city: 'PUNE', hunterRank: 'A-RANK', big3Total: '550 KG', streakDays: 74, dietTag: 'Paneer Bhurji & Soya Pulao', badgeColor: 'text-purple-400 border-purple-500/50 bg-purple-950/20' },
  { rankPos: 5, name: 'Aditya "Shadow" Patel', city: 'AHMEDABAD', hunterRank: 'B-RANK', big3Total: '445 KG', streakDays: 52, dietTag: 'Chana, Curd & Whey', badgeColor: 'text-blue-400 border-blue-500/50 bg-blue-950/20' },
];

export function HunterLeaderboard() {
  const [activeCity, setActiveCity] = useState<'ALL' | 'MUMBAI' | 'DELHI-NCR' | 'BENGALURU' | 'PUNE'>('ALL');

  const filteredHunters = activeCity === 'ALL'
    ? HUNTERS
    : HUNTERS.filter(h => h.city === activeCity);

  return (
    <div className="w-full bg-[#080712] border border-amber-500/40 rounded-2xl p-5 sm:p-7 shadow-[0_0_35px_rgba(245,197,66,0.15)] relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <h3 className="font-orbitron font-bold text-base sm:text-lg text-white uppercase tracking-wider">
              NATIONAL GUILD CRUCIBLE // TOP INDIAN LIFTERS
            </h3>
          </div>
          <p className="font-mono text-xs text-gray-400 mt-1">
            Real Indian lifters ascending from E-Rank recruits to National S-Rank Monarchs using pure desi nutrition.
          </p>
        </div>

        {/* City Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 font-mono text-[10px]">
          {(['ALL', 'MUMBAI', 'DELHI-NCR', 'BENGALURU', 'PUNE'] as const).map(city => (
            <button
              key={city}
              onClick={() => {
                sfx.playClick();
                setActiveCity(city);
              }}
              className={`px-2.5 py-1 rounded font-bold transition-all cursor-pointer ${
                activeCity === city
                  ? 'bg-amber-400 text-black shadow-[0_0_10px_rgba(245,197,66,0.6)]'
                  : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* Leaderboard Table / Cards */}
      <div className="relative z-10 space-y-2.5">
        {filteredHunters.map((hunter) => (
          <div
            key={hunter.rankPos}
            onMouseEnter={() => sfx.playHover()}
            className="p-3.5 rounded-xl bg-black/60 border border-white/10 hover:border-amber-400/40 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3.5">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-orbitron font-black text-sm ${
                hunter.rankPos === 1 ? 'bg-amber-400 text-black shadow-[0_0_12px_#f59e0b]' :
                hunter.rankPos === 2 ? 'bg-slate-300 text-black' :
                hunter.rankPos === 3 ? 'bg-amber-700 text-white' :
                'bg-white/10 text-gray-300'
              }`}>
                #{hunter.rankPos}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-heading font-bold text-sm text-white">{hunter.name}</span>
                  <span className="flex items-center gap-1 font-mono text-[10px] text-gray-400">
                    <MapPin className="w-3 h-3 text-cyan-400" />
                    {hunter.city}
                  </span>
                </div>
                <div className="font-mono text-xs text-gray-400 mt-0.5">
                  FUEL: <span className="text-gray-300">{hunter.dietTag}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-white/5 pt-2 sm:pt-0">
              <div className="text-right">
                <div className="text-[10px] text-gray-500 uppercase">BIG 3 LOAD</div>
                <div className="text-sm font-bold text-cyan-300">{hunter.big3Total}</div>
              </div>

              <div className="text-right px-2.5 border-l border-white/10">
                <div className="text-[10px] text-gray-500 uppercase">STREAK</div>
                <div className="text-sm font-bold text-amber-400 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5" />
                  <span>{hunter.streakDays}D</span>
                </div>
              </div>

              <div className={`px-2.5 py-1 rounded border font-mono text-[11px] font-bold ${hunter.badgeColor}`}>
                {hunter.hunterRank}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
