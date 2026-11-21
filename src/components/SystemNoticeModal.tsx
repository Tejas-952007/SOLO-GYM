"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Check, ShieldAlert, Zap } from "lucide-react";
import { useAudio } from "@/components/AudioPlayer";
import { GlitchText } from "@/components/GlitchText";

interface SystemNoticeModalProps {
  onAwaken?: () => void;
}

export function SystemNoticeModal({ onAwaken }: SystemNoticeModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
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
    setIsGlitching(true);
    // Play the user's provided Dark Aria audio track!
    playAudio();

    try {
      sessionStorage.setItem("level_up_system_accepted", "true");
    } catch {
      // Ignore if sessionStorage is blocked
    }

    setTimeout(() => {
      setIsOpen(false);
      setIsGlitching(false);
      if (onAwaken) onAwaken();
    }, 600);
  };

  const handleReject = () => {
    setRejectCount((prev) => prev + 1);
  };

  if (!mounted || !isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="system-notice-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.5 } }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#07060D]/95 backdrop-blur-xl overflow-hidden"
      >
        {/* Sinister Grin in the Background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-80 select-none overflow-hidden">
          <div className="relative w-[420px] h-[420px] sm:w-[620px] sm:h-[620px] md:w-[820px] md:h-[820px] mask-radial">
            <Image
              src="/assets/02-system/system-grin.webp"
              alt="System Entity Grin"
              fill
              priority
              className="object-contain filter contrast-150 brightness-110 drop-shadow-[0_0_35px_rgba(139,92,246,0.5)] animate-pulse"
            />
          </div>
        </div>

        {/* Floating Cyber Dust / Vignette */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#07060D]/60 to-[#07060D] pointer-events-none" />

        {/* Main System Window Box */}
        <motion.div
          animate={
            rejectCount > 0
              ? {
                  x: [-8, 8, -6, 6, -3, 3, 0],
                  transition: { duration: 0.4 },
                }
              : {}
          }
          className={`relative w-full max-w-lg z-10 system-window corner-brackets corner-brackets-full p-6 sm:p-8 rounded-sm shadow-system-glow transition-all duration-300 ${
            isGlitching ? "glitch-active scale-105" : ""
          }`}
          style={{
            borderColor: rejectCount > 0 ? "rgba(239, 68, 68, 0.7)" : "var(--accent)",
          }}
        >
          {/* Decorative Corner Brackets (TR & BL) */}
          <span className="bracket-tr" />
          <span className="bracket-bl" />

          {/* System Notification Header */}
          <div className="flex items-center justify-between border-b border-system-accent/30 pb-3 mb-5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-system-accent animate-ping" />
              <span className="font-orbitron text-xs sm:text-sm tracking-system text-system-accent uppercase font-bold">
                [ SYSTEM NOTIFICATION ]
              </span>
            </div>
            <span className="font-mono text-[10px] tracking-wider text-system-muted">
              QUEST ID #001
            </span>
          </div>

          {/* Solo Leveling Style Title Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-system-cyan animate-bounce" />
              <span className="font-cinzel text-xs tracking-widest text-system-cyan uppercase">
                HUNTER AWAKENING SEQUENCE
              </span>
            </div>

            <h2 className="font-cinzel text-2xl sm:text-3xl font-black uppercase tracking-wider text-white leading-tight">
              A SYSTEM HAS BEEN <br />
              <GlitchText
                text="ASSIGNED TO YOU."
                className="text-transparent bg-clip-text bg-gradient-to-r from-system-cyan via-purple-200 to-indigo-300"
              />
            </h2>

            <p className="font-inter text-sm sm:text-base text-system-muted leading-relaxed">
              Your physical capacity has been registered as{" "}
              <strong className="text-system-cyan font-semibold">Rank E (Unawakened)</strong>. 
              The System will track your protein synthesis, physical discipline, and daily quests.
            </p>

            <div className="p-3 bg-black/50 border border-system-accent/25 rounded text-xs font-mono text-system-text/80 space-y-1.5">
              <div className="flex items-center gap-2 text-system-accent">
                <Check className="w-3.5 h-3.5" />
                <span>Primary Directive: Rebuild muscle architecture</span>
              </div>
              <div className="flex items-center gap-2 text-system-muted">
                <span className="w-3.5 text-center">•</span>
                <span>Target: E-Rank Porter → S-Rank Monarch</span>
              </div>
            </div>

            {rejectCount > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-2.5 bg-red-950/60 border border-red-500/70 rounded text-xs font-mono text-red-300"
              >
                <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 animate-bounce" />
                <span>[ WARNING: PENALTY QUEST IMMINENT. REJECTION IS NOT PERMITTED. ]</span>
              </motion.div>
            )}

            <p className="font-cinzel text-xs tracking-widest uppercase text-system-accent pt-1">
              DO YOU ACCEPT THE AWAKENING?
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 mt-2 border-t border-system-accent/20">
            <button
              onClick={handleAccept}
              className="relative group w-full min-h-[48px] px-6 py-3 font-cinzel text-sm font-black tracking-widest uppercase text-black bg-gradient-to-r from-system-cyan to-system-accent hover:from-white hover:to-white rounded transition-all duration-200 flex items-center justify-center gap-2 shadow-system-glow hover:shadow-system-glow-lg active:scale-95 cursor-pointer"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>[ YES / ACCEPT ]</span>
            </button>

            <button
              onClick={handleReject}
              className="w-full min-h-[48px] px-6 py-3 font-cinzel text-sm font-bold tracking-widest uppercase text-system-muted hover:text-red-400 bg-black/50 hover:bg-red-950/30 border border-white/10 hover:border-red-500/40 rounded transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>[ NO / REMAIN WEAK ]</span>
            </button>
          </div>
        </motion.div>

        {/* Awakening Glitch Flash */}
        {isGlitching && (
          <div className="fixed inset-0 z-50 bg-system-accent/30 mix-blend-overlay pointer-events-none animate-ping" />
        )}
      </motion.div>
    </AnimatePresence>
  );
}
