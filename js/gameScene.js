// Created by: Niko
// Created on: may 2024
// This is the Game Scene

// class for the game scene
class GameScene extends Phaser.Scene {
  
  //method that constructs keywords
  constructor() {
    super({key: "gameScene"})
  }
  init(data) {
    // sets the background color
    this.cameras.main.setBackgroundColor('#1111f')
  }
  // used to load assets
  preload() {
    // really just to check if stuff is working
    console.log("Game Scene")
  }

  // used to create game objects and add specifications
  create(data) {
   
  }
  
  update(time, delta) {
  } 
}

export default GameScene