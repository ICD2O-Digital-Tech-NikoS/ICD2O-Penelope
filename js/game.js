// Created by: Niko
// Created on: may 2024
//this is the Phaser3 game configuration

// global phaser 

//scene import statements that reference the phaser scene created for that scene
import SplashScene from "./splashScene.js"
import TitleScene from "./titleScene.js"
import GooseScene from "./gooseScene.js"
import GameScene from "./gameScene.js"
import MenuScene from "./menuScene.js"
import TutorialScene from "./tutorialScene.js"
import GameOverScene from "./gameOverScene.js"
import TransitionSceneOne from "./transitionSceneOne.js"
import GameSceneTwo from "./gameSceneTwo.js"
import TransitionSceneTwo from "./transitionSceneTwo.js"
import GameSceneThree from "./gameSceneThree.js"
// create the new scenes as a variable
const splashScene = new SplashScene()
const titleScene = new TitleScene()
const gooseScene = new GooseScene()
const gameScene = new GameScene()
const menuScene = new MenuScene()
const tutorialScene = new TutorialScene()
const transitionSceneOne = new TransitionSceneOne()
const gameOverScene = new GameOverScene()
const gameSceneTwo = new GameSceneTwo()
const transitionSceneTwo = new TransitionSceneTwo()
const gameSceneThree = new GameSceneThree()
// game configuration settings, dictionary of basic parameters for the game
const config = {
  // sets the phaser type to the default type
  type: Phaser.CANVAS,
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

// game varible that uses the config parameters
const game = new Phaser.Game(config)


// load scenes
game.scene.add('splashScene', splashScene)
game.scene.add('titleScene', titleScene)
game.scene.add('gooseScene', gooseScene)
game.scene.add('gameScene', gameScene)
game.scene.add('menuScene', menuScene)
game.scene.add('tutorialScene', tutorialScene)
game.scene.add('gameOverScene', gameOverScene)
game.scene.add('transitionSceneOne', transitionSceneOne)
game.scene.add('gameSceneTwo', gameSceneTwo)
game.scene.add('transitionSceneTwo', transitionSceneTwo)
game.scene.add('gameSceneThree', gameSceneThree)
// start scene
game.scene.start('splashScene')