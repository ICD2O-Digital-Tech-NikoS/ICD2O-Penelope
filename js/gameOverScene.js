// Created by: Niko
// Created on: may 2024
// This is the game over Scene

// class for the game over scene
class GameOverScene extends Phaser.Scene {

  //method that constructs keywords
  constructor() {
    super({key: "gameOverScene"})
    this.gameOverVideo = null
    //this.restartButton = null
  }
  init(data) {
    // sets the background color
    this.cameras.main.setBackgroundColor('#ffffff')
  }
  // used to load assets
  preload() {
    // really just to check if stuff is working
    console.log("Game Over Scene")
    this.load.video('gameOverVideo', 'assets/gameOverVideo.mp4')
    //this.load.image('restartButton', 'assets/restartButton.png')
  }
  // used to create game objects and add specifications
  create(data) {
    this.gameOverVideo = this.add.video(1920 / 2, 1080 / 2, 'gameOverVideo')
    this.gameOverVideo.play()
    //this.restartButton = this.add.sprite(1920 / 2, 1080 / 2, 'restartButton').setScale(0.2)
    //this.restartButton.setInteractive({ useHandCursor : true })
    //this.restartButton.on('pointerdown', )
  }

  update(time, delta) {
  } 
  
}
export default GameOverScene