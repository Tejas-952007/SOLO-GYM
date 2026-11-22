'use client';

import React, { useState } from 'react';
import { sfx } from '@/lib/audio-sfx';
import { Flame, ShieldCheck, AlertTriangle, Calendar, Award } from 'lucide-react';
import { spawnCombatNumber } from '@/components/effects/FloatingDamageNumbers';

export function DailyDisciplineFlame() {
  const [days, setDays] = useState([
    { day: 'MON', label: 'Chest + Triceps', done: true },
    { day: 'TUE', label: 'Back + Biceps', done: true },
    { day: 'WED', label: 'Legs + Abs', done: true },
    { day: 'THU', label: 'Shoulders + Arms', done: true },
    { day: 'FRI', label: 'Full Body Hypertrophy', done: false },
    { day: 'SAT', label: 'Cardio + Mobility', done: false },
    { day: 'SUN', label: 'Active Rest + Meal Prep', done: false },
  ]);

  const completedCount = days.filter(d => d.done).length;
  const streakMultiplier = (1 + (completedCount * 0.2)).toFixed(1);

  const toggleDay = (idx: number, dayName: string) => {
    setDays(prev =>
      prev.map((d, i) => {
        if (i === idx) {
          const next = !d.done;
          if (next) {
            sfx.playStatPointAlloc();
            spawnCombatNumber(`+100 STREAK XP! [${dayName}]`, undefined, undefined, 'stat');
          } else {
            sfx.playClick();
          }
          return { ...d, done: next };
        }
        return d;
      })
    );
  };

  return (
    <div className="w-full bg-[#080712] border border-system-accent/40 rounded-2xl p-5 sm:p-7 shadow-[0_0_35px_rgba(139,92,246,0.15)] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-400 animate-pulse" />
            <h3 className="font-orbitron font-bold text-base sm:text-lg text-white uppercase tracking-wider">
              DISCIPLINE CRUCIBLE // 7-DAY STREAK FLAME
            </h3>
          </div>
          <p className="font-mono text-xs text-gray-400 mt-1">
            Motivation is fleeting. Discipline is permanent. Maintain your streak to prevent the Penalty Zone.
          </p>
        </div>
        <div className="px-3 py-1.5 rounded-lg bg-purple-950/60 border border-purple-500/40 text-purple-300 font-mono text-xs font-bold flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400" />
          <span>STREAK MULTIPLIER: {streakMultiplier}x XP</span>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* 7 Days Grid (8 Cols) */}
        <div className="lg:col-span-8">
          <div className="grid grid-cols-2 sm:grid-cols-7 gap-2.5">
            {days.map((item, idx) => (
              <div
                key={item.day}
                onClick={() => toggleDay(idx, item.day)}
                className={`p-3 rounded-xl border cursor-pointer flex flex-col justify-between text-center transition-all ${
                  item.done
                    ? 'bg-purple-950/40 border-purple-400 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)] scale-[1.02]'
                    : 'bg-black/40 border-white/10 text-gray-400 hover:border-white/30'
                }`}
              >
                <div className="font-orbitron font-bold text-xs text-cyan-300">{item.day}</div>
                <div className="font-mono text-[9px] text-gray-400 py-1 leading-tight">{item.label}</div>
                <div className="mt-1">
                  <span className={`inline-block text-[9px] font-mono px-1.5 py-0.5 rounded font-bold ${
                    item.done ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-white/5 text-gray-500'
                  }`}>
                    {item.done ? 'LOCKED' : 'PENDING'}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p className="font-mono text-[11px] text-gray-500 mt-3 text-center sm:text-left">
            * Tap any day to log completed workout session or active recovery protocol.
          </p>
        </div>

        {/* Penalty Zone Status Banner (4 Cols) */}
        <div className="lg:col-span-4 p-4 rounded-xl bg-black/80 border border-white/10 space-y-2.5 font-mono">
          <div className="text-xs text-amber-400 font-bold uppercase flex items-center justify-between pb-1.5 border-b border-white/10">
            <span>[ SYSTEM ADHERENCE ]</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>

          <div className="space-y-1 text-xs">
            <div className="flex justify-between text-gray-300">
              <span>Weekly Completion:</span>
              <strong className="text-white">{completedCount} / 7 Days</strong>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Penalty Zone Risk:</span>
              <strong className={completedCount >= 4 ? 'text-emerald-400' : 'text-red-400'}>
                {completedCount >= 4 ? 'SECURE (0% RISK)' : 'CRITICAL PENALTY'}
              </strong>
            </div>
          </div>

          <div className="p-2.5 rounded bg-black/60 border border-white/5 text-[10px] text-gray-400 leading-relaxed">
            {completedCount >= 4
              ? 'Penalty Zone averted. You are accumulating compound iron density.'
              : 'Missing 4+ sessions summons the 4-hour desert survival trial.'}
          </div>
        </div>
      </div>
    </div>
  );
}
