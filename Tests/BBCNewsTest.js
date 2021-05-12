const playwright = require("playwright");
const { BBCNews } = require("../PageObjects/BBCNewPage");
const assert = require('assert').strict;

(async () => {
  const browser = await playwright["chromium"].launch({
    headless: false,
  });
  const context = (await browser).newContext();
  const page = await (await context).newPage();
  const bbcNews = new BBCNews(page);

  await bbcNews.navigate();
  await bbcNews.clickMenuItem("Scotland");
  assert.equal(page.url(), "https://www.bbc.co.uk/news/scotland");
  await bbcNews.clickMenuItem("Edinburgh, Fife & East");
  assert.equal(
    page.url(),
    "https://www.bbc.co.uk/news/scotland/edinburgh_east_and_fife"
  );
  await browser.close();
})();
