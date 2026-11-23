import puppeteer from "puppeteer-core";

(async () => {
  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/google-chrome",
    headless: "new",
    args: ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto("http://localhost:3001", { waitUntil: "networkidle2" });

  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const yesBtn = btns.find(b => b.textContent && (b.textContent.includes('ACCEPT') || b.textContent.includes('YES')));
    if (yesBtn) yesBtn.click();
  });

  const chapters = ['chapter-1', 'chapter-2', 'chapter-3', 'chapter-5', 'chapter-7', 'chapter-8'];
  
  for (const ch of chapters) {
    await page.evaluate((id) => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    }, ch);
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: `/home/tejas/.gemini/antigravity/brain/94e7849a-2d30-4808-af39-96e000b7ae63/desktop-${ch}.png` });
    console.log(`Saved desktop-${ch}.png`);
  }

  // Mobile
  const mPage = await browser.newPage();
  await mPage.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
  await mPage.goto("http://localhost:3001", { waitUntil: "networkidle2" });

  await mPage.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const yesBtn = btns.find(b => b.textContent && (b.textContent.includes('ACCEPT') || b.textContent.includes('YES')));
    if (yesBtn) yesBtn.click();
  });

  for (const ch of ['chapter-1', 'chapter-3', 'chapter-5', 'chapter-7']) {
    await mPage.evaluate((id) => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    }, ch);
    await new Promise(r => setTimeout(r, 1200));
    await mPage.screenshot({ path: `/home/tejas/.gemini/antigravity/brain/94e7849a-2d30-4808-af39-96e000b7ae63/mobile-${ch}.png` });
    console.log(`Saved mobile-${ch}.png`);
  }

  await browser.close();
})();
