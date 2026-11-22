'use client';

import React, { useState, useMemo } from 'react';
import { sfx } from '@/lib/audio-sfx';
import { Moon, Sparkles, BatteryCharging, ShieldAlert, Check } from 'lucide-react';
import { spawnCombatNumber } from '@/components/effects/FloatingDamageNumbers';

export function RecoverySleepChamber() {
  const [sleepHours, setSleepHours] = useState(7.5);
  const [protocols, setProtocols] = useState<Record<string, boolean>>({
    blueLight: true,
    magnesium: false,
    coolRoom: true,
    zeroScroll: true,
  });

  const protocolList = [
    { id: 'blueLight', name: 'Blue Light Blocked 1hr Prior', boost: '+15% REM Phase', desc: 'Melatonin secretion uninhibited' },
    { id: 'magnesium', name: 'Magnesium Glycinate / Ashwagandha', boost: '+20% Deep Sleep', desc: 'Nervous system parasympathetic switch' },
    { id: 'coolRoom', name: 'Ambient Temp < 22°C / Ventilation', boost: '+10% GH Surge', desc: 'Thermoregulation triggers sleep depth' },
    { id: 'zeroScroll', name: 'No Bed Doomscrolling', boost: '+25% Cortisol Drop', desc: 'Eliminates dopamine micro-spikes' },
  ];

  const toggleProtocol = (id: string, name: string) => {
    setProtocols(prev => {
      const next = !prev[id];
      if (next) {
        sfx.playStatPointAlloc();
        spawnCombatNumber(`PROTOCOL LOCKED: ${name}`, undefined, undefined, 'stat');
      } else {
        sfx.playClick();
      }
      return { ...prev, [id]: next };
    });
  };

  const recoveryScore = useMemo(() => {
    let score = (sleepHours / 9) * 60;
    Object.values(protocols).forEach(val => {
      if (val) score += 10;
    });
    return Math.min(100, Math.round(score));
  }, [sleepHours, protocols]);

  return (
    <div className="w-full bg-[#080712] border border-blue-500/40 rounded-2xl p-5 sm:p-7 shadow-[0_0_35px_rgba(59,130,246,0.15)] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Moon className="w-5 h-5 text-blue-400" />
            <h3 className="font-orbitron font-bold text-base sm:text-lg text-white uppercase tracking-wider">
              BIO-TANK TELEMETRY // CELLULAR SLEEP RECOVERY
            </h3>
          </div>
          <p className="font-mono text-xs text-gray-400 mt-1">
            Muscle does not grow in the gym. It is torn in the dungeon and rebuilt during stage-4 deep sleep.
          </p>
        </div>
        <div className="px-3 py-1.5 rounded-lg bg-blue-950/60 border border-blue-500/40 text-blue-300 font-mono text-xs font-bold flex items-center gap-2">
          <BatteryCharging className="w-4 h-4 text-cyan-400" />
          <span>RECHARGE EFFICIENCY: {recoveryScore}%</span>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Sleep Slider & Protocols (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Sleep Hours Slider */}
          <div>
            <div className="flex justify-between font-mono text-xs text-gray-300 mb-1.5">
              <span className="text-blue-400 font-bold uppercase">DAILY SLEEP RESTORATION</span>
              <span className="font-bold text-white">{sleepHours} HOURS / NIGHT</span>
            </div>
            <input
              type="range"
              min="4"
              max="10"
              step="0.5"
              value={sleepHours}
              onChange={e => {
                sfx.playHover();
                setSleepHours(Number(e.target.value));
              }}
              className="w-full accent-blue-400 cursor-pointer"
            />
            <div className="flex justify-between font-mono text-[10px] text-gray-500 mt-1">
              <span>4h (Severe Catabolism)</span>
              <span>7.5h (Optimal MPS)</span>
              <span>10h (Full Recovery)</span>
            </div>
          </div>

          {/* Protocols List */}
          <div className="space-y-2">
            <div className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">
              [ SANCTUARY HYGIENE PROTOCOLS ]
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {protocolList.map(proto => {
                const isActive = protocols[proto.id];
                return (
                  <div
                    key={proto.id}
                    onClick={() => toggleProtocol(proto.id, proto.name)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      isActive
                        ? 'bg-blue-950/40 border-blue-400 text-white shadow-[0_0_12px_rgba(59,130,246,0.3)]'
                        : 'bg-black/40 border-white/5 text-gray-400 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-heading font-bold text-xs">{proto.name}</span>
                      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                        isActive ? 'bg-blue-500/20 text-blue-300 font-bold' : 'bg-white/5 text-gray-500'
                      }`}>
                        {proto.boost}
                      </span>
                    </div>
                    <div className="text-[10px] text-gray-400 font-sans leading-tight">
                      {proto.desc}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Dynamic Growth Hormone Gauge (5 Cols) */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-black/80 border border-blue-500/30 space-y-4">
          <div className="font-mono text-xs text-blue-300 font-bold uppercase tracking-wider pb-2 border-b border-white/10 flex items-center justify-between">
            <span>[ SYSTEM RECOVERY STATUS ]</span>
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          </div>

          <div>
            <div className="text-[10px] font-mono text-gray-400 uppercase">CELLULAR REPAIR INDEX</div>
            <div className="font-cinzel text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-200 mt-0.5">
              {recoveryScore} / 100
            </div>
            <div className="w-full h-2.5 bg-gray-900 rounded-full mt-2 overflow-hidden border border-blue-500/30">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-300"
                style={{ width: `${recoveryScore}%` }}
              />
            </div>
          </div>

          <div className="space-y-2 font-mono text-xs text-gray-300 pt-1">
            <div className="flex justify-between">
              <span>Hormonal Optimization:</span>
              <strong className={recoveryScore >= 80 ? 'text-emerald-400' : 'text-amber-400'}>
                {recoveryScore >= 80 ? 'PEAK TESTOSTERONE' : 'SUB-OPTIMAL'}
              </strong>
            </div>
            <div className="flex justify-between">
              <span>CNS Recovery Window:</span>
              <strong className="text-white">{sleepHours >= 7 ? 'FULL 24H REPAIR' : 'DEFICIT RISK'}</strong>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-blue-950/40 border border-blue-500/20 text-[11px] font-mono text-blue-200">
            {recoveryScore >= 80
              ? '✓ System vital fluids fully replenished. Ready for Floor 04 Dungeon clearance tomorrow.'
              : '⚠ Insufficient recovery detected. Cortisol will blunt hypertrophy by up to 35%.'}
          </div>
        </div>
      </div>
    </div>
  );
}
