(async () => {
  var allTab = [];
  var currentTab;
  console.log('background is running...')
  // chrome.runtime.onMessageExternal.addListener( (request, sender, sendResponse) => {
  //     console.log("Received message from " + sender + ": ", request);
  //     sendResponse({ received: true }); //respond however you like
  // });
  // chrome.tabs.onUpdated.addListener((tabId, tab) => {
  //   const objSend = {
  //     type: "NEW",
  //     id: tabId,
  //   }
  //   chrome.tabs.sendMessage(tabId, objSend);
  //   if (tab.url && tab.url.includes("youtube.com/watch")) {
  //     const queryParameters = tab.url.split("?")[1];
  //     const urlParameters = new URLSearchParams(queryParameters);
  //     const objSend = {
  //       type: "NEW",
  //       id: tabId,
  //     }
  //     chrome.tabs.sendMessage(tabId, objSend);
      
  //     console.log("detect: ",tabId,tab.url,objSend);

  //   }
  // });
  chrome.tabs.onUpdated.addListener((tabId, tab) => {
    // getCurrentTab().then((objSend) => {
    //   if (tab.url && tab.url.includes("xem.vn/")) {
    //     chrome.tabs.sendMessage(tabId, objSend);
    //     console.log("detect: ",tabId,tab.url,objSend);
    //   }
    // });
  });

  getCurrentTab().then((e)=> {
    console.log(e);
    allTab = e.allTab;
    currentTab = e.currentTab;
  });

  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");
      // getCurrentTab().then((e) => {
        console.log("CONST: ",allTab,currentTab,request.tab);
        console.log(finder(allTab,currentTab,request.tab));
        chrome.tabs.update(finder(allTab,currentTab,request.tab),{selected:true});
      // })
    }
  );

})()

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let a = [];
  console.log("run 2",a);
  let [currentTab] = await chrome.tabs.query(queryOptions);
  let tab = await chrome.tabs.query({});
  console.log("run 4",tab);
  return {
    allTab: tab,
    currentTab: currentTab,
  };
}

function finder(array,now,where) {
  const len = array.length;
  for (var i=0; i<len; i++) {
    if(array[i].id = now.id) {
      var current = array[i];
      var previous = array[(i+len-1)%len];
      var next = array[(i+1)%len];
    }
  }
  switch (where) {
    case 'next':
      return previous.id;     
    case 'back':
      return next.id;
    default:
      return now.id;
  }
}