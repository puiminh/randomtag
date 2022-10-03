(() => {
    console.log('contentScript is running...')

    window.addEventListener('load', (event) => {
        console.log('page is fully loaded');
        console.log(document.querySelector(".photoImg img").src);
        addImgView(document.querySelector(".photoImg img").src);
      });
    
    chrome.runtime.onMessage.addListener((obj, sender, response) => {
            const {type, id } = obj;
            console.log(obj);
            // if (type === "NEW") {
            //   console.log("NEW: ",id);
            // } else {
            //   console.log("not thing");
            // }
          });     
    console.log("makesure");

    
    
})();

function addImgView(link){
    const div = document.createElement("div");
    const img = document.createElement("img");
    div.setAttribute("style",`display: block;
    position: fixed;
    z-index: 999;
    padding-top: 100px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.9);`)
    img.src = link
    img.setAttribute("style",`    margin: auto;
    display: block;
    width: 80%;
    max-width: 700px;`);
    div.appendChild(img);
    document.body.appendChild(div);
}