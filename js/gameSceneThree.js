// Created by: Niko
// Created on: may 2024
// This is the Game Scene three


// class for the game scene three
class GameSceneThree extends Phaser.Scene {
  // creates an avocado seed
  createSeed() {
    // Define the array of coordinate pairs
    const spawnOne = { x: 1920 - 1700, y: 1080 - 200 };
    const spawnTwo = { x: 1920 - 200, y: 1080 - 800 };
    const spawnThree = { x: 1920 - 1700, y: 1080 - 800 };
    const spawnFour = { x: 1920 - 200, y: 1080 - 200 };

    // creates an array including all of the different possible spawn locations
    const spawnArr = [spawnOne, spawnTwo, spawnThree, spawnFour];
    // gets the length of the array, the number of items in it, and then gets a random number between 1 and the length of the array, and then sets the spawn location associated with that number to the random spawn constant
    const randomSpawn = spawnArr[Math.floor(Math.random() * spawnArr.length)]

    // the coordinate of the randomly picked spawn location is used as the spawn location for the avocado seed
    const seedX = randomSpawn.x;
    const seedY = randomSpawn.y;
  
    const seed = this.physics.add.sprite(seedX, seedY, 'seed').setScale(0.33)
    seed.setSize(250, 570)
    // adds seeds to seed group
    this.seedGroup.add(seed)
  }

  //method that constructs keywords
  constructor() {
    super({key: "gameSceneThree"})
    this.gameSceneThreeBackground = null
    this.penelope = null
    this.seed = null
    this.backgroundMusicThree = null
    this.attackHitBox = null
    this.facingRight = true
    this.score = null
    this.slam = null
    this.slamming = false
    this.toiletBowl = null
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
    this.load.audio('backgroundMusicThree', '././assets/backgroundMusicSceneThree.mp3')
    this.load.audio('slam', '././assets/slam.mp3')
  }

  // used to create game objects and add specifications
  create(data) {
    this.backgroundMusicThree = this.sound.add('backgroundMusicThree', {volume: 2})
    this.backgroundMusicThree.play()
    this.backgroundMusicThree.loop = true
    this.slam = this.sound.add('slam')
    this.gameSceneThreebackground = this.add.image(0, 0, 'gameSceneThreeBackground')
    this.gameSceneThreebackground.x = 1920 / 2
    this.gameSceneThreebackground.y = 1080 / 2
    this.penelope = this.physics.add.sprite(1920 / 2 + 70, 1080 - 200, 'penelope3').setScale(0.2)
    

    // new size, the 'true' argument means "center it on the gameobject"
    this.penelope.setSize(150, 200, true)
    // changes the position of the hitbox for the sprite 
    this.penelope.body.setOffset(200, 650)
    this.penelope.setCollideWorldBounds(true)

    const penelopeX = this.penelope.x
    const penelopeY = this.penelope.y

    // creates the seed group
    this.seedGroup = this.add.group()
    // animations for penelope walking different directions
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
    // frame for standing facing right
    this.anims.create({
      key: "penelope_anim_standing_right",
      frames: this.anims.generateFrameNumbers("penelope3", {start: 19, end: 19})
    })
    // frame for standing facing left
    this.anims.create({
      key: "penelope_anim_standing_left",
      frames: this.anims.generateFrameNumbers("penelope3", {start: 20, end: 20})
    })
    // animations for penelope attacking when facing left or right
    this.anims.create({
      key: "penelope_attack_right",
      frames: this.anims.generateFrameNumbers("penelope3", {start: 10, end: 18}),
      frameRate: 17,
    })
    this.anims.create({
      key: "penelope_attack_left",
      frames: this.anims.generateFrameNumbers("penelope3", {start: 21, end: 28}),
      frameRate: 17,
    })
    // creates keyboard inputs
    this.cursors = this.input.keyboard.createCursorKeys()

    
    // collisions between seeds and penelope
    this.physics.add.collider(this.seedGroup, this.penelope, function (seedCollide) {
      seedCollide.destroy()
      this.physics.pause()
      this.sound.stopAll()
      this.score = 0
      this.scene.start('youloseScene')
    }.bind(this))

    // spawns 4 seeds
    this.createSeed()
    this.createSeed()
    this.createSeed()
    this.createSeed()


    // attack hit box for when the player attacks 
    this.attackHitBox = this.add.rectangle(penelopeX, penelopeY, 20, 20, 0xffffff, 0.5).setAlpha(0)
    this.physics.add.existing(this.attackHitBox)
    this.attackHitBox.body.setOffset(-50, 40)

    // toilet bowl hole hit box for if the player falls in the toilet bowl hole
    this.toiletBowl = this.add.rectangle(975, 600, 170, 200, 0xff5555, 0.5).setAlpha(0.)
    this.physics.add.existing(this.toiletBowl)

    // collisions between toilet bowl hole and penelope
    this.physics.add.collider(this.penelope, this.toiletBowl, function () {
      this.score = 0
      this.physics.pause()
      this.sound.stopAll()
      this.scene.start('youloseScene')
    }.bind(this)) 
    

    // collisions between seeds and the attack hit box
    this.physics.add.collider(this.seedGroup, this.attackHitBox, function (seedCollide) {
      seedCollide.destroy()
      this.score = this.score + 1
      this.createSeed()
    }.bind(this))                                   

    
  }
  // slams car on feral avocado seed when facing right, had to be done this way because if the attack simply spawned a box on top of the enemy, it gave issues with collisions, it has to be colliding with the enemy in a way that it goes from outside of the enemy hitbox to the inside, otherwise sometimes it registers it as already having happened or not at all. so now it moves from the players location and then collides with the enemy instead of spawning on the enemy.
  penelopeAttackRight() {
    this.attackHitBox.body.velocity.x = 300
    this.penelope.play('penelope_attack_right', true)
  }
  // used when the player is moved for some other reason. pretty much resets the offset to original offset.
  penelopeOffset() {
    this.penelope.body.setOffset(200, 650)
  }

  // makes avocado seed track penelope
  seedFollows () {
    // for each seed in seed group
    this.seedGroup.children.each( (seed) => {
      console.log("RUNNING")
    const penelopeX = this.penelope.x
    // if the penelope x coordinate is not equal to the seed x coordinate, the seed will move towards the penelope to try and make this true 
    if (penelopeX != seed.x) {
      this.physics.moveToObject(seed, this.penelope, 110)
    }
    })
  }

  // This part I did need help from AI with but I did my best to understand it. Calculates the distance between two points.  first calculates the horizontal distance by subtracting the x-coordinate of the first point from the x-coordinate of the second point giving us A. Ex: in a 20px by 20px screen, the first x coordinate is 3 and the second x coordinate is 15, so 15 - 3 is 12, so the distance on the x axis is 12. then it calculates the verticle distance by doing the same thing, now we have B. Then it uses a sort of pythagorean theorem type equation to calculate the final distance, which we could say is C, or the hypotenouse. It does A squared plus B squared, and then gets the squareroot of that to get C, which is the distance between the two points including x distaance and y distance.
  distanceBetweenPoints(point1, point2) {
    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));   
  }
  

  update(time, delta) {
    // updates the seed to follow penelope
    this.seedFollows()
    
    // Check the distance and set attackHitBox.x accordingly
    if(this.distanceBetweenPoints(this.attackHitBox, this.penelope) > 150) {
      this.attackHitBox.x = this.penelope.x;
    }

    if (this.cursors.space.isDown && this.slamming === false) {
      this.slam.play()
      this.slamming = true
    }
    if (this.cursors.space.isUp && this.slamming === true) {
      this.slam.stop()
      this.slamming = false
    }
    
    // if the left arrow key is pressed, penelope will move left
    if (this.cursors.left.isDown)
    {
      this.penelope.x = this.penelope.x - 5
      this.facingRight = false
      this.penelope.play('penelope_walking_left', true)
    }
    // if the right arrow key is pressed, penelope will move right
    else if (this.cursors.right.isDown)
    {
      this.penelope.x = this.penelope.x + 5
      this.facingRight = true
      this.penelope.play('penelope_walking_right', true)
    }
    
    // if the up arrow key is pressed, and penelope was last facing right, penelope will walk up with the walking right animation
    if (this.cursors.up.isDown && this.facingRight === true)
    {
      this.penelope.y = this.penelope.y - 5
      this.penelope.play('penelope_walking_right', true)
    }
    // if the up arrow key is pressed, and penelope was last facing left, penelope will walk up with the left walking animation playing
    else if (this.cursors.up.isDown && this.facingRight === false)
    {
        this.penelope.y = this.penelope.y - 5
        this.penelope.play('penelope_walking_left', true)
    }
    // if the down arrow key is pressed, and penelope was last facing left, penelope will walk down with the left walking animation playing
    else if (this.cursors.down.isDown && this.facingRight === false) {
      this.penelope.y = this.penelope.y + 5
      this.penelope.play('penelope_walking_left', true)
    }
    // if the down arrow key is pressed, and penelope was last facing right, penelope will walk down with the right walking animation playing
    else if (this.cursors.down.isDown && this.facingRight === true) {
      this.penelope.y = this.penelope.y + 5
      this.penelope.play('penelope_walking_right', true)
    }
    // if the space bar is up, it sets the attack hitbox back to its non attacking place
    else if (this.cursors.space.isUp) {
      this.attackHitBox.x = this.penelope.x
      this.attackHitBox.y = this.penelope.y
      this.attackHitBox.body.velocity.x = 0
      this.penelope.body.setOffset(200, 650 )
    }
    // if the space bar is pressed and penelope was last facing left, penelope will attack with the left facing attack animation
    if ((this.cursors.space.isDown && this.facingRight === false) && (this.cursors.right.isUp && this.cursors.left.isUp)) {
      this.attackHitBox.body.velocity.x = -300
      this.penelope.body.setOffset(665, 650)
      this.penelope.play('penelope_attack_left', true)
    }
    else if ((this.cursors.space.isDown && this.facingRight === true) && (this.cursors.right.isUp && this.cursors.left.isUp)) {
      this.penelopeAttackRight()
      this.penelope.body.setOffset(200, 650)
    }
    else {
      this.attackHitBox.body.velocity.x = 0
      this.attackHitBox.x = this.penelope.x
      this.attackHitBox.y = this.penelope.y
    }
    // offset adjustments for if player is facing different directions
    if ((this.cursors.right.isUp && this.cursors.left.isUp) && (this.facingRight === false && this.cursors.space.isUp)) {
      this.penelope.play('penelope_anim_standing_left', true)
      this.penelope.body.setOffset(365, 650)
      this.attackHitBox.body.setOffset(-10, 40)
    }
    if ((this.cursors.right.isUp && this.cursors.left.isUp) && (this.facingRight === true && this.cursors.space.isUp)) {
      this.penelope.play('penelope_anim_standing_right', true)
      this.penelopeOffset()
      this.attackHitBox.body.setOffset(-50, 40)
    }



    // end game
    if (this.score > 30) {
      this.physics.pause()
      this.scene.start('youWinScene')
      this.sound.stopAll()
      this.score = 0
    }

  } 
}

export default GameSceneThree