'use client';

import React, { useState } from 'react';
import { sfx } from '@/lib/audio-sfx';
import { Bot, Volume2, Sparkles, MessageSquare, Terminal } from 'lucide-react';
import { spawnCombatNumber } from '@/components/effects/FloatingDamageNumbers';

interface QueryPreset {
  id: string;
  q: string;
  a: string;
  tag: string;
}

const PRESETS: QueryPreset[] = [
  {
    id: 'soya-digest',
    q: 'How do I digest 100g Soya Chunks daily without bloating?',
    a: 'Boil soya chunks in salted water with 1 pinch of ginger and cumin for 10 minutes. Rinse twice in cold water and squeeze out all excess saponin froth thoroughly. Cook with asafoetida (hing) for 100% smooth digestion.',
    tag: 'DIGESTION ALCHEMY',
  },
  {
    id: 'bench-plateau',
    q: 'Stuck at 100kg Bench Press for 3 weeks. How to break plateau?',
    a: 'Implement a 3-week micro-periodization: Drop working sets to 85kg for 4x6 paused reps with a strict 2-second chest pause. Add heavy dumbbell tricep rollbacks and weighted dips to eliminate lockout failure.',
    tag: '1RM MECHANICS',
  },
  {
    id: 'creatine-sat',
    q: 'Does vegetarian diet require creatine monohydrate loading?',
    a: 'Plant-based lifters hold up to 30% lower baseline intramuscular phosphocreatine. Skip loading phases; take 5g Creapure daily post-workout with 30g fast carbs (banana or fruit juice) for complete cellular saturation in 21 days.',
    tag: 'SUPPLEMENT PROTOCOL',
  },
  {
    id: 'sleep-gh',
    q: 'Can 6 hours sleep build muscle if my protein is high?',
    a: 'Negative. 70% of human growth hormone (GH) pulses during stage-3 slow-wave sleep. 6 hours elevates morning cortisol by 37%, blunting leucine oxidation. Sleep 7.5 to 8 hours or your surplus protein will oxidize into urea.',
    tag: 'ENDOCRINE TELEMETRY',
  },
];

export function GuildCoachTelemetry() {
  const [activePreset, setActivePreset] = useState<QueryPreset>(PRESETS[0]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speakAnswer = (text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 0.95;

    utterance.onstart = () => {
      sfx.playMenuOpen();
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const selectPreset = (preset: QueryPreset) => {
    sfx.playStatPointAlloc();
    setActivePreset(preset);
    spawnCombatNumber(`TELEMETRY LOADED: ${preset.tag}`, undefined, undefined, 'mana');
  };

  return (
    <div className="w-full bg-[#080712] border border-cyan-500/40 rounded-2xl p-5 sm:p-7 shadow-[0_0_35px_rgba(0,240,255,0.15)] relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-cyan-400" />
            <h3 className="font-orbitron font-bold text-base sm:text-lg text-white uppercase tracking-wider">
              GUILD COACH // NEURAL AUDIO TELEMETRY
            </h3>
          </div>
          <p className="font-mono text-xs text-gray-400 mt-1">
            Tap any tactical question below to receive instant audio voice analysis and desi lifting protocols.
          </p>
        </div>
        <button
          onClick={() => speakAnswer(activePreset.a)}
          className={`px-3 py-1.5 rounded-lg border font-mono text-xs font-bold flex items-center gap-2 cursor-pointer transition-all ${
            isSpeaking
              ? 'bg-cyan-500 text-black border-cyan-400 animate-pulse shadow-[0_0_15px_rgba(0,240,255,0.8)]'
              : 'bg-cyan-950/60 border-cyan-500/40 text-cyan-300 hover:bg-cyan-900/40'
          }`}
        >
          <Volume2 className="w-4 h-4" />
          <span>{isSpeaking ? 'TRANSMITTING VOICE...' : 'VOICE BRIEFING'}</span>
        </button>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Preset Questions (5 Cols) */}
        <div className="lg:col-span-5 space-y-2">
          <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest pb-1">
            [ SELECT TACTICAL INQUIRY ]
          </div>
          {PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => selectPreset(p)}
              className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                activePreset.id === p.id
                  ? 'bg-cyan-950/40 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                  : 'bg-black/40 border-white/5 text-gray-400 hover:text-white hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30 font-bold">
                  {p.tag}
                </span>
              </div>
              <div className="font-sans text-xs font-bold leading-snug">{p.q}</div>
            </button>
          ))}
        </div>

        {/* Coach Response Terminal (7 Cols) */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-black/85 border border-cyan-500/30 space-y-4 shadow-system-glow">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-xs">
            <div className="flex items-center gap-2 text-cyan-400 font-bold">
              <Terminal className="w-4 h-4" />
              <span>COACH RESPONSE ARCHIVE</span>
            </div>
            <span className="text-[10px] text-gray-500">LATENCY: 12ms</span>
          </div>

          <div className="space-y-3 font-mono">
            <div className="text-xs text-system-gold font-bold">
              INQUIRY: &quot;{activePreset.q}&quot;
            </div>

            <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-xs sm:text-sm text-gray-200 leading-relaxed font-sans">
              {activePreset.a}
            </div>

            <div className="pt-2 flex items-center justify-between text-[11px] text-gray-400">
              <span>PROTOCOL VERIFIED BY LABDOOR &amp; ACSM</span>
              <button
                onClick={() => speakAnswer(activePreset.a)}
                className="text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Hear Voice Briefing</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
