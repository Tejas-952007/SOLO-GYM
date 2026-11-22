'use client';

import React, { useState, useEffect, useRef } from 'react';
import { sfx } from '@/lib/audio-sfx';
import { Timer, Play, Pause, RotateCcw, Wind, Sparkles } from 'lucide-react';
import { spawnCombatNumber } from '@/components/effects/FloatingDamageNumbers';

export function RestTimerMetronome() {
  const [targetSeconds, setTargetSeconds] = useState(180); // 3 mins default
  const [remaining, setRemaining] = useState(180);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsRunning(false);
            sfx.playDungeonAlarm();
            spawnCombatNumber('REST PERIOD COMPLETE! BARBELL READY', undefined, undefined, 'mana');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  const selectPreset = (secs: number, label: string) => {
    sfx.playClick();
    setIsRunning(false);
    setTargetSeconds(secs);
    setRemaining(secs);
  };

  const toggleTimer = () => {
    sfx.playMenuOpen();
    setIsRunning(prev => !prev);
  };

  const resetTimer = () => {
    sfx.playClick();
    setIsRunning(false);
    setRemaining(targetSeconds);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPct = ((targetSeconds - remaining) / targetSeconds) * 100;

  return (
    <div className="w-full bg-[#080712] border border-cyan-500/40 rounded-2xl p-5 sm:p-7 shadow-[0_0_35px_rgba(0,240,255,0.15)] relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Timer className="w-5 h-5 text-cyan-400" />
            <h3 className="font-orbitron font-bold text-base sm:text-lg text-white uppercase tracking-wider">
              INTRA-SET CHRONOMETER // RECOVERY METRONOME
            </h3>
          </div>
          <p className="font-mono text-xs text-gray-400 mt-1">
            ATP resynthesis takes 2.5 to 3 minutes between heavy sets. Never rush compounds with premature exhaustion.
          </p>
        </div>

        {/* Presets */}
        <div className="flex items-center gap-2 font-mono text-[10px]">
          <button
            onClick={() => selectPreset(90, '90s Hypertrophy')}
            className={`px-2.5 py-1 rounded transition-all cursor-pointer ${
              targetSeconds === 90 ? 'bg-cyan-500 text-black font-bold' : 'bg-white/5 text-gray-400'
            }`}
          >
            90s ISOLATION
          </button>
          <button
            onClick={() => selectPreset(180, '3m Compound')}
            className={`px-2.5 py-1 rounded transition-all cursor-pointer ${
              targetSeconds === 180 ? 'bg-cyan-500 text-black font-bold' : 'bg-white/5 text-gray-400'
            }`}
          >
            3m COMPOUND
          </button>
          <button
            onClick={() => selectPreset(300, '5m Heavy PR')}
            className={`px-2.5 py-1 rounded transition-all cursor-pointer ${
              targetSeconds === 300 ? 'bg-cyan-500 text-black font-bold' : 'bg-white/5 text-gray-400'
            }`}
          >
            5m MAX PR
          </button>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Countdown Ring & Digital Display (6 Cols) */}
        <div className="lg:col-span-6 flex items-center justify-center gap-6">
          <div className="font-orbitron text-5xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-white tracking-wider">
            {formatTime(remaining)}
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={toggleTimer}
              className="p-3 rounded-xl bg-cyan-500 hover:bg-white text-black transition-all cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.4)]"
            >
              {isRunning ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
            </button>
            <button
              onClick={resetTimer}
              className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 transition-all cursor-pointer"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Parasympathetic Box Breathing Guide (6 Cols) */}
        <div className="lg:col-span-6 p-4 rounded-xl bg-black/80 border border-cyan-500/30 font-mono text-xs space-y-2">
          <div className="flex items-center gap-2 text-cyan-400 font-bold uppercase pb-1 border-b border-white/10">
            <Wind className="w-4 h-4" />
            <span>BOX BREATHING PACER DURING REST</span>
          </div>
          <p className="font-sans text-xs text-gray-300 leading-relaxed">
            Inhale 4s through nose &rarr; Hold 4s &rarr; Slow exhale 4s &rarr; Hold empty 4s.
            This activates your vagus nerve to rapidly drop pulse rate before your next heavy working set.
          </p>
          <div className="flex justify-between text-[10px] text-gray-500 pt-1 border-t border-white/5">
            <span>ATP RESYNTHESIS: {progressPct >= 90 ? '100% COMPLETE' : `${Math.round(progressPct)}% RESTORED`}</span>
            <span className="text-cyan-400 font-bold">READY TO SMASH PR</span>
          </div>
        </div>
      </div>
    </div>
  );
}
