// Created by: Niko
// Created on: may 2024
// This is the Game Scene three


// class for the game scene three
class GameSceneThree extends Phaser.Scene {
  // create an acid drop
  createSeed() {
    // Define the array of coordinate pairs
    const spawnOne = { x: 1920 - 1700, y: 1080 - 200 };
    const spawnTwo = { x: 1920 - 200, y: 1080 - 800 };
    const spawnThree = { x: 1920 - 1700, y: 1080 - 800 };
    const spawnFour = { x: 1920 - 200, y: 1080 - 200 };

    const spawnArr = [spawnOne, spawnTwo, spawnThree, spawnFour];
    const randomSpawn = spawnArr[Math.floor(Math.random() * spawnArr.length)]

    const seedX = randomSpawn.x;
    const seedY = randomSpawn.y;
  
    const seed = this.physics.add.sprite(seedX, seedY, 'seed').setScale(1)
    seed.setSize(70, 120)
    this.seedGroup.add(seed)
  }

  //method that constructs keywords
  constructor() {
    super({key: "gameSceneThree"})
    this.gameSceneThreeBackground = null
    this.penelope = null
    this.seed = null
    this.backgroundMusic = null
    this.attackHitBox = null
    this.facingRight = true
  }
  init(data) {
    // sets the background color
    this.cameras.main.setBackgroundColor('#ffffff')
  }
  // used to load assets
  preload() {
    // really just to check if stuff is working
    console.log("Game Scene Three")
    this.load.image('gameSceneThreeBackground', '././assets/gameSceneThreeBackground.webp')
    this.load.spritesheet('penelope3', '././assets/penelope3Spritesheet.png', {
      frameWidth: 1000,
      frameHeight: 1000
    })
    this.load.image('seed', '././assets/seed.png')
    this.load.audio('backgroundMusic', '././assets/marioBackgroundMusic.mp3')
  }

  // used to create game objects and add specifications
  create(data) {
    //this.backgroundMusic = this.sound.add('backgroundMusic')
    //this.backgroundMusic.play()
    this.gameSceneThreebackground = this.add.image(0, 0, 'gameSceneThreeBackground')
    this.gameSceneThreebackground.x = 1920 / 2
    this.gameSceneThreebackground.y = 1080 / 2
    this.penelope = this.physics.add.sprite(1920 / 2, 1080 - 300, 'penelope3').setScale(0.2)
    // gives penelope a slight bounce, you can see when loads in

    //  220x104 original size, 110x52 new size, the 'true' argument means "center it on the gameobject"
    this.penelope.setSize(150, 200, true)
    // changes the position of the hitbox for the sprite 
    this.penelope.body.setOffset(200, 650)
    this.penelope.setCollideWorldBounds(true)

    this.seedGroup = this.add.group()
    // since penelope is not collecting anything, the animation would remain the same, this animation is for penelope walking
    this.anims.create({
      key: "penelope_walking_right",
      frames: this.anims.generateFrameNumbers("penelope3", {start: 5, end: 9}),
      frameRate: 20,
      repeat: -1
    })
    this.anims.create({
      key: "penelope_walking_left",
      frames: this.anims.generateFrameNumbers("penelope3", {start: 0, end: 4}),
      frameRate: 20,
      repeat: -1
    })
    // frame for  standing
    this.anims.create({
      key: "penelope_anim_standing_right",
      frames: this.anims.generateFrameNumbers("penelope3", {start: 19, end: 19})
    })
    // frame for  standing
    this.anims.create({
      key: "penelope_anim_standing_left",
      frames: this.anims.generateFrameNumbers("penelope3", {start: 20, end: 20})
    })
    this.anims.create({
      key: "penelope_attack_right",
      frames: this.anims.generateFrameNumbers("penelope3", {start: 10, end: 18}),
      frameRate: 20,
    })
    this.anims.create({
      key: "penelope_attack_left",
      frames: this.anims.generateFrameNumbers("penelope3", {start: 21, end: 28}),
      frameRate: 20,
    })
    this.cursors = this.input.keyboard.createCursorKeys()

    
    // collisions between acid drops and penelope
    this.physics.add.collider(this.seedGroup, this.penelope, function (seedCollide) {
      seedCollide.destroy()
      this.physics.pause()
      this.scene.start('gameOverScene')
      //this.backgroundMusic.stop()
    }.bind(this))
    this.createSeed()
    this.createSeed()
    this.createSeed()
    this.createSeed()

    const penelopeX = this.penelope.x
    const penelopeY = this.penelope.y

    this.attackHitBox = this.add.rectangle(penelopeX, penelopeY, 30, 30, 0xffffff, 0.5)
    this.physics.add.existing(this.attackHitBox)
    

    // collisions between acid drops and penelope
    this.physics.add.collider(this.seedGroup, this.attackHitBox, function (seedCollide) {
      seedCollide.destroy()
      this.createSeed()
    }.bind(this))                                   

    
  }
  // slams semi truck on ferral avocado seed
  penelopeAttackRight() {
    this.attackHitBox.body.velocity.x = 200
    this.penelope.play('penelope_attack_right', true)
  }
  penelopeAttackLeft() {
    this.attackHitBox.body.velocity.x = -200
  }

  seedFollows () {

    this.seedGroup.children.each( (seed) => {
      console.log("RUNNING")
    const penelopeX = this.penelope.x
    if (penelopeX != seed.x) {
      this.physics.moveToObject(seed, this.penelope, 110)
    }
    })
  }

  update(time, delta) {
    this.seedFollows()
    if (this.cursors.left.isDown)
    {
      this.penelope.x = this.penelope.x - 5
      this.facingRight = false
      this.penelope.play('penelope_walking_left', true)
    }
    else if (this.cursors.right.isDown)
    {
      this.penelope.x = this.penelope.x + 5
      this.facingRight = true
      this.penelope.play('penelope_walking_right', true)
    }
    

    if (this.cursors.up.isDown && this.facingRight === true)
    {
      this.penelope.y = this.penelope.y - 5
      this.penelope.play('penelope_walking_right', true)
    }
    else if (this.cursors.up.isDown && this.facingRight === false)
    {
        this.penelope.y = this.penelope.y - 5
        this.penelope.play('penelope_walking_left', true)
    }
    else if (this.cursors.down.isDown && this.facingRight === false) {
      this.penelope.y = this.penelope.y + 5
      this.penelope.play('penelope_walking_left', true)
    }
    else if (this.cursors.down.isDown && this.facingRight === true) {
      this.penelope.y = this.penelope.y + 5
      this.penelope.play('penelope_walking_right', true)
    }
    if (this.cursors.space.isDown && this.facingRight === true) {
      this.penelopeAttackRight()
    } 
    else if (this.cursors.space.isUp) {
      this.attackHitBox.x = this.penelope.x
      this.attackHitBox.y = this.penelope.y
      this.attackHitBox.body.velocity.x = 0
      this.penelope.body.setOffset(200, 650)
    }
    if (this.cursors.space.isDown && this.facingRight === false) {
      this.penelopeAttackLeft()
      this.penelope.body.setOffset(670, 650)
      this.penelope.play('penelope_attack_left', true)
      this.penelope.on('animationcomplete', () => {
        this.penelope.body.setOffset(200, 650)
      })
    }
    if (this.cursors.space.isDown && this.cursors.left.isDown) {
      this.penelope.play('penelope_attack_left', false)
    }
    else if (this.cursors.space.isDown && this.cursors.right.isDown) {
      this.penelope.play('penelope_attack_right', false)
      this.penelope.body.setOffset(200, 650)
    }
    if ((this.cursors.right.isUp && this.cursors.left.isUp) && (this.facingRight === false && this.cursors.space.isUp)) {
      this.penelope.play('penelope_anim_standing_left', true)
      this.penelope.body.setOffset(200, 650)
    }
    if ((this.cursors.right.isUp && this.cursors.left.isUp) && (this.facingRight === true && this.cursors.space.isUp)) {
      this.penelope.play('penelope_anim_standing_right', true)
      this.penelope.body.setOffset(200, 650)
    }
  } 
}

export default GameSceneThree