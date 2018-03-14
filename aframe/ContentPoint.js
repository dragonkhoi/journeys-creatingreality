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
  newEl.setAttribute('img-marker',"imgUri:" + this.mediaUri + ";position: -5 0 -10;");
  newEl.setAttribute("scale", "0.04 0.04 0");      
  document.getElementById("markers").appendChild(newEl);
}
function createTextMarker(){
  // var signpost = document.createElement('a-entity');
  // signpost.setAttribute("id", "signpost");
  // signpost.setAttribute("gltf-model", "#signpostAsset");
  // signpost.setAttribute("position", "0 0 -1000");
  // document.getElementById("markers").appendChild(signpost);

  // var description = document.createElement('a-entity');
  // description.setAttribute("id", "desc");
  // description.setAttribute("text-marker", "message: " + this.description + ";position: 0 0.005 -100;");
  // description.setAttribute("material", "opacity:0");
  

  // console.log(description);

  // console.log(document.getElementById('signpost'));
  // document.getElementById("signpost").appendChild(description);

  // document.getElementById("markers").appendChild(description);  

  var signpostGeometry = document.createElement('a-entity');
  signpostGeometry.setAttribute("id", "signpostGeometry");
  signpostGeometry.setAttribute("geometry", "primitive: plane; width: auto; height: 0.5");
  signpostGeometry.setAttribute("color", "blue");  
  signpostGeometry.setAttribute("position", "0 1 -10");
  // signpostGeometry.setAttribute("scale", "2 2 2");   
  signpostGeometry.setAttribute("text", "value: This text will be  units wide. This text will be  units wide. This text will be  units wide. This text will be  units wide.This text will be  units wide.");  

  var signlegGeometry = document.createElement('a-entity');
  signlegGeometry.setAttribute("id", "signlegGeometry");
  signlegGeometry.setAttribute("geometry", "primitive: plane; width: 0.1; height: 2.5");
  signlegGeometry.setAttribute("color", "blue");  
  signlegGeometry.setAttribute("position", "0 -1 0");
  // signlegGeometry.setAttribute("scale", "2 2 2");   
  // signlegGeometry.setAttribute("text", "value: This text will be  units wide. This text will be  units wide. This text will be  units wide. This text will be  units wide.This text will be  units wide.");  


  document.getElementById("markers").appendChild(signpostGeometry);  
  document.getElementById("signpostGeometry").appendChild(signlegGeometry); 
}
function createAudioMarker(){

}
