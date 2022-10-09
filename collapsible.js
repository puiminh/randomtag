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

var i;


document.onkeydown = function(evt){
    // evt = evt || window.event;
    // if(evt.shiftKey){
    // console.log('Shift');
    switch (evt.key){
        case '1':
            function1();
            break;
        case '2':
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
  // }
};


var menuButton1 = document.getElementById("menuButton1");
menuButton1.addEventListener("click", function(){
    function1();
    // document.getElementById("content1").classList.toggle("show");
})
var menuButton2 = document.getElementById("menuButton2");
menuButton2.addEventListener("click", function(){
    document.getElementById("content2").classList.toggle("show");
})
var menuButton3 = document.getElementById("menuButton3");
menuButton3.addEventListener("click", function(){
    document.getElementById("content3").classList.toggle("show");
})
var menuButton4 = document.getElementById("menuButton4");
menuButton4.addEventListener("click", function(){
    document.getElementById("content4").classList.toggle("show");
})
var menuButton5 = document.getElementById("menuButton5");
menuButton5.addEventListener("click", function(){
    document.getElementById("content5").classList.toggle("show");
})
var menuButton6 = document.getElementById("menuButton6");
menuButton6.addEventListener("click", function(){
    document.getElementById("content6").classList.toggle("show");
})
var menuButton7 = document.getElementById("menuButton7");
menuButton7.addEventListener("click", function(){
    document.getElementById("content7").classList.toggle("show");
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

function function1() {
    window.open("https://chan.sankakucomplex.com/", "_blank");
}