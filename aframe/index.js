// main handler
var CREATING = false;

var JOURNEY;

var START = false;

// wait for START == true
// check if CREATING or going on a JOURNEY
if(!CREATING) {

}

fetchJourney("U001", "First Award");

setTimeout(function(){
  JOURNEY.createWaypoints();
  console.log(JOURNEY.wpObjs[0].lat, JOURNEY.wpObjs[0].lng);
  JOURNEY.displayMarkers();
}, 6000);

// setTimeout(function(){
//   JOURNEY.goToNextWaypoint();
//   console.log("next!");
//   JOURNEY.displayMarkers();
// }, 12000);

// returns journey session created from JSON
function fetchJourney(userID,JTitle) {

    var jsonURL = "journeys.json";

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
                      var journeySesh = new JourneySession(userJourneys[JTitle]);
                      JOURNEY = journeySesh;
                      return journeySesh;
                    }
                }
            }
            else {
                console.log("user not found");
            }
        }
        else {
          console.log(this.status);
        }
    };
    xhttp.open("GET",jsonURL, true);
    xhttp.send();
}
