// Created by: Niko
// Created on: may 2024
//this is the Phaser3 game configuration

// global phaser 

//scene import statements
import SplashScene from "./splashScene.js"
import TitleScene from "./titleScene.js"
import GooseScene from "./gooseScene.js"
import GameScene from "./gameScene.js"
import MenuScene from "./menuScene.js"
import TutorialScene from "./tutorialScene.js"
// create the new scenes
const splashScene = new SplashScene()
const titleScene = new TitleScene()
const gooseScene = new GooseScene()
const gameScene = new GameScene()
const menuScene = new MenuScene()
const tutorialScene = new TutorialScene()
// game configuration settings
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
  backgroundColor: 0xffffff,
  scale: {
    mode: Phaser.Scale.FIT,
    // we place it in the middle of the page.
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
}

const game = new Phaser.Game(config)


// load scenes
game.scene.add('splashScene', splashScene)
game.scene.add('titleScene', titleScene)
game.scene.add('gooseScene', gooseScene)
game.scene.add('gameScene', gameScene)
game.scene.add('menuScene', menuScene)
game.scene.add('tutorialScene', tutorialScene)
// start scene
game.scene.start('splashScene')