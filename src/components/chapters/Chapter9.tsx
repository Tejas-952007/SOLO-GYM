"use client";

import { useState } from "react";
import Image from "next/image";
import { Zap, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Github } from "lucide-react";

export function Chapter9() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubmitted(true);
    }
  };

  return (
    <section
      id="chapter-9"
      className="relative w-full min-h-[100svh] bg-[#07060D] border-t border-system-accent/20 py-24 px-4 sm:px-8 flex flex-col justify-between overflow-hidden"
    >
      {/* Background Visual: Rank S Max Hunter with subtle aura */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <Image
          src="/assets/07-ranks/rank-s-max.webp"
          alt="S-Rank Sovereign Hunter"
          fill
          className="object-cover object-center filter saturate-150"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07060D] via-[#07060D]/80 to-[#07060D]" />
        <div className="absolute inset-0 bg-radial-gradient from-purple-900/20 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto my-auto text-center space-y-8">
        
        {/* Phase Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-system-gold/20 border border-system-gold/40 rounded text-xs font-mono tracking-wideSystem text-system-gold uppercase">
          <Zap className="w-3.5 h-3.5" />
          <span>FINAL PHASE // THE SOVEREIGN AWAKENING</span>
        </div>

        {/* Monumental Headline */}
        <div className="space-y-4">
          <h2 className="font-cinzel text-6xl sm:text-8xl md:text-9xl font-black uppercase tracking-wider text-system-gold drop-shadow-[0_0_35px_rgba(245,197,66,0.6)]">
            ARISE.
          </h2>
          <p className="font-cinzel text-xl sm:text-2xl uppercase tracking-widest text-system-text font-bold">
            THE GATE HAS OPENED. CLAIM YOUR SYSTEM.
          </p>
          <p className="font-inter text-xs sm:text-sm text-system-muted max-w-lg mx-auto leading-relaxed">
            Stop guessing your macros. Stop skipping workouts. Transform your body like an S-Rank Hunter. Join the exclusive Batch 01 Indian lifters.
          </p>
        </div>

        {/* Interactive Waitlist Box */}
        <div className="max-w-md mx-auto system-window corner-brackets p-6 rounded relative">
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
                REGISTRY TICKET: #LVL-{(Math.random() * 8999 + 1000).toFixed(0)}
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

        {/* Store Badges Preview */}
        <div className="pt-4 flex flex-wrap justify-center items-center gap-4 text-xs font-mono text-system-muted">
          <div className="px-4 py-2 rounded bg-system-panel/60 border border-system-accent/20 flex items-center gap-2">
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
            className="flex items-center gap-1 hover:text-system-text transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GITHUB</span>
          </a>
          <span>•</span>
          <span>BUILT FOR INDIAN LIFTERS</span>
        </div>
      </footer>
    </section>
  );
}
