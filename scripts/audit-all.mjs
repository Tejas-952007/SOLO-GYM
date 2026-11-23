import puppeteer from 'puppeteer-core';

const brainDir = '/home/tejas/.gemini/antigravity/brain/94e7849a-2d30-4808-af39-96e000b7ae63';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    headless: 'new',
    args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 950, deviceScaleFactor: 1.5 });

  console.log('Navigating to http://localhost:3001 ...');
  await page.goto('http://localhost:3001', { waitUntil: 'networkidle2', timeout: 30000 });
  
  // Accept system modal
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const yesBtn = btns.find(b => b.textContent && (b.textContent.includes('ACCEPT') || b.textContent.includes('YES')));
    if (yesBtn) yesBtn.click();
  });
  await new Promise(r => setTimeout(r, 1500));

  const sections = [
    'chapter-1',
    'chapter-2',
    'chapter-3',
    'chapter-4',
    'chapter-5',
    'chapter-6',
    'chapter-7',
    'chapter-8',
    'skins-section',
    'chapter-9'
  ];

  for (const s of sections) {
    const el = await page.$(`#${s}`) || await page.$(`.${s}`) || await page.$(`[data-section="${s}"]`);
    if (el) {
      await el.scrollIntoView();
      await new Promise(r => setTimeout(r, 1000));
      await page.screenshot({ path: `${brainDir}/audit-desktop-${s}.png` });
      console.log(`Captured audit-desktop-${s}.png`);
    } else {
      console.warn(`Not found: ${s}`);
    }
  }

  // Mobile
  const mobile = await browser.newPage();
  await mobile.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await mobile.goto('http://localhost:3001', { waitUntil: 'networkidle2' });
  await mobile.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const yesBtn = btns.find(b => b.textContent && (b.textContent.includes('ACCEPT') || b.textContent.includes('YES')));
    if (yesBtn) yesBtn.click();
  });
  await new Promise(r => setTimeout(r, 1500));

  for (const s of ['chapter-1', 'chapter-3', 'chapter-4', 'chapter-6', 'chapter-9']) {
    const el = await mobile.$(`#${s}`) || await mobile.$(`.${s}`);
    if (el) {
      await el.scrollIntoView();
      await new Promise(r => setTimeout(r, 1000));
      await mobile.screenshot({ path: `${brainDir}/audit-mobile-${s}.png` });
      console.log(`Captured audit-mobile-${s}.png`);
    }
  }

  await browser.close();
  console.log('Done auditing.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
