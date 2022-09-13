// getting all required elements
const searchWrapper = document.querySelector(".search-box");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".btn-search");
const tagBox = document.querySelector(".link-tag-wrapper")
let linkTag = searchWrapper.querySelector("a");
let webLink;
let tagList = [];


// if user press any key and release
inputBox.onkeyup = (e)=>{
    switch (e.keyCode) {
        case 37:
            console.log("left"); //show the message saying left"
            return;
        case 38:
            console.log("up"); //show the message saying up"
            return;
        case 39:
            console.log("right"); //show the message saying right"
            return;
        case 40:
            console.log("down"); //show the message saying down"
            return;
        case 13:
            console.log("enter");
            return;
        default:
            break;
    } 
    let userData = e.target.value; //user enetered data
    let emptyElements = [];
    let emptySearch = [];
    if(userData){
        icon.onclick = ()=>{
            webLink = `https://www.google.com/search?q=${userData}`;
            linkTag.setAttribute("href", webLink);
            linkTag.click();
        }
        emptySearch = bigData.filter((data)=>{
            //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
            return (data.toLocaleLowerCase().search(userData.toLocaleLowerCase()) != -1)
        });
        
        emptyElements = emptySearch.map((data)=>{
            // passing return data inside li tag
            return data = `<li>${data}</li>`;
        });
        console.log("allData vs searchData",bigData,emptyElements)

        searchWrapper.classList.add("active"); //show autocomplete box
        showSuggestions(emptyElements);
        let allList = suggBox.getElementsByTagName("li");
        for (let i = 0; i < allList.length; i++) {
            //adding onclick attribute in all li tag
            allList[i].addEventListener("click", function(){
                select(this)
            });
        }
    }else{
        searchWrapper.classList.remove("active"); //hide autocomplete box
    }
    let o = 0; // iterate over children elements inside dropdown
    const dropdown = document.querySelector(".autocom-box");
    const childs = dropdown.children; // get all dropdown elements
    console.log("all dropdown: ", childs);
    // attach keyboard events
    window.addEventListener("keyup", event => {
      switch(event.code) {
        case "ArrowDown":

          if (o>childs.length) {
            o = 0;
            break;
        }
          for (let c of childs) 
            c.classList.remove('dropbtn-selected')
          childs[Math.abs(o) % childs.length].classList.add('dropbtn-selected');
          childs[Math.abs(o) % childs.length].scrollIntoView();
           o++;
          break;
        case "ArrowUp":
          if (o<0) {
            o = 0;
            break;
          }

          for (let c of childs) 
            c.classList.remove('dropbtn-selected')
          childs[Math.abs(o) % childs.length].classList.add('dropbtn-selected');
          childs[Math.abs(o) % childs.length].scrollIntoView();
           o--;
          break;
        case "Enter":
            console.log("select by Enter:", o,childs[o-1]);
            inputBox.value = '';

            setTimeout(() => {
              select(childs[o-1])
              tagList.push(`<a class="button tag tag-angular"  href="#"><span class="">${childs[o-1].textContent}</span></a>`);
              showTagList(tagList);
            },1000);


          break;
      }
    });
}

function select(element){
    if(!element) return;
    let selectData = element.textContent;
    inputBox.value = selectData;
    icon.onclick = ()=>{
        webLink = `https://www.google.com/search?q=${selectData}`;
        linkTag.setAttribute("href", webLink);
        linkTag.click();
    }
    searchWrapper.classList.remove("active");

}

function showSuggestions(list){
    let listData;
    if(!list.length){
        userValue = inputBox.value;
        listData = `<li> ${userValue}</li>`;
    }else{
        listData = list.join('');
      }
    suggBox.innerHTML = listData;
}
function showTagList(list){
  let listData;
  console.log("The list of tag",list);
  if(!list.length){
  }else{
      listData = list.join('');
    }
    console.log("The list of tag",listData);
  
  tagBox.innerHTML = listData;
}


function debounce(func, timeout = 300){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}