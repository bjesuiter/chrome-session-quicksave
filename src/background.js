// Code to run when extension gets installed
chrome.runtime.onInstalled.addListener(function () {
  // Demo Alert Works!
  //alert("Chrome Session Quicksave installed successfully");
  //
  // Demo Code:
  // chrome.storage.sync.set({color: '#3aa757'}, function() {
  //   console.log("The color is green.");
  // });
});

chrome.browserAction.onClicked.addListener(
  /**
   * @param currentTab see https://developer.chrome.com/extensions/tabs#type-Tab
   */
  (currentTab) => {
    console.log("Extension Icon Clicked!");

    // executeScript docs: https://developer.chrome.com/extensions/tabs#method-executeScript
    chrome.tabs.executeScript(currentTab.id, {
      file: "src/modal/modal.js",
    });
  }
);
