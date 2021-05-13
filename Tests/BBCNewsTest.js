const playwright = require("playwright");
const { BBCNews } = require("../PageObjects/BBCNewPage");
const assert = require('assert').strict;

(async () => {
  for (const browserType of ["chromium", "webkit","firefox"]) {
    const browser = await playwright[browserType].launch({
      headless: false,
    });
    const context = (await browser).newContext({
      recordVideo: {
        dir: "videos/",
      },
    });
  const page = await (await context).newPage();
  const bbcNews = new BBCNews(page);

  await bbcNews.navigate();
  await bbcNews.clickMenuItem("Scotland");
  assert.equal(page.url(), "https://www.bbc.co.uk/news/scotland");
  await bbcNews.clickMenuItem("Edinburgh, Fife & East");
  await page.waitForLoadState("networkidle");
  await page.screenshot({ path: `images/News/${browserType}.png` });
  assert.equal(
    page.url(),
    "https://www.bbc.co.uk/news/scotland/edinburgh_east_and_fife"
  );
  await browser.close();
  }
})();
