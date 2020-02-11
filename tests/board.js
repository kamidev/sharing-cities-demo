module.exports = {
  "Check that SharingCities portal shows up in logged-out state": function(
    browser
  ) {
    browser
      .windowMaximize()
      .url(browser.launchUrl)
      .waitForElementVisible("body", 1000)
      .waitForElementVisible("#canvas", 1000)
      .waitForElementVisible("#root", 1000)
      .waitForElementVisible(".container", 1000)
      .waitForElementVisible(".navbar-end", 1000)
      .end();
  }
};
