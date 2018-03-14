//

"use strict"

const log = console.log

const qs = document.querySelector.bind( document )
const qsa = document.querySelectorAll.bind( document )

let waypointsInfo
// fetch
fetch( "journey.json" )
	.then( function ( response ) {
		console.log( "futchuing" )
		return response.json()
	} )
	.then( function ( myJson ) {
		waypointsInfo = myJson
		init()
	} )

function init() {
	const scene = qs( "a-scene" )
	const wrapper = qs( "#wrapper" )

	const waypointEls = []

	for ( let waypointInfo of waypointsInfo ) {
		// waypointInfo.name
		const waypointEl = document.createElement( "a-entity" )
		waypointEl.classList.add( "marker" )
		waypointEl.setAttribute( "waypoint-marker", {
			"name": waypointInfo.name,
			"color": waypointInfo.color,
			"coords": { x: waypointInfo.coords.latitude, y: waypointInfo.coords.longitude, },
		} )
		waypointEls.push( waypointEl )
		wrapper.appendChild( waypointEl )
	}

	// ff has oad, chrome has oda
	if ( "ondeviceorientationabsolute" ) {
		log( "absolute supported" )
		window.addEventListener( "deviceorientationabsolute", handleOrientation )
	}
	if ( "ondeviceorientation" in window ) {
		log( "regular supported" )
		// window.addEventListener( "deviceorientation", handleOrientation )
	}

	let initOrientation = false

	function handleOrientation(event) {

		var alphaZ = event.alpha // 0-360
		var betaX = event.beta  // -180 to 180
		var gammaY = event.gamma // -90 to 90
		if ( alphaZ === null ) {
			console.log( "fail" )
		}
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
}
