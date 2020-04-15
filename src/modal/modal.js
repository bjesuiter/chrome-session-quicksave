wrapperDiv = document.createElement("div");
wrapperDiv.setAttribute(
  "style",
  "position: absolute; left: 0px; top: 0px; background-color: rgb(255, 255, 255); opacity: 0.5; z-index: 2000; height: 1083px; width: 100%;"
);

iframeElement = document.createElement("iframe");
iframeElement.setAttribute("style", "width: 100%; height: 100%;");
iframeElement.setAttribute("src", chrome.extension.getURL("./src/modal/modal-iframe.html"));
wrapperDiv.appendChild(iframeElement);

document.body.appendChild(wrapperDiv);
