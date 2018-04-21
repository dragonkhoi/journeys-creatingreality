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
		// this.el.setAttribute( "text", "value: " + this.data.message + "; color: " + this.data.textColor + "; align: center" )
		this.el.setAttribute( "geometry", "primitive: cylinder; radius: 1; height: 200;" )
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
			// console.log( this.data.userCoords, this.data.coords )

			const bearing = Geo.getBearing( { latitude: this.data.userCoords.x, longitude: this.data.userCoords.y }, { latitude: this.data.coords.x, longitude: this.data.coords.y } )
			// console.log( this.data.name, bearing )
			let distance = Geo.getDistance( { latitude: this.data.userCoords.x, longitude: this.data.userCoords.y }, { latitude: this.data.coords.x, longitude: this.data.coords.y } )
			// const distance = 10
			// distance = distance ^ 0.1
			if ( distance > 100 ) {
				distance = 100
			}
			// console.log( "???", bearing, distance )
			const x = distance * Math.sin( Math.radians( bearing ) )
			const y = 100
			const z = distance * Math.cos( Math.radians( bearing ) )
			this.el.object3D.position.x = x
			this.el.object3D.position.y = y
			this.el.object3D.position.z = -z
			// position.set(1, 2, 3);
			// waypoint.setAttribute( "position", `${x} ${y} ${z}` )
		}
	},
} )
