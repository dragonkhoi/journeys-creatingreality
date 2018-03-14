
<div class="overlay">
	<span id="orientation-absolute"></span><br/>
	<span id="orientation-init"></span><br/>
	<span id="orientation-alpha-z"></span><br/>
	<span id="orientation-beta-x"></span><br/>
	<span id="orientation-gamma-y"></span><br/>
</div>

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
