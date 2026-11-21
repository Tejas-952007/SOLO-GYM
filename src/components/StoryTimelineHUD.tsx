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
        className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col items-end gap-3 select-none pointer-events-auto"
      >
        {/* Current Active Status Widget */}
        <div className="system-window corner-brackets px-3 py-1.5 rounded text-right mb-2 backdrop-blur-md">
          <div className="font-mono text-[9px] text-system-accent tracking-widest uppercase">
            DUNGEON DEPTH: {scrollProgress.toFixed(0)}%
          </div>
          <div className="font-cinzel text-xs font-bold text-system-text uppercase tracking-wider flex items-center gap-1.5 justify-end">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                currentChapter.rank === "S" ? "bg-system-gold animate-ping" : "bg-system-accent"
              }`}
            />
            <span>CH {currentChapter.num}: {currentChapter.title}</span>
          </div>
          <div className="font-mono text-[9px] text-system-muted">
            HUNTER POTENTIAL: <span className="text-system-gold font-bold">RANK {currentChapter.rank}</span>
          </div>
        </div>

        {/* 9 Vertical Nodes */}
        <div className="flex flex-col items-center gap-2 relative py-2">
          {/* Vertical Connecting Line */}
          <div className="absolute top-2 bottom-2 w-px bg-system-accent/20 -z-10" />

          {CHAPTERS.map((ch, idx) => {
            const isActive = activeChapterIndex === idx;
            const isPassed = activeChapterIndex > idx;

            return (
              <button
                key={ch.id}
                onClick={() => scrollToChapter(ch.id)}
                onMouseEnter={() => sfx.playHover()}
                className="group flex items-center gap-2 text-right relative focus:outline-none"
              >
                {/* Hover Tooltip Label */}
                <span className="opacity-0 group-hover:opacity-100 transition-opacity font-mono text-[10px] text-system-text bg-system-panel px-2 py-0.5 rounded border border-system-accent/30 pointer-events-none shadow-lg">
                  {ch.num}. {ch.title}
                </span>

                {/* Node Pill */}
                <div
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 border flex items-center justify-center ${
                    isActive
                      ? "w-4 h-4 bg-system-accent border-system-glow shadow-[0_0_12px_rgba(139,92,246,0.8)] scale-110"
                      : isPassed
                      ? "bg-system-accent/50 border-system-accent/40"
                      : "bg-black/60 border-white/20 group-hover:border-system-accent"
                  }`}
                >
                  {isActive && (
                    <span className="w-1 h-1 rounded-full bg-white animate-pulse" />
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
