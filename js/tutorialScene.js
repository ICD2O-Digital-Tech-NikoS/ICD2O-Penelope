// Created by: Niko
// Created on: may 2024
// This is the Tutorial Scene

// class for the game scene
class TutorialScene extends Phaser.Scene {

  //method that constructs keywords
  constructor() {
    super({key: "tutorialScene"})
  }
  init(data) {
    // sets the background color
    this.cameras.main.setBackgroundColor('#1111ff')
  }
  // used to load assets
  preload() {
    // really just to check if stuff is working
    console.log("Tutorial Scene")
  }

  // used to create game objects and add specifications
  create(data) {

  }

  update(time, delta) {
  } 
}

export default TutorialScene