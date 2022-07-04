browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log('Hello from the background' + request + sender + sendResponse);

  browser.tabs.executeScript({
    file: 'content-script.js',
  });
})
