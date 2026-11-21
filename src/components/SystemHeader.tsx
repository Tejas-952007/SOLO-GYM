"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Shield, Sparkles, RefreshCw } from "lucide-react";
import { AudioEqualizerButton } from "@/components/AudioPlayer";
import { GlitchText } from "@/components/GlitchText";

export function SystemHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
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
      {/* Brand & Gothic Thorn System Logo */}
      <div className="flex items-center gap-3">
        <a href="#chapter-1" className="flex items-center gap-2 group">
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded border border-system-accent/40 bg-black/60 flex items-center justify-center p-1 shadow-system-glow group-hover:border-system-accent transition-colors overflow-hidden">
            <Image
              src="/assets/logo/level-up-logo.png"
              alt="Level Up Sigil"
              width={40}
              height={40}
              className="object-contain filter brightness-125 contrast-125 group-hover:scale-110 transition-transform"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-cinzel text-lg sm:text-xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-system-text to-purple-300 group-hover:text-glow-accent transition-all">
                LEVEL UP
              </span>
            </div>
            <span className="font-mono text-[8px] sm:text-[9px] tracking-wideSystem text-system-cyan uppercase block -mt-0.5">
              HUNTER RPG SYSTEM
            </span>
          </div>
        </a>
      </div>

      {/* Center Rank HUD Indicator */}
      <div className="hidden lg:flex items-center gap-2.5 px-3 py-1 bg-black/60 border border-system-accent/30 rounded font-mono text-xs">
        <span className="w-2 h-2 rounded-full bg-system-cyan animate-ping" />
        <span className="text-system-muted">STATUS:</span>
        <GlitchText
          text="RANK E // UNRANKED"
          className="text-system-cyan font-bold tracking-wider uppercase"
        />
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
