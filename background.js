(async () => {
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
  getCurrentTab().then((e) => {
    console.log("run 1",e);
  })
})()

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let a = [];
  console.log("run 2",a);
  let tab = await chrome.tabs.query({});
  console.log("run 4",tab);
  return tab;
}