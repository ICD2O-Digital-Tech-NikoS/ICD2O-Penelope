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
  }

  // used to create game objects and add specifications
  create(data) {
    this.gameScenebackground = this.add.image(0, 0, 'gameSceneBackground')
    this.gameScenebackground.x = 1920 / 2
    this.gameScenebackground.y = 1080 / 2
    this.penelope = this.physics.add.sprite(1920 / 2, 1080 - 180, 'penelope').setScale(0.3)
    this.scoreText = this.add.text(10, 10, 'Score: ' + this.score.toString(), this.scoreTextStyle) 
    this.beardGroup = this.add.group()
    //  The platforms group contains the ground
    this.platforms = this.physics.add.staticGroup();
    //  Here we create the ground.
    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    //  Player physics properties.
    this.penelope.setCollideWorldBounds(true);
    //  Collide the player and the stars with the platforms
    this.physics.add.collider(this.player, this.platforms);



    
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
  }
  
  update(time, delta) {
    const keyLeftObj = this.input.keyboard.addKey('LEFT') 
    const keyRightObj = this.input.keyboard.addKey('RIGHT')

    if (keyLeftObj.isDown === true) {
      this.penelope.x = this.penelope.x - 10
      if (this.penelope.x < 0) {
        this.penelope.x = 10
      }
    }
    

    if (keyRightObj.isDown === true) {
      this.penelope.x = this.penelope.x + 10
      if (this.penelope.x > 1920) {
        this.penelope.x = 1910
      }
    }
    if (this.beardGroup.y < 1080) {
      this.beardGroup.destroy()
      this.createBeard()
    }
  } 
}

export default GameScene