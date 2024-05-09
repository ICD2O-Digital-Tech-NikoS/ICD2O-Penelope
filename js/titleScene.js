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

  // creates data 
  create(data) {
    this.titleSceneAnimation = this.add.video(0, 0, 'titleSceneAnimation')
    this.titleSceneAnimation.x = 1920 / 2
    this.titleSceneAnimation.y = 1080 / 2
    this.titleSceneAnimation.play()
  }
  // says that if time becomes greater than the given time, then the scene will switch to the menu scene
  update(time, delta) {
    if (time > 26000) {
      this.scene.switch('menuScene')
    }  
  } 
}

export default TitleScene