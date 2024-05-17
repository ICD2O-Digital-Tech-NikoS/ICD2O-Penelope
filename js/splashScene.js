// Created by: Niko
// Created on: may 2024
// This is the Splash Scene

// class that contains information for a scene
class SplashScene extends Phaser.Scene {
  
  //method that constructs keywords
  constructor() {
    super({key: "splashScene"})
    this.splashSceneBackgroundImage = null
    this.music = null
  }
  // sets things up before the scene loads
  init(data) {
    // sets the background color
    this.cameras.main.setBackgroundColor('#ffffff')
  }
  preload() {
    console.log("Splash Scene")
    // loads video and allows it to be used and customized for the scene (using create data)
    this.load.image('splashSceneBackground', '././assets/splashSceneImage.png')
    this.load.audio('introAudio', '././assets/introAudio.mp3')
  }


  create(data) {
    // creates goose scene image sprite and sets where the axis that it will be placed on starts, and scales image
    this.splashSceneBackgroundImage = this.add.sprite(0, 0, 'splashSceneBackground').setScale(2)
    this.splashSceneBackgroundImage.x = 1920 / 2
    this.splashSceneBackgroundImage.y = 1080 / 2
    this.music = this.sound.add('introAudio')
    this.music.play()
  }
  // utilizes time for if statement to create a change after a certain amount of time passes
  update(time, delta) {
    if (time > 8000) {
      this.scene.switch('gooseScene')
    }  
    if (time > 25000) {
      this.music.stop()
    }  
  } 
}

export default SplashScene