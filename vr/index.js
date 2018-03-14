//

"use strict"

const log = console.log

const qs = document.querySelector.bind( document )
const qsa = document.querySelectorAll.bind( document )

// if ("geolocation" in navigator) {
// 	alert("geo")
// } else {
// 	alert("nogeo")
//   /* geolocation IS NOT available */
// }

// fetch

fetch( "journey.json" )
	.then( function ( response ) {
		return response.json()
	} )
	.then( function ( myJson ) {
		console.log( myJson )
	} )

const scene = qs( "a-scene" )
const wrapper = qs( "#wrapper" )

const waypointEls = []

console.log( wrapper )
for ( let waypointInfo of waypointsInfo ) {
	// waypointInfo.name
	const waypointEl = document.createElement( "a-entity" )
	waypointEl.setAttribute( "waypoint-marker", {
		"name": waypointInfo.name,
		"color": waypointInfo.color,
		"coords": { x: waypointInfo.coords.latitude, y: waypointInfo.coords.longitude, },
	} )
	waypointEls.push( waypointEl )

	wrapper.appendChild( waypointEl )
}

var geoOptions = {
	enableHighAccuracy: true,
	maximumAge: 30000,
	timeout: 27000,
}

navigator.geolocation.getCurrentPosition( geoSuccess, geoError, geoOptions )
var watchID = navigator.geolocation.watchPosition( geoSuccess, geoError, geoOptions )

function geoSuccess( position ) {
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

// ff has oad, chrome has oda
if ( "ondeviceorientationabsolute" ) {
	window.addEventListener( "deviceorientationabsolute", handleOrientation )
}
if ( "ondeviceorientation" in window ) {
	window.addEventListener( "deviceorientation", handleOrientation )
}

let initOrientation = false

function handleOrientation(event) {
	// console.log( "handul", event )
	var alphaZ = event.alpha // 0-360
	var betaX = event.beta  // -180 to 180
	var gammaY = event.gamma // -90 to 90
	qs( "#orientation-absolute" ).textContent = event.absolute ? "absolute" : "relative"

	if ( alphaZ !== null && betaX !== null && gammaY !== null ) {
		if ( !initOrientation ) {
			initOrientation = true
			wrapper.setAttribute( "rotation", "y", -alphaZ )
			qs( "#orientation-init" ).textContent = alphaZ.toFixed( 0 )
		}
		qs( "#orientation-alpha-z" ).textContent = `alphaZ: ${alphaZ.toFixed( 0 )}`
		qs( "#orientation-beta-x" ).textContent = `betaX: ${betaX.toFixed( 0 )}`
		qs( "#orientation-gamma-y" ).textContent = `gammaY: ${gammaY.toFixed( 0 )}`
	}
}
