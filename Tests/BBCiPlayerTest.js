const playwright = require("playwright");
const { BBCiPlayer } = require("../PageObjects/BBCIPlayerPage");
const assert = require("assert").strict;

const browsers = ["chromium", "webkit","firefox"];

(async () => {
  for (let browserType of browsers) {
    const browser = await playwright[browserType].launch({
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
    await page.screenshot({ path: `images/Iplayer/bbc2-${browserType}1.png` });
    var actualDate = await bbcIPlayer.getTodaysDayDate();
    var todayDate = new Date();
    var expectedDate = todayDate.getDate().toString();

    assert.equal(actualDate, expectedDate);

    await browser.close();
  }
})();

(async () => {
  for (let browserType of browsers) {
    const browser = await playwright[browserType].launch({
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
    await page.screenshot({ path: `images/Iplayer/bbc1-${browserType}1.png` });
    var actualDate = await bbcIPlayer.getTodaysDayDate();
    var todayDate = new Date();

    var expectedDate = todayDate.getDate().toString();

    assert.equal(actualDate, expectedDate);

    await browser.close();
  }
})();
