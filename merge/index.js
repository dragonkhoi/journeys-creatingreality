//

"use strict"

const log = console.log

const qs = document.querySelector.bind( document )
const qsa = document.querySelectorAll.bind( document )

let journey

fetch( "journey.json" )
	.then( function ( response ) {
		console.log( "futchuing" )
		return response.json()
	} )
	.then( function ( myJson ) {
		journey = myJson
		init()
	} )

let scene, wrapper, anchor, geo

function init() {
	scene = qs( "a-scene" )
	wrapper = qs( "#wrapper" )
	anchor = document.createElement( "a-entity" )
	scene.appendChild( anchor )
	geo = new Geo( journey.waypoints )

	geo.onEnter = function onEnter( waypoint ) {
		console.log( `entered ${waypoint.name}` )
		loadWaypoint( waypoint )
	}

	geo.onLeave = function onLeave( waypoint ) {
		console.log( `left ${waypoint.name}` )
		cleanup()
	}

	const waypointEls = []

	// journey.name;



	// for ( let waypointInfo of waypointsInfo ) {
	// 	// waypointInfo.name
	// 	const waypointEl = document.createElement( "a-entity" )
	// 	waypointEl.classList.add( "marker" )
	// 	waypointEl.setAttribute( "waypoint-marker", {
	// 		"name": waypointInfo.name,
	// 		"color": waypointInfo.color,
	// 		"coords": { x: waypointInfo.coords.latitude, y: waypointInfo.coords.longitude, },
	// 	} )
	// 	waypointEls.push( waypointEl )
	// 	wrapper.appendChild( waypointEl )
	// }
}

function loadWaypoint( waypoint ) {
	// make a waypoint anchor
	for ( let content of waypoint.contents ) {
		let tmp
		switch ( content.type ) {
			case "text":
				tmp = document.createElement( "a-entity" )
				tmp.setAttribute( "text-marker", `message: ${content.body}; heading: ${content.heading}` )
				console.log( "making some text" )
				// append to anchor
				break
			case "image":
				tmp = document.createElement( "a-entity" )
				tmp.setAttribute( "image-marker", `imgUri: ${content.url}; imgDescription: ${content.description}` )
				console.log( "making some image" )
				// append to anchor
				break
			default:
				break
		}
		anchor.appendChild( tmp )
	}
}

function cleanup() {
	console.log( "cleaning up" )
	for ( let node of anchor.childNodes ) {
		anchor.removeChild( node )
	}
}
