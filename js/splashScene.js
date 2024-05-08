class SplashScene extends Phaser.Scene {

  constructor() {
    super({key: "splashScene"})

    this.splashSceneBackgroundImage = null
  }
  init(data) {
    this.cameras.main.setBackgroundColor('#1144ff')
  }
  preload() {
    console.log("Splash Scene")
    this.load.image('splashSceneBackground', './assets/splashSceneImage.jpg')
  }


  create(data) {
    this.splashSceneBackgroundImage = this.add.sprite(0, 0, 'splashSceneBackground')
    this.splashSceneBackgroundImage.x = 1920 / 2
    this.splashSceneBackgroundImage.y = 1080 / 2
  }
  update(time, delta) {
    if (time > 3000) {
      this.scene.switch('gooseScene')
    }  
  } 
}

export default SplashScene