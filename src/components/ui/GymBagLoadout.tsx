'use client';

import React, { useState } from 'react';
import { sfx } from '@/lib/audio-sfx';
import { Shield, Sparkles, Check, Package, Award } from 'lucide-react';
import { spawnCombatNumber } from '@/components/effects/FloatingDamageNumbers';

interface GearItem {
  id: string;
  name: string;
  role: string;
  spec: string;
  equipped: boolean;
}

export function GymBagLoadout() {
  const [gear, setGear] = useState<GearItem[]>([
    { id: 'belt', name: '10mm Steel Lever Powerlifting Belt', role: 'Valsalva Intra-Abdominal Rigidity', spec: '+15% Core Spine Protection', equipped: true },
    { id: 'sleeves', name: '7mm Stiff Neoprene Knee Sleeves', role: 'Patellar Warmth & Synovial Bounce', spec: 'Prevents knee shear at bottom ATG', equipped: true },
    { id: 'straps', name: 'Heavy-Duty Figure-8 Lifting Straps', role: 'Zero Grip Fatigue on Heavy Pulls', spec: 'Transfers 100% load into lat fibers', equipped: false },
    { id: 'chalk', name: 'Antibacterial Liquid Grip Chalk', role: 'Friction Anchor on Knurled Steel', spec: 'Eliminates sweaty palm slippage', equipped: true },
    { id: 'shoes', name: 'Zero-Drop Flat Sole Lifting Shoes', role: 'Direct Kinetic Ground Force Transfer', spec: 'No spongy foam heel compression', equipped: false },
  ]);

  const toggleGear = (id: string, name: string) => {
    setGear(prev =>
      prev.map(g => {
        if (g.id === id) {
          const next = !g.equipped;
          if (next) {
            sfx.playStatPointAlloc();
            spawnCombatNumber(`EQUIPPED: ${name}!`, undefined, undefined, 'stat');
          } else {
            sfx.playClick();
          }
          return { ...g, equipped: next };
        }
        return g;
      })
    );
  };

  const equippedCount = gear.filter(g => g.equipped).length;

  return (
    <div className="w-full bg-[#080712] border border-cyan-500/40 rounded-2xl p-5 sm:p-7 shadow-[0_0_35px_rgba(0,240,255,0.15)] relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-cyan-400" />
            <h3 className="font-orbitron font-bold text-base sm:text-lg text-white uppercase tracking-wider">
              DUNGEON ARMORY // HUNTER EDC GEAR LOADOUT
            </h3>
          </div>
          <p className="font-mono text-xs text-gray-400 mt-1">
            Never walk into the dungeon under-equipped. Essential armor pieces to maximize progressive overload safely.
          </p>
        </div>
        <div className="px-3 py-1.5 rounded-lg bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold flex items-center gap-2">
          <Award className="w-4 h-4 text-cyan-400" />
          <span>ARMOR RATING: {equippedCount} / 5 PIECES</span>
        </div>
      </div>

      {/* Gear Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {gear.map(g => (
          <div
            key={g.id}
            onClick={() => toggleGear(g.id, g.name)}
            className={`p-3.5 rounded-xl border cursor-pointer flex flex-col justify-between transition-all ${
              g.equipped
                ? 'bg-cyan-950/30 border-cyan-500/50 text-white shadow-[0_0_12px_rgba(0,240,255,0.15)]'
                : 'bg-black/40 border-white/10 text-gray-400 opacity-60 hover:opacity-100 hover:border-white/20'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-heading font-bold text-xs sm:text-sm text-white">{g.name}</span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                  g.equipped ? 'bg-cyan-500 text-black shadow-[0_0_8px_#00f0ff]' : 'bg-white/10 text-gray-400'
                }`}>
                  {g.equipped ? 'EQUIPPED' : 'STASHED'}
                </span>
              </div>
              <div className="font-mono text-[10px] text-cyan-400 mb-1">{g.role}</div>
              <p className="font-sans text-xs text-gray-400 leading-snug">{g.spec}</p>
            </div>

            <div className="pt-2.5 mt-2 border-t border-white/5 font-mono text-[10px] text-gray-500 text-right">
              {g.equipped ? '✓ ACTIVE IN LOADOUT' : 'TAP TO EQUIP'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
