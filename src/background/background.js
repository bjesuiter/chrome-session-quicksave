import { format } from "../../node_modules/date-fns/index.js";

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

    const sessionName = prompt(
      "Please insert a name for the session",
      "New Session " + format(new Date(), "YYYY-MM-DD")
    );

    console.log(`New Session name: ${sessionName}`);

    // executeScript docs: https://developer.chrome.com/extensions/tabs#method-executeScript
    // injects modal.js into the current web page to show ionic component boxes
    //
    // Note: This feature is non-essential, and poentially hurts the performance of the page
    // only for showing a fancy ionic promt instead of an extension popup html or js prompt
    // Therefore it's deactivated currently.
    // chrome.tabs.executeScript(currentTab.id, {
    //   file: "src/modal/modal.js",
    // });
  }
);
