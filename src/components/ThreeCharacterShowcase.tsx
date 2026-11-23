'use client';

import React, { useState, useRef, useEffect } from 'react';
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
  Film,
  Box,
  Flame,
  CheckCircle2,
} from 'lucide-react';
import { spawnCombatNumber } from '@/components/effects/FloatingDamageNumbers';

export interface CombatSkill {
  name: string;
  type: 'attack' | 'buff' | 'ultimate';
  damage: string;
  effect: string;
  sfxType: 'slash' | 'roar' | 'drum' | 'rankup';
}

export interface HunterCharacter {
  id: 'jinwoo' | 'arise_jinwoo' | 'igris' | 'beru' | 'iron';
  name: string;
  title: string;
  koreanName: string;
  rank: string;
  thumbnail: string;
  cinemaImage: string;
  sketchfabUid: string;
  weaponName: string;
  quote: string;
  buff: string;
  statStr: number;
  statAgi: number;
  statVit: number;
  auraColor: string;
  skills: CombatSkill[];
}

const CHARACTERS: HunterCharacter[] = [
  {
    id: 'jinwoo',
    name: 'SUNG JIN-WOO',
    title: 'THE SHADOW MONARCH',
    koreanName: '성진우 // 그림자 군주',
    rank: 'SHADOW MONARCH',
    thumbnail: '/assets/09-arise/jinwoo-stage.png',
    cinemaImage: '/assets/09-arise/jinwoo-stage.png',
    sketchfabUid: 'cbd13bfe2d464cf18ec444cb7adf70e2',
    weaponName: "DUAL SHADOW DAGGERS [KAMISH'S WRATH & KNIGHT KILLER]",
    quote: '"I am the hunter who conquered death itself. Arise."',
    buff: '+50% COMPOUND 1RM // MAXIMUM AMINO RETENTION',
    statStr: 99,
    statAgi: 99,
    statVit: 98,
    auraColor: '#8b5cf6',
    skills: [
      {
        name: 'DAGGER RUSH [MUTILATE]',
        type: 'attack',
        damage: '248,500 DMG',
        effect: 'Twin dagger lightning slashes bypass 100% defense',
        sfxType: 'slash',
      },
      {
        name: "RULER'S AUTHORITY",
        type: 'buff',
        damage: '500,000 DMG',
        effect: 'Telekinetic invisible grip crushes the entire battlefield',
        sfxType: 'drum',
      },
      {
        name: 'SHADOW EXCHANGE',
        type: 'ultimate',
        damage: 'DIMENSIONAL',
        effect: 'Instantaneous swap with any shadow soldier globally',
        sfxType: 'roar',
      },
    ],
  },
  {
    id: 'arise_jinwoo',
    name: 'JIN-WOO: "ARISE" DOMAIN',
    title: 'SOVEREIGN SHADOW EXTRACTION',
    koreanName: '성진우 // 일어나라',
    rank: 'SOVEREIGN RITUAL',
    thumbnail: '/assets/09-arise/jinwoo-srank-stage.png',
    cinemaImage: '/assets/09-arise/jinwoo-srank-stage.png',
    sketchfabUid: '6e3c5101d50e4fbd84d2981e193092fa',
    weaponName: 'MONARCH SOUL EXTRACTION AUTHORITY',
    quote: '"From the depths of death, answer my call: Arise."',
    buff: '+100% SHADOW ARMY SYNTHESIS & ZERO FATIGUE',
    statStr: 100,
    statAgi: 100,
    statVit: 100,
    auraColor: '#38bdf8',
    skills: [
      {
        name: 'SOVEREIGN AURA EXPANSION',
        type: 'buff',
        damage: '+100% STATS',
        effect: 'Dark mana engulfs the perimeter, paralyzing inferior foes',
        sfxType: 'roar',
      },
      {
        name: 'SHADOW EXTRACTION [ARISE]',
        type: 'ultimate',
        damage: '500 SHADOWS',
        effect: 'Reanimates defeated enemies as eternal loyal shadow soldiers',
        sfxType: 'rankup',
      },
      {
        name: "MONARCH'S DOMAIN",
        type: 'buff',
        damage: '+50% SOLDIER DMG',
        effect: 'Pitch-black shadow floor grants all soldiers permanent buffs',
        sfxType: 'drum',
      },
    ],
  },
  {
    id: 'igris',
    name: 'COMMANDER IGRIS',
    title: 'THE BLOOD-RED KNIGHT',
    koreanName: '핏빛의 기사단장 이그리트',
    rank: 'COMMANDER GRADE',
    thumbnail: '/assets/09-arise/igris-stage.png',
    cinemaImage: '/assets/09-arise/igris-stage.png',
    sketchfabUid: 'dbe57ff1971349e597fe900ab3588d4b',
    weaponName: 'TWO-HANDED DEMONIC BLOOD GREATSWORD',
    quote: '"My blade exists solely to cleave your enemies, my Liege."',
    buff: '+35% BARBELL SQUAT INTENSITY // ZERO PLATEAU',
    statStr: 94,
    statAgi: 88,
    statVit: 92,
    auraColor: '#ef4444',
    skills: [
      {
        name: 'CRIMSON CLEAVE',
        type: 'attack',
        damage: '320,000 DMG',
        effect: 'Demonic two-handed sweep cleaves through titanium plate',
        sfxType: 'slash',
      },
      {
        name: 'TELEKINETIC BLADE RETURN',
        type: 'attack',
        damage: '290,000 DMG',
        effect: 'Hurled greatsword returns through targets back to his grasp',
        sfxType: 'slash',
      },
      {
        name: "ROYAL KNIGHT'S OATH",
        type: 'buff',
        damage: '+40% DEFENSE',
        effect: 'Swears unbreakable allegiance, absorbing 50% damage for the Monarch',
        sfxType: 'drum',
      },
    ],
  },
  {
    id: 'beru',
    name: 'MARSHAL BERU',
    title: 'THE PREDATOR KING',
    koreanName: '포식자 군단장 베르',
    rank: 'MARSHAL GRADE',
    thumbnail: '/assets/09-arise/beru-stage.png',
    cinemaImage: '/assets/09-arise/beru-stage.png',
    sketchfabUid: 'd819c8d0c2e147e98996260b97c56065',
    weaponName: 'TWIN PREDATORY CHITIN SCYTHES',
    quote: '"My King, permit me to feast upon and devour your enemies."',
    buff: '+45g RAPID LEUCINE METABOLISM // HYPERTROPHY OVERDRIVE',
    statStr: 92,
    statAgi: 99,
    statVit: 90,
    auraColor: '#a855f7',
    skills: [
      {
        name: 'SUPERSONIC CHITIN DASH',
        type: 'attack',
        damage: '410,000 DMG',
        effect: 'Mach-5 aerial dive decorticates targets before sound arrives',
        sfxType: 'slash',
      },
      {
        name: 'PREDATOR SHRIEK',
        type: 'buff',
        damage: 'AOE STUN',
        effect: 'Ultrasonic monarch roar paralyzes auditory nerves within 2km',
        sfxType: 'roar',
      },
      {
        name: 'GLUTTONY ABSORPTION',
        type: 'ultimate',
        damage: 'HEAL & STAT DRAIN',
        effect: 'Devours enemy biomass, permanently absorbing their key stats',
        sfxType: 'rankup',
      },
    ],
  },
  {
    id: 'iron',
    name: 'IRON: HEAVY TANK',
    title: 'THE SHIELD VANGUARD',
    koreanName: '철벽의 기사단 아이언',
    rank: 'ELITE KNIGHT',
    thumbnail: '/assets/09-arise/iron-stage.png',
    cinemaImage: '/assets/09-arise/iron-stage.png',
    sketchfabUid: 'dbe57ff1971349e597fe900ab3588d4b',
    weaponName: 'TITANIC TOWER SHIELD & WAR HAMMER',
    quote: '"[BEAST TAUNT ROAR] NONE SHALL PASS THROUGH THIS VANGUARD."',
    buff: '+40KG BENCH STABILIZATION & IMMOVABLE CORE',
    statStr: 96,
    statAgi: 72,
    statVit: 99,
    auraColor: '#06b6d4',
    skills: [
      {
        name: 'PROVOCATION TAUNT ROAR',
        type: 'buff',
        damage: '100% AGGRO LOCK',
        effect: 'Forces all enemy attention away from the Monarch onto Iron',
        sfxType: 'roar',
      },
      {
        name: 'SLEDGEHAMMER QUAKE',
        type: 'attack',
        damage: '350,000 DMG',
        effect: 'Downward slam fractures the earth, knocking down entire waves',
        sfxType: 'drum',
      },
      {
        name: 'UNBREAKABLE BULWARK',
        type: 'ultimate',
        damage: 'IMMUNITY (5S)',
        effect: 'Locks shield into the bedrock, rendering the frontline invulnerable',
        sfxType: 'rankup',
      },
    ],
  },
];

export function ThreeCharacterShowcase() {
  const [activeChar, setActiveChar] = useState<HunterCharacter>(CHARACTERS[0]);
  const [viewMode, setViewMode] = useState<'3d' | 'cinema'>('3d');
  const [isPoweringUp, setIsPoweringUp] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [activeSkillIndex, setActiveSkillIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cinemaStageRef = useRef<HTMLDivElement>(null);

  // Mouse tilt parallax for 4K Cinema mode
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (viewMode !== 'cinema' || !cinemaStageRef.current) return;
    const rect = cinemaStageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const selectCharacter = (c: HunterCharacter) => {
    sfx.playBladeSlash();
    setModelLoaded(false);
    setActiveChar(c);
    setActiveSkillIndex(null);
    spawnCombatNumber(`SHADOW AWAKENING: ${c.name}`, undefined, undefined, 'stat');
  };

  const executeSkill = (skill: CombatSkill, index: number) => {
    setActiveSkillIndex(index);

    if (skill.sfxType === 'slash') sfx.playBladeSlash();
    else if (skill.sfxType === 'roar') sfx.playDemonRoar();
    else if (skill.sfxType === 'drum') sfx.playSubBassBoom();
    else sfx.playRankUp();

    spawnCombatNumber(`${skill.name}: ${skill.damage}`, undefined, undefined, 'damage');

    setTimeout(() => {
      setActiveSkillIndex(null);
    }, 900);
  };

  const triggerArise = () => {
    if (isPoweringUp) return;
    setIsPoweringUp(true);
    sfx.playDemonRoar();
    spawnCombatNumber('ARISE // DOMAIN EXPANDED', undefined, undefined, 'mana');

    // Launch global cinematic awakening sequence
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('trigger-arise-cutscene'));
    }

    setTimeout(() => {
      setIsPoweringUp(false);
    }, 1500);
  };

  const toggleFullscreen = () => {
    sfx.playClick();
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen().catch(() => { });
      } else {
        document.exitFullscreen().catch(() => { });
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={`w-full rounded-2xl bg-[#05050A] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.85)] font-mono overflow-hidden transition-all duration-300 ${isPoweringUp ? 'ring-2 ring-purple-500 shadow-[0_0_80px_rgba(168,85,247,0.7)]' : ''
        }`}
    >
      {/* Top Header & Tactical Controls */}
      <div className="p-4 sm:p-6 border-b border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-purple-950/25 via-black to-slate-950/25">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span
              className="w-2 h-2 rounded-full animate-ping"
              style={{
                backgroundColor: activeChar.auraColor,
                boxShadow: `0 0 10px ${activeChar.auraColor}`,
              }}
            />
            <span className="text-[10px] text-system-muted font-bold tracking-widest uppercase">
              AUTHENTIC SOLO LEVELING 3D & 4K CINEMA ENGINE
            </span>
            <span className="text-[9px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-300">
              {activeChar.koreanName}
            </span>
          </div>
          <h2 className="text-xl sm:text-3xl font-cinzel font-black text-white tracking-wider uppercase drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            {activeChar.name}
          </h2>
        </div>

        {/* View Mode & Tactical Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* View Mode Switcher */}
          <div className="flex items-center rounded-lg bg-black/80 border border-white/15 p-0.5">
            <button
              onClick={() => {
                sfx.playClick();
                setViewMode('3d');
              }}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === '3d'
                  ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              <span>3D MESH</span>
            </button>
            <button
              onClick={() => {
                sfx.playClick();
                setViewMode('cinema');
              }}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'cinema'
                  ? 'bg-cyan-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>4K CINEMA</span>
            </button>
          </div>

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
        {/* Main Viewport: 3D Mesh or 4K Cinema Stage */}
        <div
          ref={cinemaStageRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="lg:col-span-8 relative h-[420px] sm:h-[500px] md:h-[600px] bg-black flex items-center justify-center overflow-hidden"
          style={{ perspective: '1000px' }}
        >
          {viewMode === '3d' ? (
            /* Mode A: Authentic 3D WebGL Model Viewport */
            <>
              <iframe
                key={activeChar.sketchfabUid}
                title={activeChar.name}
                src={`https://sketchfab.com/models/${activeChar.sketchfabUid}/embed?autostart=1&internal=1&tracking=0&ui_infos=0&ui_watermark=0&ui_hint=0&ui_controls=1&ui_stop=0&transparent=1`}
                onLoad={() => setModelLoaded(true)}
                allow="autoplay; fullscreen; xr-spatial-tracking"
                className="w-full h-full border-0 bg-transparent relative z-10"
              />

              {!modelLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#05050A] z-20 pointer-events-none">
                  <span className="w-9 h-9 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs text-purple-300 font-bold tracking-widest uppercase">
                    INITIALIZING 3D {activeChar.name} MESH & SHADERS...
                  </span>
                </div>
              )}
            </>
          ) : (
            /* Mode B: 4K Anime Cinema Stage with Dynamic 3D Parallax Tilt */
            <div
              className="relative w-full h-full flex items-center justify-center transition-transform duration-100 ease-out"
              style={{
                transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Radial Mana Aura Backdrop */}
              <div
                className="absolute inset-0 opacity-40 blur-3xl pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, ${activeChar.auraColor} 0%, transparent 70%)`,
                }}
              />

              {/* Volumetric Shadow Fog */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 pointer-events-none z-10" />

              {/* 4K High-Res Anime Character Standee */}
              <div className="relative h-[85%] max-w-[85%] flex items-center justify-center z-10 filter drop-shadow-[0_0_35px_rgba(139,92,246,0.35)] animate-pulse">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeChar.cinemaImage}
                  alt={activeChar.name}
                  className="max-h-full max-w-full object-contain pointer-events-none select-none"
                />
              </div>

              {/* Holographic Stage Pedestal Grid */}
              <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-purple-950/60 to-transparent border-b border-purple-500/30 flex items-center justify-center">
                <div className="w-64 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_rgba(6,182,212,0.8)]" />
              </div>
            </div>
          )}

          {/* Active Weapon Indicator */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 max-w-[55%] truncate text-[9px] sm:text-[10px] text-purple-300 font-bold bg-black/85 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-purple-500/40 backdrop-blur-md flex items-center gap-1.5 z-30 pointer-events-none">
            <Swords className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-purple-400 shrink-0" />
            <span className="truncate">{activeChar.weaponName}</span>
          </div>

          {/* Rank Badge */}
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 text-[9px] sm:text-[10px] text-yellow-300 font-bold bg-yellow-950/80 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-yellow-500/40 shadow-[0_0_15px_rgba(234,179,8,0.3)] backdrop-blur-md z-30 pointer-events-none">
            ⭐ {activeChar.rank}
          </div>

          {/* Navigation Hint */}
          <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:bottom-4 sm:left-4 text-[9px] sm:text-[10px] text-system-muted flex items-center justify-center sm:justify-start gap-2 bg-black/85 px-3 py-1.5 rounded-full border border-white/10 pointer-events-none backdrop-blur-md z-30">
            <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-system-cyan animate-pulse shrink-0" />
            <span className="truncate">
              {viewMode === '3d'
                ? 'DRAG WITH MOUSE / FINGER TO ROTATE 360°'
                : 'MOVE CURSOR TO ACTIVATE 3D MANA PARALLAX TILT'}
            </span>
          </div>
        </div>

        {/* Character Roster Deck, Combat Abilities & RPG Stat Terminal */}
        <div className="lg:col-span-4 p-3.5 sm:p-6 border-t lg:border-t-0 lg:border-l border-white/10 bg-[#07060F]/80 flex flex-col justify-between space-y-4 sm:space-y-5">
          {/* Character Selector Roster */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] text-system-muted font-bold tracking-wider uppercase">
                AUTHENTIC 3D ROSTER DECK:
              </span>
              <span className="text-[9px] text-purple-400 font-mono">5 ACTIVE MONARCHS</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 sm:gap-2.5 max-h-[260px] overflow-y-auto pr-1">
              {CHARACTERS.map((c) => {
                const isSelected = c.id === activeChar.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => selectCharacter(c)}
                    onMouseEnter={() => sfx.playHover()}
                    className={`p-2.5 sm:p-3 rounded-xl text-left transition-all border flex items-center justify-between group ${isSelected
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

          {/* Interactive Combat Abilities Matrix */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-system-muted font-bold tracking-wider uppercase flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>SIGNATURE COMBAT SKILLS:</span>
              </span>
              <span className="text-[9px] text-yellow-400 font-mono">CLICK TO TRIGGER</span>
            </div>

            <div className="space-y-1.5">
              {activeChar.skills.map((skill, idx) => {
                const isFiring = activeSkillIndex === idx;
                return (
                  <button
                    key={skill.name}
                    onClick={() => executeSkill(skill, idx)}
                    onMouseEnter={() => sfx.playHover()}
                    className={`w-full p-2 rounded-lg border text-left transition-all flex items-center justify-between text-xs group ${
                      isFiring
                        ? 'bg-purple-600 border-white text-white shadow-[0_0_20px_rgba(168,85,247,0.8)] scale-[1.02]'
                        : 'bg-black/60 border-white/10 hover:border-purple-500/50 text-gray-300 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-mono px-1 py-0.5 rounded bg-white/10 text-gray-400 group-hover:text-cyan-300">
                        0{idx + 1}
                      </span>
                      <div>
                        <div className="font-bold text-[11px] leading-tight flex items-center gap-1.5">
                          <span>{skill.name}</span>
                        </div>
                        <div className="text-[9px] text-system-muted group-hover:text-gray-300">
                          {skill.effect}
                        </div>
                      </div>
                    </div>
                    <span className="text-[9px] font-bold font-mono px-1.5 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-500/30 shrink-0">
                      {skill.damage}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Manhwa Quote & RPG Stat Matrix */}
          <div className="space-y-3">
            <p className="text-xs text-gray-300 font-sans italic border-l-2 border-purple-500/60 pl-3 py-1 bg-purple-950/15 rounded-r">
              {activeChar.quote}
            </p>

            <div className="p-3 rounded-xl bg-black/70 border border-white/10 space-y-2">
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

            <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/30 text-[10px] text-purple-200 flex items-start gap-2 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
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
