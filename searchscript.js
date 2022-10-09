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
let tagListText = [];

let o = 0; // iterate over children elements inside dropdown
// if user press any key and release
inputBox.onkeyup = (e)=>{
    let userData = e.target.value; //user enetered data
    let emptyElements = [];
    let emptySearch = [];
    if(userData){
        icon.onclick = ()=>{
            let searchTag = tagListText.join('+');
            webLink = `https://chan.sankakucomplex.com/?tags=${searchTag}&commit=Search`;
            linkTag.setAttribute("href", webLink);
            linkTag.click();
        }
        
        let count = 0;
        for (let data of bigData) {
          if (count > 50) {
            break;
          } else {
            if ((data.name+'')?.toLocaleLowerCase().search(userData.toLocaleLowerCase()) != -1) { 
              count++;
              console.log("founded: ",data)
              emptySearch.push(data); 
            }
          }
        }
        // emptySearch = bigData.filter((data)=>{
        //     //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
        //       return ((data.name+'')?.toLocaleLowerCase().search(userData.toLocaleLowerCase()) != -1)
        // });
        // fetchByExcel(userData).then(() => {
          console.log("emtySearch: ",emptySearch)  
        emptyElements = emptySearch.map((data)=>{ //emtySearch
              // passing return data inside li tag
              return data = `<li>${data.name}</li>`;
          });
          console.log("userData vs searchData",userData,emptyElements)

          searchWrapper.classList.add("active"); //show autocomplete box
          showSuggestions(emptyElements);
          let allList = suggBox.getElementsByTagName("li");
          for (let i = 0; i < allList.length; i++) {
              //adding onclick attribute in all li tag
              allList[i].addEventListener("click", function(){
                  select(this)
              });
          }
        // }
        // )
    }else{
        searchWrapper.classList.remove("active"); //hide autocomplete box
    }
    const dropdown = document.querySelector(".autocom-box");
    const childs = dropdown.children; // get all dropdown elements
    // console.log("all dropdown: ", childs);
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
    searchWrapper.classList.remove("active");
    tagList.push(`<a class="button tag tag-angular" target="_blank" href="https://chan.sankakucomplex.com/?tags=${selectData}&commit=Search"><span class="">${element.textContent}</span></a>`);
    tagListText.push(element.textContent);
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
