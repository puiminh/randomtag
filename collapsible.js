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
var date_focus = false;
var last_press = null;
var now_press = null;
var element_select = 0;
var keyCap = [];
var i;

const hexagon = document.getElementById("hexagon-menu");
const apptitle = document.getElementById("app-title");


const inputs = document.querySelectorAll('input[type="text"]')
const startdate = document.querySelector('#startdate');
const enddate = document.querySelector('#enddate');
const my_dropdown = document.querySelector(".my-recommend .recommend-display");
const sankaku_dropdown = document.querySelector(".sankaku-recommend .recommend-display");
const bottomKeycap = document.getElementById("bottom-keycap")

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

    if(evt.ctrlKey && key == 'Enter') {   
        confirmSearch();
    }
    if (!search_focus) {
        switch (APP_MODE) {
            // Default
            case 0:
                switch (key){
                    case '1':
                        openSankaku();
                        break;
                    case '2':
                        openContent('content2',2);
                        break;
                    case '3':
                        openContent('content3',3);
                        functionContent3();
                        break;
                    case '4':
                        var today = new Date();
                        var lastWeek = getFormatDate(new Date(today.getTime()-7 * 24 * 60 * 60 * 1000));
                        var lastMonth = getFormatDate(new Date(today.getTime()-31 * 24 * 60 * 60 * 1000));
                        var yesterday = getFormatDate(new Date(today.getTime()-24 * 60 * 60 * 1000));
                        today = getFormatDate(today);
                        openContent('content4',4);

                        // fetchingSankakuApi('https://capi-v2.sankakucomplex.com/posts/keyset?lang=en&limit=20&tags=fav:minhb3o+voted:minhb3o:5').then((array)=> {
                        //     console.log(array);
                        //     // array = array.sort(function (a,b) {
                        //     //     return 0.5 - Math.random();
                        //     // }).slice(0,50); 
                        //     my = array.map((e)=>{ //emtySearch
                        //         return data = `<li>${e.name_en + ' - ' + e.recCount}</li>`;
                        //     });
                        //     my_dropdown.innerHTML = my.join('');
                        // })
                        let username = localStorage.getItem('randomtag-username') ? localStorage.getItem('randomtag-username') : 'minhb3o';
                        fetchingSankakuApi(`https://capi-v2.sankakucomplex.com/posts/keyset?lang=en&limit=20&tags=fav:${username}`).then((array)=> {
                            console.log(array);
                            array = array.sort(function (a,b) {
                                return 0.5 - Math.random();
                            }).slice(0,50); 
                            my = array.map((e)=>{ //emtySearch
                                return data = `<li>${e.name_en}</li>`;
                            });
                            my_dropdown.innerHTML = my.join('');
                        })

                        fetchingSankakuApi(`https://capi-v2.sankakucomplex.com/posts/keyset?lang=en&limit=100&tags=order:popularity+date:${yesterday}T17:00..${today}T17:00`).then((array)=> {
                            array = array.sort(function (a,b) {
                                return 0.5 - Math.random();
                            }).slice(0,50); 
                            let my = array.map((e)=>{ //emtySearch
                                return data = `<li>${e.name_en}</li>`;
                            });
                            
                            sankaku_dropdown.innerHTML = my.join('');
                        })
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

                if (document.activeElement == startdate) {
                    APP_MODE = 2.1;
                }
                if (document.activeElement == enddate) {
                    APP_MODE = 2.2;
                }

                setLastnNowPress(key)
                if ((last_press == 'ArrowLeft')&(now_press=='ArrowLeft')&&!date_focus) {
                    console.log('back');
                    backToMenu('content2');
                }
                let orderbys = document.querySelectorAll(`.order-by input`);
                let excludes = document.querySelectorAll(`.exclude-rating input`);
                let personals = document.querySelectorAll(`.personal input`);

                console.log(last_press,now_press);

                if (!isNaN(key)) {
                    switch (last_press){
                        case '1':

                            break;

                        case '2':
                            if(key == '1') {
                                date_focus = true;
                                APP_MODE = 2.1;
                                document.querySelector('#startdate').focus();
                            } else if(key == '2') {
                                date_focus = true;
                                APP_MODE = 2.2;
                                document.querySelector('#enddate').focus();
                            }
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
                        case '5':
                            personals[key-1].checked = !personals[key-1].checked;
                            let nocusmtomTagList = localStorage.getItem('no-custom-tag-input').split(' ')
                            let user = localStorage.getItem('randomtag-username');
                            
                                if ( personals[key-1].checked) {
                                    if (personals[key-1].value == 'nocustom') {
                                        for (const tag of nocusmtomTagList) {
                                            tagList.push(`<a class="button tag tag-angular" target="_blank" href="https://chan.sankakucomplex.com/?tags=-${tag}&commit=Search"><span class="">-${tag}</span></a>`);
                                        }
                                        tagListText.push(...nocusmtomTagList);
                                        showTagList(tagList);
                                        break;
                                    }
                                    tagList.push(`<a class="button tag tag-angular" target="_blank" href="https://chan.sankakucomplex.com/?tags=${personals[key-1].value+user}&commit=Search"><span class="">${personals[key-1].value+user}</span></a>`);
                                    tagListText.push(personals[key-1].value+user);
                                    showTagList(tagList);
                                }
                                else {
                                    
                                    if (personals[key-1].value == 'nocustom') {
                                        for (const tag of nocusmtomTagList) {
                                            findAndRemove(tagList,'-'+tag)
                                            findAndRemove(tagListText,'-'+tag)
                                        }
                                        showTagList(tagList);
                                        break;
                                    }
                                    tagList.push(`<a class="button tag tag-angular" target="_blank" href="https://chan.sankakucomplex.com/?tags=${personals[key-1].value+user}&commit=Search"><span class="">${personals[key-1].value+user}</span></a>`);
                                    tagListText.push(personals[key-1].value+user);
                                    showTagList(tagList);
                                    
                                    findAndRemove(tagList,personals[key-1].value+user)
                                    findAndRemove(tagListText,personals[key-1].value+user)
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

            // Start Date
            case 2.1:
                if (document.activeElement == enddate) {
                    APP_MODE = 2.2;
                }
                switch (key) {
                    case 'Enter':
                        startdate.blur();
                        date_focus = false;
                        APP_MODE = 2;
                        startdate.innerHTML = `date:>=${startdate.value}`;
                        console.log(startdate.value, typeof startdate.value)
                        if(startdate.value != '') select(startdate);
                        break;
                    default:

                        break;
                }
                break;
            
            case 2.2:
                if (document.activeElement == startdate) {
                    APP_MODE = 2.1;
                }
                switch (key) {
                    case 'Enter':
                        enddate.blur();
                        date_focus = false;
                        APP_MODE = 2;
                        enddate.innerHTML = `date:<=${enddate.value}`;
                        console.log(enddate.value, typeof enddate.value)
                        if(enddate.value != '') select(enddate);
                        break;
                    default:

                        break;
                }
                break;

            // Random:

            case 3:
                setLastnNowPress(key)
                if ((last_press == 'ArrowLeft')&(now_press=='ArrowLeft')) {
                    console.log('back');
                    backToMenu('content3');
                }

                switch (now_press) {
                    case 'Enter':
                        select(document.querySelector('.counter-text'));
                        break;

                    case 'ArrowUp':
                        if (last_press == 'ArrowUp') {
                            functionContent3();
                        }
                        break;
                    case 'ArrowDown':
                        if (last_press == 'ArrowDown') {
                            randomMany();
                        }
                        break;
                
                    default:
                        break;
                }

                if (!isNaN(key) && (key<=5)) {
                    select(document.getElementById(`random-li-${key}`))
                }

                break;

            // Recommend
            case 4:

                setLastnNowPress(key)
                if ((last_press == 'ArrowLeft')&(now_press=='ArrowLeft')) {
                    console.log('back');
                    backToMenu('content4');
                }
            
                switch (now_press) {
                    case '1':
                        APP_MODE = 4.1;
                        document.querySelector(".sankaku-recommend-title").style.fontWeight = 900;
                        break;
                    case '2':
                        APP_MODE = 4.2;
                        document.querySelector(".my-recommend-title").style.fontWeight = 900;
                        break;
                    default:
                        break;
                }            
                break;
            
            // Recommend - Sankaku:
            
            case 4.1:
                let sankaku_childs = sankaku_dropdown.children; // get all dropdown elements
                
                setLastnNowPress(key)
                if ((last_press == 'ArrowLeft')&(now_press=='ArrowLeft')) {
                    console.log('back');
                    backToMenu('content4');
                }
                switch(key) {
                    case "ArrowDown":
            
                      if (element_select>sankaku_childs.length) {
                        element_select = 0;
                        break;
                    }
                      for (let c of sankaku_childs) 
                        c.classList.remove('dropbtn-selected')
                      sankaku_childs[Math.abs(element_select) % sankaku_childs.length].classList.add('dropbtn-selected');
                      sankaku_childs[Math.abs(element_select) % sankaku_childs.length].scrollIntoView();
                       element_select++;
                      break;
                    case "ArrowUp":
                      if (element_select<0) {
                        element_select = 0;
                        break;
                      }
            
                      for (let c of sankaku_childs) 
                        c.classList.remove('dropbtn-selected')
                      sankaku_childs[Math.abs(element_select) % sankaku_childs.length].classList.add('dropbtn-selected');
                      sankaku_childs[Math.abs(element_select) % sankaku_childs.length].scrollIntoView();
                       element_select--;
                      break;
                    case "Enter":
                        console.log("select by Enter:", element_select,sankaku_childs[element_select-1]);
                        inputBox.value = '';
            
                          select(sankaku_childs[element_select-1])
                      break;
                    
                    case "Space":
                      break;

                    case "2":
                        APP_MODE = 4.2 
                        break;  
                    default: 
                      break;
                  }
                break;
            case 4.2:

                setLastnNowPress(key)
                if ((last_press == 'ArrowLeft')&(now_press=='ArrowLeft')) {
                    console.log('back');
                    backToMenu('content4');
                }

                let my_childs = my_dropdown.children; // get all dropdown elements
                switch(key) {
                    case "ArrowDown":
            
                        if (element_select>my_childs.length) {
                        element_select = 0;
                        break;
                    }
                        for (let c of my_childs) 
                        c.classList.remove('dropbtn-selected')
                        my_childs[Math.abs(element_select) % my_childs.length].classList.add('dropbtn-selected');
                        my_childs[Math.abs(element_select) % my_childs.length].scrollIntoView();
                        element_select++;
                        break;
                    case "ArrowUp":
                        if (element_select<0) {
                        element_select = 0;
                        break;
                        }
            
                        for (let c of my_childs) 
                        c.classList.remove('dropbtn-selected')
                        my_childs[Math.abs(element_select) % my_childs.length].classList.add('dropbtn-selected');
                        my_childs[Math.abs(element_select) % my_childs.length].scrollIntoView();
                        element_select--;
                        break;
                    case "Enter":
                        console.log("select by Enter:", element_select,my_childs[element_select-1]);
                        inputBox.value = '';
            
                            select(my_childs[element_select-1])
                        break;
                    
                    case "Space":
                        break;

                    case "1":
                        APP_MODE = 4.1 
                        break;
                    default: 
                        break;
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
    openContent('content2',2);

})
var menuButton3 = document.getElementById("menuButton3");
menuButton3.addEventListener("click", function(){
    openContent('content3',3)
    functionContent3();

})

async function randomOne() {
  let counter=0, c = 0;
  return await new Promise(resolve => {
    const interval = setInterval(() => {
        if(counter%2 == 0)
            document.querySelector(".loading-page .counter h1").textContent = `${bigData[c].name}`;
        counter++;
        c = Math.floor(Math.random() * 3000)
        console.log("c - counter:",c,counter);
      if (counter > 40) {
        resolve(c);
        clearInterval(interval);
      };
    }, 100);
  });
}

async function randomMany() {
    let counter=0, c1 = 0,c2 = 0,c3 = 0,c4 = 0,c5 = 0;
    const random_li_1 = document.getElementById('random-li-1')
    const random_li_2 = document.getElementById('random-li-2')
    const random_li_3 = document.getElementById('random-li-3')
    const random_li_4 = document.getElementById('random-li-4')
    const random_li_5 = document.getElementById('random-li-5')
    return await new Promise(resolve => {  
      const interval = setInterval(() => {

          switch (counter%5) {
            case 1:
            random_li_4.textContent = `${bigData[c4].name}`;

                
                break;
            case 2:
                random_li_3.textContent = `${bigData[c3].name}`;
                
                break;
            case 3:
                random_li_2.textContent = `${bigData[c2].name}`;
            
                break;
            case 4:
            random_li_1.textContent = `${bigData[c1].name}`;
                
                break;   
            default:
            random_li_5.textContent = `${bigData[c5].name}`;

                break;
          }
          if(counter%2 == 0) {
          }
          counter++;
          c1 = randomXToY(0,500);
          c2 = randomXToY(501,1000);
          c3 = randomXToY(1001,2000);
          c4 = randomXToY(2001,3001);
          c5 = randomXToY(3001,4000);
        if (counter > 60) {
          resolve(c1,c2,c3,c4,c5);
          clearInterval(interval);
        };
      }, 50);
    });
  }

  function randomXToY(minVal,maxVal)
  {
    var randVal = minVal+(Math.random()*(maxVal-minVal));
    return Math.floor(randVal);
  }



var menuButton4 = document.getElementById("menuButton4");
menuButton4.addEventListener("click", function(){
    openContent('content4',4);
})
var menuButton5 = document.getElementById("menuButton5");
menuButton5.addEventListener("click", function(){
    document.getElementById("content5").classList.toggle("show");
    toggling();

})
var menuButton6 = document.getElementById("menuButton6");
menuButton6.addEventListener("click", function(){
    document.getElementById("content6").classList.toggle("show");
    toggling();

})
var menuButton7 = document.getElementById("menuButton7");
menuButton7.addEventListener("click", function(){
    document.getElementById("content7").classList.toggle("show");
    toggling();

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

function confirmSearch() {
    let searchTag = tagListText.join('+');
    window.open(`https://chan.sankakucomplex.com/?tags=${searchTag}&commit=Search`, "_blank");
}

function openContent(nameContent,appMode) {
    document.getElementById(nameContent).classList.toggle("show");
    toggling();
    APP_MODE = appMode;
    changeBottomKeycap(appMode);
}

function backToMenu(nameContent) {
    toggling();
    APP_MODE = 0;
    changeBottomKeycap(0);
    document.getElementById(nameContent).classList.toggle("show");
}

function openRecommend() {
    document.getElementById("content4").classList.toggle("show");
    toggling();
}


function toggling() {
    hexagon.classList.toggle("hide");
    apptitle.classList.toggle("hide");
}
{/* <div class="group-key-mean">
<span class="keycap">A</span>
<span class="meaning">Back</span>
</div> */}
function changeBottomKeycap(number) {
    for (const e of KEY[`KEY_CAP_${number}`]?KEY[`KEY_CAP_${number}`]:[]) {
        let insertKey = `
            <div class="group-key-mean">
                <span class="keycap">${e.key}</span>
                <span class="meaning">${e.mean}</span>
            </div> 
        `
        keyCap.push(insertKey);
    }
    bottomKeycap.innerHTML = keyCap.join('');
}

function functionContent3() {
    const randomStatus = document.getElementById('random-status');
    randomOne().then((e) => {
        randomStatus.classList.remove('blink_me');
        randomStatus.textContent = 'Here!';
    })
}


function getFormatDate(date) {
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
}