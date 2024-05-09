

class SplashScene extends Phaser.Scene {
  
  //method that constructs keywords
  constructor() {
    super({key: "splashScene"})

    this.splashSceneBackgroundImage = null
    this.introAudio
  }
  init(data) {
    // sets the background color
    this.cameras.main.setBackgroundColor('#ffffff')
  }
  preload() {
    console.log("Splash Scene")
    this.load.image('splashSceneBackground', './assets/splashSceneImage.png')
    this.load.audio('introAudio', './assets/introAudio.mp3')
  }


  create(data) {
    this.splashSceneBackgroundImage = this.add.sprite(0, 0, 'splashSceneBackground').setScale(2)
    this.splashSceneBackgroundImage.x = 1920 / 2
    this.splashSceneBackgroundImage.y = 1080 / 2
    this.music = this.sound.add('introAudio')
    this.music.play()
  }
  update(time, delta) {
    if (time > 8000) {
      this.scene.switch('gooseScene')
    }  
  } 
}

export default SplashScene