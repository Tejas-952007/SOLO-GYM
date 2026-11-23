import puppeteer from 'puppeteer-core';

const brainDir = '/home/tejas/.gemini/antigravity/brain/94e7849a-2d30-4808-af39-96e000b7ae63';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    headless: 'new',
    args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage']
  });

  const page = await browser.newPage();
  // Standard iPhone 14/15/16 viewport (390 x 844)
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });

  console.log('Navigating to http://localhost:3001 on mobile viewport ...');
  await page.goto('http://localhost:3001', { waitUntil: 'networkidle2', timeout: 30000 });
  
  // Accept system modal if present
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const yesBtn = btns.find(b => b.textContent && (b.textContent.includes('ACCEPT') || b.textContent.includes('YES')));
    if (yesBtn) yesBtn.click();
  });
  await new Promise(r => setTimeout(r, 1500));

  const chapters = [
    'chapter-1',
    'chapter-2',
    'chapter-3',
    'chapter-4',
    'chapter-5',
    'chapter-6',
    'chapter-7',
    'chapter-8',
    'chapter-9'
  ];

  for (const ch of chapters) {
    const el = await page.$(`#${ch}`);
    if (el) {
      await el.scrollIntoView();
      await new Promise(r => setTimeout(r, 1000));
      await page.screenshot({ path: `${brainDir}/phone-audit-${ch}.png` });
      console.log(`Captured phone-audit-${ch}.png`);
    }
  }

  await browser.close();
  console.log('Finished capturing all mobile audit screenshots.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
