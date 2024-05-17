// Created by: Niko
// Created on: may 2024
// This is the Title Scene

// class that contains information for a scene
class TitleScene extends Phaser.Scene {

  constructor() {
    super({key: "titleScene"})
    this.skipSceneText = null 
    this.skipSceneTextStyle = { font: '35px Arial', fill: '#000000', align: 'center'}
    this.titleSceneAnimation = null
  }
  init(data) {
    // sets the background color
    this.cameras.main.setBackgroundColor('#ffffff')
  }
  preload() {
    console.log("Title Scene")
    // loads video and allows it to be used and customized for the scene (using create data)
    this.load.video('titleSceneAnimation', '././assets/titleSceneAnimation.mp4')
  }

  // creates data 
  create(data) {
    // adds video and sets coordinates, volume, and axis positions
    this.titleSceneAnimation = this.add.video(0, 0, 'titleSceneAnimation', {volume : 2})
    this.titleSceneAnimation.setInteractive({ useHandCursor : true })
    this.titleSceneAnimation.on('pointerdown', () => this.clickButton())
    this.titleSceneAnimation.x = 1920 / 2
    this.titleSceneAnimation.y = 1080 / 2
    this.titleSceneAnimation.play()
    this.skipSceneText = this.add.text(1920 - 1850, 1080 - 200, 'Click to Skip', this.skipSceneTextStyle).setAlpha(0.5)
  }
  
  // says that if time becomes greater than the given time, then the scene will switch to the menu scene
  update(time, delta) {
    if (time > 24000) {
      this.scene.switch('menuScene')
    } 
  }
  clickButton () {
    this.sound.stopAll()
    this.scene.switch('menuScene')
    this.titleSceneAnimation.stop()
  }
}

export default TitleScene