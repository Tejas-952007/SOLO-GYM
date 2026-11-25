'use client';

import React, { useState, useRef } from 'react';
import { sfx } from '@/lib/audio-sfx';
import {
  Zap,
  Eye,
  Swords,
  Shield,
  Sparkles,
  Maximize2,
  Film,
  Box,
  Flame,
  Crown,
  ChevronRight,
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
    thumbnail: '/assets/07-ranks/rank-a-aura.webp',
    cinemaImage: '/assets/07-ranks/rank-a-aura.webp',
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
    name: 'SHADOW MONARCH',
    title: 'SOVEREIGN EXTRACTION',
    koreanName: '성진우 // 일어나라',
    rank: 'MONARCH',
    thumbnail: '/assets/07-ranks/rank-s-max.webp',
    cinemaImage: '/assets/07-ranks/rank-s-max.webp',
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
    thumbnail: '/assets/09-arise/igris22.jpeg',
    cinemaImage: '/assets/09-arise/igris22.jpeg',
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
    thumbnail: '/assets/09-arise/beru0.jpg',
    cinemaImage: '/assets/09-arise/beru0.jpg',
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
    name: 'VANGUARD IRON',
    title: 'THE SHIELD VANGUARD',
    koreanName: '철벽의 기사단 아이언',
    rank: 'ELITE',
    thumbnail: '/assets/09-arise/iron_3.jpeg',
    cinemaImage: '/assets/09-arise/iron_3.jpeg',
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
  const [mobileShowcaseTab, setMobileShowcaseTab] = useState<'visual' | 'skills'>('visual');
  const [modelLoaded, setModelLoaded] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [activeSkillIndex, setActiveSkillIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cinemaStageRef = useRef<HTMLDivElement>(null);

  // Smooth mouse tilt parallax for 4K Cinema (desktop only)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== "undefined" && (window.innerWidth < 1024 || 'ontouchstart' in window)) return;
    if (viewMode !== 'cinema' || !cinemaStageRef.current) return;
    const rect = cinemaStageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
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
        containerRef.current.requestFullscreen().catch(() => { });
      } else {
        document.exitFullscreen().catch(() => { });
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-3xl bg-[#05050A] border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden font-mono transition-all duration-300"
    >
      {/* Mobile Single-Tier Switcher */}
      <div className="flex lg:hidden items-center justify-between gap-1 p-1 bg-black/90 border-b border-white/10 font-mono text-[11px] relative z-30">
        <button
          onClick={() => {
            sfx.playClick();
            setMobileShowcaseTab('visual');
          }}
          className={`flex-1 py-2 rounded-lg font-bold transition-all text-center ${
            mobileShowcaseTab === 'visual'
              ? 'bg-cyan-600 text-white shadow-[0_0_12px_rgba(6,182,212,0.5)]'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          🎬 4K MONARCH VISUAL
        </button>
        <button
          onClick={() => {
            sfx.playClick();
            setMobileShowcaseTab('skills');
          }}
          className={`flex-1 py-2 rounded-lg font-bold transition-all text-center ${
            mobileShowcaseTab === 'skills'
              ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.5)]'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          ⚔️ COMBAT SKILLS
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">

        {/* LEFT COLUMN: Clean Minimalist Monolith Controller */}
        <div className={`lg:col-span-6 xl:col-span-5 p-4 sm:p-8 flex flex-col justify-between space-y-4 sm:space-y-6 border-b lg:border-b-0 lg:border-r border-white/[0.08] bg-[#07060F]/90 z-20 ${
          mobileShowcaseTab === 'skills' ? 'flex' : 'hidden lg:flex'
        }`}>

          {/* Identity & Lore */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="w-2.5 h-2.5 rounded-full animate-ping"
                style={{ backgroundColor: activeChar.auraColor }}
              />
              <span className="text-[11px] text-gray-400 font-mono tracking-widest uppercase">
                {activeChar.koreanName}
              </span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-yellow-300 font-bold tracking-wider">
                ⭐ {activeChar.rank}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-cinzel font-black text-white tracking-wider uppercase drop-shadow-[0_0_30px_rgba(255,255,255,0.4)] whitespace-nowrap">
              {activeChar.name}
            </h3>

            <p className="text-xs text-purple-300 font-mono tracking-wider flex items-center gap-1.5">
              <Swords className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span>{activeChar.weaponName}</span>
            </p>

            <p className="text-xs text-gray-300 font-sans italic border-l-2 border-purple-500/60 pl-3 py-1 bg-purple-950/20 rounded-r leading-relaxed">
              {activeChar.quote}
            </p>
          </div>

          {/* Character Roster Dock (Horizontal chips with glowing avatars) */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Crown className="w-3.5 h-3.5 text-yellow-400" />
                <span>ROSTER SELECT:</span>
              </span>
              <span className="text-[10px] text-purple-400 font-mono">5 MONARCHS</span>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {CHARACTERS.map((c) => {
                const isSelected = c.id === activeChar.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => selectCharacter(c)}
                    onMouseEnter={() => sfx.playHover()}
                    title={`${c.name} (${c.rank})`}
                    className={`relative rounded-xl overflow-hidden aspect-square border transition-all duration-300 group cursor-pointer ${isSelected
                      ? 'border-purple-400 ring-2 ring-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.6)] scale-105'
                      : 'border-white/10 opacity-60 hover:opacity-100 hover:border-white/30'
                      }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={c.thumbnail}
                      alt={c.name}
                      className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-1 inset-x-0 text-center text-[8px] font-bold text-white tracking-wider px-0.5">
                      {c.id === 'jinwoo' ? 'JIN-WOO' : c.id === 'arise_jinwoo' ? 'ARISE' : c.id === 'igris' ? 'IGRIS' : c.id === 'beru' ? 'BERU' : 'IRON'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tactical Tabs: Skills vs Stats */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2 border-b border-white/[0.08] pb-2">
              <button
                onClick={() => {
                  sfx.playClick();
                  setInfoTab('skills');
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${infoTab === 'skills'
                  ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.4)]'
                  : 'text-gray-400 hover:text-white'
                  }`}
              >
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>SKILLS</span>
              </button>
              <button
                onClick={() => {
                  sfx.playClick();
                  setInfoTab('stats');
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${infoTab === 'stats'
                  ? 'bg-cyan-600 text-white shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                  : 'text-gray-400 hover:text-white'
                  }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>STATS</span>
              </button>
            </div>

            {infoTab === 'skills' ? (
              <div className="space-y-2">
                {activeChar.skills.map((skill, idx) => {
                  const isFiring = activeSkillIndex === idx;
                  return (
                    <button
                      key={skill.name}
                      onClick={() => executeSkill(skill, idx)}
                      onMouseEnter={() => sfx.playHover()}
                      className={`w-full p-2.5 rounded-xl border text-left transition-all duration-200 flex items-center justify-between group cursor-pointer ${isFiring
                        ? 'bg-purple-600 border-white text-white shadow-[0_0_20px_rgba(168,85,247,0.8)] scale-[1.02]'
                        : 'bg-black/50 border-white/[0.08] hover:border-purple-500/40 hover:bg-black/80'
                        }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-gray-400">
                          0{idx + 1}
                        </span>
                        <div className="min-w-0 pr-1">
                          <div className="font-bold text-xs text-white group-hover:text-cyan-300">
                            {skill.name}
                          </div>
                          <div className="text-[10px] text-gray-400 leading-tight pt-0.5">
                            {skill.effect}
                          </div>
                        </div>
                      </div>
                      <span className="text-[9px] font-bold font-mono px-1.5 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-500/30 shrink-0 ml-2">
                        {skill.damage}
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-2">
                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">STRENGTH [STR]</span>
                    <span className="text-cyan-400 font-bold">{activeChar.statStr} / 100</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-600 to-blue-400 rounded-full"
                      style={{ width: `${activeChar.statStr}%` }}
                    />
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">VITALITY [VIT]</span>
                    <span className="text-purple-400 font-bold">{activeChar.statVit} / 100</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-600 to-fuchsia-400 rounded-full"
                      style={{ width: `${activeChar.statVit}%` }}
                    />
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">AGILITY [AGI]</span>
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

            {/* Buff Pill */}
            <div className="p-2.5 rounded-xl bg-purple-950/30 border border-purple-500/20 text-[10px] text-purple-200 flex items-start gap-2">
              <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
              <span className="leading-tight">
                <strong className="text-white">PASSIVE BUFF:</strong> {activeChar.buff}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Pure, Unobstructed 4K Hero Visual Stage */}
        <div
          ref={cinemaStageRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={`lg:col-span-6 xl:col-span-7 relative h-[340px] sm:h-[480px] md:h-[660px] bg-gradient-to-b from-[#090814] via-[#05050A] to-[#040408] flex items-center justify-center overflow-hidden ${
            mobileShowcaseTab === 'visual' ? 'flex' : 'hidden lg:flex'
          }`}
          style={{ perspective: '1200px' }}
        >
          {/* Ambient Volumetric Backlight */}
          <div
            className="absolute inset-0 opacity-40 blur-3xl pointer-events-none transition-all duration-700"
            style={{
              background: `radial-gradient(circle at center, ${activeChar.auraColor} 0%, transparent 65%)`,
            }}
          />

          {/* Subtle Top & Bottom Shadow Gradients */}
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/80 via-black/30 to-transparent pointer-events-none z-10" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#05050A] via-[#05050A]/80 to-transparent pointer-events-none z-10" />

          {/* Engine Controls Switcher (Top-Right Floating) */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2 z-30 pointer-events-auto">
            <div className="flex items-center rounded-xl bg-black/80 border border-white/15 p-1 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.6)]">
              <button
                onClick={() => {
                  sfx.playClick();
                  setViewMode('cinema');
                }}
                className={`px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold transition-all flex items-center gap-1.5 ${viewMode === 'cinema'
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
                className={`px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold transition-all flex items-center gap-1.5 ${viewMode === '3d'
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
              className="p-2 sm:p-2.5 rounded-xl bg-black/80 border border-white/15 hover:border-white/40 text-gray-300 hover:text-white transition-all backdrop-blur-md"
            >
              <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>

          {/* Center Stage Presentation: Completely Unobstructed */}
          {viewMode === '3d' ? (
            <div className="relative w-full h-full min-h-[480px]">
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
            <div
              className="relative w-full h-full flex items-center justify-center transition-transform duration-150 ease-out"
              style={{
                transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Unobstructed 4K Artwork */}
              <div className="relative h-[92%] max-w-[92%] flex items-center justify-center filter drop-shadow-[0_0_40px_rgba(139,92,246,0.35)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeChar.cinemaImage}
                  alt={activeChar.name}
                  className="max-h-full max-w-full object-contain pointer-events-none select-none transition-transform duration-500 rounded-2xl"
                />
              </div>

              {/* Glowing Floor Pedestal */}
              <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-[#05050A] via-purple-950/20 to-transparent pointer-events-none flex items-center justify-center">
                <div className="w-80 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_25px_rgba(6,182,212,1)]" />
              </div>
            </div>
          )}

          {/* Navigation Hint */}
          <div className="absolute bottom-4 left-6 z-20 pointer-events-none hidden sm:flex items-center gap-2 text-[10px] text-gray-400 bg-black/60 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
            <Eye className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>
              {viewMode === '3d'
                ? 'DRAG WITH CURSOR OR TOUCH TO ROTATE 360°'
                : 'HOVER & MOVE CURSOR TO ACTIVATE 3D MANA PARALLAX TILT'}
            </span>
          </div>

          {/* Mobile Quick Roster Bar (Visual View) */}
          <div className="flex lg:hidden absolute bottom-3 inset-x-3 z-30 justify-center gap-1.5 p-1 bg-black/85 backdrop-blur-md border border-white/10 rounded-xl">
            {CHARACTERS.map((c) => (
              <button
                key={c.id}
                onClick={() => selectCharacter(c)}
                className={`px-2 py-1 rounded-lg text-[9px] font-bold font-mono transition-all ${
                  c.id === activeChar.id
                    ? 'bg-system-accent text-white shadow-[0_0_10px_rgba(139,92,246,0.6)]'
                    : 'text-gray-400'
                }`}
              >
                {c.id === 'jinwoo' ? 'JIN-WOO' : c.id === 'arise_jinwoo' ? 'ARISE' : c.id === 'igris' ? 'IGRIS' : c.id === 'beru' ? 'BERU' : 'IRON'}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
