var video;
window.onload = function(){
  video = document.querySelector('#camera-stream');
  navigator.getMedia = ( navigator.getUserMedia || navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia);

  if(!navigator.getMedia){
    alert("Browser doesn't support taking photos");
  }
  else{
    navigator.getUserMedia(
      {
        video: true
      },
      function(stream) {
        video.src = window.URL.createObjectURL(stream);

        video.play();
      },
      function (err) {
        console.error(err);
      }
    );
  }

  var cameraButton = document.querySelector("#takePhoto");
  cameraButton.addEventListener("touchstart", function(event){
    showTakePhotoHit();
  }, false);
  cameraButton.addEventListener("touchmove", function(event){
    showTakePhotoHit();
  }, false);
  var cameraButtonHit = document.querySelector("#takePhotoHit");
  cameraButtonHit.addEventListener("touchend", function(event){
    takeSnapshot();
  }, false);
}

function showTakePhotoHit(){
  var cameraButton = document.querySelector("#takePhoto");
  cameraButton.style.display = "none";
  var cameraButtonHit = document.querySelector("#takePhotoHit");
  cameraButtonHit.style.display = "block";
}

function takeSnapshot(){
  var cameraButtonHit = document.querySelector("#takePhotoHit");
  cameraButtonHit.style.display = "none";
  var hidden_canvas = document.getElementById("photoLayer"),
    image = document.querySelector('#photoDisplay'),

    width = video.videoWidth,
    height = video.videoHeight,

    context = hidden_canvas.getContext("2d");

    hidden_canvas.width = width;
    hidden_canvas.height = height;

    context.drawImage(video, 0, 0, width, height);
    showPhotoResults();

    var imageDataURL = hidden_canvas.toDataURL("image/png");

    image.setAttribute("src", imageDataURL);
    var downloadLink = document.querySelector('#dl-btn');
    downloadLink.href = imageDataURL;
    downloadLink.click();
}

function showPhotoResults(){
  var photoConfirmBar = document.querySelector("#bottomPhotoResults");
  photoConfirmBar.style.display = "block";
  var photoSaved = document.querySelector("#photoSaved");
  photoSaved.style.display = "block";
  setTimeout(hidePhotoResults, 3000);
}
function hidePhotoResults() {
  var photoConfirmBar = document.querySelector("#bottomPhotoResults");
  photoConfirmBar.style.display = "none";
  var photoSaved = document.querySelector("#photoSaved");
  photoSaved.style.display = "none";
  var cameraButton = document.querySelector("#takePhoto");
  cameraButton.style.display = "block";
}
