'use client';

import React, { useState } from 'react';
import { sfx } from '@/lib/audio-sfx';
import { Radio, Volume2, Sparkles, Sliders, Play, Square } from 'lucide-react';
import { spawnCombatNumber } from '@/components/effects/FloatingDamageNumbers';

export function AnimeGymSynthEngine() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeBpm, setActiveBpm] = useState<120 | 140 | 70>(120);

  const presets = [
    { bpm: 120, label: '120 BPM: DUNGEON PULSE', desc: 'Standard compound lifting rhythm. Steady motor recruitment.', color: 'text-cyan-400 border-cyan-500/40' },
    { bpm: 140, label: '140 BPM: BERSERK OVERDRIVE', desc: 'Accelerated pulse for heavy 1RM PR singles and drop sets.', color: 'text-red-400 border-red-500/40' },
    { bpm: 70, label: '70 BPM: SANCTUARY RECOVERY', desc: 'Downregulated binaural drone for post-workout stretching.', color: 'text-purple-400 border-purple-500/40' },
  ];

  const toggleSynth = () => {
    sfx.playMenuOpen();
    if (isPlaying) {
      sfx.stopAmbientDrone();
      setIsPlaying(false);
    } else {
      sfx.playAmbientDrone();
      setIsPlaying(true);
      spawnCombatNumber('AUDIO PULSE ENGAGED: 120 BPM', undefined, undefined, 'mana');
    }
  };

  const switchPreset = (bpm: 120 | 140 | 70, label: string) => {
    sfx.playStatPointAlloc();
    setActiveBpm(bpm);
    if (!isPlaying) {
      sfx.playAmbientDrone();
      setIsPlaying(true);
    }
    spawnCombatNumber(`SWITCHED FREQ: ${label}`, undefined, undefined, 'stat');
  };

  return (
    <div className="w-full bg-[#080712] border border-cyan-500/40 rounded-2xl p-5 sm:p-7 shadow-[0_0_35px_rgba(0,240,255,0.15)] relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-cyan-400" />
            <h3 className="font-orbitron font-bold text-base sm:text-lg text-white uppercase tracking-wider">
              SYNTHWAVE CORE // PROCEDURAL AUDIO ENGINE
            </h3>
          </div>
          <p className="font-mono text-xs text-gray-400 mt-1">
            Real-time Web Audio API dual-oscillator synthesizer generating rhythmic anime lifting pulses.
          </p>
        </div>

        <button
          onClick={toggleSynth}
          className={`px-4 py-2 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all ${
            isPlaying
              ? 'bg-cyan-500 text-black shadow-[0_0_20px_rgba(0,240,255,0.7)] animate-pulse'
              : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
          }`}
        >
          {isPlaying ? <Square className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          <span>{isPlaying ? 'PAUSE PULSE' : 'ENGAGE PULSE'}</span>
        </button>
      </div>

      {/* Preset Selectors */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-3">
        {presets.map((p) => {
          const isSelected = activeBpm === p.bpm && isPlaying;
          return (
            <div
              key={p.bpm}
              onClick={() => switchPreset(p.bpm as 120 | 140 | 70, p.label)}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-cyan-950/40 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                  : 'bg-black/40 border-white/10 text-gray-400 hover:text-white hover:border-white/20'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-orbitron font-bold text-xs text-white">{p.label}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
                    isSelected ? 'bg-cyan-500 text-black' : 'bg-white/10 text-gray-400'
                  }`}>
                    {isSelected ? 'ACTIVE' : 'SELECT'}
                  </span>
                </div>
                <p className="font-sans text-xs text-gray-400 leading-relaxed">
                  {p.desc}
                </p>
              </div>
              <div className="pt-2 mt-2 border-t border-white/5 font-mono text-[10px] text-cyan-400 flex items-center justify-between">
                <span>SUB-BASS 43.65Hz (F1)</span>
                <span>ZERO ADS // PROCEDURAL</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
