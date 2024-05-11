// Created by: Niko
// Created on: may 2024
// This is the Game Scene

// class for the game scene
class GameScene extends Phaser.Scene {
  // create a beard
  createBeard() {
    const beardVelocity = Math.floor(Math.random() * 151) + 100
    const beardXLocation = Math.floor(Math.random() * 1920) + 1
    const aBeard = this.physics.add.sprite(beardXLocation, -100, 'beard') .setScale(0.2)
    aBeard.body.velocity.y = beardVelocity
    this.beardGroup.add(aBeard)
    
  }
  //method that constructs keywords
  constructor() {
    super({key: "gameScene"})
    this.gameSceneBackground = null
    this.penelope = null
    this.beard = null
    this.score = 0
    this.scoreText = null
    this.scoreTextStyle = { font: '65px Arial', fill: '#ffffff', align: 'center'}
    this.strikes = 0
    this.strikeText = null
    this.strikeTextStyle = { font: '65px Arial', fill: '#ffffff', align: 'center'}
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
    this.load.image('ground', '././assets/ground.png')
    this.load.image('gameOver', '././assets/gameOver.png')
  }

  // used to create game objects and add specifications
  create(data) {
    this.gameScenebackground = this.add.image(0, 0, 'gameSceneBackground')
    this.gameScenebackground.x = 1920 / 2
    this.gameScenebackground.y = 1080 / 2
    this.penelope = this.physics.add.sprite(1920 / 2, 1080 - 130, 'penelope').setScale(0.3)
    //  220x104 original size, 110x52 new size, the 'true' argument means "center it on the gameobject"
    this.penelope.setSize(110, 52, true)
    this.scoreText = this.add.text(10, 10, 'Score: ' + this.score.toString(), this.scoreTextStyle)
    this.strikeText = this.add.text(10, 70, 'Strikes: ' + this.strikes.toString(), this.strikeTextStyle)
    //  The platforms group allows me to create platforms
    this.platforms = this.physics.add.staticGroup()
    //  Player physics properties and bounds so that player canno go off screen or out of bounds
    this.penelope.setCollideWorldBounds(true)
    //  Collide the player and platforms
    this.physics.add.collider(this.penelope, this.platforms);
    // creates ground
    this.ground = this.platforms.create(1920 / 2, 1680, 'ground').refreshBody()

    this.beardGroup = this.add.group()
    this.createBeard()
    // collisions between beards and penelope
    this.physics.add.collider(this.beardGroup, this.penelope, function(beardCollide) {
      beardCollide.destroy()
      //this.sound.play('vineBoom')
      this.score = this.score + 1
      this.scoreText.setText('Score: ' + this.score.toString())
      this.createBeard()
      this.createBeard()
    }.bind(this))
    
    this.physics.add.collider(this.beardGroup, this.ground, function(beardCollide) {
      beardCollide.destroy()
      //this.sound.play('vineBoom')
      this.strikes = this.strikes + 1
      this.strikeText.setText('Strikes: ' + this.strikes.toString())
      this.createBeard()
    }.bind(this))
  }
  
  update(time, delta) {
    const keyLeftObj = this.input.keyboard.addKey('LEFT') 
    const keyRightObj = this.input.keyboard.addKey('RIGHT')

    if (keyLeftObj.isDown === true) {
      this.penelope.x = this.penelope.x - 13
    }
    

    if (keyRightObj.isDown === true) {
      this.penelope.x = this.penelope.x + 13
    }

    if (this.strikes > 3) {
      this.scene.switch('gameOverScene')
    }
    if (this.score > 100 && this.strikes < 3) {
      this.scene.switch(transitionSceneOne)
    }
  } 
}

export default GameScene