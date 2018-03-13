function Waypoint(lat, lng, contentPoints){
  this.lat = lat;
  this.lng = lng;
  this.contentPoints = contentPoints;
  this.createWaypoint = createWaypoint;
}

function createWaypoint(){
  var newWaypointEntity = document.createElement("a-entity");
  newWaypointEntity.setAttribute("waypoint", "");
  document.getElementByClass("a-scene").appendChild(newWaypointEntity);
}
