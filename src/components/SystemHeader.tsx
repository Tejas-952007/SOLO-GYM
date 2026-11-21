"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Shield, Sparkles, RefreshCw } from "lucide-react";
import { AudioEqualizerButton } from "@/components/AudioPlayer";
import { GlitchText } from "@/components/GlitchText";
import { sfx } from "@/lib/audio-sfx";

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
