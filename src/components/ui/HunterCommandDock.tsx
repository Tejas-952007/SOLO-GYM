"use client";

import { Award, Terminal, Keyboard } from "lucide-react";
import { sfx } from "@/lib/audio-sfx";

interface HunterCommandDockProps {
  onOpenCommand: () => void;
}

export function HunterCommandDock({ onOpenCommand }: HunterCommandDockProps) {
  const handleOpenConsole = () => {
    sfx.playRankAscent();
    window.dispatchEvent(new CustomEvent("open-hunter-console"));
  };

  const handleOpenHotkeys = () => {
    sfx.playMenuOpen();
    window.dispatchEvent(new CustomEvent("open-keyboard-shortcuts"));
  };

  return (
    <>
      {/* Desktop: Unified, Minimalist Obsidian Command Capsule */}
      <div className="fixed bottom-4 right-5 z-40 hidden md:flex items-center gap-1.5 p-1 bg-black/85 backdrop-blur-md border border-white/10 rounded-full shadow-[0_0_25px_rgba(0,0,0,0.8)]">
        {/* Hotkeys */}
        <button
          onClick={handleOpenHotkeys}
          onMouseEnter={() => sfx.playHover()}
          className="px-2.5 py-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-all flex items-center gap-1.5 font-mono text-[11px] cursor-pointer"
          title="Open Hotkeys Legend (?)"
        >
          <Keyboard className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-[10px] text-gray-500">[?]</span>
        </button>

        <div className="w-px h-3.5 bg-white/10" />

        {/* Command Palette */}
        <button
          onClick={onOpenCommand}
          onMouseEnter={() => sfx.playHover()}
          className="px-3 py-1.5 rounded-full hover:bg-cyan-950/60 text-cyan-300 hover:text-cyan-200 border border-transparent hover:border-cyan-500/30 transition-all flex items-center gap-1.5 font-mono text-[11px] font-bold cursor-pointer"
          title="Open Dimensional Grimoire (K / Cmd+K)"
        >
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span>COMMAND</span>
          <span className="text-[9px] px-1 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">K</span>
        </button>

        <div className="w-px h-3.5 bg-white/10" />

        {/* Hunter Status Console */}
        <button
          onClick={handleOpenConsole}
          onMouseEnter={() => sfx.playHover()}
          className="px-3 py-1.5 rounded-full bg-system-gold/15 hover:bg-system-gold/25 text-system-gold border border-system-gold/40 hover:border-system-gold/70 transition-all flex items-center gap-1.5 font-mono text-[11px] font-bold shadow-[0_0_12px_rgba(245,197,66,0.3)] cursor-pointer"
          title="Open Hunter Character Sheet (C)"
        >
          <Award className="w-3.5 h-3.5 text-system-gold animate-pulse" />
          <span>STATUS</span>
          <span className="text-[9px] px-1 py-0.2 rounded bg-system-gold/20 text-system-gold border border-system-gold/40">C</span>
        </button>
      </div>
    </>
  );
}
