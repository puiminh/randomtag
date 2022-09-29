document.addEventListener("DOMContentLoaded", function(event) { 
    var counter = 0;
    var c = 0;
    var loadingFunc = setInterval(function(){
        document.querySelector(".loading-page .counter h1").textContent = c + "%";
        document.querySelector(".loading-page .counter hr").style.width = c + "%";
        //$(".loading-page .counter").css("background", "linear-gradient(to right, #f60d54 "+ c + "%,#0d0d0d "+ c + "%)");
  
      /*
      $(".loading-page .counter h1.color").css("width", c + "%");
      */
      counter++;
      c++;
        // console.log(c)
      if(counter == 101) {
          clearInterval(loadingFunc);
      }
    }, 50);

    loadingFunc();
});