"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Bot, Shield, Trophy, Flame, CheckCircle2 } from "lucide-react";
import { BladeSliceHeading } from "@/components/ui/BladeSliceHeading";
import { AnimeTiltCard } from "@/components/ui/AnimeTiltCard";
import { DailyDisciplineFlame } from "@/components/ui/DailyDisciplineFlame";
import { AnimeGymSynthEngine } from "@/components/ui/AnimeGymSynthEngine";
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

      <div className="w-full min-h-[100svh] flex flex-col justify-center px-4 sm:px-8 py-16 sm:py-20 relative">
        {/* Section Header */}
        <div className="relative z-10 w-full max-w-6xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-system-blue/40 border border-system-accent/30 rounded text-xs font-mono tracking-wideSystem text-system-accent uppercase mb-2">
            <Bot className="w-3.5 h-3.5" />
            <span>PHASE 04 // MENTOR PROTOCOL</span>
          </div>
          <BladeSliceHeading
            as="h2"
            accentText="NO EXCUSES."
            className="font-cinzel text-3xl sm:text-5xl font-black uppercase tracking-wider text-system-text"
          >
            DISCIPLINE BEATS MOTIVATION.
          </BladeSliceHeading>
          <p className="font-inter text-sm sm:text-base text-system-muted max-w-xl">
            A coach that gives you exact numbers, not speeches. Meet your AI Hunter Mentor.
          </p>
        </div>

        {/* Desktop: Horizontal Scrolling Track; Mobile: Vertical Cards */}
        <div className="relative w-full overflow-visible">
          <div
            ref={trackRef}
            className="flex flex-col md:flex-row gap-6 md:gap-8 will-change-transform max-w-6xl mx-auto md:max-w-none md:w-max md:px-8"
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
                      className={`object-cover filter contrast-115 brightness-105 ${
                        card.id === 3 ? "object-[center_25%]" : "object-center"
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
                      className={`w-full py-2 px-3 rounded font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
                        committedCards[card.id]
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

        {/* 7-Day Discipline Streak Flame & Penalty Zone Tracker */}
        <div className="w-full max-w-6xl mx-auto mt-10 relative z-10">
          <DailyDisciplineFlame />
        </div>

        {/* Procedural Web Audio Synthwave Rhythm Engine */}
        <div className="w-full max-w-6xl mx-auto mt-6 relative z-10">
          <AnimeGymSynthEngine />
        </div>
      </div>
    </section>
  );
}
