AFRAME.registerComponent('audio-marker', {
    schema: {
      audioUri: { type: 'string', default: '../model/audio/SoundHelix-Song-9.mp3' },
      audioDescription: { type: 'string', default: 'I love this song!' },
      audioIcon: { type: 'string', default: 'http://www.eenewsanalog.com/sites/default/files/styles/inner_article/public/sites/default/files/images/audioicon700.jpg?itok=vePxeMyn' },
      width: { type: 'number', default: 1 },
      height: { type: 'number', default: 1 },
      planeColor: { type: 'color', default: "#333"},
      position: { type: 'string', default: "0 0.005 -0.5"}
    },
    init: function(){
        console.log("AUDIO");
      console.log(this.data);
      console.log(this.data.audioUri);
      this.el.setAttribute('sound', 'src:url(' + this.data.audioUri + '); autoplay:true');
    //   this.el.setAttribute("src", this.data.audioUri);
    //   this.el.setAttribute("autoplay", true);      
    //   this.el.setAttribute("text", "value: " + this.data.message + "; color: " + this.data.textColor + "; align: center");
    //   this.el.setAttribute("geometry", "primitive: plane; width: auto; height: auto");
    //   this.el.setAttribute("material", "color: " + this.data.planeColor);
      this.el.setAttribute("position", this.data.position);
      // set the
      console.log(this);
    }
  });
  