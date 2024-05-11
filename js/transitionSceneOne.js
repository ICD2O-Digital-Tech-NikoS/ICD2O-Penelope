// Created by: Niko
// Created on: may 2024
// This is the Tutorial Scene

// class for the game scene
class TransitionSceneOne extends Phaser.Scene {

  //method that constructs keywords
  constructor() {
    super({key: "transitionSceneOne"})
    
  }
  init(data) {
    // sets the background color
    this.cameras.main.setBackgroundColor('#ffffff')
  }
  // used to load assets
  preload() {
    // really just to check if stuff is working
    console.log("transition Scene One")
    
  }

  // used to create game objects and add specifications
  create(data) {
    
  }

  update(time, delta) {
  } 

}

export default TransitionSceneOne