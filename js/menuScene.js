// Created by: Niko
// Created on: may 2024
// This is the Menu Scene

// class for the menu scene
class MenuScene extends Phaser.Scene {

  //constructs keywords
  constructor() {
    super({key: "menuScene"})
    this.startButton = null
    this.instructionsButton = null
    this.menuSceneBackgroundImage = null
  }
  init(data) {
    // sets the background color
    this.cameras.main.setBackgroundColor('#ffffff')
  }
  preload() {
    // really just to check if stuff is working
    console.log("Menu Scene")
    // loads video and allows it to be used and customized for the scene (using create data)
    this.load.image('startButton', '././assets/startButton.png')
    this.load.image('instructionsButton', '././assets/instructionsButton.png')
    this.load.image('menuSceneBackground', '././assets/menuSceneBackgroundImage.png')
  }


  create(data) {
    // creates goose scene image sprite and sets where the axis that it will be placed on starts
    this.menuSceneBackgroundImage = this.add.sprite(0, 0, 'menuSceneBackground')
    // coordinates for image
    this.menuSceneBackgroundImage.x = 1920 / 2
    this.menuSceneBackgroundImage.y = 1080 / 2
    this.startButton = this.add.sprite(1920 / 2, (1300 / 2) + 100, 'startButton').setScale(0.2)
    // gives button the property of interactive and makes the cursor turn into a hand when hovering over the button
    this.startButton.setInteractive({ useHandCursor : true })
    //when the cursor is on and, pointer down meaning click essentially happens, it runs the code or function
    this.startButton.on('pointerdown', () => this.clickStartButton())
    
    this.instructionsButton = this.add.sprite(1920 / 2, (1500 / 2) + 100, 'instructionsButton').setScale(0.35)
    // gives button the property of interactive and makes the cursor turn into a hand when hovering over the button
    this.instructionsButton.setInteractive({ useHandCursor : true })
    //when the cursor is on and, pointer down meaning click essentially happens, it runs the code or function
    this.instructionsButton.on('pointerdown', () => this.clickInstructionsButton())
  }

  update(time, delta) {
  }

  // starts tutorialScene when clicked
  clickInstructionsButton () {
    this.scene.switch('tutorialScene')
  }
  clickStartButton () {
    this.scene.switch('gameScene')
  }
}

export default MenuScene