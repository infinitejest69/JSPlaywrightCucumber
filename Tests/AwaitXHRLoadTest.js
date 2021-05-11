const playwright = require("playwright");

(async () => {
  const browser = await playwright["chromium"].launch({
    headless: false,
    devtools: true,
  });

  //context
  const context = (await browser).newContext();

  //page
  const page = await (await context).newPage();

  //Navigate
  await page.goto("https://www.bbc.co.uk/news");

  await page.waitForResponse((response) => {
    return response.request().resourceType() === "xhr";
  });

  await page.screenshot({ path: `Test-${Date.now.toString()}.png` });

  await browser.close();
})();
