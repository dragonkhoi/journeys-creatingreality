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
	// {
	// 	name: "ballroom",
	// 	color: "black",
	// 	coords: {
	// 		latitude: 34.020097,
	// 		longitude: -118.286134,
	// 	},
	// },
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

const waypointEls = []

for ( let waypointInfo of waypointsInfo ) {
	// waypointInfo.name
	const waypointEl = document.createElement( "a-entity" )
	waypointEl.setAttribute( "waypoint-marker", {
		"name": waypointInfo.name,
		"color": waypointInfo.color,
		"coords": { x: waypointInfo.coords.latitude, y: waypointInfo.coords.longitude, },
	} )
	waypointEls.push( waypointEl )
	scene.appendChild( waypointEl )
}

var geoOptions = {
	enableHighAccuracy: true,
	maximumAge: 30000,
	timeout: 27000,
}

navigator.geolocation.getCurrentPosition( geoSuccess, geoError, geoOptions )
var watchID = navigator.geolocation.watchPosition( geoSuccess, geoError, geoOptions )

function geoSuccess( position ) {
	// alert( "geoSuccess " + position.coords.latitude + " " + position.coords.longitude )
	for ( let waypointEl of waypointEls ) {
		// console.log( waypointEl )
		waypointEl.setAttribute( "waypoint-marker", "userCoords", {
			x: position.coords.latitude,
			y: position.coords.longitude,
		} )
	}
	// log( position.coords.latitude, position.coords.longitude )
}

function geoError( error ) {
	// error.code
	// alert( "Sorry, no position available. " + error.code )
}



function handleOrientation(event) {
	var z = event.alpha // 0-360
	var x = event.beta;  // In degree in the range [-180,180]
	var y = event.gamma; // In degree in the range [-90,90]
	console.log( x, y, z )

	// Because we don't want to have the device upside down
	// We constrain the x value to the range [-90,90]
	if (x >  90) { x =  90};
	if (x < -90) { x = -90};

	// To make computation easier we shift the range of
	// x and y to [0,180]
	x += 90;
	y += 90;
	console.log( x, y, z )
}
window.addEventListener('deviceorientation', handleOrientation);
