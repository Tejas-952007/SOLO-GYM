"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { Skull, Moon, Flame, Zap, ShieldAlert, Sparkles } from "lucide-react";
import { DecodeText } from "@/components/ui/DecodeText";
import { GlitchHeading } from "@/components/ui/GlitchHeading";
import { sfx } from "@/lib/audio-sfx";

export function Chapter6() {
  const containerRef = useRef<HTMLDivElement>(null);
  const chainCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    const chainCard = chainCardRef.current;
    if (!el || !chainCard) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Chain tension jitter animation on scroll
      gsap.to(chainCard, {
        x: () => (Math.random() - 0.5) * 8,
        repeat: 5,
        yoyo: true,
        ease: "rough",
        scrollTrigger: {
          trigger: chainCard,
          start: "top 70%",
          end: "top 30%",
          scrub: 0.5,
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="chapter-6"
      ref={containerRef}
      className="relative w-full bg-[#07060D] border-t border-system-accent/15 py-20 px-4 sm:px-8 overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-radial-gradient from-red-950/15 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-950/40 border border-red-500/40 rounded text-xs font-mono tracking-wideSystem text-red-400 uppercase">
            <Skull className="w-3.5 h-3.5" />
            <span><DecodeText text="PHASE 06 // DUNGEON THREATS" /></span>
          </div>
          <GlitchHeading as="h2" className="font-cinzel text-3xl sm:text-5xl font-black uppercase tracking-wider text-system-text">
            THE ENEMIES YOU MUST SLAY.
          </GlitchHeading>
          <p className="font-inter text-xs sm:text-sm text-system-muted">
            The monsters aren&apos;t in a dungeon. They live in your comfort zone. Break the chains, protect your recovery, and unlock Berserk Rage mode.
          </p>
        </div>

        {/* 3 Pillars of Dungeon Threats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          
          {/* Card 1: Chained Distraction (Streak Killer) */}
          <div
            ref={chainCardRef}
            onMouseEnter={() => sfx.playHover()}
            className="system-window corner-brackets p-6 rounded flex flex-col justify-between relative overflow-hidden group border-red-500/30 hover:border-red-500/60 transition-colors"
          >
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-red-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-wideSystem px-2.5 py-0.5 bg-red-500/20 text-red-400 border border-red-500/30 rounded">
                  BOSS // GRAVITY OF COMFORT
                </span>
                <ShieldAlert className="w-4 h-4 text-red-400" />
              </div>

              {/* Struggling Hunter Face & Chains Clearly Visible */}
              <div className="relative w-full h-64 sm:h-72 rounded overflow-hidden border border-red-500/30 bg-black/80">
                <Image
                  src="/assets/06-enemies/chained-distraction.webp"
                  alt="Hunter Struggling Against Chains of Distraction"
                  fill
                  className="object-cover object-[center_30%] group-hover:scale-105 transition-transform duration-700 opacity-95 filter brightness-110 contrast-125"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07060D] via-transparent to-transparent pointer-events-none" />

                {/* Debuff Flashes */}
                <div className="absolute bottom-3 left-3 right-3 flex flex-col gap-1.5 font-mono text-[10px]">
                  <span className="px-2 py-0.5 bg-red-950/80 border border-red-500/40 text-red-300 rounded inline-block w-fit">
                    [ JUNK FOOD // -40 XP ]
                  </span>
                  <span className="px-2 py-0.5 bg-red-950/80 border border-red-500/40 text-red-300 rounded inline-block w-fit">
                    [ SKIPPED WORKOUT // -1 STREAK ]
                  </span>
                </div>
              </div>

              <h3 className="font-cinzel text-xl font-bold uppercase text-system-text tracking-wide">
                CHAIN OF PROCRASTINATION
              </h3>
              <p className="font-inter text-xs text-system-muted leading-relaxed">
                Miss a single day and your Hunter rank halts. The Level Up System forces daily accountability—no missed logs, no skipped protein targets.
              </p>
            </div>

            <div className="pt-4 border-t border-system-accent/15 mt-4 flex items-center justify-between text-xs font-mono text-red-400">
              <span>PENALTY: RANK DECAY</span>
              <span>SLAY: COMPLETE QUEST</span>
            </div>
          </div>

          {/* Card 2: Recovery Tank (Rest Quest) */}
          <div
            onMouseEnter={() => sfx.playHover()}
            className="system-window corner-brackets p-6 rounded flex flex-col justify-between relative overflow-hidden group border-system-accent/30 hover:border-system-accent/60 transition-colors"
          >
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-system-accent/10 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-wideSystem px-2.5 py-0.5 bg-system-accent/20 text-system-accent border border-system-accent/30 rounded">
                  SANCTUARY // RECOVERY CHAMBER
                </span>
                <Moon className="w-4 h-4 text-system-accent" />
              </div>

              {/* Recovery Tank Visual */}
              <div className="relative w-full h-64 sm:h-72 rounded overflow-hidden border border-system-accent/30 bg-black/80">
                <Image
                  src="/assets/06-enemies/recovery-tank.webp"
                  alt="Hunter Healing in Recovery Chamber"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-95 filter brightness-110 contrast-115"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07060D] via-transparent to-transparent pointer-events-none" />

                {/* Healing Status */}
                <div className="absolute bottom-3 left-3 right-3 flex flex-col gap-1.5 font-mono text-[10px]">
                  <span className="px-2 py-0.5 bg-system-panel/90 border border-system-accent/40 text-system-glow rounded inline-block w-fit">
                    [ SLEEP: 8.2 HRS // +120 HP ]
                  </span>
                  <span className="px-2 py-0.5 bg-system-panel/90 border border-system-accent/40 text-system-glow rounded inline-block w-fit">
                    [ MUSCLE REPAIR: OPTIMAL ]
                  </span>
                </div>
              </div>

              <h3 className="font-cinzel text-xl font-bold uppercase text-system-text tracking-wide">
                RECOVERY IS A QUEST TOO
              </h3>
              <p className="font-inter text-xs text-system-muted leading-relaxed">
                Muscles are not built in the gym; they are built in the tank. Level Up rewards you XP for 8 hours of sleep and adequate rest-day hydration.
              </p>
            </div>

            <div className="pt-4 border-t border-system-accent/15 mt-4 flex items-center justify-between text-xs font-mono text-system-accent">
              <span>BUFF: +30% STAMINA</span>
              <span>PROTOCOL: 8H SLEEP</span>
            </div>
          </div>

          {/* Card 3: Berserk Rage Mode (Streak 30+) */}
          <div
            onMouseEnter={() => sfx.playHover()}
            className="system-window corner-brackets p-6 rounded flex flex-col justify-between relative overflow-hidden group border-amber-500/30 hover:border-amber-500/60 transition-colors"
          >
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-wideSystem px-2.5 py-0.5 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded">
                  AWAKENING // 30-DAY STREAK
                </span>
                <Flame className="w-4 h-4 text-amber-400" />
              </div>

              {/* Hunter Berserk Face with Blazing Red Eyes Clearly Visible */}
              <div className="relative w-full h-64 sm:h-72 rounded overflow-hidden border border-amber-500/30 bg-black/80">
                <Image
                  src="/assets/06-enemies/rage-mindset.webp"
                  alt="Berserk Mindset with Burning Eyes"
                  fill
                  className="object-cover object-[center_32%] group-hover:scale-105 transition-transform duration-700 opacity-95 filter brightness-115 contrast-125"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07060D] via-transparent to-transparent pointer-events-none" />

                {/* Rage Mode Status */}
                <div className="absolute bottom-3 left-3 right-3 flex flex-col gap-1.5 font-mono text-[10px]">
                  <span className="px-2 py-0.5 bg-amber-950/80 border border-amber-500/40 text-amber-300 rounded inline-block w-fit">
                    [ STREAK 30 // BERSERK STATE ]
                  </span>
                  <span className="px-2 py-0.5 bg-amber-950/80 border border-amber-500/40 text-amber-300 rounded inline-block w-fit">
                    [ 2X XP BONUS ACTIVE ]
                  </span>
                </div>
              </div>

              <h3 className="font-cinzel text-xl font-bold uppercase text-system-text tracking-wide">
                UNSTOPPABLE MOMENTUM
              </h3>
              <p className="font-inter text-xs text-system-muted leading-relaxed">
                Cross 30 days without breaking protocol. Your hunter aura ignites, unlocking legendary badges, 2x quest XP multipliers, and elite dungeon raids.
              </p>
            </div>

            <div className="pt-4 border-t border-system-accent/15 mt-4 flex items-center justify-between text-xs font-mono text-amber-400">
              <span>STATE: ASCENDED</span>
              <span>MULTIPLIER: 2.0X</span>
            </div>
          </div>

        </div>

        {/* The Body You Are Building - Full Width Physique Reveal */}
        <div className="system-window corner-brackets p-6 sm:p-8 rounded relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-system-accent/20 border border-system-accent/40 rounded text-xs font-mono text-system-accent uppercase">
                <Zap className="w-3.5 h-3.5" />
                <span>THE PHYSICAL OUTCOME</span>
              </div>
              <GlitchHeading as="h3" className="font-cinzel text-2xl sm:text-4xl font-bold uppercase tracking-wider text-system-text">
                THE BODY YOU ARE BUILDING.
              </GlitchHeading>
              <p className="font-inter text-xs sm:text-sm text-system-muted leading-relaxed">
                Every rep tracked in the gym, every gram of protein measured in your Indian meals, and every night of 8-hour sleep compounds. You are sculpting dense, armor-like muscle.
              </p>
              <div className="grid grid-cols-3 gap-3 pt-2 text-center">
                <div className="p-3 bg-system-panel/60 border border-system-accent/20 rounded">
                  <div className="font-mono text-lg font-bold text-system-accent">+14 KG</div>
                  <div className="font-mono text-[10px] text-system-muted uppercase">LEAN TISSUE</div>
                </div>
                <div className="p-3 bg-system-panel/60 border border-system-accent/20 rounded">
                  <div className="font-mono text-lg font-bold text-system-glow">10-12%</div>
                  <div className="font-mono text-[10px] text-system-muted uppercase">BODY FAT</div>
                </div>
                <div className="p-3 bg-system-panel/60 border border-system-accent/20 rounded">
                  <div className="font-mono text-lg font-bold text-system-gold">S-RANK</div>
                  <div className="font-mono text-[10px] text-system-muted uppercase">METABOLISM</div>
                </div>
              </div>
            </div>

            <div className="relative h-80 sm:h-96 md:h-[420px] w-full rounded overflow-hidden border border-system-accent/30 bg-black/90">
              <Image
                src="/assets/06-enemies/peak-physique-back.webp"
                alt="Peak Physique"
                fill
                className="object-cover object-[center_28%] filter contrast-125 brightness-110"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07060D] via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-3 right-3 font-mono text-[10px] px-2.5 py-1 bg-black/85 border border-system-gold/50 text-system-gold rounded shadow-md">
                HUNTER ANATOMY // 100% UNLOCKED
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
