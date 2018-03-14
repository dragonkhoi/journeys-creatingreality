AFRAME.registerComponent('img-marker', {
  schema: {
    imgUri: { type: 'string', default: 'https://www.merriam-webster.com/assets/mw/images/article/art-wap-article-main/puppy-3143-7cfb4d6a42dfc7d9d1ae7e23126279e8@1x.jpg' },
    imgDescription: { type: 'string', default: 'I like this spot!' },
    width: { type: 'number', default: 1 },
    height: { type: 'number', default: 1 },
    planeColor: { type: 'color', default: "#333"},
    position: { type: 'string', default: "0 0 0"}
  },
  init: function(){
    console.log(this.data.message);
    this.el.setAttribute("text", "value: " + this.data.message + "; color: " + this.data.textColor + "; align: center");
    this.el.setAttribute("geometry", "primitive: plane; width: auto; height: auto");
    this.el.setAttribute("material", "color: " + this.data.planeColor);
    this.el.setAttribute("position", this.data.position);
    this.el.setAttribute("look-at", "[camera]");
    // set the
  }
});
