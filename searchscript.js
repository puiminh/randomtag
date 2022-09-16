// getting all required elements
const searchWrapper = document.querySelector(".search-box");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".btn-search");
const tagBox = document.querySelector(".link-tag-wrapper")
const closeButton = document.querySelector(".clear-tag-list-button")
const linkTag = searchWrapper.querySelector("a");
let webLink;
let tagList = [];

let o = 0; // iterate over children elements inside dropdown
// if user press any key and release
inputBox.onkeyup = (e)=>{
    console.log("running")
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
        console.log("allData vs searchData",userData,bigData,emptyElements)

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
    const dropdown = document.querySelector(".autocom-box");
    const childs = dropdown.children; // get all dropdown elements
    console.log("all dropdown: ", childs);
    // attach keyboard events


      switch(e.code) {
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

              select(childs[o-1])
          break;
        
        case "Space":
            inputBox.value = "";
            searchWrapper.classList.remove("active");
          break;
        default: 
          break;
      }

    if (e.isComposing || e.keyCode === 229) {
      return;
    }
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
    tagList.push(`<a class="button tag tag-angular"  href="#"><span class="">${element.textContent}</span></a>`);
    showTagList(tagList);
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
    tagBox.innerHTML = '';
  }else{
      listData = list.join('');
      closeButton.classList.remove("hide");
      console.log("The list of tag",listData);
      tagBox.innerHTML = listData;
    }

}


function debounce(func, timeout = 300){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

closeButton.addEventListener("click", ()=> {
  console.log("Click");
  tagList = [];
  showTagList(tagList);
  closeButton.classList.add("hide");
  inputBox.value = '';
})
