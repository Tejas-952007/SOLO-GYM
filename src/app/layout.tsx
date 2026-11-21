import type { Metadata, Viewport } from "next";
import { Orbitron, Rajdhani, Inter, Cinzel_Decorative } from "next/font/google";
import "@/styles/globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

const rajdhani = Rajdhani({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-rajdhani",
  display: "swap",
});

const cinzel = Cinzel_Decorative({
  weight: ["700", "900"],
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LEVEL UP | Nutrition-RPG Fitness Awakening",
  description: "Level up your body like a Hunter. Nutrition-RPG fitness app for Indian lifters tracking protein, daily quests, and muscle growth.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#07060D",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${rajdhani.variable} ${cinzel.variable} ${inter.variable}`}
    >
      <body className="bg-background text-system-text font-inter relative min-h-[100svh] overflow-x-hidden selection:bg-system-accent selection:text-black">
        {/* Atmospheric Layers */}
        <div className="color-grade-layer" aria-hidden="true" />
        <div className="scanlines-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
