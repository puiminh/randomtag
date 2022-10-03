(() => {
  console.log('background is running...')
  // chrome.runtime.onMessageExternal.addListener( (request, sender, sendResponse) => {
  //     console.log("Received message from " + sender + ": ", request);
  //     sendResponse({ received: true }); //respond however you like
  // });
  chrome.tabs.onUpdated.addListener((tabId, tab) => {
    const objSend = {
      type: "NEW",
      id: tabId,
    }
    chrome.tabs.sendMessage(tabId, objSend);
    if (tab.url && tab.url.includes("youtube.com/watch")) {
      const queryParameters = tab.url.split("?")[1];
      const urlParameters = new URLSearchParams(queryParameters);
      const objSend = {
        type: "NEW",
        id: tabId,
      }
      chrome.tabs.sendMessage(tabId, objSend);
      
      console.log("detect: ",tabId,tab.url,objSend);

    }
  });

})()