(() => {
    console.log('contentScript is running...')
    // document.querySelector("body").style.display = "none";
    try {
        chrome.runtime.onMessage.addListener((obj, sender, response) => {
            const {type, id } = obj;
            console.log(obj);
            // if (type === "NEW") {
            //   console.log("NEW: ",id);
            // } else {
            //   console.log("not thing");
            // }
          });     
    } catch (error) {
        console.log(error);
    }

    console.log("makesure");

    
    
})();
