AFRAME.registerComponent('text-marker', {
  schema: {
    message: { type: 'string', default: 'I like this spot!' },
    width: { type: 'number', default: auto },
    height: { type: 'number', default: auto },
    textColor: { type: 'color', default: "#FFF" },
    planeColor: { type: 'color', default: "#333"},
    position: { type: 'string', default: "0 0 0"}
  },
  init: function(){
    console.log(this.data.message);
    this.el.setAttribute("text", "value: " + this.data.message + "; color: " + this.data.textColor);
    this.el.setAttribute("geometry", "primitive: plane; width: " + this.data.width + "; height: " + this.data.height);
    this.el.setAttribute("material", "color: " + this.data.planeColor);
    this.el.setAttribute("position", this.data.position);
    // set the
  }
});
