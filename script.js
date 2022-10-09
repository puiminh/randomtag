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

document.querySelector('#menuButton7').addEventListener('click', ()=> {
  window.close();
})

async function saveConfig(config) {
  const {configName, configValue} = config;

  await chrome.storage.local.set(config, function() {
    console.log('Value is set to ', config);
  });
}

async function getConfig(configName) {
  return await chrome.storage.local.get([configName]);
}