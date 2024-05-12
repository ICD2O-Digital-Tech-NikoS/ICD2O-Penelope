// Created by: Niko
// Created on: may 2024
// This is the Game Scene

// class for the game scene
class GameScene extends Phaser.Scene {
  // create a beard
  createBeard() {
    const beardVelocity = Math.floor(Math.random() * 131) + 40
    const beardXLocation = Math.floor(Math.random() * 1920) + 1
    const aBeard = this.physics.add.sprite(beardXLocation, -100, 'beard') .setScale(0.13)
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
    this.load.spritesheet('penelope', '././assets/penelopeSceneOne.png', {
      frameWidth: 1010,
      frameHeight: 1000
    })
    this.load.image('beard', '././assets/beard.png')
    this.load.image('ground', '././assets/ground.png')
    this.load.image('gameOver', '././assets/gameOver.png')
  }

  // used to create game objects and add specifications
  create(data) {
    this.gameScenebackground = this.add.image(0, 0, 'gameSceneBackground')
    this.gameScenebackground.x = 1920 / 2
    this.gameScenebackground.y = 1080 / 2
    this.penelope = this.physics.add.sprite(1920 / 2, 1080 - 180, 'penelope').setScale(0.3)
    //  220x104 original size, 110x52 new size, the 'true' argument means "center it on the gameobject"
    this.penelope.setSize(430, 700, true)
    // changes the position of the hitbox for the sprite 
    this.penelope.body.setOffset(810 / 2, 1080 - 680)

    this.anims.create({
      key: "penelope_anim1",
      frames: this.anims.generateFrameNumbers("penelope", {start: 1, end: 5}),
      frameRate: 20,
      repeat: -1
    })

    this.anims.create({
      key: "penelope_anim2",
      frames: this.anims.generateFrameNumbers("penelope", {start: 8, end: 12}),
      frameRate: 20,
      repeat: -1
    })

    this.anims.create({
      key: "penelope_anim3",
      frames: this.anims.generateFrameNumbers("penelope", {start: 15, end: 19}),
      frameRate: 20,
      repeat: -1
    })

    this.anims.create({
      key: "penelope_anim_standing1",
      frames: this.anims.generateFrameNumbers("penelope", 0)
    })
    this.anims.create({
      key: "penelope_anim_standing2",
      frames: this.anims.generateFrameNumbers("penelope", {start: 7, end: 7})
    })
    this.anims.create({
      key: "penelope_anim_standing3",
      frames: this.anims.generateFrameNumbers("penelope", {start: 14, end: 14})
    })




    
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
      this.score = this.score + 2
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
      this.penelope.x = this.penelope.x - 16
      if (this.score >= 4) {
        this.penelope.playReverse('penelope_anim3', true)
      }
      else if (this.score == 2) {
        this.penelope.playReverse('penelope_anim2', true)
      } 
      else {
        this.penelope.playReverse('penelope_anim1', true)
      }
    }

    if (keyRightObj.isDown === true) {
      this.penelope.x = this.penelope.x + 16
      if (this.score >= 4) {
        this.penelope.play('penelope_anim3', true)
      }
      else if (this.score == 2) {
        this.penelope.play('penelope_anim2', true)
      } 
      else {
        this.penelope.play('penelope_anim1', true)
      }
    }
    if (keyRightObj.isUp === true && keyLeftObj.isUp === true) {
      this.penelope.play('penelope_anim3', false)
      this.penelope.play('penelope_anim2', false)
      this.penelope.play('penelope_anim1', false)
    }
    if (this.score >= 4 && (keyRightObj.isUp === true && keyLeftObj.isUp === true)) {
      this.penelope.play('penelope_anim_standing3', true)
    }
    else if (this.score == 2 && (keyRightObj.isUp === true && keyLeftObj.isUp === true)) {
      this.penelope.play('penelope_anim_standing2', true)
    } 
    else if (this.score < 2 && (keyRightObj.isUp === true && keyLeftObj.isUp === true)) {
      this.penelope.play('penelope_anim_standing1', true)
    }
    // if they get three strikes they are out
    if (this.strikes > 2) {
      this.scene.switch('gameOverScene')
    }
    // if they get a score of 100 and they have not been out yet, they win
    if (this.score > 100) {
      this.scene.start(gameSceneTwo)
    }
  } 
}

export default GameScene