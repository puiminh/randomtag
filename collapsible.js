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

var menuButton1 = document.getElementById("menuButton1");
menuButton1.addEventListener("click", function(){
    document.getElementById("content1").classList.toggle("show");

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