'use client';

import React, { useState } from 'react';
import { sfx } from '@/lib/audio-sfx';
import { Droplet, Plus, Minus, ShieldCheck, Sparkles } from 'lucide-react';
import { spawnCombatNumber } from '@/components/effects/FloatingDamageNumbers';

export function HydrationChamber() {
  const [liters, setLiters] = useState(2.5);
  const [creatineLogged, setCreatineLogged] = useState(true);

  const targetLiters = 4.0;
  const hydrationPct = Math.min(100, Math.round((liters / targetLiters) * 100));

  const addWater = (amount: number) => {
    sfx.playStatPointAlloc();
    setLiters(prev => {
      const next = Math.max(0.5, Math.min(6.0, Number((prev + amount).toFixed(1))));
      spawnCombatNumber(`+${amount}L MANA FLUID!`, undefined, undefined, 'mana');
      return next;
    });
  };

  const toggleCreatine = () => {
    setCreatineLogged(prev => {
      const next = !prev;
      if (next) {
        sfx.playRankUp();
        spawnCombatNumber('5G CREAPURE SATURATED! +15% INTRA-MUSCULAR ATP', undefined, undefined, 'stat');
      } else {
        sfx.playClick();
      }
      return next;
    });
  };

  return (
    <div className="w-full bg-[#080712] border border-cyan-500/40 rounded-2xl p-5 sm:p-7 shadow-[0_0_35px_rgba(0,240,255,0.15)] relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Droplet className="w-5 h-5 text-cyan-400" />
            <h3 className="font-orbitron font-bold text-base sm:text-lg text-white uppercase tracking-wider">
              INTRA-CELLULAR HYDRATION &amp; CREATINE RESERVOIR
            </h3>
          </div>
          <p className="font-mono text-xs text-gray-400 mt-1">
            Muscle tissue is 75% water. Creatine draws glycogen and water into muscle cells, expanding cellular volume.
          </p>
        </div>
        <div className="px-3 py-1.5 rounded-lg bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>CELLULAR SATURATION: {hydrationPct}%</span>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Water Controls & Gauge (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div>
            <div className="flex justify-between font-mono text-xs text-gray-300 mb-1">
              <span className="text-cyan-400 font-bold uppercase">DAILY WATER CONSUMPTION</span>
              <span className="font-bold text-white">{liters} / {targetLiters} LITERS</span>
            </div>
            <div className="w-full h-3.5 bg-black rounded-full overflow-hidden border border-cyan-500/40 p-0.5">
              <div
                className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-teal-300 rounded-full transition-all duration-300 shadow-[0_0_12px_rgba(0,240,255,0.8)]"
                style={{ width: `${hydrationPct}%` }}
              />
            </div>
          </div>

          {/* Quick Intake Increments */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              onClick={() => addWater(0.25)}
              className="px-3 py-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold transition-all cursor-pointer"
            >
              +250ml Glass
            </button>
            <button
              onClick={() => addWater(0.5)}
              className="px-3 py-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold transition-all cursor-pointer"
            >
              +500ml Flask
            </button>
            <button
              onClick={() => addWater(1.0)}
              className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/40 border border-cyan-400 text-white font-mono text-xs font-bold transition-all cursor-pointer"
            >
              +1.0L Bottle
            </button>
            <button
              onClick={() => addWater(-0.5)}
              className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 font-mono text-xs transition-all cursor-pointer"
            >
              -500ml
            </button>
          </div>

          {/* Creatine Saturation Switch */}
          <div
            onClick={toggleCreatine}
            className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
              creatineLogged
                ? 'bg-cyan-950/40 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                : 'bg-black/40 border-white/10 text-gray-400'
            }`}
          >
            <div>
              <div className="font-heading font-bold text-xs sm:text-sm text-white">
                5g Creapure Monohydrate Intake
              </div>
              <div className="font-mono text-[10px] text-gray-400">
                Saturates phosphocreatine kinase buffer for explosive 1RM rep strength
              </div>
            </div>
            <span className={`font-mono text-xs px-2.5 py-1 rounded font-bold ${
              creatineLogged ? 'bg-cyan-500 text-black shadow-[0_0_8px_#00f0ff]' : 'bg-white/10 text-gray-400'
            }`}>
              {creatineLogged ? 'LOGGED' : 'PENDING'}
            </span>
          </div>
        </div>

        {/* Telemetry Summary Card (5 Cols) */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-black/85 border border-cyan-500/30 space-y-3 font-mono text-xs">
          <div className="text-cyan-400 font-bold uppercase pb-2 border-b border-white/10 flex items-center justify-between">
            <span>[ CELLULAR VOLUMIZATION ]</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-gray-300">
              <span>Nitrogenous Clearance:</span>
              <strong className={liters >= 3 ? 'text-emerald-400' : 'text-amber-400'}>
                {liters >= 3 ? 'OPTIMAL RENAL FLUSH' : 'NEEDS HYDRATION'}
              </strong>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Myofibrillar Water Volumization:</span>
              <strong className="text-cyan-300">{hydrationPct}% PEAK</strong>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Intra-Muscular Cramp Defense:</span>
              <strong className="text-white">100% IMMUNITY</strong>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-black/60 border border-white/10 text-[11px] text-gray-400 leading-relaxed">
            {liters >= 3.5
              ? '✓ Full intracellular fluid retention achieved. Your muscles will look fuller and maintain maximal leverage.'
              : '⚠ Insufficient water limits creatine absorption and reduces contractile force by up to 12%.'}
          </div>
        </div>
      </div>
    </div>
  );
}
