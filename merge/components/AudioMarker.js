AFRAME.registerComponent('audio-marker', {
    schema: {
      audioUri: { type: 'string', default: '../model/audio/SoundHelix-Song-9.mp3' },
      audioDescription: { type: 'string', default: 'I love this song!' },
    //   width: { type: 'number', default: 1 },
    //   height: { type: 'number', default: 1 },
    //   planeColor: { type: 'color', default: "#333"},
      position: { type: 'string', default: "0 0.005 -0.5"}
    },
    init: function(){
      this.el.setAttribute('sound', 'src:url(' + this.data.audioUri + ');');
      this.el.setAttribute("position", this.data.position);
      var entity = document.querySelector('[audio-marker]');
      entity.components.sound.playSound();
    }
  });
  