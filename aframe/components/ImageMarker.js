AFRAME.registerComponent('img-marker', {
  schema: {
    imgUri: { type: 'string', default: 'https://www.merriam-webster.com/assets/mw/images/article/art-wap-article-main/puppy-3143-7cfb4d6a42dfc7d9d1ae7e23126279e8@1x.jpg' },
    imgDescription: { type: 'string', default: 'I like this spot!' },
    width: { type: 'number', default: 1 },
    height: { type: 'number', default: 1 },
    position: { type: 'string', default: "0 0 0"}
  },
  init: function(){
    this.el.setAttribute("src", this.data.imgUri);
    this.el.setAttribute("height", this.data.height);
    this.el.setAttribute("width", this.data.width);
  }
});
