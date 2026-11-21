"use client";

import { useState } from "react";
import Image from "next/image";
import { Bot, Utensils, Compass, Flame, CheckCircle2, MapPin, Sparkles } from "lucide-react";

interface FeatureCard {
  id: string;
  icon: typeof Bot;
  tag: string;
  title: string;
  desc: string;
  metric: string;
  stats: string;
}

const APP_FEATURES: FeatureCard[] = [
  {
    id: "grimoire",
    icon: Utensils,
    tag: "MODULE 01",
    title: "DESI FOOD GRIMOIRE",
    desc: "Every Indian staple catalogued with exact macro verification. Soya chunks, paneer, chicken tikka, dal tadka, misal, and poha with honest protein grams.",
    metric: "4,500+ VERIFIED FOODS",
    stats: "ACCURACY: ±2%",
  },
  {
    id: "quests",
    icon: Flame,
    tag: "MODULE 02",
    title: "DAILY HUNTER QUESTS",
    desc: "Your daily mission calibrated automatically to your bodyweight goal. Log 150g protein, hit 10,000 steps, push 5 sets of bench. Finish or take rank decay.",
    metric: "ADAPTIVE DIFFICULTY",
    stats: "XP REWARD: +250/DAY",
  },
  {
    id: "recipes",
    icon: Sparkles,
    tag: "MODULE 03",
    title: "HIGH-PROTEIN HACKS",
    desc: "Tired of dry boiled chicken? Access hundreds of 40g+ protein Indian recipes crafted by lifters—soya bhurji, Greek curd raita, and high-protein chicken biryani.",
    metric: "120+ HIGH-PROTEIN MEALS",
    stats: "AVG: 42g PROTEIN / MEAL",
  },
  {
    id: "radar",
    icon: MapPin,
    tag: "MODULE 04",
    title: "DUNGEON & SUPP RADAR",
    desc: "Interactive map locating real iron dungeons (hardcore gyms with heavy plates, chalk allowed) and verified, authentic supplement stores in your city.",
    metric: "INDIA-WIDE COVERAGE",
    stats: "VERIFIED OUTLETS ONLY",
  },
];

export function Chapter8() {
  const [activeFeature, setActiveFeature] = useState<string>("grimoire");

  return (
    <section
      id="chapter-8"
      className="relative w-full bg-[#07060D] border-t border-system-accent/15 py-20 px-4 sm:px-8 overflow-hidden"
    >
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-radial-gradient from-system-accent/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-system-accent/20 border border-system-accent/40 rounded text-xs font-mono tracking-wideSystem text-system-accent uppercase">
            <Bot className="w-3.5 h-3.5" />
            <span>PHASE 08 // AI HUNTER SYSTEM</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-black uppercase tracking-wider text-system-text">
            YOUR AI COACH.
          </h2>
          <p className="font-inter text-xs sm:text-sm text-system-muted">
            The Level Up AI analyzes your Indian diet in real time. Numeric calculations, zero fluff, and instant corrective quests.
          </p>
        </div>

        {/* Dynamic Simulated AI Chat Window (Illustrative Preview) */}
        <div className="max-w-3xl mx-auto system-window corner-brackets p-6 sm:p-8 rounded relative">
          <div className="flex items-center justify-between border-b border-system-accent/20 pb-3 mb-6">
            <div className="flex items-center gap-2 font-mono text-xs text-system-text">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>SYSTEM TERMINAL v2.4 // AI ADVISOR</span>
            </div>
            <span className="font-mono text-[10px] text-system-muted px-2 py-0.5 bg-system-panel border border-system-accent/20 rounded">
              ILLUSTRATIVE UI PREVIEW
            </span>
          </div>

          <div className="space-y-4">
            {/* User Message */}
            <div className="flex items-start gap-3 justify-end">
              <div className="max-w-md bg-system-panel/90 border border-system-accent/30 p-4 rounded-lg rounded-tr-none text-right space-y-1">
                <span className="text-[10px] font-mono text-system-accent">HUNTER_TEJAS // 14:32</span>
                <p className="text-xs sm:text-sm font-inter text-system-text">
                  &ldquo;Just had lunch: 3 chapatis, 1 katori dal tadka, and 150g paneer bhurji. Am I on track for my 150g daily quest?&rdquo;
                </p>
              </div>
            </div>

            {/* AI Coach System Reply */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded bg-system-accent/20 border border-system-accent/40 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-system-glow" />
              </div>
              <div className="max-w-xl bg-black/60 border border-system-accent/40 p-4 rounded-lg rounded-tl-none space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between text-system-accent text-[11px]">
                  <span>[ SYSTEM CALCULATION COMPLETE ]</span>
                  <span>CONFIDENCE: 98.4%</span>
                </div>

                <div className="grid grid-cols-3 gap-2 p-2 bg-system-panel/70 rounded border border-system-accent/20 text-center">
                  <div>
                    <div className="text-[10px] text-system-muted">PROTEIN</div>
                    <div className="text-sm font-bold text-system-glow">38.4g</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-system-muted">CARBS</div>
                    <div className="text-sm font-bold text-blue-400">54.0g</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-system-muted">FATS</div>
                    <div className="text-sm font-bold text-amber-400">24.5g</div>
                  </div>
                </div>

                <p className="text-system-text font-inter text-xs leading-relaxed">
                  <span className="text-system-accent font-mono font-bold">VERDICT: </span>
                  You have logged <strong>82g / 150g</strong> protein today. Deficit is <strong>68g</strong>.
                  Dinner prescription: 250g grilled chicken breast or 200g soya chunks pulao to hit quest target before 22:00.
                </p>

                <div className="pt-2 border-t border-system-accent/20 flex items-center justify-between text-[10px] text-system-muted">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>DAILY QUEST: 54% PROGRESS</span>
                  </span>
                  <span>XP AT STAKE: +250</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="font-cinzel text-2xl font-bold uppercase text-system-text">
              BUILT SPECIFICALLY FOR INDIAN LIFTERS
            </h3>
            <p className="font-inter text-xs text-system-muted">
              Western fitness apps do not understand ghee, roti, or local gym culture. Level Up does.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {APP_FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.id}
                  className="system-window corner-brackets p-6 rounded flex flex-col justify-between group hover:border-system-accent/60 transition-all duration-300"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded bg-system-accent/10 border border-system-accent/30 flex items-center justify-center group-hover:bg-system-accent/20 transition-colors">
                      <Icon className="w-5 h-5 text-system-glow" />
                    </div>
                    <div className="font-mono text-[10px] text-system-accent tracking-wideSystem">
                      {feature.tag}
                    </div>
                    <h4 className="font-cinzel text-lg font-bold uppercase text-system-text">
                      {feature.title}
                    </h4>
                    <p className="font-inter text-xs text-system-muted leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-system-accent/15 mt-4 space-y-1">
                    <div className="font-mono text-[11px] font-bold text-system-glow">
                      {feature.metric}
                    </div>
                    <div className="font-mono text-[10px] text-system-muted">
                      {feature.stats}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
