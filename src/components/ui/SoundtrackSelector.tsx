'use client';

import React, { useState } from 'react';
import { sfx } from '@/lib/audio-sfx';
import { Music, Radio, Volume2, Sparkles, Check } from 'lucide-react';
import { spawnCombatNumber } from '@/components/effects/FloatingDamageNumbers';

export interface SoundProfile {
  id: string;
  name: string;
  bpm: string;
  genre: string;
  vibe: string;
}

const PROFILES: SoundProfile[] = [
  {
    id: 'dark-aria',
    name: 'DARK ARIA (SOLO LEVELING THEME)',
    bpm: '110 BPM',
    genre: 'Cinematic Orchestral',
    vibe: 'Gothic cathedral choir, booming sub-bass, awakened monarch aura.',
  },
  {
    id: 'gigachad-phonk',
    name: 'ANIME DRIFT PHONK PR ENGINE',
    bpm: '138 BPM',
    genre: 'Aggressive Phonk',
    vibe: '808 cowbell slides, relentless drive, designed for 1RM deadlift attempts.',
  },
  {
    id: 'synth-pulse',
    name: 'CYBERPUNK MANA MATRIX',
    bpm: '124 BPM',
    genre: 'Procedural Synthwave',
    vibe: 'Analog saw waves, arpeggiated filter sweeps, steady rep cadence.',
  },
  {
    id: 'binaural-alpha',
    name: '432Hz CELLULAR RECOVERY WAVE',
    bpm: '60 BPM',
    genre: 'Hormonal Ambient',
    vibe: 'Deep theta brainwave entrainment, lowers cortisol, primes sleep recovery.',
  },
];

export function SoundtrackSelector() {
  const [activeProfile, setActiveProfile] = useState<string>('dark-aria');
  const [isOpen, setIsOpen] = useState(false);

  const selectProfile = (p: SoundProfile) => {
    sfx.playMenuOpen();
    setActiveProfile(p.id);
    sfx.playLevelUp();
    spawnCombatNumber(`AUDIO: ${p.name.split(' ')[0]}`, undefined, undefined, 'mana');
    setIsOpen(false);
  };

  const current = PROFILES.find(p => p.id === activeProfile) || PROFILES[0];

  return (
    <div className="relative font-mono">
      {/* Trigger Button in Header */}
      <button
        onClick={() => {
          sfx.playClick();
          setIsOpen(prev => !prev);
        }}
        onMouseEnter={() => sfx.playHover()}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-black/60 border border-purple-500/40 hover:border-purple-400 text-purple-300 text-[11px] font-bold transition-all active:scale-95 shadow-[0_0_12px_rgba(168,85,247,0.2)]"
        title="Switch Anime Gym Soundtrack"
      >
        <Radio className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
        <span className="hidden lg:inline truncate max-w-[120px]">{current.bpm}</span>
        <span className="hidden xl:inline text-system-muted">SOUND</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 p-3 rounded-xl bg-slate-950/95 border border-purple-500/50 backdrop-blur-xl shadow-[0_0_30px_rgba(168,85,247,0.35)] z-50 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-purple-500/20 pb-2 mb-2">
              <div className="flex items-center gap-1.5">
                <Music className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-purple-200">
                  TACTICAL AUDIO PROFILE
                </span>
              </div>
              <span className="text-[9px] text-system-muted">WEBAUDIO FX</span>
            </div>

            <div className="space-y-1.5">
              {PROFILES.map((p) => {
                const isSelected = p.id === activeProfile;
                return (
                  <button
                    key={p.id}
                    onClick={() => selectProfile(p)}
                    onMouseEnter={() => sfx.playHover()}
                    className={`w-full p-2.5 rounded-lg text-left transition-all border ${
                      isSelected
                        ? 'bg-purple-950/60 border-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                        : 'bg-black/50 border-white/10 text-gray-400 hover:border-purple-500/40 hover:bg-black/80'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-100 flex items-center gap-1.5">
                        {p.name}
                      </span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-purple-400 shrink-0" />}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-purple-950 text-purple-300 font-bold">
                        {p.bpm}
                      </span>
                      <span className="text-[10px] text-system-muted">{p.genre}</span>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1 leading-snug">
                      {p.vibe}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
