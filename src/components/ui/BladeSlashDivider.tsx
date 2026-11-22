"use client";

import { Swords, Sparkles } from "lucide-react";
import { sfx } from "@/lib/audio-sfx";

interface BladeSlashDividerProps {
  label: string;
  sub?: string;
  theme?: "cyan" | "violet" | "gold" | "red";
}

export function BladeSlashDivider({
  label,
  sub = "DIMENSIONAL RIFT TRANSITION",
  theme = "cyan",
}: BladeSlashDividerProps) {
  const themeConfig = {
    cyan: {
      line: "from-transparent via-system-cyan to-transparent",
      badge: "border-system-cyan/50 text-system-cyan bg-[#07060D]/90 shadow-[0_0_20px_rgba(56,189,248,0.4)]",
      glow: "bg-system-cyan/20",
    },
    violet: {
      line: "from-transparent via-purple-500 to-transparent",
      badge: "border-purple-500/50 text-purple-300 bg-[#07060D]/90 shadow-[0_0_20px_rgba(168,85,247,0.4)]",
      glow: "bg-purple-500/20",
    },
    gold: {
      line: "from-transparent via-system-gold to-transparent",
      badge: "border-system-gold/50 text-system-gold bg-[#07060D]/90 shadow-[0_0_20px_rgba(245,197,66,0.4)]",
      glow: "bg-system-gold/20",
    },
    red: {
      line: "from-transparent via-red-500 to-transparent",
      badge: "border-red-500/50 text-red-400 bg-[#07060D]/90 shadow-[0_0_20px_rgba(239,68,68,0.4)]",
      glow: "bg-red-500/20",
    },
  }[theme];

  return (
    <div
      onMouseEnter={() => sfx.playHover()}
      className="relative w-full py-8 sm:py-12 flex items-center justify-center overflow-hidden pointer-events-auto select-none my-[-24px] z-20"
    >
      {/* Background Volumetric Glow Pulse */}
      <div className={`absolute w-3/4 h-8 rounded-full ${themeConfig.glow} blur-2xl pointer-events-none`} />

      {/* Razor-Sharp Diagonal Laser Slash Line */}
      <div className="absolute inset-x-0 h-[1.5px] flex items-center">
        <div className={`w-full h-full bg-gradient-to-r ${themeConfig.line} opacity-75`} />
      </div>

      {/* High-Tech Central Dimensional Knot */}
      <div
        className={`relative z-10 px-4 py-1.5 rounded-full border backdrop-blur-md flex items-center gap-2 font-mono text-[10px] sm:text-xs tracking-widest uppercase transition-all hover:scale-105 duration-200 cursor-default ${themeConfig.badge}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
        <Swords className="w-3.5 h-3.5 animate-pulse" />
        <span className="font-bold">{label}</span>
        <span className="opacity-50 hidden sm:inline">•</span>
        <span className="text-[9px] opacity-70 hidden sm:inline">{sub}</span>
      </div>
    </div>
  );
}
