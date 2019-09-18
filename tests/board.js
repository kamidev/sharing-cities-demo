module.exports = {
  "Check that SharingCities portal is visible and has expected parts": function(
    browser
  ) {
    browser
      .windowMaximize()
      .url(browser.launchUrl)
      .waitForElementVisible("body", 1000)
      .waitForElementVisible("#canvas", 1000)
      .waitForElementVisible("div.board", 1000)
      .end();
  }
};
