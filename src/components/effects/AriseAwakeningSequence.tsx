'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sfx } from '@/lib/audio-sfx';
import { Crown, Sparkles, X, Swords, Shield, Zap } from 'lucide-react';

interface AriseAwakeningSequenceProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AriseAwakeningSequence({ isOpen, onClose }: AriseAwakeningSequenceProps) {
  const [stage, setStage] = useState<'shatter' | 'monarch' | 'army'>('shatter');

  useEffect(() => {
    if (isOpen) {
      setStage('shatter');
      sfx.playDemonRoar();

      const t1 = setTimeout(() => {
        setStage('monarch');
        sfx.playRankUp();
      }, 1200);

      const t2 = setTimeout(() => {
        setStage('army');
        sfx.playSubBassBoom();
      }, 2600);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [isOpen]);

  const marshals = [
    { name: 'IGRIS', title: 'BLOOD-RED COMMANDER', buff: '+25% SQUAT DEPTH & SPEED', color: 'text-red-400 border-red-500/50' },
    { name: 'IRON', title: 'SHIELD VANGUARD', buff: '+40KG BENCH STABILIZATION', color: 'text-cyan-400 border-cyan-500/50' },
    { name: 'TANK', title: 'ICE BEAR ALPHA', buff: '+50% CORE RECOVERY BUFFER', color: 'text-blue-400 border-blue-500/50' },
    { name: 'BERU', title: 'ANT MARSHAL', buff: '+100% HYPERTROPHY OVERDRIVE', color: 'text-purple-400 border-purple-500/50' },
    { name: 'BELLION', title: 'GRAND MARSHAL', buff: 'SOVEREIGN SYSTEM MASTERY', color: 'text-amber-400 border-amber-500/50' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black/95">
          {/* Animated Background Mana Storm */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.25)_0%,transparent_70%)] animate-pulse" />

          {/* Close Icon */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-black/60 border border-white/20 text-white hover:border-cyan-400 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Central Cutscene Stages */}
          <div className="relative z-10 w-full max-w-4xl px-6 flex flex-col items-center text-center">
            {stage === 'shatter' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: [0.5, 1.2, 1] }}
                exit={{ opacity: 0, scale: 1.5 }}
                transition={{ duration: 0.8 }}
                className="space-y-4"
              >
                <div className="text-cyan-400 font-mono text-sm tracking-widest animate-pulse">
                  [ DIMENSIONAL SEAL SHATTERED ]
                </div>
                <h1 className="font-orbitron text-4xl sm:text-7xl font-black text-white tracking-widest drop-shadow-[0_0_40px_rgba(0,240,255,0.8)]">
                  SHADOW EXTRACTION
                </h1>
                <p className="font-mono text-sm text-gray-400">
                  REACHING INTO THE SHADOW VOID...
                </p>
              </motion.div>
            )}

            {stage === 'monarch' && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <Crown className="w-16 h-16 text-amber-400 mx-auto animate-bounce drop-shadow-[0_0_30px_#f59e0b]" />
                <div className="font-mono text-xs text-amber-300 font-bold tracking-widest uppercase">
                  SOVEREIGN COMMANDMENT INITIATED
                </div>
                <div className="font-cinzel text-5xl sm:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-300 to-amber-300 tracking-wider">
                  &ldquo;일어나라&rdquo;
                </div>
                <div className="font-orbitron text-2xl sm:text-4xl text-white font-extrabold tracking-widest uppercase">
                  ARISE.
                </div>
              </motion.div>
            )}

            {stage === 'army' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full space-y-6"
              >
                <div className="space-y-1">
                  <div className="font-mono text-xs text-cyan-400 tracking-widest uppercase">
                    [ SHADOW ARMY EMBEDDED INTO YOUR MUSCLE FIBERS ]
                  </div>
                  <h2 className="font-orbitron text-2xl sm:text-3xl font-bold text-white tracking-wider">
                    5 SHADOW MARSHALS UNLOCKED
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
                  {marshals.map((m) => (
                    <div
                      key={m.name}
                      className={`p-3.5 rounded-xl bg-black/80 border ${m.color} backdrop-blur-md text-left space-y-1 shadow-[0_0_20px_rgba(0,0,0,0.8)]`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-orbitron font-bold text-sm text-white">{m.name}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-white">MARSHAL</span>
                      </div>
                      <div className="font-mono text-[10px] text-gray-400">{m.title}</div>
                      <div className="font-mono text-xs text-cyan-300 font-bold pt-1">{m.buff}</div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={() => {
                      sfx.playWhoosh();
                      onClose();
                      const waitlist = document.getElementById('waitlist-form');
                      if (waitlist) waitlist.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-black font-orbitron font-bold text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(0,240,255,0.5)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    SEAL MONARCH PACT (JOIN WAITLIST)
                  </button>
                  <button
                    onClick={onClose}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/5 border border-white/20 text-gray-300 font-mono text-xs uppercase hover:bg-white/10 transition-colors"
                  >
                    CONTINUE EXPLORING
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
