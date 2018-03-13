function JourneySession(journeyObject) {
  this.journeyObject = journeyObject;
  this.waypoints = journeyObject.Waypoints;
  this.nextWaypoint = 0; // journeyObject.waypoints[0]
  this.goToNextWaypoint = goToNextWaypoint;
}

// function to create ContentPoint from given JSON content

// function to create AR Component from ContentPoint

function goToNextWaypoint(){
  this.nextWaypoint++;
}

function displayMarkers(){
  for(var i = 0; i < this.waypoints[this.nextWaypoint].length; i++){
    //display each
  }
}
