export const MOTION_CONFIG = {
  breakpoints: {
    mobileMax: 767,
    desktopMin: 768,
  },
  colorTransitions: {
    weak: {
      accent: "#38BDF8", // Cyan
      glow: "#7DD3FC",
      bgTint: "#0B1A33", // Cold desaturated blue
      ambientLight: "rgba(56, 189, 248, 0.12)",
    },
    awakening: {
      accent: "#818CF8", // Indigo/blue-violet
      glow: "#A5B4FC",
      bgTint: "#13112E",
      ambientLight: "rgba(129, 140, 248, 0.15)",
    },
    power: {
      accent: "#8B5CF6", // Deep Purple
      glow: "#A78BFA",
      bgTint: "#120F24",
      ambientLight: "rgba(139, 92, 246, 0.20)",
    },
    ascension: {
      accent: "#8B5CF6",
      glow: "#C4B5FD",
      bgTint: "#0D0A1C",
      goldRank: "#F5C542",
      ambientLight: "rgba(245, 197, 66, 0.15)",
    },
  },
  ch1: {
    vignetteSpeed: 1.2,
    hunterScaleEnd: 0.92,
    parallaxBg: 0.25,
  },
  ch2: {
    grinScaleStart: 0.85,
    grinScaleEnd: 1.15,
    scrubDuration: 1.5,
    typewriterSpeed: 25, // ms per char
  },
  ch3: {
    crossfadeScrub: 1,
    stagesCount: 4,
  },
  preloader: {
    criticalImages: [
      "/assets/02-system/system-grin.webp",
      "/assets/01-weak/weak-hunter.webp",
      "/assets/02-system/weak-meets-system.webp",
      "/assets/03-gym/gym-abandoned.webp",
      "/assets/03-gym/gym-wide-day.webp",
      "/assets/03-gym/gym-bright-tall.webp",
      "/assets/03-gym/gym-neon.webp",
      "/assets/03-gym/gym-dumbbells.webp",
    ],
  },
} as const;

