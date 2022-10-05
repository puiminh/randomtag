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
getCurrentTab().then((e) => {
    console.log("run 1",e);
    chrome.tabs.sendMessage(e.currentTab.id, e);
    // chrome.tabs.update(281475921,{selected:true})
  })

document.querySelector('#menuButton7').addEventListener('click', ()=> {
  window.close();
})