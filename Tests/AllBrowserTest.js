const playwright = require("playwright");

(async () => {
  for (const browserType of ["chromium", "firefox", "webkit"]) {
    const browser = await playwright[browserType].launch({
      headless: false,
    });

    //context
    const context = (await browser).newContext();

    //page
    const page = await (await context).newPage();

    //Navigate
    await page.goto("http://www.google.co.uk/");

    await page.screenshot({ path: `Test-${browserType}.png` });

    await browser.close();
  }
})();
