function JourneySession(journeyObject) {
  this.journeyObject = journeyObject;
  this.waypoints = journeyObject.Waypoints;
  this.wpObjs = [];
  this.nextWaypoint = 0;
  this.goToNextWaypoint = goToNextWaypoint;
  this.createWaypoints = createWaypoints;
  this.displayMarkers = displayMarkers;
}

// view: function to create AR Component from ContentPoint

function goToNextWaypoint(){
  this.nextWaypoint++;
  // update view by deactivating current waypoint and activating next
}

function createWaypoints(){
  for(var i = 0; i < this.waypoints.length; i++){
    var curWP = this.waypoints[i];
    var newContentPoints = [];
    for(var j = 0; j < curWP.ContentPoints.length; j++){
      var curCP = curWP.ContentPoints[j];
      var newCP = new ContentPoint(curCP.Type, curCP.Ref, curCP.Orientation, curCP.Description, curCP.Title);
      newContentPoints.push(newCP);
    }
    var newWP = new Waypoint(curWP.Location.Lat, curWP.Location.Lng, newContentPoints);
    this.wpObjs.push(newWP);
  }
}

// view
function displayMarkers(){
  for(var i = 0; i < this.wpObjs[this.nextWaypoint].length; i++){
    //display each
  }
}

// fetchJourney("U001","First Award");
