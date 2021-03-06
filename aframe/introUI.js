window.onload = function() {
  var showStory = document.getElementById("showStory");
  showStory.addEventListener("touchstart", function(event){
    showStoryHover();
  }, false);
   var showStoryPlus = document.getElementById("showStoryPlus");
  showStoryPlus.addEventListener("touchend", function(event){
    hideStoryHover();
  }, false);

  //  var plusButton = document.querySelector("#expandShareMenu");
  // plusButton.addEventListener("touchstart", function(event){
  //   showPlusHit();
  // }, false);
  // var plusButtonHit = document.querySelector("#expandShareMenuHit");
  // plusButtonHit.addEventListener("touchend", function(event){
  //   activateShareMenu();
  // }, false);
  // plusButtonHit.addEventListener("touchstart", function(event){
  //   closeShareMenu();
  // }, false);
}

function showPlusHit(){
  var plusButton = document.querySelector("#expandShareMenu");
  plusButton.style.display = "none";
  var plusButtonHit = document.querySelector("#expandShareMenuHit");
  plusButtonHit.style.display = "block";
}

function activateShareMenu(){
  console.log("sharemenu");
  var plusButtonHit = document.querySelector("#expandShareMenuHit");
  plusButtonHit.style.display = "block";
  var shareButtonBar = document.querySelector("#shareButtonBar");
  shareButtonBar.style.display = "block";
}

function closeShareMenu(){
  console.log("close sharemenu");

  var plusButtonHit = document.querySelector("#expandShareMenuHit");
  if(plusButtonHit.style.display == "block"){
    plusButtonHit.style.display = "none";
    var shareButtonBar = document.querySelector("#shareButtonBar");
    shareButtonBar.style.display = "none";
  }
  else {
    activateShareMenu();
  }
}

function activateWaypointMenu(){
  var plusButtonHit = document.querySelector("#waypointExpandShareMenuHit");
  plusButtonHit.style.display = "block";
  var shareButtonBar = document.querySelector("#waypointShareButtonBar");
  shareButtonBar.style.display = "block";
}

function closeWaypointMenu(){
  var plusButtonHit = document.querySelector("#waypointExpandShareMenuHit");
  if(plusButtonHit.style.display == "block"){
    plusButtonHit.style.display = "none";
    var shareButtonBar = document.querySelector("#waypointShareButtonBar");
    shareButtonBar.style.display = "none";
  }
}
function activateWaypointCamera(){
  var photoActivate = document.querySelector("#waypointTakePhotoText");
  var photoActivateBlack = document.querySelector("#waypointTakePhotoTextBlack");
  var takePhotoOverlay = document.querySelector("#waypointTakePhotoOverlay");
  if(takePhotoOverlay.style.display == "block"){
    takePhotoOverlay.style.display = "none";
    photoActivateBlack.style.display = "none";
    photoActivate.style.display = "block";
  }else {
    takePhotoOverlay.style.display = "block";
    photoActivateBlack.style.display = "block";
    photoActivate.style.display = "none";

  }
}
function activateCamera(){
  var photoActivate = document.querySelector("#takePhotoText");
  var photoActivateBlack = document.querySelector("#takePhotoTextBlack");
  var takePhotoOverlay = document.querySelector("#takePhotoOverlay");
  if(takePhotoOverlay.style.display == "block"){
    takePhotoOverlay.style.display = "none";
    photoActivateBlack.style.display = "none";
    photoActivate.style.display = "block";
  }else {
    takePhotoOverlay.style.display = "block";
    photoActivateBlack.style.display = "block";
    photoActivate.style.display = "none";

  }
}

function createJourney(){
  CREATING = true;
  START = true;
  console.log("create button hit");
  document.getElementById("homescreen").style.display = "none";
  document.getElementById("waypointAdder").style.display = "block";
}
function startButton(){
  console.log("start button hit");
  START = true;
  document.getElementById("homescreen").style.display = "none";
  document.getElementById("journeySelect").style.display = "block";
}

function showStoryHover(){
  showStoryPlus = document.getElementById("showStoryPlus");
  showStoryPlus.style.display = "block";
}

function hideStoryHover(){
  setTimeout(function(){
    document.getElementById("journeySelect").style.display = "none";
    document.getElementById("hitStartPanel").style.display = "block";

  }, 300);
}

function showIntroScreen(){
  document.getElementById("hitStartPanel").style.display = "none";
  document.getElementById("introScreen").style.display = "block";
}

function startJourney(){
  document.getElementById("introScreen").style.display = "none";
  document.getElementById("plusOverlay").style.display = "block";

}
