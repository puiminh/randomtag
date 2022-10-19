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
            let copySearchTag = tagListText.join(' ');
            webLink = `https://chan.sankakucomplex.com/?tags=${searchTag}&commit=Search`;
            linkTag.setAttribute("href", webLink);
            linkTag.click();
            // inputBox.select();
            // inputBox.setSelectionRange(0, 99999); // For mobile devices
             // Copy the text inside the text field
            navigator.clipboard.writeText(copySearchTag);
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

          if (element_select>childs.length) {
            element_select = 0;
            break;
        }
          for (let c of childs) 
            c.classList.remove('dropbtn-selected')
          childs[Math.abs(element_select) % childs.length].classList.add('dropbtn-selected');
          childs[Math.abs(element_select) % childs.length].scrollIntoView();
           element_select++;
          break;
        case "ArrowUp":
          if (element_select<0) {
            element_select = 0;
            break;
          }

          for (let c of childs) 
            c.classList.remove('dropbtn-selected')
          childs[Math.abs(element_select) % childs.length].classList.add('dropbtn-selected');
          childs[Math.abs(element_select) % childs.length].scrollIntoView();
           element_select--;
          break;
        case "Enter":
            console.log("select by Enter:", element_select,childs[element_select-1]);
            inputBox.value = '';

              select(childs[element_select-1])
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


// function debounce(func, timeout = 300){
//   let timer;
//   return (...args) => {
//     clearTimeout(timer);
//     timer = setTimeout(() => { func.apply(this, args); }, timeout);
//   };
// }

closeButton.addEventListener("click", ()=> {
  console.log("Click");
  tagList = [];
  showTagList(tagList);
  closeButton.classList.add("hide");
  inputBox.value = '';
  removeAllCheck();
})

function insertButNotDup(array, keyword, insertValue) {
  let value = array.findIndex(e => {
    return (e.search(keyword) != -1)
  });
  console.log(value)
  if (value != -1) {
    array[value] = insertValue;
  } else {
    array.push(insertValue);
  }
}

function findAndRemove(array, keyword) {
  let value = array.findIndex(e => {
    return (e.search(keyword) != -1)
  });
  console.log(value)
  if (value != -1) {
    array.splice(value, 1)
  } 
}

// Rating five star event
const fiveStar = document.querySelectorAll('input[name="rating"]');
var prevValueOfFiveStar = null;
for (var i = 0; i < fiveStar.length; i++) {
    fiveStar[i].addEventListener('change', function() {
        (prevValueOfFiveStar) ? console.log(prevValueOfFiveStar.value): null;
        if (this !== prevValueOfFiveStar) {
            prevValueOfFiveStar = this;
        }
        let value = this.value;
        insertButNotDup(tagListText,'threshold:',`threshold:${value}`);
        insertButNotDup(tagList,'threshold:',`<a class="button tag tag-angular" target="_blank" href="https://chan.sankakucomplex.com/?tags=threshold%3A${value}&commit=Search"><span class="">threshold:${value}</span></a>`)
        showTagList(tagList);
      });
}

// Order By event

const orderBy = document.querySelectorAll('input[name="order"]');
var prevValueOfOrderBy = null;
for (var i = 0; i < orderBy.length; i++) {
  orderBy[i].addEventListener('change', function() {
        (prevValueOfOrderBy) ? console.log(prevValueOfOrderBy.value): null;
        if (this !== prevValueOfOrderBy) {
            prevValueOfOrderBy = this;
        }
        let value = this.value;
        insertButNotDup(tagListText,'order:',`order:${value}`);
        insertButNotDup(tagList,'order:',`<a class="button tag tag-angular" target="_blank" href="https://chan.sankakucomplex.com/?tags=order%3A${value}&commit=Search"><span class="">order:${value}</span></a>`)
        showTagList(tagList);
      });
}

// Else radio event

const checkBoxs = document.querySelectorAll('input[name="exclude"]');
for (var i = 0; i < checkBoxs.length; i++) {
  checkBoxs[i].addEventListener('change',(e)=>{
    let value = e.target.value;
    if (e.target.checked) {
      tagList.push(`<a class="button tag tag-angular" target="_blank" href="https://chan.sankakucomplex.com/?tags=${value}&commit=Search"><span class="">${value}</span></a>`);
      tagListText.push(value);
      showTagList(tagList);
    }
    else {
      findAndRemove(tagList,value)
      findAndRemove(tagListText,value)
      showTagList(tagList);
    }
  })
}

function removeAllCheck() {
  let allChecks = document.querySelectorAll('input[type="checkbox"],input[type="radio"]');
  for (var i = 0; i < allChecks.length; i++) {
    allChecks[i].checked = false;
  }
}