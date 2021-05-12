const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();
  // Open new page
  const page = await context.newPage();
  // Go to https://www.bbc.co.uk/iplayer
  await page.goto('https://www.bbc.co.uk/iplayer');
  // Click [aria-label="TV Guide"]
  await page.click('[aria-label="TV Guide"]');
  // assert.equal(page.url(), 'https://www.bbc.co.uk/iplayer/guide');
  // Click :nth-match(li:has-text("BBC Two"), 3)
  await page.click(':nth-match(li:has-text("BBC Two"), 3)');
  // assert.equal(page.url(), 'https://www.bbc.co.uk/iplayer/guide/bbctwo/20210512');
  // Click [aria-label="Wednesday 12 May"] >> text=12
  await page.click('[aria-label="Wednesday 12 May"] >> text=12');
  // assert.equal(page.url(), 'https://www.bbc.co.uk/iplayer/guide/bbctwo/20210512');
  // ---------------------
  await context.close();
  await browser.close();
})();