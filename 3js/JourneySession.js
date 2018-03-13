function JourneySession(journeyObject) {
  this.journeyObject = journeyObject;
  this.waypoints = journeyObject.Waypoints;
  this.wpObjs = [];
  this.nextWaypoint = 0;
  this.goToNextWaypoint = goToNextWaypoint;
  this.createWaypoints = createWaypoints;
  this.displayMarkers = displayMarkers;
}

// model: function to create ContentPoint from given JSON content

// view: function to create AR Component from ContentPoint

// model: function to create Waypoint from given JSON waypoint

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
      var newCP = new ContentPoint(curCP.type, curCP.reference, curCP.orientation);
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


function fetchJourney(userID,JTitle) {

    var jsonURL = "../model/json/journeys.json";
    
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            // Read JSON ddata
            jsonObj = JSON.parse(xhttp.responseText);

            // Check if user exists in JSON file
            if (userID in jsonObj.Users) { 

                // Check if user has any journeys
                userJourneys = jsonObj.Users[userID].Journeys;
                
                if (Object.keys(userJourneys).length != 0) {

                    //Check if selected journey exists in the user's journey
                    if (JTitle in userJourneys) {

                      // Instantiate objects
                      JourneySession(userJourneys[JTitle]);
                    }
                }
            }
            else {
                console.log("user not found");
            }
        }
    };
    xhttp.open("GET",jsonURL, true);
    xhttp.send();
}

// fetchJourney("U001","First Award");
