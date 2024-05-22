// Created by: Niko
// Created on: may 2024
// This is the Tutorial Scene

// class for the game scene
class YouloseScene extends Phaser.Scene {

  //method that constructs keywords
  constructor() {
    super({key: "youloseScene"})
    this.youLoseBackgroundImage = null
  }
  init(data) {
    // sets the background color
    this.cameras.main.setBackgroundColor('#ffffff')
  }
  // used to load assets
  preload() {
    // really just to check if stuff is working
    console.log("You Lose Scene")
    this.load.image('youLoseSceneBackground', '././assets/youLoseSceneImage.png')
  }

  // used to create game objects and add specifications
  create(data) {
    this.youLoseBackgroundImage = this.add.sprite(0, 0, 'youLoseSceneBackground').setScale(1.5)
    this.youLoseBackgroundImage.x = 1920 / 2
    this.youLoseBackgroundImage.y = 1080 / 2 - 100
 // gives button the property of interactive and makes the cursor turn into a hand when hovering over the button
    this.youLoseBackgroundImage.setInteractive({ useHandCursor : true })
    //when the cursor is on and, pointer down meaning click essentially happens, it runs the code or function
    this.youLoseBackgroundImage.on('pointerdown', () => this.clickButton())
  }

  update(time, delta) {

  } 
  clickButton () {
    this.scene.start('menuScene') 
  }
}

export default YouloseScene