import puppeteer from "puppeteer-core";
import path from "path";

const ARTIFACT_DIR = "/home/tejas/.gemini/antigravity/brain/94e7849a-2d30-4808-af39-96e000b7ae63";

async function run() {
  console.log("Launching browser for mobile capture...");
  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/google-chrome",
    headless: "new",
    args: ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"],
  });

  try {
    const chapters = [
      { id: "chapter-1", name: "ch1-rank-e" },
      { id: "chapter-2", name: "ch2-system-chose-you" },
      { id: "chapter-3", name: "ch3-dungeon" },
      { id: "chapter-4", name: "ch4-discipline" },
      { id: "chapter-5", name: "ch5-nutrition-grimoire" },
      { id: "chapter-6", name: "ch6-enemies-rage" },
      { id: "chapter-7", name: "ch7-rank-evolution" },
      { id: "chapter-8", name: "ch8-ai-coach" },
      { id: "skins-armory", name: "ch8-skins-armory" },
      { id: "chapter-9", name: "ch9-arise-final" },
    ];

    // Mobile Capture
    console.log("Setting up Mobile session (390x844)...");
    const pageMobile = await browser.newPage();
    await pageMobile.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
    await pageMobile.evaluateOnNewDocument(() => {
      sessionStorage.setItem("level_up_system_accepted", "true");
    });
    await pageMobile.goto("http://localhost:3001", { waitUntil: "domcontentloaded", timeout: 15000 });
    await new Promise((r) => setTimeout(r, 2000));

    for (const ch of chapters) {
      console.log(`Capturing Mobile: ${ch.name}...`);
      await pageMobile.evaluate((targetId) => {
        const el = document.querySelector(`#${targetId}`);
        if (el) el.scrollIntoView({ behavior: "instant" });
      }, ch.id);
      await new Promise((r) => setTimeout(r, 800));
      await pageMobile.screenshot({
        path: path.join(ARTIFACT_DIR, `mobile-${ch.name}.png`),
      });
    }

    console.log("All mobile screenshots captured successfully!");
  } finally {
    await browser.close();
  }
}

run().catch((err) => {
  console.error("Capture error:", err);
  process.exit(1);
});
