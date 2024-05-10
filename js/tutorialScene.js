// Created by: Niko
// Created on: may 2024
// This is the Tutorial Scene

// class for the game scene
class TutorialScene extends Phaser.Scene {

  //method that constructs keywords
  constructor() {
    super({key: "tutorialScene"})
    this.tutorialBackgroundImage = null
  }
  init(data) {
    // sets the background color
    this.cameras.main.setBackgroundColor('#1111ff')
  }
  // used to load assets
  preload() {
    // really just to check if stuff is working
    console.log("Tutorial Scene")
    this.load.image('tutorialSceneBackground', './assets/tutorialSceneImage.png')
  }

  // used to create game objects and add specifications
  create(data) {
    this.tutorialBackgroundImage = this.add.sprite(0, 0, 'tutorialSceneBackground')
    this.tutorialBackgroundImage.x = 1920 / 2
    this.tutorialBackgroundImage.y = 1080 / 2
 // gives button the property of interactive and makes the cursor turn into a hand when hovering over the button
    this.tutorialBackgroundImage.setInteractive({ useHandCursor : true })
    //when the cursor is on and, pointer down meaning click essentially happens, it runs the code or function
    this.tutorialBackgroundImage.on('pointerdown', () => this.clickButton())
  }

  update(time, delta) {
  } 
}

export default TutorialScene