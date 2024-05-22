// Created by: Niko
// Created on: may 2024
// This is the Tutorial Scene

// class for the game scene
class TransitionSceneTwo extends Phaser.Scene {

  //method that constructs keywords
  constructor() {
    super({key: "youWinScene"})
    this.youWinBackgroundImage = null
  }
  init(data) {
    // sets the background color
    this.cameras.main.setBackgroundColor('#ffffff')
  }
  // used to load assets
  preload() {
    // really just to check if stuff is working
    console.log("You Win Scene")
    this.load.image('youWinSceneBackground', '././assets/youWinSceneImage.png')
  }

  // used to create game objects and add specifications
  create(data) {
    this.youWinBackgroundImage = this.add.sprite(0, 0, 'youWinSceneBackground').setScale(1.5)
    this.youWinBackgroundImage.x = 1920 / 2
    this.youWinBackgroundImage.y = 1080 / 2 - 100
 // gives button the property of interactive and makes the cursor turn into a hand when hovering over the button
    this.youWinBackgroundImage.setInteractive({ useHandCursor : true })
    //when the cursor is on and, pointer down meaning click essentially happens, it runs the code or function
    this.youWinBackgroundImage.on('pointerdown', () => this.clickButton())
  }

  update(time, delta) {
    
  } 
  clickButton () {
    this.scene.start('menuScene') 
  }
}

export default TransitionSceneTwo