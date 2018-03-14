function startButton(){
  console.log("start button hit");
  document.getElementById("homescreen").style.display = "none";
  document.getElementById("journeySelect").style.display = "block";

}

function showStoryHover(){
  console.log("switch to plus");
  document.getElementById("showStoryPlus").style.display = "block"; // = "../assets/img/btn_journey_select.png";
}

function hideStoryHover(){
  console.log("switch back");
  //document.getElementById("showStoryPlus").style.display = "none"; // = "../assets/img/btn_journey_select.png";
  setTimeout(function(){
    document.getElementById("journeySelect").style.display = "none";
  }, 800);
}
