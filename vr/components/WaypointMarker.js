AFRAME.registerComponent( "waypoint-marker", {
	schema: {
		name: { type: "string", default: "unnamed marker" },
		message: { type: "string", default: "I like this spot!" },
		width: { type: "number", default: 1 },
		height: { type: "number", default: 1 },
		depth: { type: "number", default: 1 },
		color: { type: "color", default: "#FFF" },
		textColor: { type: "color", default: "#FFF" },
		planeColor: { type: "color", default: "#333" },
		position: { type: "string", default: "0 0 0" },
		userCoords: { type: "vec2", default: "0 0" },
		coords: { type: "vec2", default: "0 0" },
	},
	init: function () {
		Math.radians = degrees => ( degrees * ( Math.PI * 2 ) ) / 360
		Math.degrees = radians => ( radians * 360 ) / ( Math.PI * 2 )

		this.getBearing = function getBearing( coords1, coords2 ) {
			const lat1 = Math.radians( coords1.x ) // lat
			const lon1 = Math.radians( coords1.y ) // lon
			const lat2 = Math.radians( coords2.x ) // lat
			const lon2 = Math.radians( coords2.y ) // lon
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
			var lat1 = Math.radians( coords1.x ) // lat
			var lat2 = Math.radians( coords2.x ) // lat
			var dLat = Math.radians( ( coords2.x - coords1.x ) ) // lat - lat
			var dLon = Math.radians( ( coords2.y - coords1.y ) ) // lon - lon
			var a =
				Math.sin( dLat / 2 ) * Math.sin( dLat / 2 ) +
				Math.cos( lat1 ) * Math.cos( lat2 ) *
				Math.sin( dLon / 2 ) * Math.sin( dLon / 2 )
			var c = 2 * Math.atan2( Math.sqrt( a ), Math.sqrt( 1-a ) )
			var distance = earthRadius * c
			// console.log( "getDistance", lat1, lat2, dLat, dLon )
			return distance // meters
		}

		// this.el.setAttribute( "text", "value: " + this.data.message + "; color: " + this.data.textColor + "; align: center" )
		this.el.setAttribute( "geometry", "primitive: box; width: 10; height: 100; depth: 10;" )
		this.el.setAttribute( "material", "color", this.data.color )
		// this.el.setAttribute( "position", this.data.position )
	},
	tick: function () {
		// update height, etc
	},
	update: function () {
		// this.el.setAttribute( "waypoint-marker", "userCoords", { x: 1, y: 1, } )
		// this.data.coords?
		// this.el.set
		// const userCoords = this.el.getAttribute( "userCoords" )
		// const coords = this.el.getAttribute( "coords" )
		// console.log( "in update", this.data.userCoords, this.data.coords )
		const userCoords = this.data.userCoords
		const coords = this.data.coords
		if ( userCoords !== null ) {

			const bearing = this.getBearing( userCoords, coords )
			console.log( this.data.name, bearing )
			const distance = this.getDistance( userCoords, coords )
			const x = distance * Math.sin( Math.radians( bearing ) )
			const y = 0.5
			const z = distance * Math.cos( Math.radians( bearing ) )
			this.el.object3D.position.x = x
			this.el.object3D.position.y = y
			this.el.object3D.position.z = -z
			// // position.set(1, 2, 3);
			// // waypoint.setAttribute( "position", `${x} ${y} ${z}` )
		}

	},

} )
