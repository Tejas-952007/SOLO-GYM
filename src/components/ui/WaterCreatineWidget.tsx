'use client';

import React, { useState } from 'react';
import { sfx } from '@/lib/audio-sfx';
import { Droplet, Zap, Plus, Minus, RotateCcw, ShieldCheck, Sparkles } from 'lucide-react';
import { spawnCombatNumber } from '@/components/effects/FloatingDamageNumbers';

export function WaterCreatineWidget() {
  const [waterMl, setWaterMl] = useState(2500); // 2.5L default
  const targetMl = 4000; // 4L target for Indian athletes
  const [creatineTaken, setCreatineTaken] = useState(true);

  const addWater = (amount: number) => {
    sfx.playWhoosh();
    setWaterMl(prev => {
      const next = Math.min(5000, Math.max(0, prev + amount));
      spawnCombatNumber(`+${amount}ml WATER`, undefined, undefined, 'mana');
      return next;
    });
  };

  const toggleCreatine = () => {
    sfx.playLevelUp();
    const next = !creatineTaken;
    setCreatineTaken(next);
    if (next) {
      spawnCombatNumber('5g CREAPURE CHARGED // ATP +15%', undefined, undefined, 'stat');
    }
  };

  const waterPercent = Math.min(100, Math.round((waterMl / targetMl) * 100));

  return (
    <div className="p-4 rounded-xl bg-black/75 border border-cyan-500/30 backdrop-blur-md shadow-[0_0_25px_rgba(6,182,212,0.15)] font-mono">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2 mb-3">
        <div className="flex items-center gap-2">
          <Droplet className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
            [ HYDRATION & CREAPURE MANA RESERVOIR ]
          </span>
        </div>
        <span className="text-[10px] text-system-muted">INTRA-CELLULAR ATP</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Water Meter */}
        <div className="md:col-span-7 space-y-2">
          <div className="flex justify-between items-end text-xs">
            <span className="text-gray-300">Water Volume Logged:</span>
            <span className="font-bold text-cyan-400">
              {(waterMl / 1000).toFixed(2)}L / {(targetMl / 1000).toFixed(1)}L ({waterPercent}%)
            </span>
          </div>

          <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden border border-cyan-500/30 p-0.5">
            <div
              className="h-full bg-gradient-to-r from-cyan-600 via-cyan-400 to-blue-400 rounded-full transition-all duration-300"
              style={{ width: `${waterPercent}%` }}
            />
          </div>

          {/* Quick buttons */}
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => addWater(250)}
              onMouseEnter={() => sfx.playHover()}
              className="px-2.5 py-1 rounded bg-cyan-950/60 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 text-[10px] font-bold active:scale-95 transition-all"
            >
              +250ml Glass
            </button>
            <button
              onClick={() => addWater(500)}
              onMouseEnter={() => sfx.playHover()}
              className="px-2.5 py-1 rounded bg-cyan-950/60 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 text-[10px] font-bold active:scale-95 transition-all"
            >
              +500ml Shaker
            </button>
            <button
              onClick={() => setWaterMl(0)}
              onMouseEnter={() => sfx.playHover()}
              className="p-1 rounded bg-slate-900 border border-white/10 hover:border-white/30 text-gray-400 text-[10px] active:scale-95 transition-all ml-auto"
              title="Reset"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Creatine Saturation Switch */}
        <div className="md:col-span-5 p-3 rounded-lg bg-purple-950/30 border border-purple-500/40 flex flex-col justify-between gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-[11px] font-bold text-purple-200">5g CREATINE MONOHYDRATE</span>
            </div>
            <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
              creatineTaken ? 'bg-purple-500 text-black' : 'bg-gray-800 text-gray-400'
            }`}>
              {creatineTaken ? 'SATURATED' : 'DEPLETED'}
            </span>
          </div>

          <p className="text-[10px] text-gray-300 leading-tight">
            Maintains 100% intramuscular phosphocreatine stores for explosive 1RM lifts.
          </p>

          <button
            onClick={toggleCreatine}
            onMouseEnter={() => sfx.playHover()}
            className={`w-full py-1.5 rounded text-xs font-bold uppercase transition-all active:scale-95 border flex items-center justify-center gap-1.5 ${
              creatineTaken
                ? 'bg-purple-600/40 border-purple-400 text-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                : 'bg-black/50 border-white/20 text-gray-400 hover:border-purple-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            {creatineTaken ? '[ 5g CREAPURE CONSUMED ]' : '[ LOG 5g CREATINE ]'}
          </button>
        </div>
      </div>
    </div>
  );
}
