// Created by: Niko
// Created on: may 2024
// This is the Tutorial Scene

// class for the game scene
class GameOverScene extends Phaser.Scene {

  //method that constructs keywords
  constructor() {
    super({key: "gameOverScene"})
    this.GameOverVideo = null
  }
  init(data) {
    // sets the background color
    this.cameras.main.setBackgroundColor('#ffffff')
  }
  // used to load assets
  preload() {
    // really just to check if stuff is working
    console.log("Game Over Scene")
  }

  // used to create game objects and add specifications
  create(data) {
    
    // gives button the property of interactive and makes the cursor turn into a hand when hovering over the button
    //when the cursor is on and, pointer down meaning click essentially happens, it runs the code or function
  }

  update(time, delta) {
  } 
  // starts gameScene when clicked
  
  this.scene.start('menuScene')
}

export default GameOverScene