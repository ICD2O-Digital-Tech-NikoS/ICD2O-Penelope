class TitleScene extends Phaser.Scene {

  constructor() {
    super({key: "titleScene"})
  
    this.titleSceneAnimation = null
  }
  init(data) {
    this.cameras.main.setBackgroundColor('#ffffff')
  }
  preload() {
    console.log("Title Scene")
    this.load.video('titleSceneAnimation', './assets/titleSceneAnimation.mp4')
  }


  create(data) {
    this.titleSceneAnimation = this.add.video(0, 0, 'titleSceneAnimation')
    this.titleSceneAnimation.x = 1920 / 2
    this.titleSceneAnimation.y = 1080 / 2
    this.titleSceneAnimation.play()
  }
  update(time, delta) {
    if (time > 13500) {
      this.scene.switch('menuScene')
    }  
  } 
}

export default TitleScene