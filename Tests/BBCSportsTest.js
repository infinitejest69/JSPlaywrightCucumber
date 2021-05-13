const playwright = require("playwright");
const { BBCSports } = require("../PageObjects/BBCSportsPage");
const assert = require("assert").strict;

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
  const bbcSport = new BBCSports(page);

  await bbcSport.navigate();
  await bbcSport.clickMenuItem("Formula 1");
  await bbcSport.clickMenuItem("Standings");
  await page.waitForLoadState("networkidle");
  await page.screenshot({ path: `images/Sport/${browserType}.png` });
  var actual = await bbcSport.getTableValue();
  assert.equal(actual, "Lewis Hamilton");

  await browser.close();
}
})();