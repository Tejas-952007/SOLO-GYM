'use client';

import React, { useState, useEffect, useRef } from 'react';
import { sfx } from '@/lib/audio-sfx';
import { Activity, Play, Square, Sparkles, CheckCircle2 } from 'lucide-react';
import { spawnCombatNumber } from '@/components/effects/FloatingDamageNumbers';

export function RepVelocityMeter() {
  const [exercise, setExercise] = useState<'PUSHUP' | 'SQUAT' | 'PULLUP'>('PUSHUP');
  const [tempo, setTempo] = useState({ eccentric: 3, pause: 1, concentric: 1 });
  const [isRunning, setIsRunning] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'IDLE' | 'ECCENTRIC (LOWER)' | 'PAUSE (HOLD)' | 'CONCENTRIC (EXPLODE)'>('IDLE');
  const [progress, setProgress] = useState(0);
  const [repCount, setRepCount] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const totalCycleSeconds = tempo.eccentric + tempo.pause + tempo.concentric;

  useEffect(() => {
    if (!isRunning) {
      if (timerRef.current) clearInterval(timerRef.current);
      setCurrentPhase('IDLE');
      setProgress(0);
      return;
    }

    const intervalMs = 50;
    let elapsedMs = 0;

    timerRef.current = setInterval(() => {
      elapsedMs += intervalMs;
      const cycleElapsed = (elapsedMs / 1000) % totalCycleSeconds;
      const currentPct = (cycleElapsed / totalCycleSeconds) * 100;
      setProgress(currentPct);

      if (cycleElapsed < tempo.eccentric) {
        setCurrentPhase('ECCENTRIC (LOWER)');
      } else if (cycleElapsed < tempo.eccentric + tempo.pause) {
        setCurrentPhase('PAUSE (HOLD)');
      } else {
        setCurrentPhase('CONCENTRIC (EXPLODE)');
      }

      // If completing a rep
      if (cycleElapsed < intervalMs / 1000 && elapsedMs > intervalMs) {
        sfx.playStatPointAlloc();
        setRepCount(prev => {
          const next = prev + 1;
          spawnCombatNumber(`REP ${next} CLEARED! +25 XP`, undefined, undefined, 'stat');
          return next;
        });
      }
    }, intervalMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, totalCycleSeconds, tempo]);

  const toggleRun = () => {
    sfx.playMenuOpen();
    setIsRunning(prev => !prev);
  };

  return (
    <div className="w-full bg-[#080712] border border-cyan-500/40 rounded-2xl p-5 sm:p-7 shadow-[0_0_35px_rgba(0,240,255,0.15)] relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            <h3 className="font-orbitron font-bold text-base sm:text-lg text-white uppercase tracking-wider">
              CADENCE METRONOME // TUT VELOCITY SCANNER
            </h3>
          </div>
          <p className="font-mono text-xs text-gray-400 mt-1">
            Time Under Tension (TUT) paces hypertrophy. S-Rank muscle growth requires controlled 3s eccentric descents.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {(['PUSHUP', 'SQUAT', 'PULLUP'] as const).map(ex => (
            <button
              key={ex}
              onClick={() => {
                sfx.playClick();
                setExercise(ex);
                setRepCount(0);
              }}
              className={`px-2.5 py-1 rounded font-mono text-[11px] font-bold transition-all cursor-pointer ${
                exercise === ex
                  ? 'bg-cyan-500 text-black shadow-[0_0_12px_rgba(0,240,255,0.6)]'
                  : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              {ex}
            </button>
          ))}
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Controls & Metronome Visualizer (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Active Phase Banner */}
          <div className="p-4 rounded-xl bg-black/80 border border-cyan-500/30 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                ACTIVE CADENCE PHASE
              </div>
              <div className="font-orbitron text-base sm:text-lg font-black text-cyan-300 mt-0.5">
                {currentPhase}
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-mono text-gray-500 uppercase">REPS COMPLETED</div>
              <div className="font-orbitron text-2xl font-black text-system-gold">{repCount}</div>
            </div>
          </div>

          {/* Dynamic Progress Bar */}
          <div>
            <div className="flex justify-between font-mono text-[10px] text-gray-400 mb-1">
              <span>0s (START)</span>
              <span>3s (ECCENTRIC)</span>
              <span>4s (PAUSE)</span>
              <span>5s (EXPLODE)</span>
            </div>
            <div className="w-full h-3.5 bg-black/90 rounded-full border border-cyan-500/40 p-0.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-amber-400 rounded-full transition-all duration-75 shadow-[0_0_12px_rgba(0,240,255,0.8)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Action Trigger Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleRun}
              className={`px-6 py-3 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all ${
                isRunning
                  ? 'bg-red-500/20 border border-red-500 text-red-300 hover:bg-red-500/30'
                  : 'bg-cyan-500 text-black hover:bg-white shadow-[0_0_20px_rgba(0,240,255,0.4)]'
              }`}
            >
              {isRunning ? (
                <>
                  <Square className="w-4 h-4 fill-current" />
                  <span>HALT METRONOME</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>START CADENCE PACE</span>
                </>
              )}
            </button>
            <span className="font-mono text-xs text-gray-400">
              TEMPO: 3-1-1 • {totalCycleSeconds}s PER REP
            </span>
          </div>
        </div>

        {/* Telemetry Stats Card (5 Cols) */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-black/80 border border-white/10 space-y-3 font-mono">
          <div className="text-xs text-cyan-400 font-bold uppercase pb-2 border-b border-white/10 flex items-center justify-between">
            <span>[ SYSTEM OVERLOAD BUFFER ]</span>
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-gray-300">
              <span>Time Under Tension:</span>
              <strong className="text-white">{repCount * totalCycleSeconds}s</strong>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Hypertrophy Stimulus:</span>
              <strong className="text-emerald-400">{repCount >= 10 ? 'MAXIMAL S-TIER' : 'ACCUMULATING'}</strong>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Mechanical Tension Rating:</span>
              <strong className="text-cyan-300">92% EFFICIENCY</strong>
            </div>
          </div>

          <div className="pt-2 border-t border-white/10 text-[11px] text-gray-400 leading-relaxed">
            Fast uncontrolled reps skip the growth stimulus. By holding the 3s descent, you trigger true S-Rank cellular micro-tears.
          </div>
        </div>
      </div>
    </div>
  );
}
