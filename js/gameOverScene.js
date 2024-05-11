// Created by: Niko
// Created on: may 2024
// This is the Tutorial Scene

// class for the game scene
class GameOverScene extends Phaser.Scene {

  //method that constructs keywords
  constructor() {
    super({key: "gameOverScene"})
    this.GameOverRestartImage = null
  }
  init(data) {
    // sets the background color
    this.cameras.main.setBackgroundColor('#ffffff')
  }
  // used to load assets
  preload() {
    // really just to check if stuff is working
    console.log("Game Over Scene")
    this.load.image('gameOverSceneBackground', '././assets/GameOver.png')
    this.load.image('restart', '././assets/restart.png')
  }

  // used to create game objects and add specifications
  create(data) {
    this.GameOverBackgroundImage = this.add.image(0, 0, 'gameOverSceneBackground')
    this.GameOverBackgroundImage.x = 1920 / 2
    this.GameOverBackgroundImage.y = 1080 / 2
    this.GameOverRestartImage = this.add.sprite(0, 0, 'restart')
    this.GameOverRestartImage.x = 1920 / 2
    this.GameOverRestartImage.y = 1080 / 2
 // gives button the property of interactive and makes the cursor turn into a hand when hovering over the button
    this.GameOverRestartImage.setInteractive({ useHandCursor : true })
    //when the cursor is on and, pointer down meaning click essentially happens, it runs the code or function
    this.GameOverRestartImage.on('pointerdown', () => this.clickButton())
  }

  update(time, delta) {
  } 
  // starts gameScene when clicked
  clickButton () {
    this.scene.start('gameScene')
  }
}

export default GameOverScene