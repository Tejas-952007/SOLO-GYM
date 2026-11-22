'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sfx } from '@/lib/audio-sfx';

interface SearchItem {
  id: string;
  category: 'Chapter' | 'Diet' | 'Combat' | 'CheatCode' | 'System';
  title: string;
  subtitle: string;
  badge: string;
  action: () => void;
}

interface HunterCommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenConsole?: () => void;
  onTriggerArise?: () => void;
}

export function HunterCommandPalette({
  isOpen,
  onClose,
  onOpenConsole,
  onTriggerArise,
}: HunterCommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [systemMessage, setSystemMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Jump helper
  const jumpTo = (id: string) => {
    sfx.playWhoosh();
    onClose();
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const executeCheatCode = (code: string) => {
    sfx.playLevelUp();
    if (code === 'ARISE') {
      setSystemMessage('⚡ CHEAT CODE ACCEPTED: ALL SHADOWS SUMMONED. MONARCH REIGN ACTIVE.');
      onTriggerArise?.();
    } else if (code === '100PUSHUPS') {
      setSystemMessage('⚡ DAILY QUEST OVERFLOW: +10,000 XP GRANTED. PENALTY ZONE PURGED.');
    } else if (code === 'DESIPOWER') {
      setSystemMessage('⚡ MAXIMUM PROTEIN PROTOCOL ENGAGED: 250G SOYA & PANEER MATRIX INJECTED.');
    } else {
      setSystemMessage(`⚡ COMMAND [${code}] EXECUTED.`);
    }
    setTimeout(() => setSystemMessage(null), 4000);
  };

  const allItems: SearchItem[] = [
    // Chapters
    { id: 'ch-1', category: 'Chapter', title: 'Chapter I: The System Awakes', subtitle: 'Rank E Survival & Daily Quest Protocol', badge: 'CH 01', action: () => jumpTo('chapter-1') },
    { id: 'ch-2', category: 'Chapter', title: 'Chapter II: The System Chose You', subtitle: 'Double Dungeon Awakening & Cartenon Temple', badge: 'CH 02', action: () => jumpTo('chapter-2') },
    { id: 'ch-3', category: 'Chapter', title: 'Chapter III: The Gym Is The Dungeon', subtitle: 'Boss Fight & Progressive Overload Mechanics', badge: 'CH 03', action: () => jumpTo('chapter-3') },
    { id: 'ch-4', category: 'Chapter', title: 'Chapter IV: The Iron Mentors', subtitle: 'Arnold, Lee Haney, Ronnie Coleman Archetypes', badge: 'CH 04', action: () => jumpTo('chapter-4') },
    { id: 'ch-5', category: 'Chapter', title: 'Chapter V: Desi Nutrition Grimoire', subtitle: 'Paneer, Soya Chunks, Dal & Whey Ratios', badge: 'CH 05', action: () => jumpTo('chapter-5') },
    { id: 'ch-6', category: 'Chapter', title: 'Chapter VI: The Demon Back & Hypertrophy', subtitle: 'Anatomical Callouts & Latissimus Awakening', badge: 'CH 06', action: () => jumpTo('chapter-6') },
    { id: 'ch-7', category: 'Chapter', title: 'Chapter VII: Rank Evolution Crucible', subtitle: 'E-Rank Weakling to National S-Rank Monarch', badge: 'CH 07', action: () => jumpTo('chapter-7') },
    { id: 'ch-8', category: 'Chapter', title: 'Chapter VIII: AI Hunter Guild Coach', subtitle: 'Autonomous Telemetry & Labdoor Verification', badge: 'CH 08', action: () => jumpTo('chapter-8') },
    { id: 'ch-9', category: 'Chapter', title: 'Chapter IX: ARISE — The Final Ascension', subtitle: 'Shadow Army Extraction & System Overdrive', badge: 'CH 09', action: () => jumpTo('chapter-9') },

    // Desi Diet Items
    { id: 'diet-paneer', category: 'Diet', title: 'Paneer Bhurji / Raw Paneer', subtitle: '18g Protein / 100g — Casein slow absorption night fuel', badge: '18G PRO', action: () => jumpTo('chapter-5') },
    { id: 'diet-soya', category: 'Diet', title: 'Soya Chunks Mealmaker', subtitle: '52g Protein / 100g — Ultimate plant-based budget powerhouse', badge: '52G PRO', action: () => jumpTo('chapter-5') },
    { id: 'diet-whey', category: 'Diet', title: 'Whey Protein Isolate', subtitle: '27g Clean Leucine Spike — Rapid post-dungeon recovery', badge: '27G PRO', action: () => jumpTo('chapter-5') },
    { id: 'diet-curd', category: 'Diet', title: 'Hung Curd / Greek Dahi', subtitle: '10g Bioavailable Protein + Gut Microbiome reinforcement', badge: '10G PRO', action: () => jumpTo('chapter-5') },

    // Combat & RPG Actions
    { id: 'act-console', category: 'System', title: 'Open Hunter Status Console', subtitle: 'Inspect STR/AGI/VIT vitals, artifacts & 1RM calculator', badge: 'KEY [C]', action: () => { onClose(); onOpenConsole?.(); } },
    { id: 'act-sound', category: 'System', title: 'Toggle Audio SFX & Synth Pulse', subtitle: '120 BPM dark anime dungeon bass synthesizer', badge: 'KEY [M]', action: () => { sfx.toggle(); } },
    { id: 'act-roar', category: 'Combat', title: 'Play Demon Roar SFX', subtitle: 'Subharmonic 28Hz dungeon earthquake roar', badge: 'AUDIO', action: () => sfx.playDemonRoar() },
    { id: 'act-slash', category: 'Combat', title: 'Play Razor Dagger Slash', subtitle: 'High-frequency anime critical blade resonance', badge: 'AUDIO', action: () => sfx.playSwordSlash() },

    // Cheat Codes
    { id: 'cheat-arise', category: 'CheatCode', title: 'CHEAT: ARISE (Shadow Extraction)', subtitle: 'Type "ARISE" or select to summon the complete Monarch Army', badge: 'MONARCH', action: () => executeCheatCode('ARISE') },
    { id: 'cheat-quest', category: 'CheatCode', title: 'CHEAT: 100PUSHUPS (Quest Overflow)', subtitle: 'Instantly fulfill daily penalty quest with bonus vitality', badge: '+10K XP', action: () => executeCheatCode('100PUSHUPS') },
    { id: 'cheat-desi', category: 'CheatCode', title: 'CHEAT: DESIPOWER (Max Nutrition)', subtitle: 'Saturate amino acid pool with 250g vegetarian macros', badge: 'DESI BUFF', action: () => executeCheatCode('DESIPOWER') },
  ];

  const filteredItems = query.trim() === ''
    ? allItems
    : allItems.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase()) ||
        item.badge.toLowerCase().includes(query.toLowerCase())
      );

  useEffect(() => {
    if (isOpen) {
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
      sfx.playMenuOpen();
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % Math.max(1, filteredItems.length));
      sfx.playTick();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
      sfx.playTick();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-2xl bg-[#090814] border border-cyan-500/40 rounded-2xl shadow-[0_0_50px_rgba(0,240,255,0.25)] overflow-hidden flex flex-col z-10"
            onKeyDown={handleKeyDown}
          >
            {/* Holographic Header Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-cyan-500/20 bg-cyan-950/20">
              <span className="text-cyan-400 font-mono text-sm">SYSTEM://</span>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search chapters, desi foods, bosses, or type ARISE / 100PUSHUPS..."
                className="flex-1 bg-transparent border-none outline-none text-white font-mono text-sm placeholder-cyan-700/60"
              />
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-400">
                ESC TO CLOSE
              </span>
            </div>

            {/* Notification alert if cheat activated */}
            {systemMessage && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-amber-500/20 border-b border-amber-500/40 px-4 py-2 font-mono text-xs text-amber-300 font-bold"
              >
                {systemMessage}
              </motion.div>
            )}

            {/* Results List */}
            <div className="max-h-96 overflow-y-auto divide-y divide-white/5 p-2 space-y-1">
              {filteredItems.length === 0 ? (
                <div className="py-8 text-center text-gray-500 font-mono text-xs">
                  NO SYSTEM ENTRY FOUND FOR &quot;{query}&quot;. TRY &apos;CHEST&apos;, &apos;SOYA&apos;, &apos;ARISE&apos;.
                </div>
              ) : (
                filteredItems.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      onClick={item.action}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-cyan-500/15 border border-cyan-500/50 shadow-[inset_0_0_12px_rgba(0,240,255,0.15)]'
                          : 'hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            isSelected ? 'bg-cyan-400 shadow-[0_0_8px_#00f0ff]' : 'bg-gray-700'
                          }`}
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs text-cyan-500/70 font-semibold uppercase">
                              [{item.category}]
                            </span>
                            <span className="font-heading font-bold text-sm text-white">
                              {item.title}
                            </span>
                          </div>
                          <p className="text-xs text-gray-400 font-sans mt-0.5">{item.subtitle}</p>
                        </div>
                      </div>
                      <span className="font-mono text-[10px] px-2 py-1 rounded bg-black/40 border border-white/10 text-cyan-300 whitespace-nowrap">
                        {item.badge}
                      </span>
                    </div>
                  );
                })
              )}
            </div>

            {/* Bottom System Legend */}
            <div className="px-4 py-2.5 bg-black/60 border-t border-cyan-500/10 flex items-center justify-between text-[11px] font-mono text-gray-500">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>C: Hunter Console</span>
                <span>M: SFX Toggle</span>
              </div>
              <span className="text-cyan-400/70">LEVEL UP ARCHIVES V2.4</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
