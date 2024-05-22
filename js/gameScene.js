// Created by: Niko
// Created on: may 2024
// This is the Game Scene

// class for the game scene
class GameScene extends Phaser.Scene {
  // create a beard
  createBeard() {
    // creates a random number between 40 and 170 for velocity
    const beardVelocity = Math.floor(Math.random() * 121) + 70
    // creates a random number for spawn location on the x axis
    const beardXLocation = Math.floor(Math.random() * 1920) + 1
    const aBeard = this.physics.add.sprite(beardXLocation, -100, 'beard').setScale(0.13)
    // sets beard velocity to randomly generated number
    aBeard.body.velocity.y = beardVelocity
    // adds beard to beard group
    this.beardGroup.add(aBeard)
  }
  //method that constructs keywords, can be used to hold information about a certain thing
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
    this.penelopeRun = null
    this.collectBeard = null
    this.beardSizzle = null
    this.backgroundMusic = null
    this.isRunning = false
    this.gameOverText = null
    this.gameOverTextStyle = { font: '65px Arial', fill: '#ffffff', align: 'center'}
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
    // sprite sheet for animation, sets frame width and height of each individual image inside the sprite sheet, so when you ask the computer to generate frames, it knows what size to generate the frames. by generating frames I mean it pretty much just cuts out a section of the sprite sheet and uses that as a frame.
    this.load.spritesheet('penelope', '././assets/penelopeSceneOne.png', {
      frameWidth: 1020,
      frameHeight: 1000
    })
    this.load.image('beard', '././assets/beard.png')
    this.load.image('ground', '././assets/ground.png')
    this.load.audio('penelopeRun', '././assets/penelopeRun.mp3')
    this.load.audio('beardCollect', '././assets/beardCollect.mp3')
    this.load.audio('beardSizzle', '././assets/beardSizzle.mp3')
    this.load.audio('backgroundMusic', '././assets/backgroundMusic.mp3')
  }

  // used to create game objects and add specifications
  create(data) {
    // adds the background
    this.gameScenebackground = this.add.image(0, 0, 'gameSceneBackground')
    this.gameScenebackground.x = 1920 / 2
    this.gameScenebackground.y = 1080 / 2
    // adds sounds
    this.penelopeRun = this.sound.add('penelopeRun', {
      volume: 1,
      loop: true
    }) 
    this.beardCollect = this.sound.add('beardCollect')
    this.beardSizzle = this.sound.add('beardSizzle', {volume: 0.3})
    this.backgroundMusic = this.sound.add('backgroundMusic', {volume: 5})
    // adds penelope
    this.penelope = this.physics.add.sprite(1920 / 2, 1080 - 180, 'penelope').setScale(0.3)
    //  220x104 original size, 110x52 new size, the 'true' argument means "center it on the gameobject"
    this.penelope.setSize(430, 700, true)
    // changes the position of the hitbox for the sprite 
    this.penelope.body.setOffset(810 / 2, 1080 - 680)


    // creates an animation for penelope walking if penelope has not collected any beards yet, -1 is used to create a loop
    this.anims.create({
      key: "penelope_anim1",
      frames: this.anims.generateFrameNumbers("penelope", {start: 1, end: 5}),
      frameRate: 20,
      repeat: -1
    })
    // creates an animation for penelope walking if penelope has collected a beard
    this.anims.create({
      key: "penelope_anim2",
      frames: this.anims.generateFrameNumbers("penelope", {start: 8, end: 12}),
      frameRate: 20,
      repeat: -1
    })
    // creates an animation for penelope walking if penelope has collected two beards
    this.anims.create({
      key: "penelope_anim3",
      frames: this.anims.generateFrameNumbers("penelope", {start: 15, end: 19}),
      frameRate: 20,
      repeat: -1
    })

    // creates a frame for penelope standing if penelope has not collected any beards yet
    this.anims.create({
      key: "penelope_anim_standing1",
      frames: this.anims.generateFrameNumbers("penelope", 0)
    })
    // creates a frame for penelope standing if penelope has collected one beard
    this.anims.create({
      key: "penelope_anim_standing2",
      frames: this.anims.generateFrameNumbers("penelope", {start: 7, end: 7})
    })
    // creates a frame for penelope standing if penelope has collected two beards
    this.anims.create({
      key: "penelope_anim_standing3",
      frames: this.anims.generateFrameNumbers("penelope", {start: 14, end: 14})
    })




    // creates text for score and strikes
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
    // creates a beard
    this.createBeard()
    // collisions between beards and penelope
    this.physics.add.collider(this.beardGroup, this.penelope, function(beardCollide) {
      beardCollide.destroy()
      this.beardCollect.play()
      this.score = this.score + 2
      this.scoreText.setText('Score: ' + this.score.toString())
      this.createBeard()
      this.createBeard()
    }.bind(this))

    // collisions between beard group and the ground
    this.physics.add.collider(this.beardGroup, this.ground, function(beardCollide) {
      beardCollide.destroy()
      this.beardSizzle.play()
      this.strikes = this.strikes + 1
      this.strikeText.setText('Strikes: ' + this.strikes.toString())
      this.createBeard()
    }.bind(this))
  }
  
  update(time, delta) {
    // keyboard inputs
    const keyLeftObj = this.input.keyboard.addKey('LEFT') 
    const keyRightObj = this.input.keyboard.addKey('RIGHT')
    
    if ((keyLeftObj.isDown === true || keyRightObj.isDown === true) && this.isRunning === false) {
        this.penelopeRun.play()
        this.isRunning = true
      }
    
    if (keyLeftObj.isUp === true && keyRightObj.isUp === true) {
        this.penelopeRun.stop();
        this.isRunning = false;
    }
    
    // if user is pressing left key down, make penelope move left, play run sound, and depending on how many beards penelope collected, play a different animation
    if (keyLeftObj.isDown === true) {
      this.penelope.x = this.penelope.x - 28
    }
    if (this.score >= 4) {
      this.penelope.playReverse('penelope_anim3', true)
    }
    else if (this.score == 2) {
      this.penelope.playReverse('penelope_anim2', true)
    } 
    else {
      this.penelope.playReverse('penelope_anim1', true)
    }
    

    // if user is pressing right key down, make penelope move right, play run sound, and depending on how many beards penelope collected, play a different animation
    if (keyRightObj.isDown === true) {
      this.penelope.x = this.penelope.x + 28
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
    // if both keys are up play standing frames, changes depending on how many beards have been collected
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
      this.sound.stopAll()
      this.physics.pause()
      this.scene.start('gameOverScene')
      this.score = 0
      this.scoreText = this.add.text(10, 10, 'Score: ' + this.score.toString(), this.scoreTextStyle)
      this.strikes = 0
      this.strikeText = this.add.text(10, 70, 'Strikes: ' + this.strikes.toString(), this.strikeTextStyle)
    }
    // if they get a score of 100 and they have not been out yet, they win
    if (this.score > 100) {
      this.scene.start('transitionSceneOne')
      this.score = 0
      this.scoreText = this.add.text(10, 10, 'Score: ' + this.score.toString(), this.scoreTextStyle)
      this.strikes = 0
      this.strikeText = this.add.text(10, 70, 'Strikes: ' + this.strikes.toString(), this.strikeTextStyle)
      this.sound.stopAll()
    }
  }
}

export default GameScene