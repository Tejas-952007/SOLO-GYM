"use client";

import { useState, useEffect } from "react";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Preloader } from "@/components/Preloader";
import { ColorGradeManager } from "@/components/ColorGradeManager";
import { AudioProvider } from "@/components/AudioPlayer";
import { SystemNoticeModal } from "@/components/SystemNoticeModal";
import { SystemHeader } from "@/components/SystemHeader";
import { ThreeManaCanvas } from "@/components/ThreeManaCanvas";
import { CinematicReticle } from "@/components/CinematicReticle";
import { ManaTrailCursor } from "@/components/effects/ManaTrailCursor";
import { FloatingDamageNumbers } from "@/components/effects/FloatingDamageNumbers";
import { SpatialDungeonPerspective } from "@/components/effects/SpatialDungeonPerspective";
import { CinematicOverlay } from "@/components/CinematicOverlay";
import { HunterStatusConsole } from "@/components/HunterStatusConsole";
import { HunterCommandPalette } from "@/components/ui/HunterCommandPalette";
import { KeyboardShortcutsModal } from "@/components/ui/KeyboardShortcutsModal";
import { AriseAwakeningSequence } from "@/components/effects/AriseAwakeningSequence";
import { BladeSlashDivider } from "@/components/ui/BladeSlashDivider";
import { HunterCommandDock } from "@/components/ui/HunterCommandDock";
import { StoryTimelineHUD } from "@/components/StoryTimelineHUD";
import { Chapter1 } from "@/components/chapters/Chapter1";
import { Chapter2 } from "@/components/chapters/Chapter2";
import { Chapter3 } from "@/components/chapters/Chapter3";
import { Chapter4 } from "@/components/chapters/Chapter4";
import { Chapter5 } from "@/components/chapters/Chapter5";
import { Chapter6 } from "@/components/chapters/Chapter6";
import { Chapter7 } from "@/components/chapters/Chapter7";
import { Chapter8 } from "@/components/chapters/Chapter8";
import { SkinsSection } from "@/components/chapters/SkinsSection";
import { Chapter9 } from "@/components/chapters/Chapter9";

export default function Home() {
  const [awakened, setAwakened] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isAriseOpen, setIsAriseOpen] = useState(false);

  useEffect(() => {
    const handleTriggerArise = () => {
      setIsAriseOpen(true);
    };
    window.addEventListener("trigger-arise-cutscene", handleTriggerArise);
    return () => window.removeEventListener("trigger-arise-cutscene", handleTriggerArise);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      } else if (e.key === "k" || e.key === "K") {
        if (!(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
          e.preventDefault();
          setIsCommandOpen((prev) => !prev);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <AudioProvider>
      <SmoothScroll>
        {/* Background 3D WebGL Mana Particle Field */}
        <ThreeManaCanvas />

        {/* Global CRT Scanline, Grain & Vignette Overlay */}
        <CinematicOverlay />

        {/* 3D Spatial Dungeon Perspective & Floating Glyphs */}
        <SpatialDungeonPerspective />

        {/* Persistent 9-Chapter Storyline Progression HUD */}
        <StoryTimelineHUD />

        {/* Global Hunter RPG Status Console & Hotkey (C) */}
        <HunterStatusConsole />

        {/* Global Hunter Keyboard Shortcuts Modal (?) & Bottom-Left Dock */}
        <KeyboardShortcutsModal />

        {/* Cinematic Fullscreen "ARISE" Awakening Sequence Cutscene */}
        <AriseAwakeningSequence
          isOpen={isAriseOpen}
          onClose={() => setIsAriseOpen(false)}
        />

        {/* Global Dimensional Command Palette (K / Cmd+K) */}
        <HunterCommandPalette
          isOpen={isCommandOpen}
          onClose={() => setIsCommandOpen(false)}
          onOpenConsole={() => window.dispatchEvent(new CustomEvent("open-hunter-console"))}
          onTriggerArise={() => setIsAriseOpen(true)}
        />

        {/* Unified, Minimalist Hunter Command Deck (K, C, ?) */}
        <HunterCommandDock onOpenCommand={() => setIsCommandOpen(true)} />

        {/* Desktop Interactive HUD Reticle */}
        <CinematicReticle />

        {/* Dynamic Mana Embers Cursor Trail */}
        <ManaTrailCursor />

        {/* Global RPG Floating Combat & XP Damage Numbers */}
        <FloatingDamageNumbers />

        {/* Preloader & Story Color Atmosphere */}
        <Preloader />
        <ColorGradeManager />

        {/* System Notice Awakening Intro Modal */}
        <SystemNoticeModal onAwaken={() => setAwakened(true)} />

        {/* Top Floating Glass HUD Header with Music & Soundwave */}
        <SystemHeader />

        {/* Main 9-Chapter Narrative Journey */}
        <main className="relative z-10 w-full min-h-screen">
          {/* Ch1: "THIS IS YOU. RANK E." */}
          <Chapter1 />

          <BladeSlashDivider label="GATEWAY 01 // THE AWAKENING" sub="CARTENON TEMPLE PACT" theme="cyan" />

          {/* Ch2: "THE SYSTEM CHOSE YOU" + S-Rank Anatomy Flip Card */}
          <Chapter2 />

          <BladeSlashDivider label="GATEWAY 02 // GAUNTLET DESCENT" sub="FLOORS 01 TO 04 CLEARANCE" theme="violet" />

          {/* Ch3: "THE GYM IS YOUR DUNGEON" (Floors 01 to 04 Clearance) */}
          <Chapter3 />

          <BladeSlashDivider label="GATEWAY 03 // DISCIPLINE PROTOCOL" sub="MENTOR CODE ACTIVATED" theme="cyan" />

          {/* Ch4: "DISCIPLINE BEATS MOTIVATION" (Desktop Horizontal Pinned Scroll) */}
          <Chapter4 />

          <BladeSlashDivider label="GATEWAY 04 // NUTRITION ALCHEMY" sub="INDIAN FOOD GRIMOIRE" theme="gold" />

          {/* Ch5: "FOOD IS YOUR WEAPON" (Indian Nutrition Grimoire & Macros) */}
          <Chapter5 />

          <BladeSlashDivider label="GATEWAY 05 // DEMON BACK OVERDRIVE" sub="SLAY PROCRASTINATION" theme="red" />

          {/* Ch6: "THE ENEMIES" (Distraction Chains, Recovery Tank, Rage Mindset) */}
          <Chapter6 />

          <BladeSlashDivider label="GATEWAY 06 // SOVEREIGN ASCENSION" sub="RANK E TO RANK S LADDER" theme="violet" />

          {/* Ch7: "RANK UP" (Signature E -> S Evolution Matrix & Stat Gauges) */}
          <Chapter7 />

          <BladeSlashDivider label="GATEWAY 07 // NEURAL ADVISOR" sub="DESI MACRO TERMINAL" theme="cyan" />

          {/* Ch8: "YOUR AI COACH" (Illustrative Chat HUD & 4 Feature Pillars) */}
          <Chapter8 />

          {/* Unlockable System Armory Skins (Obsidian, Solar, Jade) */}
          <SkinsSection />

          <BladeSlashDivider label="GATEWAY 08 // THE MONARCH MONOLITH" sub="ARISE EXTRACTION RITUAL" theme="gold" />

          {/* Ch9: "ARISE." (The Sovereign Awakening & Final Waitlist CTA) */}
          <Chapter9 />
        </main>
      </SmoothScroll>
    </AudioProvider>
  );
}
