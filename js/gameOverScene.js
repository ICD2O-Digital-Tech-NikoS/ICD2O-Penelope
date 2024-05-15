// Created by: Niko
// Created on: may 2024
// This is the game over Scene

// class for the game over scene
class GameOverScene extends Phaser.Scene {

  //method that constructs keywords
  constructor() {
    super({key: "gameOverScene"})
    this.gameOverVideo = null
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
  }

  // used to create game objects and add specifications
  create(data) {
    this.gameOverVideo = this.add.video(1920 / 2, 1080 / 2, 'gameOverVideo')
    this.gameOverVideo.play()
    this.gameOverVideo.on('complete', 'menuScene')
  }

  update(time, delta) {
  } 
  
}

export default GameOverScene