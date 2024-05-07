// global phaser 

//scene import statements
import SplashScene from "./js/splashScene.js"
// create the new scenes
const splashScene = new SplashScene()
// game scene
const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    }
  },
  // set background color
  backgroundColor: 0x5f6e7a,
  scale: {
    mode: Phaser.Scale.FIT,
    // we place it in the middle of the page.
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
}

const game = new Phaser.Game(config)


// load scenes
game.scene.start("splashScene", splashScene)

// start scene
game.scene.start("splashScene")