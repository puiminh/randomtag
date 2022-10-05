var fit = false;
var first_press = false;
var allTab = [];
var imgNow = [];
(() => {
  
  document.onkeydown = function(evt){
    getAllImgInView();
    // evt = evt || window.event;
    // if(evt.shiftKey){
    // console.log('Shift');
    switch (evt.key){
        case 'A':
        case 'a':
        case 'ArrowLeft':
            key_press({tab: "back"});
            break;
        case 'd':
        case 'D':
        case 'ArrowRight':
            key_press({tab: "next"});
            break;
        case '1':
            newTab(1);
            break;
        case '2':
            newTab(2);
            break;
    }

  // }
};
    console.log('contentScript is running...')

    window.addEventListener('load', (event) => {
      var styles = `
      ::-webkit-scrollbar  { display: none; }
  `
  
  var styleSheet = document.createElement("style")
  styleSheet.innerHTML = styles
  document.head.appendChild(styleSheet);

        console.log('page is fully loaded');
        // console.log(document.querySelector(".photoImg img").src);
        if (document.querySelector("#post-content img")) addImgView(document.querySelector("#post-content img").src);
        //#post-content img
        getAllImgInView();

      });
    
    chrome.runtime.onMessage.addListener((obj, sender, response) => {
            const {type, id } = obj;
            console.log(obj);
            allTab = obj.allTab;
            console.log(allTab);
            // if (type === "NEW") {
            //   console.log("NEW: ",id);
            // } else {
            //   console.log("not thing");
            // }
          });     
    console.log("makesure");
    // chrome.tabs.update(281475921,{selected:true});
})();



function addImgView(link){
    const div = document.createElement("div");
    const span = document.createElement("span");
    const text = document.createTextNode("x");
    const img = document.createElement("img");
    span.appendChild(text);
    span.setAttribute("style", `
    position: absolute;
    top: 15px;
    right: 35px;
    color: #f1f1f1;
    font-size: 40px;
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s;
    `)
    div.appendChild(span);
    div.setAttribute("style",`display: block;
    position: fixed;
    z-index: 999;
    left: 0;
    top: 0;
    overflow: auto;
    width: 100%;
    height: 100%;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.9);
    `)
    img.src = link
    img.setAttribute("style",`    
    padding-top: 60px;
    margin: auto;
    display: block;
    max-width:100%; height:auto
    transition: 0.3s;`);
    div.appendChild(img);
    img.focus();
    document.body.appendChild(div);
    
    document.querySelector("#post-content img").addEventListener("click", ()=> {
      div.style.display = "block"; 
    })

    span.addEventListener('click', () => {
      div.style.display = "none";
    })

    img.addEventListener('click', () => {
      // div.style.display = "none";
      console.log('click'); 
      if(!fit) {fitScreenFunc(div,img)} else defaultFunc(div,img);
    })
}

function fitScreenFunc(div,img) {
  div.style.overflow = "hidden";
  img.style.height= "98vh";
  img.style.padding= "20px"; 
  fit = true;
  
}

function defaultFunc(div,img) {
  div.style.overflow = "auto";
  img.style.height= "auto";
  img.style.padding= "60px";
  fit = false; 
}

function sendMess(mess) {
  chrome.runtime.sendMessage(mess);
}

function key_press(mess) {
  console.log("keypress",first_press);
  if(first_press) {
      do_double_press(mess);
      first_press = false;
  } else {
      first_press = true;
      window.setTimeout(function() { first_press = false; }, 500);
  }
}

function newTab(number) {
  window.open(imgNow[number]);
}

function do_double_press(mess) {
  sendMess(mess);
  console.log('sending');
}
function getAllImgInView() {
  console.log("running getAllImgInView...")
  let count = 0;
  let list = document.querySelectorAll('.thumb a');
  return list.forEach((e)=> {
    if(isInViewport(e)){
      count++;
      console.log(e.href);
      imgNow[count] = e.href;
    }
  })
}

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}