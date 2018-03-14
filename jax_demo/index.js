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
const waypointsInfo = [
	{
		name: "ballroom",
		color: "black",
		coords: {
			latitude: 34.020097,
			longitude: -118.286134,
		},
	},
	{
		name: "testination",
		color: "yellow",
		coords: {
			latitude: 34.020186,
			longitude: -118.285841,
		},
	},
	{
		name: "north",
		color: "red",
		coords: {
			latitude: 34.025437,
			longitude: -118.286507,
		},
	},
	{
		name: "east",
		color: "green",
		coords: {
			latitude: 34.019999,
			longitude: -118.280922,
		},
	},
	{
		name: "south",
		color: "white",
		coords: {
			latitude: 34.014308,
			longitude: -118.286079,
		},
	},
	{
		name: "west",
		color: "blue",
		coords: {
			latitude: 34.020638,
			longitude: -118.292826,
		},
	},
	// {
	// 	name: "fander's pork 🌳",
	// 	color: "red",
	// 	coords: {
	// 		latitude: 34.021492,
	// 		longitude: -118.284852,
	// 	},
	// },
	// {
	// 	name: "ol' starbsy",
	// 	color: "brown",
	// 	coords: {
	// 		latitude: 34.018558,
	// 		longitude: -118.281852,
	// 	},
	// },
	// {
	// 	name: "cooliseum 😎",
	// 	color: "black",
	// 	coords: {
	// 		latitude: 34.014036,
	// 		longitude: -118.287854,
	// 	},
	// },
]

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

if ('ondeviceorientationabsolute' in window) {
  // Chrome 50+ specific
  window.addEventListener('deviceorientationabsolute', handleOrientation);
} else if ('ondeviceorientation' in window) {
  window.addEventListener('deviceorientation', handleOrientation);
}

function handleOrientation(event) {
  var alpha;
  if (event.absolute) {

    alpha = event.alpha;
		qs( "#orientation-init" ).textContent = `absolute worked ok ${event.compassHeading}`
  } else if (event.hasOwnProperty('webkitCompassHeading')) {
    // get absolute orientation for Safari/iOS
    alpha = 360 - event.webkitCompassHeading; // conversion taken from a comment on Google Documentation, not tested
		qs( "#orientation-init" ).textContent = `webkitCompass ${alpha}`
  } else {
    console.log('Could not retrieve absolute orientation');
  }
  console.log('Absolute orientation: ' + alpha);
}

// let initOrientation = false
//
// window.addEventListener( "deviceorientation", handleOrientation )
//
// // if ( "ondeviceorientationabsolute" in window ) {
// // 	window.addEventListener( "deviceorientationabsolute", handleOrientation )
// // } else if ( "onabsolutedeviceorientation" in window ) {
// // 	window.addEventListener( "absolutedeviceorientation", handleOrientation )
// // } else if ( "ondeviceorientation" in window ) {
// // 	// window.addEventListener( "deviceorientation", handleOrientation )
// // 	alert( "no absolute orientation" )
// // }
//
// // ff has oad, chrome has oda
//
// // console.log( 'ontouchstart' in window )
// // if (window.DeviceOrientationEvent && 'ontouchstart' in window) {
// // 	setTimeout( function () {
// // 		window.addEventListener( "deviceorientation", handleOrientation )
// // 	}, 3000 )
// //
// // } else {
// // 	alert( "no compass" )
// // }
//
// function handleOrientation(event) {
// 	console.log( "handul", event )
// 	var alphaZ = event.alpha // 0-360
// 	var betaX = event.beta  // -180 to 180
// 	var gammaY = event.gamma // -90 to 90
// 	qs( "#orientation-init" ).textContent = alphaZ === null ? "null dawg" : "???"
// 	qs( "#orientation-absolute" ).textContent = event.absolute ? "absolute" : "relative"
// 	qs( "#orientation-webkit-compass-heading" ).textContent = "compass: " + event.webkitCompassHeading
//
// 	if ( alphaZ !== null && betaX !== null && gammaY !== null ) {
// 		if ( !initOrientation ) {
// 			initOrientation = true
// 			wrapper.setAttribute( "rotation", "y", -alphaZ )
// 			// qs( "#orientation-init" ).textContent = alphaZ.toFixed( 0 )
//
// 		}
// 		qs( "#orientation-alpha-z" ).textContent = `alphaZ: ${alphaZ.toFixed( 0 )}`
// 		qs( "#orientation-beta-x" ).textContent = `betaX: ${betaX.toFixed( 0 )}`
// 		qs( "#orientation-gamma-y" ).textContent = `gammaY: ${gammaY.toFixed( 0 )}`
//
// 		// Because we don't want to have the device upside down
// 		// We constrain the x value to the range [-90,90]
// 		// if (x >  90) { x =  90};
// 		// if (x < -90) { x = -90};
//
// 		// To make computation easier we shift the range of
// 		// x and y to [0,180]
// 		// x += 90;
// 		// y += 90;
// 	}
// }
