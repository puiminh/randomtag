document.querySelector('#menuButton4').addEventListener("click", function(event) { 
    var counter = 0;
    var c = 0;
    console.log(bigData)
    var loadingFunc = setInterval(function(){
        if(counter%2 == 0)
        document.querySelector(".loading-page .counter h1").textContent = `${bigData[c].name}`;
        // document.querySelector(".loading-page .counter hr").style.width = c + "%";
        //$(".loading-page .counter").css("background", "linear-gradient(to right, #f60d54 "+ c + "%,#0d0d0d "+ c + "%)");
  
      /*
      $(".loading-page .counter h1.color").css("width", c + "%");
      */
      counter++;
      c++;
        // console.log(c)
      if(counter == 40) {
          clearInterval(loadingFunc);
      }
    }, 100);

  // 
});
// loadingFunc(); 