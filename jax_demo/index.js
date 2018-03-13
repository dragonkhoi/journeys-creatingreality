//

"use strict"

const log = console.log

const qs = document.querySelector.bind( document )
const qsa = document.querySelectorAll.bind( document )

navigator.geolocation.getCurrentPosition( geoSuccess, geoError, geoOptions )

// 34.021492 -118.284852 founder's park
// 34.0202528 -118.2862383 our coords maybe

const waypoints = [
	{
		coords: {
			latitude: 34.021492,
			longitude: -118.284852,
		},
	},
	{
		name: "fander's pork 🌳",
		coords: {
			latitude: 34.021492,
			longitude: -118.284852,
		},
	},
	{
		name: "ol' starbsy",
		coords: {
			latitude: 34.018558,
			longitude: -118.281852,
		},
	},
	{
		name: "cooliseum 😎",
		coords: {
			latitude: 34.014036,
			longitude: -118.287854,
		},
	},
]

function getBearing( coords1, coords2 ) {
	const lat1 = Math.radians( coords1.latitude )
	const lon1 = Math.radians( coords1.longitude )
	const lat2 = Math.radians( coords2.latitude )
	const lon2 = Math.radians( coords2.longitude )
	const y = Math.sin( lon2 - lon1 ) * Math.cos( lat2 )
	const x =
		Math.cos( lat1 ) * Math.sin( lat2 ) -
		Math.sin( lat1 ) * Math.cos( lat2 ) * Math.cos( lon2 - lon1 )
	const bearing = Math.degrees( Math.atan2( y, x ) )
	bearing = ( bearing + 360 ) % 360
	return bearing // degrees, -180 to 180, normalize with modulo
}

// Math.radians = function(degrees) {
//   return degrees * Math.PI / 180;
// };
//
// // Converts from radians to degrees.
// Math.degrees = function(radians) {
//   return radians * 180 / Math.PI;
// };

Math.radians = degrees => ( degrees * ( Math.PI * 2 ) ) / 360
Math.degrees = radians => ( radians * 360 ) / ( Math.PI * 2 )

// log( Math.degrees( Math.PI ) )
// log( Math.radians( 180 ) )

function getDistance( coords1, coords2 ) {
	// haversine
	var earthRadius = 6371e3 // meters
	var lat1 = Math.radians( coords1.latitude )
	var lat2 = Math.radians( coords2.latitude )
	var dLat = Math.radians( ( coords2.latitude - coords1.latitude ) )
	var dLon = Math.radians( ( coords2.longitude - coords1.longitude ) )
	var a =
		Math.sin( dLat / 2 ) * Math.sin( dLat / 2 ) +
		Math.cos( lat1 ) * Math.cos( lat2 ) *
		Math.sin( dLon / 2 ) * Math.sin( dLon / 2 )
	var c = 2 * Math.atan2( Math.sqrt( a ), Math.sqrt( 1-a ) )
	var distance = earthRadius * c
	return distance // meters
}

var geoOptions = {
	enableHighAccuracy: true,
	maximumAge: 30000,
	timeout: 27000,
}

const waypoint = qs( "#waypoint" )

let userPosition

function updateWaypoint() {
	const bearing = getBearing( userPosition.coords, waypointCoords )
	const distance = getDistance( userPosition.coords, waypointCoords )

	const x = distance * Math.sin( bearing )
	const y = 0.5
	const z = distance * Math.cos( bearing )

	waypoint.setAttribute( "position", `${x} ${y} ${z}` )
}

var watchID = navigator.geolocation.watchPosition( geoSuccess, geoError, geoOptions )

function geoSuccess( position ) {
	userPosition = position
	updateWaypoint()
	log( position.coords.latitude, position.coords.longitude )
}

function geoError( error ) {
	// error.code
	alert( "Sorry, no position available." )
}
