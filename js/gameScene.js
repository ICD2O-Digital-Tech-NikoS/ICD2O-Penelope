// Created by: Niko
// Created on: may 2024
// This is the Game Scene

// class for the game scene
class GameScene extends Phaser.Scene {
  
  // create a beard
  createBeard() {
    const beardVelocity = Math.floor(Math.random() * 101) + 100
    const beardXLocation = Math.floor(Math.random() * 1920) + 1
    const aBeard = this.physics.add.sprite(beardXLocation, 100, 'beard') 
    aBeard.body.velocity.y = beardVelocity
    this.beardGroup.add(aBeard)
    
  }
  //method that constructs keywords
  constructor() {
    super({key: "gameScene"})
    this.gameSceneBackground = null
    this.penelope = null
    this.beard = null
  }
  init(data) {
    // sets the background color
    this.cameras.main.setBackgroundColor('#ffffff')
  }
  // used to load assets
  preload() {
    // really just to check if stuff is working
    console.log("Game Scene")
    this.load.image('gameSceneBackground', '././assets/gameSceneBackground.jpg')
    this.load.image('penelope', '././assets/penelope.png')
    this.load.image('beard', '././assets/beard.png')
  }

  // used to create game objects and add specifications
  create(data) {
    this.gameScenebackground = this.add.image(0, 0, 'gameSceneBackground')
    this.gameScenebackground.x = 1920 / 2
    this.gameScenebackground.y = 1080 / 2
    this.penelope = this.physics.add.sprite(1920 / 2, 1080 - 100, 'penelope').setScale(0.3)
    // create a random number generator for velocity later 
    this.beardGroup = this.add.group()
    this.createAlien()
    
  }
  
  update(time, delta) {
    const keyLeftObj = this.input.keyboard.addKey('LEFT') 
    const keyRightObj = this.input.keyboard.addKey('RIGHT')

    if (keyLeftObj.isDown === true) {
      this.penelope.x = this.penelope.x - 2
      if (this.penelope.x < 0) {
        this.penelope.x = 0
      }
    }
    

    if (keyRightObj.isDown === true) {
      this.penelope.x = this.penelope.x + 2
      if (this.penelope.x > 1920) {
        this.penelope.x = 1920
      }
    }

    
  } 
}

export default GameScene