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
  },
  init: function(){
    this.el.setAttribute("text", "value: " + this.data.message + "; color: " + this.data.textColor + "; align: center");
    // this.el.setAttribute("geometry", "primitive: plane; width:" + this.data.width + "; height:" + this.data.height);
    this.el.setAttribute("geometry", "primitive: plane; width:" + this.data.width + "height: auto");
    this.el.setAttribute("material", "color: " + this.data.planeColor);
    this.el.setAttribute("look-at", "a-camera")
  },
  update: function(){
    this.el.object3D.position.set( 0, 0, -this.data.distance )
    this.el.object3D.position.applyAxisAngle( new THREE.Vector3( 0, 1, 0 ), Math.radians( this.data.heading ) )
    // console.log( this.el.object3D.position )
  },
});
