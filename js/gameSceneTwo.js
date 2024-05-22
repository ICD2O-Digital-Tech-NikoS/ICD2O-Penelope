// Created by: Niko
// Created on: may 2024
// This is the Game Scene two


// class for the game scene two
class GameSceneTwo extends Phaser.Scene {
  // create an acid drop
  createAcidDrop() {
    const acidDropVelocity = Math.floor(Math.random() * 141) + 80
    const acidDropXLocation = Math.floor(Math.random() * 1920) + 1
    const acidDrop = this.physics.add.sprite(acidDropXLocation, -100, 'acidDrop').setAlpha(0.3).setScale(0.13)
    acidDrop.setSize(25, 25)
    acidDrop.body.velocity.y = acidDropVelocity
    this.acidDropGroup.add(acidDrop)
  }
  
  //method that constructs keywords
  constructor() {
    super({key: "gameSceneTwo"})
    this.gameSceneBackground = null
    this.acidPuddle = null
    this.penelope = null
    this.acidDrop = null
    this.theBeard = null
    this.backgroundMusic = null
    this.boing = null
    this.boinging = false
    this.runAudio = null
    this.running = false
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
    this.load.image('ground1', '././assets/ground1.png')
    this.load.image('ground2', '././assets/ground2.png')
    this.load.image('ground3', '././assets/ground3.png')
    this.load.image('ground4', '././assets/ground4.png')
    this.load.image('beard2', '././assets/beard2.png')
    this.load.audio('backgroundMusic2', '././assets/marioBackgroundMusic.mp3')
    this.load.audio('boing', '././assets/boing.mp3')
    this.load.audio('runAudio', '././assets/runAudio.mp3')
  }

  // used to create game objects and add specifications
  create(data) {
    this.backgroundMusic = this.sound.add('backgroundMusic2')
    this.backgroundMusic.play()
    this.gameScenebackground = this.add.image(0, 0, 'gameSceneTwoBackground')
    this.gameScenebackground.x = 1920 / 2
    this.gameScenebackground.y = 1080 / 2
    this.theBeard = this.physics.add.sprite(1920 / 2, 1080 - 800, 'beard2').setScale(0.75)
    this.theBeard.setSize(200, 200)
    this.penelope = this.physics.add.sprite(1920 / 2, 1080 - 300, 'penelope2').setScale(0.1)
    // gives penelope a slight bounce, you can see when loads in
    this.boing = this.sound.add('boing', {volume: 3})
    this.runAudio = this.sound.add('runAudio', {volume: 3})
    this.runAudio.loop = true
    //  220x104 original size, 110x52 new size, the 'true' argument means "center it on the gameobject"
    this.penelope.setSize(300, 400, true)
    // changes the position of the hitbox for the sprite 
    this.penelope.body.setOffset(380, 570)
    // sets gravity
    this.penelope.body.setGravityY(1000)

    // since penelope is not collecting anything, the animation would remain the same, this animation is for penelope walking
    this.anims.create({
      key: "penelope_anim",
      frames: this.anims.generateFrameNumbers("penelope2", {start: 1, end: 5}),
      frameRate: 20,
      repeat: -1
    })

    // frame for  standing
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
    // creates platforms
    this.ground1 = this.platforms.create(1920 - 1480, 1080 - 70, 'ground1').setScale(1).setAlpha(0.1).refreshBody()
    this.ground1.setSize(300, 10, true) 

    // creates more platforms
    this.ground2 = this.platforms.create(1920 - 920, 1080 - 70, 'ground2').setScale(1).setAlpha(0.1).refreshBody()
    this.ground2.setSize(270, 10, true) 

    // creates even more platforms
    this.ground3 = this.platforms.create(1920 - 300, 1080 - 70, 'ground3').setScale(1).setAlpha(0.1).refreshBody()
    this.ground3.setSize(350, 10, true) 

    this.airPlatformOne = this.platforms.create(1920 - 570, 1080 - 310, 'ground4').setScale(1).setAlpha(1).refreshBody()
    this.airPlatformOne.setSize(200, 10, true)

    this.airPlatformTwo = this.platforms.create(1920 - 1200, 1080 - 310, 'ground4').setScale(1).setAlpha(1).refreshBody()
    this.airPlatformTwo.setSize(200, 10, true)

    this.airPlatformThree = this.platforms.create(1920 - 1800, 1080 - 310, 'ground4').setScale(1).setAlpha(1).refreshBody()
    this.airPlatformThree.setSize(200, 10, true)

    this.airPlatformFour = this.platforms.create(1920 - 1450, 1080 - 510, 'ground4').setScale(1).setAlpha(1).refreshBody()
    this.airPlatformFour.setSize(150, 10, true)

    this.airPlatformFive = this.platforms.create(1920 - 450, 1080 - 510, 'ground4').setScale(1).setAlpha(1).refreshBody()
    this.airPlatformFive.setSize(150, 10, true)
    
    this.airPlatformSix = this.platforms.create(1920 - 350, 1080 - 710, 'ground4').setScale(1).setAlpha(1).refreshBody()
    this.airPlatformSix.setSize(150, 10, true)
    // creates acid puddle on the ground
    this.acidPuddle = this.physics.add.sprite(0, 0, 'ground3').setScale(1).refreshBody().setAlpha(0)
    this.acidPuddle.x = 1920 / 2
    this.acidPuddle.y = 1080 - 450
    this.acidPuddle.setSize(1920, 10, true) 
    this.acidPuddle.body.setOffset(0, 950)
    this.acidPuddle.setImmovable(true)
    
    // creates acid drops
    this.acidDropGroup = this.add.group()
    this.createAcidDrop()
    this.createAcidDrop()
    this.createAcidDrop()
    this.createAcidDrop()
    this.createAcidDrop()
    this.createAcidDrop()
    this.createAcidDrop()
    this.createAcidDrop()
    this.createAcidDrop()
    this.createAcidDrop()
    this.createAcidDrop()
    this.createAcidDrop()
    this.createAcidDrop()
    this.createAcidDrop()
    this.createAcidDrop()
    this.createAcidDrop()
    this.createAcidDrop()
    this.createAcidDrop()
    this.createAcidDrop()
    this.createAcidDrop()
    this.createAcidDrop()
    this.createAcidDrop()
    this.createAcidDrop()
    this.createAcidDrop()
    this.createAcidDrop()
    this.createAcidDrop()
    this.createAcidDrop()
    this.createAcidDrop()
    this.createAcidDrop()
    this.createAcidDrop()
    this.createAcidDrop()
    
    // collisions between acid drops and penelope
    this.physics.add.collider(this.acidDropGroup, this.penelope, function (acidDropCollide) {
      acidDropCollide.destroy()
      this.physics.pause()
      this.scene.start('youloseScene')
      this.sound.stopAll()
    }.bind(this))


    // collision between acid drops and platforms
    this.physics.add.collider(this.acidDropGroup, this.ground1, function(acidDropCollide) {
      acidDropCollide.destroy();
      // Additional logic as needed
      this.createAcidDrop()
    }.bind(this))
    
    // collision between acid drops and platforms
    this.physics.add.collider(this.acidDropGroup, this.ground2, function(acidDropCollide) {
      acidDropCollide.destroy()
      
      this.createAcidDrop()
    }.bind(this))

    // collision between acid drops and platforms
    this.physics.add.collider(this.acidDropGroup, this.ground3, function(acidDropCollide) {
      acidDropCollide.destroy()
    
      this.createAcidDrop()
    }.bind(this))

    // collisions between acid puddle and penelope
    this.physics.add.collider(this.penelope, this.acidPuddle, function() {
      this.physics.pause()
      this.scene.start('youloseScene')
      this.sound.stopAll()
    }.bind(this))

    // collision between acid drops and acid puddle
    this.physics.add.collider(this.acidDropGroup, this.acidPuddle, function(acidDropCollide) {
      acidDropCollide.destroy();
      
      this.createAcidDrop()
    }.bind(this))

    this.physics.add.collider(this.theBeard, this.penelope, function(beardCollide) {
      beardCollide.destroy()
      this.sound.stopAll()
      this.scene.start('gameSceneThree')
    }.bind(this))
  }

  

  update(time, delta) {
    
    // user key inputs
    const keyLeftObj = this.input.keyboard.addKey('LEFT') 
    const keyRightObj = this.input.keyboard.addKey('RIGHT')
    const keyUpObj = this.input.keyboard.addKey('UP')

    if ((keyLeftObj.isDown === true || keyRightObj.isDown === true) && this.running === false) {
      this.runAudio.play()
      this.running = true
    }

    if (keyLeftObj.isUp === true && keyRightObj.isUp === true) {
      this.runAudio.stop();
      this.running = false;
    }

    // walking left plays the walking right animation in reverse
    if (keyLeftObj.isDown === true) {
      this.penelope.x = this.penelope.x - 6
      this.penelope.playReverse('penelope_anim', true)
    } 
    // walking right plays the walking right animation
    if (keyRightObj.isDown === true) {
      this.penelope.x = this.penelope.x + 6
      this.penelope.play('penelope_anim', true)
    }
    // plays standing frame
    if (keyRightObj.isUp === true && keyLeftObj.isUp === true) {
      this.penelope.play('penelope_anim', false)
      this.penelope.play('penelope_anim_standing', true)
    }

    // sets jump height
    if ((keyUpObj.isDown && this.penelope.body.touching.down) && this.boinging === false)
    {
        this.penelope.setVelocityY(-710)
        this.boing.play()
        this.boinging = true
    }
    else if (keyUpObj.isUp === true && this.boinging === true) {
      this.boinging = false
    }
  } 
}

export default GameSceneTwo