"use client";

import { useState } from "react";
import Image from "next/image";
import { Zap, CheckCircle2, ArrowRight, ShieldCheck, Github, Swords, Shield, Crown } from "lucide-react";
import { DecodeText } from "@/components/ui/DecodeText";
import { BladeSliceHeading } from "@/components/ui/BladeSliceHeading";
import { AnimeTiltCard } from "@/components/ui/AnimeTiltCard";
import { ShadowExtractionRitual } from "@/components/effects/ShadowExtractionRitual";
import { ShadowBarracks } from "@/components/ui/ShadowBarracks";
import { HunterAscensionCertificate } from "@/components/ui/HunterAscensionCertificate";
import { ThreeCharacterShowcase } from "@/components/ThreeCharacterShowcase";
import { spawnCombatNumber } from "@/components/effects/FloatingDamageNumbers";
import { sfx } from "@/lib/audio-sfx";

export function Chapter9() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ritualOpen, setRitualOpen] = useState(false);
  const [ticketId] = useState(() => Math.floor(Math.random() * 8999 + 1000));
  const [monarchTab, setMonarchTab] = useState<'3d-roster' | 'certificate' | 'barracks'>('3d-roster');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      sfx.playRankAscent();
      setIsSubmitted(true);
    }
  };

  return (
    <section
      id="chapter-9"
      className="relative w-full min-h-[100svh] bg-[#07060D] py-24 px-4 sm:px-8 flex flex-col justify-between overflow-hidden"
    >
      {/* Seamless Volumetric Fog Portal Transition from Chapter 8 */}
      <div className="absolute top-0 inset-x-0 h-36 bg-gradient-to-b from-[#07060D] via-[#07060D]/80 to-transparent pointer-events-none z-20" />

      {/* Background Visual: S-Rank Sovereign Hunter - Face & Gold Lightning Clearly Visible */}
      <div className="absolute inset-0 pointer-events-none opacity-75">
        <Image
          src="/assets/07-ranks/rank-s-max.webp"
          alt="S-Rank Sovereign Hunter Visage"
          fill
          priority
          className="object-cover object-[center_36%] filter contrast-130 brightness-115 saturate-125"
          sizes="100vw"
        />
        {/* Sovereign Eye Flares */}
        <div className="absolute top-[36%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex gap-8 pointer-events-none">
          <span className="w-2 h-2 rounded-full bg-yellow-300 shadow-[0_0_20px_rgba(245,197,66,1)] animate-ping" />
          <span className="w-2 h-2 rounded-full bg-yellow-300 shadow-[0_0_20px_rgba(245,197,66,1)] animate-ping" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#07060D] via-[#07060D]/50 to-[#07060D]/65" />
        <div className="absolute inset-0 bg-radial-gradient from-yellow-500/20 via-purple-900/15 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto my-auto text-center space-y-8">

        {/* Phase Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-system-gold/20 border border-system-gold/40 rounded text-xs font-mono tracking-wideSystem text-system-gold uppercase">
          <Zap className="w-3.5 h-3.5" />
          <span><DecodeText text="FINAL PHASE // THE SOVEREIGN AWAKENING" /></span>
        </div>

        {/* Monumental Headline */}
        <div className="space-y-4">
          <BladeSliceHeading
            as="h2"
            accentText="ARISE."
            className="font-cinzel text-6xl sm:text-8xl md:text-9xl font-black uppercase tracking-wider text-system-gold drop-shadow-[0_0_35px_rgba(245,197,66,0.6)]"
          >
            ARISE.
          </BladeSliceHeading>
          <p className="font-cinzel text-xl sm:text-2xl uppercase tracking-widest text-system-text font-bold">
            THE GATE HAS OPENED. CLAIM YOUR SYSTEM.
          </p>
          <p className="font-inter text-xs sm:text-sm text-system-muted max-w-lg mx-auto leading-relaxed">
            Stop guessing your macros. Stop skipping workouts. Transform your body like an S-Rank Hunter. Join the exclusive Batch 01 Indian lifters.
          </p>
        </div>

        {/* Cinematic Sovereign Shadow Extraction CTA Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={() => {
              sfx.playDemonRoar();
              window.dispatchEvent(new CustomEvent("trigger-arise-cutscene"));
            }}
            onMouseEnter={() => sfx.playHover()}
            className="w-full sm:w-auto px-8 py-4 sm:px-10 sm:py-5 rounded-2xl bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-600 text-black font-cinzel font-black text-sm sm:text-base uppercase tracking-widest shadow-[0_0_40px_rgba(245,197,66,0.7)] hover:shadow-[0_0_65px_rgba(245,197,66,1)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
          >
            <Zap className="w-5 h-5 sm:w-6 sm:h-6 fill-black" />
            <span>[ FULLSCREEN ARISE CUTSCENE ]</span>
          </button>

          <button
            onClick={() => {
              sfx.playSubBassBoom();
              setRitualOpen(true);
            }}
            onMouseEnter={() => sfx.playHover()}
            className="w-full sm:w-auto px-6 py-4 sm:px-8 sm:py-5 rounded-2xl bg-black/80 border border-purple-500/60 text-purple-300 font-mono font-bold text-xs sm:text-sm uppercase tracking-wider hover:border-purple-400 hover:text-white shadow-[0_0_25px_rgba(168,85,247,0.4)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Crown className="w-4 h-4 text-purple-400" />
            <span>SOUL EXTRACTION RITUAL</span>
          </button>
        </div>

        {/* Interactive Waitlist Box Wrapped in 3D AnimeTiltCard */}
        <AnimeTiltCard
          maxTilt={8}
          glowColor="rgba(245, 197, 66, 0.45)"
          className="max-w-md mx-auto w-full"
        >
          <div className="w-full system-window corner-brackets p-6 rounded relative">
            {isSubmitted ? (
              <div className="py-4 space-y-3 font-mono text-center">
                <div className="w-12 h-12 rounded-full bg-system-gold/20 border border-system-gold/40 mx-auto flex items-center justify-center text-system-gold">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="text-sm font-bold text-system-gold uppercase tracking-wider">
                  [ HUNTER IDENTITY ENCRYPTED ]
                </div>
                <p className="font-inter text-xs text-system-muted">
                  Your credentials have been added to the Sovereign Registry. You will receive your activation code before the app launches publicly.
                </p>
                <div className="text-[10px] text-system-accent">
                  REGISTRY TICKET: #LVL-{ticketId}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-system-muted uppercase tracking-wider">
                    ENTER HUNTER TRANSMISSION ADDRESS (EMAIL)
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="hunter@levelup.app"
                    className="w-full px-4 py-3 bg-black/60 border border-system-accent/30 rounded text-system-text font-mono text-xs focus:outline-none focus:border-system-gold transition-colors placeholder:text-system-muted/50"
                  />
                </div>

                <button
                  type="submit"
                  onMouseEnter={() => sfx.playHover()}
                  className="w-full py-3.5 px-6 rounded font-cinzel text-sm font-bold uppercase tracking-wider bg-system-gold text-black hover:bg-yellow-400 transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(245,197,66,0.5)] group"
                >
                  <span>BECOME A HUNTER [CLAIM INVITE]</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="flex items-center justify-between text-[10px] font-mono text-system-muted pt-2 border-t border-system-accent/10">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>EARLY ACCESS FREE</span>
                  </span>
                  <span>BATCH 01 // 85% FULL</span>
                </div>
              </form>
            )}
          </div>
        </AnimeTiltCard>

        {/* Shadow Monarch Ascension & Army Barracks Hub */}
        <div className="w-full max-w-4xl mx-auto my-6 font-mono">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-system-accent/25 pb-3 mb-6 gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-system-gold animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-yellow-300">
                [ SHADOW MONARCH DOMAIN // ASCENSION & ROSTER ]
              </span>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                onClick={() => {
                  sfx.playClick();
                  setMonarchTab('3d-roster');
                }}
                onMouseEnter={() => sfx.playHover()}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                  monarchTab === '3d-roster'
                    ? 'bg-purple-600 text-white border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                    : 'bg-black/50 border-white/10 text-gray-400 hover:text-white hover:border-purple-500/30'
                }`}
              >
                👑 3D SHADOW ROSTER
              </button>

              <button
                onClick={() => {
                  sfx.playClick();
                  setMonarchTab('certificate');
                }}
                onMouseEnter={() => sfx.playHover()}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                  monarchTab === 'certificate'
                    ? 'bg-yellow-600 text-white border-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.4)]'
                    : 'bg-black/50 border-white/10 text-gray-400 hover:text-white hover:border-yellow-500/30'
                }`}
              >
                📜 S-RANK CREDENTIAL
              </button>

              <button
                onClick={() => {
                  sfx.playClick();
                  setMonarchTab('barracks');
                }}
                onMouseEnter={() => sfx.playHover()}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                  monarchTab === 'barracks'
                    ? 'bg-purple-600 text-white border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                    : 'bg-black/50 border-white/10 text-gray-400 hover:text-white hover:border-purple-500/30'
                }`}
              >
                🛡️ SHADOW BARRACKS
              </button>
            </div>
          </div>

          {/* Active Module View */}
          <div className="w-full">
            {monarchTab === '3d-roster' && <ThreeCharacterShowcase />}
            {monarchTab === 'certificate' && <HunterAscensionCertificate />}
            {monarchTab === 'barracks' && <ShadowBarracks />}
          </div>
        </div>

        {/* Store Badges Preview */}
        <div className="pt-4 flex flex-wrap justify-center items-center gap-4 text-xs font-mono text-system-muted">
          <div
            onMouseEnter={() => sfx.playHover()}
            className="px-4 py-2 rounded bg-system-panel/60 border border-system-accent/20 flex items-center gap-2 cursor-pointer hover:border-system-accent/50 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-system-accent" />
            <span>AVAILABLE ON IOS & ANDROID AT LAUNCH</span>
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-6xl mx-auto pt-16 pb-4 border-t border-system-accent/15 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-system-muted">
        <div className="flex items-center gap-3">
          <span className="font-cinzel font-bold text-system-text tracking-wider">LEVEL UP</span>
          <span>•</span>
          <span>HUNTER RPG NUTRITION & WORKOUT SYSTEM</span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/Tejas-952007/SOLO-GYM.git"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => sfx.playHover()}
            className="flex items-center gap-1 hover:text-system-text transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GITHUB</span>
          </a>
          <span>•</span>
          <span>BUILT FOR INDIAN LIFTERS</span>
        </div>
      </footer>

      {/* Fullscreen Interactive Shadow Extraction Cutscene */}
      <ShadowExtractionRitual
        isOpen={ritualOpen}
        onClose={() => setRitualOpen(false)}
      />
    </section>
  );
}
