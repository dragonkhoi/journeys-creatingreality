window.onload = function() {
  var showStory = document.getElementById("showStory");
  showStory.addEventListener("touchstart", function(event){
    showStoryHover();
  }, false);
  var showStoryPlus = document.getElementById("showStoryPlus");
  showStoryPlus.addEventListener("touchend", function(event){
    hideStoryHover();
  }, false);
}

function startButton(){
  console.log("start button hit");
  document.getElementById("homescreen").style.display = "none";
  document.getElementById("journeySelect").style.display = "block";
}

function showStoryHover(){
  document.getElementById("showStoryPlus").style.display = "block";
}

function hideStoryHover(){
  setTimeout(function(){
    document.getElementById("journeySelect").style.display = "none";
    document.getElementById("introScreen").style.display = "block";

  }, 300);
}

function startJourney(){
  document.getElementById("introScreen").style.display = "none";
  document.getElementById("takePhotoOverlay").style.display = "block";

}
