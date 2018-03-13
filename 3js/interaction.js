// functions for interacting with markers in the scene
var INTERACTABLE_DISTANCE = 2;

// can be called on tap, x,y are tap coordinates
// or can be called on update to check if user is near interactables
function interactMarker(vrDisplay, x, y){
  if (!vrDisplay || !vrDisplay.hitTest) {
    return;
  }
  var hit = vrDisplay.hitTest(x, y);
  if (hit && hit.length > 0 && hit.length < INTERACTABLE_DISTANCE) {
    // user is looking at and
    if(0){ // if object is interactable
      if(0) { // if object is of type audio
        // audio.play()
      }
      else if(1) { // if object is of type text
        // text brighten or something
      }
      else if(2) { // if object is of type Image
        // maybe slightly enlarge?
      }
    }
  }
}
