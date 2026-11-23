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
  Film,
  Box,
  Flame,
  ChevronRight,
  Info,
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
    rank: 'SOVEREIGN',
    thumbnail: '/assets/09-arise/jinwoo-stage.png',
    cinemaImage: '/assets/09-arise/jinwoo-stage.png',
    sketchfabUid: 'cbd13bfe2d464cf18ec444cb7adf70e2',
    weaponName: "KAMISH'S WRATH & KNIGHT KILLER",
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
    name: 'JIN-WOO: "ARISE"',
    title: 'SOVEREIGN EXTRACTION',
    koreanName: '성진우 // 일어나라',
    rank: 'MONARCH',
    thumbnail: '/assets/09-arise/jinwoo-srank-stage.png',
    cinemaImage: '/assets/09-arise/jinwoo-srank-stage.png',
    sketchfabUid: '6e3c5101d50e4fbd84d2981e193092fa',
    weaponName: 'MONARCH SOUL AUTHORITY',
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
    rank: 'COMMANDER',
    thumbnail: '/assets/09-arise/igris-stage.png',
    cinemaImage: '/assets/09-arise/igris-stage.png',
    sketchfabUid: 'dbe57ff1971349e597fe900ab3588d4b',
    weaponName: 'DEMONIC BLOOD GREATSWORD',
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
    rank: 'MARSHAL',
    thumbnail: '/assets/09-arise/beru-stage.png',
    cinemaImage: '/assets/09-arise/beru-stage.png',
    sketchfabUid: 'd819c8d0c2e147e98996260b97c56065',
    weaponName: 'PREDATORY CHITIN SCYTHES',
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
        damage: 'HEAL & DRAIN',
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
    rank: 'ELITE',
    thumbnail: '/assets/09-arise/iron-stage.png',
    cinemaImage: '/assets/09-arise/iron-stage.png',
    sketchfabUid: 'dbe57ff1971349e597fe900ab3588d4b',
    weaponName: 'TITANIC TOWER SHIELD & HAMMER',
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
        damage: '100% AGGRO',
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
        damage: 'IMMUNITY',
        effect: 'Locks shield into bedrock, rendering the frontline invulnerable',
        sfxType: 'rankup',
      },
    ],
  },
];

export function ThreeCharacterShowcase() {
  const [activeChar, setActiveChar] = useState<HunterCharacter>(CHARACTERS[0]);
  const [viewMode, setViewMode] = useState<'3d' | 'cinema'>('cinema');
  const [infoTab, setInfoTab] = useState<'skills' | 'stats'>('skills');
  const [modelLoaded, setModelLoaded] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [activeSkillIndex, setActiveSkillIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cinemaStageRef = useRef<HTMLDivElement>(null);

  // Smooth mouse tilt parallax for 4K Cinema
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (viewMode !== 'cinema' || !cinemaStageRef.current) return;
    const rect = cinemaStageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
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
    }, 800);
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
      className="relative w-full rounded-3xl bg-[#05050A] border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.9)] overflow-hidden font-mono transition-all duration-300"
    >
      {/* 1. CINEMATIC HERO STAGE VIEWPORT */}
      <div
        ref={cinemaStageRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full h-[460px] sm:h-[540px] md:h-[620px] bg-gradient-to-b from-[#090814] via-[#05050A] to-[#040408] flex items-center justify-center overflow-hidden"
        style={{ perspective: '1200px' }}
      >
        {/* Ambient Volumetric Backlight */}
        <div
          className="absolute inset-0 opacity-40 blur-3xl pointer-events-none transition-all duration-700"
          style={{
            background: `radial-gradient(circle at center, ${activeChar.auraColor} 0%, transparent 65%)`,
          }}
        />

        {/* Ambient Cinematic Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(5,5,10,0.85)_100%)] pointer-events-none z-10" />

        {/* Top Floating Glass HUD */}
        <div className="absolute top-4 inset-x-4 sm:top-6 sm:inset-x-6 flex items-start justify-between z-30 pointer-events-none">
          {/* Character Identity Monolith */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full animate-ping"
                style={{ backgroundColor: activeChar.auraColor }}
              />
              <span className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">
                {activeChar.koreanName}
              </span>
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/10 border border-white/15 text-yellow-300 font-bold tracking-wider">
                ⭐ {activeChar.rank}
              </span>
            </div>
            <h3 className="text-2xl sm:text-4xl md:text-5xl font-cinzel font-black text-white tracking-wider uppercase drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]">
              {activeChar.name}
            </h3>
            <p className="text-[11px] text-purple-300 font-mono tracking-wider">
              {activeChar.weaponName}
            </p>
          </div>

          {/* Engine Controls Toggle */}
          <div className="flex items-center gap-2 pointer-events-auto">
            <div className="flex items-center rounded-xl bg-black/70 border border-white/15 p-1 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.6)]">
              <button
                onClick={() => {
                  sfx.playClick();
                  setViewMode('cinema');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  viewMode === 'cinema'
                    ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.6)]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Film className="w-3.5 h-3.5" />
                <span>4K CINEMA</span>
              </button>
              <button
                onClick={() => {
                  sfx.playClick();
                  setViewMode('3d');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  viewMode === '3d'
                    ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.6)]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Box className="w-3.5 h-3.5" />
                <span>3D MESH</span>
              </button>
            </div>

            <button
              onClick={toggleFullscreen}
              onMouseEnter={() => sfx.playHover()}
              title="Fullscreen Mode"
              className="p-2.5 rounded-xl bg-black/70 border border-white/15 hover:border-white/40 text-gray-300 hover:text-white transition-all backdrop-blur-md"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Center Stage Presentation */}
        {viewMode === '3d' ? (
          /* Mode A: Interactive 360° 3D Mesh */
          <div className="relative w-full h-full">
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
          </div>
        ) : (
          /* Mode B: 4K Anime Cinema Stage with Parallax Tilt */
          <div
            className="relative w-full h-full flex items-center justify-center transition-transform duration-150 ease-out"
            style={{
              transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* 4K Anime Character Silhouette */}
            <div className="relative h-[85%] max-w-[85%] flex items-center justify-center filter drop-shadow-[0_0_40px_rgba(139,92,246,0.4)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeChar.cinemaImage}
                alt={activeChar.name}
                className="max-h-full max-w-full object-contain pointer-events-none select-none transition-transform duration-500"
              />
            </div>

            {/* Glowing Ground Grid Pedestal */}
            <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-black via-purple-950/20 to-transparent pointer-events-none flex items-center justify-center">
              <div className="w-80 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_25px_rgba(6,182,212,1)]" />
            </div>
          </div>
        )}

        {/* Bottom Floating Hint */}
        <div className="absolute bottom-4 left-6 z-20 pointer-events-none hidden sm:flex items-center gap-2 text-[10px] text-gray-400 bg-black/60 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
          <Eye className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>
            {viewMode === '3d'
              ? 'DRAG WITH CURSOR OR TOUCH TO ROTATE 3D CHARACTER 360°'
              : 'MOVE MOUSE TO ACTIVATE 3D MANA PARALLAX TILT'}
          </span>
        </div>
      </div>

      {/* 2. BOTTOM UNIFIED TACTICAL CONTROLLER */}
      <div className="p-4 sm:p-6 bg-[#07060F] border-t border-white/10 space-y-5">
        {/* Character Selection Glass Dock */}
        <div>
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Crown className="w-3.5 h-3.5 text-yellow-400" />
              <span>SELECT MONARCH // SOVEREIGN ROSTER:</span>
            </span>
            <span className="text-[10px] text-purple-400 font-mono">5 ACTIVE HUNTERS</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
            {CHARACTERS.map((c) => {
              const isSelected = c.id === activeChar.id;
              return (
                <button
                  key={c.id}
                  onClick={() => selectCharacter(c)}
                  onMouseEnter={() => sfx.playHover()}
                  className={`p-2 sm:p-2.5 rounded-2xl border text-left transition-all duration-200 flex items-center gap-2.5 group cursor-pointer ${
                    isSelected
                      ? 'bg-purple-950/70 border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.4)] scale-[1.02]'
                      : 'bg-black/50 border-white/10 hover:border-purple-500/40 hover:bg-black/80'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/15 shrink-0 bg-black">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={c.thumbnail}
                      alt={c.name}
                      className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="min-w-0">
                    <div
                      className={`text-xs font-bold truncate ${
                        isSelected ? 'text-white' : 'text-gray-300 group-hover:text-white'
                      }`}
                    >
                      {c.name}
                    </div>
                    <div className="text-[9px] text-gray-500 truncate mt-0.5">{c.rank}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tactical Matrix: Skills vs Stats Tabs */}
        <div className="rounded-2xl bg-black/60 border border-white/10 p-4 sm:p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sfx.playClick();
                  setInfoTab('skills');
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  infoTab === 'skills'
                    ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.4)]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>SIGNATURE SKILLS</span>
              </button>
              <button
                onClick={() => {
                  sfx.playClick();
                  setInfoTab('stats');
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  infoTab === 'stats'
                    ? 'bg-cyan-600 text-white shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>RPG ATTRIBUTES</span>
              </button>
            </div>

            <span className="text-[10px] text-gray-400 italic hidden sm:inline">
              {activeChar.quote}
            </span>
          </div>

          {infoTab === 'skills' ? (
            /* Skills Tab */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
              {activeChar.skills.map((skill, idx) => {
                const isFiring = activeSkillIndex === idx;
                return (
                  <button
                    key={skill.name}
                    onClick={() => executeSkill(skill, idx)}
                    onMouseEnter={() => sfx.playHover()}
                    className={`p-3 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between group cursor-pointer ${
                      isFiring
                        ? 'bg-purple-600 border-white text-white shadow-[0_0_25px_rgba(168,85,247,0.8)] scale-[1.03]'
                        : 'bg-black/50 border-white/10 hover:border-purple-500/50 hover:bg-black/80'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-gray-300">
                        SKILL 0{idx + 1}
                      </span>
                      <span className="text-[10px] font-bold font-mono text-purple-300">
                        {skill.damage}
                      </span>
                    </div>
                    <div className="font-bold text-xs text-white group-hover:text-cyan-300 transition-colors">
                      {skill.name}
                    </div>
                    <div className="text-[10px] text-gray-400 mt-1 line-clamp-2">
                      {skill.effect}
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            /* RPG Stats Tab */
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400 flex items-center gap-1.5">
                    <Swords className="w-3.5 h-3.5 text-cyan-400" />
                    <span>STRENGTH [STR]</span>
                  </span>
                  <span className="text-cyan-400 font-bold">{activeChar.statStr} / 100</span>
                </div>
                <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-600 to-blue-400 rounded-full"
                    style={{ width: `${activeChar.statStr}%` }}
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-purple-400" />
                    <span>VITALITY [VIT]</span>
                  </span>
                  <span className="text-purple-400 font-bold">{activeChar.statVit} / 100</span>
                </div>
                <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-600 to-fuchsia-400 rounded-full"
                    style={{ width: `${activeChar.statVit}%` }}
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-yellow-400" />
                    <span>AGILITY [AGI]</span>
                  </span>
                  <span className="text-yellow-400 font-bold">{activeChar.statAgi} / 100</span>
                </div>
                <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-600 to-yellow-400 rounded-full"
                    style={{ width: `${activeChar.statAgi}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Active Sovereign Buff Pill */}
          <div className="p-2.5 rounded-xl bg-purple-950/30 border border-purple-500/25 flex items-center justify-between text-[10px] text-purple-200">
            <span className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span>
                <strong className="text-white">ACTIVE BUFF:</strong> {activeChar.buff}
              </span>
            </span>
            <span className="text-yellow-300 font-mono font-bold shrink-0">100% UPTIME</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Crown(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.735H5.81a1 1 0 0 1-.957-.735L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z" />
      <path d="M5 21h14" />
    </svg>
  );
}
