// Created by: Niko
// Created on: may 2024
// This is the Game Scene

// class for the game scene
class GameSceneTwo extends Phaser.Scene {
  // create a beard
  createAcidDrop() {
    const acidDropVelocity = Math.floor(Math.random() * 131) + 40
    const acidDropXLocation = Math.floor(Math.random() * 1920) + 1
    const acidDrop = this.physics.add.sprite(acidDropXLocation, -100, 'acidDrop') .setScale(0.13)
    acidDrop.body.velocity.y = acidDropVelocity
    this.beardGroup.add(acidDrop)

  }
  //method that constructs keywords
  constructor() {
    super({key: "gameSceneTwo"})
    this.gameSceneTwoBackground = null
    this.penelope = null
    this.acidDrop = null
    this.timer = 0
  }
  init(data) {
    // sets the background color
    this.cameras.main.setBackgroundColor('#ffffff')
  }
  // used to load assets
  preload() {
    // really just to check if stuff is working
    console.log("Game Scene Two")
    this.load.image('gameSceneTwoBackground', '././assets/gameSceneTwoBackground.jpg')
    this.load.spritesheet('penelope', '././assets/penelope.png', {
      frameWidth: 1000,
      frameHeight: 1000
    })
    this.load.image('acidDrop', '././assets/acidDrop.webp')
    this.load.image('ground', '././assets/ground.png')
  }

  // used to create game objects and add specifications
  create(data) {
    this.gameScenebackground = this.add.image(0, 0, 'gameSceneTwoBackground')
    this.gameScenebackground.x = 1920 / 2
    this.gameScenebackground.y = 1080 / 2
    this.penelope = this.physics.add.sprite(1920 / 2, 1080 - 180, 'penelope').setScale(0.3)
    //  220x104 original size, 110x52 new size, the 'true' argument means "center it on the gameobject"
    this.penelope.setSize(430, 720, true)
    // changes the position of the hitbox for the sprite 
    this.penelope.body.setOffset(625 / 2, 1080 - 680)

    this.anims.create({
      key: "penelope_anim",
      frames: this.anims.generateFrameNumbers("penelope", {start: 1, end: 5}),
      frameRate: 20,
      repeat: -1
    })

    this.anims.create({
      key: "penelope_anim_standing",
      frames: this.anims.generateFrameNumbers("penelope", 0)
    })





    //  The platforms group allows me to create platforms
    this.platforms = this.physics.add.staticGroup()
    //  Player physics properties and bounds so that player canno go off screen or out of bounds
    this.penelope.setCollideWorldBounds(true)
    //  Collide the player and platforms
    this.physics.add.collider(this.penelope, this.platforms);
    // creates ground
    this.ground = this.platforms.create(1920 / 2, 1680, 'ground').refreshBody()

    this.acidDropGroup = this.add.group()
    this.createAcidDrop()
    // collisions between beards and penelope
    this.physics.add.collider(this.acidDropGroup, this.penelope, function(acidDropCollide) {
      acidDropCollide.destroy()
      //this.sound.play('vineBoom')
    }.bind(this))

    this.physics.add.collider(this.acidDropGroup, this.ground, function(acidDropCollide) {
      acidDropCollide.destroy()
      //this.sound.play('vineBoom')
    }.bind(this))
  }

  update(time, delta) {
    const keyLeftObj = this.input.keyboard.addKey('LEFT') 
    const keyRightObj = this.input.keyboard.addKey('RIGHT')

    if (keyLeftObj.isDown === true) {
      this.penelope.x = this.penelope.x - 16
      this.penelope.playReverse('penelope_anim', true)
    } 

    if (keyRightObj.isDown === true) {
      this.penelope.x = this.penelope.x + 16
      this.penelope.play('penelope_anim', true)
    }
    if (keyRightObj.isUp === true && keyLeftObj.isUp === true) {
      this.penelope.play('penelope_anim', false)
      this.penelope.play('penelope_anim_standing', true)
    }
  } 
}

export default GameSceneTwo