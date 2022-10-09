const sankakuLogonHeaderHideButton = document.getElementById('sankakuLogonHeaderHideButton');
getConfig('sankakuLogonHeaderHideButton').then((e)=> {
    sankakuLogonHeaderHideButton.checked = (e.sankakuLogonHeaderHideButton == 'none' ? true : false);
})
    sankakuLogonHeaderHideButton.addEventListener('change',()=> {
    console.log('now: ',sankakuLogonHeaderHideButton.checked);
    sendConfigFromPopUpToCS('changeConfig',sankakuLogonHeaderHideButton.checked ? 'none' : 'inherit','sankakuLogonHeaderHideButton');

})

const sankakuPreniumHideButton = document.getElementById('sankakuPreniumHideButton');
getConfig('sankakuPreniumHideButton').then((e)=> {
    sankakuPreniumHideButton.checked = (e.sankakuPreniumHideButton == 'none' ? true : false);
})
    sankakuPreniumHideButton.addEventListener('change',()=> {
    console.log('now: ',sankakuPreniumHideButton.checked);
    // chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
    //     var activeTab = tabs[0];
    //     chrome.tabs.sendMessage(activeTab.id,
    //         {mess: 'changeConfig',configValue: sankakuPreniumHideButton.checked ? 'none' : 'inherit', configName: 'sankakuPreniumHideButton'},
    //         function(response) {
    //             saveConfig({sankakuPreniumHideButton: response.res})
    //         }
    //         );
    // });
    sendConfigFromPopUpToCS('changeConfig',sankakuPreniumHideButton.checked ? 'none' : 'inherit','sankakuPreniumHideButton');
})

const sankakuHideAdsButton = document.getElementById('sankakuHideAdsButton');
getConfig('sankakuHideAdsButton').then((e)=> {
    sankakuHideAdsButton.checked = (e.sankakuHideAdsButton == 'none' ? true : false);
})
    sankakuHideAdsButton.addEventListener('change',()=> {
    console.log('now: ',sankakuHideAdsButton.checked);
    // chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
    //     var activeTab = tabs[0];
    //     chrome.tabs.sendMessage(activeTab.id,
    //         {mess: 'changeConfig',configValue: sankakuHideAdsButton.checked ? 'none' : 'inherit', configName: 'sankakuHideAdsButton'},
    //         function(response) {
    //             saveConfig({sankakuHideAdsButton: response.res})
    //         }
    //         );
    // });
    sendConfigFromPopUpToCS('changeConfig',sankakuHideAdsButton.checked ? 'none' : 'inherit','sankakuHideAdsButton');
})

const sankakuRecommendSeries = document.getElementById('sankakuRecommendSeries');
getConfig('sankakuRecommendSeries').then((e)=> {
    sankakuRecommendSeries.checked = (e.sankakuRecommendSeries == 'none' ? true : false);
})
    sankakuRecommendSeries.addEventListener('change',()=> {
    console.log('now: ',sankakuRecommendSeries.checked);
    sendConfigFromPopUpToCS('changeConfig',sankakuRecommendSeries.checked ? 'none' : 'inherit','sankakuRecommendSeries');
})

function sendConfigFromPopUpToCS(mess,configValue,configName) {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id,
            {mess: mess,configValue: configValue, configName: configName},
            function(response) {
                saveConfig({[configName]: response.configName})
            }
            );
    });   
}