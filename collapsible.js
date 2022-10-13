// var coll = document.getElementsByClassName("collapsible");
// var i;

// for (i = 0; i < coll.length; i++) {
//   coll[i].addEventListener("click", function() {
//     this.classList.toggle("active");
//     document.querySelector("main").classList.toggle("visually-hidden");
//     var content = this.nextElementSibling;
//     if (content.style.maxHeight){
//       content.style.maxHeight = null;
//     } else {
//       content.style.maxHeight = content.scrollHeight + "px";
//     } 
//   });
// }

// var menuButton = document.getElementsByClassName("hexagon-item");

// for (i = 0; i < menuButton.length; i++) {
//     menuButton[i].addEventListener("click", function() {
//       document.querySelector("main").classList.toggle("visually-hidden");
//       var content = this.nextElementSibling;
//       if (content.style.maxHeight){
//         content.style.maxHeight = null;
//       } else {
//         content.style.maxHeight = content.scrollHeight + "px";
//       } 
//     });
//   }
var APP_MODE = 0;
var search_focus = false;
var last_press = null;
var now_press = null;
var i;
const hexagon = document.getElementById("hexagon-menu");
const apptitle = document.getElementById("app-title");


const inputs = document.querySelectorAll('input[type="text"]')
const startdate = document.querySelector('#startdate');
const enddate = document.querySelector('#enddate');

for (const input of inputs) {
    input.onfocus = (() => {
        search_focus = true;
        console.log(search_focus);
      })
      
      input.onblur = (() => {
        search_focus = false;
        console.log(search_focus);
      
      })   
}

document.onkeydown = function(evt){
    // evt = evt || window.event;
    // if(evt.shiftKey){
    // console.log('Shift');
    let key = evt.key;
    if (!search_focus) {
        switch (APP_MODE) {
            // Default
            case 0:
                switch (key){
                    case '1':
                        openSankaku();
                        break;
                    case '2':
                        openSearchPlus();
                        break;
                    case '3':
                        break;
                    case '4':
                        break;
                    case '5':
                        break;
                    case '6':
                        break;
                    case '7':
                        break;
                    case '0':
                        document.getElementById("content8").classList.toggle("show");
                        break;
                    default:
                        break;
                }            
                break;
            
            // Search Plus
            case 2:
                switch (key) {
                    case 'Enter':
                        startdate.blur();
                        enddate.blur();
                        break;
                }
                setLastnNowPress(key)
                let orderbys = document.querySelectorAll(`.order-by input`);
                let excludes = document.querySelectorAll(`.exclude-rating input`);
                let personals = document.querySelectorAll(`.personal input`);

                console.log(last_press,now_press,orderbys);

                if (!isNaN(key)) {
                    switch (last_press){
                        case '1':

                            break;
                        case '2':
                            if(key == '1') {
                                document.querySelector('#startdate').focus();
                            } else if(key == '2') {
                                document.querySelector('#enddate').focus();
                            }
                            break;
                        case '5':
                            personals[key-1].checked = !personals[key-1].checked;
                            break;
                        case '6':
                            break;
                        case '7':
                            break;
                        case '3':
                            orderbys[key-1].checked = true;
                            insertButNotDup(tagListText,'order:',`order:${orderbys[key-1].value}`);
                            insertButNotDup(tagList,'order:',`<a class="button tag tag-angular" target="_blank" href="https://chan.sankakucomplex.com/?tags=order%3A${orderbys[key-1].value}&commit=Search"><span class="">order:${orderbys[key-1].value}</span></a>`)
                            showTagList(tagList);
                            break;
                        case '4':
                            excludes[key-1].checked = !excludes[key-1].checked;
                            if ( excludes[key-1].checked) {
                                tagList.push(`<a class="button tag tag-angular" target="_blank" href="https://chan.sankakucomplex.com/?tags=${excludes[key-1].value}&commit=Search"><span class="">${excludes[key-1].value}</span></a>`);
                                tagListText.push(excludes[key-1].value);
                                showTagList(tagList);
                            }
                            else {
                                findAndRemove(tagList,excludes[key-1].value)
                                findAndRemove(tagListText,excludes[key-1].value)
                                showTagList(tagList);
                            }
                            break;
                        case '0':
                            document.getElementById("content8").classList.toggle("show");
                            break;
                        default:
                            break;
                    }
                }
                break;
            default:
                break;
        }
    }
  // }
};

function setLastnNowPress(key) {
    last_press = now_press;
    now_press = key;
    window.setTimeout(function() { 
        last_press = null;
        now_press = null; 
    }, 500);
}

function key_press(frevKey, needKey) {
    console.log("keypress",first_press);
    if(first_press) {
        do_double_press(mess);
        first_press = false;
    } else {
        first_press = true;
        window.setTimeout(function() { 
            first_press = false; 
        }, 500);
    }
  }
  
  function do_double_press() {
  }


var menuButton1 = document.getElementById("menuButton1");
menuButton1.addEventListener("click", function(){
    openSankaku();
    // document.getElementById("content1").classList.toggle("show");
})
var menuButton2 = document.getElementById("menuButton2");
menuButton2.addEventListener("click", function(){
    openSearchPlus();

})
var menuButton3 = document.getElementById("menuButton3");
menuButton3.addEventListener("click", function(){
    document.getElementById("content3").classList.toggle("show");
    hiding();

})
var menuButton4 = document.getElementById("menuButton4");
menuButton4.addEventListener("click", function(){
    document.getElementById("content4").classList.toggle("show");
    hiding();

})
var menuButton5 = document.getElementById("menuButton5");
menuButton5.addEventListener("click", function(){
    document.getElementById("content5").classList.toggle("show");
    hiding();

})
var menuButton6 = document.getElementById("menuButton6");
menuButton6.addEventListener("click", function(){
    document.getElementById("content6").classList.toggle("show");
    hiding();

})
var menuButton7 = document.getElementById("menuButton7");
menuButton7.addEventListener("click", function(){
    document.getElementById("content7").classList.toggle("show");
    hiding();

})

var overlayAll = document.getElementsByClassName("overlay");
function closeAll() {
    for (i = 0; i < overlayAll.length; i++) {
        overlayAll[i].classList.remove("show");
    }
}

var headerSetting = document.getElementsByClassName("heading-setting");
for (i = 0; i < headerSetting.length; i++) {
    headerSetting[i].addEventListener("click", function() {
        console.log("click");
        closeAll();
});
}

function openSankaku() {
    window.open("https://chan.sankakucomplex.com/", "_blank");
}

function openSearchPlus() {
    document.getElementById("content2").classList.toggle("show");
    hiding();
    APP_MODE = 2;
}

function hiding() {
    hexagon.classList.toggle("hide");
    apptitle.classList.toggle("hide");
}