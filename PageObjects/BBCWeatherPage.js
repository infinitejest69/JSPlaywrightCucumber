class BBCWeather {
  constructor(page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto("https://www.bbc.co.uk/weather");
  }

  async inputLocation(text) {
    await this.page.click('#ls-c-search__input-label');
    await this.page.fill(
      '#ls-c-search__input-label', `${text}` );
  }

  async clickSearch() {
    await Promise.all([
      this.page.click('input:has-text("Search")'),
    ]);
  }

  as;

  async getPageUrl() {
    return this.page.url();
  }

  async getLocationHeaderText() {
    return await this.page.innerText("#wr-location-name-id");
  }
}
module.exports = { BBCWeather };
