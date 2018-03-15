//

"use strict"

const log = console.log

const qs = document.querySelector.bind( document )
const qsa = document.querySelectorAll.bind( document )

let journey

fetch( "journey.json" )
	.then( function ( response ) {
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
	anchor.id = "anchor"
	scene.appendChild( anchor )
	geo = new Geo( journey.waypoints )

	geo.onEnter = function onEnter( waypoint ) {
		console.log( `entered ${waypoint.name}` )
		waypoint.waypointEl.setAttribute( "visible", false )
		loadWaypoint( waypoint )
	}

	geo.onLeave = function onLeave( waypoint ) {
		console.log( `left ${waypoint.name}` )
		waypoint.waypointEl.setAttribute( "visible", true )
		cleanup()
	}

	const waypointEls = []

	for ( let waypointInfo of journey.waypoints ) {
		// waypointInfo.name
		const waypointEl = document.createElement( "a-entity" )
		waypointInfo.waypointEl = waypointEl
		waypointEl.classList.add( "marker" )
		waypointEl.setAttribute( "waypoint-marker", {
			"name": waypointInfo.name,
			"color": waypointInfo.color,
			"coords": { x: waypointInfo.coords.latitude, y: waypointInfo.coords.longitude, },
		} )
		waypointEls.push( waypointEl )
		wrapper.appendChild( waypointEl )
	}
	geo.onUpdate = function onUpdate( position ) {
		console.log( position.coords )
		for ( let waypointEl of waypointEls ) {
			waypointEl.setAttribute( "waypoint-marker", "userCoords", { x: position.coords.latitude, y: position.coords.longitude } )
		}
	}
}

function loadWaypoint( waypoint ) {
	// make a waypoint anchor
	for ( let content of waypoint.contents ) {
		let tmp
		switch ( content.type ) {
			case "text":
				tmp = document.createElement( "a-entity" )
				tmp.setAttribute( "text-marker", `message: ${content.body}; distance: ${content.distance}; heading: ${content.heading}` )
				console.log( "making some text" )
				// append to anchor
				break
			case "image":
				tmp = document.createElement( "a-entity" )
				tmp.setAttribute( "image-marker", `imgUri: ${content.url}; imgDescription: ${content.description}; distance: ${content.distance}; heading: ${content.heading};` )
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

	console.log( "cleaning up ", anchor.childNodes )
	// anchor.removeChild( anchor.childNodes[0] )
	// anchor.removeChild( anchor.childNodes[0] )
	while ( anchor.firstChild ) {
		anchor.removeChild( anchor.firstChild )
	}
	// for ( let node of anchor.childNodes ) {
	// 	console.log( "removing ", node )
	// 	node.remove()

		// node.parentNode.removeChild( node )
		// anchor.removeChild( node )
	// }
}
