import puppeteer from "puppeteer-core";
import path from "path";

const ARTIFACT_DIR = "/home/tejas/.gemini/antigravity/brain/94e7849a-2d30-4808-af39-96e000b7ae63";

async function run() {
  console.log("Launching browser...");
  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/google-chrome",
    headless: "new",
    args: ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"],
  });

  try {
    // 1. Desktop System Notice (1440x900)
    console.log("Capturing Desktop System Notice...");
    const pageDesktopNotice = await browser.newPage();
    await pageDesktopNotice.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
    await pageDesktopNotice.goto("http://localhost:3001", { waitUntil: "networkidle2" });
    await new Promise((r) => setTimeout(r, 1200));
    await pageDesktopNotice.screenshot({
      path: path.join(ARTIFACT_DIR, "desktop-system-notice.png"),
    });

    // 2. Mobile System Notice (390x844)
    console.log("Capturing Mobile System Notice...");
    const pageMobileNotice = await browser.newPage();
    await pageMobileNotice.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
    await pageMobileNotice.goto("http://localhost:3001", { waitUntil: "networkidle2" });
    await new Promise((r) => setTimeout(r, 1200));
    await pageMobileNotice.screenshot({
      path: path.join(ARTIFACT_DIR, "mobile-system-notice.png"),
    });

    // 3. Desktop Awakened: Ch1, Ch2, Ch3
    console.log("Opening fresh Desktop Awakened page...");
    const pageDesktopAwakened = await browser.newPage();
    await pageDesktopAwakened.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
    await pageDesktopAwakened.evaluateOnNewDocument(() => {
      sessionStorage.setItem("level_up_system_accepted", "true");
    });
    await pageDesktopAwakened.goto("http://localhost:3001", { waitUntil: "networkidle2" });
    await new Promise((r) => setTimeout(r, 1500));

    // Capture Ch1 Desktop
    console.log("Capturing Desktop Ch1...");
    await pageDesktopAwakened.screenshot({
      path: path.join(ARTIFACT_DIR, "desktop-ch1-rank-e.png"),
    });

    // Scroll to Ch2 Desktop
    console.log("Capturing Desktop Ch2...");
    await pageDesktopAwakened.evaluate(() => {
      document.querySelector("#chapter-2")?.scrollIntoView({ behavior: "instant" });
    });
    await new Promise((r) => setTimeout(r, 1500));
    await pageDesktopAwakened.screenshot({
      path: path.join(ARTIFACT_DIR, "desktop-ch2-system-chose-you.png"),
    });

    // Scroll to Ch3 Desktop
    console.log("Capturing Desktop Ch3...");
    await pageDesktopAwakened.evaluate(() => {
      document.querySelector("#chapter-3")?.scrollIntoView({ behavior: "instant" });
    });
    await new Promise((r) => setTimeout(r, 1500));
    await pageDesktopAwakened.screenshot({
      path: path.join(ARTIFACT_DIR, "desktop-ch3-dungeon.png"),
    });

    // 4. Mobile Awakened: Ch1, Ch2, Ch3
    console.log("Opening fresh Mobile Awakened page...");
    const pageMobileAwakened = await browser.newPage();
    await pageMobileAwakened.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
    await pageMobileAwakened.evaluateOnNewDocument(() => {
      sessionStorage.setItem("level_up_system_accepted", "true");
    });
    await pageMobileAwakened.goto("http://localhost:3001", { waitUntil: "networkidle2" });
    await new Promise((r) => setTimeout(r, 1500));

    // Capture Ch1 Mobile
    console.log("Capturing Mobile Ch1...");
    await pageMobileAwakened.screenshot({
      path: path.join(ARTIFACT_DIR, "mobile-ch1-rank-e.png"),
    });

    // Scroll to Ch2 Mobile
    console.log("Capturing Mobile Ch2...");
    await pageMobileAwakened.evaluate(() => {
      document.querySelector("#chapter-2")?.scrollIntoView({ behavior: "instant" });
    });
    await new Promise((r) => setTimeout(r, 1200));
    await pageMobileAwakened.screenshot({
      path: path.join(ARTIFACT_DIR, "mobile-ch2-system-chose-you.png"),
    });

    // Scroll to Ch3 Mobile
    console.log("Capturing Mobile Ch3...");
    await pageMobileAwakened.evaluate(() => {
      document.querySelector("#chapter-3")?.scrollIntoView({ behavior: "instant" });
    });
    await new Promise((r) => setTimeout(r, 1200));
    await pageMobileAwakened.screenshot({
      path: path.join(ARTIFACT_DIR, "mobile-ch3-dungeon.png"),
    });

    console.log("All screenshots captured successfully!");
  } finally {
    await browser.close();
  }
}

run().catch((err) => {
  console.error("Capture error:", err);
  process.exit(1);
});
