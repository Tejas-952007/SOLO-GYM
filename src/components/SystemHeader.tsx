"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Shield, Sparkles, RefreshCw } from "lucide-react";
import { AudioEqualizerButton } from "@/components/AudioPlayer";
import { GlitchText } from "@/components/GlitchText";
import { sfx } from "@/lib/audio-sfx";

export function SystemHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentRank, setCurrentRank] = useState({
    rank: "RANK E",
    title: "WEAKEST HUNTER",
    color: "text-system-cyan",
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 40);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (scrollY / totalHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));

      // Detect active chapter based on scroll position
      const chapters = [
        { id: "chapter-9", rank: "RANK S+", title: "SHADOW SOVEREIGN", color: "text-system-gold" },
        { id: "chapter-8", rank: "RANK S", title: "STRATEGIC MASTER", color: "text-yellow-400" },
        { id: "chapter-7", rank: "RANK A+", title: "MONARCH CANDIDATE", color: "text-purple-400" },
        { id: "chapter-6", rank: "RANK A", title: "BERSERK UNLEASHED", color: "text-red-400" },
        { id: "chapter-5", rank: "RANK B", title: "NUTRITION ALCHEMIST", color: "text-emerald-400" },
        { id: "chapter-4", rank: "RANK C+", title: "DISCIPLINE FORGED", color: "text-blue-400" },
        { id: "chapter-3", rank: "RANK C", title: "DUNGEON CONQUEROR", color: "text-system-cyan" },
        { id: "chapter-2", rank: "RANK D", title: "SYSTEM AWAKENED", color: "text-system-cyan" },
        { id: "chapter-1", rank: "RANK E", title: "WEAKEST HUNTER", color: "text-system-cyan" },
      ];

      const current = chapters.find((ch) => {
        const el = document.getElementById(ch.id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= window.innerHeight * 0.45;
      });

      if (current) {
        setCurrentRank({ rank: current.rank, title: current.title, color: current.color });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleResetAwakening = () => {
    try {
      sessionStorage.removeItem("level_up_system_accepted");
      window.location.reload();
    } catch {
      window.location.reload();
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-4 sm:px-8 py-2.5 sm:py-3.5 flex items-center justify-between ${
        scrolled
          ? "bg-[#07060D]/90 backdrop-blur-md border-b border-system-accent/25 shadow-system-glow"
          : "bg-transparent"
      }`}
    >
      {/* Top Real-time Mana XP Progress Line */}
      <div
        className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-system-cyan via-purple-500 to-system-gold transition-all duration-150 shadow-[0_0_12px_rgba(56,189,248,0.85)] pointer-events-none"
        style={{ width: `${scrollProgress}%` }}
      />
      {/* Brand & Official Gothic HUD Badge + Solo Leveling Calligraphy */}
      <div className="flex items-center gap-2 sm:gap-3">
        <a
          href="#chapter-1"
          className="flex items-center gap-2 sm:gap-3 group"
          onMouseEnter={() => sfx.playHover()}
        >
          {/* Official Transparent LEVEL UP HUD Badge */}
          <div className="relative h-8 sm:h-9 w-auto flex items-center">
            <Image
              src="/assets/logo/hud-level-up-badge-transparent.png"
              alt="LEVEL UP Hunter RPG System Badge"
              width={150}
              height={50}
              priority
              className="h-7 sm:h-8 w-auto object-contain filter drop-shadow-[0_0_12px_rgba(56,189,248,0.7)] group-hover:drop-shadow-[0_0_20px_rgba(139,92,246,0.9)] transition-all"
            />
          </div>

          <div className="hidden sm:block h-5 w-px bg-system-cyan/30" />

          {/* Gothic Solo Leveling Spiky Title Emblem */}
          <div className="hidden md:flex relative h-7 sm:h-8 w-28 items-center overflow-hidden">
            <Image
              src="/assets/logo/solo-leveling-gothic-title.png"
              alt="Solo Leveling Gothic Typography"
              fill
              className="object-contain object-left filter brightness-125 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)] group-hover:brightness-150 group-hover:drop-shadow-[0_0_18px_rgba(168,85,247,1)] transition-all"
            />
          </div>
        </a>
      </div>

      {/* Center Dynamic Rank & XP HUD Indicator */}
      <div className="hidden lg:flex items-center gap-3 px-3.5 py-1 bg-black/75 backdrop-blur-md border border-system-accent/30 rounded font-mono text-xs shadow-md">
        <span
          className={`w-2 h-2 rounded-full ${
            currentRank.color === "text-system-gold"
              ? "bg-system-gold shadow-[0_0_8px_#f5c542]"
              : currentRank.color === "text-red-400"
              ? "bg-red-500 shadow-[0_0_8px_#ef4444]"
              : currentRank.color === "text-purple-400"
              ? "bg-purple-400 shadow-[0_0_8px_#a855f7]"
              : "bg-system-cyan shadow-[0_0_8px_#38bdf8]"
          } animate-pulse`}
        />
        <span className="text-system-muted">STATUS:</span>
        <GlitchText
          text={`${currentRank.rank} // ${currentRank.title}`}
          className={`${currentRank.color} font-bold tracking-wider uppercase transition-colors duration-300`}
        />
        <span className="text-[10px] text-system-muted/80 border-l border-white/10 pl-2 hidden xl:inline">
          XP: <strong className="text-white">{Math.round(scrollProgress * 99 + 100)}</strong> / 10,000
        </span>
      </div>

      {/* Right Controls: Audio + Re-Awaken + Action */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Dark Aria Audio Toggle */}
        <AudioEqualizerButton />

        {/* Reset Awakening Session */}
        <button
          onClick={handleResetAwakening}
          title="Re-open System Awakening Modal"
          className="flex items-center gap-1.5 px-2.5 py-1.5 bg-black/50 hover:bg-system-accent/20 border border-white/10 hover:border-system-accent/50 rounded text-[11px] font-mono text-system-muted hover:text-system-accent transition-all cursor-pointer"
        >
          <RefreshCw className="w-3 h-3" />
          <span className="hidden md:inline">[ RE-AWAKEN ]</span>
        </button>

        <a
          href="#chapter-3"
          className="px-3.5 py-1.5 bg-system-accent hover:bg-white text-black font-orbitron text-xs font-bold tracking-wider rounded transition-all duration-200 shadow-system-glow active:scale-95"
        >
          DUNGEON
        </a>
      </div>
    </header>
  );
}
