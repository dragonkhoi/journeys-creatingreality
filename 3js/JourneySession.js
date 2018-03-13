function JourneySession(journeyObject) {
  this.journeyObject = journeyObject;
  this.nextWaypoint = 0; // journeyObject.waypoints[0]
  this.goToNextWaypoint = goToNextWaypoint;
}

function goToNextWaypoint(){
  this.nextWaypoint++;
}

function displayMarkers(){
  for(var i = 0; i < journeyObject.waypoints[this.nextWaypoint].length; i++){
    //display each
  }
}
