"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Bot, Shield, Trophy, Flame, CheckCircle2 } from "lucide-react";
import { BladeSliceHeading } from "@/components/ui/BladeSliceHeading";
import { AnimeTiltCard } from "@/components/ui/AnimeTiltCard";
import { DailyDisciplineFlame } from "@/components/ui/DailyDisciplineFlame";
import { WaterCreatineWidget } from "@/components/ui/WaterCreatineWidget";
import { AnimeGymSynthEngine } from "@/components/ui/AnimeGymSynthEngine";
import { RpeCalculator } from "@/components/ui/RpeCalculator";
import { spawnCombatNumber } from "@/components/effects/FloatingDamageNumbers";
import { sfx } from "@/lib/audio-sfx";

interface MentorCard {
  id: number;
  image: string;
  tag: string;
  title: string;
  quote: string;
  desc: string;
}

const MENTOR_CARDS: MentorCard[] = [
  {
    id: 1,
    image: "/assets/04-discipline/mentor-milk-basics.webp",
    tag: "PRINCIPLE 01 // BASICS",
    title: "CARRY THE MILK. EVERY DAY.",
    quote: '"Boring basics build monsters."',
    desc: "No magic supplements. 150g protein, progressive overload, 8 hours sleep. Repeat 365 times without excuse.",
  },
  {
    id: 2,
    image: "/assets/04-discipline/train-handstand.webp",
    tag: "PRINCIPLE 02 // INTENSITY",
    title: "FAILURE IS THE ONLY DATA",
    quote: '"If you did not struggle, the rep did not count."',
    desc: "Train at RPE 8-10. Track the micro-weights. The System measures every single gram of iron lifted.",
  },
  {
    id: 3,
    image: "/assets/04-discipline/mentor-suit-rain.webp",
    tag: "PRINCIPLE 03 // THE COACH",
    title: "NUMBERS, NOT SPEECHES",
    quote: '"I do not give pep talks. I give gram targets."',
    desc: "The Level Up AI Coach analyzes your desi meals with numeric precision: exact calories, protein deficit, and recovery timing.",
  },
];

export function Chapter4() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [committedCards, setCommittedCards] = useState<Record<number, boolean>>({});
  const [disciplineTab, setDisciplineTab] = useState<'streak' | 'hydration' | 'rpe' | 'synthwave'>('streak');
  const [mobileCh4Tab, setMobileCh4Tab] = useState<'p1' | 'p2' | 'p3' | 'habits'>('p1');

  const toggleCommitment = (id: number, title: string) => {
    setCommittedCards((prev) => {
      const isNow = !prev[id];
      if (isNow) {
        sfx.playStatPointAlloc();
        spawnCombatNumber(`+50 DISCIPLINE XP! [CARD 0${id}]`, undefined, undefined, "stat");
      } else {
        sfx.playClick();
      }
      return { ...prev, [id]: isNow };
    });
  };

  useEffect(() => {
    const el = containerRef.current;
    const track = trackRef.current;
    if (!el || !track) return;

    const mm = gsap.matchMedia();

    // Desktop: Pinned Horizontal Scroll (>= 768px)
    mm.add("(min-width: 768px)", () => {
      const scrollWidth = track.scrollWidth - window.innerWidth + 120;

      gsap.to(track, {
        x: () => -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${scrollWidth + 400}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="chapter-4"
      ref={containerRef}
      className="relative w-full bg-[#07060D] overflow-hidden"
    >
      {/* Seamless Volumetric Fog Portal Transition from Chapter 3 */}
      <div className="absolute top-0 inset-x-0 h-36 bg-gradient-to-b from-[#07060D] via-[#07060D]/80 to-transparent pointer-events-none z-20" />

      <div className="w-full min-h-0 md:min-h-[100svh] flex flex-col justify-center px-4 sm:px-8 py-10 sm:py-20 relative">
        {/* Section Header */}
        <div className="relative z-10 w-full max-w-6xl mx-auto mb-4 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-system-blue/40 border border-system-accent/30 rounded text-xs font-mono tracking-wideSystem text-system-accent uppercase mb-2">
            <Bot className="w-3.5 h-3.5" />
            <span>PHASE 04 // MENTOR PROTOCOL</span>
          </div>
          <BladeSliceHeading
            as="h2"
            accentText="NO EXCUSES."
            className="font-cinzel text-2xl sm:text-5xl font-black uppercase tracking-wider text-system-text"
          >
            DISCIPLINE BEATS MOTIVATION.
          </BladeSliceHeading>
          <p className="font-inter text-xs sm:text-base text-system-muted max-w-xl">
            A coach that gives you exact numbers, not speeches. Meet your AI Hunter Mentor.
          </p>
        </div>

        {/* Mobile Single-Tier Module Switcher (Absolute Zero Clutter) */}
        <div className="flex md:hidden items-center justify-between gap-1 p-1 bg-black/70 border border-system-accent/30 rounded-xl my-4 font-mono text-[11px] w-full max-w-md mx-auto relative z-20">
          <button
            onClick={() => {
              sfx.playClick();
              setMobileCh4Tab('p1');
            }}
            className={`flex-1 py-2 rounded-lg font-bold transition-all text-center ${mobileCh4Tab === 'p1'
              ? 'bg-blue-600 text-white shadow-[0_0_12px_rgba(59,130,246,0.5)]'
              : 'text-system-muted hover:text-white'
              }`}
          >
            01 BASICS
          </button>
          <button
            onClick={() => {
              sfx.playClick();
              setMobileCh4Tab('p2');
            }}
            className={`flex-1 py-2 rounded-lg font-bold transition-all text-center ${mobileCh4Tab === 'p2'
              ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.5)]'
              : 'text-system-muted hover:text-white'
              }`}
          >
            02 INTENSITY
          </button>
          <button
            onClick={() => {
              sfx.playClick();
              setMobileCh4Tab('p3');
            }}
            className={`flex-1 py-2 rounded-lg font-bold transition-all text-center ${mobileCh4Tab === 'p3'
              ? 'bg-cyan-600 text-white shadow-[0_0_12px_rgba(6,182,212,0.5)]'
              : 'text-system-muted hover:text-white'
              }`}
          >
            03 COACH
          </button>
          <button
            onClick={() => {
              sfx.playClick();
              setMobileCh4Tab('habits');
            }}
            className={`flex-1 py-2 rounded-lg font-bold transition-all text-center ${mobileCh4Tab === 'habits'
              ? 'bg-amber-600 text-white shadow-[0_0_12px_rgba(245,158,11,0.5)]'
              : 'text-system-muted hover:text-white'
              }`}
          >
            ⚡ HABITS
          </button>
        </div>

        {/* Section 1: Mentor Principles (Desktop: Horizontal Scroll Track; Mobile: Single Active Card) */}
        <div className={`relative w-full ${mobileCh4Tab !== 'habits' ? 'block' : 'hidden md:block'}`}>
          {/* Mobile Single Active Card */}
          <div className="block md:hidden">
            {(() => {
              const activeId = mobileCh4Tab === 'p1' ? 1 : mobileCh4Tab === 'p2' ? 2 : 3;
              const card = MENTOR_CARDS.find((c) => c.id === activeId) || MENTOR_CARDS[0];
              return (
                <AnimeTiltCard
                  maxTilt={6}
                  glowColor="rgba(139, 92, 246, 0.35)"
                  className="w-full"
                >
                  <div className="w-full system-window corner-brackets rounded-lg overflow-hidden border border-system-accent/30 shadow-system-glow flex flex-col">
                    <div className="relative w-full h-[210px] overflow-hidden bg-black">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        priority
                        sizes="100vw"
                        className={`object-cover filter contrast-115 brightness-105 ${card.id === 3 ? "object-[center_25%]" : "object-center"
                          }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#120F24] via-transparent to-transparent pointer-events-none" />
                      <div className="absolute top-3 left-3 bg-black/80 border border-system-accent/40 px-2.5 py-1 rounded text-[10px] font-mono text-system-cyan">
                        {card.tag}
                      </div>
                    </div>
                    <div className="p-3.5 space-y-2.5">
                      <div className="space-y-1.5">
                        <h3 className="font-cinzel text-lg font-bold uppercase text-system-text tracking-wide leading-tight">
                          {card.title}
                        </h3>
                        <div className="font-mono text-xs text-system-gold italic">
                          {card.quote}
                        </div>
                        <p className="font-inter text-xs text-system-muted leading-relaxed">
                          {card.desc}
                        </p>
                      </div>
                      <button
                        onClick={() => toggleCommitment(card.id, card.title)}
                        className={`w-full py-2.5 px-3 rounded font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${committedCards[card.id]
                          ? "bg-emerald-950/60 border border-emerald-500 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                          : "bg-system-accent/15 hover:bg-system-accent/30 border border-system-accent/40 text-system-text"
                          }`}
                      >
                        {committedCards[card.id] ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>[ PROTOCOL COMMITTED ]</span>
                          </>
                        ) : (
                          <span>[ ACCEPT DISCIPLINE CODE ]</span>
                        )}
                      </button>
                    </div>
                  </div>
                </AnimeTiltCard>
              );
            })()}
          </div>

          {/* Desktop Horizontal Scrolling Track */}
          <div className="hidden md:block relative w-full overflow-visible">
            <div
              ref={trackRef}
              className="flex flex-row gap-6 md:gap-8 will-change-transform md:w-max md:px-8"
            >
              {MENTOR_CARDS.map((card) => (
                <AnimeTiltCard
                  key={card.id}
                  maxTilt={10}
                  glowColor="rgba(139, 92, 246, 0.35)"
                  className="w-full md:w-[440px] shrink-0"
                >
                  <div
                    onMouseEnter={() => sfx.playHover()}
                    className="w-full system-window corner-brackets rounded-lg overflow-hidden border border-system-accent/30 shadow-system-glow flex flex-col hover:border-system-accent transition-all duration-300"
                  >
                    {/* Image Frame with Precise Facial Focal Framing */}
                    <div className="relative w-full h-[260px] sm:h-[300px] overflow-hidden bg-black">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 440px"
                        className={`object-cover filter contrast-115 brightness-105 ${card.id === 3 ? "object-[center_25%]" : "object-center"
                          }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#120F24] via-transparent to-transparent pointer-events-none" />
                      <div className="absolute top-3 left-3 bg-black/80 border border-system-accent/40 px-2.5 py-1 rounded text-[10px] font-mono text-system-cyan">
                        {card.tag}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <h3 className="font-cinzel text-xl sm:text-2xl font-bold uppercase text-system-text tracking-wide leading-tight">
                          {card.title}
                        </h3>
                        <div className="font-mono text-xs text-system-gold italic">
                          {card.quote}
                        </div>
                        <p className="font-inter text-xs sm:text-sm text-system-muted leading-relaxed">
                          {card.desc}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-system-accent/20 flex items-center justify-between text-[11px] font-mono text-system-muted">
                        <span className="flex items-center gap-1.5 text-system-cyan">
                          <Shield className="w-3 h-3" />
                          <span>HUNTER DISCIPLINE +50 XP</span>
                        </span>
                        <span className="text-system-accent font-bold">
                          CARD 0{card.id}/03
                        </span>
                      </div>

                      {/* Interactive Commitment Button */}
                      <button
                        onClick={() => toggleCommitment(card.id, card.title)}
                        className={`w-full py-2 px-3 rounded font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${committedCards[card.id]
                          ? "bg-emerald-950/60 border border-emerald-500 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                          : "bg-system-accent/15 hover:bg-system-accent/30 border border-system-accent/40 text-system-text"
                          }`}
                      >
                        {committedCards[card.id] ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>[ PROTOCOL COMMITTED ]</span>
                          </>
                        ) : (
                          <span>[ ACCEPT DISCIPLINE CODE ]</span>
                        )}
                      </button>
                    </div>
                  </div>
                </AnimeTiltCard>
              ))}
            </div>
          </div>
        </div>

        {/* Hunter Daily Habit & Discipline Terminal */}
        <div className={`w-full max-w-6xl mx-auto mt-10 relative z-10 font-mono ${mobileCh4Tab === 'habits' ? 'block' : 'hidden md:block'}`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-system-accent/25 pb-3 mb-6 gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
                [ HUNTER HABIT PROTOCOL // NON-NEGOTIABLES ]
              </span>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                onClick={() => {
                  sfx.playClick();
                  setDisciplineTab('streak');
                }}
                onMouseEnter={() => sfx.playHover()}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${disciplineTab === 'streak'
                  ? 'bg-amber-600 text-white border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                  : 'bg-black/50 border-white/10 text-gray-400 hover:text-white hover:border-amber-500/30'
                  }`}
              >
                🔥 7-DAY STREAK FLAME
              </button>

              <button
                onClick={() => {
                  sfx.playClick();
                  setDisciplineTab('hydration');
                }}
                onMouseEnter={() => sfx.playHover()}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${disciplineTab === 'hydration'
                  ? 'bg-cyan-600 text-white border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'bg-black/50 border-white/10 text-gray-400 hover:text-white hover:border-cyan-500/30'
                  }`}
              >
                💧 HYDRATION & CREAPURE
              </button>

              <button
                onClick={() => {
                  sfx.playClick();
                  setDisciplineTab('rpe');
                }}
                onMouseEnter={() => sfx.playHover()}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${disciplineTab === 'rpe'
                  ? 'bg-purple-600 text-white border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                  : 'bg-black/50 border-white/10 text-gray-400 hover:text-white hover:border-purple-500/30'
                  }`}
              >
                🎯 RPE & RIR DIAL
              </button>

              <button
                onClick={() => {
                  sfx.playClick();
                  setDisciplineTab('synthwave');
                }}
                onMouseEnter={() => sfx.playHover()}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${disciplineTab === 'synthwave'
                  ? 'bg-indigo-600 text-white border-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.4)]'
                  : 'bg-black/50 border-white/10 text-gray-400 hover:text-white hover:border-indigo-500/30'
                  }`}
              >
                🎧 SYNTHWAVE STUDIO
              </button>
            </div>
          </div>

          {/* Active Discipline Module */}
          <div className="w-full">
            {disciplineTab === 'streak' && <DailyDisciplineFlame />}
            {disciplineTab === 'hydration' && <WaterCreatineWidget />}
            {disciplineTab === 'rpe' && <RpeCalculator />}
            {disciplineTab === 'synthwave' && <AnimeGymSynthEngine />}
          </div>
        </div>
      </div>
    </section>
  );
}
