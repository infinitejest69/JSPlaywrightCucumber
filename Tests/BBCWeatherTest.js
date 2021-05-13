const playwright = require("playwright");
const { BBCWeather } = require("../PageObjects/BBCWeatherPage");
const assert = require("assert").strict;

(async () => {
  for (const browserType of ["chromium", "webkit", "firefox"]) {
    const browser = await playwright[browserType].launch({
      headless: false,
    });
    const context = (await browser).newContext({
      recordVideo: {
        dir: "videos/",
      },
    });
    const page = await (await context).newPage();
    const bbcWeather = new BBCWeather(page);

    await bbcWeather.navigate();
    await bbcWeather.inputLocation("Dunfermline");
    await bbcWeather.clickSearch();
    await page.waitForLoadState("networkidle");
    await page.screenshot({ path: `images/Weather/${browserType}.png` });
    var actual = await bbcWeather.getLocationHeaderText();
    assert.equal(actual, "Dunfermline");
    await browser.close();
  }
})();
