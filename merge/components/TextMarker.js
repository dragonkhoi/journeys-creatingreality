AFRAME.registerComponent('text-marker', {
  schema: {
    message: { type: 'string', default: 'I like this spot marker!' },
    width: { type: 'number', default: 40 },
    height: { type: 'number', default: 10 },
    textColor: { type: 'color', default: "#FFF" },
    planeColor: { type: 'color', default: "#333" },
    position: { type: 'string', default: "0 0 0" },
    distance: { type: 'number', default: 5 },
    heading: { type: 'number', default: 0 },
    plateColor: { type: 'color', default: "#FFF0F5" },
    postColor: { type: 'color', default: "#f8f8f8" },
  },
  init: function(){
    // this.el.setAttribute("text", "value: " + this.data.message + "; color: " + this.data.textColor + "; align: center")
    // this.el.setAttribute("geometry", "primitive: plane; width:" + this.data.width + "; height:" + this.data.height);
    // this.el.setAttribute("geometry", "primitive: plane; width:" + this.data.width + "height: auto")
    // this.el.setAttribute("material", "color: #f8f8f8;" )
    this.el.setAttribute("look-at", "[camera]")

    const signPlate = document.createElement( "a-entity" )
    signPlate.setAttribute("geometry", "primitive: plane; width: auto; height: 0.2")
    signPlate.setAttribute("material", `color: ${this.data.plateColor}`)
    signPlate.setAttribute("scale", "6.0 6.0 0.0")
    signPlate.setAttribute("text", "value:" + this.data.message + "; anchor: center; zOffset: 100; color: #000000; width: 1; shader: msdf; font:https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/roboto/Roboto-Medium.json;")

    const signPost = document.createElement( "a-entity" )
    signPost.setAttribute("geometry", "primitive: plane; width: 0.05; height: 1.0")
    signPost.setAttribute("material", "color: #1e1e1e")
    signPost.setAttribute("position", "0 -0.5 -100")

    signPlate.appendChild( signPost )

    this.el.appendChild( signPlate )
  },
  update: function(){
    this.el.object3D.position.set( 0, 0, -this.data.distance )
    this.el.object3D.position.applyAxisAngle( new THREE.Vector3( 0, 1, 0 ), Math.radians( this.data.heading ) )
    // console.log( this.el.object3D.position )
  },
});
