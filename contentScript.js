var fit = false;
var first_press = false;
var allTab = [];
var imgNow = [];
var scrollPoint  = 0;
var input = document.querySelector('#tags');
var parentWrap = document.querySelector('#web-share');
var postId = window.location.pathname.split('post/show/')[1];
(() => {
  document.onkeydown = function(evt){
    // evt = evt || window.event;
    // if(evt.shiftKey){
    // console.log('Shift');
    if (document.activeElement != input) {
      switch (evt.key){
        // case 'A':
        // case 'a':
        // case 'ArrowLeft':
        case ',':
            key_press({tab: "back"});
            break;
        // case 'd':
        // case 'D':
        // case 'ArrowRight':
        case '.':
            key_press({tab: "next"});
            break;
        case '1' : newTab(1);
        break;
        case '2' : newTab(2);
        break;
        case '3' : newTab(3);
        break;
        case '4' : newTab(4);
        break;
        case '5' : newTab(5);
        break;
        case '6' : newTab(6);
        break;
        case '7' : newTab(7);
        break;
        case '8' : newTab(8);
        break;
        case '9' : newTab(9);
        break;
        case '0' : newTab(0);
        break;
        case 'ArrowUp':
        case 'ArrowDown':
        default:
            break;
    }
    }

  // }
};
document.body.onscroll = function(e) {
  // console.log((window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop))
  getAllImgInView();
}
    console.log('contentScript is running...')

    let sankakuLogonHeaderHideButton = localStorage.getItem('sankakuLogonHeaderHideButton');
    let sankakuPreniumHideButton = localStorage.getItem('sankakuPreniumHideButton');
    let sankakuHideAdsButton = localStorage.getItem('sankakuHideAdsButton')
    let sankakuRecommendSeries = localStorage.getItem('sankakuRecommendSeries')
    var styles = `
    ::-webkit-scrollbar  { display: none; }
    
    #headerlogo {
      display: ${sankakuLogonHeaderHideButton}
    }

    #news-ticker {
      display: ${sankakuPreniumHideButton}
    }

    .scad-i {
      display: ${sankakuHideAdsButton}
    }

    .has-mail {
      display: ${sankakuRecommendSeries}
    }

    .blacklisted {
      display: none!important;
    }

    .line span {
      -webkit-user-select: none;
         -moz-user-select: none;
          -ms-user-select: none;
              user-select: none;
      font: 8px arial;
    }
    
    .line {
      display: flex;
      justify-content: space-around;
      position: absolute;
      bottom: 0;
    }
    
    .line span {
      box-shadow: 0px 3px 3px rgba(0, 0, 0, .7);
      color: #71D4FE;
      padding: 4px;
      background: #2F3336;
      border-radius: 3px;
      text-shadow: 0px 0px 40px #71D4FE, 0px 0px 80px #71D4FE;
      width: 15px;
      text-align: center;
      animation: slidein 0.5s;
      animation-timing-function: ease;
    }
    @keyframes slidein {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
}
    
    .line span:hover {
      /*   box-shadow: 0px 2px 10px #040404;*/
      
      background: #2F3336;
      text-shadow: 1px 2px 60px #00BCD4, 0px 0px 60px rgba(0, 188, 212, .9), 0px 0px 60px rgba(0, 188, 212, .9), 10px 10px 60px rgba(0, 188, 212, .9);
      cursor: pointer
    }
    
    .line span:active {
      transform: scale(.9);
    }


    `

var styleSheet = document.createElement("style")
styleSheet.innerHTML = styles
document.head.appendChild(styleSheet);


    window.addEventListener('load', (event) => {
        console.log('page is fully loaded');
        // console.log(document.querySelector(".photoImg img").src);
        // if (document.querySelector("#post-content img")) addImgView(document.querySelector("#post-content img").src);
        //#post-content img
        if (1) {
          insertParrentImg(19411463);
        }

        getAllImgInView();

      });
    
      chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            if( request.mess === "changeConfig" ) {
                console.log(request);
                localStorage.setItem(request.configName, request.configValue);
                sendResponse({configName: localStorage.getItem(request.configName)});
            }
        }
    ); 
    console.log("makesure");
    // chrome.tabs.update(281475921,{selected:true});
})();

function addImgView(link){

	// <div>
	// 	<div class="line">
	// 		<span>1</span>
	// 	</div>
	// </div>


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

function do_double_press(mess) {
  sendMess(mess);
  console.log('sending');
}

function newTab(number) {
  // window.open(imgNow[number]);
  let id = ((number==0) ? 10 : number);
  chrome.runtime.sendMessage({open: imgNow[id]});
}


function getAllImgInView() {
  console.log("running getAllImgInView...")
  // if (window.location.pathname.includes("post/show")) {
  //   console.log('Not in search, no!');
  // }
  let count = 0;
  let list = document.querySelectorAll('.thumb:not(.blacklisted) a');
  resetNumberOnImg();

  for (const e of list) {
    if (count>10) break;
    if(isInViewport(e)){
      count++;
      // console.log(e.href);
      imgNow[count] = e.href;
      e.parentElement.appendChild(addNumberOnImg(e.href,count));
      e.parentElement.style.position = 'relative';
    } 
  }
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

function addNumberOnImg(link, number) {
  const div = document.createElement("div");
  const span = document.createElement("span");
  div.classList.add('line');
  let id = ((number==10) ? 0 : number);
  const text = document.createTextNode(id);
  span.appendChild(text);
  div.appendChild(span);

  return div;
}

function resetNumberOnImg() {
  let list = document.getElementsByClassName('line');
  [...list].map((e)=>{
    e.remove();
  })
}

function insertParrentImg(id) {
  let postList = [];
  let imgList = '';
  fetch(`https://capi-v2.sankakucomplex.com/posts?lang=en&page=1&limit=40&tags=parent:19411463`)
   .then(function(response) {
     return response.json();
   })
   .then(function(response) {
     console.log(response);
     for (const post of response) {
      console.log('Processing for post: ',post);
      // let picked = (({ id, preview_url, has_children, parent_id }) => ({ id, preview_url, has_children, parent_id }))(post);
      postList.push(post);
      imgList += `
      <span class="thumb" id="p${post.id}" style="position: relative;">
      <a href="/vi/post/show/${post.id}" target="_blank"> 
        <img class="preview has-parent" 
             src="${post.preview_url}" 
             alt="" width="auto" height="150px" 
             pagespeed_url_hash="1077084331" onload="pagespeed.CriticalImages.checkImageForCriticality(this);">
      </a>
     </span>`
      }

      let parentImg = `
      <div id="recommended">
      <h3>Children of this Post: </h3>
      <div id="recommendations">
        ${imgList}
      </div>
      </div>
         `
         let old = parentWrap.innerHTML;
         parentWrap.innerHTML +=parentImg;
      
   });


  // fetchingSankakuApi(`https://capi-v2.sankakucomplex.com/posts?lang=en&page=1&limit=40&tags=parent:19411463`).then((array)=> {
  //   console.log(array);
  //   let my = array.map((e)=>{ //emtySearch
  //       return data = `<li>${e.name_en}</li>`;
  //   });
  //   // parentImg.innerHTML = my.join('');
  // })

//   let element = `
//   <span class="thumb" id="p${id}" style="position: relative;">
//  <a href="/vi/post/show/${id}" target="_blank"> 
//    <img class="preview has-parent" 
//         src="//v.sankakucomplex.com/data/preview/41/dc/41dca5b5d4d5566fb241da03216431bb.jpg?e=1665882213&amp;m=zid2kCMmbtZJMA4tZPXGWA&amp;expires=1665882213&amp;token=TB2LA0kzda4Js1oN6U0Y5wrcNaP5KeowpEuCPVyVBxk" 
//         alt="" width="53" height="150" 
//         pagespeed_url_hash="1077084331" onload="pagespeed.CriticalImages.checkImageForCriticality(this);">
//  </a>
// </span>
// `
//   let parentImg = `
// <div id="recommended">
// <h3>Parent of this Post: </h3>
// <div id="recommendations">

// </div>
// </div>
//    `
//    let old = parentWrap.innerHTML;
//    parentWrap.innerHTML +=parentImg;
}

// async function fetchingSankakuApi(url) {
//   let postList = [];
//   console.log("fetching: ",url);
//   try {
//       const response = await axios.get(url);
//       const {data} = response;
//       for (const post of data) {
//           console.log('Processing for post: ',post);
//           // let picked = (({ id, preview_url, has_children, parent_id }) => ({ id, preview_url, has_children, parent_id }))(post);
//           postList.push(post);
//       }
      
//       return postList;
//   } catch (error) {
//       console.log(error)
//   }
// }

function fetchingSankakuApi(){
  let postList = [];
  fetch(`https://capi-v2.sankakucomplex.com/posts?lang=en&page=1&limit=40&tags=parent:19411463`)
   .then(function(response) {
     return response.json();
   })
   .then(function(response) {
     console.log(response);
     for (const post of data) {
      console.log('Processing for post: ',post);
      // let picked = (({ id, preview_url, has_children, parent_id }) => ({ id, preview_url, has_children, parent_id }))(post);
      postList.push(post);
      }
      return postList;
   });
 };