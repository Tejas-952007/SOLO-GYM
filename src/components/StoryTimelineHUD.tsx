"use client";

import { useEffect, useState } from "react";
import { sfx } from "@/lib/audio-sfx";

interface ChapterNode {
  id: string;
  num: string;
  title: string;
  rank: string;
}

const CHAPTERS: ChapterNode[] = [
  { id: "chapter-1", num: "01", title: "RANK E", rank: "E" },
  { id: "chapter-2", num: "02", title: "THE SYSTEM", rank: "E" },
  { id: "chapter-3", num: "03", title: "THE DUNGEON", rank: "D" },
  { id: "chapter-4", num: "04", title: "DISCIPLINE", rank: "D" },
  { id: "chapter-5", num: "05", title: "FOOD WEAPON", rank: "C" },
  { id: "chapter-6", num: "06", title: "THE ENEMIES", rank: "B" },
  { id: "chapter-7", num: "07", title: "RANK UP", rank: "A" },
  { id: "chapter-8", num: "08", title: "AI COACH", rank: "S" },
  { id: "chapter-9", num: "09", title: "ARISE", rank: "S" },
];

export function StoryTimelineHUD() {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = totalHeight > 0 ? (currentScroll / totalHeight) * 100 : 0;
      setScrollProgress(Math.min(Math.max(progress, 0), 100));

      // Calculate which chapter is in view
      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      for (let i = CHAPTERS.length - 1; i >= 0; i--) {
        const el = document.getElementById(CHAPTERS[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveChapterIndex(i);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToChapter = (id: string) => {
    sfx.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const currentChapter = CHAPTERS[activeChapterIndex];

  return (
    <>
      {/* 1. Mobile Top Horizontal Micro-Progress Bar */}
      <div className="fixed top-14 left-0 right-0 h-0.5 bg-black/40 z-30 lg:hidden pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-system-accent to-system-gold transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* 2. Desktop Right-Hand Vertical HUD Tracker */}
      <aside
        aria-label="Story Progression Timeline"
        className="fixed right-3 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col items-center select-none pointer-events-auto"
      >
        {/* 9 Minimalist Vertical Chapter Nodes */}
        <div className="flex flex-col items-center gap-2.5 relative py-2">
          {/* Vertical Connecting Line */}
          <div className="absolute top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent -z-10" />

          {CHAPTERS.map((ch, idx) => {
            const isActive = activeChapterIndex === idx;
            const isPassed = activeChapterIndex > idx;

            return (
              <button
                key={ch.id}
                onClick={() => scrollToChapter(ch.id)}
                onMouseEnter={() => sfx.playHover()}
                className="group flex items-center justify-center relative focus:outline-none cursor-pointer"
                aria-label={`Jump to Chapter ${ch.num}: ${ch.title}`}
              >
                {/* Tactical Flyout Label on Hover Only */}
                <div className="absolute right-6 px-2.5 py-1 rounded bg-black/90 backdrop-blur-md border border-cyan-500/40 text-right opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap shadow-2xl z-40">
                  <div className="font-mono text-[9px] text-cyan-400 font-bold uppercase tracking-wider">
                    CH {ch.num} // RANK {ch.rank}
                  </div>
                  <div className="font-cinzel text-[11px] text-white font-bold tracking-wide">
                    {ch.title}
                  </div>
                </div>

                {/* Node Pill */}
                <div
                  className={`rounded-full transition-all duration-300 border flex items-center justify-center ${
                    isActive
                      ? "w-4 h-4 bg-cyan-400 border-white shadow-[0_0_15px_rgba(0,240,255,0.9)] scale-110"
                      : isPassed
                      ? "w-2.5 h-2.5 bg-purple-500/60 border-purple-400/50 hover:scale-125 hover:bg-white"
                      : "w-2 h-2 bg-black/60 border-white/25 hover:scale-125 hover:border-cyan-400"
                  }`}
                >
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </aside>
    </>
  );
}
