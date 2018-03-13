//

"use strict"

const log = console.log

const qs = document.querySelector.bind( document )
const qsa = document.querySelectorAll.bind( document )

navigator.geolocation.getCurrentPosition( geoSuccess, geoError, geoOptions )

// qs(  )

function haversineDistance( pos1, pos2 ) {
	var earthRadius = 6371e3 // meters
	var lat1 = pos1.coords.latitude.toRadians()
	var lat2 = pos2.coords.latitude.toRadians()
	var dLat = ( pos2.coords.latitude - pos1.coords.latitude ).toRadians()
	var dLon = ( pos2.coords.longitude - pos1.coords.longitude ).toRadians()
	var a =
		Math.sin( dLat / 2 ) * Math.sin( dLat / 2 ) +
		Math.cos( lat1 ) * Math.cos( lat2 ) *
		Math.sin( dLon / 2 ) * Math.sin( dLon / 2 )
	var c = 2 * Math.atan2( Math.sqrt( a ), Math.sqrt( 1-a ) )
	var distance = earthRadius * c
	return distance
}

var geoOptions = {
	enableHighAccuracy: true,
	maximumAge: 30000,
	timeout: 27000,
}

var watchID = navigator.geolocation.watchPosition( geoSuccess, geoError, geoOptions )

function geoSuccess( position ) {
	log( position.coords.latitude, position.coords.longitude )
}

// expects a PositionError object as its first parameter.
// error.code
function geoError( error ) {
	alert( "Sorry, no position available." )
}
