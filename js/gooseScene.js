class GooseScene extends Phaser.Scene {

  constructor() {
    super({key: "gooseScene"})

    this.gooseSceneBackgroundImage = null
  }
  init(data) {
    this.cameras.main.setBackgroundColor('#fffff')
  }
  preload() {
    console.log("Goose Scene")
    this.load.image('gooseSceneBackground', './assets/gooseSceneImage.png')
  }


  create(data) {
    this.gooseSceneBackgroundImage = this.add.sprite(0, 0, 'gooseSceneBackground').setScale(0.65)
    this.gooseSceneBackgroundImage.x = 1920 / 2
    this.gooseSceneBackgroundImage.y = 1080 / 2
  }
  update(time, delta) {
    if (time > 6000) {
      this.scene.start('titleScene')
    }  
  } 
}

export default GooseScene