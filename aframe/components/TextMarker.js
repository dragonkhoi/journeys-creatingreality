AFRAME.registerComponent('text-marker', {
  schema: {
    message: { type: 'string', default: 'I like this spot marker!' },
    width: { type: 'number', default: 1 },
    height: { type: 'number', default: 1 },
    textColor: { type: 'color', default: "#800080" },
    planeColor: { type: 'color', default: "#333"},
    position: { type: 'string', default: "0 0.5 -1"}
  },
  init: function(){
    console.log(this.data.message);
    this.el.setAttribute("text", "value: " + this.data.message + "; color: " + this.data.textColor + "; align: center");
    this.el.setAttribute("geometry", "primitive: plane; width: auto; height: auto");
    this.el.setAttribute("material", "color: " + this.data.planeColor);
    this.el.setAttribute("position", this.data.position);
    // set the
  }
});
