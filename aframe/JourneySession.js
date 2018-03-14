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
  console.log(this);
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
  document.getElementById('markers').innerHTML = "";
  var positionsX = calculatePositions.call(this.wpObjs[this.nextWaypoint].contentPoints);
  this.wpObjs[this.nextWaypoint].contentPoints[0].createMarker(0);
  for(var i = 1; i < this.wpObjs[this.nextWaypoint].contentPoints.length; i++){
    console.log(this.wpObjs[this.nextWaypoint].contentPoints[i]);
    this.wpObjs[this.nextWaypoint].contentPoints[i].createMarker(positionsX[i-1]);
  }
}

function calculatePositions() {
  var positionsX;
  var imgCount = this.length - 1;
  switch(imgCount) {
    case 1: { 
      positionsX = [0];
      break;
    }
    case 2: {
      positionsX = [-2,2];
      break;
    }
    case 3: {
      positionsX = [-4,0,4];
      break;
    }
    case 4: {
      positionsX = [-5,-2,2,5];
      break;
    }
    case 5: {
      positionsX = [-8,-4,0,4,8];
      break;
    }
    case 6: {
      positionsX = [-8,-5,-2,2,5,8];
      break;
    }
    default: {
      positionsX = [0];
    }
  }
  return positionsX;
}


// 1 : 0
// 2 : -2 2
// 3 :  -2  0  2
// 4: -2 -1 1 2



// function displayContent(){
//   for(var i = 0; i < this.wpObjs[this.nextWaypoint].ContentPoints.length; i++){
//     console.log(this.wpObjs[this.nextWaypoint].ContentPoints[i]);
//   }
// }
// createWaypoints();
// console.log("testing content display");
// displayContent(wpObjs[0]);
// fetchJourney("U001","First Award");
