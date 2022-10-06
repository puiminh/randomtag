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
    getCurrentTab(tabId).then((e)=> {
      console.log("Get Current Tab: (30): ",e);
      console.log("Data from update event: tab - tabid",tab,tabId);
      allTab = e;
      // currentTab = tabId;
    });
  });



  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.open) {
        chrome.tabs.create({url: request.open, active: false })
      }
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");
      currentTab = sender.tab.index;
                  console.log("Data from send event",sender.tab);
      // getCurrentTab().then((e) => {
        const moveTo = finder(allTab,currentTab,request.tab);
        console.log("Data before finder: ",allTab,currentTab,request.tab);
        console.log("Data finder: ",);
        console.log("move: ",moveTo.id)
        chrome.tabs.update(moveTo.id,{selected:true});
      // })
        return true;
    }
  );

})()

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let a = [];
  let [currentTab] = await chrome.tabs.query(queryOptions);
  let tab = await chrome.tabs.query({});
  console.log("Get: ",tab,currentTab);
  return tab;
}

function finder(array,now,where) {
  const len = array.length;
  switch (where) {
    case 'next':
      return array[(now+len+1)%len];     
    case 'back':
      return array[(now+len-1)%len];
    default:
      return array[(now)];
  }
}

/*
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
    getCurrentTab(tabId).then((e)=> {
      console.log(e);
      console.log("tab",tab,tabId);
      allTab = e.allTab;
      currentTab = tabId;
    });
  });



  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");
      console.log(sender);
      // getCurrentTab().then((e) => {
        console.log("CONST: ",allTab,currentTab,request.tab);
        console.log(finder(allTab,currentTab,request.tab));
        chrome.tabs.update(finder(allTab,currentTab,request.tab),{selected:true});
      // })
        return true;
    }
  );

})()

async function getCurrentTab(currentID) {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let a = [];
  let [currentTab] = await chrome.tabs.query(queryOptions);
  let tab = await chrome.tabs.query({});
  console.log("Get: ",tab,currentTab);
  return {
    allTab: tab,
    currentTab: currentID ? currentID : currentTab,
  };
}

function finder(array,now,where) {
  const len = array.length;
  for (var i=0; i<len; i++) {
    if(array[i].id = now) {
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
      return now;
  }
}
*/