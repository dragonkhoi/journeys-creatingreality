AFRAME.registerComponent('text-marker', {
  schema: {
    message: { type: 'string', default: 'I like this spot!' },
    width: { type: 'number', default: 1 },
    height: { type: 'number', default: 1 },
    color: { type: 'color', default: "#000" }
  },
  init: function(){
    console.log(this.data.message);
    this.el.setAttribute("text", "value: " + this.data.message);
    // set the
  }
});
