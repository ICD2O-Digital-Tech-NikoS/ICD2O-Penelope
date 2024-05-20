// Created by: Niko
// Created on: may 2024
// This is the Tutorial Scene

// class for the game scene
class TransitionSceneOne extends Phaser.Scene {

  //method that constructs keywords
  constructor() {
    super({key: "transitionSceneOne"})
    this.transitionSceneOneVideo = null
  }
    
  init(data) {
    // sets the background color
    this.cameras.main.setBackgroundColor('#ffffff')
  }
  // used to load assets
  preload() {
    // really just to check if stuff is working
    console.log("transitionSceneOne")
    this.load.video('transitionSceneOneVideo', 'assets/transitionSceneOneVideo.mp4')
  }
  // used to create game objects and add specifications
  create(data) {
    this.transitionSceneOneVideo = this.add.video(1920 / 2, 1080 / 2, 'transitionSceneOneVideo')
    this.transitionSceneOneVideo.play()

    // on complete video
    this.transitionSceneOneVideo.on("complete", () => {
      this.scene.switch("gameSceneTwo")
    }, this)
  }

  update(time, delta) {
  } 
}

export default TransitionSceneOne