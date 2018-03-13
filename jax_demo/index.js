//

"use strict"

const log = console.log

const qs = document.querySelector.bind( document )
const qsa = document.querySelectorAll.bind( document )

navigator.geolocation.getCurrentPosition( geoSuccess, geoError, geoOptions )

// qs(  )

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
