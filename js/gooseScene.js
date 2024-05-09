
// class for the goose scene
class GooseScene extends Phaser.Scene {
  
  //constructs keywords
  constructor() {
    super({key: "gooseScene"})
    // creates variable for goose scene image
    this.gooseSceneBackgroundImage = null
    this.gooseAudio = null
  }
  init(data) {
    // sets the background color
    this.cameras.main.setBackgroundColor('#fffff')
  }
  preload() {
    // really just to check if stuff is working
    console.log("Goose Scene")
    // loads image for goose scene
    this.load.image('gooseSceneBackground', './assets/gooseSceneImage.png')
    this.load.audio('gooseAudio', './assets/gooseAudio.mp3')
  }


  create(data) {
    // creates goose scene image sprite and sets where the axis that it will be placed on starts, and scales image
    this.gooseSceneBackgroundImage = this.add.sprite(0, 0, 'gooseSceneBackground').setScale(0.65)
    // coordinates for image
    this.gooseSceneBackgroundImage.x = 1920 / 2
    this.gooseSceneBackgroundImage.y = 1080 / 2
    this.scene.start('gooseSceneBackground', { fadeIn: true })
    this.music = this.sound.add('gooseAudio')
    this.music.play()
  }
  // utilizes time for if statement to create a change after a certain amount of time passes
  update(time, delta) {
    if (time > 6000) {
      this.scene.start('titleScene')
    }  
  } 
}

export default GooseScene