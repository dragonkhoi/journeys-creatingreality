function ContentPoint(type, mediaUri, orientation, description, title) {
  this.type = type;
  this.mediaUri = mediaUri;
  this.orientation = orientation;
  this.description = description;
  this.title = title;
  this.createMarker = createMarker;
  this.createImageMarker = createImageMarker;
  this.createTextMarker = createTextMarker;
  // this.createAudioMarker = createAudioMarker;
}


function createMarker(posX){
  if(this.type == "image"){
    console.log("image");
    this.createImageMarker(posX);
  }
  else if(this.type == "text"){
    console.log("text");
    this.createTextMarker(posX);
  }
  // else if(this.type == "audio"){
  //   console.log("audio");
  //   this.createAudioMarker(posX);
  // }
}

function createImageMarker(posX){
  var newEl = document.createElement('a-entity');
  newEl.setAttribute('img-marker',"imgUri:" + this.mediaUri + ";position:" + posX +" 1.0 -8.0;");
  newEl.setAttribute("scale", "1.0 1.0 0.0");
  // newEl.setAttribute("look-at", "[camera]");        
  document.getElementById("markers").appendChild(newEl);
}
function createTextMarker(posX){

  var signpostGeometry = document.createElement('a-entity');
  signpostGeometry.setAttribute("id", "signpostGeometry");
  signpostGeometry.setAttribute("geometry", "primitive: plane; width: auto; height: 0.3");
  signpostGeometry.setAttribute("material", "color: #f8f8f8");  
  signpostGeometry.setAttribute("scale", "6.0 6.0 0.0"); 
  // signpostGeometry.setAttribute("look-at", "[camera]");  
  signpostGeometry.setAttribute("position", "0 -2.5 -12");
  signpostGeometry.setAttribute("text", "value: This text will be  units wide. This text will be  units wide. This text will be  units wide. This text will be  units wide.This text will be  units wide. ; zOffset: 100; color: #000000; shader: msdf; font:https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/roboto/Roboto-Medium.json;");  

  var signlegGeometry = document.createElement('a-entity');
  signlegGeometry.setAttribute("id", "signlegGeometry");
  signlegGeometry.setAttribute("geometry", "primitive: plane; width: 0.05; height: 0.7");
  signlegGeometry.setAttribute("material", "color: #1e1e1e"); 
  signlegGeometry.setAttribute("position", "0 -0.2 -100"); 

  document.getElementById("markers").appendChild(signpostGeometry);  
  document.getElementById("signpostGeometry").appendChild(signlegGeometry); 
}
// function createAudioMarker(posX){
//   var newEl = document.createElement('a-entity');
//   newEl.setAttribute('audio-marker',"audioUri:" + this.mediaUri + "; posX:" + posX);     
//   document.getElementById("markers").appendChild(newEl);
// }
