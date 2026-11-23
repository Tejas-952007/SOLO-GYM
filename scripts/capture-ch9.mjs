import puppeteer from "puppeteer-core";

(async () => {
  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/google-chrome",
    headless: "new",
    args: ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"],
  });

  // Desktop
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 2 });
  await page.goto("http://localhost:3001", { waitUntil: "networkidle2" });
  
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const yesBtn = btns.find(b => b.textContent && (b.textContent.includes('ACCEPT') || b.textContent.includes('YES')));
    if (yesBtn) yesBtn.click();
    
    const heading = Array.from(document.querySelectorAll('h2')).find(h => h.textContent && h.textContent.includes('SUNG JIN-WOO'));
    if (heading) {
      heading.scrollIntoView({ behavior: 'instant', block: 'center' });
    }
  });
  
  await new Promise(r => setTimeout(r, 2500));
  await page.screenshot({ path: "/home/tejas/.gemini/antigravity/brain/94e7849a-2d30-4808-af39-96e000b7ae63/desktop-ch9-3d-console-full.png" });
  console.log("Saved desktop-ch9-3d-console-full.png");

  // Toggle to 4K Cinema
  await page.evaluate(() => {
    const cinemaBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.includes('4K CINEMA'));
    if (cinemaBtn) cinemaBtn.click();
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: "/home/tejas/.gemini/antigravity/brain/94e7849a-2d30-4808-af39-96e000b7ae63/desktop-ch9-4k-cinema.png" });
  console.log("Saved desktop-ch9-4k-cinema.png");

  // Mobile
  const mPage = await browser.newPage();
  await mPage.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
  await mPage.goto("http://localhost:3001", { waitUntil: "networkidle2" });
  
  await mPage.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const yesBtn = btns.find(b => b.textContent && (b.textContent.includes('ACCEPT') || b.textContent.includes('YES')));
    if (yesBtn) yesBtn.click();
    
    const heading = Array.from(document.querySelectorAll('h2')).find(h => h.textContent && h.textContent.includes('SUNG JIN-WOO'));
    if (heading) {
      heading.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  });
  await new Promise(r => setTimeout(r, 2000));
  await mPage.screenshot({ path: "/home/tejas/.gemini/antigravity/brain/94e7849a-2d30-4808-af39-96e000b7ae63/mobile-ch9-3d-console-full.png" });
  console.log("Saved mobile-ch9-3d-console-full.png");

  // Mobile 4K Cinema
  await mPage.evaluate(() => {
    const cinemaBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.includes('4K CINEMA'));
    if (cinemaBtn) cinemaBtn.click();
  });
  await new Promise(r => setTimeout(r, 1500));
  await mPage.screenshot({ path: "/home/tejas/.gemini/antigravity/brain/94e7849a-2d30-4808-af39-96e000b7ae63/mobile-ch9-4k-cinema.png" });
  console.log("Saved mobile-ch9-4k-cinema.png");

  await browser.close();
})();
