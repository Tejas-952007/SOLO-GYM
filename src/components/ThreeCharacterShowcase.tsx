'use client';

import React, { useState, useRef } from 'react';
import { sfx } from '@/lib/audio-sfx';
import {
  RotateCw,
  Zap,
  Eye,
  Swords,
  Shield,
  Sparkles,
  Maximize2,
  Volume2,
  CheckCircle2,
} from 'lucide-react';
import { spawnCombatNumber } from '@/components/effects/FloatingDamageNumbers';

export interface HunterCharacter {
  id: 'jinwoo' | 'igris' | 'beru' | 'arise_jinwoo';
  name: string;
  title: string;
  koreanName: string;
  rank: 'SHADOW MONARCH' | 'COMMANDER' | 'MARSHAL' | 'SOVEREIGN RITUAL';
  thumbnail: string;
  sketchfabUid: string;
  weaponName: string;
  quote: string;
  buff: string;
  statStr: number;
  statAgi: number;
  statVit: number;
  auraColor: string;
}

const CHARACTERS: HunterCharacter[] = [
  {
    id: 'jinwoo',
    name: 'SUNG JIN-WOO',
    title: 'THE SHADOW MONARCH',
    koreanName: '성진우 // 그림자 군주',
    rank: 'SHADOW MONARCH',
    thumbnail: '/assets/09-arise/jinwoo-stage.png',
    sketchfabUid: 'cbd13bfe2d464cf18ec444cb7adf70e2', // Official Solo Leveling Sung Jin-Woo 3D Model
    weaponName: "DUAL SHADOW DAGGERS [KAMISH'S WRATH & KNIGHT KILLER]",
    quote: '"I am the hunter who conquered death itself. Arise."',
    buff: '+50% COMPOUND 1RM // MAXIMUM AMINO RETENTION',
    statStr: 99,
    statAgi: 99,
    statVit: 98,
    auraColor: '#8b5cf6',
  },
  {
    id: 'arise_jinwoo',
    name: 'JIN-WOO: "ARISE" DOMAIN',
    title: 'SOVEREIGN SHADOW EXTRACTION',
    koreanName: '성진우 // 일어나라',
    rank: 'SOVEREIGN RITUAL',
    thumbnail: '/assets/09-arise/jinwoo-srank-stage.png',
    sketchfabUid: '6e3c5101d50e4fbd84d2981e193092fa', // Sung Jin-Woo Arise Summoning with Shadow Army
    weaponName: 'MONARCH SOUL EXTRACTION AUTHORITY',
    quote: '"From the depths of death, answer my call: Arise."',
    buff: '+100% SHADOW ARMY SYNTHESIS & ZERO FATIGUE',
    statStr: 100,
    statAgi: 100,
    statVit: 100,
    auraColor: '#38bdf8',
  },
  {
    id: 'igris',
    name: 'COMMANDER IGRIS',
    title: 'THE BLOOD-RED KNIGHT',
    koreanName: '핏빛의 기사단장 이그리트',
    rank: 'COMMANDER',
    thumbnail: '/assets/09-arise/igris-stage.png',
    sketchfabUid: 'dbe57ff1971349e597fe900ab3588d4b', // Official Igris in Crimson Spiked Armor with Plume
    weaponName: 'TWO-HANDED DEMONIC BLOOD GREATSWORD',
    quote: '"My blade exists solely to cleave your enemies."',
    buff: '+35% BARBELL SQUAT INTENSITY // ZERO PLATEAU',
    statStr: 94,
    statAgi: 88,
    statVit: 92,
    auraColor: '#ef4444',
  },
  {
    id: 'beru',
    name: 'MARSHAL BERU',
    title: 'THE PREDATOR KING',
    koreanName: '포식자 군단장 베르',
    rank: 'MARSHAL',
    thumbnail: '/assets/09-arise/beru-stage.png',
    sketchfabUid: 'd819c8d0c2e147e98996260b97c56065', // Official Beru in Chitinous Predator Monarch Form
    weaponName: 'TWIN PREDATORY CHITIN SCYTHES',
    quote: '"My king, permit me to feast upon your weakness."',
    buff: '+45g RAPID LEUCINE METABOLISM // REPAIR BURST',
    statStr: 91,
    statAgi: 98,
    statVit: 89,
    auraColor: '#a855f7',
  },
];

export function ThreeCharacterShowcase() {
  const [activeChar, setActiveChar] = useState<HunterCharacter>(CHARACTERS[0]);
  const [isPoweringUp, setIsPoweringUp] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectCharacter = (c: HunterCharacter) => {
    sfx.playBladeSlash();
    setModelLoaded(false);
    setActiveChar(c);
    spawnCombatNumber(`SHADOW AWAKENING: ${c.name}`, undefined, undefined, 'stat');
  };

  const triggerArise = () => {
    if (isPoweringUp) return;
    setIsPoweringUp(true);
    sfx.playDemonRoar();
    spawnCombatNumber('ARISE // DOMAIN EXPANDED', undefined, undefined, 'mana');

    setTimeout(() => {
      setIsPoweringUp(false);
    }, 1200);
  };

  const toggleFullscreen = () => {
    sfx.playClick();
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={`w-full rounded-2xl bg-[#05050A] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.85)] font-mono overflow-hidden transition-all duration-300 ${
        isPoweringUp ? 'ring-2 ring-purple-500 shadow-[0_0_80px_rgba(168,85,247,0.7)]' : ''
      }`}
    >
      {/* Top Header & Tactical Controls */}
      <div className="p-4 sm:p-6 border-b border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-purple-950/25 via-black to-slate-950/25">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className="w-2.5 h-2.5 rounded-full animate-pulse"
              style={{
                backgroundColor: activeChar.auraColor,
                boxShadow: `0 0 10px ${activeChar.auraColor}`,
              }}
            />
            <span className="text-[10px] text-system-muted font-bold tracking-widest uppercase">
              AUTHENTIC 3D SOLO LEVELING CHARACTER ENGINE
            </span>
            <span className="text-[9px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-300">
              {activeChar.koreanName}
            </span>
          </div>
          <h2 className="text-xl sm:text-3xl font-cinzel font-black text-white tracking-wider uppercase drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            {activeChar.name}
          </h2>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={toggleFullscreen}
            onMouseEnter={() => sfx.playHover()}
            title="Inspect in Fullscreen"
            className="px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 hover:border-white/30 text-gray-300 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">FULLSCREEN</span>
          </button>

          <button
            onClick={triggerArise}
            disabled={isPoweringUp}
            onMouseEnter={() => sfx.playHover()}
            className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-[0_0_25px_rgba(168,85,247,0.5)] active:scale-95 transition-all flex items-center gap-2"
          >
            <Zap className="w-4 h-4 text-yellow-300 animate-pulse" />
            <span>ARISE [SUMMON AURA]</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Authentic 3D WebGL Model Viewport */}
        <div className="lg:col-span-8 relative h-[420px] sm:h-[500px] md:h-[580px] bg-black flex items-center justify-center overflow-hidden">
          {/* Real 3D Model Iframe with Transparency & Auto-Orbit */}
          <iframe
            key={activeChar.sketchfabUid}
            title={activeChar.name}
            src={`https://sketchfab.com/models/${activeChar.sketchfabUid}/embed?autostart=1&internal=1&tracking=0&ui_infos=0&ui_watermark=0&ui_hint=0&ui_controls=1&ui_stop=0&transparent=1`}
            onLoad={() => setModelLoaded(true)}
            allow="autoplay; fullscreen; xr-spatial-tracking"
            className="w-full h-full border-0 bg-transparent relative z-10"
          />

          {/* Loading Placeholder */}
          {!modelLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#05050A] z-20 pointer-events-none">
              <span className="w-9 h-9 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-xs text-purple-300 font-bold tracking-widest uppercase">
                INITIALIZING 3D {activeChar.name} MESH & SHADERS...
              </span>
            </div>
          )}

          {/* Active Weapon Indicator */}
          <div className="absolute top-4 left-4 text-[10px] text-purple-300 font-bold bg-black/80 px-3.5 py-1.5 rounded-full border border-purple-500/40 backdrop-blur-md flex items-center gap-1.5 z-30 pointer-events-none">
            <Swords className="w-3.5 h-3.5 text-purple-400" />
            <span>{activeChar.weaponName}</span>
          </div>

          {/* Rank Badge */}
          <div className="absolute top-4 right-4 text-[10px] text-yellow-300 font-bold bg-yellow-950/70 px-3.5 py-1.5 rounded-full border border-yellow-500/40 shadow-[0_0_15px_rgba(234,179,8,0.3)] backdrop-blur-md z-30 pointer-events-none">
            ⭐ {activeChar.rank}
          </div>

          {/* Orbit Navigation Hint */}
          <div className="absolute bottom-4 left-4 text-[10px] text-system-muted flex items-center gap-2 bg-black/80 px-3.5 py-1.5 rounded-full border border-white/10 pointer-events-none backdrop-blur-md z-30">
            <Eye className="w-3.5 h-3.5 text-system-cyan animate-pulse" />
            <span>DRAG WITH MOUSE / FINGER TO ROTATE 3D CHARACTER 360°</span>
          </div>
        </div>

        {/* Character Roster Deck & RPG Stat Terminal */}
        <div className="lg:col-span-4 p-4 sm:p-6 border-t lg:border-t-0 lg:border-l border-white/10 bg-[#07060F]/80 flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] text-system-muted font-bold tracking-wider uppercase">
                AUTHENTIC 3D ROSTER DECK:
              </span>
              <span className="text-[9px] text-purple-400 font-mono">SELECT CHARACTER</span>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2.5">
              {CHARACTERS.map((c) => {
                const isSelected = c.id === activeChar.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => selectCharacter(c)}
                    onMouseEnter={() => sfx.playHover()}
                    className={`p-2.5 sm:p-3 rounded-xl text-left transition-all border flex items-center justify-between group ${
                      isSelected
                        ? 'bg-purple-950/60 border-purple-400 text-white shadow-[0_0_20px_rgba(168,85,247,0.35)]'
                        : 'bg-black/40 border-white/10 text-gray-400 hover:border-purple-500/40 hover:text-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-white/20 shrink-0 bg-black">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={c.thumbnail}
                          alt={c.name}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <div>
                        <div className="text-xs font-bold leading-tight group-hover:text-white transition-colors">
                          {c.name}
                        </div>
                        <div className="text-[9px] text-system-muted leading-tight mt-0.5">
                          {c.title}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end shrink-0 pl-2">
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-yellow-300/90 font-bold">
                        {c.rank.split(' ')[0]}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Manhwa Quote & RPG Stat Matrix */}
          <div className="space-y-3.5">
            <p className="text-xs text-gray-300 font-sans italic border-l-2 border-purple-500/60 pl-3 py-1 bg-purple-950/15 rounded-r">
              {activeChar.quote}
            </p>

            <div className="p-3.5 rounded-xl bg-black/70 border border-white/10 space-y-2.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400 flex items-center gap-1.5">
                  <Swords className="w-3.5 h-3.5 text-system-cyan" />
                  <span>STRENGTH [STR]:</span>
                </span>
                <span className="text-system-cyan font-bold">{activeChar.statStr} / 100</span>
              </div>
              <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-600 to-blue-400 rounded-full transition-all duration-500"
                  style={{ width: `${activeChar.statStr}%` }}
                />
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-purple-400" />
                  <span>VITALITY [VIT]:</span>
                </span>
                <span className="text-purple-400 font-bold">{activeChar.statVit} / 100</span>
              </div>
              <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-600 to-fuchsia-400 rounded-full transition-all duration-500"
                  style={{ width: `${activeChar.statVit}%` }}
                />
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-yellow-400" />
                  <span>AGILITY [AGI]:</span>
                </span>
                <span className="text-yellow-400 font-bold">{activeChar.statAgi} / 100</span>
              </div>
              <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-600 to-yellow-400 rounded-full transition-all duration-500"
                  style={{ width: `${activeChar.statAgi}%` }}
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-[10px] text-purple-200 flex items-start gap-2 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
              <Sparkles className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-bold mb-0.5">ACTIVE SOVEREIGN BUFF:</strong>
                <span>{activeChar.buff}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
