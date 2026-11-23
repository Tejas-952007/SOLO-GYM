import puppeteer from 'puppeteer-core';

const brainDir = '/home/tejas/.gemini/antigravity/brain/94e7849a-2d30-4808-af39-96e000b7ae63';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    headless: 'new',
    args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 950, deviceScaleFactor: 2 });

  console.log('Navigating to http://localhost:3001 ...');
  await page.goto('http://localhost:3001', { waitUntil: 'networkidle2', timeout: 30000 });
  
  // Accept any system modal
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const yesBtn = btns.find(b => b.textContent && (b.textContent.includes('ACCEPT') || b.textContent.includes('YES')));
    if (yesBtn) yesBtn.click();
  });
  await new Promise(r => setTimeout(r, 1500));

  const chapters = [
    { id: 'chapter-5', name: 'desktop-verified-ch5.png' },
    { id: 'chapter-7', name: 'desktop-verified-ch7.png' },
    { id: 'chapter-8', name: 'desktop-verified-ch8.png' },
    { id: 'chapter-9', name: 'desktop-verified-ch9.png' },
  ];

  for (const ch of chapters) {
    const el = await page.$(`#${ch.id}`);
    if (el) {
      await el.scrollIntoView();
      await new Promise(r => setTimeout(r, 1200));
      await el.screenshot({ path: `${brainDir}/${ch.name}` });
      console.log(`Captured ${ch.name}`);
    } else {
      console.warn(`Could not find #${ch.id}`);
    }
  }

  // Mobile viewport capture for Ch7, Ch8, Ch9
  const mobilePage = await browser.newPage();
  await mobilePage.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await mobilePage.goto('http://localhost:3001', { waitUntil: 'networkidle2' });
  await mobilePage.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const yesBtn = btns.find(b => b.textContent && (b.textContent.includes('ACCEPT') || b.textContent.includes('YES')));
    if (yesBtn) yesBtn.click();
  });
  await new Promise(r => setTimeout(r, 1500));

  for (const chId of ['chapter-7', 'chapter-8', 'chapter-9']) {
    const el = await mobilePage.$(`#${chId}`);
    if (el) {
      await el.scrollIntoView();
      await new Promise(r => setTimeout(r, 1200));
      await el.screenshot({ path: `${brainDir}/mobile-verified-${chId}.png` });
      console.log(`Captured mobile-verified-${chId}.png`);
    }
  }

  await browser.close();
  console.log('Finished capturing all verification screenshots.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
