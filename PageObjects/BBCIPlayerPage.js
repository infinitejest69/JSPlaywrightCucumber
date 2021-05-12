class BBCiPlayer {
  constructor(page) {
    this.page = page;
  }

  todaySelector =
    "//div[@class='day-switcher__item__day typo--bold'][contains(text(),'Today')]/../div[2]";

  async navigate() {
    await this.page.goto("https://www.bbc.co.uk/iplayer");
  }

  async getPageUrl() {
    return this.page.url();
  }

  async clickParentMenuItem(text) {
    await this.page.click(`[aria-label="${text}"]`);
  }

  async clickChannelMenuItem(text) {
    await this.page.click(`:nth-match(li:has-text("${text}"), 3)`);
  }

  async getTodaysDayDate() {
    return await this.page.innerText(
      "//div[@class='day-switcher__item__day typo--bold'][contains(text(),'Today')]/../div[2]"
    );
  }
}
module.exports = { BBCiPlayer };
