import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#07060D",
        panel: {
          DEFAULT: "rgba(18, 15, 36, 0.70)",
          solid: "#120F24",
          border: "rgba(139, 92, 246, 0.25)",
        },
        system: {
          accent: "var(--accent, #8B5CF6)",
          glow: "var(--accent-glow, #A78BFA)",
          text: "#EDE9FE",
          muted: "#948FB3",
          gold: "#F5C542",
          cyan: "#38BDF8",
          blue: "#0B1A33",
        },
      },
      fontFamily: {
        orbitron: ["var(--font-orbitron)", "sans-serif"],
        rajdhani: ["var(--font-rajdhani)", "sans-serif"],
        cinzel: ["var(--font-cinzel)", "serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      letterSpacing: {
        system: "0.2em",
        wideSystem: "0.3em",
      },
      boxShadow: {
        "system-glow": "0 0 25px -5px var(--accent-glow, rgba(167, 139, 250, 0.4))",
        "system-glow-lg": "0 0 50px -10px var(--accent, rgba(139, 92, 246, 0.5))",
        "gold-glow": "0 0 30px -5px rgba(245, 197, 66, 0.45)",
        "cyan-glow": "0 0 25px -5px rgba(56, 189, 248, 0.35)",
      },
      backgroundImage: {
        "grid-pattern": "linear-gradient(to right, rgba(139, 92, 246, 0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(139, 92, 246, 0.07) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
export default config;

