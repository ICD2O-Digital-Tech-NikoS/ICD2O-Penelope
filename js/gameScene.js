// Created by: Niko
// Created on: may 2024
// This is the Game Scene

// class for the game scene
class GameScene extends Phaser.Scene {
  
  //method that constructs keywords
  constructor() {
    super({key: "gameScene"})
    this.background = null
    this.penelope = null
  }
  init(data) {
    // sets the background color
    this.cameras.main.setBackgroundColor('#1111ff')
  }
  // used to load assets
  preload() {
    // really just to check if stuff is working
    console.log("Game Scene")
    this.load.image('gameLevelOneBackground', './assets/gameLevelOneBackgroundImage.jpg')
    this.load.image('penelope', './assets/penelope.png')
  }

  // used to create game objects and add specifications
  create(data) {
    this.background = this.add.image(0, 0, 'gameLevelOneBackground')
    this.background.setOrigin(0, 0)
    this.penelope = this.physics.add.sprite(1920 / 2, 1080 - 100, 'penelope')
    // create a random number generator for velocity later 
    this.beardGroup = this.physics.add.group()
    
  }
  
  update(time, delta) {
    const keyLeftObj = this.input.keyboard.addKey('LEFT') 
    const keyRightObj = this.input.keyboard.addKey('RIGHT')

    if (keyLeftObj.isDown === true) {
      this.penelope.x = this.penelope.x - 1
      if (this.penelope.x < 0) {
        this.penelope.x = 0
      }
    }
    

    if (keyRightObj.isDown === true) {
      this.penelope.x = this.penelope.x + 1
      if (this.penelope.x > 1920) {
        this.penelope.x = 1920
      }
    }

    
  } 
}

export default GameScene