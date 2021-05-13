class BBCSports {
  constructor(page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto("https://www.bbc.co.uk/sport");
  }

  async getPageUrl() {
    return this.page.url();
  }

  async clickMenuItem(text) {
    await this.page.click(`text=${text}`);
  }

  async getTableValue(){
    return await this.page.innerText("//span[contains(text(),'Lewis')]");
  }
}
module.exports = { BBCSports };