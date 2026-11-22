"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Disc3 } from "lucide-react";
import { sfx } from "@/lib/audio-sfx";
import { spawnCombatNumber } from "@/components/effects/FloatingDamageNumbers";

interface AudioContextType {
  isPlaying: boolean;
  toggleAudio: () => void;
  playAudio: () => void;
  pauseAudio: () => void;
}

const AudioContext = createContext<AudioContextType>({
  isPlaying: false,
  toggleAudio: () => {},
  playAudio: () => {},
  pauseAudio: () => {},
});

export const useAudio = () => useContext(AudioContext);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio("/assets/audio/dark-aria.mp3");
    audio.loop = true;
    audio.volume = 0.45;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const playAudio = () => {
    sfx.startAmbientDrone();
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        spawnCombatNumber("DARK ARIA AUDIO: ACTIVE", undefined, undefined, "mana");
      }).catch((e) => {
        console.warn("Autoplay was prevented by browser policy:", e);
        setIsPlaying(true);
        spawnCombatNumber("AMBIENT SYNTH DRONE: ON", undefined, undefined, "mana");
      });
    }
  };

  const pauseAudio = () => {
    sfx.stopAmbientDrone();
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      spawnCombatNumber("AUDIO SYSTEM: MUTED", undefined, undefined, "alert");
    }
  };

  const toggleAudio = () => {
    sfx.playClick();
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  return (
    <AudioContext.Provider value={{ isPlaying, toggleAudio, playAudio, pauseAudio }}>
      {children}
    </AudioContext.Provider>
  );
}

export function AudioEqualizerButton() {
  const { isPlaying, toggleAudio } = useAudio();

  return (
    <button
      onClick={toggleAudio}
      title={isPlaying ? "Mute Dark Aria Theme" : "Play Dark Aria LV2 (Hardstyle)"}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-sm border transition-all duration-300 font-mono text-xs cursor-pointer select-none active:scale-95 ${
        isPlaying
          ? "bg-purple-950/40 border-system-accent text-system-accent shadow-system-glow"
          : "bg-black/50 border-white/10 text-system-muted hover:border-system-accent/50 hover:text-white"
      }`}
    >
      {isPlaying ? (
        <>
          <Disc3 className="w-3.5 h-3.5 animate-spin text-system-accent" />
          <span className="hidden sm:inline font-orbitron font-bold text-[11px] tracking-wider text-system-glow">
            DARK ARIA: ON
          </span>
          {/* Dancing Audio Equalizer Bars */}
          <div className="flex items-end gap-0.5 h-3">
            <span className="w-0.5 bg-system-accent animate-[bounce_0.6s_infinite_100ms] h-full" />
            <span className="w-0.5 bg-system-cyan animate-[bounce_0.8s_infinite_200ms] h-2/3" />
            <span className="w-0.5 bg-system-glow animate-[bounce_0.5s_infinite_300ms] h-full" />
            <span className="w-0.5 bg-purple-400 animate-[bounce_0.7s_infinite_150ms] h-4/5" />
          </div>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5" />
          <span className="hidden sm:inline font-mono text-[11px] text-system-muted">
            AUDIO: OFF
          </span>
        </>
      )}
    </button>
  );
}

