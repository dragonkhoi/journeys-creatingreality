function ContentPoint(type, mediaUri, orientation, description, title) {
  this.type = type;
  this.mediaUri = mediaUri;
  this.orientation = orientation;
  this.description = description;
  this.title = title;
  this.createMarker = createMarker;
  this.createImageMarker = createImageMarker;
  this.createTextMarker = createTextMarker;
  this.createAudioMarker = createAudioMarker;
}


function createMarker(){
  if(this.type == "image"){
    console.log("image");
    this.createImageMarker();
  }
  else if(this.type == "text"){
    console.log("text");
    this.createTextMarker();
  }
  else if(this.type == "audio"){
    console.log("audio");
    this.createAudioMarker();
  }
}

function createImageMarker(){
  var newEl = document.createElement('a-entity');
  newEl.setAttribute('img-marker',"imgUri:" + this.mediaUri + ";position: -100 0.005 -200");
  document.getElementById("markers").appendChild(newEl);
}
function createTextMarker(){
  var signpost = document.createElement('a-entity');
  signpost.setAttribute("id", "signpost");
  signpost.setAttribute("gltf-model", "#signpostAsset");
  signpost.setAttribute("position", "0 0 -1000");
  document.getElementById("markers").appendChild(signpost);

  var description = document.createElement('a-entity');
  description.setAttribute("id", "desc");
  description.setAttribute("text-marker", "message: " + this.description + ";position: 0 0.005 -100;");
  description.setAttribute("material", "opacity:0");
  

  // console.log(description);

  // console.log(document.getElementById('signpost'));
  // document.getElementById("signpost").appendChild(description);

  document.getElementById("markers").appendChild(description);  
}
function createAudioMarker(){

}
