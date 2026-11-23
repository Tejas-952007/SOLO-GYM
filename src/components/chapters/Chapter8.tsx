"use client";

import { useState } from "react";
import { Bot, Utensils, Flame, CheckCircle2, MapPin, Sparkles, MessageSquare, ChevronRight } from "lucide-react";
import { DecodeText } from "@/components/ui/DecodeText";
import { BladeSliceHeading } from "@/components/ui/BladeSliceHeading";
import { AnimeTiltCard } from "@/components/ui/AnimeTiltCard";
import { GuildCoachTelemetry } from "@/components/ui/GuildCoachTelemetry";
import { FormCheckAI } from "@/components/ui/FormCheckAI";
import { spawnCombatNumber } from "@/components/effects/FloatingDamageNumbers";
import { sfx } from "@/lib/audio-sfx";

interface ChatScenario {
  id: string;
  tag: string;
  userQuery: string;
  time: string;
  protein: string;
  carbs: string;
  fats: string;
  verdict: string;
  prescription: string;
}

const CHAT_SCENARIOS: ChatScenario[] = [
  {
    id: "chapati-paneer",
    tag: "LUNCH // ROTI & PANEER",
    userQuery: "Had 3 rotis, 1 katori dal tadka, and 150g paneer bhurji. Am I on track for my 150g daily quest?",
    time: "14:32",
    protein: "38.4g",
    carbs: "54.0g",
    fats: "24.5g",
    verdict: "Logged 82g / 150g protein today. Remaining deficit: 68g.",
    prescription: "Dinner recommendation: 250g grilled chicken breast or 200g soya chunks pulao to hit quest target before 22:00.",
  },
  {
    id: "hostel-mess",
    tag: "HOSTEL MESS // LIMITED OPTIONS",
    userQuery: "Mess only has aloo paratha and sweet lassi for breakfast. How do I get 35g protein without breaking bank?",
    time: "08:45",
    protein: "14.2g",
    carbs: "72.0g",
    fats: "28.0g",
    verdict: "High carbohydrate load with critical protein deficit (-21g).",
    prescription: "Emergency hack: Add 3 boiled eggs from street stall (18g P) + 1 scoop unflavored whey in water (24g P). Cost: ~₹45.",
  },
  {
    id: "pure-veg",
    tag: "PURE VEGETARIAN // 140g GOAL",
    userQuery: "I don't eat eggs or meat. Can I actually hit 140g protein daily with Indian food?",
    time: "19:15",
    protein: "142.0g",
    carbs: "185.0g",
    fats: "45.0g",
    verdict: "Target 100% achievable without non-veg.",
    prescription: "Daily Veg Protocol: 100g Soya Chunks (52g P) + 200g Low-fat Paneer (36g P) + 250ml Soya Milk (8g P) + 1.5 scoops Whey/Plant Protein (38g P) + Dal (10g P).",
  },
  {
    id: "night-shift",
    tag: "NIGHT SHIFT // IT / BPO",
    userQuery: "Working 10PM to 7AM shift in Pune Hinjewadi. My circadian rhythm is ruined and I miss meals. When should I train?",
    time: "23:40",
    protein: "148.0g",
    carbs: "190.0g",
    fats: "48.0g",
    verdict: "Circadian mismatch detected. Fasting window recalibrated.",
    prescription: "Shift Protocol: Train at 19:30 before your shift starts with high caffeine. Eat main protein feast at 01:00 AM. Sleep in pitch darkness with blackout curtains from 08:30 AM to 16:30 PM.",
  },
  {
    id: "budget-bulk",
    tag: "STUDENT BUDGET // ₹100/DAY",
    userQuery: "College student in Delhi with ₹100 daily food budget. Can't afford ₹2,500 whey jars. What is the cheapest protein protocol?",
    time: "11:20",
    protein: "135.0g",
    carbs: "220.0g",
    fats: "35.0g",
    verdict: "Ultra-lean student protocol locked in under ₹85/day.",
    prescription: "Desi Survival Stack: 100g Fortune Soya Chunks (₹15 / 52g P) + 6 Local Eggs (₹42 / 36g P) + 100g Roasted Chana/Sattu (₹18 / 22g P) + 500ml Toned Milk (₹28 / 16g P). Total Cost: ₹88. Total Protein: 126g.",
  },
];

interface GymSpot {
  city: string;
  gymName: string;
  type: string;
  features: string;
  suppStore: string;
}

const CITY_GYMS: GymSpot[] = [
  {
    city: "Mumbai",
    gymName: "Navi Mumbai Iron Forge",
    type: "HARDCORE IRON DUNGEON",
    features: "Chalk Allowed • Dumbbells up to 65kg • 4 Power Racks",
    suppStore: "Vashi Nutrition Hub (Informed-Choice Verified)",
  },
  {
    city: "Pune",
    gymName: "Kothrud Heavy Metal Club",
    type: "POWERLIFTING CELL",
    features: "Calibrated Steel Plates • Deadlift Platforms • Loud Music OK",
    suppStore: "FC Road Authentic Supplements (Batch QR Tested)",
  },
  {
    city: "Delhi NCR",
    gymName: "Gurugram Barbell Syndicate",
    type: "STRENGTH SANCTUARY",
    features: "Eleiko Bars • Monolift • 24/7 Access",
    suppStore: "CP Fitness Mart (Direct Brand Importers)",
  },
  {
    city: "Bengaluru",
    gymName: "Indiranagar Iron Vault",
    type: "HYPERTROPHY LAB",
    features: "Arsenal Strength Machines • Chalk • Serious Lifters Only",
    suppStore: "Koramangala Supplement Station (Labdoor Certified)",
  },
  {
    city: "Hyderabad",
    gymName: "Gachibowli Titan Gym",
    type: "MONARCH TRAINING GROUND",
    features: "Hammer Strength Line • 8 Squat Racks • Cold Plunge",
    suppStore: "Madhapur Pro Nutrition (Seal Verified)",
  },
];

const QUICK_MACROS = [
  { label: "200g Paneer Bhurji", p: "36g", c: "8g", f: "38g", leucine: "3.2g", verdict: "Excellent casein & leucine base. Add 1 roti or salad." },
  { label: "100g Soya Chunks", p: "52g", c: "33g", f: "0.5g", leucine: "3.8g", verdict: "Highest plant protein density in India. Perfect anabolic spike." },
  { label: "6 Boiled Eggs (3 whole + 3 whites)", p: "28g", c: "2g", f: "15g", leucine: "2.6g", verdict: "Gold-standard BV 100 amino acid bioavailability." },
  { label: "1 Scoop Whey in Water", p: "25g", c: "1.5g", f: "1g", leucine: "2.9g", verdict: "Rapid 30-min absorption window. Ideal post-workout." },
  { label: "50g Sattu + 300ml Buttermilk", p: "18g", c: "42g", f: "4g", leucine: "1.5g", verdict: "Traditional desi hydration. Recommend adding 2 egg whites." },
  { label: "3 Rotis + 1 Katori Moong Dal", p: "14g", c: "64g", f: "5g", leucine: "1.1g", verdict: "High carb, sub-optimal leucine. Add paneer/eggs to hit 30g." },
];

export function Chapter8() {
  const [activeScenario, setActiveScenario] = useState<ChatScenario>(CHAT_SCENARIOS[0]);
  const [selectedCity, setSelectedCity] = useState<string>("Mumbai");
  const [coachTab, setCoachTab] = useState<'voice' | 'vision'>('voice');
  const [customQuery, setCustomQuery] = useState("");
  const [activeQuickMeal, setActiveQuickMeal] = useState<(typeof QUICK_MACROS)[0] | null>(null);
  const [mobileCh8Tab, setMobileCh8Tab] = useState<'advisor' | 'quickmeals' | 'dungeons' | 'telemetry'>('advisor');

  const currentGym = CITY_GYMS.find((g) => g.city === selectedCity) || CITY_GYMS[0];

  const handleQuickMeal = (meal: (typeof QUICK_MACROS)[0]) => {
    setActiveQuickMeal(meal);
    sfx.playStatPointAlloc();
    spawnCombatNumber(`+${meal.p} PROTEIN VERIFIED!`, undefined, undefined, "xp");
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuery.trim()) return;
    sfx.playClick();
    spawnCombatNumber(`CALCULATING: "${customQuery.slice(0, 15)}..."`, undefined, undefined, "mana");
    setCustomQuery("");
  };

  return (
    <section
      id="chapter-8"
      className="relative w-full bg-[#07060D] py-20 px-4 sm:px-8 overflow-hidden"
    >
      {/* Seamless Volumetric Fog Portal Transition from Chapter 7 */}
      <div className="absolute top-0 inset-x-0 h-36 bg-gradient-to-b from-[#07060D] via-[#07060D]/80 to-transparent pointer-events-none z-20" />

      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-radial-gradient from-system-accent/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-system-accent/20 border border-system-accent/40 rounded text-xs font-mono tracking-wideSystem text-system-accent uppercase">
            <Bot className="w-3.5 h-3.5" />
            <span><DecodeText text="PHASE 08 // AI HUNTER SYSTEM" /></span>
          </div>
          <BladeSliceHeading
            as="h2"
            accentText="NUMERIC ADVICE ONLY."
            className="font-cinzel text-3xl sm:text-5xl font-black uppercase tracking-wider text-system-text"
          >
            YOUR AI COACH.
          </BladeSliceHeading>
          <p className="font-inter text-xs sm:text-sm text-system-muted">
            The Level Up AI analyzes your Indian diet in real time. Numeric calculations, zero fluff, and instant corrective quests.
          </p>
        </div>

        {/* Mobile Segmented Module Switcher */}
        <div className="flex lg:hidden items-center justify-center gap-1.5 p-1 bg-black/60 border border-system-accent/20 rounded-xl my-4 font-mono text-[11px] w-full max-w-md mx-auto relative z-20">
          <button
            onClick={() => {
              sfx.playClick();
              setMobileCh8Tab('advisor');
            }}
            className={`flex-1 py-2 rounded-lg font-bold transition-all text-center ${
              mobileCh8Tab === 'advisor'
                ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(139,92,246,0.5)]'
                : 'text-system-muted hover:text-white'
            }`}
          >
            🤖 ADVISOR
          </button>
          <button
            onClick={() => {
              sfx.playClick();
              setMobileCh8Tab('quickmeals');
            }}
            className={`flex-1 py-2 rounded-lg font-bold transition-all text-center ${
              mobileCh8Tab === 'quickmeals'
                ? 'bg-emerald-600 text-white shadow-[0_0_12px_rgba(16,185,129,0.5)]'
                : 'text-system-muted hover:text-white'
            }`}
          >
            ⚡ MACROS
          </button>
          <button
            onClick={() => {
              sfx.playClick();
              setMobileCh8Tab('dungeons');
            }}
            className={`flex-1 py-2 rounded-lg font-bold transition-all text-center ${
              mobileCh8Tab === 'dungeons'
                ? 'bg-yellow-500 text-black shadow-[0_0_12px_rgba(245,197,66,0.5)]'
                : 'text-system-muted hover:text-white'
            }`}
          >
            📍 DUNGEONS
          </button>
          <button
            onClick={() => {
              sfx.playClick();
              setMobileCh8Tab('telemetry');
            }}
            className={`flex-1 py-2 rounded-lg font-bold transition-all text-center ${
              mobileCh8Tab === 'telemetry'
                ? 'bg-cyan-600 text-white shadow-[0_0_12px_rgba(6,182,212,0.5)]'
                : 'text-system-muted hover:text-white'
            }`}
          >
            🎙️ AI COACH
          </button>
        </div>

        {/* Dynamic Simulated AI Chat Window with Scenario Selectors Wrapped in 3D AnimeTiltCard */}
        <div className={mobileCh8Tab === 'advisor' || mobileCh8Tab === 'quickmeals' ? 'block' : 'hidden lg:block'}>
        <AnimeTiltCard
          maxTilt={6}
          glowColor="rgba(139, 92, 246, 0.35)"
          className="max-w-3xl mx-auto w-full"
        >
          <div className="w-full system-window corner-brackets p-4 sm:p-6 md:p-8 rounded relative space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-system-accent/20 pb-3">
            <div className="flex items-center gap-2 font-mono text-xs text-system-text">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>SYSTEM TERMINAL v2.4 // AI ADVISOR</span>
            </div>
            <span className="hidden sm:inline-block font-mono text-[10px] text-system-muted px-2 py-0.5 bg-system-panel border border-system-accent/20 rounded">
              ILLUSTRATIVE UI PREVIEW
            </span>
          </div>

          {/* Scenario Buttons (Advisor Tab) */}
          <div className={`space-y-2 ${mobileCh8Tab === 'advisor' ? 'block' : 'hidden lg:block'}`}>
            <span className="font-mono text-[10px] text-system-muted uppercase tracking-wider flex items-center gap-1.5">
              <MessageSquare className="w-3 h-3 text-system-accent" />
              SELECT AN INDIAN LIFTER QUERY:
            </span>
            <div className="flex flex-wrap gap-2">
              {CHAT_SCENARIOS.map((sc) => (
                <button
                  key={sc.id}
                  onClick={() => {
                    sfx.playClick();
                    setActiveScenario(sc);
                    setActiveQuickMeal(null);
                    spawnCombatNumber(`${sc.protein} PROTOCOL ANALYZED`, undefined, undefined, "mana");
                  }}
                  onMouseEnter={() => sfx.playHover()}
                  className={`px-3 py-1.5 rounded text-xs font-mono transition-colors border ${
                    activeScenario.id === sc.id && !activeQuickMeal
                      ? "bg-system-accent text-white border-system-glow shadow-[0_0_12px_rgba(139,92,246,0.5)]"
                      : "bg-system-panel/60 border-system-accent/20 text-system-muted hover:text-system-text"
                  }`}
                >
                  {sc.tag}
                </button>
              ))}
            </div>
          </div>

          {/* Instant Desi Food Macro Chips & Custom Form (Quickmeals Tab) */}
          <div className={`space-y-3 pt-1 border-t border-white/5 ${mobileCh8Tab === 'quickmeals' ? 'block' : 'hidden lg:block'}`}>
            <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" />
              INSTANT DESI MACRO CALCULATOR:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {QUICK_MACROS.map((m, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickMeal(m)}
                  onMouseEnter={() => sfx.playHover()}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono border transition-all cursor-pointer ${
                    activeQuickMeal?.label === m.label
                      ? "bg-emerald-500/25 border-emerald-400 text-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.4)]"
                      : "bg-black/50 border-white/10 text-system-muted hover:text-white hover:border-emerald-500/40"
                  }`}
                >
                  {m.label} ({m.p})
                </button>
              ))}
            </div>

            {/* Quick Meal Live Analysis Widget if selected */}
            {activeQuickMeal && (
              <div className="p-4 bg-emerald-950/30 border border-emerald-500/40 rounded-lg space-y-2 font-mono text-xs animate-fade-in shadow-lg">
                <div className="flex items-center justify-between text-emerald-400 text-[11px]">
                  <span className="font-bold">[ MEAL SCAN: {activeQuickMeal.label} ]</span>
                  <span>LEUCINE: {activeQuickMeal.leucine}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center p-2 bg-black/60 rounded border border-emerald-500/20">
                  <div>
                    <div className="text-[10px] text-system-muted">PROTEIN</div>
                    <div className="text-sm font-bold text-emerald-400">{activeQuickMeal.p}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-system-muted">CARBS</div>
                    <div className="text-sm font-bold text-blue-300">{activeQuickMeal.c}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-system-muted">FATS</div>
                    <div className="text-sm font-bold text-amber-300">{activeQuickMeal.f}</div>
                  </div>
                </div>
                <div className="text-[11px] text-system-text font-inter">
                  <span className="text-emerald-400 font-mono font-bold">BIOAVAILABILITY RATING: </span>
                  {activeQuickMeal.verdict}
                </div>
              </div>
            )}

            {/* Interactive Custom Meal Terminal Prompt */}
            <form onSubmit={handleCustomSubmit} className="flex gap-2 pt-1">
              <input
                type="text"
                value={customQuery}
                onChange={(e) => setCustomQuery(e.target.value)}
                placeholder="Ask AI Coach: e.g. '250g curd + 20g almonds pre-bed'..."
                className="flex-1 bg-black/70 border border-white/15 focus:border-system-cyan/70 rounded px-3 py-2 text-xs font-mono text-system-text placeholder:text-system-muted/40 outline-none transition-colors"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-system-cyan/20 hover:bg-system-cyan hover:text-black border border-system-cyan/50 text-system-cyan rounded text-xs font-mono font-bold tracking-wider transition-all cursor-pointer"
              >
                [ QUERY ]
              </button>
            </form>
          </div>

          <div className={`space-y-4 pt-2 ${mobileCh8Tab === 'advisor' ? 'block' : 'hidden lg:block'}`}>
            {/* User Message */}
            <div className="flex items-start gap-3 justify-end">
              <div className="max-w-md bg-system-panel/90 border border-system-accent/30 p-4 rounded-lg rounded-tr-none text-right space-y-1">
                <span className="text-[10px] font-mono text-system-accent">HUNTER // {activeScenario.time}</span>
                <p className="text-xs sm:text-sm font-inter text-system-text">
                  &ldquo;{activeScenario.userQuery}&rdquo;
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
                  <span>CONFIDENCE: 99.2%</span>
                </div>

                <div className="grid grid-cols-3 gap-2 p-2 bg-system-panel/70 rounded border border-system-accent/20 text-center">
                  <div>
                    <div className="text-[10px] text-system-muted">PROTEIN</div>
                    <div className="text-sm font-bold text-system-glow">{activeScenario.protein}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-system-muted">CARBS</div>
                    <div className="text-sm font-bold text-blue-400">{activeScenario.carbs}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-system-muted">FATS</div>
                    <div className="text-sm font-bold text-amber-400">{activeScenario.fats}</div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-system-text font-inter text-xs leading-relaxed">
                    <span className="text-system-accent font-mono font-bold">VERDICT: </span>
                    {activeScenario.verdict}
                  </div>
                  <div className="text-system-muted font-inter text-xs leading-relaxed">
                    <span className="text-system-gold font-mono font-bold">PRESCRIPTION: </span>
                    {activeScenario.prescription}
                  </div>
                </div>

                <div className="pt-2 border-t border-system-accent/20 flex items-center justify-between text-[10px] text-system-muted">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>DAILY QUEST RECALIBRATED</span>
                  </span>
                  <span>XP: +250 READY</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        </AnimeTiltCard>
        </div>

        {/* Interactive Dungeon & Supp Radar for Indian Cities Wrapped in 3D AnimeTiltCard */}
        <div className={mobileCh8Tab === 'dungeons' ? 'block' : 'hidden lg:block'}>
        <AnimeTiltCard
          maxTilt={6}
          glowColor="rgba(245, 197, 66, 0.25)"
          className="w-full"
        >
          <div className="system-window corner-brackets p-6 sm:p-8 rounded-lg space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-system-accent/15 pb-4">
            <div>
              <div className="font-mono text-xs text-system-accent uppercase flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>MODULE 04 // DUNGEON RADAR</span>
              </div>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold uppercase text-system-text">
                FIND REAL IRON DUNGEONS IN YOUR CITY
              </h3>
            </div>

            {/* City Selector Buttons */}
            <div className="flex flex-wrap gap-1.5">
              {CITY_GYMS.map((spot) => (
                <button
                  key={spot.city}
                  onClick={() => {
                    sfx.playClick();
                    setSelectedCity(spot.city);
                  }}
                  onMouseEnter={() => sfx.playHover()}
                  className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                    selectedCity === spot.city
                      ? "bg-system-gold text-black font-bold"
                      : "bg-system-panel border border-white/10 text-system-muted hover:text-white"
                  }`}
                >
                  {spot.city}
                </button>
              ))}
            </div>
          </div>

          {/* Active City Detail Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-black/60 border border-system-accent/30 rounded-lg space-y-2">
              <span className="font-mono text-[10px] text-system-accent uppercase tracking-wider">
                RECOMMENDED IRON GYM
              </span>
              <div className="font-cinzel text-lg font-bold text-system-text">
                {currentGym.gymName}
              </div>
              <div className="text-[11px] font-mono text-emerald-400">
                {currentGym.type}
              </div>
              <div className="text-xs font-inter text-system-muted">
                {currentGym.features}
              </div>
            </div>

            <div className="p-4 bg-black/60 border border-system-accent/30 rounded-lg space-y-2 flex flex-col justify-between">
              <div>
                <span className="font-mono text-[10px] text-system-gold uppercase tracking-wider">
                  VERIFIED AUTHENTIC SUPPLEMENTS
                </span>
                <div className="font-cinzel text-lg font-bold text-system-gold">
                  {currentGym.suppStore}
                </div>
                <div className="text-[11px] font-mono text-system-glow">
                  ZERO COUNTERFEIT GUARANTEE
                </div>
                <div className="text-xs font-inter text-system-muted">
                  Batch-tested whey, creatine monohydrate & essential micronutrients.
                </div>
              </div>
              <button
                onClick={() => {
                  sfx.playStatPointAlloc();
                  spawnCombatNumber("BATCH #IND-9941 LAB VERIFIED // 100% PURE", undefined, undefined, "stat");
                }}
                onMouseEnter={() => sfx.playHover()}
                className="mt-2 py-1 px-3 bg-system-gold/20 hover:bg-system-gold hover:text-black border border-system-gold/50 rounded text-[10px] font-mono text-system-gold uppercase font-bold tracking-wider transition-all cursor-pointer w-fit"
              >
                [ CHECK LABDOOR TEST CERTIFICATE ]
              </button>
            </div>
          </div>
        </div>
        </AnimeTiltCard>
        </div>

        {/* AI Guild Coach & Computer Vision Form Check Terminal */}
        <div className={`w-full max-w-6xl mx-auto mt-10 relative z-10 font-mono ${mobileCh8Tab === 'telemetry' ? 'block' : 'hidden lg:block'}`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-system-accent/25 pb-3 mb-6 gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                [ AI GUILD COACH & COMPUTER VISION LAB ]
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  sfx.playClick();
                  setCoachTab('voice');
                }}
                onMouseEnter={() => sfx.playHover()}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                  coachTab === 'voice'
                    ? 'bg-cyan-600 text-white border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                    : 'bg-black/50 border-white/10 text-gray-400 hover:text-white hover:border-cyan-500/30'
                }`}
              >
                🎙️ NEURAL VOICE AI COACH
              </button>

              <button
                onClick={() => {
                  sfx.playClick();
                  setCoachTab('vision');
                }}
                onMouseEnter={() => sfx.playHover()}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                  coachTab === 'vision'
                    ? 'bg-purple-600 text-white border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                    : 'bg-black/50 border-white/10 text-gray-400 hover:text-white hover:border-purple-500/30'
                }`}
              >
                👁️ KINEMATIC FORM CHECK CV
              </button>
            </div>
          </div>

          {/* Active Module View */}
          <div className="w-full">
            {coachTab === 'voice' && <GuildCoachTelemetry />}
            {coachTab === 'vision' && <FormCheckAI />}
          </div>
        </div>
      </div>
    </section>
  );
}
