"use client";

import { useState } from "react";
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

          {/* Ch2: "THE SYSTEM CHOSE YOU" + S-Rank Anatomy Flip Card */}
          <Chapter2 />

          {/* Ch3: "THE GYM IS YOUR DUNGEON" (Floors 01 to 04 Clearance) */}
          <Chapter3 />

          {/* Ch4: "DISCIPLINE BEATS MOTIVATION" (Desktop Horizontal Pinned Scroll) */}
          <Chapter4 />

          {/* Ch5: "FOOD IS YOUR WEAPON" (Indian Nutrition Grimoire & Macros) */}
          <Chapter5 />

          {/* Ch6: "THE ENEMIES" (Distraction Chains, Recovery Tank, Rage Mindset) */}
          <Chapter6 />

          {/* Ch7: "RANK UP" (Signature E -> S Evolution Matrix & Stat Gauges) */}
          <Chapter7 />

          {/* Ch8: "YOUR AI COACH" (Illustrative Chat HUD & 4 Feature Pillars) */}
          <Chapter8 />

          {/* Unlockable System Armory Skins (Obsidian, Solar, Jade) */}
          <SkinsSection />

          {/* Ch9: "ARISE." (The Sovereign Awakening & Final Waitlist CTA) */}
          <Chapter9 />
        </main>
      </SmoothScroll>
    </AudioProvider>
  );
}
