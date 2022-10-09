const sankakuLogonHeaderHideButton = document.getElementById('sankakuLogonHeaderHideButton');
getConfig('sankakuLogonHeaderHideButton').then((e)=> {
    sankakuLogonHeaderHideButton.checked = (e.sankakuLogonHeaderHideButton == 'hide' ? true : false);
})
    sankakuLogonHeaderHideButton.addEventListener('change',()=> {
    console.log('now: ',sankakuLogonHeaderHideButton.checked);
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id,
            {mess: 'changeConfig',configValue: sankakuLogonHeaderHideButton.checked ? 'hide' : 'default', configName: 'sankakuLogonHeaderHideButton'},
            function(response) {
                saveConfig({sankakuLogonHeaderHideButton: response.res})
            }
            );
    });
})