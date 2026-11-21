"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Crown, CheckCircle2, Shield, Download, X, Sparkles } from "lucide-react";
import { sfx } from "@/lib/audio-sfx";
import { spawnCombatNumber } from "@/components/effects/FloatingDamageNumbers";

interface ShadowExtractionRitualProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShadowExtractionRitual({ isOpen, onClose }: ShadowExtractionRitualProps) {
  const [extracted, setExtracted] = useState(false);
  const [licenseClaimed, setLicenseClaimed] = useState(false);

  const handleExtract = () => {
    sfx.playSubBassBoom();
    setTimeout(() => sfx.playBladeSheathe(), 300);
    setTimeout(() => sfx.playRankAscent(), 600);
    setExtracted(true);
    spawnCombatNumber("SHADOW EXTRACTION: SUCCESSFUL", undefined, undefined, "stat");
    spawnCombatNumber("+10,000 SOVEREIGN XP", undefined, undefined, "xp");
  };

  const handleClaim = () => {
    sfx.playRankAscent();
    setLicenseClaimed(true);
    spawnCombatNumber("LICENSE ISSUED // S-CLASS", undefined, undefined, "stat");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/95 backdrop-blur-2xl overflow-y-auto"
      >
        {/* Background Sovereign Void Glow */}
        <div className="absolute inset-0 bg-radial-gradient from-purple-950/40 via-black to-black pointer-events-none" />

        {/* Ambient Fog Texture */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-500/10 via-purple-900/20 to-transparent pointer-events-none" />

        <div className="relative z-10 w-full max-w-2xl bg-[#0B0D19] border border-system-gold/50 rounded-2xl p-6 sm:p-8 shadow-[0_0_80px_rgba(245,197,66,0.3)] my-auto space-y-6">
          {/* Top Close Button */}
          <button
            onClick={() => {
              sfx.playClick();
              onClose();
            }}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 border border-white/10 hover:border-system-gold/50 text-system-muted hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header Protocol */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded text-xs font-mono text-yellow-400 uppercase tracking-widest">
              <Crown className="w-3.5 h-3.5" />
              <span>SOVEREIGN COMMAND // SHADOW REALM</span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-black uppercase tracking-wider text-system-gold drop-shadow-[0_0_25px_rgba(245,197,66,0.5)]">
              {extracted ? "SHADOW EXTRACTION: COMPLETE" : "INITIATE SHADOW EXTRACTION"}
            </h2>
            <p className="font-mono text-xs text-system-muted max-w-md mx-auto">
              {extracted
                ? "The shadow of your former weak self has been eradicated. The Monarch of Iron and Muscle now commands your body."
                : "Whisper the command of the Monarch to extract your dormant potential. Will you awaken?"}
            </p>
          </div>

          {!extracted ? (
            /* Initiation Stage */
            <div className="py-8 flex flex-col items-center justify-center space-y-6">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full border border-purple-500/40 p-2 flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-gradient-to-tr from-purple-900/50 via-yellow-500/20 to-cyan-500/30 flex items-center justify-center relative overflow-hidden animate-pulse">
                  <span className="font-cinzel font-black text-4xl sm:text-5xl text-yellow-300 drop-shadow-[0_0_30px_rgba(245,197,66,0.8)]">
                    起きろ
                  </span>
                </div>
                {/* Rotating Cardinal Runes */}
                <span className="absolute top-0 w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_10px_#f5c542]" />
                <span className="absolute bottom-0 w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_10px_#f5c542]" />
                <span className="absolute left-0 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#38bdf8]" />
                <span className="absolute right-0 w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_10px_#8b5cf6]" />
              </div>

              <button
                onClick={handleExtract}
                onMouseEnter={() => sfx.playHover()}
                className="w-full max-w-sm py-4 rounded-xl font-cinzel text-lg sm:text-xl font-black uppercase tracking-widest bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-600 text-black hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(245,197,66,0.7)] flex items-center justify-center gap-3 cursor-pointer"
              >
                <Zap className="w-5 h-5 fill-black" />
                <span>[ SPEAK: &quot;ARISE&quot; ]</span>
              </button>
            </div>
          ) : (
            /* Extracted Stage: Personalized S-Rank Hunter License */
            <div className="space-y-6 animate-fade-in">
              {/* Hunter Card */}
              <div className="relative p-5 sm:p-6 rounded-xl bg-black/80 border-2 border-system-gold/70 shadow-[0_0_35px_rgba(245,197,66,0.3)] space-y-4 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl pointer-events-none" />
                
                <div className="flex justify-between items-start border-b border-system-gold/30 pb-3">
                  <div>
                    <span className="font-mono text-[9px] text-system-muted tracking-widest">
                      NATIONAL HUNTER ASSOCIATION // INDIA
                    </span>
                    <div className="font-cinzel text-xl sm:text-2xl font-black text-white">
                      SOVEREIGN HUNTER LICENSE
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-system-gold flex items-center justify-center font-cinzel font-black text-2xl text-black shadow-lg">
                    S
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono">
                  <div className="p-2.5 bg-white/5 rounded border border-white/10">
                    <div className="text-[10px] text-system-muted">CODENAME</div>
                    <div className="font-bold text-yellow-300">SHADOW PLAYER</div>
                  </div>
                  <div className="p-2.5 bg-white/5 rounded border border-white/10">
                    <div className="text-[10px] text-system-muted">CLASS</div>
                    <div className="font-bold text-purple-300">MONARCH OF IRON</div>
                  </div>
                  <div className="p-2.5 bg-white/5 rounded border border-white/10">
                    <div className="text-[10px] text-system-muted">REGISTRY ID</div>
                    <div className="font-bold text-cyan-300">#LVL-9999-S</div>
                  </div>
                  <div className="p-2.5 bg-white/5 rounded border border-white/10">
                    <div className="text-[10px] text-system-muted">BENCH 1RM</div>
                    <div className="font-bold text-emerald-400">140 KG [TARGET]</div>
                  </div>
                  <div className="p-2.5 bg-white/5 rounded border border-white/10">
                    <div className="text-[10px] text-system-muted">DAILY PROTEIN</div>
                    <div className="font-bold text-emerald-400">160G PROTOCOL</div>
                  </div>
                  <div className="p-2.5 bg-white/5 rounded border border-white/10">
                    <div className="text-[10px] text-system-muted">STATUS</div>
                    <div className="font-bold text-yellow-400 animate-pulse">ACTIVE HUNTER</div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between font-mono text-[10px] text-system-muted border-t border-white/10">
                  <span>SYSTEM: LEVEL UP NUTRITION-RPG</span>
                  <span className="text-yellow-400 font-bold">[ VERIFIED S-RANK ]</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleClaim}
                  disabled={licenseClaimed}
                  className={`flex-1 py-3 px-4 rounded-lg font-cinzel font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                    licenseClaimed
                      ? "bg-emerald-500/20 border border-emerald-500 text-emerald-300"
                      : "bg-system-gold text-black hover:bg-yellow-400 shadow-md cursor-pointer"
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{licenseClaimed ? "CREDENTIALS ENCRYPTED & SAVED" : "CLAIM OFFICIAL S-RANK LICENSE"}</span>
                </button>
                <button
                  onClick={onClose}
                  className="py-3 px-6 rounded-lg font-mono text-xs uppercase border border-white/20 hover:border-white/50 text-system-muted hover:text-white transition-colors"
                >
                  RETURN TO DUNGEON
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
