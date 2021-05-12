class BBCNews {
  constructor(page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto("https://www.bbc.co.uk/news");
  }

  async getPageUrl() {
    return this.page.url();
  }

  async clickMenuItem(text) {
    await this.page.click(`text=${text}`);
  }
}
module.exports = { BBCNews };
