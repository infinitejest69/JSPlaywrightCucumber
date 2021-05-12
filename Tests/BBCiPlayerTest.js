const playwright = require("playwright");
const { BBCiPlayer } = require("../PageObjects/BBCIPlayerPage");
const assert = require("assert").strict;

(async () => {
  for (const browserType of ["chromium", "webkit"]) {
    const browser = await playwright["chromium"].launch({
      headless: false,
    });
    const context = (await browser).newContext({
      recordVideo: {
        dir: "videos/",
      },
    });
    const page = await (await context).newPage();
    const bbcIPlayer = new BBCiPlayer(page);

    await bbcIPlayer.navigate();

    await bbcIPlayer.clickParentMenuItem("TV Guide");

    assert.equal(page.url(), "https://www.bbc.co.uk/iplayer/guide");
    await bbcIPlayer.clickChannelMenuItem("BBC Two");
    await page.waitForLoadState("networkidle");
    //await page.waitForNavigation({waitUntil: "networkidle"});
    await page.screenshot({ path: `bbc2-${browserType}1.png` });
    var actualDate = await bbcIPlayer.getTodaysDayDate();
    var todayDate = new Date();
    var expectedDate = todayDate.getDate().toString();

    assert.equal(actualDate, expectedDate);

    await browser.close();
  }
})();

(async () => {
  for (const browserType of ["chromium", "webkit"]) {
    const browser = await playwright["chromium"].launch({
      headless: false,
    });
    const context = (await browser).newContext({
      recordVideo: {
        dir: "videos/",
      },
    });
    const page = await (await context).newPage();
    const bbcIPlayer = new BBCiPlayer(page);

    await bbcIPlayer.navigate();

    await bbcIPlayer.clickParentMenuItem("TV Guide");

    assert.equal(page.url(), "https://www.bbc.co.uk/iplayer/guide");
    await bbcIPlayer.clickChannelMenuItem("BBC One");
    await page.waitForLoadState("networkidle");
    //await page.waitForNavigation({waitUntil: "networkidle"});
    await page.screenshot({ path: `bbc1-${browserType}2.png` });
    var actualDate = await bbcIPlayer.getTodaysDayDate();
    var todayDate = new Date();

    var expectedDate = todayDate.getDate().toString();

    assert.equal(actualDate, expectedDate);

    await browser.close();
  }
})();
