// Created by: Niko
// Created on: may 2024
// This is the Goose Scene

// class for the goose scene
class GooseScene extends Phaser.Scene {
  
  //method that constructs keywords
  constructor() {
    super({key: "gooseScene"})
    // creates variable for goose scene image
    this.gooseSceneBackgroundImage = null
    // variable for goose audio
    this.gooseAudio = null
    this.skipSceneText = null
    this.skipSceneTextStyle = { font: '35px Arial', fill: '#000000', align: 'center'}
  }
  init(data) {
    // sets the background color
    this.cameras.main.setBackgroundColor('#1144ff')
  }
  preload() {
    // really just to check if stuff is working
    console.log("Goose Scene")
    // loads image for goose scene
    this.load.image('gooseSceneBackground', '././assets/gooseSceneImage.png')
    // loads audio for goose scene
    this.load.audio('gooseAudio', '././assets/gooseAudio.mp3')
  }


  create(data) {
    // creates goose scene image sprite and sets where the axis that it will be placed on starts, and scales image
    this.gooseSceneBackgroundImage = this.add.sprite(0, 0, 'gooseSceneBackground').setScale(0.6)
    this.gooseSceneBackgroundImage.setInteractive({ useHandCursor : true })
    this.gooseSceneBackgroundImage.on('pointerdown', () => this.clickButton())
    // coordinates for image
    this.gooseSceneBackgroundImage.x = 1920 / 2
    this.gooseSceneBackgroundImage.y = 1080 / 2
    this.music = this.sound.add('gooseAudio')
    this.music.play()
    this.skipSceneText = this.add.text(1920 - 1850, 1080 - 200, 'Click to Skip', this.skipSceneTextStyle).setAlpha(0.5)
  }
  // utilizes time for if statement to create a change after a certain amount of time passes
  update(time, delta) {
    
    if (time > 16000) {
      this.scene.switch('titleScene')
    }  
  } 
  clickButton () {
    this.sound.stopAll()
    this.scene.switch('menuScene')
    this.music.stop()
  }
}

export default GooseScene