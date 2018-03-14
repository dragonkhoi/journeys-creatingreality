//

"use strict"

const log = console.log

const qs = document.querySelector.bind( document )
const qsa = document.querySelectorAll.bind( document )

// fetch
const waypointsInfo = [
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

const scene = qs( "a-scene" )

const waypointEls = []

for ( let waypointInfo of waypointsInfo ) {
	// waypointInfo.name
	const waypointEl = document.createElement( "a-entity" )
	waypointEl.setAttribute( "waypoint-marker", {
		"name": waypointInfo.name,
		"coords": { x: waypointInfo.coords.latitude, y: waypointInfo.coords.longitude, },
	} )
	waypointEls.push( waypointEl )
	scene.appendChild( waypointEl )
}

let userPosition

var geoOptions = {
	enableHighAccuracy: true,
	maximumAge: 30000,
	timeout: 27000,
}

navigator.geolocation.getCurrentPosition( geoSuccess, geoError, geoOptions )
var watchID = navigator.geolocation.watchPosition( geoSuccess, geoError, geoOptions )

function geoSuccess( position ) {
	for ( let waypointEl of waypointEls ) {
		console.log( waypointEl )
		waypointEl.setAttribute( "user-coords", {
			x: position.coords.latitude,
			y: position.coords.longitude,
		} )
	}
	// log( position.coords.latitude, position.coords.longitude )
}

function geoError( error ) {
	// error.code
	alert( "Sorry, no position available." )
}
