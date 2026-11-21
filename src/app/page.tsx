"use client";

import { useState } from "react";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Preloader } from "@/components/Preloader";
import { ColorGradeManager } from "@/components/ColorGradeManager";
import { AudioProvider } from "@/components/AudioPlayer";
import { SystemNoticeModal } from "@/components/SystemNoticeModal";
import { SystemHeader } from "@/components/SystemHeader";
import { Chapter1 } from "@/components/chapters/Chapter1";
import { Chapter2 } from "@/components/chapters/Chapter2";
import { Chapter3 } from "@/components/chapters/Chapter3";
import { ShieldAlert } from "lucide-react";

export default function Home() {
  const [awakened, setAwakened] = useState(false);

  return (
    <AudioProvider>
      <SmoothScroll>
        <Preloader />
        <ColorGradeManager />
        <SystemNoticeModal onAwaken={() => setAwakened(true)} />
        <SystemHeader />

        <main className="relative z-10 w-full min-h-screen">
          {/* Phase 1 Narrative Journey */}
          <Chapter1 />
          <Chapter2 />
          <Chapter3 />

          {/* Phase 1 Completion Terminal Banner */}
          <section className="relative w-full py-16 px-4 sm:px-8 border-t border-system-accent/20 bg-[#07060D] text-center overflow-hidden">
            <div className="absolute inset-0 bg-radial-gradient from-system-accent/10 to-transparent pointer-events-none" />
            <div className="relative z-10 max-w-2xl mx-auto system-window corner-brackets p-6 sm:p-8 rounded space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-system-accent/20 border border-system-accent/40 rounded text-xs font-mono text-system-accent uppercase">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>PHASE 01 TRIAL COMPLETED</span>
              </div>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold uppercase tracking-wider text-system-text">
                DUNGEON RECONNAISSANCE LOCKED.
              </h3>
              <p className="font-inter text-xs sm:text-sm text-system-muted max-w-lg mx-auto">
                You have witnessed the initial awakening, the system assignment, and the gym floor clearance. Next trials (Ch4 Discipline, Ch5 Food Weapon, Ch6 Enemies, Ch7 Rank Evolution) will unlock in Phase 2.
              </p>
              <div className="pt-2 flex flex-wrap justify-center gap-4 text-xs font-mono text-system-muted">
                <span>LATENCY: 60 FPS</span>
                <span>•</span>
                <span>GRADE: COLD BLUE → VIOLET</span>
                <span>•</span>
                <span>AUDIO: DARK ARIA LV2</span>
              </div>
            </div>
          </section>
        </main>
      </SmoothScroll>
    </AudioProvider>
  );
}
