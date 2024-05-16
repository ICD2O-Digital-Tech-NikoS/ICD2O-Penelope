// Created by: Niko
// Created on: may 2024
// This is the Game Scene three


// class for the game scene three
class GameSceneThree extends Phaser.Scene {
  // create an acid drop
  createSeed() {
    const seed = this.physics.add.sprite(1920 / 2, 1080 / 2, 'seed').setScale(1)
    seed.setSize(50, 50)
    this.seedGroup.add(seed)
    
  }

  //method that constructs keywords
  constructor() {
    super({key: "gameSceneThree"})
    this.gameSceneThreeBackground = null
    this.penelope = null
    this.seed = null
    this.backgroundMusic = null
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
    this.load.spritesheet('penelope3', '././assets/penelopeSceneTwo.png', {
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
    this.penelope = this.physics.add.sprite(1920 / 2, 1080 - 300, 'penelope3').setScale(0.1)
    // gives penelope a slight bounce, you can see when loads in

    //  220x104 original size, 110x52 new size, the 'true' argument means "center it on the gameobject"
    this.penelope.setSize(300, 400, true)
    // changes the position of the hitbox for the sprite 
    this.penelope.body.setOffset(380, 570)
    this.penelope.setCollideWorldBounds(true)

    this.seedGroup = this.add.group()
    // since penelope is not collecting anything, the animation would remain the same, this animation is for penelope walking
    //this.anims.create({
      //key: "penelope_anim",
      //frames: this.anims.generateFrameNumbers("penelope3", {start: 1, end: 5}),
      //frameRate: 20,
      //repeat: -1
    //})

    // frame for standing
    //this.anims.create({
      //key: "penelope_anim_standing",
      //frames: this.anims.generateFrameNumbers("penelope3", 0)
    //})
    
    this.cursors = this.input.keyboard.createCursorKeys()

    
    // collisions between acid drops and penelope
    //this.physics.add.collider(this.seedGroup, this.penelope, function (seedCollide) {
      //seedCollide.destroy()
      //this.physics.pause()
      //this.scene.start('gameOverScene')
      //this.backgroundMusic.stop()
    //}.bind(this))
    this.createSeed()
  }

  seedFollows () {
      this.physics.moveToObject(this.seedGroup, this.penelope, 100);
  }

  update(time, delta) {
    this.seedFollows()
    if (this.cursors.left.isDown)
    {
      this.penelope.x = this.penelope.x - 5
    }
    else if (this.cursors.right.isDown)
    {
      this.penelope.x = this.penelope.x + 5
    }
    

    if (this.cursors.up.isDown)
    {
      this.penelope.y = this.penelope.y - 5
    }
    else if (this.cursors.down.isDown) {
      this.penelope.y = this.penelope.y + 5
    }
    //if (cursors.space.isDown) {
      
    //}
  } 
}

export default GameSceneThree