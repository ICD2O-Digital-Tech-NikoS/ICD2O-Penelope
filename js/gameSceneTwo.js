// Created by: Niko
// Created on: may 2024
// This is the Game Scene

// class for the game scene
class GameSceneTwo extends Phaser.Scene {
  // create a beard
  createAcidDrop() {
    const acidDropVelocity = Math.floor(Math.random() * 121) + 80
    const acidDropXLocation = Math.floor(Math.random() * 1920) + 1
    const acidDrop = this.physics.add.sprite(acidDropXLocation, -100, 'acidDrop').setAlpha(0.3).setScale(0.13)
    acidDrop.body.velocity.y = acidDropVelocity
    this.acidDropGroup.add(acidDrop)

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
    this.load.spritesheet('penelope2', '././assets/penelopeSceneTwo.png', {
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
    this.penelope = this.physics.add.sprite(1920 / 2, 1080 - 300, 'penelope2').setScale(0.1)
    this.penelope.setBounce(0.2);
    //  220x104 original size, 110x52 new size, the 'true' argument means "center it on the gameobject"
    this.penelope.setSize(215, 360, true)
    // changes the position of the hitbox for the sprite 
    this.penelope.body.setOffset(625 / 2, 1080 - 680)
    this.penelope.body.setGravityY(300)

    this.anims.create({
      key: "penelope_anim",
      frames: this.anims.generateFrameNumbers("penelope2", {start: 1, end: 5}),
      frameRate: 20,
      repeat: -1
    })

    this.anims.create({
      key: "penelope_anim_standing",
      frames: this.anims.generateFrameNumbers("penelope2", 0)
    })





    //  The platforms group allows me to create platforms
    this.platforms = this.physics.add.staticGroup()
    //  Player physics properties and bounds so that player canno go off screen or out of bounds
    this.penelope.setCollideWorldBounds(true)
    //  Collide the player and platforms
    this.physics.add.collider(this.penelope, this.platforms);
    // creates ground
    this.ground1 = this.platforms.create(1920 / 2, 1520, 'ground').setScale(0.2).setAlpha(0).refreshBody()
    this.ground2 = this.platforms.create(1920 / 2, 1520, 'ground').setScale(0.2).setAlpha(0).refreshBody()
    this.ground3 = this.platforms.create(1920 / 2, 1520, 'ground').setScale(0.2).setAlpha(0).refreshBody()

    this.acidDropGroup = this.add.group()
    this.createAcidDrop()
    this.createAcidDrop()
    // collisions between beards and penelope
    this.physics.add.collider(this.acidDropGroup, this.penelope, function(acidDropCollide) {
      acidDropCollide.destroy()
      //this.sound.play('vineBoom')
    }.bind(this))

    this.physics.add.collider(this.acidDropGroup, this.ground1, this.ground2, this.ground3, function(acidDropCollide) {
      acidDropCollide.destroy()
      //this.sound.play('vineBoom')
       this.createAcidDrop()
       this.createAcidDrop()
    }.bind(this))
  }

  update(time, delta) {
    const keyLeftObj = this.input.keyboard.addKey('LEFT') 
    const keyRightObj = this.input.keyboard.addKey('RIGHT')
    const keyUpObj = this.input.keyboard.addKey('UP')

    if (keyLeftObj.isDown === true) {
      this.penelope.x = this.penelope.x - 9
      this.penelope.playReverse('penelope_anim', true)
    } 

    if (keyRightObj.isDown === true) {
      this.penelope.x = this.penelope.x + 9
      this.penelope.play('penelope_anim', true)
    }
    if (keyRightObj.isUp === true && keyLeftObj.isUp === true) {
      this.penelope.play('penelope_anim', false)
      this.penelope.play('penelope_anim_standing', true)
    }

    if (keyUpObj.isDown && this.penelope.body.touching.down)
    {
        this.penelope.setVelocityY(-380);
    }
  } 
}

export default GameSceneTwo