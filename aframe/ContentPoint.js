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
    this.createImageMarker();
  }
  else if(this.type == "text"){
    this.createTextMarker();
  }
  else if(this.type == "audio"){
    this.createAudioMarker();
  }
}

function createImageMarker(){
  var newEl = document.createElement('a-img');
  newEl.setAttribute("src", this.mediaUri);
  document.getElementById("markers").appendChild(newEl);
}
function createTextMarker(){
  var newEl = document.createElement('a-entity');
  newEl.setAttribute("text-marker", "message: " + this.mediaUri + ";");
  document.getElementById("markers").appendChild(newEl);
}
function createAudioMarker(){

}
