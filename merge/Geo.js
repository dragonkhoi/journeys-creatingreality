Math.radians = degrees => ( degrees * ( Math.PI * 2 ) ) / 360
Math.degrees = radians => ( radians * 360 ) / ( Math.PI * 2 )

Geo = function Geo( zones ) {
	this.geoOptions = {
		enableHighAccuracy: true,
		maximumAge: 30000,
		timeout: 27000,
	}
	this.zones = zones

	this.radius = 20

	this.onEnter = function onEnter( zone ) {
		console.log( `entered zone ${zone.name}` )
		console.log( "default enter callback" )
	}.bind( this )

	this.onLeave = function onLeave( zone ) {
		console.log( `left zone ${zone.name}` )
		console.log( "default leave callback" )
	}.bind( this )

	this.geoSuccess = function geoSuccess( position ) {
		for ( let zone of this.zones ) {
			// console.log( position.coords, zone.coords )
			const distance = this.getDistance( position.coords, zone.coords )
			console.log( distance )
			if ( !zone.entered && distance < this.radius ) {
				this.onEnter( zone )
				zone.entered = true
			} else if ( zone.entered && distance >= this.radius ) {
				this.onLeave( zone )
				zone.entered = false
			}
		}
	}.bind( this )

	this.geoError = function geoError( error ) {
		// console.log( "geo error " + error.code )
	}.bind( this )

	this.getBearing = function getBearing( coords1, coords2 ) {
		const lat1 = Math.radians( coords1.latitude )
		const lon1 = Math.radians( coords1.longitude )
		const lat2 = Math.radians( coords2.latitude )
		const lon2 = Math.radians( coords2.longitude )
		const y = Math.sin( lon2 - lon1 ) * Math.cos( lat2 )
		const x =
			Math.cos( lat1 ) * Math.sin( lat2 ) -
			Math.sin( lat1 ) * Math.cos( lat2 ) * Math.cos( lon2 - lon1 )
		const bearing = Math.degrees( Math.atan2( y, x ) )
		return ( bearing + 360 ) % 360 // degrees, -180 to 180, normalize with modulo
	}

	// Math.radians = function(degrees) {
	//   return degrees * Math.PI / 180;
	// };
	//
	// // Converts from radians to degrees.
	// Math.degrees = function(radians) {
	//   return radians * 180 / Math.PI;
	// }

	// log( Math.degrees( Math.PI ) )
	// log( Math.radians( 180 ) )

	this.getDistance = function getDistance( coords1, coords2 ) {
		// haversine
		var earthRadius = 6371e3 // meters
		var lat1 = Math.radians( coords1.latitude )
		var lat2 = Math.radians( coords2.latitude )
		var dLat = Math.radians( ( coords2.latitude - coords1.latitude ) )
		var dLon = Math.radians( ( coords2.longitude - coords1.longitude ) )
		var a =
			Math.sin( dLat / 2 ) * Math.sin( dLat / 2 ) +
			Math.cos( lat1 ) * Math.cos( lat2 ) *
			Math.sin( dLon / 2 ) * Math.sin( dLon / 2 )
		var c = 2 * Math.atan2( Math.sqrt( a ), Math.sqrt( 1-a ) )
		var distance = earthRadius * c
		// console.log( "getDistance", lat1, lat2, dLat, dLon )
		return distance // meters
	}

	// navigator.geolocation.getCurrentPosition( geoSuccess, geoError, geoOptions )
	this.watchID = navigator.geolocation.watchPosition( this.geoSuccess, this.geoError, this.geoOptions )
}
