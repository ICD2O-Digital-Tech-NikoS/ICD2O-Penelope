
// class for the menu scene
class MenuScene extends Phaser.Scene {

  //constructs keywords
  constructor() {
    super({key: "menuScene"})
    this.startButton = null
  }
  init(data) {
    // sets the background color
    this.cameras.main.setBackgroundColor('#1111f')
  }
  preload() {
    // really just to check if stuff is working
    console.log("Menu Scene")
    this.load.image('startButton', './assets/startButton.png')
  }


  create(data) {
    this.startButton = this.add.sprite(1920 / 2, (1080 / 2) + 100, 'startButton')
    this.startButton.setInteractive({ useHandCursor : true })
    this.startButton.on('pointerdown', () => this.clickButton())
  }

  update(time, delta) {
    clickButton () {
      this.scene.start('gameScene')
    }
  } 
}

export default MenuScene