// main handler
var JOURNEY;
fetchJourney("U001", "First Award");

setTimeout(function(){
  JOURNEY.createWaypoints();
  console.log(JOURNEY.wpObjs[0].lat, JOURNEY.wpObjs[0].lng);
}, 1000);

// returns journey session created from JSON
function fetchJourney(userID,JTitle) {

    var jsonURL = "../model/json/journeys.json";

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
      console.log(this.readyState);
        if (this.readyState == 4 && this.status == 200) {

            // Read JSON ddata
            jsonObj = JSON.parse(xhttp.responseText);
            console.log(jsonObj);
            // Check if user exists in JSON file
            if (userID in jsonObj.Users) {
              console.log("userid is in users");
                // Check if user has any journeys
                userJourneys = jsonObj.Users[userID].Journeys;

                if (Object.keys(userJourneys).length != 0) {

                    //Check if selected journey exists in the user's journey
                    if (JTitle in userJourneys) {
                      console.log("journey found");
                      // Instantiate objects
                      var journeySesh = new JourneySession(userJourneys[JTitle]);
                      console.log(journeySesh);
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
