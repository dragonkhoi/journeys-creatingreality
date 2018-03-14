AFRAME.registerComponent('text-marker', {
  schema: {
    message: { type: 'string', default: 'I like this spot marker!' },
    width: { type: 'number', default: 40 },
    height: { type: 'number', default: 10 },
    textColor: { type: 'color', default: "#FFF" },
    planeColor: { type: 'color', default: "#333"},
    position: { type: 'string', default: "0 0 0"}
  },
  init: function(){
    console.log(this.data.textColor);
    this.el.setAttribute("text", "value: " + this.data.message + "; color: " + this.data.textColor + "; align: center");
    // this.el.setAttribute("geometry", "primitive: plane; width:" + this.data.width + "; height:" + this.data.height);
    this.el.setAttribute("geometry", "primitive: plane; width:" + this.data.width + "height: auto");
    this.el.setAttribute("material", "color: " + this.data.planeColor);
    this.el.setAttribute("position", this.data.position);
    // set the
  }
});
