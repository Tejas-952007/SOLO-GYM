'use client';

import React, { useState, useMemo } from 'react';
import { sfx } from '@/lib/audio-sfx';
import { Beaker, Sparkles, Clock, ShieldCheck, Plus, Check } from 'lucide-react';
import { spawnCombatNumber } from '@/components/effects/FloatingDamageNumbers';

export function ManaBrewFormulator() {
  const [caffeineMg, setCaffeineMg] = useState(150);
  const [takeTimeHour, setTakeTimeHour] = useState(17); // 5 PM
  const [selectedIngredients, setSelectedIngredients] = useState<Record<string, boolean>>({
    citrulline: true,
    betaAlanine: true,
    salt: true,
    tyrosine: false,
  });

  const ingredients = [
    { id: 'citrulline', name: 'L-Citrulline Malate 2:1', dose: '6,000mg', benefit: '+35% Vasodilation & Nitric Oxide Pump' },
    { id: 'betaAlanine', name: 'Beta-Alanine', dose: '3,200mg', benefit: 'Carnosine buffering against lactic burn' },
    { id: 'salt', name: 'Himalayan Pink Rock Salt', dose: '500mg', benefit: 'Sodium pump cell volumization & electrolyte drive' },
    { id: 'tyrosine', name: 'L-Tyrosine', dose: '1,000mg', benefit: 'Dopamine synthesis & tunnel-vision laser focus' },
  ];

  const toggleIng = (id: string, name: string) => {
    setSelectedIngredients(prev => {
      const next = !prev[id];
      if (next) {
        sfx.playStatPointAlloc();
        spawnCombatNumber(`ADDED: ${name}`, undefined, undefined, 'mana');
      } else {
        sfx.playClick();
      }
      return { ...prev, [id]: next };
    });
  };

  // Caffeine 5-hour half-life estimation at bedtime (11 PM)
  const bedTimeHour = 23;
  const hoursUntilBed = Math.max(0, bedTimeHour - takeTimeHour);
  const remainingAtBedtime = Math.round(caffeineMg * Math.pow(0.5, hoursUntilBed / 5));

  return (
    <div className="w-full bg-[#080712] border border-cyan-500/40 rounded-2xl p-5 sm:p-7 shadow-[0_0_35px_rgba(0,240,255,0.15)] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Beaker className="w-5 h-5 text-cyan-400" />
            <h3 className="font-orbitron font-bold text-base sm:text-lg text-white uppercase tracking-wider">
              MANA BREW ALCHEMY // PRE-WORKOUT FORMULATOR
            </h3>
          </div>
          <p className="font-mono text-xs text-gray-400 mt-1">
            Engineered pump ergonomics. Clean nitric oxide boosters without dangerous crash doses.
          </p>
        </div>
        <div className="px-3 py-1.5 rounded-lg bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold flex items-center gap-2">
          <Clock className="w-4 h-4 text-cyan-400" />
          <span>BEDTIME CAFFEINE: {remainingAtBedtime}mg</span>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Caffeine Sliders & Time (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div>
            <div className="flex justify-between font-mono text-xs text-gray-300 mb-1">
              <span className="text-cyan-400 font-bold uppercase">ANHYDROUS CAFFEINE DOSAGE</span>
              <span className="font-bold text-white">{caffeineMg} MG (ERGO SWEET SPOT)</span>
            </div>
            <input
              type="range"
              min="50"
              max="350"
              step="25"
              value={caffeineMg}
              onChange={e => {
                sfx.playHover();
                setCaffeineMg(Number(e.target.value));
              }}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <div className="flex justify-between font-mono text-[10px] text-gray-500 mt-1">
              <span>50mg (Mild Focus)</span>
              <span>150mg (Optimal Hunter Spike)</span>
              <span>350mg (Overdrive / Crash Risk)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between font-mono text-xs text-gray-300 mb-1">
              <span className="text-amber-400 font-bold uppercase">CONSUMPTION TIMING</span>
              <span className="font-bold text-white">{takeTimeHour}:00 ({takeTimeHour > 12 ? takeTimeHour - 12 : takeTimeHour} PM)</span>
            </div>
            <input
              type="range"
              min="14"
              max="21"
              step="1"
              value={takeTimeHour}
              onChange={e => {
                sfx.playHover();
                setTakeTimeHour(Number(e.target.value));
              }}
              className="w-full accent-amber-400 cursor-pointer"
            />
            <div className="flex justify-between font-mono text-[10px] text-gray-500 mt-1">
              <span>2:00 PM (Zero Sleep Impact)</span>
              <span>5:00 PM (Standard)</span>
              <span>9:00 PM (Sleep Destroyer)</span>
            </div>
          </div>

          {/* Active Synergies Grid */}
          <div className="space-y-2 pt-2 border-t border-white/10">
            <div className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">
              [ ADD CLINICALLY-DOSED SYNERGIES ]
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {ingredients.map(ing => {
                const isActive = selectedIngredients[ing.id];
                return (
                  <div
                    key={ing.id}
                    onClick={() => toggleIng(ing.id, ing.name)}
                    className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                      isActive
                        ? 'bg-cyan-950/40 border-cyan-400 text-white shadow-[0_0_12px_rgba(0,240,255,0.2)]'
                        : 'bg-black/40 border-white/5 text-gray-400 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-heading font-bold text-xs">{ing.name}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-cyan-300">
                        {ing.dose}
                      </span>
                    </div>
                    <div className="text-[10px] text-gray-400 font-sans mt-0.5">{ing.benefit}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Safety & Sleep Impact Assessment (5 Cols) */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-black/85 border border-cyan-500/30 space-y-3 font-mono text-xs">
          <div className="text-cyan-400 font-bold uppercase pb-2 border-b border-white/10 flex items-center justify-between">
            <span>[ SYSTEM SAFETY VERDICT ]</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-gray-300">
              <span>Bedtime Residual:</span>
              <strong className={remainingAtBedtime <= 40 ? 'text-emerald-400' : 'text-amber-400'}>
                {remainingAtBedtime}mg {remainingAtBedtime <= 40 ? '(SAFE)' : '(HIGH CORTISOL RISK)'}
              </strong>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Nitric Oxide Pump Score:</span>
              <strong className="text-cyan-300">
                {selectedIngredients.citrulline ? '10/10 MAX VASODILATION' : '5/10 BASELINE'}
              </strong>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Muscle Paresthesia Tingles:</span>
              <strong className="text-amber-300">
                {selectedIngredients.betaAlanine ? 'ACTIVE (Beta-Alanine)' : 'NONE'}
              </strong>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-black/60 border border-white/10 text-[11px] text-gray-400 leading-relaxed">
            {remainingAtBedtime <= 40
              ? '✓ Clean alchemy profile. You will experience zero midnight insomnia or tachycardia.'
              : '⚠ High caffeine near bedtime will disrupt stage-4 deep sleep. Shift workout earlier or lower dose.'}
          </div>
        </div>
      </div>
    </div>
  );
}
