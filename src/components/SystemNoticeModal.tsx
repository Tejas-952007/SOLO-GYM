"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Check, ShieldAlert, Zap, Skull, Flame, Heart } from "lucide-react";
import { useAudio } from "@/components/AudioPlayer";
import { GlitchText } from "@/components/GlitchText";
import { sfx } from "@/lib/audio-sfx";

interface SystemNoticeModalProps {
  onAwaken?: () => void;
}

export function SystemNoticeModal({ onAwaken }: SystemNoticeModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAwakening, setIsAwakening] = useState(false);
  const [rejectCount, setRejectCount] = useState(0);
  const [mounted, setMounted] = useState(false);
  const { playAudio } = useAudio();

  useEffect(() => {
    setMounted(true);
    try {
      const alreadyAccepted = sessionStorage.getItem("level_up_system_accepted");
      if (alreadyAccepted === "true") {
        setIsOpen(false);
        if (onAwaken) onAwaken();
      } else {
        setIsOpen(true);
      }
    } catch {
      setIsOpen(true);
    }
  }, [onAwaken]);

  const handleAccept = () => {
    setIsAwakening(true);
    sfx.playSubBassBoom();
    sfx.playBladeSheathe();

    // Auto-play official Dark Aria audio track!
    playAudio();

    try {
      sessionStorage.setItem("level_up_system_accepted", "true");
    } catch {
      // Ignore
    }

    setTimeout(() => {
      setIsOpen(false);
      setIsAwakening(false);
      if (onAwaken) onAwaken();
    }, 1100);
  };

  const handleReject = () => {
    sfx.playDungeonAlarm();
    setRejectCount((prev) => prev + 1);
  };

  if (!mounted || !isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="system-notice-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.8 } }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#07060D]/95 backdrop-blur-2xl overflow-hidden"
      >
        {/* Background Cartenon Temple God Statue Grin with Crimson Eyes */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-85 select-none overflow-hidden">
          <div className="relative w-[380px] h-[380px] sm:w-[560px] sm:h-[560px] md:w-[760px] md:h-[760px]">
            <Image
              src="/assets/02-system/system-grin.webp"
              alt="System Entity Grin"
              fill
              priority
              className={`object-contain filter contrast-130 brightness-115 transition-all duration-500 ${
                rejectCount > 0
                  ? "drop-shadow-[0_0_80px_rgba(239,68,68,1)] brightness-125 scale-105"
                  : "drop-shadow-[0_0_45px_rgba(239,68,68,0.7)] animate-pulse"
              }`}
            />
          </div>
        </div>

        {/* Floating Dimensional Glitch Scanlines & Vignette */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#07060D]/60 to-[#07060D] pointer-events-none" />

        {/* Emergency Red Flashing Warning Screen if Rejected */}
        {rejectCount > 0 && (
          <div className="absolute inset-0 bg-red-950/25 mix-blend-color-dodge pointer-events-none animate-pulse" />
        )}

        {/* Main System Window Box */}
        <motion.div
          animate={
            rejectCount > 0
              ? {
                  x: [-12, 12, -9, 9, -5, 5, 0],
                  y: [-4, 4, -2, 2, 0],
                  transition: { duration: 0.35 },
                }
              : {}
          }
          className={`relative w-full max-w-xl z-10 system-window corner-brackets corner-brackets-full p-6 sm:p-8 rounded-sm shadow-system-glow transition-all duration-300 ${
            rejectCount > 0 ? "border-red-500 shadow-[0_0_40px_rgba(239,68,68,0.6)]" : "border-system-accent"
          } ${isAwakening ? "scale-105 brightness-150" : ""}`}
        >
          {/* Decorative Corner Brackets (TR & BL) */}
          <span className="bracket-tr" />
          <span className="bracket-bl" />

          {/* System Notification Header */}
          <div className="flex flex-col items-center border-b border-system-accent/30 pb-3 mb-5 space-y-2">
            <div className="relative h-8 sm:h-10 w-44 sm:w-52">
              <Image
                src="/assets/logo/solo-leveling-gothic-title.png"
                alt="Solo Leveling System Notice"
                fill
                priority
                className="object-contain filter brightness-125 drop-shadow-[0_0_16px_rgba(139,92,246,0.9)]"
              />
            </div>
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`w-2.5 h-2.5 rounded-full animate-ping ${
                    rejectCount > 0 ? "bg-red-500 shadow-[0_0_12px_rgba(239,68,68,1)]" : "bg-system-cyan shadow-[0_0_12px_rgba(56,189,248,1)]"
                  }`}
                />
                <span
                  className={`font-orbitron text-xs sm:text-sm tracking-system uppercase font-bold ${
                    rejectCount > 0 ? "text-red-400" : "text-system-cyan"
                  }`}
                >
                  {rejectCount > 0 ? "[ EMERGENCY DIRECTIVE // LIFE THREAT ]" : "[ SYSTEM NOTIFICATION // PROTOCOL 00 ]"}
                </span>
              </div>
              <span className="font-mono text-[10px] tracking-wider text-system-muted">
                HUNTER CANDIDATE #7849
              </span>
            </div>
          </div>

          {/* Solo Leveling Title & Awakening Narrative */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              {rejectCount > 0 ? (
                <Skull className="w-4 h-4 text-red-500 animate-bounce" />
              ) : (
                <Zap className="w-4 h-4 text-system-cyan animate-bounce" />
              )}
              <span
                className={`font-cinzel text-xs tracking-widest uppercase font-bold ${
                  rejectCount > 0 ? "text-red-400" : "text-system-cyan"
                }`}
              >
                {rejectCount > 0 ? "LIFE HAZARD ALERT: HEART FAILURE" : "CARTENON TEMPLE RE-AWAKENING"}
              </span>
            </div>

            <h2 className="font-cinzel text-2xl sm:text-4xl font-black uppercase tracking-wider text-white leading-tight">
              A SYSTEM HAS BEEN <br />
              <GlitchText
                text={rejectCount > 0 ? "MANDATED TO YOU." : "ASSIGNED TO YOU."}
                className={
                  rejectCount > 0
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-300 to-red-500"
                    : "text-transparent bg-clip-text bg-gradient-to-r from-system-cyan via-white to-purple-300"
                }
              />
            </h2>

            <p className="font-inter text-xs sm:text-sm text-system-muted leading-relaxed">
              Your mortal vitality has been evaluated as{" "}
              <strong className="text-system-cyan font-bold">Rank E (Unawakened Porter)</strong>. 
              The System hereby grants you exclusive authority to grow without biological limits.
            </p>

            {/* Simulated Live Heartbeat & Vitals Telemetry */}
            <div className="p-3 bg-black/60 border border-system-accent/30 rounded text-xs font-mono text-system-text/90 space-y-2">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-system-cyan">
                  <Heart className={`w-3.5 h-3.5 text-red-500 ${rejectCount > 0 ? "animate-ping" : "animate-pulse"}`} />
                  <span>HEART RATE:</span>
                </span>
                <span className={`font-bold ${rejectCount > 0 ? "text-red-400 animate-pulse" : "text-emerald-400"}`}>
                  {rejectCount > 0 ? "34 BPM [CRITICAL DROP]" : "76 BPM [STABLE]"}
                </span>
              </div>
              <div className="flex items-center justify-between text-system-muted">
                <span>HUNTER CLASS:</span>
                <span className="text-yellow-400 font-bold">SHADOW MONARCH ARCHETYPE</span>
              </div>
              <div className="flex items-center justify-between text-system-muted">
                <span>DAILY QUEST QUOTA:</span>
                <span className="text-white">100 PUSHUPS / 150G PROTEIN</span>
              </div>
            </div>

            {rejectCount > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-3 bg-red-950/80 border border-red-500 rounded text-xs font-mono text-red-200 flex items-start gap-2.5 shadow-[0_0_20px_rgba(239,68,68,0.5)]"
              >
                <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-red-300 uppercase">[ WARNING: REJECTION IS PROHIBITED ]</div>
                  <div className="text-[11px] text-red-200/90 leading-tight">
                    If you refuse, your heart will stop in 00:03. Survival requires becoming a Hunter.
                  </div>
                </div>
              </motion.div>
            )}

            <p className="font-cinzel text-xs tracking-widest uppercase text-system-accent font-bold pt-1">
              WILL YOU ACCEPT THE SYSTEM AND ARISE?
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-5 mt-2 border-t border-system-accent/20">
            <button
              onClick={handleAccept}
              onMouseEnter={() => sfx.playHover()}
              className="relative group w-full min-h-[50px] px-6 py-3 font-cinzel text-sm font-black tracking-widest uppercase text-black bg-gradient-to-r from-system-cyan via-white to-system-accent hover:from-white hover:to-white rounded transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(56,189,248,0.8)] hover:shadow-[0_0_45px_rgba(139,92,246,1)] active:scale-95 cursor-pointer"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>{rejectCount > 0 ? "[ SURVIVE & ACCEPT ]" : "[ YES / ACCEPT ]"}</span>
            </button>

            <button
              onClick={handleReject}
              onMouseEnter={() => sfx.playHover()}
              className="w-full min-h-[50px] px-6 py-3 font-cinzel text-sm font-bold tracking-widest uppercase text-system-muted hover:text-red-400 bg-black/50 hover:bg-red-950/40 border border-white/10 hover:border-red-500/50 rounded transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>[ NO / REMAIN WEAK ]</span>
            </button>
          </div>
        </motion.div>

        {/* Awakening Dimensional Shockwave Burst */}
        {isAwakening && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/20 backdrop-blur-md pointer-events-none animate-pulse">
            <div className="font-cinzel text-4xl sm:text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-system-cyan via-white to-system-gold drop-shadow-[0_0_60px_rgba(245,197,66,1)] uppercase tracking-wider text-center px-4 animate-bounce">
              YOU HAVE AWAKENED AS A PLAYER.
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
