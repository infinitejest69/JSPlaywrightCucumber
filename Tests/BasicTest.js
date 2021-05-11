const playwright = require("playwright");

(async () => {
  const browser = await playwright["chromium"].launch({
    headless: false,
  });

  //context
  const context = (await browser).newContext();

  //page
  const page = await (await context).newPage();

  //Navigate
  await page.goto("http://www.google.co.uk/");

  await page.screenshot({ path: `Test-${Date.now.toString()}.png` });

  await browser.close();
})();
