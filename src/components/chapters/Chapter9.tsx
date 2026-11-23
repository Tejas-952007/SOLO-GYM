"use client";

import { useState } from "react";
import Image from "next/image";
import { Zap, CheckCircle2, ArrowRight, ShieldCheck, Github, Sparkles, Film, Crown } from "lucide-react";
import { DecodeText } from "@/components/ui/DecodeText";
import { BladeSliceHeading } from "@/components/ui/BladeSliceHeading";
import { ThreeCharacterShowcase } from "@/components/ThreeCharacterShowcase";
import { ShadowExtractionRitual } from "@/components/effects/ShadowExtractionRitual";
import { ShadowBarracks } from "@/components/ui/ShadowBarracks";
import { HunterAscensionCertificate } from "@/components/ui/HunterAscensionCertificate";
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
      className="relative w-full min-h-[100svh] bg-[#07060D] py-20 px-4 sm:px-8 flex flex-col justify-between overflow-hidden"
    >
      {/* Volumetric Fog Portal Transition */}
      <div className="absolute top-0 inset-x-0 h-36 bg-gradient-to-b from-[#07060D] via-[#07060D]/80 to-transparent pointer-events-none z-20" />

      {/* Atmospheric S-Rank Visage Background */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <Image
          src="/assets/07-ranks/rank-s-max.webp"
          alt="S-Rank Visage Background"
          fill
          priority
          className="object-cover object-[center_30%] filter contrast-125 brightness-105"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07060D] via-[#07060D]/70 to-[#07060D]/85" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto space-y-12 my-auto">
        {/* Chapter 9 Hero Heading */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-[11px] font-mono tracking-widest text-yellow-300 uppercase">
            <Zap className="w-3.5 h-3.5 text-yellow-400" />
            <span><DecodeText text="CHAPTER 09 // THE SOVEREIGN AWAKENING" /></span>
          </div>

          <BladeSliceHeading
            as="h2"
            className="font-cinzel text-5xl sm:text-7xl md:text-9xl font-black uppercase tracking-widest text-system-gold drop-shadow-[0_0_35px_rgba(245,197,66,0.6)]"
          >
            ARISE.
          </BladeSliceHeading>

          <p className="font-cinzel text-lg sm:text-2xl uppercase tracking-widest text-white font-bold max-w-2xl mx-auto">
            THE GATE HAS OPENED. CLAIM YOUR SHADOW MONARCH SYSTEM.
          </p>
          <p className="font-inter text-xs sm:text-sm text-gray-400 max-w-lg mx-auto leading-relaxed">
            Stop guessing macros. Stop skipping workouts. Transform your physique like an S-Rank Hunter.
          </p>
        </div>

        {/* Tactical Monarch Hub Navigation Bar */}
        <div className="w-full space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between border-b border-white/10 pb-4 gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-pulse shadow-[0_0_10px_rgba(250,204,21,1)]" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-yellow-300">
                [ SHADOW MONARCH DOMAIN // ASCENSION & ROSTER ]
              </span>
            </div>

            {/* Clean Floating Pills */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => {
                  sfx.playClick();
                  setMonarchTab('3d-roster');
                }}
                onMouseEnter={() => sfx.playHover()}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 ${
                  monarchTab === '3d-roster'
                    ? 'bg-purple-600 text-white border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.5)]'
                    : 'bg-black/60 border-white/10 text-gray-400 hover:text-white hover:border-purple-500/30'
                }`}
              >
                <Crown className="w-3.5 h-3.5" />
                <span>3D & 4K ROSTER</span>
              </button>

              <button
                onClick={() => {
                  sfx.playClick();
                  setMonarchTab('certificate');
                }}
                onMouseEnter={() => sfx.playHover()}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 ${
                  monarchTab === 'certificate'
                    ? 'bg-yellow-600 text-white border-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.5)]'
                    : 'bg-black/60 border-white/10 text-gray-400 hover:text-white hover:border-yellow-500/30'
                }`}
              >
                <span>📜 S-RANK CREDENTIAL</span>
              </button>

              <button
                onClick={() => {
                  sfx.playClick();
                  setMonarchTab('barracks');
                }}
                onMouseEnter={() => sfx.playHover()}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 ${
                  monarchTab === 'barracks'
                    ? 'bg-purple-600 text-white border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.5)]'
                    : 'bg-black/60 border-white/10 text-gray-400 hover:text-white hover:border-purple-500/30'
                }`}
              >
                <span>🛡️ SHADOW BARRACKS</span>
              </button>
            </div>
          </div>

          {/* Active View Module */}
          <div className="w-full">
            {monarchTab === '3d-roster' && <ThreeCharacterShowcase />}
            {monarchTab === 'certificate' && <HunterAscensionCertificate />}
            {monarchTab === 'barracks' && <ShadowBarracks />}
          </div>
        </div>

        {/* Sovereign Awakening Invite Box */}
        <div className="w-full max-w-xl mx-auto pt-4">
          <div className="w-full rounded-2xl bg-black/75 border border-yellow-500/30 p-6 sm:p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(245,197,66,0.15)] space-y-5">
            {isSubmitted ? (
              <div className="py-4 space-y-3 font-mono text-center">
                <div className="w-12 h-12 rounded-full bg-yellow-500/20 border border-yellow-500/40 mx-auto flex items-center justify-center text-yellow-300">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="text-sm font-bold text-yellow-300 uppercase tracking-wider">
                  [ HUNTER IDENTITY ENCRYPTED & REGISTERED ]
                </div>
                <p className="font-inter text-xs text-gray-400">
                  Your credentials are added to the Sovereign Registry. You will receive your activation code before public launch.
                </p>
                <div className="text-[11px] text-cyan-400 font-mono">
                  REGISTRY TICKET: #LVL-{ticketId}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left font-mono">
                <div className="space-y-1.5">
                  <label className="text-[10px] text-gray-400 uppercase tracking-wider block">
                    ENTER HUNTER TRANSMISSION ADDRESS (EMAIL)
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="hunter@levelup.app"
                    className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-yellow-400 transition-colors placeholder:text-gray-600"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    onMouseEnter={() => sfx.playHover()}
                    className="flex-1 py-3.5 px-6 rounded-xl font-cinzel text-sm font-bold uppercase tracking-wider bg-system-gold text-black hover:bg-yellow-400 transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(245,197,66,0.5)] cursor-pointer group"
                  >
                    <span>CLAIM HUNTER INVITE</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      sfx.playDemonRoar();
                      window.dispatchEvent(new CustomEvent("trigger-arise-cutscene"));
                    }}
                    onMouseEnter={() => sfx.playHover()}
                    className="px-5 py-3.5 rounded-xl bg-purple-950/70 border border-purple-500/50 hover:border-purple-400 text-purple-200 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:scale-105 active:scale-95"
                  >
                    <Zap className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                    <span>ARISE CUTSCENE</span>
                  </button>
                </div>

                <div className="flex items-center justify-between text-[10px] text-gray-500 pt-2 border-t border-white/10">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>EARLY ACCESS FREE</span>
                  </span>
                  <span>BATCH 01 // 85% FULL</span>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Store Badges Preview */}
        <div className="pt-2 flex flex-wrap justify-center items-center gap-4 text-xs font-mono text-gray-500">
          <div
            onMouseEnter={() => sfx.playHover()}
            className="px-4 py-2 rounded-full bg-white/5 border border-white/10 flex items-center gap-2 cursor-pointer hover:border-white/20 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>AVAILABLE ON IOS & ANDROID AT LAUNCH</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-5xl mx-auto pt-16 pb-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-gray-500">
        <div className="flex items-center gap-3">
          <span className="font-cinzel font-bold text-white tracking-wider">LEVEL UP</span>
          <span>•</span>
          <span>HUNTER RPG NUTRITION & WORKOUT SYSTEM</span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/Tejas-952007/SOLO-GYM.git"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => sfx.playHover()}
            className="flex items-center gap-1 hover:text-white transition-colors"
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
