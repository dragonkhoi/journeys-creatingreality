Geo = function Geo( zones ) {


	this.geoOptions = {
		enableHighAccuracy: true,
		maximumAge: 30000,
		timeout: 27000,
	}

	navigator.geolocation.getCurrentPosition( geoSuccess, geoError, geoOptions )
	var watchID = navigator.geolocation.watchPosition( geoSuccess, geoError, geoOptions )

	function geoSuccess( position ) {
		position.coords.latitude
		position.coords.longitude
		for ( let zone of this.zones ) {
			if ( zone. )
		}
		for ( let waypointEl of waypointEls ) {
			waypointEl.setAttribute( "waypoint-marker", "userCoords", {
				x: position.coords.latitude,
				y: position.coords.longitude,
			} )
		}
	}

	function geoError( error ) {
		// error.code
		// alert( "Sorry, no position available. " + error.code )
	}
}

Geo.prototype.addEventListener = function () {

}
