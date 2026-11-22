'use client';

import React, { useState } from 'react';
import { sfx } from '@/lib/audio-sfx';
import { Award, ShieldCheck, Sparkles, Download, CheckCircle2, Crown, Zap, Flame } from 'lucide-react';
import { spawnCombatNumber } from '@/components/effects/FloatingDamageNumbers';

export function HunterAscensionCertificate() {
  const [hunterName, setHunterName] = useState('SUNG JIN-WOO');
  const [isEditing, setIsEditing] = useState(false);
  const [claimedAura, setClaimedAura] = useState(false);

  const claimMonarchAura = () => {
    sfx.playLevelUp();
    setClaimedAura(true);
    spawnCombatNumber('S-RANK SHADOW MONARCH ASCENDED', undefined, undefined, 'stat');
  };

  const handlePrint = () => {
    sfx.playClick();
    window.print();
  };

  return (
    <div className="relative font-mono w-full max-w-4xl mx-auto my-8">
      {/* Outer Holographic Gold & Violet Frame */}
      <div className="relative p-1 rounded-2xl bg-gradient-to-r from-yellow-500 via-purple-600 to-amber-400 p-[2px] shadow-[0_0_50px_rgba(234,179,8,0.25)]">
        <div className="rounded-2xl bg-[#090812] p-6 sm:p-10 relative overflow-hidden">
          {/* Background Watermark Monarch Seal */}
          <div className="absolute right-[-40px] bottom-[-40px] opacity-10 pointer-events-none">
            <Crown className="w-80 h-80 text-yellow-400" />
          </div>

          {/* Certificate Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between pb-6 mb-6 border-b border-yellow-500/30 gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/40 text-yellow-400 shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                <Crown className="w-8 h-8" />
              </div>
              <div>
                <span className="text-[10px] text-yellow-400 font-bold uppercase tracking-widest block">
                  NATIONAL HUNTER ASSOCIATION // OVERLOAD CODES
                </span>
                <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-white uppercase tracking-wider">
                  S-RANK ASCENSION CREDENTIAL
                </h2>
              </div>
            </div>

            <div className="flex flex-col items-center sm:items-end font-mono">
              <span className="text-[10px] text-system-muted">REGISTRY ID:</span>
              <span className="text-xs font-bold text-yellow-300">#HUNTER-IN-952007</span>
              <span className="text-[9px] px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-400 border border-yellow-500/40 mt-1 font-bold">
                CLASS: SHADOW MONARCH
              </span>
            </div>
          </div>

          {/* Hunter Name & Ruling */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">REGISTERED ATHLETE:</span>
              {isEditing ? (
                <input
                  type="text"
                  value={hunterName}
                  onChange={(e) => setHunterName(e.target.value)}
                  onBlur={() => setIsEditing(false)}
                  autoFocus
                  className="bg-black/80 border border-yellow-400 px-2 py-0.5 rounded text-yellow-300 text-sm font-bold uppercase outline-none"
                />
              ) : (
                <span
                  onClick={() => setIsEditing(true)}
                  className="text-base sm:text-lg font-bold text-yellow-400 border-b border-dashed border-yellow-500/60 cursor-pointer hover:text-white transition-colors"
                  title="Click to personalize your hunter name"
                >
                  {hunterName} [EDIT]
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans italic border-l-2 border-yellow-500/40 pl-4 py-1">
              &quot;By decree of the System and the law of progressive overload: This hunter has conquered the Double Dungeon, consumed 160g daily desi protein macros without fail, logged 52 consecutive progressive weeks, and transcended the limits of mortal physiology.&quot;
            </p>
          </div>

          {/* Verified Stats Triad */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            <div className="p-3.5 rounded-xl bg-black/60 border border-yellow-500/20 text-center">
              <span className="text-[10px] text-system-muted block uppercase">COMPOUND STRENGTH</span>
              <span className="text-lg font-bold text-yellow-300">420 KG TOTAL</span>
              <span className="text-[9px] text-gray-400 block mt-0.5">Squat 140 • Bench 100 • DL 180</span>
            </div>

            <div className="p-3.5 rounded-xl bg-black/60 border border-purple-500/20 text-center">
              <span className="text-[10px] text-system-muted block uppercase">DESI NUTRITION LOCK</span>
              <span className="text-lg font-bold text-purple-300">100% AMINO COMPLIANT</span>
              <span className="text-[9px] text-gray-400 block mt-0.5">Soya • Paneer • Whey • Dal</span>
            </div>

            <div className="p-3.5 rounded-xl bg-black/60 border border-cyan-500/20 text-center">
              <span className="text-[10px] text-system-muted block uppercase">ARMY AUTHORITY</span>
              <span className="text-lg font-bold text-cyan-300">COMMANDER IGRIS</span>
              <span className="text-[9px] text-gray-400 block mt-0.5">50,000 Shadow Soldiers</span>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-yellow-500/20">
            <div className="flex items-center gap-2 text-xs text-yellow-400">
              <ShieldCheck className="w-4 h-4 text-yellow-400" />
              <span>CRYPTOGRAPHICALLY SEALED // DEEP-MIND VERIFIED</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={claimMonarchAura}
                onMouseEnter={() => sfx.playHover()}
                className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all active:scale-95 flex items-center justify-center gap-1.5 border ${
                  claimedAura
                    ? 'bg-yellow-500 text-black border-yellow-400 shadow-[0_0_20px_rgba(234,179,8,0.5)]'
                    : 'bg-purple-950/80 border-purple-500/40 text-purple-200 hover:border-yellow-400 hover:text-yellow-300'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                {claimedAura ? '[ MONARCH AURA IGNITED ]' : '[ CLAIM S-RANK AURA ]'}
              </button>

              <button
                onClick={handlePrint}
                onMouseEnter={() => sfx.playHover()}
                className="px-3.5 py-2 rounded-lg bg-black/70 border border-white/20 hover:border-yellow-400 text-gray-300 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5"
                title="Print or Save Certificate as PDF"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">PRINT</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
