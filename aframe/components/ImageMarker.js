AFRAME.registerComponent('img-marker', {
  schema: {
    imgUri: { type: 'string', default: 'https://www.merriam-webster.com/assets/mw/images/article/art-wap-article-main/puppy-3143-7cfb4d6a42dfc7d9d1ae7e23126279e8@1x.jpg' },
    imgDescription: { type: 'string', default: 'Image' },
    width: { type: 'number', default: 2.5 },
    height: { type: 'number', default: 2.5 },
    position: { type: 'string', default: "0 0 0"}
  },
  init: function(){
    this.el.setAttribute("position", this.data.position);
    this.el.setAttribute("geometry", "width: 2.5; height: 2.5");
    this.el.setAttribute("material", "src:" + this.data.imgUri);
  }
});
