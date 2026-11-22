'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sfx } from '@/lib/audio-sfx';
import { Keyboard, X } from 'lucide-react';

export function KeyboardShortcutsModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        setIsOpen((prev) => {
          const next = !prev;
          if (next) sfx.playMenuOpen();
          else sfx.playClick();
          return next;
        });
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      } else if (!e.metaKey && !e.ctrlKey && !e.altKey) {
        // Chapter 1-9 fast warp keys
        const num = parseInt(e.key, 10);
        if (num >= 1 && num <= 9) {
          const target = document.getElementById(`chapter-${num}`);
          if (target) {
            sfx.playWhoosh();
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const shortcuts = [
    { key: 'K', label: 'Command Palette', desc: 'Search chapters, foods, bosses & cheat codes' },
    { key: 'C', label: 'Hunter Status Console', desc: 'Vitals, 1RM compound projections, equipped gear' },
    { key: 'M', label: 'Audio & Synth Pulse', desc: 'Toggle 120 BPM anime dungeon pulse and SFX' },
    { key: '1 - 9', label: 'Fast Chapter Warp', desc: 'Direct teleport to Chapter 01 through Chapter 09' },
    { key: '?', label: 'Shortcuts Help', desc: 'Open / close this Hunter Keyboard Legend' },
    { key: 'ESC', label: 'Close Modals', desc: 'Dismiss active console or search overlays' },
  ];

  return (
    <>
      {/* Floating Mini Trigger Icon in Bottom-Left Dock */}
      <div className="fixed bottom-6 left-6 z-40 hidden sm:block">
        <button
          onClick={() => {
            sfx.playMenuOpen();
            setIsOpen(true);
          }}
          className="p-3 rounded-xl bg-black/85 backdrop-blur-md border border-cyan-500/40 text-cyan-400 hover:text-white hover:border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.2)] hover:shadow-[0_0_25px_rgba(0,240,255,0.5)] transition-all cursor-pointer flex items-center gap-2 font-mono text-xs"
          title="Hunter Keyboard Shortcuts (Press ?)"
        >
          <Keyboard className="w-4 h-4" />
          <span className="hidden lg:inline">[ HOTKEYS ]</span>
          <span className="px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-[10px]">?</span>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-lg bg-[#080713] border border-cyan-500/50 rounded-2xl shadow-[0_0_50px_rgba(0,240,255,0.3)] overflow-hidden flex flex-col z-10"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-cyan-500/20 bg-cyan-950/30">
                <div className="flex items-center gap-2">
                  <Keyboard className="w-4 h-4 text-cyan-400" />
                  <span className="font-orbitron font-bold text-sm text-white tracking-wider uppercase">
                    SYSTEM HOTKEY PROTOCOLS
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body */}
              <div className="p-5 space-y-3">
                {shortcuts.map((sc) => (
                  <div
                    key={sc.key}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-black/50 border border-white/5 hover:border-cyan-500/30 transition-colors"
                  >
                    <div>
                      <div className="font-heading font-bold text-sm text-cyan-200">
                        {sc.label}
                      </div>
                      <div className="text-xs text-gray-400 font-sans mt-0.5">
                        {sc.desc}
                      </div>
                    </div>
                    <span className="font-mono text-xs px-2.5 py-1 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-bold tracking-wider">
                      {sc.key}
                    </span>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="px-5 py-3 bg-black/70 border-t border-cyan-500/10 flex items-center justify-between font-mono text-[11px] text-gray-500">
                <span>PRESS [ESC] OR [?] TO DISMISS</span>
                <span className="text-cyan-400/80">STANDALONE HUNTER INTERACTION</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
